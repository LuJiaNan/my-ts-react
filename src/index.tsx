// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

// import App from './App';
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root') as HTMLElement
// );
// registerServiceWorker();

import React from "./react";
// import Component from "./react/component";
import Component from "./react/update/updateComponent";
// import ReactDOM from "./react/react-dom";
// import ReactDOM, { useState } from "./react/update/react-update-dom";
import ReactDOM, { useState } from "./react/update/dom";
// import ReactDOM from "./react/update/react-update-dom";
import RouterView from "./router";

function atClick() {
  console.log("clicked");
}

const App = (
  <div className={"container"}>
    <div
      className={"title"}
      // @ts-ignore
      atClick={atClick}
      style={{ color: "red", fontSize: "30px" }}
    >
      title
    </div>
    <span>content</span>
    {/* <>fragment</> */}
  </div>
);

// class App extends Component {
//   state = {
//     text: "button",
//   };
//   constructor(props: any) {
//     super();
//     // console.log(props)
//   }
//   componentWillMount() {
//     console.log("willmount");
//   }
//   componentDidMount() {
//     console.log("didmount");
//   }
//   atClick = () => {
//     this.setState({
//       text: "app",
//     });
//     console.log("clicked");
//   };
//   atBlur() {
//     console.log("blured");
//   }
//   render() {
//     // return '1111'
//     console.log("render");
//     console.log(this.state);
//     const { text } = this.state;
//     // return <div>App</div>
//     return (
//       <div>
//         {
//           <button
//             style={{ fontSize: "30px", color: "deepskyblue" }}
//             // @ts-ignore
//             atClick={this.atClick}
//           >
//             {this.state.text}
//           </button>
//         }
//         {
//           // @ts-ignore
//           <input atBlur={this.atBlur} />
//         }
//       </div>
//     );
//   }
// }

const AppFn = ({name}:{name:any}) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {/* {
        // @ts-ignore
        <button atClick={atClick}>click</button>
      } */}
      {
        // @ts-ignore
        <button atClick={() => setCount(count + 1)}>{name}</button>
      }
      <span>{count}</span>
    </div>
  );
};

ReactDOM.render(
  // @ts-ignore
  // <App />,
  <AppFn name={'add'}/>,
  // App,
  // <RouterView/>,
  document.getElementById("root") as HTMLElement
);
