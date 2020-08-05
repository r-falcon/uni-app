<template>
	<view class="goods_detail">
		<!-- 实现商品详情页的banner -->
		<swiper indicator-dots>
			<!-- 使用v-for循环渲染出后台的banner-image数据 -->
			<swiper-item v-for="(item,index) in swipers" :key="index">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		
		<!-- 商品详情展示 -->
		<!-- price和title -->
		<view class="box1">
			<view class="price">
				<text>￥{{ info.sell_price }}</text>
				<text>￥{{ info.market_price }}</text>
			</view>
			<view class="title">{{ info.title }}</view>
		</view>
		
		<!-- 灰色间隔线 -->
		<view class="line"></view>
		
		<!-- 货号和库存 -->
		<view class="box2">
			<view>货号:  {{ info.goods_no }}</view>
			<view>库存:  {{ info.stock_quantity }}</view>
		</view>
		
		<!-- 灰色间隔线 -->
		<view class="line"></view>
		
		<!-- 商品详细 -->
		<view class="box3">
			<view class="title1">详情介绍</view>
			<view class="content"><rich-text :nodes="desc"></rich-text></view>
		</view>
		
		<!-- 使用商品导航组件 -->
		<view class="goods_nav">
			<uni-goods-nav
				:fill="true"  
				:options="options" 
				:buttonGroup="buttonGroup"  
				@click="onClick" 
				@buttonClick="buttonClick" 
			/>
		</view>
	</view>
</template>

<script>
	// 导入商品导航组件
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	
	export default {
		// 注册组件
		components: {uniGoodsNav},
		
		data() {
			return {
				// 定义商品对应的id
				id:0,
				// 定义banner图片地址数组
				swipers:[],
				// 定义商品详情参数的对象
				info:{},
				// 定义商品详情对象
				desc:'',
				// 商品导航中的options数据
				options: [
					{
						icon: 'headphones',
						text: '客服'
				    }, {
						icon: 'shop',
						text: '店铺',
						info: 0,
						infoBackgroundColor:'#007aff',
						infoColor:"red"
					}, {
						icon: 'cart',
						text: '购物车',
						info: 8
					},
				],
				buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			
				
			}
		},
		
		onLoad(options){
			// console.log(options)
			this.id = options.id
			// 获取swiper数据
			this.getSwipers()
			// 获取商品详情数据
			this.getGoodsInfo()
			// 获取商品详情
			this.getGoodsDesc()
		},
		
		methods: {
			// 获取swiper数据
			async getSwipers(){
				const res = await this.$myRequest({
					url:'/api/getthumimages/' + this.id
				})
				// console.log(res)
				this.swipers = res.data.message
				// console.log(this.swipers)
			},
			
			// 获取参数详情
			async getGoodsInfo(){
				const res = await this.$myRequest({
					url:'/api/goods/getinfo/' + this.id
				})
				// console.log(res)
				this.info = res.data.message[0]
				// console.log(this.info)	
			},
			
			// 获取商品详情
			async getGoodsDesc(){
				const res = await this.$myRequest({
					url:'/api/goods/getdesc/' + this.id
				})
				// console.log(res)
				this.desc = res.data.message[0].content
				// console.log(this.desc)
			},
			
			// 商品导航栏对应的方法
			onClick (e) {
				console.log(e)
				// uni.showToast({
				//   title: `点击${e.content.text}`,
				//   icon: 'none'
				// })
		    },
			buttonClick (e) {
				console.log(e)
				// this.options[2].info++
			}
		}
	}
</script>

<style lang="scss">
	.goods_detail{
		// 轮播图banner
		swiper{
			height: 700upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		// 商品详情style
		.box1{
			padding: 10upx;
			// 设置price的style
			.price{
				font-size: 40upx;
				color: $shop-color;
				line-height: 80upx;
				text:nth-child(2){
					color: #ccc;
					font-size: 30upx;
					margin-left: 25upx;
					// 设置中划线样式
					text-decoration: line-through;
				}
			}
			//设置title的style
			 .title{
				 font-size: 38upx;
				 line-height: 60upx;
			 }
		}
		
		.box2{
			padding: 0 10upx;
			font-size: 34upx;
			line-height: 60upx;
		}
		
		.box3{
			// 把商品导航栏遮住的那一部分给多出来
			padding-bottom: 80upx;
			.title1{
				font-size: 32upx;
				padding-left: 10upx;
				border-bottom: 1px solid #eee;
				line-height: 70upx;
			}
			.content{
				padding: 10upx;
				font-size: 28upx;
				color: #333;
				line-height: 50upx;
			}
		}
		
		// 灰色间隔线的style
		.line{
			height: 8upx;
			width: 750upx;
			background: #eee;
		}
		
		// 商品导航栏样式
		.goods_nav{
			position:fixed;
			bottom:0;
			width: 100%;
		}
			
		
		
	}
</style>
