<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
	
    <title>盘点结果明细</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/inventory/basis/app/device.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/select2.min.css" />
    <script src="${basePath}/js/select2.full.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/inventory/stocktaking/detail.js?v=${version}"></script>
    </head>
 <body>
    <!-------------------------------------主页面开始----------------------------------------->
    <div id="AUTH" data-code="PDD"><input type="hidden" id="inventoryId" value="${bills.id}" /></div>
    <div class="well header">
	<!--第一行-->
        <div class="row">
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="">盘点部门：</label></div>
                    <div class="col-md-8">
                    	<input type="text" class="form-control sectionName" ids="${bills.sectionId}" value="${bills.sectionName}" readonly />
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="">单据编号：</label></div>
                    <div class="col-md-8">
                    	<input type="text" class="form-control billsCode" value="${bills.billsCode}" readonly />
                   	</div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="">经手人：</label></div>
                    <div class="col-md-8">
                    	<input type="text" class="form-control managersName" value="${bills.managersName}" readonly />
                   	</div>
                </div>
            </div>
        </div>
        
        <!--第二行-->
        <div class="row">
        	<div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="">系统库存时间：</label></div>
                    <div class="col-md-8">
                    	<input type="text" class="form-control billsDate" value="${bills.sysStockDateStr}" readonly />
                   	</div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="">盘点仓库：</label></div>
                    <div class="col-md-8">
						<select class="js-example-basic-multiple form-control select2" multiple="multiple" id="mainStorage">
						</select>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="">商品类别：</label></div>
                    <div class="col-md-8">
				 		  <input type="text" class="form-control" id="goodsTypeInput" />
					      <span class="input-group-addon goodStyleSpan" data-toggle="modal" data-target="#goodsType">
					      		<span class="glyphicon glyphicon-plus"></span>
					      </span>
                   	</div>
                </div>
            </div>
        </div>
        
        <!--第三行-->
        <div class="row">
        	<div class="col-sm-4">
	            <div class="row">
	                <div class="col-md-4"><label for="">盘点结果：</label></div>
	                <div class="col-md-8">
	                	<select class="form-control pdResult">
				          	<option value="0">全部</option>
				          	<option value="1">仅盘盈</option>
				          	<option value="2">仅盘亏</option>
				          	<option value="3">仅盘盈盘亏</option>
				          	<option value="4">仅匹配</option>
	                 </select>
	               	</div>
	            </div>
	        </div>
            <div class="col-sm-4">
            	<div class="row">
	            	<div class="col-md-4"><label for="">关键字：</label></div>
	                <div class="col-md-8">
	                	<input type="text" class="form-control keyWord" placeholder="输入串号标识/商品备注/商品名称/商品编码/品牌/颜色/型号查询">
	               	</div>
               	</div>
            </div>
            <div class="col-sm-4">
                <button type="button" class="btn search">查询</button>
        		<button type="button" class="btn derive">导出</button>
            </div>
        </div>
        
    </div>
    
<!--表格开始-->
    <div class="jqGrid_wrap">
		<table id="dataGrid"></table> 
 			<div id="jqGridPager"></div>
	</div>
	
	 <!--商品种类弹出窗-->
   <div class="modal fade" id="goodsType" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" >
                <div class="modal-header">
                	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"> ×</button>
                    <h4 class="modal-title">商品类别</h4>
                </div>
                <div class="modal-body" style="min-height:300px;">
                	<ul id="goodsTypeZtree" class="ztree"></ul>
                </div>
                 <div class="modal-footer">
                	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
       				 <button type="button" class="btn btn-primary" id="saveGoodsType">保存</button>
                </div>
            </div>
        </div>
    </div>
	
 </body>
</html>
