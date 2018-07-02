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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/borrowManage.css?v=${version}" />
		
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/storage/managers.css?v=${version}"/>
		<title>借出转销售</title>
		
	</head>

	<body >
		<!-------------------------------------主页面开始----------------------------------------->
			
			<!-------------------------------------搜索条件开始----------------------------------------->
		<div class="well">
			<!-------------------------------------搜索条件结束----------------------------------------->			
			<div id="AUTH" data-code="JCGL" class="btn-group btnHundred">
				    <button type="button" class="btn" onclick="lastForm()">首单</button>
			 	    <button type="button" class="btn" onclick="upForm()">上一单</button>
			        <button type="button" class="btn" onclick="downForm()">下一单</button>
			        <button type="button" class="btn" onclick="firstForm()">末单</button>
					<button type="button" class="btn btn-default addAudit" onclick="onclickNewBills()">新增</button>
			    	<button type="button" class="btn btn-default saveData" onclick="onClickExecute()">保存</button>	
			   		<button type="button" class="btn btn-default deleteReceipts" onclick="onClickDelete()">删除</button>	
			   		<button type="button" class="btn btn-default" onclick="lendSaleGzHc(1)">过账</button>	
				   	<button type="button" class="btn btn-default" onclick="hcClick()">红冲</button>	
				   	<button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
				   	<%--<button type="button" class="btn btn-default" data-eventname="printbtn">导入</button>--%>
				    <%--<button type="button" class="btn btn-default" onclick="onclickRefresh()">刷新</button>
				    <button type="button" class="btn btn-default" data-eventname="printbtn">复制</button>--%>
				    <div class="slideThree">
						<input type="checkbox" value="0" id="slideThree" name="check" checked />
						<label for="slideThree"></label>
					</div>
			</div>
			<!-------------------------------------表格开始----------------------------------------->
		 	<form id="ibillsHeadBorrowBack">
				<input type="hidden" id="id" name="id" value="">
				<input type="hidden" id="sectionId" name="sectionId" value="">
				<input type="hidden" id="contactsunitId" name="contactsunitId" value="">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="form-group Zpercent ">
							<span class="box_text2">单据编号：</span><div class="col-sm-8">
					<div class="input-group"><input type="text" class="form-control" id="billsCode" name="billsCode" disabled  /></div></div>
						</div>
						<div class="form-group Zpercent">
							<span class="box_text2">部门名称：</span>
							<div class="col-sm-8">
					<div class="input-group">
					      <input type="text" name="sectionName" id="sectionName3" class="form-control depSearch" onkeydown="departmentDel('sectionName')">
					      <span class="input-group-btn">
					        <button class="btn btn-default" type="button" onclick="yesAuthority('sectionName3')">
					        	<span class="glyphicon glyphicon-plus section"></span>
					        </button>
					      </span>
					    </div></div>
						</div>
						<div class="form-group Zpercent">
							<span class="box_text2">往来单位：</span>
							<div class="col-sm-8">
					<div class="input-group">
					      <input type="text" class="form-control unitSearch" id="contactName" name="contactName">
					      <span class="input-group-btn">
					        <button class="btn btn-default" type="button">
					        	<span class="glyphicon glyphicon-plus" onclick="selectContactUnitReferenceOpen('contactName2')"></span>
					        </button>
					      </span>
					    </div></div>
						</div>
						
					</div>
					<div class="row">
						<div class="form-group Zpercent">
							<span for="datetimepickerStart" class="box_text2">单据日期：</span>
							<div class="col-sm-8">
					<div class="input-group"><input type="text" class="form-control" id="billsDateString" name="billsDateString" placeholder="年-月-日"  readonly/></div></div>
						</div>
						<div class="form-group Zpercent">
							<span class="box_text2">经手人：</span>
							<div class="col-sm-8">
					<div class="input-group">
							<select class="managers" id="managersUid" name="managersUid" disabled="disabled">
								<option value="" selected>请选择部门</option>
		        			</select></div></div>
						</div>
						<div class="form-group Zpercent">
							<span class="box_text2">单备注：</span><div class="col-sm-8">
					<div class="input-group"><input type="text" id="remark" name="remark" value="" placeholder="" class="form-control" /></div></div>
						</div>
					</div>
				</div>
				<div class="rightMap">
				    <img id="billsStautsImg" src="${basePath}/images/guozhang.png" />
			    </div>
			 </form>
		<!--------------查询条件结束---------------->
			
		</div>
		<div class="tablebox retailDetailTable container-fluid" style="margin-left:20px;">
				<p><button class="font-table import" onclick="importBorrowLend()">引入借出未还回单据</button></p>
				<div class="row">
					<table id="jqGrid_borrow" class="zxsaastable">
					</table>
					<!-- <div id="jqGridPager_loan"></div> -->
				</div>
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
		 
		<!--借出还回      引入借出未还回单据-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="importChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalYQ">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							引入借出未还回单据
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<div class="font-table font-table-xia">
									<div class="font-table-val">
										<span>往来单位：</span>
									    <span id="showContactUnit"></span>
									</div>
									<div class="tip-1">
									    <p class="tip_p-1">已过账</p>
								  </div>
								</div>
								<div class="jqGrid_wrap">
									<table id="jqGrid_import" class="zxsaastable"></table> 
			    					<div id="gridpager_import"></div>
		    					</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-info"  onclick="onclickImport()">保存</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-- 红冲模态框（Modal） -->
		<div class="modal fade" id="hcModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							单据红冲
						</h4>
					</div>
					<div class="modal-body">
						红冲时间：
						<input type="text" id="hcTime" name="hcTime" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  readonly/>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
						<button type="button" class="btn btn-primary" onclick="lendSaleGzHc(2)">
							确定
						</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!-- 调入部门名称模态框（Modal） -->
		<div class="modal fade" id="OutSectionModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
			<div class="modal-dialog tree-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							部门名称
						</h4>
					</div>
					<div class="modal-body tree-body">
						<ul id="outSectionTree" class="ztree"></ul>
					</div>
					
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 调入部门名称模态框（Modal）结束 -->
		
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
					<iframe name="contactUnitReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/TcontactUnit/reference"></iframe>
		         </div>
			  </div>
			</div>
		</div>
		<!-------------------------------------底部开始----------------------------------------->
		<div class="footer">
			<div class="Zpercent2 ">
				<span class="box_text2">公司名称：</span><span class="box_input"><input type="text" id="footerCompany" class="input150" disabled  /></span>
			</div>
			<div class="Zpercent2 ">
				<span class="box_text2">制单人：</span><span class="box_input"><input type="text" id="footerCreate" class="input150" disabled  /></span>
			</div>
			<div class="Zpercent2 ">
				<span class="box_text2">修改人：</span><span class="box_input"><input type="text" id="footerUpdate" class="input150" disabled  /></span>
			</div>
			<div class="Zpercent2 ">
				<span class="box_text2">过账人：</span><span class="box_input"><input type="text" id="footerPost" class="input150" disabled  /></span>
			</div>
			<div class="Zpercent2 ">
				<span class="box_text2">红冲人：</span><span class="box_input"><input type="text" id="footerBack" class="input150" disabled  /></span>
			</div> 
		</div>
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery-form.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/lendSaleDetail.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/model-storage.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/storage/department.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/css.css?v=${version}"/>
	<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		var basePath = "${basePath}";
		var storageObj = null;
	</script>
</html>


