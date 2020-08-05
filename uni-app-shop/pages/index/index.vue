<template>
	<view class="home">
		<!-- 利用swiper实现轮播图 -->
		<!-- indicator-dots 显示面板指示点 -->
		<!-- circular 采用衔接滑动，即播放到末尾后重新回到开头 -->
		<swiper indicator-dots circular>
			<!-- 使用v-for循环渲染出后台的banner-image数据 -->
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img" mode=""></image>
			</swiper-item>
		</swiper>
		
		<!-- 首页的导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="navItemClick(item.path)">
				<!-- 图标 -->
				<view :class="item.icon"></view>
				<!-- 文字 -->
				<text>{{ item.title }}</text>
			</view>
		</view>
		
		<!-- 推荐商品区域 -->
		<view class="hot_goods">
			<!-- 标题 -->
			<view class="title">推荐商品</view>
			<!-- 商品列表 -->
			<goods-list @goodsClick="goGoodsDetail" :goods="goods"></goods-list>
		</view>
	</view>
</template>

<script>
	// 导入商品列表组件
	import goodsList from '../../components/goods-list/goods-list.vue'
	
	export default {
		// 组件注册
		components:{
			goodsList
		},
		
		data() {
			return {
				// 存放轮播图的数组
				swipers:[],
				// 存放商品列表的数组
				goods:[],
				// 首页导航部分跳转操作
				navs:[
					{
						icon:'iconfont icon-ziyuan',
						title:'黑马超市',
						path:'/pages/goods/goods'
					},{
						icon:'iconfont icon-guanyuwomen',
						title:'联系我们',
						path:'/pages/contact/contact'
					},{
						icon:'iconfont icon-tupian',
						title:'社区图片',
						path:'/pages/pics/pics'
					},{
						icon:'iconfont icon-shipin',
						title:'学习视频',
						path:'/pages/videos/videos'
					}
				]
			}
		},
		onLoad() {
			// 获取轮播图图片地址数据
			this.getSwipers();
			// 获取商品列表数据
			this.getHotGoods();
			
		},
		methods: {
			// 获取轮播图的数据
			async getSwipers(){
				// console.log(111)
				// uni.request({
				// 	url:"http://localhost:8082/api/getlunbo",
				// 	success:res => {
				// 		// console.log(res)
				// 		if(res.data.status !== 0){
				// 			return uni.showToast({
				// 				title:"获取数据失败！！！"
				// 			})
				// 		}
				// 		this.swipers = res.data.message
				// 		console.log(this.swipers)
				// 	}
				// })
				
				// 通过异步方法同样可以获取到数据
				// async getSwipers(){
				// 	const res = await uni.request({
				// 		url:"http://localhost:8082/api/getlunbo"
				// 	})
				// 	console.log(res)
				// }
				
				// 使用api.js中封装好并引入main.js中的myRequest参数获取的方法
				const res = await this.$myRequest({
					url:'/api/getlunbo'
				})
				// console.log(res)
				this.swipers = res.data.message
				// console.log(this.swipers)
			},
			
			// 获取热门商品列表数据
			async getHotGoods(){
				const res = await this.$myRequest({
					url:'/api/getgoods?pageindex=1'
				})
				// console.log(res)
				this.goods = res.data.message
				// console.log(this.goods)
			},
			
			// nav点击的处理函数
			navItemClick(url){
				// console.log(url)
				uni.navigateTo({
					url:url
				})
			},
			
			// 导航到商品详情页
			goGoodsDetail(id){
				// console.log(id)
				uni.navigateTo({
					url:"/pages/goods-detail/goods-detail?id=" + id
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.home{
		// banner轮播图
		swiper{
			width: 750upx;
			height: 380upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		// 首页的导航区域
		.nav{
			// 利用弹性布局
			display: flex;
			.nav_item{
				width: 25%;
				// 让每个icon+描述在25%的区域内居中显示
				text-align: center;
				// 设置字体大小
				text{
					font-size: 30upx;
				}
				// 设置图标大小
				view{
					height: 120upx;
					width: 120upx;
					background: $shop-color;
					border-radius: 50%;
					// 设置view的居中
					margin: 20upx auto;
					// 设置icon的居中
					line-height: 120upx;
					color: #fff;
					// 设置icon的大小
					font-size: 50upx;
				}
				// 微调图片icon的大小
				.icon-tupian{
					font-size: 45upx;
				}
			}
		}
		
		// 推荐商品区域
		.hot_goods{
			background: #eee;
			// 因为title设置margin后会有浮动，用overflow设置显示出背景色
			overflow: hidden;
			// 设置上边距
			margin-top: 30upx;
			
			// 商品标题
			.title{
				height: 80upx;
				line-height: 80upx;
				color: $shop-color;
				// 字体居中
				text-align: center;
				//设置字与字之间的间距
				letter-spacing: 20upx;
				background: #fff;
				// 设置上下边距
				margin: 6upx auto;
			}
			
			// 商品列表区域
			.goods_list{
				padding: 0 10upx;
				display: flex;
				// 换行显示
				flex-wrap: wrap;
				// 设置item之间的间距
				justify-content: space-between;
				
				// 每一个商品列表项
				.goods_item{
					// 设置一下上下边距
					margin: 10upx auto;
					background: #fff;
					// padding为15upx 750-15*2=730 355*2=710
					width: 355upx;
					// 设置间距并选择border-box属性
					padding: 15upx;
					box-sizing: border-box;
					
					// 设置图片的宽高
					image{
						width: 80%;
						height: 260upx;
						// 让图片居中
						display: block;
						margin: auto;
					}
					
					// 设置价格的style
					.price{
						color: $shop-color;
						font-size: 40upx;
						margin: 15upx 0 0 0;
						// 为price的第二个text设置样式
						text:nth-child(2){
							color: #ccc;
							font-size: 28upx;
							margin-left: 28upx;
							// 设置中划线样式
							text-decoration: line-through;
						}
					}
					
					// 设置name的style
					.name{
						font-size: 32upx;
						line-height: 40upx;
						padding: 15upx 0 10upx 0;
						
					}
				}
			}
				
		}
		
		
	}
</style>
