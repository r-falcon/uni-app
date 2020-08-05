<template>
	<view>
		<view class="news_detail" >
			<!-- 标题 -->
			<text class="title">{{ newsDetails.title }}</text>
			<!-- 信息 -->
			<view class="info">
				<text>发表时间:{{ newsDetails.add_time | formatDate }}</text>
				<text>浏览:{{ newsDetails.click }}</text>
			</view>
			<!-- 内容 -->
			<view class="content"><rich-text :nodes="newsDetails.content"></rich-text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 定义新闻条目的id
				id:0,
				// 定义存放新闻详情的对象
				newsDetails:{}
			}
		},
		
		
		onLoad(options){
			// console.log(options)
			// 通过这一操作获取新闻条目的id
			this.id = options.id
			// console.log(this.id)
			// 获取新闻条目的详情
			this.getNewsDetail()
		},
		
		methods: {
			async getNewsDetail(){
				// console.log(id)
				const res = await this.$myRequest({
					url:"/api/getnew/" + this.id
				})
				// console.log(res)
				this.newsDetails = res.data.message[0]
				// console.log(this.newsDetails)
			}
		}
	}
</script>

<style lang="scss">
	.news_detail{
		font-size: 30upx;
		padding: 0upx 20upx;
		
		// 标题style
		.title{
			text-align: center;
			// 有了padding值要相应的修改width的大小
			width: 710upx;
			// 转换为块使其居中显示
			display: block;
			margin:20upx 0;
		}
		
		// 信息style
		.info{
			display: flex;
			justify-content: space-between;
		}
	}

</style>
