var status=0;  //执行状态  0为未执行  1为已执行

//初始化的时候判断是否已执行
function init(){
	$.request({
        url: '/manager/beginning/cashDetail/init', 
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
				   		   url: '/manager/beginning/cashDetail/saveInfo', 
				   		   type: "POST",
				   		   traditional: true,
				   		   success: function (data) {
				   						 if(data.result==1){
				   					    		$.zxsaas_plus.showalert("提示",data.desc);
				   					    	}else{
				   					    		$.zxsaas_plus.showalert("错误",data.desc);
				   					     }
				   						init();
				   					    $("#jqGrid_cash").jqGrid("clearGridData").trigger("reloadGrid");
				   				      },
				   		         error: function (msg) {
				   		                
				   		        }
				   		   });
				   	},function(){
				   					//否。。		
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
			   		   url: '/manager/beginning/cashDetail/recallSaveInfo', 
			   		   type: "POST",
			   		   traditional: true,
			   		   success: function (data) {
			   					     if(data.result==1){
			   					    		$.zxsaas_plus.showalert("提示",data.desc);
			   					    	}else{
			   					    		$.zxsaas_plus.showalert("错误",data.desc);
			   					     }
			   					    init();
			   					    $("#jqGrid_cash").jqGrid("clearGridData").trigger("reloadGrid");
			   				      },
			   		         error: function (msg) {
			   				    	  $("#jqGrid_cash").jqGrid("clearGridData").trigger("reloadGrid");
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
				   		   url: '/manager/beginning/cashDetail/deleteAll', 
				   		   type: "POST",
				   		   traditional: true,
				   		   success: function (data) {
				   						 if(data.result==1){
				   					    		$.zxsaas_plus.showalert("提示",data.desc);
				   					    	}else{
				   					    		$.zxsaas_plus.showalert("错误",data.desc);
				   					     }
				   					    $("#jqGrid_cash").jqGrid("clearGridData").trigger("reloadGrid");
				   				
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
function loadmodal(options){
	/*初始化表格参数*/
        var  colNames =[];
        var JqGridColModel =[];
        colNames = ['id','EXCEL顺序号','系统判定情况','部门编码','部门名称','资金账户编码','资金账户名称','余额','备注'];
        JqGridColModel = [
		                       	{name:'id',index:'id', width:10,align:'center',sortable:true,hidden:true},
		                       	{name:'orderNo',index:'orderNo', width:70,align:'center',sortable:true},//EXCEL顺序号
								{name:'results',index:'results', width:300,align:'center',sortable:true,cellattr: addCellColor},//系统判定情况
								{name:'sectionCode',index:'sectionCode', width:130,align:'center',sortable:true},//资金账户类型
								{name:'sectionName',index:'sectionName', width:130,align:'center',sortable:true},  //资金账户编码
								{name:'acountCode',index:'acountCode', width:130,align:'center',sortable:true},  //资金账户名称
								{name:'acountName',index:'acountName', width:100,align:'center',sortable:true},//余额
								{name:'amount',index:'amount',width:100,align:'center',sortable:true},//余额
							    {name:'remark',index:'remark',width:150,align:'center',sortable:true}//备注
			                ];
	    
		var defaults = {
		LoadTableUrl: "",
		pager:"",
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
						mtype:"GET",
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
						 footerrow:true,
						cellEdit:false,
						cellsubmit: 'clientArray',//单元格保存内容的位置		
			            editurl: "/manager/beginning/cashDetail/save",
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
						},
						loadComplete:function(data){
							//表格数量合计
							 $(options.TableName).footerData("set", {"results":'<font color="red" >本页合计</font>'},false);
							//数量
							  var amount=$(options.TableName).getCol('amount', false,'sum');
							  $(options.TableName).footerData("set", {"amount":'<font color="red" >'+amount+'</font>'},false);
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
					
					 jQuery("#jqGrid_cash").jqGrid('setGridParam', {  
						    datatype:'json',  
					        postData:{"keyword":vl}, //发送数据  
					    }).trigger("reloadGrid");  
			});
}




function initial(){
	init();
	loadmodal({TableName:"#jqGrid_cash",pager:"#jqGridPagerCashInfo",LoadTableUrl: "/manager/beginning/cashDetail/selectList"});
}



/*浏览(上传)*/
$(document).on("change",".file_ipt",function(){
	     $(".des_file").val($(this).val());
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
			url : "/manager/beginning/cashDetail/import",
			secureuri : false,
			fileElementId : "file",
			dataType : "json",
			success : function(data) {
				data.sum = undefined?0:data.sum;
				$.zxsaas_plus.showalert("导入成功","总共导入："+data.sum);
				$("#jqGrid_cash").trigger("reloadGrid");
			
				/*执行组按钮启用*/
			   relatExecute=true;
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



//打开部门引用对话框填写部门input框内容
function selectSectionReferenceOpen(){
//if($("#slideThree").is(':checked') || $(".gridTop").toJsonObject().id != "")return;
//传入单选标志
sectionReferenceFrame.mulSelect(false);
$('#sectionReferenceModal').modal('show').find('.referenceFrame').css({
  height: $("html").height()/2
});
callBack = function(){
	if(arguments[0].length == 0){
		$('#sectionReferenceModal').modal('hide');
		return ;
	}
	var model = arguments[0][0];

	//设置编辑器值
	$("input[name='sectionId']").val(model.id);
	$("input[name='sectionName']").val(model.name);
	
//	var time =model.obj.usedDate;
	// var seconds =DateToSecond(time);//日期转换成秒
//	 var initDate =Number(parseInt(seconds)-parseInt(1*86400000));
//	$("input[name='initial_date']").val($.DateFormat(new Date(initDate),"yyyy-MM-dd"));
	$('#sectionReferenceModal').modal('hide');
}; 
}


/*日期转化时间*/
function DateToSecond(date){
	 var Time = new Array();   
	 Time = date.split("-"); 
	 return (new Date(Time[0],Time[1]-1,Time[2])).valueOf();  
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

