<template>
	<view class="pics">
		<!-- 设置可滚动视图区域 -->
		<!-- 左侧分类区域 -->
		<scroll-view class="left" scroll-y>
			<view 
				:class="active === index ? 'active' : ''" 
				v-for="(item,index) in cates" 
				:key="item.id"
				@click="leftClickHandle(index,item.id)"
			>
				{{ item.title }}
			</view>
		</scroll-view>
		
		<!-- 右侧图片展示区域 -->
		<!-- ?? 右侧图片的展示和左侧分类的点击对应起来 -->
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="item in imgs" :key="item.id">
				<image :src="item.img_url" @click="previewImg(item.img_url)"></image>
				<text>{{ item.title }}</text>
			</view>
			<!-- 没有图片资源的时候展示 -->
			<text v-if="imgs.length === 0">暂无数据</text>
		</scroll-view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 图片分类类别数组
				cates:[],
				// active当前激活区域
				active:0,
				// 图片分类图片数组
				imgs:[]
				
			}
		},
		
		onLoad() {
			// 获取图片分类
			this.getPicsCate()
		},
		
		methods: {
			// 获取社区图片分类
			async getPicsCate(){
				const res = await this.$myRequest({
					url:'/api/getimgcategory'
				})
				// console.log(res)
				this.cates = res.data.message
				// console.log(this.cates)
				this.leftClickHandle(0,this.cates[0].id)
			},
			
			// 处理左边的分类点击事件
			async leftClickHandle(index,id){
				 // console.log(id)
				// console.log(index)
				// 将index值赋给active，点击时展示相应的样式
				this.active = index
				// 获取左边类对应的右边图片资源
				const res = await this.$myRequest({
					url:'/api/getimages/' + id,
				})
				// console.log(res)
				this.imgs = res.data.message
				// console.log(this.imgs)
			},
			
			// 分类中的图片预览操作
			previewImg(current){
				const urls = this.imgs.map(item=>{
					return item.img_url
				})
				// console.log(urls)
				uni.previewImage({
					// 设置current使得预览打开的第一张为当前图片
					current,
					urls
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.pics{
		height: 100%;
		display: flex;
		.left{
			width: 200upx;
			height: 100%;
			border-right: 1px solid #eee;
			view{
				border-top: 1px solid #eee;
				height: 120upx;
				line-height: 120upx;
				color: #333;
				text-align: center;
				font-size: 36upx;
			}
			.active{
				background: $shop-color;
				color: #fff;
			}
		}
		
		.right{
			height: 100%;
			width: 520upx;
			margin: 10upx auto;
			.item{
				image{
					width: 520upx;
					height: 520upx;
					border-radius: 5upx;
				}
				text{
					font-size: 30upx;
					line-height: 60upx;
				}
			}
		}
	}
</style>
