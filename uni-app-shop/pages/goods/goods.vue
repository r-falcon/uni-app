<template>
	<view>
		<goods-list @goodsClick="goGoodsDetail" :goods="goods"></goods-list>
		<view class="isOver" v-if="flag">-----我是有底线的！！！-----</view>
	</view>
</template>

<script>
	// 引入商品列表组件
	import goodsList from '../../components/goods-list/goods-list.vue'
	
	export default {
		// 组件注册
		components:{
			goodsList
		},
		
		data() {
			return {
				pageindex:1,
				// 存放商品列表的数组
				goods:[],
				// 定义触底提示的显示与隐藏
				flag:false
			}
		},
		
		onLoad() {
			// 获取商品列表数据
			this.getGoodsList();
		},
		
		methods: {
			// 获取商品列表数据
			async getGoodsList(callback){
				const res = await this.$myRequest({
					url:'/api/getgoods?pageindex=' + this.pageindex
				})
				// console.log(res)
				this.goods = [...this.goods,...res.data.message]
				callback()
			},
			
			// 导航到商品详情页
			goGoodsDetail(id){
				// console.log(id)
				uni.navigateTo({
					url:"/pages/goods-detail/goods-detail?id=" + id
				})
			}
		},
		
		// 页面上拉触底事件
		onReachBottom(){
			if(this.goods.length < this.pageindex*10){
				return this.flag = true
			}
			// console.log("到底了！！")
			// 触底后加载下一页数据
			this.pageindex++
			// 注意一个问题，请求新的数据，同时保留原来的数据
			this.getGoodsList()
		},
		
		// 监听页面的下拉刷新
		onPullDownRefresh(){
			// console.log("下拉刷新了")
			this.pageindex = 1
			this.goods = []
			this.flag = false
			// 下拉刷新获取数据列表
			setTimeout(() => {
				this.getGoodsList(() => {
					uni.stopPullDownRefresh()
				})
			},1000)
		}
	}
</script>

<style lang="scss">
	.goods_list{
		background: #eee;
	}
	.isOver{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		font-size: 28upx;
		background: #eee;
	}
</style>
