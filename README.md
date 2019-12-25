# 裁剪图片（含部分后台）
1. 使用 cropper.js 编写的修改图片，截取图片的具体前台操作
2. 弹出框使用的 layer 的弹出框
3. 按钮部分使用了 [element UI](https://element.eleme.cn/#/zh-CN/component/installation "element UI 官网") 的按钮 

## 代码：
使用crooper.js 需要设置好裁剪参数
```js
var property = {
	//裁剪区域宽高比例
	aspectRatio: 1 / 1,
	//视图模式, 0:裁剪区域可以移动到图片区域外,1: 裁剪区域只能在图片区域内移动,2 图片不铺满整个最外层区域,3 图片铺满整个最外层区域
	viewMode:1,
	crop: function (e) {
		console.log(e.detail);
	},
	//设置预览图
	preview:".small",
	//是否可以移动后面的图片,默认为true,可移动
	movable:false,
	//是否显示图片背后的背景底
	//background:false,
	//定义默认裁剪框相对于图片的百分比大小,默认0.8
	autoCropArea:0.8,
	//裁剪框最小宽高
	minCropBoxWidth:10,
	minCropBoxHeight:10
}
```
avatr.js中'<img id="showImage" src="">' 是用来存储和展示选择的图片的元素    

创建cropper对象
```js
//image 就是存储图片的元素对象
var cropper = new Cropper(image,property);
```

定义一个input 用来触发选择图片  
`var fileInput = $("#imgInput")[0]`

剩下的就是上传图片到后台，我这里使用的是将图片转换成base64传递给后台。
不过我这里的后台处理没有存储到数据库中，直接存放到内存中，如果有需要存储数据库，或者服务器上的需求就自行修改啦。

### 示例图片
![图片](https://note.youdao.com/yws/public/resource/88794c411f68a1e039f9311f5df4af61/xmlnote/9B4C93406E0F4371A61DE0EF282E4F24/2635)  
![图片2](https://note.youdao.com/yws/public/resource/88794c411f68a1e039f9311f5df4af61/xmlnote/09A147489637497380227BC357B4A2A0/2640)  




