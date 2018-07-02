<!-- 
      <券信息列表>
      
      Created by LyNnJeR on 2016-09-21 Wednesday.
      Copyright 2016 LyNnJeR. All rights reserved.
 -->
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/jquery-easyui/themes/bootstrap/easyui.css?v=${version}">
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/><!-- 树 -->
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/ticket.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		
		<title>第三方抵扣项</title>
		<style>
			.showModalBtn,.ContactUnitBox{
				display: inline-block;
				position: relative;
				left: -3px;
				top: -1px;
			}
			.showModalBtn>.btn,.ContactUnitBox>.btn{
				padding: 1px 8px
			}
		</style>
	</head>

	<body >
		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div id="AUTH" data-code="DSFQGL" class="btn-group btnHundred" role="group" >
			<button type="button" class="btn btn-default" onclick="modalsaveOrUpdate(1)">新增</button>
			  <button type="button" class="btn btn-default updateBloc" onclick="modalsaveOrUpdate(2)">修改</button>	
			  <button type="button" class="btn btn-default btnDeleteRow" onclick="disOrEnIcoUpOn(2)">删除</button>	
			  <button type="button" class="btn btn-default qiyon" onclick="disOrEnIcoUpOn(0)">启用</button>
			  <button type="button" class="btn btn-default jinyon" onclick="disOrEnIcoUpOn(1)">禁用</button>
			  <button type="button" class="btn btn-default" onclick="window.location.reload()" style="display: inline-block;">刷新 </button>
			  <%--<button type="button" class="btn btn-default" data-eventname="printbtn">导出</button>
			  --%><button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
			</div>
			
			<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="Zpercent form-group">
							<span for="" class="box_text2">信息查询：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" id="queryText" name="queryText" placeholder="输入往来单位、编码、助记码、备注" style="font-size:0.5em;width:210px" /></div></div>
						</div>
						<div class="Zpercent form-group" style='margin-left:20px'>
							<label>显示禁用：
						      <input type="checkbox" id="selStatus" name="selStatus" class="double">
						  </label>
						  <button type="button" class="btn btn-success" id="find_btn" onclick="findData()">查询</button>
						</div>
					</div>
				</div>
			</form>
		</div>
			<!-------------------------------------表格开始----------------------------------------->
			<div class="tablebox retailDetailTable">
				
				<div class="grid-wrap" style="margin-top:10px">
					<table id="jqGrid_blocMessage" class="zxsaastable">
					</table>
					<div id="jqGridPager"></div>
				</div>
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		
		<!--业务酬金新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="saveOrUpdateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							第三方抵扣项新增
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<form id="saveOrUpdateForm">
									<input type="hidden" id="id" name="id" />
									<input type="hidden" id="groupId" name="groupId" />
									<input type="hidden" id="companyId" name="companyId" />
									<input type="hidden" id="createBy" name="createBy" />
									<input type="hidden" id="createDateString" name="createDateString" />
									<div class="">
										<label for="">公司名称:</label>
										<input type="text" id="companyName" name="companyName" readonly value="" />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">往来单位:</label>
										<input type="text" id="contactUnitIdC" name="contactUnitIdC" readonly value="" />
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">活动名称:</label>
											<input type="text" id="couponName" name="couponName" onblur='checkInput.checkNotChars(this,32);' />
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">活动编码:</label>
											<input type="text" id="couponCode" name="couponCode" onblur='checkInput.checkStrNum(this,32);' />
										<span style='color:red;'></span>
									</div>
									<div class="">
										<label for="">助记码:</label>
											<input type="text" id="remCode" name="remCode" onblur='checkInput.checkChinese(this,16);' />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" id="remark" name="remark" maxLength=100 />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">结算差额收支类别:</label>
										<input type="text" id="inpayClassName" name="inpayClassName" readonly value="" />
										<input type="text" name="inpayClassId" style="display: none;">
										<%--<input class="easyui-combotree cla" id="inpayClassId" name="inpayClassId" d style="width:160px;height:32px;">--%>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="status">是否禁用:</label>
											<input type="checkbox" id="status" name="status" class="textLeft" value=""/>
									</div>
								</form>
								<span class="checkMsg"></span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success butHide" onclick="saveAndAddIcoUpOn();">保存并新增</button>
						<button type="button" class="btn btn-info" onclick="saveAndCloseIcoUpOn();">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/jquery-easyui/jquery.easyui.min.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/component.js?v=${version}"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/initial/coUpOn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/initial/model-initial.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		var basePath = "${basePath}";
		var initialObj = null;
	$(document).click(function(e){
	   var con=$('.multi_select');
	   if(!con.is(e.target)&&con.has(e.target).length===0){
		   $('.container_select').addClass('hidden')
	   }
   })
	</script>
</html>


