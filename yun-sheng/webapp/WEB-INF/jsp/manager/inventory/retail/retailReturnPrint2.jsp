<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
	<script src="${basePath}/js/inventory/retail/retailReturnPrint2.js?v=${version}"></script>
	<link rel="stylesheet" href="${basePath}/css/inventory/retail/retailBill.css?v=${version}"/>
    <title>零售退货打印</title>
    <style type="text/css">
		td{text-align: center;}
		.plft,.prig{height: 400px;width: 50%;float: left;text-align: center;cursor: pointer;}
		.plft:hover,.prig:hover{background: #ccc}
		.pdbox{height: 60px;line-height: 60px;font-size: 20px;font-weight: 600;}
		.plft img,.prig img{height: 300px;width:80%}
	</style>
    </head>
<body>
<div class="retailContainer">
	<input type="hidden" id="billsId" value="${bId}" />
    <div class="retailContainerTop">
        <div class="none" id="MENU_CODE">LSTHD</div>
    		<div id="AUTH" data-code="LSKD" class="btn-group btnHundred">
                <button type="button" class="btn btn-default B_LSTHD_0007 none inlineBlock" id="newBills">新开单</button>
                <button type="button" class="btn btn-default navbar-btn inlineBlock" data-toggle="modal" data-target="#printModal">打印</button>
                <button type="button" class="btn btn-default B_LSTHD_0017 none inlineBlock" id="saveModify">保存修改</button>
                <button type="button" class="btn btn-default B_LSTHD_0001 none inlineBlock hisbill" style="float:right;">历史单据</button>
            </div>
        <div class="retailNav">
            <div class="form-inline">
            	<div class="form-group col-sm-3">
				    <label for="storeInput" class='width-25'>单据编号:</label>
				    <div class="input-group col-sm-8 billnum">
				    </div>	
			    </div>
            	<div class="form-group col-sm-3">
				    <label for="storeInput" class='width-25'>门店:</label>
				    <div class="input-group col-sm-8 storeInput">
				    </div>	
			    </div>
			    <div class="form-group col-sm-3">
				    <label for="saleInput" class='width-25'>营业员:</label>
				    <div class="input-group col-sm-8 saleInput">
				    </div>	
			    </div>
			    <div class="form-group col-sm-3">
				    <label for="storeInput" class='width-25'>单据日期:</label>
				    <div class="input-group col-sm-8 dateInput">
				    </div>	
			    </div>
			    <div class="form-group col-sm-3">
				    <label for="retailCardNum" class="width-25">客户电话:</label>
				    <div class="input-group col-sm-8 viptel">
				    </div>	
			    </div>
			    <div class="form-group col-sm-3">
				    <label for="retailCardNum" class="width-25">客户姓名:</label>
				    <div class="input-group col-sm-8 vipname">
				    </div>	
			    </div>
			    <div style="clear:both;"></div>
            </div>

        </div>
    </div>
    <div class="productEentry ml20">
        <div class="productEntryHeader">
            <span style="font-size: 22px;"><span class="glyphicon glyphicon-th-large"></span>&nbsp;&nbsp;商品录入</span>
        </div>
  
        <div class="productTable">
            <table id="productInfoTable" class="table table-bordered table-hover">
                <thead>
                    <tr >
                        <th class="text-center" style="width:50px">序号</th>
                        <th class="text-center" style="width:50px">赠品</th>
                        <th class="text-center" style="width:150px">入库仓库</th>
                        <th class="text-center" style="width:300px"><span>*</span>商品信息</th>
                        <th class="text-center" style="width:180px">主串号 </th>
                        <th class="text-center" style="width:180px">辅串号 </th>
                        <th class="text-center" style="width:100px"><span>*</span>数量</th>
                        <th class="text-center" style="width:100px">退款金额</th>
                        <th class="text-center" style="width:150px">营业员1</th>
                        <th class="text-center" style="width:150px">营业员2</th>
                        <th class="text-center" style="width:120px">合约机</th>
                        <th class="text-center" style="width:50px">分期</th>
                        <th class="text-center" style="width:100px">标价</th>
                        <th class="text-center" style="width:100px">原单单价</th>
                        <th class="text-center" style="width:100px">原单金额</th>
                        <th class="text-center" style="width:120px">备注</th>
                    </tr>
                </thead>
	                <tbody>
	                </tbody>
                <tfoot>
                  <tr class="text-center productSum" >
                    <td colspan="2">合计</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="t1_sl"></td>
                    <td class="t1_je"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="carrierBusiness ml20">
      <div class="carrBusinHeader ">
        <span class="hideImg" id="carrierImg"><img src="../../../images/hide.png"/><img src="../../../images/show.png" style="display:none"/></span><span>运营商业务</span>
      </div>
      <div class="carrBusin" style="display: block;">
          <table id="carrBusinTable" class="zxsaastable table table-bordered table-hover retail-table1">
            <thead>
                    <tr>
                        <th class="text-center" style="width:50px">序号</th>
                        <th class="text-center"><span>*</span>运营商往来单位</th>
                        <th class="text-center"><span>*</span>业务名称</th>
                        <th class="text-center">原单收款</th>
                        <th class="text-center">退款金额</th>
                        <th class="text-center">业务号</th>
                       	<th class="text-center"><span>*</span>营业员1</th>
                        <th class="text-center">营业员2</th>
                        <th class="text-center">电话号码</th>
                        <th class="text-center">手机串号</th>
                        <th class="text-center">退保证金</th>
                        <th class="text-center">佣金预估</th>
                        <th class="text-center">备注</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
                <tfoot class="text-center">
                    <tr>
	                    <td colspan="2">合计</td>
	                    <td></td>
	                    <td></td>
	                    <td class="t2_je"></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                </tr>
                </tfoot>
          </table>
     	</div>
    </div>
    
    <div class="Value-addedServices ml20">
      <div class="Value-addedHeader">
        <span class="hideImg" id="Value-addedImg"><img src="../../../images/hide.png"/><img src="../../../images/show.png" style="display:none"/></span><span>增值服务</span>
      </div>
      <div class="Value-added" style="display: block;">
          <table id="Value-addedTable" class="zxsaastable table table-bordered table-hover retail-table1">
          	<thead>
                    <tr>
                        <th class="text-center" style="width:50px">序号</th>
                        <th class="text-center"><span>*</span>增值服务名称</th>
                        <th class="text-center"><span>*</span>营业员1</th>
                        <th class="text-center">退款金额</th>
                        <th class="text-center">生效日期</th>
                        <th class="text-center">原单收款</th>
                        <th class="text-center">有限期限</th>
                        <th class="text-center">效用期内使用次数</th>
                        <th class="text-center">商品名称</th>
                        <th class="text-center">手机串号</th>
                        <th class="text-center">预设售价</th>
                        <th class="text-center">会员价</th>
                        <th class="text-center">营业员2</th>
                        <th class="text-center">服务流水号</th>
                        <th class="text-center">备注</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
                <tfoot class="text-center">
                    <tr>
	                    <td colspan="2">合计</td>
	                    <td></td>
	                    <td class="t3_tk"></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
                    </tr>
                </tfoot>
          </table>
      </div>
    </div>
    
    <div class="ThirdpartyDiscount ml20">
      <div class="DiscountHeader">
        <span class="hideImg" id="discountImg"><img src="../../../images/hide.png"/><img src="../../../images/show.png" style="display:none"/></span><span>第三方抵扣</span>
      </div>
      <div class="Discount" style="display: block;">
          <table id="DiscountTable" class="zxsaastable table table-bordered table-hover retail-table1">
          	<thead>
                    <tr>
                        <th class="text-center" style="width:50px">序号</th>
                        <th class="text-center"><span>*</span>往来单位</th>
                        <th class="text-center"><span>*</span>活动名称</th>
                        <th class="text-center">原单抵现</th>
                        <th class="text-center">退回金额</th>
                        <th class="text-center">业务号</th>
                        <th class="text-center">营业员1</th>
                        <th class="text-center">营业员2</th>
                        <th class="text-center">备注</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot class="text-center">
                    <tr>
	                    <td colspan="2">合计</td>
	                    <td></td>
	                    <td></td>
	                    <td class="t4_th"></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                </tr>
                </tfoot>
          </table>
      </div>
    </div>
    
    <div class="StaBusiness ml20">
      <div class="StaBusinessHeader">
        <span class="hideImg" id="StaBusinessImg"><img src="../../../images/hide.png" class="hideImg"/><img src="../../../images/show.png" style="display:none" class="showImg"/></span><span>分期业务</span>
      </div>
      <div class="StaBu" style="display: block;">
          <table id="StaBuTable" class="zxsaastable table table-bordered table-hover retail-table1">
          	<thead>
                    <tr>
                        <th class="text-center" style="width:50px">序号</th>
                        <th class="text-center" style="width:120px"><span>*</span>退款方式</th>
                        <th class="text-center"><span>*</span>分期商名称</th>
                        <th class="text-center" style="width:120px"><span>*</span>业务名称</th>
                        <th class="text-center"><span>*</span>分期金额</th>
                        <th class="text-center"><span>*</span>首付金额</th>
                        <th class="text-center">分期数</th>
                        <th class="text-center">分期贷款金额</th>
                        <th class="text-center"><span>*</span>退款金额</th>
                        <th class="text-center">预计佣金</th>
                        <th class="text-center"><span>*</span>营业员1</th>
                        <th class="text-center">营业员2</th>
                        <th class="text-center">合同号</th>
                        <th class="text-center">串号</th>
                        <th class="text-center">月供</th>
                        <th class="text-center">备注</th>
                    </tr>
                </thead>
                <tbody>
              
                </tbody>
                <tfoot class="text-center">
                    <tr>
		                <td colspan="2">合计</td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td class="t5_tk"></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
	                    <td></td>
		                </tr>
                </tfoot>
          </table>
      </div>
    </div>
    
<div class="retailFooter row">
      <div class="col-md-10">
        <div class="row amountHeight">
            <div class="col-md-2">
                <span class="nameCss">原单总金额:</span>
                <span class="billsAmount">0.00</span>
            </div>
            <div class="col-md-2">
            	<span class="nameCss">应退款总计:</span>
                <span class="retailDeposit">0.00</span>
            </div>
            <div class="col-md-2">
            	<span class="nameCss">抹零金额:</span>
                <span class="reduceAmout">0.00</span>
            </div>
            <div class="col-md-4">
            	<span class="nameCss">原单编号:</span>
                <span class="arrialAmount"></span>
            </div>
            <div class="col-md-2" style="font-size: 22px;color: #ff6602;">
            	<span class="nameCss">应退:</span>
            	<span class="amountDue">0.00</span>
            </div>
        </div>
        <div class="row amountHeight">
            <div>
                <div class="row priceHeight">
	            <div class="col-md-2" >
                	<span class="nameCss">现金:</span>
                	<span class="retailAmount">0.00</span>
	            </div>
                <div class="col-md-2">
                   	<span class="nameCss">POS:</span>
                    <span class="posAmount">0.00</span>
                </div>
                <div class="col-md-2">
                   	<span class="nameCss">支付宝:</span>
                   	<span class="alipayAmount">0.00</span>
                </div>
                <div class="col-md-2">
                   	<span class="nameCss">微信:</span>
                   	<span class="wxAmount">0.00</span>
                </div>
               	<div class="col-md-2">
                   	<span class="nameCss">其他账户:</span>
                   	<span class="otherAccount">0.00</span>
                </div>
                <div class="col-md-2 priceHeight" style="font-size:22px;color:#5184F0;">
                	<span class="nameCss">退款:</span>
                	<span class="paidAmount">0.00</span>
                </div>
            </div>
                <div class="row priceHeight">
                   
                    <div class="col-md-2">
                       	<span class="nameCss">促销券:</span>
                       	<span class="promotionalCoupons">0.00</span>
                    </div>
                    <div class="col-md-2">
                    	<span class="nameCss">会员储值:</span>
                        <span class="memberStoredValue">0.00</span>
                    </div>
                    <div class="col-md-2">
                    	<span class="nameCss">积分抵现:</span>	
                        <span class="pointArrived">0.00</span>
                    </div>
                    <div class="col-md-4">
	                    <span class="nameCss">备注:</span>
		                <span><input class="form-control retailRemark" style="display: inline-block;width: 70%;" /><span>
	                </div>
	                 <div class="col-md-2 priceHeight" style="font-size:22px;color:#5184F0;">
                    	<span class="nameCss">未退:</span>
                    	<span class="arrears">0.00</span>
                    </div>
                </div>
        	</div>
        </div>
    </div>
    </div>
</div>


<!-- 打印Modal -->
<div class="modal fade" id="printModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">打印模板</h4>
      </div>
      <div class="modal-body">
        <div class="plft">
        	<div class="pdbox">A4页</div><img src="/manager/images/lingshou/a4.png" />
        </div>
        <div class="prig">
        	<div class="pdbox">小票</div><img src="/manager/images/lingshou/xp.png" />
        </div>
      </div>
    </div>
  </div>
</div>

<jsp:include  page="../../inventoryInclude/foot.jsp"/>