<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>批发特价单</title>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
	<jsp:include page="../../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/promotion/promotion-base.css?v=${version}" />
	<style type="text/css">
	body {
		padding: 20px;
		padding-top: 10px;
	}
	</style>
	<script type="text/javascript">
	var basePath = "${basePath}";
	var campanyId = "${campanyId}";
	</script>
  </head>
  
  <body>
	<!--头部-->
	<div class="well">
		<div id="AUTH" data-code="PFTJSP" class="btn-group btnHundred" role="group" >
			<button type="button" class="addAudit btn" onclick="firstPage()">首页</button>
			<button type="button" class="addAudit btn" onclick="backPage()">上一页</button>
			<button type="button" class="addAudit btn" onclick="nextPage()">下一页</button>
			<button type="button" class="addAudit btn" onclick="lastPage()">末页</button>
			<button type="button" class="addAudit btn" onclick="addBtClick()">新增</button>
		    <button type="button" class="btn saveData" onclick="saveBtClick()">保存</button>	
		    <div class="btn-group">
			    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
			     	作废
			      <span class="caret"></span>
			    </button>
			    <ul class="dropdown-menu" role="menu">
			      <li><a onclick="cancleBills()" class="cancleBills">作废</a></li>
			      <li><a onclick="disCancleBills()" class="disCancleBills">恢复</a></li>
			    </ul>
			</div>
			<div class="btn-group">
			    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
			     	停用
			      <span class="caret"></span>
			    </button>
			    <ul class="dropdown-menu" role="menu">
			      <li><a onclick="disableBills()" class="disableBills">停用</a></li>
			      <li><a onclick="enableBills()" class="enableBills">启用</a></li>
			    </ul>
			</div>
			<div class="btn-group">
			    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
			     	审核
			      <span class="caret"></span>
			    </button>
			    <ul class="dropdown-menu" role="menu">
			      <li><a onclick="judgeBills()" class="judgeBills">审核</a></li>
			      <li><a onclick="disJudgeBills()" class="disJudgeBills">取消</a></li>
			    </ul>
			</div>
		    <button type="button" class="btn" data-toggle="modal" data-target="#cancelChoose" data-eventname="printbtn">查询</button>		
		    <div class="btn-group">
			    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
			     	导入促销明细
			      <span class="caret"></span>
			    </button>
			    <ul class="dropdown-menu" role="menu">
			      <li><a href="#">导入促销明细</a></li>
			      <li><a href="#">导入模版下载</a></li>
			      <li><a href="#">导出促销明细</a></li>
			    </ul>
			</div>
		    <button type="button" class="btn" data-eventname="printbtn">延长效期</button>
		</div>
		<form id="form1">
			<div class="inputbox container-fluid clearfix">
				<!--<div class="tip"><p class="tip_p">已发货</p></div>-->
				<div class="row">
					<div class="Zpercent">
						<input type="text" name="id" style="display: none;"/>
						<span class="box_text2">单据编号：</span><span class="box_input input-group"><input type="text" class="form-control2" name="billsCode" readonly/></span>
					</div>
					<div class="Zpercent">
						<span class="box_text2">方案名称：</span><span class="box_input input-group"><input type="text" class="form-control2" name="planName" /></span>
					</div>
					<div class="Zpercent">
						<span for="datetimepickerStart" class="box_text2">单据日期：</span><span class="box_input input-group"><input type="text" class="form-control2" id="datetimepickerStart" name="billsDate" placeholder="年-月-日"  /></span>
					</div>
					
				</div>
				<div class="row">
				  <div class="Zpercent">
						<span for="datetimepickerStart" class="box_text2">促销生效日期：</span><span class="box_input input-group"><input type="text" class="form-control2" id="datetimepickerStart1" name="beginDate" placeholder="年-月-日"  /></span>
					</div>
					<div class="Zpercent">
						<span for="datetimepickerStart" class="box_text2">促销截止日期：</span><span class="box_input input-group"><input type="text" class="form-control2" id="datetimepickerEnd1" name="endDate" placeholder="年-月-日"  /></span>
					</div>
				</div>
			</div>
			<div class="rightMap" style="width: 420px;">
				<img id="billsStautsImg1" src="${basePath}/images/status/statusAudit.png" style="display: none;"/><!--  -->
				<img id="billsStautsImg2" src="${basePath}/images/status/statusCancellation.png" style="display: none;"/>
				<img id="billsStautsImg3" src="${basePath}/images/status/statusAudit.png" style="display: none;"/>
				<img id="billsStautsImg4" src="${basePath}/images/status/statusAudit.png" style="display: none;"/>
				<img id="billsStautsImg5" src="${basePath}/images/status/statusAudit.png" style="display: none;"/>
			</div>
		</form>
	</div>
	<!--促销时段-->
	<fieldset class="fieLeft" id="form2">
		<legend>促销时段</legend>
		<div class="">
			<label class="radio-inline">
			  <input type="radio" class="radio_sales" id="salesTime1" name="cxDateType" value="1" checked="checked"> 有效期内所有时段
			</label><br />
			<label class="radio-inline">
			  <input type="radio" class="radio_sales" id="salesTime2" name="cxDateType" value="2"> 每月
			</label>
			<select id="salesTimeSelects" class="js-example-basic-multiple" name="cxDateValueForMonth" multiple="multiple" style="width: 400px;">
				<!--option[value="$$@1"]{$$@1}*31-->
				<option value="01">01</option>
				<option value="02">02</option>
				<option value="03">03</option>
				<option value="04">04</option>
				<option value="05">05</option>
				<option value="06">06</option>
				<option value="07">07</option>
				<option value="08">08</option>
				<option value="09">09</option>
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
			</select>&nbsp;&nbsp;&nbsp;日
		</div>
	</fieldset>
	<ul class="nav nav-tabs" id="gridTabs" style="margin-top: 40px;">
	   <li class="active"><a href="#tab1-1" data-toggle="tab">商品特价设置</a></li>
	   <li><a href="#tab1-2" data-toggle="tab">促销范围设置</a></li>
	</ul>
	<div class="tab-content">
	   <div class="tab-pane fade in active" id="tab1-1">
			<fieldset class="fieLeft" id="">
				<legend>特价商品</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid1_1"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab1-2">
			<fieldset class="fieLeft" id="">
				<legend>促销范围设置</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid1_2"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	</div>
	<!-- 引用自定义JS文件 -->
	<script src="${basePath}/model/erp/model-promotion-bills.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/promotion/wholesale-goods.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
  </body>
  
  
</html>

<!-- 商品引用 -->
<div class="modal fade" id="goodsnameReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                  商品引用
            </h4>
         </div>
         <div class="modal-body">
			<iframe name="goodsnameReferenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/Tgoodsname/reference"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 往来单位引用 -->
<div class="modal fade" id="contactUnitReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                  往来单位引用
            </h4>
         </div>
         <div class="modal-body">
			<iframe name="contactUnitReferenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/TcontactUnit/reference"></iframe>
         </div>
	  </div>
	</div>
</div>


<!-- 引用在库串号录入 -->
<div class="modal fade" id="inputStorageImeiModal" tabindex="-1" role="dialog"  aria-hidden="false">
   <div class="modal-dialog" style="width:80%;" id="inputStorageImeiModal_body">
      <div class="modal-content">
	     <div class="modal-header">
	           <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
	           <h4 class="modal-title">
	                                      引入在库串号
	           </h4>
	     </div>
         <div class="modal-body" style="margin-bottom: 20px;">
        	<div class="form-horizontal" role="form"> 
			    <!-- /S 表单控件  -->
				<div class="form-group">
				  <!-- 商品名称 -->
				  <label class="control-label" style="text-align: left;font-size: 16px;position: relative;left: 30px;"><span style="font-weight: normal;">商品信息：</span><span  id="goodsnameTitle2">dfd适当的anp</span></label>
				  <label class="control-label"  style="text-align: left;font-size:16px;position: relative;left: 150px;"><span style="font-weight: normal;">仓库名称：</span><span  id="storagenameTitle2">dfd适当的anp</span></label>
			      <input type="text" class="form-control" name="" id="dataGridRowId2" style="display: none;">
			      <input type="text" class="form-control" name="" id="dataGridIRow2" style="display: none;">
			      <button type="button" class="btn btn-w btn-info pull-right"  onclick="saveInputImei()" style="display: block;margin-left: 5px;margin-right: 18px;">保存</button>
			      <button type="button" class="btn btn-warning pull-right" data-dismiss="modal" style="display: block;margin-right: 10px;">取消</button>
				</div>
			</div>
			<div style="height: 30px;line-height: 30px;padding-left: 10px;padding-right: 10px;">
				<span class="pull-left">在库串号信息</span>
			</div>
			
			<div style="padding-left: 0px;padding-right: 0px;float: left;" id="inputStorageImeiModal_grid4">
				<!-- /S 表体 -->
				<div class="jqGrid_wrapper">
					<table id="dataGrid4"></table> 
				</div><!-- /E 表体 -->
			</div>
			<div style="padding-left: 0px;padding-right: 0px;float: left;width: 60px;" id="inputStorageImeiModal_tools">
				<div class="glyphicon glyphicon-fast-forward" onclick="inAllBtClick()" style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
				<div class="glyphicon glyphicon-chevron-right" onclick="inBtClick()" style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
				<div class="glyphicon glyphicon-fast-backward" onclick="outAllBtClick()" style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
				<div class="glyphicon glyphicon-chevron-left" onclick="outBtClick()" style="margin-left: 22px;margin-bottom: 20px;margin-top: 20px;cursor: pointer;"></div>
			</div>			
			<div style="padding-left: 0px;padding-right: 0px;float: left;" id="inputStorageImeiModal_grid5">
				<span style="position: absolute;margin-left: 20px;margin-top: -26px;">已选择数：<span id="havedInputNum" >0</span></span>
				<!-- /S 表体 -->
				<div class="jqGrid_wrapper">
					<table id="dataGrid5"></table> 
				</div><!-- /E 表体 -->
			</div>
			<div style="padding-left: 0px;padding-right: 0px;float: left;width: 200px;min-height: 180px;width: 180px;margin-left: 13px;" id="inputStorageImeiModal_info">
				<textarea id="inputStorageImeiModal_info_text"  style="background-color: rgb(235, 235, 228);width: 179px;"></textarea>
			</div>
         </div>
	  </div>
	</div>
</div>

