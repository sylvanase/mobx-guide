/*
 * @Author: sylvanas
 * @Date: 2020-12-02 22:36:42
 * @LastEditors: sylvanas
 * @LastEditTime: 2020-12-03 23:47:06
 * @Description:
 */
import {
	observable,
	action,
	runInAction,
	flow,
	computed,
	configure,
	autorun,
} from 'mobx'
import axios from 'axios'

// 通过配置强制程序使用action函数更改应用程序中的状态
configure({ enforceActions: 'observed' })

class CounterStore {
	constructor() {
		autorun(
			() => {
				try {
					uniqueUsername(this.username)
					console.log('用户名可用')
				} catch (e) {
					console.log(e.message)
				}
			},
			{
				delay: 2000,
			}
		)
	}

	// 将count 变为可观察状态
	@observable count = 0
	@observable users = []
	@observable username = 'test'

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

	@action.bound changeUsername(username) {
		this.username = username
	}
}

const counter = new CounterStore()

function uniqueUsername(username) {
	return new Promise((resolve, reject) => {
		if (username === 'admin') {
			reject('用户名已经存在')
		} else {
			resolve()
		}
	})
}

export default counter
