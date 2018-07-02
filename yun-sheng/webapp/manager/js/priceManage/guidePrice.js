$("#datetimepickerStart").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		})
$("#endTime").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		})
$(".billDate").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
	}).on('blur', function (ev) {  
        refreshValidatorField("billsDate",'#inquire_option');//刷新验证信息
    }); 
	initTree();
function initTree(){ 
	//树设置参数
	var setting = {
		data: {//数据属性设置
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
		},
        async: {//从后台获取数据
            enable: true,
            url: "/manager/Tgoodsclass/findTree2?groupId="+gl_groupId,
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
        	onClick:function(event, treeId, treeNod){
        	globalId=treeNod.id*1;
        	var begintime=$("#datetimepickerStart").val();
    		var endTime=$("#endTime").val();
    		var val=$(".getID").data("pricemainid");
    		
    		$.request({
    			url:"/manager/priceManage/queryOrder",
    			type:"GET",
    			dataType:"json",
    			data:{
    			billsDateBegin:begintime,
    			billsDateEnd:endTime,
    			remark:$(".timeRemark").val(),
    			keyWord:$(".filterVal").val(),
    			tpriceMainId:val,
    			goodsClassId:globalId
    			},
    			success:function(data){

    			  	 var oDate=new Date(data.data.tpriceMain.billsDate),
    			  	  oYear=oDate.getFullYear(),
    			  	  oMonth=oDate.getMonth()+1,
    			  	  oDay=oDate.getDate();
    				  $(".getID").data("pricemainid",data.data.tpriceMain.id);
    				  $(".getID").val(data.data.tpriceMain.billsCode);
    				  
    				  $(".billDate").val(oYear+"-"+oMonth+"-"+oDay);
    				  $(".remark").val(data.data.tpriceMain.remark);
    				  $(".addPer").val(data.data.tpriceMain.createName);
    				  $(".revisePer").val(data.data.tpriceMain.updateName);
    				  $(".carryPer").val(data.data.tpriceMain.executeName);
    				  $("#mainGrid").jqGrid("clearGridData"); 
    				  
    				  for(var i=0;i<data.data.priceVoList.length;i++){
    					  $("#mainGrid").jqGrid('addRowData', i + 1,data.data.priceVoList[i]);
    				  }
    				  
    			  
    			}
    		})
        	
        }
			
		},
		view: {//样式设置
			showIcon: true
		}
	};
	$.fn.zTree.init($("#goodsClassify"), setting);
	var zTree = $.fn.zTree.getZTreeObj("goodsClassify");
    zTree.expandAll(true);  
};
var globalId=null;
(function(){

	 /**
	 * 表格初始化
	 */

				$.jgrid.defaults.width =500;
				$.jgrid.defaults.responsive = true;
				$.jgrid.defaults.styleUI = 'Bootstrap';	

		               
						$("#mainGrid").jqGrid({
							url:"/manager/priceManage/orderAndList",
							mtype:"GET",
					//		datatype: "jsonstring",
					//        datastr: mydata,
							datatype: "json",
//							data:{"name":1},
							//datatype:"local",						
							jsonReader  : {	
									root: "data.priceVoList",
									repeatitems: false
									
										},
							colNames:["商品类别","商品品牌","商品型号","商品颜色","商品编码","商品名称","集团指导价一","集团指导价二","备注","商品ID","类别ID","品牌ID","颜色ID","集团指导价表ID","集团ID"],          
					        colModel:[
										
										{name:"goodsCategoryName",index:"goodsCategoryId",align:"center",width:100,sortable: false},
										{name:"goodsBrandName",index:"goodsBrandId",align:"center",width:100,sortable: false},
										{name:"goodsModel",index:"goodsModel",align:"center",width:100,sortable: false},
										{name:"goodsColorName",index:"goodsColorId",align:"center",width:100,sortable: false},
										{name:"code",index:"code",align:"center",width:100,sortable: false},
										{name:"name",index:"name",align:"center",width:100,sortable: false},
										{name:"groupGuidePrice1",index:"groupGuidePrice1",align:"center",width:100,editable:true,edittype:"text",formatter:"integer",sortable: false,editoptions:{onblur:"checkInput.checkNum(this,12)"}},
										{name:"groupGuidePrice2",index:"groupGuidePrice2",align:"center",width:100,editable:true,edittype:"text",formatter:"integer",sortable: false,editoptions:{onblur:"checkInput.checkNum(this,12)"}},
										{name:"remark",index:"remark",align:"center",width:100,editable:true,edittype:"text",sortable: false,editoptions:{onkeyup:"checkInput.clearNoText(this,100)"}},
										{name:"goodsId",index:"goodsId",align:"center",width:100,hidden:true,hidedlg:true,sortable: false},
										{name:"goodsCategoryId",index:"goodsCategoryId",align:"center",width:100,hidden:true,hidedlg:true,sortable: false},
										{name:"goodsBrandId",index:"goodsBrandId",align:"center",width:100,hidden:true,hidedlg:true,sortable: false},
										{name:"goodsColorId",index:"goodsColorId",align:"center",width:100,hidden:true,hidedlg:true,sortable: false},
										{name:"tpriceGroupId",index:"tpriceGroupId",align:"center",width:100,hidden:true,hidedlg:true,sortable: false},
										{name:"groupId",index:"groupId",align:"center",width:100,hidden:true,hidedlg:true,sortable: false}
					                ],
							        //loadonce: false,
							        sortable:false,			            
							        rownumbers:true,
							        multiselect:true,
							        cellsubmit: 'clientArray',//单元格保存内容的位置		
							        editurl: 'clientArray',
							       
							        rowNum:-1,
							        viewrecords: true,		           
							//        multiselect:true,
							       	cellEdit:true,
							        width: "100%" ,
							        height: $(window).height()*0.5,
							        //scroll:true,
							        //treeGrid: true,
							        //treeGridModel: 'adjacecncy',
							        //treedatatype: "local",
							       // ExpandColumn: 'subjectCode',
							        /*altRows:true,
							        altclass:'.grid-row-odd',*/
									autowidth:true,
									 prmNames : {  
							            page:null,    // 表示请求页码的参数名称  
							            rows:null,    // 表示请求行数的参数名称  
							            sort: null, // 表示用于排序的列名的参数名称  
							            order: null, // 表示采用的排序方式的参数名称  
							            search:null, // 表示是否是搜索请求的参数名称  
							            nd:null, // 表示已经发送请求的次数的参数名称  
							            id:null // 表示当在编辑数据模块中发送数据时，使用的id的名称   
							            
							        },
							       
									shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
//									footerrow:true,  //设置表格显示表脚
									userDataOnFooter:true,//设置userData 显示在footer里
									/*grouping:true, 
									groupingView :
									{ groupField : ['creditDirection'] },*/
									ondblClickRow:function(id){
									//双击进入编辑
											var delid = id;
											
									},
									onCellSelect:function(id,index,e){
										
									},
									onSelectRow:function(id){
									
										
										
									
									},
									onSortCol:function(){
										debugger;
									},
									beforeSelectRow:function(rowid,e){
									
									},
//									 beforeEditCell:function(rowid,cellname,v,iRow,iCol)
//									{
//									  lastrow = iRow; 
//									  lastcell = iCol;
//									},
									afterInsertRow: function (rowid, aData) { //新增一行之后
							
									},
									gridComplete: function() {
									
									},
									loadComplete:function(data){
										//console.log(data);
//										footerData();
										if(!data.data.status){
											return;
										}
										if(data.data.tpriceMain.executeStatus){
									  		$('.showState').attr('src',basePath+'/images/status/statusExecute.png');
									  		$('#mainGrid').setColProp('groupGuidePrice1',{editable:false});
											$('#mainGrid').setColProp('groupGuidePrice2',{editable:false});
											$('#mainGrid').setColProp('remark',{editable:false});
											$(".remark").prop('disabled',true);
											$('.save').prop('disabled',true);
											$('.actPrice').prop('disabled',true);
											$('#fastChange').prop('disabled',true);
											$('.dropdown-toggle').prop('disabled',true);
									  	}else{
									  		$('.showState').attr('src',basePath+'/images/status/statusNotExecute.png');
									  		$('#mainGrid').setColProp('groupGuidePrice1',{editable:true});
											$('#mainGrid').setColProp('groupGuidePrice2',{editable:true});
											$('#mainGrid').setColProp('remark',{editable:true});
											$(".remark").prop('disabled',false);
											$('.save').prop('disabled',false);
											$('.actPrice').prop('disabled',false);
											$('#fastChange').prop('disabled',false);
											$('.dropdown-toggle').prop('disabled',false);
									  	}
									  	if(data.data.tpriceMain.billsStatus){
											$('.obsolete').css({'display':'inline-block'});
											$('.actPrice').prop('disabled',true);
										}else{
											$('.obsolete').css({'display':'none'});
										}
										
									},
									loadError:function(xhr,status,error){
										//console.log(status)
									},
									beforeEditCell:function(rowid,cellname,v,iRow,iCol){
										firstrow = iRow;
										firstcell = iCol;
									}
									})
									
									$(document).on("blur","input[role=textbox]",function(){
										$("#mainGrid").jqGrid("saveCell",firstrow,firstcell);
									});
})();

$.request({
	url:"/manager/Tgoodsclass/findTree2?groupId="+8888888,
	dataType:"json",
	type:"GET",
	success:function(data){
	
	console.log(data);
},
    error:function(){
	
}
})
/**
 * 过滤框失焦后触发事件
 */
$(".filterVal").keyup(function(){
	
		var begintime=$("#datetimepickerStart").val();
		var endTime=$("#endTime").val();
		var val=$(".getID").data("pricemainid");
	
		$.request({
			url:"/manager/priceManage/queryOrder",
			type:"GET",
			dataType:"json",
			data:{
			billsDateBegin:begintime,
			billsDateEnd:endTime,
			remark:$(".timeRemark").val(),
			keyWord:$(".filterVal").val(),
			tpriceMainId:val,
			goodsClassId:globalId
		
			},
			success:function(data){

			  	 var oDate=new Date(data.data.tpriceMain.billsDate),
			  	  oYear=oDate.getFullYear(),
			  	  oMonth=oDate.getMonth()+1,
			  	  oDay=oDate.getDate();
				  $(".getID").data("pricemainid",data.data.tpriceMain.id);
				  $(".getID").val(data.data.tpriceMain.billsCode);
				  
				  $(".billDate").val(oYear+"-"+oMonth+"-"+oDay);
				  $(".remark").val(data.data.tpriceMain.remark);
				  $(".addPer").val(data.data.tpriceMain.createName);
				  $(".revisePer").val(data.data.tpriceMain.updateName);
				  $(".carryPer").val(data.data.tpriceMain.executeName);
				  $("#mainGrid").jqGrid("clearGridData"); 
				  
				  for(var i=0;i<data.data.priceVoList.length;i++){
					  $("#mainGrid").jqGrid('addRowData', i + 1,data.data.priceVoList[i]);
				  }
				  
			  
			}
		})
	
})
/**
 * 单据过滤
 */
$(document).on("click",".filterBtn",function(){
	
		var begintime=$("#datetimepickerStart").val();
		var endTime=$("#endTime").val();
		var val=$(".getID").data("pricemainid");
		
		$.request({
			url:"/manager/priceManage/queryOrder",
			type:"GET",
			dataType:"json",
			data:{
			billsDateBegin:begintime,
			billsDateEnd:endTime,
			remark:$(".timeRemark").val(),
			keyWord:$(".filterVal").val(),
			tpriceMainId:val,
			goodsClassId:globalId
			
			},
			success:function(data){
				
			  	 var oDate=new Date(data.data.tpriceMain.billsDate),
			  	  oYear=oDate.getFullYear(),
			  	  oMonth=oDate.getMonth()+1,
			  	  oDay=oDate.getDate();
			  	if(data.data.tpriceMain.executeStatus){
				    
			  		$('.showState').attr('src',basePath+'/images/status/statusExecute.png');
			  		$('#mainGrid').setColProp('groupGuidePrice1',{editable:false});
					$('#mainGrid').setColProp('groupGuidePrice2',{editable:false});
					$('#mainGrid').setColProp('remark',{editable:false});
					$(".remark").prop('disabled',true);
					$('.save').prop('disabled',true);
					$('.actPrice').prop('disabled',true);
					$('.dropdown-toggle').prop('disabled',true);
			  	}else{
			  		
			  		$('.showState').attr('src',basePath+'/images/status/statusNotExecute.png');
			  		$('#mainGrid').setColProp('groupGuidePrice1',{editable:true});
					$('#mainGrid').setColProp('groupGuidePrice2',{editable:true});
					$('#mainGrid').setColProp('remark',{editable:true});
					$(".remark").prop('disabled',false);
					$('.save').prop('disabled',false);
					$('.actPrice').prop('disabled',false);
					$('.dropdown-toggle').prop('disabled',false);
			  	}
			  	if(data.data.tpriceMain.billsStatus){
					$('.obsolete').css({'display':'inline-block'});
				}else{
					$('.obsolete').css({'display':'none'});
				}
				  $(".getID").data("pricemainid",data.data.tpriceMain.id);
				  $(".getID").val(data.data.tpriceMain.billsCode);
				  
				  $(".billDate").val(oYear+"-"+oMonth+"-"+oDay);
				  $(".remark").val(data.data.tpriceMain.remark);
				  $(".addPer").val(data.data.tpriceMain.createName);
				  $(".revisePer").val(data.data.tpriceMain.updateName);
				  $(".carryPer").val(data.data.tpriceMain.executeName);
				  $("#mainGrid").jqGrid("clearGridData"); 
				  
				  for(var i=0;i<data.data.priceVoList.length;i++){
					  $("#mainGrid").jqGrid('addRowData', i + 1,data.data.priceVoList[i]);
				  }
				  
			  
			},
			error:function(){
			}
		})
	
	
	$("#changeTime").modal("hide");
})
/**
 * 上一单&&下一单操作
 * 
 */
$(document).on('click','.cutVal',function(){
	if(!$('.getID').val()){
		$.zxsaas_plus.showalert("提示","当前单据为新增单据,生成单据号后才可查询！！！！")
		return false;
	}
	$("#inquire_option").data('bootstrapValidator').resetForm();
	var flag=$(this).data("flag");
  var val=$(".getID").data("pricemainid");
  var filterVal=$(".filterVal").val();
  var beginTime=$("#datetimepickerStart").val();
  var endTime=$("#endTime").val();
  var remark=$(".timeRemark").val();
  $.request({
	  url:"/manager/priceManage/lastOrNext",
	  type:"GET",
	  data:{
	  tpriceMainId:val,
	  num:flag,
	  keyWord:filterVal,
	  billsDateBegin:beginTime,
	  billsDateEnd:endTime,
	  remark:remark,
	  goodsClassId:globalId
  },
	  dataType:"json",
	  success:function(data){
	  
	  if(data.data.tpriceMain.executeStatus){
		    
	  		$('.showState').attr('src',basePath+'/images/status/statusExecute.png');
	  		$('#mainGrid').setColProp('groupGuidePrice1',{editable:false});
			$('#mainGrid').setColProp('groupGuidePrice2',{editable:false});
			$('#mainGrid').setColProp('remark',{editable:false});
			$(".remark").prop('disabled',true);
			$('.save').prop('disabled',true);
			$('.actPrice').prop('disabled',true);
			$('#fastChange').prop('disabled',true);
			$('.dropdown-toggle').prop('disabled',true);
	  	}else{
	  		
	  		$('.showState').attr('src',basePath+'/images/status/statusNotExecute.png');
	  		$('#mainGrid').setColProp('groupGuidePrice1',{editable:true});
			$('#mainGrid').setColProp('groupGuidePrice2',{editable:true});
			$('#mainGrid').setColProp('remark',{editable:true});
			$(".remark").prop('disabled',false);
			$('.save').prop('disabled',false);
			$('.actPrice').prop('disabled',false);
			$('#fastChange').prop('disabled',false);
			$('.dropdown-toggle').prop('disabled',false);
	  	}
	  	if(data.data.tpriceMain.billsStatus){
			$('.obsolete').css({'display':'inline-block'});
			$('.actPrice').prop('disabled',true);
		}else{
			$('.obsolete').css({'display':'none'});
		}
	  	 var oDate=new Date(data.data.tpriceMain.billsDate),
	  	  oYear=oDate.getFullYear(),
	  	  oMonth=oDate.getMonth()+1,
	  	  oDay=oDate.getDate();
		  $(".getID").data("pricemainid",data.data.tpriceMain.id);
		  $(".getID").val(data.data.tpriceMain.billsCode);
		  
		  $(".billDate").val(oYear+"-"+oMonth+"-"+oDay);
		  $(".remark").val(data.data.tpriceMain.remark);
		  $(".addPer").val(data.data.tpriceMain.createName);
		  $(".revisePer").val(data.data.tpriceMain.updateName);
		  $(".carryPer").val(data.data.tpriceMain.executeName);
		  $("#mainGrid").jqGrid("clearGridData"); 
		 
		  for(var i=0;i<data.data.priceVoList.length;i++){
			  $("#mainGrid").jqGrid('addRowData', i + 1,data.data.priceVoList[i]);
		  }
		  
	  }
  })
//  $("#mainGrid").setGridParam(
//			{
//				url: "/manager/priceManage/lastOrNext",
//				dataType:"json",
//				postData:{
//				"tpriceMainId":val,
//				"num":flag
//			}
//					}).trigger("reloadGrid");
})
/**
 * 新增操作
 */
var a = true;//限制用户不停点击新增的操作
$(document).on("click",".add",function(){
	if(a){
		
		$('.contentLeft').css('visibility','hidden');
		$('.bill').attr('disabled',true);
		$('#fastChange').attr('disabled',true);
		a=false;
		if(!$('.getID').val()){
			$.zxsaas_plus.showalert("提示","当前已是新增单据！！！！")
			a=true;
			return false;
		}
		$("#inquire_option").data('bootstrapValidator').resetForm();
		var filterval=$(".filterVal").val();
		$(".delval").val("");
	    var val=$(".getID").data("pricemainid");
	    
	    $(".getID").data("pricemainid",null);
		$.request({
			url:"/manager/priceManage/add",
			dataType:"json",
			async: false,
			type:"post",
			data:{tPriceMainId:val,keyWord:filterval},
			success:function(data){
				
				$("#mainGrid").jqGrid("clearGridData"); 
				 for(var i=0;i<data.data.priceVoList.length;i++){
					  $("#mainGrid").jqGrid('addRowData', i + 1,data.data.priceVoList[i]);
				  }
				 $('.showState').attr('src',basePath+'/images/status/statusNotExecute.png');
				 $('.showState').hide();
				 $('.obsolete').css({'display':'none'});
				 $('#mainGrid').setColProp('groupGuidePrice1',{editable:true});
					$('#mainGrid').setColProp('groupGuidePrice2',{editable:true});
					$('#mainGrid').setColProp('remark',{editable:true});
					$(".remark").prop('disabled',false);
					$('.save').prop('disabled',false);
					$('.actPrice').prop('disabled',true);
					$('.dropdown-toggle').prop('disabled',true);
				a = true;
			},
			error:function(){
				a = true;
			}
		})
	}
	
})
/**
 * 保存操作
 */
var firstrow=false;
$(document).on("click",".save",function(){
//	if($(".getID").val()){
//		return false;
//	}
	
	//表单验证  
	$("#inquire_option").data('bootstrapValidator').validate();  
	if(!($('#inquire_option').data('bootstrapValidator').isValid())){
		refreshValidator('#inquire_option');
	    return ;
	}
	$("#inquire_option").data('bootstrapValidator').resetForm();
	var billDate=$(".billDate").val();
	var remark=$(".remark").val();
	var priceMainId=$(".getID").data("pricemainid");
	
	firstrow&&$("#mainGrid").jqGrid("saveCell",firstrow,firstcell);

	var arr=[]
	var valList=$("#mainGrid tr").length;
	for(var i=1;i<valList;i++){
		i=i.toString();
		arr.push($("#mainGrid").jqGrid("getRowData", i))
	}
	  $.request({
	    	url:"/manager/priceManage/save",
	    	dataType:'json',
	    	type:"post",
	    	data:{"billDate":billDate,"remark":remark,"valList":JSON.stringify(arr),"priceMainId":priceMainId},
	    	success:function(data){
	    		$('.contentLeft').css('visibility','visible');
	    		if(data.data.tpriceMain==undefined){
	    			$.zxsaas_plus.showalert('提示',data.desc);
	    			return;
	    		}
	    		var oDate=new Date(data.data.tpriceMain.billsDate);
	    		var oYear=oDate.getFullYear();
	    		var oMonth=oDate.getMonth()+1;
	    		var oDay=oDate.getDate();
	    		
	    		$(".getID").val(data.data.tpriceMain.billsCode);
	    		$(".getID").data('pricemainid',data.data.tpriceMain.id);
	    		$(".addPer").val(data.data.tpriceMain.createName);
	    		$(".remark").val(data.data.tpriceMain.remark);
	    		$(".billDate").val(oYear+'-'+oMonth+'-'+oDay);
	    		$(".revisePer").val(data.data.tpriceMain.updateName);
	    		$(".carryPer").val(data.data.tpriceMain.executeName);
	    		$('.bill').attr('disabled',false);
	    		$('#fastChange').attr('disabled',false);
	    		$.zxsaas_plus.showalert('提示','保存成功！');
	    		
	    		if(data.data.tpriceMain.executeStatus==1){
	    			$('.actPrice').prop('disabled',true);
					$('.dropdown-toggle').prop('disabled',true);
	    		}else{
	    			$('.actPrice').prop('disabled',false);
					$('.dropdown-toggle').prop('disabled',false);
	    		}
	    		if(data.data.tpriceMain.billsStatus==1){
	    			$('.actPrice').prop('disabled',true);
	    		}else{
	    			$('.actPrice').prop('disabled',false);
	    		}
	    		
	    		$("#mainGrid").jqGrid("clearGridData"); 
				 for(var i=0;i<data.data.priceVoList.length;i++){
					  $("#mainGrid").jqGrid('addRowData', i + 1,data.data.priceVoList[i]);
				  }
				 $('.showState').attr('src',basePath+'/images/status/statusNotExecute.png');
				 $('.obsolete').css({'display':'none'});
				 $('#mainGrid').setColProp('groupGuidePrice1',{editable:true});
//					$('#mainGrid').setColProp('groupGuidePrice2',{editable:true});
//					$('#mainGrid').setColProp('remark',{editable:true});
//					$(".remark").prop('disabled',false);
//					$('.save').prop('disabled',false);
//					$('.actPrice').prop('disabled',true);
//					$('.dropdown-toggle').prop('disabled',true);
	    		
	    	}
	    })
})
/**
 * 
 */

/**
 * 作废操作
 */
$('#Dele').click(function(){
    if($('.showState').attr('src').search(/statusExecute/)!=-1){
    	
    	$.zxsaas_plus.showalert("提示","已执行单据无法作废！！！！")
    	return false
    }
    if(!$('.getID').val()){
    	$.zxsaas_plus.showalert("提示","未生成单据号无法作废！！！！")
		return false;
	}
    $("#inquire_option").data('bootstrapValidator').resetForm();
   if($('.obsolete').css('display')==='none'){
	   $.request({
		   url:"/manager/priceManage/invalid",
		   dataType:"json",
		   type:"post",
		   data:{tpriceMainId:$(".getID").data("pricemainid"),keyWord:null,goodsClassId:null},
		   success:function(data){
			  if(data.data.tpriceMain.billsStatus){
				  $('.obsolete').css({'display':'inline-block'})
			  }
			  if(data.result){
				  $('.actPrice').prop('disabled',true);
			  }
			 
		   }
	   })
   }
})

$("#restore").click(function(){
	if($('.showState').attr('src').search(/statusExecute/)!=-1){
		return false;
	}
	$("#inquire_option").data('bootstrapValidator').resetForm();
	if($('.obsolete').css('display')!='none'){
		 $.request({
			   url:"/manager/priceManage/recover",
			   dataType:"json",
			   type:"post",
			   data:{tpriceMainId:$(".getID").data("pricemainid"),keyWord:null,goodsClassId:null},
			   success:function(data){
				   if(!data.data.tpriceMain.billsStatus)
				   $('.obsolete').css({'display':'none'})
				   if(data.result){
					  $('.actPrice').prop('disabled',false);
				  }
			   },
			   error:function(){
			   }
		   })
	}
})
/**
 * 执行价格
 */
$(document).on("click",".actPrice",function(){
	firstrow&&$("#mainGrid").jqGrid("saveCell",firstrow,firstcell);
	var arr=[];
	var temp=[];
	
	$("#mainGrid tr").each(function(){
		this.id&&temp.push(this.id);
	})
	for(var i=0,len=temp.length;i<len;i++){
		
		arr.push($("#mainGrid").jqGrid("getRowData",temp[i]))
	}
	var mainId=$('.getID').data('pricemainid');
	var filterVal=$('.filterVal').val();
	$.request({
		url:"/manager/priceManage/executePrice",
		type:"post",
		dataType:"json",
		data:{valList:JSON.stringify(arr),tpriceMainId:mainId,keyWord:filterVal,goodsClassId:globalId},
		success:function(data){
			if(data.data.tpriceMain.billsStatus===1){
				$.zxsaas_plus.showalert("错误","已作废单据无法执行价格！！！！")
				return false;
			}
			$('.showState').attr('src',basePath+'/images/status/statusExecute.png');
			$('#mainGrid').setColProp('groupGuidePrice1',{editable:false});
			$('#mainGrid').setColProp('groupGuidePrice2',{editable:false});
			$('#mainGrid').setColProp('remark',{editable:false});
			$(".remark").prop('disabled',true);
			$.zxsaas_plus.showalert('提示','执行价格成功！')
			if(data.data.tpriceMain.executeStatus==1){
				$('.save').prop('disabled',true);
				$('.actPrice').prop('disabled',true);
				$('#fastChange').prop('disabled',true);
				$('.dropdown-toggle').prop('disabled',true);
			}
		}
	})
})
/*
 * 快速改价
 */
$(document).on('click','#fastChange',function(){
	if(!$("tr[aria-selected=true]").length){
		$.zxsaas_plus.showalert("错误","请选中至少一条数据！！！！")
		return;
	}
	if($('.showState').attr('src').search(/statusNotExecute/)!=-1){
		$("#changePriceModal").modal("show");
		$('#mainGrid').setColProp('groupGuidePrice1',{editable:true});
		$('#mainGrid').setColProp('groupGuidePrice2',{editable:true});
		$('#mainGrid').setColProp('remark',{editable:true});
		$(".remark").prop('disabled',false);
	}else{
		$.zxsaas_plus.showalert("错误","已执行单据不能修改价格！！！！")
	}
})

/**
 * 修改价格
 * @return
 */
$(document).on("click","#changeSure",function(){
	firstrow&&$("#mainGrid").jqGrid("saveCell",firstrow,firstcell)
	if(!$(".getNum").val()){
		$('#changePriceModal').modal('hide');
		return false;
	}
	
	$(".cacl-1 option:selected").data("flag");
	$(".cacl-2 option:selected").data("flag");
	calc($(".caclOp").val(),$(".getNum").val(),$(".cacl-1 option:selected").data("flag"),$(".cacl-2 option:selected").data("flag"));
	$('#changePriceModal').modal('hide');	
})
function calc(op,val,flag1,flag2){
	if(!$("tr[aria-selected=true]").length){
		$.zxsaas_plus.showalert("错误","请选中至少一条数据！！！！")
	}
	var arr=[];
	switch(op){
	case "+":
		$("tr[aria-selected=true]").each(function(i,item){
			var getVal=$(this).find("td").eq(flag2).html().replace(/\,/g,'');
			arr.push(getVal*1+val*1);
		})
		break;
	case "-":
		$("tr[aria-selected=true]").each(function(i,item){
			var getVal=$(this).find("td").eq(flag2).html().replace(/\,/g,'');
			arr.push(getVal*1-val*1);
		})
		break;
	case "*":
		$("tr[aria-selected=true]").each(function(i,item){
			var getVal=$(this).find("td").eq(flag2).html().replace(/\,/g,'');
			arr.push(parseInt(getVal*1*val*1));
		})
		break;
	case "/":
		$("tr[aria-selected=true]").each(function(i,item){
			var getVal=$(this).find("td").eq(flag2).html().replace(/\,/g,'');
			arr.push(parseInt((getVal*1)/(val*1)));
		})
		break;
	
}
	for(var i=0,len=arr.length;i<len;i++){
		if(arr[i]<0){
			$.zxsaas_plus.showalert("错误","价格不能为小于零的数！！！！");
			return;
		}
		
	}
	if(op==='/'){
		if(val==0){
			$.zxsaas_plus.showalert("错误","除数不能为小于等于零的数！！！！");
			return;
		}
	}
	switch(op){
		case "+":
			$("tr[aria-selected=true]").each(function(i,item){
				var getVal=$(this).find("td").eq(flag2).html().replace(/\,/g,'');
				$(this).find("td").eq(flag1).html(getVal*1+val*1);
			})
			break;
		case "-":
			$("tr[aria-selected=true]").each(function(i,item){
				var getVal=$(this).find("td").eq(flag2).html().replace(/\,/g,'');
				$(this).find("td").eq(flag1).html(getVal*1-val*1);
			})
			break;
		case "*":
			$("tr[aria-selected=true]").each(function(i,item){
				var getVal=$(this).find("td").eq(flag2).html().replace(/\,/g,'');
				$(this).find("td").eq(flag1).html(parseInt(getVal*1*val*1));
			})
			break;
		case "/":
			$("tr[aria-selected=true]").each(function(i,item){
				var getVal=$(this).find("td").eq(flag2).html().replace(/\,/g,'');
				$(this).find("td").eq(flag1).html(parseInt((getVal*1)/(val*1)));
			})
			break;
		
	}
	
}
function getData(){
	var rowData = $('#mainGrid').jqGrid('getGridParam','selarrrow');
   var arr=[];
   rowData.forEach(function(item,i){
	   var val=$("#mainGrid").getRowData(item);
	   arr.push(val);
   })
   console.log(arr);
}
$(function(){
	$('.ui-jqgrid-sortable').prop('disabled',true);
	
})















