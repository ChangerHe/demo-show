documentWidth=window.screen.availWidth;
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;

function  getPosTop(i,j){
	return cellSpace+(cellSideLength+cellSpace)*i;
}
function  getPosLeft(i,j){
	return cellSpace+(cellSideLength+cellSpace)*j;
}
function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
	return "black";
}
function getNumberColor(number){
	if(number<=4)
	{
		return "#776e65";
	}
	return "white";
}
//判断会否没有空间
function nospace(board){
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(board[i][j]==0)//如果有==0，则不是没有空间
			{
				return false
			}
		}
	}
	return true;
}

function canMoveLeft(board){
	for(var i=0;i<4;i++)
	{
		for(var j=1;j<4;j++)//第一列不用遍历，肯定不能左移
		{
			//该处有数字
			if(board[i][j]!=0)
			{
				if(board[i][j-1]==0||board[i][j-1]==board[i][j])//在有数字的左边，如果没有数字，则可左移||该处数字与左边相同，则合并
				{
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(board){
	for(var i=0;i<4;i++)
	{
		for(var j=2;j>=0;j--)//第一列不用遍历，肯定不能左移
		{
			//该处有数字
			if(board[i][j]!=0)
			{
				if(board[i][j+1]==0||board[i][j+1]==board[i][j])//在有数字的左边，如果没有数字，则可左移||该处数字与左边相同，则合并
				{
					return true;
				}
			}
		}
	}
	return false;
}

//判断左边有无障碍物
function noBlockHorizontal(row,col1,col2,board){
	//这里i初始化不能为col1，因为会使第一列为空的不能所以
	for(var i=col1+1;i<col2;i++)
	{
		if(board[row][i]!=0)//只要有一个！=0，则是有障碍物
		{
			return false;
		}
	}
	return true;
}

function canMoveUp(board){
	for(var j=0;j<4;j++)
	{
		for(var i=1;i<4;i++)
		{
			if(board[i][j]!=0)
			{
				if(board[i-1][j]==0||board[i-1][j]==board[i][j])
				{
					return true;
				}
			}
		}
	}
	return  false;
}

function canMoveDown(board){
	for(var j=0;j<4;j++)
	{
		for(var i=2;i>=0;i--)
		{
			if(board[i][j]!=0)
			{
				if(board[i+1][j]==0||board[i+1][j]==board[i][j])
				{
					return true;
				}
			}
		}
	}
	return  false;
}

//判断左边有无障碍物
function noBlockVertical(col,row1,row2,board){
	//这里i初始化不能为col1，因为会使第一列为空的不能所以
	for(var i=row1+1;i<row2;i++)
	{
		if(board[i][col]!=0)//只要有一个！=0，则是有障碍物
		{
			return false;
		}
	}
	return true;
}

function nomove(board){
	if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board))
	{
		return false;
	}
	else
	{
		return true;
	}
}