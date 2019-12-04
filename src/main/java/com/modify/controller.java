package com.modify;

import java.util.Base64;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class controller {

	static byte[] img = null; 
	static String imgSuffix = "";
	
	/**
	 * 上传图片
	 * @param base64Data
	 * @return
	 */
	@PostMapping("uploadImg")
	public int uploadImg(@RequestParam("base64Data") String base64Data) {
		//上传失败，图片数据不存在！
		if("".equals(base64Data)) {
    		return -1;
    	}
    	String [] msg = base64Data.split("base64,");
    	String type = msg[0].substring(msg[0].lastIndexOf("/")+1);
    	//文件后缀
    	String suffix ="";
    	if(type.equals("jpeg;")) {
    		suffix = "jpg";
    	}else if(type.equals("png;")) {
    		suffix = "png";
    	}else {
    		//上传失败，图片格式不合法
    		return -2;
    	}
    	//后缀保存在内存中
    	imgSuffix = suffix;
    	//解码
    	byte[] imgBytes = Base64.getDecoder().decode(msg[1]);
    	//存储数据库 或 直接保存在服务器上（我这里就直接保存内存中）
    	img = imgBytes;
    	
    	return 0;
	}
	
	 /**
     * 	获取base64格式图片
     * @param imgId
     * @return
     */
    @GetMapping("getAvatar")
    public String findAvatar() {
    	//从数据库或服务器获取图片
    	byte [] imgbytes = img;
    	//base64编码
    	String beforeStr = "data:image/";
    	//这里会有很多种格式，这里只做两种的
    	if(imgSuffix.equals("jpg")) {
    		beforeStr+="jpeg;base64,";
    	}else if(imgSuffix.equals("png")) {
    		beforeStr+="png;base64,";
    	}
    	String base64  = beforeStr+Base64.getEncoder().encodeToString(imgbytes);
    	
    	return base64;
    }
}
