/**鱼*/
function Fish(className, speedX, speedY, translateX, translateY, rotate, swingParams, deathSwingParams, width, height, hobby, score) {
	/**鱼的dom对象*/
	this.ele = null;
	/**鱼的className*/
	this.className = className;
	/**在x轴移动的速度*/
	this.speedX = speedX;
	/**在y轴移动的速度*/
	this.speedY = speedY;
	/**最后定格的x方向的移动距离*/
	this.translateX = translateX;
	/**最后定格的y方向的移动距离*/
	this.translateY = translateY;
	/**最后定格的头的移动距离*/
	this.transformTranslate = 0;
	/**最后定格的头的旋转角度*/
	this.transformRotate = 0;
	/**每次需要旋转的角度*/
	this.rotate = rotate;
	/**最后定下来的角度*/
	this.rotation = 0;
	/**鱼摆动的参数*/
	this.swingParams = swingParams;
	/**鱼死亡的时候的摆动参数*/
	this.deathSwingParams = deathSwingParams;

	/**鱼的摆动参数计数器*/
	this.swingIndex = 0;
	/**鱼的宽度*/
	this.width = width;
	/*鱼的高度*/
	this.height = height;
	/**x轴坐标*/
	this.x = 0;
	/**y轴坐标*/
	this.y = 0;
	/**小鱼的喜好*/
	this.hobby = hobby; //0代表向上，1代表向下，2代表中间
	/**小鱼从左边出来*/
	this.outFromLeft = true;
	/**小鱼的分数*/
	this.score = score;
}
/**初始化*/
Fish.prototype.init = function() {
	this.ele = document.createElement("div");
	this.ele.setAttribute("class", this.className);
	this.translateX = this.translateX; //初始化的时候是身长
	this.translateY = this.translateY + 400 * Math.random();
	//可能从左边出来
	if(Math.random() > 0.5) {
		this.outFromLeft = false;
		this.translateX = 1024;
		this.rotation = 180;
	}
	//确定坐标
	this.x = this.width / 2 + this.translateX;
	this.y = this.height / 2 + this.translateY;
	//添加到容器
	document.getElementById("container").appendChild(this.ele);
}
/**改变鱼头的角度*/
Fish.prototype.changeDegree = function() {
	var executeAdd = 0.5;
	if(this.hobby == 0) executeAdd = 0.8;
	if(this.hobby == 1) executeAdd = 0.2;
	//Math.random()是0-1之间的随机数
	if(Math.random() > 0.98) {
		if(Math.random() > executeAdd) { //执行加法
			var finalRotate = this.rotation + this.rotate;
			if(finalRotate < (this.outFromLeft ? 90 : 270)) this.rotation += this.rotate; //不能超过90度
		} else { //执行减法
			var finalRotate = this.rotation - this.rotate;
			if(finalRotate > (this.outFromLeft ? -90 : 90)) this.rotation -= this.rotate; //不能超过-90度
		}
	}
	//确定鱼头的方向
	this.transformRotate = "rotate(" + this.rotation + "deg)";
}
/**改变移动的方向*/
Fish.prototype.changeDirection = function() {
	var speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
	if(this.outFromLeft) {
		this.speedX = speed * Math.cos(this.rotation / 180 * Math.PI);
		this.speedY = speed * Math.sin(this.rotation / 180 * Math.PI);
	} else {
		if(this.rotation > 180) { //如果大于180
			this.speedX = speed * Math.cos((this.rotation - 180) / 180 * Math.PI);
			this.speedY = speed * Math.sin((this.rotation - 180) / 180 * Math.PI);
			if(this.speedY > 0) this.speedY = -this.speedY; //保证往上走
		} else { //如果小于180
			this.speedX = speed * Math.sin((this.rotation - 90) / 180 * Math.PI);
			this.speedY = speed * Math.cos((this.rotation - 90) / 180 * Math.PI);
		}
		if(this.speedX > 0) this.speedX = -this.speedX; //保证往左走
	}

	this.translateX += this.speedX;
	this.translateY += this.speedY;
	this.transformTranslate = "translate(" + this.translateX + "px, " + this.translateY + "px)";
}
/**移动*/
Fish.prototype.move = function() {
	//确定坐标
	this.x = this.width / 2 + this.translateX;
	this.y = this.height / 2 + this.translateY;
	//移动鱼
	this.ele.style.transform = this.transformTranslate + " " + this.transformRotate;
}
/**摆动*/
Fish.prototype.swing = function() {
	this.swingIndex++;
	if(this.swingIndex === this.swingParams.length) this.swingIndex = 0;
	this.ele.style.backgroundPosition = "-6px " + this.swingParams[this.swingIndex] + "px";
}
/**删除小鱼*/
Fish.prototype.remove = function() {
	document.getElementById("container").removeChild(this.ele);
}
Fish.prototype.death = function() {
	var fish = this;
	var index = 0;
	var death = setInterval(function() {
		if(fish.deathSwingParams.length == index) {
			clearInterval(death);
			fish.remove();
			return; //立即结束该函数并且返回一个值
		}
		fish.ele.style.backgroundPosition = "-6px " + fish.deathSwingParams[index] + "px";
		index++;
	}, 100);
}