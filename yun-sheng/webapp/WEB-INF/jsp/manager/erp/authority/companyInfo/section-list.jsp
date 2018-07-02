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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/select2.min.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/depInfo.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<title>部门信息列表</title>
	</head>
	<style>
		.well{
			margin-bottom:10px;
		}
		.demoText {
		    height:27px;
		}
		.change form div.demoText {
		    margin: 1rem 0rem 0 0rem;
		}
		.multi_select {float:none;}
		.multi_select .content>div{
		   width:100%;
		}
		.multi_select .content>div>input{
		   width:9%;
		}
		.multi_select .content>div>label{
		   max-width:88%;
		}
		.adjust{
		   height:auto;
		}
		#myModal input,
		#myModal select,
		#modalUpdate input,
		#modalUpdate select,
		#modalAreaAdd input,
		#modalAreaUpdate input,
		#modalEmpManageAdd input,
		#modalEmpManageUpdate input{
		   height:34px;
		}
		#myModal input.select2-search__field,#modalUpdate input.select2-search__field{
		   height:auto;
		}
		#modifyMultipleTree,#addMultipleTree{
			max-height:180px;
		}

	</style>

	<body >
		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div id="AUTH" data-code="BMXX" class="btn-group btnHundred" role="group" >
			<button type="button" class="btn btn-default add" data-eventname="add">新增</button>
			  <button type="button" class="btn btn-default updateBloc" data-eventname="update" data-toggle="modal" data-target="#modalUpdate">修改</button>	
			  <button type="button" class="btn btn-default btnDeleteRow" data-eventname="delete" data-toggle="modal" data-target="#modalDelete">删除</button>	
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname='qiyon' id="0" >启用</button>
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname="jinyon" id="1">禁用</button>
			  <button type="button" class="btn btn-default area" data-eventname="printbtn" data-toggle="modal" data-target="#modalArea">地区管理</button>
			  <button type="button" class="btn btn-default empManage" data-eventname="printbtn" data-toggle="modal" data-target="#modalEmpManage">部门属性管理</button>
			  <button type="button"   class="btn btn-default " onclick="javascript:$('#dataPowerModalDialog').modal('show');">数据授权</button>
			  <button type="button" class="btn btn-default" onclick="window.parent.openWorkBoxByMenutext('部门导入','${basePath}/beginning/section/toPage');">导入</button>
			  <button type="button"   class="btn btn-default" id="export">导出</button>
			  <button class="btn btn-default" onclick="setReload()">刷新 </button>
			</div>
			<input type="hidden" id="groupId" value='${groupId}'/>
			<!--main开始-->
				<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
		 			 <div class="row">
						<div class="Zpercent form-group">
							<span for="" class="box_text2">查询信息：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2" id="selectInfo"  placeholder="输入部门名称、部门编码、备注" style="font-size:0.5em"/></div></div>
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
				</div>
				<div class="left">
					<!--<div class="left-s">授权菜单</div>-->
					<div class="left_tree">
						<ul id="publicModelTree" class="ztree"></ul>
					</div>
				</div>
				<!--展示列表开始-->
				<div class="details">
					<div class="right">
						<!--表格-->
						<div class="jqGrid_wrap">
							<table id="jqGrid_metaData" class="zxsaastable"></table> 
		    			<div id="jqGridPager"></div>
						</div>
					</div>
				</div>
				<!--展示列表结束-->
			
		<!--main结束-->
		
		<!--通用模版新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							部门新增
						</h4>
					</div>
					<div class="modal-body"  style="overflow-x: visible">
						<div class="showTab">
							<div class="current change">
								<form class="form-inline clearfix">
									<!--<div class="demoText">
										<label for="">集团名称:</label>
										<input type="text" disabled="disabled" class="groupName"  value="" />
										<span class="msg"></span>
									</div>
									-->
									<div class="demoText">
										<label for="">公司名称:</label>
										<input type="text" disabled="disabled" class="companyName" />
									</div>
									<div class="demoText">
										<label for="">所属上级:</label>
											<select class="shangji" name="parentLayerCode">
											</select>
										<span class="msg"></span>
									</div>
										<div class="demoText">
										<label for="">部门编码:</label>
										<input type="text" class="depNo sectionData" name="code" onblur='checkInput.checkStrNum(this,32)' placeholder="留空时系统自动编码"/>
										<span style='color:red;'></span>
									</div>
									<div class="demoText">
										<label for="">所属地区:</label>
											<select class="ssqy sectionData" name="regionId">
											</select>
										<a data-toggle="modal" data-target="#modalAreaAdd">地区新增</a>
										<span class="msg"></span>
									</div>
								   	<div class="demoText">
										<label for="">部门名称:</label>
										<input type="text" class="depName sectionData depCheckName" name="name"  placeholder="必填" />
										<span style='color:red;'></span>
									</div>
									<div class="demoText">
										<label for="">部门属性:</label>
											<select class="bmsx sectionData" name="attrId">
											</select>
											<a data-toggle="modal" data-target="#modalEmpManageAdd">属性新增</a>
										<span class="msg"></span>
									</div>
								    <div class="demoText" style="margin-right:15px;">
								        <div style="float:left;width:50%;">
											<label for="">公开库存量:</label>
											<input type="checkbox" class="textLeft" value="1" name="isKcflag" id="gkstore" style="vertical-align: middle;"/></div>
										<div style="float:left;width:50%;">
											<label for="ifStore_add">是否为门店:</label>
											<input type="checkbox" class="textLeft" value="1" name="ifStore" id="ifStore_add" style="vertical-align: middle;"/></div>
									</div><!--
									<div class="demoText">
										
									</div>
									-->
									<div class="demoText">
										<label for="">启用日期:</label>
										<input type="text" id="usedDate" class="depInfo usedDate" name="usedDate" maxLength=100  placeholder="必填"/>
										<span class="msg"></span>
									</div>
								
										<div class="demoText">
										<label for="">电话:</label>
										<input type="text" class="" name="tel" maxLength=100 id="tel_add"/>
										<span class="msg"></span>
									</div>
									<div class="demoText">
										<label for="">备注:</label>
										<input type="text" class="depInfo sectionData" name="remark" maxLength=100 />
										<span class="msg"></span>
									</div>

								  
									<div class="demoText">
										<label for="" style="vertical-align:bottom">地址:</label>
										<textarea name="address" style="width:175px;height:34px;border: 1px solid #cfcfcf;border-radius: 3px;" maxlength="100" id="addr_add"></textarea>
										<span class="msg"></span>
									</div>



									<div class="form-group demoText adjust" style="width:50%;">
										<label for=""  class='width-25' style="float:left;margin: 7px 2px;">可使用资金账户:</label>
										<div class="input-group col-sm-5 " style="float:left ">
											<input class="js-example-basic-multiple addMultiple" multiple="multiple" placeholder="请选择资金账户"/>
										</div>
										<span style='color:red;'></span>
									</div>


								</form>
								<span class="checkMsg"></span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
					    <button type="button" class="btn saveSectionAddnew btn-primary">保存并新增</button>
						<button type="button" class="btn saveSection">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--通用模版修改弹出窗-->
		<!-- 模态框（Modal） -->
	<div class="modal fade" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							部门修改
						</h4>
					</div>
					<div class="modal-body" style="overflow-x: visible">
							<div class="showTab">
								<div class="current change">
									<form class="form-inline clearfix">
									<input type="hidden" id="id" name="id">
										<!--<div class="demoText">
											<label for="">集团名称:</label>
											<input type="text" disabled="disabled" class="groupName" />
											<span class="msg"></span>
										</div>
										-->
										<div class="demoText">
											<label for="">公司名称:</label>
											<input type="text" disabled="disabled" value="执信" class="companyName"/>
											<span class="msg"></span>
										</div>
										<div class="demoText">
											<label for="">所属上级:</label>
												<select class="shangji sectionData" id="sssj" name="parentLayerCode">
												</select>
											<span class="msg"></span>
										</div>
										<div class="demoText">
											<label for="">部门编码:</label>
											<input type="text" class="code sectionData" onblur='checkInput.checkStrNum(this,32);' name="code" id="code" placeholder="由字母和数字组成，最多32位" />
											<span style='color:red;'></span>
										</div>
										<div class="demoText">
											<label for="">所属地区:</label>
												<select class="area ssqy" id="ssqy" name="regionId">
												</select>
											<a data-toggle="modal" data-target="#modalAreaAdd">地区新增</a>
											<span class="msg"></span>
										</div>
										<div class="demoText">
											<label for="">部门名称:</label>
											<input type="text" class="depName sectionData depCheckNameUp" id="name" name="name"  />
											<span style='color:red;'></span>
										</div>
										<div class="demoText">
											<label for="">部门属性:</label>
												<select class="shuxing sectionData bmsx" id="bmsx" name="attrId">
												</select>
												<a data-toggle="modal" data-target="#modalEmpManageAdd">属性新增</a>
											<span class="msg"></span>
										</div>
										<div class="demoText" style="margin-right:15px;">
								            <div style="float:left;width:50%;">
								                <label for="">公开库存量:</label>
								                <input type="checkbox" class="textLeft" value="1" name="isKcflag" id="isKcflag" style="vertical-align: middle;"/></div>
								            <div style="float:left;width:50%;">
								               	<label for="depStore">是否为门店:</label>
											<input type="checkbox" class="textLeft" id="depStore" value="1" name="ifStore" style="vertical-align: middle;"/></div>
								        </div>
										<div class="demoText">
								            <label for="">启用日期:</label>
								            <input type="text" id="usedDate_modify" class="depInfo usedDate" name="usedDate" maxLength=100  placeholder="必填"/>
								            <span class="msg"></span>
								        </div>
										<div class="demoText">
								            <label for="">电话:</label>
								            <input type="text" class=""  id="tel" name="tel" maxLength=100 />
								            <span class="msg"></span>
								        </div>
										<div class="demoText">
											<label for="">备注:</label>
											<input type="text" class="depInfo sectionData" id="remark" name="remark" maxLength=100 />
											<span class="msg"></span>
										</div>							
									
								        <div class="demoText">
								            <label for="" style="vertical-align:bottom">地址:</label>
								            <textarea id="address" name="address" style="width:175px;height:34px;border: 1px solid #cfcfcf;border-radius: 3px;" maxlength="100"></textarea>
								            <span class="msg"></span>
								        </div>

										<div class="form-group demoText adjust clearfix" style="width:50%;">

											<label for=""  class='width-25' style="float:left;margin: 7px 2px;">可使用资金账户:</label>
											<div class="input-group col-sm-5 " style="float:left ">
												<input class="js-example-basic-multiple modifyMultiple" multiple="multiple" placeholder="请选择资金账户"/>
											</div>
											<span style='color:red;'></span>
										</div>

										
									</form>
									<span class="checkMsg"></span>
								</div>
							</div>
						</div>
				
					<div class="modal-footer">
						<button type="button" class="btn btn-info updateSection" >保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
			</div><!-- /.modal-content -->
	</div></div>
		
		<!--通用模版删除弹出窗-->
		<!-- 模态框（Modal） -->
		<!--部门属性管理弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalEmpManage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							部门属性管理
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<a data-toggle="modal" data-target="#modalEmpManageAdd">新增属性</a>
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="margin-top:10px">
										<table id="jqGrid_empManage" class="zxsaastable">
										</table>
										<div id="jqGridPager_empManage"></div>
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
		
		<!--部门属性新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalEmpManageAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							属性新增
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change" >
								<div class="areaDiv">
									<label for="" style="width: 24%;">属性编码:</label>
									<input type="text" name="code" id="attrCodeAdd" placeholder="留空时系统自动编码"/>
								</div>
								<div class="areaDiv">
									<label for="" style="width: 24%;">属性名称:</label>
									<input type="text"  name="name" id="attrNameAdd"/>
								</div>
								<div class="areaDiv">
									<label for="" style="width: 24%;">备注:</label>
									<input type="text" name="remark" maxLength=100 />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn addAttr">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--部门属性修改弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalEmpManageUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							属性修改
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
							<input type="hidden" id="attrId" name="id"/>
								<div class="areaDiv">
									<label for="" style="width: 24%;">属性编码:</label>
									<input type="text" name="code" id="attrCodeUpdate" />
								</div>
								<div class="areaDiv">
									<label for="" style="width: 24%;">属性名称:</label>
									<input type="text" name="name" id="attrNameUpdate"/>
								</div>
								<div class="areaDiv">
									<label for="" style="width: 24%;">备注:</label>
									<input type="text" name="remark" maxLength=100 />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn updateAttr">保存后关闭</button>
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
						<div class="showTab">
							<div class="current change">
								<div class="areaDiv">
									<label for="" style="width: 24%;">地区编码:</label>
									<input type="text" name="code" placeholder="留空时系统自动编码" onblur='checkInput.checkStrNum(this,32);' />
								</div>
								<div class="areaDiv">
									<label for="" style="width: 24%;">地区名称:</label>
									<input type="text" name="name" onblur='checkInput.checkNotChars(this,32);' />
								</div>
								<div class="areaDiv">
									<label for="" style="width: 24%;">备注:</label>
									<input type="text" name="remark"  maxLength=100 />
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
						<div class="showTab">
							<div class="current change">
							<input type="hidden" name="id"/>
								<div class="areaDiv">
									<label for=""  style="width: 24%;">地区编码:</label>
									<input type="text" name="code" onblur='checkInput.checkStrNum(this,32);' />
								</div>
								<div class="areaDiv">
									<label for=""  style="width: 24%;">地区名称:</label>
									<input type="text" name="name" onblur='checkInput.checkNotChars(this,32);' />
								</div>
								<div class="areaDiv">
									<label for=""  style="width: 24%;">备注:</label>
									<input type="text" name="remark" id="updateRemark" maxLength=100 />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn updateDq">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		
		<!-------------------------------------主页面结束----------------------------------------->
			
<div class="modal fade" id="dataPowerModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">数据授权窗口</h4>
			</div>
			<div class="modal-body">
				<div class="col-sm-6">
				  <p>人员选择</p>
				  <ul id="empTree" class="ztree" style="border: 1px gray solid;max-height: 400px;overflow: auto;">
				  	
				  </ul>	
				</div>
				<div class="col-sm-6" id="rightTree">
				<p>可使用部门选择</p>
				<ul id="empDataPowerTree" class="ztree" style="border: 1px gray solid;max-height: 300px;overflow: auto;">
				  	
				  </ul>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-danger" onclick="saveEmpDataPower()">保存</button>
				<button type="button" class="btn btn-w btn-info" onclick="saveEmpDataPower()"  data-dismiss="modal">保存后关闭</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/select2.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/companyManager/section.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/check.css?v=${version}" />
	<script type="text/javascript">
		$(function(){
			loadmodal();
		});
		
		$('.tab .toggle').click(function() {
			console.log($(this).index('.toggle'));
			$(this).addClass('active').siblings().removeClass('active');
			$('.showTab .change').eq($(this).index('.toggle')).show().siblings().hide();
		});
		
		
			function setReload(){
    			window.location.reload();
			}
	</script>
</html>