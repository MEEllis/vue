$(function(){
    $('#storeInput').storePlu({
        saleManId:'saleInput',
        search:false,
        gridId:'test1',
        treeId:'tree2',
        changeStore:resetRetailBills,//改变门店时的回调函数
        getFundAccount:abledUseAccount//初始化时根据门店获取资金账户
    })
    $('#saleInput').storeSales({
        sectionId:'storeInput',
        search:false,
        salesPersonName:'.saleInput1,.carrSaleInput1,.addValueSaleInput1,.thirdSaleInput1,.stagingSaleInput1'
    })


    //输入框得到焦点时
    $("input").on('focus',function(){
        this.select()
    })
    //往来单位
    $('#contactsunitId').contactUnitPlu({
        search:false,
    });
    $("#retailCardNum").vipPlu({
        gridLocation:'left',
        defaultBtnText:"会员刷卡",
        changeVip:findVip,
        error: findVip,
    })
    $('#contactsunitId').val(unitName).data('contactUnitId',unitId);

    function findVip(data){
        var vipId = $("#retailCardNum").data("vipId");
        if(vipId !=null&& vipId !=undefined&& vipId !=""){
            if(data!=undefined){
                if(data.isAmount==1){
                    $("#memberStoredValue").val(0).removeAttr("disabled");
                }else{
                    $("#memberStoredValue").val(0).attr("disabled","disabled");
                }
                if(data.isScore==1){
                    $("#pointArrived").val(0).removeAttr("disabled");
                }else{
                    $("#pointArrived").val(0).attr("disabled","disabled");
                }
            }else{
                $("#memberStoredValue").val(0);
                $("#pointArrived").val(0);
                $("#memberStoredValue").attr("disabled","disabled")
                $("#pointArrived").attr("disabled","disabled")
            }
            getVipDiscount(1)
        }else{
            $("#productInfoTable tbody tr").each(function(i,v){
                if($(v).find('.changeGift').is(':checked')){
                    $(v).find('.inputdiscountRate').val(0).change();
                }else{
                    $(v).find('.inputdiscountRate').val(100).change();
                }
            })
        }
        $("#Value-addedTable tbody tr").each(function(){
            if($(this).attr("id")!="addValueService_1"){
                $(this).remove();
            }else{
                clearAddValueData("#addValueService_1")
            }
        })
        countAddValueAmount()
        getProductNumber()
        countPayAmount(countAmountOfArrears,true)
    }

    //新增需求获取折扣率
    function getVipDiscount(type){
        var vipId = $("#retailCardNum").data("vipId");
        if(vipId ==null || vipId ==undefined || vipId ==""){
            $("#productInfoTable tbody tr").each(function(i,v){
                if($(v).find('.changeGift').is(':checked')){
                    $(v).find('.inputdiscountRate').val(0).change();
                }else{
                    // $(v).find('.inputdiscountRate').val(100).change();
                }
            })
            return
        }
        var goodIds = [];
        $("#productInfoTable tbody tr").each(function(i,item){
            if($(item).find('.changeGift').is(':checked')){
                $(item).find('.inputdiscountRate').val(0).change();
            }else{
                if($(item).find('.productPrice').text() > 0){
                    var id = $(item).find('.goodsId').text();
                    if(goodIds.indexOf(id) == -1){
                        goodIds.push(id);
                    }
                }
            }

        })
        if(goodIds.length > 0){
            $.request({
                type: 'POST',
                url: '/manager/inventory/retail/delivery/selectVipGoodsDiscount',
                dataType: 'json',
                traditional: true,
                data: {
                    'goodIds': goodIds,
                    'vipId': vipId,
                },
                success: function (data) {
                    var list = data.data.dataList;
                    if(list.length > 0){
                        $.each(list,function(i,v){
                            $("#productInfoTable tbody tr.addproductInfo").each(function(j,item){
                                if($(item).find('.changeGift').is(':checked')){
                                    $(item).find('.inputdiscountRate').val(0).change();
                                }else{
                                    if($(item).find('.goodsId').text() == v.goodsId && type){
                                        $(item).find('.inputdiscountRate').val(v.discount).change();
                                    }else{
                                        if(j == $("#productInfoTable tbody tr.addproductInfo").length - 1) {
                                            $(item).find('.inputdiscountRate').val(v.discount).change();
                                        }
                                    }
                                }
                            })
                        })
                    }else{
                        $("#productInfoTable tbody tr").each(function(i,v){
                            if($(v).find('.changeGift').is(':checked')){
                                $(v).find('.inputdiscountRate').val(0).change();
                            }else{
                                // $(v).find('.inputdiscountRate').val(100).change();
                            }
                        })
                    }
                }
            })
        }
    }

    $(document).on("blur","#memberStoredValue",function(){
        if(Number($(this).val())>Number($("#vipAmount").text())){
            $(this).val(0);
            $.zxsaas_plus.showalert('提示','会员储值金额不能大于储值金额');
            return;
        }
    })
    //第三方抵扣:抵现金额
    $(document).on("blur",".thirdDiscountAmountInput",function(){
        var $this=$(this);
        var $obj=$this.closest('tr').find('.settleAmountInput');
        if(Number($obj.val())==0){
            $obj.val($this.val())
        }
    })

    function initAddValueDate(addValueRowId){           //初始化生效日期
        $(addValueRowId).datetimepicker({
            lang: "ch",           //语言选择中文
            format: "Y-m-d",      //格式化日期
            timepicker: false,    //关闭时间选项
            todayButton: false,    //关闭选择今天按钮
            value:new Date(),
        })
    }

    $("#wipingAmount").val(0);
    $("#retailAmount").val(0);
    $("#posAmount").val(0);
    $("#alipayAmount").val(0);
    $("#microLetterAmount").val(0);
    $("#otherAccount").val(0);
    $("#promotionalCoupons").val(0);
    $("#memberStoredValue").val(0);
    $("#pointArrived").val(0);
    $("#StaBuTable tfoot tr td:eq(5)").text(0);
    $("#dateInput").datePlu({})
    $("#productInfoTable tfoot tr td:eq(8)").text(0)
    contractMac()//合约机
    searchStagingUnit()//分期商名称
    searchCarrBusinUnit()//运营商往来单位
    thirdDiscountUnit()//第三方抵扣往来单位
    addValueServiceName()//增值服务名称
    panelShow("#carrierImg",".carrBusin");//运营商业务面板收缩展开
    panelShow("#Value-addedImg",".Value-added");//增值服务面板收缩展开
    panelShow("#discountImg",".Discount");//第三方抵扣面板收缩展开
    panelShow("#StaBusinessImg",".StaBu");//分期业务面板收缩展开
    //新开单
    $("#newBills").click(function(){
        location.href='/manager/inventory/retail/delivery/main';
    })
    //修改门店或者会员卡号时，清空页面的所有数据
    function resetRetailBills(){
        $('#contactsunitId').val(unitName).data('contactUnitId',unitId);
        $('.ContactUnitBox').show();
        $("#productInfoTable tbody #addproductInfo_1").nextUntil("#addGifts_1").html(""),
            $("#productInfoTable tbody #addGifts_1").nextAll().remove(),
            $("#carrBusinTable tbody #carrBusinRowNum_1").nextAll().remove(),
            $("#Value-addedTable tbody #addValueService_1").nextAll().remove(),
            $("#DiscountTable tbody #thirdDisount_1").nextAll().remove(),
            $("#StaBuTable tbody #stagingRow_1").nextAll().remove(),
            clearProductInfo("#addproductInfo_1"),//清空商品
            clearCarrData("#carrBusinRowNum_1"),//清空运营商业务
            clearAddValueData("#addValueService_1"),//清空增值服务业务
            clearDiscountData("#thirdDisount_1"),//清空第三方抵扣业务
            clearStagingData("#stagingRow_1") ,//清空分期业务
            $("#posTable tbody").children().remove(),//清空资金账户
            $("#otherCounterTable tbody").children().remove(),//清空其它资金账户
            $("#wipingAmount").val(0);
        $("#retailAmount").val(0);
        $("#posAmount").val(0);
        $("#alipayAmount").val(0);
        $("#microLetterAmount").val(0);
        $("#otherAccount").val(0);
        $("#promotionalCoupons").val(0);
        $("#memberStoredValue").val(0);
        $("#pointArrived").val(0);
        $("#StaBuTable .stagingTotalAmount").text(0);
        $("#dateInput").datePlu({})
        $("#productInfoTable tfoot tr td:eq(8)").text(0)
        $("#carrBusinTable tfoot tr td:eq(3)").text(0)
        $("#carrBusinTable tfoot tr td:eq(7)").text(0)
        $("#carrBusinTable tfoot tr td:eq(10)").text(0)
        $("#Value-addedTable tfoot tr td:eq(3)").text(0)
        $("#DiscountTable tfoot tr td:eq(3)").text(0)
        $("#StaBuTable #staging_1").text(0)
        $("#StaBuTable #staging_2").text(0)
        $("#StaBuTable #staging_3").text(0)
        $(".billsAmount").text(0);
        $(".retailDeposit").text(0);
        $(".installMentLoad").text(0);
        $(".arrialAmount").text(0);
        $(".amountDue").text(0);
        $(".paidAmount").text(0);
        $(".arrears").removeAttr('num').text(0);
        $(".abledStagingAmount").text(0);
        $("#retailRemark").val("")
        clearDepositBills();
        var data=$("#storeInput").data("sectionId")
        abledUseAccount(data)
    }
    //新增商品
    $("#addProduct").click(function(){
        $("#myModal").modal('show')
        $(".sureButton").attr("id","productSure")
        getGoodsClass()
        $("#retailgridProduct").jqGrid('setGridParam', {
            datatype:'json',
            postData:{
                menuCode:$('#AUTH').data('code'),
                sectionId:$("#storeInput").data("sectionId"),
                queryKey:"",
                page:1,
                rows:10,
            }
        }).trigger("reloadGrid");
        $("#retailgridProduct").resize();
    })
    //查找商品
    $("#retailSearchProduct").bind('keypress',function(event){
        if(event.keyCode == "13"){
            if($.trim($("#retailSearchProduct").val())){
                $("#retailgridProduct").jqGrid('setGridParam', {
                    datatype:'json',
                    postData:{
                        menuCode:$('#AUTH').data('code'),
                        sectionId:$("#storeInput").data("sectionId"),
                        queryKey:$("#retailSearchProduct").val(),
                        page:1,
                        rows:10,
                    }
                }).trigger("reloadGrid");
//				$("#myModal-document").css({width:"650px"})
//				$("#storageTable").css({display:"none"})
            }
        }
    })

//修改商品
    $(document).on('click','.editProduct',function(){
        $("#myModal").modal('show')
        $(".sureButton").attr("id","editproductSure")
        var productRowId=$(this).parent().parent().parent().attr("id")
        $(".sureButton").attr("editRowIds",productRowId)
//	clearProductInfo("#"+productRowId);
        getGoodsClass()
        $("#retailgridProduct").jqGrid('setGridParam', {
            datatype:'json',
            postData:{
                menuCode:$('#AUTH').data('code'),
                sectionId:$("#storeInput").data("sectionId"),
                queryKey:"",
                page:1,
                rows:10,
            }
        }).trigger("reloadGrid");
        $("#retailgridProduct").resize();
    })
//串号/条码录入
    $('#barcodeEntry').imeiPlu({
        sectionId:'#storeInput',
        callback:entryProduct
    })

    var isEntryArr = []
    function entryProduct(data){
        if(data.ifManageImei == "0"){

            if(isEntryArr.indexOf(data.goodsId+ '' +data.storageId) == '-1'){
                //			isEntryArr.push(data.goodsId);
                var productInfoModel={
                    name:data.name,
                    goodsId:data.goodsId,
                    code:data.code,
                    color:data.color,
                    models:data.models,
                    categoryName:data.categoryName,
                    retailPrice:data.retailPrice,
                    barcode:data.barcode,
                    ifManageImei:data.ifManageImei
                }
                var storageInfoModel={
                    storageName:data.storageName,
                    stockCounter:data.stockCount,
                    storageId:data.storageId,
                    imei:data.imei,
                    auximei:data.auxiliaryImei,
                    remark:"",
                    imeiId:data.imeiId,
                }
                if($("#productInfoTable tbody").find(".addproductInfo").length==1){
                    var trRowId=$("#productInfoTable tbody").find(".addproductInfo").attr("id")
                    if(trRowId=="addproductInfo_1"&&$("#addproductInfo_1").find(".goodsId").text()==""){
                        addProductInfo(productInfoModel,storageInfoModel,"#addproductInfo_1")//塞入商品信息
                    }else{
                        addProductRow(productInfoModel,storageInfoModel)//新增商品行
                    }

                }else{
                    addProductRow(productInfoModel,storageInfoModel)//新增商品行
                }
                isEntryArr.push(data.goodsId+ '' +data.storageId);
            }else{

                var index = isEntryArr.indexOf(data.goodsId+data.storageId)*1
                $('#addproductInfo_'+(index+1)).find('.inputProductNum').val($('#addproductInfo_'+(index+1)).find('.inputProductNum').val()*1+1)
                $('.inputProductNum').blur();
//				}else{
//					$.zxsaas_plus.showalert('warning','该商品已录入！');
//				}

            }
        }else{
            if(isEntryArr.indexOf(data.goodsId+ '' +data.imeiId) == '-1'){
                isEntryArr.push(data.goodsId+ '' +data.imeiId);
                var productInfoModel={
                    name:data.name,
                    goodsId:data.goodsId,
                    code:data.code,
                    color:data.color,
                    models:data.models,
                    categoryName:data.categoryName,
                    retailPrice:data.retailPrice,
                    barcode:data.barcode,
                    ifManageImei:data.ifManageImei
                }
                var storageInfoModel={
                    storageName:data.storageName,
                    stockCounter:data.stockCount,
                    storageId:data.storageId,
                    imei:data.imei,
                    auximei:data.auxiliaryImei,
                    remark:"",
                    imeiId:data.imeiId,
                }
                if($("#productInfoTable tbody").find(".addproductInfo").length==1){
                    var trRowId=$("#productInfoTable tbody").find(".addproductInfo").attr("id")
                    if(trRowId=="addproductInfo_1"&&$("#addproductInfo_1").find(".goodsId").text()==""){
                        addProductInfo(productInfoModel,storageInfoModel,"#addproductInfo_1")//塞入商品信息
                    }else{
                        addProductRow(productInfoModel,storageInfoModel)//新增商品行
                    }
                }else{
                    addProductRow(productInfoModel,storageInfoModel)//新增商品行
                }
            }else{
                $.zxsaas_plus.showalert('warning','该商品已录入！');
            }
        }
        // $('.inputdiscountRate').change();
        $('#productInfoTable tbody').find(".inputdiscountRate").last().change()
    }
//删除商品或赠品
    $(document).on('click','.delProduct',function(){
        if($(this).parent().hasClass("addGifts")){
            var ids = $(this).parent().attr('id').split('_');
            $(this).parent().remove()
            var val = $(this).parent().find('.goodsIds').text()
            var index = isEntryArr.indexOf(val);
            if (index > -1) {
                isEntryArr.splice(index, 1);
            }
            var idsnum = 1;
            $('.addGifts').each(function(i,item){
                var tid = $(item).attr('id').split('_')
                if($(item).hasClass("addGiftslastRow")){
                    return false
                }
                if(ids[1] == tid[1]){
                    $(item).find('.productRowNumber').text(tid[1]+'.'+idsnum);
                    $(item).attr('id','addGifts_'+tid[1]+'_'+idsnum);
                    idsnum++;
                }
            })
            var productDiscountAmountSum=0
            $("#productInfoTable tbody tr").each(function(index,value){
                if($(this).find(".discountAmount").children().val()!=undefined){
                    var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                    productDiscountAmountSum=Number(productDiscountAmountSum)+inputDiscountCountAmount
                }
            })
            productDiscountAmountSum = (productDiscountAmountSum*1).toFixed(2);
            $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
            countAmount(countAmountDue,countAmountOfArrears,true);
        }else if($(this).parent().hasClass("addproductInfo")){
            var val = $(this).parent().find('.goodsIds').text()
            var index = isEntryArr.indexOf(val);
            if (index > -1) {
                isEntryArr.splice(index, 1);
            }
            var productIds=$(this).parent().attr("id")
            $("#addGifts_"+productIds.split("_")[1]).show()
            var delProductIdsArry=productIds.split("_");
            var delIdsNum=delProductIdsArry[1];
            if(delIdsNum!=undefined&&delIdsNum<$("#productInfoTable tbody").find(".addproductInfo").length){
                $(this).parent().remove();
                var delnums = delIdsNum*1+1;
                $('.addGifts').each(function(i,item){
                    var tid = $(item).attr('id').split('_');
                    if(tid[1] >= delIdsNum && tid[1]<delnums){
                        $(item).remove();
                    }
                });
            }else if(delIdsNum==$("#productInfoTable tbody").find(".addproductInfo").length&&$("#productInfoTable tbody").find(".addproductInfo").length!=1){
                $(this).parent().nextAll().remove();
                $(this).parent().remove();
            }else if($("#productInfoTable tbody").find(".addproductInfo").length==1){
                clearProductInfo("#addproductInfo_1")
                $("#productInfoTable tfoot tr td:eq(8)").text(0)
                $('.addGifts').each(function(i,item){
                    if($(item).hasClass("addGiftslastRow")){
                        return false
                    }else{
                        $(item).remove();
                    }
                });
            }
            var productDiscountAmountSum=0
            $("#productInfoTable tbody tr").each(function(index,value){
                if($(this).find(".discountAmount").children().val()!=undefined){
                    var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                    productDiscountAmountSum=Number(productDiscountAmountSum)+inputDiscountCountAmount
                }
            })
            $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
            countAmount(countAmountDue,countAmountOfArrears,true);
        }
        $("#productInfoTable tbody").find('.addproductInfo').each(function(index,value){
            $(this).find('.productRowNumber').text(index+1)
            $(this).attr("id","addproductInfo_"+(index+1));
            var productInfoId=$(this).attr("id");
            var productInfoIdArray=productInfoId.split("_");
            var resetProductNum=productInfoIdArray[1];
            if($(this).attr("id")!="addproductInfo_"+$("#productInfoTable tbody").find('.addproductInfo').length){
                $(this).nextUntil("#addproductInfo_"+(index+2)).find(".addGiftsButton").parent().parent().attr("id","addGifts_"+(index+1))
                var addgiftId=$(this).nextUntil("#addproductInfo_"+(index+2)).find(".addGiftsButton").parent().parent().attr("id")
                $(this).nextUntil("#"+addgiftId).each(function(index,value){
                    $(this).attr("id",addgiftId+'_'+(index+1));
                    $(this).find('.productRowNumber').text(resetProductNum+'.'+(index+1))
                })
                if($(this).nextUntil("#"+addgiftId).length==0){
                    $("#addproductInfo_"+resetProductNum).find(".changeGift").removeAttr("disabled")
                }
            }else if($(this).attr("id")=="addproductInfo_"+$("#productInfoTable tbody").find('.addproductInfo').length){
                $(this).nextAll().find(".addGiftsButton").parent().parent().attr("id","addGifts_"+(index+1))
                var lasProductId=$(this).nextAll().find(".addGiftsButton").parent().parent().attr("id")
                $(this).nextUntil("#"+lasProductId).each(function(index,value){
                    $(this).attr("id",lasProductId+'_'+(index+1));
                    $(this).find('.productRowNumber').text(resetProductNum+'.'+(index+1))
                })
                if($(this).nextUntil("#"+lasProductId).length==0){
                    $("#addproductInfo_"+resetProductNum).find(".changeGift").removeAttr("disabled")
                }
            }
        })

        //当删除商品时，删除相应的增值服务
        var delProductNum=$(this).parent().find(".productRowNumber").text();
        $("#Value-addedTable tbody tr").each(function(index,value){
            if($(this).find(".addValueProductNumber").val()==delProductNum&&$("#Value-addedTable tbody tr").length>1){
                $(this).remove();
            }else if($(this).find(".addValueProductNumber").val()==delProductNum&&$("#Value-addedTable tbody tr").length==1){
                clearAddValueData("#"+$(this).attr("id"))
            }
        })
        $("#Value-addedTable tbody tr").each(function(index,value){
            $(this).find(".valueRowNumber").text(index+1);
            $(this).attr("id","addValueService_"+(index+1));
            disabledCol("#Value-addedTable tbody tr",".valueSelectName",".addValueSelectName")
        })
        getProductNumber(resetAddValue,true)//获取商品和赠品序号

        if($("#Value-addedTable tbody tr").length == 1){
            if($('.addValueSelectName').val() == 'null' && $('.addValueProductNumber').val() == ''){
                clearAddValueData("#addValueService_1");
            }
        }

        countAddValueAmount()
        function resetAddValue(){
            $("#Value-addedTable tbody tr").each(function(index,value){
                $(this).find(".valueRowNumber").text(index+1);
                $(this).attr("id","addValueService_"+(index+1))
                var addValueProId=$(this).find(".addValueProductName").children().last().text()
                var productInfoNum
                $("#productInfoTable tbody tr").each(function(index,value){
                    var proInfoId=$(this).find(".productInfo").find(".goodsId").text()
                    if(addValueProId==proInfoId){
                        productInfoNum=$(this).find(".productRowNumber").text()
                    }
                })
                $(this).find(".addValueProductNumber").val(productInfoNum)
            })
        }


    })
    //新增赠品
    $(document).on('click','.addGiftsButton',function(){
        if($(this).parent().parent().prev().find('.productInfoName').val() != ''){
            $("#myModal").modal('show')
            $(".sureButton").attr("id","giftSure")
            getGoodsClass()
            $("#retailgridProduct").jqGrid('setGridParam', {
                datatype:'json',
                postData:{
                    menuCode:$('#AUTH').data('code'),
                    sectionId:$("#storeInput").data("sectionId"),
                    queryKey:"",
                    page:1,
                    rows:10,
                }
            }).trigger("reloadGrid");
            var addGiftIds=$(this).parent().parent().attr("id")
            $(".sureButton").attr("giftIds",addGiftIds)
        }else{
            $.zxsaas_plus.showalert('warning','商品明细为空!');
        }
    })
    //修改赠品
    $(document).on('click','.editGift',function(){
        $("#myModal").modal('show')
        $(".sureButton").attr("id","editGiftSure")
        var giftRowId=$(this).parent().parent().parent().attr("id")
        $(".sureButton").attr("editgiftRowIds",giftRowId)
//		clearProductInfo("#"+giftRowId);
        getGoodsClass()
        $("#retailgridProduct").jqGrid('setGridParam', {
            datatype:'json',
            postData:{
                menuCode:$('#AUTH').data('code'),
                sectionId:$("#storeInput").data("sectionId"),
                queryKey:"",
                page:1,
                rows:10,
            }
        }).trigger("reloadGrid");
    })
    //商品转赠品或者赠品转商品
    var changeGiftHtml;
    var changeGiftId;
    var inputModel={
        productName:"",
        productCounter:"",
        productDiscountRate:"",
        productDisountPrice:"",
        productDisountAmount:"",
        productContractMac:"",
        productStaging:"",
        productSaleMan1:"",
        productSaleMan1Id:"",
        productSaleMan2:"",
        productSaleMan2Id:"",
        productRemark:""
    }


    $(document).on('change','.changeGift',function(){

        spliceId=$(this).parent().parent().attr("id")
        if($("#"+spliceId).filter(".addproductInfo").length>0){
            var spliceidsNumber = spliceId.split("_")[1];
            $("#addValueService_"+spliceidsNumber).remove()
            if($(this).parent().parent().nextUntil("#addGifts_"+spliceidsNumber).length==0 ){
                if($(this).attr("checked")==true||$(this).attr("checked")=="checked" ){
                    $("#addGifts_"+spliceidsNumber).hide()
                    var productOption=[]
                    var productSelectHtml = "";
                    $("#productInfoTable tbody").find(".addproductInfo").each(function(){
                        var productNumber=$(this).find(".productRowNumber").text();
                        var isChecked = $(this).find(".changeGift").is(':checked')
                        if(spliceidsNumber&&productNumber!=spliceidsNumber&&!isChecked){
                            productOption.push(productNumber)
                        }
                    })
                    if(productOption.length>0){

                        productOption.map(function(value,index){
                            if($('.changeGift'))
                                productSelectHtml+='<option value='+value+'>'+value+'</option>';
                        })
                        $("#RelatedProduct").modal('show')
                        $("#relateedProductSelect").html(productSelectHtml)
                        $("#notRelatedProduct").attr("productIds",spliceId)
                    }
                    $("#"+spliceId).find(".inputdiscountRate").val(0);
                    $("#"+spliceId).find(".inputdiscountRate").attr("disabled","disabled");
                    $("#"+spliceId).find(".inputdiscountUnitPrice").val(0);
                    $("#"+spliceId).find(".inputdiscountUnitPrice").attr("disabled","disabled");
                    $("#"+spliceId).find(".inputdiscountAmount").val(0);
                    $("#"+spliceId).find(".inputdiscountAmount").attr("disabled","disabled");
                    var productDiscountAmountSum=0
                    $("#productInfoTable tbody tr").each(function(index,value){
                        if($(this).find(".discountAmount").children().val()!=undefined){
                            var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                            productDiscountAmountSum=Number(productDiscountAmountSum)+inputDiscountCountAmount
                        }
                    })
                    $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
                    countAmount(countAmountDue,countAmountOfArrears,true);

                }else{
                    var goodsIds = $("#"+spliceId).find('.goodsIds').text()
                    isEntryArr.splice((spliceidsNumber*1-1),0,goodsIds);
                    $("#addproductInfo_"+spliceidsNumber).find(".inputdiscountRate").val(100);
                    var afterPrice = $("#addproductInfo_"+spliceidsNumber).find(".productPrice").text();
                    $("#addproductInfo_"+spliceidsNumber).find(".inputdiscountUnitPrice").val(afterPrice);
                    $("#addproductInfo_"+spliceidsNumber).find(".inputdiscountAmount").val(afterPrice);
                    $("#addGifts_"+spliceidsNumber).show()
                    $(this).parent().parent().find(".inputdiscountRate").prop("disabled",false);
                    $(this).parent().parent().find(".discountUnitPrice").children().prop("disabled",false);
                    $(this).parent().parent().find(".discountAmount").children().prop("disabled",false);
                }
                changeGiftHtml=$(this).parent().parent().html();
                inputModel.productName=$(this).parent().parent().find(".productInfo").find(".productInfoName").val();
                inputModel.productCounter=$(this).parent().parent().find(".productNumber").children().val();
                inputModel.productDiscountRate=$(this).parent().parent().find(".discountRate").children().val();
                inputModel.productDisountPrice=$(this).parent().parent().find(".discountUnitPrice").children().val();
                inputModel.productDisountAmount=$(this).parent().parent().find(".discountAmount").children().val();
                inputModel.productContractMac=$(this).parent().parent().find(".businessMac").children().val();
                inputModel.productStaging=$(this).parent().parent().find(".staging").children().attr("checked");
                inputModel.productSaleMan1=$(this).parent().parent().find(".saleInput1").val();
                inputModel.productSaleMan1Id=$(this).parent().parent().find(".saleInput1").data("employeeId");
                inputModel.productSaleMan2=$(this).parent().parent().find(".saleInput2").val();
                inputModel.productSaleMan2Id=$(this).parent().parent().find(".saleInput2").data("employeeId");
                inputModel.productRemark=$(this).parent().parent().find(".productRemark").children().val();

                changeGiftIdNum=spliceidsNumber;

            }
        }else{
            changeGiftHtml=$(this).parent().parent().html();
            inputModel.productName=$(this).parent().parent().find(".productInfo").find(".productInfoName").val();
            inputModel.productCounter=$(this).parent().parent().find(".productNumber").children().val();
            inputModel.productDiscountRate=$(this).parent().parent().find(".discountRate").children().val();
            inputModel.productDisountPrice=$(this).parent().parent().find(".discountUnitPrice").children().val();
            inputModel.productDisountAmount=$(this).parent().parent().find(".discountAmount").children().val();
            inputModel.productContractMac=$(this).parent().parent().find(".businessMac").children().val();
            inputModel.productStaging=$(this).parent().parent().find(".staging").children().attr("checked");
            inputModel.productSaleMan1=$(this).parent().parent().find(".saleInput1").val();
            inputModel.productSaleMan1Id=$(this).parent().parent().find(".saleInput1").data("employeeId");
            inputModel.productSaleMan2=$(this).parent().parent().find(".saleInput2").val();
            inputModel.productSaleMan2Id=$(this).parent().parent().find(".saleInput2").data("employeeId");
            inputModel.productRemark=$(this).parent().parent().find(".productRemark").children().val();
            $(this).parent().parent().remove();
            var changeGiftToProduct='<tr class="text-center addproductInfo">'+changeGiftHtml+'</tr>'+
                '<tr class="text-center addGifts addGiftslastRow">'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'<input type="checkbox">'+'</td>'+
                '<td  style="color:#1878c7;cursor:pointer">'+'<span class="glyphicon glyphicon-plus-sign addGiftsButton">'+'&nbsp;&nbsp;'+'添加赠品'+'</span>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '<td>'+'</td>'+
                '</tr>'
            $("#productInfoTable tbody").append(changeGiftToProduct)
            var productLength=$("#productInfoTable tbody").find(".addproductInfo").length;
            $("#productInfoTable tbody").find(".addproductInfo").last().attr("id","addproductInfo_"+productLength);
            $("#productInfoTable tbody").find(".addGifts").last().attr("id","addGifts_"+productLength);
            $("#addproductInfo_"+productLength).find(".changeGift").removeAttr("checked");
            $("#addproductInfo_"+productLength).find(".productRowNumber").text(productLength);
            $("#addproductInfo_"+productLength).find(".productInfo").find(".productInfoName").val(inputModel.productName);
            $("#addproductInfo_"+productLength).find(".productNumber").children().val(inputModel.productCounter);

            var goodsIds = $("#productInfoTable tbody #addproductInfo_"+productLength).find('.goodsIds').text()
            isEntryArr.push(goodsIds);
            var afterProductPrice = $("#addproductInfo_"+productLength).find('.productPrice').text();
            $("#addproductInfo_"+productLength).find(".inputdiscountRate").val(100).prop("disabled",false).removeAttr("readonly");
            $("#addproductInfo_"+productLength).find(".inputdiscountUnitPrice").val(afterProductPrice).prop("disabled",false).removeAttr("readonly");
            $("#addproductInfo_"+productLength).find(".inputdiscountAmount").val(afterProductPrice).prop("disabled",false).removeAttr("readonly");

            $("#addproductInfo_"+productLength).find(".selectpicker").val(inputModel.productContractMac);
            $("#addproductInfo_"+productLength).find(".saleInput1").val(inputModel.productSaleMan1).data("employeeId",inputModel.productSaleMan1Id);
            $("#addproductInfo_"+productLength).find(".saleInput2").val(inputModel.productSaleMan2).data("employeeId",inputModel.productSaleMan2Id);
            $("#addproductInfo_"+productLength).find(".staging").children().attr("checked",inputModel.productStaging);
            $("#addproductInfo_"+productLength).find(".productRemark").children().val(inputModel.productRemark);
            if(Number($("#productInfoTable tbody #addproductInfo_"+productLength).find(".productPrice").text())==0){
                $("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputdiscountRate").val(100)
                $("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputdiscountRate").attr("readonly","readonly")
                if($("#productInfoTable tbody #addproductInfo_"+productLength).find(".productInfo").find(".imeiManage").text()=="1"){
                    $("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputProductNum").val(1);
                    $("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputProductNum").attr("readonly","readonly")
                }
//				else if($("#productInfoTable tbody #addproductInfo_"+productLength).find(".productInfo").find(".imeiManage").text()=="0"){
//					$("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputProductNum").val(1);
//					$("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputProductNum").removeAttr("readonly")
//				}

            }else if(Number($("#productInfoTable tbody #addproductInfo_"+productLength).find(".productPrice").text())>0){
                $("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputdiscountRate").val(100)
                $("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputdiscountRate").removeAttr("readonly")
                if($("#productInfoTable tbody #addproductInfo_"+productLength).find(".productInfo").find(".imeiManage").text()=="1"){
                    $("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputProductNum").val(1);
                    $("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputProductNum").attr("readonly","readonly")
                }
//				else if($("#productInfoTable tbody #addproductInfo_"+productLength).find(".productInfo").find(".imeiManage").text()=="0"){
//					$("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputProductNum").val(1);
//					$("#productInfoTable tbody #addproductInfo_"+productLength).find(".inputProductNum").removeAttr("readonly")
//				}
            }
            $("#productInfoTable tbody").find(".addproductInfo").each(function(index,value){
                if($("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).length==0){
                    $("#addproductInfo_"+(index+1)).find(".changeGift").attr("disabled",false);
                }
                if($("#productInfoTable tbody").find(".addproductInfo").length>1){
                    if((index+1)<$("#productInfoTable tbody").find(".addproductInfo").length){
                        $("#addproductInfo_"+(index+1)).nextUntil("#addproductInfo_"+(index+2)).last().attr("id","addGifts_"+(index+1))
                        if($("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).length>0){
                            $("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).each(function(i,value){
                                $(this).attr("id","addGifts_"+(index+1)+"_"+(i+1))
                                $(this).find(".productRowNumber").text((index+1)+"."+(i+1))
                            })
                        }
                    }else if((index+1)==$("#productInfoTable tbody").find(".addproductInfo").length){
                        $("#addproductInfo_"+(index+1)).nextAll().last().attr("id","addGifts_"+(index+1))
                        if($("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).length>0){
                            $("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).each(function(j,value){
                                $(this).attr("id","addGifts_"+(index+1)+"_"+(j+1))
                                $(this).find(".productRowNumber").text((index+1)+"."+(i+1))
                            })
                        }
                    }
                }else if($("#productInfoTable tbody").find(".addproductInfo").length==1){
                    $("#addproductInfo_1").nextAll().last().attr("id","addGifts_1")
                    if($("#addproductInfo_1").nextUntil("#addGifts_1").length>0){
                        $("#addproductInfo_1").nextUntil("#addGifts_1").each(function(index,value){
                            $(this).attr("id","addGifts_1"+"_"+(index+1))
                            $(this).find(".productRowNumber").text("1"+"."+(i+1))
                        })
                    }
                }

            })
        }
        $('.inputdiscountUnitPrice').change();
        $('.realPaymentInput').blur();

        countAmount(countAmountDue,countAmountOfArrears,true);
        getProductNumber()//获取商品和赠品序号
        getVipDiscount(0)
    })
    $(document).on('click','#notRelatedProduct',function(){

        var productIds=$("#notRelatedProduct").attr("productIds");
        $("#"+productIds).find(".inputdiscountRate").val(0);
        $("#"+productIds).find(".inputdiscountRate").attr("disabled","disabled");
        $("#"+productIds).find(".inputdiscountUnitPrice").val(0);
        $("#"+productIds).find(".inputdiscountUnitPrice").attr("disabled","disabled");
        $("#"+productIds).find(".inputdiscountAmount").val(0);
        $("#"+productIds).find(".inputdiscountAmount").attr("disabled","disabled");
        $(this).removeAttr("productIds")
        var productDiscountAmountSum=0
        $("#productInfoTable tbody tr").each(function(index,value){
            if($(this).find(".discountAmount").children().val()!=undefined){
                var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                productDiscountAmountSum=Number(productDiscountAmountSum)+inputDiscountCountAmount
            }
        })
        $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
        countAmount(countAmountDue,countAmountOfArrears,true);
    })
    $(document).on('click','#relatedProSure',function(){
        var goodsIds = $("#productInfoTable tbody #addproductInfo_"+changeGiftIdNum).find('.goodsIds').text()
        var ind = isEntryArr.indexOf(goodsIds);
        isEntryArr.splice(ind, 1)
        $("#productInfoTable tbody #addproductInfo_"+changeGiftIdNum).remove();
        $("#productInfoTable tbody #addGifts_"+changeGiftIdNum).remove();
        var selectValue=$("#relateedProductSelect").val()
        var insertHtml='<tr class="text-center addGifts">'+changeGiftHtml+'</tr>'
        $("#productInfoTable tbody").find("#addGifts_"+selectValue).before(insertHtml)
        var RowNum=$("#addproductInfo_"+selectValue).nextUntil("#addGifts_"+selectValue).length;
        $("#addproductInfo_"+selectValue).nextUntil("#addGifts_"+selectValue).last().attr("id","addGifts_"+selectValue+"_"+RowNum);
        $("#addproductInfo_"+selectValue).nextUntil("#addGifts_"+selectValue).last().find(".productRowNumber").text(selectValue+'.'+RowNum);
        $("#addproductInfo_"+selectValue).find(".changeGift").attr("disabled",true);
        $("#addGifts_"+selectValue+"_"+RowNum).find(".changeGift").attr("checked","checked")
        $("#addGifts_"+selectValue+"_"+RowNum).find(".productInfo").find(".productInfoName").val(inputModel.productName);
        $("#addGifts_"+selectValue+"_"+RowNum).find(".productNumber").children().val(inputModel.productCounter);
        $("#addGifts_"+selectValue+"_"+RowNum).find(".discountRate").children().val(inputModel.productDiscountRate);
        $("#addGifts_"+selectValue+"_"+RowNum).find(".discountUnitPrice").children().val(inputModel.productDisountPrice);
        $("#addGifts_"+selectValue+"_"+RowNum).find(".discountAmount").children().val(inputModel.productDisountAmount);
        $("#addGifts_"+selectValue+"_"+RowNum).find(".businessMac").children().val(inputModel.productContractMac);
        $("#addGifts_"+selectValue+"_"+RowNum).find(".saleInput1").val(inputModel.productSaleMan1).data("employeeId",inputModel.productSaleMan1Id);
        $("#addGifts_"+selectValue+"_"+RowNum).find(".saleInput2").val(inputModel.productSaleMan2).data("employeeId",inputModel.productSaleMan2Id);
        $("#addGifts_"+selectValue+"_"+RowNum).find(".staging").children().attr("checked",inputModel.productStaging);
        $("#addGifts_"+selectValue+"_"+RowNum).find(".productRemark").children().val(inputModel.productRemark);
        $("#productInfoTable tbody").find(".addproductInfo").each(function(index,value){
            $(this).attr("id","addproductInfo_"+(index+1));
            $(this).find(".productRowNumber").text(index+1);
        })
        $("#productInfoTable tbody").find(".addproductInfo").each(function(index,value){
            if($("#productInfoTable tbody").find(".addproductInfo").length>1){
                if((index+1)<$("#productInfoTable tbody").find(".addproductInfo").length){
                    $("#addproductInfo_"+(index+1)).nextUntil("#addproductInfo_"+(index+2)).last().attr("id","addGifts_"+(index+1))
                    if($("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).length>0){
                        $("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).each(function(i,value){
                            $(this).attr("id","addGifts_"+(index+1)+"_"+(i+1))
                            $(this).find(".productRowNumber").text((index+1)+"."+(i+1))
                            $(this).find(".discountRate").children().val(0)
                            $(this).find(".discountRate").children().attr("readonly","readonly");
                            $(this).find(".discountUnitPrice").children().val(0)
                            $(this).find(".discountUnitPrice").children().attr("readonly","readonly");
                            $(this).find(".discountAmount").children().val(0)
                            $(this).find(".discountAmount").children().attr("readonly","readonly");
                        })
                        var productDiscountAmountSum=0
                        $("#productInfoTable tbody tr").each(function(index,value){
                            if($(this).find(".discountAmount").children().val()!=undefined){
                                var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                                productDiscountAmountSum=Number(productDiscountAmountSum)+inputDiscountCountAmount
                            }
                        })
                        $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
                    }
                }else if((index+1)==$("#productInfoTable tbody").find(".addproductInfo").length){
                    $("#addproductInfo_"+(index+1)).nextAll().last().attr("id","addGifts_"+(index+1))
                    if($("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).length>0){
                        $("#addproductInfo_"+(index+1)).nextUntil("#addGifts_"+(index+1)).each(function(j,value){
                            $(this).attr("id","addGifts_"+(index+1)+"_"+(j+1))
                            $(this).find(".productRowNumber").text((index+1)+"."+(j+1))
                            $(this).find(".discountRate").children().val(0)
                            $(this).find(".discountRate").children().attr("readonly","readonly");
                            $(this).find(".discountUnitPrice").children().val(0)
                            $(this).find(".discountUnitPrice").children().attr("readonly","readonly");
                            $(this).find(".discountAmount").children().val(0)
                            $(this).find(".discountAmount").children().attr("readonly","readonly")
                        })
                        var productDiscountAmountSum=0
                        $("#productInfoTable tbody tr").each(function(index,value){
                            if($(this).find(".discountAmount").children().val()!=undefined){
                                var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                                productDiscountAmountSum=Number(productDiscountAmountSum)+inputDiscountCountAmount
                            }
                        })
                        $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
                    }
                }
            }else if($("#productInfoTable tbody").find(".addproductInfo").length==1){
                $("#addproductInfo_1").nextAll().last().attr("id","addGifts_1")
                if($("#addproductInfo_1").nextUntil("#addGifts_1").length>0){
                    $("#addproductInfo_1").nextUntil("#addGifts_1").each(function(index,value){
                        $(this).attr("id","addGifts_1"+"_"+(index+1))
                        $(this).find(".productRowNumber").text("1"+"."+(index+1))
                        $(this).find(".discountRate").children().val(0)
                        $(this).find(".discountRate").children().attr("readonly","readonly");
                        $(this).find(".discountUnitPrice").children().val(0)
                        $(this).find(".discountUnitPrice").children().attr("readonly","readonly");
                        $(this).find(".discountAmount").children().val(0)
                        $(this).find(".discountAmount").children().attr("readonly","readonly")
                    })
                    var productDiscountAmountSum=0
                    $("#productInfoTable tbody tr").each(function(index,value){
                        if($(this).find(".discountAmount").children().val()!=undefined){
                            var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                            productDiscountAmountSum=Number(productDiscountAmountSum)+inputDiscountCountAmount
                        }
                    })
                    $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
                }
            }
        })

        $("#RelatedProduct").modal('hide')
        getProductNumber()//获取商品和赠品序号
    })
    //点击修改商品弹出框的取消按钮，重置弹出框的宽度以及隐藏仓库信息表格
    $("#productCancel").click(function(){
        $("#myModal-document").css({width:"750px"})
        $("#storageTable").css({display:"none"})
    })
    //点击修改商品弹出框的确定按钮，重置弹出框的宽度以及隐藏仓库信息表格
    $(document).on('click', '.sureButton',function(){
        $("#myModal").modal('hide');
        if(Object.keys(storageModel).length == 0){
            return;
        }
        $("#myModal-document").css({width:"750px"});
        $("#storageTable").css({display:"none"});
        if($('#retailgridProduct').jqGrid('getGridParam', 'selarrrow').length > 0){

            if($(".sureButton").attr("id")=="productSure"){
                if(($("#productInfoTable tbody tr:first td:eq(2) input").attr("checked")!="checked"&&
                        $("#productInfoTable tbody tr:first td:eq(2) input").attr("checked")!=true)&&
                    $("#productInfoTable tbody tr:first td:eq(3) div span:first input").val()==""
                ){
                    if(productModel.ifManageImei == '0'){
                        isEntryArr.push(productModel.goodsId+storageModel.storageId);
                    }else{
                        isEntryArr.push(productModel.goodsId+storageModel.imeiId);
                    }
                    addProductInfo(productModel,storageModel,"#addproductInfo_1")
                }else{
                    if(productModel.ifManageImei == '0'){
                        addProductRow(productModel,storageModel);  //新增商品行
                        isEntryArr.push(productModel.goodsId+storageModel.storageId);
                    }else{
                        var index = isEntryArr.indexOf(productModel.goodsId+storageModel.imeiId)
                        if(index == -1){
                            addProductRow(productModel,storageModel);  //新增商品行
                            isEntryArr.push(productModel.goodsId+storageModel.imeiId);
                        }else{

                            $.zxsaas_plus.showalert('warning','该商品已录入！');
                        }
                    }
                }
            }else if($(".sureButton").attr("id")=="giftSure"){
                if(productModel.ifManageImei == '0'){
                    addGiftRow(productModel,storageModel); //新增商品行
                    isEntryArr.push(productModel.goodsId+storageModel.storageId);
                }else{
                    var index = isEntryArr.indexOf(productModel.goodsId+storageModel.imeiId)
                    if(index == -1){
                        addGiftRow(productModel,storageModel);  //新增商品行
                        isEntryArr.push(productModel.goodsId+storageModel.imeiId);
                    }else{
                        $.zxsaas_plus.showalert('warning','该商品已录入！');
                    }
                }
//				addGiftRow(productModel,storageModel);    //新增赠品行
            }else if($(".sureButton").attr("id")=="editproductSure"){
                var editProductIds=$(".sureButton").attr("editRowIds")
                var val = $("#"+editProductIds).find('.goodsIds').text()
                $("#addGifts_"+editProductIds.split("_")[1]).show()
                var index = isEntryArr.indexOf(val);
                if(productModel.ifManageImei == '0'){
                    isEntryArr.splice(index, 1,productModel.goodsId+storageModel.storageId)
                }else{
                    var ind = isEntryArr.indexOf(productModel.goodsId+storageModel.imeiId)
                    if(ind == -1){
                        isEntryArr.splice(index, 1,productModel.goodsId+storageModel.imeiId)
                    }else{
                        $.zxsaas_plus.showalert('warning','该商品已录入！');
                        return;
                    }
                }
//				isEntryArr = productModel.ifManageImei == '0' ? isEntryArr.splice(index, 1,productModel.goodsId+storageModel.imeiId) : isEntryArr.splice(index, 1,productModel.goodsId+storageModel.storageId)

                clearProductInfo("#"+editProductIds);
                if($("#productInfoTable tbody "+"#"+editProductIds+" td:eq(3) div span:first input").val()==""){
                    addProductInfo(productModel,storageModel,"#"+editProductIds);
                }
                var editids = $('#'+editProductIds).find('.productRowNumber').text();
                if(editids.split('.')[1] !== undefined){
                    $('#'+editProductIds).find('.changeGift').attr('checked',true);
                    $('#'+editProductIds).find('.inputdiscountRate').val(0);
                    $('#'+editProductIds).find('.inputdiscountUnitPrice').val(0);
                    $('#'+editProductIds).find('.inputdiscountAmount').val(0);
                }
            }else if($(".sureButton").attr("id")=="editGiftSure"){
                var editGiftIds=$(".sureButton").attr("editgiftRowIds")
                clearProductInfo("#"+editGiftIds);
                if($("#productInfoTable tbody "+"#"+editGiftIds+" td:eq(3) div span:first input").val()==""){
                    addProductInfo(productModel,storageModel,"#"+editGiftIds);
                    $('#'+editGiftIds).find('.changeGift').attr('checked',true);
                    $('#'+editGiftIds).find('.inputdiscountRate').val(0).attr('disabled',true);
                    $('#'+editGiftIds).find('.inputdiscountUnitPrice').val(0).attr('disabled',true);
                    $('#'+editGiftIds).find('.inputdiscountAmount').val(0).attr('disabled',true);
                }
            }
            getVipDiscount(0)
            // $('.inputdiscountRate').change();
        }
    })
//新增商品行
    var productInfoHtml='<tr class="text-center addproductInfo">'+
        '<td class="delProduct">'+'<span class="glyphicon glyphicon-trash">'+'</span>'+'</td>'+
        '<td class="productRowNumber">'+'</td>'+
        '<td>'+'<input type="checkbox" class="changeGift"/>'+'</td>'+
        '<td class="productInfo" style="width:280px">'+
        '<div>'+'<span style="display:inline-block;width:220px">'+
        '<input type="text" class="form-control productInfoName" placeholder="商品名称、编码、助记码" disabled/>'+'</span>'+'&nbsp;&nbsp;'+
        '<span class="goodsId" style="display:none">'+'</span>'+
        '<span class="goodsIds" style="display:none">'+'</span>'+
        '<span class="imeiManage" style="display:none">'+'</span>'+
        '<span class="glyphicon glyphicon-edit editProduct" style="color:#5184f0;font-size:20px;cursor:pointer">'+'</span>'+
        '</div>'+
        '</td>'+
        '<td class="imeiInfo">'+'</td>'+
        '<td class="productNumber" style="width:100px">'+'<input type="text" class="form-control inputProductNum" onkeyup="checkInput.checkPositiveInteger(this,12)" readonly/>'+'</td>'+
        '<td class="productPrice">'+'</td>'+
        '<td class="discountRate" style="width:100px">'+'<input type="text" class="form-control inputdiscountRate" onkeyup="checkInput.checkNum(this,5)"/>'+'</td>'+
        '<td class="discountUnitPrice" style="width:100px">'+'<input type="text" class="form-control inputdiscountUnitPrice" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
        '<td class="discountAmount" style="width:100px">'+'<input type="text" class="form-control inputdiscountAmount" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
        '<td class="salesperson1">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control saleInput1"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="salesperson2">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control saleInput2"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="businessMac">'+'<select class="form-control selectpicker">'+'</select>'+'</td>'+
        '<td class="staging">'+'<input type="checkbox" class="stagingCheck">'+'</td>'+
        '<td class="productRemark">'+'<input type="text" class="form-control"/>'+'</td>'+
        '<td class="storageName">'+'<span class="proStorageName">'+'</span>'+'<span class="productStorageId" style="display:none">'+'</span>'+'</td>'+
        '</tr>'+'<tr class="text-center addGifts addGiftslastRow" >'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'<input type="checkbox" disabled/>'+'</td>'+
        '<td  style="color:#1878c7;cursor:pointer">'+'<span class="glyphicon glyphicon-plus-sign addGiftsButton">'+'&nbsp;&nbsp;'+'添加赠品'+'</span>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '<td>'+'</td>'+
        '</tr>'
    function addProductRow(productModel,storageModel){
        $("#productInfoTable tbody").append(productInfoHtml)
        $('#productInfoTable tbody').find(".addproductInfo").last().find(".saleInput1").val($("#saleInput").val());
        $('#productInfoTable tbody').find(".addproductInfo").last().find(".saleInput1").data("employeeId",$("#saleInput").data("employeeId"))
        $("#productInfoTable tbody").find('.addproductInfo').each(function(index,value){
            $(this).find('.productRowNumber').text(index+1)
            $(this).attr("id","addproductInfo_"+(index+1));
            if($("#productInfoTable tbody").find('.addproductInfo').length>1){
                if($(this).attr("id")!="addproductInfo_"+$("#productInfoTable tbody").find('.addproductInfo').length){
                    $(this).nextUntil("#addproductInfo_"+(index+2)).find(".addGiftsButton").parent().parent().attr("id","addGifts_"+(index+1))
                }else if($(this).attr("id")=="addproductInfo_"+$("#productInfoTable tbody").find('.addproductInfo').length){
                    $(this).nextAll().find(".addGiftsButton").parent().parent().attr("id","addGifts_"+(index+1))
                }
            }
            if($("#addproductInfo_"+(index+1)).find('.changeGift').attr("checked")!="checked"&&
                $("#addproductInfo_"+(index+1)).find('.changeGift').attr("checked")!=true&&
                $("#addproductInfo_"+(index+1)).find('.productInfo').children().children().find('.productInfoName').val()==""){
                addProductInfo(productModel,storageModel,"#addproductInfo_"+(index+1));
                return;
            }
        })

    }
//新增赠品行
    var giftHtml='<tr class="text-center addGifts">'+
        '<td class="delProduct">'+'<span class="glyphicon glyphicon-trash">'+'</span>'+'</td>'+
        '<td class="productRowNumber">'+'</td>'+
        '<td>'+'<input type="checkbox" class="changeGift" checked>'+'</td>'+
        '<td class="productInfo" style="width:280px">'+
        '<div>'+'<span style="display:inline-block;width:220px">'+
        '<input type="text" class="form-control productInfoName" placeholder="商品名称、编码、助记码" disabled/>'+'</span>'+'&nbsp;&nbsp;'+
        '<span class="goodsId" style="display:none">'+'</span>'+
        '<span class="goodsIds" style="display:none">'+'</span>'+
        '<span class="imeiManage" style="display:none">'+'</span>'+
        '<span class="glyphicon glyphicon-edit editGift" style="color:#5184f0;font-size:20px;cursor:pointer">'+'</span>'+
        '</div>'+
        '</td>'+
        '<td class="imeiInfo">'+'</td>'+
        '<td class="productNumber" style="width:100px">'+'<input type="text" class="form-control inputProductNum" onkeyup="checkInput.checkPositiveInteger(this,12)" readonly/>'+'</td>'+
        '<td class="productPrice">'+'</td>'+
        '<td class="discountRate" style="width:100px">'+'<input type="text" class="form-control inputdiscountRate" onkeyup="checkInput.checkNum(this,5)"/>'+'</td>'+
        '<td class="discountUnitPrice" style="width:100px">'+'<input type="text" class="form-control inputdiscountUnitPrice" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
        '<td class="discountAmount" style="width:100px">'+'<input type="text" class="form-control inputdiscountAmount" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
        '<td class="salesperson1">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control saleInput1"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="salesperson2">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control saleInput2"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="businessMac">'+'<select class="form-control selectpicker">'+'<option>'+'</select>'+'</td>'+
        '<td class="staging">'+'<input type="checkbox" class="stagingCheck">'+'</td>'+
        '<td class="productRemark">'+'<input type="text" class="form-control"/>'+'</td>'+
        '<td class="storageName">'+'<span class="proStorageName">'+'</span>'+'<span class="productStorageId" style="display:none">'+'</span>'+'</td>'+
        '</tr>'
    function addGiftRow(productModel,storageModel){
        var giftRowId=$(".sureButton").attr("giftIds");
        var giftArry=giftRowId.split("")
        var giftNumArry=[]
        var idsNumber
        if(giftArry.length>0){
            for(var i=0;i<giftArry.length;i++){
                if(i>8){
                    giftNumArry.push(giftArry[i])
                }
            }
        }
        if(giftNumArry.length>0){
            idsNumber=giftNumArry.join("")
        }
        $("#"+giftRowId).before(giftHtml)
        $('#productInfoTable tbody').find("#"+giftRowId).prev().find(".saleInput1").val($("#saleInput").val());
        $('#productInfoTable tbody').find("#"+giftRowId).prev().find(".saleInput1").data("employeeId",$("#saleInput").data("employeeId"))
        $("#addproductInfo_"+idsNumber).find(".changeGift").attr("disabled",true)
        $(".sureButton").removeAttr("giftIds");
        if(idsNumber){
            $("#addproductInfo_"+idsNumber).nextUntil("#"+giftRowId).each(function(index,value){
                $(this).attr("id",giftRowId+'_'+(index+1))
                $(this).find('.productRowNumber').text(idsNumber+'.'+(index+1))
                if($("#"+giftRowId+'_'+(index+1)).find('.productInfo').children().children().find('.productInfoName').val()==""){
                    addProductInfo(productModel,storageModel,"#"+giftRowId+'_'+(index+1));

                }
            })
        }

    }
//新增商品或赠品信息
    function addProductInfo(productModel,storageModel,trId){
        if(productModel.name!=""&&storageModel.storageName!=""){
//		if(productModel.ifManageImei == '0'){
//			isEntryArr.push(productModel.goodsId+storageModel.storageId);
//		}else{
//			isEntryArr.push(productModel.goodsId+storageModel.imeiId);
//		}

            var saleManName=$("#saleInput").val();
            var saleManIds=$("#saleInput").data("employeeId")
            $("#productInfoTable tbody "+trId).find(".inputdiscountRate").removeAttr("readonly");
            $("#productInfoTable tbody "+trId).find(".inputdiscountUnitPrice").removeAttr("readonly");
            $("#productInfoTable tbody "+trId).find(".inputdiscountUnitPrice").removeAttr("readonly");
            $("#productInfoTable tbody "+trId).find(".inputdiscountAmount").removeAttr("readonly");
            $("#productInfoTable tbody "+trId).find(".stagingCheck").removeAttr("disabled");
            $("#productInfoTable tbody "+trId).find(".productRemark").children().removeAttr("readonly");
            $("#productInfoTable tbody "+trId).find(".productNumber").children().val(1);
            $("#productInfoTable tbody "+trId).find('.saleInput1').val(saleManName).data('employeeId',saleManIds)
            $("#productInfoTable tbody "+trId).find('.saleInput1').storeSales({
                sectionId:'storeInput',
                search:false,
            })
            $("#productInfoTable tbody "+trId).find('.saleInput2').storeSales({
                sectionId:'storeInput',
                search:false
            })
            var title = "";
            if(productModel.code !== ""&& productModel.code !== undefined){
                title+= '编码 :'+productModel.code;
            }
            if(productModel.models !== ""&& productModel.models !== undefined){
                title+= '、型号 :'+productModel.models;
            }
            if(productModel.color !== ""&& productModel.color !== undefined){
                title+= '、颜色 :'+productModel.color;
            }
            if(productModel.categoryName !== ""&& productModel.categoryName !== undefined){
                title+= '、类别 :'+productModel.categoryName;
            }
            if(productModel.configure !== ""&& productModel.configure !== undefined){
                title+= '、配置 :'+productModel.configure;
            }
            $("#productInfoTable tbody "+trId).find(".productInfo").find(".productInfoName").val(productModel.name).attr('title',title);
            if(productModel.ifManageImei == '0'){
                $("#productInfoTable tbody "+trId).find(".productInfo").find(".goodsIds").text(productModel.goodsId+ '' +storageModel.storageId);
            }else{
                $("#productInfoTable tbody "+trId).find(".productInfo").find(".goodsIds").text(productModel.goodsId+''+storageModel.imeiId);
            }
            $("#productInfoTable tbody "+trId).find(".productInfo").find(".goodsId").text(productModel.goodsId);
            $("#productInfoTable tbody "+trId).find(".productInfo").find(".imeiManage").text(productModel.ifManageImei);
            $("#productInfoTable tbody "+trId).find(".discountUnitPrice").find(".inputdiscountUnitPrice").val(productModel.retailPrice);
            $("#productInfoTable tbody "+trId).find(".discountAmount").find(".inputdiscountAmount").val(productModel.retailPrice);
            $("#productInfoTable tbody "+trId).find(".businessMac").children().html(contractMacOpt)
            $("#productInfoTable tbody "+trId).find(".productPrice").html(productModel.retailPrice)
            $("#productInfoTable tbody "+trId).find(".storageName").find(".proStorageName").html(storageModel.storageName)
            $("#productInfoTable tbody "+trId).find(".storageName").find(".productStorageId").html(storageModel.storageId)
            if((storageModel.imei==undefined||storageModel.imei==null||storageModel.imei=="")&&
                (storageModel.auximei==undefined||storageModel.auximei==null||storageModel.auximei=="")&&
                (productModel.barcode==undefined||productModel.barcode==null||productModel.barcode=="")){
                $("#productInfoTable tbody "+trId).find(".imeiInfo").html("")
            }else if((storageModel.imei==undefined||storageModel.imei==null||storageModel.imei=="")&&
                (storageModel.auximei==undefined||storageModel.auximei==null||storageModel.auximei=="")&&
                (productModel.barcode!=undefined&&productModel.barcode!=null&&productModel.barcode!="")){
                $("#productInfoTable tbody "+trId).find(".imeiInfo").html('条码:'+productModel.barcode)
            }else if((storageModel.imei!=undefined&&storageModel.imei!=null&&storageModel.imei!="")&&
                (storageModel.auximei==undefined||storageModel.auximei==null||storageModel.auximei=="")){
                $("#productInfoTable tbody "+trId).find(".imeiInfo").html('<div>'+'<span>主串:'+storageModel.imei+'</span>'+'<span class="retailimeiId" style="display:none">'+storageModel.imeiId+'</span>'+'</div>')
            }else if((storageModel.imei!=undefined&&storageModel.imei!=null&&storageModel.imei!="")&&
                (storageModel.auximei!=undefined&&storageModel.auximei!=null&&storageModel.auximei!="")){
                var imeiHtml='<div>'+'<span>主串:'+storageModel.imei+'</span>'+'<span class="retailimeiId" style="display:none">'+storageModel.imeiId+'</span>'+'</div>'+'<div>辅串:'+storageModel.auximei+'</div>'
                $("#productInfoTable tbody "+trId).find(".imeiInfo").html(imeiHtml)
            }
            if(productModel.ifManageImei==1){
                $("#productInfoTable tbody "+trId).find(".productNumber").children().attr("readonly","readonly")
                $("#productInfoTable tbody "+trId).find(".productNumber").val(1)
            }else if(productModel.ifManageImei==0){
                $("#productInfoTable tbody "+trId).find(".productNumber").children().removeAttr("readonly")
                $("#productInfoTable tbody "+trId).find(".productNumber").children().val(1)
            }

            if(($("#productInfoTable tbody "+trId).find(".changeGift").attr("checked")=="checked"||
                    $("#productInfoTable tbody "+trId).find(".changeGift").attr("checked")==true)&&
                (Number(productModel.retailPrice)==0||productModel.retailPrice==null||productModel.retailPrice==undefined)){
                $("#productInfoTable tbody "+trId).find(".discountRate").children().val(0);
                $("#productInfoTable tbody "+trId).find(".discountRate").children().attr("readonly","readonly");
                $("#productInfoTable tbody "+trId).find(".discountUnitPrice").children().val(0);
                $("#productInfoTable tbody "+trId).find(".discountUnitPrice").children().attr("readonly","readonly");
                $("#productInfoTable tbody "+trId).find(".discountAmount").children().val(0);
                $("#productInfoTable tbody "+trId).find(".discountAmount").children().attr("readonly","readonly");
            }else if($("#productInfoTable tbody "+trId).find(".changeGift").attr("checked")=="checked"||
                $("#productInfoTable tbody "+trId).find(".changeGift").attr("checked")==true&&
                Number(productModel.retailPrice)>0){
                $("#productInfoTable tbody "+trId).find(".discountRate").children().val(0);
                $("#productInfoTable tbody "+trId).find(".discountRate").children().attr("readonly","readonly");
                $("#productInfoTable tbody "+trId).find(".discountUnitPrice").children().val(0);
                $("#productInfoTable tbody "+trId).find(".discountUnitPrice").children().attr("readonly","readonly");
                $("#productInfoTable tbody "+trId).find(".discountAmount").children().val(0);
                $("#productInfoTable tbody "+trId).find(".discountAmount").children().attr("readonly","readonly");
            }else if(($("#productInfoTable tbody "+trId).find(".changeGift").attr("checked")!="checked"&&
                    $("#productInfoTable tbody "+trId).find(".changeGift").attr("checked")!=true)&&
                (Number(productModel.retailPrice)==0||productModel.retailPrice==null||productModel.retailPrice==undefined)){
                $("#productInfoTable tbody "+trId).find(".discountRate").children().val(100);
                $("#productInfoTable tbody "+trId).find(".discountRate").children().attr("readonly","readonly");
            }else if(($("#productInfoTable tbody "+trId).find(".changeGift").attr("checked")!="checked"&&
                    $("#productInfoTable tbody "+trId).find(".changeGift").attr("checked")!=true)&&Number(productModel.retailPrice)>0){
                $("#productInfoTable tbody "+trId).find(".discountRate").children().val(100);
                $("#productInfoTable tbody "+trId).find(".discountRate").children().removeAttr("readonly");
            }
        }
        $('.inputProductNum').blur();
        getProductNumber()//获取商品和赠品序号
    }

//当商品数量变化时，计算折扣金额
    $(document).on('blur','.inputProductNum',function(){
        var productRowId=$(this).parent().parent().attr("id")
        if(Number($("#productInfoTable tbody #"+productRowId).find(".productPrice").text())>0){
            if(Number($("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val())>=0){
                var amount=Number($("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val())*Number($("#productInfoTable tbody #"+productRowId).find(".productNumber").children().val())
                $("#productInfoTable tbody #"+productRowId).find(".discountAmount").children().val(amount.toFixed(2))
            }
            var productDiscountAmountSum=0
            $("#productInfoTable tbody tr").each(function(index,value){
                if($(this).find(".discountAmount").children().val()!=undefined){
                    var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                    productDiscountAmountSum=accAdd(Number(productDiscountAmountSum),inputDiscountCountAmount)
                }
            })
            $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
        }else if(Number($("#productInfoTable tbody #"+productRowId).find(".productPrice").text())==0){
            if(Number($("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val())>=0){
                var amount=Number($("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val())*Number($("#productInfoTable tbody #"+productRowId).find(".productNumber").children().val())
                $("#productInfoTable tbody #"+productRowId).find(".discountAmount").children().val(amount.toFixed(2))
            }
            var productDiscountAmountSum=0
            $("#productInfoTable tbody tr").each(function(index,value){
                if($(this).find(".discountAmount").children().val()!=undefined){
                    var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                    productDiscountAmountSum=accAdd(Number(productDiscountAmountSum),inputDiscountCountAmount)
                }
            })
            $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
        }
        countAmount(countAmountDue,countAmountOfArrears,true);
    })
//当商品单价变化时，计算折扣金额
    $(document).on('change','.inputdiscountUnitPrice',function(){
        var productRowId=$(this).parent().parent().attr("id")
        if(Number($("#productInfoTable tbody #"+productRowId).find(".productPrice").text())>0){
            if(Number($("#productInfoTable tbody #"+productRowId).find(".productNumber").children().val())>=0){
                var amount=Number($("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val())*Number($("#productInfoTable tbody #"+productRowId).find(".productNumber").children().val())
                $("#productInfoTable tbody #"+productRowId).find(".discountAmount").children().val(amount.toFixed(2))
            }
            var productDiscountAmountSum=0
            $("#productInfoTable tbody tr").each(function(index,value){
                if($(this).find(".discountAmount").children().val()!=undefined){
                    var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                    productDiscountAmountSum=accAdd(Number(productDiscountAmountSum),inputDiscountCountAmount)
                }
            })
            $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
        }else if(Number($("#productInfoTable tbody #"+productRowId).find(".productPrice").text())==0){
            if(Number($("#productInfoTable tbody #"+productRowId).find(".productNumber").children().val())>=0){
                var amount=Number($("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val())*Number($("#productInfoTable tbody #"+productRowId).find(".productNumber").children().val())
                $("#productInfoTable tbody #"+productRowId).find(".discountAmount").children().val(amount.toFixed(2))
            }
            var productDiscountAmountSum=0
            $("#productInfoTable tbody tr").each(function(index,value){
                if($(this).find(".discountAmount").children().val()!=undefined){
                    var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                    productDiscountAmountSum=accAdd(Number(productDiscountAmountSum),inputDiscountCountAmount)
                }
            })
            $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
        }
        $('.inputdiscountAmount').change();
        countAmount(countAmountDue,countAmountOfArrears,true);

    })
//当商品折扣率变化时，计算折扣金额
    $(document).on('change','.inputdiscountRate',function(){
        var productRowId=$(this).parent().parent().attr("id")
        if(Number($("#productInfoTable tbody #"+productRowId).find(".productPrice").text())>0){
            var discountUnitPrice=Number($("#productInfoTable tbody #"+productRowId).find(".productPrice").text())*Number($("#productInfoTable tbody #"+productRowId).find(".discountRate").children().val())/100
            $("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val(discountUnitPrice.toFixed(2))
            if(Number($("#productInfoTable tbody #"+productRowId).find(".productNumber").children().val())>=0){
                var discountAmount=Number(discountUnitPrice)*Number($("#productInfoTable tbody #"+productRowId).find(".productNumber").children().val())
                $("#productInfoTable tbody #"+productRowId).find(".discountAmount").children().val(discountAmount.toFixed(2))
            }
            var productDiscountAmountSum=0
            $("#productInfoTable tbody tr").each(function(index,value){
                if($(this).find(".discountAmount").children().val()!=undefined){
                    var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                    productDiscountAmountSum=accAdd(Number(productDiscountAmountSum),inputDiscountCountAmount)
                }
            })
            $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
        }
        countAmount(countAmountDue,countAmountOfArrears,true);
    })
//当商品折扣金额变化时，计算折扣率和折扣单价
    $(document).on('change','.inputdiscountAmount',function(){
        var productRowId=$(this).parent().parent().attr("id")
        if(Number($("#productInfoTable tbody #"+productRowId).find(".inputdiscountAmount").val())>0){
            if(Number($("#productInfoTable tbody #"+productRowId).find(".inputProductNum").val())>=0){
                var discountUnitPrice=Number($("#productInfoTable tbody #"+productRowId).find(".inputdiscountAmount").val())/Number($("#productInfoTable tbody #"+productRowId).find(".inputProductNum").val())
                $("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val(discountUnitPrice.toFixed(2))
            }
            if(Number($("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val())>=0){
                if(Number($("#productInfoTable tbody #"+productRowId).find(".productPrice").text()) == '0'){
                    $("#productInfoTable tbody #"+productRowId).find(".discountRate").children().val('100')

                }else{
                    var discountRate=Number($("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val())/Number($("#productInfoTable tbody #"+productRowId).find(".productPrice").text())*100
                    $("#productInfoTable tbody #"+productRowId).find(".discountRate").children().val(discountRate.toFixed(2))
                }

            }
            var productDiscountAmountSum=0
            $("#productInfoTable tbody tr").each(function(index,value){
                if($(this).find(".discountAmount").children().val()!=undefined){
                    var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                    productDiscountAmountSum=accAdd(Number(productDiscountAmountSum),inputDiscountCountAmount)
                }
            })
            productDiscountAmountSum = (productDiscountAmountSum*1).toFixed(2);
            $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
        }else if(Number($("#productInfoTable tbody #"+productRowId).find(".productPrice").text())==0){
            if(Number($("#productInfoTable tbody #"+productRowId).find(".productNumber").children().val())>=0){
                var unitPrice=Number($("#productInfoTable tbody #"+productRowId).find(".discountAmount").children().val())/Number($("#productInfoTable tbody #"+productRowId).find(".productNumber").children().val())
                unitPrice = isNaN(unitPrice)?0:unitPrice;
                $("#productInfoTable tbody #"+productRowId).find(".discountUnitPrice").children().val(unitPrice.toFixed(2))
            }
            var productDiscountAmountSum=0;
            $("#productInfoTable tbody tr").each(function(index,value){
                if($(this).find(".discountAmount").children().val()!=undefined){
                    var inputDiscountCountAmount=Number($(this).find(".discountAmount").children().val())
                    productDiscountAmountSum=accAdd(Number(productDiscountAmountSum),inputDiscountCountAmount)
                }
            })
            productDiscountAmountSum = (productDiscountAmountSum*1).toFixed(2);
            $("#productInfoTable tfoot tr td:eq(8)").text(productDiscountAmountSum)
        }
        countAmount(countAmountDue,countAmountOfArrears,true);
    })
//获取商品序号
    var addValueproductNum
    function getProductNumber(proNumCallBack,resetSymbol){
        var productAndGiftNumber=[];
        var productNumOption='<option>'+'</optiotn>'
        $("#productInfoTable tbody tr").each(function(){
            if($(this).find(".goodsId").text()!=undefined&&$(this).find(".goodsId").text()!=""){
                var productNum=$(this).find(".productRowNumber").text()
                if(productNum!=""){
                    productAndGiftNumber.push(productNum)
                }
            }
        })
        if(productAndGiftNumber.length>0){
            productAndGiftNumber.map(function (productNumOpt,index){
                productNumOption=productNumOption+'<option value="'+productNumOpt+'">'+productNumOpt+'</option>'
            })
            $("#Value-addedTable tbody tr").each(function(index,value){
                $(this).find(".addValueProductNumber").html(productNumOption);
                $(this).find(".addValueProductName span").text("");
                $(this).find(".phoneImei span").text("");
            })
            addValueproductNum=productNumOption
        }
        if(resetSymbol==true){
            proNumCallBack()
        }
    }
    function getProductNumbers(ind){
        var productAndGiftNumber=[];
        var productNumOption='<option>'+'</optiotn>'
        $("#productInfoTable tbody tr").each(function(){
            if($(this).find(".goodsId").text()!=undefined&&$(this).find(".goodsId").text()!=""){
                var productNum=$(this).find(".productRowNumber").text()
                if(productNum!=""){
                    productAndGiftNumber.push(productNum)
                }
            }
        })
        if(productAndGiftNumber.length>0){
            productAndGiftNumber.map(function (productNumOpt,index){
                productNumOption += '<option value='+productNumOpt+'>'+productNumOpt+'</option>'
            })
            $(".addValueProductNumber").eq(ind).html(productNumOption);
            addValueproductNum=productNumOption
        }
    }

//清空商品或赠品信息
    function clearProductInfo(trId){
        $("#productInfoTable tbody "+trId).find('.changeGift').prop('checked',false);
        $("#productInfoTable tbody "+trId).find(".productInfo").find(".productInfoName").val("").removeAttr('title');
        $("#productInfoTable tbody "+trId).find(".productInfo").find(".goodsId").text("");
        $("#productInfoTable tbody "+trId).find(".productInfo").find(".imeiManage").text("");
//	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productCode").html("");
//	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productModel").html("");
//	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productColor").html("");
//	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productCatory").html("");
//	$("#productInfoTable tbody "+trId).find(".productInfo").find(".productconfig").html("");
        $("#productInfoTable tbody "+trId).find(".productInfo").find(".saleInput1").val("");
        $("#productInfoTable tbody "+trId).find(".productInfo").find(".saleInput1").attr("disabled","disabled");
        $("#productInfoTable tbody "+trId).find(".productInfo").find(".saleInput2").val("");
        $("#productInfoTable tbody "+trId).find(".productInfo").find(".saleInput2").attr("disabled","disabled");
        $("#productInfoTable tbody "+trId).find(".imeiInfo").html("");
        $("#productInfoTable tbody "+trId).find(".discountRate").children().attr("readonly","readonly");
        $("#productInfoTable tbody "+trId).find(".discountRate").children().val("");
        $("#productInfoTable tbody "+trId).find(".productNumber").children().attr("readonly","readonly");
        $("#productInfoTable tbody "+trId).find(".productNumber").children().val("");
        $("#productInfoTable tbody "+trId).find(".productPrice").html("");
        $("#productInfoTable tbody "+trId).find(".discountUnitPrice").children().val("");
        $("#productInfoTable tbody "+trId).find(".discountUnitPrice").children().attr("readonly","readonly");
        $("#productInfoTable tbody "+trId).find(".discountAmount").children().val("");
        $("#productInfoTable tbody "+trId).find(".discountAmount").children().attr("readonly","readonly");
        $("#productInfoTable tbody "+trId).find(".productRemark").children().val("");
        $("#productInfoTable tbody "+trId).find(".productRemark").children().attr("readonly","readonly");
        $("#productInfoTable tbody "+trId).find(".businessMac").find(".selectpicker").val("")
        $("#productInfoTable tbody "+trId).find(".businessMac").find(".selectpicker").html("")
        $("#productInfoTable tbody "+trId).find(".storageName").children().text("")
        $("#productInfoTable tbody "+trId).find(".staging").children().prop("checked",false)
        $("#productInfoTable tbody "+trId).find(".staging").children().attr("disabled","disabled")
        $("#productInfoTable tbody "+trId).find(".saleInput1").val("");
        $("#productInfoTable tbody "+trId).find(".saleInput1").attr("disabled","disabled");
        $("#productInfoTable tbody "+trId).find(".saleInput2").val("");
        $("#productInfoTable tbody "+trId).find(".saleInput2").attr("disabled","disabled");

    }
    //面板收缩展开
    function panelShow(idName,className){
        $(idName).click(function(){
            $(className).toggle()
            $(this).children().toggle()
        })
        $(idName).next("span").click(function(){
            $(className).toggle()
            $(this).siblings(".hideImg").children().toggle()
        })
    }


    //商品类别树
    function getGoodsClass(){
        $.request({
            type:'POST',
            url:'/manager/component/goods/getGoodsClassTreeNodeVoList',
            dataType:'json',
            data:{},
            success:function(data){
                if(data.result==1){
                    var res=data.data.dataList;
                    if(res == undefined){
                        return
                    }
                    if(!res.length){
                        $.zxsaas_plus.showalert('warning','条目为空！');
                    }else{
                        $.fn.zTree.init($("#goodsTree"),{
                            data: {
                                simpleData: {
                                    enable: true,
                                    idKey: "id",
                                    pIdKey: "parentId",
                                    rootPId: ''
                                }
                            },
                            view: {
                                showLine: true
                            },
                            callback: {
                                onClick: function (event, treeId, treeNode) {
                                    var productId=treeNode.id
                                    $('#storageTable').hide()
                                    if(productId==-1){
                                        $("#retailgridProduct").jqGrid('setGridParam', {
                                            datatype:'json',
                                            postData:{
                                                menuCode:$('#AUTH').data('code'),
                                                sectionId:$("#storeInput").data("sectionId"),
                                                queryKey:$("#retailSearchProduct").val(),
                                                typeId:"",
                                                page:1,
                                                rows:10,
                                            }
                                        }).trigger("reloadGrid");
                                    }else{
                                        $("#retailgridProduct").jqGrid('setGridParam', {
                                            datatype:'json',
                                            postData:{
                                                menuCode:$('#AUTH').data('code'),
                                                sectionId:$("#storeInput").data("sectionId"),
                                                queryKey:$("#retailSearchProduct").val(),
                                                typeId:productId,
                                                page:1,
                                                rows:10,
                                            }
                                        }).trigger("reloadGrid");
                                    }
                                }
                            }
                        },res);
                        // $.fn.zTree.getZTreeObj("spmcDataTree").expandAll(true);
                        var treeObj = $.fn.zTree.getZTreeObj("goodsTree");
                        var nodes = treeObj.getNodes();
                        for (var i = 0; i < nodes.length; i++) { //设置节点展开
                            treeObj.expandNode(nodes[i], true, false, false);
                        }
                    }
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })
    }
    //商品信息
    var productModel={
        name:"",
        goodsId:"",
        code:"",
        color:"",
        models:"",
        categoryName:"",
        retailPrice:"",
        barcode:"",
        ifManageImei:"",
        configure:""
    }
    $.jgrid.defaults.width = 380;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastrow = null,lastcell = null;
    $('#retailgridProduct').jqGrid({
        scroll:1,
        gridview:true,
        url:'/manager/component/goods/getOutSectionStockGoodsVoPageList',
        mtype: "POST",
        datatype: "local",
        jsonReader: {
            root: "data.dataList",
            total: "data.total",
            records: "data.records",
            repeatitems: false
        },
        colNames:['商品名称','商品编码','现库存','商品id','商品类别','型号','颜色','条码','标价','是否串号管理'],
        colModel:[
            {name: 'name', index: 'name', width: 230, align: 'left', sorttype: 'string', sortable: false,},
            {name: 'code', index: 'code', width: 100, align: 'left', sortable: false},
            {name: 'stockCount', index: 'stockCount', width: 100, align: 'left', sortable: false},
            {name: 'dataId', index: 'dataId', width: 80, align: 'center', sorttype: 'string', sortable: false,hidden:true},
            {name: 'categoryName', index: 'categoryName', width: 100, align: 'left', sortable: false},
            {name: 'models', index: 'models', width: 100, align: 'left', sortable: false},
            {name: 'color', index: 'color', width: 100, align: 'left', sorttype: 'string', sortable: false,},
            {name: 'barcode', index: 'barcode', width: 100, align: 'left', sortable: false,hidden:true},
            {name: 'retailPrice', index: 'retailPrice', width: 100, align: 'right', sortable: false,hidden:true},
            {name: 'ifManageImei', index: 'ifManageImei', width: 100, align: 'center', sortable: false,hidden:true},

        ],
        sortable:false,
        rownumbers:true,
        cellsubmit:'clientArray', //单元格保存内容的位置
        editurl:'clientArray',
        rowNum:10,
        rowList:[10, 15, 20, 25, 40],
        pager:'#retailgridPager',
        viewrecords:true,
        multiboxonly:true,
        multiselect:true,
//	    cellEdit:true,
        width:"100%",
        height:350,
        autowidth:true,
        onselectrow:true,
        rownumWidth:35,
        shrinkToFit:false,
//	    footerrow:false,
//	    userDataOnFooter:true,
        ondblClickRow: function(id){
            var rowDtata=$("#retailgridProduct").jqGrid('getRowData',id)

            $("#retailgridStorage").jqGrid('setGridParam', {
                datatype:'json',
                postData:{
                    sectionId:$("#storeInput").data("sectionId"),
                    goodsId:rowDtata.dataId,
                    ifManageImei:rowDtata.ifManageImei
                }
            }).trigger("reloadGrid");
//		    	$("#myModal-document").css({width:"1250px"})
// 				$("#storageTable").css({display:"block"})
            var rowid = jQuery("#retailgridProduct").jqGrid("getGridParam", "selrow");
            var ids=jQuery("#retailgridProduct").jqGrid("getDataIDs");
            if(rowid){
                if(ids.length>0){
                    for(var i=0;i<ids.length;i++){
                        $("#jqg_retailgridProduct_"+ids[i]).prop("checked",false)
                    }
                }
                $("#jqg_retailgridProduct_"+id).prop("checked",true)
            }
            productModel.name=rowDtata.name;
            productModel.goodsId=rowDtata.dataId;
            productModel.code=rowDtata.code;
            productModel.color=rowDtata.color;
            productModel.models=rowDtata.models;
            productModel.categoryName=rowDtata.categoryName;
            productModel.retailPrice=rowDtata.retailPrice;
            productModel.barcode=rowDtata.barcode;
            productModel.ifManageImei=rowDtata.ifManageImei;
            productModel.configure=rowDtata.configure;
            storageModel={};
        },
        beforeEditCell: function(rowid, cellname, v, iRow, iCol){
            lastrow = iRow;
            lastcell = iCol;
        },
        afterSaveCell: function(rowid, cellname, value, iRow, iCol){},
        onCellSelect: function(rowid, index, e){},
        onSelectRow: function(id){
            var rowDtata=$("#retailgridProduct").jqGrid('getRowData',id)
            $("#retailgridStorage").jqGrid('setGridParam', {
                datatype:'json',
                postData:{
                    sectionId:$("#storeInput").data("sectionId"),
                    goodsId:rowDtata.dataId,
                    ifManageImei:rowDtata.ifManageImei
                }
            }).trigger("reloadGrid");

            // $("#myModal-document").css({width:"1250px"})
            // $("#storageTable").css({display:"block"})
            productModel.name=rowDtata.name;
            productModel.goodsId=rowDtata.dataId;
            productModel.code=rowDtata.code;
            productModel.color=rowDtata.color;
            productModel.models=rowDtata.models;
            productModel.categoryName=rowDtata.categoryName;
            productModel.retailPrice=rowDtata.retailPrice;
            productModel.barcode=rowDtata.barcode;
            productModel.ifManageImei=rowDtata.ifManageImei;
            productModel.configure=rowDtata.configure;
            storageModel={};
        },
        beforeSelectRow: function(rowid,e){
            $('#retailgridProduct').jqGrid('resetSelection')
            return(true);
        },
        onSelectAll:function(aRowids,status){
            $('#retailgridProduct').jqGrid('resetSelection');
            $.zxsaas_plus.showalert("提示","只能单选，请重新选择");

            return(true);
        },
        afterInsertRow: function(rowid, aData){ //新增一行之后
        },
        gridComplete:function(){

        },
        loadComplete: function(data){

        }
    })
    //仓库信息
    var storageModel={
        storageName:"",
        stockCounter:"",
        storageId:"",
        imei:"",
        auximei:"",
        remark:"",
        imeiId:"",
    }
    $.jgrid.defaults.width = 380;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastrow = null,lastcell = null;
    $('#retailgridStorage').jqGrid({
        url:'/manager/component/goods/getGoodsStockIemiVoList',
        mtype: "POST",
        datatype: "local",
        jsonReader: {
            root: "data.dataList",
            total: "",
            records: "",
            repeatitems: false
        },
        colNames:['仓库','仓库id','数量','主串号','主串id','辅助串号','串号备注'],
        colModel:[
            {name: 'storageName', index: 'storageName', width:100, align: 'center', sortable: false},
            {name: 'storageId', index: 'storageId', width:100, align: 'center', sortable: false,hidden:true},
            {name: 'stockCount', index: 'stockCount', width:80, align: 'right', sorttype: 'string', sortable: false},
            {name: 'imei', index: 'imei', width:100, align: 'center', sortable: false},
            {name: 'imeiId', index: 'imeiId', width:100, align: 'center', sortable: false,hidden:true},
            {name: 'auxiliaryImei', index: 'auxiliaryImei', width: 100, align: 'center', sortable: false},
            {name: 'remark', index: 'remark', width:150, align: 'left', sorttype: 'string', sortable: false, editable: true, edittype: 'custom',},

        ],
        sortable:false,
        sortorder:'asc',
        rownumbers:false,
        cellsubmit:'clientArray', //单元格保存内容的位置
        editurl:'clientArray',
        rowNum:1000,
        rowList:[10, 15, 20, 25, 40],
        viewrecords:true,
        multiselect:false,
//	    cellEdit:true,
        width:"auto",
        height:350,
        autowidth:true,
        rownumWidth:35,
        shrinkToFit:true,
        footerrow:false,
        userDataOnFooter:true,
        onSelectRow: function(id){
            var rowData=$("#retailgridStorage").jqGrid('getRowData',id)
            storageModel.storageName=rowData.storageName;
            storageModel.stockCounter=rowData.stockCount;
            storageModel.storageId=rowData.storageId;
            storageModel.imei=rowData.imei;
            storageModel.imeiId=rowData.imeiId;
            storageModel.auximei=rowData.auxiliaryImei;
            storageModel.remark=rowData.remark;
        },
        ondblClickRow: function(id){
            $('.sureButton').click();
        },
        beforeEditCell: function(rowid, cellname, v, iRow, iCol){
            lastrow = iRow;
            lastcell = iCol;
        },
        loadComplete: function(data){
            if(data.data != undefined  && data.data.dataList.length==1){
                var rowData=data.data.dataList[0]
                storageModel.storageName=rowData.storageName;
                storageModel.stockCounter=rowData.stockCount;
                storageModel.storageId=rowData.storageId;
                storageModel.imei=rowData.imei;
                storageModel.imeiId=rowData.imeiId;
                storageModel.auximei=rowData.auxiliaryImei;
                storageModel.remark=rowData.remark;
                $('.sureButton').click();
            }else{
                if(data.data != undefined){
                    $("#myModal-document").css({width:"1250px"})
                    $("#storageTable").css({display:"block"})
                }

            }
        }
    })
    //合约机
    var contractMacOpt='<option>'+'</option>'
    function contractMac(contractCallBack,symbol){
        contractMacOpt='<option>'+'</option>';
        $.request({
            type:'POST',
            url:'/manager/inventory/retail/delivery/getBusList',
            dataType:'json',
            data:{},
            success:function(data){
                if(data.result==1){
                    var busList=data.data.busList;
                    busList.map(function(busListOpt,i){
                        contractMacOpt=contractMacOpt+'<option value="'+busListOpt.code+'">'+busListOpt.content+'</option>'
                    })
                    if(symbol==true){
                        contractCallBack
                    }

                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })

    }
    $(document).on('change', '.selectpicker', function() {
        if($(this).val()!=""){
            $(".carrBusin").css("display","block");
            $("#carrierImg").children().toggle();
        }
        var stagingChecked=[]
        var stagingSelectUnit=[]
        $("#productInfoTable tbody tr").find(".businessMac").each(function(index,value){
            if($(this).children().val()!=""&&$(this).children().val()!=undefined){
                stagingChecked.push(index)
            }
        })
        $("#carrBusinTable").find(".carrBusinRow").each(function(index,value){
            if($(this).find(".carrSelectUnit").children().val()!=""&&$(this).find(".stagSelectUnit").children().val()!="null"
                &&$(this).find(".carrSelectUnit").children().val()!=null
            ){
                stagingSelectUnit.push(index)
            }
        })
        if(stagingChecked.length==0&&stagingSelectUnit.length==0){
            $(".carrBusin").css("display","none");
            $("#carrierImg").children().toggle();
        }

        disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
        $("#carrBusinTable tbody tr").each(function(index,value){
            if($(this).find(".carrSaleInput1").val()==""){
                $(this).find(".carrSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
            }
        })

    })
    //运营商新增行
    var carrHtml='<tr class="text-center carrBusinRow">'+
        '<td>'+'<span class="glyphicon glyphicon-trash carrDelete">'+'</span>'+'</td>'+
        '<td class="carrRowNumber">'+'</td>'+
        '<td class="carrSelectUnit">'+'<select class="form-control carrBusinSelectUnit">'+'</select>'+'</td>'+


        '<td class="carrSelectName">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control carrSlectNameInput"  placeholder="请选择业务名称">'+'</div>'+'</div>'+'</td>'+


        '<td class="actualPayment">'+'<input type="text" class="form-control inputactualPayment"  onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
        '<td class="qty">'+'<input type="text" class="form-control inputqty"  onkeyup="checkInput.clearNoNum(this,12)"/>'+'</td>'+
        '<td class="commission">'+'<input type="text" readonly="readonly"  class="form-control inputcommission"  onkeyup="checkInput.checkNumFu(this,12)"/>'+'</td>'+
        '<td class="comissionEsit " >'+'<input type="text"  class="form-control inputcomissionEsit" onkeyup="checkInput.checkNumFu(this,12)" />'+'</td>'+
        '<td class="businessNum">'+'<input type="text" class="form-control"/>'+'</td>'+
        '<td class="carrTelephone">'+'<input type="text" class="form-control"/>'+'</td>'+
        '<td class="telephoneImei">'+'<input type="text" class="form-control"/>'+'</td>'+
        '<td class="discountMargin">'+'<input type="text" class="form-control inputdiscountMargin"  onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
        '<td class="carrBusinSale1">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control carrSaleInput1"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="carrBusinSale2">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control carrSaleInput2"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+

        '<td class="carrRemark">'+'<input type="text" class="form-control"/>'+'</td>'+
        '</tr>'
    $("#addcarrRow").click(function(){
        if($("#carrBusinTable").parent().css("display")=="none"){
            $("#carrBusinTable").parent().css({display:"block"})
            $('#carrierImg img:eq(1)').show()
            $('#carrierImg img:eq(0)').hide()
        }else if($("#carrBusinTable").parent().css("display")=="block"){
            var rowNumber=0;
            $("#carrBusinTable tbody").append(carrHtml);
            $("#carrBusinTable tbody tr").each(function(index,value){
                $(this).find(".carrRowNumber").text(index+1);
                $(this).attr("id","carrBusinRowNum_"+(index+1))
                disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
            })
            var carrBusinTrId=$("#carrBusinTable tbody tr:last").attr("id")
            $("#carrBusinTable tbody "+"#"+carrBusinTrId).find(".carrSelectUnit").children().html(carrBusinUnit)
            var saleManName=$("#saleInput").val();
            var saleManIds=$("#saleInput").data("employeeId")
            $("#carrBusinTable tbody tr:last").find(".carrSaleInput1").val(saleManName).data('employeeId',saleManIds)
            $("#carrBusinTable tbody tr").each(function(index,value){
                if($(this).find(".carrSaleInput1").val()==""){
                    $(this).find(".carrSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
                }
            })
        }
    })
    //运营商删除行
    $(document).on('click', '.carrDelete', function() {
        if($("#carrBusinTable tbody").children().length>1){
            $(this).parent().parent().remove();
            countBussinessMacAmount()
        }else if($("#carrBusinTable tbody").children().length==1){
            clearCarrData("#carrBusinRowNum_1");
            countBussinessMacAmount();
        }
        $("#carrBusinTable tbody tr").each(function(index,value){
            $(this).find(".carrRowNumber").text(index+1);
            $(this).attr("id","carrBusinRowNum_"+(index+1))
        })
        disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
    })
    //查询运营商往来单位
    var carrBusinUnit
    function searchCarrBusinUnit(){
        $.request({
            type:'GET',
            url:'/manager/inventory/common/getOperatorList',
            dataType:'json',
            success:function(data){
                if(data.result==1){
                    var  operatorList=data.data.operatorList;
                    operatorList.map(function(operatorListOpt,index){
                        carrBusinUnit=carrBusinUnit+'<option value="'+operatorListOpt.id+'">'+operatorListOpt.name+'</option>'
                    })
                    $("#carrBusinTable tbody #carrBusinRowNum_1").find(".carrSelectUnit").children().html(carrBusinUnit)
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })
    }
    //根据运营商往来单位查询业务名称
    $(document).on('change', '.carrBusinSelectUnit',function(){
        var trId=$(this).parent().parent().attr("id")
        var selectVal=$(this).val()
        if(selectVal!="null"&&selectVal!=undefined){
            createBusin(trId)
            $("#carrBusinTable tbody #"+trId).find(".actualPayment").children().val(0);
            $("#carrBusinTable tbody #"+trId).find(".discountMargin").children().val(0);
            $("#carrBusinTable tbody #"+trId).find(".qty").children().val(1);
            $("#carrBusinTable tbody #"+trId).find(".commission").children().val(0);
            $("#carrBusinTable tbody #"+trId).find(".comissionEsit").children().val(0);
        }else{
            var carrTotal_1 = $("#"+trId).find(".carrSelectName").find('.inputactualPayment').val()*1;
            var carrTotal_2 = $("#"+trId).find(".carrSelectName").find('.inputdiscountMargin').val()*1;
            var carrTotal_3 = $("#"+trId).find(".carrSelectName").find('.inputcomissionEsit').val()*1;
            var carrTotal_4 = $("#"+trId).find(".carrSelectName").find('.inputqty').val()*1;
            var carrTotal_5 = $("#"+trId).find(".carrSelectName").find('.inputcommission').val()*1;
            $('#carrTotal_1').text(accSubtr(($('#carrTotal_1').text())*1,carrTotal_1));
            $('#carrTotal_2').text(accSubtr(($('#carrTotal_2').text())*1,carrTotal_2));
            $('#carrTotal_3').text(accSubtr(($('#carrTotal_3').text())*1,carrTotal_3));
            $('#carrTotal_4').text(accSubtr(($('#carrTotal_4').text())*1,carrTotal_4));
            $('#carrTotal_5').text(accSubtr(($('#carrTotal_5').text())*1,carrTotal_5));

        }
        disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
        $("#carrBusinTable tbody tr").each(function(index,value){
            if($(this).find(".carrSaleInput1").val()==""){
                $(this).find(".carrSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
            }
        })
        countBussinessMacAmount();
    })

    function createBusin(trId) {
        $("#carrBusinTable tbody #"+trId).find(".carrSaleInput1").val($("#saleInput").val())
        $("#carrBusinTable tbody #"+trId).find('.carrSaleInput1').storeSales({
            sectionId:'storeInput',
            search:false,
        })
        $("#carrBusinTable tbody #"+trId).find('.carrSaleInput2').storeSales({
            sectionId:'storeInput',
            search:false
        })

        $("#carrBusinTable tbody #"+trId).find('.carrSlectNameInput').val('').removeData().comModalsBusinessArchives({
            multiselect:false,
            clickBefore:function(){
                $("#carrBusinTable tbody #"+trId).find('.carrSlectNameInput').comModalsBusinessArchives('setOption',{
                    girdParam:{
                        contactUnitId:$("#carrBusinTable tbody #"+trId).find('.carrBusinSelectUnit').val()
                    },
                })
            },
            clickback:function(arrList){
                var tr=$("#carrBusinTable tbody #"+trId)
                for(var i=0;i<arrList.length;i++){
                    tr.find('.inputcommission').val(Number(arrList[i].commission))
                }
                var amount =accMul(Number(tr.find('.inputcommission').val()),Number(tr.find('.inputqty').val()) )
                tr.find('.inputcomissionEsit').val(amount)
                countBussinessMacAmount()
            }

        })
    }
//当实际收款变化时，实际收款总额的改变
    $(document).on('blur','.inputactualPayment,.inputdiscountMargin,.inputcommission',function(){
        countBussinessMacAmount()
    })

    $(document).on('blur','.inputqty',function(){
        var _this=$(this)
        var tr=_this.closest('tr');
        var amount=accMul(Number(tr.find('.inputcommission ').val()),Number(_this.val()))
        tr.find('.inputcomissionEsit').val(amount)
        countBussinessMacAmount()
    })


    //当佣金预估发生变化时，佣金预估总额的变化
    $(document).on('blur','.inputcomissionEsit',function(){
        var reg = /^[\-\+]?\d+(\.\d{1,2})?$/;
        if(!reg.test($(this).val())||$(this).val()==0){
            $(this).val(0)
        }
        countBussinessMacAmount()
    })
    //计算实际收款、扣减保证金、佣金预估总额
    function countBussinessMacAmount(){
        var carrActualSum=0;
        var carrdiscountMargin=0;
        var carrCommission=0;
        var carrinputqty=0;
        var inputcommission=0;
        $("#carrBusinTable tbody tr").each(function(index,value){
            if($(this).find(".inputactualPayment").val()!=undefined){
                var carrActualPrice=$(this).find(".inputactualPayment").val()
                carrActualSum=accAdd(carrActualSum,Number(carrActualPrice))
            }
            if($(this).find(".inputdiscountMargin").val()!=undefined){
                var carrdiscountPrice=$(this).find(".inputdiscountMargin").val()
                carrdiscountMargin=accAdd(carrdiscountMargin,Number(carrdiscountPrice))
            }
            if($(this).find(".inputcomissionEsit").val()!=undefined){
                var carrCommissionPrice=$(this).find(".inputcomissionEsit").val()
                carrCommission=accAdd(carrCommission,Number(carrCommissionPrice))
            }
            if($(this).find(".inputqty").val()!=undefined){
                var carrinputqtyPrice=$(this).find(".inputqty").val()
                carrinputqty=accAdd(carrinputqty,Number(carrinputqtyPrice))
            }
            if($(this).find(".inputcommission").val()!=undefined){
                var inputcommissionPrice=$(this).find(".inputcommission").val()
                inputcommission=accAdd(inputcommission,Number(inputcommissionPrice))
            }
        })
        $("#carrTotal_1").text(carrActualSum);
        $("#carrTotal_2").text(carrdiscountMargin);
        $("#carrTotal_4").text(carrinputqty);
        $("#carrTotal_3").text(carrCommission);
        $("#carrTotal_5").text(inputcommission);
        countAmount(countAmountDue,countAmountOfArrears,true);
    }
    //清空运营商业务
    function clearCarrData(carrTrId){
        $("#carrBusinTable tbody "+carrTrId).find(".carrBusinSelectUnit").val("");
        $("#carrBusinTable tbody "+carrTrId).find(".carrSlectNameInput").val("").removeData();
        $("#carrBusinTable tbody "+carrTrId).find(".carrSlectNameInput").attr("disabled","disabled");
        $("#carrBusinTable tbody "+carrTrId).find(".inputactualPayment").val("");
        $("#carrBusinTable tbody "+carrTrId).find(".inputactualPayment").attr("disabled","disabled");
        $("#carrBusinTable tbody "+carrTrId).find(".businessNum").children().val("");
        $("#carrBusinTable tbody "+carrTrId).find(".businessNum").children().attr("disabled","disabled");
        $("#carrBusinTable tbody "+carrTrId).find(".businessNum").children().val("");
        $("#carrBusinTable tbody "+carrTrId).find(".businessNum").children().attr("disabled","disabled");
        $("#carrBusinTable tbody "+carrTrId).find(".carrTelephone").children().val("");
        $("#carrBusinTable tbody "+carrTrId).find(".carrTelephone").children().attr("disabled","disabled");
        $("#carrBusinTable tbody "+carrTrId).find(".telephoneImei").children().val("");
        $("#carrBusinTable tbody "+carrTrId).find(".telephoneImei").children().attr("disabled","disabled");
        $("#carrBusinTable tbody "+carrTrId).find(".discountMargin").children().val("");
        $("#carrBusinTable tbody "+carrTrId).find(".discountMargin").children().attr("disabled","disabled");
        $("#carrBusinTable tbody "+carrTrId).find(".carrSaleInput1").val("");
        $("#carrBusinTable tbody "+carrTrId).find(".carrSaleInput1").attr("disabled","disabled");
        $("#carrBusinTable tbody "+carrTrId).find(".carrSaleInput2").val("");
        $("#carrBusinTable tbody "+carrTrId).find(".carrSaleInput2").attr("disabled","disabled");
        $("#carrBusinTable tbody "+carrTrId).find(".inputcomissionEsit").val("");
        $("#carrBusinTable tbody "+carrTrId).find(".inputcomissionEsit").attr("disabled","disabled");
        $("#carrBusinTable tbody "+carrTrId).find(".carrRemark").children().val("");
        $("#carrBusinTable tbody "+carrTrId).find(".carrRemark").children().attr("disabled","disabled");
    }
    //当运用商服务名称为空时禁用列
    disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
    //增值服务新增行
    var valueHtml='<tr class="text-center addValueService">'+
        '<td>'+'<span class="glyphicon glyphicon-trash valueDelete">'+'</span>'+'</td>'+
        '<td class="valueRowNumber">'+'</td>'+
        '<td class="valueSelectName">'+'<select class="form-control addValueSelectName">'+'</select>'+'</td>'+
        '<td class="addValuesalesPeople1">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control addValueSaleInput1"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="realPayment">'+'<input type="text" class="form-control realPaymentInput" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
        '<td class="bissDate">'+'<div class="input-group col-sm-12">'+
        '<input type="text" class="form-control effectiveDate"  placeholder="请选择业务日期" readonly>'+
        '</div>'+'</td>'+
        '<td class="valueProductNumber">'+'<select class="form-control addValueProductNumber">'+'</select>'+'</td>'+
        '<td class="esitPrice">'+'</td>'+
        '<td class="valuePrice">'+'</td>'+
        '<td class="addValueProductName">'+'<span>'+'</span>'+'<span style="display:none">'+'</span>'+'</td>'+
        '<td class="phoneImei">'+'<span>'+'</span>'+'<span style="display:none">'+'</span>'+'</td>'+
        '<td class="usageCount">'+'</td>'+
        '<td class="limitDate">'+'</td>'+
        '<td class="addValuesalesPeople2">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control addValueSaleInput2"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="valueRemark">'+'<input type="text" class="form-control"/>'+'</td>'+
        '</tr>'
    $("#Value-added").click(function(){
        if($("#Value-addedTable").parent().css("display")=="none"){
            $("#Value-addedTable").parent().css({display:"block"})
            $("#Value-addedTable tbody").html(valueHtml);
            $("#Value-addedTable tbody tr").each(function(index,value){
                $(this).find(".valueRowNumber").text(index+1);
                $(this).attr("id","addValueService_"+(index+1));
                disabledCol("#Value-addedTable tbody tr",".valueSelectName",".addValueSelectName")
            })
            $('#addValueService_1').find('.addValueSelectName').html(addValueServiceNameOpt);
            getProductNumber();
            $('#Value-addedImg img:eq(1)').show()
            $('#Value-addedImg img:eq(0)').hide()
        }else if($("#Value-addedTable").parent().css("display")=="block"){
            var rowNumber=0;
            $("#Value-addedTable tbody").append(valueHtml);
            $("#Value-addedTable tbody tr").each(function(index,value){
                $(this).find(".valueRowNumber").text(index+1);
                $(this).attr("id","addValueService_"+(index+1));
                disabledCol("#Value-addedTable tbody tr",".valueSelectName",".addValueSelectName")
            })
            var addValueTrId=$("#Value-addedTable tbody tr:last").attr("id")
            $("#Value-addedTable tbody "+"#"+addValueTrId).find(".valueSelectName").children().html(addValueServiceNameOpt)
            $("#Value-addedTable tbody "+"#"+addValueTrId).find(".valueProductNumber").children().html(addValueproductNum)
            var saleManName=$("#saleInput").val();
            var saleManIds=$("#saleInput").data("employeeId");
            $("#Value-addedTable tbody tr:last").find(".addValueSaleInput1").val(saleManName).data('employeeId',saleManIds)
            $("#Value-addedTable tbody tr").each(function(index,value){
                if($(this).find(".addValueSaleInput1").val()==""){
                    $(this).find(".addValueSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
                }
            })
        }
    })
    //增值服务删除行
    $(document).on('click', '.valueDelete', function() {
        if($("#Value-addedTable tbody").children().length>1){
            $(this).parent().parent().remove();
            countAddValueAmount()
        }else if($("#Value-addedTable tbody").children().length==1){
            clearAddValueData("#addValueService_1");
            countAddValueAmount()
            getProductNumber()
        }
        $("#Value-addedTable tbody tr").each(function(index,value){
            $(this).find(".valueRowNumber").text(index+1);
            $(this).attr("id","addValueService_"+(index+1))
        })
        disabledCol("#Value-addedTable tbody tr",".valueSelectName",".addValueSelectName")
    })
    //查询增值服务的增值服务名称
    var addValueServiceNameOpt
    function addValueServiceName(){
        $.request({
            type:'GET',
            url:'/manager/inventory/common/getAddServiceList',
            dataType:'json',
            success:function(data){
                if(data.result==1){
                    var  addServiceList=data.data.addServiceList;
                    addServiceList.map(function(addServiceListOption,index){
                        addValueServiceNameOpt=addValueServiceNameOpt+'<option value="'+addServiceListOption.id+'">'+addServiceListOption.name+'</option>'
                    })
                    $("#Value-addedTable tbody #addValueService_1").find(".valueSelectName").children().html(addValueServiceNameOpt)
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })
    }
    $(document).on('change', '.addValueSelectName',function(){
        var addValueChangeId=$(this).val()
        var addValueRowId=$(this).parent().parent().attr("id")
        if(addValueChangeId!=undefined){
            $("#"+addValueRowId+" "+".effectiveDate").datePlu({
                endDate:false,
                ifPermissions:false,
                minTime: "1970-01-01",
                maxTime: "2370-01-01",
            })
            $(this).parent().parent().find('.addValueSaleInput1').storeSales({
                sectionId:'storeInput',
                search:false,
            })
            $(this).parent().parent().find('.addValueSaleInput2').storeSales({
                sectionId:'storeInput',
                search:false
            })
            var vipId=$("#retailCardNum").data("vipId")
            if(addValueChangeId!="null"){
                changeAddValue(vipId,addValueRowId,addValueChangeId)
                var numVal = $(this).parent().parent().find('.addValueProductNumber').val();
                if(numVal == ""){
                    var optionArr=[];
                    var option='<option>'+'</optiotn>'
                    $("#productInfoTable tbody tr").each(function(){
                        if($(this).find(".goodsId").text()!=undefined&&$(this).find(".goodsId").text()!=""){
                            var productNum=$(this).find(".productRowNumber").text()
                            if(productNum!=""){
                                optionArr.push(productNum)
                            }
                        }
                    })
                    if(optionArr.length>0){
                        optionArr.map(function (productNumOpt,index){
                            option+='<option value="'+productNumOpt+'">'+productNumOpt+'</option>'
                        })
                        $(this).parent().parent().find(".addValueProductNumber").html(option);
                    }
                }

            }else{
                var realPaymentInput = $("#Value-addedTable tbody #"+addValueRowId).find(".realPaymentInput").val()*1;
                $('#totalZZAmount').text(accSubtr(($('#totalZZAmount').text())*1,realPaymentInput));

                $("#Value-addedTable tbody #"+addValueRowId).find(".esitPrice").text("");
                $("#Value-addedTable tbody #"+addValueRowId).find(".valuePrice").text("");
                $("#Value-addedTable tbody #"+addValueRowId).find(".usageCount").text("");
                $("#Value-addedTable tbody #"+addValueRowId).find(".limitDate").text("");
                $("#Value-addedTable tbody #"+addValueRowId).find(".addValueProductName").children().first().text("");
                $("#Value-addedTable tbody #"+addValueRowId).find(".addValueProductName").children().last().text("");
                $("#Value-addedTable tbody #"+addValueRowId).find(".phoneImei").children().first().text("");
                $("#Value-addedTable tbody #"+addValueRowId).find(".phoneImei").children().last().text("");

            }
            $(this).parent().parent().find(".addValueSaleInput1").val($("#saleInput").val())
            disabledCol("#Value-addedTable tbody tr",".valueSelectName",".addValueSelectName")
            $("#Value-addedTable tbody tr").each(function(index,value){
                if($(this).find(".addValueSaleInput1").val()==""){
                    $(this).find(".addValueSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))

                }
                countAddValueAmount()
            })
        }
    })
    //当增值服务改变时，相应的值得变化
    function changeAddValue(vipId,addValueRowId,addValueId){
        $.request({
            type:'POST',
            url:'/manager/inventory/retail/delivery/getServiceInfo',
            dataType:'json',
            data:{
                mid:vipId==undefined?"":vipId,
                sid:addValueId
            },
            success:function(data){
                if(data.result==1){
                    var serviceDataInfo=data.data.serviceInfo
                    var useNumber=serviceDataInfo.userNum==-1?"":serviceDataInfo.userNum
                    var useDate=serviceDataInfo.serviceDue==-1?"":serviceDataInfo.serviceDue
                    var vipPrice=serviceDataInfo.memberPrice==null?"":serviceDataInfo.memberPrice
                    if($("#retailCardNum").data("vipId")==""||$("#retailCardNum").data("vipId")==undefined||$("#retailCardNum").data("vipId")==null){
                        $("#"+addValueRowId).find(".realPaymentInput").val(serviceDataInfo.setPrice)
                    }else{
                        if(vipPrice==""&&vipPrice!==0){
                            $("#"+addValueRowId).find(".realPaymentInput").val(serviceDataInfo.setPrice)
                        }else{
                            $("#"+addValueRowId).find(".realPaymentInput").val(vipPrice)
                        }
                    }
                    $("#"+addValueRowId).find(".usageCount").text(useNumber)
                    $("#"+addValueRowId).find(".limitDate").text(useDate)
                    $("#"+addValueRowId).find(".esitPrice").text(serviceDataInfo.setPrice)
                    $("#"+addValueRowId).find(".valuePrice").text(vipPrice)
                    countAddValueAmount()
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })
    }
    //当商品序号变化时，相应的商品信息的变化
    $(document).on('change',".addValueProductNumber",function(){
        var addValueRowNumber=$(this).parent().parent().attr("id")
        var addValueSelectProNum=$(this).val();
        if(addValueSelectProNum!=undefined&&addValueSelectProNum!=""){
            var addValueProName
            var addValueProId
            var addValueImeiName
            var addValueImeiId
            if(addValueSelectProNum.indexOf(".")<0){
                addValueProName=$("#productInfoTable tbody #addproductInfo_"+addValueSelectProNum).find(".productInfo").find(".productInfoName").val();
                addValueProId=$("#productInfoTable tbody #addproductInfo_"+addValueSelectProNum).find(".productInfo").find(".goodsId").text();
                var addValueImei=$("#productInfoTable tbody #addproductInfo_"+addValueSelectProNum).find(".imeiInfo").children().first().children();
                if(addValueImei.length>1){
                    addValueImeiName=$("#productInfoTable tbody #addproductInfo_"+addValueSelectProNum).find(".imeiInfo").children().first().children().first().text();
                    addValueImeiId=$("#productInfoTable tbody #addproductInfo_"+addValueSelectProNum).find(".imeiInfo").children().first().children().last().text();
                }else{
                    addValueImeiName='';
                    addValueImeiId='';
                }
            }else if(addValueSelectProNum.indexOf(".")>0){
                var addValueSelectArry=addValueSelectProNum.split(".")
                addValueProName=$("#productInfoTable tbody #addGifts_"+addValueSelectArry[0]+"_"+addValueSelectArry[1]).find(".productInfo").find(".productInfoName").val();
                addValueProId=$("#productInfoTable tbody #addGifts_"+addValueSelectArry[0]+"_"+addValueSelectArry[1]).find(".productInfo").find(".goodsId").text();
                var addValueImei=$("#productInfoTable tbody #addGifts_"+addValueSelectArry[0]+"_"+addValueSelectArry[1]).find(".imeiInfo").children().first().children();
                if(addValueImei.length>1){
                    addValueImeiName=$("#productInfoTable tbody #addGifts_"+addValueSelectArry[0]+"_"+addValueSelectArry[1]).find(".imeiInfo").children().first().children().first().text();
                    addValueImeiId=$("#productInfoTable tbody #addGifts_"+addValueSelectArry[0]+"_"+addValueSelectArry[1]).find(".imeiInfo").children().first().children().last().text();
                }
            }
            $("#"+addValueRowNumber).find(".addValueProductName").children().first().text(addValueProName)
            $("#"+addValueRowNumber).find(".addValueProductName").children().last().text(addValueProId)
            $("#"+addValueRowNumber).find(".phoneImei").children().first().text(addValueImeiName)
            $("#"+addValueRowNumber).find(".phoneImei").children().last().text(addValueImeiId)
        }else{
            $("#Value-addedTable tbody #"+addValueRowNumber).find(".addValueProductName").children().first().text("");
            $("#Value-addedTable tbody #"+addValueRowNumber).find(".addValueProductName").children().last().text("");
            $("#Value-addedTable tbody #"+addValueRowNumber).find(".phoneImei").children().first().text("");
            $("#Value-addedTable tbody #"+addValueRowNumber).find(".phoneImei").children().last().text("");
        }
    })
    //实际收款变化时，计算实际收款总和
    $(document).on('blur','.realPaymentInput',function(){
        countAddValueAmount()
    })
    //会员价变化时计算会员价总和
    $(document).on('blur','.valuePriceInput',function(){
        countAddValueAmount()
    })
    //计算增值服务中的实际收款总和以及会员价总和
    function countAddValueAmount(){
        var addValueActualPay=0
        var addValueVipPriceAmount=0
        $("#Value-addedTable tbody tr").each(function(){
            var addValueVipPrice=$(this).find(".valuePriceInput").val();
            addValueActualPay=accAdd(addValueActualPay,Number($(this).find(".realPaymentInput").val()))
            if(addValueVipPrice!=undefined&&addValueVipPrice!=""){
                addValueVipPriceAmount=accAdd(addValueVipPriceAmount,Number(addValueVipPrice))
            }
        })
        $("#Value-addedTable tfoot tr td:eq(3)").text(addValueActualPay)
        if(addValueVipPriceAmount!=undefined&&addValueVipPriceAmount!=""){
            $("#Value-addedTable tfoot tr td:eq(7)").text(addValueVipPriceAmount)
        }
        countAmount(countAmountDue,countAmountOfArrears,true);
    }

    //清空增值服务数据
    function clearAddValueData(addValueId){
        $("#Value-addedTable tbody "+addValueId).find(".addValueSelectName").val("");
        $("#Value-addedTable tbody "+addValueId).find(".addValueSaleInput1").val("");
        $("#Value-addedTable tbody "+addValueId).find(".addValueSaleInput1").attr("disabled","disabled");
        $("#Value-addedTable tbody "+addValueId).find(".realPaymentInput").val("");
        $("#Value-addedTable tbody "+addValueId).find(".realPaymentInput").attr("disabled","disabled");
        $("#Value-addedTable tbody "+addValueId).find(".effectiveDate").val("");
        $("#Value-addedTable tbody "+addValueId).find(".effectiveDate").attr("disabled","disabled");
        $("#Value-addedTable tbody "+addValueId).find(".valueProductNumber").val("");
        $("#Value-addedTable tbody "+addValueId).find(".valueProductNumber").children().html("");
        $("#Value-addedTable tbody "+addValueId).find(".valueProductNumber").attr("disabled","disabled");
        $("#Value-addedTable tbody "+addValueId).find(".esitPrice").text("");
        $("#Value-addedTable tbody "+addValueId).find(".valuePrice").text("");
        $("#Value-addedTable tbody "+addValueId).find(".addValueProductName").children().first().text("");
        $("#Value-addedTable tbody "+addValueId).find(".addValueProductName").children().last().text("");
        $("#Value-addedTable tbody "+addValueId).find(".phoneImei").children().first().text("");
        $("#Value-addedTable tbody "+addValueId).find(".phoneImei").children().last().text("");
        $("#Value-addedTable tbody "+addValueId).find(".usageCount").text("");
        $("#Value-addedTable tbody "+addValueId).find(".limitDate").text("");
        $("#Value-addedTable tbody "+addValueId).find(".addValueSaleInput2").val("");
        $("#Value-addedTable tbody "+addValueId).find(".addValueSaleInput2").attr("disabled","disabled");
        $("#Value-addedTable tbody "+addValueId).find(".valueRemark").children().val("");
        $("#Value-addedTable tbody "+addValueId).find(".valueRemark").children().attr("disabled","disabled");
        $('#totalZZAmount').text('');
    }
    //当增值服务为空时禁用列
    disabledCol("#Value-addedTable tbody tr",".valueSelectName",".addValueSelectName")
    //第三方抵扣新增行
    var discountHtml='<tr class="text-center thirdDiscount">'+
        '<td>'+'<span class="glyphicon glyphicon-trash dissountDelete">'+'</span>'+'</td>'+
        '<td class="discountRowNumber">'+'</td>'+
        '<td class="discountSelectUnit">'+'<select class="form-control discountSelectUnitOption">'+'</select>'+'</td>'+
        '<td class="discountActiveName">'+'<select class="form-control discountActiveNameOption">'+'</select>'+'</td>'+
        '<td class="thirdDiscountAmount">'+'<input type="text" class="form-control thirdDiscountAmountInput" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
        ' <td class="settleAmount"><input type="text" class="form-control settleAmountInput" onkeyup="checkInput.checkNum(this,12)"/></td>'+
        '<td class="thirdBusinNum">'+'<input type="text" class="form-control"/>'+'</td>'+
        '<td class="thirdSales1">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control thirdSaleInput1"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="thirdSales2">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control thirdSaleInput2"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="discountRemark">'+'<input type="text" class="form-control"/>'+'</td>'+
        '</tr>'
    $("#discount").click(function(){
        if($("#DiscountTable").parent().css("display")=="none"){
            $("#DiscountTable").parent().css({display:"block"})
            $('#discountImg img:eq(1)').show()
            $('#discountImg img:eq(0)').hide()
        }else if($("#DiscountTable").parent().css("display")=="block"){
            var rowNumber=0;
            $("#DiscountTable tbody").append(discountHtml);
            $("#DiscountTable tbody tr").each(function(index,value){
                $(this).find(".discountRowNumber").text(index+1);
                $(this).attr("id","thirdDisount_"+(index+1));
                disabledCol("#DiscountTable tbody tr",".discountSelectUnit",".discountSelectUnitOption")
            })
            var thirdDiscountTrId=$("#DiscountTable tbody tr:last").attr("id")
            $("#DiscountTable tbody "+"#"+thirdDiscountTrId).find(".discountSelectUnit").children().html(thirdDisountUntilOpt)
            var saleManName=$("#saleInput").val();
            var saleManIds=$("#saleInput").data("employeeId");
            $("#DiscountTable tbody tr:last").find(".thirdSaleInput1").val(saleManName).data('employeeId',saleManIds)
            $("#DiscountTable tbody tr").each(function(index,value){
                if($(this).find(".thirdSaleInput1").val()==""){
                    $(this).find(".thirdSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
                }
            })
        }
    })
    //第三方抵扣删除行
    $(document).on('click', '.dissountDelete', function() {
        if($("#DiscountTable tbody").children().length>1){
            $(this).parent().parent().remove();
            countDiscountAmount();
        }else if($("#DiscountTable tbody").children().length==1){
            clearDiscountData("#thirdDisount_1");
            countDiscountAmount();
        }
        $("#DiscountTable tbody tr").each(function(index,value){
            $(this).find(".discountRowNumber").text(index+1);
            $(this).attr("id","thirdDisount_"+(index+1))
        })
        disabledCol("#DiscountTable tbody tr",".discountSelectUnit",".discountSelectUnitOption")
    })
    //查询第三方抵扣的往来单位
    var thirdDisountUntilOpt
    function thirdDiscountUnit(){
        $.request({
            type:'GET',
            url:'/manager/inventory/common/getContactUnitList',
            dataType:'json',
            success:function(data){
                if(data.result==1){
                    var  contactUntilListOpt=data.data.contactUnitList;
                    contactUntilListOpt.map(function(contactUntilListOption,index){
                        thirdDisountUntilOpt=thirdDisountUntilOpt+'<option value="'+contactUntilListOption.id+'">'+contactUntilListOption.name+'</option>'
                    })
                    $("#DiscountTable tbody #thirdDisount_1").find(".discountSelectUnit").children().html(thirdDisountUntilOpt)
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })
    }
    //查询第三方抵扣活动名称
    $(document).on('change', '.discountSelectUnitOption',function(){
        var trId=$(this).parent().parent().attr("id")
        if($(this).val()!="null"&&$(this).val()!=undefined){
            searchThirdDiscount($(this).val(),trId)
            $(this).parent().parent().find('.thirdSaleInput1').storeSales({
                sectionId:'storeInput',
                search:false
            }),
                $(this).parent().parent().find('.thirdSaleInput2').storeSales({
                    sectionId:'storeInput',
                    search:false
                })
            $(this).parent().parent().find(".thirdDiscountAmountInput").val(0)
            $(this).parent().parent().find(".settleAmountInput").val(0)
//			countDiscountAmount()
        }else{
            var thirdDiscountAmountInput = $("#"+trId).find(".discountActiveName").find(".thirdDiscountAmountInput").val()*1;
            $('#discountTotal').text(accSubtr(($('#discountTotal').text())*1,thirdDiscountAmountInput));

            $("#"+trId).find(".discountActiveName").find(".discountActiveNameOption").val("");
            $("#"+trId).find(".discountActiveName").find(".discountActiveNameOption").html("");
        }
        disabledCol("#DiscountTable tbody tr",".discountSelectUnit",".discountSelectUnitOption")
        $("#DiscountTable tbody tr").each(function(index,value){
            if($(this).find(".thirdSaleInput1").val()==""){
                $(this).find(".thirdSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
            }
        })
        countDiscountAmount()
    })
    function searchThirdDiscount(discountId,trId,couponId){
        $.request({
            type:'GET',
            url:'/manager/inventory/common/getThirdTicketList',
            dataType:'json',
            data:{
                contactsunitId:discountId
            },
            success:function(data){
                if(data.result==1){
                    var thridTicketList=data.data.thridTicketList;
                    var thirdDiscountActive=''
                    thridTicketList.map(function(thridTicketListOpt,index){
                        thirdDiscountActive=thirdDiscountActive+'<option value="'+thridTicketListOpt.id+'">'+thridTicketListOpt.name+'</option>'
                    })
                    $("#"+trId).find(".discountActiveName").find(".discountActiveNameOption").html(thirdDiscountActive)
                    if($.trim(couponId)!=''){
                        $("#"+trId).find(".discountActiveName").find(".discountActiveNameOption").val(couponId)
                    }
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })
    }
    //当抵现金额变化时，计算抵扣现金总额
    $(document).on("blur",'.thirdDiscountAmountInput,.settleAmountInput',function(){
        countDiscountAmount();
    })
    //计算抵扣现金总额
    function countDiscountAmount(){
        var thirdDiscountSum=0
        var settleAmountSum=0
        $("#DiscountTable tbody tr").each(function(){
            thirdDiscountSum=accAdd(thirdDiscountSum,Number($(this).find(".thirdDiscountAmount").children().val()))
            settleAmountSum=accAdd(settleAmountSum,Number($(this).find(".settleAmount").children().val()))
        })
        $("#DiscountTable tfoot tr td:eq(3)").text(thirdDiscountSum)
        $(".arrialAmount").text(thirdDiscountSum)
        $("#DiscountTable tfoot tr td:eq(4)").text(settleAmountSum)

        countAmountDue()
        countAmountOfArrears()
        counterAbledStagingAmount()
    }
    //清空第三方抵扣的值
    function clearDiscountData(thirdDiscountTrId){
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".discountSelectUnitOption").val("");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".discountActiveNameOption").val("");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".discountActiveNameOption").attr("disabled","disabled");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdDiscountAmountInput").val("");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdDiscountAmountInput").attr("disabled","disabled");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".settleAmountInput").val("");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".settleAmountInput").attr("disabled","disabled");

        $("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdBusinNum").children().val("");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdBusinNum").children().attr("disabled","disabled");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdSaleInput1").val("");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdSaleInput1").attr("disabled","disabled");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdSaleInput2").val("");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".thirdSaleInput2").attr("disabled","disabled");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".discountRemark").children().val("");
        $("#DiscountTable tbody "+thirdDiscountTrId).find(".discountRemark").children().attr("disabled","disabled");
    }
    //当第三方抵扣的往来单位为空时禁用列
    disabledCol("#DiscountTable tbody tr",".discountSelectUnit",".discountSelectUnitOption")
    //分期业务新增行
    var stagingHtml='<tr class="text-center stagingRow">'+
        '<td>'+'<span class="glyphicon glyphicon-trash stagDelete">'+'</span>'+'</td>'+
        '<td class="stagRowNumber">'+'</td>'+
        '<td class="stagSelectUnit">'+'<select class="form-control stagSelectOption">'+'</select>'+'</td>'+
        '<td class="stagBusinessName">'+'<select class="form-control stagBusinessNameOption">'+'</select>'+'</td>'+
        '<td>'+'<input type="text" class="form-control stagingAmount" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
        '<td>'+'<input type="text" class="form-control firstPayAmount" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+
        '<td class="stagingLoadAmount">'+'</td>'+
        '<td>'+'<input type="text" class="form-control commissionBili"  readonly="readonly"/>'+'</td>'+
        '<td>'+'<input type="text" class="form-control stagingNumber" onkeyup="checkInput.checkPositiveInteger(this)"/>'+'</td>'+
        '<td>'+'<input type="text" class="form-control commission"  readonly="readonly"/>'+'</td>'+
        '<td>'+'<input type="text" class="form-control contractNo" />'+'</td>'+
        '<td>'+'<input type="text" class="form-control imeiNo" />'+'</td>'+
        '<td class="stagingSales1">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control stagingSaleInput1"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="stagingSales2">'+'<div class="form-group" style="margin:0;">'+'<div class="input-group">'+
        '<input type="text" class="form-control stagingSaleInput2"  placeholder="请选择营业员">'+'</div>'+'</div>'+'</td>'+
        '<td class="stagRemark">'+'<input type="text" class="form-control"/>'+'</td>'+
        '<td class="monthSupply">'+'</td>'
    '</tr>'
    $("#stagingBusin").click(function(){
        if($("#StaBuTable").parent().css("display")=="none"){
            $("#StaBuTable").parent().css({display:"block"})
            $('#StaBusinessImg img:eq(1)').show()
            $('#StaBusinessImg img:eq(0)').hide()
        }else if($("#StaBuTable").parent().css("display")=="block"){
            var rowNumber=0;
            $("#StaBuTable tbody").append(stagingHtml);
            $("#StaBuTable tbody tr").each(function(index,value){
                $(this).find(".stagRowNumber").text(index+1);
                $(this).attr("id","stagingRow_"+(index+1));
                disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption")
            })
            var stagingTrId=$("#StaBuTable tbody tr:last").attr("id")
            $("#StaBuTable tbody "+"#"+stagingTrId).find(".stagSelectUnit").children().html(stagingSelectOption)
            var saleManName=$("#saleInput").val();
            var saleManIds=$("#saleInput").data("employeeId");
            $("#StaBuTable tbody tr:last").find(".stagingSaleInput1").val(saleManName).data('employeeId',saleManIds)
            $("#StaBuTable tbody tr").each(function(index,value){
                if($(this).find(".stagingSaleInput1").val()==""){
                    $(this).find(".stagingSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
                }
            })
        }
    })
    //分期业务删除行
    $(document).on('click', '.stagDelete', function() {
        if($("#StaBuTable tbody").children().length>1){
            $(this).parent().parent().remove();
            stagingSum()
        }else if($("#StaBuTable tbody").children().length==1){
            clearStagingData("#stagingRow_1");
            stagingSum()
        }
        $("#StaBuTable tbody tr").each(function(index,value){
            $(this).find(".stagRowNumber").text(index+1);
            $(this).attr("id","stagingRow_"+(index+1));
        })
        disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption")
    })
    //商品分期
    $(document).on('change', '.stagingCheck',function(){
        if($(this).attr("checked")=="checked"||$(this).attr("checked")==true){
            $(".StaBu").css("display","block");
            $("#StaBusinessImg").children().toggle();
        }
        var stagingChecked=[]
        var stagingSelectUnit=[]
        $("#productInfoTable tbody").find(".staging").find(".stagingCheck").each(function(index,value){
            if($(this).attr("checked")=="checked"||$(this).attr("checked")==true){
                stagingChecked.push(index)
            }
        })
        $("#StaBuTable").find(".stagingRow").each(function(index,value){
            if($(this).find(".stagSelectUnit").children().val()!=""&&$(this).find(".stagSelectUnit").children().val()!="null"
                &&$(this).find(".stagSelectUnit").children().val()!=null
            ){
                stagingSelectUnit.push(index)
            }
        })
        if(stagingChecked.length==0&&stagingSelectUnit.length==0){
            $(".StaBu").css("display","none");
            $("#StaBusinessImg").children().toggle();
        }
        disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption")
        $("#StaBuTable tbody tr").each(function(index,value){
            if($(this).find(".stagingSaleInput1").val()==""){
                $(this).find(".stagingSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
            }
        })
    })
    //查询分期商名称
    var stagingSelectOption
    function searchStagingUnit(){
        $.request({
            type:'GET',
            url:'/manager/inventory/common/getInstallmentList',
            dataType:'json',
            success:function(data){
                if(data.result==1){
                    var  unitOption=data.data.InstallmentList;
                    unitOption.map(function(stagingOption,index){
                        stagingSelectOption=stagingSelectOption+'<option value="'+stagingOption.id+'">'+stagingOption.name+'</option>'
                    })
                    $("#StaBuTable tbody #stagingRow_1").find(".stagSelectUnit").children().html(stagingSelectOption)
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })
    }
    //查询分期业务名称
    $(document).on('change', '.stagBusinessNameOption',function(){
        var trId=$(this).parent().parent().attr("id")
        var commissionrate=$(this).find("option:selected").data("commissionrate")
        $("#"+trId).find(".commissionBili").val(commissionrate)
        stagingSum()
    })
    //查询分期业务名称
    $(document).on('change', '.stagSelectOption',function(){
        var trId=$(this).parent().parent().attr("id")
        if($(this).val()!="null"&&$(this).val()!=undefined){
            searchStagingBussiness($(this).val(),trId)
            $(this).parent().parent().find(".stagingAmount").val(0);
            $(this).parent().parent().find(".firstPayAmount").val(0);
            $(this).parent().parent().find(".stagingLoadAmount").text(0);
            $(this).parent().parent().find(".commission").val(0);
            $(this).parent().parent().find(".stagingNumber").val(1);
            $(this).parent().parent().find(".monthSupply").text(0);
            $(this).parent().parent().find('.stagingSaleInput1').storeSales({
                sectionId:'storeInput',
                search:false
            }),
                $(this).parent().parent().find('.stagingSaleInput2').storeSales({
                    sectionId:'storeInput',
                    search:false
                })
        }
        else{
            var stagingAmount = $("#"+trId).find(".stagingAmount").val()*1;
            var firstPayAmount = $("#"+trId).find(".firstPayAmount").val()*1;
            var stagingLoadAmount = $("#"+trId).find(".stagingLoadAmount").text()*1;
            var thirdDiscountAmountInput = $("#"+trId).find(".commission").val()*1;
            $('.stagingTotalAmount').text(accSubtr(($('.stagingTotalAmount').text())*1,stagingAmount));
            $('#staging_1').text(accSubtr(($('#staging_1').text())*1,firstPayAmount));
            $('#staging_2').text(accSubtr(($('#staging_2').text())*1,stagingLoadAmount));
            $('#staging_3').text(accSubtr(($('#staging_3').text())*1,thirdDiscountAmountInput));
            $("#"+trId).find(".stagingLoadAmount").text('')
            $("#"+trId).find(".stagBusinessName").find(".stagBusinessNameOption").val("");
            $("#"+trId).find(".stagBusinessName").find(".stagBusinessNameOption").html("");
        }
        disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption");
        $(this).parent().parent().find('.monthSupply').text("");
        $("#StaBuTable tbody tr").each(function(index,value){
            if($(this).find(".stagingSaleInput1").val()==""){
                $(this).find(".stagingSaleInput1").val($("#saleInput").val()).data("employeeId",$("#saleInput").data("employeeId"))
            }
        })
        stagingSum()
    })
    function searchStagingBussiness(stagingNameId,trId,installId){
        $.request({
            type:'GET',
            url:'/manager/inventory/common/getByStagesList',
            dataType:'json',
            data:{
                contactsunitId:stagingNameId
            },
            success:function(data){
                if(data.result==1){
                    var stagBusinName=data.data.byStagesList;
                    var stagName='';
                    var stagBusinessNameOption= $("#"+trId).find(".stagBusinessName").find(".stagBusinessNameOption")
                    var commissionBili=$("#"+trId).find(".commissionBili")
                    stagBusinName.map(function(stagBusinNameOpt,index){
                        stagName+='<option data-commissionRate="'+stagBusinNameOpt.commissionRate+'" value="'+stagBusinNameOpt.id+'">'+stagBusinNameOpt.name+'</option>'
                    })
                    stagBusinessNameOption.html(stagName)
                    if(stagBusinName.length>0){
                        commissionBili.val(stagBusinName[0].commissionRate)
                    }

                    if($.trim(installId)!=''){
                        stagBusinessNameOption.val(installId)
                        stagBusinessNameOption.trigger('change')
                    }
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })
    }
//计算分期总金额、首付总金额、分期贷款总金额、预计佣金总金额
    function stagingSum(){
        var stagingAmount=0
        var stagingloeadAmount=0
        var orderComissionAmount=0
        var firstPayAmount=0
        $("#StaBuTable tbody tr").each(function(){
            stagingAmount=accAdd(stagingAmount,Number($(this).find(".stagingAmount").val()))
            firstPayAmount=accAdd(firstPayAmount,Number($(this).find(".firstPayAmount").val()))
            if($(this).find(".stagingLoadAmount").text()!=undefined&&$(this).find(".stagingLoadAmount").text()!=""){
                stagingloeadAmount=accAdd(stagingloeadAmount,Number($(this).find(".stagingLoadAmount").text()))
            }
            var commissionwill= Number(Number($(this).find(".stagingLoadAmount").text())*Number($(this).find(".commissionBili").val())/100).toFixed(2)
            $(this).find(".commission").val(commissionwill)
            orderComissionAmount=accAdd(orderComissionAmount,Number(commissionwill))
        })
        $("#StaBuTable .stagingTotalAmount").text(stagingAmount);
        $("#StaBuTable #staging_1").text(firstPayAmount);
        $("#StaBuTable #staging_2").text(stagingloeadAmount);
        $("#StaBuTable #staging_3").text(orderComissionAmount);
        $(".installMentLoad").text(stagingloeadAmount)
        countAmountDue(stagingloeadAmount);
        countAmountOfArrears();
        counterAbledStagingAmount();

    }
//当分期金额变化时，计算分期贷款金额
    $(document).on("blur",".stagingAmount",function(){
        var countstagingAmount=$(this).val();
        var $firstPayAmount=$(this).parent().parent().find(".firstPayAmount")
        var countfirstAmount=$firstPayAmount.val();
        if(Number(countstagingAmount)<=Number(countfirstAmount)){
            $.zxsaas_plus.showalert('error',"首付金额必须小于当前的分期金额");
            $firstPayAmount.val(0)
            $(this).trigger('blur')
            return;
        }else{
            var stagingLoanAmount=accSubtr(Number(countstagingAmount),Number(countfirstAmount))
            $(this).parent().parent().find(".stagingLoadAmount").text(stagingLoanAmount)
            var monthSupplyAmount=stagingLoanAmount/Number($(this).parent().parent().find(".stagingNumber").val())
            $(this).parent().parent().find(".monthSupply").text(monthSupplyAmount.toFixed(2))
        }
        stagingSum();
        if(Number($(".stagingTotalAmount").text())>Number($(".abledStagingAmount").text())){
            $.zxsaas_plus.showalert('error',"分期总金额必须小于可供分期金额");
        }
    })
//当首付金额变化时，计算分期贷款金额
    $(document).on("blur",".firstPayAmount",function(){
        var countstagingAmount=$(this).parent().parent().find(".stagingAmount").val();
        var countfirstAmount=$(this).val();
        if(Number(countstagingAmount)<=Number(countfirstAmount)){
            $.zxsaas_plus.showalert('error',"首付金额必须小于当前的分期金额");
            $(this).val(0)
            $(this).trigger('blur')
            return;
        }else{
            var stagingLoanAmount=accSubtr(Number(countstagingAmount),Number(countfirstAmount))
            $(this).parent().parent().find(".stagingLoadAmount").text(stagingLoanAmount)
            var monthSupplyAmount=stagingLoanAmount/Number($(this).parent().parent().find(".stagingNumber").val())
            $(this).parent().parent().find(".monthSupply").text(monthSupplyAmount.toFixed(2))
        }
        stagingSum()
    })
//当预计佣金发生变化时，计算佣金总金额
    $(document).on("blur",".commission",function(){
        var reg = /^[\-\+]?\d+(\.\d{1,2})?$/;
        if(!reg.test($(this).val())||$(this).val()==0){
            $(this).val(0)
        }
        stagingSum()
    })
//当分期数发生变化时
    $(document).on("blur",".stagingNumber",function(){
        if(Number($(this).val())<1){
            return;
        }else{
            var monthSupplyAmount=Number($(this).parent().parent().find(".stagingLoadAmount").text())/Number($(this).val())
            $(this).parent().parent().find(".monthSupply").text(monthSupplyAmount.toFixed(2))
        }
    })
//计算可供分期金额
    function counterAbledStagingAmount(){
        var abledStagPayAmount1=accSubtr(Number($(".billsAmount").text()),Number($("#DiscountTable tfoot tr td:eq(3)").text()))
        var abledStagPayAmount2=accSubtr(abledStagPayAmount1,Number($(".retailDeposit").text()))
        var abledStagPayAmount3=accSubtr(abledStagPayAmount2,Number($("#wipingAmount").val()))
        var abledStagPayAmount4=accSubtr(abledStagPayAmount3,Number($("#retailAmount").val()))
        var abledStagPayAmount5=accSubtr(abledStagPayAmount4,Number($("#posAmount").val()))
        var abledStagPayAmount6=accSubtr(abledStagPayAmount5,Number($("#microLetterAmount").val()))
        var abledStagPayAmount7=accSubtr(abledStagPayAmount6,Number($("#alipayAmount").val()))
        var abledStagPayAmount8=accSubtr(abledStagPayAmount7,Number($("#otherAccount").val()))
        var abledStagPayAmount9=accSubtr(abledStagPayAmount8,Number($("#promotionalCoupons").val()))
        var abledStagPayAmount10=accSubtr(abledStagPayAmount9,Number($("#memberStoredValue").val()))
        var abledStagPayAmount11=accSubtr(abledStagPayAmount10,Number($("#pointArrived").val()))
        var abledStagPayAmount=accAdd(abledStagPayAmount11,Number($("#StaBuTable tfoot tr td:eq(4)").text()))
        $(".abledStagingAmount").text(abledStagPayAmount)
    }
//清空分期业务的值
    function clearStagingData(stagingTrId){
        $("#StaBuTable tbody "+stagingTrId).find(".stagSelectOption").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".stagBusinessNameOption").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".stagBusinessNameOption").children().html("");
        $("#StaBuTable tbody "+stagingTrId).find(".stagBusinessNameOption").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingAmount").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingAmount").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".firstPayAmount").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".firstPayAmount").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingLoadAmount").text("");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingNumber").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingNumber").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingNumber").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingNumber").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".commission").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".commission").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".contractNo").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".contractNo").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".contractNo").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".contractNo").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".stagRemark").children().val("");
        $("#StaBuTable tbody "+stagingTrId).find(".stagRemark").children().attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".imeiNo").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".imeiNo").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingSaleInput1").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingSaleInput1").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingSaleInput2").val("");
        $("#StaBuTable tbody "+stagingTrId).find(".stagingSaleInput2").attr("disabled","disabled");
        $("#StaBuTable tbody "+stagingTrId).find(".monthSupply").text(0);
    }
//当分期业务的分期商名称为空时禁用列
    disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption")
    //列禁用
    function disabledCol(tableTrName,trName,selectName){
        $(tableTrName).each(function(index,value){
            if($(this).find(trName).find(selectName).val()=="null"||
                $(this).find(trName).find(selectName).val()==undefined||
                $(this).find(trName).find(selectName).val()==""){
                $(this).find("input").val("");
                $(this).find("select").val("");
                $(this).find("input").attr("disabled",true);
                $(this).find("select").attr("disabled",true);
                $(this).find(trName).find(selectName).attr("disabled",false)
            }else{
                $(this).find("input").attr("disabled",false);
                $(this).find("select").attr("disabled",false);
            }
        })
    }

    //当抹零金额发生变化时，计算应收金额
    $(document).on('change','#wipingAmount',function(){
        countAmountDue()
        countAmountOfArrears()
        counterAbledStagingAmount()
    })
    //当现金发生变化时，计算实收金额
    $(document).on('change','#retailAmount',function(){
        countPayAmount(countAmountOfArrears,true)
        counterAbledStagingAmount()
    })
    //当pos机金额发生变化时，计算实收金额
    $(document).on('change','#posAmount',function(){
        countPayAmount(countAmountOfArrears,true)
        counterAbledStagingAmount()
    })
    //当支付宝金额发生变化时，计算实收金额
    $(document).on('change','#alipayAmount',function(){
        countPayAmount(countAmountOfArrears,true)
        counterAbledStagingAmount()
    })

    //当微信金额发生变化时，计算实收金额
    $(document).on('change','#microLetterAmount',function(){
        countPayAmount(countAmountOfArrears,true)
        counterAbledStagingAmount()
    })
    //当其他账户金额发生变化时，计算实收金额
    $(document).on('change','#otherAccount',function(){
        countPayAmount(countAmountOfArrears,true)
        counterAbledStagingAmount()
    })
    //当促销券金额发生变化时，计算实收金额
    $(document).on('change','#promotionalCoupons',function(){
        countPayAmount(countAmountOfArrears,true)
        counterAbledStagingAmount()
    })
    //当会员储值发生变化时，计算实收金额
    $(document).on('change','#memberStoredValue',function(){
        countPayAmount(countAmountOfArrears,true)
        counterAbledStagingAmount()
    })
    //当积分抵现金额发生变化时，计算实收金额
    $(document).on('change','#pointArrived',function(){
        countPayAmount(countAmountOfArrears,true)
        counterAbledStagingAmount()
    })
    //计算总金额
    function countAmount(callBack,arrearsCallBack,useCallBack){
        var productDisountAmount=$("#productInfoTable tfoot tr td:eq(8)").text()
        var businessPayAmount=$("#carrBusinTable tfoot tr td:eq(3)").text()
        var addValuePayAmount=$("#Value-addedTable tfoot tr td:eq(3)").text()
        var retailAmount1=accAdd(Number(productDisountAmount),Number(businessPayAmount))
        var retailAmount=accAdd(retailAmount1,Number(addValuePayAmount))
        $(".billsAmount").text(retailAmount);
        if(useCallBack==true){
            callBack();
            arrearsCallBack();
        }
        counterAbledStagingAmount()
    }
    //计算应收金额
    function countAmountDue(){
        var retailBillsAmount=$(".billsAmount").text();
        var retailDisountAmountSum=$("#DiscountTable tfoot tr td:eq(5)").text();
        var retailStagingAmountSum=$("#StaBuTable tfoot tr td:eq(5)").text();
        var retailDepositAmountSum=$(".retailDeposit").text();
        var retailWipingAmount=$("#wipingAmount").val();
        var retailArrialAmount=$('.arrialAmount').text();
        var retailAmountDue1=accSubtr(Number(retailBillsAmount),Number(retailDisountAmountSum))
        var retailAmountDue2=accSubtr(retailAmountDue1,Number(retailStagingAmountSum))
        var retailAmountDue3=accSubtr(retailAmountDue2,Number(retailDepositAmountSum))
        var retailAmountDue=accSubtr(retailAmountDue3,Number(retailWipingAmount))
        retailAmountDue=accSubtr(retailAmountDue,Number(retailArrialAmount))
        $(".amountDue").text((retailAmountDue*1).toFixed(2))
    }
    //计算实收金额
    function countPayAmount(countArrearsCallBack,symbol){
        var cashAmount=$("#retailAmount").val();
        var posAmountSum=$("#posAmount").val();
        var alipayAmountSum=$("#alipayAmount").val();
        var microletterAmountSum=$("#microLetterAmount").val();
        var otherAmountSum=$("#otherAccount").val();
        var PromotionalCouponsAmount=$("#promotionalCoupons").val();
        var MembersStoredValueAmount=$("#memberStoredValue").val();
        var pointArrivedAmount=$("#pointArrived").val();
        var retailPayAmount1=accAdd(Number(cashAmount),Number(posAmountSum))
        var retailPayAmount2=accAdd(retailPayAmount1,Number(alipayAmountSum))
        var retailPayAmount3=accAdd(retailPayAmount2,Number(microletterAmountSum))
        var retailPayAmount4=accAdd(retailPayAmount3,Number(otherAmountSum))
        var retailPayAmount5=accAdd(retailPayAmount4,Number(PromotionalCouponsAmount))
        var retailPayAmount6=accAdd(retailPayAmount5,Number(MembersStoredValueAmount))
        var retailPayAmount=accAdd(retailPayAmount6,Number(pointArrivedAmount))
        var num = $('.arrears').attr('num');
        if(num !== undefined && num !== ""){
            retailPayAmount = retailPayAmount*1 + num*1;
        }
        $(".paidAmount").text((retailPayAmount*1).toFixed(2))
        if(symbol==true){
            countArrearsCallBack()
        }
    }
    //计算欠款
    function countAmountOfArrears(){
        var  totalAmountDocuments=$(".amountDue").text()
        var  actualAmountDocuments=$(".paidAmount").text()
        var  arrearsDocuments=accSubtr(Number(totalAmountDocuments),Number(actualAmountDocuments))
        $(".arrears").text((arrearsDocuments*1).toFixed(2));
    }
    //查询可使用资金账户
    function abledUseAccount(data){
        if(data!=""&&data!=null&&data!=undefined){
            $.request({
                type:'POST',
                async: false,
                url:'/manager/inventory/retail/delivery/getAccountList',
                dataType:'json',
                data:{
                    sectionId:data
                },
                success:function(data){
                    if(data.result==1){
                        var abledAccountList=data.data.accountList;
                        var accountoption=[];
                        var posAmountListArry=[]
                        var otherAmountListArry=[]
                        for(var i=0;i<abledAccountList.length;i++){
                            var accountModel={
                                accounTypeCode:"",
                                accounTypeName:"",
                                id:"",
                                name:""
                            }
                            accountModel.accounTypeCode=abledAccountList[i].accounTypeCode;
                            accountModel.accounTypeName=abledAccountList[i].accounTypeName;
                            accountModel.id=abledAccountList[i].id;
                            accountModel.name=abledAccountList[i].name;
                            accountoption.push(accountModel)
                        }
                        var accountListOption=[]
                        for(var i=0;i<accountoption.length;i++){
                            accountListOption.push(accountoption[i].accounTypeName)
                        }
                        var accountCashId
                        var accountAppliedId
                        var accountMicrId
                        var accountMoreId
                        var accountPointId
                        for(var j=0;j<accountoption.length;j++){
                            if(accountoption[j].accounTypeName=="现金"){
                                accountCashId=accountoption[j].id
                            }
                            if(accountoption[j].accounTypeName=="支付宝"){
                                accountAppliedId=accountoption[j].id
                            }
                            if(accountoption[j].accounTypeName=="微信"){
                                accountMicrId=accountoption[j].id
                            }
                            if(accountoption[j].accounTypeName=="聚合收款"){
                                accountMoreId=accountoption[j].id
                            }
                            if(accountoption[j].accounTypeName=="积分抵现"){
                                accountPointId=accountoption[j].id
                            }
                        }
                        if(accountListOption.indexOf("现金")>=0){
                            $("#retailAmount").removeAttr("disabled");
                            $("#retailAmount").attr("cashId",accountCashId)
                        }else{
                            $("#retailAmount").attr("disabled","disabled");
                            $("#retailAmount").removeAttr("cashId")
                        }
                        if(accountListOption.indexOf("支付宝")>=0){
                            $("#alipayAmount").removeAttr("disabled");
                            $("#alipayAmount").attr("applyId",accountAppliedId)
                        }else{
                            $("#alipayAmount").attr("disabled","disabled");
                            $("#alipayAmount").removeAttr("applyId")
                        }
                        if(accountListOption.indexOf("微信")>=0){
                            $("#microLetterAmount").removeAttr("disabled");
                            $("#microLetterAmount").attr("micrId",accountMicrId)
                        }else{
                            $("#microLetterAmount").attr("disabled","disabled");
                            $("#microLetterAmount").removeAttr("micrId")
                        }
                        if(accountListOption.indexOf("积分抵现")>=0){
                            $("#pointArrived").attr("PointId",accountPointId)
                        }
                        if(accountListOption.indexOf("聚合收款")>=0){
                            $('.saveCode').click(function(){
                                var amountDue = $('.amountDue').text();
                                if(amountDue <=0){
                                    $.zxsaas_plus.showalert('error','无应收款金额');
                                    return
                                }
                                var paidAmount = $('.paidAmount').text();
                                var arrears = $('.arrears').text();
                                if(arrears <= 0){
                                    $.zxsaas_plus.showalert('error','无应收欠款金额');
                                }else{
                                    $('.code_ys').text(amountDue);
                                    $('.code_ss').text(paidAmount);
                                    $('.codeMoney').val(arrears);
                                    $('.arrears').val('0.00');
                                    $('.code_qk').text('0.00');
                                    $('#startCode').text('开始扫码');
                                    $('.codeHide,#codeModal .red').hide();
                                    $('#codeModal').modal('show');
                                }
                            })
                            if(CODELIST.indexOf('B_LSKD_0022') != -1){
                                $(".saveCode").text('扫码收款').removeClass('noCode').show().attr("MoreId",accountMoreId);
                            }else{
                                $(".saveCode").hide()
                            }

                        }else{
                            $(".saveCode").hide();
                        }

                        accountoption.map(function(accOpt,index){
                            var posTotalAmountModal={
                                accountName:"",
                                payreceiptAmout:"",
                                id:"",
                            }
                            var otherTotalAmountModal={
                                accountName:"",
                                payreceiptAmout:"",
                                id:"",
                            }
                            if(accOpt.accounTypeName=="银行"){
                                posTotalAmountModal.accountName=accOpt.name,
                                    posTotalAmountModal.id=accOpt.id
                                posAmountListArry.push(posTotalAmountModal)
                            }
                            if(accOpt.accounTypeName=="其它"){
                                otherTotalAmountModal.accountName=accOpt.name,
                                    otherTotalAmountModal.id=accOpt.id
                                otherAmountListArry.push(otherTotalAmountModal)
                            }
                        })
                        if(posAmountListArry.length>0){
                            $("#posAmount").removeAttr("disabled")
                            $("#posAmount").attr("readonly","readonly")
                            $("#posTable tbody tr").each(function(index,value){
                                $(this).remove()
                            })
                            posAmountListArry.map(function(posTotalOpt,index){
                                var accountTotalHtml='<tr class="text-center">'+'<td class="order" style="width: 100px">'+(index+1)+'<span class="orderNumber">'+'</span>'+'<span class="accountId" style="display:none">'+posTotalOpt.id+'</span>'+'</td>'+'<td style="width: 101px">'+'<span>'+posTotalOpt.accountName+'</span>'+'</td>'+'<td class="paymentAmount">'+'<input type="text" class="form-control" value="0" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+'</tr>'
                                $("#posTable tbody").append(accountTotalHtml)
                            })
                        }else{
                            $("#posAmount").attr("disabled","disabled")
                        }
                        if(otherAmountListArry.length>0){
                            $("#otherAccount").removeAttr("disabled")
                            $("#otherAccount").attr("readonly","readonly")
                            $("#otherCounterTable tbody tr").each(function(index,value){
                                $(this).remove()
                            })
                            otherAmountListArry.map(function(otherTotalOpt,index){
                                var otherAccountTotalHtml='<tr class="text-center">'+'<td class="order" style="width:100px;">'+(index+1)+'<span class="orderNumber">'+'</span>'+'<span class="accountId" style="display:none">'+otherTotalOpt.id+'</span>'+'</td>'+'<td style="width: 101px;">'+'<span>'+otherTotalOpt.accountName+'</span>'+'</td>'+'<td class="otherAmount">'+'<input type="text" class="form-control" value="0" onkeyup="checkInput.checkNum(this,12)"/>'+'</td>'+'</tr>'
                                $("#otherCounterTable tbody").append(otherAccountTotalHtml)
                            })
                        }else{
                            $("#otherAccount").attr("disabled","disabled")
                        }

                        var htmlHeight=$(".posContentTable").height()
                        $(".posContentTable").css("top","-"+(htmlHeight+65)+"px")


                        var otherHtmlHeight=$(".otherContentTable").height()
                        $(".otherContentTable").css("top","-"+(otherHtmlHeight+65)+"px")
                    }else{
                        $.zxsaas_plus.showalert('error',data.desc);
                    }
                },
                error:function(){
                    alert('请求失败！')
                }
            })
        }
    }

    $('.codeMoney').blur(function(){
        var arrears = $('.arrears').text()*1;
        var val = $(this).val()*1;
        var num = arrears - val;
        if(num < 0){
            $(this).val(arrears.toFixed(2));
            $('.code_qk').text('0.00');
        }else{
            $('.codeHide').show();
            $('.code_qk').text(num.toFixed(2));
        }
    })

    $('#startCode').click(function(){
        var v = $('.code_qk').text()*1;
        if($('.codeMoney').val()*1 <= 0){
            $.zxsaas_plus.showalert('提示','本次无收款，无法结算');
            return
        }
        if(v>0){
            var tel = $('#retailCardNum').val();
            var name = $('#vipName').val();
            if(tel == "" || name == ""){
                $.zxsaas_plus.showalert('提示','请填写或引入客户信息');
                return
            }
        }
        $('#startCode').text('扫码中...');
        $('#codeModal .red').show();
        $('.codeInp').focus();
    })

    $('.codeInp').change(function(){
        getRetailValue();
        var v = $(this).val();
        var qk = $('.code_qk').text()*1;
        var s = $('.codeMoney').val()*1;
        var ss = s*100
        var unionPay = {
            transactionAmount: ss.toFixed(0),
            payCode: v,
            payType:$('#codeModal input[name="payType"]:checked').val(),
        }
        var data = {
            payreceiptAmout: s.toFixed(2),
            accountId: $('.saveCode').attr('moreId')
        }
        getRetailDetailModel.totDebtAmount = qk;
        getRetailDetailModel.unionPay = unionPay;
        getRetailDetailModel.payList.push(data);
        $.request({
            type:'POST',
            url:'/manager/inventory/retail/delivery/saveAndExecuteOrder',
            dataType:'json',
            contentType: "application/json",
            data:JSON.stringify(getRetailDetailModel),
            success:function(data){
                $('#startCode').text('开始扫码');
                $('#codeModal .red').hide();
                if(data.result==1||data.result==-2||data.result==2){
                    $.zxsaas_plus.showalert('提示',data.desc);
                    var id = data.data.billsId;
                    function show(name){
                        location.href='/manager/inventory/retail/delivery/toPrint?bId='+name;
                    }
                    function _show(name){
                        return function(){
                            show(name);
                        }
                    }
                    setTimeout(_show(id),3000);
                }else{
                    $('.codeInp').val('');
                    $("#retailBillsId").val(data.data.billsId);
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                $('#startCode').text('开始扫码');
                $('#codeModal .red').hide();
                alert('请求失败！')
            }
        })
    })

    $("#otherAccount").click(function(){
        if($("#otherCounterTable tbody tr").length>0){
            $(".otherContentTable").css("display","block")
        }
    })
    $("#otherAmountNone").click(function(){
        $(".otherContentTable").css("display","none")
    })
    $("#posAmount").click(function(){
        if($("#posTable tbody tr").length>0){
            $(".posContentTable").css("display","block")
        }
    })
    $("#postAmountNone").click(function(){
        $(".posContentTable").css("display","none")
    })

    getRetailAmountFun();
    $(document).on('blur','#retailAmount',function(){
        getRetailAmountFun()
    })
    var getRetailAmountModel
    function getRetailAmountFun(){
        if($("#retailAmount").attr("cashId")!=undefined&&$("#retailAmount").attr("cashId")!=null){
            var retailAmount={
                accountId:Number($("#retailAmount").attr("cashId")),
                payreceiptAmout:Number($("#retailAmount").val()),
            }
            return getRetailAmountModel=retailAmount
        }
    }
    getAppliedFun()
    $(document).on('blur','#alipayAmount',function(){
        getAppliedFun()
    })
    var getAppliedModel
    function getAppliedFun(){
        if($("#alipayAmount").attr("applyId")!=undefined&&$("#alipayAmount").attr("applyId")!=null){
            var appliedAmount={
                accountId:Number($("#alipayAmount").attr("applyId")),
                payreceiptAmout:Number($("#alipayAmount").val()),
            }
            return getAppliedModel=appliedAmount
        }
    }

    $(document).on('blur','#microLetterAmount',function(){
        getMicrAmount();
    })
    var getMicrModel
    function getMicrAmount(){
        if($("#microLetterAmount").attr("micrid")!=undefined&&$("#microLetterAmount").attr("micrid")!=null){
            var micrAmount={
                accountId:Number($("#microLetterAmount").attr("micrId")),
                payreceiptAmout:Number($("#microLetterAmount").val()),
            }
            return getMicrModel=micrAmount
        }
    }
    var payListArry=[]
    $(document).on('click','#postAmountSure',function(){
        payListArry=[];
        var bankAmount=0;
        if($("#posTable tbody tr").length>0){
            $("#posTable tbody tr").each(function(index,value){

                bankAmount=accAdd(bankAmount,$(this).find(".paymentAmount").children().val()*1)
            })
        }


        $("#posTable tbody tr").each(function(index,value){
            var payListModel={
                accountId:"",
                payreceiptAmout:""
            }
            payListModel.accountId=Number($(this).find(".accountId").text())
            payListModel.payreceiptAmout=Number($(this).find(".paymentAmount").children().val())
            payListArry.push(payListModel)
        })
        if(bankAmount!=null){
            $("#posAmount").val(bankAmount)
            $(".posContentTable").css("display","none")
        }
        countPayAmount(countAmountOfArrears,true)
        counterAbledStagingAmount()
    })


    var otherAccountArry=[]
    $(document).on('click','#otherAmountSure',function(){
        otherAccountArry=[];
        var otherAccountMoneyAmount=0;
        if($("#otherCounterTable tbody tr").length>0){
            $("#otherCounterTable tbody tr").each(function(index,value){
                otherAccountMoneyAmount=accAdd(otherAccountMoneyAmount,$(this).find(".otherAmount").children().val()*1)
            })
        }

        var otherAccountListArry=[]
        $("#otherCounterTable tbody tr").each(function(index,value){
            var payListModel={
                accountId:"",
                payreceiptAmout:""
            }
            payListModel.accountId=Number($(this).find(".accountId").text())
            payListModel.payreceiptAmout=Number($(this).find(".otherAmount").children().val())
            otherAccountArry.push(payListModel)
        })

        if(otherAccountMoneyAmount!=null){
            $("#otherAccount").val(otherAccountMoneyAmount)
            $(".otherContentTable").css("display","none")
        }
        countPayAmount(countAmountOfArrears,true)
        counterAbledStagingAmount()
    })


    //获取零售页面的值
    var  getRetailDetailModel
    function getRetailValue(){
        //商品明细
        var detailListArry=[];
        $("#productInfoTable tbody tr").each(function(){
            var productInfoModel={
                orderno:"",
                isGift:"",
                goodsId:null,
                imei:null,
                goodsNumber:"",
                discount:"",
                disPrice:"",
                amount:"",
                salesman1:null,
                salesman2:null,
                busId:"",
                isInstall:"",
                remark:"",
                storageId:null,
                price:"",
            }
            if($(this).attr("class").toString().indexOf("addGiftslastRow")<0){
                productInfoModel.orderno=$(this).find(".productRowNumber").text();
                productInfoModel.isGift=($(this).find(".changeGift").attr("checked")==true||$(this).find(".changeGift").attr("checked")=="checked")?1:0;
                productInfoModel.goodsId=$(this).find(".goodsId").text()==""?0:Number($(this).find(".goodsId").text());
                productInfoModel.imei=$(this).find(".imeiManage").text()=="0"?"":Number($(this).find(".imeiInfo").children().first().find(".retailimeiId").text());
                productInfoModel.goodsNumber=Number($(this).find(".inputProductNum").val());
                productInfoModel.discount=Number($(this).find(".inputdiscountRate").val());
                productInfoModel.disPrice=Number($(this).find(".inputdiscountUnitPrice").val());
                productInfoModel.amount=Number($(this).find(".inputdiscountAmount").val());
                productInfoModel.salesman1=Number($(this).find(".saleInput1").data("employeeId"));
                productInfoModel.salesman2=Number($(this).find(".saleInput2").data("employeeId"));
                productInfoModel.busId=$(this).find(".businessMac").find(".selectpicker").val()==undefined?0:Number($(this).find(".businessMac").find(".selectpicker").val());
                productInfoModel.isInstall=($(this).find(".stagingCheck").attr("checked")==true||$(this).find(".stagingCheck").attr("checked")=="checked")?1:0
                productInfoModel.remark=$(this).find(".productRemark").children().val();
                productInfoModel.storageId=$(this).find(".productStorageId").text()==""?0:Number($(this).find(".productStorageId").text());
                productInfoModel.price=Number($(this).find(".productPrice").text());
                detailListArry.push(productInfoModel)

            }
        })
        //运营商业务明细
        var busListArry=[]
        $("#carrBusinTable tbody tr").each(function(index,value){
            var busListModel={
                busId:null,
                busAmount:"",
                busNo:"",
                tel:"",
                telImei:"",
                debuBond:"",
                salesman1:null,
                salesman2:null,
                commissionWill:"",
                qty:"",

                remark:""
            }
            busListModel.busId=$(this).find(".carrSlectNameInput").data('id');
            busListModel.busAmount=Number($(this).find(".actualPayment").children().val());
            busListModel.busNo=$(this).find(".businessNum").children().val();
            busListModel.tel=$(this).find(".carrTelephone").children().val();
            busListModel.telImei=$(this).find(".telephoneImei").children().val();
            busListModel.debuBond=Number($(this).find(".discountMargin").children().val());
            busListModel.salesman1=Number($(this).find(".carrSaleInput1").data("employeeId"));
            busListModel.salesman2=Number($(this).find(".carrSaleInput2").data("employeeId"));
            busListModel.commissionWill=Number($(this).find(".comissionEsit").children().val());
            busListModel.qty=Number($(this).find(".qty").children().val());

            busListModel.remark=$(this).find(".carrRemark").children().val();
            busListArry.push(busListModel)
        })
        //增值业务明细
        var serviceListArry=[];
        $("#Value-addedTable tbody tr").each(function(index,value){
            var addValueModel={
                serviceId:null,
                salesman1:null,
                serviceAmount:"",
                stratDate:"",
                orderno:"",
                salesman2:null,
                remark:"",
                userNum:"",
                serviceDue:""
            };
            addValueModel.serviceId=$(this).find(".addValueSelectName").val()=="null"?0:Number($(this).find(".addValueSelectName").val())
            addValueModel.salesman1=Number($(this).find(".addValueSaleInput1").data("employeeId"));
            addValueModel.serviceAmount=Number($(this).find(".realPayment").children().val());
            addValueModel.stratDate=$(this).find(".effectiveDate").val()==""?null:$(this).find(".effectiveDate").val();
            addValueModel.orderno=$(this).find(".addValueProductNumber").val();
            addValueModel.salesman2=Number($(this).find(".addValueSaleInput2").data("employeeId"));
            addValueModel.remark=$(this).find(".valueRemark").children().val()
            addValueModel.userNum=$(this).find(".usageCount").text()==""?-1:Number($(this).find(".usageCount").text());
            addValueModel.serviceDue=$(this).find(".limitDate").text()==""?-1:Number($(this).find(".limitDate").text());
            serviceListArry.push(addValueModel)
        })
        //第三方抵扣明细
        var couponListArry=[]
        $("#DiscountTable tbody tr").each(function(index,value){
            var couponListModel={
                couponId:null,
                amount:"",
                settleAmount:"",
                busNo:"",
                salesman1:null,
                salesman2:null,
                remark:""
            }
            couponListModel.couponId=$(this).find(".discountActiveNameOption").val()==undefined?0:Number($(this).find(".discountActiveNameOption").val());
            couponListModel.amount=Number($(this).find(".thirdDiscountAmountInput").val());
            couponListModel.settleAmount=Number($(this).find(".settleAmountInput").val());
            couponListModel.busNo=$(this).find(".thirdBusinNum").children().val();
            couponListModel.salesman1=Number($(this).find(".thirdSaleInput1").data("employeeId"));
            couponListModel.salesman2=Number($(this).find(".thirdSaleInput2").data("employeeId"));
            couponListModel.remark=$(this).find(".discountRemark").children().val();
            couponListArry.push(couponListModel)
        })
        //分期业务明细
        var installListArry=[]
        $("#StaBuTable tbody tr").each(function(index,value){
            var installListModel={
                installId:null,
                amount:"",
                installAmount:"",
                installmentBalance:"",
                installmentCount:"",
                commissionWill:"",
                busNo:"",
                imei:"",
                salesman1:null,
                salesman2:null,
                remark:"",
                monthsPay:"",
            }
            installListModel.installId=$(this).find(".stagBusinessNameOption").val()=="null"?0:Number($(this).find(".stagBusinessNameOption").val());
            installListModel.amount=Number($(this).find(".stagingAmount").val());
            installListModel.installAmount=Number($(this).find(".firstPayAmount").val());
            installListModel.installmentBalance=Number($(this).find(".stagingLoadAmount").text());
            installListModel.installmentCount=Number($(this).find(".stagingNumber").val());
            installListModel.commissionWill=Number($(this).find(".commission").val())
            installListModel.busNo=$(this).find(".contractNo").val()
            installListModel.imei=$(this).find(".imeiNo").val()
            installListModel.salesman1=Number($(this).find(".stagingSaleInput1").data("employeeId"));
            installListModel.salesman2=Number($(this).find(".stagingSaleInput2").data("employeeId"));
            installListModel.remark=$(this).find(".stagRemark").children().val();
            installListModel.monthsPay=Number($(this).find(".monthSupply").text());
            installListArry.push(installListModel)
        })
        //资金账户明细
        var payAccountArry=[];
        $('#postAmountSure,#otherAmountSure').click();
        getRetailAmountFun();
        if(getRetailAmountModel!=undefined){
            payAccountArry.push(getRetailAmountModel)
        }
        getAppliedFun();
        if(getAppliedModel!=undefined){
            payAccountArry.push(getAppliedModel)
        }
        getMicrAmount();
        if(getMicrModel!=undefined){
            payAccountArry.push(getMicrModel)
        }
        //	2017-12-14 保存不需要积分抵现
        // if($("#pointArrived").attr("pointId")!=undefined&&$("#pointArrived").attr("pointId")!=null){
        //     var pointAmount={
        //         accountId:Number($("#pointArrived").attr("pointId")),
        //         payreceiptAmout:Number($("#pointArrived").val()),
        //     }
        //     payAccountArry.push(pointAmount)
        // }
        if(otherAccountArry.length>0){
            for(var i=0;i<otherAccountArry.length;i++){
                payAccountArry.push(otherAccountArry[i])
            }
        }
        if(payListArry.length>0){
            for(var j=0;j<payListArry.length;j++){
                payAccountArry.push(payListArry[j])
            }
        }
        var moreId = {
            accountId: $('.saveCode').attr('moreId')*1,
            payreceiptAmout: $('.arrears').attr('num')==undefined?0:$('.arrears').attr('num')*1
        }
        payAccountArry.push(moreId);
        var depList=[];
        if($('#depositDetailList').val()!=""){
            depList = JSON.parse($('#depositDetailList').val())
        }
        var id=$("#retailBillsId").val().trim()==""?'':Number($("#retailBillsId").val());
        var getRetailValModel={
            id:id,
            depositId:$("#depositBillsId").val()==""||$("#depositBillsId").val()==undefined?null:Number($("#depositBillsId").val()),
            sectionId:Number($("#storeInput").data("sectionId")),
            salesmanId:Number($("#saleInput").data("employeeId")),
            contactsunitId: $('#contactsunitId').data('contactUnitId')*1,
            customerId:$("#retailCardNum").data("vipId")==undefined?null:$("#retailCardNum").data("vipId"),
            customerName:$("#vipName").val(),
            customerTel:$("#retailCardNum").val(),
            billsDate:$("#dateInput").val(),
            totAmount:Number($(".billsAmount").text()),
            totDepositAmount:Number($(".retailDeposit").text()),
            totInstallAmount:Number($(".installMentLoad").text()),
            totCouponAmount:Number($(".arrialAmount").text()),
            reduceAmout:Number($("#wipingAmount").val()),
            vipAmount:Number($("#memberStoredValue").val()),
            integralAmount:Number($("#pointArrived").val()),
            voucherAmount:Number($("#promotionalCoupons").val()),
            totPayAmount:Number($(".paidAmount").text()),
            totDebtAmount:Number($(".arrears").text()),
            totRecAmount:Number($(".amountDue").text()),
            integralAmount: $('#pointArrived').val()*1,
            remark:$("#retailRemark").val(),
            detailList:detailListArry,
            busList:busListArry,
            serviceList:serviceListArry,
            couponList:couponListArry,
            installList:installListArry,
            payList:payAccountArry,
            depList:depList
        }
        return getRetailDetailModel=getRetailValModel
    }

    function saveRetailBills(){
        getRetailValue();
        var flag=false;
        for (var int = 0; int < getRetailDetailModel.detailList.length; int++) {
            if (getRetailDetailModel.detailList[int].isGift==0&&$.parseFloat(getRetailDetailModel.detailList[int].amount) == 0) {
                flag = true
            }
        }
        if(flag==true){
            $.zxsaas_plus.showconfirm('提示','单据中存在不是赠品,折后金额为0的商品，是否确认保存',function () {
                saveRetailc()
            },function () {
                return;
            })
        }else{
            saveRetailc()
        }
        function saveRetailc() {
            $.request({
                type: 'POST',
                url: '/manager/inventory/retail/delivery/saveAndExecuteDraftOrder',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(getRetailDetailModel),
                success: function (data) {
                    if (data.result == 1) {
                        var dataId = data.data.billsId
                        $("#retailBillsId").val(dataId);
                        $.zxsaas_plus.showalert('提示', "保存成功");
                        setTimeout('location.reload()', 2000);
                    } else {
                        $.zxsaas_plus.showalert('error', data.desc);
                    }
                },
                error: function () {
                    alert('请求失败！')
                }
            })
        }
    }
    //保存零售草稿单
    $(document).on('click','#saveDraft',function(){
        saveRetailBills()
    })


    //保存到正式单并过账
    $(document).on('click','.saveButton',function(){
        getRetailValue();
        var flas=false
        $("#carrBusinTable tbody tr").each(function(index,value){
            if(eval($(this).find(".carrBusinSelectUnit").val())!=null){
                if($(this).find(".carrSlectNameInput").val()=="") {
                    flas=true
                }
            }
        })
        if(flas==true){
            $.zxsaas_plus.showalert('提示', '请填写业务名称');
            return;
        }
        var unionPayFlowNo = $('.saveButton').attr('unionPayFlowNo');
        if(unionPayFlowNo !== null){
            getRetailDetailModel.unionPayFlowNo = unionPayFlowNo;
        }
        var flag=false;
        for (var int = 0; int < getRetailDetailModel.detailList.length; int++) {
            if (getRetailDetailModel.detailList[int].isGift==0&&$.parseFloat(getRetailDetailModel.detailList[int].amount) == 0) {
                flag = true
            }
        }
        if(flag==true){
            $.zxsaas_plus.showconfirm('提示','单据中存在不是赠品,折后金额为0的商品，是否确认保存',function () {
                saveRetail()
            },function () {
                return;
            })
        }else{
            saveRetail()
        }
        function saveRetail() {
            if ($('.arrears').text() > 0) {
                $.zxsaas_plus.showconfirm('提示', '此单还有' + $('.arrears').text() + '元未结算，是否确认结算？', function () {
                    $.request({
                        type: 'POST',
                        url: '/manager/inventory/retail/delivery/saveAndExecuteOrder',
                        dataType: 'json',
                        contentType: "application/json",
                        data: JSON.stringify(getRetailDetailModel),
                        success: function (data) {
                            if (data.result == 1 || data.result == -2 || data.result == 2) {
                                $('.saveButton').attr('disabled', true);
                                $.zxsaas_plus.showalert('提示', data.desc);
                                var id = data.data.billsId;

                                function show(name) {
                                    location.href = '/manager/inventory/retail/delivery/toPrint?bId=' + name;
                                }

                                function _show(name) {
                                    return function () {
                                        show(name);
                                    }
                                }

                                setTimeout(_show(id), 3000);
                            } else {

                                $.zxsaas_plus.showalert('error', data.desc);
                            }
                        },
                        error: function () {
                            alert('请求失败！')
                        }
                    })
                }, function () {
                    return;
                });
            } else {
                $.request({
                    type: 'POST',
                    url: '/manager/inventory/retail/delivery/saveAndExecuteOrder',
                    dataType: 'json',
                    contentType: "application/json",
                    data: JSON.stringify(getRetailDetailModel),
                    success: function (data) {
                        if (data.result == 1 || data.result == -2 || data.result == 2) {
                            $('.saveButton').attr('disabled', true);
                            $.zxsaas_plus.showalert('提示', data.desc);
                            var id = data.data.billsId;

                            function show(name) {
                                location.href = '/manager/inventory/retail/delivery/toPrint?bId=' + name;
                            }

                            function _show(name) {
                                return function () {
                                    show(name);
                                }
                            }

                            setTimeout(_show(id), 3000);
                        } else {

                            $.zxsaas_plus.showalert('error', data.desc);
                        }
                    },
                    error: function () {
                        alert('请求失败！')
                    }
                })
            }
        }
    })

//    历史单据
    $('.hisbill').click(function(){
        window.parent.openWorkBoxByMenutext('零售收银台',basePath + '/inventory/retail/cashier/main?tabType=1',true);
    })

    //调入零售草稿单
    $(document).on("click",'#transDraft',function(){
        if($("#storeInput").data("sectionId")==""||$("#storeInput").data("sectionId")=="undefined"){
            $.zxsaas_plus.showalert('提示',"请先选择门店");
            return;
        }
        $("#counterRetailBillsTable").resize();
        $("#counterModal").modal('show');
        $("#counterRetailBillsTable").jqGrid('setGridParam', {
            datatype:'json',
            postData:{
                page:1,
                rows:10,
                accessSectionIds:$("#storeInput").data("sectionId")
            }
        }).trigger("reloadGrid");
    })
    //加载收银台零售单
    $.jgrid.defaults.width = 760;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    var lastrow = null,lastcell = null;
    var selectBillsRowId
    $('#counterRetailBillsTable').jqGrid({
        url:'/manager/inventory/retail/delivery/loadRetailOrder',
        mtype: "POST",
        datatype: "local",
        jsonReader: {
            root: "data.rows",
            total: "data.total",
            records: "data.records",
            repeatitems: false
        },
        colNames:['操作','单据日期','单据id','会员卡号','客户姓名','联系电话','备注'],
        colModel:[
            {name: 'delRow', index: 'delRow', width:80, align: 'center',formatter:delBillsRow,sortable: false,},
            {name: 'billsDate', index: 'billsDate', width:120, align: 'center', sortable: false},
            {name: 'orderId', index: 'orderId', width:100, align: 'center', sortable: false,hidden:true},
            {name: 'memberCardNo', index: 'memberCardNo', width:80, align: 'center', sorttype: 'string', sortable: false},
            {name: 'memberName', index: 'memberName', width:100, align: 'center', sortable: false},
            {name: 'memberTelephone', index: 'memberTelephone', width:100, align: 'center', sortable: false,},
            {name: 'remark', index: 'remark', width:150, align: 'center', sorttype: 'string', sortable: false,},

        ],
        sortable:false,
        rownumbers:false,
        cellsubmit:'clientArray', //单元格保存内容的位置
        editurl:'clientArray',
        rowNum:10,
        rownumbers:true,
        pager:'#countergridpager',
        rowList:[10, 15, 20, 25, 40],
        viewrecords:true,
        multiboxonly:true,
        multiselect:true,
//	    cellEdit:true,
        width:"auto",
        height:350,
        autowidth:true,
        rownumWidth:35,
        shrinkToFit:false,
        footerrow:false,
        userDataOnFooter:true,
        ondblClickRow: function(id){
            var rowData=$("#counterRetailBillsTable").jqGrid('getRowData',id)
            loadCheckOutCounter(rowData.orderId)
            $("#counterModal").modal('hide');
        },
        beforeEditCell: function(rowid, cellname, v, iRow, iCol){
            lastrow = iRow;
            lastcell = iCol;
        },
        afterSaveCell: function(rowid, cellname, value, iRow, iCol){},
        onCellSelect: function(rowid, index, e){},
        onSelectRow: function(id){
            var rowBillsData=$("#counterRetailBillsTable").jqGrid('getRowData',id)
            return selectBillsRowId=rowBillsData.orderId
        },
        beforeSelectRow: function(rowid,e){
            $('#counterRetailBillsTable').jqGrid('resetSelection')
            return(true);
        },
        afterInsertRow: function(rowid, aData){ //新增一行之后
        },
        gridComplete:function(){
            $("#counterRetailBillsTable").setLabel(0,'序号')
            $("#counterRetailBillsTable").setLabel(1,'调入')
            $("#counterRetailBillsTable").setLabel(2,'操作')
        },
        loadComplete: function(data){
        }
    })
    function delBillsRow(cellvalue, options, rowObjec) {
        var addAndDel = '<div class="operating" style="cursor:pointer"></span><span class="del glyphicon glyphicon-trash"></span></div>';
        return addAndDel;
    }
    //删除行
    var confirmHtml='<div class="modal fade" id="confirmModal" data-keyboard="true" data-backdrop="static">' +
        '<div class="modal-dialog" style="width: 400px; height: 150px;" >' +
        ' <div class="modal-content" >' +
        '  <div class="modal-header">' +
        '   <h4 class="modal-title">' + "删除提示" + '</h4>' +
        '</div>' +
        '<div class="modal-body">' + "是否删除此草稿单据 "+
        '</div>' +
        '<div class="modal-footer" style="text-align: center;">' +
        '<button type="button" class="btn btn-warning" id="delYes">确定</button>' +
        '  <button type="button" class="btn btn-primary" data-dismiss="modal" id="noDel">取消</button>' +
        '  </div>' +
        '</div>' +
        '</div>' +
        ' </div>';
    $(document).on('click','.del',function(){
        var rowId= $("#counterRetailBillsTable").jqGrid("getGridParam", "selrow");
        var rowData=$("#counterRetailBillsTable").jqGrid("getRowData",rowId);
        var draftBillsId=rowData.orderId;
        $("body").append(confirmHtml);
        $('#delYes').data({id:rowId,orderId:draftBillsId});
        $("#confirmModal").modal("show")
    })

    $(document).on('click','#delYes',function(){
        var id = $(this).data('id');
        var orderId = $(this).data('orderId');
        delDraft(orderId,id) ;
    })

    // $(document).on('click','#noDel',function(){
    //    $("#confirmModal").modal("hide")
    // })

    function delDraft(draftBillsId,rowId){
        $.request({
            type:'POST',
            url:'/manager/inventory/retail/delivery/deleteDraftOrder',
            dataType:'json',
            data:{"id":draftBillsId},
            success:function(data){
                if(data.result==1){
                    $('#counterRetailBillsTable').jqGrid('delRowData', rowId);
                    $('#counterRetailBillsTable').trigger('reloadGrid');
                    $("#confirmModal").modal("hide")
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })
    }
    $(document).on('click','#surecounterRetailButton',function(){
        var rowId= $("#counterRetailBillsTable").jqGrid("getGridParam", "selrow");
        if(rowId != null){
            $("#counterModal").modal('hide');
            loadCheckOutCounter(selectBillsRowId)
        }else{
            $.zxsaas_plus.showalert('error','请先选择一条数据');
        }
    })

    //调入零售草稿单
    function loadCheckOutCounter(billsId){
        resetRetailBills();
        var data=$("#storeInput").data("sectionId")
        abledUseAccount(data)
        $.request({
            type:'POST',
            url:'/manager/inventory/retail/delivery/loadDraftOrder',
            dataType:'json',
            data:{"id":billsId},
            success:function(data){
                if(data.result==1){
                    var transDraftData=data.data.obj
                    fillData(transDraftData)
                    if(transDraftData.isVip !== 1){
                        if(transDraftData.memberName !==null){
                            $('#vipName').attr('readonly',false);
                        }
                    }
                    $('#productInfoTable tbody tr').each(function(i,item){
                        if($(item).find('.changeGift').is(":checked")){
                            $(item).find('.inputdiscountUnitPrice').attr('disabled',true);
                            $(item).find('.inputdiscountAmount').attr('disabled',true);
                            $(item).find('.inputdiscountRate').attr('disabled',true);
                            var id = $(item).attr('id');
                            var add = id.split('_');
                            if(add[0] == "addproductInfo"){
                                $('#productInfoTable tbody #addGifts_'+add[1]).hide();
                            }
                        }
                    })
                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })
    }

    //调入草稿单页面填充数据
    function fillData(dataModel){
        //去掉营业员为空的提示
        $(".saleManerrorBox").html("");

        //填充表头数据
        $("#storeInput").val(dataModel.sectionName).data("sectionId",dataModel.sectionId) //门店
        $("#saleInput").val(dataModel.managerName).data("employeeId",dataModel.managerId)	//营业员
        $("#contactsunitId").val(dataModel.unitName).data("contactUnitId",dataModel.unitId)	//往来单位
        $("#dateInput").val(dataModel.billsDateStr)//单据日期
        $("#retailBillsId").val(dataModel.id)//单据id
        $("#retailCardNum").val(dataModel.memberTelephone)//手机号
        $("#vipName").val(dataModel.memberName)//客户姓名
        $(".billsAmount").text(dataModel.totAmount)//总金额
        $(".retailDeposit").text(dataModel.totDepostitAmount)//零售定金
        $("#wipingAmount").val(dataModel.reduceAmout)//抹零金额
        $(".amountDue").text(dataModel.totGoodsAmount)//应收金额
        $("#retailRemark").val(dataModel.remark)//备注
        $(".paidAmount").text(dataModel.totPayAmount)//实收金额
        $(".arrears").text(dataModel.totDebtAmount)//欠款金额
        $("#promotionalCoupons").val(dataModel.promotionAccount)//促销券金额
        $("#memberStoredValue").val(dataModel.memberAmountMoney)//会员储值金额
        $("#pointArrived").val(dataModel.memberScoreMoney)//积分抵现金额
        $("#depositBillsId").val(dataModel.depId);
        $('#depositDetailList').val(JSON.stringify(dataModel.depList));//定金明细
        $('.saveButton').attr('unionPayFlowNo',dataModel.unionPayFlowNo);//临时存储聚合收款流水号
        if(dataModel.isVip=="1"){
            $("#vipInfoBox").css("display","block")
            $("#retailCardNum").data("vipId",dataModel.memberId)
            $("#vipType").text(dataModel.memberType)
            $("#vipCode").text(dataModel.memberCardNo)
            $("#vipScore").text(dataModel.mScore)
            $("#vipAmount").text(dataModel.mAmount)
        }else{
            $("#vipInfoBox").css("display","none")
        }
        var symbol=true
        contractMac(fillProductInfo(dataModel),symbol)
        function fillProductInfo(dataModel){
            if(dataModel.detailList.length>0){
                $('#productInfoTable tbody').html('')
                dataModel.detailList.map(function (detailListOpt,index){
                    var productModel={
                        name:detailListOpt.goodsName,
                        goodsId:detailListOpt.goodsId,
                        code:detailListOpt.goodsCode,
                        color:detailListOpt.color,
                        models:detailListOpt.goodsModels,
                        categoryName:detailListOpt.categoryName,
                        retailPrice:detailListOpt.retailPrice,
                        barcode:detailListOpt.barCode,
                        ifManageImei:detailListOpt.ifManageImei,
                        configure:detailListOpt.configure
                    }
                    var storageModel={
                        storageName:detailListOpt.storageName,
                        stockCounter:"",
                        storageId:detailListOpt.storageId,
                        imei:detailListOpt.imei,
                        auximei:detailListOpt.auxiliaryImei,
                        remark:detailListOpt.remark,
                        imeiId:detailListOpt.imeiId,
                    }
                    if(detailListOpt.isGift==0){
//					 if(index!=0){
                        $("#productInfoTable tbody").append(productInfoHtml)
                        $("#productInfoTable tbody").find(".addproductInfo").last().attr("id","addproductInfo_"+detailListOpt.orderno)
//					 }
                        if(detailListOpt.isInstall==1){
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".stagingCheck").attr("checked","checked")
                        }
                        $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".productRemark").children().val(detailListOpt.remark)
                        addProductInfo(productModel,storageModel,"#addproductInfo_"+detailListOpt.orderno)
                        $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).next().attr("id","addGifts_"+detailListOpt.orderno)
                        $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".productRowNumber").text(detailListOpt.orderno)
                        $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").val(detailListOpt.goodsCount)
                        $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputdiscountRate").val(detailListOpt.disCount)
                        $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputdiscountUnitPrice").val(detailListOpt.disPrice)
                        $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputdiscountAmount").val(detailListOpt.amount)
                        $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput1").val(detailListOpt.saleManName1).data("employeeId",detailListOpt.saleManId1)
                        $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput2").val(detailListOpt.saleManName2).data("employeeId",detailListOpt.saleManId2)
                        $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".selectpicker").find('option[value='+detailListOpt.busId+']').attr("selected",true)
                    }else if(detailListOpt.isGift==1){
                        var retailRowNum=detailListOpt.orderno
                        var retailRowNumArry=retailRowNum.split(".")

                        if(retailRowNumArry.length > 1){
                            var rowNumArryFirst = retailRowNumArry[0];
                            var rowNumArryLast = retailRowNumArry[1];

                            if(rowNumArryFirst!=undefined&&rowNumArryLast!=undefined){
                                $("#productInfoTable tbody #addGifts_"+rowNumArryFirst).before(giftHtml)
                                $("#productInfoTable tbody #addGifts_"+rowNumArryFirst).prev().attr("id","addGifts_"+rowNumArryFirst+"_"+rowNumArryLast);
                            }
                            if(detailListOpt.isInstall==1){
                                $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".stagingCheck").attr("checked","checked")
                            }
                            $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".productRemark").children().val(detailListOpt.remark)
                            addProductInfo(productModel,storageModel,"#addGifts_"+rowNumArryFirst+"_"+rowNumArryLast)

                            $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".productRowNumber").text(detailListOpt.orderno)
                            $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputProductNum").val(detailListOpt.goodsCount)
                            $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputdiscountRate").val(detailListOpt.disCount)
                            $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputdiscountUnitPrice").val(detailListOpt.disPrice)
                            $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".inputdiscountAmount").val(detailListOpt.amount)
                            $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".saleInput1").val(detailListOpt.saleManName1).data("employeeId",detailListOpt.saleManId1)
                            $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".saleInput2").val(detailListOpt.saleManName2).data("employeeId",detailListOpt.saleManId2)
                            $("#productInfoTable tbody #addGifts_"+rowNumArryFirst+"_"+rowNumArryLast).find(".selectpicker").find('option[value='+detailListOpt.busId+']').attr("selected",true)
                        }else{
                            $("#productInfoTable tbody").append(productInfoHtml);

                            $("#productInfoTable tbody").find(".addproductInfo").last().attr("id","addproductInfo_"+detailListOpt.orderno)
                            if(detailListOpt.isInstall==1){
                                $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".stagingCheck").attr("checked","checked")
                            }
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".productRemark").children().val(detailListOpt.remark)
                            addProductInfo(productModel,storageModel,"#addproductInfo_"+detailListOpt.orderno)
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).next().attr("id","addGifts_"+detailListOpt.orderno)
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".productRowNumber").text(detailListOpt.orderno)
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputProductNum").val(detailListOpt.goodsCount)
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputdiscountRate").val(detailListOpt.disCount)
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputdiscountUnitPrice").val(detailListOpt.disPrice)
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".inputdiscountAmount").val(detailListOpt.amount)
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput1").val(detailListOpt.saleManName1).data("employeeId",detailListOpt.saleManId1)
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".saleInput2").val(detailListOpt.saleManName2).data("employeeId",detailListOpt.saleManId2)
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".selectpicker").find('option[value='+detailListOpt.busId+']').attr("selected",true)
                            $("#productInfoTable tbody #addproductInfo_"+detailListOpt.orderno).find(".changeGift").prop('checked',true)

                            $("#productInfoTable tbody #addGifts_"+detailListOpt.orderno).hide()
                        }

                    }
                })
                var productAfterDiscountAmount=0
                $("#productInfoTable tbody").find(".addproductInfo").each(function (index,value){
                    productAfterDiscountAmount=productAfterDiscountAmount+Number($(this).find(".inputdiscountAmount").val())
                })
                $("#productInfoTable tfoot tr td:eq(8)").text(productAfterDiscountAmount)
                countAmount(countAmountDue,countAmountOfArrears,true);
            }
        }
        // 运营商业务
        if(dataModel.operatorList.length>0){
            $("#carrBusinTable").parent().css({display:"block"})
            dataModel.operatorList.map(function(operatOpt,index){
                if(index!=0){
                    $("#carrBusinTable tbody").append(carrHtml);
                    $("#carrBusinTable tbody tr:last").attr("id","carrBusinRowNum_"+(index+1))
                    $("#carrBusinTable tbody tr:last").find(".carrRowNumber").text((index+1))
                }
                createBusin("carrBusinRowNum_"+(index+1))

                $("#carrBusinTable tbody "+"#carrBusinRowNum_"+(index+1)).find(".carrSelectUnit").children().html(carrBusinUnit)

                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrBusinSelectUnit").find('option[value='+operatOpt.unitId+']').attr("selected",true)
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrSlectNameInput").val(operatOpt.busName).data('id',operatOpt.busId);
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputqty").val(operatOpt.qty)
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputcommission").val(operatOpt.commission)
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputactualPayment").val(operatOpt.busAmount);
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".businessNum").children().val(operatOpt.busNo);
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrTelephone").children().val(operatOpt.tel);
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".telephoneImei").children().val(operatOpt.telImei);
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputdiscountMargin").val(operatOpt.debuBond);
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrSaleInput1").val(operatOpt.saleManName1).data("employeeId",operatOpt.saleManId1);
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrSaleInput2").val(operatOpt.saleManName2).data("employeeId",operatOpt.saleManId2);
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".inputcomissionEsit").val(operatOpt.commissionWill);
                $("#carrBusinTable tbody #carrBusinRowNum_"+(index+1)).find(".carrRemark").children().val(operatOpt.remark);
                disabledCol("#carrBusinTable tbody tr",".carrSelectUnit",".carrBusinSelectUnit")
            })
            countBussinessMacAmount();
        }
        //增值服务
        if(dataModel.serviceList.length>0){
            $("#Value-addedTable").parent().css({display:"block"})
            dataModel.serviceList.map(function(serviceOpt,index){
                if(index!=0){
                    $("#Value-addedTable tbody").append(valueHtml);
                    $("#Value-addedTable tbody tr:last").attr("id","addValueService_"+(index+1))
                    $("#Value-addedTable tbody tr:last").find(".valueRowNumber").text((index+1))
                }
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find('.addValueSaleInput1').storeSales({
                    sectionId:'storeInput',
                    search:false,
                })
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find('.addValueSaleInput2').storeSales({
                    sectionId:'storeInput',
                    search:false
                })
                getProductNumbers(index)
                serviceOpt.goodsName = serviceOpt.goodsName==null?"":serviceOpt.goodsName;
                serviceOpt.memberPrice = serviceOpt.memberPrice==null?"":serviceOpt.memberPrice;
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".valueSelectName").children().html(addValueServiceNameOpt)
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueSelectName").find('option[value='+serviceOpt.serviceId+']').attr("selected",true);
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueSaleInput1").val(serviceOpt.saleManName1).data("employeeId",serviceOpt.saleManId1);
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueSaleInput2").val(serviceOpt.saleManName2).data("employeeId",serviceOpt.saleManId2);
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".realPaymentInput").val(serviceOpt.serviceAmount)
//			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".effectiveDate").val(serviceOpt.stratDate)
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".effectiveDate").datePlu({
                    endDate:false,
                    ifPermissions:false,
                    minTime: "1970-01-01",
                    maxTime: "2370-01-01",
                    defaultTime: serviceOpt.stratDate
                })
//			 $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueProductNumber").find('option[value='+serviceOpt.orderno+']').attr("selected",true);
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueProductNumber").val(serviceOpt.orderno);
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".esitPrice").text(serviceOpt.setPrice)
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".valuePrice").text(serviceOpt.memberPrice)
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".addValueProductName").children().first().text(serviceOpt.goodsName)
                if(serviceOpt.imei==null){
                    $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".phoneImei").children().first().text("");
                }else{
                    $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".phoneImei").children().first().text(serviceOpt.imei);
                }
                var userNum = serviceOpt.userNum;
                var serviceDue = serviceOpt.serviceDue;
                if(userNum=="-1"){userNum=""}
                if(serviceDue=="-1"){ serviceDue=""}

                if(dataModel.isVip=="1"){
                    if(serviceOpt.mUserNum!=null){
                        userNum = serviceOpt.mUserNum;
                    }
                }
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".usageCount").text(userNum)
                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".limitDate").text(serviceDue)

                $("#Value-addedTable tbody #addValueService_"+(index+1)).find(".valueRemark").children().val(serviceOpt.remark)
            })
            disabledCol("#Value-addedTable tbody tr",".valueSelectName",".addValueSelectName")
            countAddValueAmount();
        }
        //第三方抵扣
        if(dataModel.couponList.length>0){
            $("#DiscountTable").parent().css({display:"block"})
            dataModel.couponList.map(function(couponListOpt,index){
                if(index!=0){
                    $("#DiscountTable tbody").append(discountHtml);
                    $("#DiscountTable tbody tr:last").attr("id","thirdDisount_"+(index+1))
                    $("#DiscountTable tbody tr:last").find(".discountRowNumber").text((index+1))
                }
                $("#DiscountTable tbody #thirdDisount_"+(index+1)).find('.thirdSaleInput1').storeSales({
                    sectionId:'storeInput',
                    search:false
                }),
                    $("#DiscountTable tbody #thirdDisount_"+(index+1)).find('.thirdSaleInput2').storeSales({
                        sectionId:'storeInput',
                        search:false
                    })
                $("#DiscountTable tbody "+"#thirdDisount_"+(index+1)).find(".discountSelectUnit").children().html(thirdDisountUntilOpt)
                searchThirdDiscount(couponListOpt.unitId,"thirdDisount_"+(index+1),couponListOpt.couponId)
                $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".discountSelectUnitOption").find('option[value='+couponListOpt.unitId+']').attr("selected",true)
                $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".discountActiveNameOption").val(couponListOpt.couponName)
                $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdDiscountAmountInput").val(couponListOpt.amount)
                $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".settleAmountInput").val(couponListOpt.settleAmount||0)
                $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdBusinNum").children().val(couponListOpt.busNo)

                $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdSaleInput1").val(couponListOpt.saleManName1).data("employeeId",couponListOpt.saleManId1);
                $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".thirdSaleInput2").val(couponListOpt.saleManName2).data("employeeId",couponListOpt.saleManId2);
                $("#DiscountTable tbody #thirdDisount_"+(index+1)).find(".discountRemark").children().val(couponListOpt.remark)
            })
            disabledCol("#DiscountTable tbody tr",".discountSelectUnit",".discountSelectUnitOption")
            countDiscountAmount();
        }
        //分期业务
        if(dataModel.installList.length>0){
            $("#StaBuTable").parent().css({display:"block"})
            dataModel.installList.map(function(installListOpt,index){
                if(index!=0){
                    $("#StaBuTable tbody").append(stagingHtml);
                    $("#StaBuTable tbody tr:last").attr("id","stagingRow_"+(index+1))
                    $("#StaBuTable tbody tr:last").find(".stagRowNumber").text((index+1))
                }
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find('.stagingSaleInput1').storeSales({
                    sectionId:'storeInput',
                    search:false
                }),
                    $("#StaBuTable tbody #stagingRow_"+(index+1)).find('.stagingSaleInput2').storeSales({
                        sectionId:'storeInput',
                        search:false
                    })
                $("#StaBuTable tbody "+"#stagingRow_"+(index+1)).find(".stagSelectUnit").children().html(stagingSelectOption)
                searchStagingBussiness(installListOpt.unitId,"stagingRow_"+(index+1),installListOpt.installId)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagSelectOption").find('option[value='+installListOpt.unitId+']').attr("selected",true)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagBusinessNameOption").val(installListOpt.installName)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingAmount").val(installListOpt.amount)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".firstPayAmount").val(installListOpt.installAmount)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingLoadAmount").text(installListOpt.installmentBalance)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingNumber").val(installListOpt.installmentCount)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".commission").val(installListOpt.commissionWill)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".contractNo").val(installListOpt.busNo)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".imeiNo").val(installListOpt.imei)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingSaleInput1").val(installListOpt.saleManName1).data("employeeId",installListOpt.saleManId1)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagingSaleInput2").val(installListOpt.saleManName2).data("employeeId",installListOpt.saleManId2)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".stagRemark").children().val(installListOpt.remark)
                $("#StaBuTable tbody #stagingRow_"+(index+1)).find(".monthSupply").text(installListOpt.monthsPay)
            })
            disabledCol("#StaBuTable tbody tr",".stagSelectUnit",".stagSelectOption")
        }
        if(dataModel.payreceiptList !== undefined && dataModel.payreceiptList !== null ){
            if(dataModel.payreceiptList.length>0){
                var posAmount=0
                var otherAmount=0
                var posTotalAmountArry=[]
                var otherTotalAmountArry=[]
                dataModel.payreceiptList.map(function(payListOpt,index){
                    var posTotalAmountModal={};
                    var otherTotalAmountModal={};
                    if(payListOpt.accountTypeName=="现金"){
                        $("#retailAmount").removeAttr("disabled");
                        $("#retailAmount").val(payListOpt.payreceiptAmout).attr("cashId",payListOpt.accountId)
                    }
                    if(payListOpt.accountTypeName=="支付宝"){
                        $("#alipayAmount").removeAttr("disabled");
                        $("#alipayAmount").val(payListOpt.payreceiptAmout).attr("applyId",payListOpt.accountId)
                    }
                    if(payListOpt.accountTypeName=="微信"){
                        $("#microLetterAmount").removeAttr("disabled");
                        $("#microLetterAmount").val(payListOpt.payreceiptAmout).attr("micrId",payListOpt.accountId)
                    }
                    if(payListOpt.accountTypeName=="聚合收款"){
                        if(dataModel.copyUnionPayAmount == true){
                            $('.arrears').attr('num',payListOpt.payreceiptAmout);
                            $(".saveCode").text('已扫码收款：'+payListOpt.payreceiptAmout).unbind("click").addClass('noCode');
                            countAmountOfArrears();
                        }
                    }
                    if(payListOpt.accountTypeName=="银行"){
                        posTotalAmountModal.accountName=payListOpt.accountName,
                            posTotalAmountModal.payreceiptAmout=payListOpt.payreceiptAmout,
                            posTotalAmountModal.accountId=payListOpt.accountId
                        posTotalAmountArry.push(posTotalAmountModal)

                        $("#posTable tbody tr").each(function(i,item){
                            if($(item).find('.accountId').text() == payListOpt.accountId){
                                $(item).find('input').val(payListOpt.payreceiptAmout)
                                posAmount+=payListOpt.payreceiptAmout
                            }
                        })
                    }
                    if(payListOpt.accountTypeName=="其它"){
                        otherTotalAmountModal.accountName=payListOpt.accountName,
                            otherTotalAmountModal.payreceiptAmout=payListOpt.payreceiptAmout,
                            otherTotalAmountModal.accountId=payListOpt.accountId
                        otherTotalAmountArry.push(otherTotalAmountModal)

                        $("#otherCounterTable tbody tr").each(function(i,item){
                            if($(item).find('.accountId').text() == payListOpt.accountId){
                                $(item).find('input').val(payListOpt.payreceiptAmout)
                                otherAmount+=payListOpt.payreceiptAmout;
                            }
                        })
                    }
                })
                if(posTotalAmountArry.length>0){
                    $("#posAmount").removeAttr("disabled")
                    $("#posAmount").attr("readonly","readonly")
                    $("#posAmount").val(posAmount.toFixed(2))
                }
                // else{
                //   $("#posAmount").attr("disabled","disabled")
                // }
                if(otherTotalAmountArry.length>0){
                    $("#otherAccount").removeAttr("disabled")
                    $("#otherAccount").attr("readonly","readonly")
                    $("#otherAccount").val(otherAmount.toFixed(2))
                }
                // else{
                //   $("#otherAccount").attr("disabled","disabled")
                // }
            }
        }

        stagingSum()
    }

    /*********************  引入定金单  ********************/
    $('#introSingle').click(function () {
        if($("#storeInput").data("sectionId")==""||$("#storeInput").data("sectionId")=="undefined"){
            $.zxsaas_plus.showalert('提示',"请先选择门店");
            return;
        }


        $("#myModal_introSingle").modal('show');
        $('#introSearchBtn').click(function(){
            $.request({
                type:'post',
                url:'/manager/retail/billing/searchDepositGoodsVoList',
                data:{
                    sectionId:Number($("#storeInput").data("sectionId")),
                    queryKey:$('#introSearch').val()
                },
                dataType:'json',
                success:function(data){
                    if(data.result==1){
                        var intro=data.data.depositGoodsVoList;
                        var html;
                        if(intro.length==0){
                            $("#table_introSingle tbody").html('')
                        }else{
                            $.each(intro,function(i,val){
                                for(var i in val){
                                    if(val[i]==null){
                                        val[i]=''
                                    }
                                }
                                html+="<tr><td><input class='rb_check' type='checkbox'/><input class='introCode' value='"+val.retailMainId+"' type='hidden'/><input class='rb_introDepositId' value='"+val.retailDepositId+"' type='hidden'/></td>"+
                                    "<td class='rb_introOrderCode'>"+val.billsCode+"</td>"+
                                    "<td class='rb_introName'>"+val.customerName+"</td>"+
                                    "<td class='rb_introTel'>"+val.customerTel+"</td>"+
                                    "<td class='rb_introProName'>"+val.name+"</td>"+
                                    "<td class='rb_introModel'>"+val.models+"</td>"+
                                    "<td class='rb_introColor'>"+val.color+"</td>"+
                                    "<td class='rb_introDeposit'>"+val.deposit+"</td>"+
                                    "<td class='rb_introWriteOff'>"+val.hxAmount+"</td>"+
                                    "<td class='rb_introRetired'>"+val.tdAmount+"</td>"+
                                    "<td class='rb_introBalance'>"+val.remainderAmount+"</td>"+
                                    "<td><input class='rb_introTTD' type=text/></td>"+
                                    "<td class='rb_introOrderNum'>"+val.goodsNum+"</td>"+
                                    "<td class='rb_introWriteOffNum'>"+val.hxNum+"</td>"+
                                    "<td class='rb_introRetiredNum'>"+val.tdNum+"</td>"+
                                    "<td class='rb_introNumBalance'>"+val.remainderNum+"</td>"+
                                    "<td class='rb_introRemark'>"+val.remark+"</td></tr>";
                            });
                            $("#table_introSingle tbody").html(html)
                        }
                    }else{
                        $.zxsaas_plus.showalert('error',data.desc);
                    }

                },
                error:function(){
                    alert('运营商业务请求失败！')
                }
            });
        })
    });
    //定单引入勾选
    var introCode;
    var introCodeHasVal=false;
    $(document).on('click','.rb_check',function(e){
        if($(this).prop('checked')==true){
            if(!introCodeHasVal){
                introCode=$(this).next('input').val();
                introCodeHasVal=true;
            }else{
                if(introCode!=$(this).next('input').val()){
                    $.zxsaas_plus.showalert('warning','零售定单编码不同！');
                    return false;
                }
            }
        }else{
            //如果只有最后一个可以被勾选，那么关掉开关，需要重新给introCode赋值
            for(var i=0,q=0;i<$('#table_introSingle tbody').find('.rb_check').length;i++){
                if($('#table_introSingle tbody').find('.rb_check:eq('+i+')').prop('checked')==true){
                    q++;
                }
            }
            if(q==0){
                introCodeHasVal=false;
            }
        }
    })
    $("#myModal_introSingle").on('hidden.bs.modal',function(){
        $('#introSearchBtn').off()
    })
    $(document).on('keyup','.rb_introTTD',function(){
        $(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字小数点输入
    })
    $(document).on('focusout','.rb_introTTD',function(){
        var _this=$(this)
        if(Number(_this.val())>Number(_this.closest('tr').find('.rb_introBalance').text())){
            $.zxsaas_plus.showconfirmsure('提示','引入金额不能大于定金结余',function(){
                _this.focus()
            });
        }
        $(this).val(Math.round(Number($(this).val())*100)/100)
    })
    $('#introSingle_sure').click(function(){
        var tol=0;
        var len=$('#table_introSingle tbody tr').length;
        for(var i=0;i<len;i++){
            if($('#table_introSingle tbody tr:eq('+i+')').find('.rb_check').prop('checked')==true){
                $('#depositMainId').val($('#table_introSingle tbody tr:eq('+i+')').find('.introCode').val());
                var toll=Number($('#table_introSingle tbody tr:eq('+i+')').find('.rb_introTTD').val())
                if(toll==0){
                    $.zxsaas_plus.showalert('error','已勾选定金未填写金额！');
                    return false
                }else{
                    tol+=toll;
                    //存入金额
                    //存入id
                    $('#depositBillsId').val(Number($('#table_introSingle tbody tr:eq('+i+')').find('.introCode').val()));
//		    				counterAbledStagingAmount()
                }
            }
        }
        $('.retailDeposit').text(tol.toFixed(2));
        counterAbledStagingAmount()
        countAmountDue()
        countAmountOfArrears()
        $('#depositDetailList').val(JSON.stringify(introDepositIdData()))
        // 往来单位回复默认值且不可修改
        $('#contactsunitId').val(unitName).data('contactUnitId',unitId);
        $('.ContactUnitBox').hide()
    })

    //定金详情data
    function introDepositIdData(){
        var depositDetailList=new Array;
        var q=-1;
        $('#table_introSingle tbody tr').each(function(i,val){
            if($(this).find('.rb_check').prop('checked')==true){
                q++;
                depositDetailList[q]={};
                depositDetailList[q].depositDetailId=$(this).closest('tr').find('.rb_introDepositId').val()*1;//定金单ID
                depositDetailList[q].depositAmount=$(this).closest('tr').find('.rb_introTTD').val()*1;//定金金额
                depositDetailList[q].depositId=$(this).closest('tr').find('.introCode').val()*1;//定金主id
            }
        })
        return depositDetailList
    }
    //改变部门的时候重新画内容
    function clearDepositBills(){
        $('#table_introSingle').html('<thead><tr><td></td><td>零售定单编码</td><td>客户姓名</td><td>联系电话</td><td>商品名称</td>'+
            '<td>型号</td><td>颜色</td><td>定金</td><td>已核销金额</td><td>已退定金</td><td>定金结余</td><td>本次引入金额</td><td>定单数量</td>'+
            '<td>已核销数量</td><td>已退数量</td><td>数量结余</td><td>备注</td></tr></thead>'+
            '<tbody><tr><td><input class="rb_check" type="checkbox"><input class="introCode" type="hidden"></td>'+
            '<td class="rb_introOrderCode"></td><td class="rb_introName"></td>'+
            '<td class="rb_introTel"></td><td class="rb_introProName"></td>'+
            '<td class="rb_introModel"></td><td class="rb_introColor"></td>'+
            '<td class="rb_introDeposit"></td>'+
            '<td class="rb_introWriteOff"></td><td class="rb_introRetired"></td>'+
            '<td class="rb_introBalance"></td><td><input class="rb_introTTD" type="text"></td><td class="rb_introOrderNum"></td>'+
            '<td class="rb_introWriteOffNum"></td><td class="rb_introRetiredNum"></td>'+
            '<td class="rb_introNumBalance"></td><td class="rb_introRemark"></td></tr></tbody>');
    }


//************调入草稿单搜索框**********//
    $("#retailSearch").bind("input propertychange", function () {
        $("#counterRetailBillsTable").jqGrid('setGridParam', {
            datatype:'json',
            postData:{
                page:1,
                rows:10,
                accessSectionIds:$("#storeInput").data("sectionId"),
                keyWord:$("#retailSearch").val()
            }
        }).trigger("reloadGrid");
    });

// 收银台复制一单
    locationhref();

    function locationhref(){
        var id = $('#retailId').val();
        if(id == "" || id == null ){
            return
        }
        $.request({
            type:'POST',
            url:'/manager/inventory/retail/delivery/loadDraftOrder',
            dataType:'json',
            data:{"id": id},
            success:function(data){
                if(data.result==1){
                    var transDraftData=data.data.obj
                    var data=$("#storeInput").data("sectionId");
                    abledUseAccount(data);
                    fillData(transDraftData);
                    $('#postAmountSure,#otherAmountSure').click();
                    $("#retailBillsId").val('')//单据id
                    if(transDraftData.detailList.length>0){
                        $(".saleInput1").val(transDraftData.managerName).data("employeeId",transDraftData.managerId)//营业员
                    }
                    if(transDraftData.operatorList.length>0){
                        $(".carrSaleInput1").val(transDraftData.managerName).data("employeeId",transDraftData.managerId)//营业员
                    }
                    if(transDraftData.serviceList.length>0){
                        $(".addValueSaleInput1").val(transDraftData.managerName).data("employeeId",transDraftData.managerId)//营业员
                    }
                    if(transDraftData.couponList.length>0){
                        $(".thirdSaleInput1").val(transDraftData.managerName).data("employeeId",transDraftData.managerId)//营业员
                    }
                    if(transDraftData.installList.length>0){
                        $(".stagingSaleInput1").val(transDraftData.managerName).data("employeeId",transDraftData.managerId)//营业员
                    }

                }else{
                    $.zxsaas_plus.showalert('error',data.desc);
                }
            },
            error:function(){
                alert('请求失败！')
            }
        })

    }

})
