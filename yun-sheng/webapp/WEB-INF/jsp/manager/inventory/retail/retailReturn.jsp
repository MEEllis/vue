<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
	<script src="${basePath}/js/inventory/retail/retailReturn.js?v=${version}"></script>
	<link rel="stylesheet" href="${basePath}/css/inventory/retail/retailBill.css?v=${version}"/>
    <title>零售退货单</title>
<style>
    .paymentAmount{
        width:50%
    }
</style>
    </head>
<script>
    var unitId = "${unit.id}";
    var unitName = "${unit.name}";
</script>
<body>
<div class="retailContainer">
    <div class="none" id="MENU_CODE">LSTHD</div>
    <div class="retailContainerTop">
    			<div id="AUTH" data-code="LSTHD" class="btn-group btnHundred">
                <button type="button" class="btn btn-default B_LSTHD_0007 none inlineBlock" id="newBills">新开单</button>
                <button type="button" class="btn btn-default B_LSTHD_0001 none inlineBlock hisbill" style="float:right;">历史单据</button>
            </div>
        <div class="retailNav">
            <form action="" class="form-inline">
            	<div class="form-group col-sm-3">
				    <label for="storeInput" class='width-25'>门店:</label>
				    <div class="input-group col-sm-8">
				      <input type="text" class="form-control" id="storeInput" placeholder="请选择门店">
				    </div>	
			    </div>
			    <div class="form-group col-sm-3">
				    <label for="saleInput" class='width-25'>营业员:</label>
				    <div class="input-group col-sm-8">
				      <input type="text" class="form-control" id="saleInput" placeholder="请选择营业员">
				    </div>	
			    </div>
			    <div class="form-group col-sm-3">
				    <label for="storeInput" class='width-25'>业务日期:</label>
				    <div class="input-group col-sm-8">
				      <input type="text" class="form-control" id="dateInput" placeholder="请选择业务日期">
				    </div>	
			    </div>
                <div class="form-group col-sm-3">
                    <label for="contactsunitId" class='width-25'>往来单位:</label>
                    <div class="input-group col-sm-8">
                        <input type="text" class="form-control" id="contactsunitId" placeholder="请选择往来单位">
                    </div>
                </div>
			    <div class="form-group col-sm-3">
				    <label for="retailCardNum" class="width-25">手机号:</label>
				    <div class="input-group col-sm-8">
				      <input type="text" class="form-control" id="retailCardNum" maxlength="11" placeholder="请输入手机号">
				    </div>	
			    </div>
			    <div style="clear:both;"></div>
			    <div class="saveBillsId" style="display:none"><input type="text" id="retailBillsId" /></div>
			    <div class="saveBillsId" style="display:none"><input type="text" id="retailId" value ="${bId}" /></div>
			    <input type="hidden" id="operateType" value="${operateType}" />
            </form>

        </div>
    </div>
    <div class="productEentry ml20">
        <div class="productEntryHeader">
            <span style="font-size: 22px;"><span class="glyphicon glyphicon-th-large"></span>&nbsp;&nbsp;商品录入</span>
            <span>
            	<button class="btn btn-default" style="background:#fff;border-radius:5px" id="addProduct"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;新增行</button>
            </span>
           <span>
            	<button class="btn btn-default" style="background:#fff;border-radius:5px" id="importOrBills"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;原单引入</button>
            </span>
        </div>
        <div class="productTable">
            <table id="productInfoTable" class="table table-bordered  retail-table1">
                <thead>
                    <tr >
                        <th class="text-center" style="width:40px"></th>
                        <th class="text-center" style="width:50px">序号</th>
                        <th class="text-center" style="width:50px">赠品</th>
                        <th class="text-center" style="width:150px"><select class="form-control stroageSelect"></select></th>
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
                <tr class="text-center addproductInfo" id="addproductInfo_1">
                 	<td class="delProduct"><span class="glyphicon glyphicon-trash"></span></td>
                    <td class="productRowNumber">1</td>
                    <td ><input type="checkbox" class="changeGift"/><span class="proOrderId" style="display:none"></span></td>
                    <td ><select class="form-control stroageSelect"></select></td>
                    <td class="productInfo" style="width:280px">
                    	<div><span style="display:inline-block;width:220px"><input type=text class="form-control productInfoName" placeholder="商品名称、编码、助记码" disabled/></span>&nbsp;&nbsp;
                    	<span class="goodsId" style="display:none"></span>
                    	<span class="imeiManage" style="display:none"></span>
                    	<span class="glyphicon glyphicon-edit editProduct" style="color:#5184f0;font-size:20px;cursor:pointer"></span>
                    	</div>
<!--                    	<div style="width:100%;height:auto;line-height:28px;text-align:left;overflow:hidden;font-size: 12px;">-->
<!--                    		<div style="width:140px;float:left;padding:10px 0 5px"><span>编码 :</span><span class="productCode"></span></div>-->
<!--                    		<div style="width:140px;float:left;padding:10px 0 5px"><span>型号 :</span><span class="productModel"></span></div>-->
<!--                    		<div style="width:90px;float:left;padding:5px 0"><span>颜色 :</span><span class="productColor"></span></div>-->
<!--                    		<div style="width:90px;float:left;padding:5px 0"><span>类别 :</span><span class="productCatory"></span></div>-->
<!--                    		<div style="width:90px;float:left;padding:5px 0"><span>配置 :</span><span class="productconfig"></span></div>-->
                    </td>
                    <td class="imeiInfo"><input type="text" class="form-control inputImeiInfo" readonly  placeholder="请输入主串号" /><span class="imeiMange" style="display:none"></span></td>
                    <td class="auxImeiInfo"><input type="text" class="form-control inputAuxImeiInfo" readonly placeholder="请输入辅串号" /></td>
                    <td class="productNumber" style="width:100px"><input type="text" class="form-control inputProductNum" readonly onkeyup="checkInput.clearNoNum(this,10)" /></td>
                    <td class="returnProductprice" style="width:100px"><input type="text" class="form-control inputReturnProductPrice" onkeyup="checkInput.checkNum(this,12)" readonly/></td>
                    <td class="salesperson1">
                    	  <div class="form-group" style="margin:0;">
							    <div class="input-group">
							      <input type="text" class="form-control saleInput1"  placeholder="请选择营业员" readonly/>
							    </div>	
						    </div>
                    </td>
                    <td class="salesperson2"> <div class="form-group" style="margin:0;">
							    <div class="input-group">
							      <input type="text" class="form-control saleInput2"  placeholder="请选择营业员" readonly/>
							    </div>	
						    </div>
					</td>
                    <td class="businessMac">
                    	<select class="form-control selectpicker"></select>
                    </td>
                    <td class="staging"><input type="checkbox" class="stagingCheck" disabled/></td>
                    <td class="productPrice"></td>
                     <td class="originalUnitPrice" style="width:100px"></td>
                    <td class="originalAmount" style="width:100px"></td>
                    <td class="productRemark"><input type="text" class="form-control" readonly/></td>
                </tr>
                <tr class="text-center addGifts addGiftslastRow" id="addGifts_1" >
                    <td></td>
                    <td></td>
                    <td><input type="checkbox" disabled/></td>
                    <td></td>
                    <td style="color:#1878c7;cursor:pointer"><span class="glyphicon glyphicon-plus-sign addGiftsButton">&nbsp;&nbsp;添加赠品</span></td>
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
                    <td></td>
                </tr>
                </tbody>
                <tfoot>
                  <tr class="text-center productSum" >
                    <td></td>
                    <td colspan="3">合计</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="protabsum"></td>
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
        <span><button class="btn btn-default" style="background:#fff;border-radius:5px" id="addcarrRow"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;新增行</button></span>
      </div>
      <div class="carrBusin">
          <table id="carrBusinTable" class="zxsaastable table table-bordered  retail-table1">
            <thead>
                    <tr>
                        <th class="text-center" style="width:20px"></th>
                        <th class="text-center" style="width:50px">序号</th>
                        <th class="text-center"><span>*</span>运营商往来单位</th>
                        <th class="text-center"><span>*</span>业务名称</th>
                        <th class="text-center">原单收款</th>
                        <th class="text-center">退款金额</th>
                        <th class="text-center" style="width:100px"><span>*</span>数量</th>
                        <th class="text-center" style="width:100px;">预估佣金(笔)</th>
                        <th class="text-center" style="width:100px">佣金金额</th>
                        <th class="text-center">业务号</th>
                       	<th class="text-center"><span>*</span>营业员1</th>
                        <th class="text-center">营业员2</th>
                         <th class="text-center">电话号码</th>
                        <th class="text-center">手机串号</th>
                        <th class="text-center">退保证金</th>
                        <th class="text-center">备注</th>
                    </tr>
                </thead>
                <tbody>
                <tr class="text-center carrBusinRow" id="carrBusinRowNum_1">
                 	<td><span class="glyphicon glyphicon-trash carrDelete"></span><span class="carrId" style="display:none"></span></td>
                    <td class="carrRowNumber">1</td>
                    <td class="carrSelectUnit" >
                    	<select class="form-control carrBusinSelectUnit"></select>
                    </td>
                    <td class="carrSelectName" >
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control carrSlectNameInput"  placeholder="请选择业务名称">
                            </div>
                        </div>
                       <%--<select class="form-control carrSlectNameOption"></select>--%>
                    </td>
                    <td class="originalSingleAmount"><input type="text" class="form-control inputOriginalAmount"  onkeyup="checkInput.checkNum(this,12)" disabled/></td>
                    <td class="refundsAmount"><input type="text" class="form-control inputrefundsAmount"  onkeyup="checkInput.checkNum(this,12)"/></td>

                    <td class="qty"><input type="text" class="form-control inputqty"  onkeyup="checkInput.clearNoNum(this,12)"/></td>
                    <td class="commission"><input type="text" readonly="readonly" class="form-control inputcommission "  onkeyup="checkInput.checkNumFu(this,12)"/></td>
                    <td class="comissionEsit"><input type="text" class="form-control inputcomissionEsit"  onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td class="businessNum"><input type="text" class="form-control"/></td>
                   	<td class="carrBusinSale1">
                    	<div class="form-group" style="margin:0;">
							    <div class="input-group">
							      <input type="text" class="form-control carrSaleInput1"  placeholder="请选择营业员">
							    </div>	
						    </div>
                    </td>
                    <td class="carrBusinSale2">
                    	<div class="form-group" style="margin:0;">
							    <div class="input-group">
							      <input type="text" class="form-control carrSaleInput2"  placeholder="请选择营业员">
							    </div>	
						    </div>
                    </td>
                     <td class="carrTelephone"><input type="text" class="form-control"/></td>
                    <td class="telephoneImei"><input type="text" class="form-control"/></td>
                    <td class="discountMargin"><input type="text" class="form-control inputdiscountMargin"  onkeyup="checkInput.checkNum(this,12)"/></td>

                    <td class="carrRemark"><input type="text" class="form-control"/></td>
                </tr>
                </tbody>
                <tfoot class="text-center">
                  	<td></td>
                    <td colspan="3">合计</td>
                    <td id="carrTotal_1">0</td>
                    <td id="carrTotal_2">0</td>
                    <td id="carrTotal_3">0</td>
                    <td></td>
                    <td id="carrTotal_4">0</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td id="carrTotal_5">0</td>
                    <td></td>
                </tfoot>
          </table>
     	</div>
    </div>
    <div class="Value-addedServices ml20">
      <div class="Value-addedHeader">
        <span class="hideImg" id="Value-addedImg"><img src="../../../images/hide.png"/><img src="../../../images/show.png" style="display:none"/></span><span>增值服务</span>
      </div>
      <div class="Value-added">
          <table id="Value-addedTable" class="zxsaastable table table-bordered  retail-table1">
          	<thead>
                    <tr>
                        <th class="text-center" style="width:20px"></th>
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
                        <th class="text-center">备注</th>
                        <th class="text-center">服务流水号</th>
                    </tr>
                </thead>
                <tbody>
                <tr class="text-center addValueService" id="addValueService_1">
                 	<td><span class="glyphicon glyphicon-trash valueDelete"></span><span class="addValueId" style="display:none"></span></td>
                    <td class="valueRowNumber">1</td>
                    <td class="valueSelectName"><span class="addValueSelectName"></span><span class="addValueSelectId" style="display:none"></span></td>
                    <td class="addValuesalesPeople1"><span class="addValueSaleInput1"></span><span class="addValueSaleInputId" style="display:none"></span></td>
                    <td class="realPayment"><input type="text" class="form-control realPaymentInput" onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td class="bissDate"></td>
                    <td class="originalCollection"></td>
                    <td class="limitDate"></td>
                    <td class="usageCount"></td>
                     <td class="addValueProductName"><span></span><span style="display:none"></span></td>
                     <td class="phoneImei"><span></span><span style="display:none"></span></td>
                    <td class="esitPrice"></td>
                    <td class="valuePrice"></td>
                   	<td class="addValuesalesPeople2"><span class="addValueSaleInput2"></span><span class="addValueSaleInput2Id" style="display:none"></span></td>
                    <td class="valueRemark"><input type="text" class="form-control"/></td>
                    <td class="serviceNumber"></td>
                </tr>
                </tbody>
                <tfoot class="text-center">
                  	<td></td>
                    <td colspan="2">合计</td>
                    <td></td>
                    <td>0</td>
                    <td></td>
                    <td>0</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tfoot>
          </table>
      </div>
    </div>
    <div class="ThirdpartyDiscount ml20">
      <div class="DiscountHeader">
        <span class="hideImg" id="discountImg"><img src="../../../images/hide.png"/><img src="../../../images/show.png" style="display:none"/></span><span>第三方抵扣</span>
        <span><button class="btn btn-default" style="background:#fff;border-radius:5px" id="discount"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;新增行</button></span>
      </div>
      <div class="Discount">
          <table id="DiscountTable" class="zxsaastable table table-bordered  retail-table1">
          	<thead>
                    <tr>
                        <th class="text-center" style="width:20px"></th>
                        <th class="text-center" style="width:50px">序号</th>
                        <th class="text-center"><span>*</span>往来单位</th>
                        <th class="text-center"><span>*</span>活动名称</th>
                        <th class="text-center">原单抵现</th>
                        <th class="text-center">退回金额</th>
                        <th class="text-center">注销结算金额</th>
                        <th class="text-center">业务号</th>
                        <th class="text-center">营业员1</th>
                        <th class="text-center">营业员2</th>
                        <th class="text-center">备注</th>
                    </tr>
                </thead>
                <tbody>
                <tr class="text-center thirdDiscount" id="thirdDisount_1">
                 	<td><span class="glyphicon glyphicon-trash dissountDelete"></span><span class="thirdDiscountId" style="display:none"></span></td>
                    <td class="discountRowNumber">1</td>
                    <td class="discountSelectUnit">
                    	<select class="form-control discountSelectUnitOption"></select>
                    </td>
                    <td class="discountActiveName">
                    	<select class="form-control discountActiveNameOption"></select>
                    </td>
                    <td class="thirdDiscountAmount"><input type="text" class="form-control thirdDiscountAmountInput" onkeyup="checkInput.checkNum(this,12)" disabled/></td>
                    <td class="thirdReturnAmount"><input type="text" class="form-control inputthirdReturnAmount" onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td class="settleAmount"><input type="text" class="form-control settleAmountInput" onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td class="thirdBusinNum"><input type="text" class="form-control"/></td>
                    <td class="thirdSales1">
                    	<div class="form-group" style="margin:0;">
							    <div class="input-group">
							      <input type="text" class="form-control thirdSaleInput1"  placeholder="请选择营业员">
							    </div>	
						    </div>
                    </td>
                    <td class="thirdSales2">
                    	<div class="form-group" style="margin:0;">
							    <div class="input-group">
							      <input type="text" class="form-control thirdSaleInput2"  placeholder="请选择营业员">
							    </div>	
						    </div>
                    </td>
                    <td class="discountRemark"><input type="text" class="form-control"/></td>
                </tr>
                </tbody>
                <tfoot class="text-center">
                  	<td></td>
                    <td colspan="2">合计</td>
                    <td></td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tfoot>
          </table>
      </div>
    </div>
    <div class="StaBusiness ml20">
      <div class="StaBusinessHeader">
        <span class="hideImg" id="StaBusinessImg"><img src="../../../images/hide.png" class="hideImg"/><img src="../../../images/show.png" style="display:none" class="showImg"/></span><span>分期业务</span>
        <span><button class="btn btn-default" style="background:#fff;border-radius:5px" id="stagingBusin"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;新增行</button></span>
      </div>
      <div class="StaBu">
          <table id="StaBuTable" class="zxsaastable table table-bordered  retail-table1">
          	<thead>
                    <tr>
                        <th class="text-center" style="width:20px"></th>
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
                        <th class="text-center">备注</th>
                        <th class="text-center">月供</th>
                    </tr>
                </thead>
                <tbody>
                <tr class="text-center stagingRow" id="stagingRow_1">
                 	<td><span class="glyphicon glyphicon-trash stagDelete"></span><span class="stagingId" style="display:none"></span></td>
                    <td class="stagRowNumber">1</td>
                    <td class="refundMethod">
                    	<select class="form-control inputRefundMethod">
                    		<option value="1">现金退款</option>
                    		<option value="2">注销分期</option>
                    	</select>
                    </td>
                    <td class="stagSelectUnit">
                    	<select class="form-control stagSelectOption"></select>
                    </td>
                    <td class="stagBusinessName">
                    	<select class="form-control stagBusinessNameOption"></select>
                    </td>
                    <td><input type="text" class="form-control stagingAmount" onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td><input type="text" class="form-control firstPayAmount" onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td><input type="text" class="form-control stagingNumber" onkeyup="checkInput.checkPositiveInteger(this)"/></td>
                    <td class="stagingLoadAmount"></td>
                    <td><input type="text" class="form-control stagingRefundAmount" onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td><input type="text" class="form-control commission" onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td class="stagingSales1">
                    	<div class="form-group" style="margin:0;">
							    <div class="input-group">
							      <input type="text" class="form-control stagingSaleInput1"  placeholder="请选择营业员">
							    </div>	
						    </div>
                    </td>
                    <td class="stagingSales2">
                    	<div class="form-group" style="margin:0;">
							    <div class="input-group">
							      <input type="text" class="form-control stagingSaleInput2"  placeholder="请选择营业员">
							    </div>	
						    </div>
                    </td>
                    <td><input type="text" class="form-control contractNo" /></td>
                    <td><input type="text" class="form-control imeiNo" /></td>
                    <td class="stagRemark"><input type="text"  class="form-control"></td>
                    <td class="monthSupply"></td>
                </tr>
                </tbody>
                <tfoot class="text-center">
                  	<td></td>
                    <td colspan="2">合计</td>
                    <td></td>
                    <td></td>
                    <td class="stagingTotalAmount">0</td>
                    <td>0</td>
                    <td></td>
                    <td class="statotalsum">0</td>
                    <td>0</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>0</td>
                </tfoot>
          </table>
      </div>
    </div>
    <div class="retailFooter row">
      <div class="col-md-10">
        <div class="row amountHeight">
            <div class="col-md-2">
                <span class="nameCss">原单总金额:</span>
                <span class="billsAmount">0</span>
            </div><!--
            <div class="col-md-2">
            	<span class="beforeCss">零售定金:</span>
                <span class="retailDeposit">0</span>
                <div style="display:none"><input type="text" id="depositBillsId"/></div>
            </div>
            <div class="col-md-2">
            	<span >分期贷款金额:</span>
                <span class="installMentLoad">0</span>
            </div>
            <div class="col-md-2">
            	<span class="beforeCss">抵现金额:</span>
                <span class="arrialAmount">0</span>
            </div>
            -->
            <div class="col-md-2">
            	<span class="nameCss">应退款总计:</span>
                <span class="shouldRdfunded">0</span>
            </div>
            <div class="col-md-2">
            	<span class="nameCss">抹零金额:</span>
                <span><input type="text" class="form-control inputDisplay" id="wipingAmount" onkeyup="checkInput.checkNum(this,12)"/></span>
            </div>
            <div class="col-md-4">
            	<span class="nameCss">原单编号:</span>
                <span class="originalSingleNum"></span>
                <span class="originalSingleNumId" style="display:none"></span>
            </div>
            <div class="col-md-2" style="font-size: 22px;color: #ff6602;">
            	<span class="nameCss">应退:</span>
            	<span class="amountDue">0</span>
            </div>
        </div>
        <div class="row amountHeight">
            <div>
                <div class="row priceHeight">
	            <div class="col-md-2" >
	                <div>
	                	<span class="nameCss">现金:</span>
	                	<span><input type="text" class="form-control inputDisplay" id="retailAmount" onkeyup="checkInput.checkNum(this,12)" disabled /></span>
	                </div>
	            </div>
                <div class="col-md-2">
                    <div>
                    	<span class="nameCss">POS:</span>
	                    <span class=" posContainer"><input type="text" class="form-control inputDisplay" id="posAmount" onkeyup="checkInput.checkNum(this,12)" disabled/>
	                      <div class="posContentTable">
	                        <table class="table table-bordered table-hover" id="posTable">
	                          <thead>
	                            <tr class="text-center">
	                              <th class="text-center">序号</th>
	                              <th class="text-center">银行</th>
	                              <th class="text-center">收款金额</th>
	                            </tr>
	                          </thead>
	                          <tbody style="position: relative">
	                          </tbody>
	                        </table>
	                        <div class="posButton">
	                        	<button type="button" class="btn btn-info" id="postAmountSure">确定</button>
	                        	<button type="button" class="btn btn-default" id="postAmountNone">取消</button>
	                        </div>
	                        <div class="tableTrangle"></div>
	                      </div>
	                    </span>
                    </div>
                    
                </div>
                <div class="col-md-2">
                    <div>
                    	<span class="nameCss">支付宝:</span>
                    	<span class="otherContainer"><input type="text" class="form-control inputDisplay" id="alipayAmount" onkeyup="checkInput.checkNum(this,12)" disabled/></span>
                    </div>
                    
                </div>
                <div class="col-md-2">
                    <div>
                    	<span class="nameCss">微信:</span>
                    	<span><input type="text" class="form-control inputDisplay" id="microLetterAmount" onkeyup="checkInput.checkNum(this,12)" disabled/></span>
                    </div>
                    
                </div>
                 	<div class="col-md-2">
                        <div>
                        	<span class="nameCss">其他账户:</span>
                        	<span><input type="text" class="form-control inputDisplay" id="otherAccount" disabled/></span>
                        </div>
                        
                        <div class="otherContentTable">
	                        <table class="table table-bordered table-hover" id="otherCounterTable">
	                          <thead>
	                            <tr class="text-center">
	                              <th class="text-center">序号</th>
	                              <th class="text-center">账户</th>
	                              <th class="text-center">收款金额</th>
	                            </tr>
	                          </thead>
	                          <tbody style="position: relative">
	                          </tbody>
	                        </table>
	                        <div class="otherAccountButton">
	                        	<button type="button" class="btn btn-info" id="otherAmountSure">确定</button>
	                        	<button type="button" class="btn btn-default" id="otherAmountNone">取消</button>
	                        </div>
	                        <div class="tableTrangle"></div>
	                      </div>
                    </div>
                    
                    <div class="col-md-2 priceHeight" style="font-size:22px;color:#5184F0;">
                    	<span class="nameCss">退款:</span>
                    	<span class="paidAmount">0</span>
                    </div>
            </div>
                <div class="row priceHeight">
                   
                    <div class="col-md-2 ">
                        <div class="none">
                        	<span class="nameCss">促销券:</span>
                        	<span><input type="text" class="form-control inputDisplay" id="promotionalCoupons" onkeyup="checkInput.checkNum(this,12)" /></span>
                        </div>
                        
                    </div>
                    <div class="col-md-2">
                    	<span class="nameCss">会员储值:</span>
                        <span><input type="text" class="form-control inputDisplay" id="memberStoredValue" onkeyup="checkInput.checkNum(this,12)" disabled/></span>
                    </div>
                    <div class="col-md-2">
                    	<span class="nameCss">积分抵现:</span>	
                        <span><input type="text" class="form-control inputDisplay" id="pointArrived" onkeyup="checkInput.checkNum(this,12)" disabled/></span>
                    </div>
                     <div class="col-md-4">
	                    <span class="nameCss">备注:</span>
		                <span><input class="form-control inputDisplay" id="retailRemark" /><span>
		              
	                </div>
	                <div class="col-md-2 priceHeight" style="font-size:22px;color:#5184F0;">
                    	<span class="nameCss">未退:</span>
                    	<span class="arrears">0</span>
                    </div>
                </div>
                
            <!--<div class="col-md-4">
               
                <div class="col-md-5">
                	<div class="row priceHeight">
                    	<div class="col-md-4">实收:</div>
                    	<div class="col-md-8 paidAmount">0</div>
                    </div>
                    <div class="row priceHeight">
                    	<div class="col-md-4">欠款:</div>
                    	<div class="col-md-8 arrears">0</div>
                    </div>
                </div>
            </div>
        -->
        	</div>
        </div>
    </div>
    <div class="col-md-2">
      <div class="saveButton B_LSTHD_0017 none">保存</div>
     </div>
    </div>
</div>
<!--新增商品模态框-->
<div class="modal" id="myModal"  role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document" style="width:1000px">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">修改商品</h4>
      </div>
      <div class="modal-body" style="overflow:hidden;">
        <div style="width:400px;height:35px;line-height:35px;">
          <div style="width:50px;float:left">查找:</div>
          <div style="width:320px;float:left"><input type="text" class="form-control" placeholder="商品编码、名称、型号、条码" id="retailSearchProduct"></div>
        </div>
        <div style="width:100%;height:auto;overflow:hidden;margin:20px 0px">
          <div style="width:200px;height:400px;float:left;overflow:auto;">
             <ul id="goodsTree" class="ztree"></ul>
          </div>
          <div style="width:760px;height:auto;float:left" id="retailgridProduct1">
            <table id="retailgridProduct" class="zxsaastable"></table>
        	<div id="retailgridPager"></div>
          </div>
      </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary sureButton">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" id="productCancel">取消</button>
      </div>
  </div>
</div>
</div>
<!--关联商品-->
<div class="modal fade" id="RelatedProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
     	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" >关联商品:</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <div class="col-md-4"><label for="recipient-name" class="control-label">请选择关联商品:</label></div>
            <div class="col-md-8"><select class="form-control" id="relateedProductSelect"></select></div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default"  id="relatedProSure">确定</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" id="notRelatedProduct">不关联</button>
      </div>
    </div>
  </div>
</div>
<!--调入草稿单-->
<div class="modal fade" id="counterModal" tabindex="-1" role="dialog" aria-labelledby="counterModalLabel">
  <div class="modal-dialog" role="document"  style="width:800px">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="counterModalLabel">调入草稿单</h4>
      </div>
      <div class="modal-body">
         <div style="width:400px;height:35px;line-height:35px;">
          <div style="width:50px;float:left">搜索:</div>
          <div style="width:320px;float:left"><input type="text" class="form-control" placeholder="商品编码、名称、型号、条码" id="retailSearch"></div>
        </div>
        <div style="width:100%;height:auto;overflow:hidden;margin:20px 0px">
           <div id="counterRetailBills">
            <table id="counterRetailBillsTable" class="zxsaastable"></table>
            <div id="countergridpager"></div>
          </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="surecounterRetailButton">确定</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" id="counterRetailCancel">取消</button>
      </div>
    </div>
  </div>
</div>
<!--引入原单-->
<div class="modal" id="importOriginalBills" tabindex="-1" role="dialog" aria-labelledby="importModalLabel">
  <div class="modal-dialog" role="document"  style="width:1000px">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="importModalLabel">选择原零售出库单</h4>
      </div>
      <div class="modal-body">
         <div style="width:1000px;height:35px;line-height:35px;">
          <div style="width:80px;float:left">快速过滤:</div>
          <div style="width:200px;float:left"><input type="text" class="form-control" placeholder="会员卡号、手机、串号、单据号" id="origSearch"></div>
          <div style="width:400px;float:left">
          	<label class="width-25">单据日期:</label>
          	<div class="input-group col-sm-8" style="display: inline-block;">
                <input type="text" class="dateInp" id="startTime" readonly >一
                <input type="text" class="dateInp" id="endTime" readonly >
	      	</div>
	      </div>
          <div style="width:200px;float:left">门店：<span class="origstore"></span></div>
          <div style="width:60px;float:left"><button type="button" id="origbtn" class="btn btn-info">查询</button></div>
        </div>
        <div style="width:100%;height:auto;overflow:hidden;margin:20px 0px">
           <div>
            <table id="importOriginalTab" class="zxsaastable"></table>
            <div id="importOrigridpager"></div>
          </div>
      </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="sureImportBills">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" id="importCancel">取消</button>
      </div>
    </div>
  </div>
</div>

  <!--引入定单-->
  <div class="modal fade bs-example-modal-lg" id="myModal_introSingle" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style='min-width:1200px;'>
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">定单引入</h4>
                </div>
                <div class="modal-body">
                    <p class="rb_proName_title">快速检索：<input id="introSearch" type="text" placeholder="会员卡号、客户姓名或手机号"> <button id='introSearchBtn' class='btn btn-info'>定单查询</button></p>
                    <table id="table_introSingle" class="table table-bordered">
                        <thead>
                        <tr>
                            <td></td>
                            <td>零售定单编码</td>
                            <td>客户姓名</td>
                            <td>联系电话</td>
                            <td>商品名称</td>
                            <td>型号</td>
                            <td>颜色</td>
                            <td>本次引入金额</td>
                            <td>定金</td>
                            <td>已核销金额</td>
                            <td>已退定金</td>
                            <td>定金结余</td>
                            <td>定单数量</td>
                            <td>已核销数量</td>
                            <td>已退数量</td>
                            <td>数量结余</td>
                            <td>备注</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input class='rb_check' type="checkbox"/><input class='introCode' type="hidden"/></td>
                            <td class='rb_introOrderCode'></td>
                            <td class='rb_introName'></td>
                            <td class='rb_introTel'></td>
                            <td class='rb_introProName'></td>
                            <td class='rb_introModel'></td>
                            <td class='rb_introColor'></td>
                            <td><input class='rb_introTTD' type="text"/></td>
                            <td class='rb_introDeposit'></td>
                            <td class='rb_introWriteOff'></td>
                            <td class='rb_introRetired'></td>
                            <td class='rb_introBalance'></td>
                            <td class='rb_introOrderNum'></td>
                            <td class='rb_introWriteOffNum'></td>
                            <td class='rb_introRetiredNum'></td>
                            <td class='rb_introNumBalance'></td>
                            <td class='rb_introRemark'></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="introSingle_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                    <button id="introSingle_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>

                </div>
            </div>
        </div>
    </div>
    <!--调入挂单-->
    
    <div class="modal fade bs-example-modal-lg" id="saveTipModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
               	 	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">提示</h4>
                </div>
                <div class="modal-body">
                    <div class="stip"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" id="jixu">继续</button>
                    <button type="button" class="btn btn-primary" id="lrCost" >录入成本</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade bs-example-modal-lg" id="saveTabModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">提示</h4>
                </div>
                <div class="modal-body">
                    <table id="costTab" class="table table-bordered table-hover">
                    	<thead>
	                    	<tr>
	                    		<th style="width: 50px;">序号</th>
	                    		<th>商品名称</th>
	                    		<th>主串号</th>
	                    		<th>成本总额</th>
	                    	</tr>
                    	</thead>
                    	<tbody>
                    	
                    	</tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary costSave">确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>

<jsp:include  page="../../inventoryInclude/foot.jsp"/>