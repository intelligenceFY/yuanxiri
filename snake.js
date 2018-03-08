var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var s = 600;

//定义初始蛇的长度
var snakeCount = 4;
//定义数组装蛇的每个部位
var snakes = [];
//定义初始化食物的x y
var foodX = 0;
var foodY = 0;
//定义初始移动的方向
var toGO = 4;

//绘画方法
function draw(){
	//绘画网格
	for(var i = 0; i < s; i += 40)
	{
		ctx.strokeStyle = "pink";
		ctx.lineWidth = "1";
		ctx.moveTo(0,i+40);
		ctx.lineTo(s,i+40);
		//行的绘画
		ctx.moveTo(i+40,0);
		ctx.lineTo(i+40,s);
		//列的绘画
		ctx.stroke();
	}
	//绘画蛇身
	for(var i = 0; i < snakeCount; i++)
	{
		ctx.beginPath();
		ctx.strokeStyle = "pink";
		ctx.fillRect(snakes[i].x,snakes[i].y,40,40);
		ctx.moveTo(snakes[i].x,snakes[i].y);
		ctx.lineTo(snakes[i].x+40,snakes[i].y);
		ctx.lineTo(snakes[i].x+40,snakes[i].y+40);
		ctx.lineTo(snakes[i].x,snakes[i].y+40);
		ctx.lineTo(snakes[i].x,snakes[i].y);
		ctx.stroke();
	}
	//绘画食物
	ctx.fillRect(foodX,foodY,40,40);
};

//定义蛇的位置
function start(){
	for(var i = 0; i < snakeCount; i++)
	{
		snakes[i] = {x:i*40,y:0};
	}
	addFood();
	draw();
};

//添加食物
function addFood(){
	foodX = Math.floor(Math.random()*15)*40;
	foodY = Math.floor(Math.random()*15)*40;
};

//移动蛇身且改变方向且吃食物
function move(){
	switch(toGO){
		case 1:
				snakes.push({x:snakes[snakeCount-1].x-40,y:snakes[snakeCount-1].y})
				break;
		case 2:
				snakes.push({x:snakes[snakeCount-1].x,y:snakes[snakeCount-1].y-40})
				break;
		case 3:
				snakes.push({x:snakes[snakeCount-1].x+40,y:snakes[snakeCount-1].y})
				break;
		case 4:
				snakes.push({x:snakes[snakeCount-1].x,y:snakes[snakeCount-1].y+40})
				break;
	}
	//在画布中抹除第一个元素
	ctx.clearRect(0,0,600,600);
	//在内存中删除第一个元素，解决数组越界问题
	snakes.shift();
	isEat();
	isDead();
	draw();
};

//吃食物添加蛇的长度且添加数组的长度
function isEat(){
	if(snakes[snakeCount-1].x == foodX && snakes[snakeCount-1].y == foodY)
	{
		addFood();
		snakeCount++;
		snakes.unshift({x:-40,y:-40})
	}
}

//游戏规则
function isDead(){
	//判断边界
	if(snakes[snakeCount-1].x > 560 || snakes[snakeCount-1].y > 560 || snakes[snakeCount-1].x < 0 || snakes[snakeCount-1].y < 0)
	{
		alert("game over");
		window.location.reload();
	}
};

//绑定键盘
function keyDowm(e){
	switch(e.keyCode)
	{
		case 37:
				toGO = 1;
				break;
		case 38:
				toGO = 2;
				break;
		case 39:
				toGO = 3;
				break;
		case 40:
				toGO = 4;
				break;
	}
};

window.onload = function(){
	start();
	
};	

function btnStart(){
	setInterval(move,250);
	document.onkeydown = function(e){
		var e = e || window.event; 
		keyDowm(e);
	};
};

function reStart(){
	window.location.reload();
};
