$(function(){

	$("#confirm_fa").text("确认发卡");  

	var contactUId="" ;
	 $.request({
         url: '/manager/member/facardInfo/initFaCardInfo',
         type: "POST",
		 data:{"id":$("#zcardId").val()},
		 traditional: true,
         success: function (data) {
			 data.data.cardNum&&$("#cardNum").val(data.data.cardNum);//会员卡卡号
		 	//往来单位
			 if($("#id").val()=="-1"){
				if(data.data.retailUnit){
					data.data.retailUnit.id&&$("#contactUnitid").val(data.data.retailUnit.id);
					data.data.retailUnit.name&&$("#unitCome").val(data.data.retailUnit.name);
				}
			 }
			//发卡日期
			$("#issuingDate").val(new Date().toLocaleDateString().replaceAll("/", "-"));
			//生效日期
			$("#effectiveDate").val(new Date().toLocaleDateString().replaceAll("/", "-"));
			//有效时间
			if($("#id").val()=="-1"){
			  data.data.activeTime&&$("#effectivMon").val(data.data.activeTime);
			}
			//失效日期
			 var current =$("#effectivMon").val();
			 var effectiveDate=$("#effectiveDate").val(); 
			 if(current&&effectiveDate){
			     var effectDateValue =new Date(effectiveDate);
			     effectDateValue.setMonth(effectDateValue.getMonth()+Number(current))
			     $("#invalidDate").val(format(effectDateValue.getTime(),'yyyy-MM-dd')) ;//失效日期
			 }
//			 //发展时间
//			 $("#devolopDate").val(new Date().toLocaleDateString().replaceAll("/", "-"));
		 	//会员类型
		 	if(data.data.typeNameList){
		 		for(var i=0;i<data.data.typeNameList.length;i++){
		 			if(data.data.typeNameList[i].isStop==0||data.data.typeNameList[i].isStop=="0")
			 		$("#typeName").append("<option value='"+data.data.typeNameList[i].id+"'>"+data.data.typeNameList[i].typeName+"</option>");
			 	}
		 		$("#typeName").val(data.data.typeName);//会员类型
		 	}
		    //selectId =$("select[name=cardTypeId]>option:selected").val();
		 
	 	},
         error: function (msg) {
         }
     });
	
	if($("#id").val()!="-1"){//已经发卡
		$("#confirm_fa").text("确认修改");
	 $.request({
		 
         url: '/manager/member/facardInfo/selectOne',
         type: "POST",
		 data:{"id":$("#id").val()},
		 traditional: true,
         success: function (data) { 
			  if(data.data.rows.issuingDate){
		       var issuingDate = new Date(data.data.rows.issuingDate);
		       data.data.rows.issuingDate =format(issuingDate.getTime(), 'yyyy-MM-dd');//发卡日期
			  }else{
				  data.data.rows.issuingDate ="";
			  }
			  
			  if(data.data.rows.effectiveDate){
		      var effectiveDate = new Date(data.data.rows.effectiveDate);
		      data.data.rows.effectiveDate =format(effectiveDate.getTime(), 'yyyy-MM-dd');//生效日期
		      }else{
		    	  data.data.rows.effectiveDate="";
		      }
			  
		      if(data.data.rows.birth){
		      var birth = new Date(data.data.rows.birth);
		      data.data.rows.birth =format(birth.getTime(), 'yyyy-MM-dd');//出生日期
		      }else{
		    	  data.data.rows.birth="";
		      }
		      
		      if(data.data.rows.invalidDate){
		      var invalidDate = new Date(data.data.rows.invalidDate);
		      data.data.rows.invalidDate =format(invalidDate.getTime(), 'yyyy-MM-dd');//失效日期
		      }else{
		    	  data.data.rows.invalidDate="";
		      }
		      if(data.data.rows.fzDate){
			      var fzDate = new Date(data.data.rows.fzDate);
			      data.data.rows.fzDate =format(fzDate.getTime(), 'yyyy-MM-dd');//失效日期
			   }else{
			    	  data.data.rows.fzDate="";
			      }
		 	  $("#mainInfo").writeJson2Dom(data.data.rows);
		 	  $("#fzrName").val(data.data.rows.fzrName);
		 	  contactUId=data.data.rows.contactUnitid;
		 	  $("input[name=score]").prop("disabled",true);//初始积分
		 	// $("input[name=wechat]").prop("disabled",true);//微信
		 	// $("input[name=qq]").prop("disabled",true);//QQ
		 	// $("input[name=alipay]").prop("disabled",true);//支付宝

		 	//往来单位
				if(data.data.rows){
					console.log(data.data.rows.contactUnitid)
					data.data.rows.contactUnitid&&$("#contactUnitid").val(data.data.rows.contactUnitid);
					data.data.rows.contactUnitid&&$("#unitCome").val(data.data.rows.unitName);
				}
		 	 /* $("#invalidDate").prop("disabled",true);//失效日期
		 	  * 
*/	 	},
         error: function (msg) {
         }
     });	
	}
})

/*有效时间*/
$("#effectivMon").on("input propertyinput blur",function(){
	   $("#invalidDate").val("");
	 var effectiveDate=$("#effectiveDate").val(); //生效日期 
	 var effectDateValue =new Date(effectiveDate);
	 if(effectiveDate){
		 var current =$(this).val();
		  effectDateValue.setMonth(effectDateValue.getMonth()+Number(current))
	    	 $("#invalidDate").val(format(effectDateValue.getTime(),'yyyy-MM-dd')); //失效日期
	 }
});

/*生效时间*/
$("#effectiveDate").on("blur",function(){
	   $("#invalidDate").val("");
	 var current =$("#effectivMon").val();
	
	 if(current){
	 $("#topValidate").data("bootstrapValidator").validateField("effectivMon");
     var effectiveDate=$(this).val(); //生效日期 
     var effectDateValue =new Date(effectiveDate);
     effectDateValue.setMonth(effectDateValue.getMonth()+Number(current))
      $("#topValidate").data("bootstrapValidator").isValidField("effectivMon")&&$("#invalidDate").val(format(effectDateValue.getTime(),'yyyy-MM-dd')) ;//失效日期
	 }
});



function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];
		var colName0 = ['id','往来单位编码','往来单位名称'];  //发展人
		var colName1 = ['id','员工编码','员工名称'];  //发展人
		var colName2 = ['id','会员卡号','持卡人','手机号'];  //发展人
		colNamec[0]=colName0;
		colNamec[1]=colName1;
		colNamec[2]=colName2;
		
		var JqGridColModelc = [];
	 
		//批量制卡
		var JqGridColModel0 =[
                                {name:'id',index:'id', width:200,align:'center',sortable:false,hidden:true},
								{name:'code',index:'code', width:200,align:'center',sortable:false},
								{name:'name',index:'name', width:200,align:'center',sortable:false}
								
			                ];
		var JqGridColModel1 =[
                                {name:'id',index:'id', width:200,align:'center',sortable:false,hidden:true},
								{name:'code',index:'code', width:200,align:'center',sortable:false},
								{name:'name',index:'name', width:200,align:'center',sortable:false}
								
			                ];
		var JqGridColModel2 =[
                              {name:'id',index:'id', width:200,align:'center',sortable:false,hidden:true},
								{name:'cardNum',index:'cardNum', width:200,align:'center',sortable:false},
								{name:'cardholder',index:'cardholder', width:200,align:'center',sortable:false},
								{name:'tel1',index:'tel1', width:200,align:'center',sortable:false}
			                ];
		JqGridColModelc[0]=	JqGridColModel0;   
		JqGridColModelc[1]=	JqGridColModel1;  
		JqGridColModelc[2]=	JqGridColModel2;  
		
		var rowid1='';
		var colid='';
		var select_name='';
		var defaults = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox",//功能按钮存放容器。遵照css选择器书写	
		pager:"",
		TableInfo:"0",
		choose:true,
		edit:true
		};
		
		var options = $.extend(defaults,options);
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			//var toggleflag=false;//冻结时候切换用
			var c=options.TableInfo;//参数index
				
			//console.log(c);
			var colNames = colNamec[c];
			var JqGridColModel = JqGridColModelc[c];
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
						colNames:colNames,          
			            colModel:JqGridColModel,
			            cellEdit:options.edit,
			            cellsubmit:'clientArray',
			            editurl: 'clientArray',
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		       
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						multiselect:true,
						multiboxonly:true,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
							lastrow = iRow;
							lastcell = iCol;
						},
						onCellSelect:function(id,index,cellcontent,e){
					     
						},
						onSelectRow:function(rowid,status){
						},
						beforeSelectRow:function(rowid,e){
							  if(options.TableInfo==0){
                            	  var id=$(options.TableName).jqGrid('getGridParam','selrow');
                            	  if(id==rowid){
                            		  return false;
                            	  }else{
                            	     $(options.TableName).jqGrid("resetSelection");//设置单选   只选中一行
                            	     return true;
                            	  }
                             }
							  else if(options.TableInfo==1){
                            	 var id=$("#jqGrid_yg").jqGrid('getGridParam','selrow');
	                           	  if(id==rowid){
	                           		  return false;
	                           	  }else{
	                           	     $("#jqGrid_yg").jqGrid("resetSelection")//设置单选   只选中一行
	                           	     return(true);
	                           	  }
                            	 
                             }else if(options.TableInfo==2){
                            	 var id=$("#jqGrid_hy").jqGrid('getGridParam','selrow');
	                           	  if(id==rowid){
	                           		  return false;
	                           	  }else{
	                           	     $("#jqGrid_hy").jqGrid("resetSelection")//设置单选   只选中一行
	                           	     return(true);
	                           	  }
                            	 
                             }
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后
                               
						},
						gridComplete: function() {

						},
					
						loadComplete:function(data){
						},
						loadError:function(xhr,status,error){
			
						}
						})
		
		}
}
//保存
$(document).on("click",".save",function(e){
	  e.preventDefault();
	  var val_password= $("input[name='cardPassword']").val();//密码
	  if($("#fzrType").val()!=""){
			 if($("#fzrId").val()==""){
				 $.zxsaas_plus.showalert("提示","发展人不能为空");
				 return false;
			 }
	 }
	
		 $("#topValidate").data("bootstrapValidator").validate();
		  $("#bottomValidate").data("bootstrapValidator").validate();
		  var flagTop = $("#topValidate").data("bootstrapValidator").isValid();
		  var flagBottom = $("#bottomValidate").data("bootstrapValidator").isValid();
		
	    if(flagTop&&flagBottom){//验证通过
	    	  var obj=$("#mainInfo").toJsonObject();
	    	  obj.effectivMon=$("#effectivMon").val();
	    	  if(!obj.score){//初始积分
	    		  if($("input[name='score']").prop("disabled")){ obj.score=$("input[name='score']").val()||0};
	    	  }
	    	  if(!obj.invalidDate){//失效日期
		    	  if($("#invalidDate").prop("disabled")){ obj.invalidDate=$("#invalidDate").val()||""};
		      }
	    	  obj.cardTypeId=$("select[name=cardTypeId]>option:selected").val();//会员类型
			  $.request({
			         url: '/manager/member/facardInfo/saveFaCardInfo',
			         type: "POST",
					 datatype : "json",
					 contentType: "application/json",
					 data: JSON.stringify(obj),
					 traditional: true,
			         success: function (data) {
				  		$.zxsaas_plus.showalert("提示",data.desc);
				        if(data.result==1){
				        	 setTimeout(function(){
						        	//window.location.href='/manager/member/cardInfo/toPage';
						        	  $(window.parent.document).find(".body_right .tabBox a.active").find("span").trigger("click");
						        },1000);
				        }
					 },
			         error: function (msg) {
			            
			         }
			     });
	    }
		 
		 
	  

 });

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

$(document).on("click","#fzrName",function(){
	fzrModel();
});

//往来单位弹窗(往来单位/发展人)
$(document).on("click",".unitCome",function(){
	 loadmodal({TableName:"#jqGrid_wldw2",pager:"#jqGridPagerWldw2",edit:false,TableInfo:0,LoadTableUrl: "/manager/authority/contactInfo/selectContactUnitList",choose:true});
	 $("#wldw2").modal('show');
});
$("#wldw2").on("shown.bs.modal",function(e){
	 $("#jqGrid_wldw2").setGridWidth($(this).find(".grid-wrap").width());
	 $("#cb_jqGrid_wldw2").hide();
});
//保存
$(document).on("click",".saveWLDW2",function(e){
		 var id=$("#jqGrid_wldw2").jqGrid('getGridParam','selrow');
		 if(id){
		 var rowData =$("#jqGrid_wldw2").jqGrid('getRowData',id);
		 $("#contactUnitid").val(rowData.id);
		 $("#unitCome").val(rowData.name);
		 }
});

//改变发展人类型
$(document).on("change","#fzrType",function(){
	 $("#fzrId").val("");
	 $("#fzrName").val("");
});


$(document).on("click",".fzrName",function(){
	   fzrModel();
});
//发展人模态框
function fzrModel(){
	var type=$("#fzrType").val();
	if(type==1){//往来单位
	    loadmodal({TableName:"#jqGrid_wldw",pager:"#jqGridPagerWldw",edit:false,TableInfo:0,LoadTableUrl: "/manager/authority/contactInfo/selectContactUnitList",choose:true});
		$("#wldw").modal('show');
	}
	else if(type==2){//员工
		 loadmodal({TableName:"#jqGrid_yg",pager:"#jqGridPagerYg",edit:false,TableInfo:1,LoadTableUrl: "/manager/authority/employeeInfo/selectEmployeeList",choose:true});
		$("#yg").modal('show');
	}
	else if(type==3){//会员
		 loadmodal({TableName:"#jqGrid_hy",pager:"#jqGridPagerHy",edit:false,TableInfo:2,LoadTableUrl: "/manager/member/facardInfo/selectFzrCard",choose:true});
		 $("#hy").modal('show');
	}
	else{
		$.zxsaas_plus.showalert("提示","请选择发展人类型");
	}
}
//调整表格
$("#wldw").on("shown.bs.modal",function(){
	 $("#jqGrid_wldw").setGridWidth($(this).find(".modal-content").width()-30);
	 var width=document.body.scrollWidth;
	 if(width>763||width==763){
		 $(this).find(".ui-jqgrid").css({"borderLeft":"1px solid #cfcfcf","borderRight":"1px solid #cfcfcf"});
	 }
	 $("#cb_jqGrid_wldw").hide();
});
$("#yg").on("shown.bs.modal",function(){
	 $("#jqGrid_yg").setGridWidth($(this).find(".modal-content").width()-30);
	 var width=document.body.scrollWidth;
	 if(width>763||width==763){
		 $(this).find(".ui-jqgrid").css({"borderLeft":"1px solid #cfcfcf","borderRight":"1px solid #cfcfcf"});
	 }
	 $("#cb_jqGrid_yg").hide();
});
$("#hy").on("shown.bs.modal",function(){
	 $("#jqGrid_hy").setGridWidth($(this).find(".modal-content").width()-30);
	 var width=document.body.scrollWidth;
	 if(width>763||width==763){
		 $(this).find(".ui-jqgrid").css({"borderLeft":"1px solid #cfcfcf","borderRight":"1px solid #cfcfcf"});
	 }
	 $("#cb_jqGrid_hy").hide();
});


//保存
$(document).on("click",".saveWLDW",function(e){
		 var id=$("#jqGrid_wldw").jqGrid('getGridParam','selrow');
		 var rowData =$("#jqGrid_wldw").jqGrid('getRowData',id);
		 $("#fzrId").val(id);
		 $("#fzrName").val(rowData.name);
});

$(document).on("click",".saveHY",function(e){
	 var id=$("#jqGrid_hy").jqGrid('getGridParam','selrow');
	 var rowData =$("#jqGrid_hy").jqGrid('getRowData',id);
	 $("#fzrId").val(id);
	 $("#fzrName").val(rowData.cardholder);
});
$(document).on("click",".saveYG",function(e){
	 var id=$("#jqGrid_yg").jqGrid('getGridParam','selrow');
	 var rowData =$("#jqGrid_yg").jqGrid('getRowData',id);
	 $("#fzrId").val(id);
	 $("#fzrName").val(rowData.name);
});

//往来单位搜索(发展人)
$(document).on("click","#wldwQuery",function(e){
	 jQuery("#jqGrid_wldw").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{"keyWord":$.trim($(".search_fzwldw").val())}, //发送数据  
	    }).trigger("reloadGrid");  
});

//往来单位搜索
$(document).on("click","#wldwQuery2",function(e){
	 jQuery("#jqGrid_wldw2").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{"keyWord":$.trim($(".search_wldw").val())}, //发送数据  
	    }).trigger("reloadGrid");  
});

//会员搜索

$(document).on("click","#hyQuery",function(e){
	 jQuery("#jqGrid_hy").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{"keyword":$.trim($(".search_hy").val())}, //发送数据  
	    }).trigger("reloadGrid");  
});

//员工搜索
$(document).on("click","#ygQuery",function(e){
	 jQuery("#jqGrid_yg").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{"keyWord":$.trim($(".search_yg").val())}, //发送数据  
	    }).trigger("reloadGrid");  
});

/************************验证**************************************/

/*****************根据筛选证件类型验证证件号码***********************/
//$('#bottomValidate').find('input[name="certificateno"]').on('blur', function(){  
//    var kind =$("select[name=documenttype]>option:selected").val();
//    var f =false;
//    if(kind=="身份证"||kind=="身份证号"){
//    	f=true;
//    }
//    $('#bottomValidate').bootstrapValidator('enableFieldValidators', 'certificateno', f);  
//    if (f) {  
//        $('#bottomValidate').bootstrapValidator('validateField', 'certificateno') ; 
//    }  
//});  
