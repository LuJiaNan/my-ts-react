https://github.com/acdlite/react-fiber-architecture

React 组件，元素和实例：https://react.docschina.org/blog/2015/12/18/react-components-elements-and-instances.html

协调：https://react.docschina.org/docs/reconciliation.html

n3论文：http://vldb.org/pvldb/vol5/p334_mateuszpawlik_vldb2012.pdf
https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf

react diff：https://zhuanlan.zhihu.com/p/20346379

In concrete terms, a fiber is a JavaScript object that contains information about a component, its input, and its output.

1.react class 组件为什么要继承Component，他里面做了什么。
2.react怎么区分class component 和 function component。
3.react列表渲染为什么不加key会warnning，不加会有什么问题。
4.官方：如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。为什么。