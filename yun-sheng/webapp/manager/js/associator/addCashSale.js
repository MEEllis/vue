//全局变量
var cardTypeId=0;
var baseAftEditCellRowId ="";
var baseAftEditCellCellName ="";
var baseAftEditTableName ="";
$(document).on("blur","td>input",function(){
	saveLstCell();
});

function saveLstCell(){
	$(baseAftEditTableName).jqGrid("saveCell",baseAftEditCellRowId,baseAftEditCellCellName);
}
/*不赠送*/
$(document).on("change","#notGive",notGive);
function notGive(){
	$("#notGive").prop("checked") &&  $(".uni").val("") && $(".uni").prop("disabled",true);
	$("#notGive").prop("checked") && $(".uni2").prop("checked",false) && $(".uni2").prop("disabled",true);
}
/*时段促销*/
$(document).on("change","#timeSale",function(){
	//$("#scroes1").click();
	//alert($(this).prop("checked"));
	$(this).prop("checked") && $("input.time-limit").prop("disabled",false);
	//$(this).prop("checked") && $("#scroes3").prop("disabled",true);
	$(this).prop("checked")&&$(".each-month").val("") && $(".each-month").prop("disabled",true);
	$(this).prop("checked")&&$(".uni2").removeAttr("checked") && $(".uni2").prop("disabled",true);
	//$(this).prop("checked") || $("input.time-limit").prop("disabled",true);
	if($(this).prop("checked")){
		var newDate=new Date();
		if(!$("#startDate").val()){
			$("#startDate").val(newDate.toLocaleDateString().replaceAll("/", "-"));
		}
		if(!$("#endDate").val()){
			$("#endDate").val(newDate.toLocaleDateString().replaceAll("/", "-"));
			
		}
	}
});

/*按月促销*/
$(document).on("change","#monthSale",function(){
	//$("#scroes1").click();
	$(this).prop("checked")&&$(".each-month").prop("disabled",false);
	$(this).prop("checked")&&$(".uni2").removeAttr("checked")&& $(".uni2").prop("disabled",true);
	//$(this).prop("checked") && $("#scroes2").removeAttr("checked")&&$("#scroes2").prop("disabled",true);
	$(this).prop("checked")&&$(".time-limit").val("") &&$(".time-limit").prop("disabled",true);
	if($(this).prop("checked")){
		if(!$(".each-month").val()){
		$(".each-month").val($(".each-month").find("option:eq(0)").text())
		}
	}
});

/*按周促销*/
$(document).on("change","#weekendSale",function(){
   $(this).prop("checked") && $(".uni2").prop("disabled",false);  
   $(this).prop("checked")&& $(".time-limit").val("") && $(".time-limit").prop("disabled",true);
   $(this).prop("checked")&& $(".each-month").val("") && $(".each-month").prop("disabled",true);
   if($(this).prop("checked")){
	    $(".week").find("input[value=1]").prop("checked",true);
   }
});

/*切换top*/
//$(document).on("click",".glyphicon",function(){
//	$(this).parents(".pd").addClass("hidden");
//	$(this).parents(".pd").siblings("div.hidden").removeClass("hidden");
//});

function adjustGrid(){
	var w =$(".tble .grid-wrap").width();
	var h =$(".tble .grid-wrap").height();
	console.log(w+":::"+h);
	$("#jqGrid_score").setGridWidth(w);
	$("#jqGrid_score").setGridHeight(h);
	$(".tble .tranLeft").height(h);
}
/*global vari*/
var baseAftEditCellRowId ="";
var baseAftEditCellCellName ="";
var baseAftEditTableName ="";
function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];
		var colName0 = ['操作','充值金额','赠送金额'];//充值赠送设置
		colNamec[0]=colName0;
		
		
		var JqGridColModelc = [];
		//充值赠送设置
		var JqGridColModel0 =[  {name:'do',index:'do', width:100,align:'center',sortable:false,formatter:addAndDelete},
							    {name:'reAmount',index:'reAmount', width:100,align:'center',sortable:false,editable:true,editrules:{custom:true,custom_func:DigOrLittle}},
								{name:'gvAmount',index:'gvAmount', width:100,align:'center',sortable:false,editable:true,editrules:{custom:true,custom_func:DigOrLittle}}
			                ];
		JqGridColModelc[0]=	JqGridColModel0;     
		
	     
	    
		//全局当前选择的rowid colid
		var rowid='';
		var colid='';
		var select_name='';
		
		var defaults = {
		LoadTableUrl: "",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		TableName: "", //显示表格名称。遵照css选择器书写
		pager:"",
		TableInfo:"",
		choose:false
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
								repeatitems: false
								},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            cellEdit:true,
			            cellsubmit:'clientArray',
			            editurl: 'clientArray',
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: 10,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		       
			            width: "100%" ,
			            height: $(window).height()*0.65,
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
   
						},

						 beforeEditCell:function(rowid,cellname,v,iRow,iCol)
						 {
						  lastrow = iRow; 
						  lastcell = iCol;
						  },
						beforeSelectRow:function(rowid,e){
                          
                            
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后
                              
						},
						afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
							baseAftEditCellRowId =iRow;
							baseAftEditCellCellName = iCol;
							baseAftEditTableName = options.TableName;
							rowid1=rowid;
						},
						gridComplete: function() {
						//	var ids=$(options.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
						//	var len = data.data.rows.length;
							//jQuery("#jqGrid_addService").jqGrid('setFrozenColumns');
							//console.log(options.TableName)
							adjustGrid();
							if(data.data.rows.length==0){
								$("#jqGrid_score").jqGrid('addRowData', "1", {},'last');
							}
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
		
		}
			
			//只能输入整数或者小数（数字、小数点后最多保留两位）
			function DigOrLittle(value,colname){
				  var reg=/^\d+(\.\d{1,2})?$/;//小数点后最多保留两位（允许输入小数整数）
	                if(reg.test(value))
	                	 return [true,""];
	                else
	                	 return [false,"请输入整数或者小数点后保留两位的小数！"];
	                
			}
			/*不为空*/
			 function notVacume(value,colname){
				  if (value!=""){ 
					    return [true,""];
				  }else {
			        	
				        return [false,"该项不为空！"];
			       }
			 }
		    /*验证充值金额是否为空*/
			 var rowid1="";
			 function CZ(value,colname){
				 if (value!=""){ 
					    var val=$("#jqGrid_score").getCell(rowid1,"reAmount");
					    if(val!=""){
					         return [true,""];
					    }else {
					        return [false,"充值金额不能为空！"];
				       }
				  }else {
					  return [true,""];
			       }
			 }
			/*操作列*/
			function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel ='<div class="operating" data-id="' + options.rowId + '"><span style="cursor:pointer;margin-right:10px" class="icon-plus" id="icon-plus" title="添加" ></span><span style="cursor:pointer;" class="icon-trash" id="icon-trash" title="删除"></span></div>';
				return addAndDel;
			}
		   	
		  	//新增一行
		   	$(document).on("click",".icon-plus",function(){
				var rowId = $(this).parent().data('id');
				var ids = $(options.TableName).jqGrid('getDataIDs');
				//获得当前最大行号（数据编号）
				var maxid;
				maxid = (ids.length ==0 ) ? 0 : Math.min.apply(Math,ids);
				var maxid;
				if(maxid>0)
					maxid=0-maxid;
				else
					maxid=maxid-1;
				$(options.TableName).jqGrid('addRowData', maxid, {}, 'last' );
		   		
		   	});
		   	
		   	//删除一行
			$(document).on('click','.icon-trash',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除"){
					
					$.zxsaas_plus.showconfirm("删除","是否确定删除本行?",function(){
						var rData = $(options.TableName).jqGrid('getRowData',rowId);
						$(options.TableName).jqGrid('delRowData', rowId);
						if($(options.TableName + ' tbody tr').length == 1) {
							$(options.TableName).jqGrid('addRowData', 1,{},'last');
						}
//							totalCalc(0);
					},function(){
						
					});

				}
			}); 

			 function Goodsmodel(cellvalue, options, rowObject){
		            if(cellvalue == undefined || cellvalue == ""){
	                	cellvalue = "";
	                }
					return '<span class="goodsSort" style="display: inline-block; width: 89px;height: 16px;" data-toggle="modal" data-target="#goodsch" data-rId="' + options.rowId +'">' + cellvalue + '</span>';     
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

            //创建一个input输入框
            function myelem (value, options) {
             var reg =/[^\d\s]/g;
              var el = document.createElement("input");
              el.type="text";
              $(el).on("input propertychange",function(){/*只允许正整数*/
              	   $(this).val($(this).val().replace(reg,''));
              });
              el.value = value;
              return el;
            }
            
            //获取值
            function myvalue(elem) {
              return $(elem).val();
            } 
//		   //检测输入的是否为正整数
		  function checkNumber(value, colname) {
				var reg = /^[1-9]\d*$/;
				var arr = [];
				arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
				return arr;
			}
		   
		
	
			
		
	
}

function drawTable(tn,pger,tableinfo){
	if(tableinfo == 0){//会员升级管理表格初始
		
		loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/cardType/selectAll"});	
		adjustGrid();
  /// 	loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/card/selectAll"});	
		
        

	}
	else if(tableinfo == 1){//升级条件设置
		//loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "../../json/associator/pileCards.json"});	
		//loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/card/selectAll"});	
	}
	
}

/*树结构*/
function drawTree(){
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
				onClick: function (event, treeId, treeNode, msg) {
					//controllAdd(treeNode.id);//通过id调用对应方法 重构表格
                    if(treeNode.objType=="会员类型"){
                    	cardTypeId=treeNode.id;
                    	 buildTop(treeNode.id);
                         buildTable(treeNode.id);
                    }
				},
				onDblClick: function(event, treeId, treeNode){
					//alert(treeNode ? treeNode.tId + ", " + treeNode.name : "isRoot");
				   
				}
			},
			view: {
				showIcon: false
			}
	   }; 
	     $.request({
	            type: 'Get',
	            url: '/manager/member/cardInfo/initCardInfoTree',//树结构地址
	            dataType: "json", 
	            success: function (data1) {
	    	 		
	                $.fn.zTree.init($("#assosiator-tree"), setting, data1);
	                var zTree1 = $.fn.zTree.getZTreeObj("assosiator-tree");
                	zTree1.expandAll(true);//展开全部节点
                	
	            },
	            error: function (msg) {
	               
	            	
	            }
	        });
	 
	     
	
	
}
/*读取选项信息*/

function buildTop(treeNodeId){
	$.request({
        type: 'GET',
        url: "/manager/member/rechargeGift/selectGiftInfo/"+treeNodeId,//树结构地址
        success: function (data) {
		if(data.data.rows){
			var timeType = data.data.rows.timeType;
			var ms = $('input[name=timeType]');
			$.each(ms,function(){
				(timeType == $(arguments[1]).val()) && ($(arguments[1]).prop('checked',true));
			});
			if(timeType==1){
				$(".uni2").removeAttr("checked") && $(".uni2").prop("disabled",true);
				$(".time-limit").val("") && $(".time-limit").prop("disabled",true);        
			    $(".each-month").val("") && $(".each-month").prop("disabled",true);
			}
			if(timeType==2){
				$("input.time-limit").prop("disabled",false);
				var startDate = new Date(data.data.rows.startDate) ;
				var endDate=new Date(data.data.rows.endDate);
				$("#startDate").val(startDate.toLocaleString());
				$("#endDate").val(endDate.toLocaleString());
				$(".uni2").removeAttr("checked") && $(".uni2").prop("disabled",true);
				$(".each-month").val("") && $(".each-month").prop("disabled",true);
			}
		    if(timeType==3){
		    	$(".each-month").prop("disabled",false);
		    	$(".each-month").val(data.data.rows.timeValue);
		    	$(".uni2").removeAttr("checked")&& $(".uni2").prop("disabled",true);
		    	$(".time-limit").val("")&&$(".time-limit").prop("disabled",true);
		    }
		    if(timeType==4){
		    	$(".uni2").prop("disabled",false);
		    	var arr=[];
		    	var timeValue =data.data.rows.timeValue;
		    	arr=timeValue.split(",");
		    	for(var i=0;i<arr.length;i++){
		    	   $(".week").find("input[value='"+arr[i]+"']").prop("checked",true); 	
		    	}
		    $(".time-limit").val("") && $(".time-limit").prop("disabled",true);        
		    $(".each-month").val("") && $(".each-month").prop("disabled",true);
		    }
		}else{
			$("#notGive").prop("checked",true);
		  $(".uni").val("") && $(".uni").prop("disabled",true);
		  $(".uni2").prop("checked",false) && $(".uni2").prop("disabled",true);
			
		}
        },
        error: function (msg) {
          
        }
    });
	
}

/*读取表格信息*/
//function  buildTable(treeNodeId){
//	//修改页面 若值为空  就显示默认的模式勾选不赠送notGive()  表格为空
//	$.ajax({
//        type: 'POST',
//        url:  "/manager/rechargeGifi/selectGifiRuleInfo/"+treeNodeId,//树结构地址
//        dataType: "json", 
//    	contentType:"application/json",
//        success: function (data) {
//	 		console.log("成功返回"+data.timeType);
//            
//        	
//        },
//        error: function (msg) {
//            alert("数据加载失败！" + msg);
//        }
//    });
//	
//	
//	
//}
function  buildTable(treeNodeId){
	 $("#jqGrid_score").setGridParam( {
			    url:"/manager/member/rechargeGift/selectGiftRuleInfo/"+treeNodeId
			    }
			) .trigger("reloadGrid");
}


function initial(){
	notGive();//初始化选择不赠送
	drawTable("#jqGrid_score","#jqGridPagerscore","0");
	drawTree();
}

/*对最后编辑的cell进行保存*/
function saveAfterEdit(){
	$(baseAftEditTableName).jqGrid("saveCell",baseAftEditCellRowId,baseAftEditCellCellName);

}

var lastrow="";
var lastcell="";
/*保存充值赠送*/
$(document).on("click",".save_addCash",function(){
	if(cardTypeId>0){
		$("#jqGrid_score").jqGrid("saveCell",lastrow,lastcell);
		
		var result =$("#saveResult").toJsonObject();//充值赠送
		//$(".birth-day").prop("checked")|| delete result.birthNum;
		if(result.timeType =="2"){
			result.startDate =result.startDate ||"";
			result.endDate  =result.endDate ||"";
		}
		if(result.timeType =="3"){
			//$(".each-month>option:selected").val()||[];
			result.timeValue =$(".each-month").val()||"";
			
		}
		if(result.timeType =="4"){
			var wk =[];
			$(".week>input[type=checkbox]:checked").each(function(i,item){
				   wk.push($(item).val());
			});
			result.timeValue=wk.join(","); 
		}
		  
	    var czzsIDS =$("#jqGrid_score").jqGrid('getDataIDs');
		arr =[];
		for(var i=0;i<czzsIDS.length;i++){
			 var sp ={};
			 
			 var rowData =$("#jqGrid_score").jqGrid('getRowData',czzsIDS[i]);
			// console.log("$$$$"+rowData.length);
			 if(rowData.reAmount !=""){
				 sp.reAmount = rowData.reAmount;
				 sp.gvAmount = rowData.gvAmount;
				 arr.push(sp);
			 }
		}
		if(arr.length!=0){
			result.relList=arr;
		}
		result.cardTypeId=cardTypeId;  
		$.request({
			url:"/manager/member/rechargeGift/saveInfo",
			type:"POST",
			datatype:"json",
			contentType:"application/json",
			data:JSON.stringify(result),
			 success: function (data) {
				    		$.zxsaas_plus.showalert("提示",data.desc);
			          },
	          error: function (msg) {
			        	  $.zxsaas_plus.showalert("错误","操作失败！");
	          }
		
		
		
	});
	}
	
});

Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
};

