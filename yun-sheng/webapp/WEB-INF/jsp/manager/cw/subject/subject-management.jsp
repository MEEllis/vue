<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>科目管理</title>
		<jsp:include page="../../Include/import.jsp"></jsp:include>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/subject-management.css" />
		<script type="text/javascript">
		
			//**********全局变量
			//基本目录
			var basePath = "${basePath}";
			var gl_CurrGroupId = ${groupId}
			//当前公司ID
			var gl_CurrCompanyId = ${companyId};
			//当前年度
			var gl_CurrYear = ${year};
			//当前选择公司科目ID
			var currSelectCompanySubjectID = null;
			
			$(function() {

				
			});
		</script>
	</head>
	<body>
		<div class="container">
			<!-- 左边树 -->
			<div class="left_tree">
				<ul id="companySubjectTree" class="ztree"></ul>
			</div>
			<!-- 右边表格 -->
			<div class="details">
				<div class="btn-group" role="group" >
					<ul>
						<li data-toggle="modal" onclick="javascript:loadDataSubjectCompareGrid();">科目对照</li>
						<li class="claChoose" style="z-index: 9999999999999999;">复制
							<ul class="cla-ul"><li class="cla-one">复制</li>
							<li class="cla-two" style="width: 120px;"  onclick="javascript:$('#companySubjectMulCopyModal').modal('show');">批量复制</li></ul>
						</li>
						<li onclick="javascript:openGroupSubjectReference();">集团引入</li>
						<li class="search-li" onclick="javascript:$('#queryDialog').modal('show');">查询</li>
						<li onclick="javascript:canelGroupSubjectReference();">取消引用</li>
						<li data-toggle="modal" onclick="javascript:saveFcompanySubjectTemplate(1);">新增</li>
						<li data-toggle="modal" onclick="javascript:saveFcompanySubjectTemplate(4);">修改</li>
						<li>停用</li>
						<li>查找</li>
						<li>导出</li>
						<li id="tttttt">打印</li>
						<li onclick="javascript:deleteFcompanyInit();">删除</li>
						
					</ul>	
				</div><!-- E 工具栏 -->
				<!--页数-->
				<div class="jqGrid_wrapper">
					<table id="companySubjectTable"></table> 
    				<div id="pager"></div>
				</div>
		    </div>
		</div>
		<!-- 引用js文件 -->
		<script type="text/javascript" src="${basePath}/model/cw/model-subject-compare.js"></script>
		<script type="text/javascript" src="${basePath}/model/cw/model-group-subject.js"></script>
		<script type="text/javascript" src="${basePath}/model/cw/model-company-subject.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/subject-management.js"></script>
		
		<!-- PH js文件 -->
		<script type="text/javascript" src="${basePath}/model/cw/model-subject-page.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/company-subject.js"></script>
		<script type="text/javascript" src="${basePath}/js/commonjs/xr.js"></script>
	</body>
</html>

<!-- 科目对照模态框 -->
<div class="modal fade" id="kmdzModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:686px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                   科目对照
            </h4>
         </div>
         <div class="modal-body">
			<!-- S 工具栏 -->
			<div class="btn-group" role="group" style="width: 400px;">
				<ul>
					<li onclick="saveSubjectCompare()">保存</li>
					<li onclick="javascript:$('#kmcyModal').modal('show');loadDataSubjecDifferenceGrid();">科目差异</li>
				</ul>	
			</div><!-- E 工具栏 -->
            <div class="jqGrid_wrapper">
				<table id="subjectCompareGrid" style="min-height: 500px;max-height: 500px;overflow-y: scroll;"></table> 
			</div>

            <div  id="subjectSelectDIV"  class="jqGrid_wrapper" 
                  style=";position: absolute;z-index: 9999999999999;left:0;bottom:0px;display: none;
                          background-color: white;border: 4px blue;">
				<table id="subjectCompareSelectGrid"></table> 
			</div>

         </div>
	  </div>
   </div>
</div>	
<!-- 科目差异模态框 -->
<div class="modal fade" id="kmcyModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:686px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                   科目差异
            </h4>
         </div>
         <div class="modal-body">
			<div class="btnbox clearfix">
				<a class="save" onclick="">打印</a>
			</div>
            <div class="jqGrid_wrapper">
				<table id="subjectDifferenceGrid" style="overflow-y: scroll;"></table> 
			</div>
         </div>
	  </div>
   </div>
</div>	
<!-- 集团引入 -->
<div class="modal fade" id="jtyrModal" tabindex="-1" role="dialog" 
     aria-labelledby="jtyrModalLabel" aria-hidden="true">
   <div class="modal-dialog" style="width:855px;height: 60%;">
      <div class="modal-content">
		</div>
	</div>
</div>	
	
<!-- 集团科目引用 -->
<div class="modal fade" id="groupSubjectReferenceModal" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                   集团科目引用
            </h4>
         </div>
         <div class="modal-body">
			<iframe name="groupSubjectReferenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/cw/test/gruopSubjectReference"></iframe>
         </div>
	  </div>
	</div>
</div>
<!-- 科目批量复制 -->
<div class="modal fade" id="companySubjectMulCopyModal" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:500px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                   科目批量复制
            </h4>
         </div>
         <div class="modal-body">
			<div class="row">
				<div class="col-md-2"></div>
				<div class="col-md-3" style="line-height: 50px;">源科目:</div>
				<div class="col-md-5">
		            <div class="input-group">
		               <input type="text" class="form-control" id="surSubjectName">
		               <input type="text" class="form-control" id="surSubjectId" style="display: none;">
		               <span class="input-group-btn">
		                  <button class="btn btn-default" type="button" onclick="subjectCopySelect('surSubject')">
		                    <span class="glyphicon glyphicon-search"></span>
		                  </button>
		               </span>
		            </div><!-- /input-group -->
				</div>
				<div class="col-md-2"></div>
			</div>
			<div class="row">
				<div class="col-md-2"></div>
				<div class="col-md-3" style="line-height: 50px;">目标科目:</div>
				<div class="col-md-5">
		            <div class="input-group">
		               <input type="text" class="form-control" id="desSubjectName">
		               <input type="text" class="form-control" id="desSubjectId" style="display: none;">
		               <span class="input-group-btn">
		                  <button class="btn btn-default" type="button" onclick="subjectCopySelect('desSubject')">
		                    <span class="glyphicon glyphicon-search"></span>
		                  </button>
		               </span>
		            </div><!-- /input-group -->
				</div>
				<div class="col-md-2"></div>
			</div>
			<div class="row">
				<div class="col-md-2"></div>
				<div class="col-md-8" style="line-height: 50px;">说明:将源科目下的科目复制到目标科目下</div>
				<div class="col-md-2"></div>
			</div>
         </div>
         <!-- 模态框底部部分 -->
         <div class="modal-footer">
        	<button type="button" class="btn btn-default" onclick="saveSubjectMulCopy()">确定</button>	
            <button type="button" class="btn btn-default"  data-dismiss="modal">取消</button>          
         </div>
	  </div>
	</div>
</div>		
<!-- 科目参照 -->
<div class="modal fade" id="subjectReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
         <!-- //科目双击事件 -->
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                   科目参照
            </h4>
         </div>
         <div class="modal-body">
			<iframe name="subjectReferenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/cw/test/subjectReference"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 新增、修改科目窗口 -->       <!-- Large modal大弹出层 -->
<div class="modal fade bs-example-modal-lg" id="saveOrUpdateSubject" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	<input type="hidden" id="id" name="id"/>
	<input type="hidden" id="groupId" name="groupId"/>
	<input type="hidden" id="companyId" name="companyId"/>
	<input type="hidden" id="currentAccountingYear" />
	<input type="hidden" id="subjectLevel" name="subjectLevel"/>
	<input type="hidden" id="useStatus" name="useStatus"/>
	<input type="hidden" id="ifEndSubject" name="ifEndSubject"/>
	<input type="hidden" id="remark" name="remark"/>
	<input type="hidden" id="source" name="source"/>
	<input type="hidden" id="createUid" name="createUid"/>
	<input type="hidden" id="createTimeStr" name="createTimeStr"/>
	<input type="hidden" id="updateUid" name="updateUid"/>
	<input type="hidden" id="updateTimeStr" name="updateTimeStr"/>
	<input type="hidden" id="fatherId" name="fatherId"/>
	<input type="hidden" id="commonId" name="commonId"/>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
		
			<div class="modal-header">
				<div class="row">
					<div class="col-md-12">
						<a class="btn btn-default" href="#" onclick="upOrDownPage(1)" role="button">上张</a>
						<a class="btn btn-default" href="#" onclick="upOrDownPage(2)" role="button">下张</a>
						<a class="btn btn-default" onclick="javascript:saveFcompanySubjectTemplate(2);" role="button">保存</a>
						<a class="btn btn-default" onclick="javascript:saveFcompanySubjectTemplate(3);" role="button">保存并新增</a>
						<a class="btn btn-default" data-dismiss="modal"  role="button">退出</a>
					</div>
				</div>
			</div>
			
			<div class="modal-body">
				<div class="container-fluid">
					<div class="row">
					
						<div class="col-md-6">
							<form class="form-horizontal">
								<div class="form-group">
									<label for="inputEmail3" class="col-sm-4 control-label">科目编码</label>
									<div class="col-sm-8">
										<input type="text" class="form-control" id="subjectCode" name="subjectCode" placeholder="Email">
									</div>
									
									<label for="inputEmail3" class="col-sm-4 control-label">科目名称</label>
									<div class="col-sm-8">
										<input type="text" class="form-control" id="subjectName" name="subjectName" placeholder="Email">
									</div>
									
									<label for="inputEmail3" class="col-sm-4 control-label">助记码</label>
									<div class="col-sm-8">
										<input type="text" class="form-control" id="mnemonicCode" placeholder="Email">
									</div>
									
									<label for="inputEmail3" class="col-sm-4 control-label">科目类型</label>
									<div class="col-sm-8">
										<select class="form-control" id="subjectClssify">
											<option value="1">资产</option>
											<option value="2">负债</option>
											<option value="3">共同</option>
											<option value="4">所有者权益</option>
											<option value="5">成本</option>
											<option value="6">损益</option>
										</select>
									</div>
									
									<label for="inputEmail3" class="col-sm-4 control-label">方向</label>
									<div class="col-sm-8">
										<select class="form-control" id="creditDirection">
											<option value="0">贷方</option>
											<option value="1">借方</option>
										</select>
									</div>
									
								</div>
							</form>
						</div>
						
						<div class="col-md-6">
							<form class="form-horizontal">
								<label class="col-sm-12 control-label pull-left">
									编码规则 4-2-2-2-2-2
								</label>
								<div class="col-sm-12">
									<div class="checkbox">
										<label><input type="checkbox" id="enable" name="enable">停用</label>
									</div>
								</div>
								
								<div class="col-sm-12">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="ifControl" name="ifControl">
											是否受控科目
										</label>
									</div>
								</div>
								<%--<div class="col-sm-12">
									<div class="checkbox">
										<label>
											<input type="checkbox">
											受控科目是否允许输入主管密码修改，填制凭证
										</label>
									</div>
								</div>--%>
							</form>
						</div>
						
					</div>
					
					<div class="row">
					
						<div class="col-md-6">
							<form class="form-horizontal">
								<div class="col-md-8 col-md-offset-4">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="ifNumAccounting" name="ifNumAccounting">数量核算
										</label>
									</div>
								</div>
								
								<label for="inputEmail3" class="col-sm-4 control-label">计量单位</label>
								<div class="col-sm-8">
									<select class="form-control" id="unit" name="unit">
										<option></option>
										<option value="大华股份">大华股份</option>
										<option value="套">套</option>
									</select>
								</div>
								
								<div class="col-md-8 col-md-offset-4">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="cashFlow" name="cashFlow">是否现金流量科目
										</label>
									</div>
								</div>
							</form>
						</div>
						
						<div class="col-md-6">
						
							<form class="form-horizontal">
							
								<label class="col-sm-12 control-label pull-left">辅助核算项：</label>
								<div class="col-sm-12">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="partnerAccounting" name="partnerAccounting">往来单位
										</label>
									</div>
								</div>
								
								<div class="col-sm-12">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="departmentAccounting" name="departmentAccounting">部门
										</label>
									</div>
								</div>
								
								<div class="col-sm-12">
									<div class="checkbox">
										<label>
											<input type="checkbox" id="employeeAccounting" name="employeeAccounting">职员(个人往来)
										</label>
									</div>
								</div>
							</form>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>