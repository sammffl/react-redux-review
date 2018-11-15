# connect
connect的作用就是让你读取redux store，并且当store更新后，重新读取它的值

connect 包含两个参数  `mapStateToProps`和`mapDispatchToProps`

## mapStateToProps
每次store的状态改变都会触发这个方法
接受一个完整的store，返回当前component需要的数据

```javascript
const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
    loading: state.loading,
    common: state.common,
});
```

## mapDispatchToProps
可以是函数也可以是对象

* 如果是函数，它是在组建创建的时候调用的。接收一个`dispatch`最为参数，需要返回一个包含了所有用dispatch分发的actions的一个对象

* 如果它是一个包含了所有actions的对象，每个action creator都要在调用的时候能自动的触发dispatch

```javascript
const mapDispatchToProps = {
  // ... normally is an object full of action creators
};
```

## 注意
connect 如果不穿参数，`store`的改变不会触发组件的重新渲染，
但是会在组件的`props`上添加dispatch方法可以让你在组件内自发的去使用
如果传入了`mapDispatchToProps`，会在`props`上添加触发dispatch的action方法的方法，否则只能在页面直接dispatch触发
```javascript
// ... Component
export default connect()(Component); // Component will receive `dispatch` (just like our <TodoList />!)
```

```javascript
import { bindActionCreators } from "redux";
// ...

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increment, decrement, reset }, dispatch);
}

// component receives props.increment, props.decrement, props.reset
connect(
  null,
  mapDispatchToProps
)(Counter);
```