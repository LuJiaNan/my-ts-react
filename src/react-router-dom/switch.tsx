import * as React from "react";
import { RouterContext } from "./context";
export default class Switch extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
        //   let match: any, element: any;
          const { children } = this.props;
        //   const { location } = context;
        //   React.Children.forEach(this.props.children, (child) => {
        //     if (match == null && React.isValidElement(child)) {
        //       element = child;
        //       const { path } = child.props;
        //       match = path
        //         ? matchPath(location.pathname, child.props)
        //         : context.match;
        //     }
        //   });
          return children && [children[0]];
        }}
      </RouterContext.Consumer>
    );
  }
}
