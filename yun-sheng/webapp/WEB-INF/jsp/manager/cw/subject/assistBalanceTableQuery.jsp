<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>辅助余额表</title>
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/table.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/subjectBal.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/auxiliary-ledger.css"/>
	</head>
	<body>
<!--------------------------- 隐藏属性--------------------------------->
	<input id="subjectIdStr" type="hidden"/>
	<input id="subjectClssifyStr" type="hidden"/>
	<input id="departmentId" type="hidden"/>
	<input id="employeeId" type="hidden"/>
	<input id="partnerId" type="hidden"/>
	
<!-----------------------------弹窗 ------------------------------------>
		<div id="shade">
		
			<div id="shade-box">
			
				<div class="shade-title">
					<b class="shade-b">查询</b>
					<label class="shade-close">×</label>
				</div>
				
				<div class="shade-main">
						<div class="shade-mainleft">固定页</div>
						
						<!--选项卡-->
						<div class="shade-mainright">
						
							<div class="shade-mainright-nav">
								<ul>
									<li class="pageA bgcolor">过滤条件</li>
									<li class="pageC">分组设置</li>
									<li class="pageB">表头二次过滤</li>
								</ul>
							</div>
							
							<!--过滤条件页面-->
							<div class="shade-mainright-pageA">
								<p class="bloc">集团：<input class="wnum" type="text" value="执信集团" /></p>
								<p class="company">公司：<select class="wnum"><option>执信软件</option></select></p>
								<hr />
								<p class="period">期间：<select     id="yearAndMonBegin"    name="minAccountAnnual"   class="snum"></select>-<select id="yearAndMonEnd" name="maxAccountAnnual" class="snum"></select></p>
								<p class="subsort">科目类别：<input id="subjectClssifyName" name="subjectClssifyName" class="wnum" onkeydown="delWholeInput(this)" type="text" /><span onclick="selectSubjectClssify('subjectClssifyName')" class="subbalA">查</span></p>
								<p class="subject">科目：<input     id="subjectCode"        name="subjectCode"        class="wnum" onkeydown="delWholeInput(this)" type="text" /><span onclick="selectReferenceOpen('subjectCode')"         class="subbalA">查</span></p>
								<hr />
								<p class="course"><input class="mc" type="checkbox" />末级科目</p>
								<hr />
								<p class="section"><input type="checkbox" class="mp pickC pick pickDep" />部门：<input id='departmentName' class="wnum inpC" onkeydown="delWholeInput(this)" type="text" placeholder="输入内容" disabled="disabled" /></p>
								<p class="person"><input type="checkbox" class="mp pickD pick pickPer" />个人：<input id='employeeName' class="wnum inpD" onkeydown="delWholeInput(this)" type="text" placeholder="输入内容" disabled="disabled" /></p>
								<p class="classify"><input type="checkbox" class="mu pickA pick pickEmp" /><span class="Pclassify">单位分类</span>：<input class="wnum munit inpA" onkeydown="delWholeInput(this)" type="text" placeholder="输入内容" disabled="disabled" /></p>
								<p class="unit"><input type="checkbox" class="mu pickB pick pickEmp1" /><span class="Punit">往来单位</span>：<input  id='partnerName' class="wnum inpB" onkeydown="delWholeInput(this)" type="text" placeholder="输入内容" disabled="disabled" /></p>
								<hr />
								<p class="nocharge"><input id="ofR" class="mr" type="checkbox" />包含未记账</p>	
							</div>
						
							<!--分组设置-->
							<div class="shade-mainright-pageC">
								<table class="tabC">
									<tr class="trnav">
										<td>序号</td>
										<td>显示名称</td>
										<td>分组小计</td>
										<td>列宽</td>
										<td></td>
									</tr>
									<tr class="tr-1">
										<td>1</td>
										<td>科目	</td>
										<td><input class="tabCsub" id="subjectBoolean" type="checkbox" checked="checked" /></td>
										<td>200</td>
										<td></td>
									</tr>
								</table>
							</div>
						
						
							<!--表头二次过滤页面-->
							<div class="shade-mainright-pageB">
								<table class="tabB">
									<tr class="trnav">
										<td>序号</td>
										<td>显示名称</td>
										<td>是否显示</td>
										<td>列宽</td>
										<td></td>
									</tr>
									<tr class="tr-1">
										<td>1</td>
										<td>科目	</td>
										<td><input class="tabBsub subSelect" type="checkbox" /></td>
										<td>200</td>
										<td></td>
									</tr>
								</table>
							</div>
						
					</div>
					
					<div class="shade-footer">
						<button class="sure">确定</button>
						<button class="cancel">取消</button>
					</div>
					
				</div>
			
			</div>	
			
		</div>
		
<!------------------------------功能菜单----------------------------------------->
		<div class="btn-group" role="group" >
			<ul>
				<li>打印</li>
				<li>导出</li>
				<li>发送邮件</li>
				<li class="search-li">查询</li>
				<li>显示图表</li>
				<li class="claChoose">样式
					<ul class="cla-ul"><li class="cla-one">金额式</li><li class="cla-two sub-none">数量金额式</li></ul>
				</li>
				<li>设置</li>
				<li>刷新</li>
				<li>小计隐藏</li>
				<li>合计隐藏</li>
				<li>联查隐藏</li>
				<li class="close-li">退出</li>
			</ul>	
		</div>
		
<!------------------------------------头部----------------------------------->

		<div id="subject-top">
		
			<div id="subject-top-na">辅助余额表</div>
			
			<div id="subject-top-search">
				<p><label>集团:</label><label class="sub-comp bloc1"></label></p>
				<label>公司:</label>
				
				<select class="sub-comp com danwei2">
						<option value='1001阿里巴巴'>阿里巴巴</option>
						<option value='1002腾讯'>腾讯</option>
						<option value='1003百度'>百度</option>
						<option value='1004搜狐'>搜狐</option>
				</select>
					
				<label class="sub">科目:</label><select id="subjectHeader" class="sub-comp sub subShow">
					</select>
				<label class="dep">部门:</label><select id="departmentHeader" class="sub-comp dep">
					</select>
				<label class="per">个人:</label><select id="employeeHeader" class="sub-comp per">
					</select>
				<label class="emp">往来单位:</label><select id="partnerheader" class="sub-comp emp">
				    </select>
				<label>期间:</label><label id="yearAndMon" class="sub-comp"></label>
			</div>
			
		</div>
<!------------------------------表格开始--------------------------------------->
		<div class="tablebox retailDetailTable">
		
			<div class="grid-wrap" style="margin-top:10px">
			
				<table id="jqGrid_subjectBal" class="zxsaastable">
				</table>
				
				<div id="gridpager"></div>
				
			</div>
			
		</div>
		
		<!--底部-->
		<div id="subject-bottom">
			<div id="subject-bottom-other" class="fb">单位名称:</div>
			<div id="subject-bottom-per" class="fb">制表人:008</div>
			<div id="subject-bottom-time" class="fb"></div>
		</div>
		
	</body>
		<script src="${basePath}/js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/grid.locale-cn.js" type="text/javascript" charset="utf-8"></script>		
		<script src="${basePath}/js/commonjs/xm.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.groupHeader-0.2.1.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		// 搜索
		var search = document.querySelector(".sub-comp");
		search.onchange = function(){
			alert("just for test!");
		}
		var myDate=new Date();
		var year = myDate.getFullYear();
		var month = myDate.getMonth()+1;
		var day = myDate.getDate();
		document.querySelector("#subject-bottom-time").innerHTML = "打印日期:"+year+"/"+month+"/"+day;
		
		$('#subject-bottom-other').html('单位名称:'+$('.danwei2').val().replace(/\d+/g,''));
		//拖拽
//		$("#shade-box").draggable();
	</script>
	<!-- PiHao JS -->
	<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle.css">
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.core-3.5.min.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.excheck-3.5.min.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.exedit-3.5.min.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/model-subject-compare.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/model-group-subject.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject-reference.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/model-company-subject.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/assist-balance-table.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/model-assist-balance-table.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/model-voucher-manage.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/model-subject-page.js"></script>
	<script type="text/javascript" src="${basePath}/js/cw/subject/assist-bal.js"></script>
	<script type="text/javascript">
		var basePath = "${basePath}";
		var assistBalanaceTableQuery = null;
		var voucherManage = null;
		var currSelectCompanySubjectID = null;
		var subjectPage = null;
		var initCompanyId = 12;
		var gl_CurrCompanyId = 12;
		var gl_CurrYear = 2015;
		var initGroupId	= 8888888;
	</script>
</html>


<!-- 科目类别参照 -->
<div class="modal fade" id="assistGetSubjectClssifyModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
         <!-- //科目双击事件 -->
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                   科目类别
            </h4>
         </div>
         <div class="modal-body">
			<iframe frameborder="0" style="width: 100%;height:400px;" src="${basePath}/cw/test/assistGetSubjectClssify"></iframe>
         </div>
	  </div>
	</div>
</div>	

<!-- 科目参照 -->
<div class="modal fade" id="subjectReferenceModal" tabindex="-2" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
         <!-- //科目双击事件 -->
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                   科目参照
            </h4>
         </div>
         <div class="modal-body">
			<iframe name="subjectReferenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/cw/test/subjectReference"></iframe>
         </div>
	  </div>
	</div>
</div>	
