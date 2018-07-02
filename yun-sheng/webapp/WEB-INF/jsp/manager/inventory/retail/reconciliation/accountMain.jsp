<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../../inventoryInclude/head.jsp"/>
	<script src="${basePath}/js/inventory/retail/reconciliation/accountMain.js?v=${version}"></script>
    <title>资金账户对账</title>
    </head>
<body style="background:#e4e4e4;">
<div class="none" id="MENU_CODE">ZJZHDZ</div>
	<div id="ysHeader" >
		<div id="AUTH" data-code="ZJZHDZ" class="btn-group btnHundred" role="group" style="display:none;">
			<button type="button" class="btn btn-default add">新增</button>
			<button type="button" class="btn btn-default search ">查询</button>
		   	<button type="button" class="btn btn-default save">确定</button>	
		</div>
	
		<form action="" class="form-inline" id="searchQuery">
		
			 <div class="form-group col-sm-3">
			    <label for="retailCardNum" class="width-25">单据日期:</label>
			    <div class="input-group col-sm-4">
			      <input type="text" class="form-control" name="billsBeginDateStr" id="startDate" >
			    </div>	
			    --
			    <div class="input-group col-sm-4">
			      <input type="text" class="form-control" name="billsEndDateStr" id="endDate" >
			    </div>	
		    </div>
			    
           	<div class="form-group col-sm-3">
			    <label for="storeInput" class='width-25'>门店:</label>
			    <div class="input-group col-sm-8">
			      <input type="text" class="form-control" id="storeInput" placeholder="请选择门店">
			    </div>	
		    </div>
		    
		     <div class="form-group col-sm-3">
			    <label  class="width-25">金额:</label>
			    <div class="input-group col-sm-4">
			      <input type="text" class="form-control" name="minAmount" id="minAmount" onkeyup="checkInput.checkPositiveNativeNum(this)">
			    </div>	
			    --
			    <div class="input-group col-sm-4">
			      <input type="text" class="form-control" name="maxAmount" id="maxAmount" onkeyup="checkInput.checkPositiveNativeNum(this)">
			    </div>	
		    </div>
		    
		    <div class="form-group col-sm-3">
			    <label  class='width-25'>资金账户:</label>
			    <div class="input-group col-sm-8">
			      <input type="text" class="form-control" id="accountIds" >
			    </div>	
		    </div>
		    
		    <div class="form-group col-sm-3">
			    <label for="storeInput" class='width-25'>制单人:</label>
			    <div class="input-group col-sm-8">
			      <input type="text" class="form-control" id="createByIds" placeholder="请选择操作员">
			    </div>	
		    </div>
		    
		     <div class="form-group col-sm-8">
			    <label for="retailCardNum" class="width-25" style="width:9%;">核对:</label>
			    <div class="input-group col-sm-2">
			      <select type="text" class="form-control" name="isCheck" id="isCheck" >
			      		<option value="0">未核</option>
			      		<option value="1">已核</option>
			      		<option value="">所有</option>
			      </select>
			    </div>	
			    <span>差额:</span>
			    <div class="input-group col-sm-2">
			      <select type="text" class="form-control" name="isBalance" id="isBalance" disabled>
			      		<option value="">所有</option>
			      		<option value="1">有差额</option>
			      		<option value="0">无差额</option>
			      </select>
			    </div>	
			    <span>处理:</span>
			     <div class="input-group col-sm-2">
			      <select type="" class="form-control" name="isDeal" id="isDeal" disabled>
			      		<option value="">所有</option>
			      		<option value="1">已处理</option>
			      		<option value="0">未处理</option>
			      </select>
			    </div>	
		    </div>
		    <div class="cb"></div>
		    
	    	<div class='row tc'>
				<button type="button" class="btn btn-primary  B_ZJZHDZ_0001 none" id="search">查询</button>
				<button type="button" class="btn btn-primary reset">重置</button>
			</div>
		    
		</form>	    
	</div>
	
	<div id="ysContainer">
		<div class='row' style="margin:15px 0;">
			<button type="button" class="btn btn-primary checkSum fl  B_ZJZHDZ_0002 none">查看汇总</button>
			<button type="button" class="btn btn-primary ml15 B_ZJZHDZ_0005 none" id="export">导出</button>
			<button type="button" class="btn btn-primary fr B_ZJZHDZ_0004 none" id="dealDif">差异处理</button>
			 <div class="cb"></div>
		</div>
		
		<div>
			<div class="none">
				<input type="hidden" id="dataGridDiffTypeName" data-desc="类别模态框" readonly="">
			</div>
			<table id=accountGrid></table>
			<div id="accountGridPager"></div>
		</div>
	</div>
	
	<div class="modal fade" id="sumModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true" style="display: none;">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header" style="cursor: default;">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						×
					</button>
					<h3 class="modal-title" id="myModalLabel" style="font-size:24px;">
						查看汇总
					</h3>
				</div>
				<div class="modal-body" style="padding:15px;">
					<div class="row" style="margin:0;">
						<span>汇总字段:</span>
						<input type="checkbox" name='billsDateStr' class="sumColumnsCheck" checked>
						<span>单据日期</span>
						<input type="checkbox" name='billsType' class="sumColumnsCheck"  checked>
						<span>单据类型</span>
						<input type="checkbox" name='sectionName' class="sumColumnsCheck"  checked>
						<span>门店</span>
						<input type="checkbox" name='accountName' class="sumColumnsCheck"  checked>
						<span>资金账户</span>
						
						<div class="fr">处理日期:<span class="dealTime"></span></div>
					</div>
					<div style="margin:15px 0;">
						<button type="button" class="btn btn-primary" id="exportSum">导出</button>
					</div>
					<div style="overflow:auto;">
						<table id=sumGrid></table>
						<div id="sumGridPager"></div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>

<jsp:include  page="../../../inventoryInclude/foot.jsp"/>