<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/inventory/storage/storageCom.js?v=${version}"></script>
	<script src="${basePath}/js/inventory/storage/otherStockRemoval.js?v=${version}"></script>
	<link rel="stylesheet" href="${basePath}/css/inventory/storage/otherStockRemoval.css?v=${version}"/>
    <title>其它出库单</title>
    <style type="text/css">
    	#imeiDr-modal .modal-header{
    		background-color: #4e78a1;
		    padding: 10px;
		    color: #fff;
    	}
		.imeiImport{
			padding: 6px 25px;
		    background: #fff;
		    border: 1px solid #ccc;
		}
		.imeiImport:hover{
			border: 1px solid #0099FF;
		}
		#imeiDr-modal .row{
			padding-bottom: 0;
		}
		#filtrationChoose .showBox{
			display: inline-block;
			float: left;
			left: 203px;
		}
		/*模糊查询显示的div*/
		.none-cx{
			max-width: 170px;
			position: relative;
			z-index: 1;
			background: #F4F8FA;
			height: auto;
			border: 1px solid #dfdfdf;
		}
		.none-cx>ul>li{
			padding-left: 10px;
			line-height: 30px;
			height: 30px;
		}
		.none-cx>ul{
			margin-bottom:0;
		}
		.none-cx>ul>li:hover{
			background: #65c294;
			cursor: pointer;
		}
	</style>
    </head>
<body   class="e-body-bg pageBill">
 <div>
	 <div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="QTCKD"></div>
 	<div id="AUTH" data-code="QTCKD" class="none btn-group btnHundred">
		<button id='first' type="button" class="billSearch btn" data-code='F'>首单</button>
		  <button id='prev' type="button" class="billSearch btn" data-code='P'>上一单</button>
		  <button id='next' type="button" class="billSearch btn" data-code='N'>下一单</button>
		  <button id='last' type="button" class="billSearch btn" data-code='L'>末单</button>
		  <button id='new' type="button" class="btn">新增</button>
		  <button id='save' type="button" class="btn">保存</button>
		  <button id='del' type="button" class="btn" disabled>删除</button>
		  <button id='abandon' type="button" class="btn" disabled>过账</button>
		  <button id='red' type="button" class="btn" disabled>红冲</button>
		  <div class="btn-group">
			  <button id='print' disabled type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">打印<span class="caret"></span></button>
			  <ul class="dropdown-menu">
			  	<li><a class='printOpt' data-type='numberDetail' href="javascript:void(0)">商品汇总</a></li>
			  	<li><a class='printOpt' data-type='imeiDetail' href="javascript:void(0)">商品明细</a></li>
			  </ul>
		  </div>
		  <button id='filter' type="button" class="btn">过滤</button>
		<button id="copy" type="button" class="btn"  style="">复制</button>
			<div class="slideThree none">
				<input type="checkbox" id="slideThree" name="check"/>
				<label for="slideThree"></label>
			</div>
		<button type="button" class="btn btn-default btn-yindao-btn" style="float:right;"
				onclick="window.parent.openWorkBoxByMenutext('其他出库单单据列表',  '/manager/jxc/storage/allocate/documentList/samePricetransfer/historicaDoc?TypeName=4', true)">历史单据</button>

	</div>
	 <div class="pageBillForm gridTop">
			<form id="billsHeader" class="clearfix form-inline" >
				<input type="hidden" id="id" name="id" value="">
				<input type="hidden" id="sectionId" name="sectionId" value="">
				<input type="hidden" id="contactsunitId" name="contactsunitId" value="">
				<div id="billsCodeWrap" class="col-sm-3">
					<label class="width-25">单据编号:</label>
					<div class="input-group col-sm-8">
						<input id="billsCode" class="form-control"  name="billsCode" type="text" readonly/>
						<input id="billsId"  name="billsId" type="hidden" />
						<input id="isDraft" value='1' type="hidden" />
						<input id="billsStatus" name="billsStatus" type="hidden" />
						<input type="hidden" id="auditStatus"  name="auditStatus">
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="width-25"><i class="bitianX">*</i>部门名称:</label>
					<div class="input-group col-sm-8">
						<input id="departmentName"  class="form-control" name="departmentName" type="text" readonly>
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="width-25">往来单位:</label>
					<div class="input-group col-sm-8">
						<input id="contactName"  class="form-control" name="contactName" type="text" readonly>
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="width-25"><i class="bitianX">*</i>单据日期:</label>
					<div class="input-group col-sm-8">
						<input id="billsDateString"  class="form-control" name="billsDateString" type="text" readonly>
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="width-25"><i class="bitianX">*</i>经手人:</label>
					<div class="input-group col-sm-8">
						<input id="managersName"   class="form-control" name="managersName" type="text" >
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="width-25"><i class="bitianX">*</i>出库方式:</label>
					<div class="input-group col-sm-8">
						<select id="otherStorageId" name="otherStorageId" class="form-control" ></select>
					</div>
				</div>
				<div class="form-group col-sm-3">
					<label class="width-25">单备注:</label>
					<div class="input-group col-sm-8">
						<input id="remark"  class="form-control" name="remark" type="text" >
					</div>
				</div>
				<div class="rightMap">
					<img id="billsStautsImg" src="${basePath}/images/status/statusRed.png" style="display:none"/>
					<img id="billsStautsImgPass" src="${basePath}/images/status/statusPass.png" style="display:none"/>
					<img class="ml10" id="auditImg" src="" />
				</div>
			 </form>
	 </div>
 </div>
	 <div class="clearfix">
		 <div class="col-md-12">
			 <div class="form-horizontal" role="form" style="margin-top: 5px;">
				 <div class="form-group col-sm-4">
					 <label class="col-sm-4 control-label" style="font-weight: normal;">出库串号:</label>
					 <div class="col-sm-8 ">
						 <input id="otherOutstroNumIdStr" class="form-control"  name="otherOutstroNumIdStr" type="text" placeholder="串号录入,可右匹配"/>
						 <div class="none-cx" style="display: none;position: absolute;width: 100%;">
							 <ul id="imeiUl" style="max-height: 300px;"></ul>
						 </div>
					 </div>
				 </div>

				 <div class="form-group col-sm-3" style="margin-bottom: 0px;">
					 <button type="button" class="btn imeiImport">串号导入</button>
				 </div>

			 </div>
		 </div>
	 </div>

		<!-- 往来单位模态框 -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  		<div class="modal-dialog" role="document" style="width:1000px;">
    		<div class="modal-content">
      			<div class="modal-header">
        			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        			<h4 class="modal-title" id="myModalLabel">往来单位</h4>
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
        					<input id="proSearch" class="form-control" type="text" style="width:300px;" placeholder="请输入名称、编码，回车搜索"/><br/>
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
					<!-------------------------------------表格开始----------------------------------------->




<div class="tablebox retailDetailTable">
    <div class="grid-wrap overflAuto" style="margin-top:10px">
        <table id="grid" class="zxsaastable" ></table>
        <div id="gridPager"></div>
    </div>
</div>
<!-- 仓库名称模态框（Modal） -->
<div class="modal fade" id="ckmcChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modalSmall">
        <div class="modal-content ">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">仓库名称</h4>
            </div>
            <div class="modal-body  tree-body" align="right">
                <ul id="ckmcDataTree" class="ztree"></ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<!-- 打印模态框（Modal） -->
<div class="modal fade" id="printModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">单据打印</h4>
            </div>
            <div class="modal-body">
            	打印模板类型
                <label class="radio-inline"><input type="radio" name="printRadio" value="imeiDetail" checked>商品明细</label>
                <label class="radio-inline"><input type="radio" name="printRadio" value="numberDetail">商品汇总</label>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="print()">确定</button>
            </div>
        </div>
    </div>
</div>
<!-- 红冲模态框（Modal） -->
<div class="modal fade" id="redModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">单据红冲</h4>
            </div>
            <div class="modal-body">
            	红冲时间：
                <input type="text" id="hcTime" name="hcTime" placeholder="年-月-日"  readonly/>
            </div>
            <div class="modal-footer">
				<button type="button" class="btn btn-primary" id="redTime">确定</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<!-- 商品引用 -->
<div class="modal fade" id="goodsnameReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog" style="width:1000px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title">商品引用</h4>
            </div>
            <div class="modal-body">
            	<div class="modalLeft">
            		<ul id="spmcDataTree" class="ztree"></ul>
            	</div>
            	<div class="modalRight">
            		<input id="DSearch" class="form-control" type="text" style="width:300px;" placeholder='请输入名称、型号、助记码，回车搜索'/><br/>
            		<table id='proTable'></table>
            		<div id='proPager'></div>
            	</div>
            </div>
            <div class="modal-footer">
				<button type="button" class="erp-btn-bg goodsnameReferenceOk" >确定</button>
				<button type="button" class="erp-btn-lab" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<!-- 引入在库串号模态框（Modal） -->
<div class="modal fade" id="numberChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modalQian">
        <div class="modal-content ">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">引入在库串号</h4>
            </div>
            <div class="modal-body">
                <div class="inputModal clearfix">
                    <div class="inputTab">
                        <span>商品信息：</span>
                        <span><input id="imeiGoodsName" type="text" class="form-control" disabled/></span>
                    </div>
                    <div class="inputTab">
                        <span>仓库名称：</span>
                        <span><input type="text" id="imeiStorageName" class="form-control" disabled/></span>
                    </div>
                </div>
                <div class="left-body clearfix">
                    <span class="leftRefresh_info">在库串号信息</span>
                    <div class="jqGrid_wrap">
                        <table id="inlib" class="zxsaastable"></table>
                        <div id="inlibPager"></div>
                    </div>
                </div>
                <div class="coverDemo">
                    <div class="cent-body clearfix">
                        <button id='rightAll' type="button" class="btn"><span class="glyphicon glyphicon-fast-forward"></span></button>
                        <button id='rightPart' type="button" class="btn"><span class="glyphicon glyphicon-chevron-right"></span></button>
                        <button id='leftAll' type="button" class="btn"><span class="glyphicon glyphicon-fast-backward"></span></button>
                        <button id='leftPart' type="button" class="btn"><span class="glyphicon glyphicon-chevron-left"></span></button>
                    </div>
                </div>
                <div class="cent2-body clearfix">
                    <span>已选择串号信息</span>
                    <div class="jqGrid_wrap">
                        <table id="temp" class="zxsaastable"></table>
                        <div id="tempPager"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id='numberChooseSure' type="button" class="btn btn-w btn-info">确定</button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<!--过滤条件 -->
<div class="modal fade in" id="filtrationChoose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="z-index:1049">
	<div class="modal-dialog modalNine">
		<div class="modal-content" style="height: auto;">
			<div class="modal-header" style="cursor: default;">
				<h4 class="modal-title">过滤条件</h4>
			</div>
			<div class="modal-body">
				<div class="showTab">
					<div class="inputModal">
						<form id="filterForm">
							<div class="inputTab">
								<span>开始日期：</span>
								<div class="inputWrap" style="position: relative;display:inline-block;">
									<input id="startTimeStr" type="text" name="startTimeStr" class="filterData form-control" placeholder="年-月-日" style="width: 200px; display: inline-block; padding-right: 25px;"  >
								</div>
							</div>
							<div class="inputTab">
								<span>部门名称：</span>
								<div class="inputWrap" style="position: relative;display:inline-block;">
									<input id="filterOutName" type="text"  class="form-control" style="width: 200px; display: inline-block; padding-right: 25px;">
								</div>
							</div>
							<div class="inputTab">
								<span>单据编号：</span>
								<div class="inputWrap" style="position: relative;display:inline-block;">
									<input id="selBillsCode" type="text" name="selBillsCode" class="filterData" style="width: 200px; display: inline-block; padding-right: 25px;">
								</div>
							</div>
							<div class="inputTab">
								<span>结束日期：</span>
								<div class="inputWrap" style="position: relative;display:inline-block;">
									<input id="endTimeStr" type="text" name="endTimeStr" class="filterData" placeholder="年-月-日" style="width: 200px; display: inline-block; padding-right: 25px;" >
								</div>
							</div>
							<div class="inputTab">
								<span>仓库名称：</span>
								<div class="inputWrap" style="position: relative;display:inline-block;">
								  <select id="filterStorageName" style="width: 200px; display: inline-block; padding-right: 25px;"></select>
								</div>
							</div>
							<div class="inputTab">
								<span>往来单位：</span>
								<div class="inputWrap filterCheck" style="position: relative;display:inline-block;">
									<input id="filterContactName" type="text"  class="form-control" style="width: 200px; display: inline-block; padding-right: 25px;">
									<input  type="checkbox" style="display:none"/>
								</div>
							</div>
							<div class="inputTab">
								<span style="width:70px;display:inline-block;padding-left:2px;letter-spacing:3px;">单备注：</span>
								<div class="inputWrap" style="position: relative;display:inline-block;">
									<input id="selRemark" type="text" name="selRemark" class="filterData" style="width: 200px; display: inline-block; padding-right: 25px;">
							   	</div>
							</div>
							<div class="inputTab">
								<span>串&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
								<div class="inputWrap" style="position: relative;display:inline-block;">
									<input id="selImei" type="text" name="selImei" class="filterData" style="width: 200px; display: inline-block; padding-right: 25px;">
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="filSearch" type="button" class="btn btn-success">查询</button>
				<button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
				<button id="filReset" type="button" class="btn btn-warning reset">重置</button>
			</div>
		</div>
	</div>
</div>

	 <div id="collapseExample" class="pageBillBottom gridBottom mt10">
		 <form role="form" id="bottomForm">
			 <div class="clearfix form-inline">
				 <div class="form-group">
					 <label>公司名称：</label>
					 <input id="footerCompany" type="text" class="form-control" disabled="disabled">
				 </div>
				 <div class="form-group">
					 <label >制单人：</label>
					 <input id="footerCreate" type="text" class="form-control" disabled="disabled">
				 </div>
				 <div class="form-group">
					 <label>修改人：</label>
					 <input type="text"  id="footerUpdate" class="form-control"disabled="disabled">
				 </div>
				 <div class="form-group">
					 <label>过账人：</label>
					 <input id="footerPost" type="text" class="form-control"  disabled="disabled">
				 </div>
				 <div class="form-group">
					 <label>红冲人：</label>
					 <input  id="footerBack"  type="text" class="form-control"  disabled="disabled">
				 </div>
			 </div>
		 </form>
	 </div>

<jsp:include  page="../../inventoryInclude/foot.jsp"/>