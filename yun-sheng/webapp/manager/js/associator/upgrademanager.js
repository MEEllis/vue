/*表格验证弹出自定义错误提示框*/
$(document).on("focus","#info_dialog",function(){
    varerrormessage=$("#infocnt").text();
   $("#info_dialog").hide();
   $.zxsaas_plus.showalert("错误",varerrormessage);
});

/*切换查询菜单toggleOrder*/
$("#query").on("show.bs.collapse",function(){
	$(".toggleOrder").removeClass("icon-angle-down");
	$(".toggleOrder").addClass("icon-angle-up");
	$(".top").css({"marginBottom":"20px"});
	adjustGrid();
});

$("#query").on("hide.bs.collapse",function(){
	$(".toggleOrder").removeClass("icon-angle-up");
	$(".toggleOrder").addClass("icon-angle-down");
	$(".top").css({"marginBottom":"0"});
	adjustGrid();
});

function adjustGrid(){
//	scoreTab	
	var w =$(".scoreTab").width();
	$("#jqGrid_score").setGridWidth(w);
}

/*global vari*/
var baseAftEditCellRowId ="";
var baseAftEditCellCellName ="";
var baseAftEditTableName ="";
function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];
		var colName0 = ['处理日期','处理类型','会员卡类型','原会员卡类型','会员卡号','持卡人'];//会员升级管理表初始化
		colNamec[0]=colName0;
		
		var colName1 = ['id','会员卡类型','升/降级方式','有无时限','统计时段','每年检测日期','上级类型','累计积分','累计消费金额','自动升级','下级类型','累计积分下限','累计金额下限','自动降级',
		                '会员卡类型id','上级id','下级id'];//升级条件设置（还没改）
		colNamec[1]=colName1;
		
		var JqGridColModelc = [];
		//会员升级管理表初始化
		var JqGridColModel0 =[
								{name:'createDateString',index:'CREATE_DATE',width:150,align:'center',sortable:true},
								{name:'oprType',index:'OPR_TYPE',width:150,align:'center',sortable:true,formatter:'select', editoptions:{value:"1:升级;2:降级;3:自动升级;4:自动降级;5:类型变更;6:换卡"}},
								{name:'newValue',index:'NEW_VALUE',width:150,align:'center',sortable:true},
								{name:'oldValue',index:'OLD_VALUE',width:150,align:'center',sortable:true},
								{name:'cardNum',index:'CARD_NUM',width:150,align:'center',sortable:true},
								{name:'cardHolder',index:'CARDHOLDER',width:150,align:'center',sortable:true},
			                ];
		JqGridColModelc[0]=	JqGridColModel0;     
		//升级条件设置（还没改）
		var JqGridColModel1 =[  {name:'id',index:'id', width:100,align:'center', sortable:false,hidden:true},
							   	{name:'typeName',index:'typeName', width:100,align:'center', sortable:false},
								{name:'upFlag',index:'upFlag', width:100,align:'center', sortable:false,formatter:'select', editoptions:{value:"1:金额;2:积分"}},
								{name:'timeFlag',index:'timeFlag', width:100,align:'center', sortable:false,formatter:'select', editoptions:{value:"1:无;2:有"}},
								{name:'tjNum',index:'tjNum', width:100,align:'center', sortable:false},
								{name:'checkDate',index:'checkDate', width:150,align:'center', sortable:false},
								{name:'lastTypeName',index:'lastTypeName', width:100,align:'center', sortable:false},
								{name:'totalScoreUp',index:'totalScoreUp', width:100,align:'center', sortable:false,editable:true,editrules:{custom:true,custom_func:DigPositive}},//累计积分
								{name:'totalAmountUp',index:'totalAmountUp', width:150,align:'center', sortable:false,editable:true,editrules:{custom:true,custom_func:DigPositive}},//累计消费金额
								{name:'isAutoup',index:'isAutoup', width:100,align:'center', sortable:false,formatter:'select', editoptions:{value:"0:否;2:是"}},
								{name:'nextTypeName',index:'nextTypeName', width:100,align:'center', sortable:false},
								{name:'totalScoreDown',index:'totalScoreDown', width:150,align:'center', sortable:false,editable:true},//累计积分下限
								{name:'totalAmountDown',index:'totalAmountDown', width:150,align:'center', sortable:false,editable:true},//累计金额下限
								{name:'isAutodown',index:'isAutodown', width:100,align:'center', sortable:false,formatter:'select', editoptions:{value:"0:否;2:是"}},
								{name:'cardtypeId',index:'cardtypeId', width:100,align:'center',hidden:true, sortable:false},
								{name:'lastCardtypeId',index:'lastCardtypeId', width:100,align:'center',hidden:true, sortable:false},
								{name:'nextCardtypeId',index:'nextCardtypeId', width:100,align:'center',hidden:true, sortable:false},
			                ];
		JqGridColModelc[1]=	JqGridColModel1;     
	     
	    
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
							page: "data.page",
					        total: "data.total",
					        records: "data.records",
							repeatitems: false
								},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            cellEdit:true,
			            cellsubmit:'clientArray',
			            editurl: 'clientArray',
			            sortable:true,	
			            sortorder: 'desc',
			            sortname:"id",			            
			            rownumbers:true,
			            rowNum: 10,
			            rowList: [10, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		       
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
//						multiselect:options.choose,
//						multiboxonly:true,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
						},
						onCellSelect:function(id,index,cellcontent,e){
					                
						},
						beforeSelectRow:function(rowid,e){
							  if(options.TableName=="#jqGrid_upGrade"){
								 var rowData=$("#jqGrid_upGrade").jqGrid("getRowData",rowid);
								 
								 if(rowData.upFlag==1){//金额
									 $('#jqGrid_upGrade').setColProp('totalAmountUp',{editable:true});//累计消费金额
									 $('#jqGrid_upGrade').setColProp('totalAmountDown',{editable:true});//累计金额下限
									 $('#jqGrid_upGrade').setColProp('totalScoreUp',{editable:false});//累计积分
									 $('#jqGrid_upGrade').setColProp('totalScoreDown',{editable:false});//累计积分下限
									 
								 }else if(rowData.upFlag==2){//积分
									 $('#jqGrid_upGrade').setColProp('totalAmountUp',{editable:false});//累计消费金额
									 $('#jqGrid_upGrade').setColProp('totalAmountDown',{editable:false});//累计金额下限
									 $('#jqGrid_upGrade').setColProp('totalScoreUp',{editable:true});//累计积分
									 $('#jqGrid_upGrade').setColProp('totalScoreDown',{editable:true});//累计积分下限
									 
								 }
								 
								  
							  }
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
							lastrow = iRow;
							lastcell = iCol;
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后
                              
						},
						afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
						},
						gridComplete: function() {
						},
						loadComplete:function(data){
							$("#jqGrid_score").setGridWidth($("#jqGrid_score").parent(".grid-wrap").width());  	
							adjustGrid();
						},
						loadError:function(xhr,status,error){
						}
						})
		
		}
            //输入正整数（>=0）
			function DigPositive(value,colname){
			    var reg=/^[0-9]*[1-9][0-9]*$/;
				  if (reg.test(value)||value==""){ 
					    return [true,""];
				  }else {
			        	
				        return [false,"只允许输入正整数！"];
			       }
			}
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
	if(tableinfo == 0){//会员升级管理表格初始
		//$(tn).jqGrid("setGridWidth",$(".grid-wrap").width());
		loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardTypeUp/selectList",choose:true});	
		adjustGrid();
	}
	else if(tableinfo == 1){//升级条件设置
		loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardTypeUp/selectTypeUpList"});	
		$(tn).jqGrid('setGroupHeaders', {useColSpanStyle: true, groupHeaders:[{startColumnName:'timeLimit',numberOfColumns:3, titleText:'有效期设置'},{startColumnName:'upClassSort',numberOfColumns:3, titleText:'升级设置'},{startColumnName:'downClassSort',numberOfColumns:3, titleText:'降级设置'}]});
	}
	
}

/*树结构*/
/*function drawTree(){
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
					//alert(treeNode ? treeNode.tId + ", " + treeNode.name : "isRoot");
				   
				}
			},
			view: {
				showIcon: false
			}
	   }; 
	     $.ajax({
	            type: 'Get',
	            url: '../../json/associator/Tree.json',//树结构地址
	            dataType: "json", 
	            success: function (data1) {
	    	 		
	                $.fn.zTree.init($("#assosiator-tree"), setting, data1);
	                var zTree1 = $.fn.zTree.getZTreeObj("assosiator-tree");
                	zTree1.expandAll(true);//展开全部节点
                	
	            },
	            error: function (msg) {
	            }
	        });
	 
	     
	
	
}*/

function initial(){
	$("#createDateBegin").datetimepicker({//出生日期
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
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
	 drawTable("#jqGrid_upGrade","#jqGridPagerupGrade","1");
	//drawTree();
}

/*对最后编辑的cell进行保存*/
function saveAfterEdit(){
	$(baseAftEditTableName).jqGrid("saveCell",baseAftEditCellRowId,baseAftEditCellCellName);

}
//升级管理模态框
$("#upGradeModal").on("show.bs.modal",function(){
	var anchoTotal=1095;
	var w=document.documentElement.clientWidth;
	var l=(w-anchoTotal)/2;
	$("#upGradeModal").find(".modal-content").css({"left":0-l});
    $("#jqGrid_upGrade").jqGrid('setGridWidth', $("#upGradeModal").find(".grid-wrap").width());
    $("#jqGrid_upGrade").jqGrid('setGridHeight', 300);
 
});//shown.bs.modal 
//升级管理弹出css样式渲染后
$("#upGradeModal").on("shown.bs.modal",function(){
	var left=$("#upGradeModal .modal-content").css("left");
	var Owidth=$("#upGradeModal .modal-content").width();
	$("#info_dialog").css({"left":left-parseInt((Owidth-290)/2)});
	
});

//查询
$(document).on("click",'.queryBtn',function(){
	//验证
	var bootstrapValidator = $("#togglingFormSJTJ").data('bootstrapValidator');
	bootstrapValidator.validate();
	if(bootstrapValidator.isValid()){
		var obj=$("#query").toJsonObject();
		$("#jqGrid_score").jqGrid('setGridParam',{  
	        datatype:'json',
	        postData:obj
	    }).trigger("reloadGrid"); //重新载入
	}

});

var lastrow="";
var lastcell="";
//升级条件设置保存
$(document).on("click",".upGradeSave",function(){
	$("#jqGrid_upGrade").jqGrid("saveCell",lastrow,lastcell);  
	var ids=$("#jqGrid_upGrade").jqGrid('getDataIDs');
	var arr =[];
	for(var i=0;i<ids.length;i++){
		 var rowData ={};
		 rowData =$("#jqGrid_upGrade").jqGrid('getRowData',ids[i]);
	     arr.push(rowData);
	}
	$.request({
		url:"/manager/member/cardTypeUp/save",
		type:"POST",
		datatype:"json",
		contentType:"application/json",
		traditional:true,
		data:JSON.stringify(arr),

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
});