<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/inventory/retail/retailBill.js?v=${version}"></script>
<link rel="stylesheet" href="${basePath}/css/inventory/retail/retailBill.css?v=${version}"/>
<title>零售开单</title>
</head>
<script>
    var unitId = "${unit.id}";
    var unitName = "${unit.name}";
</script>
<body>
<div class="none" id="MENU_CODE">LSKD</div>
<div class="retailContainer">
    <div class="retailContainerTop"><!---->
        <div id="AUTH" data-code="LSKD" class="btn-group btnHundred">
            <button type="button" class="btn btn-default inlineBlock B_LSKD_0007 none" id="newBills">新开单</button>
            <button type="button" class="btn btn-default inlineBlock B_LSKD_0008 none" id="saveDraft">保存为草稿单</button>
            <button type="button" class="btn btn-default inlineBlock B_LSKD_0009 none" id="transDraft">调入草稿单</button>
            <button type="button" class="btn btn-default inlineBlock B_LSKD_0010 none" id="introSingle">引入定单</button>
            <button type="button" class="btn btn-default inlineBlock hisbill btn-yindao-btn B_LSKD_0001 none"
                    style="float:right;">历史单据
            </button>
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
                <div class="saveBillsId" style="display:none"><input type="text" id="retailBillsId"/></div>
                <div class="saveBillsId" style="display:none"><input type="text" id="retailId" value="${bId}"/></div>
            </form>

        </div>
    </div>
    <div class="productEentry " style="margin-top: 0;">
        <div class="productEntryHeader" style="position: fixed;background: #fff;padding-top: 10px;z-index: 10;">
            <span style="font-size: 22px;"><span class="glyphicon glyphicon-th-large"></span>&nbsp;&nbsp;商品录入</span>
            <span>
            	<button class="btn btn-default" style="background:#fff;border-radius:5px" id="addProduct"><span
                        class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;新增行</button>
            </span>
            <span>串号 / 条码录入 ：</span>
            <span style="position:relative"><input type="text" class="form-control" id="barcodeEntry"
                                                   placeholder="串号或者条码录入"></span>
        </div>

        <div class="productTable" style="padding-top: 55px">
            <table id="productInfoTable" class="table table-bordered  retail-table1">
                <thead>
                <tr>
                    <th class="text-center" style="width:40px"></th>
                    <th class="text-center" style="width:50px">序号</th>
                    <th class="text-center" style="width:50px">赠品</th>
                    <th class="text-center" style="width:300px"><span>*</span>商品信息</th>
                    <th class="text-center" style="width:180px">串号 / 条码</th>
                    <th class="text-center" style="width:100px"><span>*</span>数量</th>
                    <th class="text-center" style="width:100px">标价</th>
                    <th class="text-center" style="width:100px">折扣率(%)</th>
                    <th class="text-center" style="width:100px"><span>*</span>折后单价</th>
                    <th class="text-center" style="width:100px"><span>*</span>折后金额</th>
                    <th class="text-center" style="width:150px"><span>*</span>营业员1</th>
                    <th class="text-center" style="width:150px">营业员2</th>
                    <th class="text-center" style="width:120px">合约机</th>
                    <th class="text-center" style="width:50px">分期</th>
                    <th class="text-center" style="width:120px">备注</th>
                    <th class="text-center" style="width:100px">仓库</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center addproductInfo" id="addproductInfo_1">
                    <td class="delProduct"><span class="glyphicon glyphicon-trash"></span></td>
                    <td class="productRowNumber">1</td>
                    <td><input type="checkbox" class="changeGift"/></td>
                    <td class="productInfo" style="width:280px">
                        <div><span style="display:inline-block;width:220px"><input type=text
                                                                                   class="form-control productInfoName"
                                                                                   placeholder="商品名称、编码、助记码" disabled/></span>&nbsp;&nbsp;
                            <span class="goodsId" style="display:none"></span>
                            <span class="goodsIds" style="display:none"></span>
                            <span class="imeiManage" style="display:none"></span>
                            <span class="glyphicon glyphicon-edit editProduct"
                                  style="color:#5184f0;font-size:20px;cursor:pointer"></span>
                        </div>
                    </td>
                    <td class="imeiInfo"></td>
                    <td class="productNumber" style="width:100px"><input type="text"
                                                                         class="form-control inputProductNum"
                                                                         onkeyup="checkInput.clearNoNum(this,10)"
                                                                         readonly/></td>
                    <td class="productPrice"></td>
                    <td class="discountRate" style="width:100px"><input type="text"
                                                                        class="form-control inputdiscountRate"
                                                                        onkeyup="checkInput.checkNum(this,5)" readonly/>
                    </td>
                    <td class="discountUnitPrice" style="width:100px"><input type="text"
                                                                             class="form-control inputdiscountUnitPrice"
                                                                             onkeyup="checkInput.checkNum(this,12)"
                                                                             readonly/></td>
                    <td class="discountAmount" style="width:100px"><input type="text"
                                                                          class="form-control input inputdiscountAmount"
                                                                          onkeyup="checkInput.checkNum(this,12)"
                                                                          readonly/></td>
                    <td class="salesperson1">
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control saleInput1" placeholder="请选择营业员" readonly/>
                            </div>
                        </div>
                    </td>
                    <td class="salesperson2">
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control saleInput2" placeholder="请选择营业员" readonly/>
                            </div>
                        </div>
                    </td>
                    <td class="businessMac">
                        <select class="form-control selectpicker"></select>
                    </td>
                    <td class="staging"><input type="checkbox" class="stagingCheck" disabled/></td>
                    <td class="productRemark"><input type="text" class="form-control" readonly/></td>
                    <td class="storageName"><span class="proStorageName"></span><span class="productStorageId"
                                                                                      style="display:none"></span></td>
                </tr>
                <tr class="text-center addGifts addGiftslastRow" id="addGifts_1">
                    <td></td>
                    <td></td>
                    <td><input type="checkbox" disabled/></td>
                    <td style="color:#1878c7;cursor:pointer"><span class="glyphicon glyphicon-plus-sign addGiftsButton">&nbsp;&nbsp;添加赠品</span>
                    </td>
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
                <tr class="text-center productSum">
                    <td></td>
                    <td colspan="2">合计</td>
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
                    <td></td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="carrierBusiness ml20">
        <div class="carrBusinHeader ">
            <span class="hideImg" id="carrierImg"><img src="../../../images/hide.png"/><img
                    src="../../../images/show.png" style="display:none"/></span><span>运营商业务</span>
            <span><button class="btn btn-default" style="background:#fff;border-radius:5px" id="addcarrRow"><span
                    class="glyphicon glyphicon-plus-sign"
                    aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;新增行</button></span>
        </div>
        <div class="carrBusin">
            <table id="carrBusinTable" class="zxsaastable table table-bordered  retail-table1">
                <thead>
                <tr>
                    <th class="text-center" style="width:20px"></th>
                    <th class="text-center" style="width:50px">序号</th>
                    <th class="text-center" style="width:100px"><span>*</span>运营商往来单位</th>
                    <th class="text-center" style="width:100px"><span>*</span>业务名称</th>
                    <th class="text-center" style="width:100px"><span>*</span>实际收款</th>
                    <th class="text-center" style="width:100px"><span>*</span>数量</th>
                    <th class="text-center" style="width:100px;">预估佣金(笔)</th>
                    <th class="text-center" style="width:100px">佣金金额</th>
                    <th class="text-center" style="width:100px">业务号</th>
                    <th class="text-center" style="width:100px">电话号码</th>
                    <th class="text-center" style="width:100px">手机串号</th>
                    <th class="text-center" style="width:100px">扣减保证金</th>
                    <th class="text-center" style="width:100px"><span>*</span>营业员1</th>
                    <th class="text-center" style="width:100px">营业员2</th>

                    <th class="text-center" style="width:100px">备注</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center carrBusinRow" id="carrBusinRowNum_1">
                    <td><span class="glyphicon glyphicon-trash carrDelete"></span></td>
                    <td class="carrRowNumber">1</td>
                    <td class="carrSelectUnit">
                        <select class="form-control carrBusinSelectUnit"></select>
                    </td>
                    <td class="carrSelectName">

                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control carrSlectNameInput" placeholder="请选择业务名称">
                            </div>
                        </div>
                    </td>

                    <td class="actualPayment"><input type="text" class="form-control inputactualPayment"
                                                     onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td class="qty"><input type="text" class="form-control inputqty"
                                           onkeyup="checkInput.clearNoNum(this,12)"/></td>

                    <td class="commission"><input type="text" readonly="readonly" class="form-control inputcommission "
                                                  onkeyup="checkInput.checkNumFu(this,12)"/></td>

                    <td class="comissionEsit"><input type="text" class="form-control inputcomissionEsit"
                                                     onkeyup="checkInput.checkNumFu(this,12)"/></td>
                    <td class="businessNum"><input type="text" class="form-control"/></td>
                    <td class="carrTelephone"><input type="text" class="form-control"/></td>
                    <td class="telephoneImei"><input type="text" class="form-control"/></td>
                    <td class="discountMargin"><input type="text" class="form-control inputdiscountMargin"
                                                      onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td class="carrBusinSale1">
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control carrSaleInput1" placeholder="请选择营业员">
                            </div>
                        </div>
                    </td>
                    <td class="carrBusinSale2">
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control carrSaleInput2" placeholder="请选择营业员">
                            </div>
                        </div>
                    </td>
                    <td class="carrRemark"><input type="text" class="form-control"/></td>
                </tr>
                </tbody>
                <tfoot class="text-center">
                <td></td>
                <td colspan="2">合计</td>
                <td></td>
                <td id="carrTotal_1">0</td>
                <td id="carrTotal_4">0</td>

                <td id="carrTotal_5">0</td>
                <td id="carrTotal_3" style="">0</td>
                <td></td>
                <td></td>
                <td></td>
                <td id="carrTotal_2">0</td>
                <td></td>
                <td></td>

                <td></td>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="Value-addedServices ml20">
        <div class="Value-addedHeader">
            <span class="hideImg" id="Value-addedImg"><img src="../../../images/hide.png"/><img
                    src="../../../images/show.png" style="display:none"/></span><span>增值服务</span>
            <span><button class="btn btn-default" style="background:#fff;border-radius:5px" id="Value-added"><span
                    class="glyphicon glyphicon-plus-sign"
                    aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;新增行</button></span>
        </div>
        <div class="Value-added">
            <table id="Value-addedTable" class="zxsaastable table table-bordered  retail-table1">
                <thead>
                <tr>
                    <th class="text-center" style="width:20px"></th>
                    <th class="text-center" style="width:50px">序号</th>
                    <th class="text-center"><span>*</span>增值服务名称</th>
                    <th class="text-center"><span>*</span>营业员1</th>
                    <th class="text-center"><span>*</span>实际收款</th>
                    <th class="text-center">生效日期</th>
                    <th class="text-center" style="width:100px">商品序号</th>
                    <th class="text-center">预设售价</th>
                    <th class="text-center">会员价</th>
                    <th class="text-center">商品名称</th>
                    <th class="text-center">手机串号</th>
                    <th class="text-center">使用次数</th>
                    <th class="text-center">有限期限</th>
                    <th class="text-center">营业员2</th>
                    <th class="text-center">备注</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center addValueService" id="addValueService_1">
                    <td><span class="glyphicon glyphicon-trash valueDelete"></span></td>
                    <td class="valueRowNumber">1</td>
                    <td class="valueSelectName">
                        <select class="form-control addValueSelectName"></select>
                    </td>
                    <td class="addValuesalesPeople1">
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control addValueSaleInput1" placeholder="请选择营业员">
                            </div>
                        </div>
                    </td>
                    <td class="realPayment"><input type="text" class="form-control realPaymentInput"
                                                   onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td class="bissDate">
                        <div class="input-group col-sm-12">
                            <input type="text" class="form-control effectiveDate" placeholder="请选择业务日期" readonly>
                        </div>
                    </td>
                    <td class="valueProductNumber">
                        <select class="form-control addValueProductNumber"></select>
                    </td>
                    <td class="esitPrice"></td>
                    <td class="valuePrice"></td>
                    <td class="addValueProductName"><span></span><span style="display:none"></span></td>
                    <td class="phoneImei"><span></span><span style="display:none"></span></td>
                    <td class="usageCount"></td>
                    <td class="limitDate"></td>
                    <td class="addValuesalesPeople2">
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control addValueSaleInput2" placeholder="请选择营业员">
                            </div>
                        </div>
                    </td>
                    <td class="valueRemark"><input type="text" class="form-control"/></td>
                </tr>
                </tbody>
                <tfoot class="text-center">
                <td></td>
                <td colspan="2">合计</td>
                <td></td>
                <td id="totalZZAmount">0</td>
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
                </tfoot>
            </table>
        </div>
    </div>
    <div class="ThirdpartyDiscount ml20">
        <div class="DiscountHeader">
            <span class="hideImg" id="discountImg"><img src="../../../images/hide.png"/><img
                    src="../../../images/show.png" style="display:none"/></span><span>第三方抵扣</span>
            <span><button class="btn btn-default" style="background:#fff;border-radius:5px" id="discount"><span
                    class="glyphicon glyphicon-plus-sign"
                    aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;新增行</button></span>
        </div>
        <div class="Discount">
            <table id="DiscountTable" class="zxsaastable table table-bordered  retail-table1">
                <thead>
                <tr>
                    <th class="text-center" style="width:20px"></th>
                    <th class="text-center" style="width:50px">序号</th>
                    <th class="text-center"><span>*</span>往来单位</th>
                    <th class="text-center"><span>*</span>活动名称</th>
                    <th class="text-center">抵现金额</th>
                    <th class="text-center">结算金额</th>
                    <th class="text-center">业务号</th>
                    <th class="text-center"><span>*</span>营业员1</th>
                    <th class="text-center">营业员2</th>
                    <th class="text-center">备注</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center thirdDiscount" id="thirdDisount_1">
                    <td><span class="glyphicon glyphicon-trash dissountDelete"></span></td>
                    <td class="discountRowNumber">1</td>
                    <td class="discountSelectUnit">
                        <select class="form-control discountSelectUnitOption"></select>
                    </td>
                    <td class="discountActiveName">
                        <select class="form-control discountActiveNameOption"></select>
                    </td>

                    <td class="thirdDiscountAmount"><input type="text" class="form-control thirdDiscountAmountInput"
                                                           onkeyup="checkInput.checkNum(this,12)"/></td>
                    <td class="settleAmount"><input type="text" class="form-control settleAmountInput"
                                                    onkeyup="checkInput.checkNum(this,12)"/></td>

                    <td class="thirdBusinNum"><input type="text" class="form-control"/></td>
                    <td class="thirdSales1">
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control thirdSaleInput1" placeholder="请选择营业员">
                            </div>
                        </div>
                    </td>
                    <td class="thirdSales2">
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control thirdSaleInput2" placeholder="请选择营业员">
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
                <td id="discountTotal">0</td>
                <td id="settleAmountTotal">0</td>
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
            <span class="hideImg" id="StaBusinessImg"><img src="../../../images/hide.png" class="hideImg"/><img
                    src="../../../images/show.png" style="display:none" class="showImg"/></span><span>分期业务</span>
            <span><button class="btn btn-default" style="background:#fff;border-radius:5px" id="stagingBusin"><span
                    class="glyphicon glyphicon-plus-sign"
                    aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;新增行</button></span>
        </div>
        <div class="StaBu">
            <div style="height:35px;line-height:35px;font-size:16px;"><span>可供分期金额：</span><span
                    class="abledStagingAmount">0</span></div>
            <table id="StaBuTable" class="zxsaastable table table-bordered  retail-table1">
                <thead>
                <tr>
                    <th class="text-center" style="width:20px"></th>
                    <th class="text-center" style="width:50px">序号</th>
                    <th class="text-center"><span>*</span>分期商名称</th>
                    <th class="text-center" style="width:120px"><span>*</span>业务名称</th>
                    <th class="text-center"><span>*</span>分期金额</th>
                    <th class="text-center"><span>*</span>首付金额</th>
                    <th class="text-center">分期贷款金额</th>
                    <th class="text-center">佣金比例(%)</th>
                    <th class="text-center">分期数</th>
                    <th class="text-center"><span>*</span>预计佣金</th>
                    <th class="text-center">合同号</th>
                    <th class="text-center">串号</th>
                    <th class="text-center"><span>*</span>营业员1</th>
                    <th class="text-center">营业员2</th>
                    <th class="text-center">备注</th>
                    <th class="text-center">月供</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center stagingRow" id="stagingRow_1">
                    <td><span class="glyphicon glyphicon-trash stagDelete"></span></td>
                    <td class="stagRowNumber">1</td>
                    <td class="stagSelectUnit">
                        <select class="form-control stagSelectOption"></select>
                    </td>
                    <td class="stagBusinessName">
                        <select class="form-control stagBusinessNameOption"></select>
                    </td>
                    <td><input type="text" class="form-control stagingAmount" onkeyup="checkInput.checkNum(this,12)"/>
                    </td>
                    <td><input type="text" class="form-control firstPayAmount" onkeyup="checkInput.checkNum(this,12)"/>
                    </td>
                    <td class="stagingLoadAmount"></td>
                    <td><input type="text" class="form-control commissionBili" readonly="readonly"/></td>
                    <td><input type="text" class="form-control stagingNumber"
                               onkeyup="checkInput.checkPositiveInteger(this)"/></td>
                    <td><input type="text" class="form-control commission" readonly="readonly"/></td>
                    <td><input type="text" class="form-control contractNo"/></td>
                    <td><input type="text" class="form-control imeiNo"/></td>
                    <td class="stagingSales1">
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control stagingSaleInput1" placeholder="请选择营业员">
                            </div>
                        </div>
                    </td>
                    <td class="stagingSales2">
                        <div class="form-group" style="margin:0;">
                            <div class="input-group">
                                <input type="text" class="form-control stagingSaleInput2" placeholder="请选择营业员">
                            </div>
                        </div>
                    </td>
                    <td class="stagRemark"><input type="text" class="form-control"></td>
                    <td class="monthSupply"></td>
                </tr>
                </tbody>
                <tfoot class="text-center">
                <td></td>
                <td colspan="2">合计</td>
                <td></td>
                <td class="stagingTotalAmount"></td>
                <td id="staging_1"></td>
                <td id="staging_2"></td>
                <td></td>
                <td></td>
                <td id="staging_3"></td>
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
    <div class="retailFooter row">
        <div class="col-md-10">
            <div class="row amountHeight">
                <div class="col-md-2">
                    <span class="beforeCss">总金额:</span>
                    <span class="billsAmount">0</span>
                </div>
                <div class="col-md-2">
                    <span class="beforeCss">零售定金:</span>
                    <span class="retailDeposit">0</span>
                    <div style="display:none"><input type="text" id="depositBillsId"/>
                        <input id="depositDetailList" type="hidden"/>
                    </div>
                </div>
                <div class="col-md-2">
                    <span>分期贷款金额:</span>
                    <span class="installMentLoad">0</span>
                </div>
                <div class="col-md-2">
                    <span class="beforeCss">抵现金额:</span>
                    <span class="arrialAmount">0</span>
                </div>
                <div class="col-md-2">
                    <span class="beforeCss">抹零金额:</span>
                    <span><input type="text" class="form-control inputDisplay" id="wipingAmount"
                                 onkeyup="checkInput.checkNum(this,12)"/></span>
                </div>
                <div class="col-md-2 amountColor">
                    <span class="beforeCss">应收:</span>
                    <span class="amountDue">0</span>
                </div>
            </div>
            <div class="row amountHeight">
                <div>
                    <div class="row priceHeight">
                        <div class="col-md-2">
                            <div>
                                <span class="beforeCss">现金:</span>
                                <span><input type="text" class="form-control inputDisplay" id="retailAmount"
                                             onkeyup="checkInput.checkNum(this,12)" disabled/></span>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div>
                                <span class="beforeCss">POS:</span>
                                <span class=" posContainer"><input type="text" class="form-control inputDisplay"
                                                                   id="posAmount" onkeyup="checkInput.checkNum(this,12)"
                                                                   disabled/>
	                      <div class="posContentTable">
	                        <table class="table table-bordered table-hover" id="posTable" style="height: 182px;">
	                          <thead>
	                            <tr class="text-center">
	                              <th class="text-center">序号</th>
	                              <th class="text-center">银行</th>
	                              <th class="text-center">收款金额</th>
	                            </tr>
	                          </thead>
	                          <tbody style="position: absolute;height: 150px;overflow-y: auto;">
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
                                <span class="beforeCss">支付宝:</span>
                                <span class="otherContainer"><input type="text" class="form-control inputDisplay"
                                                                    id="alipayAmount"
                                                                    onkeyup="checkInput.checkNum(this,12)"
                                                                    disabled/></span>
                            </div>

                        </div>
                        <div class="col-md-2">
                            <div>
                                <span class="beforeCss">微信:</span>
                                <span><input type="text" class="form-control inputDisplay" id="microLetterAmount"
                                             onkeyup="checkInput.checkNum(this,12)" disabled/></span>
                            </div>

                        </div>
                        <div class="col-md-2">
                            <div>
                                <span class="beforeCss">其他账户:</span>
                                <span><input type="text" class="form-control inputDisplay" id="otherAccount" disabled/></span>
                            </div>

                            <div class="otherContentTable">
                                <table class="table table-bordered table-hover" id="otherCounterTable"
                                       style="height: 182px;">
                                    <thead>
                                    <tr class="text-center">
                                        <th class="text-center">序号</th>
                                        <th class="text-center">账户</th>
                                        <th class="text-center">收款金额</th>
                                    </tr>
                                    </thead>
                                    <tbody style="position: absolute;height: 150px;overflow-y: auto;">
                                    </tbody>
                                </table>
                                <div class="otherAccountButton">
                                    <button type="button" class="btn btn-info" id="otherAmountSure">确定</button>
                                    <button type="button" class="btn btn-default" id="otherAmountNone">取消</button>
                                </div>
                                <div class="tableTrangle"></div>
                            </div>
                        </div>

                        <div class="col-md-2 priceHeight priceColor">
                            <span class="beforeCss">实收:</span>
                            <span class="paidAmount">0</span>
                        </div>
                    </div>
                    <div class="row priceHeight">

                        <div class="col-md-2 ">
                            <di class="none">
                                <span class="beforeCss">促销券:</span>
                                <span><input type="text" class="form-control inputDisplay" id="promotionalCoupons"
                                             onkeyup="checkInput.checkNum(this,12)"/></span>
                            </di>

                        </div>
                        <div class="col-md-2" style="height: 34px;">
                            <%--<span class="beforeCss">会员储值:</span>--%>
                            <span class="none"><input type="text" class="form-control inputDisplay"
                                                      id="memberStoredValue" onkeyup="checkInput.checkNum(this,12)"
                                                      disabled/></span>
                        </div>
                        <div class="col-md-2">
                            <span class="beforeCss">积分抵现:</span>
                            <span><input type="text" class="form-control inputDisplay" id="pointArrived"
                                         onkeyup="checkInput.checkNum(this,12)" disabled/></span>
                        </div>
                        <div class="col-md-4">
                            <span class="beforeCss">备注:</span>
                            <span><input class="form-control inputDisplay" id="retailRemark"/><span>

                        </div>
                        <div class="col-md-2 priceHeight priceColor">
                            <span class="beforeCss">欠款:</span>
                            <span class="arrears">0</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="saveCode B_LSKD_0022 none">
                扫码收款
            </div>
            <button class="saveButton B_LSKD_0017 none">保存</button>
        </div>
    </div>
</div>
<!--新增商品模态框-->
<div class="modal" id="myModal" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" id="myModal-document" style="width:750px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">修改商品</h4>
            </div>
            <div class="modal-body">
                <div style="width:400px;height:35px;line-height:35px;">
                    <div style="width:50px;float:left">查找:</div>
                    <div style="width:320px;float:left"><input type="text" class="form-control"
                                                               placeholder="商品编码、名称、型号、条码" id="retailSearchProduct">
                    </div>
                </div>
                <div style="width:100%;height:auto;overflow:hidden;margin:20px 0px">
                    <div style="width:200px;height:auto;float:left">
                        <ul id="goodsTree" class="ztree"></ul>
                    </div>
                    <div style="width:500px;height:auto;float:left;" id="retailgridProduct1">
                        <table id="retailgridProduct" class="zxsaastable"></table>
                        <div id="retailgridPager"></div>
                    </div>
                    <div id="storageTable" style="width:500px;height:auto;float:left;margin-left: 12px;display:none">
                        <table id="retailgridStorage" class="zxsaastable"></table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary sureButton">确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="productCancel">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!--关联商品-->
<div class="modal fade" id="RelatedProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">关联商品:</h4>
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
                <button type="button" class="btn btn-default" id="relatedProSure">确定</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="notRelatedProduct">不关联</button>
            </div>
        </div>
    </div>
</div>
<!--调入草稿单-->
<div class="modal fade" id="counterModal" tabindex="-1" role="dialog" aria-labelledby="counterModalLabel">
    <div class="modal-dialog" role="document" style="width:800px">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="counterModalLabel">调入草稿单</h4>
            </div>
            <div class="modal-body">
                <div style="width:400px;height:35px;line-height:35px;">
                    <div style="width:50px;float:left">搜索:</div>
                    <div style="width:320px;float:left"><input type="text" class="form-control"
                                                               placeholder="按会员卡号、客户姓名或手机号检索" id="retailSearch"></div>
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


<!--引入定单-->
<div class="modal fade bs-example-modal-lg" id="myModal_introSingle" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" style='min-width:1500px;'>
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">定单引入</h4>
            </div>
            <div class="modal-body">
                <p class="rb_proName_title">快速检索：<input id="introSearch" type="text" placeholder="会员卡号、客户姓名或手机号">
                    <button id='introSearchBtn' class='btn btn-info'>定单查询</button>
                </p>
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

                        <td>定金</td>
                        <td>已核销金额</td>
                        <td>已退定金</td>
                        <td>定金结余</td>
                        <td>本次引入金额</td>
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

                        <td class='rb_introDeposit'></td>
                        <td class='rb_introWriteOff'></td>
                        <td class='rb_introRetired'></td>
                        <td class='rb_introBalance'></td>
                        <td><input class='rb_introTTD' type="text"/></td>
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


<!--扫码收款 -->
<div class="modal fade" id="codeModal" tabindex="-1" role="dialog" aria-labelledby="codeModalLabel">
    <div class="modal-dialog" role="document" style="width: 400px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="codeModalLabel">扫码收款</h4>
            </div>
            <div class="modal-body">
                <div class="codeTop">
                    <div>
                        <span>应收：</span>
                        <i class="code_ys"></i>
                    </div>
                    <div>
                        <span>已收：</span>
                        <i class="code_ss"></i>
                    </div>
                    <div>
                        <span>本次收款：</span>
                        <input type="text" class="form-control codeMoney" onkeyup="checkInput.checkNum(this,12)"/>
                    </div>
                    <div class="codeHide">
                        <span>欠款：</span>
                        <i class="code_qk">0.00</i>
                    </div>
                </div>
                <input type="text" class="form-control codeInp"/>
                <div class="codeDiv"><i>!</i>扫码完成会自动结算本单</div>
                <div class="eui-cell" style=" padding: 15px 30px 0px;">
                    <div class="eui-cell__bd">
                        <label for="payTypeWX">
                            <input style=" top: -4px; position: relative;" id="payTypeWX" type="radio" value="wechat"
                                   name="payType" checked>
                            <span style="color: #14B83B;font-size: 34px;" class="iconfont icon-weixinzhifu1"></span>
                        </label>
                    </div>
                    <div class="eui-cell__bd tr">
                        <label for="payTypeZb">
                            <input style=" top: -4px; position: relative;" id="payTypeZb" type="radio" value="alipay"
                                   name="payType">
                            <span style="color: #25ABEE;font-size: 34px;"
                                  class="iconfont icon-zhifubaozhifu-copy"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="text-align: center;">
                <button type="button" class="btn btn-info" id="startCode">开始扫码</button>
                <div class="red" style="display: none;">请勿做其它操作！</div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="../../inventoryInclude/foot.jsp"/>