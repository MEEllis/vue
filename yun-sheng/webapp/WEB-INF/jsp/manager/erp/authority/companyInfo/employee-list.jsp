<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!-- 
      employee.html
      <员工档案>
      
      Created by LyNnJeR on 2016-09-22 Thursday.
      Copyright 2016 LyNnJeR. All rights reserved.
 -->

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrapValidator.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
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
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/admin/company/employee.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/common_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/erp/authority/companyManager/employee.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		
		<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<!-- 菜单权限验证 -->
		<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
		<script type="text/javascript">
			$(function(){
				loadmodal();
			});
			//图片上传
			function picUpload(file){  
				 var picDiv = document.querySelector('#picUpload');  
				 if (file.files && file.files[0]){  
					 var reader = new FileReader();  
					 reader.onload = function(e){  
						 picDiv.innerHTML = '<img src="' + e.target.result + '" />';  
					 }    
				 	 reader.readAsDataURL(file.files[0]);  
				 }else{  
				 	picDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';  
				 }  
			};
			//图片上传
			function changeUpload(file){
				 var picDiv = document.querySelector('#changeUpload');  
				 if (file.files && file.files[0]){  
					 var reader = new FileReader();  
					 reader.onload = function(e){  
						 picDiv.innerHTML = '<img src="' + e.target.result + '" />';  
					 }    
				 	 reader.readAsDataURL(file.files[0]);  
				 }else{  
				 	picDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';  
				 }  
			};
			function setReload(){
			   	window.location.reload();
			}
		</script>
		<title>员工档案</title>
		<style>
			.fg{width:27%;}
			.empAddRight .fg{width:32%;}
			.fg label{
			    vertical-align: top;
			    height: 34px;
    			line-height: 34px;
			}
			.fg input[type=checkbox]{
				vertical-align: -10px;
			}
			.fg input[type=radio]{
				margin-top: 10px;
			}
			.form-group {
			    display: inline-block;
			}
			.form-control{
				display:inline-block;
			}
			#myModal .modal-content{width:1100px;}
		</style>
	</head>
	<body >
		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div id="AUTH" data-code="YGDA" class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default add" data-toggle="modal" data-target="#myModal">新增</button>
			  <button type="button" class="btn btn-default updateBloc" data-toggle="modal" data-target="#myModal">修改</button>	
			  <button type="button" class="btn btn-default btnDeleteRow" data-eventname="delete">删除</button>
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname='qiyon' id="0" >启用</button>
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname="jinyon" id="1">禁用</button>
			  <button type="button" class="btn btn-default empManage" data-eventname="printbtn" data-toggle="modal" data-target="#modalEmpManage">员工属性管理</button>
	          <button class="btn btn-default" onclick="setReload()">刷新 </button>
		      <button type="button" class="btn btn-default" onclick="window.parent.openWorkBoxByMenutext('员工导入','${basePath}/beginning/employee/toPage');">导入</button>
		      <button type="button" class="btn btn-default" id="export">导出</button>
			</div>
			
			<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
		 			 <div class="row">
						<div class="Zpercent form-group">
							<span for="" class="box_text2">员工查询：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" id="keyWord" class="form-control2" style="width: 190px" placeholder="请输入员工名称或员工编号或手机号码"  /></div></div>
						</div>
						<div class="Zpercent form-group">
							<span for="" class="box_text2">职位名称：</span>
							<div class="col-sm-8">
								<div class="input-group">
							<select  id="selectJobName" style='width:100%;height:30px;'>
							</select></div></div>
						</div>
						<div class="Zpercent form-group">
						<label>显示禁用：
						      <input type="checkbox" id="xsjy">
						  </label>
							 <button type="button" class="btn btn-success ">查询</button>
						</div>
					</div>
				</div>
			</form>
			<!-------------------------------------表格开始----------------------------------------->
				<div class="left">
					<div class="left-s">部门名称</div>
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
		
		<!--员工档案新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							新增员工
						</h4>
					</div>
					<div class="modal-body">
						<div class="showTab minWidth" style="min-width:100%;">
							<div class="current change">
									<div class="empAddTop" id="empupDateTop" ><!--
										<div class="empAddLeft">
											图片上传
											<div id="picUpload" class="clearAll">
												<img alt="图片" src="../../images/mr.jpg">
											</div>  
												<input type="file" onchange="picUpload(this)" name="imgUrl" />
										</div>
										--><div class="empAddRight" style="width: 100%;min-width:1062px;">
											<!--必填-->
											<form id='clerkMustForm' method="post" action="">
											<fieldset class="fieLeft" id="">
												<legend>必填项</legend>
													<input type="hidden" name="id" id="eid" />
													<div class="fg">
														<label for="">所属公司:</label>
														<input class="companyName form-control" disabled="disabled">
													</div>
													<div class="fg">
														<label for="">所属部门:</label>
														<select  class="clearAll sectionName form-control" name="sectionId"></select>
													</div>
													<div class="fg">
														<label for="">职位名称:</label>
														<select  class="clearAll jobName form-control" name="positionId"></select>
													</div>
													<div class="fg">
														<label for="">员工编码:</label>
														<div class="form-group">
															<input name="code" type="text" class="clearAll  form-control"  placeholder="留空时系统自动编码"/>
														</div>
													</div>
													<div class="fg">
														<label for="">员工姓名:</label>
														<div class="form-group">
															<input name="name" type="text" class="clearAll nameCheck form-control"/>
														</div>
													</div>
													<div class="fg">
														<label class="">性别:</label>
														<label class="radio-inline">
														<input type="radio" name="sex" class="radio_Class" value="男"> 男
														</label>
														<label class="radio-inline">
														<input type="radio" name="sex" class="radio_Class"  value="女"> 女
														</label>
													</div>
													<div class="fg">
														<label for="">在职状态:</label>
														<select class="YGZT form-control" name="inStatus"></select>
													</div>
													<div class="fg">
														<label for="isOprAdd">是否操作员:</label>
														<input type="checkbox"  class="clearAll textLeft" id="isOprAdd" name="isOpr" value="1" />
													</div>
													<div class="fg">
														<label for="isManagerAdd">是否主管:</label>
														<input type="checkbox"  class="clearAll textLeft" id='isManagerAdd' name="isManager" value="1" />
													</div>
													<div class="fg">
														<label for="isNotCompanyAdd">非本单位员工:</label>
														<input type="checkbox" class="clearAll textLeft" id='isNotCompanyAdd' name="isNotCompany" value="1" />
													</div>
													<div class="fg">
														<label for="isAppAdd">是否可登录APP:</label>
														<input type="checkbox"  class="clearAll textLeft" id='isAppAdd' name="isApp" value="1" />
													</div>
											</fieldset>
											</form>
										</div>
									</div>
									<!--选填项-->
									<form>
									<fieldset class="fieTwo fieLeft" id="updateEmpBody" style="width:100%;min-width:1062px;">
										<legend>选填项</legend>
										<input  type="hidden" name="id" id="extId"/>
										<div class="fg">
											<label for="">关联部门:</label>
											<input type="text"  id="relatedSection" class="jdbm clearAll form-control"  readonly="readonly" data-toggle="modal" data-target="#dataPowerModalDialog" title=""/>
										</div>
										<div class="fg">
											<label for="attrId">员工属性名称:</label>
											<select class="clearAll ATTR attrCheck form-control" name="attrId" id="attrId"></select>
										</div>
										<div class="fg">
											<label for="">入职日期:</label>
											<input type="text"  class="clearAll form-control" name="entryDay" id="datetimepickerStart" placeholder="年-月-日"/>
										</div>
										<div class="fg">
											<label for="">离职日期:</label>
											<input type="text"  class="clearAll form-control" name="dimissionDay" id="datetimepickerEnd" placeholder="年-月-日"/>
										</div>
										<div class="fg">
											<label for="">民族:</label>
											<input  class="clearAll form-control" name="nation"/>
										</div>
										<div class="fg">
											<label for="">籍贯:</label>
											<input type="text"  class="clearAll form-control" name="nativePlace"/>
										</div>
										<div class="fg">
											<label for="">出生日期:</label>
											<input type="text"  class="clearAll form-control" name="birthDay" id="datetimepickerBirthday" placeholder="年-月-日" />
										</div>
										<div class="fg">
											<label for="">文化程度:</label>
											<select  class="clearAll WHCD form-control" name="education"></select>
										</div>
										<div class="fg">
											<label class="">婚姻状况:</label>
											<label class="radio-inline">
											<input type="radio" name="maritalStatus" class="radio_Class" id="" value="已婚"> 已婚
											</label>
											<label class="radio-inline">
											<input type="radio" name="maritalStatus" class="radio_Class" id="" value="未婚"> 未婚
											</label>
										</div>
										<div class="fg">
											<label for="">健康状况:</label>
											<select  class="clearAll JKZK form-control" name="healthCondition"></select>
										</div>
										<div class="fg">
											<label for="">政治面貌:</label>
											<select  class="clearAll ZZMM form-control" name="politicsStatus"></select>
										</div>
										<div class="fg">
											<label class="">户籍性质:</label>
											<label class="radio-inline">
											<input type="radio" name="domicileNature" class="radio_Class"  value="城镇"> 城镇
											</label>
											<label class="radio-inline">
											<input type="radio" name="domicileNature" class="radio_Class" value="农村"> 农村
											</label>
										</div>
										<div class="fg">
											<label for="">支付宝帐号:</label>
											<input type="text"  class="clearAll form-control" name="alipay"/>
										</div>
										<div class="fg">
											<label for="">户名:</label>
											<input type="text"  class="clearAll form-control" name="acountName"/>
										</div>
										<div class="fg">
											<label for="">开户行:</label>
											<input type="text"  class="clearAll form-control" name="bank"/>
										</div>
										<div class="fg">
											<label for="">银行卡号:</label>
											<input type="text"  class="clearAll form-control" name="bankNumber" maxLength=19 />
										</div>
										<div class="fg">
											<label for="">QQ号:</label>
											<input type="text"  class="clearAll form-control" name="qqId"/>
										</div>
										<div class="fg">
											<label for="">微信号:</label>
											<input type="text"  class="clearAll form-control" name="wechatId"/>
										</div>
										<div class="fg">
											<label for="">身份证号:</label>
											<input type="text"  class="clearAll form-control" name="idCardNum"/>
										</div>
										<div class="fg">
												<label for="">手机号码:</label>
												<div id="clerkNonessentialForm" class="form-group" style='margin-right:0;'>
													<input type="text" class="telphone clearAll form-control" name="mobileNum"/>
												</div>
										</div>
									
							         	<div class="fg">
											<label for="">紧急联络人:</label>
											<input type="text"  class="clearAll form-control" name="emergencyContact"/>
										</div>
										<div class="fg">
											<label for="">与本人关系:</label>
											<input type="text"  class="clearAll form-control" name="rfWithI"/>
										</div>
										<div class="fg">
											<label for="">联系电话:</label>
											<input type="text"  class="clearAll form-control" name="contactNum"/>
										</div>
										<div class="fg">
											<label for="">现居住地址:</label>
											<input type="text"  class="clearAll form-control" name="nowLiveAddr" maxLength=100 />
										</div>
										<div class="fg">
											<label for="">户籍地址:</label>
											<input type="text"  class="clearAll form-control" name="domicileAddr" maxLength=100 />
										</div>
									</fieldset>
									</form>
								<span class="checkMsg"></span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<!--<button type="button" class="btn btn-success" onclick="saveAndAdd();">保存并新增</button>-->
						<button type="button" class="btn addEmployee" >保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--员工档案修改弹出窗-->
		<!-- 模态框（Modal） -->
		<!--<div class="modal fade" id="modalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							员工信息修改
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab minWidth">
							<div class="current change" id="updateEmpInfo">
								<form class="">
									<div class="empAddTop" id="empupDateTop">
										<div class="empAddLeft">
											图片上传
											<div id="picUpload" class="clearAll">
												<img alt="图片" src="../../images/mr.jpg">
											</div>  
												 <input type="file" onchange="picUpload(this)" name="imgUrl" /> 
										</div>
										<div class="empAddRight">
											必填
											<form id='clerkMustFormFix' method="post" action="">
											<fieldset class="fieLeft" id="">
												<legend>必填项</legend>
												<input type="hidden" name="id" id="eid" />
												<div class="fg">
													<label for="">所属公司:</label>
													<input class="companyName form-control" disabled="disabled">
												</div>
												<div class="fg">
													<label for="">所属部门:</label>
													<select  class="clearAll sectionName updateSectionName form-control" name="sectionId">
													</select>
												</div>
												<div class="fg">
													<label for="">职位名称:</label>
													<select  class="clearAll jobName updateJobName form-control" name="positionId">
													</select>
												</div>
												<div class="fg">
													<label for="">员工编码:</label>
													<div class="form-group">
														<input name="code" type="text" class="clearAll codeCheckUp form-control"/>
													</div>
												</div>
												<div class="fg">
													<label for="">员工姓名:</label>
													<div class="form-group">
														<input name="name" type="text"  class="clearAll nameCheckUp form-control"/>
													</div>
												</div>
												<div class="fg">
													<label class="">性别:</label>
													<label class="radio-inline">
													  <input type="radio" name="sex" class="radio_Class" id="" value="男"> 男
													</label>
													<label class="radio-inline">
													  <input type="radio" name="sex" class="radio_Class" id="" value="女"> 女
													</label>
												</div>
												<div class="fg">
													<label for="">在职状态:</label>
													<select  class="clearAll YGZT form-control" name="inStatus">
													</select>
												</div>
												<div class="fg">
													<label for="">员工属性名称:</label>
													<select  class="clearAll ATTR attrCheckUp form-control" name="attrId">
													</select>
												</div>
												<div class="fg">
													<label for="">是否操作员:</label>
													<input type="checkbox"  class="clearAll textLeft form-control" id='isOprUpdate' name="isOpr" value="1" />
												</div>
												<div class="fg">
													<label for="">是否主管:</label>
													<input type="checkbox"  class="clearAll textLeft form-control" id='isManagerUpdate' name="isManager"  value="1" />
												</div>
												<div class="fg">
													<label for="">非本单位员工:</label>
													<input type="checkbox"   class="clearAll textLeft form-control" id='isNotCompanyUpdate' name="isNotCompany"  value="1" />
												</div>
												<div class="fg">
													<label for="">是否可登录APP:</label>
													<input type="checkbox"  class="clearAll textLeft form-control" id='isAppUpdate' name="isApp"  value="1" />
												</div>
											</fieldset>
											</form>
										</div>
									</div>
									选填项
									<form id='' method="post" action="">
									<fieldset class="fieTwo fieLeft" id="updateEmpBody">
										<legend>选填项</legend>
										<input  type="hidden" name="id" id="extId"/>
										<div class="fg">
											<label for="">入职日期:</label>
											<input type="text"  class="clearAll form-control" name="entryDay" id="datetimepickerStartUpdate" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"datetimepickerStartUpdate","datetimepickerEndUpdate");' />
										</div>
										<div class="fg">
											<label for="">离职日期:</label>
											<input type="text"  class="clearAll form-control" name="dimissionDay" id="datetimepickerEndUpdate" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"datetimepickerStartUpdate","datetimepickerEndUpdate");' />
										</div>
										<div class="fg">
											<label for="">民族:</label>
											<input  class="clearAll form-control" name="nation"/>
										</div>
										<div class="fg">
											<label for="">籍贯:</label>
											<input type="text"  class="clearAll form-control" name="nativePlace" />
										</div>
										<div class="fg">
											<label for="">出生日期:</label>
											<input type="text"  class="clearAll form-control" name="birthDay" id="datetimepickerBirthdayUpdate" placeholder="年-月-日" />
										</div>
										<div class="fg">
											<label for="">文化程度:</label>
											<select  class="clearAll WHCD form-control" name="education">
											</select>
										</div>
										<div class="fg">
											<label class="">婚姻状况:</label>
											<label class="radio-inline">
											<input type="radio" name="maritalStatus" class="radio_Class" id="inlineRadio1" value="已婚"> 已婚
											</label>
											<label class="radio-inline">
											<input type="radio" name="maritalStatus" class="radio_Class" checked="checked" id="inlineRadio2" value="未婚"> 未婚
											</label>
										</div>
										<div class="fg">
											<label for="">健康状况:</label>
											<select  class="clearAll JKZK form-control" name="healthCondition">
											</select>
										</div>
										<div class="fg">
											<label for="">政治面貌:</label>
											<select  class="clearAll ZZMM form-control" name="politicsStatus">
											</select>
										</div>
										<div class="fg">
											<label class="">户籍性质:</label>
											<label class="radio-inline">
											  <input type="radio" name="domicileNature" class="radio_Class" checked="checked" id="inlineRadio1" value="城镇"> 城镇
											</label>
											<label class="radio-inline">
											  <input type="radio" name="domicileNature" class="radio_Class" id="inlineRadio2" value="农村"> 农村
											</label>
										</div>
										<div class="fg">
											<label for="">支付宝帐号:</label>
											<input type="text"  class="clearAll form-control" name="alipay" />
										</div>
										<div class="fg">
											<label for="">户名:</label>
											<input type="text"  class="clearAll form-control" name="acountName" />
										</div>
										<div class="fg">
											<label for="">开户行:</label>
											<input type="text"  class="clearAll form-control" name="bank"/>
										</div>
										<div class="fg">
											<label for="">银行卡号:</label>
											<input type="text" class="clearAll form-control" name="bankNumber" />
										</div>
										<div class="fg">
											<label for="">QQ号:</label>
											<input type="text" class="clearAll form-control" name="qqId" />
										</div>
										<div class="fg">
											<label for="">微信号:</label>
											<input type="text" class="clearAll form-control" name="wechatId" />
										</div>
										<div class="fg">
											<label for="">身份证号:</label>
											<input type="text" class="clearAll form-control" name="idCardNum" />
										</div>
										<div class="fg" style='width:300px;'>
											<label for="">手机号码:</label>
											<div id="clerkNonessentialFormFix" class="form-group" style='margin-right:0;'>
												<input type="text" class="telphoneUp clearAll form-control" name="mobileNum"/>
											</div>
										</div>
										<div class="fg">
											<label for="">借调部门:</label>
											<input type="text" class="jdbm clearAll form-control" onclick="selectJdbm(2)"/>
										</div>
										<div class="fg">
											<label for="">紧急联络人:</label>
											<input type="text"  class="clearAll form-control" name="emergencyContact"/>
										</div>
										<div class="fg">
											<label for="">与本人关系:</label>
											<input type="text"  class="clearAll form-control" name="rfWithI"/>
										</div>
										<div class="fg">
											<label for="">联系电话:</label>
											<input type="text"  class="clearAll form-control" name="contactNum"/>
										</div>
										<div class="fg">
											<label for="">现居住地址:</label>
											<input type="text"  class="clearAll form-control" name="nowLiveAddr" maxLength=100 />
										</div>
										<div class="fg">
											<label for="">户籍地址:</label>
											<input type="text"  class="clearAll form-control" name="domicileAddr" maxLength=100 />
										</div>
									</fieldset>
									</form>
								<span class="checkMsg"></span>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-success" onclick="saveAndAdd();">保存并新增</button>
						<button type="button" class="btn btn-info updateEmployee">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div>
			</div>
		</div>
			
		--><!--授权弹出窗-->
		
		<!--员工属性管理弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalEmpManage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							员工属性管理
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
		
		<!--员工属性新增弹出窗-->
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
							<div id="attrAdd" class="current change">
								<div class="form-group">
									<label for="">属性编码:</label>
									<input type="text" name="code" class="form-control" maxLength="32" placeholder="留空时系统自动编码"/>
								</div>
								<div class="form-group">
									<label for="">属性名称:</label>
									<input type="text" name="name" class="form-control" maxLength="32"/>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info saveAttr">保存后新增</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--员工属性修改弹出窗-->
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
							<div class="current change" id="attrModify">
								<div class="form-group">
									<label for="">属性编码:</label>
									<input type="text" class="form-control" name="code" id="acode" maxLength="32" />
								</div>
								<div class="form-group">
								<input type="hidden" name="id" id="aid"/>
									<label for="">属性名称:</label>
									<input type="text" class="form-control" name="name" id="aname" maxLength="32"  />
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn updateAttr"  data-dismiss="modal">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		<!-------------------------------------主页面结束----------------------------------------->
		
		
<!-- 部门引用 -->
<div class="modal fade" id="sectionReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                  部门引用
            </h4>
         </div>
         <div class="modal-body">
			<iframe name="sectionReferenceFrame" frameborder="0" style="width: 100%;height:400px;" src="${basePath}/section/reference"></iframe>
         </div>
	  </div>
	</div>
</div>

<!-- 关联部门 -->
<div class="modal fade" id="dataPowerModalDialog" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">部门引用</h4>
			</div>
			<div class="modal-body">
				<!--<p>借调部门选择</p>
				--><ul id="empDataPowerTree" class="ztree" style="border: 1px gray solid;max-height: 300px;overflow: auto;">
				  </ul>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-w btn-danger chooseConfirm"  data-dismiss="modal">确定</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
	</body>
</html>





