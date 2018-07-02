$(function(){
		
			loadmodal();
		})

function toDaily(){
	
	window.location.href= basePath + "/jxc/authority/tdaily/daily";
}
		
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
function querystockNumHis(){
	var postData = $("#jqGrid_goods").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
	var param = new Object();
	param.queryText = $("#queryText").val();
	param.selDateStr = $('#datetimepickerStart').val();
	$("#jqGrid_goods").jqGrid("setGridParam", { postData: param,page:1}).trigger("reloadGrid");
}


function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: basePath + '/jxc/authority/tdaily/findIstockNumHis',
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "#jqGrid_goods", //显示表格名称。遵照css选择器书写
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
			var colNames = ['公司名称','仓库名称','商品名称','数量','单价','总金额','日结日期','id','集团id','公司id','仓库id','商品id','新增人id','修改人id'];
			var JqGridColModel=[
								{name:'companyName',index:'companyName',sortable:false},
								{name:'storageName',index:'storageName',sortable:false},
								{name:'goodsName',index:'goodsName',sortable:false},
								{name:'stockNumber',index:'stockNumber',sortable:false},
								{name:'unitPrice',index:'unitPrice',sortable:false},
								{name:'amount',index:'amount',sortable:false},
								{name:'dailyDate',index:'dailyDate',sortable:false},
								{name:'id',index:'id',align:'center', hidden:true ,sortable:false},
								{name:'groupId',index:'groupId',align:'center', hidden:true ,sortable:false},
								{name:'companyId',index:'companyId',align:'center', hidden:true ,sortable:false},
								{name:'storageId',index:'storageId',align:'center', hidden:true ,sortable:false},
								{name:'goodsId',index:'goodsId',align:'center', hidden:true ,sortable:false},
								{name:'createUid',index:'createUid',align:'center', hidden:true ,sortable:false},
								{name:'updateUid',index:'updateUid',align:'center', hidden:true ,sortable:false}
			                ];
			loadtable();
		//加载表格
		
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"POST",
						datatype: "json",
						jsonReader  : {	
							root:"data.rows",
							page: "data.page",
					        total: "data.total",
					        records: "data.records",
							repeatitems: false
								},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: 20,
			            rowList: [2,20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            width: "100%" ,
			            postData:querystockNumHis(),
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
}
			

