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
import Component from "./react/component";
import ReactDOM from "./react/react-dom";
import RouterView from './router';


// const App = (
//   <div className={'container'}>
//     <div className={'title'} style={{color:'red',fontSize:'30px'}}>title</div>
//     <span>content</span>
//     {/* <>fragment</> */}
//   </div>
// )

class App extends Component {
  state = {
    text: 'button'
  }
  constructor(props:any){
    super();
    // console.log(props)
  }
  componentWillMount() {
    console.log("willmount");
  }
  componentDidMount() {
    console.log("didmount");
  }
  atClick = () => {
    this.setState({
      text: 'app'
    })
    console.log("clicked");
  }
  atBlur() {
    console.log("blured");
  }
  render() {
    // return '1111'
    console.log('render')
    console.log(this.state)
    const { text } = this.state;
    return (
      <div>
        {
          <button
            style={{ fontSize: "30px", color: "deepskyblue" }}
            // @ts-ignore
            atClick={this.atClick}
          >
            {this.state.text}
          </button>
        }
        {
          // @ts-ignore
          <input atBlur={this.atBlur} />
        }
      </div>
    );
  }
}

function atClick() {
  console.log("i am function, clicked");
}

const AppFn = () => {
  // @ts-ignore
  return <button atClick={atClick}>click</button>;
};


ReactDOM.render(
  // @ts-ignore
  <App />,
  // <AppFn />,
  // App,
  // <RouterView/>,
  document.getElementById("root") as HTMLElement
);
