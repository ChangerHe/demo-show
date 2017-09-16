/*
计算器JavaScript代码
***************************************
*/
var numbers="",results="",lastkey="";
var reg1=/^[\*|\/].+/,reg2=/.+[\*|\/]$/,reg3=/(\+|-|\*|\/|\%)/,reg4=/^[+|\-|\*|\/|\%]/;//正则表达式，如果开头有*，/的显示错误

//获取数据
function getNum(){
	//整个计算机页面都是可点击的，但要获取点击的元素
	//从起始位置到终止位置的内容, 但它去除Html标签
	if(event.srcElement.innerText=="OFF")
	{
		document.getElementById("displayRes").value="";//无显示
		numbers="";//将原有数字串清空
		return ;
		changeColor();//并且调用改变颜色函数
	}
	if(event.srcElement.innerText=="AC")//lastkey定义在后面，前面若用lastkey会出现错误，使用最原先的表达
	{
		document.getElementById("displayRes").value="0";//显示0
		numbers="";//将原有数字串清空
		return ;
	}
	if(event.srcElement.innerText=="=")//若点击为等号，则不执行这个函数，执行getRes函数
	{
	  return ;
	}
	if(event.srcElement.innerText.match(reg1))//开头为*|/
	{
	  document.getElementById("displayRes").value="输入错误";
	  numbers="";//清空numbers
	  return ;
	}
	if(lastkey.match(reg3)&&event.srcElement.innerText.match(reg3))//重复输入运算符号
	{
	  return ;//不执行
	}
	if(lastkey=="="&&event.srcElement.innerText.match(reg3))//连续运算
	{
	  numbers=results;
	} 

	numbers+=event.srcElement.innerText;//获取点击的内容
	lastkey=event.srcElement.innerText;//获取最后输入的数字

	if(event.srcElement.innerText=="CE")//放在numbers后面可顺利回退，放在前面则不行
	{
	  numbers=numbers.substring(0,numbers.length-3);//回退一个数字
	}
	document.getElementById("displayRes").value=numbers;//将所点击过的内容串起来
} 

//计算函数，并显示结果
function getRes(){
  if(numbers.match(reg1)||numbers.match(reg2))//开头结尾为*|/，显示错误
   {
      document.getElementById("displayRes").value="输入错误";
      numbers="";//清空numbers
      return ;
   }
  var formula=document.getElementById("displayRes").value;
  results=eval(formula);//eval是一个计算函数，把formula里面的算式计算出结果
  document.getElementById("displayRes").value=results;
  lastkey="=";//给定条件，继续运算
  numbers="";
}

//点击OFF，随机改变计算器颜色
function changeColor(){
  /*var a = [document.getElementById("AC"),document.getElementById("CE"),document.getElementById("percent"),document.getElementById("division"),document.getElementById("seven"),document.getElementById("eight"),document.getElementById("nine"),document.getElementById("mul"),document.getElementById("four"),document.getElementById("five"),document.getElementById("six"),document.getElementById("sub"),document.getElementById("one"),document.getElementById("two"),document.getElementById("three"),document.getElementById("add"),document.getElementById("dot"),document.getElementById("zero"),document.getElementById("OFF"),document.getElementById("out"),document.getElementById("layout"),document.getElementById("displayRes")];//待优化代码*/
  var a=document.getElementsByName("cl");
    
  var arr=["#3a9da0","#5945bf","#36b06c","#c932cf","#d08b33","#dfd245","#d45d5c"];//颜色数组
  var num1=Math.floor(Math.random()*7);//随机获取0-6任意一个整数
  for(i=0;i<a.length;i++)
    {
      if(i<2)//当元素为div或者input，只变换边框颜色
        {
          a[i].style.borderColor=arr[num1];
        }
     else//按钮元素变换边框+背景
       {
         a[i].style.backgroundColor=arr[num1];//获取随机颜色
         a[i].style.borderColor=arr[num1];
       }
    }
}
