<!-- 
      <资金账户>
      
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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/money.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<title>资金账户</title>
		<style>
			.change form label {margin-right:0px;}
			.check {width:335px;}
			 th {font-weight:bold;}
			.mainSub {min-width: 1175px !important;}
			.left {width: 14%;float: left;}
			.details {width: 86%;float: left;}
			.left_tree {height: 687px;overflow: auto;}
			#saveOrUpdateModal .check{
				width: 299px;			
			}
			#saveOrUpdateModal .change form div{
			    margin: 10px 10px 0 0;
			}
		</style>
		
	</head>
   
	<body >
		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div id="AUTH" data-code="ZJZH" class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default"  onclick="modalsaveOrUpdate(1)">新增</button>
			  <button type="button" class="btn btn-default updateBloc" onclick="modalsaveOrUpdate(2)">修改</button>	
			  <button type="button" class="btn btn-default btnDeleteRow" onclick="disOrEnAccount(2)">删除</button>	
			  <button type="button" class="btn btn-default qiyon" onclick="disOrEnAccount(0)">启用</button>
			  <button type="button" class="btn btn-default jinyon" onclick="disOrEnAccount(1)">禁用</button>
			  <button type="button" class="btn btn-default" onclick="window.location.reload()" style="display: inline-block;">刷新 </button>
			  <button type="button" class="btn btn-default" onclick="window.parent.openWorkBoxByMenutext('资金账户导入','${basePath}/beginning/account/toPage');">导入</button>
			  <button type="button" class="btn btn-default" id="export">导出</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
		
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option">
			<div class="inputbox container-fluid clearfix">
				<div class="row">
					<div class="Zpercent form-group">
						<span for="" class="box_text2">信息查询：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" id="queryText" name="queryText" placeholder="输入账户编码、资金账户、备注"  style="font-size:0.5em"/></div></div>
					</div>
					<div class="Zpercent form-group">
						<label>显示禁用：
					      <input type="checkbox" id="selStatus" class="double">
					  </label>
					</div>
					<div class="Zpercent form-group">
						 <button type="button" class="btn btn-success" onclick="queryAccount()">查询</button>
					</div>
				</div>
			</div>
			</form>
		</div>
			<!-------------------------------------表格开始----------------------------------------->
		<div class="mainSub">
			<div class="left">
				<div class="left_tree">
					<ul id="TreeDom" class="ztree"></ul>
				</div>
			</div>
			<div class="details">
				<div class="right">
					<div class="tablebox retailDetailTable">
						<div class="grid-wrap" style="margin-top:10px">
							<table id="jqGrid_blocMessage" class="zxsaastable">
							</table>
							<div id="jqGridPager"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
			<!-------------------------------------表格结束----------------------------------------->
		</form>
		<!--资金账户新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="saveOrUpdateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="1200px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							资金账户新增
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change clearfix fl" style="width:56%;" id="leftAccount">
								<form id="saveOrUpdateForm">
									<input type="hidden" id="id" name="id" />
									<input type="hidden" id="createUid" name="createUid"/>
									<input type="hidden" id="createTimeString" name="createTimeString"/>
									<input type="hidden" id="groupId" name="groupId"/>
									<input type="hidden" id="companyId" name="companyId"/>
									<div class="check">
										<label for=""><i class="bitianX">*</i>账户类型:</label>
										<select id="accounTypeCode" name="accounTypeCode">
											</select>
										<span style='color:red;'></span>
									</div>
									<div class="check">
									    <label for=""><i class="bitianX">*</i>账户编码:</label>
										<input type="text" id="code" name="code" onblur='checkInput.checkStrNum(this,32);'/>
										<span style='color:red;'></span>
									</div>
									<div class="check">
										<label for=""><i class="bitianX">*</i>账户名称:</label>
											<input type="text" id="name" name="name" onblur='checkInput.checkNotChars(this,32);' />
										<span style='color:red;'></span>
									</div>
									<div class="check">
										<label for="">开户行:</label>
											<input type="text" id="bankNameCode" name="bankNameCode"/>
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="">银行户名:</label>
											<input type="text" id="customer" name="customer" onblur='checkInput.checkNotChars(this,32);' />
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="">银行账号:</label>
											<input type="text" id="bankCard" name="bankCard" onblur='checkInput.checkIdCard(this,"bank");' maxLength=19 />
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="">刷卡最高额:</label>
											<input type="text" id="swipeHighLines" name="swipeHighLines"  placeholder='0.00' onblur='checkInput.checkNum(this,12);'/>
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="">刷卡最低额:</label>
											<input type="text" id="swipeLowLines" name="swipeLowLines"  placeholder='0.00' onblur='checkInput.checkNum(this,12);'/>
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="" >刷卡手续费率(%):</label>
										<input type="text" id="swipeFees" class="DataFormat" name="swipeFees"  placeholder='0.00' onblur='checkInput.checkNum(this,4);' />
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="">手续费顶额:</label>
											<input type="text" id="swipeFeesHigh" name="swipeFeesHigh"  placeholder='0.00' onblur='checkInput.checkNum3(this,6);' />
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="">备注:</label>
											<input type="text" id="remark" name="remark" maxLength=100 />
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="">最低手续费:</label>
										<input type="text" id="swipeFeesLow" name="swipeFeesLow"  placeholder='0.00' />
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="status">是否禁用:</label>
											<input type="checkbox" id="status" name="status" class="textLeft" checked />
									</div>
									<div class="check">
										<label for="merchantCode">银商商户号:</label>
										<input type="text" id="merchantCode" name="merchantCode" maxlength="32"  placeholder='请输入银商商户号' />
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="terminalCode">银商终端号:</label>
										<input type="text" id="terminalCode" name="terminalCode" maxlength="32"  placeholder='请输入银商终端号' />
										<span class="msg"></span>
									</div>
									<div class="check">
										<label for="accessToken">接口密钥:</label>
										<input type="text" id="accessToken" name="accessToken" maxlength="100"  placeholder='请输入接口密钥' />
										<span class="msg"></span>
									</div>
								</form>
								<span class="checkMsg"></span>
							</div>
						</div>
						<!-- 部门选择表格 -->
						<div class="fl" style='width:40%;' >
							<div class='none' >
							  <input type="text"  id="hiddenFilterInName">
							</div>
							<button id='SelFilterInName'>请选择部门</button>
						     <label for="">已选择部门:</label> 
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="margin-top:10px">
										<table id="jqGrid_section" class="zxsaastable">
										</table>
										<div id="jqGridSectionPager"></div>
									</div>
								</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success butHide" onclick="saveAndAddAccount();">保存并新增</button>
						<button type="button" class="btn btn-info" onclick="saveAndCloseAccount();">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.core-3.5.min.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.excheck-3.5.min.js?v=${version}"></script>
	<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.exedit-3.5.min.js?v=${version}"></script>
	<script src="${basePath}/js/erp/authority/initial/account.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/initial/model-initial.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		var basePath = "${basePath}";
		var initialObj = null;
	</script>
</html>


