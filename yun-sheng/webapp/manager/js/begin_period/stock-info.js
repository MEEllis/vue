//打印期初串号标签
function printImei() {
    var cc= window.location.href.split("?");
    //付款
    window.parent.openWorkBoxByMenutext('打印期初串号',
		'/report/manager/report/common/showJsp?'+cc[1].replace('&jspPath=null','&jspPath=report/beginning/goodsStockBegining'),false);
}

function initPage(){
	loadStorage({});
	   loadmodal({TableName:"#jqGrid_stocks",pager:"#jqGridPagerStocks",TableInfo:"jqGrid_stocks",LoadTableUrl: "/manager/beginning/stock/selectList"});
}

var lastrow = ""; 
var lastcell = "";
var saveRows='';
var lastRow="";
function loadmodal(options){
	/*初始化表格参数*/
        var  colNamec =[];
        var JqGridColModelc =[];
        /*库存导入(采购库存)#jqGrid_stocks*/
        var colNames = ['id','EXECEL顺序号','系统判定情况','仓库编码','仓库名称','商品编码','商品名称','串号',
                        '辅助串号','数量','财务成本总额','公司成本'/*,'部门成本'*/,'供应商编码','供应商名称','采购日期','入库日期','备注']; 
        var JqGridColModel =[
	    		                       	{name:'id',index:'id', width:10,align:'center',sortable:false,hidden:true},//id
	    		                       	{name:'orderNo',index:'orderNo', width:70,align:'center',sortable:true},//EXECEL顺序号
	    		                    	{name:'results',index:'results', width:300,align:'center',sortable:true,cellattr: addCellColor},//系统判定情况
	    		                      	{name:'storageCode',index:'storageCode', width:130,align:'center',sortable:true},//仓库编码
	    								{name:'storageName',index:'storageName', width:130,align:'center',sortable:true},//仓库名称
	    								{name:'goodsCode',index:'goodsCode', width:150,align:'center',sortable:true},//商品编码
	    							   	{name:'goodsName',index:'goodsName', width:150,align:'center',sortable:true},//商品名称
	    		                       	{name:'imei',index:'imei', width:170,align:'center',sortable:true},//串号
	    								{name:'auxiliaryImei',index:'auxiliaryImei', width:170,align:'center',sortable:true},//辅助串号
	    								{name:'goodsNumber',index:'goodsNumber',width:70,align:'center',sortable:true},//数量
	    								{name:'costAmt',index:'costAmt', width:130,align:'center',sortable:true},//成本总额
	    								{name:'companyCost',index:'companyCost', width:130,align:'center',sortable:true},//公司成本总额
	    								/*{name:'sectionCost',index:'sectionCost', width:130,align:'center',sortable:true},*///部门成本总额
	    								{name:'supplierCode',index:'supplierCode', width:130,align:'center',sortable:true},//往来单位编码
	    								{name:'supplierName',index:'supplierName',width:130,align:'center',sortable:true},//往来单位名称
	    								{name:'purchaseDate',index:'purchaseDate', width:130,align:'center',sortable:true},//采购日期
	    								{name:'inDate',index:'inDate', width:130,align:'center',sortable:true},//入库日期
	    							    {name:'remark',index:'remark', width:170,align:'center',sortable:true}//备注
	    			                ];
		var defaults = {
		LoadTableUrl: "",
		pager:"",
		TableInfo:"",
		multi:true,
		edit:""
		};
		var options = $.extend(defaults,options);
			$.jgrid.defaults.width = 1400;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var thisSelect='';//全局的选中
			var lastsel='';//最后一次选中的行
			var lastselC='';
			var lastselN='';
			var lastsel2='';//前一次选中的行 (jqGrid_stocks)
			var lastsel3='';//前一次选中的行 串号表
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			loadtable();
		//加载表格
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"POST",
						datatype: "json",
						jsonReader  : {	
							root: "data.rows",
							page: "data.page",
					        total: "data.total",
					        records: "data.records",
							repeatitems: false
						},
						rowNum: 100,
				        rowList: [100, 200, 500],
						pager : options.pager,
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            viewrecords: true,		       
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						multiselect:true,
						multiboxonly:true,
						footerrow:true,
						cellEdit:false,
						cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: "clientArray",
			            customEdit:true,//自定义编辑jqGrid的功能（失去焦点的时候保存）
						ondblClickRow:function(id){
						},
						onCellSelect:function(id,index,e){
						},   
						onSelectRow:function(id,status,e){	
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
						},
						beforeSelectRow:function(rowid,e){
							
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后
						},
						gridComplete: function() {
						},
						loadComplete:function(data){
							//表格数量合计
							 $(options.TableName).footerData("set", {"results":'<font color="red" >本页合计</font>'},false);
							//数量
							  var goodsNumber=$(options.TableName).getCol('goodsNumber', false,'sum');
							  $(options.TableName).footerData("set", {"goodsNumber":'<font color="red" >'+goodsNumber+'</font>'},false);
							  //成本总额
							  var costAmt=$(options.TableName).getCol('costAmt', false,'sum');
							  $(options.TableName).footerData("set", {"costAmt":'<font color="red" >'+costAmt+'</font>'},false);
						},
						loadError:function(xhr,status,error){
			
						}
						})
		
			}
		  
			 function timePicker(id,colName){
				 $("#"+id+"_"+colName).datetimepicker({
					  lang:"ch",           //语言选择中文
				      format:"Y-m-d",      //格式化日期
				      timepicker:false,    //关闭时间选项
				      todayButton:false    //关闭选择今天按钮
					});
			 }
		    /*添加颜色*/
	           function  addCellColor(rowId, val, rawObject, cm, rdata){
	        	    return "style='color:red'";
	           }
			
				
			//模糊查询
			$(document).on("click",".search_maybe",function(event){	
				var vl =$("#queryInput").val();//搜索关键字
					 jQuery("#jqGrid_stocks").jqGrid('setGridParam', {  
						    datatype:'json',  
					        postData:{"keyword":vl} //发送数据  
					    }).trigger("reloadGrid");  
			});
}



/*浏览(上传)*/
$(document).on("change",".file_ipt",function(){
	     $(".des_file").val($(this).val());
});


/*点击执行*/
$(document).on('click' ,'.execute',function(){
	$.zxsaas_plus.showconfirm("执行","是否确定执行?",function(){
//		ajax 执行数据 （完成弹出提示：更新成功XX条   更新失败XX条（页面显示失败的条数））
		$.request({
            url: '/manager/beginning/stock/saveInfo', 
            type: "POST",
		    traditional: true,
            success: function (data) {
				 if(data.result==1){
			    		$.zxsaas_plus.showalert("执行完成",data.desc);
				  }else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			      }
			    	    $("#jqGrid_stocks").trigger("reloadGrid");
		          },
            error: function (msg) {
		        	  $("#jqGrid_stocks").trigger("reloadGrid");
            }
        });
	},function(){
			//否。。		
	});
	
});




/*点击清空*/
$(document).on('click','.clear',function (e) {
			$.zxsaas_plus.showconfirm("清空","是否要清空所有数据?",function(){
				$.request({
		            url: '/manager/beginning/stock/deleteAll', 
		            type: "POST",
				    traditional: true,
		            success: function (data) {
						 if(data.result==1){
					    		$.zxsaas_plus.showalert("提示",data.desc);
					    	}else{
					    		$.zxsaas_plus.showalert("错误",data.desc);
					    	}
					    	$("#jqGrid_stocks").trigger("reloadGrid");
				          },
		            error: function (msg) {
		               
		            }
		        });
			},function(){
					//否。。		
			});
});

//------------------------------------------------end----------------------------------
/*导入模态框*/
$("#into").on('show.bs.modal', function (e) {
	    $(".storgeName").text($(".dis_name>option:selected").text());
		 /*清空数据*/
		$(".file_ipt").val("");
		$(".des_file").val("");
});


/*点击导入*/

$(document).on("click",".lead_into",function(e){
		 $("#into").modal('show');
});
/*导入*/

$(document).on("click",".lead_model",function(e){
	var fileName =$(".des_file").val();
	var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
	if(fileExtension == "xls"){
		$.loading();
			$.ajaxFileUpload({
				url : "/manager/beginning/stock/import",
				secureuri : false,
				fileElementId : "file",
				dataType : "json",
				success : function(data) {
				data.sum = undefined?0:data.sum;
				if(null!=data.message&&""!=data.message){
					$.zxsaas_plus.showalert("导入成功","总共导入："+data.sum+","+data.message);
				}else{
					$.zxsaas_plus.showalert("导入成功","总共导入："+data.sum+"条");
				}
				$("#jqGrid_stocks").trigger("reloadGrid");
				$.loading(true);
				},
				error : function(data) {
					//上传失败
					if($.trim($(".des_file").val())=="")
					{
						$.zxsaas_plus.showalert("导入失败","请选择上传文件！");
						
					}else{
						$.zxsaas_plus.showalert("导入失败","上传文件失败！");
					}
					$.loading(true);
				}
			});  
	}else{
		 if($.trim(fileName)=="")
		{
			$.zxsaas_plus.showalert("提示","请选择上传文件！");
			
		}else{
		    $.zxsaas_plus.showalert("错误","请选择xls格式文件上传！");
		}
		
	}
});

/*点击反执行*/

$(document).on("click",".op-execute",function(){
	 $("#jqGrid_storage").setGridParam({
			    url:"/manager/beginning/stock/findStorage"
			    }
	 ) .trigger("reloadGrid");
});

/*仓库多选*/
$(document).on("shown.bs.modal","#storageReferenceModal",function(){
	
	$("#jqGrid_storage").setGridWidth($(this).find(".modal-body").width());
	
});
$(document).on("show.bs.modal","#storageReferenceModal",function(){
	
	
});
//确定选择
$(document).on("click",".chose-storage",function(){
	var ids =$("#jqGrid_storage").jqGrid("getGridParam",'selarrrow');
	if(ids.length>0){
	$.request({
		url: '/manager/beginning/stock/recallSaveInfo',
		type : "post",
		traditional:true,
		dataType : 'json',
		data:{"ids":ids},
		success:function(data){
			//if(data.result==1){
			$("#jqGrid_stocks").trigger("reloadGrid");
			$.zxsaas_plus.showalert("反执行成功",data.desc);
			//}
		},
		error:function(){
		}
    });
	}
	    
	
});
/************************仓库多选表格***********************************************/

function loadStorage(options){
	/*初始化表格参数*/
       
        var colNames = ['id','仓库编码','仓库名称','仓库类型','部门名称']; 
        var JqGridColModel =[
	    		                       	{name:'id',index:'id', width:200,align:'center',sortable:false,hidden:true},//id
	    		                      	{name:'code',index:'storageCode', width:120,align:'center',sortable:false},//仓库编码
	    								{name:'name',index:'storageName', width:200,align:'center',sortable:false},//仓库名称
	    								{name:'typeCode',index:'typeCode', width:170,align:'center',sortable:false,formatter:'select',editoptions:{value:"3:总仓;1:门店仓;4:售后仓;2:业务仓;5:其他"}},//采购日期
	    							    {name:'sectionName',index:'sectionName', width:100,align:'center',sortable:false}//备注
	    			                ];
		var defaults = {
		LoadTableUrl: "",
		TableName: "#jqGrid_storage", 
		pager:"",
		TableInfo:"",
		multi:true,
		edit:""
		};
		var options = $.extend(defaults,options);
			$.jgrid.defaults.width = 1400;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var thisSelect='';//全局的选中
			var lastsel='';//最后一次选中的行
			var lastselC='';
			var lastselN='';
			var lastsel2='';//前一次选中的行 (jqGrid_stocks)
			var lastsel3='';//前一次选中的行 串号表
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			loadtable();
		//加载表格
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"POST",
						datatype: "json",
						jsonReader  : {	
							root: "data.storageList",
							page: "data.page",
					        total: "data.total",
					        records: "data.records",
							repeatitems: false
						},
						 pager : options.pager,
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            viewrecords: true,		  
			            rowNum:-1,
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, 
						shrinkToFit:false, 
						multiselect:true,
						multiboxonly:false,
						cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: "clientArray",
			            customEdit:true,//自定义编辑jqGrid的功能（失去焦点的时候保存）
						ondblClickRow:function(id){
						},
						onCellSelect:function(id,index,e){
						},   
						onSelectRow:function(id,status,e){	
						
						
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
						},
						beforeSelectRow:function(rowid,e){
					
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后
						},
						gridComplete: function() {
						},
						loadComplete:function(data){
							
							  
							 if(data.result==1){
								 var len = data.data.storageList.length||0;
								 if(len>0){
									    $("#storageReferenceModal").modal('show');
								 }else{
									    $.zxsaas_plus.showalert("提示","当前没有可反执行仓库！");
								 }
							 }else{
								 $.zxsaas_plus.showalert("提示",data.desc);
							 }
						},
						loadError:function(xhr,status,error){
			
						}
						})
		
			}
}


var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
    switch(a){
        case 'yyyy':
            return tf(t.getFullYear());
            break;
        case 'MM':
            return tf(t.getMonth() + 1);
            break;
        case 'mm':
            return tf(t.getMinutes());
            break;
        case 'dd':
            return tf(t.getDate());
            break;
        case 'HH':
            return tf(t.getHours());
            break;
        case 'ss':
            return tf(t.getSeconds());
            break;
    }
})
}
	
