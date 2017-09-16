var window_width = 1024;
var window_height = 720;
var radius = 6;
var margin_top = 10;
var margin_left = 5;
var hours = 0;
var minutes = 0;
var seconds = 0;
var flag = 0;
var balls = [];
var colors = ["#0C0","#0F6","#9F6","#390","#096","#9C9","#0F9","#063","#9F0","#0C9","#CF9","#9C6","#3C6"];
window.onload = function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	/*页面载入时先获取下当前时间，否则刚进入页面时小时、分钟和秒数初始值都是零*/
	var now = new Date();
	hours = now.getHours();
	minutes = now.getMinutes();
	seconds = now.getSeconds();

	window_width = document.body.clientWidth || document.documentElement.clientWidth;
	window_height = document.body.clientHeight || document.documentElement.clientHeight;
	margin_top = window_height*0.3;
	margin_left = window_width*0.1;
	canvas.width = window_width*0.8;
	canvas.height = window_height*0.8;

	var timer = setInterval(function(){
		if(!document.hidden){
			update();
			render(context);

		}
	},50);

};

/*获取当前时间*/
function currentTime(){
	var curTime = new Date();
	hours = curTime.getHours();
	minutes = curTime.getMinutes();
	seconds = curTime.getSeconds();
	return [hours,minutes,seconds];
}

/*负责数据的改变*/
function update(){
	var beforeHours = hours;
	var beforeMinutes = minutes;
	var beforeSeconds = seconds;

	var nextTime = currentTime();
	var nextHours = currentTime()[0];
	var nextMinutes = currentTime()[1];
	var nextSeconds = currentTime()[2];

	/*判断一下，避免时间没到就触发生成小球动画*/
	if(parseInt(beforeSeconds%10) != parseInt(nextSeconds%10)){
		addBalls(93*(radius+1),0,parseInt(nextSeconds%10));
		//console.log(1);
	}
	if(parseInt(beforeSeconds/10) != parseInt(nextSeconds/10)){
		addBalls(78*(radius+1),0,parseInt(nextSeconds/10));
	}
	if(parseInt(beforeMinutes%10) != parseInt(nextMinutes%10)){
		addBalls(54*(radius+1),0,parseInt(nextMinutes%10));
	}
	if(parseInt(beforeMinutes/10) != parseInt(nextMinutes/10)){
		addBalls(39*(radius+1),0,parseInt(nextMinutes/10));
	}
	if(parseInt(beforeHours%10) != parseInt(nextHours%10)){
		addBalls(15*(radius+1),0,parseInt(nextHours%10));
	}
	if(parseInt(beforeHours/10) != parseInt(nextHours/10)){
		addBalls(0,0,parseInt(nextHours/10));
	}

	 updateBalls();
}

/*增加小球数量*/
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aball = {
					x : Number(margin_left+x+(2*j+1)*(radius+1)),
					y : Number(margin_top+y+(2*i+1)*(radius+1)),
					vx : Number(4*Math.pow(-1,parseInt(1000*Math.random()))),
					vy : -10,
					g : Number(2+3*Math.random().toFixed(1)),
					color : colors[Math.floor((colors.length)*Math.random())]
				};

				balls.push(aball);
			}
		}
	}
}

/*改变小球X,Y轴方向位置*/
function updateBalls(){
	for(var i=0;i<balls.length;i++){

		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g; 

		if(balls[i].y > canvas.height-radius){
			balls[i].y = canvas.height-radius;
			//速度反向，摩擦系数为0.5
			balls[i].vy = -balls[i].vy*0.5;
		}

		//当达到判定条件时，小球平滑滚到边缘
		if(balls[i].x <= 0.3*canvas.width){
			balls[i].y = canvas.height-radius;			
		}
	}

	/*判定小球是否在界内，如果在界内则保存在数组里*/
	var cnt = [];
	for(var j=0;j<balls.length;j++){
		if(balls[j].x+radius>0 && balls[j].x-radius<canvas.width){
			cnt.push(balls[j]);
		}
	}
	balls = cnt;

}

/*渲染出数字*/
function render(cxt){
	cxt.clearRect(0,0,window_width,window_height);

	renderDigit(0,0,parseInt(hours/10),cxt);
	renderDigit(15*(radius+1),0,parseInt(hours%10),cxt);
	renderDigit(30*(radius+1),0,10,cxt);
	renderDigit(39*(radius+1),0,parseInt(minutes/10),cxt);
	renderDigit(54*(radius+1),0,parseInt(minutes%10),cxt);
	renderDigit(69*(radius+1),0,10,cxt);
	renderDigit(78*(radius+1),0,parseInt(seconds/10),cxt);
	renderDigit(93*(radius+1),0,parseInt(seconds%10),cxt);

	renderBalls(cxt);
}

/*把每个小球渲染到页面*/
function renderBalls(cxt){
	for(var i=0;i<balls.length;i++){
		cxt.beginPath();
		cxt.fillStyle = balls[i].color;
		cxt.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI,false);
		cxt.closePath();
		cxt.fill();
	}
}

/*改变生成小球的位置*/
function renderDigit(x,y,num,cxt){

	cxt.fillStyle = "#303";

	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){

				cxt.beginPath();
				cxt.arc(margin_left+x+(2*j+1)*(radius+1),margin_top+y+(2*i+1)*(radius+1),radius,0,Math.PI*2,false);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}