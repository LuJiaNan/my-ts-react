export default class Component<Props> {
    state:{}
    // isReactComponent: true
    isReactComponent(){}
    setState = (stateObj:any) => {
        this.state = {...this.state, ...stateObj}
        // updateComponent
        // this.render()
        // console.log(this)
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