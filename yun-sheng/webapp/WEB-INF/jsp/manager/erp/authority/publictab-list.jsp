<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
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
		
		<title>公共选项维护</title>
		
		<style type="text/css">
			.ui-th-ltr{text-align:center;}
			.grid-title {
			    clear: both;
			    font-size: 24px;
			    text-align: center;
			    width: 100%;
			}
			.grid-head{
			width: 100%;
			font-size:16px;
			height:30px;
			}
			.grid-head .grid-date{
			display:inline-block;
			float:left;
			padding-left:20px;
			}
			.grid-head .grid-yuan{
			display:inline-block;
			float:right;
			padding-right:30px;
			}
			.grid-status{
			position:absolute;
			top:60px;
			right:50px;
			width:500px;
			height:30px;
			color:red;
			font-size:18px;
			text-align: right;
			}
			.parent{
				background-color:#f5f5f5;
			}
			.searchDate div{
				float: left;
				width: 250px;
			}
			.searchDate div input{
				float: left;
			}
			.searchDate div span{
				display:inline-block;
				float: left;
			}
			.searchDate{
				height: 30px;
				
			}
			#collapseExample{
				height: 90px;
			}
			#collapseExample .well{
				padding: 0px;
			}
			
			.change form div{
				margin: 1rem 2rem 0 2rem;
			}
			
			.change form label{
				width:10rem;
				text-align: right;
				margin-right: 3rem;
			}
			.change form input{
				width:14.5rem;
			}
			.change form div input.textLeft{
				width: 1rem;
			}
			.change form select{
				width:14.5rem;
			}
			#model-body{
				padding: 2rem 2rem 2rem 6rem;
			}
			.Zpercent {
				width: 24%;
				float: left;
			}
			.cc {
				width:4%;
			}
	</style>
	</head>

	<body >
		<!-------------------------------------主页面开始----------------------------------------->
			<div class="well">
			<div id="AUTH" data-code="GGXXWH" class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default addPublictab" data-eventname="add" id="add">新增</button>
			  <button type="button" class="btn btn-default addPublictab" data-eventname="update" id="update">修改</button>	
			  <button type="button" class="btn btn-default btnDeleteRow" data-eventname="delete">删除</button>	
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname='qiyon' id="0">启用</button>
			  <button type="button" class="btn btn-default enableOrDisable" data-eventname="jinyon" id="1">禁用</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
			</div>
			
			<!-------------------------------------搜索条件开始----------------------------------------->
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="Zpercent form-group">
							<span for="datetimepickerEnd" class="box_text2">选项编码：</span>
							<div class="col-sm-8">
								<div class="input-group">
									<input type="text" class="form-control2"  placeholder=""  name="code"/>
								</div>
							</div>
						</div>
						<div class="Zpercent form-group">
							<span class="box_text2">选项类型：</span>
							<span class="box_input input-group">
								<select class="form-control2" id="publictabTypeSearch" name="typeCode">
								<option value="">请选择</option>
								</select>
							</span>
						</div>
						<div class="Zpercent form-group">
							<span for="datetimepickerNo" class="box_text2">选项内容：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2"  placeholder=""  name="content1"/></div></div>
						</div>
						<div class="Zpercent form-group">
							<span for="datetimepickerNo" class="box_text2">备注：</span><div class="col-sm-8">
								<div class="input-group"><input type="text" class="form-control2"  placeholder="" name="remark" /></div></div>
						</div>
					</div>
				</div>
			</div>
			<button type="button" class="btn btn-success " onclick="search();" style='position:absolute;top:70px;right:30px;'>查询</button>
			 </form>
			 </div>
		</div>
			<!-------------------------------------表格开始----------------------------------------->
			<div class="tablebox retailDetailTable">
				
				<div class="grid-wrap" style="margin-top:10px">
					<table id="jqGrid_blocMessage" class="zxsaastable">
					</table>
					<div id="jqGridPager"></div>
				</div>
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		</form>
		
		<!--新增公共选项信息弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="showTab">
							<div class="current change">
								<form class="" id="publictabForm">
								    <div class="" style="display: none;">
										<label for="">公共选项ID:</label>
										<input type="text" id="id" name="id"/>
									</div>
									<div class="">
										<label for="" >选项类型:</label>
										<select id="typeSelect" name="typeCode">
										</select>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">选项编码:</label>
										<input type="text" id="code" name="code" onblur='checkInput.checkStrNum(this,32);'/>
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">选项内容1:</label>
											<input type="text" id="content1" name="content1" maxLength=32 />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">选项内容2:</label>
											<input type="text" id="content2" name="content2" maxLength=32 />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">选项内容3:</label>
											<input type="text" id="content3" name="content3" maxLength=32 />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">备注:</label>
										<input type="text" id="remark" name="remark" maxLength=100 />
										<span class="msg"></span>
									</div>
									<div class="">
										<label for="">是否禁用:</label>
											<input type="checkbox" class="textLeft" value="" id="status" />
											<span class="msg"></span>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<span id="saveAndAddSpan"></span>
						<button type="button" class="btn btn-info" id="saveAndClose" onclick="savePublictab(this.id);">保存后关闭</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal" onclick="closeOnly();">仅关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

		<!-------------------------------------主页面结束----------------------------------------->
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="../../js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/erp/authority/publictab-manage.js?v=2.5.1" type="text/javascript" charset="utf-8"></script>
	
	<link rel="stylesheet" type="text/css" href="../../js/cw/bootstrap/css/bootstrapValidator.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="../../css/market/public.css?v=${version}" />
	<script src="../../js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		$(function(){
			checkRole('#inquire_option');
			//checkRole('#filterSearchForm');
		})
	</script>
</html>

