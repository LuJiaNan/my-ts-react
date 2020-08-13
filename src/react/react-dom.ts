import { TEXT } from "./const";

function render(vnode: any, container: any) {
  // console.log(vnode);
  // vnode->node
  const node = createNode(vnode, container);
  // console.log(node);
  container.appendChild(node);
  vnode?.type?.prototype?.componentDidMount?.();
}

function createNode(vnode: any, container: any) {
  const { type, props } = vnode;
  let node = null;
  const nodeType = typeof type;
  // console.log(nodeType);
  if (type === TEXT) {
    node = document.createTextNode(props.nodeValue);
  } else if (nodeType === "string") {
    node = document.createElement(type);
  } else if (nodeType === "function") {
    // function class
    // console.log(vnode);
    if (type.prototype.isReactComponent) {
      // class组件

      // 执行生命周期
      // console.log(vnode);
      // vnode.type.prototype.constructor?.();
      vnode.type.prototype.componentWillMount?.();
      node = updateClassComponent(vnode, container);
    } else {
      // function组件
      node = updateFunctionComponent(vnode, container);
    }
  } else if (nodeType === "undefined") {
    node = document.createDocumentFragment();
  } else {
  }

  props && reconcileChildren(props.children, node);
  props && updateNode(node, props);
  return node;
}

function reconcileChildren(children: any, node: any) {
  for (const child of children) {
    if (Array.isArray(child)) {
      for (const nextChild of child) {
        render(nextChild, node);
      }
    } else {
      render(child, node);
    }
  }
}

function updateClassComponent(vnode: any, container: any): any {
  const { type, props } = vnode;
  const cmp = new type(props);
  // console.log(cmp);
  let vvnode = cmp.render();
  let node = null;
  if (typeof vvnode === "string") {
    vvnode = document.createTextNode(vvnode);
    node = vvnode;
    return node;
  }
  node = createNode(vvnode, container);
  return node;
}

function updateFunctionComponent(vnode: any, container: any): any {
  const { type, props } = vnode;
  const vvnode = type(props);
  const node = createNode(vvnode, container);
  return node;
}

function updateNode(node: any, props: any) {
  const { children, nodeValue, ...others } = props;

  Object.keys(others).forEach((key) => {
    if (key === "style") {
      // others[key] = {color: 'red', fontSize: '20px'}
      const style = others[key];
      node[key] = styleHandler(style);
    } else if (key.slice(0, 2) === "at") {
      // console.log(key);
      // console.log(node);
      node.addEventListener(key.slice(2).toLowerCase(), others[key]);
    } else {
      node[key] = others[key];
    }
  });
}

function styleHandler(styleObj: object) {
  let styleStr = "";
  const Acode = "A".charCodeAt(0);
  const Zcode = "Z".charCodeAt(0);
  Object.keys(styleObj).forEach((key) => {
    const value = styleObj[key];
    for (let i = 0; i < key.length; i++) {
      const letter = key.charAt(i);
      if (letter.charCodeAt(0) >= Acode && letter.charCodeAt(0) <= Zcode) {
        key =
          key.split(letter)[0] +
          "-" +
          letter.toLowerCase() +
          key.split(letter)[1];
      }
    }
    styleStr += `${key}:${value};`;
  });
  return styleStr;
}

export default { render };
