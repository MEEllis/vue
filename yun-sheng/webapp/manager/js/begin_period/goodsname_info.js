/*初始化*/
var lastrow = ""; 
var lastcell = "";
function loadmodal(options){
	/*初始化表格参数*/
	 var  colNames =[];
     var JqGridColModel =[];
     colNames= ['id',"Excel顺序号",'系统判定结果','商品编码','商品名称','助记码','类别编码','类别名称','品牌编码','品牌名称','型号名称','颜色编码','颜色名称','配置','计价方式','入库方式','是否串号管理','串号长度','辅助串号管理','辅助串号长度','网络制式','运营商','操作系统','备注'];
     JqGridColModel = [
		            {name:'id',index:'id', width:120,align:'center', sorttype:'string',hidden:true},
		           	{name:'orderNo',index:'orderNo', width:100,align:'center',sortable:false},//Excel顺序号
					{name:'results',index:'results', width:300,align:'center', sortable:false,cellattr: addCellColor},//系统判定结果
					{name:'goodscode',index:'goodscode', width:100,align:'center',sortable:false},//商品编码
					{name:'goodsname',index:'goodsname', width:100,align:'center',sortable:false},//商品名称
					{name:'remCode',index:'remCode', width:100,align:'center',sortable:false},//助记码
					{name:'goodsClassCode',index:'goodsClassCode', width:100,align:'center',sortable:false},//类别编码
					{name:'goodsclass',index:'goodsclass', width:100,align:'center',sortable:false},//类别名称
					{name:'goodsBrandCode',index:'goodsBrandCode', width:100,align:'center',sortable:false},//品牌编码
					{name:'goodsbrand',index:'goodsbrand', width:100,align:'center',sortable:false},//品牌名称
					{name:'goodsModel',index:'goodsModel', width:100,align:'center',sortable:false},//型号名称
					{name:'goodsColorCode',index:'goodsColorCode', width:100,align:'center',sortable:false},//颜色编码
					{name:'goodscolor',index:'goodscolor', width:100,align:'center',sortable:false},//颜色名称
					{name:'configure',index:'configure', width:100,align:'center',sortable:false},//配置
					{name:'valuationMethods',index:'valuationMethods', width:100,align:'center',sortable:false},//计价格方式
					{name:'storageMode',index:'storageMode', width:100,align:'center',sortable:false},//入库方式
					//{name:'taxRate',index:'taxRate', width:100,align:'center',sortable:false},//税率
					{name:'ifManageImei',index:'ifManageImei', width:100,align:'center',sortable:false},//是否串号管理
					{name:'imeiLength',index:'imeiLength', width:100,align:'center',sortable:false},//串号长度
					{name:'ifEnableAuxliaryImei',index:'ifEnableAuxliaryImei', width:100,align:'center',sortable:false},//辅助串号管理
					{name:'auxliaryImeiLength',index:'auxliaryImeiLength', width:100,align:'center',sortable:false},//辅助串号长度
					{name:'networkStandard',index:'networkStandard', width:100,align:'center',sortable:false},//网络制式
				    {name:'carrieroperator',index:'carrieroperator', width:100,align:'center',sortable:false},//运营商
					{name:'opSystem',index:'opSystem', width:100,align:'center',sortable:false},//操作系统
				    {name:'remark',index:'remark', width:100,align:'center',sortable:false}//备注
				 ]; 
				
	    
		var defaults = {
		LoadTableUrl: "",
		pager:"",
		TableInfo:"",
		multi:"true",
		edit:""
		};
		var options = $.extend(defaults,options);
			$.jgrid.defaults.width = 1400;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
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
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
//						multiselect:true,
//						multiboxonly:true,
					//	cellEdit:true,
						//cellsubmit: 'clientArray',//单元格保存内容的位置		
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onCellSelect:function(id,index,e){
						},
						onSelectRow:function(id){
						
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol)
						{
						  lastrow = iRow; 
						  lastcell = iCol;
						},
						beforeSelectRow:function(rowid,e){
                            
                                //return $(e.target).is('input[type=checkbox]');
                            
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							
						},
						loadComplete:function(data){
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
		
			}
		   // $("#jqGrid_goodRecoder").jqGrid('setLabel',1, '选择', 'labelstyle');
		    /*添加颜色*/
	           function  addCellColor(rowId, val, rawObject, cm, rdata){
	        	    return "style='color:red'";
	           }
		
			
			 function Goodsmodel(cellvalue, options, rowObject){
	            if(cellvalue == undefined || cellvalue == ""){
                	cellvalue = "";
                }
				return '<span class="goodsSort" style="display: inline-block; width: 89px;height: 16px;" data-toggle="modal" data-target="#goodsch" data-rId="' + options.rowId +'">' + cellvalue + '</span>';     
		}
			
		
			
		//模糊查询
			$(document).on("click",".search_maybe",function(event){			
				var vl =$(".srch").val();
					 jQuery("#jqGrid_goodRecoder").jqGrid('setGridParam', {  
						    datatype:'json',  
					        postData:{"keyword":vl}, //发送数据  
					    }).trigger("reloadGrid");  
			});
		

}

function initial(){
	loadmodal({TableName:"#jqGrid_goodRecoder",pager:"#jqGridPagergoodRecoder",TableInfo:"0",LoadTableUrl: "/manager/beginning/goodsname/selectList"});

}



/*浏览(上传)*/
$(document).on("change",".file_ipt",function(){
	     $(".des_file").val($(this).val());
});


/*点击清空*/
$(document).on('click', '.clear',function (e) {
	 
	$.zxsaas_plus.showconfirm("清空","是否要清空所有数据?",function(){
//		这里是清空页面所有的数据还是保存后表中的数据？？？
   //  $("#jqGrid_branInfo").clearGrid("reloadGrid"); 
		$.request({
            url: '/manager/beginning/goodsname/deleteAll', 
            type: "POST",
		    traditional: true,
            success: function (data) {
				 if(data.result==1){
			    		$.zxsaas_plus.showalert("提示",data.desc);
			    	}else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			    	}
			    	$("#jqGrid_goodRecoder").trigger("reloadGrid");
		          },
            error: function (msg) {
           
            }
        });
	},function(){
			//否。。		
	});
	
});

/*点击执行*/
$(document).on('click' ,'.execute',function(){
	$.zxsaas_plus.showconfirm("执行","是否确定执行?",function(){
//		ajax 执行数据 （完成弹出提示：更新成功XX条   更新失败XX条（页面显示失败的条数））
		$.request({
            url: '/manager/beginning/goodsname/saveInfo', 
            type: "POST",
		    traditional: true,
            success: function (data) {
				 if(data.result==1){
			    		$.zxsaas_plus.showalert("执行完成",data.desc);
				  }else{
			    		$.zxsaas_plus.showalert("错误",data.desc);
			      }
			    	    $("#jqGrid_goodRecoder").trigger("reloadGrid");
		          },
            error: function (msg) {
		        	  $("#jqGrid_goodRecoder").trigger("reloadGrid");
            }
        });
	},function(){
			//否。。		
	});
	
	
	
});

/*模态框弹出后*/

/*导入模态框*/
$("#into").on('show.bs.modal', function (e) {
	 /*清空数据*/
	$(".file_ipt").val("");
	$(".des_file").val("");
	
});


/*导入*/
$(document).on("click",".lead_model",function(e){
	var fileName =$(".des_file").val();
	var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
	if(fileExtension == "xls"){
		$.loading();
	$.ajaxFileUpload({
		url : "/manager/beginning/goodsname/import",
		secureuri : false,
		fileElementId : "file",
		dataType : "json",
		success : function(data) {
			data.sum = undefined?0:data.sum;
			if(data.message==""){
				$.zxsaas_plus.showalert("导入成功","总共导入："+data.sum);
			}else{
				$.zxsaas_plus.showalert("导入成功","总共导入："+data.sum+"("+data.message+")");
			}
			$("#jqGrid_goodRecoder").trigger("reloadGrid");
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
	 e.preventDefault();
});
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

