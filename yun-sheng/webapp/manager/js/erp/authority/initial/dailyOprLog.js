$(function(){

	loadmodal();
})
		
function toDaily(){
	
	window.location.href= basePath + "/jxc/authority/tdaily/daily";
}
		
$("#endTimeString").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
	});
$("#startTimeString").datetimepicker({
	  lang:"ch",           //语言选择中文
    format:"Y-m-d",      //格式化日期
    timepicker:false,    //关闭时间选项
    todayButton:false    //关闭选择今天按钮
	});
		//判断开始 结束时间是否合法  
		$('#endTimeString').on('blur',function(e){
			var startTime = Number($('#startTimeString').val().replace(/\-/g,''));
			var endTime = Number(e.target.value.replace(/\-/g,''));
			(startTime > endTime) && ($.zxsaas_plus.showalert("","开始日期不能大于结束日期!"));
		});
		$('#startTimeString').on('blur',function(e){
			var endTime = Number($('#endTimeString').val().replace(/\-/g,''));
			var startTime = Number(e.target.value.replace(/\-/g,''));
			(startTime > endTime) && ($.zxsaas_plus.showalert("","开始日期不能大于结束日期!"));
		});
		
		//保存并新增
		function saveAndAdd(){
			//调用存储方法
			
			//清空表单
			$('.comNo').val('');
			$('.comName').val('');
			$('.comInfo').val('');
			$('.comFen').val('0');
			$.zxsaas_plus.showalert("","保存成功!");
		}
		
		//保存并关闭
		function saveAndClose(){
			//调用存储方法
//			$('.areaSearch').val('++++');
			
			$.zxsaas_plus.showalert("","保存成功!");
		}	
		
/*******************************条件查询***********************************/
function queryTdailyOprLog(){
	var param = new Object();
	param.endTimeStr = $("#endTimeString").val();
	param.startTimeStr = $('#startTimeString').val();
	param.selDepName = $('#selDepName').val();
	$("#jqGrid_blocMessage").jqGrid('setGridParam',{ 
        url:basePath + '/jxc/authority/tdaily/findTdailyOprLog',
        postData:param, //发送数据 
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}


function loadmodal(){
	var options = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	LoadTableUrl: basePath + '/jxc/authority/tdaily/findTdailyOprLog',
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager"
	};
	$("#datetimepickerStart").datetimepicker({
	  lang:"ch",           //语言选择中文
      format:"Y-m-d",      //格式化日期
      timepicker:false,    //关闭时间选项
      todayButton:false    //关闭选择今天按钮
	});
	$("#datetimepickerEnd").datetimepicker({
	  lang:"ch",           //语言选择中文
      format:"Y-m-d",      //格式化日期
      timepicker:false,    //关闭时间选项
      todayButton:false    //关闭选择今天按钮
	});
	
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
		var colNames = ['部门名称','事件','日结日期','操作人','备注','操作时间','id','集团id','公司id','部门id','操作人id'];
		var JqGridColModel=[
							{name:'depName',index:'depName',sortable:false},
							{name:'operatorName',index:'operatorName',sortable:false},
							{name:'dailyDateString',index:'dailyDateString',sortable:false},
							{name:'dailyName',index:'dailyName',sortable:false},
							{name:'remark',index:'remark',sortable:false},
							{name:'operatorTimeString',index:'operatorTimeString',sortable:false},
							
							//隐藏
			                {name:'id',index:'id', align:'center',hidden:true,sortable:false},
			                {name:'groupId',index:'groupId', align:'center',hidden:true,sortable:false},
			                {name:'companyId',index:'companyId', align:'center',hidden:true,sortable:false},
			                {name:'sectionId',index:'sectionId', align:'center',hidden:true,sortable:false},
			                {name:'operatorId',index:'operatorId', align:'center',hidden:true,sortable:false}
		                ];
		
		loadtable();
	//加载表格
		function loadtable(){
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"POST",
					datatype: "json",
		            treeGrid:true,//w为ture 则为树形表格
		            treeGridModel:"adjacency",
		            ExpandColumn:"depName",//展开的列
					jsonReader  : {	
							root: "rows",
							repeatitems: false
								},
				    treeReader : {  
				      level_field: "level",  
				      parent_id_field: "parent",   
				      leaf_field: "isLeaf",  
				      expanded_field: "expanded"  
				    },
					colNames:colNames,          
		            colModel:JqGridColModel,
		            sortable:false,	
		            sortname:'depTime',
		            sortorder: 'desc',
		            rowNum: 20,
		            rowList: [20, 25, 40],
		            pager:options.pager,
		            viewrecords: true,		           
		            width: "100%" ,
		            postData:queryTdailyOprLog(),
		            height: $(window).height()*0.65,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:true,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					ondblClickRow:function(id){
					//双击进入编辑
		   				var delid = id;
		   				
					},
					onCellSelect:function(id,index,e){
						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
				      	select_name=colName
				      	select_index=index;
						//后续可以通过点击的列名称来弹框等
					},
					onSelectRow:function(id){
						if(id!=lastsel&&lastsel!=''){
							$(options.TableName).jqGrid('saveRow',lastsel,{
								aftersavefunc:function(rowid,response ){
								}
								});
						}
						lastsel=id;
					var rec = $(options.TableName).jqGrid('getRowData', id);
					
					},
					
					beforeSelectRow:function(rowid,e){

					},
					afterInsertRow: function (rowid, aData) { //新增一行之后

					},
					gridComplete: function() {
						var ids=$(options.TableName).jqGrid("getDataIDs");

					},
					loadComplete:function(data){
					},
					loadError:function(xhr,status,error){
					}
					})
	
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
		
		//显示隐藏禁用
		//  0 : 禁用       
		//  1 : 不禁用
		$(document).on('click','.double',function(e){
			var selectedRowIds = $(options.TableName).jqGrid("getRowData");  
			var len = selectedRowIds.length;  
			if($('input.double').prop('checked')){
				for(var i = 1;i <= len ;i ++) {  
					var gridData = $(options.TableName).jqGrid("getRowData",i);
					if(gridData.depDouble == '0'){
						$(options.TableName).setRowData(i,null,{display: 'table-row'});//显示禁用
					}
				}  
			}else{
				for(var i = 1;i <= len ;i ++) {  
					var gridData = $(options.TableName).jqGrid("getRowData",i);
					if(gridData.depDouble == '0'){
						$(options.TableName).setRowData(i,null,{display: 'none'});//隐藏禁用
					}
				}  
			}
		});
		
		
		
		//列表    重置密码
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
		

