import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

//  将counter 注入到组件中
@inject('counter')
// 将组件变成观察者
@observer
class App extends Component {
	render() {
		const { counter } = this.props
		return (
			<div>
				<button onClick={counter.increment}>+</button>
				<button onClick={counter.decrement}>-</button>
				<span>{counter.count}</span>
			</div>
		)
	}
}
export default App
