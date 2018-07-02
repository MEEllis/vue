<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
        <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/score.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<title>调整历史</title>
		<style type="text/css">
	
             /*莫态框按钮自定义*/
           
            .btn-primary {
			    background-color: #5a8dbf;
			    border-radius: 3px;
             }
            
             .btn-default {
			    background-color: #ededed;
			    border-radius: 3px;
            }
             .btn-grp a{color:#333}
		</style>
	</head>
	<body>
		<div class="content">
		<!--调整历史主页面开始   -->
		    <div class="top">
		<!--top -->
			<div id="AUTH" data-code="JFTZ"  class="btn-grp" role="group" >
			  <a class="btn" onclick="setReload()">刷新 </a>
			  <a class="btn  icon-angle-down toggleOrder"  data-toggle="collapse" data-target="#historyQuery" aria-expanded="false" aria-controls="historyQuery"></a>
			</div>
			
			<div class="toggle-top collapse" id="historyQuery">
				<div class=" pull-div1 pd" >
				<p class="first-p">
				    <span>发卡公司:</span><input class="fkgs" disabled="disabled" />
				    <span>发卡部门:</span><select name="sectionId" class="fkbm" id="sectionId"></select>
				    <span>会员类型:</span><select name="cardTypeId" class="cardType" id="cardTypeId"></select>
				    <span>会员卡号:</span><input type="text" name="cardNum" id="cardNum"/></p>
				<p>
					<span>开始日期:</span><input type="text" name="beginTime" id="createDateBegin" />
				    <span>结束日期:</span><input type="text" name="endTime" id="createDateEnd"  />
				    <span>持卡人:</span><input type="text" name="cardMan" id="cardMan"   />
				    <span>手机号:</span><input type="text" name="phone" id="phone"   />
				</p>
				 <p style="text-align: center; margin-bottom: 14px;">
				    <a class="bn a-bn historyQueryBtn">查询</a></p>   
				</div>
			</div>
			<!--top end--></div>
		    <div class="content1">
			
			<!--表格 -->
	
			<div class="tablebox retailDetailTable" >
				<div class="grid-wrap" style="overflow-y:auto; overflow-x: hidden;">
					<table id="jqGrid_changeHis" class="zxsaastable"></table>
				    <div id="jqGridPagerchangeHis"></div>
				</div>
			</div> 
			<!--表格   end-->
			</div>
			
			
			</div>
		<!--调整历史主页面结束   -->
		
		
	</body>
	<jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/score.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
    <script type="text/javascript">
    $(function(){
       $("#historyQuery").collapse('show');
       initial();
    });
    	function setReload(){
    	window.location.reload();
	}
	</script>
</html>

