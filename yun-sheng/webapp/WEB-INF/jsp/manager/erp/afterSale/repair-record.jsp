<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>

		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="/manager/css/afterSale/toGetTreatment.css?v=${version}" />
		<title>维修记录查询</title>
	</head>
	<body>
		<div class="mainbody" >
			<div id="AUTH" data-code="WXJLCX" class="btn-group btnHundred" role="group" >
			 	<!--<button type="button" class="btn saveData" data-eventname="printbtn">打印</button>
			  	<button type="button" class="btn" data-eventname="printbtn">导出</button>
			--></div>
			
			<div class="queryContainer">
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
					  		<label class="col-sm-1 control-label">客户姓名:</label>
						  	<div class="col-sm-8">
								<div class="input-group">
			                    	<input type="text" class="form-control branch" name="branch" id="customerName">
			                	</div>
						  	</div>
						  	<label class="col-sm-1 control-label">联系电话:</label>
						  	<div class="col-sm-8">
								<div class="input-group">
			                    	<input type="text" class="form-control branch" name="branch" id="telephone">
			                	</div>
						  	</div>
						  	
						</div>
					</div>
					<div class="formBtn">
						<div class="form-group">
					  		<label class="col-sm-1 control-label">送修单位:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
			                    	<input type="text" class="form-control branch" name="branch" id="repairUnitInput"  disabled/>
			                    	<span class="input-group-addon">
			                    		<span class="glyphicon glyphicon-plus" style="cursor: pointer;" id="repairUnit"></span>
			                    	</span>
			                	</div>
					  		</div>
					  		<label class="col-sm-1 control-label">会员卡号:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
			                    	<input type="text" class="form-control branch" name="branch" id="casNo">
			                	</div>
					  		</div>
					  		<label class="col-sm-1 control-label">业务流水:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
			                    	<input type="text" class="form-control branch" name="branch" id="flowNo">
			                	</div>
					  		</div>
					  		<label class="col-sm-1 control-label">手机串号:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
			                    	<input type="text" class="form-control branch" name="branch" id="telephoneNo">
			                	</div>
					  		</div>
					  		
						</div>
						
					 </div>
						  
					<div class="formBtn">
						<div class="form-group">
					  		<label class="col-sm-1 control-label">部门:</label>
					  		<div class="col-sm-8">
								<div class="input-group">
			                    	<input type="text" class="form-control branch" name="branch" id="repairDepartmentInput" disabled>
			                    	<span class="input-group-addon">
			                    		<span class="glyphicon glyphicon-plus" style="cursor: pointer;" id="repairDepartment"></span>
			                    	</span>
			                	</div>
					  		</div>
						</div>
					 </div>
					 <div style="text-align:center">
						<button style="background:#6098CF;color:#fff" type="button" class="btn" data-eventname="printbtn" id="filter">过滤</button>
					 </div>
				</form><!-- /E 表头  -->
	    	</div>
			<div class="value-added_tableBox" style="width:100%;">
				<table id="jqGrid_repair_record" ></table>
				<div id='proPager'></div>
			</div>
			
			<div style="margin-top:50px">
			
				  <!-- Nav tabs -->
				  <ul class="nav nav-tabs" role="tablist"><!--
				    <li role="presentation" class="active"><a href="#repairItems" aria-controls="home" role="tab" data-toggle="tab">维修项目</a></li>
				    <li role="presentation"><a href="#repairPart" aria-controls="profile" role="tab" data-toggle="tab">更换备件</a></li>
				    <li role="presentation"><a href="#changeIme" aria-controls="messages" role="tab" data-toggle="tab">外观、串号变更</a></li>
				    <li role="presentation"><a href="#repairResult" aria-controls="settings" role="tab" data-toggle="tab">检修结果</a></li>
				    --><li role="presentation" class="active"><a href="#repairCost" aria-controls="settings" role="tab" data-toggle="tab">外修及返厂费用</a></li>
				  </ul>
				
				  <!-- Tab panes -->
				  <div class="tab-content"><!--
				    <div role="tabpanel" class="tab-pane active" id="repairItems">
				    	<table id="jqGrid_repair_items" ></table>
						<div id="jqGrid_items_footer"></div>
				    </div>
				    <div role="tabpanel" class="tab-pane" id="repairPart" >
				    	<table id="jqGrid_repair_Part" ></table>
						<div id="jqGrid_Part_footer"></div>
				    </div>
				    <div role="tabpanel" class="tab-pane" id="changeIme">
					    <form class="well form-horizontal unAllEdit" role="form" id="topForm" style="padding:20px 0;">
					    	<div class="formBtn">
								<div class="form-group">
							  		<label class="col-sm-1 control-label">新主串号:</label>
							  		<div class="col-sm-8">
										<div class="input-group">
					                    	<input type="text" class="form-control branch" name="branch" >
					                	</div>
							  		</div>
							  		<label class="col-sm-1 control-label">新辅串号:</label>
							  		<div class="col-sm-8">
										<div class="input-group">
					                    	<input type="text" class="form-control branch" name="branch" >
					                	</div>
							  		</div>
							  		<label class="col-sm-1 control-label">新颜色:</label>
							  		<div class="col-sm-8">
										<div class="input-group">
					                    	<input type="text" class="form-control branch" name="branch" >
					                	</div>
							  		</div>
								</div>
						 	</div>
						 
						 	<p style="margin-left: 64px;margin-bottom: 20px;">注：只有更换主板或外壳才填此项!</p>

						 </form>
				    </div>
				    <div role="tabpanel" class="tab-pane" id="repairResult">
				    	<div>
				    		<form id="toGet2">
							<div class="inputbox container-fluid clearfix">
									<div class="divYF1">
										<p>故障说明</p>
										<textarea class="textYF1 falutDesc" disabled></textarea>
									</div>
									<div class="divYF1 form-group">
										<p>检测结果</p>
										<textarea class="textYF1 testResult" name="testResult"></textarea>
									</div>
									<div class="divYF1 form-group">
										<p>维修方案</p>
										<textarea class="textYF1 repairProject" name="repairProject"></textarea>
									</div>
									<div class="lineF clearfix">
										
										<div class="Zpercent form-group vatayf1">
											<span class="box_textY">其他费用：</span>
											<span class="box_inputY">
												<input type="text" class="form-control qitaY1" value="0.00" name="qitaY1"/>
											</span>
									    </div>
										<div class="Zpercent form-group vatayf1">
											<span class="box_textY">其他成本：</span>
											<span class="box_inputY">
												<input type="text" class="form-control otherCost" value="0.00" name="otherCost"/>
											</span>
										</div>
										<div class="Zpercent form-group vatayf1">
											<span class="box_textY">备注：</span>
											<span class="box_inputY">
												<input type="text" class="form-control remark" name="remark" />
											</span>
										</div>
									</div>
							</div>
							</form>
				    		
				    	</div>
				    </div>
				    --><div role="tabpanel" class="tab-pane active" id="repairCost">
				    <form class="well form-horizontal unAllEdit" role="form" id="topForm" style="padding:20px 0;">
				    	<div class="formBtn">
								<div class="form-group">
							  		<label class="col-sm-1 control-label">服务费用:</label>
							  		<div class="col-sm-8">
										<div class="input-group">
					                    	<input type="text" class="form-control branch" name="branch" id="servicePay" disabled>
					                	</div>
							  		</div>
							  		<label class="col-sm-1 control-label">增值服务:</label>
							  		<div class="col-sm-8">
										<div class="input-group">
					                    	<input type="text" class="form-control branch" name="branch" id="addServicePay" disabled>
					                	</div>
							  		</div>
							  		<label class="col-sm-1 control-label">抵扣费用:</label>
							  		<div class="col-sm-8">
										<div class="input-group">
					                    	<input type="text" class="form-control branch" name="branch" id="discountServicePay" disabled>
					                	</div>
							  		</div>
								</div>
						 	</div>
						 </form>	
				    </div>
				  </div>

			</div>
			
			<div class="use_list_tableBox">
				<table id="jqGrid_use_list" ></table>
				<div id="jqGrid_use_footer" ></div>
			</div>
				
<!--送修单位模态框-->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  			<div class="modal-dialog" role="document" style="width:1000px;">
    			<div class="modal-content">
      				<div class="modal-header">
        				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        				<h4 class="modal-title" id="myModalLabel">送修单位</h4>
      				</div>
      				<div class="modal-body">
        				<div class="modalLeft">
        			  		<div class="zTreeDemoBackground2" style="width:100%">  
                           	 <ul id="treeDemo_mydoc" class="ztree" style="width:100%;height:auto"></ul>  
                       		</div>  
           				</div>
           			<div class="modalRight">
           			  <div class="tablebox retailDetailTable">
    					<div class="grid-wrap overflAuto" style="margin-top:10px">
        					<input id="proSearch" class="form-control" type="text" style="width:300px;" placeholder="请输入名称、编码、类别，回车搜索"/><br/>
            				<table id='dataGrid'></table>
            				<div id='jqGridPager'></div>
    					</div>
					</div>
           		</div>
      			</div>
      			<div class="modal-footer">
        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
      </div>
    </div>
  </div>
</div>

	<!-- 部门模态框 -->
	<div class="modal fade" id="repairDepartmentModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  			<div class="modal-dialog" role="document" style="width:500px;">
    			<div class="modal-content">
      				<div class="modal-header">
        				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        				<h4 class="modal-title" >部门</h4>
      				</div>
      			<div class="modal-body">
      			  <ul id="baseTree" class="ztree" style="width:100%;height:auto"></ul>
        		</div>
      			<div class="modal-footer">
        		<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
    </div>
  </div>
</div>	
		
		<!-- 引用自定义JS文件-->
		<script src="${basePath}/js/erp/afterSale/repairRecord.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	</body>
</html>