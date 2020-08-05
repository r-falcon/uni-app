<template>
	<view class="contact">
		<!-- 图片 -->
		<image src="http://www.itcast.cn/2018czydz/images/gywmban.jpg" class="img"></image>
		
		<!-- 详情 -->
		<view class="info">
			<view @click="phone">联系电话: 400-618-9090 ( 点击拨打 )</view>
			<view>联系地址: 浙江省杭州市下沙经济开发区4号大街187号盛泰时代山</view>
		</view>
		
		<!-- 地图 -->
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="markers" :scale="scale"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 获取地图的位置，定义经度和纬度
				longitude:112.871524,
				latitude:27.887714,
				// 设置地图标志
				markers:[
					{
						longitude:112.871524,
						latitude:27.887714,
						iconPath:"../../static/xtu.png",
						width:30,
						height:30
					}
				],
				// 设置地图的缩放比例(默认值为16)
				scale:11
				
			}
		},
		methods: {
			// 处理拨打电话事件
			phone(){
				uni.makePhoneCall({
				    phoneNumber: "400-618-9090"
				});
			}
		}
	}
</script>

<style lang="scss">
	.contact{
		// 图片style
		image{
			width: 750upx;
			height: 320upx;
		}
		
		// 详情style
		.info{
			padding: 10px 20px;
			view{
				line-height: 80upx;
				border-bottom: 1px solid #eee;
				font-size: 30upx;
			}
		}
		
		// 地图style
		.map{
			height: 750upx;
			width: 750upx;
		}
	}
</style>
