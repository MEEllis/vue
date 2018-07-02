<%@page contentType="text/html"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
      moneyLy.jsp
      <资金往来>
      
      Created by LyNnJeR on 2017-01-20.
      Copyright 2017 LyNnJeR. All rights reserved.
 -->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <title>资金往来</title>
        
    </head>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}"/>
    <link rel="stylesheet" href="${basePath}/css/erp/menuUI/picLy.css?v=${version}" media="screen" type="text/css" />
    <script type="text/javascript">
		var basePath = "${basePath}";
	</script>
    <body>
		<div class="wrap">
			<!--div class="picLeft">
				<div class="first">
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('内部转账','/manager/funds/innerTransfer/initInnerTransfer');" class="aTubiao">
							<img src="../images/money/nbzz.png" alt="" />
							<p class="name">
								内部转账
							</p>
						</a>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('付款管理','/manager/funds/payment/initPayment');" class="aTubiao">
							<img src="../images/money/fkgl.png" alt="" />
							<p class="name">
								付款管理
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('付款单','/manager/funds/payment/initPayment');" >付款单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('预付款单','/manager/funds/payment/planPayment');" >预付款单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('其他付款单','/manager/funds/payment/otherPayment');" >其他付款单</a></li>
					    </ul>
						</div>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('收款管理','/manager/funds/payment/initPayee');" class="aTubiao">
							<img src="../images/money/skgl.png" alt="" />
							<p class="name">
								收款管理
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     	
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('收款单','/manager/funds/payment/initPayee');" >收款单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('预收款单','/manager/funds/payment/planPayee');" >预收款单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('其他收款单','/manager/funds/payment/otherPayee');" >其他收款单</a></li>
					    </ul>
						</div>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a onclick="javascript:parent.openWorkBoxByMenutext('日结','/manager/jxc/authority/tdaily/dailyOprLog');" class="aTubiao">
							<img src="../images/money/rj.png" alt="" />
							<p class="name">
								日结
							</p>
						</a>
					</div>
				</div>
				<div class="second">
					<div class="tubiao"></div>
				</div>
				<div class="third">
					<div class="tubiao">
						<a target="_blank" class="aTubiao">
							<img src="../images/money/cwcl.png" alt="" />
							<p class="name">
								账务处理
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('应付应收调整','/manager/funds/adjust/initAdjust');" >应付应收调整</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('预付冲应付','/manager/funds/settlement/initSettlement?showMenu1');" >预付冲应付</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('应付冲应付','/manager/funds/settlement/initSettlement?showMenu2');" >应付冲应付</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('预收冲应收','/manager/funds/settlement/initSettlement?showMenu3');" >预收冲应收</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('应收冲应收','/manager/funds/settlement/initSettlement?showMenu4');" >应收冲应收</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('应收冲应付','/manager/funds/settlement/initSettlement?showMenu5');" >应收冲应付</a></li>
					    </ul>
						</div>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao">
						<a target="_blank" class="aTubiao">
							<img src="../images/money/bjfl.png" alt="" />
							<p class="name">
								保价返利
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     	
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('供应商保价单','/manager/funds/supplierReprice');" >供应商保价单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('供应商返利单','/manager/funds/supplierRebate');" >供应商返利单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('客户价保单','/manager/funds/clientReprice');" >客户价保单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('客户返利单','/manager/funds/clientRebate');" >客户返利单</a></li>
					    </ul>
						</div>
					</div>
					<div class="jiantou"></div>
					<div class="tubiao">
						<a target="_blank" class="aTubiao">
							<img src="../images/money/stcw.png" alt="" />
							<p class="name">
								受托账务
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('受托商品调价单','/manager/funds/beEntrustChangePrice');" >受托商品调价单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('受托结算','/manager/funds/beEntrustSettlement');" >受托结算</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('受托撤结','/manager/funds/entrustUndoSettlement');" >受托撤结</a></li>
					    </ul>
						</div>
					</div>
					<div class="jiantou">
					</div>
					<div class="tubiao" style="">
						<a target="_blank" class="aTubiao">
							<img src="../images/money/wtzw.png" alt="" />
							<p class="name">
								委托账务
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('委托商品调价单','/manager/funds/entrustChangePrice');" >委托商品调价单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('委托结算','/manager/funds/entrustSettlement');" >委托结算</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('委托撤结','/manager/funds/entrustUndoSettlement');" >委托撤结</a></li>
					    </ul>
						</div>
					</div>
				</div>
			</div-->
				<table class="picLeft">
			  <tbody>
			  	  <tr>
			  	  	<td class="tubiao pdTB">
			  	  		<a onclick="javascript:parent.openWorkBoxByMenutext('内部转账','/manager/funds/innerTransfer/initInnerTransfer');" class="aTubiao">
							<img src="../images/money/nbzz.png" alt="" />
							<p class="name">
								内部转账
							</p>
						</a>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a onclick="javascript:parent.openWorkBoxByMenutext('付款管理','/manager/funds/payment/initPayment');" class="aTubiao">
							<img src="../images/money/fkgl.png" alt="" />
							<p class="name">
								付款管理
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('付款单','/manager/funds/payment/initPayment');" >付款单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('预付款单','/manager/funds/payment/planPayment');" >预付款单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('其他付款单','/manager/funds/payment/otherPayment');" >其他付款单</a></li>
					    </ul>
						</div>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a onclick="javascript:parent.openWorkBoxByMenutext('收款管理','/manager/funds/payment/initPayee');" class="aTubiao">
							<img src="../images/money/skgl.png" alt="" />
							<p class="name">
								收款管理
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     	
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('收款单','/manager/funds/payment/initPayee');" >收款单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('预收款单','/manager/funds/payment/planPayee');" >预收款单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('其他收款单','/manager/funds/payment/otherPayee');" >其他收款单</a></li>
					    </ul>
						</div>	
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a onclick="javascript:parent.openWorkBoxByMenutext('日结','/manager/jxc/authority/tdaily/dailyOprLog');" class="aTubiao">
							<img src="../images/money/rj.png" alt="" />
							<p class="name">
								日结
							</p>
						</a>
			  	  	</td>
			  	  </tr>
			  	  <tr>
			  	  	<td class="tubiao"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao pdTB"></td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao"></td>
			  	  </tr>
			  	  <tr>
			  	  	<td class="tubiao pdTB">
			  	  		<a target="_blank" class="aTubiao">
							<img src="../images/money/cwcl.png" alt="" />
							<p class="name">
								账务处理
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('应付应收调整','/manager/funds/adjust/initAdjust');" >应付应收调整</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('预付冲应付','/manager/funds/settlement/initSettlement?showMenu1');" >预付冲应付</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('应付冲应付','/manager/funds/settlement/initSettlement?showMenu2');" >应付冲应付</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('预收冲应收','/manager/funds/settlement/initSettlement?showMenu3');" >预收冲应收</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('应收冲应收','/manager/funds/settlement/initSettlement?showMenu4');" >应收冲应收</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('应收冲应付','/manager/funds/settlement/initSettlement?showMenu5');" >应收冲应付</a></li>
					    </ul>
						</div>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a target="_blank" class="aTubiao">
							<img src="../images/money/bjfl.png" alt="" />
							<p class="name">
								保价返利
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     	
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('供应商保价单','/manager/funds/supplierReprice');" >供应商保价单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('供应商返利单','/manager/funds/supplierRebate');" >供应商返利单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('客户价保单','/manager/funds/clientReprice');" >客户价保单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('客户返利单','/manager/funds/clientRebate');" >客户返利单</a></li>
					    </ul>
						</div>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a target="_blank" class="aTubiao">
							<img src="../images/money/stcw.png" alt="" />
							<p class="name">
								受托账务
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('受托商品调价单','/manager/funds/beEntrustChangePrice');" >受托商品调价单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('受托结算','/manager/funds/beEntrustSettlement');" >受托结算</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('受托撤结','/manager/funds/entrustUndoSettlement');" >受托撤结</a></li>
					    </ul>
						</div>
			  	  	</td>
			  	  	<td class="jiantou"></td>
			  	  	<td class="tubiao">
			  	  		<a target="_blank" class="aTubiao">
							<img src="../images/money/wtzw.png" alt="" />
							<p class="name">
								委托账务
							</p>
						</a>
						<div class="btn-group">
					    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					     		
					      <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu">
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('委托商品调价单','/manager/funds/entrustChangePrice');" >委托商品调价单</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('委托结算','/manager/funds/entrustSettlement');" >委托结算</a></li>
					      <li><a onclick="javascript:parent.openWorkBoxByMenutext('委托撤结','/manager/funds/entrustUndoSettlement');" >委托撤结</a></li>
					    </ul>
						</div>
			  	  	</td>
			  	  </tr>
			  	  
			  	  
			     
			  </tbody>
			</table>
			<div class="main">
				<div class="jichu">
					<div class="jTop">基础资料</div>
					<div class="jLeft"></div>
					<div class="jRight"></div>
				</div>
				<div class="baobiao">
					<div class="bTop">报表查询</div>
					<div class="bLeft"></div>
					<div class="bRight"></div>
				</div>
			</div>
		</div>
	</body>
	<script src="${basePath}/js/erp/menuUI/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/menuUI/picLy.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/menuUI/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script>
		$(function(){
			getData('${basePath}/json/erp/menuUI/money.json');
		});
	</script>
</html>