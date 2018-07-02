var status=0;  //执行状态  0为未执行  1为已执行

//初始化的时候判断是否已执行
function init(){
	$.request({
        url: '/manager/beginning/cashAccount/init', 
        type: "POST",
	    traditional: true,
        success: function (data) {
			if(data.result ==1){
				if(data.data.num>0){
					status=1;
				}else{
					status=0;  	
				}
			}
	    },
        error: function (msg) {
          
        }
	 });
}


/*点击执行*/
$(document).on('click' ,'.execute',function(){

	   if(status==1){
		   $.zxsaas_plus.showalert("提示","抱歉,已禁用!");
	   }else{
			 $.zxsaas_plus.showconfirm("执行","是否要执行?",function(){
						$.request({
					   		   url: '/manager/beginning/cashAccount/saveInfo', 
					   		   type: "POST",
					   		   traditional: true,
					   		   success: function (data) {
					   						 if(data.result==1){
					   					    		$.zxsaas_plus.showalert("提示",data.desc);
					   					    	}else{
					   					    		$.zxsaas_plus.showalert("错误",data.desc);
					   					     }
					   						init();
					   					    $("#jqGrid_cashAccount").jqGrid("clearGridData").trigger("reloadGrid");
					   				      },
					   		         error: function (msg) {
					   				    	$("#jqGrid_cashAccount").jqGrid("clearGridData").trigger("reloadGrid");
					   		        }
					   		   });
					   	},function(){
					   				//	否。。		
					});
	   }
	
	
	  
});


/*点击反执行*/
$(document).on('click' ,'.op-execute',function(){
	  if(status==0){
		   $.zxsaas_plus.showalert("提示","抱歉,已禁用!");
	   }else{
		   $.zxsaas_plus.showconfirm("清空","是否要反执行?",function(){
				$.request({
			   		   url: '/manager/beginning/cashAccount/recallSaveInfo', 
			   		   type: "POST",
			   		   traditional: true,
			   		   success: function (data) {
			   					     if(data.result==1){
			   					    		$.zxsaas_plus.showalert("提示",data.desc);
			   					    	}else{
			   					    		$.zxsaas_plus.showalert("错误",data.desc);
			   					     }
			   					    init();
			   					    $("#jqGrid_cashAccount").jqGrid("clearGridData").trigger("reloadGrid");
			   				      },
			   		         error: function (msg) {
			   				    	$("#jqGrid_cashAccount").jqGrid("clearGridData").trigger("reloadGrid");
			   		        }
			   		   });
			   	},function(){
			   					//否。。		
			});
	   }
});

//点击导入
$(document).on("click",".lead_into",function(e){
	 if(status==1){
		   $.zxsaas_plus.showalert("提示","抱歉,已禁用!");
	  }
	 else{
		 $("#into").modal('show');	
	 }
});


/*点击清空*/
$(document).on('click','.clear',function (e) {
	 if(status==1){
		   $.zxsaas_plus.showalert("提示","抱歉,已禁用!");
	   }
	 else{
		 $.zxsaas_plus.showconfirm("清空","是否要清空所有数据?",function(){
					$.request({
				   		   url: '/manager/beginning/cashAccount/deleteAll', 
				   		   type: "POST",
				   		   traditional: true,
				   		   success: function (data) {
				   						 if(data.result==1){
				   					    		$.zxsaas_plus.showalert("提示",data.desc);
				   					    	}else{
				   					    		$.zxsaas_plus.showalert("错误",data.desc);
				   					     }
				   					    $("#jqGrid_cashAccount").jqGrid("clearGridData").trigger("reloadGrid");
				   				
				   				      },
				   		         error: function (msg) {
				   		                
				   		        }
				   		   });
				   	},function(){
				});
	 }
});


var lastrow = ""; 
var lastcell = "";
$("#jqGrid_cashAccount").on("blur",function(){
  jQuery("#jqGrid_cashAccount").jqGrid('saveRow',lastrow);
});
function loadmodal(options){
	/*初始化表格参数*/
	var  colNames =[];
    var JqGridColModel =[];
    colNames= ['id',"Excel顺序号",'系统判定结果','往来单位编码','往来单位名称','应付余额','预付余额','应收余额','预收余额','备注'];
    JqGridColModel = [
	            {name:'id',index:'id', width:10,align:'center', sorttype:'string',hidden:true},
	           	{name:'orderNo',index:'orderNo', width:70,align:'center',sortable:false},//Excel顺序号
				{name:'results',index:'results', width:300,align:'center', sortable:false,cellattr: addCellColor},
			 	{name:'code',index:'code', width:130,align:'center',sortable:false},//Excel顺序号
			 	{name:'contactUnitName',index:'contactUnitName', width:130,align:'center',sortable:false},//Excel顺序号
			 	{name:'payableAmount',index:'payableAmount', width:100,align:'center',sortable:false},//Excel顺序号
			 	{name:'prepayAmount',index:'prepayAmount', width:100,align:'center',sortable:false},//Excel顺序号
			 	{name:'receivableAmount',index:'receivableAmount', width:100,align:'center',sortable:false},//Excel顺序号
			 	{name:'payingAmount',index:'payingAmount', width:100,align:'center',sortable:false},//Excel顺序号
			 	{name:'remark',index:'remark', width:150,align:'center',sortable:false}//Excel顺序号
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
						shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						cellEdit:false,
						footerrow:true,
						cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: 'clientArray',
						ondblClickRow:function(id){
						},
						onCellSelect:function(id,index,e){
					
						},
						onSelectRow:function(id){		
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol)
						{
						 
						},
						beforeSelectRow:function(rowid,e){
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							//表格数量合计
							 $(options.TableName).footerData("set", {"results":'<font color="red" >本页合计</font>'},false);
							//应付余额
							  var payableAmount=$(options.TableName).getCol('payableAmount', false,'sum');
							  $(options.TableName).footerData("set", {"payableAmount":'<font color="red" >'+payableAmount+'</font>'},false);
							  //预付余额
							  var prepayAmount=$(options.TableName).getCol('prepayAmount', false,'sum');
							  $(options.TableName).footerData("set", {"prepayAmount":'<font color="red" >'+prepayAmount+'</font>'},false);
							  //应收余额
							  var receivableAmount=$(options.TableName).getCol('receivableAmount', false,'sum');
							  $(options.TableName).footerData("set", {"receivableAmount":'<font color="red" >'+receivableAmount+'</font>'},false);
							  //预收余额
							  var payingAmount=$(options.TableName).getCol('payingAmount', false,'sum');
							  $(options.TableName).footerData("set", {"payingAmount":'<font color="red" >'+payingAmount+'</font>'},false);
						},
						loadComplete:function(data){
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
				var vl =$(".srch").val();
					
					 jQuery("#jqGrid_cashAccount").jqGrid('setGridParam', {  
						    datatype:'json',  
					        postData:{"keyword":vl}, //发送数据  
					    }).trigger("reloadGrid");  
			});
}


function initial(){
	init();
	loadmodal({TableName:"#jqGrid_cashAccount",pager:"#jqGridPagerCashAccount",TableInfo:"0",LoadTableUrl: "/manager/beginning/cashAccount/selectList"});

}



/*浏览(上传)*/
$(document).on("change",".file_ipt",function(){
	     $(".des_file").val($(this).val());
});



/*点击执行*/
//$(document).on('click' ,'.execute',function(){execute();});
/*点击反执行*/
//$(document).on('click' ,'.op-execute',function(){opExecute();});

/*模态框弹出后*/

/*导入模态框*/
$("#into").on('show.bs.modal', function (e) {
		 /*清空数据*/
		$(".file_ipt").val("");
		$(".des_file").val("");
});


/*导入*/
/*
$(document).on("click",".lead_model",function(e){
	var fileName =$(".des_file").val();
	var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
	if(fileExtension == "xls"){
		$.loading();
			$.ajaxFileUpload({
				url : "/manager/beginning/cashAccount/import",
				secureuri : false,
				fileElementId : "file",
				success : function(data) {
				data.sum = undefined?0:data.sum;
				$.zxsaas_plus.showalert("导入成功","总共导入："+data.sum);
				$("#jqGrid_cashAccount").trigger("reloadGrid");
				//$(".dis_name>option[vlaue="+sectionId+"]").attr("selected",true);
			//	alert("1111");
				$(".secId").val(sectionId);
			//	changeStatus();	
				执行组按钮启用
				   relatExecute=true;
				//freshTableTitle();//刷新表头信息
					$.loading(true);
				},
				error : function(data) {
					//上传失败
					if($.trim($(".des_file").val())=="")
					{
						$.zxsaas_plus.showalert("导入失败","请选择上传文件！");
						
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
	 ///e.preventDefault();
});*/

/*导入*/
$(document).on("click",".lead_model",function(e){
	var fileName =$(".des_file").val();
	var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);

	if(fileExtension == "xls"){
		$.ajaxFileUpload({
			url : "/manager/beginning/cashAccount/import",
			secureuri : false,
			fileElementId : "file",
			dataType : "json",
			success : function(data) {
			data.sum = undefined?0:data.sum;
			$.zxsaas_plus.showalert("导入成功","总共导入："+data.sum);
			$("#jqGrid_cashAccount").trigger("reloadGrid");
		
			/*执行组按钮启用*/
		   relatExecute=true;
			},
			error : function(data) {
				//上传失败
				if($.trim($(".des_file").val())=="")
				{
					$.zxsaas_plus.showalert("导入失败","请选择上传文件！");
					
				}else{
					$.zxsaas_plus.showalert("导入失败","上传文件失败！");
				}
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
/*日期转化时间*/
function DateToSecond(date){
	 var Time = new Array();   
	 Time = date.split("-"); 
	 return (new Date(Time[0],Time[1]-1,Time[2])).valueOf();  
}
