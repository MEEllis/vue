<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
        <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
        <link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrapValidator.min.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<title>增值服务</title>
		<style type="text/css">
             /*莫态框按钮自定义*/
            .btn-primary {
			    background-color: #5a8dbf;
			    border-radius: 3px;
             }
             .btn-default {
			    background-color: #ededed;
			    border-radius: 3px;
            }
            .addUPinfo span,.modifyUPinfo span {
			    width: 70px; 
             }
             /*验证样式*/
             .col-lg-1,.col-lg-2 {
               width: auto;
               padding-right: 0px; 
               padding-left: 0px; 
             }
             .help-block {
              margin-top:0px;
              margin-bottom:0px;
             }
             .modal-ipt {
               margin-right:0px;
             }
             .form-horizontal .form-group {
               margin-left:0px;
             }
             #addServiceModifyForm .row, 
             #addServiceAddForm .row {
               margin-left:0px;
             }
             .btn-grp a{color:#333}
		</style>
	</head>
	<body>
		<div class="content">
		<!--增值服务主页开始   -->
		    <div class="content1" style="border-bottom:0">
			<!--top -->
			<div  id="AUTH" data-code="ZZFWSZ" class="btn-grp" role="group" style="border: 1px solid #e3e3e3;">
			  <button  type="button" class="bn add"  data-eventname="add" data-toggle="modal" data-target="#addServiceModal" >新增</button>
			  <button  type="button" class="bn updateBloc update"   data-eventname="update" data-toggle="modal" data-target="#modifyServiceModal" >修改</button>	
			  <button  type="button" class="bn toggle_use" data-eventname="stopuse">启用/停用</button>
			  <a  class="bn" data-eventname="fresh"  onclick="window.location.reload();">刷新</a>
			  <button   type="button" class="bn  delete" data-eventname="delete">删除</button>	
			  <!--button  class="bn" data-eventname="exit"  href="/manager/member/cardType/toPage">退出</button-->
			</div>
			<!--top end-->
			<!--表格 -->
			<div class="tble">
			<div class="tablebox retailDetailTable">
				<div class="grid-wrap" >
					<table id="jqGrid_addService" class="zxsaastable"></table>
				    <div id="jqGridPagerAS"></div>
				</div>
			</div></div>
			<!--表格   end-->
			</div>
			</div>
		<!--增值服务主页结束   -->
		<!--增值服务新增模态窗-->
	<div class="modal addModal fade" id="addServiceModal" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content  form-group">
			      <div class="modal-header" >
							<button type="button" class="close addCancel" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title add" id="myModalLabel-add">增值服务·新增</h4>
				    </div>
			      <div class="modal-body" style="padding:0;">
			      	<form id="addServiceAddForm" class="form-horizontal">
			          <div class="row tp-info addUPinfo" style="padding:4% 4%;margin-bottom:20px;background-color:#f5f5f5;">
					          	<div  class="form-group">
					          	   <label class="col-lg-1">服务名称：</label>
					          	   <div class="col-lg-1"  style="margin-right:45px;"><input type="text" name="serviceName" id="" value="" class="w-148 modal-ipt" maxlength="32"/></div>
					          	   <div class="col-lg-1"><input type="checkbox" name="ifIm" id="sf" value="1" style="margin-top:4px"/></div>
					          	   <label class="col-lg-1" for="sf">是否关联串号</label>
					          	</div>
					          	<div class="form-group">
					          	   <label class="col-lg-1">服务期限：</label>
					          	   <div  class="col-lg-1"><input type="text" name="serviceDue" id="serviceDueAdd" value=""  class="w-148 modal-ipt f5 fwqx" /></div>
					          	   <label  class="col-lg-1" style="width: 45px; text-align: left; margin: 0;">月</label>
					          	   <div  class="col-lg-1"><input type="checkbox" name="yjyx" id="yj" value="1" class="yjyx" style="margin-top:4px"/></div>
					          	   <label class="col-lg-1" for="yj">永久有效</label>
					          	  <!-- &nbsp&nbsp&nbsp<span>有效期内可服务次数</span>
					          	   <input type="text " name="userNum" id="" value="" style="width: 58px;" class="modal-ipt f5 yxq" placeholder="正整数"/>
					          	   <input type="checkbox" name="wxcs" id="wc" value="1" class="wxcs"/><label for="wc">无次数限制</label>-->
					          	</div>
					          	<div class="form-group">
					          	   <label class="col-lg-1" style="width:127px;margin-right:4px">有效期内可服务次数</label>
					          	   <div  class="col-lg-1" style="margin-right:45px"><input type="text" name="userNum" id="userNumAdd" value="" style="width:96px;margin-left:4px;" class="modal-ipt f5 yxq" placeholder="正整数"/></div>
					          	   <div  class="col-lg-1"><input type="checkbox" name="wxcs" id="wc" value="1" class="wxcs" style="margin-top:4px"/></div>
					          	   <label class="col-lg-1" for="wc">无次数限制</label>
					          	</div>
					          	<div class="form-group">
						          	<label class="col-lg-1">预设定价：</label>
						          	<div   class="col-lg-1"><input type="text" name="setPrice" id="" value="" class="w-148 modal-ipt"/></div>
						          	<label class="col-lg-1" style="width:14px">元</label>
					          	</div>
					          	<div class="form-group">
					          		<label class="col-lg-1 span-title" style="width:70px;">备注：</label>
					          		<div   class="col-lg-1"><input type="text" name="remark" id="" value="" class="w-148 modal-ipt"  maxlength="100"/></div>
					          	</div>
					          	<div class="form-group tgle">
					          	    <label class="col-lg-1">适用范围：</label>
		        		            <div   class="col-lg-1"> <input type="radio" name="qbsp" id="all-add" value="1" checked="checked" class="allGoods"/></div>
		        		            <label  class="col-lg-1" for="all-add">全部商品</label>
		        	                <div   class="col-lg-1"> <input type="radio" name="qbsp" id="dis-add" value="2" class="someGoods"/></div>
		        	                <label  class="col-lg-1" for="dis-add" >部分商品</label>
					          	</div>
			          </div></form>
			          <div class="bt-tble" style="width: 565px;min-width:565px;height: 285px;margin: auto;">
			          	<div class="tablebox retailDetailTable">
							    <div class="grid-wrap" id="rangeList" style="width:100%;height: 285px;">
											 <table id="jqGrid_add" class="zxsaastable"></table>
										    <div id="jqGridPageradd"></div>
									</div>
		            	</div>
			          </div>
			      </div>
			     <div class="modal-footer">
			      	 <button type="button" class="btn btn-primary addService" >保存</button>
						   <button type="button" class="btn btn-default addCancel" data-dismiss="modal">取消</button>
					 </div>
			      
			    </div>
  			</div>
		</div> <!--add end-->
			<!--增值服务修改模态窗-->
		<div class="modal modifyModal fade" id="modifyServiceModal" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close modifyCancel" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title modify" id="myModalLabel-modify">增值服务·修改</h4>
				  </div>
				  <input id="id" name="id" type="hidden"/>
			      <div class="modal-body" style="padding:0;">
			           <form id="addServiceModifyForm" class="form-horizontal">
			          <div class="row tp-info modifyUPinfo" style="padding:4% 4%;margin-bottom:20px;background-color:#f5f5f5;">
			          	 <div  class="form-group">
			          	    <label class="col-lg-1">服务名称：</label>
			          	    <div class="col-lg-1"  style="margin-right:45px;"><input type="text" name="serviceName" id="serviceName" value="" class="w-148 modal-ipt"  maxlength="32"/></div>
			          	    <div class="col-lg-1"><input type="checkbox" name="ifIm" id="ifIm" value="1" style="margin-top:4px"/></div>
			          	    <label class="col-lg-1" for="ifIm">是否关联串号</label>
			          	</div>
			          	 <div  class="form-group">
			          	    <label class="col-lg-1">服务期限：</label>
			          		<div class="col-lg-1"><input type="text" name="serviceDue" id="serviceDue" value=""  class="w-148 modal-ipt f5 fwqx" /></div>
			          		<label  class="col-lg-1" style="width:45px;text-align:left;margin:0;">月</label>
			          	   <div class="col-lg-1"><input type="checkbox" name="yjyx" id="yjyx" value="1" class="yjyx" style="margin-top:4px"/></div>
			          	   <label for="yjyx" class="col-lg-1">永久有效</label>
			          	  
			          	</div>
			           <div  class="form-group">
			          	   <label class="col-lg-1" style="width:127px;margin-right:4px">有效期内可服务次数</label>
			          	   <div  class="col-lg-1" style="margin-right:45px"><input type="text " name="userNum" id="userNum" value="" style="width:96px;margin-left:4px;" class="modal-ipt f5 yxq" placeholder="正整数"/></div>
			          	   <div  class="col-lg-1"><input type="checkbox" name="wxcs" id="wxcs" value="1" class="wxcs" style="margin-top:4px"/></div>
			          	   <label  class="col-lg-1" for="wxcs">无次数限制</label>
			          	</div>
			          	<div  class="form-group">
			          	   <label class="col-lg-1">预设定价：</label>
			          	   <div   class="col-lg-1"><input type="text " name="setPrice" id="setPrice" value=""  class="w-148 modal-ipt"/></div>
			          	   <label class="col-lg-1" style="width:14px">元</label>
			          	</div>
			          	<div class="form-group">
			          		<label class="col-lg-1 span-title" style="width:70px;">备注：</label>
                            <div   class="col-lg-1"><input type="text" name="remark" id="remark" value="" class="w-148 modal-ipt" maxlength="100"/></div>
			          	</div>
			          	<div class="form-group tgle">
                            <label class="col-lg-1">适用范围：</label>
                            <div   class="col-lg-1"> <input type="radio" name="updateqbsp" id="all-modify" value="1" checked="checked" class="allGoods"/></div>
                            <label  class="col-lg-1" for="all-modify">全部商品</label>
                            <div   class="col-lg-1"> <input type="radio" name="updateqbsp" id="dis-modify" value="2" class="someGoods"/></div>
                            <label  class="col-lg-1" for="dis-modify" >部分商品</label>
                        </div>
			          </div>
			          <div class="bt-tble" style="width: 565px;min-width:565px;height: 285px;margin: auto;">
			          	<div class="tablebox retailDetailTable">
								<div class="grid-wrap" id="rangeList" style="width:100%;height: 285px;">
									<table id="jqGrid_update" class="zxsaastable"></table>
								    <div id="jqGridPageradd"></div>
								</div>
		            	</div>
			          </div></form>
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn btn-primary updateService" >保存</button>
						<button type="button" class="btn btn-default modifyCancel" data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end-->
	</body>
		<!-- 商品名称模态框（Modal） -->
		<div class="modal fade" id="goodsch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content " style="width:599px;min-width:599px;">
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
	
	<jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/addValueService.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function(){
	  initial();
	
	});
    </script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>

