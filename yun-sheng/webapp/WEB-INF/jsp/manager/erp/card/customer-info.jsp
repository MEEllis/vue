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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/cardinfo.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<title>客户信息管理</title>
		<style type="text/css">
		    html{  padding:21px 15px;}
		    html,body,.content,.gridTools{width:100%;height:100%;}
			#sortChangeModal .tp-info span {
			   min-width:auto;
			}
			a{
			      text-decoration: none;
			}
			#modalSignAdd label,#modalSignUpdate label,#mergeAssociate label{
			  width:25%;
			 }
			 #addModify label{margin:0;margin-left: 3%;padding:0}
		     @media (min-width: 1200px){
		      #addModify label.col-lg-1{width:11.333333%}  
		     }
			 #addModify .form-group{height:auto;overflow:hidden;margin:0}
			 #addModify div.col-lg-2{padding:0}
			 .inputWrap input{
			   width:100%!important;
			 }
			  #addModify select,#addModify input{
			    width: 100%;
			    height: 34px; 
			    border:1px solid #cfcfcf;
			  }
			#mergeAssociate select{
			    width: 60%;
			    height: 28px;
			    border:1px solid #cfcfcf;
			 }
			 #addModify .row,#modalSignAdd .row,#modalSignUpdate .row{
			   margin-bottom:14px;
			 }
			#modalSignAdd input,#modalSignUpdate input{
			    height: 28px;
			    border:1px solid #cfcfcf;
			 }
			 .quick_search{
			     margin-bottom:14px;
			 }
			 .btn-group a{color:#333;}
		</style>
		<script type="text/javascript">
		var sectionId = ${SESSION_KEY_USER.sectionId};
		var basePath = "/manager";
		</script>
	</head>
	<body>
		<div class="content" style="margin:0">
		<!--会员卡信息主页开始   -->
		<!--btns -->
		<div class="gridTools">
		  <div class="gridTop" style="height:14.14%;min-height:128px;width:100%;margin-bottom:1%">  
		     <div class="">
					<div class="" style="padding: 0px;">
	 				<div id="AUTH" data-code="KHWH" class="btn-group btnHundred">
				    	<button type="button" class="btn btn-default navbar-btn add" data-toggle="modal" data-target="#addModify">新增</button>
				    	<button type="button" class="btn btn-default navbar-btn modify" data-toggle="modal" data-target="#addModify">修改</button> 
				        <button type="button" class="btn btn-default navbar-btn sortSign"  data-toggle="modal" data-target="#sortSign">类别标签</button>
				        <button type="button" class="btn btn-default navbar-btn customRecord" >消费记录</button>
				        <button type="button" class="btn btn-default navbar-btn merge" data-toggle="modal" data-target="#mergeAssociate">合并</button>
				        <button type="button" class="btn btn-default" onclick="window.parent.openWorkBoxByMenutext('客户信息导入','${basePath}/beginning/customer/toPage');">导入</button>
				        <button type="button" class="btn btn-default navbar-btn outinput" >
				           <a  href="${basePath}/member/customer/export">导出</a>
				        </button>
				        <a class="btn" onclick="window.location.reload();" style="line-height: 18px;">刷新</a>
					</div>
		        </div>
		    </div>
            	
		<div class="content1">
			<!--快速检索 -->
			<div class="quickselect">
				<span id="">快速检索：</span>
				<input type="text" name="" id="" value=""  class="qick-ipt" placeholder="输入客户姓名或手机号或卡号"/>
				<a class="find-out">查询</a>
			</div>
			<!--快速检索   end-->
		</div>  
              
		</div>
		<div class="content2" style="width:100%;height:83.58%;">
			<!--树结构 left-->
			<div class="left-tree" style="height:94%;overflow:auto;border:1px solid #e3e3e3;">
					<ul id="sort-tree" class="ztree" ></ul>
			</div>
			<!--树结构 end-->
			<!--表格 right -->
			<div class="right-table" style="height:94%">
				<div class="grid-wrap" style="width:100%;height:100%">
					<table id="jqGrid_custom" class="zxsaastable"></table>
				    <div id="jqGridCustom"></div>
				</div>
			</div>
			<!--表格   end-->
		</div>
			</div>
		<!--会员卡信息主页结束   -->
		
			<!--新增/修改  模态窗-->
		<div class="modal fade" id="addModify" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content" style="width:989px;min-width:989px;">
			     <div class="modal-header">
							<button type="button" class="close clearMkCardContext" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="addOrModify">新增</h4><!--修改 -->
				</div>
			      <div class="modal-body" id="">
			     
			          <div class="container tp-info" style="width:100%">
			           <form id="validateTopTest">
			           <fieldset class="field">
			             <div class="row">
			                 <input type="hidden" name="id"/>
						     <div class="form-group">
						             <label class="col-lg-1">客户姓名：</label>
						             <div class="col-lg-2"><input type="text" name="cardholder"  class=""  /></div>
						             
						             <label  class="col-lg-1">手机号1：</label>
						          	 <div class="col-lg-2"><input type="text" name="tel1"   class=""  /></div>
						          	 
						          	 <label class="col-lg-1">其他联系方式：</label>
						          	 <div class="col-lg-2"><input  type="text" name="tel2"  value="" class=""  /></div>
						     </div>
					     </div>
					     </fieldset>
					      <fieldset class="">
					      <div class="row">
					           <div class="form-group">
						            <label class="col-lg-1">类别标签：</label>
						          	<div class="col-lg-2"><select name="classLabelId" id="classLabelId" class="">
						          	</select></div>
						          	
						          	 <label class="col-lg-1">客户等级：</label>
						          	<div class="col-lg-2"><select name="grade" id="grade"  class="">
						          	    <option value="1">1</option>
						          	    <option value="2">2</option>
						          	    <option value="3">3</option>
						          	    <option value="4">4</option>
						          	    <option value="5">5</option>
						          	</select></div>
						          	
						          	  <label class="col-lg-1">往来单位：</label>
		                                 <div class="col-lg-2"><div class="inputWrap inputWrap_add" style="position: relative;display:inline-block;">
		                                 <input type="hidden" id="unitComeId" name="contactUnitid" value="">
		                                 <input type="text"  id="unitCome" name="unitName" readonly="" class="form-control" /><span style="position: absolute;right:6px;top:9px;vertical-align: middle;cursor:pointer;z-index:2;" class="inputAssPlus glyphicon glyphicon-plus unitCome"></span></div>
		                                </div>
						      </div>  
					      </div></fieldset>
					      
					     <fieldset class="field">
					     <div class="row">
						       <div class="form-group">
						          <label class="col-lg-1">发展类型：</label>
						          <div class="col-lg-2">
						             <select name="fzrType" id="fzrType">
									    <option value="" selected="selected">---请选择类型---</option>
										<option value="1">往来单位</option>
										<option value="2">员工</option>
										<option value="3">会员</option>
									</select></div>
									
									<label class="col-lg-1">发展人：</label>
						            <div class="col-lg-2"><div class="inputWrap" style="position: relative;display:inline-block;">
						            <input type="hidden" id="fzrId" name="fzrId" value="">
						            <input id="fzrName" name="fzrName" type="text" readonly="" class="form-control" style="width: 200px; display: inline-block; padding-right: 25px;"><span style="position: absolute;right:6px;top:9px;vertical-align: middle;cursor:pointer;z-index:2;" class="inputAssPlus glyphicon glyphicon-plus fzrName" data-toggle="modal"></span></div>
						            </div>
						            
						            <label  class="col-lg-1">发展日期：</label>
						          	<div class="col-lg-2"><input type="text" name="fzDate"  class="" id="devolopDate" /></div>
						      </div>  
					     </div>  
					     <div class="row">
						      <div class="form-group">
						            <label  class="col-lg-1">E-mail：</label>
						          	<div class="col-lg-2"><input type="text" name="emmail"  class=""  /></div>
						          	
						          	<label class="col-lg-1">QQ：</label>
						          	<div class="col-lg-2"><input type="text" name="qq"  class=""  /></div>
						          	
						          	  <label class="col-lg-1">微信：</label>
						          	<div class="col-lg-2"><input type="text" name="wechat"  class=""  /></div>
						      </div>     
					      </div>
					     <div class="row">
						      <div class="form-group">
						            <label class="col-lg-1">支付宝：</label>
						          	<div class="col-lg-2"><input type="text" name="alipay"  class=""  /></div>
						          	
						          	 <label class="col-lg-1">证件类型：</label>
						          	<div class="col-lg-2">
						          	 <select name="documenttype" id="documenttype">
						          	   <option>身份证</option>
						          	 </select></div>
						          	
						          	 <label class="col-lg-1">证件号：</label>
						          	<div class="col-lg-2"><input type="text" name="certificateno"  class=""  /></div>
						      </div>
					     </div>
					       <div class="row">
						      <div class="form-group">
						            <label class="col-lg-1">出生日期：</label>
						          	<div class="col-lg-2"><input type="text" name="birth"  class="" id="birthDate" /></div>
						          	
						          	 <label class="col-lg-1">通讯地址：</label>
						          	<div class="col-lg-2"><input type="text" name="address"  class=""  /></div>
						      </div> 
					     </div></fieldset>
			            </form>
			          </div>
			          </div>
			      
			      <div class="modal-footer">
			            <input type="hidden" value=""  class="wModal">
			      		<button type="button" class="btn saveClose saveAdd">保存</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				  </div>
					 
			    </div>
  			</div>
		</div> <!--modify end--><!--新增/修改 莫态框 end-->
		
		
	<!--类别标签1  -->
	<!--类别标签弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="sortSign" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog4">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="">
							类别标签
						</h4>
					</div>
					<div class="modal-body" id="model-body" style="height: 554px;min-height: 554px;">
						<div class="showTab" style="width:100%;height:100%;">
							<div class="current change" style="width:100%;height:100%;">
							    <div class="quick_search" style="width:100%;height:5%">
								    <a data-toggle="modal" data-target="#modalSignAdd" style="cursor:pointer">新增类别标签</a>
								</div>
								<div class="" style="width:100%;height:95%">
									<div class="tablebox retailDetailTable" style="width:100%;height:100%">
										<div class="grid-wrap" style="width:100%;height:100%">
											<table id="jqGrid_sortSign" class="zxsaastable">
											</table>
											
										</div>
									</div>
							    </div>
						   </div>
					    </div>
					
					</div>
					
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--类别标签新增弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalSignAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="">
							类别标签新增
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						    <div class="container tp-info" >
			          	   <div class="row">
						      <div class="col-xs-3 col-sm-4">
						            <label>编码：</label>
						          	<input type="text" name="code" class=""  />
						      </div>
						       <div class="clearfix visible-xs-block"></div>   
					     </div>
					      <div class="row">
					      <div class="col-xs-3 col-sm-4">
						            <label>标签名称：</label>
						          	<input type="text" name="name"  class=""  />
					      </div>  
					      </div>
					       <div class="row"> 
					      <div class="col-xs-3 col-sm-4">
					            <label>备注：</label>
					          	<input type="text" name="remark"  class=""  />
				           </div>
				           </div>
			          </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info saveSort">新增</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--类别标签修改弹出窗-->
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="modalSignUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog model-dialog3">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="">
							类别标签修改
						</h4>
					</div>
					<div class="modal-body" id="model-body">
						<div class="container tp-info" >
						<input type="hidden" name="id" id="S_id"/>
			          	   <div class="row">
						      <div class="col-xs-3 col-sm-4">
						            <label>编码：</label>
						          	<input id="S_code" type="text" name="code"   class=""  />
						      </div>
						       <div class="clearfix visible-xs-block"></div>   
					     </div>
					      <div class="row">
					      <div class="col-xs-3 col-sm-4">
						            <label>标签名称：</label>
						          	<input id="S_name" type="text" name="name"  value="" class=""  />
					      </div>  
					      </div>
					       <div class="row"> 
					      <div class="col-xs-3 col-sm-4">
					            <label>备注：</label>
					          	<input  id="S_remark" type="text" name="remark"  value="" class=""  />
				           </div>
				           </div>
			          </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn updateSort"  data-dismiss="modal">修改</button>
						<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
	<!--类别标签1结束  -->

		
	<!--合并  模态窗-->
		<div class="modal fade" id="mergeAssociate" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">信息合并</h4>
				  </div>
			      <div class="modal-body">
			          <div class="tp-info" >
			          	   <div class="row">
						      <div style="">
						            <label style="width:27%;">将所选客户信息合并至：</label>
						          <select style="width:27%;" class="mergeSelect">
						          	  
						          	</select>
						      </div>
						       <div class="clearfix visible-xs-block"></div>   
					     </div>
			          </div>
			          
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn btn-primary mergeSac">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--合并 莫态框 end-->
		
	<!--往来单位模态窗-->
		<div class="modal fade" id="wldw2" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="deple_wldw2">发展人</h4><!--往来单位 -->
				  </div>
			      <div class="modal-body" id="plzk_wldw2" style="height: 554px;min-height: 554px;">
			          <div class="bt-tble hd"  style="width:100%;height:100%;">
			            <div class="quick_search" style="margin-top: 14px;">
				            <label>快速检索：</label>
				            <input  type="text" class="search_wldw" style="width:200px;height:28px;border:1px solid #cfcfcf;font-size:0.5em" placeholder="请输入编码或名称"/>
				            <button id="wldwQuery2" style="border:1px solid #cfcfcf;">查询</button>
			            </div>
			          	<div class="tablebox retailDetailTable" style="width:100%;height:84%">
							<div class="grid-wrap" style="width:100%;height:100%">
								<table id="jqGrid_wldw2" class="zxsaastable"></table>
							    <div id="jqGridPagerWldw2" ></div>
							</div>
		            	</div>
			          </div>
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn saveWLDW2" data-dismiss="modal">保存</button>
						<button type="button" class="btn btn-default " data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--往来单位莫态框 end-->	
	
		
		
	<!--发展人 (往来单位)模态窗-->
		<div class="modal fade" id="wldw" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="deple_wldw">发展人</h4><!--往来单位 -->
				  </div>
			      <div class="modal-body" id="plzk_wldw" style="height: 554px;min-height: 554px;">
			          <div class="bt-tble hd"  style="width:100%;height:100%;">
			            <div class="quick_search">
				            <label>快速检索：</label>
				            <input  type="text" class="search_fzwldw" style="width:200px;height:28px;border:1px solid #cfcfcf;font-size:0.5em" placeholder="请输入编码或名称"/>
				            <button id="wldwQuery" style="border:1px solid #cfcfcf;">查询</button>
			            </div>
			          	<div class="tablebox retailDetailTable" style="width:100%;height:84%">
							<div class="grid-wrap" style="width:100%;height:100%">
								<table id="jqGrid_wldw" class="zxsaastable"></table>
							    <div id="jqGridPagerWldw" ></div>
							</div>
		            	</div>
			          </div>
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn saveWLDW" data-dismiss="modal">保存</button>
						<button type="button" class="btn btn-default " data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--发展人(往来单位)莫态框 end-->
			
				<!--发展人 (员工)模态窗-->
		<div class="modal fade" id="yg" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title " id="deple_yg">发展人</h4>
				  </div>
			      <div class="modal-body" id="plzk_yg" style="height: 554px;min-height: 554px;">
			          <div class="bt-tble hd"  style="width:100%;height:100%;">
			            <div class="quick_search">
			            <label>快速检索：</label>
			            <input  type="text" class="search_yg" style="width:200px;height:28px;border:1px solid #cfcfcf;font-size:0.5em" placeholder="请输入编码或名称"/>
			            <button id="ygQuery">查询</button>
			            </div>
			          	<div class="tablebox retailDetailTable" style="width:100%;height:84%">
								<div class="grid-wrap" style="width:100%;height:100%">
									<table id="jqGrid_yg" class="zxsaastable"></table>
								    <div id="jqGridPagerYg" ></div>
								</div>
		            	</div>
			          </div>
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn saveYG" data-dismiss="modal">保存</button>
						<button type="button" class="btn btn-default " data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--发展人(员工)莫态框 end-->
			<!--发展人 (会员)模态窗-->
		<div class="modal fade" id="hy" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title " id="deple_hy">发展人</h4>
				  </div>
			      <div class="modal-body" id="plzk_hy" style="height: 554px;min-height: 554px;">
			          <div class="bt-tble hd"  style="width:100%;height:100%;">
			            <div class="quick_search">
			            <label>快速检索：</label>
			            <input  type="text" class="search_hy" style="width:200px;height:28px;border:1px solid #cfcfcf;font-size:0.5em"  placeholder="请输入卡号、持卡人或手机号"/>
			            <button id="hyQuery">查询</button>
			            </div>
			          	<div class="tablebox retailDetailTable" style="width:100%;height:84%" >
								<div class="grid-wrap" style="width:100%;height:100%">
									<table id="jqGrid_hy" class="zxsaastable"></table>
								    <div id="jqGridPagerHy" ></div>
								</div>
		            	</div>
			          </div>
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn saveHY" data-dismiss="modal">保存</button>
						<button type="button" class="btn btn-default " data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--发展人(会员)莫态框 end-->

	</body>
	<jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/customer-info.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function(){
    	initial();
    	$('#czrq').datetimepicker({
    		lang:"ch",           // 语言选择中文
    		format:"Y-m-d",      // 格式化日期
    		timepicker:false,    // 关闭时间选项
    		todayButton:false    // 关闭选择今天按钮
    		});
		//发卡/修改
    	   $("#issuingDate").datetimepicker({//发卡日期
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
			$("#effectiveDate").datetimepicker({//生效日期
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
			
			$("#birthDate").datetimepicker({//出生日期
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
    });
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>

