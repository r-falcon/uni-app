import Vue from 'vue'
import App from './App'

// 引入封装好的共用的request方法，并为了让所有页面都可以访问，将其挂载到vue原型上
import { myRequest } from 'util/api.js'
Vue.prototype.$myRequest = myRequest

// 全局封装时间的显示格式
Vue.filter('formatDate',(date) => {
		// console.log(date)
		const newDate = new Date(date)
		// console.log(newDate)
		const year = newDate.getFullYear().toString().padStart(2,0)	//获取年
		const month = (newDate.getMonth() + 1).toString().padStart(2,0)	//获取月
		const day = newDate.getDay().toString().padStart(2,0)	//获取日
		return year + "-" + month + "-" + day
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
