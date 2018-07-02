<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
  <head>
    <title>会员促销设置——多倍积分</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrapValidator.min.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
   <link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/multiplepoints.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
    <style type="text/css">
            html,body{width:100%;height:100%;}
			.adjust{
				height:28px;
			}
			.btn-grp>a:hover{
			  border:0;
			}
			.col-lg-1,.col-lg-2 {
               width: auto;
               padding-right: 0px; 
               padding-left: 0px; 
             }
             
             .form-group .col-lg-2 .va_ipt{
               margin-left:0px;
             }
             .help-block {
              margin-top:0px;
              margin-bottom:0px;
             }
             #togglingFormjfbs input[name=text]{
               width:148px;
               height:28px;
               border:1px solid #cfcfcf;
             }
             #AUTH button{
           	    border: 0;
    			background: transparent;
             }
            
             .addBorder{
                border:1px solid #e3e3e3;
             }
             .row{margin:0;}
		</style>
	</head>
	<body>
		<div class="content" style="width:98%;height:98%">
		<!--多倍积分主页开始   -->
		    <div class="content1"  id="saveResult" style="min-height: 400px;">
			<!--top -->
			<div id="AUTH" data-code="DBJFSZ" class="btn-grp" role="group" >
				<button type="button" class="save btn B_DBJFSZ_0001 none" >保存</button>
				<button type="button" class="btn B_DBJFSZ_0002 none" onclick="setReload()">刷新</button>
			  <input type="hidden" value=""  class="modify-id" name="id"/>
			</div>
			<!--top end-->
			<form id="togglingFormjfbs">
			<!--会员生日积分兑换 -->
			<div class="birthday-score">
				<div class="row">
				<div class="form-group" >
					<div class="col-lg-2"><input type="checkbox" name="" id="birthCk" value="" class="birth-day"/></div>
					<label  class="col-lg-1" id="" for="birthCk">会员生日</label>
					<div class="col-lg-2"><input type="text " name="brithNum" id="" value=""  class="multi-score" style="width:148px;height:28px;border:1px solid #e3e3e3" /></div>
					<label  class="col-lg-1" id="">倍积分</label>
				</div>
				</div>
			</div>
			<!--会员生日积分兑换 end -->
			<!--商品多倍积分 -->
			<div class="goodsMultiplepoints" id="timeT">
				<p>商品多倍积分</p>
				<p><input type="radio" name="timeType" id="scroes1" value="1" checked="checked" class="scroes"/><label for="scroes1">不使用多倍积分</label></p>
				<p>
					<input type="radio" name="timeType" id="scroes2" value="2" class="scroes"/><label for="scroes2">时段促销</label>
					<input type="text" name="startDate" id="startDate" value="" style="margin-right: 6px;border:1px solid #cfcfcf" class="uni adjust time-limit"/><span id="">至</span><input type="text" name="endDate" id="endDate" value="" class="adjust uni time-limit" style="margin-left: 6px;border:1px solid #cfcfcf" />
				</p>
				<p>
					<input type="radio" name="timeType" id="scroes3" value="3" class="scroes"/><label for="scroes3">按月促销</label>
					<span id="" >每月</span>
					<select name="" class="uni each-month" style="margin-left:6px;margin-right:6px">
					</select>
					<span id="">日</span>
				</p>
				
				<p class="week">
					<input type="radio" name="timeType" id="scroes4" value="4"  class="scroes"/><label for="scroes4">按周促销</label>
					<input type="checkbox" name="" id="Mo" value="1" class="uni2"/><label for="Mo">周一</label>
					<input type="checkbox" name="" id="Te" value="2" class="uni2"/><label for="Te">周二</label>
					<input type="checkbox" name="" id="We" value="3" class="uni2"/><label for="We">周三</label>
					<input type="checkbox" name="" id="Th" value="4" class="uni2"/><label for="Th">周四</label>
					<input type="checkbox" name="" id="Fr" value="5" class="uni2"/><label for="Fr">周五</label>
					<input type="checkbox" name="" id="Sa" value="6" class="uni2"/><label for="Sa">周六</label>
					<input type="checkbox" name="" id="Su" value="7" class="uni2"/><label for="Su">周日</label>
				</p>
				
				<!--积分倍数 -->
				<div class="row score-double">
					<div class="form-group" >
					<label  class="col-lg-1" id="">积分倍数</label>
					<div class="col-lg-2"><input type="text" name="multiNum" id="" value="" style="width:148px;height:28px;border:1px solid #cfcfcf"/></div>
					<label  class="col-lg-1" id="">倍积分</label>
					</div>
				</div>
			<!--积分倍数 end -->
			</div></form>
			<!--商品多倍积分   end-->
			</div>
			
			<div class="content2" style="height:40%;margin-top: 2%;">
			<!--参数详情 -->
			<div class="para" >
				<div class="pacontent">
					<div id="" class="paHead">
						<ul class="phead" style="float: left;">
							<li class="bn active goods"><span>商品范围</span></li>
							<li class="bn asso"><span>会员范围</span></li>
						 </ul>
					  <div id=" " class="all-dis" style="float: left;">
					  	  <p style="display:block" class="goods_radio">	
					  	  	<input type="radio" name="same" id="all-goods" value="1" checked="checked" class="same"/><label for="all-goods">全部商品</label>
					  	  	<input type="radio" name="same" id="dispart-goods" value="2" class="same"/><label for="dispart-goods">部分商品</label>
					  	  </p>
					  	  <p style="display:none" class="asso_radio">	
					  	  	<input type="radio" name="same_asso" id="all-assos" value="1" checked="checked" class="same"/><label for="all-assos">全部会员</label>
					  	  	<input type="radio" name="same_asso" id="dispart-assos" value="2" class="same"/><label for="dispart-assos">部分会员</label>
					  	  </p>
					  </div></div>
					<div class="pabody addBorder">
                           <!--商品范围 -->
						<div class="goods" style="display: none;">
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="width:100%;height:100%">
										<table id="jqGrid_goods" class="zxsaastable"></table>
								       <!--<div id="jqGridPagerGoods"></div>-->
									</div>
								</div>
						
						</div>	
						   <!--会员范围 -->
						<div class="asso" style="display: none;"  >
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="width:100%;height:100%">
										<table id="jqGrid_asso" class="zxsaastable"></table>
								       <!--<div id="jqGridPagerAsso"></div>-->
									</div>
								</div>
						</div>	
						   
						   
					</div>
				</div>
			</div>
			<!--参数详情   end-->
			</div>
			</div>
		<!--多倍积分主页面结束   -->
		<!-- 商品名称模态框（Modal） -->
		<div class="modal fade" id="goodsch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
		
	</body>
	<jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/multiplepoints.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function(){
        setSEDate();
    	initial();
    	//会员生日 多倍积分

    });
    
    function setReload(){
    	window.location.reload();
	}
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>

</html>
