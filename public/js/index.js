var index = {
	init: function() {
		this.initPage();
		this.initEvent();
		this.initWidget();
	},
	initPage: function() {
		this.createFishesCategory();
		this.createCannonCategory();
		this.createBulletsCategory();
		this.createCoinCategory();
		this.createNetCategory();
		this.initTotalScorePanel();
		this.createCannon();
		this.changeCannon();
		var index = this;
		var counter = 0;
		var bulletCounter = {
			count: 1
		};
		setInterval(function() {
			counter++;
			index.createBullet(bulletCounter); //创建子弹
			index.bulletsMove(); //自动子弹
			index.removeBullets(); //出界删除子弹
			index.createFishes(counter); //创建小鱼
			index.fishesMove(counter); //移动小鱼
			index.removeFishes(); //出界删除小鱼
			index.impactDeal(); //处理碰撞
			index.swingCoins(counter);
			if(counter % 10000 === 0) counter = 0;
		}, 1);
	},
	initEvent: function() {
		this.bindClickScreenEvent(); //点击屏幕发射子弹事件
		this.bindIncreaseCannonSizeEvent(); //点击加号变大炮台
		this.bindReduceCannonSizeEvent(); //点击减号变小炮台
	},
	initWidget: function() {},
	pointParams: [-1, -37, -74, -109, -144, -181, -217, -252, -289, -325],
	totalParams: [-219, -195, -171, -147, -123, -99, -75, -51, -27, -3],
	total: 10951,
	fishesCategory: null,
	cannonsCategory: null,
	bulletsCategory: null,
	coinCategory: null,
	netCategory: null,
	fishes: [], //游动的鱼
	emittedBullets: [], //已发射的子弹
	coins: [], //出现的金币
	nets: [], //出现的渔网
	cannon: null, //炮台
	totalPanelEle: null,
	createFishesCategory: function() {
		var index = this;
		$.ajax({
			async: false, //true异步，false是同步
			type: "get", //指定请求的方式：get/get
			url: "config/fishesCategory.json", //指定请求的文件
			dataType: "json", //指定数据返回的格式
			success: function(data) {
				console.log(data)
				index.fishesCategory = data;
			}
		});
	},
	createCannonCategory: function() {
		var index = this;
		$.ajax({
			async: false,
			type: "get",
			url: "config/cannonsCategory.json",
			dataType: "json",
			success: function(data) {
				index.cannonsCategory = data;
			}
		});
	},
	createBulletsCategory: function() {
		var index = this;
		$.ajax({
			async: false,
			type: "get",
			url: "config/bulletsCategory.json",
			dataType: "json",
			success: function(data) {
				index.bulletsCategory = data;
			}
		});
	},
	createCoinCategory: function() {
		var index = this;
		$.ajax({
			async: false,
			type: "get",
			url: "config/coinCategory.json",
			dataType: "json",
			success: function(data) {
				index.coinCategory = data;
			}
		});
	},
	createNetCategory: function() {
		var index = this;
		$.ajax({
			async: false,
			type: "get",
			url: "config/netsCategory.json",
			dataType: "json",
			success: function(data) {
				index.netsCategory = data;
			}
		});
	},
	initTotalScorePanel: function() {
		this.totalPanelEle = document.getElementById("totalPanel");
		this.flushTotal();
	},
	flushTotal: function() {
		var liEles = this.totalPanelEle.children;
		//把数字变成字符串
		var totalStr = this.total + "";
		var i = 0,
			len = totalStr.length;
		for(; i < 6 - len; i++) {
			totalStr = "0" + totalStr;
		}
		//010000
		for(i = 0; i < totalStr.length; i++) {
			liEles[i].style.backgroundPosition = "-1px " + this.totalParams[totalStr[i]] + "px";
		}
	},
	createFishes: function(counter) {
		var fishCategory = this.fishesCategory[Math.floor(this.fishesCategory.length * Math.random())];
		var className = fishCategory.className;
		var fishWidth = fishCategory.width;
		var fishHeight = fishCategory.height;
		var rotateDgreePerTimes = fishCategory.rotateDegree;
		var swingParams = fishCategory.swingParams;
		var deathParams = fishCategory.death;
		var generateWeight = fishCategory.generateWeight;
		var hobby = Math.floor(3 * Math.random());
		var score = fishCategory.score;
		if(counter % (10000 / generateWeight) === 0) {
			var fish = new Fish(className, 2, 0, -fishWidth, 100, rotateDgreePerTimes, swingParams, deathParams, fishWidth, fishHeight, hobby, score);
			fish.init();
			this.fishes.push(fish);
		}
	},
	fishesMove: function(counter) {
		var fishes = this.fishes;
		for(var i = 0; i < fishes.length; i++) {
			if(counter % 10 === 0) {
				fishes[i].changeDegree();
				fishes[i].changeDirection();
				fishes[i].move();
			}
			if(counter % 20 === 0) fishes[i].swing();
		}
	},
	removeFishes: function() {
		for(var i = 0; i < index.fishes.length; i++) {
			var fish = index.fishes[i];
			var maxLength = Math.sqrt((fish.width / 2) * (fish.width / 2) + (fish.height / 2) * (fish.height / 2));
			if((fish.x + maxLength < 0) || (fish.x - maxLength > 1024) || (fish.y + maxLength < 0) || (fish.y - maxLength > 614.4)) {
				fish.remove();
				index.fishes.splice(i, 1);
			}
		}
	},
	/**点击加减号按钮改变按钮的样式*/
	changeCannon: function() {
		var lowerEle = document.getElementById("minus");
		var cannonEle = document.getElementById("cannon1");
		var plusEle = document.getElementById("plus");
		var imgSrcArr = [1, 2, 3, 4, 5, 6, 7];
		/**子弹*/
		var bulletEle = document.getElementById("bullet1");

		// 点击减号按钮变化按钮背景图片
		plusEle.onmousedown = function() {
			plusEle.style.backgroundImage = "url(images/cannon_plus_down.png)";
		}
		plusEle.onmouseup = function() {
			plusEle.style.backgroundImage = "url(images/cannon_plus.png)";
		}

		// 点击减号按钮变化按钮背景图片
		lowerEle.onmousedown = function() {
			lowerEle.style.backgroundImage = "url(images/cannon_minus_down.png)";
		}
		lowerEle.onmouseup = function() {
			lowerEle.style.backgroundImage = "url(images/cannon_minus.png)";
		}
	},
	createCannon: function() {
		this.cannon = new Cannon(517, this.cannonsCategory.cannon1.bottom, this.cannonsCategory.cannon1, this.bulletsCategory.bullet1);
		this.cannon.init();
	},
	bindClickScreenEvent: function() {
		var index = this;
		document.getElementById("panel").onclick = function(event) {
			var eventObj = event || window.event;
			var sx = eventObj.offsetX - 554;
			var sy = 610 - eventObj.offsetY;
			var radian = Math.atan(sx / sy);
			//炮台转向
			index.cannon.changeDirection(radian / Math.PI * 180);
			//发射子弹
			if(index.cannon.hasBullet) {
				index.total -= index.cannon.bulletCategory.score; //扣分
				index.flushTotal(); //刷新分数
				index.cannon.action(); //子弹摆动
				var emittedBullet = index.cannon.fire(); //发射子弹
				index.emittedBullets.push(emittedBullet); //把子弹放入已发射子弹的数组
				index.cannon.removeBullet(); //清空膛内子弹
			}
		}
	},
	createBullet: function(bulletCounter) {
		if(!this.cannon.hasBullet) { //炮台没有上膛
			bulletCounter.count++;
			if(bulletCounter.count % 100 === 0) { //每隔0.1秒生成一个子弹
				this.cannon.generateBullet(); //生成子弹
				bulletCounter.count = 1; //还原
			}
		}
	},
	bulletsMove: function() {
		var bullets = this.emittedBullets;
		for(var i = 0; i < bullets.length; i++) {
			bullets[i].move();
		}
	},
	removeBullets: function() {
		var bullets = this.emittedBullets;
		for(var i = 0; i < bullets.length; i++) {
			var bullet = bullets[i];
			var halfDiagonal = Math.sqrt((bullet.width / 2) * (bullet.width / 2) + (bullet.height / 2) * (bullet.height / 2));
			if((bullet.x + halfDiagonal < 0) || (bullet.x - halfDiagonal > 1024) || (bullet.y + halfDiagonal < 0) || (bullet.y - halfDiagonal > 614.4)) {
				bullet.remove();
				bullets.splice(i, 1);
			}
		}
	},
	/**增加加农炮的火力*/
	bindIncreaseCannonSizeEvent: function() {
		var index = this;
		document.getElementById("plus").onclick = function() {
			var cannon = index.cannon;
			var className = cannon.cannonCategory.className;
			var degree = cannon.rotation; //获取当前炮台方向
			var num = className.substring(className.length - 1, className.length); //获取炮台数字
			//if (num !== 7) num = 7;
			if(num < className.length) {
				num++;
			} else {
				num = 1;
			}
			//摧毁大炮
			index.cannon.destory();
			//创建新的炮台
			index.cannon = new Cannon(517, index.cannonsCategory["cannon" + num].bottom, index.cannonsCategory["cannon" + num], index.bulletsCategory["bullet" + num]);
			//初始化新的炮台
			index.cannon.init();
			//改变炮台方向
			index.cannon.changeDirection(degree);
		};
	},
	/**减小加农炮的火力*/
	bindReduceCannonSizeEvent: function() {
		var index = this;
		document.getElementById("minus").onclick = function() {
			var cannon = index.cannon;
			var className = cannon.cannonCategory.className;
			var degree = cannon.rotation; //获取当前炮台方向
			var num = className.substring(className.length - 1, className.length); //获取炮台数字
			if(num > 0) {
				num--;
				if(num == 0) {
					num = 7;
				}
			}
			//摧毁大炮
			index.cannon.destory();
			//创建新的炮台
			index.cannon = new Cannon(517, index.cannonsCategory["cannon" + num].bottom, index.cannonsCategory["cannon" + num], index.bulletsCategory["bullet" + num]);
			//初始化新的炮台
			index.cannon.init();
			//改变炮台方向
			index.cannon.changeDirection(degree);
		};
	},
	impactDeal: function() {
		var index = this;
		var bullets = this.emittedBullets;
		var fishes = this.fishes;
		for(var i = 0; i < bullets.length; i++) {
			var bullet = bullets[i];
			var bulletRadius = bullet.width > bullet.height ? bullet.height / 2 : bullet.width / 2;
			for(var j = 0; j < fishes.length; j++) {
				var fish = fishes[j];
				var fishRadius = fish.width > fish.height ? fish.height / 2 : fish.width / 2;
				var distanceCenter = Math.sqrt((bullet.x - fish.x) * (bullet.x - fish.x) + (bullet.y - fish.y) * (bullet.y - fish.y));
				var distanceRadius = bulletRadius + fishRadius;
				if(distanceCenter < distanceRadius) {
					//积分
					index.total += fish.score;
					//改变面板的分数
					index.flushTotal();
					//出现金币
					index.showPoint(fish.score, fish.x, fish.y);
					//出现分数
					index.showGetPoint(fish.score, fish.x, fish.y);
					//出现网
					var num = bullet.bulletCategory.className.slice(bullet.bulletCategory.className.length - 1);
					index.showNet(bullet.x, bullet.y, num, fish.width, fish.height, fish.outFromLeft);
					//删除子弹
					bullet.remove();
					index.emittedBullets.splice(i, 1);
					//删除鱼
					//fish.remove();
					index.fishes.splice(j, 1);
					fish.death();
					break;
				}
			}
		}
	},
	showPoint: function(fishScore, fishX, fishY) {
		var index = this;
		var coinCategory = this.coinCategory.goldCoin;
		if(fishScore < 20) {
			coinCategory = this.coinCategory.silverCoin;
		}
		var coin = new Coin(fishX, fishY, coinCategory);
		this.coins.push(coin);
		var len = this.coins.length;
		coin.init();
		setTimeout(function() {
			coin.move();
			setTimeout(function() {
				coin.destory();
				index.coins.splice(len - 1, 1);
			}, 1000);
		}, 100);
	},
	showNet: function(bulletX, bulletY, index, fishWidth, fishHeight, outFromLeft) {
		var className = this.netsCategory["web" + index].className;
		var net = new Net(className, bulletX, bulletY, this.netsCategory["web" + index].width, this.netsCategory["web" + index].height);
		net.init(fishWidth, fishHeight, outFromLeft);
		//this.nets.push(net);
		setTimeout(function() {
			net.destory();
		}, 300);
	},
	swingCoins: function(counter) {
		if(counter % 10 == 0) {
			for(var i = 0; i < this.coins.length; i++) {
				this.coins[i].swing();
			}
		}
	},
	showGetPoint: function(score, x, y) {
		var scoreStr = score + ""; //100
		var getPointPanelEle = document.createElement("ul");
		getPointPanelEle.setAttribute("class", "get-point-panel");
		var xEle = document.createElement("li");
		xEle.setAttribute("class", "point");
		xEle.style.backgroundPosition = "-360px, 0px";
		getPointPanelEle.appendChild(xEle);
		document.getElementById("container").appendChild(getPointPanelEle);
		for(var i = 0; i < scoreStr.length; i++) {
			var pointEle = document.createElement("li");
			pointEle.setAttribute("class", "point");
			pointEle.style.backgroundPosition = this.pointParams[scoreStr[i]] + "px, 0px";
			getPointPanelEle.appendChild(pointEle);
		}
		getPointPanelEle.style.transform = "translate(" + x + "px, " + y + "px)";
		setTimeout(function() {
			getPointPanelEle.style.transform = "translate(" + x + "px, " + (y - 100) + "px)";
			setTimeout(function() {
				document.getElementById("container").removeChild(getPointPanelEle);
			}, 500);
		}, 200);
	}
}
index.init();