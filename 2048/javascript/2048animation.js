function showNumberAnimation(i,j,randomNumber){
	var numberCell=$("#number-cell-"+i+"-"+j);
	numberCell.css("background-color",getNumberBackgroundColor(randomNumber));
	numberCell.css("color",getNumberColor(randomNumber));
	if(randomNumber==2)
	{
		numberCell.text("小白");
	}
	if(randomNumber==4)
	{
		numberCell.text("实习生");
	}

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},90);
}
function updateScore(score){
	$("#score").text(score);
}