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
	<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/score.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrapValidator.min.css?v=${version}"/>
	<title>会员促销设置——充值赠送设置</title>
		<style type="text/css">
			 .ui-jqgrid .ui-jqgrid-htable .ui-th-div{
			    height:auto;
			 }
            .content-son>p{
            	margin-left: 20px; 
            	margin-top: 10px;"
            }
            .p-ckbox>input[type=checkbox] {
			    margin-right: 6px;
			    vertical-align: top;
			    margin-top: 5px;
			}
			.p-ckbox>label{
				margin-right: 8px;
			}
			.p-text>input[type=text] {
			    width: 148px;
			    height: 28px;
			    border: 1px solid #e3e3e3;
			}
            .btn-grp>a:hover{
			    border:0;
			}
			#AUTH button{
				background: transparent;
    			border: 0;
			}
			.top{
			    border: 1px solid #e3e3e3;
			    border-radius: 2px;
			    background-color: #f5f5f5;
			    margin-bottom: 20px;
			}
		</style>
	</head>
	<body>
		<div class="content">
		<!--充值赠送设置页面开始   -->
		<div class="top">
		<!--top -->
			<div id="AUTH" data-code="CZZSSZ" class="btn-grp" role="group" >
				<button type="button" class="save save_addCash btn btn-default B_CZZSSZ_0001 none">保存</button>
			</div>
			<div id="saveResult" class="content-son" style=" width: 100%;">
				<p class="">
				   <input type="radio" name="timeType" id="notGive" value="1"  checked="checked"/><label for="notGive">不赠送</label></p>
				<p class="p-text">
					 <input type="radio" name="timeType" id="timeSale" value="2" /><label for="timeSale">时段促销</label>
					 <input type="text" name="startDate" id="startDate" value="" class="uni time-limit" style="margin-right:4px"/><span id="">至</span><input type="text" name="endDate" id="endDate" value="" class="uni time-limit" style="margin-left:4px"/>
					<!-- <input type="radio" name="timeType" id="monthSale" value="3" /><label for="monthSale">按月促销</label>
					  <span id="">每月</span> <input type="text" name="" id="" value="" class="uni each-month"/><span id="">日</span> -->  
				</p>
				<p >
					
					  <input type="radio" name="timeType" id="monthSale" value="3" /><label for="monthSale">按月促销</label>
					  <span id="">每月</span>
					  <select name="" id="" value="" class="uni each-month" style="width: 148px;height: 28px; border: 1px solid #CFCFCF;margin-left:4px;margin-right:4px">
					  <option value="1">1</option>
				  	  <option value="2">2</option>
			  	  	  <option value="3">3</option>
		  	  	  	  <option value="4">4</option>
	  	  	  	  	  <option value="5">5</option>
  	  	  	  	  	  <option value="6">6</option>
					  <option value="7">7</option>
				  	  <option value="8">8</option>
			  	  	  <option value="9">9</option>
		  	  	  	  <option value="10">10</option>
	  	  	  	  	   <option value="11">11</option>
				  	  <option value="12">12</option>
			  	  	  <option value="13">13</option>
		  	  	  	  <option value="14">14</option>
	  	  	  	  	  <option value="15">15</option>
  	  	  	  	  	  <option value="16">16</option>
					  <option value="17">17</option>
				  	  <option value="18">18</option>
			  	  	  <option value="19">19</option>
		  	  	  	  <option value="20">20</option>
		  	  	  	   <option value="21">21</option>
				  	  <option value="22">22</option>
			  	  	  <option value="23">23</option>
		  	  	  	  <option value="24">24</option>
	  	  	  	  	  <option value="25">25</option>
  	  	  	  	  	  <option value="26">26</option>
					  <option value="27">27</option>
				  	  <option value="28">28</option>
			  	  	  <option value="29">29</option>
		  	  	  	  <option value="30">30</option> 
		  	  	  	   <option value="31">31</option>  	 	  	  	  	  
					  </select>
					  <span id="">日</span>
				</p>
				<p class="p-ckbox week">
					  <input type="radio" name="timeType" id="weekendSale" value="4" /><label for="weekendSale">按周促销</label>
					  <input type="checkbox" name="" id="mo" value="1" class="uni2"/><label for="mo">周一</label>
					  <input type="checkbox" name="" id="Te" value="2" class="uni2"/><label for="Te">周二</label>
					  <input type="checkbox" name="" id="We" value="3" class="uni2"/><label for="We">周三</label>
					  <input type="checkbox" name="" id="Th" value="4" class="uni2"/><label for="Th">周四</label>
					  <input type="checkbox" name="" id="Fr" value="5" class="uni2"/><label for="Fr">周五</label>
					  <input type="checkbox" name="" id="Sa" value="6" class="uni2"/><label for="Sa">周六</label>
					  <input type="checkbox" name="" id="Su" value="7" class="uni2"/><label for="Su">周日</label>
				</p>
				</div>
			<!--top end-->
			</div>
		    <div class="content1"  id="">
			<!--表格+tree -->
			<div class="tble">
			<div class="tranLeft" style="overflow:auto;border:1px solid #e3e3e3;">
					<div class="left-tree">
						<input type="hidden"/>
						<ul id="assosiator-tree" class="ztree"></ul>
					</div>							
			</div>
			<div class="tablebox retailDetailTable">
				<div class="grid-wrap" style="width:100%;height:100%">
					<table id="jqGrid_score" class="zxsaastable" ></table>
				    <div id="jqGridPagerscore"></div>
				</div>
			</div></div>
			<!--表格 +tree  end-->
			</div>
			
			
			</div>
		<!--充值赠送设置页面结束   -->
		
	
	</body>
	<jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/addCashSale.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
    <script type="text/javascript">
    $(function(){
       initial();
       $("#startDate").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
       $("#endDate").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
    });
	</script>
</html>
