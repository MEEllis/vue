var	lastrow = "";
var lastcell = "";
function loadmodal(options){
	//初始化参数
	var colName = [];
	//主表，售后处理，转至售后 ，不可增加
	var colName0 =['id','服务名称','有无期限','服务期限','有无次数限制','效期内可服务次数','预设定价','是否关联串号','使用范围','备注','停用'];
	colName[0] = colName0;
	//主表下的选项卡表 ，维修项目，可增加
	var colName1 =['操作','id','商品分类编码','商品分类名称'];
	colName[1] = colName1;
	
	var colName2 =['id','增值服务名称','是否关联串号','预设定价','服务期限','有效次数','备注'];
	colName[2] = colName2;
	
	var JqGridColModel = [];
	var JqGridColModel0 =[
	                   {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'serverNumber',index:'serverNumber', width:120,align:'center',sorttype:'string'},
	                   {name:'serverName',index:'serverName', width:100,align:'center',sorttype:'string',formatter:checkBox},
	                   {name:'upDate',index:'upDate', width:100,align:'center',sorttype:'string'},
	                   {name:'upDate',index:'upDate', width:100,align:'center',sorttype:'string',formatter:checkBox},
	                   {name:'peploe',index:'peploe', width:120,align:'center',sorttype:'string'},
	                   {name:'fs',index:'fs', width:120,align:'center',sorttype:'string'},
	                   {name:'fx',index:'fx', width:150,align:'center',sorttype:'string',formatter:checkBox},
	                   {name:'fx',index:'fx', width:120,align:'center',sorttype:'string'},
	                   {name:'serverName',index:'serverName', width:100,align:'center',sorttype:'string'},
	                   {name:'serverName',index:'serverName', width:100,align:'center',sorttype:'string'}
	                   ];
	JqGridColModel[0]=JqGridColModel0;
	
	var JqGridColModel1 =[
						{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete},
	                     {name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'serverNumber',index:'serverNumber', width:180,align:'center',sorttype:'string'},
	                   {name:'upDate',index:'upDate', width:150,align:'center',sorttype:'string'}
		                   ];
	JqGridColModel[1]=JqGridColModel1;
	
	var JqGridColModel2=[
						{name:'id',index:'id',width:70,align:'center',hidden:true},
	                   {name:'serverNumber',index:'serverNumber', width:150,align:'center',sorttype:'string'},
	                   {name:'serverName',index:'serverName', width:120,align:'center',sorttype:'string',formatter:checkBox},
	                   {name:'upDate',index:'upDate', width:100,align:'center',sorttype:'string'},
	                   {name:'upDate',index:'upDate', width:100,align:'center',sorttype:'string'},
	                   {name:'peploe',index:'peploe', width:100,align:'center',sorttype:'string'},
	                   {name:'fs',index:'fs', width:120,align:'center',sorttype:'string'}
						];
	JqGridColModel[2]=JqGridColModel2;
	
	//全局当前选择的rowid colid
	var rowid='';
	//var colid='';
	var select_name='';
	var defaults = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	LoadTableUrl: "../../json/afterSale/registrationCard.json",
	//LoadTableUrl: "../../json/admin/metaData12.json",
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_ServerFile", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGrid_ServerFile",
	TableInfo:"0",
	choose:true,
	height: $(window).height()*0.45,
	footerrow:false,
	userDataOnFooter:false
	
//	inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
	};
	$("#datetimepickerStart1").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
	$("#datetimepickerStart2").datetimepicker({
		  lang:"ch",           //语言选择中文
	      format:"Y-m-d",      //格式化日期
	      timepicker:false,    //关闭时间选项
	      todayButton:false    //关闭选择今天按钮
		});
	var options = $.extend(defaults,options);
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';	
		var lastsel='';//最后一次选中的行
		var rightClickColid="";//右键列id
		var rightClickColIndex=0;//右键index
		//var toggleflag=false;//冻结时候切换用
		var c=options.TableInfo;//参数index
		console.log("&&&&"+c);
		var colNames = colName[c];
		var JqGridColModel = JqGridColModel[c];
		loadtable();
	//加载表格
	
		function loadtable(){
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"GET",
					datatype: "json",
					jsonReader  : {	
							root: "rows",
							repeatitems: false
							},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            cellEdit:true,
		            cellsubmit:'clientArray',//单元格保存内容的位置
		            editurl: 'clientArray',
		            sortable:false,			            
		            rownumbers:true,
		            rowNum: 10,
		            rowList: [10, 20, 40],
		            pager:options.pager,
		            viewrecords: true,
		        
		           //  cellEdit:true,
		            width: "100%" ,
		           // height: $(window).height()*0.45,
		            height:options.height,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
					multiselect:options.choose,
					multiboxonly:true,
					//footerrow:true,  //设置表格显示表脚
					//userDataOnFooter:true,//设置userData 显示在footer里
					footerrow:options.footerrow,
					userDataOnFooter:options.userDataOnFooter,
					ondblClickRow:function(id){
					//双击进入编辑
		   				var delid = id;
					},
					onCellSelect:function(id,index,cellcontent,e){
						var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
				      	select_name=colName
				      	select_index=index;
				      	rowid=id;
				      	if(options.TableInfo != 0){
					      	var ids = $(options.TableName).jqGrid('getDataIDs');
							//获得当前最大行号（数据编号）
							var maxid;
							maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
							//当用户点击表格最后一行时,自动增加一行
							
							(id == maxid && index != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );
						}
				     
					},
					beforeEditCell:function(rowid,cellname,v,iRow,iCol){
												lastrow = iRow;
												lastcell = iCol;
					},
					afterEditCell: function(rowid, cellname, value, iRow, iCol){//编辑完cell
						
					},
					beforeSelectRow:function(rowid,e){
                        //单行选择
                          
					},
					afterInsertRow: function (rowid, aData) { //新增一行之后

					},
					gridComplete: function() {
					//	var ids=$(options.TableName).jqGrid("getDataIDs");
						
                   
					},
					loadComplete:function(data){
						
					},
					loadError:function(xhr,status,error){
						//console.log(status)
					}
					})
	
		}
		//删除一行
			$(document).on('click', '.glyphicon-trash',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					//console.log('条数:' + $('#jqGrid_SubjectBalance tbody tr').length);
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
		
		function addAndDelete(cellvalue, options, rowObjec){
			var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash delete" aria-hidden="true" id="add_row" title="删除行"></span></div>';
			return addAndDel;
		}
		
		
		// 列表复选框
		function checkBox(cellvalue, options, rowObjec){
			return '<input type="checkbox" class="checkBoxNum" data-id="' + rowObjec.deliveryId + '"  data-rId="' + options.rowId + '" />';
		}
		//单选按钮
		function radioYF(cellvalue,options,rowObject){
			return '<input type="radio" name="tableRad" />';
		}
		
}

//新增
$(document).on('click','.addChoose',function(){
	loadmodal({"TableName":"#jqGrid_addserverName","pager":"#gridpager_addserverName","TableInfo":"1","choose":false,"height": $(window).height()*0.2});
});

//控制编辑新增下input
$(document).on('click','.yongjiu',function(){
	if($(this).prop('checked')){
		$('.yongjiu1').attr("disabled","disabled");
		$('.yongjiu1').val('');
	}else{
		$('.yongjiu1').removeAttr("disabled");
	}
});
$(document).on('click','.wucishu',function(){
	if($(this).prop('checked')){
		$('.wucishu1').attr("disabled","disabled");
		$('.wucishu1').val('');
	}else{
		$('.wucishu1').removeAttr("disabled");
	}
});
$(document).on('blur','.wucishu1',function(){
	//检查是否为正整数
	 var reg=/^\d+$/;
	 if(reg.test($(this).val())){
	 	
	 }else if($(this).val()== ''){
	 	return true;
	 }else{
	 	$.zxsaas_plus.showalert("错误","输入格式不正确!")
	 }

});
















