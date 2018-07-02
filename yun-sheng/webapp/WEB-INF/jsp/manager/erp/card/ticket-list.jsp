<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML >
<html>
  <head>
    <meta charset="UTF-8">
	<meta name="renderer" content="webkit" />
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/multiplepoints.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/assoCoupons.css?v=${version}"/>

	
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css?v=${version}">
	-->
    <title>会员促销设置——会员促销券管理</title>
		<style type="text/css">
		    .ui-jqgrid{
		    	width: 100%;
		    	border-left: none;
		    	border-right: none;
		    }
			.ui-jqgrid-bdiv{
				width: 1670px;
				height: 196px!important;
			}
			.jqGridPager{
				width: 1670px;
			}
			.bn{
				width: auto;
			}
			.w145{
				width: 145px;
			}
			.detailsAdd .ui-jqgrid,.detailsAdd .ui-jqgrid-hdiv,.detailsAdd .ui-jqgrid-bdiv,.detailsAdd .ui-jqgrid-view{
				width: 923px!important;
			}
			.detailsModify .ui-jqgrid,.detailsModify .ui-jqgrid-hdiv,.detailsModify .ui-jqgrid-bdiv,.detailsModify .ui-jqgrid-view{
				width: 923px!important;
			}
			#newAdd .bn,#ModifyModal .bn{
				margin-left: -4px;
			}
			#CouponsModal .ui-jqgrid{
				width: 572px;
				height: 426px;
			}
			#CouponsModal .ui-jqgrid-hdiv,#CouponsModal .ui-jqgrid-bdiv,#CouponsModal .ui-jqgrid-view{
				width: 100%!important;
			}
			#CouponsModal .ui-jqgrid-bdiv{
				height: 334px!important;
			}
			#dstributCouponsModal .ui-jqgrid{
				width: 927px;
				height: 426px;
			}
			#dstributCouponsModal .ui-jqgrid-hdiv,#dstributCouponsModal .ui-jqgrid-bdiv,#dstributCouponsModal .ui-jqgrid-view{
				width: 100%!important;
			}
			#dstributCouponsModal .ui-jqgrid-bdiv{
				height: 334px!important;
			}
			.btn-grp>a:hover{
			border:0;
			}
			
          /*会员券的checkbox*/
            
		</style>
	</head>
	<body>
		<div class="content">
		<!--会员促销券管理主页面   -->
		    <div class="content1">
			<!--top -->
			<div class="btn-grp" role="group" >
			  <a class="bn add"  data-eventname="add"  data-toggle="modal" data-target="#newAdd" >新增</a>
			  <a  class="bn modify"  data-eventname="update"  data-toggle="modal" data-target="">修改</a>	
			  <a  class="bn delete"  data-eventname="delete" >删除</a>	
			  <a  class="bn stop_use"  data-eventname="stopUse"  >停用</a>	 
			  <a  class="bn start_use"  data-eventname="startUse"  >启用</a>	
			  <a  class="bn"  data-eventname="printout">导出</a>	
			  <a  class="bn ff"  data-eventname="disStatus" data-toggle="modal" data-target="#dstributCouponsModal"  >发放情况</a>	
			  <a class="bn distAsso"  data-eventname="distAsso" data-toggle="modal" data-target="" >会员促销券发放</a>
			  
			</div>
			<!--top end-->
			
			<!--显示已失效会员促销券 table -->
			<div class="showTable0">
				<div class="tt">
					<p><input type="checkbox" name="" id="show-disVali" value="" style="margin-top: 4px;"/><label for="show-disVali">显示已失效会员促销券</label></p>
				</div>
				<!--表格 -->
				<div class="tablebox retailDetailTable">
					<div class="grid-wrap" >
						<table id="jqGrid_coupons" class="zxsaastable"></table>
					    <div id="jqGridPagercoupons"></div>
					</div>
				</div>
				<!--表格   end-->
			</div>
			<!--显示已失效会员促销券 table  end-->
			
			
			</div>
			
			<div class="content2">
			<!--参数详情 -->
			<div class="para" >
				<div class="pacontent">
					<div id="" class="paHead">
					<ul class="phead" style="float: left;">
						<li class="bn bn1 active details"><span>详细使用范围</span></li>
						<li class="bn bn1 useclass" style="border-right: 1px solid #CFCFCF;"><span>使用门槛</span></li>
					 </ul>
					 </div>
					<div class="pabody" style="border: 1px solid #cfcfcf;">
                           <!--详细适用范围 -->
						<div class="details  details1" style="display: none;">
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" >
										<table id="jqGrid_Details" class="zxsaastable"></table>
								       <div id="jqGridPagerDetails"></div>
									</div>
								</div>
						
						</div>	
						   <!--使用门槛 -->
						<div class="useclass useclass1" style="display: none;"  >
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" >
										<table id="jqGrid_useGrade" class="zxsaastable"></table>
								       <div id="jqGridPageruseGrade"></div>
									</div>
								</div>
						</div>	
						   
						   
					</div>
				</div>
			</div>
			<!--参数详情   end-->
			</div>
			</div>
		<!--会员促销券管理主页面 END  -->
		<!-- 新增模态框（Modal） -->
		<div class="modal fade" id="newAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content " style=" width: 959px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" >
							新增
						</h4>
					</div>
				  <div class="modal-body">
				  
					 
			          <div class="tp-info" style="width:1047px">
			          	<p>
			          		<span>券编号</span>
			          		<input type="text" name="ticketNo" id="" value="" class="" />
			          		<span>券名称</span>
			          	    <input type="text" name="ticketName" id="" value="" class="" />
			          	    <span>券分类</span>
				          	   <select name="ticketType">
				          	   	<option value="1">分类1</option>
				          	   	<option value="2">分类2</option>
				          	   	<option value="3">分类3</option>
				          	   	<option value="4">分类4</option>
				          	   </select>
				          	<span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span>
			          	    <input type="text" name="remark" id="" value="" class="" />   
			          	</p>
			          	<p>
			          		<span>券面值</span>
			          		 <input type="text" name="amount" id="" value="" class="" />
			          		 <input type="checkbox" name="" id="gateClass" value="" class="isStill" />
			          		 <label for="gateClass" style="margin-right: 91px;">是否有使用门槛</label>
			          		 <span>生效日期</span>
			          		 <input type="text" name="openDate" id="openDate" value="" class="" />
			          		 <span>截至日期</span>
			          		 <input type="text" name="closeDate" id="closeDate" value="" class="" />
			          	</p>
			          </div>
			          <!--详细使用范围  使用门槛 -->
			<div class="paraAdd" >
				<div class="pacontentAdd">
					<div id="" class="paHeadAdd">
						  <ul class="pheadAdd" style="float: left; border: 1px solid #CFCFCF;">
								<li class="bn bn2 active detailsAdd" ><span>详细使用范围</span></li>
								<li class="bn bn2 useclassAdd" ><span>使用门槛</span></li>
						  </ul>
						  <div id=" " class="all-disAdd" style="float: left;">
						  	  <p>	
						  	  	<input type="radio" name="same-add" class="same-add" id="all-goods-add" value="1" checked="checked"/><label for="all-goods-add">全部商品</label>
						  	  	<input type="radio" name="same-add" class="same-add" id="dispart-goods-add" value="2" /><label for="dispart-goods-add">部分商品</label>
						  	  </p>
						  </div>
					</div>
					<div class="pabodyAdd" style="height: 277px; border-left: 1px solid #CFCFCF; border-right: 1px solid #CFCFCF; margin-top: -10px;">
                           <!--详细适用范围 -->
						<div class="detailsAdd " style="display: none;">
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" >
										<table id="jqGrid_DetailsAdd" class="zxsaastable"></table>
								       <div id="jqGridPagerDetailsAdd"></div>
									</div>
								</div>
						
						</div>	
						   <!--使用门槛 -->
						<div class="useclassAdd " style="display: none;"  >
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" >
										<table id="jqGrid_useGradeAdd" class="zxsaastable"></table>
								       <div id="jqGridPageruseGradeAdd"></div>
									</div>
								</div>
						</div>	
					</div>
					<div class="bottom-side">
						<div class="two-bn">
							<a class="btn direction">生成说明</a>
						</div>
						<div class="show-close">
						<textarea class='drct_cotent_add'  style='width: 100%;height: 100%;border: none; overflow-y:auto;'>
					</textarea>
						--></div>
						<div class="sign-btm">
							<p> <span id=""> 新增人:</span><span id="" style="margin-left: 5px;margin-right: 39px;">胡波</span>
								<span id="">新增时间:</span><span id="" style="margin-left: 5px;margin-right: 39px;">2016-11-12</span>
								<input type="checkbox" name="" id="" value="" style="margin-top: 4px;" class="modelOrNot"/><label for="" style="margin-left: 5px;">是否已生成短信模板</label></p>
						</div>
					</div>
				</div>
			</div>
			<!--详细使用范围  使用门槛    end-->
				   </div>
					<div class="modal-footer">
						<a href="" class="btn btn-w btn-info create megsModel"  data-toggle="modal" data-target="#newAddMessage"  >生成/修改短信模板</a>
						<a href="" class="btn btn-w btn-info save_new" title="" data-dismiss="modal">保存</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 新增模态框（Modal）结束 -->
		
	    <!--生成新增短息模板  模态框 -->
		<div class="modal fade" id="newAddMessage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top: 26%;height: 87%;z-index: 1070;">
			<div class="modal-dialog modalNine">
				<div class="modal-content " style=" width: 959px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" >
							短信模板
						</h4>
					</div>
				  <div class="modal-body">
				  <div class="message-top-add" >
			          	<p style="margin-bottom: 10px;"><span id="">模板分类</span><input type="text" name="" id="" value="" placeholder="会员促销短信" style="width: 148px;height: 28px;"/></p>
			          		
			      </div>
			      <div class="message-bottom-add">
				       <p>短信内容</p>
			           <div class="message-content">
			           <textarea class='msg_cotent_add'  style='width: 100%;height: 100%;border: none; overflow-y:auto;'>
			          </textarea>
			           </div>
				   </div></div>
				   <div class="modal-footer">
					
						<button type="button"  class="btn btn-w btn-info save_megsModel"data-dismiss="modal" >保存</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				   </div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
			</div>	<!--生成新增短息模板  模态框END -->
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
						<a href="" class="btn btn-w btn-info">确定</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 商品名称模态框（Modal）结束 -->
		<!-- 修改模态框（Modal） -->
		<div class="modal fade" id="ModifyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content " style=" width: 959px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" >
							修改
						</h4>
					</div>
				  <div class="modal-body">
			          <div class="tp-info"  style="width:1047px">
			          	<p>
			          	   <input type="hidden" name="id"  value=""/>
			          		<span>券编号</span>
			          		<input type="text" name="ticketNo" id="" value="" class="" />
			          		<span>券名称</span>
			          	    <input type="text" name="ticketName" id="" value="" class="" />
			          	    <span>券分类</span>
				          	   <select name="ticketType">
				          	   	<option value="">分类1</option>
				          	   	<option value="">分类2</option>
				          	   	<option value="">分类3</option>
				          	   	<option value="">分类4</option>
				          	   </select>
				          	<span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span>
			          	    <input type="text" name="remark" id="" value="" class="" />   
			          	</p>
			          	<p>
			          		<span>券面值</span>
			          		 <input type="text" name="amount" id="" value="" class="" />
			          		 <input type="checkbox" name="" id="gateClass_M" value="" class="isStill" />
			          		 <label for="gateClass_M" style="margin-right: 91px;">是否有使用门槛</label>
			          		 <span>生效日期</span>
			          		 <input type="text" name="openDate" id="openDate_M" value="" class="" />
			          		 <span>截至日期</span>
			          		 <input type="text" name="closeDate" id="closeDate_M" value="" class="" />
			          	</p>
			          </div>
			          <!--详细使用范围  使用门槛 -->
			<div class="paraModify" >
				<div class="pacontentModify">
					<div id="" class="paHeadModify">
						  <ul class="pheadModify" style="float: left; border: 1px solid #CFCFCF;">
								<li class="bn bn2 active detailsAdd" ><span>详细使用范围</span></li>
								<li class="bn bn2 useclassAdd" ><span>使用门槛</span></li>
						  </ul>
						  <div id=" " class="all-disModify" style="float: left;">
						  	  <p>	
						  	  	<input type="radio" name="same-Modify" class="same-Modify" id="all-goods-Modify" value="1" checked="checked"/><label for="all-goods-Modify">全部商品</label>
						  	  	<input type="radio" name="same-Modify" class="same-Modify" id="dispart-goods-Modify" value="2" /><label for="dispart-goods-Modify">部分商品</label>
						  	  </p>
						  </div>
					</div>
					<div class="pabodyModify" style="height: 277px; border-left: 1px solid #CFCFCF; border-right: 1px solid #CFCFCF; margin-top: -10px;">
                           <!--详细适用范围 -->
						<div class="detailsModify " style="display: none;">
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" >
										<table id="jqGrid_DetailsModify" class="zxsaastable"></table>
								       <div id="jqGridPagerDetailsModify"></div>
									</div>
								</div>
						
						</div>	
						   <!--使用门槛 -->
						<div class="useclassModify" style="display: none;"  >
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" >
										<table id="jqGrid_useGradeModify" class="zxsaastable"></table>
								       <div id="jqGridPageruseGradeModify"></div>
									</div>
								</div>
						</div>	
					</div>
					<div class="bottom-side">
						<div class="two-bn">
							<a class="btn direction_M">生成说明</a>
						</div>
						<div class="show-close ">
							<textarea class='drct_cotent'  style='width: 100%;height: 100%;border: none; overflow-y:auto;'>
							</textarea>
						</div>
						<div class="sign-btm">
							<p> <span id=""> 新增人:</span><span id="" style="margin-left: 5px;margin-right: 39px;">胡波</span>
								<span id="">新增时间:</span><span id="" style="margin-left: 5px;margin-right: 39px;">2016-11-12</span>
								<input type="checkbox" name="" id="" value="" style="margin-top: 4px;" class="modelOrNot_M"/><label for="" style="margin-left: 5px;">是否已生成短信模板</label></p>
						</div>
					</div>
				</div>
			</div>
			<!--详细使用范围  使用门槛    end-->
				   </div>
					<div class="modal-footer">
						<a href="" class="btn btn-w btn-info create megsModel_M"  data-toggle="modal" data-target="#newAddMessage_M"  >生成/修改短信模板</a>
						<a href="" class="btn btn-w btn-info save_M" title="" >保存</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!------------------------------------------- 修改模态框（Modal）结束 ------------------------------------------------------>
		  <!--生成修改短息模板  模态框 -->
		<div class="modal fade" id="newAddMessage_M" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top: 26%;height: 87%;z-index: 1070;">
			<div class="modal-dialog modalNine">
				<div class="modal-content " style=" width: 959px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" >
							短信模板
						</h4>
					</div>
				  <div class="modal-body">
				  <div class="message-top-add" >
			          	<p style="margin-bottom: 10px;"><span id="">模板分类</span><input type="text" name="" id="" value="" placeholder="会员促销短信" style="width: 148px;height: 28px;"/></p>
			          		
			      </div>
			      <div class="message-bottom-add">
				       <p>短信内容</p>
			           <div class="message-content">
			           <textarea class='msg_cotent'  style='width: 100%;height: 100%;border: none; overflow-y:auto;'>
			          </textarea>
			          
			           </div>
				   </div></div>
				   <div class="modal-footer">
					
						<button type="button"  class="btn btn-w btn-info save_megsModel_M"data-dismiss="modal" >保存</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
				   </div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
			</div>	<!--生成修改短息模板  模态框END -->
		<!-- 发放情况（Modal） -->
		<div class="modal fade" id="dstributCouponsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog ">
				<div class="modal-content " style=" width: 959px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" >
							发放情况
						</h4>
					</div>
				  <div class="modal-body">
			          <div class="tp-info" >
			          	<p>
			          		<span>券分类</span>
			          		<select name="">
			          			<option value=""></option>
			          		</select>
			          		
			          		<span>券名称</span>
			          	    <select name="">
			          			<option value=""></option>
			          		</select>
				          	<span>面&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;值:</span>
			          	    <input type="text" name="" id="" value="" class="" />   
			          	    <span>状态</span>
			          	    <select name="">
			          			<option value=""></option>
			          		</select>
			          	</p>
			          		<p>			 
			          		<span>会员卡号</span>
			          	    <input type="text" name="" id="" value="" class="" /> 
				          	<span>持卡人</span>
			          	    <input type="text" name="" id="" value="" class="" /> 
			          	    <span>会员类型</span>
			          		<select name="">
			          			<option value=""></option>
			          		</select>
			          	    <span>短信状态</span>
			          	    <select name="">
			          			<option value=""></option>
			          		</select>
			          	</p>
			          	<p>			 
			          	    <span>发放状态</span>
			          	    <select name="">
			          			<option value=""></option>
			          		</select>
			          	</p>
			          </div>
			          <!-- 表格-->
			        <div class="modal-impt" >
								<div class="tablebox retailDetailTable" style="border-left: 1px solid #cfcfcf; border-right: 1px solid #cfcfcf;">
									<div class="grid-wrap" >
										<table id="jqGrid_disTributeStatus" class="zxsaastable"></table>
								       <div id="jqGridPagerdisTributeStatus"></div>
									</div>
								</div>
						
			        </div>
		        	<!--  表格    end-->
				   </div>
					<div class="modal-footer">
						<a href="" class="btn btn-w btn-info"   >重新发送</a>
						<a href="" class="btn btn-w btn-info"   >重发短信</a>
						<a href="" class="btn btn-w btn-info " title="" >导出</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">退出</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!------------------------------------------- 发放情况（Modal）结束 ------------------------------------------------------>
		
		
		<!-- 会员促销券发放（Modal） -->
		<div class="modal fade" id="CouponsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog ">
				<div class="modal-content " style=" width: 959px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" >
							会员促销券发放
						</h4>
					</div>
				  <div class="modal-body">
			          <div class="tp-info"  style="width:1047px" >
			          	<p>
			          		<span>券编号:</span>
			          		<input type="text" name="ticketNo" id="" value="" class="" disabled="true"/>
			          		<span>券名称:</span>
			          	    <input type="text" name="ticketName" id="" value="" class=""  disabled="true"/>
				          	<span>面&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;值:</span>
			          	    <input type="text" name="" id="" value="" class="" disabled="true"/>   
			          	</p>
			          	<p>
			          		<span>生效日期:</span>
			          		 <input type="text" name="openDate" id="" value="" class="" disabled="true" />
			          		 <span>截至日期</span>
			          		 <input type="text" name="closeDate" id="" value="" class=""  disabled="true"/>
			          		 <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
			          		 <input type="text" name="" id="" value="" class="" disabled="true"/>
			          	</p>
			          </div>
			          <!--树  表格-->
			        <div class="modal-impt" >
					<div class="content-middle" style="height: auto; overflow: hidden; margin-top: -10px;">
                           <!--leftTRee -->
						<div class="leftTRee"  style="height:426px">
								<ul id="left-tree1" class="ztree" style="width:300px ;overflow: auto;"></ul>
						</div>	
						   <!--rightTable -->
						<div class="rightTable" >
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" >
										<table id="jqGrid_disTributeCoupons" class="zxsaastable"></table>
								       <div id="jqGridPagerdisTributeCoupons"></div>
									</div>
								</div>
						</div>	
					</div>
					<div class="bottom-side" style="width: 94%;">
						<div class="sign-btm">
							<p> 
							<input type="checkbox" name="" id="showOrnot" value="" style="margin-top: 4px;"/><label for="showOrnot" style="margin-left: 5px; margin-right: 10px;">显示已发放会员</label>
						     <input type="checkbox" name="" id="" value="" style="margin-top: 4px;"/><label for="" style="margin-left: 5px;">短息推送</label></p>
						</div>
						<div class="show-close">
								<textarea class='asso_distri'  style='width: 100%;height: 100%;border: none; overflow-y:auto;'>
					</textarea>
						</div>
						
					</div>
				
			</div>
			<!--树  表格    end-->
				   </div>
					<div class="modal-footer">
						<a href="" class="btn btn-w btn-info create sure_send" data-dismiss="modal">确认发送</a>
						<a href="" class="btn btn-w btn-info create1" title=""  data-toggle="modal" data-target="#filterModal">过滤</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!------------------------------------------- 会员促销券发放（Modal）结束 ------------------------------------------------------>
		
		
			
		<!-- 过滤（Modal） -->
		<div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top: 26%;width: 35%;height: 87%;left: 40%;z-index: 1070;">
			<div class="modal-dialog ">
				<div class="modal-content " style=" width: 959px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" >
							过滤
						</h4>
					</div>
				  <div class="modal-body">
			          <div class="tp-info" >
			          	<p>
			          		<span>会员卡号</span>
			          		<input type="text" name="" id="" value="" class="" />
			          	</p>
			          	<p>
			          		<span>持卡人</span>
			          		 <input type="text" name="" id="" value="" class="" />
			          	</p>
			          	<p>
			          		<span>消费时间段</span>
			          		 <input type="text" name="" id="" value="" class="" /><span id="" >至 </span> <input type="text" name="" id="" value="" class="spc" />
			          	     <input type="checkbox" name="" id="custom" value="" style="margin-top: 8px;"/><label for="custom">该时段有消费</label>
			          	</p>
			          	<p>
			          		<span>曾购买商品</span>
			          		<select name="">
			          			<option value="">弹出商品页面1</option>
			          			<option value="">弹出商品页面2</option>
			          			<option value="">弹出商品页面3</option>
			          		</select>
			          	</p>
			          	<p>
			          		<span>曾购买品牌</span>
			          		<select name="">
			          			<option value="">多选1</option>
			          			<option value="">多选2</option>
			          			<option value="">多选3</option>
			          		</select>
			          	</p>
			          	<p>
			          		<span>消费金额</span>
			          		 <input type="text" name="" id="" value="" class="" /><span id="">至 </span> <input type="text" name="" id="" value="" class="spc" />
			          	</p>
			          </div>
				   </div>
					<div class="modal-footer">
						<a href="" class="btn btn-w btn-info" title="" >过滤</a>
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!------------------------------------------- 过滤（Modal）结束 ------------------------------------------------------>
		
	</body>
	
    <jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/assoCoupons.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
			
    <script type="text/javascript">
    $(function(){
     
       $("#openDate").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
		});
		$("#closeDate").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
		});
		$("#openDate_M").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
		});
		$("#closeDate_M").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
		});
        //initPage();
    	//initial();
         $(document).on("click",".create",function(){
         	$("body").find("div.modal-backdrop:eq(1)").css({
    		      zIndex:1060
    	    });
    	    
         });
          $(document).on("click",".create1",function(){
         	$("body").find("div.modal-backdrop:eq(1)").css({
    		      zIndex:1060
    	    });
    	    
         });
    	//$('#newModify').modal('show');
    });
	</script>
</html>