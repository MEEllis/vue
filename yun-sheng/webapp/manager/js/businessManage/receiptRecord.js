/*页面初始化*/
$(function(){
	/* 获取 门店接口信息 */
	 $.ajax({
      url: '/manager/retail/checkPay/enablesectionId',
      success: function (data){
		   $(".md").html("");
		   
		   for(var i=0;i<data.data.sectionList.length;i++){
			   $(".md").append("<option value='"+data.data.sectionList[i].id+"'>"+data.data.sectionList[i].name+"</option>");// 门店信息加载
		   }
		   
	 },
      error: function (msg) {
          alert(" 数据加载失败！" + msg);
      }
  });
	 /* 获取交款人信息 */
	 $.ajax({
      url: '/manager/retail/checkPay/empListData',
      success: function (data){
		   $(".jkr").html("");
		   for(var i=0;i<data.data.empList.length;i++){
			   $(".jkr").append("<option value='"+data.data.empList[i].id+"'>"+data.data.empList[i].name+"</option>");// 交款人信息加载
		   }
	 },
      error: function (msg) {
          alert(" 数据加载失败！" + msg);
      }
  });
	 
	
});	
///*根据门店加载的收款账户*/
$(document).on("change",".md",loadSelect);			
function  loadSelect(){	
	var sectionId=$(".md").val();
	$.ajax({
	url: '/manager/retail/checkPay/findAccountList',
	type: "GET",
	datatype : "json",
	data:{
		sectionId : sectionId
	},
	success: function (data){
		/*收款账户*/
		 var len =0;
		 if(data.data.accountList){
			 len =data.data.accountList.length;
			 var val_select={};
			 if(len!=0){
				 for(var i=0;i<len;i++){
					 var v=data.data.accountList[i].accountId.toString();
					 console.log(typeof(v))
					 val_select[v]=data.data.accountList[i].accountName;
				 }
				
			 }
			 $("#mainGrid").setColProp('accountId',{editoptions:{value:val_select}});
		 }
	},
	error: function (msg) {
		
	}
});			
				
				
}

			var lastrow ='';
			var lastcell=''; 
            var lastsel='';//最后一次选中的行
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			$("#mainGrid").jqGrid({
				url:"/manager/retail/checkPay/payMoneyAudit",
				mtype:"GET",
				datatype: "json",				
				jsonReader  : {	
						root: "data.aduitList",
						repeatitems: false
							},
				colNames:['id','交款门店','交款人','上交金额','收款账户','实际收款','扣费金额','交款差额','长、短款原因','交款流水号','交款日期','统计时间','备注'], //是否核对         
			    colModel:[
			                {name:"id",width:"150px",align:"center",sortable:false,hidden:true},  
			            	{name:"sectionId",width:"150px",align:"center",sortable:false},  
			            	{name:"createBy",width:"150px",align:"center",sortable:false}, // 交款人
			            	{name:"handInAmount",width:"150px",align:"center",sortable:false}, // 上交金额（交款金额）
//			            	{name:"comfirmFlag",width:"150px",align:"center",sortable:false,editable:true,edittype:'checkbox',formatoptions:{elmprefix:'(*)',disabled: false},editoptions:{value:"是:否",dataEvents:[{type:"click",fn:function(){	
//			            		if($(this).prop("checked")){
//			            		 $(this).parent("td").next().next().text($(this).parent("td").prev().text());
//			            		}else{
//			            		 $(this).parent("td").next().next().text("0");
//			            		}
//			            		var sj_cash=$(this).parent("td").prev().text();//上交金额
//			            		var sjsk=$(this).parent("td").next().next().text();//实际收款
//			            		var kfje=$(this).parent("td").next().next().next().text();//扣费金额
//			            		$(this).parent("td").next().next().next().next().text(sj_cash-sjsk-kfje);//交款差额
//			            		   var actualAmount=$("#mainGrid").getCol('actualAmount', false, 'sum');//实际收款
//			            		    $("#mainGrid").footerData("set", {"actualAmount":'sum：<font color="red" >'+actualAmount+'</font>'},false);
//			            		    var lostAmount=$("#mainGrid").getCol('lostAmount', false, 'sum');//交款差额
//			            		    $("#mainGrid").footerData("set", {"lostAmount":'sum：<font color="red" >'+lostAmount+'</font>'},false);
//			            		}}]}}, 
			            	{name:"accountId",width:"150px",align:"center",sortable:false,edittype:"select",editoptions:{size:1}}, // 收款账户loadSelect
			            	{name:"actualAmount",width:"150px",align:"center",sortable:false}, 
			            	{name:"deductionAmount",width:"150px",align:"center",sortable:false}, 
			            	{name:"lostAmount",width:"150px",align:"center",sortable:false}, 
			            	{name:"shtagesReason",width:"150px",align:"center",sortable:false}, 
			            	{name:"flowNo",width:"150px",align:"center",sortable:false}, 
			            	{name:"paymentDate",width:"150px",align:"center",sortable:false}, 
			            	{name:"statisticsDate",width:"150px",align:"center",sortable:false},
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
			    onCellSelect:function(){
			         	
			    },
			    beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow;
					lastcell = iCol;
				},
				onSelectRow:function(id,status){
					    $("#mainGrid").jqGrid("saveCell",lastrow,7);//保存实际收款单元格
					    if(status){
					    	 var submitCash=$("#mainGrid").jqGrid("getCell",id,'handInAmount');//上交金额
							   $("#mainGrid").jqGrid("setCell",id,'actualAmount',submitCash);//实际金额
	            		   // $(this).parent("td").next().next().text($(this).parent("td").prev().text());
	            		}else{
	            			$("#mainGrid").jqGrid("setCell",id,'actualAmount',"0");//实际金额
	            		    //$(this).parent("td").next().next().text("0");
	            		}
	            		var sj_cash=$("#mainGrid").jqGrid("getCell",id,'handInAmount');//上交金额
	            		var sjsk=$("#mainGrid").jqGrid("getCell",id,'actualAmount');//实际收款
	            		var kfje=$("#mainGrid").jqGrid("getCell",id,'deductionAmount');//扣费金额
	            		$(this).parent("td").next().next().next().next().text(sj_cash-sjsk-kfje);//交款差额
	            		var actualAmount=$("#mainGrid").getCol('actualAmount', false, 'sum');//实际收款
	            		 $("#mainGrid").footerData("set", {"actualAmount":'sum：<font color="red" >'+actualAmount+'</font>'},false);
	            		var lostAmount=$("#mainGrid").getCol('lostAmount', false, 'sum');//交款差额
	            		 $("#mainGrid").footerData("set", {"lostAmount":'sum：<font color="red" >'+lostAmount+'</font>'},false);
				},
				beforeSelectRow:function(rowid,e){

				},
				afterInsertRow: function (rowid, aData) { // 新增一行之后

				},
				gridComplete: function() {
					
				},
				loadComplete:function(data){
					//表格加载完成时候加载收款账户
					loadSelect();
					var rowNum = parseInt($(this).getGridParam('records'), 10);
                    if (rowNum > 0) {
                            $(".ui-jqgrid-sdiv").show();
                       var handInAmount=$(this).getCol('handInAmount', false, 'sum');
                       $(this).footerData("set", { "handInAmount":'sum：<font color="red" >'+handInAmount+'</font>'},false);
                       
                       var actualAmount=$(this).getCol('actualAmount', false, 'sum');
                       $(this).footerData("set", { "actualAmount":'sum：<font color="red" >'+actualAmount+'</font>'},false);
                       
                       var deductionAmount=$(this).getCol('deductionAmount', false, 'sum');
                       $(this).footerData("set", { "deductionAmount":'sum：<font color="red" >'+deductionAmount+'</font>'},false);
                       
                       var lostAmount=$(this).getCol('lostAmount', false, 'sum');
                       $(this).footerData("set", { "lostAmount":'sum：<font color="red" >'+lostAmount+'</font>'},false);
                      } else {
                        $(".ui-jqgrid-sdiv").hide();
                    }
                
				},
				loadError:function(xhr,status,error){
					
				}
				})

// 时间控件初始化
$('.dateInput').datetimepicker({
	lang:"ch",           // 语言选择中文
	format:"Y-m-d",      // 格式化日期
	timepicker:false,    // 关闭时间选项
	todayButton:false    // 关闭选择今天按钮
	});
// 时间控件触发事件
$(document).on('change','.dateCtrl',function(){
	writeDate($(this),$(this).children('option:selected').data('flag'));
})
// 填充时间
function writeDate($this,flag){
	var oDate=new Date(),
	    oYear=oDate.getFullYear(),
	    oMonth=oDate.getMonth()+1,
	    oDay=oDate.getDate(),
	    oWeek=oDate.getDay(),
	    oTemp,
	    oTDate,
	    oTYear,
	    oTMonth,
	    oTDay,
	    oTWeek;	
	switch(flag){
	case 'today':
		oTYear=oYear;
		oTMonth=oMonth;
		oTDay=oDay;
	    break;
	case 'yesterday':
		oTemp=oDate-60*60*24*1000;
		oTDate=new Date(oTemp);
		oTYear=oTDate.getFullYear();
		oTMonth=oTDate.getMonth()+1;
		oTDay=oTDate.getDate();
		break;
	case 'week':
		oTDate=new Date(oDate);
		oWeek=oTDate.getDay();
		oTemp=oTDate-60*60*24*1000*oWeek;
		oTDate=new Date(oTemp);
		oTYear=oTDate.getFullYear();
		oTMonth=oTDate.getMonth()+1;
		oTDay=oTDate.getDate();
		break;
	case 'month':
		oTYear=oYear;
		oTMonth=oMonth;
		oTDay=1;
		break;
	case 'lastmonth':
		oTDay=1;
		oTYear=oYear;
		if(oMonth===3){
			oMonth=2;
			
			oTMonth=2;
			if((oYear%100!==0&&oYear%4===0)||oYear%400===0){
				
				oDay=29;
			}else{
				oDay=28;
			}
		}
		if(oMonth===1){
			oTYear=oYear-1;
			oMonth=12;
			oTMonth=12;
			oMonth=31;
		}
		if(oMonth===2||oMonth===4||oMonth===6||oMonth===8||oMonth===9||oMonth==11){
			oMonth=oMonth-1;
			oTMonth=oMonth;
			oDay=31;
		}
		if(oMonth===5||oMonth===7||oMonth===10||oMonth===12){
			oMonth=oMonth-1;
			oTMonth=oMonth;
			oDay=30;
		}
		break;
	case 'year':
		oTYear=oYear;
		oTMonth=1;
		oTDay=1;
		break;
		default:
	}
	$this.parent().prev().prev().children('input').val(oTYear+'-'+(oTMonth<10?'0'+oTMonth:oTMonth)+'-'+(oTDay<10?'0'+oTDay:oTDay))
	$this.parent().prev().children('input').val(oYear+'-'+(oMonth<10?'0'+oMonth:oMonth)+'-'+(oDay<10?'0'+oDay:oDay));
}


/* 填写查询条件点击查询按钮 */
$(document).on("click","#search",function(){
	   var search_obj={};
	   search_obj=$("#inquire_option").toJsonObject();
	   if(!search_obj.auditStatus){
		   search_obj.auditStatus=0;
	   }
	    console.log(search_obj);
		 jQuery("#mainGrid").jqGrid('setGridParam', {
			     url:"/manager/retail/checkPay/payMoneyAudit",
			     datatype:"json",
		        postData:{"sectionId ":search_obj.sectionId,"paymentId":search_obj.paymentId,"startDate":search_obj.startDate,"endDate":search_obj.endDate,"tongJiDateStar":search_obj.tongJiDateStar,"tongJiDateEnd":search_obj.tongJiDateEnd,"auditStatus":search_obj.auditStatus}, // 发送数据
		    }).trigger("reloadGrid");  
});

/*点击确定按钮进行保存*/
$(document).on("click",".save",function(){
	$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
	 //判断提示交款差额不为零的时候长短款原因不能为空
	var topinfo =$("#inquire_option").toJsonObject();//头部信息
	var ids=$("#mainGrid").jqGrid('getGridParam','selarrrow');
	if(ids.length!=0){
			var posList=[];
			for(var i=0;i<ids.length;i++){
				var obj={};
				obj=$("#mainGrid").jqGrid("getRowData",ids[i])
				obj.paymentDate=format(Number(obj.paymentDate),'yyyy-MM-dd');//临时转换时间1
			    obj.statisticsDate=format(Number(obj.statisticsDate),'yyyy-MM-dd');//临时转换时间2
				posList[i]=obj;
			}
			//data.topinfo=topinfo;
			topinfo.posList=posList;
			$.ajax({   
		        url: '/manager/retail/checkPay/saveParagraphLenRecord', 
		        type: "POST",
			    traditional: true,
				datatype : "json",
				data:{
				   retailPay : JSON.stringify(topinfo)
				},
		        success: function (data) {
				    	//$("#mainGrid").trigger("reloadGrid");
			      },
		        error: function (msg) {
		            alert(" 数据加载失败！" + msg);
		        }
		    });
	}else{
			$.zxsaas_plus.showalert("提示","至少选择一条数据进行保存！")
	}
			
});


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
