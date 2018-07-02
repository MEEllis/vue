<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <meta name="renderer" content="webkit" />
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
	
    <link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/multiple-select.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/score.css?v=${version}"/>

		<!-- link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" /-->
	<title>会员促销设置——积分换购设置</title>
	<style type="text/css">
	    .ui-jqgrid{
	    	width: 1693px!important;
	    }
	    .tble .ui-jqgrid-view{
			width: 100%!important;
			height: 640px!important;
		}
		.tble .ui-jqgrid-hdiv{
			width: 1273px!important;
			
		}
		.tble .jqGridPager{
			width: 1090px!important;
		}
		.tble .ui-jqgrid-bdiv{
			width: 1090px;
			height: 612px!important;
		}
		.btn-grp>a:hover{
			border:0;
			}
	</style>
	</head>
  
 <body>
		<div class="content">
		<!--积分换购设置主页面开始   -->
		<!--top -->
			<div class="btn-grp" role="group" >
			  <a class="bn save_soreBuy"  data-eventname="save">保存</a>
			  <a  class="bn"   data-eventname="cancel"  class="cancel">取消</a>	
			  
			</div>
			<!--top end-->
		    <div class="content1">
		
			<!--表格 -->
			<div class="tble">
			<div class="tablebox1 retailDetailTable">
				<div class="grid-wrap" >
					<table id="jqGrid_scoreChangeSet" class="zxsaastable"></table>
				    <div id="jqGridPagerscoreChangeSet"></div>
				</div>
			</div></div>
			<!--表格   end-->
			</div>
			
			
			</div>
		<!--积分换购设置主页面结束   -->
		<!-- 商品名称模态框（Modal） -->
		<div class="modal fade" id="goodsch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 1070;">
			<div class="modal-dialog modalNine">
				<div class="modal-content " style=" width: 883px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							商品资料
						</h4>
					</div>
				  <div class="modal-body">
				  
					<div style="overflow: auto;">
						<div class="left-tree">
							<input type="hidden"/>
							<ul id="goodsDataTree" class="ztree"></ul>
						</div>							
					</div>
					
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 商品名称模态框（Modal）结束 -->
				<!--会员类型范围 模态窗-->
		<div class="modal fade" id="assoSortExtend" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title " id="assoSort">会员类型范围</h4>
				  </div>
			      <div class="modal-body" id="plzk">
			          <div class="bt-tble hd"  >
			          	<div class="tablebox retailDetailTable" >
								<div class="grid-wrap" >
									<table id="jqGrid_assoSortExtend" class="zxsaastable"></table>
								    <div id="jqGridPagerassoSortExtend" ></div>
								</div>
		            	</div>
			          </div>
			      </div>
			      <div class="modal-footer">
						<button type="button" class="btn btn-default " data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--会员类型范围莫态框 end-->
	</body>
	<jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/scoreChangeThing.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
    <script type="text/javascript">
    $(function(){
        
       initial();
    });
	</script>
</html>
