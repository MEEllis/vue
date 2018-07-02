$(function(){
	initDataGrid3();
	initDataGrid4();
	initDataGrid5();
	sumFootDataGrid3();
});
/*串号引入设置jgrid表格宽度*/
$(document).on("shown.bs.modal","#dataGrid4",function(){
	$("#dataGrid4").setGridWidth($(this).find(".jqGrid_wrap").width());
	$(this).find(".ui-jqgrid-bdiv").height($(this).find(".left").height()*0.8);
});
$(document).on("shown.bs.modal","#dataGrid5",function(){
	$("#dataGrid5").setGridWidth($(this).find(".jqGrid_wrap").width());
	$(this).find(".ui-jqgrid-bdiv").height($(this).find(".left").height()*0.8);
});
//初始化表格
function initDataGrid4(){
	var options = {
			TableName: "#dataGrid4", //显示表格名称。遵照css选择器书写
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['串号','辅助串号','现存量','备注','imeiId' ];
	var JqGridColModel= [ 
	                     {name : 'imei',index : 'imei',align:'left',sortable: false,hidden: false,editable:false,width:'180px'},
	                     {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false,width:'180px'},
	                     {name : 'stockNum',index : 'stockNum',align:'left',sortable: false,width:'80px',formatter:'integer',hidden: true},
	                     {name : 'remark',index : 'remark',align:'left',editable:true,sortable: false,width:'120px',hidden: true},
						 {name : 'imeiId',hidden: true},
	                   ];
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
                datatype : "local",
				jsonReader  : {
					root: "data.goodsImeiVoList",
					repeatitems: false
				},
				colNames:colNames,
	            colModel:JqGridColModel,
	            multiselect:true,//定义是否可以多选
	            multiselectWidth:30,
	            sortable:false,			            
	            rownumbers:true,
	            rowNum:100,
                rowTotal: 1000000,
                pager:"#dataGrid4GridPager",
	            width: "90%" ,
	            height:"300px",
				autowidth:true,
				rownumWidth:40,
                rowList : [100,200,500],
				shrinkToFit:true,
                footerrow:false,
                userDataOnFooter:true,
                viewrecords:true,
                loadComplete: function (data) {
                   $(options.TableName+'GridPager_left').remove()
                    $(options.TableName+'GridPager_center').attr('colspan',2)
                },
			})
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
	}
}

//初始化表格
function initDataGrid5(){
	var options = {
			TableName: "#dataGrid5", //显示表格名称。遵照css选择器书写
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var colNames = ['串号',  '辅助串号','现存量','备注','imeiId' ];
	var JqGridColModel= [ 
	                     {name : 'imei',index : 'imei',align:'left',sortable: false,hidden: false,editable:false,width:'180px'},
	                     {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false,width:'180px'},
	                     {name : 'stockNum',index : 'stockNum',align:'left',sortable: false,width:'80px',formatter:'integer',hidden: true},
	                     {name : 'remark',index : 'remark',align:'left',editable:true,sortable: false,hidden: true},
	                     {name : 'imeiId',hidden: true},
	                   ];
	loadtable();
	function loadtable(){
			$(options.TableName).jqGrid({
                datatype : "local",
				jsonReader  : {	
					root: "data.rows",
					repeatitems: false
						},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            multiselect:true,//定义是否可以多选
	            multiselectWidth:30,
                rowNum:100,
                rowTotal: 1000000,
                pager:"#dataGrid5GridPager",
	            width: "90%" ,
	            height:"300px",
				autowidth:true,
				rownumWidth:40,
                rowList : [100,200,500],
                shrinkToFit:true,
                footerrow:false,
                userDataOnFooter:true,
                viewrecords:true,
                loadComplete: function (data) {
                    $(options.TableName+'GridPager_left').remove()
                    $(options.TableName+'GridPager_center').attr('colspan',2)
                },
			})
			jQuery(options.TableName).jqGrid('setLabel',0, '序号');
	}
}

//移入按钮点击事件
function inBtClick(){
    AddImei('left')
}

function AddImei(key){
    var delTable ='dataGrid4'
    var addTable ='dataGrid5'
	if(key=='left'){
         delTable ='dataGrid4'
         addTable ='dataGrid5'
	}else{
        delTable ='dataGrid5'
        addTable ='dataGrid4'
	}
    var ids=$("#"+delTable).jqGrid('getGridParam','selarrrow');
    //获取表4选中行
    if(ids.length==0){
        return;
    }
    //是否全选
    var delTableDataList=[]
    var delTableImeiIdList=[]
    if($("#cb_"+delTable).attr("checked")){
        delTableDataList = $("#"+delTable).getGridParam().data

        for ( var i = 0; i < delTableDataList.length; i++) {
            var delTableDataItem =delTableDataList[i]
            delTableImeiIdList.push(delTableDataItem.imeiId.toString())
        }
    }else{
        for ( var i = 0; i < ids.length; i++) {
            var row =  $("#"+delTable).jqGrid('getRowData',  ids[i] );
            delTableDataList.push(row)
            delTableImeiIdList.push(row.imeiId)
        }
    }
    var  addTableExsitData = $("#"+addTable).getGridParam().data;
    //往表格5添加数据
    for ( var i = 0; i < delTableDataList.length; i++) {
        addTableExsitData.push(delTableDataList[i])
    }
    $("#"+addTable).jqGrid('clearGridData');
    $("#"+addTable).setGridParam({data:addTableExsitData}).trigger('reloadGrid');

    var delAllDataList=$("#"+delTable).getGridParam().data
    var shengYUData=[]
    //往表格4添加数据
    for ( var i = 0; i < delAllDataList.length; i++) {
        var delAllDataItem =delAllDataList[i]
        if($.inArray(delAllDataItem.imeiId.toString(),delTableImeiIdList)==-1){
            shengYUData.push(delAllDataItem)
        }
    }
    $("#"+delTable).jqGrid('clearGridData');
    $("#"+delTable).setGridParam({data:shengYUData}).trigger('reloadGrid');
    //获取表格记录数
    var rowIds = $("#dataGrid5").getGridParam().data;
    $("#havedInputNum").html(rowIds.length);
    $("#cb_"+addTable).attr("checked",false);
}

//移出按钮点击事件
function outBtClick(){
    AddImei('right')
}


//打开串号引入对话框
function openInputImeiModal(gridId,rowid){
	$("#dataGridRowId2").val(gridId+"|"+rowid);
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	if(gridId=="dataGrid33" && (currRow.storageId=="" || currRow.storageId==null || currRow.storageId==undefined)){
		currRow.storageId=currRow.id;
	}

	$("#goodsnameTitle2").html(currRow.goodsName);
	if(currRow.storageName==undefined){
		$("#storagenameTitle2").html(currRow.name);
	}else{
		$("#storagenameTitle2").html(currRow.storageName);
	}

	setDataGrid4(rowid);

	if($('#dataGrid2').jqGrid('getRowData',rowid).goodsNumber!="0" && $('#dataGrid2').jqGrid('getRowData',rowid).goodsNumber !== undefined){
		setDataGrid5();
	}else if($('#dataGrid').jqGrid('getRowData',rowid).goodsNumber!="0" && $('#dataGrid2').jqGrid('getRowData',rowid).goodsNumber == undefined){
		setDataGrid5();
	}else{
		$("#dataGrid5").jqGrid('clearGridData');
	}
	$('#inputStorageImeiModal').modal('show');
	setTimeout(function () {
        $("#dataGrid5").resize()
        $("#dataGrid4").resize()
    },150)
}

//去库存表查询串号
function setDataGrid4(id){
	$("#dataGrid4").jqGrid('clearGridData');
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	var storageId=currRow.storageId;
	if(gridId=="dataGrid33"){
		storageId=currRow.id;
	}
	//查询串号库存
	$.ajax({
			url: "/manager/inventory/common/getStockGoodsImeiVoList",
			type : "post",
			dataType : 'json',
			data:{
				storageId: storageId,
				goodsId: currRow.goodsId,
                sectionId: $('#sectionId').val()
			},
			success:function(data){
				if(data.result == 1){
					var vo = data.data.goodsImeiVoList;
					var addData =[]
					for(var i=0;i<vo.length;i++){
                        addData.push({
                            auxiliaryImei:$.trim(vo[i].auxiliaryImei),
                            imei:vo[i].imei,
                            imeiId:vo[i].imeiId,
                            remark:vo[i].remark
						})
					}
					if($('.rightMap img').attr('src')=="../images/status/statusRed.png"){
                        $("#dataGrid4").setGridParam({data: addData}).trigger('reloadGrid');
					}else{
                        var existArr=[];
                        var imList=[]
                        if(type==22){//委托出库单
                            currRow.salesOutstrorageImDraftList=currRow.salesOutstorExImDraftList;
                        }
                        if("" != currRow.salesOutstrorageImDraftList){
                            imList = JSON.parse(currRow.salesOutstrorageImDraftList);
                        }
						$.each(addData,function(i,item){
							var flag=true
                            for ( var int = 0; int < imList.length; int++) {
                                if(imList[int].imei == item.imei){
                                    flag=false
                                    break;
                                }
							}
							if(flag==true){
                                existArr.push(item)
							}

						});
                        $("#dataGrid4").setGridParam({data: existArr}).trigger('reloadGrid');
					}
				}else{
					$.MsgBox('出错提示',data.desc);
				}
			}
	}); 

}

function setDataGrid5(){
	//清空
	$("#dataGrid5").jqGrid('clearGridData');
		var gridId = $("#dataGridRowId2").val().split("|")[0] ;
		var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
		var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	if(type==22){//委托出库单
		currRow.salesOutstrorageImDraftList=currRow.salesOutstorExImDraftList;
	}
	
	if(""!= currRow.salesOutstrorageImDraftList){
		  var imList = JSON.parse(currRow.salesOutstrorageImDraftList);  
		  $("#havedInputNum").html(imList.length);
		  for(var i=0;i<imList.length;i++){
              delete imList[i].id
		  }
         $("#dataGrid5").setGridParam({data: imList}).trigger('reloadGrid');
	}else{
		$("#havedInputNum").html(0);
	}
	
}

function reloadDataGrid4(currRow){
	var queryModal={
        storageId: currRow.storageId,
        goodsId: currRow.goodsId,
        sectionId: $('#sectionId').val()
	};
    $("#dataGrid4").jqGrid('setGridParam',{
    	url:"/manager/inventory/common/getStockGoodsImeiVoList",
        datatype:'json',
        postData:queryModal //发送数据
    }).trigger("reloadGrid"); //重新载入

}

//点击保存引入串号事件
function saveInputImei(name){
	//校验串号重复
	var array=new Array();
	var jg5DataList=$("#dataGrid5").getGridParam().data;
    for(var i=0;i<jg5DataList.length;i++){
    	var jg5DataItme=jg5DataList[i]
        if($.trim(jg5DataItme.imei) != ""){
            array.push(jg5DataItme.imei);
        }
        if($.trim(jg5DataItme.auxiliaryImei) != ""){
            array.push(jg5DataItme.auxiliaryImei);
        }
	}

	var result=array.sort();
	for(var i=0;i<result.length;i++){
		if(result[i] == result[i+1]){
			$.zxsaas_plus.showalert("提示","表格中存在重复串号!");
			return;
		}
	}
	
	var gridId = $("#dataGridRowId2").val().split("|")[0] ;
	var rowid = parseInt($("#dataGridRowId2").val().split("|")[1]) ;
	var objs = getObjListFromGrid5();
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	$("#"+gridId).jqGrid('setCell', rowid ,"goodsNumber" ,objs.length);
	if(type==19){//销售单
		$("#"+gridId).jqGrid('setCell', rowid ,"salesOutstrorageImDraftList" ,JSON.stringify(objs));
	}else if(type==23){//委托退货单
		$("#"+gridId).jqGrid('setCell', rowid ,"salesInstorExImDraftList" ,JSON.stringify(objs));
	}else if(type==22){//委托出库单
		$("#"+gridId).jqGrid('setCell', rowid ,"salesOutstorExImDraftList" ,JSON.stringify(objs));
	}else if(type==21){//销售退货单
		$("#"+gridId).jqGrid('setCell', rowid ,"salesInstrorageImDraftList" ,JSON.stringify(objs));
	}else if(type==20){//销售换货单
		if(gridId=="dataGrid"){//换入表格
			$("#"+gridId).jqGrid('setCell', rowid ,"salesInstrorageImDraftList" ,JSON.stringify(objs));
		}
		if(gridId=="dataGrid2"){//换出表格
			$("#"+gridId).jqGrid('setCell', rowid ,"salesOutstrorageImDraftList" ,JSON.stringify(objs));
			$("#"+gridId).jqGrid('setCell', rowid ,"amount" ,objs.length*currRow.price);
		}
	}
	$('#inputStorageImeiModal').modal('hide');
	summary();
	if(name=="out"){
		summary2();	
	}
}

//获取串号引入对象数组
function getObjListFromGrid5(){
	var objList = [];
    var jg5DataList=$("#dataGrid5").getGridParam().data;
    var gridId = $("#dataGridRowId2").val().split("|")[0] ;
    for(var i=0;i<jg5DataList.length;i++){
        var jg5DataItme=jg5DataList[i]
        if(gridId!="dataGrid33"){
            delete jg5DataItme.stockNum;
        }
        objList.push(jg5DataItme);
    }
    return objList;
}


/********************************************串号录入开始**************************************************************/
//初始化表格
var dataGrid3 = null,inptid="";
function initDataGrid3(){
  $('#imeiInput1').bind('keypress',function(event){
      if(event.keyCode == "13"){
        var mainTxt =$(this).val().trim();
      	if(mainTxt != "" ){
      		if($.notEmpty(imeiLength) && imeiLength !=mainTxt.length){
      			$.zxsaas_plus.showalert("提示","主串号长度为:"+imeiLength+"位");
      			return;
      		}
      		var val=checkRepeatImei(mainTxt);
      		if(val.flag){
      			if($("#ifEnableAuxliaryImei").is(':checked')){
      				$("input[name='imeiInput2']").prop('disabled',true)
              	}else{
              		$("input[name='imeiInput2']").prop('disabled',false)
              	}
      			$.zxsaas_plus.showalert("提示","串号:"+mainTxt+"在表格中第"+(val.index+1)+"行已存在!");
      			return;
      		}
      		if(dataGridDetail.length>0){
      			for(var i=0;i<dataGridDetail.length;i++){
          			for(var j=0;j<dataGridDetail[i].length;j++){
          				if(mainTxt==dataGridDetail[i][j].imei||mainTxt==dataGridDetail[i][j].auxiliaryImei){
          					$.zxsaas_plus.showalert('验证提示','本单据表体第'+(i+1)+'行第'+(j+1)+'列已录入过此串号:'+mainTxt);
          	      			return;
          				}
          			}
          		}
      		}
      		inStorageImei(mainTxt,'mainImei',callBack)
      		function callBack(){
      		  //判断是否有辅助串号
              	if($("#ifEnableAuxliaryImei").is(':checked')){
              		$("#imeiInput2").focus();
              	}else{
              		appenRow3();
              	}	
      		}
           }
      }
  });
  $('#imeiInput2').bind('keypress',function(event){
      var mainTxt =$('#imeiInput1').val().trim();
      var nextTxt =$(this).val().trim();
      if(event.keyCode == "13")
      {
      	if(nextTxt != "" && mainTxt != ""){
      		if($.notEmpty(auxliaryImeiLength) && auxliaryImeiLength !=nextTxt.length){
      			$.zxsaas_plus.showalert("提示","辅助串号长度为:"+auxliaryImeiLength+"位");
      			return;
      		}
      		if(nextTxt==mainTxt){
      			$.zxsaas_plus.showalert("提示","主串号和辅助串号不能一致!");
      			return;
      		}
      		var val=checkRepeatImei(nextTxt);
      		if(val.flag){
      			$.zxsaas_plus.showalert("提示","辅助串号:"+nextTxt+"在表格中第"+(val.index+1)+"行已存在!");
      			return;
      		}
      		if(dataGridDetail.length>0){
      			for(var i=0;i<dataGridDetail.length;i++){
          			for(var j=0;j<dataGridDetail[i].length;j++){
          				if(nextTxt==dataGridDetail[i][j].imei||nextTxt==dataGridDetail[i][j].auxiliaryImei){
          					$.zxsaas_plus.showalert('验证提示','本单据表体第'+(i+1)+'行第'+(j+1)+'列已录入过此串号:'+nextTxt);
          	      			return;
          				}
          			}
          		}
      		}
      		if(mainTxt != ""){
      			if(dataGridDetail.length>0){
          			for(var i=0;i<dataGridDetail.length;i++){
              			for(var j=0;j<dataGridDetail[i].length;j++){
              				if(mainTxt==dataGridDetail[i][j].imei||mainTxt==dataGridDetail[i][j].auxiliaryImei){
              					$.zxsaas_plus.showalert('验证提示','本单据表体第'+(i+1)+'行第'+(j+1)+'列已录入过此串号:'+mainTxt);
              	      			return;
              				}
              			}
              		}
          		}
      		}
      		inStorageImei(nextTxt,'AuxiliaryImei',callBackyanzheng)
      		function callBackyanzheng(){
      			appenRow3();
              	$("#imeiInput1").focus();	
      		}
      		
      	}
      }
  });
		
	//配置
	var paras = {
	    gridId:'dataGrid3', 
	    colNames:['操作','主串号',  '辅助串号','成本','备注'],
	    colModel:
	    	[
           {name : 'operate',index : 'operate',align:'center',sortable: false,hidden: false,editable:false,width:80,formatter: formatterDeleteBtn}, 
           {name : 'imei',index : 'imei',align:'left',sortable: false,hidden: false,editable:false}, 
           {name : 'auxiliaryImei',index : 'auxiliaryImei',align:'left',sortable: false},
           {name : 'cost',index : 'cost',align:'center',sortable: false,formatter: 'number',editable:true},
           {name : 'remark',index : 'remark',align:'left',editable:true,sortable: false}
         ]
	};
	
	//回调函数
	var callBackList = {
	  onCellSelect:function(rowid,iCol,cellcontent,e){
		var currRow = $("#dataGrid3").jqGrid('getRowData', rowid);
		if(iCol==5){
			var cost=getCostPriceByImei(currRow.imei,currRow.auxiliaryImei);
			if(cost==null){
				$("#"+paras.gridId).jqGrid('setColProp','cost',{'editable':true});
			}else{
				$("#"+paras.gridId).jqGrid('setColProp','cost',{'editable':false});
			}
		}
	  },
	  afterEditCell:function(rowid,name,val,iRow,iCol){//开始编辑
      },
      afterSaveCell:function(rowid,name,val,iRow,iCol){//保存编辑
      },
      summary:function(rowid,name,val,iRow,iCol){//统计处理
    	  sumFootDataGrid3();
      },
      getGridDataList:function(rows){
    	//筛出不合格行
        	return $.map(rows,function(row){
        		delete row["op"];
	        	delete row["operate"];
  				return row;
        	});
      }
	};
	dataGrid3 = new MyEiditGrid(paras,callBackList);
}
//查询在库串号
function inStorageImei(Imei,imeiType,callBack){
	//后台查询数据
	$.request({
		url: '../inventory/common/validateImeiBeforeInStock',
		type : "POST",
		dataType : 'json',
		data:{"queryKey":Imei},
		success:function(data){
			var result = data.data;
			if(data.result != 1){
				if(imeiType=='mainImei'){
					$("input[name='imeiInput2']").prop('disabled',true)	
				}
				$.MsgBox('错误提示',data.desc);return
				}else{
					$("input[name='imeiInput2']").prop('disabled',false)
					callBack()
			};
		}
	}); 
}
//打开串号输入框
var imeiLength = null;
var auxliaryImeiLength = null;
var dataGridDetail=[]
function openImeiInputModal(gridId,rowid){
	var dataGridIds=$('#dataGrid').jqGrid('getDataIDs')
	var dataRowArry=[]
	if(dataGridIds!=''&&dataGridIds!=null&&dataGridIds!=undefined&&dataGridIds!=[]&&dataGridIds.length>0){
		var dataRow=[]
		for(var i=0;i<dataGridIds.length;i++){
			var dataGridRowData=$('#dataGrid').jqGrid('getRowData',dataGridIds[i])
			dataRow.push(dataGridRowData)
			console.log(dataRow)
		}
		if(dataRow.length>0){
			for(var j=0;j<dataRow.length;j++){
				if(dataRow[j].salesInstrorageImDraftList!=undefined){
					var salesData=dataRow[j].salesInstrorageImDraftList
				}else {
					var salesData=dataRow[j].salesInstorExImDraftList;
					} 
				if(salesData!=""&&salesData!=undefined){
					dataRowArry.push(JSON.parse(salesData))
				}else{
					dataRowArry.push(salesData)
				}
				
			}
		}
	}
	dataGridDetail=dataRowArry
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	$("#dataGridRowIdForImeiInput").val(gridId+"|"+rowid);
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	$("#goodsnameTitle").html(currRow.goodsName);
	clearOpenImeiInput(currRow);
	imeiLength=currRow.imeiLength;
	auxliaryImeiLength=currRow.auxliaryImeiLength;
	if(isDraft==1){//草稿
 	   $("#dataGrid3").setGridParam({cellEdit:true});
	 }else{
	   $("#dataGrid3").setGridParam({cellEdit:false});
	 }
	sumFootDataGrid3();
	$('#imeiInputModal').modal('show');
}

//追加一行数据
function appenRow3(){
	checkRepeatImei(null);
	var rowData={};
	rowData.imei=$('#imeiInput1').val().trim();
	rowData.auxiliaryImei=$('#imeiInput2').val().trim();
	var cost=getCostPriceByImei(rowData.imei,rowData.auxiliaryImei);
	rowData.cost=cost;
	$("#dataGrid3").jqGrid('addRowData',MyEiditGrid.getMaxRowid($("#dataGrid3"))+1,rowData, 'last' );
	$('#imeiInput1').val("");
	$('#imeiInput2').val("");
	$('#currInputNum').html($("#dataGrid3").getGridParam("reccount"));
}

//校验重复串号
function checkRepeatImei(imei){
	var model={"flag":false,"index":0};
	var array=dataGrid3.getGridDataList();
	 if(array.length>0){
		 $.each(array,function(i,value){
			 if(value.imei==imei || value.auxiliaryImei==imei){
				 model.flag=true;
				 model.index=i;
				 return model;
			 }
		 });
	 }
	 return model;
}

//清空串号输入框原始值
function clearOpenImeiInput(currRow){
	jQuery("#dataGrid3").setGridParam().hideCol("op").trigger("reloadGrid")
	$("#dataGrid3").jqGrid('clearGridData');
	$("#imeiInput1").val("");//清空输入框的值
	$("#imeiInput2").val("");
	if(currRow.ifEnableAuxliaryImei=="1"){
		$("#ifEnableAuxliaryImei").attr("checked",'true');  
		$(".auxliaryImeiGroup").show(); 
	}else{
		$("#ifEnableAuxliaryImei").removeAttr("checked"); 
		$(".auxliaryImeiGroup").hide();  
	}
	$("#currInputNum").html(0);
	$("#dataGrid3").setGridHeight(300);
	$("#dataGrid3").setGridWidth(565);
	$("#dataGrid3").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	
	setLastImeiData(currRow);
}

//设置上一次串号值
function setLastImeiData(currRow){
	var imeiList="";
	if(type==23){//委托退货
		if(currRow.salesInstorExImDraftList==""){
			return;
		}
		imeiList=JSON.parse(currRow.salesInstorExImDraftList);
	}
	
	if(type==21 || type==20){//销售退货,销售换货（换入信息 ）
		if(currRow.salesInstrorageImDraftList==""){
			return;
		}
		imeiList=JSON.parse(currRow.salesInstrorageImDraftList);
	}
	
	
	if(imeiList.length>0){
		$.each(imeiList,function(i,value){
			$("#dataGrid3").jqGrid('addRowData', i+1,value, 'last' );
		});
	}
	$("#currInputNum").html(imeiList.length);
	
	//正式单不允许修改
	if(isDraft=="0"){
		$("#dataGrid3").setGridParam().hideCol("operate");
		$("#dataGrid3").jqGrid('setColProp','remark',{'editable':false});
		$("#imeiInput1,#imeiInput2").attr("disabled", true);
	}else{
		$("#dataGrid3").setGridParam().showCol("operate");
		$("#dataGrid3").jqGrid('setColProp','remark',{'editable':true});
		$("#imeiInput1,#imeiInput2").removeAttr("disabled");
	}

}

function formatterDeleteBtn(cellvalue, options, rowObjec){
	return '<a class="btn" id="'+options.gid+','+options.rowId+
    '" onclick="javascript: dustbinBtnClick(\''+options.gid+'\',\''+options.rowId+'\');"><i class="glyphicon glyphicon-trash"></i></a>';
}

function dustbinBtnClick(gridId,rowId){
	$.zxsaas_plus.showconfirm("提示","确定要删除此行？",function(){
		$("#"+gridId).jqGrid('delRowData', rowId);
		$("#currInputNum").html(Number($("#currInputNum").html())-1);
		sumFootDataGrid3();
	},function(){
		
	});
}

//串号录入模态框保存按钮单击事件
function saveImeiInput(){
	try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
	var rowid = parseInt($("#dataGridRowIdForImeiInput").val().split("|")[1]) ;
	var gridId = $("#dataGridRowIdForImeiInput").val().split("|")[0] ;
	var objs =dataGrid3.getGridDataList();
	var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
	if(type=="20" || type=="21"){//销售换货单,销售退货
		$("#"+gridId).jqGrid('setCell', rowid ,"salesInstrorageImDraftList" ,JSON.stringify(objs));
	}else if(type=="23"){//委托退货单
		$("#"+gridId).jqGrid('setCell', rowid ,"salesInstorExImDraftList" ,JSON.stringify(objs));
	}
	$("#"+gridId).jqGrid('setCell', rowid ,"amount" ,objs.length*currRow.price);
	$("#"+gridId).jqGrid('setCell', rowid ,"goodsNumber" ,objs.length);
	$("#"+gridId).jqGrid('setCell', rowid ,"costPrice" ,dataGrid3.$grid.getCol('cost', false, 'sum'));
	summary();
	if(type=="20"){
		summary2();
	}
	$('#imeiInputModal').modal('hide');
	
}


//获取现存量
function getCostPriceByImei(imei,auxiliaryImei){
	var cost=null;
	$.ajax({
		url:"../salesCommon/getCostPriceByImei",
		type : 'GET',  
		dataType: "json",
		async:false,
		data:{"imei":imei,"auxiliaryImei":auxiliaryImei},
		contentType :'application/json', 
		success:function(data){
		  if(data.result==1){
			  cost=data.data.cost;
		  }
	    }
	});
	return cost;
}

function sumFootDataGrid3(){
	var sumCost = dataGrid3.$grid.getCol('cost', false, 'sum'); 
	dataGrid3.$grid.footerData("set",{imei:"合计",cost:sumCost});
}



var imeiInputObj = null;//串号录入（对象）
function openImeiInputModalEllis(gridId, rowid) {
    try {
        MyEiditGrid.currEditDataGrid.unAllEdit();
    }
    catch (e) {
    }
    var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
    var imeiList = [];
    var currAuxliaryImeiLength = '';
    //获取已录入的串号
    if ($.trim(currRow.salesInstrorageImDraftList) != "") {
        imeiList = JSON.parse(currRow.salesInstrorageImDraftList);
    }
    if (currRow.ifEnableAuxliaryImei == "1") {
        currAuxliaryImeiLength = currRow.auxliaryImeiLength;//辅助串号长度
    }
    if(imeiInputObj==null){
        imeiInputObj = new comImeiInputModal();
	}
    imeiInputObj.setOption({
        colModel:1,
        imeiList: imeiList,
        goodsName: currRow.goodsName,
        goodsID: currRow.goodsId,
        currImeiLength: currRow.imeiLength.trim(), // 默认当前的串号长度
        currAuxliaryImeiLength: currAuxliaryImeiLength.trim(),   // 默认当前的辅助串号长度
        isEnableAuxliaryImei: currRow.ifEnableAuxliaryImei == "1" ? true : false,   // true:辅助串号， false :没有辅助串号
        isEdit: !$("#slideThree").is(':checked'),
        appenRowCallback: appenRowCallback,
        saveImeiInputCallback: saveImeiInputCallback,
        exportImeiInputCallback: exportImeiInputCallback
    });
    imeiInputObj.reLoadDom();
    imeiInputObj.showModal();
    $("#dataGridRowIdForImeiInput").val(gridId+"|"+rowid);
}

//获取表格详细数据
function getImeiList() {
    var dataGridIds=$('#dataGrid').jqGrid('getDataIDs')
    var dataRowArry=[]
    if(dataGridIds!=''&&dataGridIds!=null&&dataGridIds!=undefined&&dataGridIds!=[]&&dataGridIds.length>0){
        var dataRow=[]
        for(var i=0;i<dataGridIds.length;i++){
            var dataGridRowData=$('#dataGrid').jqGrid('getRowData',dataGridIds[i])
            dataRow.push(dataGridRowData)
        }
        if(dataRow.length>0){
            for(var j=0;j<dataRow.length;j++){
                if(dataRow[j].salesInstrorageImDraftList!=undefined){
                    var salesData=dataRow[j].salesInstrorageImDraftList
                }else {
                    var salesData=dataRow[j].salesInstorExImDraftList;
                }
                if(salesData!=""&&salesData!=undefined){
                    dataRowArry.push(JSON.parse(salesData))
                }else{
                    dataRowArry.push(salesData)
                }

            }
        }
    }
    return dataRowArry;
}
//串号录入: 追加一行
function appenRowCallback(imei1, imei2) {
    //由于删除是 实时的，这里必须实时获取表格数据
    var imeiList=getImeiList();
    for (var i = 0; i < imeiList.length; i++) {
        for (var j = 0; j < imeiList[i].length; j++) {
            var item=imeiList[i][j];
            if(imei1!='' && (imei1 == item.imei || imei1 == item.auxiliaryImei) ){
                var desc= '本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入过此串号:' + imei1;
                $.zxsaas_plus.showalert('warning',desc);
                return false;
            }
            if(imei2!='' && (imei2 == item.imei || imei2 == item.auxiliaryImei) ){
                var desc= '本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入过此串号:' + imei2;
                $.zxsaas_plus.showalert('warning',desc);
                return false;
            }
        }
    }
    return true;
}
//串号录入: 点击 确定(这里是拷贝之前的代码)
function saveImeiInputCallback(objs) {
    try {MyEiditGrid.currEditDataGrid.unAllEdit();} catch (e) {}
    var rowid = parseInt($("#dataGridRowIdForImeiInput").val().split("|")[1]) ;
    var gridId = $("#dataGridRowIdForImeiInput").val().split("|")[0] ;
    var currRow = $("#"+gridId).jqGrid('getRowData', rowid);
    if(type=="20" || type=="21"){//销售换货单,销售退货
        $("#"+gridId).jqGrid('setCell', rowid ,"salesInstrorageImDraftList" ,JSON.stringify(objs));
    }else if(type=="23"){//委托退货单
        $("#"+gridId).jqGrid('setCell', rowid ,"salesInstorExImDraftList" ,JSON.stringify(objs));
    }
    $("#"+gridId).jqGrid('setCell', rowid ,"amount" ,objs.length*currRow.price);
    $("#"+gridId).jqGrid('setCell', rowid ,"goodsNumber" ,objs.length);
    $("#"+gridId).jqGrid('setCell', rowid ,"costPrice" ,imeiInputObj.option.dataGrid.$grid.getCol('cost', false, 'sum'));
    summary();
    if(type=="20"){
        summary2();
    }
}
//串号录入: 导入
function exportImeiInputCallback(exportArr) {
    var reLuru = '';
    var reLuruArr = [];
    var result = -1;
    //判断是否是引入的，如果是需要判断不能超过未引入量
    var imeiList=getImeiList()
    if (imeiList != [] && imeiList.length > 0 && result == -1) {
        for (var i = 0; i < imeiList.length; i++) {
            for (var j = 0; j < imeiList[i].length; j++) {
                for (var k = 0; k < exportArr.length; k++) {
                    var item = exportArr[k];
                    var toval = item.trim();
                    var tovalArr = toval.split(',');
                    var flag = 1;
                    for (var m = 0; m < tovalArr.length; m++) {
                        var tovalItem = tovalArr[m];
                        if ($.trim(imeiList[i][j].imei).toUpperCase() == tovalItem || $.trim(imeiList[i][j].auxiliaryImei).toUpperCase() == tovalItem) {
                            flag = 0;
                            break;
                        }
                    }
                    if (flag == 0) {
                        reLuru += '串号:[' + toval + ']在本单据表体第' + (i + 1) + '行第' + (j + 1) + '列已录入!\n';
                        result = 0;
                        reLuruArr.push(toval);
                    }
                }
            }
        }
    }
    return {
        result: result,
        reLuru: reLuru,
        reLuruArr: reLuruArr,
    };
}