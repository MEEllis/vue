//JUST DO IT
$(document).on("click",".search",function(){
	 window.location.href ="/manager/retail/checkPay/findCheckDemand";
});
//JUST DO IT
$(document).on("click",".add",function(){
	 window.location.href ="/manager/retail/checkPay/jiaokuan";
});

$('#startDate').datePlu({
	dateEnd:'#endDate',
	ifPermissions:false
	
})

$('#storeInput').storePlu({
	search:false,
	checkMore:true,
	saleManId:'saleManInput',
})


$('#saleManInput').storeSales({
	checkMore:true,
	search:false,
	sectionId:'storeInput'
})

/*页面初始化*/
var initail_sign=false;
$(function(){
	initail_sign=true;
	getSystemTime();//获取系统时间
    /*获取 门店接口信息*/
    $.ajax({
        url: '/manager/jxc/base/getLeafSectionVoList',
        type: 'POST',
        async: false,
        data: {
			addDefault: 1
        },
        success: function(data){
            $(".md").html("");
            if (data.data.sectionVoList) {
                for (var i = 0; i < data.data.sectionVoList.length; i++) {
                    $(".md").append("<option value='" + data.data.sectionVoList[i].id + "'>" + data.data.sectionVoList[i].name + "</option>");//门店信息加载
                }
            }
            jkr();//初始化交款人信息
        },
        error: function(msg){
        
        }
    });
});	

/*根据收款部门id查找相应的收款账户信息*/
$(document).on("change",".md",jkr);

function jkr(){
    /*获取交款人信息*/
    var slctVal = $(".md>option:selected").val();//门店id
    $.ajax({
        url: '/manager/jxc/base/getEmployeeVoList',
        type: 'POST',
        async: false,
		data: {
            sectionId: slctVal,
			addDefault: 1
        },
		success: function(data){
            $(".jkr").html("");
            if (data.data.employeeVoList) {
                for (var i = 0; i < data.data.employeeVoList.length; i++) {
                    $(".jkr").append("<option value='" + data.data.employeeVoList[i].id + "'>" + data.data.employeeVoList[i].name + "</option>");//交款人信息加载
                }
            }
        },
        error: function(msg){
        
        }
    });
}
            var lastrow ='';
            var lastcell=''; 
            var lastsel='';//最后一次选中的行
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			$("#mainGrid").jqGrid({
				url:"/manager/retail/checkPay/payMoneyAudit",
				mtype:"POST",
				datatype: "json",				
				jsonReader  : {	
						root: "data.aduitList",
						repeatitems: false
							},
				colNames:['隐藏id','隐藏确认单id','交款门店','交款人','上交金额','收款账户','实际收款','扣费金额','交款差额','差额原因','是否确认','交款流水号','交款日期','统计时间','备注'],          
			    colModel:[
                            {name:"id",width:"150px",align:"center",sortable:false,hidden:true},  
                            {name:"confirmId",width:"150px",align:"center",sortable:false,hidden:true},  
                            //{name:'deliveryDo', index: 'deliveryDo', width: 80, align: 'center', formatter: addAndDelete, sortable: false},
			            	{name:"sectionName",width:"150px",align:"center",sortable:false},  
			            	{name:"paymentName",width:"150px",align:"center",sortable:false}, // 交款人
			            	{name:"handInAmount",width:"150px",align:"center",sortable:false}, // 上交金额（交款金额）
			            	{name:"accountName",width:"150px",align:"center",sortable:false}, // 收款账户loadSelect
			            	{name:"actualAmount",width:"150px",align:"center",sortable:false,editoptions:{
			            		onkeyup:"checkInput.ckNum(this,12)",
			            		dataEvents:[{type:"blur",fn:function(){	
				            	    var rowid= $("#mainGrid").jqGrid("getGridParam", "selrow");
				            		var thisVal=$(this).val();//实际收款
				            		var sj =$("#mainGrid").jqGrid('getCell',rowid,"handInAmount"); //上交金额
				            		var  kf=$("#mainGrid").jqGrid('getCell',rowid,"deductionAmount");//扣费金额
			            		    //$(this).parent("td").next().next().text(Number(sj-thisVal-kf).toFixed(2));//交款差额
			            			 $("#mainGrid").jqGrid('setCell',rowid,"lostAmount",Number(sj-thisVal-kf).toFixed(2)); //交款差额
			                        $("#mainGrid").saveCell(lastrow,lastcell);
			                        var actualAmount=$("#mainGrid").getCol('actualAmount', false, 'sum');
			                        $("#mainGrid").footerData("set", {"actualAmount":'<font color="red" >'+Number(actualAmount).toFixed(2)+'</font>'},false);
			                        var lostAmount=$("#mainGrid").getCol('lostAmount', false, 'sum');
			                        $("#mainGrid").footerData("set", {"lostAmount":'<font color="red" >'+Number(lostAmount).toFixed(2)+'</font>'},false);
				            		}}]}}, //实际收款
			            	{name:"deductionAmount",width:"150px",align:"center",sortable:false,editable:false,
								// ,editoptions:{
		            			// onkeyup:"checkInput.ckNum(this,12)",
		            			// dataEvents:[{type:"blur",fn:function(){
		            			// 	 var rowid= $("#mainGrid").jqGrid("getGridParam", "selrow");
		            			// 	 var thisVal=$(this).val();//扣费金额
		            			// 	 var sj=$("#mainGrid").jqGrid('getCell',rowid,"handInAmount"); //上交金额
		            			// 	 var  shiji=$("#mainGrid").jqGrid('getCell',rowid,"actualAmount"); //实际收费
		            			//
	            				//      if(Number(thisVal)>Number(sj)){
	            				//     	 $("#mainGrid").jqGrid("restoreCell",lastrow,lastcell);///回滚
	            				//     	 $.zxsaas_plus.showalert("提示","扣款金额小于或者等于上交金额！");
	            				//      }else{
	            				//     	 $("#mainGrid").saveCell(lastrow,lastcell);
	            			    	// 	 $("#mainGrid").jqGrid('setCell',rowid,"lostAmount",Number(sj-thisVal-shiji).toFixed(2)); //交款差额
	            				//     	 var deductionAmount=$("#mainGrid").getCol('deductionAmount', false, 'sum');
	            				//     	 $("#mainGrid").footerData("set", {"deductionAmount":'<font color="red" >'+Number(deductionAmount).toFixed(2)+'</font>'},false);
	            				//     	 var lostAmount=$("#mainGrid").getCol('lostAmount', false, 'sum');
	            				//     	 $("#mainGrid").footerData("set", {"lostAmount":'<font color="red" >'+Number(lostAmount).toFixed(2)+'</font>'},false);
	            				//      }
			            		//
				            	// 	}}]
				            	// 	}
				            		}, //扣费金额
			            	{name:"lostAmount",width:"150px",align:"center",sortable:false,formatter:function(cellvalue, options, rowObject){return Number(cellvalue).toFixed(2); }}, 
			            	{name:"shtagesReason",width:"150px",align:"center",sortable:false,editoptions:{
			            		dataEvents:[{type:"blur",fn:function(){	
			            			 $("#mainGrid").saveCell(lastrow,lastcell);
			            		}}]
			            	}}, 
			            	{name:"cofirmFlag",width: 80,align: "center",sortable: false,formatter:"select",editoptions:{value:"1:√;0:"}}, //是否确认
			            	{name:"flowNo",width:"150px",align:"center",sortable:false}, 
			            	{name:"paymentDateStr",width:"150px",align:"center",sortable:false}, 
			            	{name:"statisticsDateStr",width:"150px",align:"center",sortable:false},
			            	{name:"remark",width:"150px",align:"center",sortable:false}
			            ],
			    sortable:false,	
			    rownumbers:true,
			    cellsubmit: 'clientArray',// 单元格保存内容的位置
			    editurl: 'clientArray',
			    rowNum:-1,
			    viewrecords: true,		           
			   	cellEdit:true,
			    width:'' ,
			    footerrow:true,
			    multiselect:true,
				multiboxonly:true,
				multiselectWidth:38,
			    height: $(window).height()*0.6,
				autowidth:true,
				rownumWidth: 35, // the width of the row numbers columns
				shrinkToFit:false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
				userDataOnFooter:true,// 设置userData 显示在footer里
				ondblClickRow:function(id){
				
				},
				 prmNames : {  
			            page:null,    // 表示请求页码的参数名称
			            rows:null,    // 表示请求行数的参数名称
			            sort: null, // 表示用于排序的列名的参数名称
			            order: null, // 表示采用的排序方式的参数名称
			            search:null, // 表示是否是搜索请求的参数名称
			            nd:null, // 表示已经发送请求的次数的参数名称
			            id:null // 表示当在编辑数据模块中发送数据时，使用的id的名称
			            
			        },
			    onCellSelect:function(rowid, index, contents, event){
			         	var stus =judgeSelOrNot(rowid);
			         	var confirm_OrNot =$("#mainGrid").jqGrid('getCell',rowid,"cofirmFlag");
			         	if(confirm_OrNot==0||confirm_OrNot=='0'){
				         	if(stus){
				         		 if(index==8||index==9||index==11){
					 		    	 $("#mainGrid").setColProp('actualAmount',{editable:true});   
					 		    	 // $("#mainGrid").setColProp('deductionAmount',{editable:true});
					 		    	 $("#mainGrid").setColProp('shtagesReason',{editable:true});   
					 		     }else{
					 		    	 $("#mainGrid").setColProp('actualAmount',{editable:false});   
					 		    	 $("#mainGrid").setColProp('deductionAmount',{editable:false});   
					 		    	 $("#mainGrid").setColProp('shtagesReason',{editable:false});   
					 		     }
				         	}else{
				         		 $("#mainGrid").setColProp('actualAmount',{editable:false});   
				 		    	 $("#mainGrid").setColProp('deductionAmount',{editable:false});   
				 		    	 $("#mainGrid").setColProp('shtagesReason',{editable:false});   
				         	}
			         	}else{
			         		 $("#mainGrid").setColProp('actualAmount',{editable:false});   
			 		    	 $("#mainGrid").setColProp('deductionAmount',{editable:false});   
			 		    	 $("#mainGrid").setColProp('shtagesReason',{editable:false});   
			         	}
			   
			    },
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;
				},
				beforeSelectRow:function(rowid,e){

				},
				afterInsertRow: function (rowid, aData) { // 新增一行之后

				},
				onSelectRow:function(id,status){	
					$("#mainGrid").jqGrid("saveCell",lastrow,7);//保存实际收款单元格
					var rowData =$("#mainGrid").jqGrid("getRowData",id);//接收状态
					var recptStatus =rowData.cofirmFlag;
					if(recptStatus!=1||recptStatus!="1"){//未接收数据可操作
						if(status){
						    var submitCash=$("#mainGrid").jqGrid("getCell",id,'handInAmount');//上交金额
						    $("#mainGrid").jqGrid("setCell",id,'actualAmount',submitCash);//实际金额
						}else{
							$("#mainGrid").jqGrid("setCell",id,'actualAmount',"0");//实际金额
							$("#mainGrid").jqGrid("setCell",id,'deductionAmount',"0");//扣费金额
						}
						var handM=$("#mainGrid").jqGrid("getCell",id,'handInAmount');//上交金额
						var actualM=$("#mainGrid").jqGrid("getCell",id,'actualAmount');//实际金额
						var kfM=$("#mainGrid").jqGrid("getCell",id,'deductionAmount');//扣费金额
						$("#mainGrid").jqGrid("setCell",id,'lostAmount',Number(handM-actualM-kfM).toFixed(2));//交款差额
						
						var lostAmount1=$("#mainGrid").getCol('lostAmount',false, 'sum');
						$("#mainGrid").footerData("set", {"lostAmount":'<font color="red" >'+Number(lostAmount1).toFixed(2)+'</font>'},false);//交款差额合计
						var actualAmount1=$("#mainGrid").getCol('actualAmount',false, 'sum');
						$("#mainGrid").footerData("set", {"actualAmount":'<font color="red" >'+Number(actualAmount1).toFixed(2)+'</font>'},false);//实际收款合计
					}
				},
				gridComplete: function() {
					
				},
				loadComplete:function(data){
					//表格加载完成时候加载收款账户
					if(initail_sign){//初始化的时候
					    /*实际收款默认是上交金额*/
						//var ids=$("#mainGrid").jqGrid("getDataIDs");
						//for(var i=0;i<)
						initail_sign=false;
					}
					var rowNum = parseInt($(this).getGridParam('records'), 10);
                    if (rowNum > 0) {
                            $(".ui-jqgrid-sdiv").show();
                            $('.footrow td:first-child').html('合计');     
                       var handInAmount=$(this).getCol('handInAmount', false, 'sum');
                       $(this).footerData("set", { "handInAmount":Number(handInAmount).toFixed(2)},false);
                       
                       var actualAmount=$(this).getCol('actualAmount', false, 'sum');
                       $(this).footerData("set", { "actualAmount":Number(actualAmount).toFixed(2)},false);
                       
                       var deductionAmount=$(this).getCol('deductionAmount', false, 'sum');
                       $(this).footerData("set", { "deductionAmount":Number(deductionAmount).toFixed(2)},false);
                       
                       var lostAmount=$(this).getCol('lostAmount', false, 'sum');
                       $(this).footerData("set", { "lostAmount":Number(lostAmount).toFixed(2)},false);
                      } else {
                        $(".ui-jqgrid-sdiv").hide();
                    }
                
				},
				loadError:function(xhr,status,error){
					
				}
				});
			
			
function judgeSelOrNot(rowid){
    var selrow =$("#mainGrid").jqGrid('getGridParam','selarrrow');
 	for(var i=0; i<selrow.length; i++){
 		if(rowid == selrow[i]){
 			return true;
 		}
 	}
	return false;
}
function addAndDelete(cellvalue, options, rowObjec) {
    var addAndDel = '<div class="operating"></span><span class="del glyphicon glyphicon-trash"></span></div>';
    return addAndDel;
 }

//选择				
 $("#mainGrid").jqGrid('setLabel',1, '选择', 'labelstyle' );

// 时间控件初始化
$('.dateInput').datetimepicker({
	lang:"ch",           // 语言选择中文
	format:"Y-m-d",      // 格式化日期
	timepicker:false,    // 关闭时间选项
	todayButton:false    // 关闭选择今天按钮
	});

// 时间控件触发事件
$(document).on('change','.dateCtrl',function(){
	writeDate1($(this),$(this).children('option:selected').data('flag'));
})

function disabledOrNot($this,flag){
	var bf =$this.closest(".changeMargin").find(".bef");
	var af =$this.closest(".changeMargin").find(".aft");
	if(flag){
		if(!$(bf).attr("disabled")){
			$(bf).attr("disabled","disabled");
		}
		if(!$(af).attr("disabled")){
			$(af).attr("disabled","disabled");
		}
	}else{
		$(bf).removeAttr("disabled");
		$(af).removeAttr("disabled");
	}
    
}

/***
 * by GZX
 * **/
function getSystemTime(){ 
	var menuCode=$('#AUTH').attr('data-code');
    if(menuCode){
	 $.ajax({
		    url: '/manager/inventory/common/getInventoryBillsDate',
		    type: 'POST',
			async: false,
			dataType:'json',
			data:{
				'menuCode':menuCode
			},
		    success: function(data){
				if(data.result==1||data.result=='1'){
		            var cur_data =data.data;
		            current_date=cur_data.maxDate;
		        	$(".dateCtrl").trigger('change');
				}else{
					$.zxsaas_plus.showalert('error',data.desc);
				}
		    },
		    error: function(msg){
		    }
		});
    }
}
var current_date='';
function writeDate1($this,flag){
	var oDate=new Date(DateToSecond(current_date)),
	    oYear=oDate.getFullYear(),//当年
	    oMonth=oDate.getMonth()+1,//当月
	    oDay=oDate.getDate(),//当日
	    oWeek=oDate.getDay()==0?7:oDate.getDay(),//周几
	    beforeDate='',
	    afterDate='',
	    oTemp,
	    oTDate,
	    oTYear,
	    oTMonth,
	    oTDay,
	    oTWeek;	
	switch(flag){
	case 'self':
		  disabledOrNot($this,false);
		  break;
	case 'today':
		disabledOrNot($this,true);
		beforeDate=format(oDate.getTime(),'yyyy-MM-dd');
		afterDate=beforeDate;
	    break;
	case 'yesterday':
		  disabledOrNot($this,true);
		beforeDate=format(new Date(oYear,oMonth-1,oDay-1).getTime(),'yyyy-MM-dd');
		afterDate=beforeDate;
		break;
	case 'week':
		  disabledOrNot($this,true);
		afterDate=format(oDate.getTime(),'yyyy-MM-dd');
		oDate.setDate(oDate.getDate()-oWeek+1);
		beforeDate=format(oDate.getTime(),'yyyy-MM-dd');
		break;
	case 'month':
		  disabledOrNot($this,true);
		beforeDate=format(new Date(oYear,oMonth-1,1).getTime(),'yyyy-MM-dd');
		afterDate=format(oDate.getTime(),'yyyy-MM-dd');
		break;
	case 'lastmonth':
		  disabledOrNot($this,true);
		beforeDate=format(new Date(oYear,oMonth-2,1).getTime(),'yyyy-MM-dd');
		afterDate=format(new Date(oYear,oMonth-1,0).getTime(),'yyyy-MM-dd');
		break;
	case 'year':
		  disabledOrNot($this,true);
		beforeDate=format(new Date(oYear,0,1).getTime(),'yyyy-MM-dd');
		afterDate=format(oDate.getTime(),'yyyy-MM-dd');
		break;
		default:
	}
    $this.closest(".changeMargin").find(".bef").val(beforeDate);
	$this.closest(".changeMargin").find(".aft").val(afterDate);
}

$('.reset').click(function(){
	$('#inquire_option')[0].reset()
	$('#storeInput').data('sectionId','')
	$('#saleManInput').data('employeeId','')
})

/* 填写查询条件点击查询按钮 */
$(document).on("click", "#search", function(){
//    var search_obj = {};
//    search_obj = $("#inquire_option").toJsonObject();
//    search_obj.startDate=$("input[name='startDate']").val();
//    search_obj.endDate=$("input[name='endDate']").val();
//    search_obj.tongJiDateStar=$("input[name='tongJiDateStar']").val();
//    search_obj.tongJiDateEnd=$("input[name='tongJiDateEnd']").val();
//    if (!search_obj.auditStatus) {
//        search_obj.auditStatus = 0;
//    }
//    var flag1 =	 judgeStartEndDate("交款日期",$("input[name='startDate']").val(), $("input[name='endDate']").val());
//    var flag2 =  judgeStartEndDate("统计日期",$("input[name='tongJiDateStar']").val(), $("input[name='tongJiDateEnd']").val());
//    
    
//    if(flag1&&flag2){
	    jQuery("#mainGrid").jqGrid('setGridParam', {
	        url: "/manager/retail/checkPay/payMoneyAudit",
	        type:"POST",
	        datatype: "json",
	        postData: {
	            "sectionId": $('#storeInput').data('sectionId') ? $('#storeInput').data('sectionId') : null,
	            "paymentId": $('#saleManInput').data('employeeId') ? $('#saleManInput').data('employeeId') : null,
	            "startDate": $('#startDate').val(),
	            "endDate": $('#endDate').val(),
	            "auditStatus": $('#ifSure').is(':checked') ? 1 : 0
	        }, // 发送数据
	    }).trigger("reloadGrid");
//    }
});

function judgeStartEndDate(module,time1, time2){
	if(time1!=""&&time2!=""){
		time1 = DateToSecond(time1);
		time2 = DateToSecond(time2);
		if(time1>time2){
	    	$.zxsaas_plus.showalert('warning',module+"开始日期不能大于结束日期！");
			return false;
		}else{
			return true;
		}
	}else{
	     if(time1==""&&time2!=""){
	    	 $.zxsaas_plus.showalert('warning',module+"开始日期为空！"); 
	    	 return false;
	     }else if(time2==""&&time1!=""){
	    	 $.zxsaas_plus.showalert('warning',module+"结束日期为空！");
	    	 return false;
	     }
	     return true;
	}
}


/*日期转化时间*/
function DateToSecond(date){
	 var Time = new Array();   
	 Time = date.split("-"); 
	 return (new Date(Time[0],Time[1]-1,Time[2])).valueOf();  
}

/*点击确定按钮进行保存*/
$(document).on("click",".save",function(){
	$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
	 //判断提示交款差额不为零的时候长短款原因不能为空
	var topinfo =$("#inquire_option").toJsonObject();//头部信息
	var ids=$("#mainGrid").jqGrid('getGridParam','selarrrow');
	if(ids.length!=0){
		if(judgeReceptOrNot()){
			var posList=[];
			for(var i=0;i<ids.length;i++){
			    var obj={};
				obj=$("#mainGrid").jqGrid("getRowData",ids[i]);
				if(obj.lostAmount&&obj.lostAmount!=0){
					if(obj.shtagesReason==""){
						$.zxsaas_plus.showalert("提示","交款差额存在,差额原因不能为空！");
						return;
					}
				}
				posList[i]=obj;
			}
			topinfo.posList=posList;
			$.request({   
		        url: '/manager/retail/checkPay/payMoneyAuditSave', 
		        type: "POST",
			    traditional: true,
				datatype : "json",
				data:{
				   retailPay : JSON.stringify(topinfo)
				},
		        success: function (data) {
					if(data.result==1||data.result=="1"){
						$.zxsaas_plus.showalert("提示","已成功确认！");
			
					}else{
						$.zxsaas_plus.showalert("提示",data.desc);
					}
				   	$("#mainGrid").trigger("reloadGrid");
			    },
		        error: function (msg) {
		            alert(" 数据加载失败！" + msg);
		        }
		    });
		}else{
		$.zxsaas_plus.showalert("提示","已确认数据不能重复确认！")
		}
	}else{
		$.zxsaas_plus.showalert("提示","至少选择一条数据进行保存！")
	}
});

function judgeReceptOrNot(){
	var flag= true;
	var ids =$("#mainGrid").jqGrid('getGridParam','selarrrow');
	for(var i=0;i<ids.length;i++){
		var rowData = $("#mainGrid").jqGrid("getRowData",ids[i]);
		if(rowData.cofirmFlag==1||rowData.cofirmFlag=="1"){
			flag = false;
			break;
		}
	}
	if(flag){
		return true;
	}else{
		return false;
	}
	
}

/*毫秒 转化成正确格式的时间*/
function format(time, format){
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
