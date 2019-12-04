//裁剪参数
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
//获取图片的html元素
var image = $("#showImage")[0];//document.getElementById('showImage');
//cropeer对象
var cropper = new Cropper(image,property);

//获取具体执行的input的html
var fileInput = $("#imgInput")[0];//document.getElementById("imgInput");//document.querySelector('input[type=file]');
//监听input重选事件
fileInput.addEventListener('change', function () {
	var file = this.files[0];
	var reader = new FileReader();
	// 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
	reader.addEventListener("load", function () {
		//重新加载图片
		replaceImg(reader.result);
		//调整页面格式
		$("#outsideDiv").attr("class","box left");
		$("#outsideDiv").attr("onclick","");
		$(".initialChooseDiv").css("display","none");
		//显示右侧区域
		vm.haveImg = true;
	}, false);
	// 调用reader.readAsDataURL()方法，把图片转成base64
	reader.readAsDataURL(file);
}, false);

//替换新的图片
function replaceImg(img){
	//true 图像的比例会发生变化自适应父盒子的大小
	cropper.replace(img,false)
} 

//旋转
function rotateImg(direction){
	//基于现在的位置 转多少度
	if(direction=="left"){
		cropper.rotate(-45);
	}if(direction=="right"){
		//angle =angle + 45;
		cropper.rotate(45);
	}
}
//获取最后裁剪的信息
function getFinalImgInfo(){
	//获取图片后缀
	var type = cropper.url.substring(cropper.url.lastIndexOf(".")+1);
	
	var canvas = cropper.getCroppedCanvas();
	//转成base64码
	var base64Url;
	if(type=="jpg"||type=="jpeg"){
		base64Url = canvas.toDataURL("image/jpeg");
	}else{
		base64Url = canvas.toDataURL();
	}
	
	//将base64格式图片传给后台
	$.ajax({
		url: '/uploadImg',
		type: 'POST',
		data: {
			base64Data:base64Url ,
		},
		success : function(r){
			//写自己的逻辑
			var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
			parent.vm.editAvatarBack();//调用上个页面的获取头像方法
			parent.layer.close(index);//关闭此窗口
		},
		error: function(e){}
	});
}
//打开弹框
function openInput(){
	$("#imgInput").click();
}
//这里用vue，是为了显示隐藏元素方便（毕竟用了elementUI了，都引用了vue）
//包括 按钮样式，也可以完全不使用 vue和elemeentUI
var vm = new Vue({
	el:'#imgContent',
	data:{
		haveImg:false
	}
})