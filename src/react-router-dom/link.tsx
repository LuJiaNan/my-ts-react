// import * as React from "react";

import React from "../react";
import {RouterContext} from "./context";

interface ILinkProps {
  children: any[];
  to: string;
}

export default class Link extends React.Component<ILinkProps> {
  static contextType = RouterContext;
  props: any;
  constructor(props: any) {
    super();
    this.props = props;
  }
  handleClick = (e: any) => {
    // @ts-ignore
    const { to } = this.props;
    e.preventDefault();
    // 跳转
    history.pushState({}, to, to);
  };
  render() {
    // @ts-ignore
    const { to, children } = this.props;
    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
