<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="../../css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="../../css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css?v=${version}"/>
		
		<link rel="stylesheet" type="text/css" href="../../css/admin/blocMessage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="../../css/admin/publicModel.css?v=${version}" />
		<link rel="stylesheet" type="text/css"
	href="${basePath}/css/market/public.css?v=${version}" />
		<title>通用模块维护</title>
		
	</head>

	<body >

		<!-------------------------------------主页面开始----------------------------------------->
			<div class="btn-group btnHundred" role="group" >
			<button type="button" class="btn btn-default add" data-eventname="add" data-toggle="modal" data-target="#myModal">新增</button>
			  <button type="button" class="btn btn-default update" data-eventname="update" data-toggle="modal" data-target="#modalUpdate">修改</button>	
			  <button type="button" class="btn btn-default delete" data-eventname="delete" data-toggle="modal" data-target="#modalDelete">删除</button>	
			  <button type="button" class="btn btn-default" data-eventname="printbtn">导出</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
			</div>
			
			<div class="grid-title">通用模块维护</div>
			<div class="grid-title modelBoggle">
				<label>模块名称</label>&nbsp;&nbsp;&nbsp;
				<select>
					<option value="0">普通版</option>
					<option value="0">土豪版</option>
					<option value="0">黄金版</option>
					<option value="0">plus版</option>
				</select>
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!--main开始-->
			<div class="main">
				<div class="left">
					<div class="left-s">授权菜单</div>
					<div class="left_tree">
						<ul id="publicModelTree" class="ztree"></ul>
					</div>
				</div>
				<!--展示列表开始-->
				<div class="details">
					<div class="right">
						<span>授权明细</span>
					</div>
					<!--表格-->
					<%--<div class="jqGrid_wrap">
						<table id="jqGrid_metaData" ></table> 
	    				<div id="gridpager"></div>
					</div>
					--%><div class="jqGrid_wrap">
						<table>
							<tr><td>操作名称</td><td><input type="checkbox" class="checkAll" /></td></tr>
							<tr><td>采购订单</td><td><input type="checkbox" class="checkOne" /></td></tr>
							<tr><td>采购入库</td><td><input type="checkbox" class="checkOne" /></td></tr>
							<tr><td>采购退货</td><td><input type="checkbox" class="checkOne" /></td></tr>
							<tr><td>采购换货</td><td><input type="checkbox" class="checkOne" /></td></tr>
							<tr><td>获赠单</td><td><input type="checkbox" class="checkOne" /></td></tr>
							<tr><td>供应商报价单</td><td><input type="checkbox" class="checkOne" /></td></tr>
							<tr><td>供应商返利单</td><td><input type="checkbox" class="checkOne" /></td></tr>
							<tr><td>受托入库单</td><td><input type="checkbox" class="checkOne" /></td></tr>
							<tr><td>受托退货单</td><td><input type="checkbox" class="checkOne" /></td></tr>
							<tr><td>受托调价单</td><td><input type="checkbox" class="checkOne" /></td></tr>
							<tr><td>受托结算单</td><td><input type="checkbox" class="checkOne" /></td></tr>
						</table>
					</div>
				</div>
				<!--展示列表结束-->
			</div>
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
							通用模版新增
						</h4>
					</div>
					<div class="modal-body">
						<div class="grid-title modelBoggle">
							<label>模块名称</label>&nbsp;&nbsp;&nbsp;
							<input type="text" />
						</div>
						<div class="container">
							<div class="left">
								<div class="left-s">授权菜单</div>
								<div class="left_tree">
									<ul id="publicDataTree" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
								<div class="right">
									<span>授权明细</span>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap">
									<table>
										<tr><td>操作名称</td><td><input type="checkbox" class="checkAllAdd" /></td></tr>
										<tr><td>采购订单</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
										<tr><td>采购入库</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
										<tr><td>采购退货</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
										<tr><td>采购换货</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
										<tr><td>获赠单</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
										<tr><td>供应商报价单</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
										<tr><td>供应商返利单</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
										<tr><td>受托入库单</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
										<tr><td>受托退货单</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
										<tr><td>受托调价单</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
										<tr><td>受托结算单</td><td><input type="checkbox" class="checkOneAdd" /></td></tr>
									</table>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" onclick="saveAndClose();">保存后关闭</button>
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
							通用模版修改
						</h4>
					</div>
					<div class="modal-body">
						<div class="grid-title modelBoggle">
							<label>模块名称</label>&nbsp;&nbsp;&nbsp;
							<input type="text" />
						</div>
						<div class="container">
							<div class="left">
								<div class="left-s">授权菜单</div>
								<div class="left_tree">
									<ul id="publicDataTreeUpdate" class="ztree"></ul>
								</div>
							</div>
							<!--展示列表开始-->
							<div class="details">
								<div class="right">
									<span>授权明细</span>
								</div>
								<!--表格-->
								<div class="jqGrid_wrap">
									<table>
										<tr><td>操作名称</td><td><input type="checkbox" class="checkAllUpdate" /></td></tr>
										<tr><td>采购订单</td><td><input type="checkbox" class="checkOneUpdate" checked /></td></tr>
										<tr><td>采购入库</td><td><input type="checkbox" class="checkOneUpdate" /></td></tr>
										<tr><td>采购退货</td><td><input type="checkbox" class="checkOneUpdate" /></td></tr>
										<tr><td>采购换货</td><td><input type="checkbox" class="checkOneUpdate" checked /></td></tr>
										<tr><td>获赠单</td><td><input type="checkbox" class="checkOneUpdate" checked /></td></tr>
										<tr><td>供应商报价单</td><td><input type="checkbox" class="checkOneUpdate" /></td></tr>
										<tr><td>供应商返利单</td><td><input type="checkbox" class="checkOneUpdate" /></td></tr>
										<tr><td>受托入库单</td><td><input type="checkbox" class="checkOneUpdate" /></td></tr>
										<tr><td>受托退货单</td><td><input type="checkbox" class="checkOneUpdate" /></td></tr>
										<tr><td>受托调价单</td><td><input type="checkbox" class="checkOneUpdate" /></td></tr>
										<tr><td>受托结算单</td><td><input type="checkbox" class="checkOneUpdate" /></td></tr>
									</table>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" onclick="saveAndClose();">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--通用模版删除弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							通用模版删除
						</h4>
					</div>
					<div class="modal-body">
						<div class="container">
							<!--展示列表开始-->
							<div class="detailsDelete">
								<!--表格-->
								<div class="jqGrid_wrap">
									<table>
										<tr><td>模版ID</td><td>模版名称</td><td>操作</td></tr>
										<tr><td>001</td><td>免费版</td><td><a href="#" data-id='001' class="deletePublicModel">删除</a></td></tr>
										<tr><td>002</td><td>黄金版</td><td><a href="#" data-id='002' class="deletePublicModel">删除</a></td></tr>
										<tr><td>003</td><td>铂金版</td><td><a href="#" data-id='003' class="deletePublicModel">删除</a></td></tr>
										<tr><td>004</td><td>plus版</td><td><a href="#" data-id='004' class="deletePublicModel">删除</a></td></tr>
									</table>
								</div>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" onclick="saveAndClose();">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
	<script src="../../js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/erp/authority/templet.js?v=2.14.1" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		$(function(){
			loadmodal();
		})
		
		
		//全选
		$('.checkAll').on('click',function(e){
				//console.log('just for test!');
				$('.checkOne').prop("checked",this.checked);  
		});
		
		//单选
		var oneNode = $('.checkOne');
		oneNode.on('click',function(e){
			 $('.checkAll').prop("checked", oneNode.length == oneNode.filter(":checked").length ? true:false);  
		});
		
		//新增操作
		//全选
		$('.checkAllAdd').on('click',function(e){
				//console.log('just for test!');
				$('.checkOneAdd').prop("checked",this.checked);  
		});
		
		//单选
		var oneNode = $('.checkOneAdd');
		oneNode.on('click',function(e){
			 $('.checkAllAdd').prop("checked", oneNode.length == oneNode.filter(":checked").length ? true:false);  
		});
		
		//修改操作
		//全选
		$('.checkAllUpdate').on('click',function(e){
				//console.log('just for test!');
				$('.checkOneUpdate').prop("checked",this.checked);  
		});
		
		//单选
		var oneNode = $('.checkOneUpdate');
		oneNode.on('click',function(e){
			 $('.checkAllUpdate').prop("checked", oneNode.length == oneNode.filter(":checked").length ? true:false);  
		});



	</script>
</html>
