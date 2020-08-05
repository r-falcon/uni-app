<template>
	<!-- 新闻条目组件 -->
	<view>
		<view class="news_item" v-for="item in list" :key="item.id" @click="navigator(item.id)">
			<image :src="item.img_url" mode=""></image>
			<view class="right">
				<view class="title">
					{{ item.title }}
				</view>
				<view class="info">
					<text>发表时间:{{ item.add_time | formatDate }}</text>
					<text>浏览:{{ item.click }}</text>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	export default{
		props:['list'],
		
		methods:{
			navigator(id){
				// 调父组件
				// console.log(id)  // 得到新闻条目的id
				this.$emit('itemClick',id)
			}
		}
	}
</script>

<style lang="scss">
	.news_item{
		display: flex;
		padding: 10upx 20upx;
		border-bottom: 1px solid $shop-color;
		image{
			min-width: 200upx;
			max-width: 200upx;
			height: 150upx;
		}
		
		.right{
			margin-left: 20upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title{
				font-size: 32upx;
			}
			.info{
				font-size: 26upx;
				text:nth-child(2){
					margin-left: 30upx;
				}
			}
		}
	}
</style>
