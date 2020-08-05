<template>
	<!-- 商品列表组件-->
	<view class="goods_list">
		<view class="goods_item" v-for="item in goods" :key="item.id" @click="navigator(item.id)">
			<image :src="item.img_url" mode=""></image> 
			<view class="price">
				<text>￥{{ item.sell_price }}</text>
				<text>￥{{ item.market_price }}</text>
			</view>
			<view class="name">
				<text>{{ item.title }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['goods'],
		
		methods:{
			navigator(id){
				// 调父组件
				// console.log(id)  // 得到新闻条目的id
				this.$emit('goodsClick',id)
			}
		}
	}
</script>

<style lang="scss">
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
</style>
