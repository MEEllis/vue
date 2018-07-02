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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/score.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<title>积分调整</title>
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
            .btn-grp>a:hover{
			  border:0;
			}
			.toggle-top select {
			  margin-right: 0px; 
			  margin-left: 0px;
			}
			.form-group{
			  height: auto;
              overflow: hidden;
			}
			.col-lg-1,.col-lg-2 {
               width: auto;
               padding-right: 0px; 
               padding-left: 0px; 
             }
             #AUTH button{
             	border: 0;
    			background: transparent;
             }
            
		</style>
	</head>
	<body>
		<div class="content">
		<!--会员调整主页面开始   -->
		   <div class="top">
		<!--top -->
			<div id="AUTH" data-code="JFTZ" class="btn-grp" role="group" >
				<button type="button" class="jftz btn change lxbg" data-eventname="add" data-toggle="modal">积分调整</button>
				<button type="button" class="changeHis btn" data-eventname="update" onclick="window.parent.openWorkBoxByMenutext('积分调整历史','/manager/member/scoreUpdate/toAdjustPage');">积分调整历史</button>
				<button type="button" class=" btn" onclick="setReload()">保存</button>
			    <a class="btn  icon-angle-down toggleOrder"  data-toggle="collapse" data-target="#query" aria-expanded="false" aria-controls="query"></a>
			    <!--<a class="bn jftz"  data-eventname="add" data-toggle="modal" data-target="#scoreChangeModal" class="change lxbg">积分调整</a>
			    <a  class="bn"   data-eventname="update"  class="changeHis" href="/manager/member/scoreUpdate/toAdjustPage">积分调整历史</a>
			    <a class="bn" onclick="setReload()">刷新 </a>
			    -->
            </div>
			<div class="toggle-top collapse" id="query">
				<div class="pull-div1 pd" >
				<p class="first-p">
				    <span>发卡公司:</span><input class="fkgs" disabled="disabled" />
				    <span>发卡部门:</span><select name="sectionId" class="fkbm" id="sectionId"></select>
				    <span>会员类型:</span><select name="cardTypeId" class="cardType" id="cardTypeId"></select>
				    <span>会员卡号:</span><input type="text" name="cardNum" id="cardNum"/></p>
				<p>
					<span>开始日期:</span><input type="text" name="beginTime" id="createDateBegin" />
				    <span>结束日期:</span><input type="text" name="endTime" id="createDateEnd"  />
				    <span>持卡人:</span><input type="text" name="cardMan" id="cardMan"   />
				    <span>手机号:</span><input type="text" name="phone" id="phone"   />
				   </p>
				<p style="text-align:center;margin-bottom:14px;"> <a class="bn a-bn queryBtn">查询</a></p>    
				    <!--
				<div id="" style="width: 100%;height: 10px;position: relative; margin-left: -20px;">
					<span class="glyphicon glyphicon-chevron-up "></span>
				</div>
				    
				--></div>
				<!--<div class="pull-div2 pd hidden" style="height: 10px; margin-left: -20px; margin-top: -10px;"> 
					<span class="	glyphicon glyphicon-chevron-down"></span>
				</div> 
			--></div>
			<!--top end--></div>
		    <div class="content1">
			
			<!--快速检索 -->
			<!--快速检索   end-->
			<!--表格 -->
			
			<div class="tablebox retailDetailTable" style="overflow-y:auto; overflow-x: hidden;">
				<div class="grid-wrap" >
					<table id="jqGrid_score" class="zxsaastable" ></table>
				    <div id="jqGridPagerscore" ></div>
				</div>
			</div>
			<!--表格   end-->
			</div>
			
			
			</div>
		<!--会员调整主页面开始   -->
		    <!--积分调整 模态窗-->
        <div class="modal fade" id="scoreChangeModal" tabindex="-1" role="dialog">
            <div class="modal-dialog  model-dialog1">
                <div class="modal-content">
                    <div class="modal-header" >
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title add" id="">积分调整</h4>
                    </div>
                    <div class="modal-body" style="height:520px;">
                        <form id="topAjustice" class="">
                            <div class="tp-info" style="height:auto;">
                                <div class="form-group">
                                    <label class="col-lg-1" style="margin-left:0;">调整积分：</label>
                                    <div class="col-lg-2" style="margin-right:24px"><input type="text" name="adjustScore" id="adjustScore" value="" class="w-148" style="height:28px;border:1px solid #e3e3e3"/></div>
                                    <label class="col-lg-1">调整原因：</label>
                                    <div class="col-lg-2"><input type="text" name="adjustCause" id="adjustCause" value="" class="w-148" style="height:28px;border:1px solid #e3e3e3"/></div>
                                </div>
                            </div>
                        </form>
                        <div class="botm" style="width: 100%; height: 100%;">
                            <p style="font-weight:bold">已选中会员</p>
                            <div class="bt-tble" style="width:100%;height:100%">
			          	    <div class="tablebox retailDetailTable">
                                    <div class="grid-wrap" style="width: 566px; min-width:566px;height:454px;min-height:454px;">
                                        <table id="jqGrid_changeScore" class="zxsaastable"></table>
                                        <div id="jqGridPagerchangeScore"></div>
                                    </div>
                             </div></div>
                         </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary jftzSave" data-dismiss="modal">确定</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

                    </div>

                </div>
            </div>
        </div> <!--积分调整模态框结束-->
	
	</body>
    <jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/score.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
    <script type="text/javascript">
    $(function(){
       $("#query").collapse('show');
       initial();
    });
    

	function setReload(){
    	window.location.reload();
	}

	</script>
</html>

