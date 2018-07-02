function adjustGrid(tn){
	var par="";
	par = $(tn).parents(".pabody");
	var w =$(par).width();
	var h =$(par).height();
	$(tn).setGridWidth(w);
	$(tn).setGridHeight(h*0.87);
}

function initPage(){
	$.request({//初始化加载主表数据
		url:'/manager/member/multiScore/selectInfo',
		success:function(data){
		   $(".each-month").html("");
		   for(var j=1;j<32;j++){  //每月多少日
			   $(".each-month").append("<option value='"+j+"'>"+j+"</option>"); 
		   }
		  
		  if(data.data.rows){
				   $(".each-month").val("");
			       $(".modify-id").val(data.data.rows.id);//修改id
				   if(data.data.rows.brithNum){
					   $(".birth-day").prop("checked",true);
					   $("input[name=brithNum]").val(data.data.rows.brithNum); 
					   $(".multi-score").val(data.data.rows.brithNum); 
				   }else{
					   $(".birth-day").prop("checked",false);
					   $("input[name=brithNum]").attr("disabled",true);
				   }
				   for(var i in data.data.rows){
					  if(i=="timeType"){
						   var val =data.data.rows[i];
							  $("input[id=scroes"+val+"]").prop("checked",true);//根据返回数据勾选
							  if(val==1){
								 //$(".uni").val("")&&$(".uni").prop("disabled",true);
								 // $(".uni2").prop("checked",false) && $(".uni2").prop("disabled",true); 
								  $("#scroes1").trigger("click");
							  }
							  if(val == 2){
								  $("#scroes2").trigger("click");
								  $("input[name=startDate]").val(format(Number(data.data.rows["startDate"]), 'yyyy-MM-dd'));
								  
								  $("input[name=endDate]").val( format(Number(data.data.rows["endDate"]), 'yyyy-MM-dd'));
							  }
							  //当val ==3的时候进行。。。。。。。
							  if(val == 3){
								  $("#scroes3").trigger("click");
								  $(".each-month").val($(".each-month>option[value='"+data.data.rows.timeValue+"']").text());
							  }
							  if(val == 4 ){
								  $("#scroes4").trigger("click");
								  var str ="";
								  str= data.data.rows["timeValue"];
								  if(str){
									  var arr =[];
								      arr =str.split(",");
									  if(arr.length!=0){
										for(var i = 0;i<arr.length ;i++){
											$(".week").find("input:checkbox[value="+arr[i]+"]").prop("checked",true);
										}
										  
									  }
								  }
								  
							  }
					  }
					  if(i== "multiNum"){
						  $("input[name="+i+"]").val(data.data.rows[i]);
					  }
		//			  if(i == "goodsType"){
		//				  var gds =data.data.rows[i];
		//				  for(var j = 0;j < gds.length;j++){
		//					 var gobj = gds[j]||{};
		//					 $("#jqGrid_goods").setRowData();
		//				  }
		//			  }
		//			  if(i == "cardType"){
		//				  
		//			  }
				   }
		  }
	    },
	    error:function(msg){
	    	 
	    }
		
		
	});
	
	 loadmodal({TableName:"#jqGrid_goods",pager:"#jqGridPagerGoods",TableInfo:0,LoadTableUrl: "/manager/member/multiScore/selectGoodsInfo"});
	 adjustGrid("#jqGrid_goods");
	 loadmodal({TableName:"#jqGrid_asso",pager:"#jqGridPagerAsso",TableInfo:1,LoadTableUrl: "/manager/member/multiScore/selectTypeInfo"});
	 adjustGrid("#jqGrid_asso");
	

	 
}

function active(){
	$(".pabody").children("div:eq('"+$(".phead>li.active").index()+"')").css({"display":"none"});
	$(".phead>li.active").removeClass("active");
	$(".pacontent").find(".phead>li:not(:hidden)").eq(0).addClass("active");
	$(".pacontent").find(".phead>li:not(:hidden)").eq(0).click();
	
}
function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];
		var colName0 = ['操作','商品类型ID','商品分类编码','商品分类名称'];//商品范围
		colNamec[0]=colName0;
		
		var colName1 = ['操作','会员类型ID','会员卡分类编码','会员卡分类名称'];//会员范围
		colNamec[1]=colName1;
		
		
		var JqGridColModelc = [];
		//商品范围
		var JqGridColModel0 =[
		                        {name:'do',index:'do', width:100,align:'center',sortable:false,formatter:addAndDelete},
		                        {name:'goodsClassId',index:'goodsClassId', width:100,align:'center',sortable:false,hidden:true},
		                      	{name:'code',index:'goodsSort', width:150,align:'center',sortable:false,formatter:Goodsmodel,editrules:{custom:true,custom_func:Digital_Litter_Vacume}},//goodsSort
								{name:'name',index:'goodsSortName', width:150,align:'center',sortable:false,formatter:Goodsmodel,editrules:{custom:true,custom_func:Digital_Litter_Vacume}}//goodsSortName
							

			                ];
		JqGridColModelc[0]=	JqGridColModel0;     
		//会员范围
		var JqGridColModel1 =[
							    {name:'do',index:'do', width:100,align:'center',sortable:false,formatter:addAndDelete},
							    {name:'mumTypeId',index:'mumTypeId', width:100,align:'center',sortable:false,hidden:true},
								{name:'typeCode',index:'typeCode', width:150,align:'center',sortable:false,frozen:true,formatter:Goodsmodel,editrules:{custom:true,custom_func:Digital_Litter_Vacume}},//assoSort
								{name:'typeName',index:'typeName', width:150,align:'center',sortable:false,formatter:Goodsmodel,editrules:{custom:true,custom_func:Digital_Litter_Vacume}}//assoSortName
			                ];
		JqGridColModelc[1]=	JqGridColModel1;     
		   
		
		var defaults = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "/manager/card/selectTypeList",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"",
		TableInfo:""
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
			console.log(c);
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
						//	page: "data.page",
					     //   total: "data.total",
					     //   records: "data.records",
							repeatitems: false
						},
//					 	cellEdit:true,
//					 	cellsubmit: 'clientArray',//单元格保存内容的位置	
//					    editurl: 'clientArray',
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: 12,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		       
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						//multiselect:true,
						//multiboxonly:true,
						//multiselectWidth:38,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onCellSelect:function(id,index,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
						},
						onSelectRow:function(id){
						
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
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
							adjustGrid(options.TableName);
							var len=0;
							if($(".modify-id").val()){//修改
								len = data.data.rows.length;
								
								if(options.TableName=="#jqGrid_goods"){//商品
									if(len>0){
								      $("#all-goods").prop("checked",false);
									  $("#dispart-goods").prop("checked",true);		
									}else{
									  $("#dispart-goods").prop("checked",false);	
									  $("#all-goods").prop("checked",true);	
									}
								}
								if(options.TableName=="#jqGrid_asso"){//会员
                                    if(len>0){
                                       $("#all-assos").prop("checked",false);	
                                       $("#dispart-assos").prop("checked",true);	
									}else{
									   $("#dispart-assos").prop("checked",false);	
									   $("#all-assos").prop("checked",true);		
									}
								}
							}
							if(len==0){
								 $(options.TableName).jqGrid('addRowData', "1", {},'last' );
							}
							 $(".pabody").children("div:eq('"+$(".phead>li.active").index()+"')").css({"display":"block"});
							 toggle_cardAllDispart();
						},
						resizeStop: grid_setAutoWidth,
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
		
			}
			/*英文数字  不能为空*/
			function Digital_Litter_Vacume(value,colname){
				 //  var reg1=/^[0-9]+([.]{1}[0-9]+){0,1}$/;
				var reg=/^[A-Za-z0-9]+$/;
			  if (reg.test(value)&&value!=""){ 
				   return [true,""];
			  }
			  else{ 
                   if(value==""){
                	   return [false,"该项必填！"];	
                   }
			        return [false,"只允许输入英文或者数字！"];
			  }
				
			}
			/*调整表格宽度*/
		    function grid_setAutoWidth() {
				var anchoTotal=document.body.clientWidth;
			    $(options.TableName).jqGrid('setGridWidth', anchoTotal*0.97);

			};
			/*表头选择更改*/
		    $(options.TableName).jqGrid('setLabel',1, '选择', 'labelstyle');
			
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})
			
			/*操作列*/
			function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel ='<div class="operating" data-id="' + options.rowId + '"><span style="cursor:pointer;margin-right:10px" class="icon-plus" id="icon-plus" title="添加" ></span><span style="cursor:pointer;" class="icon-trash" id="icon-trash" title="删除"></span></div>';
				return addAndDel;
			}

			/*添加goodSort类*/
			 function Goodsmodel(cellvalue, options, rowObject){
		            if(cellvalue == undefined || cellvalue == ""){
	                	cellvalue = "";
	                }
					return '<span class="goodsSort" style="display: inline-block; width: 89px;height: 16px;" data-toggle="modal" data-target="#goodsch" data-rId="' + options.rowId +'">' + cellvalue + '</span>';     
			}

			
			//修改密码
			$(document).on('click','.rePwd',function(e){
				//console.log(e.target);
				var reId = $(this).data('id');//获取删除的行id
				//var dataId = $(this).data('blocid');//获取数据的id  按照数据的id进行后台CRUD操作
				$.zxsaas_plus.showconfirm("","重置密码将用户密码设置为：123456<br />是否确定进行此操作",function(){
					//删除密码操作
					$.zxsaas_plus.showalert("","重置密码成功!");
				},function(){
					
				});
			});
			
			//启用
			$(document).on('click', '.qiyon',function(e){
				var checkedList = [];//存放已勾选行id
				$('.del').each(function (index, domEle) { 
					  // domEle == this 
					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';//表格行id
					//($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('blocid'))) : '';//数据id
				});
				
				var len = checkedList.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选集团后再启用!");
					return false;
				}else{
					for(var i = 0;i < len;i ++){
						//$(options.TableName).jqGrid('delRowData', checkedList[0]);
						//checkedList.shift();
						//调用后台方法修改字段
					}
					alert('启用成功');
				}
			});
			
			//禁用
			$(document).on('click', '.jinyon',function(e){
				var checkedList = [];//存放已勾选行id
				$('.del').each(function (index, domEle) { 
					  // domEle == this 
					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
					//($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('blocid'))) : '';
				});
				
				var len = checkedList.length;
				if(len == 0){
					$.zxsaas_plus.showalert("错误","请勾选集团后再禁用!");
					return false;
				}else{
					for(var i = 0;i < len;i ++){
						//$(options.TableName).jqGrid('delRowData', checkedList[0]);
						//checkedList.shift();
						//调用后台方法修改字段
					}
					alert('禁用成功');
				}
			});
			
			//修改信息
			$('.updateBloc').click(function(){
				var checkedList = [];//存放已勾选行id
				$('.del').each(function (index, domEle) { 
					  // domEle == this 
					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
				});
				var len = checkedList.length;
				var gridData = $(options.TableName).jqGrid("getRowData",checkedList[0]);//获取被选中的一行数据
				//var id = gridData.blocId;
				//console.log('id:' + id);
				if(len != 1){
					$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
					return false;
				}else{
					$('.blocId').val(gridData.blocId);
					$('.blocPer').val(gridData.blocPer);
					$('.blocTime').val(gridData.blocTime);
					$('.blocUpdate').val(gridData.blocUpdate);
					$('.blocUpdateTime').val(gridData.blocUpdateTime);
					$('.blocNo').val(gridData.blocNo);
					$('.blocName').val(gridData.blocName);
					$('.blocMark').val(gridData.blocMark);
					$('.blocAdmin').val(gridData.blocAdmin);
					$('.blocPwd').html(gridData.blocPwd);
					//$('.blocDouble').val(gridData.blocDouble);
					if(gridData.blocDouble == '1'){
						//不禁用
						$('.blocDouble').prop({'checked':''});
					}else{
						$('.blocDouble').prop({'checked':'checked'});
					}
					
					return true;
				}
			});
			
			//显示隐藏禁用
			//  0 : 禁用       
			//  1 : 不禁用
			$(document).on('click','.double',function(e){
				var selectedRowIds = $(options.TableName).jqGrid("getRowData");  
				var len = selectedRowIds.length;  
				if($('input.double').prop('checked')){
					for(var i = 1;i <= len ;i ++) {  
						var gridData = $(options.TableName).jqGrid("getRowData",i);
						if(gridData.blocDouble == '0'){
							var index = gridData.blocDo.indexOf('data-id');
							var rowId = gridData.blocDo.substring(index + 9,gridData.blocDo.length-2);
							$(options.TableName).setRowData(rowId,null,{display: 'table-row'});//显示禁用
						}
					}  
				}else{
					for(var i = 1;i <= len ;i ++) {  
						var gridData = $(options.TableName).jqGrid("getRowData",i);
						if(gridData.blocDouble == '0'){
							console.log(gridData.blocId + '...hide...');
							var index = gridData.blocDo.indexOf('data-id');
							var rowId = gridData.blocDo.substring(index + 9,gridData.blocDo.length-2);
							$(options.TableName).setRowData(rowId,null,{display: 'none'});//隐藏禁用
						}
					}  
				}
			});
			
			
			
			//列表    重密码
			function rePwd(cellvalue, options, rowObjec)
			{
				return '<span class="rePwd" data-blocId="' + rowObjec.blocId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
			}
			
			//列表复选框
			function checkBox(cellvalue, options, rowObjec)
			{
				return '<input type="checkbox" class="del" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
			}
			
		//查询
		$(document).on("click",".btn-group button[data-eventname='inquire']",function(event){			
			if(flag==true){
			$.jgrid.GridDestroy(options.TableName);
			loadtable();
			}else{
				flag=true;
			}
			
		});
		

		$(document).on("click",".btnbox button[data-eventname='printbtn']",function(event){
			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
			
		});
		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
			
		});
}
		

/*切换参数详情*/

$(document).on("click",".phead>li.bn",togglePara);
function togglePara(){
	$(".pabody").children("div:eq('"+$(".phead>li.active").index()+"')").css({"display":"none"});
	$(".all-dis").children("p:eq('"+$(".phead>li.active").index()+"')").css({"display":"none"});
	$(".phead>li.active").removeClass("active");
	$(this).addClass("active");
	var tbP =$(".pabody").children("div:eq('"+$(this).index()+"')");
	adjustGrid(tbP.find("table"));
	tbP.css({"display":"block"});
	$(".all-dis").children("p:eq('"+$(this).index()+"')").css({"display":"block"});
	toggle_cardAllDispart();
}

function drawTable(v){
	if(v == "1"){//全部商品
		var tableinfo =$(".phead>li.active").index();//参数索引
		if(tableinfo==0){
		   //$("#jqGrid_goods").jqGrid("clearGridData");
			 $(".goods").find(".grid-wrap").css({"display":"none"});
		}
		else{
		   //$("#jqGrid_asso").jqGrid("clearGridData");
			 $(".asso").find(".grid-wrap").css({"display":"none"});
		}
	}
	if(v == "2"){//部分商品
		var tableinfo =$(".phead>li.active").index();//参数索引
		if(tableinfo==0){
		 loadmodal({TableName:"#jqGrid_goods",pager:"#jqGridPagerGoods",TableInfo:tableinfo,LoadTableUrl: "/manager/member/multiScore/selectGoodsInfo"});
		 adjustGrid("#jqGrid_goods");
		 $("#jqGrid_goods").trigger("reloadGrid"); 
		}
		else{
		 loadmodal({TableName:"#jqGrid_asso",pager:"#jqGridPagerAsso",TableInfo:tableinfo,LoadTableUrl: "/manager/member/multiScore/selectTypeInfo"});
		 adjustGrid("#jqGrid_asso");
		 $("#jqGrid_asso").trigger("reloadGrid"); 
		}
		 
	}

}

/*切换全部 部分*/
$(document).on("click",".same",toggle_cardAllDispart);
function toggle_cardAllDispart(){
	    var card_name=$(".all-dis>p:visible").find("input:eq(0)").attr("name");
	    var v =$(".all-dis>p:visible").find("input:checked").val();//全部 部分
	    if(card_name=="same"){//商品（全部/部分）
	    	if(v=="1"){
				var tableinfo =$(".phead>li.active").index();//参数索引
				if(tableinfo==0){
				   //$("#jqGrid_goods").css({"display":"hidden"});
				   $(".goods").find(".grid-wrap").css({"display":"none"});
				   $(".goods").parents(".pabody").hasClass("addBorder")||$(".goods").parents(".pabody").addClass("addBorder");
				}
				else{
				  // $("#jqGrid_asso").css({"display":"hidden"});
				   $(".asso").find(".grid-wrap").css({"display":"none"});
				   $(".asso").parents(".pabody").hasClass("addBorder")||$(".asso").parents(".pabody").addClass("addBorder");
				}
			 }
			 if(v=="2"){
					var tableinfo =$(".phead>li.active").index();//参数索引
					if(tableinfo==0){
					   //$("#jqGrid_goods").css({"display":"hidden"});
						  adjustGrid("#jqGrid_goods");
					   $(".goods").find(".grid-wrap").css({"display":"block"});
					   $(".goods").parents(".pabody").removeClass("addBorder");
					}
					else{
					  // $("#jqGrid_asso").css({"display":"hidden"});
						  adjustGrid("#jqGrid_asso");
					   $(".asso").find(".grid-wrap").css({"display":"block"});
					   $(".asso").parents(".pabody").removeClass("addBorder");
					}
				 }
	    	
	    }
	    if(card_name=="same_asso"){//会员（全部/部分）
	    	if(v=="1"){
				var tableinfo =$(".phead>li.active").index();//参数索引
				if(tableinfo==0){
				   //$("#jqGrid_goods").css({"display":"hidden"});
				   $(".goods").find(".grid-wrap").css({"display":"none"});
				   $(".goods").parents(".pabody").hasClass("addBorder")||$(".goods").parents(".pabody").addClass("addBorder");
				}
				else{
				  // $("#jqGrid_asso").css({"display":"hidden"});
				   $(".asso").find(".grid-wrap").css({"display":"none"});
				   $(".asso").parents(".pabody").hasClass("addBorder")||$(".asso").parents(".pabody").addClass("addBorder");
				}
			 }
			 if(v=="2"){
					var tableinfo =$(".phead>li.active").index();//参数索引
					if(tableinfo==0){
					   //$("#jqGrid_goods").css({"display":"hidden"});
						  adjustGrid("#jqGrid_goods");
					   $(".goods").find(".grid-wrap").css({"display":"block"});
					   $(".goods").parents(".pabody").removeClass("addBorder");
					}
					else{
					  // $("#jqGrid_asso").css({"display":"hidden"});
						  adjustGrid("#jqGrid_asso");
					   $(".asso").find(".grid-wrap").css({"display":"block"});
					   $(".asso").parents(".pabody").removeClass("addBorder");
					 
					}
				 }
	    }
	 
	  
	  
	
}

function initial(){
	initPage();
}

/*会员生日多倍积分*/
$(document).on("change",".birth-day",function(){
	$('#togglingFormjfbs').data('bootstrapValidator').resetField("brithNum",true);
	$(this).prop("checked") ||$(".multi-score").val("") && $(".multi-score").attr("disabled",true);
	$(this).prop("checked") && $(".multi-score").attr("disabled",false);
	
	
});

/*不使用多倍积分*/
$(document).on("click","#scroes1",mutilRadio);

function mutilRadio(){
	$("#scroes1").prop("checked")&&$(".uni").val("")&&$(".uni").prop("disabled",true);
	$("#scroes1").prop("checked")&& $(".uni2").prop("checked",false) && $(".uni2").prop("disabled",true);
	resetMultiNum();
	$("#scroes1").prop("checked")&& $("input[name='multiNum']").val("");
	$("#scroes1").prop("checked")&& $("input[name='multiNum']").prop("disabled",true);
}
/*时段促销*/
$(document).on("click","#scroes2",function(){
	$(this).prop("checked")&&$("input.time-limit").prop("disabled",false);
	$(this).prop("checked")&&$(".each-month").val("")&& $(".each-month").prop("disabled",true);
	$(this).prop("checked")&&$(".uni2").removeAttr("checked") && $(".uni2").prop("disabled",true);
	resetMultiNum();
	$(this).prop("checked")&& $("input[name='multiNum']").val("");
	if($(this).prop("checked")){
		$("input[name='multiNum']").prop("disabled")&&$("input[name='multiNum']").removeAttr("disabled");
	}
	if($(this).prop("checked")){
		var newDate=new Date();
		if(!$("#startDate").val()){
			$("#startDate").val(newDate.toLocaleDateString().replaceAll("/", "-"));
			 $("#startDate").datetimepicker({
				 maxDate:false
			 });
		}
		if(!$("#endDate").val()){
			$("#endDate").val(newDate.toLocaleDateString().replaceAll("/", "-"));
			 $("#endDate").datetimepicker({
				 minDate:false
			 });
			
		}
	}
});
/*按时段促销时间控制*/
$(document).on("blur","#startDate",function(){
	if($(this).val()){
		if($("#endDate").val()<$(this).val()){
			$("#endDate").val("");
		}
		 $("#startDate").datetimepicker({
			 maxDate:false
		 });
	    $("#endDate").datetimepicker({
		    minDate:$(this).val()
		});
	}
});
$(document).on("blur","#endDate",function(){
	if($(this).val()){
		if($("#startDate").val()>$(this).val()){
			$("#startDate").val("");
		}
		 $("#endDate").datetimepicker({
			 minDate:false
		 });
		 $("#startDate").datetimepicker({
			 maxDate:$(this).val()
		 });
	}
});
/*按月促销*/
$(document).on("click","#scroes3",function(){
	//$("#scroes1").click();
	$(this).prop("checked") && $(".each-month").prop("disabled",false);
	$(this).prop("checked") &&$(".uni2").removeAttr("checked")&& $(".uni2").prop("disabled",true);
	//$(this).prop("checked") && $("#scroes2").removeAttr("checked")&&$("#scroes2").prop("disabled",true);
	$(this).prop("checked") &&$(".time-limit").val("") &&$(".time-limit").prop("disabled",true);
	resetMultiNum();
	$(this).prop("checked")&& $("input[name='multiNum']").val("");
	if($(this).prop("checked")){
		$("input[name='multiNum']").prop("disabled")&&$("input[name='multiNum']").removeAttr("disabled");
	}
	if($(this).prop("checked")){
		if(!$(".each-month").val()){
			$(".each-month").find("option:eq(0)").attr("selected",true);
			
		}
	}
});
function setSEDate(){
	 $("#startDate").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
		 $("#endDate").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
	
}
/*按周促销*/
$(document).on("click","#scroes4",function(){
       $(this).prop("checked") && $(".uni2").prop("disabled",false);
       $(this).prop("checked")&&$(".time-limit").val("") && $(".time-limit").prop("disabled",true);
       resetMultiNum();
       $(this).prop("checked")&& $("input[name='multiNum']").val("");
       if($(this).prop("checked")){
   		 $("input[name='multiNum']").prop("disabled")&&$("input[name='multiNum']").removeAttr("disabled");
       }
       $(this).prop("checked")&&$(".each-month").val("")&&$(" .each-month").prop("disabled",true);

});
/*树形结构*/
var rowId = '';
$("#goodsch").on('show.bs.modal', function (e) {
	var ptId = $(e.relatedTarget).parents("table").attr("id");
	rowId = $(e.relatedTarget).data('rid');
	$('#goodsch').find('#goodsDataTree').html("");//清空树结构
	if(ptId =="jqGrid_goods"){//商品范围
		$("#myModalLabel").html("商品资料");
		ul ="/manager/Tgoodsclass/findTree2";
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

					},
					onDblClick: function(event, treeId, treeNode){
						console.log(treeId)
						   if(treeNode.id>-1){
							   var f =checkOrNot(treeNode,"#jqGrid_goods");
							    if(!f){
									if($("input[name=same]:checked").val()==2){
										$("#"+ptId).setCell(rowId,'code',treeNode.obj.code);//商品分类编码 
								        $("#"+ptId).setCell(rowId,'name',treeNode.obj.name);//商品分类名称
									    $("#"+ptId).setCell(rowId,'goodsClassId',treeNode.obj.id);//商品ID    
									}
									$('#goodsch').modal('hide');//关闭商品资料模态框
							    }else{
							    	$.zxsaas_plus.showalert("提示","已经选择!");
							    	
							    }
							    
						   }else{
							   
								$.zxsaas_plus.showalert("提示","不能选择!");
						   }
					}
				},
				view: {
					showIcon: false
				}
		    }; 
		
		  $.request({
	          type: 'Get',
	          url: ul,//树结构地址
	          dataType: "json", 
	          success: function (data1) {
	              $.fn.zTree.init($("#goodsDataTree"), setting, data1);
	              var zTree1 = $.fn.zTree.getZTreeObj("goodsDataTree");
	          	  zTree1.expandAll(true);//展开全部节点
	          },
	          error: function (msg) {
	          }
	     });
	}
	if(ptId == "jqGrid_asso"){//会员范围
		$("#myModalLabel").html("会员资料");
		var setting = {  
		        data: {
					simpleData: {
						enable: true,
						//idKey: "id",
					    pIdKey: "pid",
						rootPId: "id"
					},
					key: {
						name: "typeName"
						//parent: true
					}
				},
				callback: {
					onClick: function (event, treeId, treeNode, msg) {
						//controllAdd(treeNode.id);//通过id调用对应方法 重构表格
					},
					onDblClick: function(event, treeId, treeNode){
						  if(treeNode.id>-1){
						    var f =checkOrNot(treeNode,"#jqGrid_asso");
						    if(!f){
								if($("input[name=same_asso]:checked").val()==2){
									$("#"+ptId).setCell(rowId,'typeCode',treeNode.typeCode)
							        $("#"+ptId).setCell(rowId,'typeName',treeNode.typeName)
							         $("#"+ptId).setCell(rowId,'mumTypeId',treeNode.id)
								}
								  $('#goodsch').modal('hide');//关闭会员资料模态框
					
						    }else{
						    	$.zxsaas_plus.showalert("提示","已经选择!");
						    	
						    }
						    
						  }else{
							  $.zxsaas_plus.showalert("提示","不能选择!");
						  }
			      }
				},
				view: {
					showIcon: false
				}
		    }; 
		  $.request({
	          type: 'Get',
	          url: "/manager/member/cardType/selectTypeList",//普通结构
	          dataType: "json", 
	          success: function (data1) {
			  var data2=[];
			  for(var i=0;i<data1.data.rows.length;i++){
				  if(data1.data.rows[i].isStop==0||data1.data.rows[i].isStop=="0")
					   data2.push(data1.data.rows[i]);
			  }
			  $.fn.zTree.init($("#goodsDataTree"),setting,data2);
              var zTree1 = $.fn.zTree.getZTreeObj("goodsDataTree");
          	  zTree1.expandAll(true);//展开全部节点
			       
//			    		 if(data1.data.rows.length!=0){
//	  			
//			    			  alert("暂时没有数据" + msg);
//			    		 }
	          	
	          },
	          error: function (msg) {
	          }
	     });

	}
});

//判断是否选中
function checkOrNot(treeNode,tn){
	  var ids = jQuery(tn).jqGrid('getDataIDs'); 
	  for(var i=0;i<ids.length;i++){
		  var rowData = jQuery(tn).jqGrid('getRowData',ids[i]);  
			if(tn=="#jqGrid_goods"){//商品表格
				if(rowData.goodsClassId==treeNode.obj.id){
					return true;
				}
				
			}else{//会员表格
				if(rowData.mumTypeId==treeNode.id){
					return true;
				}
				
			}
	  }
	  return false;
	
}
var lastrow="";
var lastcell="";
/*保存*/
$(document).on("click",".save",function(){
	$("#jqGrid_goods").jqGrid("saveCell",lastrow,lastcell);
	$("#jqGrid_asso").jqGrid("saveCell",lastrow,lastcell);
	var result =$("#saveResult").toJsonObject();//会员多倍积分、积分倍数
	$(".birth-day").prop("checked")|| delete result.birthNum;
	var judgeValue={};
	var f =true;
	if(result.timeType =="2"||result.timeType ==2){
		result.startDate =result.startDate ||"";
		result.endDate  =result.endDate ||"";
		if(result.startDate){
		 judgeValue.startDate=result.startDate;
		}else{
			$.zxsaas_plus.showalert("提示","请填写完整时段促销!");
			f =false;
			return false;
		}
		
		if(result.endDate){
		 judgeValue.endDate=result.endDate;
		}else{
			$.zxsaas_plus.showalert("提示","请填写完整时段促销!");
			f =false;
			return false;
		}
		if(new Date(result.startDate).getTime()>new Date(result.endDate).getTime()){
			$.zxsaas_plus.showalert("提示","开始时间不能大于截止时间!");
			f =false;
			return false;
		}
	}
	else if(result.timeType =="3"){
		result.timeValue =$(".each-month>option:selected").val()||[];
		if(result.timeValue==""||result.timeValue==null){
			$.zxsaas_plus.showalert("提示","请填写按月促销值!");
			f =false;
			return false;
		}else{
			judgeValue.timeValue=result.timeValue;
		}
	}
	else if(result.timeType =="4"){
		var wk =[];
		$(".week>input[type=checkbox]:checked").each(function(i,item){
			   wk.push($(item).val());
		});
		result.timeValue=wk.join(","); 
		if(result.timeValue){
		judgeValue.timeValue=result.timeValue;
		}else{
			$.zxsaas_plus.showalert("提示","请填写按周促销值!");
			f =false;
			return false;
		}
	}
	    var all_not =$("input[name=same]:checked").val();//商品（全部/部分）
	    var all_not1 =$("input[name=same_asso]:checked").val(); //会员（全部/部分）
	    if(all_not == 2){
		    	//商品范围
				//var spfw = $("#jqGrid_goods").jqGrid('getRowData')||[];
	    	   var spfwIDS =$("#jqGrid_goods").jqGrid('getDataIDs');
			
				arr =[];
				for(var i=0;i<spfwIDS.length;i++){
					 var sp ={};
					 
					 var rowData =$("#jqGrid_goods").jqGrid('getRowData',spfwIDS[i]);
					// console.log("$$$$"+rowData.length);
					 if(rowData.goodsClassId !=""){
						 sp.goodsClassId = rowData.goodsClassId;
						 arr.push(sp);
					 }
				}
				if(arr.length!=0)
			    result.goodsType=arr; 
			   
	    }
	    if(all_not1==2){
	    	 //会员范围
		    var hyfwIDS= $("#jqGrid_asso").jqGrid('getDataIDs');
			arr1 =[];
			for(var i = 0;i < hyfwIDS.length;i++){
				 var hy ={};
				 var rowData =$("#jqGrid_asso").jqGrid('getRowData',hyfwIDS[i]);
				 console.log("&&&&"+rowData.mumTypeId);
				 if(rowData.mumTypeId!=""){
					 hy.mumTypeId  = rowData.mumTypeId ;
					 arr1.push(hy);
				 }
				
			}
			if(arr1.length!=0)
		    result.cardType=arr1;	
	    	
	    }
	    
	console.log(JSON.stringify(result));
	if($(".birth-day").prop("checked")){//勾选会员生日必填积分倍数
		if($("input[name='brithNum']").val()==""){
			$.zxsaas_plus.showalert("提示","勾选会员生日必填积分倍数!");
			f=false;
			return false;
		}
	}
	var bootstrapValidator = $("#togglingFormjfbs").data('bootstrapValidator');
	bootstrapValidator.validate();
	if(bootstrapValidator.isValid()&&f){
		$.request({
			url:"/manager/member/multiScore/saveInfo",
			type:"POST",
			datatype:"json",
			contentType:"application/json",
			data:JSON.stringify(result),
			 success: function (data) {
					 if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
				    	
			          },
	          error: function (msg) {
	          }
		});
	}
	
});

//新增一行
$(document).on("click",".icon-plus",function(e){
	//确定相应的表格id
	var tabId =$(this).parent().parents("table").attr("id")
	if("jqGrid_goods"==tabId){//商品范围
	var ids = $("#jqGrid_goods").jqGrid('getDataIDs');
	//获得当前最大行号（数据编号）
	var maxid;
	maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
	$("#jqGrid_goods").jqGrid('addRowData',maxid+1,{},'last' );
    return;
	}
	if("jqGrid_asso"==tabId){//会员范围
	var ids1 = $("#jqGrid_asso").jqGrid('getDataIDs');
	//获得当前最大行号（数据编号）
	var maxid1;
	maxid1 = (ids1.length ==0 ) ? 0 : Math.max.apply(Math,ids1);
	$("#jqGrid_asso").jqGrid('addRowData',maxid1+1,{},'last' );
	return;
	}
	
});
//删除一行
$(document).on('click', '.icon-trash',function(e){
var ptId = $(this).parents("table").attr("id");
var thisTitle = $(this).attr("title");
var rowId = $(this).parent().data('id');
var ids =$("#"+ptId).jqGrid('getDataIDs');
if(thisTitle == "删除"){
	if(ids.length>1){
		$.zxsaas_plus.showconfirm("提示","是否确定删除本行?",function(){
			$("#"+ptId).jqGrid('delRowData', rowId);
		},function(){
			
		});
	}else{
		$.zxsaas_plus.showalert("提示","最后一行不可删除！");
		
	}
}
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

/*****************根据筛商品多倍积分筛选项进行判断积分倍数***********************/
$('#togglingFormjfbs').find('input[name="multiNum"]').on('blur', function(){  
    var kind =$("#togglingFormjfbs").find("input[name='timeType']:checked").val();
    var f =true;
    if(kind=="1"||kind==1){
    	f=false;
    }
    $('#togglingFormjfbs').bootstrapValidator('enableFieldValidators', 'multiNum', f);  
    if (f) {  
        $('#togglingFormjfbs').bootstrapValidator('validateField', 'multiNum') ; 
    }  
});  
//重置商品多倍积分中的积分倍数的验证状态
function resetMultiNum(){
	$('#togglingFormjfbs').data('bootstrapValidator').resetField("multiNum",true);
}