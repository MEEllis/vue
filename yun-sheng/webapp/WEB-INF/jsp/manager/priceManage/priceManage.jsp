<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>价格管理</title>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/priceManage/priceManage.css?v=${version}"/>
		<script type="text/javascript">
			//全局变量
			var gl_groupId = ${groupId};//集团ID
			var basePath = "${basePath}";
		</script>
		<style>
		.erp-lab {
		min-width:60px;
		border-radius: 4px;
		height: 34px;
		line-height: 34px;
		font-size: 14px;
		background-color: #ffffff;
		border: 1px solid #ccc;
		cursor: pointer;
			vertical-align:middle;
		}
		.priceLen {
			height:15px;
			min-width:15px;
			line-height: 15px;
			text-align: center;
			font-size: 12px;
			background: #e4393c;
			color: #fff;
			display: inline-block;
			position: absolute;
			top: -3px;
			left: 19px;
			border-radius:5px;
		}
		.valuationMethodsIcon3{
			display: block;
		}
			.isShowVoid{
				margin-top:24px
			}
		</style>
	</head>
	<body>
	<div class="content">
		<div id="AUTH" data-code="SPJGGL" class="btn-group btnHundred" role="btn-group">
			<button type="button" class="btn  add" data-eventname="add">保存</button>	
			  <button type="button" class="btn  del" data-eventname="delete">导出</button>	
			  <button type="button" class="btn  entry" data-eventname="delete">打印</button>
			  
			  <%--<button type="button" class="btn " data-eventname="delete" id="batchChange">批量改价</button>			  			  			  			  --%>
			  <button type="button" class="btn priceSet" data-eventname="delete" href="/manager/priceManage/showContactsunitSale">往来单位价格设置</button>
			  <%--<button type="button" class="btn btn-default" onclick="window.parent.openWorkBoxByMenutext('价格导入','${basePath}/beginning/price/toPage');">导入</button>--%>

			<div class="btn-group" role="group">
				<button id="operation" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
						aria-haspopup="true" aria-expanded="false">
					导入
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu actionBox" style="text-align: center">
					<li onclick="window.parent.openWorkBoxByMenutext('价格导入','${basePath}/beginning/price/toPage?lead=1',true);">
							<input  class='e-caozuo' type='button' value='商品所有价格导入'/>
					</li>
					<li onclick="window.parent.openWorkBoxByMenutext('价格导入','${basePath}/beginning/price/toPage?lead=2',true);">
							<input class='e-caozuo' type='button' value='特殊部门考核价导入'/>
					</li>
				</ul>
			</div>

		</div>
		<%--<div class="top">--%>
			<%----%>
			<%----%>
			<%--<!-- 修改的头部 -->--%>
			<%--<div class="Zpercent">--%>
					<%--<span class="box_text2">公司：</span>--%>
					<%--<span class="box_input input-group">--%>
					<%--<select class="form-control form-control2 companySe">--%>
							<%--<c:forEach items="${companyList}" var="company">--%>
								<%--<option data-id="${company.id}" value="${company.id}">--%>
									<%--${company.name }--%>
								<%--</option>--%>
							<%--</c:forEach>--%>
						<%--</select>--%>
					<%--</span>--%>
			<%--</div>--%>
		<%--</div>--%>
		<!--底部的树和表格-->
		<div class="center">
				<div class="centerL">
				<p>商品分类</p>
				<ul id="goodsClassify" class="ztree"></ul>
			    </div>
					
				<div class="centerR">
					<div class="row">
								<div class="Zpercent col-sm-3">
										<span class="box_text2">商品查询：</span>
										<span class="box_input input-group">
											<input type="text"  class="form-control form-control2 mainFilter filterGoodsName" placeholder='请输入名称或编码'/>
										</span>
								</div>
						<div class="form-group col-sm-1">
							<label class="isShowVoid">
								<input type="checkbox" id="goodsNameStatusCheckbox" class="" > 显示禁用
							</label>
						</div>

						<div class="col-sm-6 changeMargin">
							<form class="form-inline" role="form">
								<div class="form-group">
									<label>批量改价</label>
									<select class="form-control changeOne">
										<option data-flag="9">零售价</option>
										<option data-flag="10">最低零售价</option>
										<option data-flag="11">最低批发价</option>
										<option data-flag="14">部门考核价</option>
										<option data-flag="15">调拨价</option>
										<option data-flag="16">售价一</option>
										<option data-flag="17">售价二</option>
										<option data-flag="18">售价三</option>
										<option data-flag="19">售价四</option>
										<option data-flag="20">售价五</option>
										<option data-flag="21">预设进价</option>
									</select>
								</div>
								<div class="form-group">
									<label class="control-label">=</label>
									<select class="form-control changeTwo">
										<option data-flag="9">零售价</option>
										<option data-flag="10">最低零售价</option>
										<option data-flag="11">最低批发价</option>
										<option data-flag="14">部门考核价</option>
										<option data-flag="15">调拨价</option>
										<option data-flag="16">售价一</option>
										<option data-flag="17">售价二</option>
										<option data-flag="18">售价三</option>
										<option data-flag="19">售价四</option>
										<option data-flag="20">售价五</option>
										<option data-flag="21">预设进价</option>

									</select>
								</div>
								<div class="form-group">
									<select class="form-control operator">
										<option>+</option>
										<option>-</option>
										<option>*</option>
										<option>/</option>
									</select>
								</div>
								<div class="form-group">
									<input type="text" class="form-control operatorNum" style="width:120px;"/>
									<button type="button" class="erp-lab sureChange">计算</button>
								</div>
								<div class="form-group changeMargin " style="margin-top:0px;margin-left:10px;">
									<button type="button" class="erp-btn-bg secede">确定修改</button>
								</div>

							</form>
						</div>


								<div class="fr mt20 pixia col-sm-2">
									注：选中商品，修改价格，保存后生效
								</div>
					</div>
					<div class="GridWrap" >
						<table id="mainGrid" class="zxsaastable" style="overflow:hidden;"></table>
						<div id="mainPager"></div>
					</div>
			    </div>
            </div>
	</div>

		<!--模态窗-->
		<%--<div class="modal fade" tabindex="-1" id="changePriceModal">--%>
			<%--<div class="dialog model-dialog1">--%>
				<%--<div class="modal-content">--%>
					<%--<div class="modal-header">--%>
						<%--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span--%>
								<%--aria-hidden="true">&times;</span></button>--%>
						<%--<h4 class="modal-title" >批量改价</h4>--%>
					<%--</div>--%>
					<%--<div class="modal-body">--%>
						<%--<div class="container-fluid">--%>
							<%--<div class="row">--%>
								<%--<div class="col-md-5">--%>
									<%--<form class="form-horizontal " role="form">--%>
										<%--<div class="form-group">--%>
											<%--<label class="col-md-4 control-label">--%>
												<%--商品名称或编码--%>
											<%--</label>--%>
											<%--<div class="col-md-8">--%>
												<%--<input type="text" class="form-control filterGoodsName" />--%>
											<%--</div>--%>
										<%--</div>--%>
									<%--</form>--%>
								<%--</div>--%>
								<%--<div class="col-md-5">--%>
										<%--<form class="form-horizontal" role="form">--%>
											<%--<div class="form-group">--%>
												<%--<label class="col-md-4 control-label">--%>
												<%--品牌--%>
												<%--</label>--%>
												<%--<div class="col-md-8">--%>
													<%--<select class="form-control BrandName">--%>
							<%----%>
													<%--</select>--%>
												<%--</div>--%>
											<%--</div>--%>
										<%--</form>--%>
								<%--</div>--%>
								<%--<div class="col-md-2">--%>
									<%--<button type="button" class="btn btn-primary criteriaFilter">过滤</button>--%>
								<%--</div>--%>
							<%--</div>--%>
							<%--<!--商品分类-->--%>
							<%--<div class="row">--%>
								<%--<div class="col-md-12">--%>
									<%--<h4>修改范围</h4>--%>
								<%--</div>--%>

							<%--</div>--%>
							<%--<div class="row">--%>
								<%--<div class="col-md-2">--%>
									<%--<p>商品分类</p>--%>
									<%--<ul id="modalZtree" class="ztree"></ul>--%>
								<%--</div>--%>
								<%--<div class="col-md-10">--%>
									<%----%>
											<%--<p>商品管理</p>--%>
									<%----%>
									<%--<div style="overflow:auto;" id="scrollWrap">--%>
									<%--<table id="modalGrid" class="zxsaastable"></table>--%>
									<%--</div>--%>
								<%--</div>--%>
							<%--</div>--%>
							<%--<!--弹窗底部-->--%>
							<%--<div class="row">--%>
								<%--<div class="col-md-2">--%>
									<%--<h3>价格修改</h3>--%>
								<%--</div>--%>
								<%--<div class="col-md-8 changeMargin">--%>
									<%--<form class="form-inline" role="form">--%>
										<%--<div class="form-group">--%>
											<%--<select class="form-control changeOne">--%>
												<%--<option data-flag="8">零售价</option>--%>
												<%--<option data-flag="9">最低零售价</option>--%>
												<%--<option data-flag="10">最低批发价</option>--%>
												<%--<option data-flag="11">部门考核价</option>--%>
												<%--<option data-flag="12">售价一</option>--%>
												<%--<option data-flag="13">售价二</option>--%>
												<%--<option data-flag="14">售价三</option>--%>
												<%--<option data-flag="15">售价四</option>--%>
												<%--<option data-flag="16">售价五</option>--%>
												<%--<option data-flag="17">预设进价</option>--%>
											<%--</select>--%>
										<%--</div>--%>
										<%--<div class="form-group">--%>
											<%--<label class="control-label">=</label>--%>
											<%--<select class="form-control changeTwo">--%>
												<%--<option data-flag="8">零售价</option>--%>
												<%--<option data-flag="9">最低零售价</option>--%>
												<%--<option data-flag="10">最低批发价</option>--%>
												<%--<option data-flag="11">部门考核价</option>--%>
												<%--<option data-flag="12">售价一</option>--%>
												<%--<option data-flag="13">售价二</option>--%>
												<%--<option data-flag="14">售价三</option>--%>
												<%--<option data-flag="15">售价四</option>--%>
												<%--<option data-flag="16">售价五</option>--%>
												<%--<option data-flag="17">预设进价</option>--%>
											<%--</select>--%>
										<%--</div>--%>
										<%--<div class="form-group">--%>
											<%--<select class="form-control operator">--%>
												<%--<option>+</option>--%>
												<%--<option>-</option>--%>
												<%--<option>*</option>--%>
												<%--<option>/</option>--%>
											<%--</select>--%>
										<%--</div>--%>
										<%--<div class="form-group">--%>
											<%--<input type="text" class="form-control operatorNum" />--%>
											<%--<button type="button" class="erp-btn-lab sureChange">计算</button>--%>
										<%--</div>--%>
										<%----%>
									<%--</form>--%>
								<%--</div>--%>
								<%--<div class="col-md-2 changeMargin">--%>
									<%--<button type="button" class="erp-btn-bg secede">确定</button>--%>
								<%--</div>--%>
							<%--</div>--%>
						<%--</div>--%>
					<%--</div>--%>
				<%--</div>--%>
			<%--</div>--%>
		<%--</div>--%>
		<input id="fileFloder" type="file" style="display:none;" />
		<form id="submitForm" action="" method="post">
			<input type="hidden" id="valList" name="valList" value="">
		</form>
	<%--部门考核成本设置模态框--%>
	<div id="bmkhjModal" class="modal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document" style="width:850px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">特殊部门成本设置</h4>
				</div>
				<div class="modal-body">
					<h4 class="currentGoods"></h4>
					<div class="col-xs-4"><ul id="TreeDom" class="ztree"></ul></div>
					<div class="col-xs-8">
						<div class="row" style="padding-left:16px;padding-bottom:3px">
							<input type="text" class="form-control" id="searchStore" placeholder="请输入部门编码和部门名称" style="width:96%"></div>
						<table id='bmkhjGrid'></table>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" id="surebmjSet">保存修改</button>
					<button type="button" class="btn btn-default" data-dismiss="modal" id="giveSet">放弃修改</button>
				</div>
			</div>
		</div>
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
		<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}"></script>
		<script src="${basePath}/js/priceManage/priceManage.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	    <script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/underscore-min.js?v=${version}"></script>
		<script src="${basePath}/js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery-migrate-1.2.1.min.js?v=${version}"></script><!-- 打印 -->
		<script src="${basePath}/js/jquery.jqprint-0.3.js?v=${version}"></script><!-- 打印 -->
		<!-- 菜单权限验证 -->
		<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>