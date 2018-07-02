<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>辅助明细账查询</title>
		<jsp:include page="../../Include/import.jsp"></jsp:include>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/assist-deatil-account.css" />
		<script type="text/javascript">
		
			//**********全局变量
			//基本目录
			var basePath = "${basePath}";
			//当前集团
			var gl_GroupId = 888888;
			//当前公司ID
			var gl_CurrCompanyId = ${companyId};
			//当前年度
			var gl_CurrYear = ${year};

		</script>
	</head>
	<body>
	    <!-- 主要区域 -->
		<div id="mainDIV" style="padding: 20PX;">
		    <!-- S 工具栏 -->
			<div class="btn-group" role="group" >
				<ul>
					<li>打印</li>
					<li>导出</li>
					<li>发送邮件</li>
					<li class="search-li" onclick="javascript:$('#queryDialog').modal('show');">查询</li>
					<li>显示图表</li>
					<li>设置</li>
					<li>刷新</li>
					<li>小计隐藏</li>
					<li>合计隐藏</li>
					<li>联查隐藏</li>
					<li class="close-li">退出</li>
				</ul>	
			</div><!-- E 工具栏 -->
			<!-- S 表头信息 -->
			<div id="subject-top">
				<div id="subject-top-na">辅助明细帐</div>
				<div id="subject-top-search">
					<label>集团:</label><label class="sub-comp bloc1"></label>
					<label>公司:</label>
					<select class="sub-comp com">
							<option value='1001'>阿里巴巴</option>
							<option value='1002'>腾讯</option>
							<option value='1003'>百度</option>
							<option value='1004'>搜狐</option>
					</select>	
					<label class="sub">科目:</label>
					<select class="sub-comp sub subShow" id="subjectFilterSelect">
					</select>
					<label class="sub">部门:</label>
					<select class="sub-comp sub subShow" id="departmentFilterSelect">
					</select>
					<label class="sub">职员:</label>
					<select class="sub-comp sub subShow" id="employeeFilterSelect">
					</select>
					<label class="sub">往来单位:</label>
					<select class="sub-comp sub subShow" id="partnerFilterSelect">
					</select>
					<label>期间:</label><label class="sub-comp" id="selectAccountAnnual">2016.08 - 2016.08</label>
				</div>
			</div><!-- E 表头信息 -->
			<!-- S 数据表格 -->
			<div class="jqGrid_wrapper">
				<table id="dataGrid"  style="height: 100%;"></table> 
   				<div id="gridpager"></div>
			</div><!-- E 数据表格 -->
			<!-- S 底部-->
			<div id="subject-bottom">
				<div id="subject-bottom-other" class="fb">单位名称:</div>
				<div id="subject-bottom-per" class="fb">制表人:008</div>
				<div id="subject-bottom-time" class="fb">打印日期</div>
			</div>
		</div><!-- /#mainDIV -->
		<script type="text/javascript" src="${basePath}/model/cw/model-accounts-query.js"></script>
		<script type="text/javascript" src="${basePath}/model/cw/model-group-subject.js"></script>
		<script type="text/javascript" src="${basePath}/model/cw/model-company-subject.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/assist-account/assist-deatil-account.js"></script>
	</body>
</html>	

<!-- 模态框:辅助科目详细查询-->
<div class="modal fade" id="queryDialog">
   <div class="modal-dialog">
      <div class="modal-content"> 	 
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title">
               	辅助科目明细帐查询
            </h4>
         </div>
         <div class="modal-body">
            <form class="form-horizontal" role="form" style="width: 100%;height: 100%;">
			<div class="row">
				<div class="col-md-3 tint-background">
					<ul id="querySchemeTree" class="ztree"></ul>
				</div>
				<div class="col-md-9">
					<!-- 标签页开始 -->
					<ul id="myTab2" class="nav nav-tabs">
					   <li class="active">
					   		<a href="#tab2-1" data-toggle="tab">过滤条件</a>
					   </li>
					   <li>
					   		<a href="#tab2-2" data-toggle="tab">分组设置</a>
					   </li>
					   <li>
					   		<a href="#tab2-3" data-toggle="tab">表头二次过滤</a>
					   </li>
					</ul>
					<div id="myTabContent" class="tab-content" style="overflow-y: auto;max-height: 480px;overflow-x: hidden;">
					   <div class="tab-pane fade in active" id="tab2-1">
					     <!-- S 期间参数 -->
					     <div style="width: 100%;border: 1px solid #ddd;margin-top: 10px;padding: 10px;">
					         <div style="position: relative;top:-20px;background-color: white;width:35px">期间</div>
							 <div class="form-group">
							    <label class="col-sm-2 control-label">期间</label>
							    <div class="col-sm-5">
							      <select class="form-control input-sm" name="minAccountAnnual">
							         <option>2014.1</option>
							         <option>2014.2</option>
							         <option>2014.3</option>
							         <option>2014.4</option>
							         <option>2014.5</option>
							         <option>2014.6</option>
							         <option>2014.7</option>
							         <option>2014.8</option>
							         <option>2014.9</option>
							         <option>2014.10</option>
							         <option>2014.11</option>
							         <option>2014.12</option>
							      </select>
							    </div>
							    <div class="col-sm-5">
							      <select class="form-control input-sm" name="maxAccountAnnual">
							         <option>2014.1</option>
							         <option>2014.2</option>
							         <option>2015.3</option>
							         <option>2014.4</option>
							         <option>2014.5</option>
							         <option>2014.6</option>
							         <option>2014.7</option>
							         <option>2014.8</option>
							         <option>2014.9</option>
							         <option>2014.10</option>
							         <option>2014.11</option>
							         <option selected="selected">2014.12</option>
							      </select>
							    </div>
							  </div>
					     </div><!-- E 期间参数 -->
					     <!-- S 科目列表参数 -->
					     <div style="width: 100%;border: 0px solid #ddd;margin-top: 10px;padding: 10px;">
					         <div style="position: relative;top:-20px;background-color: white;width: 64px"></div>
							 <div class="form-group">
							    <div class="col-sm-2"></div>
							    <label class="col-sm-2 control-label">科目</label>
							    <div class="col-sm-6">
						            <div class="input-group">
						               <input type="text" class="form-control" name="subjectIdList">
						               <span class="input-group-btn">
						                  <button class="btn btn-default" type="button" name="subjectSelectButton">
						                    <span class="glyphicon glyphicon-search"></span>
						                  </button>
						               </span>
						            </div><!-- /input-group -->
							    </div>	    
							 </div>
					     </div><!-- E 科目列表参数 -->
					     <!-- S 级次/末级科目-->
					     <div style="width: 100%;border: 1px solid #ddd;margin-top: 10px;padding: 10px;">
					         <div style="position: relative;top:-20px;background-color: white;width:95px">级次/末级科目</div>
							 <div class="form-group">
							    <div class="col-sm-2 radio">
							      <label>
							      <input type="radio" class="enabledIfEndSubject" checked="checked">
							      </label>
								</div>
							    <label class="col-sm-2 control-label">级次</label>
							    <div class="col-sm-4">
							      <select class="form-control input-sm" name="minSubjectLevel">
							         <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option>
							      </select>
							    </div>
							    <div class="col-sm-4">
							      <select class="form-control input-sm" name="maxSubjectLevel">
							         <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
							         <option selected="selected">6</option>
							      </select>
							    </div>
							  </div>
							 <div class="form-group">
							    <div class="col-sm-2 radio">
							      <label>
							      <input type="radio"  name="ifEndSubject"  >
							      </label>
								</div>
								<label class="col-sm-2 control-label">末级科目</label>
								<div class="col-sm-8"></div>
							  </div>
					     </div><!-- E 级次/末级科目-->
					     <!-- S 辅助核算项-->
					     <div style="width: 100%;border: 1px solid #ddd;margin-top: 10px;padding: 10px;" id="assitsItemDIV">
					         <div style="position: relative;top:-20px;background-color: white;width:95px">辅助核算项</div>
							 <div class="form-group">
							    <div class="col-sm-2 checkbox">
							      <label>
							      <input type="checkbox" checked="checked" name="departmentCheckBox" class="assitsItem">
							      </label>
								</div>
							    <label class="col-sm-2 control-label">部门</label>
							    <div class="col-sm-8">
						            <div class="input-group">
						               <input type="text" class="form-control" name ="departmentIdList">
						               <span class="input-group-btn">
						                  <button class="btn btn-default" type="button">
						                    <span class="glyphicon glyphicon-search"></span>
						                  </button>
						               </span>
						            </div><!-- /input-group -->
							    </div>
							  </div>
							 <div class="form-group">
							    <div class="col-sm-2 checkbox">
							      <label>
							      <input type="checkbox" checked="checked" name="employeeCheckBox" class="assitsItem">
							      </label>
								</div>
							    <label class="col-sm-2 control-label">职员</label>
							    <div class="col-sm-8">
						            <div class="input-group">
						               <input type="text" class="form-control" name="employeeIdList">
						               <span class="input-group-btn">
						                  <button class="btn btn-default" type="button">
						                    <span class="glyphicon glyphicon-search"></span>
						                  </button>
						               </span>
						            </div><!-- /input-group -->
							    </div>
							  </div>
							 <div class="form-group">
							    <div class="col-sm-2 checkbox">
							      <label>
							      <input type="checkbox" checked="checked" name="partnerCheckBox" class="assitsItem">
							      </label>
								</div>
							    <label class="col-sm-2 control-label">往来单位</label>
							    <div class="col-sm-8">
						            <div class="input-group">
						               <input type="text" class="form-control" name="partnerIdList">
						               <span class="input-group-btn">
						                  <button class="btn btn-default" type="button">
						                    <span class="glyphicon glyphicon-search"></span>
						                  </button>
						               </span>
						            </div><!-- /input-group -->
							    </div>
							  </div>
					     </div><!-- E 辅助核算项-->
					     <!-- S 其它参数-->
					     <div style="width: 100%;border: 0px solid #ddd;margin-top: 10px;padding: 10px;">
					         <div style="position: relative;top:-20px;background-color: white;width: 64px"></div>
							 <div class="form-group">
							 	<label class="col-sm-4 control-label"></label>
							    <label class="col-sm-3 control-label"><input type="checkbox" name="ifFsubjectBalanceR">包含未记账</label>
							  </div>
							 <div class="form-group">
							 	<label class="col-sm-4 control-label"></label>
							    <label class="col-sm-5 control-label"><input type="checkbox" name="ifExclude0Account">期间无发生显示累计</label>
							  </div>
					     </div><!-- E 其它参数-->
					   </div>
					   <div class="tab-pane fade" id="tab2-2">
					     <!-- 分组设置 -->
						 <table class="table table-hover">
							<thead>
								<tr>
									<th>序号</th>
									<th>分组名称</th>
									<th>分组小计</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody id="groupPararTable"> 
								<tr><td>1</td><td>科目</td><td><input type="checkbox" class="checkbox" name="ifGroupSubject" checked="checked"/></td><td>up,down</td></tr>
								<tr><td>2</td><td>部门</td><td><input type="checkbox" class="checkbox"  name="ifGroupDepartment" checked="checked"/></td><td>up,down</td></tr>
								<tr><td>3</td><td>职员</td><td><input type="checkbox" class="checkbox"  name="ifGroupEmployee" checked="checked"/></td><td>up,down</td></tr>
								<tr><td>4</td><td>往来单位</td><td><input type="checkbox" class="checkbox"  name="ifGroupPartner" checked="checked"/></td><td>up,down</td></tr>
								<tr><td>5</td><td>期间</td><td><input type="checkbox" class="checkbox"  name="ifSubjectIdFilter" checked="checked" disabled="disabled"/></td><td>up,down</td></tr>
							</tbody>
						 </table>
					   </div>			   
					   <div class="tab-pane fade" id="tab2-3">
					     <!-- 表头二次过滤 -->
						 <table class="table table-hover">
							<thead>
								<tr>
									<th>序号</th>
									<th>显示名称</th>
									<th>是否显示</th>
									<th>列表</th>
								</tr>
							</thead>
							<tbody>
								<tr><td>1</td><td>科目</td><td><input type="checkbox" name="ifSubjectIdFilter"/></td><td>250</td></tr>
								<tr><td>2</td><td>部门</td><td><input type="checkbox" name="ifDepartmentFilter"/></td><td>250</td></tr>
								<tr><td>3</td><td>职员</td><td><input type="checkbox" name="ifEmployeeFilter"/></td><td>250</td></tr>
								<tr><td>4</td><td>往来单位</td><td><input type="checkbox" name="ifPartnerFilter"/></td><td>250</td></tr>
							</tbody>
						 </table>
					   </div>
					</div>
					<!-- 标签页结束 -->
				</div>
			</div> 
			</form>	
         </div>
         <!-- 模态框底部部分 -->
         <div class="modal-footer">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">关闭
            </button>
            <button type="button" class="btn btn-default" onclick="searchSubjectDetail()">确定
            </button>
         </div>
      </div><!-- /.modal-content -->
	</div><!-- /.modal -->
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
			<iframe name="subjectSelectFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/cw/test/subjectReference"></iframe>
         </div>
	  </div>
	</div>
</div>	