<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
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
		
		<!--<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/blocMessage.CSS?v=${version}"/>-->
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/unit.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		
		<title>往来单位</title>
		<style>
		#myModal .modal-content,#modalUpdate .modal-content{width:1100px;}
		
		</style>
	</head>

	<body>
		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div id="AUTH" data-code="WLDW" class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default add" data-eventname="add" data-toggle="modal">新增</button>
			  <button type="button" class="btn btn-default updateBloc" data-eventname="update" data-toggle="modal" >修改</button>	
			  <button type="button" class="btn btn-default btnDeleteRow" data-eventname="delete">删除</button>
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname='qiyon' id="0" >启用</button>
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname="jinyon" id="1">禁用</button>
			  <button class="btn btn-default" onclick="setReload()">刷新 </button>
			  <button type="button" class="btn btn-default area" data-eventname="printbtn" data-toggle="modal" data-target="#modalArea">地区管理</button>
			  <button type="button" class="btn btn-default unitShow" data-eventname="printbtn" data-toggle="modal" data-target="">往来单位类别</button>
			  <button type="button" class="btn btn-default" onclick="window.parent.openWorkBoxByMenutext('往来单位导入','${basePath}/beginning/contactUnit/toPage');">导入</button>
			  <button type="button" class="btn btn-default" id="export">导出</button>
			</div>
			
			<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
		 			 <div class="row">
						<div class="Zpercent form-group" style="min-width:380px">
							<span for="" class="box_text2">单位查询：</span><div class="col-sm-8" style="width:auto;">
								<div class="input-group"><input type="text" id="keyword" class="form-control2"  placeholder="请输入往来单位名称、编码、助记码"  style="font-size:0.5em;width:215px;"/></div></div>
						</div>
						<div class="Zpercent form-group">
							<label>显示禁用：
						      <input type="checkbox" id="xsjy">
						  </label>
						</div>
						<div class="Zpercent form-group">
							 <button type="button" class="btn btn-success ">查询</button>
						</div>
					 </div>
				</div>
			</form>
			<!-------------------------------------表格开始----------------------------------------->
				</div>
				<div class="left">
					<!--<div class="left-s">部门名称</div>-->
					<div class="left_tree">
						<ul id="publicModelTree" class="ztree"></ul>
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
			<!-------------------------------------表格结束----------------------------------------->
		
		<!--新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" >
							新增信息
						</h4>
					</div>
					<div class="modal-body" >
						<ul class="nav nav-tabs tab">
							<li role="presentation" class="active tabLi">
								<a >新增往来单位</a>
							</li>
							<li role="presentation" class="tabLi">
								<a >新增送货地址</a>
							</li>
						</ul>
						<div class="showTab addTab">
							<div class="current change">
								<form class="">
									<!--必填-->
									<fieldset class="fieLeft" >
												<legend>基本项</legend>
												<div class="">
													<label for="">公司名称:</label>
													<input type="text" disabled="disabled" class="companyName" />
													<span class="msg"></span>
												</div>
												<div class="">
													<label for="">往来单位名称:</label>
													<input type="text" class="data nameCheck" name="name"/>
													<span style='color:red;'></span>
												</div>
												<div class="">
													<label for="">往来单位编码:</label>
													<input type="text" class="data" name="code"  placeholder="留空时系统自动编码" />
													<span style='color:red;'></span>
												</div>
												<div class="">
													<label for="">所属区域:</label>
													<select name="districtId" class="districtId  areaAdd">
													</select>
													<a data-toggle="modal" data-target="#modalAreaAdd">地区新增</a>
													<span style='color:red;'></span>
												</div>
												<div class="">
													<label for="">往来单位类别:</label>
													<select name="typeId" class="typeId  tAdd">
													</select>
													<a data-toggle="modal" class='unitAdd' style="cursor:pointer;">新增往来单位类别</a>
													<span style='color:red;'></span>
												</div>
												<div class="">
													<label for="">助记码:</label>
													<input type="text"  name="remCode" class="data"/>
													<span class="msg"></span>
												</div>
											</fieldset>
									<!--选填项-->
									<fieldset class="fieTwo fieLeft" id="">
										<legend>详细项</legend>
										<div class="">
											<label for="">发展日期:</label>
												<input type="text" id="datetimepickerStart" class='data' name="developDay" placeholder="年-月-日" />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">业务员:</label>
											<select name="salesmanId" class="salesmanId data">
											</select>
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">联系人:</label>
											<input type="text" name="linkman" class="data" />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">联系方式:</label>
											<input type="text" name="contact" class="data" />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">公司全称:</label>
											<input type="text" name="companyFullName" class="data"/>
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">纳税人识别号:</label>
											<input type="text" name="taxpayerNumber" class="data" />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">公司地址:</label>
											<input type="text" name="companyAddr" class="data" maxLength=100 />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">开户行:</label>
											<select name="brankNameCode" class="brankNameCode data">
											</select>
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">银行户名:</label>
											<input type="text" name="customer" class="data"/>
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">银行帐号:</label>
											<input type="text" name="brankAmount"  class="data" />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">额度:</label>
											<input type="text" name="limit" onkeyup="checkInput.checkNum(this,12)" class="data edAdd" placeholder='0.00' />
											<span style='color:red;'></span>
										</div>
										<div class="">
											<label for="">账期:</label>
											<input type="text" name="paymentDays" onkeyup="checkInput.clearNoNum(this,10)" class="data zqAdd"  />
											<span style='color:red;'></span>
										</div>


										<div >
											<label for="addpurchaseOrderRequired" style="width:200px;">
												<input type="checkbox" id="addpurchaseOrderRequired" name="purchaseOrderRequired"> 必须引入采购订单
											</label>

										</div>
										<div >
											<label for="addsalesOrderRequired" style="width:200px;">
												<input type="checkbox" id="addsalesOrderRequired" name="salesOrderRequired"> 必须引入销售订单
											</label>

										</div>

										<div class="">
											<label for="mergeContactsUnit_add">是否合并往来款:</label>
											<input type="checkbox" class="addCheckCon data"  name="mergeCurrentAccount"  value="1" id="mergeContactsUnit_add"/>
											<span class="msg"></span>
										</div>
										<div class="demo  hidden">
											<label for="">合并往来单位名称:</label>
											<select name="mergeContactsUnit" class="hbwldw"  >
											</select>
											<span class="msg"></span>
										</div>
											<div class="">
											<label for="">备注:</label>
											<input type="text" name="remark" class="data" maxLength=100 />
											<span class="msg"></span>
										</div>
										
									</fieldset>
								</form>
								<span class="checkMsg"></span>
							</div>
							<div class="change">
								<a data-toggle="modal" class='addChe'>新增送货地址</a>
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="margin-top:10px;width:912px;min-width:912px;">
										<table id="jqGrid_empManage" class="zxsaastable">
										</table>
										<div id="jqGridPager_empManage"></div>
									</div>
								</div>
							</div>
						
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn saveContact">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--修改弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							修改信息
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<ul class="nav nav-tabs tab">
							<li role="presentation" class="active updateLi">
								<a >修改往来单位</a>
							</li>
							<li role="presentation" class="updateLi">
								<a >修改送货地址</a>
							</li>
						</ul>
						<div class="showTab updateTab">
							<div class="current change">
								<form class="">
									<!--必填-->
									<fieldset class="fieLeft" id="">
									<legend>基本项</legend>
													<input type="hidden" name="id" >
													<div class="">
													<label for="">公司名称:</label>
													<input type="text" disabled="disabled" class="companyName" />
													<span class="msg"></span>
												</div>
												<div class="">
													<label for="">往来单位名称:</label>
													<input type="text" class="data nameCheckUp" name="name" />
													<span style='color:red;'></span>
												</div>
												<div class="">
													<label for="">往来单位编码:</label>
													<input type="text" class="data" name="code" />
													<span style='color:red;'></span>
												</div>
												<div class="">
													<label for="">所属区域:</label>
													<select name="districtId" class="districtId  areaUp">
													</select>
													<a data-toggle="modal" data-target="#modalAreaAdd">地区新增</a>
													<span style='color:red;'></span>
												</div>
												<div class="">
													<label for="">往来单位类别:</label>
													<select name="typeId" class="typeId  tUp">
													</select>
													<a data-toggle="modal" class='unitAdd' style="cursor:pointer;">新增往来单位类别</a>
													<span style='color:red;'></span>
												</div>
												<div class="">
													<label for="">助记码:</label>
													<input type="text"  name="remCode" class="data" />
													<span class="msg"></span>
												</div>
											</fieldset>
									<!--选填项-->
									<fieldset class="fieTwo fieLeft" id="">
										<legend>详细项</legend>
										<div class="">
											<label for="">发展日期:</label>
												<input type="text" id="datetimepickerStart" name="developDay" placeholder="年-月-日" />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">业务员:</label>
											<select name="salesmanId" class="salesmanId data">
											</select>
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">联系人:</label>
											<input type="text" name="linkman" class="data" />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">联系方式:</label>
											<input type="text" name="contact" class="data"/>
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">公司全称:</label>
											<input type="text" name="companyFullName" class="data"/>
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">纳税人识别号:</label>
											<input type="text" name="taxpayerNumber" class="data" />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">公司地址:</label>
											<input type="text" name="companyAddr" class="data" maxLength=100 />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">开户行:</label>
											<select name="brankNameCode" class="brankNameCode data">
											</select>
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">银行户名:</label>
											<input type="text" name="customer" class="data"  />
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">银行帐号:</label>
											<input type="text" name="brankAmount"  class="data"/>
											<span class="msg"></span>
										</div>
										<div class="">
											<label for="">额度:</label>
											<input type="text" name="limit" onkeyup="checkInput.checkNum(this,12)" class="data edUp" value='0.00' placeholder='0.00' />
											<span style='color:red;'></span>
										</div>
										<div class="">
											<label for="">账期:</label>
											<input type="text" name="paymentDays" onkeyup="checkInput.clearNoNum(this,10)" class="data zqUp" value='0' />
											<span style='color:red;'></span>
										</div>
										<div >
											<label for="editpurchaseOrderRequired" style="width:200px;">
												<input type="checkbox" id="editpurchaseOrderRequired" name="purchaseOrderRequired"> 必须引入采购订单
											</label>

										</div>
										<div >
											<label for="editsalesOrderRequired" style="width:200px;">
												<input type="checkbox" id="editsalesOrderRequired" name="salesOrderRequired"> 必须引入销售订单
											</label>

										</div>
										<div class="">
											<label for="mergeContactsUnit_modify">是否合并往来款:</label>
											<input type="checkbox" class="modifyCheckCon data" name="mergeCurrentAccount"  value="1" id="mergeContactsUnit_modify"/>
											<span class="msg"></span>
										</div>
										<div class="demo hidden">
											<label for="">合并往来单位名称:</label>
											<select name="mergeContactsUnit" class="hbwldw" >
											</select>
											<span class="msg"></span>
										</div>
										
										<div class="">
											<label for="">备注:</label>
											<input type="text" name="remark" class="data" maxLength=100 />
											<span class="msg"></span>
										</div>
										
									</fieldset>
								</form>
								<span class="checkMsg"></span>
							</div>
							<div class="change">
								<a data-toggle="modal" class='upChe'>新增送货地址</a>
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="margin-top:10px;width:912px;min-width:912px;">
										<table id="jqGrid_sendManage" class="zxsaastable">
										</table>
										<div id="jqGridPager_sendManage"></div>
									</div>
								</div>
							</div>
						
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info updateContact">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		<!--往来单位类别弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalUnit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							往来单位类别管理
						</h4>
					</div>
					<div class="modal-body" id="model-body">
								<a data-toggle="modal" class='unitAdd' style="cursor:pointer;">新增往来单位类别</a>
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="margin-top:10px">
										<table id="jqGrid_unitManage" class="zxsaastable">
										</table>
										<div id="jqGridPager_empManage"></div>
									</div>
								</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--往来单位类别新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalEmpManageAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							往来单位类别新增
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current">
								<div class="areaDiv">
									<label for="">公司名称:</label>
									<input type="text"class="attrData companyName" disabled="disabled" id="addAttrCode" />
								</div>
								<div class="areaDiv">
									<label for="">所属上级:</label>
									<select class="attrData parentLayeerCode"  name="parentId" style='width:155px;height:24px;'>
									</select>
								</div>
								<div class="areaDiv">
									<label for="">编码:</label>
									<input type="text"class="attrData code uCodeCheck" id="addAttrCode" name="code" />
									<span style='color:red;'></span>
								</div>
								<div class="areaDiv">
									<label for="">名称:</label>
									<input type="text" class="attrData name uNameCheck" id="addAttrName" name="name" />
									<span style='color:red;'></span>
								</div>
								<div class="areaDiv">
									<label for="">备注:</label>
									<input type="text"class="attrData remark" name="remark" maxLength=100 />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn addAttr" >保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--往来单位类别修改弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalEmpManageUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							往来单位类别修改
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current">
							<input type="hidden" id="attrIdUp" name="id"/>
								<div class="areaDiv">
									<label for="">公司名称:</label>
									<input type="text"class="attrData companyName" disabled="disabled" name="companyName" id="addAttrCode" />
								</div>
								<div class="areaDiv">
									<label for="">所属上级:</label>
									<select class="attrData parentLayeerCode"  id="parentLayeerCodeUp"   name="parentId" style='width:155px;height:24px;'>
									</select>
								</div>
								<div class="areaDiv">
									<label for="">编码:</label>
									<input type="text"class="attrData codeUp uCodeCheckUp" name="code" value="" id="addAttrCode" name="code" />
									<span style='color:red;'></span>
								</div>
								<div class="areaDiv">
									<label for="">名称:</label>
									<input type="text" class="attrData nameUp uNameCheckUp" name="name" id="addAttrName" name="name" />
									<span style='color:red;'></span>
								</div>
								<div class="areaDiv">
									<label for="">备注:</label>
									<input type="text"class="attrData remarkUp" name="remark" id="addAttrCode" name="remark" maxLength=100 />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn updateAttr" data-rid="" >保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		<!--地址新增弹出窗  修改信息弹出层-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalAddrUpAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog1">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							新增地址
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<div class="unitClazz">
									<label for="">联系人:</label>
									<input name="" id="" class="perU clear" style='width:155px;' />
								</div>
								<div class="unitClazz">
									<label for="">送货地址:</label>
									<input type="text" class="clear addrU" maxLength=100 />
									<span style='color:red;'></span>
								</div>
								<div class="unitClazz">
									<label for="">电话:</label>
									<input type="text" class="clear telphU"/>
									<span style='color:red;'></span>
								</div>
								<div class="unitClazz">
									<label for="">备注:</label>
									<input type="text"  class="clear infoU" maxLength=100 />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info " onclick='addAddressU();' >保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

		<!--地址修改弹出窗  修改弹出层页面-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalAddrUpUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog1">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							修改地址
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
							<input type="hidden" class="uid"/>
								<div class="unitClazz">
									<label for="">联系人:</label>
									<input name="" id="" class="salesman uper" style='width:155px;'/>
								</div>
								<div class="unitClazz">
									<label for="">送货地址:</label>
									<input type="text" class="uaddr" maxLength=100 />
									<span style='color:red;'></span>
								</div>
								<div class="unitClazz">
									<label for="">电话:</label>
									<input type="text" class="utelph"/>
									<span style='color:red;'></span>
								</div>
								<div class="unitClazz">
									<label for="">备注:</label>
									<input type="text"  class="uinfo" maxLength=100 />
								</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
						<button type="button" class="btn btn-info saveAddUp">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		<!--地址新增弹出窗  新增信息弹出层-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalAddrManageAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog1">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							新增地址
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<div class="unitClazz">
									<label for="">联系人:</label>
									<input name="" id="" class="per" style='width:155px;'/>
								</div>
								<div class="unitClazz">
									<label for="">送货地址:</label>
									<input type="text" class="clear addr" maxLength=100 />
									<span style='color:red;'></span>
								</div>
								<div class="unitClazz">
									<label for="">电话:</label>
									<input type="text" class="clear telph"/>
									<span style='color:red;'></span>
								</div>
								<div class="unitClazz">
									<label for="">备注:</label>
									<input type="text"  class="clear info" maxLength=100 />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info addAddress">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--地址修改弹出窗     新增信息弹出层-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalAddrManageUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog1">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							修改地址
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<div class="unitClazz">
									<label for="">联系人:</label>
									<input name="" id="" class="perUp" style='width:155px;'/>
								</div>
								<div class="unitClazz">
									<label for="">送货地址:</label>
									<input type="text" class="addr addUp" maxLength=100 />
									<span style='color:red;'></span>
								</div>
								<div class="unitClazz">
									<label for="">电话:</label>
									<input type="text" class="telph telUp" />
									<span style='color:red;'></span>
								</div>
								<div class="unitClazz">
									<label for="">备注:</label>
									<input type="text"  class="info infoUp" maxLength=100 />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info addAddressUp">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		
		<!--详细信息弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							详细信息
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<div class="">
									<label for="">发展日期:</label>
									<label for=""  class="xdevelopDay data"> </label>
								</div>
								<div class="">
									<label for="">业务员:</label>
									<label for=""   class="xsalesmanName data"></label>
								</div>
								
								<div class="">
									<label for="">联系人:</label>
									<label for=""   class="xlinkman data"></label>
								</div>
								<div class="">
									<label for="">联系方式:</label>
									<label for=""   class="xcontact data"></label>
								</div>
								<div class="">
									<label for="">公司地址:</label>
									<label for=""  class="xcompanyAddr data"></label>
								</div>
								<div class="">
									<label for="">银行名称:</label>
									<label for=""  class="xbrankNameCode data"></label>
								</div>
								
								<div class="">
									<label for="">银行户名:</label>
									<label for="" class="xcustomer data"></label>
								</div>
								<div class="">
									<label for="">银行帐号:</label>
									<label for=""  class="xbrankAmount data"></label>
								</div>
								
								<div class="">
									<label for="">额度:</label>
									<label for="" class="xlimit data"></label>
								</div>
								<div class="">
									<label for="">账期:</label>
									<label for="" class="xpaymentDays data"></label>
								</div>
								
								<div class="">
									<label for="">备注:</label>
									<label for="" class="xremark data"></label>
								</div>
								
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
			<!--地区管理弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalArea" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							地区列表
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<a data-toggle="modal" data-target="#modalAreaAdd">地区新增</a>
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="margin-top:10px">
										<table id="jqGrid_areaManage" class="zxsaastable">
										</table>
										<div id="jqGridPager_areaManage"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--地区新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalAreaAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							地区新增
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="">
							<div class="current ">
								<div class="areaDiv">
									<label for="">地区编码:</label>
									<input type="text" id="addCode"  class="areData"  />
								</div>
								<div class="areaDiv">
									<label for="">地区名称:</label>
									<input type="text" id="addName"class="areData"  />
								</div>
								<div class="areaDiv">
									<label for="">备注:</label>
									<input type="text" id="addRemark" class="areData" maxLength=100 />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn addDq">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--地区修改弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalAreaUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							地区修改
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="">
							<div class="current">
							<input type="hidden" class="areId areData" id="areId"/>
								<div class="areaDiv">
									<label for="">地区编码:</label>
									<input type="text" class="updateCode areData" id="updateCode" />
								</div>
								<div class="areaDiv">
									<label for="">地区名称:</label>
									<input type="text" class="updateName areData" id="updateName" />
								</div>
								<div class="areaDiv">
									<label for="">备注:</label>
									<input type="text" class="updateRemark areData" id="updateRemark" maxLength=100 />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn updateDq" data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-------------------------------------主页面结束----------------------------------------->
		
		
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/common_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/companyManager/unit.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/check.css?v=${version}" />
	<script type="text/javascript">
		$(function(){
			loadmodal();
		})
		
			
		//新增 切换
		$('.tab .tabLi').click(function() {
			console.log($(this).index('.tabLi'));
			$(this).addClass('active').siblings().removeClass('active');
			$('.addTab .change').eq($(this).index('.tabLi')).show().siblings().hide();
			($(this).index('.tabLi') == 1) && loadmodalEmpManage();
		});
		
		//切换
		$('.tab .updateLi').click(function() {
			$(this).addClass('active').siblings().removeClass('active');
			$('.updateTab .change').eq($(this).index('.updateLi')).show().siblings().hide();
			($(this).index('.updateLi') == 1) && loadmodalSendManage();
		});
		
		$(document).on('click','.addCheckCon',function(e){
			($(this).prop('checked')) ? ($('.demo').removeClass('hidden')) : ($('.demo').addClass('hidden'));
		}); 
		$(document).on('click','.modifyCheckCon',function(e){
			($(this).prop('checked')) ? ($('.demo').removeClass('hidden')) : ($('.demo').addClass('hidden'));
		}); 
			
		function setReload(){
    		window.location.reload();
		}
		
	</script>
</html>


