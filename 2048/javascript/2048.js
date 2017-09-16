var board=new Array();
var score=0;
var hasConflicted=[];//记录是否发生过合并

var startx=0,starty=0;
var endx=0,endy=0;


$(document).ready(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile(){
	if(documentWidth>500)
	{
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}
	$("#grid-container").css("width",gridContainerWidth-2*cellSpace);
	$("#grid-container").css("height",gridContainerWidth-2*cellSpace);
	$("#grid-container").css("padding",cellSpace);
	$("#grid-container").css("border-radius",0.02*gridContainerWidth);

	$(".grid-cell").css("width",cellSideLength);
	$(".grid-cell").css("height",cellSideLength);
	$(".grid-cell").css("border-radius",0.02*gridContainerWidth);
}

function newgame(){
	//初始化棋盘格
	init();

	//在随机两个格子中生成数字
	generateOneNumber();
	generateOneNumber();
}

//初始化
function init(){
	//先画出gridcell
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			var girdCell=$("#grid-cell-"+i+"-"+j);
			girdCell.css("top",getPosTop(i,j));
			girdCell.css("left",getPosLeft(i,j));
		}
	}

	//给board赋值
	for(var i=0;i<4;i++)
	{
		board[i]=[];
		hasConflicted[i]=[];
		for(var j=0;j<4;j++)
		{
			//先给每个board赋值0，不显示
			board[i][j]=0;
			hasConflicted[i][j]=false;//没有合并
		}
	}
	//根据board的值 ，对numbercell进行操作
	updateBoardView();

	score=0;
}

//根据board的值，对numbercell进行操作
//动态添加numbercell
function updateBoardView(){
	$(".number-cell").remove();
	var txt=[];
	for(var i=0;i<4;i++)
	{
		txt[i]=[];
		for(var j=0;j<4;j++)
		{
			txt[i][j]=board[i][j];
			switch(txt[i][j]){
				case 2:txt[i][j]="小白";break;
				case 4:txt[i][j]="实习生";break;
				case 8:txt[i][j]="初工";break;
				case 16:txt[i][j]="中工";break;
				case 32:txt[i][j]="高工";break;
				case 64:txt[i][j]="项目经理";break;
				case 128:txt[i][j]="架构师";break;
				case 256:txt[i][j]="高级经理";break;
				case 512:txt[i][j]="技术总监";break;
				case 1024:txt[i][j]="副总裁";break;
				case 2048:txt[i][j]="CTO";break;
				case 4096:txt[i][j]="总裁";break;
				case 8192:txt[i][j]="已闯关";break;
			}
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$("#number-cell-"+i+"-"+j);

			if(board[i][j]==0)
			{
				theNumberCell.css("width","0px");
				theNumberCell.css("height","0px");
				//放在每个gridcell的中心，getPosTop左上角
				theNumberCell.css("top",getPosTop(i,j)+cellSideLength*0.5);
				theNumberCell.css("left",getPosLeft(i,j)+cellSideLength*0.5);
			}
			else {
				theNumberCell.css("width",cellSideLength);
				theNumberCell.css("height",cellSideLength);
				//放在每个gridcell的中心
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
				theNumberCell.css("color",getNumberColor(board[i][j]));
				theNumberCell.text(txt[i][j]);
			}
			hasConflicted[i][j]=false;
		}
		$(".number-cell").css("line-height",cellSideLength+"px");
		$(".number-cell").css("font-size",0.22*cellSideLength+"px");
	}
}

function generateOneNumber(){
	//检测有误空闲的格子
	if(nospace(board))
	{
		return false;
	}
	//随机一个位置
	var randomx=parseInt(Math.floor(Math.random()*4));
	var randomy=parseInt(Math.floor(Math.random()*4));
	var times=0;
	while(times<50)
	{
		if(board[randomx][randomy]==0)
		{
			break;//可用退出
		}
		//如果之前生成的坐标不可以，则继续生成，知道可用
		randomx=parseInt(Math.floor(Math.random()*4));
		randomy=parseInt(Math.floor(Math.random()*4));

		times++;
	}
	if(times==50)
	{
		for(var i=0;i<4;i++)
		{
			for(var j=0;j<4;j++)
			{
				if(board[i][j]==0)
				{
					randomx=i;
					randomy=j;
				}
			}
		}
	}
	//随机一个数字
	var randomNumber=Math.random()<0.5?2:4;

	//在随机位置显示随机数 
	board[randomx][randomy]=randomNumber;
	showNumberAnimation(randomx,randomy,randomNumber);

	return true;
}

///判断按键
$(document).keydown(function(event){
	//event.preventDefault();//避免在移动时，滚动条也动，前提所有按键效果都消失，所以放在下面
	switch(event.keyCode){
		//left
		case 37:
			event.preventDefault();
			if(moveLeft())
			{
				setTimeout("generateOneNumber()",100);
				setTimeout("isgameover()",190);
			}
			break;
		//up
		case 38:
			event.preventDefault();
			if(moveUp())
			{
				setTimeout("generateOneNumber()",100);
				setTimeout("isgameover()",190);
			}
			break;
		//right
		case 39:
			event.preventDefault();
			if(moveRight())
			{
				setTimeout("generateOneNumber()",100);
				setTimeout("isgameover()",190);
			}
			break;
		//down
		case 40:
			event.preventDefault();
			if(moveDown())
			{
				setTimeout("generateOneNumber()",100);
				setTimeout("isgameover()",190);
			}
			break;
		default:
			break;
	}
});

//移动端touch
//获取一开始的坐标
document.addEventListener("touchstart",function(event){
	startx=event.touches[0].pageX;//获取一个手指头的位置
	starty=event.touches[0].pageY;
});	

//有些系统中使用preventDefault会导致touchstart和touchend无法使用，因此需添加touchmove
document.addEventListener("touchmove",function(event){
	event.preventDefault();
})

//获取离开屏幕的坐标
document.addEventListener("touchend",function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	var deltax=endx-startx;
	var deltay=endy-starty;

	if(Math.abs(deltax)<0.1*documentWidth&&Math.abs(deltay)<0.1*documentWidth)//避免与点击混淆
	{
		return;
	}
	//x轴
	if(Math.abs(deltax)>=Math.abs(deltay))//取绝对值
	{
		if(deltax>0)
		{
			//moveright
			if(moveRight())
			{
				setTimeout("generateOneNumber()",100);
				setTimeout("isgameover()",190);
			}
		}
		else
		{
			//moveleft
			if(moveLeft())
			{
				setTimeout("generateOneNumber()",100);
				setTimeout("isgameover()",190);
			}
		}
	}
	//y轴
	else
	{
		if(deltay>0)//y轴向下为正
		{
			//movedown
			if(moveDown())
			{
				setTimeout("generateOneNumber()",100);
				setTimeout("isgameover()",190);
			}
		}
		else
		{
			//moveup
			if(moveUp())
			{
				setTimeout("generateOneNumber()",100);
				setTimeout("isgameover()",190);
			}
		}
	}
});


//判断是否游戏结束
function isgameover(){
	if(nospace(board)&&nomove(board))
	{
		gameover();
	}
}

function gameover(){
	alert("gameover");
}

//判断是否向左移动
function moveLeft(){
	//判断落脚位置是否为空
	//判断落脚位置和待判定元素数字是否相等
	//判断路径中 是否有障碍物
	if(!canMoveLeft(board))
	{
		return false;
	}
	else //可以左移
	{
		//moveleft
		for(var i=0;i<4;i++)
		{
			for(var j=1;j<4;j++)
			{
				if(board[i][j]!=0)
				{
					for(var k=0;k<j;k++)//遍历待判点的左边有没落脚点，路径有无障碍
					{
						if(board[i][k]==0&&noBlockHorizontal(i,k,j,board))
						{
							//move
							showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;

							continue;
						}
						//这里要k+1是为了让相邻的格子也可以合并
						else if((board[i][k]==board[i][j])&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])//相同且无障碍物
						{
							//move
							showMoveAnimation(i,j,i,k);

							//add
							board[i][k]+=board[i][j];
							board[i][j]=0;

							//add score
							score+=board[i][j];
							updateScore(score);

							hasConflicted[i][k]=true;

							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",100);
		return true;
	}
}

//判断是否向右移动
function moveRight(){
	//判断落脚位置是否为空
	//判断落脚位置和待判定元素数字是否相等
	//判断路径中 是否有障碍物
	if(!canMoveRight(board))
	{
		return false;
	}
	else //可以右移
	{
		//moveright
		for(var i=0;i<4;i++)
		{
			for(var j=2;j>=0;j--)
			{
				if(board[i][j]!=0)
				{
					for(var k=3;k>j;k--)//遍历待判点的左边有没落脚点，路径有无障碍
					{
						if(board[i][k]==0&&noBlockHorizontal(i,j,k,board))
						{
							//move
							showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;

							continue;
						}
						//这里要k+1是为了让相邻的格子也可以合并
						else if((board[i][k]==board[i][j])&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k])//相同且无障碍物
						{
							//move
							showMoveAnimation(i,j,i,k);

							//add
							board[i][k]+=board[i][j];
							board[i][j]=0;

							//add score
							score+=board[i][k];
							updateScore(score);

							hasConflicted[i][k]=true;

							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",100);
		return true;
	}
}
//判断是否向上移动
function moveUp(){
	//判断落脚位置是否为空
	//判断落脚位置和待判定元素数字是否相等
	//判断路径中 是否有障碍物
	if(!canMoveUp(board))
	{
		return false;
	}
	else //可以上移
	{
		//moveright
		for(var j=0;j<4;j++)
		{
			for(var i=1;i<4;i++)
			{
				if(board[i][j]!=0)
				{
					for(var k=0;k<i;k++)//遍历待判点的左边有没落脚点，路径有无障碍
					{
						if(board[k][j]==0&&noBlockVertical(j,k,i,board))
						{
							//move
							showMoveAnimation(i,j,k,j);
							board[k][j]=board[i][j];
							board[i][j]=0;

							continue;
						}
						//这里要k+1是为了让相邻的格子也可以合并
						else if((board[k][j]==board[i][j])&&noBlockVertical(j,k,i,board)&&!hasConflicted[k][j])//相同且无障碍物
						{
							//move
							showMoveAnimation(i,j,k,j);

							//add
							board[k][j]+=board[i][j];
							board[i][j]=0;

							//add score
							score+=board[k][j];
							updateScore(score);

							hasConflicted[k][j]=true;

							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",100);
		return true;
	}
}
//判断是否向下移动
function moveDown(){
	//判断落脚位置是否为空
	//判断落脚位置和待判定元素数字是否相等
	//判断路径中 是否有障碍物
	if(!canMoveDown(board))
	{
		return false;
	}
	else //可以上移
	{
		//moveright
		for(var j=0;j<4;j++)
		{
			for(var i=2;i>=0;i--)
			{
				if(board[i][j]!=0)
				{
					for(var k=3;k>i;k--)//遍历待判点的左边有没落脚点，路径有无障碍
					{
						if(board[k][j]==0&&noBlockVertical(j,i,k,board))
						{
							//move
							showMoveAnimation(i,j,k,j);
							board[k][j]=board[i][j];
							board[i][j]=0;

							continue;
						}
						//这里要k+1是为了让相邻的格子也可以合并
						else if((board[k][j]==board[i][j])&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j])//相同且无障碍物
						{
							//move
							showMoveAnimation(i,j,k,j);

							//add
							board[k][j]+=board[i][j];
							board[i][j]=0;

							//add score
							score+=board[k][j];
							updateScore(score);

							hasConflicted[k][j]=true;

							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",100);
		return true;
	}
}