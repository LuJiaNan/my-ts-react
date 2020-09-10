import { TEXT } from "./const";
// import Component from './component';
import Component from './update/updateComponent';

function createElement(type:any, props:any, ...children:any) {
  let defaultProps = {};
  if (type && type.defaultProps) {
    defaultProps = {...type.defaultProps};
  }
  return {
    type,
    props: {
      ...defaultProps,
      ...props,
      children: children.map((child:any) =>
        typeof child === "object" ? child : createTextNode(child)
      )
    }
  };
}

function createTextNode(text:string | number) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  };
}

export default {
  createElement,
  Component
};
