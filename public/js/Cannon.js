/**加农炮*/
function Cannon(translateX, translateY, cannonCategory, bulletCategory) {
	/**加农炮的dom对象*/
	this.ele = null;
	/**加农炮模板*/
	this.cannonCategory = cannonCategory;
	/**子弹的模板*/
	this.bulletCategory = bulletCategory;
	/**上膛的子弹*/
	this.bullet = null;
	/**已上膛*/
	this.hasBullet = false;

	/**最后定格的x方向的移动距离*/
	this.translateX = translateX;
	/**最后定格的y方向的移动距离*/
	this.translateY = translateY;
	/**最后定格的头的移动距离*/
	this.transformTranslate = "";
	/**转动角度*/
	this.rotation = 0;
	/**最后定格的头的旋转角度*/
	this.transformRotate = "";

}
/**初始化加农炮*/
Cannon.prototype.init = function() {
	this.ele = document.createElement("div");
	this.ele.setAttribute("class", this.cannonCategory.className);
	this.transformTranslate = "translate(" + this.translateX + "px, " + this.translateY + "px)";
	this.transformRotate = "rotate(0deg)";
	this.ele.style.transform = this.transformTranslate + " " + this.transformRotate;
	document.getElementById("container").appendChild(this.ele);
}
/**加农炮旋转*/
Cannon.prototype.changeDirection = function(degree) {
	this.rotation = degree;
	this.transformRotate = "rotate(" + this.rotation + "deg)";
	this.ele.style.transform = this.transformTranslate + " " + this.transformRotate;
}
/**生成子弹*/
Cannon.prototype.generateBullet = function() {
	this.bullet = new Bullet(this.bulletCategory, this.bulletCategory.width, this.bulletCategory.height, 0, 2, this.bulletCategory.left, this.bulletCategory.bottom, this.rotation);
	this.bullet.init();
	this.hasBullet = true;
}
/**发射子弹*/
Cannon.prototype.fire = function() {
	//调整子弹方向
	if(this.hasBullet) this.bullet.changeDirection(this.rotation);
	//可上膛
	this.hasBullet = false;

	return this.bullet; //返回子弹
}
/**移除炮内的子弹*/
Cannon.prototype.removeBullet = function() {
	this.bullet = null;
}
/**摧毁炮台*/
Cannon.prototype.destory = function() {
	//移除子弹
	this.bullet.remove();
	this.bullet = null;
	//移除炮台
	document.getElementById("container").removeChild(this.ele);
}
/**炮台开炮的时候要动一下*/
Cannon.prototype.action = function() {
	var params = this.cannonCategory.actionParams;
	var index = 0;
	var cannon = this;
	var cannonActionTimer = setInterval(function() {
		if(index == params.length) {
			clearInterval(cannonActionTimer);
			return;
		}
		var bg = "url(\"images/" + cannon.cannonCategory.className + ".png\") 0px " + params[index] + "px no-repeat";
		cannon.ele.style.background = bg;
		index++;
	}, 100);
}