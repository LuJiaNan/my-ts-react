import ReactDOM from './react-update-dom'
export default class Component {
    state:{}
    // isReactComponent: true
    isReactComponent(){}
    setState(stateObj:any) : void {
        this.state = {...this.state, ...stateObj}
        // updateComponent
        // this.render()
        ReactDOM.setState(this.state)
    }
    render(){}
}


// function Component(this: any, props:any,context:any, updater:any):void{
//     this.props = props;
//     this.context = context;
// }

// Component.prototype.isReactComponent = {};
// Component.prototype.constructor = () => {};

// export default Component