/*
 * @Author: sylvanas
 * @Date: 2020-12-02 22:36:42
 * @LastEditors: sylvanas
 * @LastEditTime: 2020-12-03 23:33:44
 * @Description:
 */
import { observable, action, runInAction, flow, computed } from 'mobx'
import axios from 'axios'
class CounterStore {
	// 将count 变为可观察状态
	@observable count = 0
	@observable users = []

	@action.bound increment() {
		this.count = this.count + 1
	}
	// 普通方式
	decrement = () => {
		this.count = this.count - 1
	}

	// 方式一：异步更新
	@action.bound async getData() {
		let { data } = await axios.get('https://api.github.com/users')
		console.log(data)
		// 严格模式下异步无法直接修改数据，需要使用 runInAction
		runInAction(() => (this.users = data))
	}

	// 方式二：异步更新
	// getData = flow(function* () {
	//   let { data } = yield axios.get('https://api.github.com/users');
	//   this.users = data
	// }).bind(this)

	@computed get getResult() {
		return this.count * 10
	}
}

const counter = new CounterStore()

export default counter
