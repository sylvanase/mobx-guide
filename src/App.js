import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

//  将counter 注入到组件中
@inject('counter')
// 将组件变成观察者
@observer
class App extends Component {
	componentDidMount() {
		// const { getData } = this.props.counter
		// getData()
	}
	render() {
		const { counter } = this.props
		console.log(this.props)
		return (
			<div>
				<button onClick={counter.increment}>+</button>
				<span>{counter.count}</span>
				<button onClick={counter.decrement}>-</button>
				<span>{counter.getResult}</span>
				{/* <div>
					{counter.users.map((user) => (
						<div>
							<span>{user.id}</span>
							<span>{user.login}</span>
						</div>
					))}
				</div> */}
				<div>
					<input
						type="text"
						value={counter.username}
						onChange={(e) => counter.changeUsername(e.target.value)}
					/>
				</div>
				{counter.username}
			</div>
		)
	}
}
export default App
