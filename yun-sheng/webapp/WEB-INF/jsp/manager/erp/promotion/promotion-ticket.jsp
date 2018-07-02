<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>零售促销卷管理</title>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
	<jsp:include page="../../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/promotion/promotion-base.css?v=${version}" />
	<style type="text/css">
	body {
		padding: 20px;
	}
	</style>
	<script type="text/javascript">
	var basePath = "${basePath}";
	</script>
  
  <body>
  	<!-- 头部 -->
	<div class="well">
		<!-- 工具栏 -->
		<div id="AUTH" data-code="LSCXQGL" class="btn-group btnHundred" role="group" >
			<button type="button" class="btn" onclick="addBtClick()">新增</button>
		    <button type="button" class="btn" onclick="eiditBtClick()">修改</button>
			<button type="button" class="btn" onclick="">删除</button>	
			<button type="button" class="btn" onclick="disEnabledBtnClick()">停用</button>	
			<button type="button" class="btn" onclick="enabledBtnClick()">启用</button>	
			<button type="button" class="btn" onclick="">导出</button>	
			<button type="button" class="btn" onclick="">退出</button>	
		</div>
		<!-- 表单 -->
		<form id="form1">
			<div class="inputbox container-fluid clearfix" style="padding-left: 20px;">
				 <label>
			      <input type="checkbox">显示已失效会员促销券
			     </label>
			</div>
		</form>
		<!-- 主表格 -->
		<div class="jqGrid_wrapper" style="margin-left: 5px;">
			<table id="dataGrid1"></table> 
			<div id="jqGridPager1" style="height: 40px;"></div>
		</div>
		
		<table class="table table-bordered" style="margin-top: 15px;width: 300px;margin-left: 5px;">
		  <caption>使用门槛</caption>
		  <thead>
		    <tr>
		      <th>金额达到</th>
		      <th>抵现金额</th>
		    </tr>
		  </thead>
		  <tbody id="thresholdTableBody">
		  </tbody>
		</table>
	</div>

	<!-- 引用自定义JS文件 -->
	<script src="${basePath}/model/erp/model-promotion-ticket.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/promotion/promotion-ticket.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
  </body>
</html>


<!-- 新增模态框（Modal） -->
<div class="modal fade" id="addAndEiditDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog" style="width: 800px;">
		<div class="modal-content ">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="addAndEiditDialogTitle">
					新增
				</h4>
			</div>
			<!-- 工具条-->
			<div class="btn-group btnHundred tckBTN" role="group" >
			  <button type="button" class="btn" onclick="saveBtClick()">保存</button>
			  <button type="button" class="btn" data-dismiss="modal">取消</button>	
			  <button type="button" class="btn" >打印模板</button>
			  <button type="button" class="btn" >短信模板</button>		  			  			  			  
			</div>
		    <div class="modal-body">
				<!-- 编辑表单-->
				<form class="form-horizontal" id="addAndEiditForm" name="addAndEiditForm">
					<div class="col-sm-6">
					  <!-- S 左边控件-->
					  <div class="form-group">
					    <label class="col-sm-4 control-label">卷编号</label>
					    <div class="col-sm-7">
					      <input type="text" class="form-control" name="id" style="display: none;">
					      <input type="text" class="form-control" name="ticketCode">
					    </div>
					  </div>
					  <div class="form-group">
					    <label class="col-sm-4 control-label">卷面值</label>
					    <div class="col-sm-7">
					      <input type="text" class="form-control" name="ticketAmount">
					    </div>
					  </div>
					  <div class="form-group">
					    <label class="col-sm-4 control-label">生效日期</label>
					    <div class="col-sm-7">
					      <input type="text" class="form-control" name="beginDate" id="datetimepickerStart" placeholder="年-月-日">
					    </div>
					  </div>
				    </div>
					<div class="col-sm-6">
					  <!-- S 右边控件-->
					  <div class="form-group">
					    <label class="col-sm-4 control-label">卷名称</label>
					    <div class="col-sm-7">
					      <input type="text" class="form-control" name="ticketName">
					    </div>
					  </div>
					  <div class="form-group">
					    <label class="col-sm-4 control-label">卷分类</label>
					    <div class="col-sm-7">
						    <select class="form-control" name="ticketType">
						      <option value="1">抵现卷</on>
						      <option value="2">现金卷</option>
						    </select>
					    </div>
					  </div>
					  <div class="form-group">
					    <label class="col-sm-4 control-label">截止日期</label>
					    <div class="col-sm-7">
					      <input type="text" class="form-control" name="endDate" id="datetimepickerEnd" placeholder="年-月-日">
					    </div>
					  </div>
					</div>
					<div class="col-sm-12">
					  <div class="form-group">
					    <label class="control-label" style="width: 115px;">备注</label>
					    <input type="text" class="form-control" name="remark" style="width: 547px;display: inline;margin-left: 25px;">
					  </div>
					</div>
				    <div class="col-sm-6">
					  <div class="form-group">
					    <div class="col-sm-4"></div>
					    <div class="col-sm-7">
				 			<label><input type="checkbox" name="thirdpartyFlag">是否第三方使用卷</label>
					    </div>
					  </div>
					  <div class="form-group">
					    <div class="col-sm-4"></div>
					    <div class="col-sm-7">
				 			<label><input type="checkbox" name="sendnoteFlag">是否发送短信</label>
					    </div>
					  </div>
					  <div class="form-group">
					    <div class="col-sm-4"></div>
					    <div class="col-sm-7">
				 			<label><input type="checkbox" name="thresholdFlag">是否有使用门槛</label>
					    </div>
					  </div>
					  <!-- /E 左边控件-->
					</div>
					<div class="col-sm-6">  
					  <div class="form-group">
					    <label class="col-sm-4 control-label">合作单位</label>
					    <div class="col-sm-7">
			                <div class="input-group">
			                    <input type="text" class="form-control" name="cooperateUnit" style="display: none;">
			                    <input type="text" class="form-control" name="cooperateUnitName" disabled="disabled">
			                    <span class="input-group-btn">
			                        <button class="btn btn-default" type="button" name="cooperateUnitNameBtn" onclick="selectContactUnitReferenceOpen()" style="padding:6px 12px;" disabled="disabled">查</button>
			                    </span>
			                </div><!-- /input-group -->
					    </div>
					  </div>
					  <div class="form-group">
					    <div class="col-sm-4"></div>
					    <div class="col-sm-7">
				 			<label><input type="checkbox" name="printFlag">是否需打印</label>
					    </div>
					  </div>
					  <!-- /E 右边控件-->
					</div>
				</form>
				<!-- 门槛设置-->
				<fieldset class="fieLeft" style="min-width:none;display: none;" id="thresholdFlagGrid">
					<legend>使用门槛</legend>
					<div>
						<div class="jqGrid_wrapper">
							<table id="dataGrid2"></table> 
						</div>
					</div>
				</fieldset>
		    </div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div><!-- 新增模态框（Modal）结束 -->

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
         <div class="modal-body" style="padding: 0px;">
			<iframe name="contactUnitReferenceFrame" frameborder="0" class="referenceFrame" style="width: 100%;" src="${basePath}/TcontactUnit/reference"></iframe>
         </div>
	  </div>
	</div>
</div>


































