/**
 * @name: projectGoodIntro
 * @author: ChangerHe
 * @description: 实现百业好项目页面中的点击切换下方列表效果
 * @update: 2017-08-02
 */
window.onload = function() {
var subTitle = document.getElementById("subTitle");
var subSpan = subTitle.getElementsByTagName("span")
var hideDiv = document.querySelectorAll(".hide");

// 为所有的subtitle中的span标签设置点击事件
for(var i = 0; i < subSpan.length; i++) {
    subSpan[i].setAttribute("name", i);
    subSpan[i].onmouseover = function() {
        
        var name = this.getAttribute("name");
        for(var j = 0; j < subSpan.length; j++) {
            subSpan[j].className = "";
        }
        this.className = "active";
        for(var k = 0; k < hideDiv.length; k++) {
            hideDiv[k].id = "";
        }
        console.log(name)
        hideDiv[name].id = "show";
    }
}

}
