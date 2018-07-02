<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
  <head>
    <title>类型更改记录</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
	<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrapValidator.min.css?v=${version}"/>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
	<!--<title>会员升级管理</title>-->
	<style type="text/css">
	   .ui-jqgrid .ui-jqgrid-htable .ui-th-div{
	       height:auto;
	   }
	   .tble,.content1>.tble>.tablebox{
		   height: auto;
	   }
         /*莫态框按钮自定义*/
        .btn-primary {
           background-color: #5a8dbf;
           border-radius: 3px;
        }
        
         .btn-default {
	       background-color: #ededed;
	       border-radius: 3px;
        }
        .content1>.toggle-top select {
		   margin-right: 0px; 
		   margin-left: 0px; 
         } 
         .a-bn {
           margin-left:90px;
         }
         /*表格错误提示*/
         .ui-widget-overlay{
           z-index:1054;
           opacity:0.5;
         }
         #info_dialog{
           z-index: 1055;
         }
         .first-p {
		    height: auto;
		    overflow: hidden;
		  }
         .col-lg-1,.col-lg-2 {
               padding-right: 0px; 
               padding-left: 0px; 
               margin-bottom:8px;
          }
         .pull-div1 select,
         .pull-div1 input[type=text]{
             width:148px;
             height:28px;
             border:1px solid #cfcfcf;
         }
         .pull-div1 label{
            width:80px;
            text-align:right;
         }
         .toggle-top .glyphicon-chevron-down{
		    top: 0;
		    left: 49.46%;
		 }
		 .toggle-top{
	        margin-right: 0px;
            margin-left: 0px;
            padding-left: 0px;
            padding-top: 0px;
		 }
		 .a-bn {
		    margin-left: 90px;
		    border: 1px solid #cfcfcf;
		    border-radius: 3px;
		    line-height: 28px;
		    background: #538ac1;
            color: #ffffff;
		}
		.col-lg-1{
		   width:auto;
		}
		#AUTH button{
		    border: 0;
   			background: transparent;
		}
		.top{
		  border: 1px solid #e3e3e3;
          border-radius: 2px;
		}
		/*切换菜单按钮样式*/
		.toggleOrder{
			display: inline-block;
		    height: 96%;
		    width: 35px;
		    min-width: 35px;
		    float: right;
		    border: 1px solid transparent;
		    background-color: #cfcfcf;
		    color: #fff;
		    font-size: 1.7rem;
		    text-align: center;
		    border-radius:2px;
        }
        .btn-grp>.toggleOrder:hover {
         border: 1px solid transparent;
        }
        a{color:#333;}
	</style>
  </head>
  <body>
		<div class="content">
		<!--会员升级管理页面开始   -->
		    <div class="top">
		<!--top -->
			<div id="AUTH" data-code="HYSJGL" class="btn-grp" role="group" >
				<button type="button" class="btn btn-default B_HYSJGL_0001 none" data-eventname="set"  data-toggle="modal" data-target="#upGradeModal">升级条件设置</button>
				<a class="btn B_HYSJGL_0002 none" onclick="setReload()">刷新</a>
				<a class="btn  icon-angle-down toggleOrder"  data-toggle="collapse" data-target="#query" aria-expanded="false" aria-controls="query"></a>
			    
			  <!--<a  class="bn"   data-eventname="set"  data-toggle="modal" data-target="#upGradeModal" class="set">升级条件设置</a>
			   <a class="bn" onclick="setReload()">刷新 </a>
			--></div>
			 <form id="togglingFormSJTJ" class="">
			<div class="row toggle-top collapse" id="query" style="background-color:#f5f5f5;padding-top: 20px;">
				<div class="form-group pull-div1 pd" >
				<div class="row first-p">
				    <label class="col-lg-1">发卡公司:</label>
				    <div class="col-lg-1"><input type="text" class="fkgs" disabled="disabled" /></div>
				    <label class="col-lg-1">发卡部门:</label>
				    <div class="col-lg-1"><select name="sectionId" class="fkbm" id="sectionId"></select></div>
				    <label class="col-lg-1">会员类型:</label>
				    <div class="col-lg-1"><select name="cardTypeId" class="cardType" id="cardTypeId"></select></div>
				    <label class="col-lg-1">会员卡号:</label>
				    <div class="col-lg-1"><input type="text" name="cardNum" id="cardNum"/></div></div>
				<div class="row">
					<label class="col-lg-1">开始日期:</label>
					<div class="col-lg-1"><input type="text" name="beginTime" id="createDateBegin"/></div>
				    <label class="col-lg-1">结束日期:</label>
				    <div class="col-lg-1"><input type="text" name="endTime" id="createDateEnd"/></div>
				    <label class="col-lg-1">持卡人:</label>
				    <div class="col-lg-1"><input type="text" name="cardMan" id="cardMan" maxlength="16"/></div>
				    <label class="col-lg-1">手机号:</label>
				    <div class="col-lg-1"><input type="text" name="phone" id="phone" maxlength="11"/></div>
				    <!--<a class="bn a-bn queryBtn">查询</a>--></div>
				    <div class="row" style="text-align:center;">
				    <a class="bn a-bn queryBtn">查询</a></div>
				<!--<div id=""  style="width:100%;height:auto;overflow:hidden;position:absolute;text-align: center;">
					<span class="glyphicon glyphicon-chevron-up" style="width:34px;height:20px;background-color:#cfcfcf;text-align:center;z-index:1000"></span>
				</div>
				--></div>
				<!--<div class="pull-div2 pd hidden" style="width:100%;height:auto;overflow:hidden;position:absolute;"> 
					<span class="glyphicon glyphicon-chevron-down" style="width:34px;height:20px;background-color:#cfcfcf;text-align:center;z-index:1000"></span>
				</div>  
			--></div></form>
			
			</div>
			<!--top end-->
		    <div class="content1">
		   
			<!--快速检索 -->
			<!--<div class="quickSearch">
				<p><span id="">快速检索:</span><input type="text" name="" id="" value="" /></p>
			</div>
			--><!--快速检索   end-->
			<!--表格+tree -->
			<div class="tble">
			<!--<div class="tranLeft" style="overflow: auto;">
					<div class="left-tree">
						<input type="hidden"/>
						<ul id="assosiator-tree" class="ztree"></ul>
					</div>							
			</div>
			--><div class="tablebox retailDetailTable">
				<div class="grid-wrap scoreTab" >
					<table id="jqGrid_score" class="zxsaastable"></table>
				    <div id="jqGridPagerscore" style="height:48px"></div>
				</div>
			</div></div>
			<!--表格 +tree  end-->
			</div>
			
			
			</div>
		<!--会员升级管理页面结束   -->
		
		<!--升级条件设置 模态窗-->
		<div class="modal fade" id="upGradeModal" tabindex="-1" role="dialog" >	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content" style="width:1095px;height:486px;">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title add" id="">升级条件设置</h4>
				  </div>
			      <div class="modal-body" style=" height: 359px;">
			          <div class="tp-info" style="height:43px;"><!--
			          	<p>
			          		<span>升级方式：</span>
			          		<select name="" style="width: 148px; height: 28px; border: 1px solid #CFCFCF;">
			          			<option value="">积分</option>
			          			<option value="">积分1</option>
			          			<option value="">积分2</option>
			          		</select>
			          	</p>
			          --></div>
			           <div class="bt-tble" style="height:300px">
			          	<div class="tablebox retailDetailTable">
								<div class="grid-wrap" style="width:1046px">
									<table id="jqGrid_upGrade" class="zxsaastable"></table>
								    <div id="jqGridPagerupGrade"></div>
								</div>
		            	</div>
			          </div>
			         	
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn btn-primary upGradeSave">保存</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--升级条件设置结束-->
	</body>
    <jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/upgrademanager.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function(){
       $("#query").collapse('show');
       initial();
    });
    function setReload(){
    	window.location.reload();
	}
   // $("#info_dialog").append()
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>
