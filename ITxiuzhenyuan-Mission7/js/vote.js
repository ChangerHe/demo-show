var Msg = document.getElementsByClassName('message')[0];
var aMsg = Msg.getElementsByTagName('a')[0];
var ident = document.getElementsByClassName('ident');
var Holder = document.getElementsByClassName('placeholder')[0];
var iconTag = document.getElementsByClassName('iconTag');
var Icon = document.getElementsByTagName('img');
aMsg.onclick = function (){
	if (Holder.innerHTML != 0) {
		Holder.innerHTML= "";
	} else {
		Holder.innerHTML="\<audio controls\=\"controls\" autoplay\=\"autoplay\"\>\
						  \<source src\=\"free.mp3\" typ\=\"audio/mpeg\" \/\>\
						Your browser does not support the audio element\.\
						\<\/audio\>"
	}
	
}
// for (var i = 0; i < ident.length; i++) {

// 	ident[i].onmouseover = function(){
// 		iconTag[i].style.display = "block";
// 	}
// 	ident[i].onmouseout = function(){
// 		iconTag[i].style.display = "none";
// 	}
// }
for (var i = 0; i < iconTag.length; i++) {
	var a = function(){
		var n = i
		ident[i].onmouseover = function(){
			console.log(iconTag[1],ident[1])
			iconTag[n].style.display = "block";
		}
		ident[i].onmouseout = function(){
		 	iconTag[n].style.display = "none";
		}
	}
	a();
}
