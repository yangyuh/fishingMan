function Coin(translateX, translateY, coinCategory) {
  this.ele = null;
  this.coinCategory = coinCategory;
  this.translateX = translateX;
  this.translateY = translateY;
  this.trasformTranslate = "";
  this.swingIndex = 0;
}



Coin.prototype = {
  constructor: Coin,
  /**初始化*/
  init: function() {
    this.ele = document.createElement("div");
    this.ele.setAttribute("class", this.coinCategory.className);
    this.trasformTranslate = "translate(" + this.translateX + "px, " + this.translateY + "px)";
    this.ele.style.transform = this.trasformTranslate;
    document.getElementById("container").appendChild(this.ele);
  },
  /**摆动*/
  swing: function() {
    if (this.swingIndex == this.coinCategory.swingParams.length) this.swingIndex = 0;
    var swingParams = this.coinCategory.swingParams;
    this.ele.style.backgroundPosition = "0px " + swingParams[this.swingIndex] + "px";
    this.swingIndex++;
  },
  /**移动*/
  move: function() {
    this.trasformTranslate = "translate(170px, 550px)";
    this.ele.style.transform = this.trasformTranslate;
  },
  /**销毁*/
  destory: function() {
    document.getElementById("container").removeChild(this.ele);
  }
}