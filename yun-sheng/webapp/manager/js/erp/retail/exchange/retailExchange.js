var isView=false;//单据状态，true为查询，false为操作
var collectionDetails=null;//收款明细
var gGridId='';
var gGridRowId='';
var treeCodeId='';
var treeRefId=-1;
var gGridRowRefId='';
var globalServiceRow;
//校验时间
$(document).on('blur','#datetimepickerStart1,#datetimepickerEnd1',function(e){
	if(!checkT.checkTime()){  
	    $.zxsaas_plus.showalert("提示","截止日期必须晚于生效日期！");
		$(this).val('');
	    return;  
	}  
});
var tableArr = [],//表格数据
	lastrow,
	lastcell;
var thisRuku=null;
$(document).on('click','.saveMoney',function(){
	var num=$('.moneyRk').val();
	$("#jqGrid_SubjectBalance").jqGrid("setCell",thisRuku,"cost",num);
});
$('#pos').focus(function () {
    $("#myModal_pos").modal('show');
});
//促销券
$('#coupons').focus(function () {
    $("#myModal_coupons").modal('show');
});
/**
 * 时间控件初始化
 * @param urlData
 * @return
 */
$("#datetimepickerStart").datetimepicker({
  lang:"ch",           //语言选择中文
  format:"Y-m-d",      //格式化日期
  timepicker:false,    //关闭时间选项
  todayButton:false    //关闭选择今天按钮
});
/**
 * 换出的树初始化
 */
function treeRefInit(){
	var setting = {
	    data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: null
			}
		},
		callback: {
			onClick:function(e,treeId,data){
				treeRefId=data.id;
				$("#jqGrid_goodsRef").jqGrid('setGridParam',{  
			        datatype:'json',
			        url:basePath+'/retail/exchange/searchStockGoodsVo',
			        postData:{
						queryKey:$('#goodsRefFilter').val(),
						goodsCategoryId:treeRefId,
						sectionId:$('#sectionId').val()
					}  
			    }).trigger("reloadGrid"); //重新载入  
				}
			},
		view: {
			showIcon: false
		}
	};
	$.request({
	 	url:basePath+'/retail/exchange/findGoodsclassTree',
	 	type:'get',
	 	dataType:'json',
	 	success:function(data){
	 	  $.fn.zTree.init($('#goodsRefTree'), setting, data);
	       var zTree = $.fn.zTree.getZTreeObj('goodsRefTree');
	       zTree.expandAll(true);//展开全部节点
		}
	})
};
/**
 * 商品名称触发
 */
$(document).on('click','.goodsOutName',function(){
	$('#goodsRef').modal('show');
	gGridRowRefId=$(this).data('rid');
});
function goodsRefInit(){
	$('#jqGrid_goodsRef').jqGrid({
		url:basePath+"/retail/exchange/searchStockGoodsVo",
		mtype:"post",
		postData:{
			queryKey:$('#goodsRefFilter').val(),
			goodsCategoryId:treeRefId,
			sectionId:$('#sectionId').val(),
		},
		datatype: "json",
		jsonReader  : {	
			root:"data.stockGoodsVoList",
			repeatitems: false,
			id:'0'
		},
		colNames:['商品编码','商品名称','型号','颜色','零售价','仓库','现存量','串号','串号ID','仓库id','库存id','商品id','是否串号管理'],          
		colModel:[
			{name:'code',index:'code', width:100,align:'center',sorttype:"string"},
			{name:'name',index:'name', width:100,align:'center', sorttype:'string'},
			{name:'models',index:'models', width:100,align:'center', sorttype:'string'},
			{name:'color',index:'color', width:60,align:'center', sorttype:'string'},
			{name:'retailPrice',index:'retailPrice', width:100,align:'center', sorttype:'string'},
			{name:'storageName',index:'storageName', width:100,align:'center', sorttype:'string'},
			{name:'stockCount',index:'stockCount', width:60,align:'center', sorttype:'string'},
			{name:'imei',index:'imei', width:100,align:'center', sorttype:'string',editable:true,edittype:'select'},
			{name:'imeiId',index:'imeiId', hidden:true},
			{name:'storageId',index:'storageId', width:100,align:'center', sorttype:'string',hidden:true},
			{name:'stockNumId',index:'stockNumId', width:100,align:'center', sorttype:'string',hidden:true},
			{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true},
			{name:'ifManageImei',index:'ifManageImei', width:100,align:'center', sorttype:'string',hidden:true},
		],
		sortable:false,			            
		rownumbers:true,
		viewrecords: true,	
		autowidth:true,
		cellEdit:true,
		cellsubmit: 'clientArray',//单元格保存内容的位置		
        editurl: 'clientArray',
		rowNum: '-1',
        height:$(window).height()*0.4,
        prmNames:{
		   page:null,    // 表示请求页码的参数名称  
		   rows:null,    // 表示请求行数的参数名称  
		   sort: null, // 表示用于排序的列名的参数名称  
		   order: null, // 表示采用的排序方式的参数名称  
		   search:null, // 表示是否是搜索请求的参数名称  
		   nd:null, // 表示已经发送请求的次数的参数名称  
		   id:null // 表示当在编辑数据模块中发送数据时，使用的id的名称 					
		},
		formatCell:function(rowid, cellname, value, iRow, iCol){
			var param=$('#jqGrid_goodsRef').getRowData(rowid);
			$('#jqGrid_goodsRef').setColProp('imei',{editoptions:{
				dataUrl:basePath+'/retail/exchange/loadStockGoodsImeiVoList?goodsId='+param.id+'&storageId='+param.storageId+'&stockNumId='+param.stockNumId,
				buildSelect:function(data){
					var data=JSON.parse(data);
					var str='';
					var list=data.data.imeiVoList;
					str+='<select class="form-control">';
					$.each(list,function(index,item){
						str+='<option  value='+item.imeiId+' >'+item.imei+'</option>';
					})
			  		str+='</select>';
					return str;
				}
			}})	
		},
		afterSaveCell:function(rowid, cellname, value, iRow, iCol){
			$('#jqGrid_goodsRef').jqGrid("setCell",rowid,"imeiId",value);//改变单元格的值
		},
        loadComplete:function(){
						
		},
		onCellSelect:function(rowid,iCol,cellcontent,e){
			var data=$('#jqGrid_goodsRef').getRowData(rowid);
			if(iCol==8){
				if(data.ifManageImei==0){
					$.zxsaas_plus.showalert('提示','该商品为非串号管理');
					$('#jqGrid_goodsRef').setColProp('imei',{editable:false})
				}else{
					$('#jqGrid_goodsRef').setColProp('imei',{editable:true})
				}
			}
		},
		ondblClickRow:function(rowid,iRow,iCol,e){
			$(this).saveCell(iRow,iCol)
			var data=$(this).getRowData(rowid);
			var imeiListTemp=$("#jqGrid_swapOut").getCol('imeiId');
			var goodIdListTemp=$("#jqGrid_swapOut").getCol('id');
			var imeiList=imeiListTemp.filter_(function(item,index){
				return item!='';
			})
			var goodIdList=goodIdListTemp.filter_(function(item,index){
				return item!='';
			})
//			console.log(data.imeiId)
			if((!data.imeiId)&&data.ifManageImei==1){
				$.zxsaas_plus.showalert("提示","请选中串号！！！");
			}else{
				$('#jqGrid_swapOut').jqGrid('saveCell',swapOutRow,6);
				if(imeiList.length!=0&&imeiList.indexOf(data.imeiId)!=-1){
					$.zxsaas_plus.showalert('提示','已选中该串号！！！')
					return;
				}
				if(data.imeiId==''&&goodIdList.indexOf(data.id)!=-1&&goodIdList.length!=0){
					$.zxsaas_plus.showalert('提示','已选中该商品！！！')
					return;
				}
				for(var k in data){
					$('#jqGrid_swapOut').setCell(gGridRowRefId,k,data[k]);
				}
				$('#jqGrid_swapOut').jqGrid('setCell',gGridRowRefId,'goodsNum',1);
				$('#goodsRef').modal('hide');
			}
		}
	})
}
/**
 * 树的初始化
 * @return
 */
 function treeInit(){
	 var setting = {
        data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "pid",
				rootPId: null
			}
		},
		callback: {
			onClick:function(e,treeId,data){
				treeCodeId=data.id;
				$("#jqGrid_goodsMsgAdd").jqGrid('setGridParam',{  
			        datatype:'json',  
			        postData:{
					goodsName:$('#goodsNameFilter').val(),
					goodsCategoryId:treeCodeId
				},
			        page:1  
			    }).trigger("reloadGrid"); //重新载入  
			}
		},
		view: {
			showIcon: false
		}
	}; 
    $.request({
    	url:basePath+'/retail/exchange/findGoodsclassTree',
    	type:'get',
    	dataType:'json',
    	success:function(data){
		  $.fn.zTree.init($('#goodsDataTree'), setting, data);
		  var zTree = $.fn.zTree.getZTreeObj('goodsDataTree');
		  zTree.expandAll(true);//展开全部节点
	    }
    })
 }
 /**
  * 商品名称的过滤
  */
$('#goodsNameFilter').keyup(function(e){
	if(e.keyCode==13){
		$("#jqGrid_goodsMsgAdd").jqGrid('setGridParam',{  
		datatype:'json',  
		postData:{
		goodsName:$('#goodsNameFilter').val(),
			goodsCategoryId:treeCodeId
		},
	        page:1  
	    }).trigger("reloadGrid"); //重新载入  
	 }
})
 /**
  * 商品名称触发
  */
$(document).on('click','.goodsName',function(){
	gGridId='#'+$(this).data('gid');
	gGridRowId=$(this).data('rid');
	$('#goodsChoose').modal('show');
	$("#jqGrid_goodsMsgAdd").trigger("reloadGrid");//重载表格
	console.log('表id'+gGridId+'行Id'+gGridRowId)
})
 /**
  * 商品名称的表格
  * @return
  */ 
 function modalRightGrid(){
	 $.jgrid.defaults.width = 1280;
     $.jgrid.defaults.responsive = true;
	 $.jgrid.defaults.styleUI = 'Bootstrap';
	 $('#jqGrid_goodsMsgAdd').jqGrid({
	 	url:basePath+'/retail/exchange/selectGoodsDetail',
		mtype:"post",
		datatype: "json",
		jsonReader:{
			root:"data.rows",
			page: "data.page",
	        total: "data.total",
	        records: "data.records",
			repeatitems: false
		},
		colNames:['商品编码','商品名称','商品类别','商品品牌','商品型号','商品颜色','网络制式','是否管理串号'],          
		colModel:[
			{name:'goodsCode',index:'goodsCode', width:100,align:'center',sorttype:"string"},
			{name:'goodsName',index:'goodsName', width:100,align:'center', sorttype:'string'},
			{name:'goodsClassName',index:'goodsClassName', width:100,align:'center', sorttype:'string'},
			{name:'goodsBrandName',index:'goodsBrandName', width:100,align:'center', sorttype:'string'},
			{name:'goodsModel',index:'goodsModel', width:100,align:'center', sorttype:'string'},
			{name:'goodsColorName',index:'goodsColorName', width:100,align:'center', sorttype:'string'},
			{name:'networkStandard',index:'networkStandard', width:100,align:'center', sorttype:'string'},
			{name:'ifManageIMei',index:'ifManageIMei', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"1:√;0:"}}
		],
		sortable:false,			            
		rownumbers:true,
		viewrecords: true,		
		rowNum: 10,
        rowList: [20, 25, 40],
        pager:'#gridpager_goods',
        width:'100%',
        height:'100%',
        loadComplete:function(){
			
		},
		ondblClickRow:function(id){
			var goodsId=$('#jqGrid_goodsMsgAdd').getRowData(id);
			var goodsMesListTemp=$('#jqGrid_SubjectBalance').getCol('goodsId');
			var goodsMesList=goodsMesListTemp.filter_(function(item,index){
				return item!='';
			})
			$.request({
				url:basePath+'/retail/exchange/loadRetailGoodsVo',
			    type:'post',
				dataType:'json',
				data:{goodsId:id},
			    success:function(data){
					if(goodsMesList.indexOf(data.data.goodsVo.id.toString())!=-1){
						$.zxsaas_plus.showalert('提示','请勿选择相同商品！');
						return;
					}
//					$(gGridId).setColProp('installFlag',{formatoptions:{disabled:true}});//改变单元格属性
//					$(gGridId).trigger("reloadGrid");
					$(gGridId).jqGrid('saveCell',lastrow,5);
					$(gGridId).jqGrid('setCell',gGridRowId,'name',data.data.goodsVo.name);
					$(gGridId).jqGrid('setCell',gGridRowId,'models',data.data.goodsVo.models);
					$(gGridId).jqGrid('setCell',gGridRowId,'goodsId',data.data.goodsVo.id);
					$(gGridId).jqGrid('setCell',gGridRowId,'color',data.data.goodsVo.color);
					$(gGridId).jqGrid('setCell',gGridRowId,'ifManageImei',data.data.goodsVo.ifManageImei);
					if(data.data.goodsVo.ifManageImei){
						$(gGridId).jqGrid('setCell',gGridRowId,'goodsNum','1');
						$(gGridId).jqGrid('setCell',gGridRowId,'oldAmount',data.data.goodsVo.retailPrice);
					}
					$(gGridId).jqGrid('setCell',gGridRowId,'oldPrice',data.data.goodsVo.retailPrice);
					
//					$(gGridId).trigger("reloadGrid");
//					$(gGridId).setColProp('installFlag',{formatoptions:{disabled:true}});//改变单元格属性
//					$('input[type=checkbox]').prop('disabled',true);
				    $('#goodsChoose').modal('hide');
				}
			})
		}
	 })
 }
//var lastrow = ""; 
//var lastcell = "";
var mainRowId=null;
$(document).on('focusout','#jqGrid_SubjectBalance input',function(){
//	$("#jqGrid_SubjectBalance").jqGrid("saveCell",lastrow,lastcell);
	if(lastcell==11){
		if($.trim($(this).val())==''||$.trim($(this).val())==null){
			$("#jqGrid_SubjectBalance").jqGrid("setCell",mainRowId,"imeiId",' ');
			return false;
		}else{
			var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData",mainRowId);//根据行ID得到行数据
			$.request({
				url:basePath+'/retail/exchange/validateImei',
			    type:'post',
				dataType:'json',
				data:{
					goodsId:rowData['goodsId'],
					inputImei:$.trim($(this).val())
				},
			    success:function(data){
					if(data.result==1){
						var imeiId=data.data.imeiVo.imeiId;
						$("#jqGrid_SubjectBalance").jqGrid("setCell",mainRowId,"imeiId",imeiId);//改变单元格的值
					}else{
						alert(data.desc);
						$("#jqGrid_SubjectBalance").jqGrid("setCell",mainRowId,"imei",0);//改变单元格的值
					}
				},
				error:function(){
					alert('请求失败')
				}
			})
		}
	}
})
//$(document).on('click','#jqGrid_SubjectBalance input[type=checkbox]',function(){
//	if($(this).prop('checked')==true){
//		var selectID=$(this).closest('tr').attr('id');
//		$("#jqGrid_SubjectBalance").jqGrid("setCell",selectID,"goodsNum",' ');//改变单元格的值
//		$("#jqGrid_SubjectBalance").jqGrid("setCell",selectID,"oldAmount",' ');//改变单元格的值
//		$("#jqGrid_SubjectBalance").jqGrid("setCell",selectID,"amount",' ');//改变单元格的值
//	}
//})
function loadmodal(){
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;                             
	$.jgrid.defaults.styleUI = 'Bootstrap';
	$('#jqGrid_SubjectBalance').jqGrid({
		url:'',
		mtype:"post",
		datatype: "local",
		jsonReader  : {	
			root: "rows",
			repeatitems: false,
			id:'0'
		},
		colNames:['操作','ID','赠品','是否原单引入','最大数量','入库仓库','入库ID','商品名称','型号','颜色','串号','串号ID','数量','原单单价','原单金额','第三方券','退款金额','是否分期','是否合约机','运营商业务','备注','原单据号','入库成本','gId','sttrs','是否串号管理','第三方券集合','原零售ID','retailDetailId','retailMainId'],          
        colModel:[
			{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete,sortable:false},
			{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
			{name:'giftFlag',index:'giftFlag', width:80,align:'center', sorttype:'string',formatter:'checkbox',formatoptions:{disabled:true},editable:true,edittype:'checkbox',sortable:false,editoptions:{value:'1:0'}},
//			{name:'giftFlag',index:'giftFlag', width:80,align:'center', sorttype:'string',formatter:function(cellvalue,options,rowObject){
//            	return '<input class="check1" type="checkbox">'
//            },formatoptions:{disabled:false},editable:true,edittype:'checkbox',sortable:false,editoptions:{value:'1:0'}},
			{name:'ifImport',index:'ifImport',width:80,align:'center',hidden:true},
			{name:'maxNum',index:'maxNum',width:80,align:'center',hidden:true},
			{name:'storageName',index:'storageName', width:200,align:'center', sortable:false,editable: true,edittype:'select'},
			{name:'storageId',index:'storageId', width:200,align:'center', sortable:false,hidden:true},
			{name:'name',index:'name', width:200,align:'center', editable:true,edittype:'custom',editoptions:{
				'custom_element':function(value,options){
				var jqId=$(this).attr('id');
				return '<input type="text" class="form-control" style="width:96%;" readonly="readonly" value="' + value +'" /><span style="float:right;margin-top:-27px;margin-right:20px;" class="goodsName glyphicon glyphicon-plus" data-gid="'+jqId+'" data-rId="' + options.rowId +'"></span>';
			    },
			    'custom_value':function(value){
			    	return value.val();
			    }
			},sortable:false},
			{name:'models',index:'models', sorttype:'integer', width:100,align:'center',sortable:false},
			{name:'color',index:'color', sorttype:'integer', width:100,align:'center',sortable:false},
			{name:'imei',index:'imei', sorttype:'integer', width:100,align:'center',sortable:false},
			{name:'imeiId',index:'imeiId', hidden:true},
			{name:'goodsNum',index:'goodsNum', width:100,align:'center',editable:true,sortable:false,formatter:"integer",editoptions:{
				dataEvents:[{
					type:"blur",
					fn:function(e){
						var rex=/^[1-9]*$/;
						var rId=$(this).parents('tr').attr('id');
						var data=$('#jqGrid_SubjectBalance').getRowData(rId);
						if(data.ifImport*1==1&&$(this).val()*1>data.maxNum*1){
							$.zxsaas_plus.showalert("提示","请输入不大于出货量的数字！");
							$(this).val(data.maxNum);
							return;
						}
						if(rex.test($(this).val())){
							$(this).parent().next().next().html(($(this).val().replace(/\,/g,'') * $(this).parent().next().html().replace(/\,/g,'')).toFixed(2))
							totalAll.totalCalc();
						}else{
							$.zxsaas_plus.showalert("提示","请输入合法数字！");
							$(this).val('');
							$(this).parent().next().html('');
						}
					}
				}]
			}},
			{name:'oldPrice',index:'oldPrice', width:100,align:'center',  sorttype:'float',formatter:"number",editoptions:{
				dataEvents:[{
					type:"blur",
					fn:function(e){
						var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
						if(rex.test($(this).val())){
							$(this).parent().next().html(($(this).val().replace(/\,/g,'') * $(this).parent().prev().html().replace(/\,/g,'')).toFixed(2))
							totalAll.totalCalc();
						}else{
							$.zxsaas_plus.showalert("提示","请输入合法数字！");
							$(this).val('');
							$(this).parent().next().html('');
						}
					}
				}]
			},sortable:false},
			{name:'oldAmount',index:'oldAmount', width:100,align:'center',  sorttype:'float',formatter:"number",sortable:false,editoptions:{
				dataEvents:[{
					type:'blur',
					fn:function(e){
						var reg=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
						if(reg.test($(this).val())){
							$(this).parent().prev().html(($(this).val().replace(/\,/g,'') / $(this).parent().prev().prev().html().replace(/\,/g,'')).toFixed(2))
							totalAll.totalCalc();
						}else{
							$.zxsaas_plus.showalert("提示","请输入合法数字！");
							$(this).val('');
						}
					}
				}]
			}},
			{name:'thridTicketTotal',index:'thridTicketTotal', width:100,align:'center',sorttype:'float',formatter:thirdTicket,sortable:false},
			{name:'amount',index:'amount', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,sortable:false,editoptions:{
				dataEvents:[{
					type:'blur',
					fn:function(e){
						var reg=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
						
						var money = $(this).parent().prev().prev().html().replace(/\,/g,'') * 1;
						if(reg.test($(this).val())){
							
							$('#jqGrid_SubjectBalance').jqGrid('saveCell',lastrow,lastcell);
							var MoneyTotal=$('#jqGrid_SubjectBalance').getCol('amount',true,'sum');
							
							$('#jqGrid_SubjectBalance').jqGrid('footerData','set',{'amount':MoneyTotal});
						}else{
							$.zxsaas_plus.showalert("提示","请输入合法数字！");
							$(this).val('');
						}
					}
				}]
			}},
			{name:'installFlag',index:'installFlag', width:80,align:'center',formatter:'checkbox',formatoptions:{disabled:true},sortable:false,editable:true,edittype:'checkbox',editoptions:{value:'1:0'}},
			{name:'cphoneFlag',index:'cphoneFlag', width:80,align:'center',formatter:'checkbox',formatoptions:{disabled:true},sortable:false,editable:true,edittype:'checkbox',editoptions:{value:'1:0'}},
			{name:'bizName',index:'bizName', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
			{name:'remark',index:'remark', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
			{name:'billsCode',index:'billsCode', width:100,align:'center', sorttype:'string',formatter:yinru,sortable:false},
			{name:'cost',index:'cost', width:100,align:'center', sorttype:'string',sortable:false},
			{name:'goodsId',index:'goodsId', width:200,align:'center', sorttype:'string',hidden:true,sortable:false},
			{name:'attrs',index:'attrs', width:200,align:'center', sorttype:'string',hidden:true},
			{name:'ifManageImei',index:'ifManageImei', width:200,align:'center', sorttype:'string',hidden:true,sortable:false},
			{name:'thridTicketVoList',index:'thridTicketVoList', width:200,align:'center', sorttype:'int',sortable:false,hidden:true},
			{name:'oldRetailId',index:'oldRetailId', width:200,align:'center', sorttype:'int',sortable:false,hidden:true},
			{name:'retailDetailId',index:'retailDetailId', width:200,align:'center', sorttype:'int',sortable:false,hidden:true},
			{name:'retailMainId',index:'retailMainId', width:200,align:'center', sorttype:'int',sortable:false,formatter:'integer',hidden:true}
		  ],
        sortable:false,			            
        rownumbers:true,
        cellsubmit: 'clientArray',//单元格保存内容的位置		
        editurl: 'clientArray',
        rowNum:-1,
        viewrecords: true,		           
//        multiselect:true,
       	cellEdit:true,
        width: "100%" ,
        height: $(window).height()*0.2,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow:true,  //设置表格显示表脚
		userDataOnFooter:true,//设置userData 显示在footer里
		formatCell:function(){
			 $('#jqGrid_SubjectBalance').jqGrid('setColProp', 'storageName', { editoptions: {
				dataUrl:basePath+'/retail/exchange/searchStorageVoList?sectionId='+sectionId,
				buildSelect:function(data){
						var data=JSON.parse(data);
						var storageVoList=data.data.storageVoList;
						var str='<select class="form-control">';
							$.each(storageVoList,function(index,item){
								str+='<option value='+item.id+' >'+item.name+'</option>'
							})
							str+='</select>'
						return str;
					},
				dataEvents:[{type:'blur',fn:function(){
					var rId=$(this).parents('tr').attr('id');
					$('#jqGrid_SubjectBalance').setCell(rId,'storageId',$(this).val());
				}}]
            } });
		},
		ondblClickRow:function(id){
		//双击进入编辑
			var delid = id;
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow;
			lastcell = iCol;
			mainRowId=rowid;
		},
		onCellSelect:function(id,index,e){
			if(!isView){
				var colName=$('#jqGrid_SubjectBalance').jqGrid('getGridParam','colModel')[index].name 
		      	select_name=colName
		      	select_index=index;
		      	var imei = $('#jqGrid_SubjectBalance').jqGrid('getCell',id,'ifManageImei');
		      	var ifImport = $('#jqGrid_SubjectBalance').jqGrid('getCell',id,'ifImport');
		      	if(imei == 1){
		      		$('#jqGrid_SubjectBalance').setColProp('goodsNum',{editable:false});
		      		$('#jqGrid_SubjectBalance').setColProp('imei',{editable:true});
		      	}else{
		      		$('#jqGrid_SubjectBalance').setColProp('goodsNum',{editable:true});
		      		$('#jqGrid_SubjectBalance').setColProp('imei',{editable:false});
		      	}
		      	if(ifImport==1){
		      		$('#jqGrid_SubjectBalance').setColProp('name',{editable:false});
		      		$('#jqGrid_SubjectBalance').setColProp('bizName',{editable:false});
		      		$('#jqGrid_SubjectBalance').setColProp('imei',{editable:false});
		      		$('#jqGrid_SubjectBalance').setColProp('giftFlag',{editable:false});
		      		$('#jqGrid_SubjectBalance').setColProp('installFlag',{editable:false});
		      		$('#jqGrid_SubjectBalance').setColProp('cphoneFlag',{editable:false});
		      	}else{
		      		$('#jqGrid_SubjectBalance').setColProp('name',{editable:true});
		      		$('#jqGrid_SubjectBalance').setColProp('bizName',{editable:true});
		      		$('#jqGrid_SubjectBalance').setColProp('giftFlag',{editable:true});
		      		$('#jqGrid_SubjectBalance').setColProp('installFlag',{editable:true});
		      		$('#jqGrid_SubjectBalance').setColProp('cphoneFlag',{editable:true});
		      	}
		      	if(index==23){
		      		thisRuku=id;
		      		$('#moneyChoose').modal('show');
		      		$('.moneyRk').val($("#jqGrid_SubjectBalance").jqGrid("getRowData",thisRuku)['cost']);
		      	}
			}
		},
		loadComplete:function(){
//						for(var j = 0,len = arguments[0].rows.length;j < len;j ++){
//							chengben(j+1,arguments[0].rows[j].costMoney);
//						}
//						
//						var arr = document.querySelectorAll('.goodsName');
//						for(var i = 0,len = arr.length;i < len;i ++){
//							(arr[i].dataset.rid == '') && (arr[i].className = 'goodsName');
//							(arr[i].dataset.rid == '') && (arr[i].dataset.target = '');
//						}
//						$('.goodsRid').attr('readonly',true);
//						$('.numberRid').attr('readonly',true).removeAttr('id');
//						
//						totalAll.totalCalc();
//						
//						$('.footrow td:first-child').html('合计');
			var ids = $('#jqGrid_SubjectBalance').jqGrid('getDataIDs');
			if(ids.length < 1){
				$('#jqGrid_SubjectBalance').jqGrid('addRowData', 1, {}, 'last' );
				$('.goodsRid1').val('');
				$('.t1').html('0');
				$('.y1').html('');
				chengben(1,'');
			}
		},
		gridComplete:function(){
			var ids = $('#jqGrid_SubjectBalance').jqGrid('getDataIDs');
			$.each(ids,function(index,item){
				var data=$('#jqGrid_SubjectBalance').getRowData(item);
				if(data.cost==""){
					chengben(item,'');
				}
			})
		},
		loadError:function(xhr,status,error){
			
		}
	})
			
}
	//列表复选框  是否分期
	function checkBoxIm(cellvalue, options, rowObjec){
		//   0   非赠品
		//   1   赠品
		var str = '';
		if(cellvalue == '0'){
			str = '<input type="checkbox" class="del imstallmentFlag' + options.rowId + '" data-flag="' + rowObjec.imstallmentFlag + '"  data-id="' + options.rowId + '" />';
		}else{
			str = '<input type="checkbox" checked class="del imstallmentFlag' + options.rowId + '" data-flag="' + rowObjec.imstallmentFlag + '"  data-id="' + options.rowId + '" />';
		};
		return str;
	}
	//列表复选框  是否合约机
	function checkBoxCh(cellvalue, options, rowObjec){
		//   0   非赠品
		//   1   赠品
		var str = '';
		if(cellvalue == '0'){
			str = '<input type="checkbox" class="del chponeFlag' + options.rowId + '" data-flag="' + rowObjec.chponeFlag + '"  data-id="' + options.rowId + '" />';
		}else{
			str = '<input type="checkbox" checked class="del chponeFlag' + options.rowId + '" data-flag="' + rowObjec.chponeFlag + '"  data-id="' + options.rowId + '" />';
		};
		return str;
	}
	//获取仓库名称
	function getStorage(){
		var countries = {};
		$.request({  
		 	url: basePath+'/retail/exchange/searchStorageVoList?sectionId='+sectionId,//请求路径  
		 	async: false,  
		 	dataType:'JSON',
		 	success: function(data) {   
		 		for(var i = 0,len = data.data.storageVoList.length;i < len;i ++){
		 			countries[data.data.storageVoList[i].id] = data.data.storageVoList[i].name;
		 		}
		 		
		 	},
		 	error:function(){
		 		
		 	}
		 	});
		
		return countries;
	};
//		//列表复选框
	function checkBox(cellvalue, options, rowObjec){
		//   0   非赠品
		//   1   赠品
		var str = '';
		if(cellvalue == '0'){
			str = '<input type="checkbox" class="del giftFlag' + options.rowId + '" data-flag="' + rowObjec.ifFlag + '"  data-id="' + options.rowId + '" />';
		}else{
			str = '<input type="checkbox" checked class="del giftFlag' + options.rowId + '" data-flag="' + rowObjec.ifFlag + '"  data-id="' + options.rowId + '" />';
		};
		return str;
	}
	$(document).on('click','.del',function(e){
		if($(this).is(':checked')){
			$(this).data('giftFlag',1);
		}else{
			$(this).data('giftFlag',0)
		}
	});
	function addAndDelete(cellvalue, options, rowObjec){
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '" data-gId="' + rowObjec.goodsId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加" class="glyphicon glyphicon-plus addRow"></span><span class="glyphicon glyphicon-trash trashIn" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		return addAndDel;
	}
	
	//新增一行
	$(document).on('click', '.addRow',function(e){
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		
		var ids = $('#jqGrid_SubjectBalance').jqGrid('getDataIDs');
		//获得当前最大行号（数据编号）
		var maxid;
		maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
		//当用户点击表格最后一行时,自动增加一行
		$('#jqGrid_SubjectBalance').jqGrid('addRowData', maxid+1, {}, 'last' )
		$('.goodsRid'+(maxid+1)).val('');
		$('.t'+(maxid+1)).html(0);
		$('.y'+(maxid+1)).html(0);
//		chengben(maxid+1,'');
	});
	

	//列表    第三方券
	function thirdTicket(cellvalue, options, rowObjec){    
		if(cellvalue==undefined){
			cellvalue=0;
		}
		return '<span class="third t' + options.rowId + '" data-id="' + rowObjec.id + '" data-rId="' + options.rowId + '" onclick="loadmodalThird(this)" style="color:#00CCFF;cursor:pointer">' + cellvalue + '</span>';
	}
	
	//列表    原单引入
	function yinru(cellvalue, options, rowObjec){
		if(cellvalue==undefined){
			cellvalue=0;
		}
		return '<span class="yinru y' + options.rowId + '" data-id="' + rowObjec.id + '" data-rId="' + options.rowId + '" style="color:#00CCFF;cursor:pointer" onclick="">' + cellvalue + '</span>';
	}
	//列表    入库成本
	function chengben(rId, costMoney){
        if(costMoney == ''){
        	$('#jqGrid_SubjectBalance').find('#'+rId).find("td:eq(22)").attr({"data-rId":rId,'class':'cheng'});
//          	$(rowObjec.costMoney).attr({"data-toggle":"modal","data-target":"#moneyChoose","data-rId":options.rowId});
        }
		return costMoney;
	}
	//商品名称修改
	function goodsModel(cellvalue, options, rowObject){
		return '<input type="text" class="goodsRid' + options.rowId +'" style="border:0;text-align:center;width:170px" value="' + cellvalue +'" /><span class="goodsName glyphicon glyphicon-plus" data-gid="'+options.gid+'" data-rId="' + options.rowId +'"></span>';
		
	};
	//数字列检测
	$(document).on('blur','#checkNum',function(e){
		var value = $(this).val();
		var reg = /^[0-9]*[1-9][0-9]*$/;
		if(reg.test(value)){
			var $temp = $(this).parent().next().html().indexOf("<") == -1 ? $(this).parent().next().html().replace(/\,/g,'') : $(this).parent().next().find('input').val().replace(/\,/g,'');
			$(this).parent().next().next().html(($(this).val() * $temp).toFixed(2));
			
			totalAll.totalCalc();
			
		}else{
			$.zxsaas_plus.showalert("提示","请输入合法数字！");
			$(this).val('');
			$(this).parent().next().next().html('');
		}
	});
	//检测输入的是否为数字
	function checkNumber(value, colname) {
		var reg = /^[1-9]\d*$/;
		var arr = [];
		arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
//			   return value.replace(/[^\d]$/g,'')
		return arr;
	}
/**
 * 换出
 * @param urlData
 * @return
 */		
$(document).on('click','#jqGrid_swapOut input[type=checkbox]',function(){
	if($(this).prop('checked')==true){
		var selectID=$(this).closest('tr').attr('id');
		$("#jqGrid_swapOut").jqGrid("setCell",selectID,"discount",' ');//改变单元格的值
		$("#jqGrid_swapOut").jqGrid("setCell",selectID,"discountPrice",' ');//改变单元格的值
		$("#jqGrid_swapOut").jqGrid("setCell",selectID,"afterMoney",' ');//改变单元格的值
	}
})
var swapOutRow,swapOutCol;
function loadmodalOut(){
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	$('#jqGrid_swapOut').jqGrid({
		url:'',
		mtype:"GET",
		datatype: "local",
		jsonReader  : {	
			root: "rows",
			repeatitems: false,
			id:'0'
		},
		colNames:['操作','id','库存量','赠品','出库仓库','仓库Id','商品名称','型号','颜色','串号','串号ID','数量','标价','折扣率','折后价','折后金额','备注','sttrs','是否串号管理'],          
        colModel:[
					{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete,sortable:false},
					{name:'id',index:'id', width:200,align:'center', sorttype:'int',sortable:false,hidden:true},
					{name:'stockCount',index:'stockCount', width:200,align:'center', sorttype:'int',sortable:false,hidden:true},
					{name:'giftFlag',index:'giftFlag', width:80,align:'center', sorttype:'string',editable:true,formatter:'checkbox',edittype:'checkbox',formatoptions:{disabled:false},sortable:false,editoptions:{value:'1:0'}},
					{name:'storageName',index:'storageName', width:200,align:'center', sortable:false,editable:false},
					{name:'storageId',index:'storageId', width:200,align:'center', sortable:false,editable:false,hidden:true},
					{name:'name',index:'name', width:200,align:'center',editable:true,edittype:'custom',editoptions:{
						custom_element:function(value,options){
						var str='<input type="text" class="form-control" readonly="readonly" style="width:96%" value="' + value +'" /><span style="float:right;margin-top:-27px;margin-right:20px;" class="goodsOutName glyphicon glyphicon-plus" data-rId=' + options.rowId +' ></span>';
						  return $(str);
						},
						custom_value:function(value){
							return value.val();
						}
					},sortable:false},
					{name:'models',index:'models', sorttype:'integer', width:100,align:'center',sortable:false},
					{name:'color',index:'color', sorttype:'integer', width:100,align:'center',sortable:false},
					{name:'imei',index:'imei', sorttype:'integer', width:100,align:'center',sortable:false},
					{name:'imeiId',index:'imeiId', hidden:true},
					{name:'goodsNum',index:'goodsNum', width:100,align:'center',editable:false,sortable:false,formatter:"integer",editoptions:{
						dataEvents:[{
							type:'blur',
							fn:function(e){
								var reg=/[1-9]{1,}\d*/;
								var rId=$(this).parents('tr').attr('id');
								var data=$('#jqGrid_swapOut').getRowData(rId);
								if(reg.test($(this).val())){
									if($(this).val()*1>data.stockCount){
										$.zxsaas_plus.showalert('提示','请输入小于库存量的数字!');
										$(this).val(data.stockCount);
									}
									$('#jqGrid_swapOut').setCell(rId,'afterMoney',data.discountPrice*$(this).val());
								}else{
									$.zxsaas_plus.showalert('提示','请输入合法数字！');
									$(this).val(1);
									$('#jqGrid_swapOut').setCell(rId,'afterMoney',data.discountPrice);
								}
							}
						}]
					}},
					{name:'retailPrice',index:'retailPrice', width:100,align:'center',  sorttype:'float',formatter:"number",editoptions:{
						dataEvents:[{
							type:"blur",
							fn:function(e){
								var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
								if(rex.test($(this).val())){
									var num = $(this).parent().prev().html().replace(/\,/g,'');//数量
									var zheKou = $(this).parent().next().html().replace(/%/g,'');//折扣率
									$(this).parent().next().next().html(($(this).val().replace(/\,/g,'') * zheKou / 100).toFixed(2));//折后价计算
									$(this).parent().next().next().next().html(($(this).parent().next().next().html().replace(/\,/g,'') * num).toFixed(2));//折后金额计算
								}else{
									$.zxsaas_plus.showalert("提示","请输入合法数字！");
									$(this).val('');
								}
							}
						}]
					},sortable:false},
					{name:'discount',index:'discount', width:100,align:'center',  sorttype:'float',formatter:"currency",formatoptions: {decimalSeparator:".",defaulValue:"0",decimalPlaces:"3",suffix:"%"},editable:true,sortable:false,editoptions:{
						dataEvents:[{
							type:'blur',
							fn:function(e){
								var reg=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
								if(reg.test($(this).val()) && ($(this).val() * 1) <= 100){
									var num = $(this).parent().prev().prev().html().replace(/\,/g,'');//数量
									var biaoJia = $(this).parent().prev().html().replace(/\,/g,'');//标价
									$(this).parent().next().html(($(this).val().replace(/\,/g,'') * biaoJia / 100).toFixed(2));//折后价计算
									$(this).parent().next().next().html(($(this).parent().next().html().replace(/\,/g,'') * num).toFixed(2));//折后金额计算
									
									$('#jqGrid_swapOut').jqGrid('saveCell',swapOutRow,swapOutCol);
									var afterMoneyTotal=$('#jqGrid_swapOut').getCol('afterMoney',true,'sum');
									
									$('#jqGrid_swapOut').jqGrid('footerData','set',{'afterMoney':afterMoneyTotal});
								}else{
									$.zxsaas_plus.showalert("提示","请输入合法数字！");
									$(this).val('');
								}
							}
						}]
					}},
					{name:'discountPrice',index:'discountPrice', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,sortable:false,editoptions:{
						dataEvents:[{
							type:'blur',
							fn:function(e){
								var reg=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
								var money = $(this).parent().prev().prev().html().replace(/\,/g,'') * 1;
								if(reg.test($(this).val()) && ($(this).val() * 1) <= money){
									var num = $(this).parent().prev().prev().prev().html().replace(/\,/g,'');//数量
									var biaoJia = $(this).parent().prev().prev().html().replace(/\,/g,'');//标价
									var zhekoulv=($(this).val().replace(/\,/g,'') / biaoJia * 100);
									if(isNaN(zhekoulv)){
										zhekoulv=0;
									}
									$(this).parent().prev().html(zhekoulv.toFixed(2)+ '%');//折扣率计算
									$(this).parent().next().html(($(this).val().replace(/\,/g,'') * num).toFixed(2));//折后金额计算
									$('#jqGrid_swapOut').jqGrid('saveCell',swapOutRow,swapOutCol)
									var afterMoneyTotal=$('#jqGrid_swapOut').getCol('afterMoney',true,'sum');
									$('#jqGrid_swapOut').jqGrid('footerData','set',{'afterMoney':afterMoneyTotal});
								}else{
									$.zxsaas_plus.showalert("提示","请输入合法数字！");
									$(this).val('');
								}
							}
						}]
					}},
					{name:'afterMoney',index:'afterMoney', width:100,align:'center', sorttype:'string',editable:true,sortable:false,editoptions:{
						dataEvents:[{
							type:'blur',
							fn:function(e){
								var reg=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
								var money = $(this).parent().prev().prev().html().replace(/\,/g,'') * 1;
								if(reg.test($(this).val())){
									var num = $(this).parent().prev().prev().prev().prev().html().replace(/\,/g,'');//数量
									var biaoJia = $(this).parent().prev().prev().prev().html().replace(/\,/g,'');//标价
									$(this).parent().prev().html(($(this).val() / num).toFixed(2));//折后价计算
//									console.log(typeof biaoJia);
									if(biaoJia != '0.00'){
										$(this).parent().prev().prev().html(($(this).parent().prev().html().replace(/\,/g,'') / biaoJia * 100).toFixed(2) + '%');//折扣率计算
									}else{
										$(this).parent().prev().prev().html('100%');//折扣率计算
									}
									$('#jqGrid_swapOut').jqGrid('saveCell',swapOutRow,swapOutCol);
									var afterMoneyTotal=$('#jqGrid_swapOut').getCol('afterMoney',true,'sum');
									$('#jqGrid_swapOut').jqGrid('footerData','set',{'afterMoney':afterMoneyTotal});
								}else{
									$.zxsaas_plus.showalert("提示","请输入合法数字！");
									$(this).val('');
								}
							}
						}]
					}},
					{name:'remark',index:'remark', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
					{name:'attrs',index:'attrs', width:200,align:'center', sorttype:'string',hidden:true},
					{name:'ifManageImei',index:'ifManageImei', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"1:√;0:"}}
                ],
        sortable:false,			            
        rownumbers:true,
        cellsubmit: 'clientArray',//单元格保存内容的位置		
        editurl: 'clientArray',
        rowNum: 15,
        rowList: [10, 15, 20, 25, 40],
        viewrecords: true,		           
//			            multiselect:true,
       	cellEdit:true,
        width: "100%" ,
        height: $(window).height()*0.165,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow:true,  //设置表格显示表脚
		userDataOnFooter:true,//设置userData 显示在footer里
		ondblClickRow:function(id){
					
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			swapOutRow=iRow;
			swapOutCol=iCol;
		},
		onCellSelect:function(rowid,iCol,cellcontent,e){
			if(!isView){
				if($("#jqGrid_swapOut").jqGrid("getRowData",rowid).giftFlag==1){
					$('#jqGrid_swapOut').setColProp('discount',{editable:false});
					$('#jqGrid_swapOut').setColProp('discountPrice',{editable:false});
					$('#jqGrid_swapOut').setColProp('afterMoney',{editable:false});
				}else if($("#jqGrid_swapOut").jqGrid("getRowData",rowid).giftFlag==0){
					$('#jqGrid_swapOut').setColProp('discount',{editable:true});
					$('#jqGrid_swapOut').setColProp('discountPrice',{editable:true});
					$('#jqGrid_swapOut').setColProp('afterMoney',{editable:true});
				}
				var data=$('#jqGrid_swapOut').getRowData(rowid);
				if(!data.id&&iCol!=7){
					$('#jqGrid_swapOut').setGridParam({cellEdit:false});
				}else{
					$('#jqGrid_swapOut').setGridParam({cellEdit:true})
				}
				if(data.ifManageImei==1){
					$('#jqGrid_swapOut').setColProp('goodsNum',{editable:false});
				}else{
					$('#jqGrid_swapOut').setColProp('goodsNum',{editable:true});
				}
			}
		},
		gridComplete: function() {
			
		},
		loadComplete:function(){
			var ids = $('#jqGrid_swapOut').jqGrid('getDataIDs');
			if(ids.length < 1){
				$('#jqGrid_swapOut').jqGrid('addRowData', 1, {}, 'last' );
			}
		},
		loadError:function(xhr,status,error){
			
		}
	})
	//获取仓库名称
	function getStorage(){
//				debugger;
		var countries = {};
		$.request({
		 	url: basePath+'/retail/exchange/searchStorageVoList?sectionId=10',//请求路径  
		 	async: false,  
		 	dataType:'JSON',
		 	success: function(data) {   
		 		for(var i = 0,len = data.data.storageVoList.length;i < len;i ++){
		 			countries[data.data.storageVoList[i].id] = data.data.storageVoList[i].name;
		 		}
		 		console.log(countries);
		 		
		 	},
		 	error:function(){
		 		
		 	}
	 	});
		return countries;
	};
//			//列表复选框
	function checkBox(cellvalue, options, rowObjec)
	{
		//   0   非赠品
		//   1   赠品
		var str = '';
		if(cellvalue == '0'){
			str = '<input type="checkbox" class="gift giftFlag' + options.rowId + '" data-flag="' + rowObjec.ifFlag + '"  data-id="' + options.rowId + '" />';
		}else{
			str = '<input type="checkbox" checked class="gift giftFlag' + options.rowId + '" data-flag="' + rowObjec.ifFlag + '"  data-id="' + options.rowId + '" />';
		};
		return str;
	}
	$(document).on('click','.gift',function(e){
		if($(this).is(':checked')){
			$(this).data('giftFlag',1);
		}else{
			$(this).data('giftFlag',0)
		}
//				($(this).is(':checked')) ? $(this).data('giftFlag',1) : $(this).data('giftFlag',0)
	});
	function addAndDelete(cellvalue, options, rowObjec){
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '" data-gId="' + rowObjec.goodsId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加" class="glyphicon glyphicon-plus addRowOut"></span><span class="glyphicon glyphicon-trash trashOut" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		return addAndDel;
	}
	//新增一行
	$(document).on('click', '.addRowOut',function(e){
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		var ids = $('#jqGrid_swapOut').jqGrid('getDataIDs');
		//获得当前最大行号（数据编号）
		var maxid;
		maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
		//当用户点击表格最后一行时,自动增加一行
		$('#jqGrid_swapOut').jqGrid('addRowData', maxid+1, {}, 'last' )
//		$('.goodsRid'+(maxid+1)).val('');
//		$('.t'+(maxid+1)).html(0);
//		$('.y'+(maxid+1)).html(0);
//				chengben(maxid+1,'');
	});
	
	//列表    原单引入
	function yinru(cellvalue, options, rowObjec)
	{
		return '<span class="yinru y' + options.rowId + '" data-id="' + rowObjec.id + '" data-rId="' + options.rowId + '" style="color:#00CCFF;cursor:pointer" onclick="">' + cellvalue + '</span>';
	}
	
	//商品名称修改
	function goodsModel(cellvalue, options, rowObject){
		var cellvalue=cellvalue==undefined?'':cellvalue;
		return '<input type="text" class="goodsRid' + options.rowId +'" style="border:0;text-align:center;width:170px" value="' + cellvalue +'" /><span class="goodsOutName glyphicon glyphicon-plus" data-gid="'+options.gid+'" data-rId="' + options.rowId +'"></span>';
		
	};
	
	//数字列检测
	$(document).on('blur','#checkNum',function(e){
		var value = $(this).val();
		var reg = /^[0-9]*[1-9][0-9]*$/;
		if(reg.test(value)){
			var $temp = $(this).parent().next().html().indexOf("<") == -1 ? $(this).parent().next().html().replace(/\,/g,'') : $(this).parent().next().find('input').val().replace(/\,/g,'');
			$(this).parent().next().next().html(($(this).val() * $temp).toFixed(2));
			totalAll.totalOut();
		}else{
			$.zxsaas_plus.showalert("提示","请输入合法数字！");
			$(this).val('');
			$(this).parent().next().next().html('');
		}
	});
	
	//检测输入的是否为数字
	function checkNumber(value, colname) {
//				console.log(arguments);
		var reg = /^[1-9]\d*$/;
		var arr = [];
		arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
//				   return value.replace(/[^\d]$/g,'')
		return arr;
	}
			
}	
	var totalAll = {
		totalCalc:function(){//入库总计
			 $("#jqGrid_SubjectBalance").jqGrid("saveCell",lastrow,lastcell);
			var idsLeft = $('#jqGrid_SubjectBalance').jqGrid('getDataIDs');
			var sumNumber = 0;//数量
			var sumMoney = 0,//退款金额
				thirdTicket = 0,//第三方券
				price = 0,//单价
				total = 0;//原单金额
			for(var i = 0,len = idsLeft.length;i < len ;i ++){
				var rowsData = $('#jqGrid_SubjectBalance').jqGrid('getRowData',idsLeft[i])
				sumMoney += ((rowsData.amount) * 1);
				thirdTicket += ($(rowsData.thridTicketTotal).html() * 1);
				sumNumber += (rowsData.goodsNum * 1);
				total += (rowsData.oldAmount * 1);
			}
			$('#gview_jqGrid_SubjectBalance .ui-jqgrid-sdiv').children().children().children().children().eq(0).children().eq(14).html(total);
			$('#gview_jqGrid_SubjectBalance .ui-jqgrid-sdiv').children().children().children().children().eq(0).children().eq(15).html(thirdTicket);
			$('#gview_jqGrid_SubjectBalance .ui-jqgrid-sdiv').children().children().children().children().eq(0).children().eq(12).html(sumNumber);
		},
		totalOut:function(){//出库总计
			 $("#jqGrid_swapOut").jqGrid("saveCell",lastrow,lastcell);
			var idsLeft = $('#jqGrid_swapOut').jqGrid('getDataIDs');
			var sumNumber = 0,//数量
				sumMoney = 0;//折后金额
			for(var i = 0,len = idsLeft.length;i < len ;i ++){
				var rowsData = $('#jqGrid_swapOut').jqGrid('getRowData',idsLeft[i])
				sumMoney += (rowsData.afterMoney * 1);
				sumNumber += (rowsData.goodsNum * 1);
			}
			$('#gview_jqGrid_swapOut .ui-jqgrid-sdiv').children().children().children().children().eq(0).children().eq(13).html(sumMoney);
			$('#gview_jqGrid_swapOut .ui-jqgrid-sdiv').children().children().children().children().eq(0).children().eq(9).html(sumNumber);
		}
	};
			
			
	/**
	 * 第三方券
	 */
	var loadmodalThird = function(that){
		if($(that).html()==0){
			$.zxsaas_plus.showalert('提示','没有第三方券！！！')
			return;
		}
		$('#thirdChoose').modal('show');
		thirdTrickInit();
		$('#jqGrid_Third').jqGrid('clearGridData');
		var trickList=$('#jqGrid_SubjectBalance').jqGrid('getRowData',$(that).data('rid'))['thridTicketVoList'];
		var trickListObj=JSON.parse(trickList);
		if(trickListObj===undefined){
			return false;
		}
		for(var i=0,len=trickListObj.length;i<len;i++){
			$('#jqGrid_Third').jqGrid('addRowData','id',trickListObj[i]);
		}
	}	
	
	//增值服务详情
	$(document).on('click','.seeDetail',function(e){
		var ids=$('#jqGrid_serve').jqGrid('getGridParam','selarrrow');
		var arr=[];
		if(ids.length==0){
			$.zxsaas_plus.showalert('提示','请勾选后再查看详情！！！');
			return;
		}
		for(var i=0,len=ids.length;i<len;i++){
			arr.push($('#jqGrid_serve').jqGrid('getCell',ids[i],'serviceInstanceId'));
		}
		var arrTemp=arr.filter_(function(item,index){
			return item!='';
		})
		if(!arrTemp.length){
			$.zxsaas_plus.showalert('提示','没有增值服务！');
			return;
		}
		$('#serveDetail').modal('show');
		$("#jqGrid_serveDetail").clearGridData();
		$.each(arr,function(index,item){
			$.request({
				url:basePath+"/retail/exchange/searchRefAddServiceDetailVoList",
				type:'get',
				dataType:'json',
				async:false,
				data:{
					sectionId:$('#sectionId option:selected').val(),
					serviceInstanceIds:item,
				},
				success:function(data){
					for(var j=0,dataLen=data.data.goodsAddServiceDetailVoList.length;j<dataLen;j++){
						var serviceListId=$('#jqGrid_serveDetail').jqGrid('getDataIDs');
						var maxserviceId=serviceListId.length==0?0:Math.max.apply(null,serviceListId);
						console.log('我的数据'+data.data.goodsAddServiceDetailVoList[j]+"    我是长度"+dataLen+'   我是下标'+j);
						$("#jqGrid_serveDetail").jqGrid("addRowData",maxserviceId+1,data.data.goodsAddServiceDetailVoList[j],"last");
					}
				}
			})
		})
	});
	/**
	 * 第三方券初始化
	 */
function thirdTrickInit(){
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	$('#jqGrid_Third').jqGrid({
		url:'',
		mtype:"GET",
		datatype: "local",
		jsonReader  : {	
				root: "rows",
				repeatitems: false
					},
		colNames:['id','往来单位','券名称','抵现金额','券编号','备注'],          
	    colModel:[
	              	{name:'id',index:'id', width:100,align:'center',sortable:false,hidden:true},
					{name:'unitName',index:'unitName', width:100,align:'center', sorttype:'string',sortable:false},
					{name:'ticketName',index:'ticketName', width:100,align:'center',sortable:false,},
					{name:'amount',index:'amount', width:100,align:'center',  sorttype:'float',formatter:"number",sortable:false},
					{name:'couponCode',index:'couponCode', width:100,align:'center',  sorttype:'string',editable:true,sortable:false},
					{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',editable:true,sortable:false}
	            ],
	    sortable:false,			            
	    rownumbers:true,
	    cellsubmit: 'clientArray',//单元格保存内容的位置		
	    editurl: 'clientArray',
	    viewrecords: true,		           
	   	cellEdit:true,
	    width: "100%" ,
	    height: $(window).height()*0.30,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow:false,  //设置表格显示表脚
		userDataOnFooter:false,//设置userData 显示在footer里
		onCellSelect:function(id,index,e){
			
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
				
		},
		gridComplete: function() {
		
//			
		},
		loadComplete:function(){

			
		}
	})
}
	//第三方券初始化完毕
//	增值服务
function loadmodalServe(urlData,tName,flag){
	var options = {
		LoadBtnUrl: basePath+"/json/button.json", //按钮工具栏加载地址
		LoadTableUrl: urlData,
		TableName: tName, //显示表格名称。遵照css选择器书写
	};
	$.jgrid.defaults.width = 1280;
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	var lastsel='';//最后一次选中的行
	var colNames = [];
	var JqGridColModel = [];
	var colNamesDetail = ['ID','增值服务名称','生效日期','有效期限','效期内使用次数','商品编码','商品名称','颜色','型号','手机串号','串号ID','会员卡号','零售单号','预设售价','会员价','实际收款','备注','服务流水号'];
	var JqGridColModelDetail=[
			{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
			{name:'serviceName',index:'serviceName', width:100,align:'center', sorttype:'string',sortable:false},
			{name:'billsDate',index:'billsDate', width:100,align:'center', sortable:false,editable: true,editoptions:{
                dataInit:function(e){
                    $(e).datetimepicker({
					  lang:"ch",          
				      format:"Y-m-d",      
				      timepicker:false,    
				      todayButton:false    
					});
                }
            }},
			{name:'serviceDue',index:'serviceDue', sorttype:'integer', width:100,align:'center',editable:true,sortable:false,editoptions:{
                dataInit:function(e){
                    $(e).datetimepicker({
					  lang:"ch",      
				      format:"Y-m-d", 
				      timepicker:false,
				      todayButton:false 
					});
                }
            }},
			{name:'userNum',index:'userNum', sorttype:'integer', width:100,align:'center',editable:true,sortable:false},
			{name:'goodsCode',index:'goodsCode', sorttype:'integer', width:100,align:'center',editable:true,sortable:false},
			{name:'goodsName',index:'goodsName', width:100,align:'center',editable:true,sortable:false},
			{name:'goodsColor',index:'goodsColor', width:60,align:'center',  sorttype:'string',sortable:false},
			{name:'goodsModel',index:'goodsModel', width:80,align:'center',  sorttype:'string',sortable:false},
			{name:'imei',index:'imei', width:100,align:'center',  sorttype:'string',sortable:false},
			{name:'imei',index:'imei',hidden:true},
			{name:'cardNum',index:'cardNum', width:100,align:'center',  sorttype:'string',sortable:false},
			{name:'billsCode',index:'billsCode', width:100,align:'center',  sorttype:'string',sortable:false},
			{name:'setPrice',index:'setPrice', width:100,align:'center',  sorttype:'number',sortable:false},
			{name:'feeScale',index:'feeScale', width:100,align:'center',  sorttype:'number',sortable:false},
			{name:'actualAmount',index:'actualAmount', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,sortable:false},
			{name:'remark',index:'remark', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
			{name:'serviceInstanceNo',index:'serviceInstanceNo', width:100,align:'center', sorttype:'string',sortable:false}
		];
	var colNamesJ = ['操作','ID','原服务名称','原串号','关联会员卡号','原单实际收款','退换方式','可抵扣金额','新服务名称','新服务关联出库串号','新服务定价','新服务会员价','新服务实收','备注'];
	var JqGridColModelJ=[
			{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete,sortable:false},
			{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
			{name:'serveName',index:'serveName', width:100,align:'center', sorttype:'string',sortable:false},
			{name:'conNo',index:'conNo', width:200,align:'center',sortable:false},
			{name:'card',index:'card', width:100,align:'center',  sorttype:'string',sortable:false},
			{name:'practicalMoney',index:'practicalMoney', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,sortable:false},
			{name:'refundWay',index:'refundWay', width:100,align:'center',  sorttype:'float',editable: true,edittype:'select',editoptions: {value: {'001':'不变','002':'更换','003':'退款'},
				dataEvents:[{
					type:'change',
					fn:function(e){
						console.log($(this).val());
						var wayId = $(this).val();
						switch (wayId){
							case '001':
								$(options.TableName).setColProp('kMoney',{editable:false});
								$(options.TableName).setColProp('newName',{editable:false});
								$(options.TableName).setColProp('newNo',{editable:false});
								$(options.TableName).setColProp('newReMoney',{editable:false});
								break;
							case '002':
								$(options.TableName).setColProp('kMoney',{editable:true});
								$(options.TableName).setColProp('newName',{editable:true});
								$(options.TableName).setColProp('newNo',{editable:true});
								$(options.TableName).setColProp('newReMoney',{editable:true});
								break;
							case '003':
								$(options.TableName).setColProp('kMoney',{editable:true});
								$(options.TableName).setColProp('newName',{editable:false});
								$(options.TableName).setColProp('newNo',{editable:false});
								$(options.TableName).setColProp('newReMoney',{editable:false});
								break;
							default:
								break;
						}
					}
				}]
			},sortable:false},
			{name:'kMoney',index:'kMoney', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
			{name:'newName',index:'newName', width:100,align:'center',  sorttype:'float',editable: true,edittype:'select',editoptions: {value: {'001':'方式1','002':'方式2','003':'方式3'}},sortable:false},
			{name:'newNo',index:'newNo', width:100,align:'center',  sorttype:'float',editable: true,edittype:'select',editoptions: {value: {'001':'1','002':'2','003':'3'}},sortable:false},
			{name:'newMoney',index:'newMoney', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
			{name:'newVipMoney',index:'newVipMoney', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
			{name:'newReMoney',index:'newReMoney', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
			{name:'remark',index:'remark', width:100,align:'center', sorttype:'string',editable:true,sortable:false}
        ];
	if(flag){
		colNames = colNamesJ;
		JqGridColModel = JqGridColModelJ;
	}else{
		colNames = colNamesDetail;
		JqGridColModel = JqGridColModelDetail;
	}
	loadtable();
	function loadtable(){
		$(options.TableName).jqGrid({
			url:options.LoadTableUrl,
			mtype:"GET",
			datatype: "json",
			jsonReader  : {	
					root: "rows",
					repeatitems: false
						},
			colNames:colNames,          
            colModel:JqGridColModel,
            sortable:false,			            
            rownumbers:true,
            cellsubmit: 'clientArray',//单元格保存内容的位置		
            editurl: 'clientArray',
            rowNum: 15,
            rowList: [10, 15, 20, 25, 40],
            pager:options.pager,
            viewrecords: true,		           
//			            multiselect:true,
           	cellEdit:true,
            width: "100%" ,
            height: $(window).height()*0.25,
			autowidth:true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			footerrow:true,  //设置表格显示表脚
			userDataOnFooter:true,//设置userData 显示在footer里
			beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;
			},
			onCellSelect:function(id,index,e){
				var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
		      	select_name=colName
		      	select_index=index;
		      	
			},
			gridComplete: function() {
				console.log(arguments);
				var ids=$(options.TableName).jqGrid("getDataIDs");
//							
			},
			loadComplete:function(){
				console.log(arguments);
				
				var arr = document.querySelectorAll('.goodsName');
				for(var i = 0,len = arr.length;i < len;i ++){
					(arr[i].dataset.rid == '') && (arr[i].className = 'goodsName');
					(arr[i].dataset.rid == '') && (arr[i].dataset.target = '');
				}
				$('.goodsRid').attr('readonly',true);
				$('.numberRid').attr('readonly',true).removeAttr('id');
				
				totalAll.totalCalc();
				
				$('.footrow td:first-child').html('合计');
				
			},
			loadError:function(xhr,status,error){
				
			}
		})
	}
	$(window).bind('click', function saveEdit(e) {
		var rowId = $(e.target).parent("tr").attr("id");
		if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
			if ($(e.target).closest(options.TableName).length == 0) { 
				$(options.TableName).jqGrid('saveRow', lastsel);						
				lastsel='';
			}
		}
	})
	function addAndDelete(cellvalue, options, rowObjec){
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '" data-gId="' + rowObjec.goodsId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加" class="glyphicon glyphicon-plus addRowServe"></span><span class="glyphicon glyphicon-trash trashServe" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		return addAndDel;
	}
	//新增一行
	$(document).on('click', '.addRowServe',function(e){
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		var ids = $(options.TableName).jqGrid('getDataIDs');
		//获得当前最大行号（数据编号）
		var maxid;
		maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
		//当用户点击表格最后一行时,自动增加一行
		(rowId == maxid && rowId != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' )
		$('.goodsRid'+(maxid+1)).val('');
		$('.t'+(maxid+1)).html(0);
		$('.y'+(maxid+1)).html(0);
	});
	//删除一行
	$(document).on('click', '.trashServe',function(e){
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		if(thisTitle == "删除行"){
			console.log('条数:' + $(options.TableName+' tbody tr').length);
			if($(options.TableName+' tbody tr').length === 2) {
				$.zxsaas_plus.showalert("错误","至少保留一条数据!")
				return false;
			}
			$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
				var rData = $(options.TableName).jqGrid('getRowData',rowId);
//						if(rData.goodsId != ''){
//							tableArr.push({'id':rData.id,'operationFlag':3});
//						}
				$(options.TableName).jqGrid('delRowData', rowId);
			},function(){
				
			});
		}
	});
	//检测输入的是否为数字
	function checkNumber(value, colname) {
//				console.log(arguments);
		var reg = /^[1-9]\d*$/;
		var arr = [];
		arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
//				   return value.replace(/[^\d]$/g,'')
		return arr;
	}
}
/**
 * 引入原单的表格的初始化
 */
function billGridInit(){
	$('#billGrid').jqGrid({
		url:'',
		mtype:"GET",
		datatype: "local",
		jsonReader  : {	
			root: "data.soldGoodsVoList",
			repeatitems: false,
			id:'0'
		},
		colNames:['串号','串号id','零售单号','业务日期','商品编码','商品名称','型号','颜色','客户姓名','联系电话','零售明细','零售主要ID','是否串号'],          
        colModel:[
//	            {name:'id',index:'id', width:70,align:'center',sortable:false,hidden:true,hidedlg:true, key:true},
			{name:'imei',index:'imei', width:150,align:'center',sortable:false},
			{name:'imeiId',index:'imeiId', hidden:true},
			{name:'billsCode',index:'billsCode', width:200,align:'center',sortable:false},
			{name:'billsDate',index:'billsDate', width:100,align:'center',sortable:false},
			{name:'code',index:'code', width:100,align:'center',sortable:false},
			{name:'name',index:'name', width:100,align:'center',sortable:false},
			{name:'models',index:'models', width:100,align:'center',sortable:false},
			{name:'color',index:'color', width:100,align:'center',sortable:false},
			{name:'customerName',index:'customerName', width:100,align:'center',sortable:false},
			{name:'customerTel',index:'customerTel', width:120,align:'center',sortable:false},
			{name:'retailDetailId',index:'retailDetailId', width:120,align:'center',sortable:false,hidden:true,hidedlg:true},
			{name:'retailMainId',index:'retailMainId', width:120,align:'center',sortable:false,hidden:true},
			{name:'ifManageImei',index:'ifManageImei', width:120,align:'center',sortable:false,hidden:true}
		],
		prmNames : {  
		   page:null,    // 表示请求页码的参数名称  
	       rows:null,    // 表示请求行数的参数名称  
	       sort: null, // 表示用于排序的列名的参数名称  
	       order: null, // 表示采用的排序方式的参数名称  
	       search:null, // 表示是否是搜索请求的参数名称  
	       nd:null, // 表示已经发送请求的次数的参数名称  
	       id:null // 表示当在编辑数据模块中发送数据时，使用的id的名称   
        },
        sortable:false,			            
        rownumbers:true,
        multiselect : true,
        rowNum:-1,
        viewrecords: true,		           
//	        multiselect:true,
       	cellEdit:true,
        width: "100%" ,
        height: $(window).height()*0.25,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow:true,  //设置表格显示表脚
		userDataOnFooter:true,//设置userData 显示在footer里
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
				
		},
		onSelectRow:function(rowid,status,e){
			if(status){
				var myMainId=$(this).jqGrid('getCell',rowid,'retailMainId');
				var rowIdList=$(this).jqGrid('getGridParam','selarrrow');
				var tempId=$(this).jqGrid('getCell',rowIdList[0],'retailMainId');
				if(myMainId!==tempId){
					$(e.target).click();
					$.zxsaas_plus.showalert("提示","不能选中不同单据!");
				}
			}
		},
		onCellSelect:function(id,index,e){
	      	
		},
		gridComplete: function() {
			$('#cb_billGrid').attr('disabled',true);
//				
		},
		loadComplete:function(){
			
		},
		loadError:function(xhr,status,error){
			
		}
	})
}
	/*
	 * 增值服务初始化
	 */
function serviceInit(){
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';	
	$('#jqGrid_serve').jqGrid({
		url:'',
		mtype:'get',
		jsonReader  : {	
			root: "row",
			repeatitems: false,
			id:'0'
		},
		datatype:'local',
		colNames:['操作','颜色','ifIm','型号','商品Id','服务实例id','服务id','原实例id','id','原服务名称','原串号','串号id','关联会员卡号','原单实际收款','退换方式','可抵扣金额','新服务名称','关联序号','新串号','新串号ID','新服务定价','新服务会员价','新服务实收','备注','有效期限','可使用次数','新商品id','新商品颜色','新商品型号'],          
		colModel:[
		      		{name:'operate',index:'operate', width:50,align:'center', sorttype:'string',sortable:false,formatter:function(cellvalue, options, rowObjec){
		      			var addAndDel = '<div class="operating"><span  data-id="' + options.rowId + '" data-gid="'+options.gid+'" class="glyphicon glyphicon-trash deleAddService" aria-hidden="true" title="删除行"></span></div>';
						return addAndDel;
		      		}},
		          	{name:'goodsColor',index:'goodsColor', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
		          	{name:'ifIm',index:'ifIm', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
		          	{name:'goodsModel',index:'goodsModel', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
		          	{name:'goodsId',index:'goodsId', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
		          	{name:'serviceInstanceId',index:'serviceInstanceId',width:100,align:'center',hidden:true},
		          	{name:'serviceId',index:'serviceId',width:100,align:'center',hidden:true},
		          	{name:'oldInstanceId',index:'oldInstanceId',width:100,align:'center',hidden:true},
		         	{name:'id',index:'id',width:100,align:'center',hidden:true},
		         	{name:'serviceName',index:'serviceName',width:100,align:'center'},
					{name:'imei',index:'imei', width:100,align:'center', sorttype:'string',sortable:false},
					{name:'imeiId',index:'imeiId',hidden:true},
					{name:'cardNum',index:'cardNum', width:100,align:'center', sorttype:'string',sortable:false},
					{name:'actualAmount',index:'actualAmount', width:100,align:'center',sortable:false},
					{name:'exchangeType',index:'exchangeType',width:160,align:'center',editable:true,sort:false,edittype:'select',editoptions:{value:{'0':'不变','1':'更换','2':'退款'},dataEvents:[{
						type:'change',
						fn:function(e){
							var $this=$(this);
							var rowId=$this.parents('tr').attr('id');
							$('#jqGrid_serve').setCell(rowId,'newServiceName',' ');
							$('#jqGrid_serve').setCell(rowId,'receive',' ');
							$('#jqGrid_serve').setCell(rowId,'mortgage',' ');
							$('#jqGrid_serve').setCell(rowId,'setPrice',' ');
							$('#jqGrid_serve').setCell(rowId,'feeScale',' ');
							$('#jqGrid_serve').setColProp('mortgage',{editable:false});
							$('#jqGrid_serve').setColProp('newServiceName',{editable:false});
							$('#jqGrid_serve').setColProp('receive',{editable:false});
						}
					}]}},
					{name:'mortgage',index:'mortgage',width:100,align:'center',sort:false,editable:false,edittype:'text'},
					{name:'newServiceName',index:'newServiceName',width:100,align:'center',sort:false,editable:false,edittype:'select',editoptions: {value:(function(){
						var countries = {};
						$.request({  
						 	url: basePath+'/retail/exchange/searchAddService',//请求路径  
						 	async: false,  
						 	dataType:'JSON',
						 	success: function(data) {   
							
						 		for(var i = 0,len = data.data.addServiceList.length;i < len;i ++){
						 			countries[data.data.addServiceList[i].id] = data.data.addServiceList[i].name;
						 		}
						 		
						 		
						 	}
						 	});
						
						return countries;
					})(),dataEvents:[{
						type:'change',
						fn:function(e){
							var $this=$(this),
							    $rid=$this.parents('tr').attr('id');
							$.request({
								url:basePath+'/retail/exchange/loadAddService',
								type:'get',
								dataType:'json',
								data:{serviceId:$this.val()},
								success:function(data){
									$('#jqGrid_serve').jqGrid('setCell',$rid,'setPrice',data.data.addService.setPrice);
									$('#jqGrid_serve').jqGrid('setCell',$rid,'id',data.data.addService.id);
									$('#jqGrid_serve').jqGrid('setCell',$rid,'feeScale',data.data.addService.feeScale);
									$('#jqGrid_serve').jqGrid('setCell',$rid,'serviceDue',data.data.addService.serviceDue);
									$('#jqGrid_serve').jqGrid('setCell',$rid,'enableTimes',data.data.addService.userNum);
									$('#jqGrid_serve').jqGrid('setCell',$rid,'ifIm',data.data.addService.ifIm);
								}
							})
						}
					}]
					}},
					{name:'relateNum',index:'relateNum',width:100,align:'center',sort:false,editable:false,edittype:'select',editoptions:{
						dataEvents:[{
							type:'change',
							fn:function(e){
								var goodsRowId=$(this).val();
								var serviceRid=$(this).parents('tr').attr('id');
								var goodsData=$('#jqGrid_swapOut').getRowData(goodsRowId);
								$('#jqGrid_serve').setCell(serviceRid,'newImei',goodsData.imei);
								$('#jqGrid_serve').setCell(serviceRid,'newImeiId',goodsData.imeiId);
								$('#jqGrid_serve').setCell(serviceRid,'newGoodsId',goodsData.id);
								$('#jqGrid_serve').setCell(serviceRid,'newGoodsColor',goodsData.color);
								$('#jqGrid_serve').setCell(serviceRid,'newGoodsModel',goodsData.models);
							}
						},
						{
							type:'blur',
							fn:function(e){
								var goodsRowId=$(this).val();
								var serviceRid=$(this).parents('tr').attr('id');
								var goodsData=$('#jqGrid_swapOut').getRowData(goodsRowId);
								$('#jqGrid_serve').setCell(serviceRid,'newImei',goodsData.imei);
								$('#jqGrid_serve').setCell(serviceRid,'newImeiId',goodsData.imeiId);
								$('#jqGrid_serve').setCell(serviceRid,'newGoodsId',goodsData.id);
								$('#jqGrid_serve').setCell(serviceRid,'newGoodsColor',goodsData.color);
								$('#jqGrid_serve').setCell(serviceRid,'newGoodsModel',goodsData.models);
							}
						}]
					}},
					{name:'newImei',index:'newImei',width:100,align:'center',sort:false},
					{name:'newImeiId',index:'newImeiId',hidden:true},
					{name:'setPrice',index:'setPrice',width:100,align:'center',sort:false},
					{name:'feeScale',index:'feeScale',width:100,align:'center',sort:false},
					{name:'receive',index:'receive',width:100,align:'center',sort:false,editable:false,edittype:'text'},
					{name:'remark',index:'remark',width:100,align:'center',sort:false},
					{name:'serviceDue',index:'serviceDue',width:100,align:'center',sort:false,hidden:true},
					{name:'enableTimes',index:'enableTimes',width:100,align:'center',sort:false,hidden:true},
					{name:'newGoodsId',index:'newGoodsId',width:100,align:'center',sort:false,hidden:true},
					{name:'newGoodsColor',index:'newGoodsColor',width:100,align:'center',sort:false,hidden:true},
					{name:'newGoodsModel',index:'newGoodsModel',width:100,align:'center',sort:false,hidden:true}
		        ],
		sortable:false,			            
		rownumbers:true,
		cellsubmit: 'clientArray',//单元格保存内容的位置		
		editurl: 'clientArray',
		viewrecords: true,		           
		cellEdit:true,
		multiselect:false,
		height: $(window).height()*0.30,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow:false, //设置表格显示表脚
		formatCell:function(rowid, cellname, value, iRow, iCol){
			var data=$('#jqGrid_serve').getRowData(rowid);
			if(data.exchangeType=='更换'){
				var obj={};
				if(iCol==18){
					$('#jqGrid_swapOut .jqgrid-rownum').each(function(){
						var rowId=$(this).parent('tr').attr('id');
						var goodsImei=$('#jqGrid_swapOut').getRowData(rowId).imei;
						if(data.ifIm==1||$('#cardId').val()==''){
							if(goodsImei){
								obj[rowId]=$(this).html();
							}
						}else{
							obj[rowId]=$(this).html();
						}
						
					})
				delete $('#jqGrid_serve').getColProp('relateNum').editoptions.value;
				$('#jqGrid_serve').setColProp('relateNum',{editoptions:{value:obj}});
			
				}
			}
		},
		loadComplete:function(){
			var ids = $('#jqGrid_serve').jqGrid('getDataIDs');
			if(ids.length < 1){
				$('#jqGrid_serve').jqGrid('addRowData', 1, {}, 'last' );
			}
		},
		gridComplete:function(){
			
		},
		beforeEditCell:function(rId,colName,value,irow,icol){
			globalServiceRow=irow;
			globalServiceCol=icol;
		},
		onCellSelect:function(rowid,iCol,cellcontent,e){
			var data=$('#jqGrid_serve').getRowData(rowid);
			switch(data.exchangeType){
			case '更换':
				$('#jqGrid_serve').setColProp('mortgage',{editable:true});
				$('#jqGrid_serve').setColProp('newServiceName',{editable:true});
				$('#jqGrid_serve').setColProp('receive',{editable:true});
				$('#jqGrid_serve').setColProp('relateNum',{editable:true});
				break;
			case '不变':
				$('#jqGrid_serve').setColProp('mortgage',{editable:false});
				$('#jqGrid_serve').setColProp('newServiceName',{editable:false});
				$('#jqGrid_serve').setColProp('receive',{editable:false});
				$('#jqGrid_serve').setColProp('relateNum',{editable:false});
				break;
			case '退款':
				$('#jqGrid_serve').setColProp('mortgage',{editable:true});
				$('#jqGrid_serve').setColProp('newServiceName',{editable:false});
				$('#jqGrid_serve').setColProp('receive',{editable:false});
				$('#jqGrid_serve').setColProp('relateNum',{editable:true});
				break;
			}
		}
	})
}
/**
 * 增值服务移除
 */
$(document).on('click','.deleAddService',function(){
	var rowId=$(this).data('rid');
	var gid=$(this).data('gid');
	if($('#'+gid+' tr').length==2){
		$.zxsaas_plus.showalert('提示','至少保留一行！！！')
	}else{
		$.zxsaas_plus.showconfirm('提示','确定删除吗？？',function(){
			$('#'+gid).delRowData(rowId);
		})
		
	}
})
/**
 * 门店营业员初始化
 */
function loadSectionAndEmployee(){
    $.request({
        type: 'get',
        url: basePath + '/department/interfaceDeptAndEmp',
        async:false,
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
    		var curSectionId = data.data.curSectionId;
    		// 门店
	    	$("#sectionId option").remove();
    		$(data.data.sectionList).each(function(index,item){
    			if(item.id == curSectionId){
    				$("#sectionId").append("<option value='" + item.id + "' selected>" + item.name + "</opion>");
    			}else{
    				$("#sectionId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
    			}
    		});
    		sectionId=$('#sectionId').val();
    		//PromotionSchemeRequest();//门店加载，促销方案加载
    		// 营业员
    		$("#employees option").remove();
    		$(data.data.empList).each(function(index,item){
    			$("#employees").append("<option value='" + item.id + "'>" + item.name + "</opion>");
    		});
        },
        error: function () {
            alert("可使用部门和营业员加载失败！");
        }
    });
}
/**
 * 门店切换后，对应的营业员发生变化
 */
$(document).on('change','#sectionId',function(){
	sectionId=$(this).val();
	 $.request({
        type: 'get',
        url: basePath + '/aboutPeople/interfaceSelfCompanyEmployees',
        data: {
    		sectionId : $(this).val()
    	},
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
    		// 营业员
    		$("#employees option").remove();
    		$(data.data.empList).each(function(index,item){
    			$("#employees").append("<option value='" + item.id + "'>" + item.name + "</opion>");
    		});
        },
        error: function () {
            alert("营业员加载失败！");
        }
    });
});
$('#sectionId').change(function(){
	$('.clearData').val('');
	$('#jqGrid_SubjectBalance').clearGridData();
	$('#jqGrid_swapOut').clearGridData();
	$('#jqGrid_serve').clearGridData();
	$('#jqGrid_SubjectBalance').addRowData('1',{},'last');
	$('#jqGrid_swapOut').addRowData('1',{},'last');
	$('#jqGrid_serve').addRowData('1',{},'last');
})
/**
 * 输入框的ctrl+alt切换
 */	
$('#searchInput').keyup(function(e){
	if(e.ctrlKey&&e.keyCode==18){
		if($('.tip').data('searchflag')==1){
			$('.tip').data('searchflag','2')
			$('.tip').html('请录入串号信息');
			return;
		}else{
			$('.tip').data('searchflag','1')//会员
			$('.tip').html('请录入会员卡号或手机号、微信号、支付宝账号');
			return;
		}
	}else if(e.keyCode==13){
		if($('.tip').data('searchflag')==1){
			$('#myModal_rb_MQR').modal('show');
			$.request({
    			url:basePath+'/retail/refund/searchCustomerVoList',
    			type:'get',
    			dataType:'json',
    			data:{
	    			queryKey:$(this).val()
	    		},
    			success:function(data){
	    			var rb_MQR=data.data.customerVoList;
	        		var html;
	        		if(rb_MQR.length==0){
	        			$("#rb_MQR tbody").html('')
	        		}else{
	        			$.each(rb_MQR,function(i,val){
	        				var tempVal=JSON.stringify(val);
	            			html+='<tr data-message='+tempVal+'><td><a class="rb_MQR_choose" href="javascript:void(0)">选择</a></td>'+
	                        '<td>'+val.cardNum+'</td>'+
	                        '<td>'+val.customerName+'</td>'+
	                        '<td>'+val.customerTel+'</td>'+
	                        '<td>'+val.customerType+'</td>'+
	                        '<td>'+val.contactUnitName+'</td>'+
	                        '<td>'+val.remark+'</td></tr>';
	            		})
	            		$("#rb_MQR tbody").html(html);
	        		}
	    		}
    		})
		}else{
			$('#myModal_rb_MQI').modal('show');
			$.request({
    			type:'post',
    			url:basePath+'/retail/exchange/searchStockGoodsImeiVoList',
    			data:{
    				sectionId:sectionId,
        			queryKey:$(this).val()
        		},
    			dataType:'json',
    			success:function(data){
        			console.log(data)
        			if(data.result==1){
        				var rb_MQI=data.data.stockGoodsImVoList;
                		var html;
                		if(rb_MQI.length==0){
                			$("#rb_MQI tbody").html('')
                		}else{
                			$.each(rb_MQI,function(i,val){
                				html+='<tr><td><a class="rb_MQI_choose" href="javascript:void(0)">选择</a>'+
                					'<input class="rb_MQI_proId" type="hidden" value="'+val.id+'"/>'+
                					'<input class="rb_MQI_imeiId" type="hidden" value="'+val.imeiId+'"/>'+
                					'<input class="rb_MQI_retailPrice" type="hidden" value="'+val.retailPrice+'"/>'+
                					'<input class="rb_MQI_storageId" type="hidden" value="'+val.storageId+'"/>'+
                					'<input class="rb_MQI_ifManageImei" type="hidden" value="'+val.ifManageImei+'"/>'+
                					'<input class="rb_MQI_brandId" type="hidden" value="'+val.brandId+'"/>'+
                					'<input class="rb_MQI_categoryId" type="hidden" value="'+val.categoryId+'"/></td>'+
		                            '<td class="rb_MQI_proCode">'+val.code+'</td>'+
		                            '<td class="rb_MQI_proName">'+val.name+'</td>'+
		                            '<td class="rb_MQI_model">'+val.models+'</td>'+
		                            '<td class="rb_MQI_color">'+val.color+'</td>'+
		                            '<td class="rb_MQI_type">'+val.models+'</td>'+
		                            '<td class="rb_MQI_SerialNum">'+val.imei+'</td>'+
		                            '<td class="rb_MQI_Warehouse">'+val.storageName+'</td></tr>';
                    		})
                    		$("#rb_MQI tbody").html(html)
                		}
        			}else{
        				alert(data.desc)
        			}
        		},
        		error:function(){
        			alert('请求失败')
        		}
    		})
		}
	}
})
$(document).on('click','.rb_MQI_choose',function(){
	var _thisTr=$(this).closest('tr');
	var obj={};
	obj.code=_thisTr.find('.rb_MQI_proCode').text();
	obj.color=_thisTr.find('.rb_MQI_color').text();
	obj.id=_thisTr.find('.rb_MQI_proId').val();
	obj.ifManageImei=_thisTr.find('.rb_MQI_ifManageImei').val();
	obj.imei=_thisTr.find('.rb_MQI_SerialNum').text();
	obj.imeiId=_thisTr.find('.rb_MQI_imeiId').val();
	obj.models=_thisTr.find('.rb_MQI_model').text();
	obj.name=_thisTr.find('.rb_MQI_proName').text();
	obj.retailPrice=_thisTr.find('.rb_MQI_retailPrice').val();
	obj.storageId=_thisTr.find('.rb_MQI_storageId').val();
	obj.storageName=_thisTr.find('.rb_MQI_Warehouse').text();
	obj.goodsNum=1;
	var arr=$("#jqGrid_swapOut").jqGrid('getDataIDs');
	var maxID=Math.max.apply(null,arr);
	for(var i=0; i < arr.length; i++){
		var rowData = $("#jqGrid_swapOut").jqGrid("getRowData",arr[i]);//根据行ID得到行数据
		if(rowData.imeiId==obj.imeiId){
			$.zxsaas_plus.showalert("错误","不允许重复引入!");
			return false;
		}
	}
	$("#jqGrid_swapOut").jqGrid("addRowData",maxID+1,obj,"last");
	$('#myModal_rb_MQI').modal('hide');
})
/**
 * 模态窗点击后的操作
 * 
 */
$(document).on('click','.rb_MQR_choose',function(){
	var $this=$(this),
	    message=$this.parents('tr').data('message');
	$('.getMessage').each(function(index,item){
		$(this).val(message[$(this).attr('id')]);
	})
	$('#memberMessage').val(JSON.stringify($(this).parents('tr').data('message')));
	$('#myModal_rb_MQR').modal('hide');
	$('#customerName,#customerTel').prop('disabled',true);
	$('#addAdminForm').bootstrapValidator('resetForm', false);//为true时清空表单内容
	$('#addAdminForm').data('bootstrapValidator').validate();
    if (!$('#addAdminForm').data('bootstrapValidator').isValid()) {
        return;
    }
})
/**
 * 原单引入事件
 */
$(document).on('click','#billBtn',function(){
//	if(!$('#cardId').val()){
//		$.zxsaas_plus.showalert("错误","请选中会员后再引入原单!");
//		return;
//	}
	$('#billImport').modal('show');
	$('#billGrid').setGridParam({
		url:basePath+'/retail/exchange/searchSoldGoodsVoList',
		datatype: "json",
		postData:{
		memberId:$('#cardId').val(),
		sectionId:$('#sectionId option:selected').val()
		}
	}).trigger("reloadGrid");
})
/**
 * 原单引入的快速过滤
 */
$('#fastFilter').keyup(function(e){
	if(e.keyCode==13){
		$('#billGrid').setGridParam({
			url:basePath+'/retail/exchange/searchSoldGoodsVoList',
			datatype: "json",
			postData:{
			memberId:$('#cardId').val(),
			sectionId:$('#sectionId option:selected').val(),
			queryKey:$(this).val()
			}
		}).trigger("reloadGrid");
	}
})

/**
 * 原单引入的确定控件
 */
$('#billSure').click(function(){
	var ids=$('#billGrid').jqGrid('getGridParam','selarrrow');
	if(ids.length==0){
		$.zxsaas_plus.showalert("错误","未勾选!");
		return false
	}else{
		var myServiceIdList=$('#jqGrid_serve').getDataIDs();
		$.each(function(index,item){
			if(!$('#jqGrid_serve').getRowData(item).serviceInstanceId){
				$('#jqGrid_serve').delRowData(item);
			}
		})
		var arr=[];
		var dataList=[];
		var retailMainIdList=$("#jqGrid_SubjectBalance").jqGrid('getCol','retailMainId');
		var retailDetailIdListTemp=$("#jqGrid_SubjectBalance").jqGrid('getCol','retailDetailId');
		var retailDetailIdList=retailDetailIdListTemp.filter_(function(item,index){
			return item!='';
		})
		var tempRetailMainId=$('#billGrid').jqGrid('getRowData',ids[0])['retailMainId'];
		var retailMainIdListTemp=[];
		var IDs=$("#jqGrid_SubjectBalance").jqGrid("getDataIDs");//获取行ID数组
		$.each(retailMainIdList,function(index,item){
			if(item!=0){
				retailMainIdListTemp.push(item);
			}
		})
		
		if(retailMainIdListTemp.length!=0&&retailMainIdList.indexOf(tempRetailMainId)==-1){
			$.zxsaas_plus.showalert("错误","请引入单据号相同的商品!");
			return 
		}else{
			$('#customerName').val($('#billGrid').jqGrid('getRowData',ids[0])['customerName']);
			$('#customerTel').val($('#billGrid').jqGrid('getRowData',ids[0])['customerTel']);
		}
		for(var i=0; i < IDs.length; i++){
			var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData",IDs[i]);//根据行ID得到行数据
			if($('#billGrid').jqGrid('getRowData',ids[0])['retailDetailId']==rowData['retailDetailId']){
				$.zxsaas_plus.showalert("错误","不允许重复引入!");
				return false;
			}
		}
		for(var i=0,len=ids.length;i<len;i++){
			arr.push($('#billGrid').jqGrid('getCell',ids[i],'retailDetailId'));
			dataList.push($('#billGrid').jqGrid('getRowData',ids[i]));
		}
		for(var a=0,len=arr.length;a<len;a++){
			if(retailDetailIdList.indexOf(arr[a])!=-1){
				$.zxsaas_plus.showalert("错误","请引入不同的商品!");
				return;
			}
		}
		$("#jqGrid_serve").jqGrid("clearGridData");
		for(var j=0,tempLen=arr.length;j<tempLen;j++){
			$.request({
				url:basePath+'/retail/exchange/loadSoldGoodsDetailVo',
				type:'post',
				async:false,
				data:{
					retailDetailId:arr[j]*1,
					sectionId:$('#sectionId option:selected').val()
				},
				success:function(data){
					var thridTicketTotal=0;
					for(var k in data.data.soldGoodsDetail){
						dataList[j][k]=data.data.soldGoodsDetail[k];
					}
					$.each(data.data.thridTicketVoList,function(index,item){
						thridTicketTotal+=item.amount;
					})
					dataList[j]['thridTicketVoList']=JSON.stringify(data.data.thridTicketVoList);
					dataList[j]['thridTicketTotal']=thridTicketTotal;
					dataList[j]['oldRetailId']=dataList[j]['retailMainId'];
					dataList[j]['ifImport']='1';
					dataList[j]['maxNum']=dataList[j]['goodsNum'];
				}
			})
			
			serviceDraw($('#sectionId option:selected').val(),$('#cardId').val(),arr[j]);
		}
		
		for(var t=0,mainLen=dataList.length;t<mainLen;t++){
			var arr=$("#jqGrid_SubjectBalance").jqGrid('getDataIDs');
			var maxID=Math.max.apply(null,arr);
			$("#jqGrid_SubjectBalance").jqGrid("addRowData",maxID+1,dataList[t],"last");
		}
		$('#billImport').modal('hide');
	}
})	
/**
 * 原单引入确定点击后增值服务表格
 */
function serviceDraw(sectionId,memberId,retailDetailId){
	var serviceIdListTemp=$('#jqGrid_serve').getCol('serviceInstanceId');
	var serviceIdList=serviceIdListTemp.filter(function(item,index){
		return item!='';
	})
	$.request({
		url:basePath+'/retail/exchange/searchRefAddServiceVoList',
		type:'post',
		dataType:'json',
		async:false,
		data:{
			sectionId:sectionId,
			memberId:memberId,
			retailDetailId:retailDetailId
		},
		success:function(data){
			var goodsAddServiceVoList=data.data.goodsAddServiceVoList;
			var getIdList=$.map(goodsAddServiceVoList,function(item,index){
				return item.serviceInstanceId;
			})
			for(var k=0,len=getIdList.length;k<len;k++){
				if(serviceIdList.indexOf(getIdList[k].toString())!=-1){
					$.zxsaas_plus.showalert('提示','该增值服务已展示！！');
					return;
				}
			}
			$.each(goodsAddServiceVoList,function(index,item){
				var serviceListId=$('#jqGrid_serve').jqGrid('getDataIDs');
				var maxserviceId=serviceListId.length==0?0:Math.max.apply(null,serviceListId);
				$("#jqGrid_serve").jqGrid("addRowData",maxserviceId+1,goodsAddServiceVoList[index],"last");
			})
		}
	})
}
//原单抹零
$('#billsTozero').keyup(function(){
	var reg=/[1-9]{1,}\d*/;
	if(!reg.test($(this).val())){
		$.zxsaas_plus.showalert('提示','请输入合法数字！！！')
	}
})
//收款结算
$('#settleBtn').click(function () {
	$('#addAdminForm').bootstrapValidator('resetForm', false);//为true时清空表单内容
	$('#addAdminForm').data('bootstrapValidator').validate();
    if (!$('#addAdminForm').data('bootstrapValidator').isValid()) {
        return;
    }else{
    	if(isView){
    		console.log(collectionDetails);
    		var posTotal=0;//pos总金额
    		$('#myModal_settle').modal('show');
    		$('#table_settle input,#table_pos input').val('');
    		$('#deductionRemark').prop('disabled',true);
    		$('#settle_sure').prop('disabled',true);
    		$('#settle_receivable').html($('#paySettlement').val());
    		$.request({
				type: 'Post',
				url: basePath + '/retail/deposit/findAccountList',
				data: {
					sectionId : $("#sectionId").val()
				},
				dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
				success: function (data) {
					var res=data.data.accountList;
					var _html;
					for(var i=0;i<res.length;i++){
						if(res[i].accountType==2){
							_html+='<tr><td>'+res[i].accountName+'</td><td><input class="posAccount" type="text" value="" disabled><input class="posAccountId" type="hidden" value="'+res[i].accountId+'"><input class="posAccountType" type="hidden" value="'+res[i].accountType+'"></td></tr>'
						}else{
							html='';
						}
					}
					$('#table_pos tbody').html(_html);
				},
				error: function () {
					alert("资金账户加载失败！");
				}
			});
    		$.each(collectionDetails,function(i,val){
    			if(val.remark==null){
    				val.remark=''
    			}
    			switch(val.accountType){
    			case '1':
    				$('#cash').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '2':
    				posTotal+=Number(val.amount)
    				$('#pos').val(posTotal);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '3':
    				$('#alipay').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '4':
    				$('#weixin').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '5':
    				$('#coupons').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '6':
    				$('#memberAmount').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			case '7':
    				$('#deductionMoney').val(val.amount);
    				$('#deductionRemark').val(val.remark);
    				break;
    			}
    		})
    		thisTimesettleTotal()
    		//POS机
    		$('#pos').focus(function () {
	            $("#myModal_pos").modal('show');
	            $.each(collectionDetails,function(i,val){
	            	if(val.accountType==2){
	            		$('.posAccountId').each(function(j,value){
	            			if(val.accountId==$(this).val()){
	            				$(this).closest('tr').find('.posAccount').val(val.amount)
	            			}
	    				})
	            	}
	            })
	        });
	        //促销券
	        var coupons=$('#coupons');
	        coupons.focus(function () {
	            $("#myModal_coupons").modal('show');
	        });
    	}else{
    		var hasGoods=false;
        	var IDs=$("#jqGrid_SubjectBalance").jqGrid("getDataIDs");//获取行ID数组
        	for(var i=0; i < IDs.length; i++){
        		var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData",IDs[i]);//根据行ID得到行数据
        		if(rowData["goodsId"]!=''){
        			hasGoods=true
        		}
        	}
        	if(!hasGoods){
        		$.zxsaas_plus.showalert('提示','没有换入商品!!!');
        		return false;
        	}else{
        		if(!checkGoodsValue()){
        			return false;
        		}
        		if(!checkAddservice()){
        			return false;
        		}
        		if(globalServiceRow!=undefined){
        			$('#jqGrid_serve').saveCell(globalServiceRow,globalServiceCol)
        		};
        		var inTotal=$("#jqGrid_SubjectBalance").jqGrid('footerData','get')['amount'].replace(/\,/g,'');
        		var outTotal=$('#jqGrid_swapOut').jqGrid('footerData','get')['afterMoney'].replace(/\,/g,'');
        		if(outTotal=="&nbsp;"){
        			$.zxsaas_plus.showalert('提示','请填写换出金额!!!');
        			return false;
        		}
        		var serviceTotal=0;
        		var serViceIdsList=$('#jqGrid_serve').getDataIDs();
        		$.each(serViceIdsList,function(index,item){
        			var item=$('#jqGrid_serve').getRowData(item);
        			if(item.exchangeType=='更换'){
        				serviceTotal+=item.receive*1;
        			}
        			if(item.exchangeType=='退款'){
        				serviceTotal-=item.mortgage*1;
        			}
        		})
        		var goodsTotal=outTotal-inTotal;
        		if(goodsTotal>0){
        			$('#goodsPayTotal').prev('label').html('商品应收');
        		}else{
        			$('#goodsPayTotal').prev('label').html('商品应付');
        		}
        		if(serviceTotal<0){
        			$('#addServiceTotal').prev('label').html('增值服务应付');
        			$('#addServiceTotal').attr('custom','serviceYfAmount');
        		}else{
        			$('#addServiceTotal').prev('label').html('增值服务应收');
        			$('#addServiceTotal').attr('custom','serviceYsAmount')
        		}
        		if(goodsTotal*1+serviceTotal*1>0){
        			$('#payTotal').prev('label').html('应收合计');
        			$('#paySettlement').prev('label').html('收款结算');
        			$('#mainUnpaid').prev('label').html('未收金额');
        			$('#payTotal').attr('custom','totalYsAmount');
        			$('#paySettlement').attr('custom','ssAmount');
        			$('#mainUnpaid').attr('custom','wsAmount');
        		}else{
        			$('#payTotal').prev('label').html('应付合计');
        			$('#paySettlement').prev('label').html('付款结算')
        			$('#mainUnpaid').prev('label').html('未付金额');
        			$('#payTotal').attr('custom','totalYfAmount');
        			$('#paySettlement').attr('custom','sfAmount');
        			$('#mainUnpaid').attr('custom','wfAmount');
        		}
        		$('#goodsPayTotal').val(Math.abs(goodsTotal));
        		$('#addServiceTotal').val(Math.abs(serviceTotal));
        		$('#payTotal').val(Math.abs(goodsTotal+serviceTotal)-Number($('#billsTozero').val()));
        		
        	    $('#myModal_settle').modal('show');
        	    $('#settle_receivable').html($('#payTotal').val());
        	    $('#settle_balance').html($('#payTotal').val())
        	    if($('#memberMessage').val()){
	        	    var memberMessage=JSON.parse($('#memberMessage').val());
	        	    $('#settle_availableIntegral').html(memberMessage.customerScore);
	        	    $('#settle_storedValue').html(memberMessage.customerAmount);
	        	    $('#arrivalStandard span:eq(0)').html(memberMessage.dScore);
	        	    $('#arrivalStandard span:eq(1)').html(memberMessage.dAmount)
	        	    $('#settle_thisTime').html(0);
        	    }
        	    if($('#payTotal').attr('custom')=='totalYfAmount'){
        	    	$('#settle_title1').html('应付金额：');
        	    	$('#settle_title2').html('；应付余额：')
        	    }else{
        	    	$('#settle_title1').html('应收金额：');
        	    	$('#settle_title2').html('；应收余额：')
        	    }
        	    $.request({
        	    	url:basePath+'/retail/exchange/findAccountList',
        	    	type:'get',
        	    	dataType:'json',
        	    	data:{
        		    	sectionId:$('#sectionId option:selected').val()
        		    },
        	        success:function(data){
        				$('#cash,#pos,#alipay,#weixin,#coupons,#memberAmount,#deductionMoney,#deductionScore').val('').prop('disabled',true);
        				var res=data.data.accountList;
        				var _html;
        				
        				for(var i=0;i<res.length;i++){
        					if(res[i].accountType==1){
        						$('#cash').prop('disabled',false);
        						$('#cash').data('accountid',res[i].accountId);
        					}else if(res[i].accountType==2){
        						_html+='<tr><td>'+res[i].accountName+'</td><td><input class="posAccount payMethods" type="text" value=""><input class="posAccountId" type="hidden" value="'+res[i].accountId+'"></td></tr>'
        						$('#pos').prop('disabled',false)
        					}else if(res[i].accountType==3){
        						$('#alipay').prop('disabled',false);
        						$('#alipay').data('accountid',res[i].accountId);
        					}else if(res[i].accountType==4){
        						$('#weixin').prop('disabled',false);
        						$('#weixin').data('accountid',res[i].accountId);
        					}else if(res[i].accountType==5){
        						$('#coupons').prop('disabled',false);
        						$('#coupons').data('accountid',res[i].accountId);
        					}else if(res[i].accountType==6&&$('#cardId').val()!=''){
        						$('#memberAmount').prop('disabled',false);
        						$('#memberAmount').data('accountid',res[i].accountId);
        					}else if(res[i].accountType==7&&$('#cardId').val()!=''){
        						$('#deductionMoney').data('accountid',res[i].accountId);
        						$('#deductionMoney').prop('disabled',false);
        						$('#deductionScore').prop('disabled',false)
        					}
        				}
        				$('#table_pos tbody').html(_html);
        		    }
        	    })
        	}
    	}
    }
});
//POS机
$('#pos').focus(function () {
    $("#myModal_pos").modal('show');
});
//促销券
$('#coupons').focus(function () {
    $("#myModal_coupons").modal('show');
});
function thisTimesettleTotal(){//结算框计算
	var  STol=Number($('#cash').val())+Number($('#pos').val())+Number($('#alipay').val())+Number($('#weixin').val())+Number($('#coupons').val())+Number($('#memberAmount').val())+Number($('#deductionMoney').val());
	$('#settle_thisTime').html(Math.round(STol*100)/100);
	$('#settle_balance').html(Math.round((Number($('#settle_receivable').html())-Number($('#settle_thisTime').html()))*100)/100);//应收余额
}

//删除一行
$(document).on('click', '.trashIn,.trashOut',function(e){
	var thisTitle = $(this).attr("title");
	var rowId = $(this).parent().data('id');
	var parentsTable=$(this).parents('table');
	if(thisTitle == "删除行"){
		if(parentsTable.find('tbody tr').length === 2) {
			$.zxsaas_plus.showalert("错误","至少保留一条数据!")
			return false;
		}
		$(this).hasClass('trashOut')&&$.zxsaas_plus.showconfirm("","是否确定删除本行(删除本行后需充值关联序号)?",function(){
			var flag=false;
			parentsTable.jqGrid('delRowData', rowId);
			var serviceIdsList=$('#jqGrid_serve').getDataIDs();
			$.each(serviceIdsList,function(index,item){
				if($("#jqGrid_serve").getRowData(item).exchangeType=='更换'){
					flag=true;
				}
			})
			if(flag){
				$.each(serviceIdsList,function(index,item){
					$("#jqGrid_serve").setCell(item,"relateNum"," ");
					$("#jqGrid_serve").setCell(item,"newImei"," ");
				})
			}
		},function(){
		});
		$(this).hasClass('trashIn')&&$(this).parents("table").delRowData(rowId);
	}
});
/**
 * 结算输入金额时
 */
$(document).on('keyup','.payMethods',function(){
	var totalPay=0;
	var settleReceivable=$('#settle_receivable').html();
	if($(this).attr('id')=='deductionMoney'){
		var scale=$('#arrivalStandard span:eq(0)').html()/$('#arrivalStandard span:eq(1)').html();
		if($(this).val()*scale<Number($('#settle_availableIntegral').html())||$('#settle_title1').html()=='应付金额：'){
			$('#deductionScore').val($(this).val()*scale);
		}else{
			$(this).val(0);
			$('#deductionScore').val(0);
		}
	}
	if($(this).attr('id')==='memberAmount'){
		if($(this).val()>$('#settle_storedValue').html()&&$('#settle_title1').html()=='应收金额：'){
			$(this).val(0);
		}
	}
	$('.payMethods').each(function(index,item){
			totalPay+=Number($(item).val());
	})
	$('#settle_thisTime').html(totalPay);
	$('#settle_balance').html(settleReceivable-totalPay);
	
})
/**
 * 输入积分时的情况
 */
$('#deductionScore').keyup(function(){
	var settleReceivable=$('#settle_receivable').html();
	var scale=$('#arrivalStandard span:eq(0)').html()/$('#arrivalStandard span:eq(1)').html();
	var totalPay=0;
	var max=Math.floor($('#settle_availableIntegral').html()/scale);
	if($(this).val()*1<$('#settle_availableIntegral').html()*1||$('#settle_title1').html()=='应付金额：'){
		var total=Math.round($(this).val()/scale);
		$('#deductionMoney').val(total);
	}else{
		$(this).val(max*scale);
		$('#deductionMoney').val(max);
	}
	$('.payMethods').each(function(index,item){
		totalPay+=Number($(item).val());
	})
	$('#settle_thisTime').html(totalPay);
	$('#settle_balance').html(settleReceivable-totalPay);
})
/**
 * 输入积分失焦
 */
$('#deductionScore').blur(function(){
	var scale=$('#arrivalStandard span:eq(0)').html()/$('#arrivalStandard span:eq(1)').html();
	var settleReceivable=$('#settle_receivable').html();
	var totalPay=0;
	var inputVal=$(this).val()*1;
	if(inputVal%scale){
		var num=Math.floor(inputVal/scale);
		$(this).val(num*scale);
		$('#deductionMoney').val(num);
	}
	$('.payMethods').each(function(index,item){
		totalPay+=Number($(item).val());
	})
	$('#settle_thisTime').html(totalPay);
	$('#settle_balance').html(settleReceivable-totalPay);
})
/**
 * pos机的确认
 */
$(document).on('click','.posSure',function(){
	var posTotal=0;
	$('.posAccount').each(function(item){
		posTotal+=Number($(this).val());
	})
	$('#pos').val(posTotal);
})
/**
 * 结算确认
 */
$('#settle_sure').click(function(){
	//付款结束后赋值
	$('#paySettlement').val($('#settle_thisTime').html());
	$('#mainUnpaid').val($('#settle_balance').html());
	//数据收集
	var param=getParam();
	$.request({
		url:basePath+'/retail/exchange/saveOrder',
		type:'post',
		dataType:'json',
		data:{jsonData:JSON.stringify(param)},
		success:function(data){
			if(data.result==-999){
				$.zxsaas_plus.showalert('提示',data.desc);
			}
			if(data.result==1){
				$.zxsaas_plus.showconfirmsure('提示','保存成功！！！',function(){
					window.location.href=basePath+'/retail/exchange/retailExchangeMain';
				});
			}
		}
	})
})
/**
 * 数据收集
 */
function getParam(){
	var obj={};
	obj.sectionId=$('#sectionId').val();
	obj.salesmanId=$('#employees').val();
	obj.billsDate=$('#datetimepickerStart').val();
	obj.customName=$('#customerName').val();
	obj.memberId=$('#cardId').val();
	obj.telephone=$('#customerTel').val();
	obj.billsTozero=$('#billsTozero').val();
	obj.billsAmount=$('#payTotal').val()*1;
	$('.moneyTotal').each(function(index,item){
		obj[$(this).attr('custom')]=$(this).val();
	})
	obj.remark=$('#mainRemark').val();
	//收集换出的信息
	var outGoodsIdList=$('#jqGrid_swapOut').jqGrid('getDataIDs');
	var outGoodsListTemp=$.map(outGoodsIdList,function(item,index){
		var outGoodsObj=$('#jqGrid_swapOut').jqGrid('getRowData',item);
		if(outGoodsObj.id!=''&&outGoodsObj.id!=null){
			delete outGoodsObj.afterMoney;
			delete outGoodsObj.attrs;
			delete outGoodsObj.color;
			delete outGoodsObj.deliveryDo;
			delete outGoodsObj.models;
			delete outGoodsObj.storageName;
			delete outGoodsObj.name;
			outGoodsObj.price=outGoodsObj.retailPrice;
			outGoodsObj.amount=outGoodsObj.price*outGoodsObj.goodsNum;
			outGoodsObj.auxiliaryImei='';
			outGoodsObj.goodsId=outGoodsObj.id;
			delete outGoodsObj.retailPrice;
			delete outGoodsObj.id;
			outGoodsObj.imei=outGoodsObj.imeiId;
			return outGoodsObj;
		}
	});
	var outGoodsList=outGoodsListTemp.filter(function(item,index){
		return item.id!="";
	})
	obj.outGoodsList=outGoodsList;
	var inGoodsIdList=$('#jqGrid_SubjectBalance').jqGrid('getDataIDs');
	var inGoodsListTemp=$.map(inGoodsIdList,function(item,index){
		var inGoodsObj=$('#jqGrid_SubjectBalance').jqGrid('getRowData',item);
		delete inGoodsObj.attrs;
		delete inGoodsObj.billsCode;
		delete inGoodsObj.bizName;
		delete inGoodsObj.color;
		delete inGoodsObj.deliveryDo;
		delete inGoodsObj.id;
		delete inGoodsObj.name;
		delete inGoodsObj.ifManageImei;
		delete inGoodsObj.models;
		delete inGoodsObj.storageName;
		delete inGoodsObj.thridTicketTotal;
		delete inGoodsObj.thridTicketVoList;
		delete inGoodsObj.oldAmount;
		delete inGoodsObj.maxNum;
		delete inGoodsObj.ifImport;
		inGoodsObj.price=inGoodsObj.oldPrice;
		delete inGoodsObj.oldPrice;
		inGoodsObj.auxiliaryImei="";
		inGoodsObj.imei=inGoodsObj.imeiId;
		return inGoodsObj;
	});
	var inGoodsList=inGoodsListTemp.filter_(function(item,index){
		return item.goodsId!='';
	})
	obj.inGoodsList=inGoodsList;
	obj.payList=[];
	$('#cash,#pos,#alipay,#weixin,#coupons,#memberAmount,#deductionMoney').each(function(index,item){
		var payModeobj={};
		if(!$(this).prop('disabled')){
			switch($(this).attr('id')){
			    case 'cash':
			    	payModeobj.accountType=1;
			    	payModeobj.payreceiptAmout=$(this).val();
			    	payModeobj.accountId=$(this).data('accountid');
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&$(this).val()!=0&&obj.payList.push(payModeobj)
			    	break;
			    case 'pos':
		    		var posList=[];
			    	$('.posAccount').each(function(posIndex,posItem){
			    		var posObj={};
			    		posObj.accountType=2;
			    		posObj.accountId=$(this).next('.posAccountId').val();
			    		posObj.payreceiptAmout=$(this).val();
			    		posObj.remark=$('#deductionRemark').val();
			    		$(this).val()&&$(this).val()!=0&&posList.push(posObj);
			    	})
			    	payModeobj.posList=posList;
			    	posList.length&&obj.payList.push(payModeobj)
			    	break;
			    case 'alipay':
			    	payModeobj.accountType=3;
			    	payModeobj.payreceiptAmout=$(this).val();
			    	payModeobj.accountId=$(this).data('accountid');
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&$(this).val()!=0&&obj.payList.push(payModeobj)
			    	break;
			    case 'weixin':
			    	payModeobj.accountType=4;
			    	payModeobj.payreceiptAmout=$(this).val();
			    	payModeobj.accountId=$(this).data('accountid');
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&$(this).val()!=0&&obj.payList.push(payModeobj)
			    	break;
			    case 'coupons':
			    	payModeobj.accountType=5;
			    	payModeobj.payreceiptAmout=$(this).val();
			    	payModeobj.accountId=$(this).data('accountid');
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&$(this).val()!=0&&obj.payList.push(payModeobj);
			    	break;
			    case 'memberAmount':
			    	payModeobj.accountType=6;
			    	payModeobj.payreceiptAmout=$(this).val();
			    	payModeobj.accountId=$(this).data('accountid');
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&$(this).val()!=0&&obj.payList.push(payModeobj)
			    	break;
			    case 'deductionMoney':
			    	payModeobj.accountType=7;
			    	payModeobj.payreceiptAmout=$(this).val();
			    	payModeobj.accountId=$(this).data('accountid');
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&$(this).val()!=0&&obj.payList.push(payModeobj)
			    	break;
			}
		}
	})
	var serviceIdList=$('#jqGrid_serve').getDataIDs();
	var retailServiceChangeList=[];
	if(serviceIdList.length==1&&$('#jqGrid_serve').getRowData(serviceIdList[0]).serviceInstanceId==""){
		
	}else{
		$.each(serviceIdList,function(index,item){
			var serviceObj={};
			item=$('#jqGrid_serve').getRowData(item);
			switch(item.exchangeType){
			case '不变':
				serviceObj.exchangeType=1;
				serviceObj.oldService={};
				serviceObj.oldService.oldInstanceId=item.serviceInstanceId;
				serviceObj.oldService.serviceId=item.serviceId
				serviceObj.oldService.cardNo=item.cardNum;
				serviceObj.oldService.goodsId=item.goodsId;
				serviceObj.oldService.imei=item.imeiId;
				serviceObj.oldService.color=item.goodsColor;
				serviceObj.oldService.model=item.goodsModel;
				break;
			case '更换':
				serviceObj.exchangeType=2;
				serviceObj.oldService={};
				serviceObj.newService={};
				/*旧增值服务*/
				serviceObj.oldService.oldInstanceId=item.serviceInstanceId;
				serviceObj.oldService.serviceId=item.serviceId
				serviceObj.oldService.cardNo=item.cardNum;
				serviceObj.oldService.goodsId=item.goodsId;
				serviceObj.oldService.imei=item.imeiId;
//				serviceObj.oldService.imeiId=item.imeiId;
				serviceObj.oldService.color=item.goodsColor;
				serviceObj.oldService.model=item.goodsModel;
				serviceObj.oldService.actualAmount=item.mortgage;
				/*新增值服务*/
				serviceObj.newService.serviceId=item.id;
				serviceObj.newService.cardNo=item.cardNum;
				serviceObj.newService.goodsId=item.newGoodsId;
				serviceObj.newService.imei=item.newImeiId;
//				serviceObj.newService.imeiId=item.newImeiId;
				serviceObj.newService.color=item.newGoodsColor;
				serviceObj.newService.model=item.newGoodsModel;
				serviceObj.newService.presetPrice=item.setPrice;
				serviceObj.newService.memberPrice=item.feeScale;
				serviceObj.newService.serviceDue=item.serviceDue;
				serviceObj.newService.enableTimes=item.enableTimes;
				serviceObj.newService.actualAmount=item.receive*1+item.mortgage*1;
				serviceObj.newService.remark=item.remark;
				break;
			case '退款':
				serviceObj.exchangeType=3;
				serviceObj.oldService={};
				serviceObj.oldService.oldInstanceId=item.serviceInstanceId;
				serviceObj.oldService.serviceId=item.serviceId
				serviceObj.oldService.cardNo=item.cardNum;
				serviceObj.oldService.goodsId=item.goodsId;
				serviceObj.oldService.imei=item.imeiId;
				serviceObj.oldService.color=item.goodsColor;
				serviceObj.oldService.model=item.goodsModel;
				serviceObj.oldService.actualAmount=item.mortgage;
				break;
			}
			retailServiceChangeList.push(serviceObj);
		})
	}
	obj.retailServiceChangeList=retailServiceChangeList;
	return obj;
}
//array的filter方法
Array.prototype.filter_=function(callBack){
	var tempArr=[];
	for(var i=0,len=this.length;i<len;i++){
		callBack(this[i],i,this)&&tempArr.push(this[i]);
	}
	return tempArr;
}	
	
/**
 * 验证
 */
function checkGoodsValue(){
	var ridList=$('#jqGrid_SubjectBalance').getDataIDs();
	for(var i=0,len=ridList.length;i<len;i++){
		var rowData=$('#jqGrid_SubjectBalance').getRowData(ridList[i]);
		if(rowData.goodsId!=''){
			if(rowData.storageName==""){
				$.zxsaas_plus.showalert("提示","请填写入库仓库！！");
				return false;
			}
			if(rowData.amount==0){
				$.zxsaas_plus.showalert("提示","请填写退款金额！！");
				return false;
			}
			if(rowData.ifImport==""&&rowData.cost==""){
				$.zxsaas_plus.showalert("提示","请填写入库成本！！");
				return false;
			}
			if(rowData.ifManageImei==1){
				if($.trim(rowData.imeiId)==''||$.trim(rowData.imeiId)==null){
					$.zxsaas_plus.showalert("提示","请填写串号！！");
					return false;
				}
			}
		}
	}
	return true;
}
/**
 * 红冲
 */
$('#revoke').click(function(){
	$('#refId').val()&&$('#billsStatus').val()==6&&$.zxsaas_plus.showconfirm('红冲','<input type="text" class="form-control" id="mistakeDate" placeholder="年-月-日">',function(){
		var billsId=$('#refId').val();
		var redDate=$('#mistakeDate').val();
		$.request({
			url:basePath+"/retail/exchange/redExchangeOrder",
			type:'post',
			dataType:'json',
			data:{billsId:billsId,redDate:redDate},
			success:function(data){
				if(data.billsStatus==7){
					$.zxsaas_plus.showalert("success","红冲成功");
					$('#statusRed').show();
				}else{
					$.zxsaas_plus.showalert("error",data.desc);
				}
			}
		})
	});
	$("#mistakeDate").datetimepicker({
	  lang:"ch",           //语言选择中文
	  format:"Y-m-d",      //格式化日期
	  timepicker:false,    //关闭时间选项
	  todayButton:false,   //关闭选择今天按钮
	  minDate:$('#datetimepickerStart').val()
	});	
})
	
/**
 * 验证增值服务
 */
function checkAddservice(){
	var serviceIdList=$('#jqGrid_serve').getDataIDs();
	for(var i=0,len=serviceIdList.length;i<len;i++){
		var serviceObj=$('#jqGrid_serve').getRowData(serviceIdList[i]);
		if(serviceObj.serviceInstanceId!=""){
			if(serviceObj.exchangeType==""){
				$.zxsaas_plus.showalert('提示','请选择退换方式！！！');
				return false;
			}else{
				if(serviceObj.exchangeType!="不变"&&serviceObj.mortgage==" "){
					$.zxsaas_plus.showalert('提示','请填写可抵扣金额！！！');
					return false;
				}
				if(serviceObj.exchangeType=="更换"&&serviceObj.newServiceName==" "){
					$.zxsaas_plus.showalert('提示','请填写新服务名称！！！');
					return false;
				}
				if(serviceObj.exchangeType=="更换"&&serviceObj.relateNum==""){
					$.zxsaas_plus.showalert('提示','请填写关联序号！！！');
					return false;
				}
				if(serviceObj.exchangeType=="更换"&&serviceObj.receive==" "){
					$.zxsaas_plus.showalert('提示','请填写新服务实收！！！');
					return false;
				}
			}
		}
		
	}
	return true;
}
/**
 * 单据查询
 */
$(document).on('click','.searchOtherBill',function(){
	var _this=$(this);
	var flag=$(this).data('flag');
	var refId=$('#refId').val();
	var param={};
	if(flag=="L"||flag=="F"){
		param={queryCodeStr:flag}
	}else{
		param={queryCodeStr:flag,refBillsId:refId}
	}
	$.request({
		url:basePath+'/retail/exchange/loadExchangeOrder',
		type:'post',
		dataType:'json',
		data:param,
		success:function(data){
			if(data.result==1){
				var orderDetailVo=data.data.orderDetailVo;
				if(!orderDetailVo){
					switch(_this.data('flag')){
					case 'F':
						$.zxsaas_plus.showalert('提示','查询不到单据!');
						break;
					case 'P':
						$.zxsaas_plus.showalert('提示','没有上单!');
						break;
					case 'N':
						$.zxsaas_plus.showalert('提示','没有下单!');
						break;
					case 'L':
						$.zxsaas_plus.showalert('提示','查询不到单据!');
						break;
					}
					return false;
				}else{
					isView=true;
					var inGoodsList=orderDetailVo.inGoodsList;
					var outGoodsList=orderDetailVo.outGoodsList;
					var serviceChangeList=orderDetailVo.serviceChangeList;
					collectionDetails=orderDetailVo.payRecieveDetailList;
					$('.searchBillsData').each(function(index,item){
						for(var k in orderDetailVo){
							$(this).attr('custom')==k&&$(this).val(orderDetailVo[k]);
						}
					});
					for(var key in orderDetailVo){
						if(key=='serviceYfAmount'&&orderDetailVo[key]==null){
							$('#addServiceTotal').val(orderDetailVo.serviceYsAmount);
							$('#addServiceTotal').prev().html("增值服务应收");
						}else{
							$('#addServiceTotal').val(orderDetailVo.serviceYfAmount);
							$('#addServiceTotal').prev().html("增值服务应付");
						}
						if(key=='totalYfAmount'&&orderDetailVo[key]==null){
							$('#payTotal').val(orderDetailVo.totalYsAmount);
							$('#payTotal').prev().html('应收合计');
							$('#paySettlement').val(orderDetailVo.ssAmount);
							$('#mainUnpaid').val(orderDetailVo.wsAmount);
							$('#mainUnpaid').prev().html('未收金额');
						}else{
							$('#payTotal').val(orderDetailVo.totalYfAmount);
							$('#payTotal').prev().html('应付合计')
							$('#paySettlement').val(orderDetailVo.sfAmount);
							$('#mainUnpaid').val(orderDetailVo.wfAmount);
							$('#mainUnpaid').prev().html('未付金额');
						}
						if(key=='goodsSsAmount'){
							$('#goodsPayTotal').val(orderDetailVo.goodsSsAmount);
							$('#goodsPayTotal').prev().html('商品应收')
						}
					}
					$('#sectionId').trigger('getSectionEvent',[orderDetailVo.sectionId,orderDetailVo.salesmanId]);
					$('#jqGrid_SubjectBalance').clearGridData();
					$('#jqGrid_swapOut').clearGridData();
					$('#jqGrid_serve').clearGridData();
					//换入
					$.each(inGoodsList,function(index,item){
						$('#jqGrid_SubjectBalance').addRowData(index,item);
						$('#jqGrid_SubjectBalance').setCell(index,'olsPrice',item.price);
						$('#jqGrid_SubjectBalance').setCell(index,'oldAmount',item.price*item.goodsNum);
						$('#jqGrid_SubjectBalance').setCell(index,'bizName',item.operatorBusinessName);
					});
					//换出
					$.each(outGoodsList,function(index,item){
						$('#jqGrid_swapOut').addRowData(index,item);
						$('#jqGrid_swapOut').setCell(index,'retailPrice',item.price);
						$('#jqGrid_swapOut').setCell(index,'afterMoney',item.discountPrice*item.goodsNum);
					});
					//增值服务
					$.each(serviceChangeList,function(index,item){
						$('#jqGrid_serve').addRowData(index,item);
						$('#jqGrid_serve').setCell(index,'serviceName',item.oldServiceName);
						$('#jqGrid_serve').setCell(index,'imei',item.oldImei);
						$('#jqGrid_serve').setCell(index,'actualAmount',item.oldAmount);
						$('#jqGrid_serve').setCell(index,'mortgage',item.oldActualAmount);
						if(item.exchangeType==2){
							$('#jqGrid_serve').setCell(index,'exchangeType','更换');
							$('#jqGrid_serve').setCell(index,'setPrice',item.presetPrice);
							$('#jqGrid_serve').setCell(index,'feeScale',item.memberPrice);
							$('#jqGrid_serve').setCell(index,'receive',item.memberPrice-item.newActualAmount);
						}
						if(item.exchangeType==1){
							$('#jqGrid_serve').setCell(index,'exchangeType','不变');
						}
						if(item.exchangeType==3){
							$('#jqGrid_serve').setCell(index,'exchangeType','退款');
						}
					})
					$('#jqGrid_SubjectBalance').setGridParam({cellEdit:false});
					$('#jqGrid_swapOut').setGridParam({cellEdit:false});
					$('#jqGrid_serve').setGridParam({cellEdit:false});
					$('.searchBillsData').attr('disabled',true);
					$('.clearData').attr('disabled',true);
					$('#sectionId').attr('disabled',true);
					$('#employees').attr('disabled',true);
					$(document).off('click','#billBtn');
//					$('#settleBtn').off('click');
					$(document).off('click','#seeDetail');
					$(document).off('click','.trashIn,.trashOut');
					$(document).off('click','.addRow');
					$(document).off('click','.addRowOut');
					$(document).off('click','.deleAddService');
				}
			}else{
				$.zxsaas_plus.showalert('提示',data.desc);
			}
		}
	})
})

$('#sectionId').on('getSectionEvent',function(e,sectionId,salesmanId){
	$(this).find('option[value='+sectionId+']').attr('selected',true);
    $.request({
        type: 'Post',
        url: basePath + '/aboutPeople/interfaceSelfCompanyEmployees',
        data: {
    		sectionId : $("#sectionId").val()
    	},
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
    		// 营业员
    		$("#employees option").remove();
    		$(data.data.empList).each(function(index,item){
    			if(item.id ==salesmanId){
    				$("#employees").append("<option selected value='" + item.id + "'>" + item.name + "</opion>");
    			}else{
    			$("#employees").append("<option value='" + item.id + "'>" + item.name + "</opion>");
    			}
    		});
        },
        error: function () {
            alert("营业员加载失败！");
        }
    });
})	
//新开单
$('.addAudit').click(function(){
	window.location.reload();
})
$(document).on('keyup','#disabledInput',function(){
	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));
})
$(document).on('focusout','#disabledInput',function(){
	$(this).val(Math.round($(this).val()*100)/100);
	if(isNaN($(this).val())){
		$(this).val(0)
	}
})

//验证客户姓名联系电话
    $('#addAdminForm').bootstrapValidator({
    	 message: 'This value is not valid',
         feedbackIcons: {
             valid: 'glyphicon glyphicon-ok',
             invalid: 'glyphicon glyphicon-remove',
             validating: 'glyphicon glyphicon-refresh'
         },
         fields:{
        	 customerName:{
        	 	validators: {
		             notEmpty: {
		                 message: '不能为空'
		             },
		             stringLength: {
		            	 min: 2,
		            	 max: 15,
		            	 message: '2-15位'
		             },
		             regexp: {
		            	 regexp: /^[a-zA-Z0-9\u4E00-\u9FA5]+$/,
		            	 message: '不允许特殊符号'
		             },
	         	},
         	},
         	customerTel:{
	        	 validators: {
		             notEmpty: {
		                 message: '不能为空'
		             },
//		             stringLength: {
//		            	 min: 11,
//		            	 max: 12,
//		            	 message: '11-12位'
//		             },
		             regexp: {
		            	 regexp: /^1(3|4|5|7|8)\d{9}$/,
		            	 message: '手机号码格式错误'
		             },
	         	}
        	}
         }
    })

//由报表进入该页面，先执行根据单据编码查询单据的功能wxm
$(function(){
	if(billsCode!=""){
		var param={billsCode:billsCode};
		$.request({
    		type:'post',
        	url:basePath+'/retail/exchange/loadExchangeOrder',
        	data:param,
        	dataType:'json',
        	success:function(data){
			var orderDetailVo=data.data.orderDetailVo;
			
			if(!orderDetailVo){
				$.zxsaas_plus.showalert('提示','没有该单据!'+billsCode);
				return false;
			}
			var inGoodsList=orderDetailVo.inGoodsList;
			var outGoodsList=orderDetailVo.outGoodsList;
			var serviceChangeList=orderDetailVo.serviceChangeList;
			$('.searchBillsData').each(function(index,item){
				for(var k in orderDetailVo){
					$(this).attr('custom')==k&&$(this).val(orderDetailVo[k]);
				}
			});
			for(var key in orderDetailVo){
				if(key=='serviceYfAmount'&&orderDetailVo[key]==null){
					$('#addServiceTotal').val(orderDetailVo.serviceYsAmount);
					$('#addServiceTotal').prev().html("增值服务应收");
				}else{
					$('#addServiceTotal').val(orderDetailVo.serviceYfAmount);
					$('#addServiceTotal').prev().html("增值服务应付");
				}
				if(key=='totalYfAmount'&&orderDetailVo[key]==null){
					$('#payTotal').val(orderDetailVo.totalYsAmount);
					$('#payTotal').prev().html('应收合计');
					$('#paySettlement').val(orderDetailVo.ssAmount);
					$('#mainUnpaid').val(orderDetailVo.wsAmount);
					$('#mainUnpaid').prev().html('未收金额');
				}else{
					$('#payTotal').val(orderDetailVo.totalYfAmount);
					$('#payTotal').prev().html('应付合计')
					$('#paySettlement').val(orderDetailVo.sfAmount);
					$('#mainUnpaid').val(orderDetailVo.wfAmount);
					$('#mainUnpaid').prev().html('未付金额');
				}
				if(key=='goodsSsAmount'){
					$('#goodsPayTotal').val(orderDetailVo.goodsSsAmount);
					$('#goodsPayTotal').prev().html('商品应收')
				}
			}
			$('#sectionId').trigger('getSectionEvent',[orderDetailVo.sectionId,orderDetailVo.salesmanId]);
			$('#jqGrid_SubjectBalance').clearGridData();
			$('#jqGrid_swapOut').clearGridData();
			$('#jqGrid_serve').clearGridData();
			//换入
			$.each(inGoodsList,function(index,item){
				$('#jqGrid_SubjectBalance').addRowData(index,item);
				$('#jqGrid_SubjectBalance').setCell(index,'olsPrice',item.price);
				$('#jqGrid_SubjectBalance').setCell(index,'oldAmount',item.price*item.goodsNum);
				$('#jqGrid_SubjectBalance').setCell(index,'bizName',item.operatorBusinessName);
			});
			//换出
			$.each(outGoodsList,function(index,item){
				$('#jqGrid_swapOut').addRowData(index,item);
				$('#jqGrid_swapOut').setCell(index,'retailPrice',item.price);
				$('#jqGrid_swapOut').setCell(index,'afterMoney',item.discountPrice*item.goodsNum);
			});
			//增值服务
			$.each(serviceChangeList,function(index,item){
				$('#jqGrid_serve').addRowData(index,item);
				$('#jqGrid_serve').setCell(index,'serviceName',item.oldServiceName);
				$('#jqGrid_serve').setCell(index,'imei',item.oldImei);
				$('#jqGrid_serve').setCell(index,'actualAmount',item.oldAmount);
				$('#jqGrid_serve').setCell(index,'mortgage',item.oldActualAmount);
				
				if(item.exchangeType==2){
					$('#jqGrid_serve').setCell(index,'exchangeType','更换');
					$('#jqGrid_serve').setCell(index,'setPrice',item.presetPrice);
					$('#jqGrid_serve').setCell(index,'feeScale',item.memberPrice);
					$('#jqGrid_serve').setCell(index,'receive',item.memberPrice-item.newActualAmount);
				}
				if(item.exchangeType==1){
					$('#jqGrid_serve').setCell(index,'exchangeType','不变');
				}
				if(item.exchangeType==3){
					$('#jqGrid_serve').setCell(index,'exchangeType','退款');
				}
				
			})
			$('#jqGrid_SubjectBalance').setGridParam({cellEdit:false});
			$('#jqGrid_swapOut').setGridParam({cellEdit:false});
			$('#jqGrid_serve').setGridParam({cellEdit:false});
			$('.searchBillsData').attr('disabled',true);
			$('.clearData').attr('disabled',true);
			$('#sectionId').attr('disabled',true);
			$('#employees').attr('disabled',true);
			$(document).off('click','#billBtn');
			$('#settleBtn').off('click');
			$(document).off('click','#seeDetail');
			$(document).off('click','.trashIn,.trashOut');
			$(document).off('click','.addRow');
			$(document).off('click','.addRowOut');
			$(document).off('click','.deleAddService');
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
})










	
			


