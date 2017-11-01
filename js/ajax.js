var $ = {
	xhr: null,
	createXMLHttpRequest: function() {
		if(window.XMLHttpRequest) { //DOM2规范浏览器
			$.xhr = new XMLHttpRequest();
		} else { //IE浏览器
			$.xhr = new ActiveXObject("Microsoft.XMLHTTP");
			var MSXML = ["MSXML2.XMLHTTP.6.0",
				"MSXML2.XMLHTTP.5.0",
				"MSXML2.XMLHTTP.4.0",
				"MSXML2.XMLHTTP.3.0",
				"MSXML2.XMLHTTP",
				"Microsoft.XMLHTTP"
			];
			for(var i = 0; i < MSXML.length; i++) {
				try {
					$.xhr = new ActiveXObject(MSXML[i]);
					break;
				} catch(e) {}
			}
		}
	},
	ajax: function(options) {
		//创建一个xhr
		$.createXMLHttpRequest();
		//打开连接
		$.xhr.open(options.type.toUpperCase(), options.url, options.async == null ? true : options.async);
		//设置回调函数
		$.xhr.onreadystatechange = function() {
			if(($.xhr.status === 200 || $.xhr.status === 304) && $.xhr.readyState === 4) {
				var data = $.xhr.responseText;
				if(options.dataType === "json") {
					data = JSON.parse(data); //把json字符串变为真正的json对象
				}
				options.success(data);
			}
		}
		//发送请求
		if(options.type.toUpperCase() === "POST") {
			$.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			var params = "";
			for(var identity in options.data) {
				params += identity + "=" + options.data[identity] + "&";
			}
			params = params === "" ? "" : params.slice(0, -1);
			$.xhr.send(params);
		} else {
			$.xhr.send(null);
		}
	}
}