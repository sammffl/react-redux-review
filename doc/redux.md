# 动机

单页应用更复杂
处理更多数据，包含 接口返回的数据、缓存数据和本地创建的一些数据，页面交互的状态也变得更加复杂

处理状态的改变和异步操作
通过redux的三个原则 强制控制何时怎么样去让更新发生
来控制改变的状态

# 核心概念

每一个改变都是一个action

```javascript
var object = {
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
};
```

分发的action其实是返回的一系列对象
```javascript
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```

合并后的reducer
```javascript
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  } else {
    return state
  }
}
​
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }])
    case 'TOGGLE_TODO':
      return state.map(
        (todo, index) =>
          action.index === index
            ? { text: todo.text, completed: !todo.completed }
            : todo
      )
    default:
      return state
  }
}

function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
```
# 三个核心概念

## 单一来源 ，一个程序只有一个store
```javascript
console.log(store.getState())
​
/* Prints
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/

```
## 状态是只读的
唯一改变状态的方法是触发action，这样可以是状态的改变容易被监控
```javascript
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})
​
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```


## 改变由纯函数完成

Reducers 是一个纯函数，传入一个先前的state和action，然后返回一个新的state


# 已有技术

## Flux
`(state, action) => state`
redux灵感来自flux，和flux很想但是因为依赖纯函数，所以不需要事件触发
redux 建议你永远不要突然改变你的数据


