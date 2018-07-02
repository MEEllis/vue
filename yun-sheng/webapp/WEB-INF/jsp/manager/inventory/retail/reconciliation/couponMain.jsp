<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../../inventoryInclude/head.jsp"/>
	<script src="${basePath}/js/inventory/retail/reconciliation/couponMain.js?v=${version}"></script>
    <title>第三方抵扣对账</title>
    </head>
<body style="background:#e4e4e4;">
<div class="none" id="MENU_CODE">DSFDKDZ</div>
	<div id="ysHeader" >
		<div id="AUTH" data-code="DSFDKDZ" class="btn-group btnHundred" role="group" style="display:none;">
			<button type="button" class="btn btn-default add">新增</button>
			<button type="button" class="btn btn-default search">查询</button>
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
			    <label for="storeInput" class='width-25'>营业员:</label>
			    <div class="input-group col-sm-8">
			      <input type="text" class="form-control" id="managerIds" placeholder="请选择营业员">
			    </div>	
		    </div>
		    
		    	<div class="form-group col-sm-3">
			    <label for="storeInput" class='width-25'>往来单位:</label>
			    <div class="input-group col-sm-8">
			      <input type="text" class="form-control" id="contactUnitInput" placeholder="请选择往来单位">
			    </div>	
		    </div>
		    
		    	<div class="form-group col-sm-3">
			    <label for="storeInput" class='width-25'>活动名称:</label>
			    <div class="input-group col-sm-8">
			      <select type="text" class="form-control" id="couponId" ></select>
			    </div>	
		    </div>
		    
		     <div class="form-group col-sm-8">
			    <label for="retailCardNum" class="width-25" style="width:9%;">核对:</label>
			    <div class="input-group col-sm-2">
			      <select type="text" class="form-control" name="isCheck" id="isCheck" >
			      		<option value="">所有</option>
			      		<option value="0" selected="selected">未核</option>
			      		<option value="1">已核</option>
			      	
			      </select>
			    </div>	
			    <span>处理:</span>
			    <div class="input-group col-sm-2">
			      <select type="text" class="form-control" name="isDeal" id="isDeal" disabled>
			      		<option value="">所有</option>
			      		<option value="0">未处理</option>
			      		<option value="1">已处理</option>
			      	
			      </select>
			    </div>	
			   
		    </div>
		    <div class="cb"></div>
		    
	    	<div class='row tc'>
				<button type="button" class="btn btn-primary B_DSFDKDZ_0001 none" id="search">查询</button>
				<button type="button" class="btn btn-primary reset">重置</button>
			</div>
		    
		</form>	    
	</div>
	
	<div id="ysContainer">
		<div class='row' style="margin:15px 0;">
			<button type="button" class="btn btn-primary checkSum fl  B_DSFDKDZ_0002 none">查看汇总</button>
			<button type="button" class="btn btn-primary ml15 B_DSFDKDZ_0005 none" id="export">导出</button>
			<button type="button" class="btn btn-primary ml15  B_DSFDKDZ_0003 none" id="revise">批量修改</button>
			<span class="reviseBox" style="display:none;">
				<span>计算金额 = </span>
				<span>
					<select class="jsColumn" style="text-align: center;width: 100px;height: 30px;">
						<option value='1'>实际结算金额</option>
					</select>
				</span>
				<span>
					<select class="jsType" style="text-align: center;width: 35px;height: 30px;">
						<option value='1'>+</option>
						<option value='2'>-</option>
						<option value='3'>*</option>
						<option value='4'>/</option>
					</select>
				</span>
				<span>
					<input class="jsNum" style="text-align: center;width: 100px;height: 30px;"  onkeyup="getnum(this)"/>
				</span>
				<span><button type="button" class="btn btn-primary ml15" id="sureCount">确认</button></span>
			</span>
			<button type="button" class="btn btn-primary fr B_DSFDKDZ_0004 none" id="dealDif">往来处理</button>
			 <div class="cb"></div>
		</div>
		
		<div>
			<table id="couponGrid"></table>
			<div id="couponGridPager"></div>
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
						<input type="checkbox" name='sectionName' class="sumColumnsCheck"  checked>
						<span>门店</span>
						<input type="checkbox" name='contactUnitName' class="sumColumnsCheck"  checked>
						<span>往来单位</span>
						<input type="checkbox" name='couponName' class="sumColumnsCheck"  checked>
						<span>活动名称</span>
						
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