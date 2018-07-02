<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

	<head>
		<title>日结</title>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="renderer" content="webkit">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<strong><meta name="renderer" content="webkit|ie-comp|ie-stand"></strong>
		<!-- 引入文件 -->
		<jsp:include page="../../../Include/import.jsp"></jsp:include>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont/iconfont.css?v=${version}" />
		
	</head>
    <style>
    .btns .btn-operate{
       background-color:#4e78a1;
       border-radius:3px;
       color:#fff;
    }
     .btn-operate:active,.btn-operate:link,.btn-operate:visited{
       border:1px solid transparent;
    }
    .btn-operate:hover,.btn-operate:focus{
       border:1px solid #fff;
       background-color:gray;
    }
    .form-group{
        margin-left:15px;
    }
    .form-control{
	    display: inline-block;
	    width: auto;
    }
    .inputbox .btns{
      text-align:center;
      margin-bottom:15px;
    }
    .date_search{
      margin-top: 16px;
      margin-left: 16px;
    }
    </style>
	<body class="e-body-bg pageBill">
		<!-------------------------------------主页面开始----------------------------------------->
		<div class="">
			<div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="RJ"></div>
			<div id="AUTH" data-code="RJ" class="btn-group btnHundred" role="group" style="padding-left: 20px;">
				<button type="button" class="btn e-btn e-btn-left" data-toggle="modal" data-target="#dayAccount">
					<span class="iconfont icon-rijie"></span>日结
				</button>
			</div>
			<div class="pageBillForm gridTop">
				<form class="clearfix form-inline" role="form" id="inquire_option">
					<div class="container-fluid">
						<div class="form-group col-sm-4 data_sT">
							<label>操作日期:</label>
							<div class="input-group col-sm-4">
								<input type="text" class="form-control data_start" name="startTime" id="startTime">
							</div>
							--
							<div class="input-group col-sm-4">
								<input type="text" class="form-control data_stop" name="endTime" id="endTime">
							</div>
						</div>

					   <div class="form-group col-sm-3">
							<a role="button" class="btn btn-primary cz_search">操作记录查询</a>
					   </div>
					</div>
				</form>
			</div>

			<div class="gridBody">
				<div class="date_search"  >
					<p><label>当前日结日期：</label><span  class="latest" sytle="width:179px;height:34px;border:1px solid #cfcfcf;"></span></p>
				</div>
				<div class="col-md-12 tablebox retailDetailTable cz">
					<div class="jqGrid_wrapper">
						<table id="jqGrid_searchOperate" class="zxsaastable">
						</table>
						<div id="jqGridPager1"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- 日结模态框（Modal） -->
		<div class="modal fade" id="dayAccount" tabindex="-1" role="dialog" aria-labelledby="intoModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content" style="width: 85%">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
							日结设置
						</h4>
					</div>
					<div class="modal-body">
						<div class="form-inline">
							<div class="col-sm-12">
								<label>当前日结日期：</label>
								<div class="input-group col-sm-8">
									<span class="latest"></span>
								</div>
							</div>
							<div class="col-sm-12">
								<label>日结截止日期：</label>
								<div class="input-group col-sm-4">
									<input type="text" class="form-control" id="endDate">
								</div>
								<span class="text-warning" style="padding-left: 5px;">(所选日期及之前的所有数据将不允许变更)</span>
							</div>
							<div class="col-sm-12" style="margin-top: 20px">
								<div>
									<span class="text-warning">温馨提示：</span>需要满足以下条件才能日结
								</div>
								<div style="padding: 5px 0px 20px 40px;">
									1、所选日结截止日期及以前没有草稿单 </br>
									2、所选日结截止日期及以前没有 "收款未确认" 的营业收款单
								</div>
							</div>
							<div style="padding-left: 40px;">
								<button type="button" class="btn e-btn e-btn-left del_btn" data-toggle="modal" disabled>
									<span class="iconfont icon-shanchu"></span>一键删除草稿单
								</button>

								<button type="button" class="btn e-btn e-btn-left confirm_btn" data-toggle="modal" data-target="#dayAccount" disabled>
									<span class="iconfont icon-querenshoukuan"></span>收款确认
								</button>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary rijie_btn" title="" data-dismiss="modal" >日结</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 日结模态框（Modal）结束 -->

		<!-- 草稿单列表模态框（Modal） -->
		<div class="modal fade" id="cgdModal" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content" style="width: 60%">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="">
							草稿单列表
						</h4>
					</div>
				  	<div class="modal-body">
						<div class="grid-wrap">
							<table id="jqGrid_rijieDraftOrder" class="zxsaastable"></table>
							<div id="jqGridPager"></div>
						</div>
				  	</div>
					<div class="modal-footer" style="text-align: center;">
						<button type="button" class="btn btn-primary delAll_btn" title="" data-dismiss="modal" >确认删除</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 草稿单列表模态框（Modal）结束 -->
		
		<!-------------------------------------主页面结束----------------------------------------->
		
	</body>
	<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
	<script src="${basePath}/js/erp/authority/initial/initial.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/authority/initial/model-initial.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/bootstrap/js/validator-company.js?v=${version}" type="text/javascript" charset="utf-8"></script>

	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
		var basePath = "${basePath}";
		var initialObj = null;
	</script>
</html>


