//销售单（19） ，销售换货单（20）出库串号匹配
function checkString(obj){
	if(obj==null||obj=='null'){
		return "";
	}else{
		return obj;
	}
}

$('.searchImei').bind('keyup', function(e) {
		var keyCodyflag=false; //是否按下enter
		if(e.keyCode==13&&$(this).val()!=''){
            keyCodyflag=true;
		}
		$('#imeiUl').html('');
		// checkInput.checkStrNum(this,20);
		if(isDraft==0){
			return;
		}
		//右匹配  最少输入5位数或以上
		if($("input[name='sectionId']").val() == ""){
			$('.searchImeiTip').css('display',"inline-block");
			return
		}else{
			$('.searchImeiTip').hide();
		}
		
		if($.trim($('.searchImei').val()).length > 4){
//		if($.trim($('.searchImei').val()) != "" && $("input[name='sectionId']").val() != ""){
			//查询串号库存
			$.ajax({
				url:'../IstockIm/listByModel',
				type : "post",
				dataType : 'json',
				data:{keyWord:$.trim($('.searchImei').val()),sectionId:$("input[name='sectionId']").val()},
				success:function(data){
					if(data.result != 1){$.MsgBox('错误提示',data.desc);return;};
					var ulHtml = '';
					var listArr;
					if(data.data.dataList.length != 0){
						for(var i=0;i<data.data.dataList.length;i++){
							if(data.data.dataList[i].goodsStatus!=1){
								 listArr='{'+
                                'imei:\''+data.data.dataList[i].imei+'\','+
                                'auxiliaryImei:\''+data.data.dataList[i].auxiliaryImei+'\','+
                                 'imeiId:\''+data.data.dataList[i].imeiId+'\','+
                                'stockNum:\''+data.data.dataList[i].stockNum+'\','+
                                'storageId:\''+data.data.dataList[i].storageId+'\','+
                                'storageName:\''+data.data.dataList[i].storageName+'\','+
                                'goodsId:\''+data.data.dataList[i].goodsId+'\','+
                                'goodsName:\''+data.data.dataList[i].goodsName+'\','+

                                'code:\''+data.data.dataList[i].code+'\','+
                                'categoryName:\''+checkString(data.data.dataList[i].categoryName)+'\','+
                                'brandName:\''+checkString(data.data.dataList[i].brandName)+'\','+
                                'models:\''+checkString(data.data.dataList[i].models)+'\','+
                                'color:\''+checkString(data.data.dataList[i].color)+'\','+

                                'taxRate:\''+data.data.dataList[i].taxRate+'\''+
                                '}';
							ulHtml += '<li onclick = "imeiUlLiClick('+listArr+')">'+data.data.dataList[i].imei+'</li>';


							}

						}

						if(ulHtml==''){
							$.zxsaas_plus.showalert('提示',$('.searchImei').val()+'串号下的所有商品已禁用');
						}
					}else{
						ulHtml += '<li>暂无数据</li>';
					}
					$('#imeiUl').html(ulHtml);


					$('.none-cx').width($('.wiRes').width());
					$('.none-cx').show();
                    //如果只有一条记录直接录入
                    if(data.data.dataList.length==1&&keyCodyflag==true){
                        imeiUlLiClick(eval('('+listArr+')'));
                        $('.searchImei')[0].select(); //设置选中，方便下次扫码清空
                    }
				}
			});
		}
 });


function imeiUlLiClick(obj){
	var queryModel = {goodsId:obj.goodsId,storageId:obj.storageId,taxRate:obj.taxRate};
	var imeiModel = {
        imeiId:obj.imeiId,
		imei:obj.imei,
		auxiliaryImei:obj.auxiliaryImei};
	obj.ifManageIMei = 1;
	obj.discountRate=100;
	$(".searchImei").focus();
	$('.none-cx').hide();
	
	var dataGridCallBack="";
	if(type==19){//销售单
		dataGridCallBack=dataGrid;
	}else if(type==20){//销售换货单
		dataGridCallBack=dataGrid2;
	}
	
	if(!dataGridCallBack.isExistRow(queryModel)){
		obj.salesOutstrorageImDraftList = JSON.stringify([imeiModel])
		obj.goodsNumber = 1;
		if(type==19){//销售单
            mergeTableData(obj,dataGrid);
			//dataGrid.addRowData(MyEiditGrid.getMaxRowid($("#dataGrid"))+1,obj);
		}else if(type==20){//销售换货单
            mergeTableData(obj,dataGrid2);
			//dataGrid2.addRowData(MyEiditGrid.getMaxRowid($("#dataGrid2"))+1,obj);
		}
		
	}else{
		var row = dataGridCallBack.getRowByModel(queryModel);
		var imeiList = JSON.parse(row.salesOutstrorageImDraftList);
		for ( var int = 0; int < imeiList.length; int++) {
			  if(imeiList[int].imei == imeiModel.imei){
				  $.MsgBox("消息提示","串号已经引入");
				  return ;
			  }
		}
		imeiList.push(imeiModel);
		$("#"+row.gridId).jqGrid('setCell', row.rowId ,"salesOutstrorageImDraftList" ,JSON.stringify(imeiList));
		$("#"+row.gridId).jqGrid('setCell', row.rowId ,"goodsNumber" ,(parseInt(row.goodsNumber) + 1));
	}
    dataGridCallBack.clearRowByPara({goodsId:''});
	summary();
	if(type==20){
        summary2()
	}
}

//合并表格数据
function mergeTableData(obj,jqGrid) {
    var appendSwitch=false;
    //汇总每一行
    var idsFist=jqGrid.$grid.getDataIDs();
    $.each(idsFist,function(i,i_value){
    	console.log("循环第"+i+"次");
        var i_currRow = jqGrid.$grid.jqGrid('getRowData', i_value);
        var i_goodsId = i_currRow.goodsId; //商品id
        var i_storageId = i_currRow.storageId; //仓库id
        var i_goodsNumber = i_currRow.goodsNumber; //仓库id
        var i_salesOutstrorageImDraftList = JSON.parse(i_currRow.salesOutstrorageImDraftList||'[]'); //仓库id
		if(obj.storageId==i_storageId && obj.goodsId == i_goodsId){
            	appendSwitch=true;
            	var flag=false;
            	var salesOutstrorageImDraftList = JSON.parse(obj.salesOutstrorageImDraftList)[0];
            	//检查有没有重复的录入
				for(var j=0;j<i_salesOutstrorageImDraftList.length;j++){
					var i_salesOutstrorageImDraftListItem=i_salesOutstrorageImDraftList[j];
                    i_salesOutstrorageImDraftListItem.auxiliaryImei = i_salesOutstrorageImDraftListItem.auxiliaryImei==null?"":i_salesOutstrorageImDraftListItem.auxiliaryImei;
					if(i_salesOutstrorageImDraftListItem.imei==salesOutstrorageImDraftList.imei && i_salesOutstrorageImDraftListItem.auxiliaryImei==salesOutstrorageImDraftList.auxiliaryImei ){
                        flag=true;
                        break;
					}
				}
				if(flag==false){
                    i_salesOutstrorageImDraftList.push(salesOutstrorageImDraftList)
                    jqGrid.$grid.jqGrid("setCell",i_value,"salesOutstrorageImDraftList",JSON.stringify(i_salesOutstrorageImDraftList));
                    jqGrid.$grid.jqGrid("setCell",i_value,"goodsNumber",Number(i_goodsNumber)+Number(obj.goodsNumber));
                    return false;
				}
		}
    });
    if(appendSwitch==false){
        jqGrid.addRowData(MyEiditGrid.getMaxRowid($("#"+jqGrid.gridId))+1,obj);
	}
}
