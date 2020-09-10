// import {enqueueSetState} from './updateQuene'
import ReactDOM, {setState} from '../react-dom';
export default class Component<T>{
    state:{}
    props: any;
    constructor(props?:any, context?:any){
        this.props = props;
    }
    // isReactComponent: true
    isReactComponent(){}
    setState(stateObj:any,callback?:any) : void {
        this.state = {...this.state, ...stateObj}
        // updateComponent
        // this.render()
        const self = this;
        setState(self,this.state)
        // enqueueSetState(this, stateObj)
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