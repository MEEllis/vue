<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>

		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/afterSale/registrationCard.css?v=${version}" />
		<title>接机登记卡</title>
		<script>
			var groupId = ${groupId};
			var companyId = ${companyId};
			var repairSectionId = ${repairSectionId};
			var repairSectionName = '${repairSectionName}';
		</script>
	</head>

	<body >

			<!-------------------------------------表格开始----------------------------------------->
			<div class="bodyModel">
				<!-------------------------------------主页面开始----------------------------------------->
			<div  id="AUTH" data-code="JJDJK" class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn saveData" data-eventname="printbtn" onclick="registrationBtnClick()">登记</button>
			</div>
			<!-------------------------------------搜索条件开始----------------------------------------->
			<!-------------------------------------搜索条件结束----------------------------------------->	
				<div class="tablebox retailDetailTable">
					<ul id="myTab" class="nav nav-tabs">
						<li class="active">
							<a href="#scatteredModel" data-toggle="tab" class="scatYF">零散模式</a>
						</li>
						<li>
							<a href="#batchModel" data-toggle="tab" class="batchModalY">批量模式</a>
						</li>
					</ul>
					<div id="myTabContent" class="tab-content">
					<div class="tab-pane fade in active" id="scatteredModel">
					
									<!---------------查询条件开始---------------------------->
					<form id="verifYF">
			 			 <div class="well" style="margin-bottom:0px;">
							<div class="inputbox container-fluid clearfix">
								<div class="row">
									<div class="Zpercent">
										<span class="box_text"><em>*</em>接修方式：</span>
										<span class="box_input">
											<select class="form-control jxType" name="jxType">
												<option value="1">用户送修</option>
												<option value="2">邮寄送修</option>
											</select>
										</span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text"><em>*</em>受理时间：</span>
										<span class="box_input input-group"><input type="text" id="dealDate" class="form-control"  placeholder="年-月-日" name="dealDate"/></span>
									</div>
									<div class="Zpercent">
										<span class="box_text">业务流水号：</span>
										<span class="box_input"><input type="text" class="form-control flowNo" readonly="readonly"/></span>
									</div>
									<div class="Zpercent">
										<span class="box_text">服务类型：</span>
										<span class="box_input"><input type="hidden" name="servicerType" value="1"/><input type="text" class="form-control" value="售后" readonly="readonly"/></span>
									</div>
								</div>
								<div class="row">
									<div class="Zpercent form-group">
									<span class="box_text"><em>*</em>维修部门：</span>
									<div class="input-group">
										<input type="hidden" class="unitSearchYF2" name="repairSectionId" value="${repairSectionId}"/>
							             <input type="text" class="form-control unitSearch contactsunitId wanglai2" name="repairSectionName" readonly="readonly" value="${repairSectionName}">
									      <span class="input-group-btn">
									        <button class="btn btn-default btn2 " type="button" data-toggle="modal"  onclick="showSectionModal('repairSectionId_scatteredModel')">
									        	<span class="glyphicon glyphicon-plus"></span>
									        </button>
									      </span>
							         </div>
								</div>
									<div class="Zpercent">
										<span class="box_text">经办人：</span>
										<span class="box_input">
											<input type="hidden" class="managersUid" value="${managersUid}" name="managersUid"/>
											<input type="text" class="form-control " value="${managersUname}" readonly="readonly"/>
											</span>
									</div>
									<div class="Zpercent">
										<span class="box_text">维修状态：</span>
										<span class="box_input">
									      <input type="text" class="form-control repairStatus" value="已接机" readonly="readonly">
									    </span>
									</div>
								</div>
							</div>
						 </div>
					<!----------------查询条件结束---------------------->
					<!-------------------会员区,中间区域开始----------------------------------------->
					<!--  <div class="YFcenter">-->
						<div class="oneTier" style="border-top: 1px solid #cfcfcf;">
							<div class="inputbox container-fluid">
							    <div class="row"> 
							      	<div class="Zpercent form-group">
										<span class="box_text">会员卡号：</span>
										<span class="box_input">
											<input type="text" class="form-control cardNo" name="cardNo" />
										</span>
								   </div> &nbsp;&nbsp;<span style="color: red;margin-left: 50px;">请录入会员卡号或手机号、卡密</span>
							    </div>
							    
								<div class="row">
								<div class="Zpercent form-group">
									<!-- <div class="input-group"> -->
										<span class="box_text"><em>*</em>客户姓名：</span>
										<span class="box_input">
											<input type="text" class="form-control" name="customerName"/>
										</span>
									<!-- </div> -->
								</div>
								<div class="Zpercent form-group">
									<span class="box_text"><em>*</em>联系电话：</span>
									<span class="box_input">
								      <input type="text" class="form-control telephone" name="telephone">
								    </span>
								</div>
								<div class="Zpercent form-group">
									<span class="box_text">往来单位：</span>
									<div class="input-group">
										<input type="hidden" class="unitSearchYF1"  name="contactsunitId"/>
							             <input type="text" value="" class="form-control unitSearch wanglai1" readonly="readonly" name="contactUnitName" >
									      <span class="input-group-btn">
									        <button class="btn btn-default depChoose" type="button" data-toggle="modal" onclick="showContactunitModal(null);" id="contactunitBtn">
					        	              <span class="glyphicon glyphicon-plus"></span>
					                        </button>
									      </span>
							         </div>
								</div>
								
								<div class="Zpercent form-group">
									<span class="box_text">地址：</span>
									<span class="box_input">
								      <input type="text" class="form-control cardNum" name="memberAddress">
								    </span>
								</div>
							</div>
							</div>
						</div>
						
						<div class="twoTier">
							<div class="inputbox container-fluid">
							 <div class="row imeiInfo">
								<div class="Zpercent form-group">
									<span class="box_text">手机主串：</span>
									<span class="box_input">
								      <input type="text" class="form-control imei" name="imei">
								    </span>
								</div>
							
								<div class="Zpercent form-group">
									<span class="box_text">品牌：</span>
									<span class="box_input">
								      <input class="form-control brandId" readonly="readonly"  name="goodsBrandName">
								    </span>
								</div>
								<div class="Zpercent form-group">
									<span class="box_text">所属分类：</span>
									<span class="box_input">
								      <input class="form-control categoryId"  readonly="readonly"  name="goodsClassName">
								    </span>
								</div>
								<div class="Zpercent form-group">
									<!--<span class="box_text"><em>*</em>名称型号：</span>
									<span class="box_input">
								      <input type="text" class="form-control nameModle" name="nameModle">
								    </span>
								    -->
								    <span class="box_text"><em>*</em>商品名称：</span>
									<div class="input-group">
											<input type="hidden" class="form-control nameModle"  name="nameModle">
							             	<input type="text" value="" class="form-control unitSearch wanglai1 goodsName" id="goodsNameVal" readonly="readonly" >
									      <span class="input-group-btn">
									        <button class="btn btn-default depChoose" type="button" data-toggle="modal" onclick="showGoodsModal(0)" id="goodsName">
					        	              <span class="glyphicon glyphicon-plus"></span>
					                        </button>
									      </span>
							         </div>
								</div>
							</div>
							
							<div class="row imeiInfo">
								<div class="Zpercent form-group">
									<span class="box_text">手机辅串：</span>
									<span class="box_input clearinp">
									  <input type="hidden" class="form-control AuxliaryImeiId" name="AuxliaryImeiId">
								      <input type="text" class="form-control AuxliaryImei" name="auxiliaryImei">
								    </span>
								</div>
								
								<div class="Zpercent form-group">
									<span class="box_text">颜色：</span>
									<span class="box_input yfRelative">
								     	 <input class="form-control color" readonly="readonly"  name="goodsColorName">
								    </span>
								</div>
								
								<div class="Zpercent form-group">
									<span class="box_text">销售单号：</span>
									<span class="box_input clearinp">
								      <input type="text" class="form-control salesNo" name="salesNo">
								    </span>
								</div>
								
								<div class="Zpercent form-group">
									<span class="box_text"><em class="TShide">*</em>销售部门：</span>
									<div class="input-group clearinp">
									 <input type="hidden" name="salesSectionId">
							             <input type="text" value="" class="form-control " readonly="readonly" name="salesSectionName">
									      <span class="input-group-btn">
									        <button class="btn btn-default btn2 salesSectionNameBtn" type="button" data-toggle="modal"  onclick="showSectionModal('salesSectionId_twoTier')">
									        	<span class="glyphicon glyphicon-plus"></span>
									        </button>
									      </span>
							         </div>
								</div>
								
							</div>
							
							<div class="row imeiInfo">
								<div class="Zpercent form-group">
									<span class="box_text">版本号：</span>
									<span class="box_input">
								      <input type="text" class="form-control editionNo" name="editionNo">
								    </span>
								</div>
								
								<div class="Zpercent form-group">
									<span class="box_text">保修：</span>
									<span class="box_input">
								      <select class="form-control YFselect1" name="insuranceType">
								      	<option value="1">厂家保修期</option>
								      	<option value="2">维修保修期</option>
								      	<option value="3">保外</option>
								      	<option value="4">待定</option>
								      	<option value="5">退、换货期内</option>
								      </select>
								    </span>
								</div>
								
								<div class="Zpercent form-group">
									<span class="box_text">购机日期：</span>
									<span class="box_input clearinp">
										<input type="text" class="form-control" id="buyDate" placeholder="年-月-日"  name="buyDate"/>
									</span>
								</div>
								
								<div class="Zpercent form-group">
									<span class="box_text">发票号码：</span>
									<span class="box_input clearinp">
								      <input type="text" class="form-control invoiceNo" name="invoiceNo"  maxlength="250"/>
								    </span>
								</div>
								
							</div>
							
							<div class="row clearinp">
								
								<div class="Zpercent form-group">
									<span class="box_text">随机附件：</span>
									<span class="box_input yfRelative">
								      <input type="text" class="form-control input-none randomAttachment" data-type="2" name="randomAttachment" maxlength="250"/>
									<div class="none-cx YFshui" style="display: none;">
								     	 </div>  
								    </span>
								</div>
								
								<div class="Zpercent form-group">
									<span class="box_text form-group">外观描述：</span>
									<span class="box_input yfRelative">
									<input type="hidden" class="wgms"/>
								        <input type="text" class="form-control input-none looksDesc" data-type="1" name="looksDesc"  maxlength="250"//>
										<div class="none-cx description" style="display: none;">
								     	 </div>  
								    </span>
								</div>
								
								<div class="Zpercent form-group">
									<span class="box_text">故障说明：</span>
									<span class="box_input yfRelative">
								      <input type="text" class="form-control input-none faultExplain" data-type="3" name="faultExplain"  maxlength="250"//>
										<div class="none-cx guDiv" style="display: none;">
								     	 </div>  
								    </span>
								</div>
								
							</div>
							
							<div class="row clearinp">
								
								<div class="Zpercent form-group">
									<span class="box_text">所在地址：</span>
									<span class="box_input">
								      <input type="text" class="form-control locationAddress" name="locationAddress"  maxlength="250"/>
								    </span>
								</div>
								<div class="Zpercent form-group">
									<span class="box_text">联系电话：</span>
									<span class="box_input">
								      <input type="text" class="form-control goodsPhone" name="goodsPhone">
								    </span>
								</div>
								
							</div>
							</div>
							</form>
						</div>
						
						<div class="threeTier">
							<form id="beiYF">
							<div class="inputbox container-fluid">
								<div class="row">
									<span style="margin-left: 100px;margin-bottom: 10px;display: inline-block;">
										<input type="checkbox" class="YFcheckbox" id="spareFlag"/>
									</span>
									<span>是否借出备用机</span>
								</div>
								<div class="row">
									<div class="Zpercent form-group">
										<span class="box_text"><em class="YFhide">*</em>仓库：</span>
										<span class="box_input">
									      <select class="form-control YFhideIn1" disabled name="storageId" id="storageId">
									      </select>
									    </span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">商品编码：</span>
										<span class="box_input">
									      <input type="text" class="form-control codeyf" readonly="readonly"  name="goodsCode">
									    </span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text"><em class="YFhide">*</em>商品名称：</span>
										<div class="input-group tuYF1 box_input">
										     <input name="spareGoodsId" type="hidden"/>
										      <input name="costPrice" type="hidden"/>
								             <input type="text" name="goodsName" class="form-control YFhideIn2" readonly="readonly">
										      <span class="input-group-btn ">
										        <button class="btn btn-default btn2 goodsFilter YFbtnHied1" type="button" onclick="showGoodsModal(1)">
										        	<span class="glyphicon glyphicon-plus"></span>
										        </button>
										      </span>
								         </div>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">品牌：</span>
										<span class="box_input">
									      <input type="text" class="form-control ppyf" readonly="readonly"  name="goodsBrandName">
									    </span>
									</div>
								</div>
								
								<div class="row">
									<div class="Zpercent form-group">
										<span class="box_text">颜色：</span>
										<span class="box_input">
									      <input type="text" class="form-control coloryf" readonly="readonly"  name="goodsColorName">
									    </span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text"><em  class="YFhide">*</em>串号：</span>
										<div class="input-group tuYF3 box_input">
										      <input name="spareImei" type="hidden"/>
								             <input type="text" value="" class="form-control YFhideIn4" readonly="readonly" name="spareImeiStr">
										      <span class="input-group-btn">
										        <button class="btn btn-default btn2 YFbtnHied3" type="button" onclick="showImeiModal('threeTier')">
										        	<span class="glyphicon glyphicon-plus"></span>
										        </button>
										      </span>
								         </div>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">押金：</span>
										<div class="input-group tuYF3 box_input">
								             <input type="text" value="0.00" class="form-control YFhideIn4" readonly="readonly" name="depositTotal" id="depositTotal" value="">
										      <span class="input-group-btn">
										        <button class="btn btn-default btn2 YFbtnHied3" type="button" onclick="showDepositModal()">
										        	<span class="glyphicon glyphicon-plus"></span>
										        </button>
										      </span>
								         </div>
									</div>
								</div>
								
							</div>
							</form>
						</div>
						
						<div class="fourTier">
						<form id="fourTier">
							<div class="inputbox container-fluid">
								<div class="row" style="margin-bottom: 15px !important;">
									<div class="Zpercent form-group">
										<span class="box_text">检测人：</span>
										<span class="box_input">
									      <select class="form-control testBy" name="testBy" id="testBy">
									      </select>
									    </span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text"><em>*</em>处理方式：</span>
										<span class="box_input">
									      <select class="form-control YFselect2" onchange="changeManage(value)" name="handleMode">
									      	<option value="2" selected>返厂</option>
									      	<option value="3">外修</option>
									      	<option value="4">换机</option>
									      	<option value="5">退货</option>
									      </select>
									    </span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">预收款：</span>
										<div class="input-group">
								             <input type="text" value="0.00" class="form-control moneyCh"  id="prepaymentAmount" readonly="readonly">
										      <span class="input-group-btn">
										         <button class="btn btn-default depChoose" type="button" data-toggle="modal" onclick="showSettleAccountsModal();">
					        	            <span class="glyphicon glyphicon-plus"></span>
					                     </button>
										      </span>
								         </div>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">预报价：</span>
										<span class="box_input">
									      <input type="text" class="form-control quotePrice" name="quotePrice">
									    </span>
									</div>
								</div>
								
								<div class="row" style="margin-bottom: 15px !important;">
									<div class="Zpercent">
										<span style="margin-left: 100px;" ><input type="checkbox" class="repairFlag" name="repairFlag" id="repairFlag"></span>
										<span>返修</span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">备注：</span>
										<span class="box_input">
									      <input type="text" class="form-control remark" name="remark">
									    </span>
									</div>
								</div>
							</div>
							</form>
						</div>
						
				<!-- </div> -->	
					
					<!-------------------会员区，中间区域结束----------------------------------------->
					</div>
					<!--选项卡-->
					<div class="tab-pane fade" id="batchModel">
										<!--------------查询条件开始------------->
			 			 <div class="well">
						<form id="inquire_option">
						<from id="batchValidator">
							<div class="inputbox container-fluid clearfix">
								<div class="row">
									<div class="Zpercent form-group">
										<span class="box_text"><em>*</em>接修方式：</span>
										<span class="box_input">
											<select class="form-control jxType" name="jxType">
												<option value="1">用户送修</option>
												<option value="2">邮寄送修</option>
											</select>
										</span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text"><em>*</em>受理时间：</span>
										<span class="box_input input-group"><input type="text" class="form-control"  placeholder="年-月-日" name="acceptDate"/></span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">服务类型：</span>
										<span class="box_input"><input type="hidden" name="serviceType" value="1"/><input type="text" class="form-control" value="售后" readonly="readonly"/></span>
									</div>
									<div class="Zpercent">
										<span class="box_text">维修状态：</span>
										<span class="box_input">
									      <input type="text" class="form-control repairStatus" value="已接机" readonly="readonly">
									    </span>
									</div>
								</div>
								
								<div class="row">
									<div class="Zpercent form-group">
									<span class="box_text">往来单位：</span>
									<div class="input-group">
										<input type="hidden" class="unitSearchYF1"  name="contactsunitId"/>
							             <input type="text" value="" class="form-control unitSearch wanglai1" readonly="readonly" name="contactUnitName">
									      <span class="input-group-btn">
									        <button class="btn btn-default depChoose" type="button" data-toggle="modal" onclick="showContactunitModal(null);" id="contactunitBtn">
					        	              <span class="glyphicon glyphicon-plus"></span>
					                        </button>
									      </span>
							         </div>
								</div>
									<div class="Zpercent form-group">
										<span class="box_text">联系人：</span>
										<span class="box_input">
											<input type="text" class="form-control contactBy" name="contactBy" />
										</span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">联系电话：</span>
										<span class="box_input">
											<input type="text" class="form-control contactPhone" name="contactPhone" />
										</span>
									</div>
									<div class="Zpercent form-group">
										<span class="box_text">地址：</span>
										<span class="box_input">
											<input type="text" class="form-control address" name="address"/>
										</span>
									</div>
								</div>
								
								
								<div class="row">
									<div class="Zpercent form-group">
									<span class="box_text"><em>*</em>维修部门：</span>
									<div class="input-group">
										<input type="hidden" class="unitSearchYF2" name="repairSectionId" value="${repairSectionId}"/>
							             <input type="text" class="form-control unitSearch contactsunitId wanglai2" name="repairSectionName" readonly="readonly" value="${repairSectionName}">
									      <span class="input-group-btn">
									        <button class="btn btn-default btn2 " type="button" data-toggle="modal"  onclick="showSectionModal('repairSectionId_batchModel')">
									        	<span class="glyphicon glyphicon-plus"></span>
									        </button>
									      </span>
							         </div>
								</div>
									<div class="Zpercent form-group">
										<span class="box_text">经手人：</span>
										<span class="box_input">
											<input type="hidden" class="managersUid" value="${managersUid}" name="managerId"/>
											<input type="text" class="form-control" value="${managersUname}" readonly="readonly"/>
										</span>
									</div>
								</div>
								
							</div>
							</from>
						 </form>
						 </div>
					<!--------------查询条件结束---------------->
						<div class="tablebox retailDetailTable">
							<div class="grid-wrap overflAuto widthYF3" style="margin-top:10px">
								<table id="dataGrid" class="zxsaastable">
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="footYF" style="display: none">
							<ul id="myTab" class="nav nav-tabs">
								<li class="active">
									<a href="#appreciationYF" data-toggle="tab" class="keYONG">可用增值服务</a>
								</li>
								<li>
									<a href="#historyYF" data-toggle="tab" class="history01">历史维修记录</a>
								</li>
							</ul>
							<div id="myTabContent" class="tab-content">
								<div class="tab-pane fade in active" id="appreciationYF">
									<div class="jqGrid_wrap overflAuto widthyf1">
										<table id="jqGrid_appreciationYF" class="zxsaastable "></table> 
					    				<div id="jqGridPager_appreciationYF"></div>
									</div>
								</div>
								<div class="tab-pane fade" id="historyYF">
										<div class="jqGrid_wrap overflAuto widthYF2">
											<table id="jqGrid_historyYF" class="zxsaastable"></table> 
						    				<div id="jqGridPager_historyYF"></div>
										</div>
								</div>
							</div>
						</div>
				</div>
			</div>
			<!-------------------------------------表格结束----------------------------------------->
		<!-------------------------------------主页面结束----------------------------------------->
		
		
		<!--供应商选择弹出窗-->
		<div class="modal fade" id="supplierChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalYQ1">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							供应商选择
						</h4>
					</div>
					 <div class="modal-body">
				  
					<div class="tranLeft" style="overflow: auto;width:25%;">
						<div class="left-tree">
							<input type="hidden"  class="supplierGHS"/>
							<ul id="supplierTree" class="ztree"></ul>
						</div>							
					</div>
					<div class="right-body">
						<div class="jqGrid_wrap" style="width:480px;">
							<input type="text" />
							<table id="jqGrid_supplier" class="zxsaastable"></table> 
	    					<div id="jqGridpager_supplier"></div>
    					</div>
	    			</div>
					
				   </div>
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
						</div>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--商品名称选择弹出窗开始-->
		<div class="modal fade" id="goodsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							商品名称选择
						</h4>
					</div>
					 <div class="modal-body">
						<div class="tranLeft" style="overflow: auto;">
							<div class="left-tree">
								<input type="hidden"  />
								<ul id="goodsTreeData" class="ztree"></ul>
							</div>							
						</div>
						<div class="right-body">
							<div class="jqGrid_wrap" style="width:873px;">
								<input type="text" class="quickGoods" id="goodsNameKeyWord" placeholder="商品名称、编码模糊搜索" style="width:200px;"/>
								<input type="hidden" class="goodsIDYF"/>
								<table id="goodsModalGrid" class="zxsaastable"></table> 
			    				<div id="gridpager_goods"></div>
		    				</div>
		    			</div>
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
				</div>
			</div>
		</div><!--商品名称选择弹出窗结束-->
		
		<!-- 备用机串号模态框（Modal） -->
		<div class="modal fade" id="imeiModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:30%">
				<div class="modal-content " style="width: 500px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							备用机串号
						</h4>
					</div>
				  <div class="modal-body">
				      <div class="container">
							<!--展示列表开始-->
							<div class="details">
								<!--表格-->
								<table  id='imeiModalGrid'>
								</table>
							</div>
							<!--展示列表结束-->
						</div>
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!--备用机串号模态框（Modal）结束 -->
		
<!-- 部门名称模态框 -->
<div class="modal fade" id="sectionModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
	<div class="modal-dialog tree-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					部门选择
				</h4>
			</div>
			<div class="modal-body tree-body">
				<ul id="sectionTreeData" class="ztree"></ul>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>
		
<!--往来单位选择弹出窗-->
<div class="modal fade" id="contactunitModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalYQ1">
				<div class="modal-content" style="width:910px">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							往来单位选择
						</h4>
					</div>
					 <div class="modal-body">
				  
					<div class="tranLeft" style="overflow:auto;width:20%">
						<div class="left-tree">
							<ul id="contactunitTreeData" class="ztree"></ul>
						</div>							
					</div>
					<div class="right-body">
						<div class="jqGrid_wrap" >
							<input type="text" placeholder="编码、名称、助记码模糊搜索" id="contactunitRemCode" style="width:200px;"/>
							<table id="contactunitModalGrid" class="zxsaastable"></table> 
	    					<div id="contactunitGridpager"></div>
    					</div>
	    			</div>
					
				   </div>
						<div class="modal-footer">
							<button type="button" class="btn btn-warning" data-dismiss="modal">仅关闭</button>
						</div>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		
		<!--预收款选择选择弹出窗 开始-->
		<div class="modal fade" id="paymentWay" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:34%">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							收款方式选择
						</h4>
					</div>
					<div class="modal-body">
						<div class="container overflAuto" style="width:100%">
							<!--展示列表开始-->
							<div class="details ">
								<!--表格-->
								<table  id='paymentWayModalGrid'>
								</table>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal" onblur="savePaymentWay()">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div>
		</div><!--预收款选择弹出窗 结束-->

<!--押金弹出窗 开始-->
		<div class="modal fade" id="depositModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width:34%">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							收款方式选择
						</h4>
					</div>
					<div class="modal-body">
						<div class="container overflAuto" style="width:100%">
							<!--展示列表开始-->
							<div class="details ">
								<!--表格-->
								<table  id='depositModalGrid'>
								</table>
							</div>
							<!--展示列表结束-->
						</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-info" data-dismiss="modal" onblur="saveDeposit()">保存</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
					</div>
				</div><!-- /.modal-content -->
			</div>
		</div><!--预收款选择弹出窗 结束-->
		<!-------------------------------------底部开始----------------------------------------->
		<!-------------------------------------底部结束----------------------------------------->
	</body>
	<script src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"  type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/pick-up-registration-card.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/common.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/verification.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/goods.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/imei.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/deposit.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/erp/afterSale/used-record.js?v=${version}" type="text/javascript" charset="utf-8"></script>
</html>



