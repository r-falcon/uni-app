<template>
	<view class="news">
		<!-- 结合子组件定义的方法 -->
		<news-item @itemClick="goDetail" :list="newsItem"></news-item>
	</view>
</template>

<script>
	// 引入新闻条目组件
	import newsItem from '../../components/news-item/news-item.vue'
	
	export default {
		// 组件注册
		components:{
			newsItem
		},
		
		data() {
			return {
				// 新闻列表数组
				newsItem:[]
			}
		},
		
		onLoad() {
			// 获取资讯列表数据
			this.getNewsItem();
		},
		
		methods: {
			async getNewsItem(){
				const res = await this.$myRequest({
					url:'/api/getnewslist'
				})
				// console.log(res)
				this.newsItem = res.data.message
				// console.log(this.news)
			},
			
			// news详情跳转
			goDetail(id){
				// console.log(id)
				uni.navigateTo({
					url:"/pages/news-detail/news-detail?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	
		
</style>
