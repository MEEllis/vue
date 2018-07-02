<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/erp/cw/generate-voucher.css?v=${version}" />
		<script type="text/javascript">
		
			//**********全局变量
			//基本目录
			var basePath = "${basePath}";
	
		</script>
		<title>增值服务记录</title>
	</head>
	<body>
		<div class="mainbody" >
			<div id="AUTH" data-code="ZZFWJL" class="btn-group btnHundred" role="group" >
				<!-- 
			 	<button type="button" class="btn saveData" data-eventname="printbtn">打印</button>
			  	<button type="button" class="btn" data-eventname="printbtn">导出</button>
				 -->
			</div>
			
			
			
			<div class="queryContainer">
				<form action="" class="form-inline">
					<div class="form-group">
					    <label for="test" >门店:</label>
						<input type="text" id="test" class="form-control store"  placeholder="请输入编码或名称!">
					 </div>
					  <div class="form-group">
					    <label for="inputEmail3">Email</label>
					    <div class="input-group col-sm-10">
					      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
					      <span class="input-group-btn showBox">
					      	<button class="btn btn-default" type="button">
					      		<span class="glyphicon glyphicon-option-horizontal"></span>
					      	</button>
					      </span>
					    </div>
					    <!--<div class="col-sm-10">
					    
					      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
					    </div>
					  --></div>
					   <div class="form-group">
					    <label for="inputEmail3">Email</label>
					    <div class="input-group col-sm-10">
					      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
					      <span class="input-group-btn showBox">
					      	<button class="btn btn-default" type="button">
					      		<span class="glyphicon glyphicon-option-horizontal"></span>
					      	</button>
					      </span>
					    </div>
					    <!--<div class="col-sm-10">
					    
					      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
					    </div>
					  --></div>
					   <div class="form-group">
					    <label for="inputEmail3">Email</label>
					    <div class="input-group col-sm-10">
					      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
					      <span class="input-group-btn showBox">
					      	<button class="btn btn-default" type="button">
					      		<span class="glyphicon glyphicon-option-horizontal"></span>
					      	</button>
					      </span>
					    </div>
					    <!--<div class="col-sm-10">
					    
					      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
					    </div>
					  --></div>
					   <div class="form-group">
					    <label for="inputEmail3">Email</label>
					    <div class="input-group col-sm-10">
					      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
					      <span class="input-group-btn showBox">
					      	<button class="btn btn-default" type="button">
					      		<span class="glyphicon glyphicon-option-horizontal"></span>
					      	</button>
					      </span>
					    </div>
					    <!--<div class="col-sm-10">
					    
					      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
					    </div>
					  --></div>
					   <div class="form-group">
					    <label for="inputEmail3">Email:</label>
					    <div class="input-group col-sm-10">
					      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
					      <span class="input-group-btn showBox">
					      	<button class="btn btn-default" type="button">
					      		<span class="glyphicon glyphicon-option-horizontal"></span>
					      	</button>
					      </span>
					    </div>
					    <!--<div class="col-sm-10">
					    
					      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
					    </div>
					  --></div>
					   <div class="form-group">
					    <label for="inputEmail3">Email</label>
					    <div class="input-group col-sm-10">
					      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
					      <span class="input-group-btn showBox">
					      	<button class="btn btn-default" type="button">
					      		<span class="glyphicon glyphicon-option-horizontal"></span>
					      	</button>
					      </span>
					    </div>
					    <!--<div class="col-sm-10">
					    
					      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
					    </div>
					  --></div>
					   <div class="form-group">
					    <label for="inputEmail3">asdsadasdsadas </label>
					    <div class="input-group col-sm-10">
					      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
					      <span class="input-group-btn showBox">
					      	<button class="btn btn-default" type="button">
					      		<span class="glyphicon glyphicon-option-horizontal"></span>
					      	</button>
					      </span>
					    </div>
					    <!--<div class="col-sm-10">
					    
					      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
					    </div>
					  --></div>
					   <div class="form-group">
					    <label for="inputEmail3">Email</label>
					    <div class="input-group col-sm-10">
					      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
					      <span class="input-group-btn showBox">
					      	<button class="btn btn-default" type="button">
					      		<span class="glyphicon glyphicon-option-horizontal"></span>
					      	</button>
					      </span>
					    </div>
					    <!--<div class="col-sm-10">
					    
					      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
					    </div>
					  --></div>
					   <div class="form-group">
					    <label for="inputEmail3">Email</label>
					    <div class="input-group col-sm-10">
					      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
					      <span class="input-group-btn showBox">
					      	<button class="btn btn-default" type="button">
					      		<span class="glyphicon glyphicon-option-horizontal"></span>
					      	</button>
					      </span>
					    </div>
					    <!--<div class="col-sm-10">
					    
					      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
					    </div>
					  --></div>
				</form>
			
			
				<!-- /S 表头  -->
				<form class="well form-horizontal unAllEdit" role="form" id="topForm" style="padding:20px 0;"> 
				  <!-- /S 表单控件  -->
				  
				   	<div class="formBtn">
						<div class="form-group">
					  		<label class="col-sm-1 control-label">开始日期:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
					    			<input  type="text" class="form-control startTimeStr" id="startTimeStr" name="startTimeStr" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  />
					  			</div>
					  		</div>
					  		<label class="col-sm-1 control-label">结束日期:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
					    			<input  type="text" class="form-control endTimeStr" name="endTimeStr" id="endTimeStr" placeholder="年-月-日"  onblur='checkInput.checkTime(this,"#startTimeStr","#endTimeStr");'  />
					  			</div>
					  		</div>
					  		<label class="col-sm-1 control-label">会员卡号:</label>
						  	<div class="col-sm-8">
								<div class="input-group">
			                    	<input type="text" class="form-control cardNo" name="cardNo" >
			                	</div>
						  	</div>
						</div>
					</div>
						  
					<div class="formBtn">
						<div class="form-group">
					  		<label class="col-sm-1 control-label">业务流水:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
			                    	<input type="text" class="form-control serviceInstanceNo" name="serviceInstanceNo" >
			                	</div>
					  		</div>
					  		<label class="col-sm-1 control-label">手机串号:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
			                    	<input type="text" class="form-control imei" name="imei" >
			                	</div>
					  		</div>
					  		
						</div>
						
					 </div>
					 
					 
					 
					 <div class="formBtn">
						<div class="form-group">
					  	
			                    	
			                
					  		<label class="col-sm-1 control-label">营业员:</label>
					  		<div class="col-md-4">
								<div class="input-group">
			                    	<input type="text" class="form-control salesman" name="imei" >
			                	</div>
					  		</div>
					  		
						</div>
						
					 </div>
					 
					 <div style="text-align:center">
						<button style="background:#6098CF;color:#fff" type="button" class="btn" onclick="searchData()" data-eventname="printbtn">过滤</button>
					 </div>
				</form><!-- /E 表头  -->
	    	</div>
			<div class="value-added_tableBox">
				<table id="jqGrid_value_added" ></table>
				<div id="jqGrid_value_footer"></div>
			</div>
			
			<div style="height: 80px;font-size: 22px;line-height: 80px;">使用明细:</div>
			<div class="use_list_tableBox">
				<table id="jqGrid_use_list" ></table>
				<div id="jqGrid_use_footer" ></div>
			</div>
			
			
			
			<!-- 调出部门名称模态框（Modal） -->
			<div class="modal fade" id="branchModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
				<div class="modal-dialog tree-dialog modalSmall">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								&times;
							</button>
							<h4 class="modal-title" id="myModalLabel">
								调出部门
							</h4>
						</div>
						<div class="modal-body tree-body">
							<ul id="branchTree" class="ztree"></ul>
						</div>
						
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
						</div>
						
					</div><!-- /.modal-content -->
				</div><!-- /.modal -->
			</div>
			<!-- 调出部门名称模态框（Modal）结束 -->
			
			<!-- 调出制单人模态框（Modal） -->
			<div class="modal fade" id="makerModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
				<div class="modal-dialog tree-dialog modalSmall">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								&times;
							</button>
							<h4 class="modal-title" id="myModalLabel">
								选择制单人
							</h4>
						</div>
						<div class="modal-body">
							<table id="jqGrid_maker_list" ></table>
							<div id="jqGrid_maker_footer" style="height:80px;"></div>
						</div>
						
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
						</div>
						
					</div><!-- /.modal-content -->
				</div><!-- /.modal -->
			</div>
			<!-- 调出制单人模态框（Modal）结束 -->
			
			<!-- 调出往来单位模态框（Modal） -->
			<div class="modal fade" id="btypeTreeModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
				<div class="modal-dialog tree-dialog modalSmall">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								&times;
							</button>
							<h4 class="modal-title" id="myModalLabel">
								往来单位
							</h4>
						</div>
						<div class="modal-body tree-body">
							<ul id="btypeTreeTree" class="ztree"></ul>
						</div>
						
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
						</div>
						
					</div><!-- /.modal-content -->
				</div><!-- /.modal -->
			</div>
			<!-- 调出往来单位模态框（Modal）结束 -->
			
			<div id="jqGrid_maker_footer" style="height:80px;"></div>
		</div>
		
		<div class="resultBox" style="display:none;width:60%;margin: 0 auto;text-align: center;font-size: 22px;"></div>
		<script src="${basePath}/js/erp/afterSale/valueAdded.js?v=${version}" type="text/javascript?v=${version}" charset="utf-8"></script>
	</body>
</html>