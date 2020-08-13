import { TEXT } from "./const";
function createElement(type: any, props: any, ...children: any) {
  // console.log(props);
  return {
    props: {
      ...props,
      children: children.map((child: any) =>
        typeof child === "object" ? child : createTextNode(child)
      ),
    },
    type,
  };
}

function createTextNode(text: any) {
  return {
    props: {
      children: [],
      nodeValue: text,
    },
    type: TEXT,
  };
}

export default {
  createElement,
};
