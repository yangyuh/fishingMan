/**子弹*/
function Bullet(bulletCategory, width, height, speedX, speedY, translateX, translateY, rotation) {
  /**子弹的dom对象*/
  this.ele = null;
  /**子弹模板*/
  this.bulletCategory = bulletCategory;
  /**子弹宽度*/
  this.width = width;
  /**子弹高度*/
  this.height = height;
  /**子弹x轴坐标*/
  this.x = 0;
  /**子弹y轴坐标*/
  this.y = 0;

  /**x轴方向速度*/
  this.speedX = speedX;
  /**y轴方向速度*/
  this.speedY = speedY;

  /**最后定格的x方向的移动距离*/
  this.translateX = translateX;
  /**最后定格的y方向的移动距离*/
  this.translateY = translateY;
  /**最后定格的头的移动距离*/
  this.transformTranslate = "";
  /**转动角度*/
  this.rotation = rotation;
  /**最后定格的头的旋转角度*/
  this.transformRotate = "";
}


Bullet.prototype = {
  constructor: Bullet,
  /**初始化*/
  init: function() {
    this.ele = document.createElement("div");
    this.ele.setAttribute("class", this.bulletCategory.className);
    //this.translateX = 543;
    //this.translateY = 585;
    this.transformTranslate = "translate(" + this.translateX + "px, " + this.translateY + "px)";
    this.transformRotate = "rotate(" + this.rotation + "deg)";
    this.ele.style.transform = this.transformTranslate + " " + this.transformRotate;
    document.getElementById("container").appendChild(this.ele);
    //初始化坐标
    this.x = this.translateX + this.width / 2;
    this.y = this.translateY + this.height / 2;
  },
  /**调整方向*/
  changeDirection: function(rotation) {
    this.rotation = rotation;
    this.transformRotate = "rotate(" + this.rotation + "deg)";
    this.ele.style.transform = this.transformTranslate + " " + this.transformRotate;
  },
  /**子弹移动*/
  move: function() {
    //获取速度
    var speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
    //计算x和y轴上的速度
    this.speedX = speed * Math.sin(this.rotation / 180 * Math.PI);
    this.speedY = -Math.abs(speed * Math.cos(this.rotation / 180 * Math.PI));
    //累计运动距离
    this.translateX += this.speedX;
    this.translateY += this.speedY;
    //改变移动的距离
    this.transformTranslate = "translate(" + this.translateX + "px, " + this.translateY + "px)";
    //移动
    this.ele.style.transform = this.transformTranslate + " " + this.transformRotate;
    //改变坐标
    this.x = this.translateX + this.width / 2;
    this.y = this.translateY + this.height / 2;
  },
  /**移除子弹*/
  remove: function() {
    document.getElementById("container").removeChild(this.ele);
  }
}