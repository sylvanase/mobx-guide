/*
 * @Author: sylvanas
 * @Date: 2020-12-02 22:36:42
 * @LastEditors: sylvanas
 * @LastEditTime: 2020-12-02 22:55:02
 * @Description:
 */
import { observer } from 'mobx'
class CounterStore {
	// 将count 变为可观察状态
	@observer count = 0

	increment = () => {
		this.count = this.count + 1
	}

	decrement = () => {
		this.count = this.count - 1
	}
}

const counter = new CounterStore()

export default counter
