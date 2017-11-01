function Net(className, translateX, translateY, width, height) {
	this.ele = null;
	this.className = className;
	this.translateX = translateX;
	this.translateY = translateY;
	this.trasformTranslate = "";
	this.swingIndex = 0;
	this.width = width;
	this.height = height;
}
/**��ʼ������*/
Net.prototype.init = function(fishWidth, fishHeight, outFromLeft) {
	this.ele = document.createElement("div");
	this.ele.setAttribute("class", this.className);
	if(outFromLeft) this.trasformTranslate = "translate(" + (this.translateX - (this.width / 2) - (fishWidth / 2)) + "px, " + (this.translateY - (this.height / 2) - (fishHeight / 2)) + "px)";
	else this.trasformTranslate = "translate(" + (this.translateX - (this.width / 2)) + "px, " + (this.translateY - (this.height / 2)) + "px)";
	//this.trasformTranslate = "translate(" + this.translateX + "px, " + this.translateY + "px)";
	this.ele.style.transform = this.trasformTranslate;
	document.getElementById("container").appendChild(this.ele);
}
/**ɾ������*/
Net.prototype.destory = function() {
	document.getElementById("container").removeChild(this.ele);
}