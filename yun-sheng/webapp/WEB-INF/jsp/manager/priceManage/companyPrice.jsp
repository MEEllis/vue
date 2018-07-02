<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>往来单位售价</title>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/priceManage/companyPrice.css?v=${version}"/>
		<script type="text/javascript">
			//全局变量
			var gl_groupId = ${groupId};//集团ID
			var basePath = "${basePath}";
		</script>
		<style>
			.ztree li span.button{
				width:0;
				height:0;
			}
			.ui-th-ltr{
					text-align: center;
				}
			.changeFont{
				font-weight:bold;
				margin-top:5px;
			}
		</style>
	</head>
	<body>
<div class="well">
  <div id="AUTH" data-code="WLDWSJSZ" class="btn-group btnHundred" role="group" >
         <button type="button" class="btn" id="export">导出</button> 
        <button type="button" class="btn" id="quit">退出</button>
        <button type="button" class="btn" id="saveData">保存</button>
  </div> 
  <!-- 修改开始 -->
       
            
              
              
             
             
          <div class="row" style="margin-left:20px;margin-top:20px;">
          <!-- 
         <div class="Zpercent">
		          <span class="box_text2">公司：</span>
		          <span class="box_input input-group">
		          <select class="form-control form-control2 companySe">
		              <c:forEach items="${companyList }" var="companyName" varStatus="sts">
                      <option data-id="${companyName.id}">${companyName.name}</option>
                   	 </c:forEach>
		            </select>
		          </span>
     	 </div> 
     	  -->
     	 		<form class="form-inline">
     	 				<div class="form-group">
				    <label class="control-label" >公司</label>
				    <input class="form-control filterInput companyId" value="${companyName }" id="${companyId }" disabled="disabled"/>
				    </div>
     	 		</form>
          </div>
          
        <!-- 修改截至 -->
      <div class="row" style="margin-left:20px;margin-top:20px;">
      
     <!--  
    					<div class="Zpercent">
							          <span class="box_text2">将</span>
							        <span class="box_input input-group">
							                  <select class="form-control">
							                    <option>预设售价</option>
							                   
							                  </select>
							              
							            </span>
							          <span class="box_text2">修改为</span>
							         
							               <span class="box_input input-group">
							                  <select class="form-control priceVal">
							                    <option>售价一</option>
							                    <option>售价二</option>
							                    <option>售价三</option>
							                    <option>售价四</option>
							                    <option>售价五</option>
							                    <option>零售价</option>
							                  </select>
							               </span>
							            <span class="box_text2">
							            <button type="button" class="btn btn-primary sureBtn">确定</button>
							            </span>
							</div>
    -->
    		<form class="form-inline">
    			<div class="form-group">
				    <label class="control-label" >将</label>
				    <select class="form-control">
							                    <option>预设售价</option>
							                   
					 </select>
				  </div>
				  <div class="form-group">
				    <label class="control-label" >修改为</label>
				     <select class="form-control priceVal">
							                    <option>售价一</option>
							                    <option>售价二</option>
							                    <option>售价三</option>
							                    <option>售价四</option>
							                    <option>售价五</option>
							                    <option>零售价</option>
							                  </select>
				  </div>
				  <div class="btn-group-vertical">
				  	<button type="button" class="btn btn-primary sureBtn">确定</button>
				  </div>
    		</form>
    </div>
      
      		
</div>
      <!--底部的树及表格-->




       <div class="contentWrap">
          <div class="contentL">
          <p>单位类别</p>
          <ul id="companyType" class="ztree"></ul>
          </div>
          <div class="contentR"> 
          <!--  
		                 <div class="Zpercent">
		                  <span class="box_text2">过滤：</span>
		                  <span class="box_input input-group">
		                    <input type="text" class="form-control filterInput"/>
		                  </span>
		               	 </div>
		          -->     	 
		               	 <!-- 开始 -->
		               	 <from class="form-inline">
		               	 	<div class="form-group" style="margin-bottom:15px;">
		               	 		<label class="control-label" >过滤：</label>
								   
						         <input type="text" class="form-control searchInput"/>
											                   
									
		               	 	</div>
		               	 </from>
		               	 
		               	 
		               	 <!-- 结束 -->
              <div class="gridWrap">
                <table id="mainGrid" class="zxsaastable"></table>
                <div id="mainPager"></div>
              </div>
          </div>
      </div>

 
		<form id="submitForm" action="" method="post">
			<input type="hidden" id="valList" name="valList" value="">
		</form>
		<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
		<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}"></script>
	    <script src="${basePath}/js/priceManage/companyPrice.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	    <!-- 菜单权限验证 -->
		<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	</body>
</html>