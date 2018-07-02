<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>价格参数设置</title>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../../manager/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../../manager/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../../manager/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../../manager/css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../../manager/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../../manager/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../../manager/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../../manager/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../../manager/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../../manager/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../../manager/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../../manager/css/priceManage/priceParam.css?v=${version}"/>
	</head>
	<body>
		 <div class="container-fluid">
				<ul id="myTab" class="nav nav-tabs">
					<li class="active">
							<a href="#demo1" data-toggle="tab">销售类单据价格策略</a>
					</li>
					<li>
							<a href="#demo2" data-toggle="tab">采购类单据价格策略</a>
					</li>
					<li>
								<a href="#demo3" data-toggle="tab">其他入库类价格策略</a>
					</li>
				</ul>
				<div id="AUTH" data-code="JGCLSZ" class="btn-group btnHundred" role="group" >
				<div class="btn-group">
							<button type="button" class="btn saveBtn">保存</button>
						</div>
				</div>
				<div id="myTabContent" class="tab-content">
					<div class="tab-pane fade in active" id="demo1">
												<!--开始-->
														 <div class="row getMargin">
						<div class="col-md-9">
							<div class="row">
								<div class="col-md-4">
									<h4>${priceExtractVoList[0].contend1}</h4>
									<div class="col-md-9">
									<table class="table table-bordered" align="center" id="firstCtrl">
										<tr>
											<th>售价提取方式</th>
											<th>允许使用</th>
										</tr>
										<c:forEach items="${priceExtractVoList[0].priceExtractList}" var="priceExtract">
											<tr
											
												data-companyid="${priceExtract.companyId }"
												data-costpwdcontrolflag="${priceExtract.costPwdControlFlag }"
												data-createby="${priceExtract.createBy }"
												data-createdate="${priceExtract.createDate }"
												data-createdatestring="${priceExtract.createDateString }"
												data-enableflag="${priceExtract.enableFlag }"
												data-groupid="${priceExtract.groupId }"
												data-id="${priceExtract.id }"
												data-lesscostflag="${priceExtract.lessCostFlag }"
												data-lessretailflag="${priceExtract.lessRetailFlag }"
												data-lesswholesaleflag="${priceExtract.lessWholesaleFlag }"
												data-priceextracttype="${priceExtract.priceExtractType }"
												data-pricetypename="${priceExtract.priceTypeName }"
												data-priority="${priceExtract.priority }"
												data-remark="${priceExtract.remark }"
												data-retailpwdcontrolflag="${priceExtract.retailPwdControlFlag }"
												data-salespwdcontrolflag="${priceExtract.salesPwdControlFlag }"
												data-pricetype="${priceExtract.priceType }"
											>
												<td
												
												 >${priceExtract.priceTypeName }</td>
												<td>
													<input type="checkbox" class="allowUser" <c:if test="${priceExtract.enableFlag==1 }"> checked </c:if> />
												</td>
											</tr>
										</c:forEach>
									</table>
									</div>
									<div class="col-md-1 vMiddle FistTable">
										<img class="getUp" src="../../../manager/images/up.png" />
										<img class="getDown" src="../../../manager/images/down.png" />
									</div>
									
								</div>
								<div class="col-md-4">
									<h4>${priceExtractVoList[1].contend1}</h4>
									<div class="col-md-9">
											<table class="table table-bordered" align="center" id="secondCtrl">
												<tr>
													<th>销售退货成本提取</th>
													<th>允许使用</th>
												</tr>
												<c:forEach items="${priceExtractVoList[1].priceExtractList}" var="priceExtract">
											<tr
											
												data-companyid="${priceExtract.companyId }"
												data-costpwdcontrolflag="${priceExtract.costPwdControlFlag }"
												data-createby="${priceExtract.createBy }"
												data-createdate="${priceExtract.createDate }"
												data-createdatestring="${priceExtract.createDateString }"
												data-enableflag="${priceExtract.enableFlag }"
												data-groupid="${priceExtract.groupId }"
												data-id="${priceExtract.id }"
												data-lesscostflag="${priceExtract.lessCostFlag }"
												data-lessretailflag="${priceExtract.lessRetailFlag }"
												data-lesswholesaleflag="${priceExtract.lessWholesaleFlag }"
												data-priceextracttype="${priceExtract.priceExtractType }"
												data-pricetypename="${priceExtract.priceTypeName }"
												data-priority="${priceExtract.priority }"
												data-remark="${priceExtract.remark }"
												data-retailpwdcontrolflag="${priceExtract.retailPwdControlFlag }"
												data-salespwdcontrolflag="${priceExtract.salesPwdControlFlag }"
												data-pricetype="${priceExtract.priceType }"
											>
												<td
												
												 >${priceExtract.priceTypeName }</td>
												<td>
													<input type="checkbox" class="allowUser" <c:if test="${priceExtract.enableFlag==1 }"> checked </c:if> />
												</td>
											</tr>
										</c:forEach>
											</table>
									</div>
									<div class="col-md-1 vMiddle">
										
										<img class="getUp" src="../../../manager/images/up.png" />
										<img class="getDown" src="../../../manager/images/down.png" />
									</div>
									
								</div>
							</div>
						 <!--销售类单据的底部勾选-->
						 	<div class="row">
						 		<div class="col-md-4 checkLeft">
						 		<input type="hidden" id="extractId" value="" />
						 			<div class="row">
						 			销售单价控制
							 			<div class="checkbox">
										    <label>
										      <input class="firstWholesale" type="checkbox" />允许低于最低批发价出库
										    </label>
										</div>
									</div>
									<div class="row">
							 			<div class="checkbox">
										    <label>
										      <input class="secondRetail" type="checkbox" />允许低于批发库存成本出库
										    </label>
										</div>
									</div>
						 		</div>
						 		<div class="col-md-4 checkRight">
						 			<div class="row">
						 			零售单价控制
										<div class="checkbox">
										    <label>
										      <input class="firstCost" type="checkbox" />允许低于最低零售价出库
										    </label>
										</div>
									</div>
									<div class="row">
							 			<div class="checkbox">
										    <label>
										      <input class="secondCost" type="checkbox" />允许低于库存成本出库
										    </label>
										</div>
									</div>
						 		</div>
						 	</div>
						</div>
					</div>
					
												<!--结束-->
					</div>
					<div class="tab-pane fade" id="demo2">
						<!--开始-->

												<div class="row getMargin">
						<div class="col-md-10">
							<div class="row">
								<div class="col-md-4">
										<h4>${priceExtractVoList[2].contend1}</h4>
									<div class="col-md-9">
											<table class="table table-bordered" align="center">
												<tr>
													<th>进价提取方式</th>
													<th>允许使用</th>
												</tr>
												<c:forEach items="${priceExtractVoList[2].priceExtractList}" var="priceExtract">
											<tr
											
												data-companyid="${priceExtract.companyId }"
												data-costpwdcontrolflag="${priceExtract.costPwdControlFlag }"
												data-createby="${priceExtract.createBy }"
												data-createdate="${priceExtract.createDate }"
												data-createdatestring="${priceExtract.createDateString }"
												data-enableflag="${priceExtract.enableFlag }"
												data-groupid="${priceExtract.groupId }"
												data-id="${priceExtract.id }"
												data-lesscostflag="${priceExtract.lessCostFlag }"
												data-lessretailflag="${priceExtract.lessRetailFlag }"
												data-lesswholesaleflag="${priceExtract.lessWholesaleFlag }"
												data-priceextracttype="${priceExtract.priceExtractType }"
												data-pricetypename="${priceExtract.priceTypeName }"
												data-priority="${priceExtract.priority }"
												data-remark="${priceExtract.remark }"
												data-retailpwdcontrolflag="${priceExtract.retailPwdControlFlag }"
												data-salespwdcontrolflag="${priceExtract.salesPwdControlFlag }"
												data-pricetype="${priceExtract.priceType }"
											>
												<td
												
												 >${priceExtract.priceTypeName }</td>
												<td>
													<input type="checkbox" class="allowUser" <c:if test="${priceExtract.enableFlag==1 }"> checked </c:if> />
												</td>
											</tr>
										</c:forEach>
											</table>
									</div>
									<div class="col-md-1 vMiddle">
										<img class="getUp" src="../../../manager/images/up.png" />
										<img class="getDown" src="../../../manager/images/down.png" />
									</div>
								</div>
								
								<!--右侧-->
								<div class="col-md-4">
										<h4>${priceExtractVoList[3].contend1}</h4>
									<div class="col-md-9">
											<table class="table table-bordered" align="center">
												<tr>
													<th>退货价提取方式</th>
													<th>允许使用</th>
												</tr>
												<c:forEach items="${priceExtractVoList[3].priceExtractList}" var="priceExtract">
														<tr
														
												data-companyid="${priceExtract.companyId }"
												data-costpwdcontrolflag="${priceExtract.costPwdControlFlag }"
												data-createby="${priceExtract.createBy }"
												data-createdate="${priceExtract.createDate }"
												data-createdatestring="${priceExtract.createDateString }"
												data-enableflag="${priceExtract.enableFlag }"
												data-groupid="${priceExtract.groupId }"
												data-id="${priceExtract.id }"
												data-lesscostflag="${priceExtract.lessCostFlag }"
												data-lessretailflag="${priceExtract.lessRetailFlag }"
												data-lesswholesaleflag="${priceExtract.lessWholesaleFlag }"
												data-priceextracttype="${priceExtract.priceExtractType }"
												data-pricetypename="${priceExtract.priceTypeName }"
												data-priority="${priceExtract.priority }"
												data-remark="${priceExtract.remark }"
												data-retailpwdcontrolflag="${priceExtract.retailPwdControlFlag }"
												data-salespwdcontrolflag="${priceExtract.salesPwdControlFlag }"
												data-pricetype="${priceExtract.priceType }"
														>
															<td
															 >${priceExtract.priceTypeName }</td>
															<td>
																<input type="checkbox" class="allowUser" <c:if test="${priceExtract.enableFlag==1 }"> checked </c:if> />
															</td>
														</tr>
												</c:forEach>
											</table>
									</div>
									<div class="col-md-1 vMiddle">
										<img class="getUp" src="../../../manager/images/up.png" />
										<img class="getDown" src="../../../manager/images/down.png" />
									</div>
								</div>
							</div>
						</div>
						</div>
						

												<!--结束-->
					</div>
					<div class="tab-pane fade" id="demo3">
						<!--开始-->

						<div class="row getMargin">
						<div class="col-md-6">
							<div class="col-md-6">
								<h4>${priceExtractVoList[4].contend1}</h4>
									<div class="col-md-9">
											<table class="table table-bordered" align="center">
												<tr>
													<th>其他入库类单据价格</th>
													<th>允许使用</th>
												</tr>
											<c:forEach items="${priceExtractVoList[4].priceExtractList}" var="priceExtract">
											<tr
											
												data-companyid="${priceExtract.companyId }"
												data-costpwdcontrolflag="${priceExtract.costPwdControlFlag }"
												data-createby="${priceExtract.createBy }"
												data-createdate="${priceExtract.createDate }"
												data-createdatestring="${priceExtract.createDateString }"
												data-enableflag="${priceExtract.enableFlag }"
												data-groupid="${priceExtract.groupId }"
												data-id="${priceExtract.id }"
												data-lesscostflag="${priceExtract.lessCostFlag }"
												data-lessretailflag="${priceExtract.lessRetailFlag }"
												data-lesswholesaleflag="${priceExtract.lessWholesaleFlag }"
												data-priceextracttype="${priceExtract.priceExtractType }"
												data-pricetypename="${priceExtract.priceTypeName }"
												data-priority="${priceExtract.priority }"
												data-remark="${priceExtract.remark }"
												data-retailpwdcontrolflag="${priceExtract.retailPwdControlFlag }"
												data-salespwdcontrolflag="${priceExtract.salesPwdControlFlag }"
												data-pricetype="${priceExtract.priceType }"
											>
												<td>${priceExtract.priceTypeName }</td>
												<td>
													<input type="checkbox" class="allowUser" <c:if test="${priceExtract.enableFlag==1 }"> checked </c:if> />
												</td>
											</tr>
										</c:forEach>
											</table>
									</div>
									<div class="col-md-1 vMiddle LastTable">
										<img class="getUp" src="../../../manager/images/up.png" />
										<img class="getDown" src="../../../manager/images/down.png" />
									</div>
							</div>
						</div>
						</div>
						

												<!--结束-->
					</div>
					
				</div>
</div>
		<!--  -->
	</body>
		<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
		<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/priceManage/priceParam.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<!-- 菜单权限验证 -->
		<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>