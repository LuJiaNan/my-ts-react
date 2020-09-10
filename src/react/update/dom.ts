import {TEXT, PLACEMENT, UPDATE, DELETION} from "../const";
import {styleHandler} from '../react-dom';

// 下一个子任务 fiber
let nextUnitOfWork:any = null;
//  work in progress fiber root
let wipRoot:any = null;

// 当前的根 fiber root
let currentRoot:any = null;

let deletions:any = null;

// fiber结构
/**
 * child
 * sibling
 * return
 * node dom节点
 * base 存储当前节点的上一次的fiber
 */

function render(vnode:any, container:any) {
  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    },
    base: currentRoot
  };
  deletions = [];
  console.log("wipRoot", wipRoot); // sy-log
  nextUnitOfWork = wipRoot;
}

function createNode(fiber:any) {
  const {type, props} = fiber;
  let node = null;
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  }
  // else {
  //   node = document.createDocumentFragment();
  // }
  updateNode(node, {}, props);
  return node;
}

function updateNode(node:any, prevVal:any, nextVal:any) {
  // 旧的 className:'red'  style:{{color: 'red}}
  // 新的 style:{{color: 'pink}}
  Object.keys(prevVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k === "style") {
        const style = prevVal[k];
        node[k] = styleHandler(style);
      } else if (/at\w+/.test(k)) {
        // 简单处理 at开头当做事件
        let eventName = k.slice(2).toLowerCase();
        node.removeEventListener(eventName, prevVal[k]);
      } else {
        if (!(k in nextVal)) {
          node[k] = "";
        }
      }
    });

  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k === "style") {
        const style = prevVal[k];
        node[k] = styleHandler(style);
      } else if (/at\w+/.test(k)) {
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function reconcileChildren(workInProgressFiber:any, children:any) {
  // 给children构建fiber架构
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
  let prevSibling:any = null;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null;
    const sameType = child && oldFiber && child.type === oldFiber.type;
    if (sameType) {
      // todo 类型相同 复用
      newFiber = {
        type: child.type,
        props: child.props,
        node: oldFiber.node,
        base: oldFiber, // 存储当前节点上一次的值
        return: workInProgressFiber,
        effectTag: UPDATE
      };
    }
    if (!sameType && child) {
      // 类型不同 child存在  新增插入
      newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        base: null,
        return: workInProgressFiber,
        effectTag: PLACEMENT
      };
    }

    if (!sameType && oldFiber) {
      // todo 删除
      oldFiber.effectTag = DELETION;
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      // i>0
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  }

  // 基本构建完成
}

function updateHostComponent(fiber:any) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const {children} = fiber.props;
  reconcileChildren(fiber, children);
}

function updateFunctionComponent(fiber:any) {
  wipFiber = fiber;
  wipFiber.hooks = [];
  hookIndex = 0;
  const {type, props} = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

function updateClassComponent(fiber:any) {
  const {type, props} = fiber;
  const cmp = new type(props);
  const children = [cmp.render()];
  reconcileChildren(fiber, children);
}

function peformUnitOfWork(fiber:any) {
  // 1. 执行当前任务
  const {type} = fiber;
  if (typeof type === "function") {
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    // 原生标签
    updateHostComponent(fiber);
  }

  // 2. 返回下一个任务
  // 先找子元素
  if (fiber.child) {
    return fiber.child;
  }
  // 如没有子元素，寻找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function workLoop(deadline:any) {
  console.log(deadline.timeRemaining())
  // 查找下一个任务，并且当前帧没有结束，这里简单实现，react使用更严谨的shouldYield方法
  while (nextUnitOfWork && (deadline.timeRemaining() > 0 || deadline.didTimeout)) {
    // 当前有任务
    nextUnitOfWork = peformUnitOfWork(nextUnitOfWork);
  }

  // 所有任务执行完成
  // todo commit
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

// ! commit 阶段
function commitRoot() {
  console.log("commitRoot"); 
  deletions.forEach(commitWorker);
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWorker(fiber:any) {
  if (!fiber) {
    return;
  }

  // parentNodeFiber 指的是当前fiber的有node节点的父fiber或者祖先
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return;
  }

  // parentNode是指fiber的父node
  const parentNode = parentNodeFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node);
  } else if (fiber.effectTag === UPDATE && fiber.node !== null) {
    // 更新
    updateNode(fiber.node, fiber.base.props, fiber.props);
  } else if (fiber.effectTag === DELETION && fiber.node !== null) {
    // 更新
    commitDeletions(fiber, parentNode);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

// 删除fiber
function commitDeletions(fiber:any, parentNode:any) {
  if (fiber.node) {
    parentNode.removeChild(fiber.node);
  } else {
    commitDeletions(fiber.child, parentNode);
  }
}

// 当前正在工作中的fiber
let wipFiber:any = null;
let hookIndex:any = null;
export function useState(init:any) {
  // 状态值：初始值以及改变之后的值
  const oldHook = wipFiber.base && wipFiber.base.hooks[hookIndex];
  const hook = {state: oldHook ? oldHook.state : init, queue: []};

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action:any) => (hook.state = action));

  const setState = (action:any) => {
    // @ts-ignore
    hook.queue.push(action);
    wipRoot = {
      // ...currentRoot,
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    };
    deletions = [];
    nextUnitOfWork = wipRoot;
  };
  // [状态值，改变状态值的函数]
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

export default {
  render
};
