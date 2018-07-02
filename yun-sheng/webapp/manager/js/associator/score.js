

/*积分调整切换查询菜单toggleOrder*/
$("#query").on("show.bs.collapse",function(){
	$(".toggleOrder").removeClass("icon-angle-down");
	$(".toggleOrder").addClass("icon-angle-up");
	$(".top").css({"marginBottom":"20px"});
	//adjustGrid();
});

$("#query").on("hide.bs.collapse",function(){
	$(".toggleOrder").removeClass("icon-angle-up");
	$(".toggleOrder").addClass("icon-angle-down");
	$(".top").css({"marginBottom":"0"});
	//adjustGrid();
});

/*调整历史切换查询菜单toggleOrder*/
$("#historyQuery").on("show.bs.collapse",function(){
	$(".toggleOrder").removeClass("icon-angle-down");
	$(".toggleOrder").addClass("icon-angle-up");
	$(".top").css({"marginBottom":"20px"});
	//adjustGrid();
});

$("#historyQuery").on("hide.bs.collapse",function(){
	$(".toggleOrder").removeClass("icon-angle-up");
	$(".toggleOrder").addClass("icon-angle-down");
	$(".top").css({"marginBottom":"0"});
	//adjustGrid();
});
function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];
		var colName0 = ['会员卡号','会员类型','持卡人','初始','累计积分','已调整积分','已清除积分','积分余额','手机号','创建人','创建时间'];//积分调整表初始化
		colNamec[0]=colName0;
		
		var colName1 = ['会员卡号','持卡人','会员类型','手机号'];//积分调整弹窗表
		colNamec[1]=colName1;
		
		var colName2 = ['会员卡号','持卡人','手机号','会员卡类型','更改操作','更改日期','更改积分','更改原因','操作员'];//调整历史
		colNamec[2]=colName2;
		
		var JqGridColModelc = [];
		//积分调整表初始化
		var JqGridColModel0 =[
								{name:'cardNum',index:'card_num', width:150,align:'center', sortable:true},
								{name:'typeName',index:'type_name', width:150,align:'center',sortable:true},
								{name:'cardHolder',index:'cardHolder', width:150,align:'center',sortable:true},
								{name:'score',index:'score', width:150,align:'center',sortable:true},
								{name:'tatolScore',index:'tatol_score', width:150,align:'center',sortable:true},
								{name:'adjScore',index:'adj_score', width:150,align:'center',sortable:true},
								{name:'clearScore',index:'clear_score', width:150,align:'center',sortable:true},
								{name:'surScore',index:'sur_score', width:150,align:'center',sortable:true},
								{name:'tel',index:'te_l', width:150,align:'center',sortable:true},
								{name:'addName',index:'name', width:150,align:'center',sortable:true},
								{name:'addTime',index:'add_time', width:150,align:'center',sortable:true}
			                ];
		JqGridColModelc[0]=	JqGridColModel0;     
		//积分调整弹窗表
		var JqGridColModel1 =[
			                    {name:'cardNum',index:'goodsclassId',sortable:false, width:100,align:'center'},
							   	{name:'cardHolder',index:'deliveryDo',sortable:false,width:100,align:'center'},
								{name:'typeName',index:'typeName', width:150,align:'center',sortable:false},
								{name:'tel',index:'tel', width:150,align:'center', sortable:false}
			                ];
		JqGridColModelc[1]=	JqGridColModel1;     
	     
	     //调整历史
		var JqGridColModel2 =[
								{name:'cardNum',index:'cardNum', width:150,align:'center', sortable:true},
								{name:'cardHolder',index:'cardHolder', width:150,align:'center',sortable:true},
								{name:'phone',index:'tel_1', width:150,align:'center',sortable:true},
								{name:'typeName',index:'typeName', width:150,align:'center',sortable:true},
								{name:'operate',index:'operate', width:150,align:'center',sortable:true},
								{name:'timeStr',index:'timeStr', width:150,align:'center',sortable:true},
								{name:'adjustScore',index:'adjustScore', width:150,align:'center',sortable:true},
								{name:'adjustCause',index:'adjustCause', width:150,align:'center',sortable:true},
								{name:'empName',index:'empName', width:150,align:'center',sortable:true}
			                ];
		JqGridColModelc[2]=	JqGridColModel2;   
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
		choose:false,
		sort:false,
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
			            sortable:true,	
			            sortorder: 'desc',
			            sortname:"id",	            
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
						multiselect:options.choose,
						multiboxonly:true,
						sortable:options.sort,
						sortable:'asc',
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
						},
						onCellSelect:function(id,index,cellcontent,e){
							/*var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
					      	rowid=id;
					      	var ids = $(options.TableName).jqGrid('getDataIDs');
							//获得当前最大行号（数据编号）
							var maxid;
							maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
							//当用户点击表格最后一行时,自动增加一行
							
							(id == maxid && index != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );*/
						},
//						onSelectRow:function(id){
//							if(id!=lastsel&&lastsel!=''){
//								$(options.TableName).jqGrid('saveRow',lastsel,{
//									aftersavefunc:function(rowid,response ){
//										console.log(id);
//									}
//									});
//							}
//							lastsel=id;
//						var rec = $(options.TableName).jqGrid('getRowData', id);
//						
//						},
						
						beforeSelectRow:function(rowid,e){
                          
                            
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
						//	var ids=$(options.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
							console.log(data)
						//	var len = data.data.rows.length;
							//jQuery("#jqGrid_addService").jqGrid('setFrozenColumns');
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
		
		}
		    
			/*操作列*/
			function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash" aria-hidden="true" id="remove_row" title="删除行"></span></div>';
				return addAndDel;
			}
			

			 function Goodsmodel(cellvalue, options, rowObject){
		            if(cellvalue == undefined || cellvalue == ""){
	                	cellvalue = "";
	                }
					return '<span class="goodsSort" style="display: inline-block; width: 89px;height: 16px;" data-toggle="modal" data-target="#goodsch" data-rId="' + options.rowId +'">' + cellvalue + '</span>';     
			}
			
			
			//删除一行
			$(document).on('click', '.glyphicon-trash',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					console.log('条数:' + $('#jqGrid_SubjectBalance tbody tr').length);
					if($(options.TableName+' tbody tr').length === 2) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						return false;
					}
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						$(options.TableName).jqGrid('delRowData', rowId);
					},function(){
						
					});

				}
			});
			
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
			
			
			
			
			//列表    重置密码
			function rePwd(cellvalue, options, rowObjec)
			{
				console.log(options + ';;;;;');
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

function drawTable(tn,pger,tableinfo){
	if(tableinfo == 0){//积分调整表格初始
		
		loadmodal({TableName:tn,pager:pger,sort:true,edit:false,TableInfo:tableinfo,LoadTableUrl: "/manager/member/scoreUpdate/selectList",choose:true});	
  // 	loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/card/selectAll"});	
       

	}
	else if(tableinfo == 1){//积分调整表格弹窗
		loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "/manager/member/scoreUpdate/selectList"});	
		$("#jqGrid_changeScore").setGridWidth($("#scoreChangeModal").find(".grid-wrap").width());
		$("#jqGrid_changeScore").setGridWidth($("#scoreChangeModal").find(".grid-wrap").height());
		//loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/card/selectAll"});	
	}
	else if(tableinfo == 2){//调整历史
		loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "/manager/member/scoreUpdate/selectAdjustList"});	
		//loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/card/selectAll"});	
	}
	
}


function initial(){
	$("#createDateBegin").datetimepicker({//出生日期
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
	$(document).on("blur","#createDateBegin",function(){
		 if($(this).val()){
			 if($(this).val()>$("#createDateEnd").val()){
				  $("#createDateEnd").val(""); 
			 }
		   $("#createDateEnd").datetimepicker({//出生日期
			  minDate:new Date($(this).val())
			});
		 }
	 });
	 $("#createDateEnd").datetimepicker({//出生日期
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
	
	 $.request({
	       url: '/manager/jxc/base/getLeafSectionVoList',
	       type: "POST",
	       traditional: true,
	       success: function (data) {
			   $(".fkbm").html("");
			   $(".fkbm").append("<option></option>");
			   for(var i=0;i<data.data.sectionVoList.length;i++){
				   $(".fkbm").append("<option value='"+data.data.sectionVoList[i].id+"'>"+data.data.sectionVoList[i].name+"</option>");
			   }
		 },
	       error: function (msg) {
	         
	       }
	   });
	
	 
	 
	 $.request({
	       url: '/manager/member/scoreUpdate/init',
	       type: "POST",
	       traditional: true,
	       success: function (data) {
			   $(".fkgs").val(data.data.companyName);
			   $(".cardType").html("");
			   $(".cardType").append("<option></option>");
			   for(var i=0;i<data.data.cardType.length;i++){
				      $(".cardType").append("<option value='"+data.data.cardType[i].id+"'>"+data.data.cardType[i].typeName+"</option>");
			   }
		 },
	       error: function (msg) {
	          
	       }
	   });
	 
	 
	 
	 drawTable("#jqGrid_score","#jqGridPagerscore","0");
	 drawTable("#jqGrid_changeScore","#jqGridPagerchangeScore","1");
	 drawTable("#jqGrid_changeHis","#jqGridPagerchangeHis","2");
	 
}

var ids;
//更改类型显示
$(document).on("click",'.jftz',function(){
	  $("#jqGrid_changeScore").jqGrid('clearGridData');
	   var ids= $("#jqGrid_score").jqGrid('getGridParam','selarrrow');
	   if(ids.length!=0){
		   	for(var i=0;i<ids.length;i++){
		   	    var rowData =$("#jqGrid_score").jqGrid('getRowData',ids[i]);
		   	    $("#jqGrid_changeScore").jqGrid('addRowData',i+1,rowData);
		   }
		   	$("#scoreChangeModal").modal('show');
	   }else{
			$.zxsaas_plus.showalert("提示", "请选择一行!");
	   }
});
//积分调整模态框出现
$("#scoreChangeModal").on("shown.bs.modal",function(){
	var w =$(this).find(".grid-wrap").width();
	$("#jqGrid_changeScore").setGridWidth(w);

});
//积分调整模态框消失
$("#scoreChangeModal").on("show.bs.modal",function(){
	
    $("#topAjustice").data('bootstrapValidator').destroy();
    $('#topAjustice').data('bootstrapValidator', null);
   // formValidator();
    $("#topAjustice").bootstrapValidator({
        feedbackIcons: {
             valid: 'glyphicon glyphicon-ok',
             invalid: 'glyphicon glyphicon-remove',
             validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
        	adjustScore: {//积分调整
                 trigger: 'blur',
                 validators: {
        	        Dig_Complete:{
    		 	      message: '请输整数!' 
    		 	   }

                 }
             }
                     
        }/*——end fields——*/
    });

	//$("#topAjustice").data('bootstrapValidator').updateStatus("adjustScore","NOT_VALIDATED").validateField('adjustScore');
	//$("#topAjustice").data('bootstrapValidator').updateStatus("adjustCause","NOT_VALIDATED").validateField('adjustCause');
	$("#adjustScore").val("");
	$("#adjustCause").val("");

});
//保存调整
$(document).on("click",'.jftzSave',function(){
	 var ids =$("#jqGrid_score").jqGrid('getGridParam','selarrrow'); 
	 $.request({
	       url: '/manager/member/scoreUpdate/adjusScore',
	       type: "POST",
	       data: {"score": $("#adjustScore").val(),"cause":$("#adjustCause").val(),"ids":ids},
	       traditional: true,
	       success: function (data) {
			   $("#jqGrid_score").trigger("reloadGrid");
		 },
	       error: function (msg) {
	 
	       }
	   });
});

//查询
$(document).on("click",'.queryBtn',function(){
	var obj=$("#query").toJsonObject();
	$("#jqGrid_score").jqGrid('setGridParam',{  
        datatype:'json',
        postData:obj
    }).trigger("reloadGrid"); //重新载入

});


//历史查询
$(document).on("click",'.historyQueryBtn',function(){
	var obj=$("#historyQuery").toJsonObject();
	$("#jqGrid_changeHis").jqGrid('setGridParam',{  
      datatype:'json',
      postData:obj
  }).trigger("reloadGrid"); //重新载入
});
