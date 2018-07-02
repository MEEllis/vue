<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
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
		
		<title></title>
		
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
	</style>
	</head>
  
 	<body >

		<!-------------------------------------主页面开始----------------------------------------->
			<div class="btn-group" role="group" >
			<button type="button" class="btn btn-default" data-eventname="add" id="add">新增</button>
			  <button type="button" class="btn btn-default" data-eventname="save">保存</button>	
			  <button type="button" class="btn btn-default" data-eventname="delete">删除</button>	
			  <button type="button" class="btn btn-default" data-eventname="delete">过账</button>
			  <button type="button" class="btn btn-default" data-eventname="delete">红冲</button>
			  <button type="button" class="btn btn-default" data-eventname="delete">退定</button>			  			  			  			  
			  <button type="button" class="btn btn-default" data-eventname='exportTablename'>导出</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">打印</button>
			  <button type="button" class="btn btn-default" data-eventname="printbtn">连查</button>
			  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" 
			  aria-expanded="false" aria-controls="collapseExample" data-eventname="inquery">查询</button>
			   <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" 
			  aria-expanded="false" aria-controls="collapseExample" data-eventname="extendInquery">高级搜索</button>
			</div>
			
			<div class="grid-title">批发调价</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
		<div class="collapse" id="collapseExample">
 			 <div class="well">
			<form id="inquire_option">
				<div class="inputbox container-fluid clearfix">
					<div class="row">
						<div class="col-xs-2 ">
							<span for="datetimepickerStart" class="box_text">开始日期：</span><span class="box_input"><input type="text" class="form-control" id="datetimepickerStart" placeholder="年-月-日"  /></span>
						</div>
						<div class="col-xs-2">
							<span class="box_text">客户名称：</span><span class="box_input"><select class="form-control" name="resourceTypeId" data-src="" data-default="" value=""></select></span>
						</div>
						<div class="col-xs-2">
							<span class="box_text">单据状态：</span><span class="box_input"><select type="form-control" name="resourceTypeId" id="" value="" placeholder="" class="form-control" /></select></span>
						</div>
						<div class="col-xs-2">
							<span class="box_text">调价类型：</span>
								<span class="box_input">
									<input type="radio" checked="checked" name="box" value="no" />&nbsp;串号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<input type="radio" name="box" value="num" />&nbsp;数量
								</span>
						</div>
						
					</div>
					<div class="row">
						<div class="col-xs-2">
							<span for="datetimepickerEnd" class="box_text">结束日期：</span><span class="box_input"><input type="text" class="form-control" id="datetimepickerEnd" placeholder="年-月-日"  /></span>
						</div>
						<div class="col-xs-2">
							<span class="box_text">调价员：</span><span class="box_input"><select class="form-control" name="resourceTypeId" data-src="" data-default="" value=""></select></span>
						</div>
						<div class="col-xs-2">
							<span for="datetimepickerNo" class="box_text">单据编号：</span><span class="box_input"><input type="text" class="form-control" id="datetimepickerNo" placeholder="年-月-日"  /></span>
						</div>
						<div class="col-xs-2">
							<span class="box_text">调价部门：</span><span class="box_input"><select class="form-control" name="resourceTypeId" data-src="" data-default="" value=""></select></span>
						</div>
						<div class="col-xs-2">
							<span class="box_text">单备注：</span><span class="box_input"><input type="text" name="dbz" id="" value="" placeholder="请输入单备注" class="form-control" /></span>
						</div>
						<!--<div class="col-xs-1">
							 <button type="button" class="btn btn-primary btn-sm">（小按钮）Small button</button>
						</div>-->
					</div>
					
				</div>
			</div>
			 </form>
			 </div>
		</div>
			<!-------------------------------------搜索条件结束----------------------------------------->			
			<form class="form-horizontal">
			   <div class="form-group">
			    <label for="datetimepickerStart1" class="col-sm-1 control-label">开始日期:</label>
			    <div class="col-sm-2">
			      <input type="text" class="form-control" id="datetimepickerStart1" placeholder="2000-01-01"  />
			    </div>
			     <label for="datetimepickerEnd1" class="col-sm-1 control-label">结束日期:</label>
			    <div class="col-sm-2">
			      <input type="text" class="form-control" id="datetimepickerEnd1" placeholder="2049-12-31"  />
			    </div>
			  </div>
			</form>
			<!-------------------------------------表格开始----------------------------------------->
			<div class="tablebox retailDetailTable">
				
				<div class="grid-wrap" style="margin-top:10px">
					<table id="jqGrid_SubjectBalance" class="zxsaastable">
					</table>
					<div id="jqGridPager" style="height: 30px"></div>
				</div>
			</div>
			<div class="grid-status"></div>
			<div class="contextMenu row" id="contextMenu" style="display:none;">
				<ul>
					<li id="rightClickFrozenCol">
						<span class="glyphicon glyphicon-pencil" style="float:left"></span>
						<span style="font-size:100%; font-family:Verdana;margin-left:10px;">冻结到此列</span><br />
					</li>
					<li id="hidenthiscol">
						<span style="font-size:100%;font-family: verdana;margin-left:10px;">隐藏此列</span>
					</li>
				</ul>
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		</form>
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
	<script src="../../js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="../../js/pagejs/threeThModel/channelChangePrice.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		$(function(){
		
			loadmodal();
		})
	</script>
</html>
