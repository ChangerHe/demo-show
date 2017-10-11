var txt = `<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
  <div class="navbar-default sidebar" role="navigation">
  <div class="sidebar-nav navbar-collapse">
  <ul class="nav" id="side-menu">
  <li>
  <a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> 库存管理<span class="fa arrow"></span></a>
  <ul class="nav nav-second-level">
  <li>
  <a href="receiptplanlist.html">进货计划</a>
  </li>
  <li>
  <a href="signlist.html">进货签收</a>
  </li>
  <li>
  <a href="boundin.html">入库管理</a>
  </li>
  <li>
  <a href="boundout.html">出库管理</a>
  </li>
  <li>
  <a href="inventory.html">盘点管理</a>
  </li>
  </ul>
  </li>
  <li>
  <a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> 供货管理<span class="fa arrow"></span></a>
  <ul class="nav nav-second-level">
  <li>
  <a href="ghsend.html">送货单管理</a>
  </li>
  <li>
  <a href="ghreceive.html">收款单管理</a>
  </li>
  </ul>
</li>
<li>
<a href="#"><i class="fa fa-wrench fa-fw"></i> 财务管理<span class="fa arrow"></span></a>
  <ul class="nav nav-second-level">
  <li>
  <a href="cwreceive.html">收款管理</a>
  </li>
  <li>
  <a href="cwpay.html">付款管理</a>
  </li>
  </ul>
  </li>
  <li>
  <a href="#"><i class="fa fa-wrench fa-fw"></i> 统计分析<span class="fa arrow"></span></a>
  <ul class="nav nav-second-level">
  <li>
  <a href="tjin.html">进货单查询</a>
  </li>
  <li>
  <a href="tjout.html">出库汇总表</a>
  </li>
  <li>
  <a href="tjinsum.html">入库汇总表</a>
  </li>
  <li>
  <a href="tjhasdetail.html">存货明细账</a>
  </li>
  <li>
  <a href="tjshouldpay.html"> 应付货款报告</a>
  </li>
  <li>
  <a href="tjsource.html">食材来源统计</a>
  </li>
  </ul>
</li>
<li>
<a href="#"><i class="fa fa-sitemap fa-fw"></i>基础数据<span class="fa arrow"></span></a>
  <ul class="nav nav-second-level">
  <li>
  <a href="unitlist.html">单位管理</a>
  </li>
  <li>
  <a href="supplierlist.html">供应商管理</a>
  </li>
  <li>
  <a href="foodclasslist.html">菜品类别</a>
  </li>
  <li>
  <a href="foodlist.html">菜品管理</a>
  </li>
</ul>
</li>
<li>
<a href="#"><i class="fa fa-files-o fa-fw"></i> 系统管理<span class="fa arrow"></span></a>
  <ul class="nav nav-second-level">
  <li>
  <a href="userlist.html">用户管理</a>
  </li>
  <li>
  <a href="editpassword.html">修改密码</a>
  </li>
  <li>
  <a href="log.html">日志管理</a>
  </li>
  <li>
  <a href="login.html">退出系统</a>
  </li>
  </ul>
</li>
</ul>
</div>
</div>
</nav>`

document.write(txt)

/*
* 封装一个ajax的请求
*   用法
*       ajax({
*           type: 传输方式: post或get, 默认get
*           url: 传输的url
*           data: 传输的内容
*           success: function() {}
*       })
* */

;(function(){
    window.ajax = function(option) {
        var ajax = new XMLHttpRequest()
        option.type = option.type || 'get'
        
        if(option.type.toLowerCase() === 'post') {
            ajax.open(option.type, option.url)
            ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
            if(option.data) {
                ajax.send(option.data)
            } else {
                throw new Error('您忘记写post的内容了')
            }
        } else if(option.type.toLowerCase() === 'get') {
            if(option.data) {
                ajax.open(option.type, option.url + '?' + option.data)
            } else {
                ajax.open(option.type, option.url)
            }
            ajax.send()
        }
        
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200) {
                var data = ajax.responseText
                data = JSON.parse(data)
                option.success(data)
            }
        }
    }
})()