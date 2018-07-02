<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
		<meta charset="UTF-8">
		<title>辅助总账</title>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="../../css/base.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="../../css/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="../../js/skins/all.css" />
		<link rel="stylesheet" type="text/css" href="../../css/animate.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap-select.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/treepage.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/jquery.datetimepicker.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/table.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/subjectBal.css"/>
		
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/auxiliary-ledger.css"/>
	
	</head>
<body>
		
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
							<p class="bloc">集团：<input class="wnum" disabled="disabled" type="text" value="执信集团" /></p>
							<p class="company">公司：<select class="wnum" name="companyId">
								<option value="12">执信软件</option>
								<option value="999">测试</option>
							</select></p>
							<hr />
							<p class="period">期间：<select class="snum" id="minMonth" onchange="onSelectYear()">
													</select> - 
													<select class="snum" id="maxMonth">
													</select></p>
							<p class="subject">科目：<input class="snum" type="text" disabled="disabled" id="subjectName"/>
							<span class="subspanA"><a onclick="modalshow()">查</a></span></p>
							<input class="snum" type="hidden" name="subjectId" id="subjectId"/>
							<hr />
							<p class="section" style="position: relative;"><input type="checkbox" class="mp pickC pick pickDep" />部门：<input class="wnum inpC" type="text" placeholder="请从参照中选取" disabled="disabled" name="departmentId"/><button style="right: .2rem;height: 2.3rem;position: absolute;" class="searchC" disabled onclick="alert('123');">查</button></p>
							<p class="person" style="position: relative;"><input type="checkbox" class="mp pickD pick pickPer" />个人：<input class="wnum inpD" type="text" placeholder="请从参照中选取" disabled="disabled" name="employeeId"/><button style="right: .2rem;height: 2.3rem;position: absolute;" class="searchD" disabled onclick="alert('123');">查</button></p>
							<p class="classify" style="position: relative;"><input type="checkbox" class="mu pickA pick pickEmp" /><span class="Pclassify">单位分类</span>：<input class="wnum munit inpA"  type="text" placeholder="请从参照中选取" disabled="disabled" /><button style="right: .2rem;height: 2.3rem;position: absolute;" class="searchA" disabled onclick="alert('123');">查</button></p>
							<p class="unit" style="position: relative;"><input type="checkbox" class="mu pickB pick pickEmp1" /><span class="Punit">往来单位</span>：<input class="wnum inpB" type="text" placeholder="请从参照中选取" disabled="disabled" name="contactsId" /><button style="right: .2rem;height: 2.3rem;position: absolute;" class="searchB" disabled onclick="alert('123');">查</button></p>
							<hr />
							<p class="nocharge"><input class="mr" type="checkbox" id="ifContainNotAccount"/>包含未记账</p>					
							<p class="nooccur"><input class="mr" type="checkbox" id="ifHappenShowCumulative" />期间无发生显示累计</p>
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
								<td><input type="checkbox" checked="checked" disabled="disabled" /></td>
								<td>200</td>
								<td></td>
							</tr>
							<tr class="tr-2">
								<td>2</td>
								<td>期间</td>
								<td><input type="checkbox" checked="checked" disabled="disabled" /></td>
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
								<td><input type="checkbox" class='subSelect' checked="checked" disabled="disabled" /></td>
								<td>200</td>
								<td></td>
							</tr>
						</table>
					</div>
					
				</div>
				<div class="shade-footer">
					<button class="sure"  >确定</button>
					<button class="cancel">取消</button>
				</div>
			</div>
			
			</div>	
		</div>
		
		<!--功能菜单-->
		<div class="btn-group" role="group" >
			<ul>
				<li>打印</li>
				<li>导出</li>
				<li>发送邮件</li>
				<li class="search-li">查询</li>
				<li>显示图表</li>
				<li class="claChoose">样式
					<ul class="cla-ul"><li class="cla-one">金额式</li><li class="cla-two">数量金额式</li></ul>
				</li>
				<li>设置</li>
				<li>刷新</li>
				<li>小计隐藏</li>
				<li>合计隐藏</li>
				<li>联查隐藏</li>
				<li class="close-li">退出</li>
			</ul>	
		</div>
		<!--头部-->
		<div id="subject-top">
			<div id="subject-top-na">辅助总账</div>
		<div id="subject-top-search">
				<p><label>集团:</label><label class="sub-comp bloc1"></label></p>
				<label>公司:</label>
				<select class="sub-comp com danwei2">
						<option value='1001阿里巴巴'>阿里巴巴</option>
						<option value='1002腾讯'>腾讯</option>
						<option value='1003百度'>百度</option>
						<option value='1004搜狐'>搜狐</option>
					</select>
				<label class="sub">科目:</label>
				<select class="sub-comp sub subShow" id="subSelect" onchange="queryPage(1)">
				<option value=""></option>
				</select>
				<label class="dep">部门:</label>
				<select class="sub-comp dep" id="depSelect" onchange="queryPage(1)">
				<option  value=""></option>
				</select>
				<label class="per">个人:</label>
				<select class="sub-comp per" id="perSelect" onchange="queryPage(1)">
				<option  value=""></option>
				</select>
				<label class="emp">往来单位:</label>
				<select class="sub-comp emp" id="empSelect" onchange="queryPage(1)">
				<option  value=""></option>
				</select>
				<label>期间:</label><label class="sub-comp" id="kjqj"></label>
			</div>
		</div>
		<!--表格开始-->
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
		<script src="../../js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/jquery.jqGrid.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/grid.locale-cn.js" type="text/javascript" charset="utf-8"></script>		
		<script src="../../js/commonjs/xm.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/jquery.jqGrid.groupHeader-0.2.1.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/commonjs/cw.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/auxiliary-bal.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/cw/account/auxiliary-gl.js" type="text/javascript" charset="utf-8"></script>
		
		
<!-- 科目参照 -->
<div class="modal fade" id="subjectReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
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
			<iframe name="subjectSelectFrame" frameborder="0" style="width: 100%;height:400px;" src="/manager/cw/test/subjectReference"></iframe>
         </div>
	  </div>
	</div>
</div>	
 <script>
 </script>