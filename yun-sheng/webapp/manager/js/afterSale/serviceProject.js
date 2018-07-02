function loadmodal(options){
	
	//初始化参数
	var colName = [];
	//主表，不可增加
	var colName0 =['id','项目编号','项目名称','预设价格','停用','备注'];
	colName[0] = colName0;
	
	var JqGridColModel = [];
	var JqGridColModel0 =[
	                   {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'serverNumber',index:'serverNumber', width:150,align:'center',sorttype:'string',sortable:false},
	                   {name:'serverNumber',index:'serverNumber', width:100,align:'center',sorttype:'string',sortable:false,formatter:showName},
	                   {name:'fs',index:'fs', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'zeng1',index:'zeng1', width:100,align:'center',sorttype:'string',sortable:false},
	                   {name:'zeng2',index:'zeng2', width:100,align:'center',sorttype:'string',sortable:false}
	                   ];
	JqGridColModel[0]=JqGridColModel0;
	

	//全局当前选择的rowid colid
	var rowid='';
	//var colid='';
	var select_name='';
	var defaults = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	LoadTableUrl: "../../json/afterSale/registrationCard.json",
//	LoadTableUrl:"/manager/afterSalesService/receiveRecord/queryHistory?imei=null",
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_serviceProject", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager_serviceProject",
	TableInfo:"0",
	choose:false
	
//	inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};
	$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
	});
	var options = $.extend(defaults,options);
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';	
		var lastsel='';//最后一次选中的行
		var rightClickColid="";//右键列id
		var rightClickColIndex=0;//右键index
		//var toggleflag=false;//冻结时候切换用
		var c=options.TableInfo;//参数index
		//console.log("&&&&"+c);
		var colNames = colName[c];
		var JqGridColModel = JqGridColModel[c];
		
	loadtable();
	
		function loadtable(){
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"GET",
					datatype: "json",
					jsonReader  :{
						root:"rows",
						repeatitems: false
						},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',//单元格保存内容的位置
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [10, 20, 40],
		            pager:options.pager,
		            viewrecords: true,
		            sortable:false,	
		           //  cellEdit:true,
		            width: "100%" ,
		            height: $(window).height()*0.45,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					multiselect:options.choose,
					multiboxonly:true,
					ondblClickRow:function(id){
					//双击进入编辑
		   				var delid = id;
					},
					onCellSelect:function(id,index,cellcontent,e){
						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
				      	select_name=colName
				      	select_index=index;
				      	rowid=id;
//				      	if(options.TableInfo==2){
//					      	var ids = $(options.TableName).jqGrid('getDataIDs');
//							//获得当前最大行号（数据编号）
//							var maxid;
//							maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
//							//当用户点击表格最后一行时,自动增加一行
//							
//							(id == maxid && index != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );
//						}
				     
					},
					beforeEditCell:function(rowid,cellname,v,iRow,iCol){
												lastrow = iRow;
												lastcell = iCol;
					},
					afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
						
					},
					beforeSelectRow:function(rowid,e){
                        //单行选择
                          
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后

					},
					gridComplete: function() {
					//	alert('a')
					},
					loadComplete:function(data){
//						if(options.TableName=="#jqGrid_batchModel"){
//							if(data.data.list==0){
//								$("#jqGrid_batchModel").jqGrid('addRowData',0, {"id":"","deliveryDo":"","code":"","name":"","goodsCategoryId":"","goodsBrandId":"","goodsModel":"","color":"","imei":"",
//									"falutDesc":"","exteriorDesc":"","suggestHandleMode":"","randomEnclosure":"","remark":"","supplyBy":"","fx":"","flowNo":"","serviceType":""}, 'last' );
//							}
//						}
						
					},
					loadError:function(xhr,status,error){
						//console.log(status)
					}
					})
	
		}
		function saveCell(){
			 $("#jqGrid_serviceProject").jqGrid("saveCell",lastrow,lastcell);
		}
		
		function addAndDelete(cellvalue, options, rowObjec){
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true" id="add_row" title="新增"></span><span class="glyphicon glyphicon-trash" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}
		
		function showName(cellvalue, options, rowObjec){
			var show = '<span class="showName">'+cellvalue+'</span>';
			return show;
		}
		
}

$(document).ready(function(){

});
//新增一行
$(document).on('click', '.setData',function(e){
	$('.code').val('');
	$('.name').val('');
	$('.price').val('');
});

$(document).on('click','.showName',function(){
	var idss=$(this).parents('tr').attr('id');
	var code=$('#jqGrid_serviceProject').getCell(idss,'serverNumber');
	var name=$('#jqGrid_serviceProject').getCell(idss,'serverNumber');
	var price=$('#jqGrid_serviceProject').getCell(idss,'fs');
	var remark=$('#jqGrid_serviceProject').getCell(idss,'zeng1');
	var blockUp=$('#jqGrid_serviceProject').getCell(idss,'zeng2');
	
	$('.code').val(code);
	$('.name').val(name);
	$('.price').val(price);
	$('.remark').val(remark);
	//$('.blockUp').val(blockUp);
	
	console.log(blockUp);
	if(blockUp==1){
		$('.blockUp').attr('checked',true);
	}else{
		$('.blockUp').removeAttr('checked',false);
	}
	
});

/**
 * 调用保存方法
 */
$(document).on('click','.saveData',function(e){
//	window.location.reload(true);
    var data=saveDo();
	$.ajax({
    	url:"../../json/afterSale/registrationCard.json",
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	data:JSON.stringify(data),
    	type:'POST',
    	success:function(data){
    		//console.log(data);
    		//(data.result == 1) && ($.zxsaas_plus.showalert("","保存成功!"))
    		if(data.result==1){
    			 $("#jqGrid_serviceProject").trigger("reloadGrid");
    			 $.zxsaas_plus.showalert("","保存成功!")
    		}
    	},
    	error:function(){
    		$.zxsaas_plus.showalert("","error!")
    	}
    	
    })
});

/**
 * 保存
 */

//批量模式
var saveDo = function(e){
	var arr=[];
	arr.push({'code':$('.code').val(),'code':$('.code').val(),'price':$('.price').val()})
//	var arr={
//		'code':$('.code').val(),
//		'name':$('.name').val(),
//		'price':$('.price').val()
//	}
	return arr;
};

//退出
$(document).on('click','.exit',function(){
	window.parent.document.querySelector("[data-href=id_100103]").querySelector('span').click();
})






































