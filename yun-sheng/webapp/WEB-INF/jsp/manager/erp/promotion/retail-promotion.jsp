<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>零售促销单</title>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
	<jsp:include page="../../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/promotion/promotion-base.css?v=${version}" />
	<style type="text/css">
	body{
		padding: 20px;
		padding-top: 10px;
	}
	html{
		padding-right: 20px;
	}
	</style>
	<script type="text/javascript">
	var basePath = "${basePath}";
	</script>
  </head>

  <body>
	<!--头部-->
	<div class="well">
		<div id="AUTH" data-code="LSCXD" class="btn-group btnHundred" role="group" >
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
		    <button type="button" class="btn" onclick="filterBtClick()">查询</button>		
		    <div class="btn-group hide">
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
		    <button type="button" class="btn hide" data-eventname="printbtn">延长效期</button>
		    <button type="button" class="btn" onclick="location.href='${basePath}/promotion/promotionPriority'" data-eventname="printbtn">促销重叠优先级</button>
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
				<img id="billsStautsImg1" src="${basePath}/images/status/statusAudit.png" style="display: inline-block;"/><!--  -->
				<img id="billsStautsImg2" src="${basePath}/images/status/statusCancellation.png" style="display: inline-block;"/>
				<img id="billsStautsImg3" src="${basePath}/images/status/statusAudit.png" style="display: inline-block;"/>
				<img id="billsStautsImg4" src="${basePath}/images/status/statusAudit.png" style="display: inline-block;"/>
				<img id="billsStautsImg5" src="${basePath}/images/status/statusAudit.png" style="display: inline-block;"/>
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
			<br />
			<label class="radio-inline">
			  <input type="radio" class="radio_sales" id="salesTime3" name="cxDateType" value="3"> 每周
			</label>
		    <label>
		      <input type="checkbox" class="salesBox" name="cxDateValueForWeek" value="1"> 星期一
		    </label>
		    <label>
		      <input type="checkbox" class="salesBox" name="cxDateValueForWeek" value="2"> 星期二
		    </label>
		    <label>
		      <input type="checkbox" class="salesBox" name="cxDateValueForWeek" value="3"> 星期三
		    </label>
		    <label>
		      <input type="checkbox" class="salesBox" name="cxDateValueForWeek" value="4"> 星期四
		    </label>
		    <label>
		      <input type="checkbox" class="salesBox" name="cxDateValueForWeek" value="5"> 星期五
		    </label>
		    <label>
		      <input type="checkbox" class="salesBox" name="cxDateValueForWeek" value="6"> 星期六
		    </label>
		    <label>
		      <input type="checkbox" class="salesBox" name="cxDateValueForWeek" value="7"> 星期日
		    </label>
		</div>
	</fieldset>
	<!--促销类型-->
	<fieldset class="fieLeft" id="form3">
		<legend>促销类型</legend>
		<div class="">
			<label class="radio-inline">
			  <input type="radio" name="cxType" class="radio_Clazz" id="salesClazz1" value="1" checked> 零售特价商品
			</label>
			<label class="radio-inline">
			  <input type="radio" name="cxType" class="radio_Clazz" id="salesClazz2" value="2"> 零售打折促销
			</label>
			<label class="radio-inline">
			  <input type="radio" name="cxType" class="radio_Clazz" id="salesClazz3" value="3"> 零售返券促销
			</label>
			<label class="radio-inline">
			  <input type="radio" name="cxType" class="radio_Clazz" id="salesClazz4" value="4"> 零售赠品促销
			</label>
			<label class="radio-inline">
			  <input type="radio" name="cxType" class="radio_Clazz" id="salesClazz5" value="5"> 组合促销
			</label>
		</div>
	</fieldset>
	<!--促销范围-->
	<fieldset class="fieLeft" id="form4">
		<legend>促销范围</legend>
		<div class="">
			<label class="area">
		      	促销对象
		    </label>
			<label class="radio-inline">
			  <input type="radio" name="cxObject" class="radio_Obj" id="salesObj1" value="1"> 全场
			</label>
			<label class="radio-inline">
			  <input type="radio" name="cxObject" class="radio_Obj" id="salesObj2" value="2"> 商品
			</label>
			<label class="radio-inline">
			  <input type="radio" name="cxObject" class="radio_Obj" id="salesObj3" value="3"> 商品分类
			</label>
			<label class="radio-inline">
			  <input type="radio" name="cxObject" class="radio_Obj" id="salesObj4" value="4"> 品牌
			</label>
			<br />
			<label class="area">
			  	门店范围
			</label>
			<select id="salesAreaSelects" class="js-example-basic-multiple" multiple="multiple"  style="width: 400px;">
			</select>
			<input type="text" style="display: none;" name="sectionRangeId"  id="sectionRangeId">
		</div>
	</fieldset>
	<div class="toggle" id="form5">
		 <label>
	      <input type="checkbox" class="flag" id="flag2" name="discountFlag"> 是否同时参与折扣
	    </label>
	    <label>
	      <input type="checkbox" class="flag" id="flag3" name="couponFlag"> 是否同时参与返券
	    </label>
	    <label>
	      <input type="checkbox" class="flag" id="flag4" name="giftFlag"> 是否同时参与赠品
	    </label>
	</div>
	
	<ul class="nav nav-tabs" id="gridTabs" style="display: none;">
	   <li class="active"><a href="#tab1-2" data-toggle="tab">零售特价商品-商品</a></li>
	   <li><a href="#tab2-1" data-toggle="tab">零售打折促销-全场</a></li>
	   <li><a href="#tab2-2" data-toggle="tab">零售打折促销-商品</a></li>
	   <li><a href="#tab2-3" data-toggle="tab">零售打折促销-商品分类</a></li>
	   <li><a href="#tab2-4" data-toggle="tab">零售打折促销-品牌</a></li>
	   <li><a href="#tab3-1" data-toggle="tab">零售返卷促销-全场</a></li>
	   <li><a href="#tab3-3" data-toggle="tab">零售返卷促销-商品分类</a></li>
	   <li><a href="#tab3-4" data-toggle="tab">零售返卷促销-品牌</a></li>
	   <li><a href="#tab4-1" data-toggle="tab">零售赠品促销-全场</a></li>
	   <li><a href="#tab4-3" data-toggle="tab">零售赠品促销-商品分类</a></li>
	   <li><a href="#tab4-4" data-toggle="tab">零售赠品促销-品牌</a></li>
	   <li><a href="#tab5-" data-toggle="tab">组合促销</a></li>
	</ul>
	<div class="tab-content">
	   <div class="tab-pane fade in active" id="tab1-2">
			<fieldset class="fieLeft" id="">
				<legend>特价商品</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid1_2"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab2-1">
			<fieldset class="fieLeft" id="">
				<legend>通用折扣率</legend>
				<div class="form-horizontal">
					<div class="Zpercent">
						<input type="text" name="id" style="display: none;"/>
						<span class="box_text2">通用折扣率：</span><span class="box_input input-group">
						  <input type="text" class="form-control2" name="allDiscountRate"/>
						</span>
					</div>				  
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab2-2">
			<fieldset class="fieLeft" id="">
				<legend>商品折扣</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid2_2"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab2-3">
			<fieldset class="fieLeft" id="">
				<legend>商品分类折扣</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid2_3"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab2-4">
			<fieldset class="fieLeft" id="">
				<legend>品牌折扣</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid2_4"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab3-1">
			<fieldset class="fieLeft" id="">
				<legend>整单满额返卷</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid3_1"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab3-3">
			<fieldset class="fieLeft" id="">
				<legend>商品分类满额返卷</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid3_3"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab3-4">
			<fieldset class="fieLeft" id="">
				<legend>商品品牌满额返卷</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid3_4"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab4-1">
			<fieldset class="fieLeft" id="">
				<legend>整单满额赠品</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid4_1"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab4-3">
			<fieldset class="fieLeft" id="">
				<legend>商品分类满额赠品</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid4_3"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab4-4">
			<fieldset class="fieLeft" id="">
				<legend>品牌满额赠品</legend>
				<div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid4_4"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	   <div class="tab-pane fade" id="tab5-">
			<fieldset class="fieLeft" id="">
				<div>
					<div class="calc" style="display: block;">
						<span>组合商品</span>
					</div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid5_1"></table> 
					</div><!-- /E 表体 -->
				</div>
				<div style="margin-top: 50px;">
					<div class="calc" style="display: block;">
						<span>组合明细</span>
						快速计算：
						组合优惠价 = 零售价 
						<select name="" id="selectClazz" style="width: 100px;">
							<option value="1">加</option>
							<option value="2">减</option>
							<option value="3">乘</option>
							<option value="4">除</option>
						</select>
						<input type="text" class="inputZ" name="" id="twoCalc" />
						<button class="btn btn-default calcResult">计 算</button>
						<label>
			      		<input type="checkbox" class="result" checked="checked"> 计算结果取整数
			    		</label>
					</div>
					<div class="jqGrid_wrapper">
						<table id="dataGrid5_2"></table> 
					</div><!-- /E 表体 -->
				</div>
			</fieldset>
	   </div>
	</div>
	<!-- 引用自定义JS文件 -->
	<script src="${basePath}/model/erp/model-promotion-bills.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/promotion/retail-promotion.js?v=${version}" type="text/javascript" charset="utf-8"></script>
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
         <div class="modal-body" style="padding: 0px;">
			<iframe name="goodsnameReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;" src="${basePath}/Tgoodsname/reference"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 商品类别引用 -->
<div class="modal fade" id="goodsClassReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:630px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 商品类别引用
            </h4>
         </div>
         <div class="modal-body" style="padding: 0px;">
			<iframe name="goodsClassReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/Tgoodsclass/reference"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 商品品牌引用 -->
<div class="modal fade" id="goodsBrandReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:800px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 商品品牌引用
            </h4>
         </div>
         <div class="modal-body" style="padding: 0px;">
			<iframe name="goodsBrandReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/Tgoodsbrand/reference"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 零售促销卷引用 -->
<div class="modal fade" id="retailTicketReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:800px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 零售促销卷引用
            </h4>
         </div>
         <div class="modal-body" style="padding: 0px;">
			<iframe name="retailTicketReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/CretailTicketInfo/reference"></iframe>
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



<!-- 模态框（过滤条件） -->
<div class="modal fade" id="filterParamModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog dialogHeight" style="width: 880px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">查询窗口</h4>
			</div>
			<div class="modal-body">
				<!-- 表单 -->			
				<form class="form-horizontal filterParamForm" role="form">
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label for="firstname" class="col-sm-5 control-label">开始日期：</label>
					    <div class="col-sm-6">
							<input type="text" class="form-control" name="billsDateBegin" id="billsDateBegin">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">结束日期：</label>
					    <div class="col-sm-6">
							<input type="text" class="form-control" name="billsDateEnd" id="billsDateEnd">
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">方案名称：</label>
					    <div class="col-sm-6">
							<input type="text" class="form-control" name="nameKeyWord">
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="firstname" class="col-sm-5 control-label">作废状态：</label>
					    <div class="col-sm-6">
							<select class="form-control" name="cancleStatus">
								<option value="0">未作废</option>
								<option value="1">已作废</option>
								<option value="" selected="selected">全部</option>
							</select>
					    </div>
					  </div>
				  </div>
				  <div class="col-sm-4">
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">停用状态：</label>
					    <div class="col-sm-6">
							<select class="form-control" name="disableStatus">
								<option value="0">未停用</option>
								<option value="1">已停用</option>
								<option value="" selected="selected">全部</option>
							</select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label for="lastname" class="col-sm-5 control-label">审核状态：</label>
					    <div class="col-sm-6">
							<select class="form-control" name="judgeStatus">
								<option value="0">未审核</option>
								<option value="1">已审核</option>
								<option value="" selected="selected">全部</option>
							</select>
					    </div>
					  </div>
				  </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-danger" onclick="javascript:queryPage();$('#filterParamModalDialog').modal('hide');">查询</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				<button  type="button" class="btn btn-w btn-info" onclick="resetQueryForm()">重置</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

