<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/erp/funds/invalid.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="${basePath}/js/erp/funds/tree.js?v=${version}"></script>
<script src="${basePath}/js/inventory/fund/fundCommonInterface.js?v=${version}"></script>
<script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" ></script>
<script src="${basePath}/js/inventory/fund/inPaymentPage.js?v=${version}"></script>
<title>内部收款单列表</title>
        </head>
<body class='e-body-bg'>
<div>

	<input type="hidden" value="28" name='billsType' id="billsType"/> 
	 		   		 <!-- 打印类型 -->
	<input type="hidden" value="28"  name="printType" id="printType"/> 
    <!-- 菜单栏按钮组 -->
    <div class="btn-toolbar" id="AUTH" role="toolbar" data-code='YYJK'></div>
	<div class="well clearfix">
	    <form action="" class="form-inline" id="searchQuery">
			<!--单据类型-->
			
			
			
	        <div class="form-group col-sm-3">
	            <label for="retailCardNum" class="width-25">日期:</label>
	            <div class="input-group col-sm-4">
	                <input type="text" class="form-control" name="billsBeginDateStr" id="startDate" >
	            </div>
	            --
	            <div class="input-group col-sm-4">
	                <input type="text" class="form-control" name="billsEndDateStr" id="endDate" >
	            </div>
	        </div>
	
	        <div class="col-md-3 form-group ">
	            <label for="retailCardNum" class="width-25">部门:</label>
	            <div class="input-group col-sm-8">
	                <input type="text" class="form-control" name="sectionName" id="sectionName" >
	            </div>
	        </div>
	
	        <div class="col-md-3 form-group">
	            <label for="retailCardNum" class="width-25">往来类型:</label>
	
	            <div class="input-group col-sm-8">
	                <select id="inpayClassId" name="inpayClassId" class="form-control">
	                </select>
	            </div>
	        </div>
	
	        <div class="col-md-3 form-group ">
	            <label for="retailCardNum" class="width-25">往来部门:</label>
	            <div class="input-group col-sm-8">
	                <input type="text" class="form-control" name="contactUnitName" id="contactUnitName" >
	            </div>
	        </div>
	
	        <div class="col-md-3 form-group">
	            <label for="retailCardNum" class="width-25">往来职员:</label>
	
	            <div class="input-group col-sm-8">
	                <input type="text" class="form-control" name="managerUname" id="managerUname" placeholder=""
	                       readonly="readonly">
	            </div>
	        </div>
	
	        <div class="col-md-3 form-group">
	            <label for="retailCardNum" class="width-25">备注:</label>
	            <div class="input-group col-sm-8">
	                <input type="text" name="remark" class="form-control remark" value="">
	            </div>
	        </div>
	        <div class="form-group col-sm-2">
	            <input type="checkbox" name='isContainsRedbills' class="isRed">包含已红冲单据
	        </div>
	        <div class="form-group col-sm-2" style="display:none;">
	            <input type="checkbox" name='isDisabled' class="isRed">显示禁用信息
	        </div>
	
	
			<div class="form-group col-sm-2">
	        		<button type="button" class="btn search"  onclick="searchPayment();">查询</button>
	        		<button type="button" class="btn reset" onclick="resetForm();">重置</button>
	        </div>
	     
	
	    </form>
	
	</div>
<div id="ysContainer">
    <div>
        <table id="accountGrid"></table>
        <div id="accountGridPager"></div>
    </div>
</div>

<!-- --------------------------------------------       Modal开始                   -------------------------------------- -->
<!-- 红冲Modal -->
<div class="modal fade" id="redModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">红冲</h4>
      </div>
      <div class="modal-body">
     	<div class="col-sm-3">
            	时间：
      	</div>
       	<div class="input-group col-sm-8">
               <input type="text" class="form-control redTime" >
      	</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary redSave">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="sumModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true"
     style="display: none;">
    <div class="modal-dialog modal-lg" style="width:1400px;height:800px;">
        <div class="modal-content " >
            <div class="modal-header" style="cursor: default;">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×
                </button>
                <h3 class="modal-title" id="billModalLabel" style="font-size:24px;">
                </h3>
            </div>
            <div class="modal-body" style="padding:15px;height:650px;">
              	<iframe id="billIframe"  frameborder="0" height="100%" src="" style="width:100%;"></iframe> 
            </div>
        </div>
    </div>
</div>

<jsp:include page="../../inventoryInclude/foot.jsp"/>