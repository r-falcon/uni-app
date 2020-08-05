// 封装一下基础的url
const BASE_URL = "http://localhost:8082"

export const myRequest = (options) => {
	return new Promise((resolve,reject)=>{
		uni.request({
			// 获取url
			url:BASE_URL + options.url,
			// 获取请求方法
			method:options.method || 'GET',
			// 获取请求的数据
			data:options.data || {},
			// 判断请求是否成功
			success: (res) => {
				if(res.data.status !== 0){
					return uni.showToast({
						title:"获取数据失败！！！"
					})
				}
				// 获取成功，调用resolve
				resolve(res)
			},
			// 获取失败
			fail: (err) => {
				uni.showToast({
					title:"请求接口失败！！！"
				})
				// 返回错误消息
				reject(err)
			}
		})
	})
	
}