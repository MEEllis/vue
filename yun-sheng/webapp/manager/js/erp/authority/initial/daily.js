var lastrow;
var lastcell; 

$(function(){
	initialObj = new InitialObj(basePath);	
	loadmodal();
})
		
;$(function (){
  $('.multi_select').MSDL({
    'width': '180',
    'data': ['老司机1号','老司机2号','老司机3号','老司机4号','老司机5号','老司机6号','老司机7号','老司机8号','老司机9号'],
    'ids': ['001','002','003','004','005','006','007','008','009']
  });
});

$('.tab li').click(function() {
	$(this).addClass('active').siblings().removeClass('active');
	$('.showTab .change').eq($(this).index('li')).show().siblings().hide();
});

/**************************显示日结、反日结模态框*******************************/
function dailyOrUnDailyModal(){
	$('#dailyOrUnDailyModal').modal('show');
}


/******************************日结、反日结*********************************/
function dailyOrUnDaily(){
	lastrow!=undefined&&$("#jqGrid_dayMessage").jqGrid("saveCell",lastrow,lastcell);
    obj = document.getElementsByName("checkDaily");
    check_val = [];
    check_id = [];
    var selList = [];
    var status = 0;
    for(k in obj){
        if(obj[k].checked){
            check_val.push(obj[k].value);
            check_id.push($(obj[k]).data('rid'));
            var gridData = $("#jqGrid_dayMessage").jqGrid("getRowData",$(obj[k]).data('rid'));//获取被选中的一行数据
            delete gridData.checkDaily;
            delete gridData.checkUnDaily;
            selList.push(gridData);
        }
    }
    obj2 = document.getElementsByName("checkUnDaily");
    check_val2 = [];
    check_id2 = [];
    var selList2 = [];
    for(k2 in obj2){
        if(obj2[k2].checked){
            check_val2.push(obj2[k2].value);
            check_id2.push($(obj2[k2]).data('rid'));
            var gridData = $("#jqGrid_dayMessage").jqGrid("getRowData",$(obj2[k2]).data('rid'));//获取被选中的一行数据
            delete gridData.checkDaily;
            delete gridData.checkUnDaily;
            
            //没填备注就不能保存
            if(gridData.remark == null || gridData.remark.trim() == ''){
            	selList2 = [];
            	break;
            }
            selList2.push(gridData);
        }
    }
    if(check_val.length != 0){
    	status = 0;
    	initialObj.dailyOrUnDaily(selList,status,function(data){
    		var str = data.data.str.replace(/&/g,'<br/>');
    		$.zxsaas_plus.showalert("提示信息",str);
        	query();
        });
    }else if(check_val2.length != 0){
    	status = 1;
    	
    	if(selList2.length == 0){
    		$.zxsaas_plus.showalert('提示信息','反日结必须填写备注!');
    		return false;
    	}
    	initialObj.dailyOrUnDaily(selList2,status,function(data){
			var str = data.data.str.replace(/&/g,'<br/>');
			$.zxsaas_plus.showalert("提示信息",str);
    		query();
        });
    }else{
    	$.zxsaas_plus.showalert('提示信息','请选择日结或者反日结');
    	return false;
    }
    $('#dailyOrUnDailyModal').modal('hide');
}

/*******************************条件查询***********************************/
function query(){
	var param = new Object();
	$("#jqGrid_blocMessage").jqGrid('setGridParam',{ 
        url:basePath + "/jxc/authority/tdaily/findTdaily",
        postData:param, //发送数据 
        page:1 
    }).trigger("reloadGrid"); //重新载入 
	
	$("#jqGrid_dayMessage").jqGrid('setGridParam',{ 
        url:basePath + "/jxc/authority/tdaily/dailyOrUnDaily",
        postData:param, //发送数据 
        page:1 
    }).trigger("reloadGrid"); //重新载入 
}

function loadmodal(){
	var options = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	LoadTableUrl: basePath + '/jxc/authority/tdaily/findTdaily',
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
	
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';	
		var lastsel='';//最后一次选中的行
		var colNames = ['部门名称','日结日期','操作人','操作时间','id','集团id','公司id','部门id','操作人id','操作标识代码','备注'];
		var JqGridColModel=[
							{name:'depName',index:'depName',align:'left',sortable:false},
							{name:'dailyDateString',index:'dailyDateString',align:'center',sortable:false},
							{name:'dailyName',index:'dailyName',align:'center',sortable:false},
							{name:'dailyTimeString',index:'dailyTimeString',align:'center',sortable:false},
			                {name:'id',index:'id', align:'center',hidden:true,sortable:false},
			                {name:'groupId',index:'groupId', align:'center',hidden:true,sortable:false},
			                {name:'companyId',index:'companyId', align:'center',hidden:true,sortable:false},
			                {name:'sectionId',index:'sectionId', align:'center',hidden:true,sortable:false},
			                {name:'dailyPersonId',index:'dailyPersonId', align:'center',hidden:true,sortable:false},
			                {name:'operatorCode',index:'operatorCode', align:'center',hidden:true,sortable:false},
			                {name:'remark',index:'remark', align:'center',hidden:true,sortable:false}
		                ];
		
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
		            
		            sortable:false,			            
		            rowNum: 20,
		            rowList: [20, 25, 40],
		            pager:options.pager,
		            viewrecords: true,		           
		            width: "100%" ,
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
		
		$(document).on('click','.day',function(e){
			loadmodal_day();
			jQuery("#jqGrid_dayMessage").jqGrid('destroyGroupHeader');
			jQuery("#jqGrid_dayMessage").jqGrid('setGroupHeaders', {
		        useColSpanStyle: true,
		        groupHeaders: [
		          { startColumnName: 'checkDaily', numberOfColumns:1, titleText: '<input type="checkbox"  class="checkDaily_CK">' },
		          { startColumnName: 'checkUnDaily', numberOfColumns:1, titleText: '<input type="checkbox"     class="checkUnDaily_CK">' }
		         
		        ]
		   });
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
	
var rjall=false;
		
	/**
	 * 日结/反日结
	 */
function loadmodal_day(){
	var options = {
	LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
	LoadTableUrl: basePath + '/jxc/authority/tdaily/dailyOrUnDaily',
	GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
	DelRowUrl: "", // 删除信息接口地址
	isSub:"",//是否有子级表格
	subLoadTableUrl:"",//子级表格数据来源地址
	TableName: "#jqGrid_dayMessage", //显示表格名称。遵照css选择器书写
	iconJsonUrl:"../json/icon.json",
	btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
	pager:"#jqGridPager_dayMessage"
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
		var colNames = ['部门名称','上次日结日期','本次日结日期','日结','反日结','备注','ID','集团','公司','部门','新增人','新增时间','启用日期','是否日结标识'];
		var JqGridColModel=[
							{name:'depName',index:'depName', width:200,sorttype:"string",sortable:false},
							{name:'dailyDateString',index:'dailyDateString',align:'center', width:100,sortable:false},
							{name:'theDailyString',index:'theDailyString', width:100,align:'center', sorttype:'date',formatter:getNextDay,sortable:false},
							{name:'checkDaily',index:'checkDaily', width:100,align:'center',formatter:checkBox,sortable:false},
							{name:'checkUnDaily',index:'checkUnDaily', width:100,align:'center',formatter:checkBoxNo,sortable:false},
							{name:'remark',index:'remark', width:100,align:'center', sorttype:"string",hidden:false,editoptions:{
								dataEvents:[{
									type:"blur",
									fn:function(e){
										if($(this).val().length > 100){
											$.zxsaas_plus.showalert("提示","内容应在100字以内");
											$(this).val($(this).val().substring(0,100));
										}
									}
								}]
							},editable:false,sortable:false},
			                {name:'id',index:'id', align:'center',hidden:true,sortable:false},
			                {name:'groupId',index:'groupId', align:'center',hidden:true,sortable:false},
			                {name:'companyId',index:'companyId', align:'center',hidden:true,sortable:false},
			                {name:'sectionId',index:'sectionId', align:'center',hidden:true,sortable:false},
			                {name:'createUid',index:'createUid', align:'center',hidden:true,sortable:false},
			                {name:'createTimeString',index:'createTimeString', align:'center',hidden:true,sortable:false},
			                {name:'initDateString',index:'initDateString',hidden:true},
			                {name:'dailyStatus',index:'dailyStatus',hidden:true}
		                ];
		
		loadtable();
	//加载表格
		function loadtable(){
				$(options.TableName).jqGrid({
					url:options.LoadTableUrl,
					mtype:"GET",
					datatype: "json",
					jsonReader  : {	
							id: "Id", //相当于设置主键
							root: "rows",
							repeatitems: false
								},
					colNames:colNames,          
		            colModel:JqGridColModel,
		            sortable:true,			            
		            rowNum: 20,
		            rowList: [20, 25, 40],
		            pager:options.pager,
		            viewrecords: true,		           
		           	cellEdit:true,
		           	editurl: 'clientArray',
					cellsubmit: 'clientArray',//单元格保存内容的位置
		            width: "100%" ,
		            height: $(window).height()*0.45,
					autowidth:true,
					rownumWidth: 35, // the width of the row numbers columns
					shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
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
					
					beforeEditCell:function(rowid,cellname,v,iRow,iCol){
						lastrow = iRow;
						lastcell = iCol;
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
						var len = data.rows.length;
					},
					loadError:function(xhr,status,error){
					}
					})
	
		}
	
		$(document).on("click",".checkDaily_CK",function(){
			 $("#jqGrid_dayMessage").jqGrid("saveCell",lastrow,lastcell);
			 $(this).prop("checked")&&$("#jqGrid_dayMessage").setColProp('remark',{editable:false}); 
			 $(this).prop("checked")&&$("input[name='checkDaily']").prop("checked",true)
			 $(this).prop("checked")&&$("input.checkUnDaily_CK").prop("checked",false);
			 $(this).prop("checked")&&$("input[name='checkUnDaily']").prop("checked",false);
			 
			 $(this).prop("checked")||$("#jqGrid_dayMessage").setColProp('remark',{editable:false}); 
			 $(this).prop("checked")||$("input[name='checkDaily']").prop("checked",false);
		});
		

		$(document).on("click",".checkUnDaily_CK",function(){
			 $("#jqGrid_dayMessage").jqGrid("saveCell",lastrow,lastcell);
			 $(this).prop("checked")&&$("#jqGrid_dayMessage").setColProp('remark',{editable:true}); 
			 $(this).prop("checked")&&$("input[name='checkUnDaily']").prop("checked",true);
			 $(this).prop("checked")&&$("input.checkDaily_CK").prop("checked",false);
			 $(this).prop("checked")&&$("input[name='checkDaily']").prop("checked",false);
			 
			 $(this).prop("checked")||$("#jqGrid_dayMessage").setColProp('remark',{editable:false}); 
			 $(this).prop("checked")||$("input[name='checkUnDaily']").prop("checked",false);
		});
	
		//本次日结时间
		function getNextDay(cellvalue, options, rowObjec){
			if(rowObjec.dailyDate != null && rowObjec.dailyDate != ''){
				var d = rowObjec.dailyDate;
		        d = new Date(d);
		        d = +d + 1000*60*60*24;
		        d = new Date(d);
		        //return d;
		        //格式化
		        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
			}else{
				if(rowObjec.initDateString == null){
					return '';
				}
				return rowObjec.initDateString;
			}
			return '';
	         
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
		
		var countCheck = 0;
		$('.notChk').each(function(){
			($(this).prop('checked') && ($(this).parent().next().html() == '&nbsp;' || $(this).parent().next().html() == '')) && (countCheck ++);
		});
		if(countCheck != 0){
			$.zxsaas_plus.showalert("错误","已勾选反日结,请填写备注!");
			return false;
		}else{
//				$.zxsaas_plus.showalert("","保存成功!");
		}
		
		//显示隐藏备注
		$(document).on('click','.notChk',fanRiJie);
		function fanRiJie(){
			 $("#jqGrid_dayMessage").jqGrid("saveCell",lastrow,lastcell);
			var count = 0;
			$(".notChk").each(function(){ 
				($(this).prop('checked')) && (count ++);
			});
			(count > 0) ? ($(options.TableName).setColProp('remark',{editable:true})) : ($(options.TableName).setColProp('remark',{editable:false})); 
			var len =$("input[name='checkUnDaily']").length || 0;
			(count ==  len) ?  $("input.checkUnDaily_CK").prop("checked",true) : $("input.checkUnDaily_CK").prop("checked",false);
			var id = $(this).data('depid');
			var flag = $(this).prop('checked');
			
			$('.chk').each(function(){
				(flag && ($(this).data('depid') == id)) && ($(this).removeAttr("checked"));
			});
			flag && $("input.checkDaily_CK").prop("checked",false);
			var gridData = $(options.TableName).jqGrid("getRowData",id);//获取被选中的一行数据
			var mark = gridData.remark;//备注单元格的值
//				if(flag && (mark == '')){
//					$.zxsaas_plus.showalert("错误","已勾选反日结,请填写备注!");
//				}
			(!flag) && ($(this).parent().next().html(''));
			
		}
		//日结
		$(document).on('click','.chk',rijie);
		function  rijie(){
			 $("#jqGrid_dayMessage").jqGrid("saveCell",lastrow,lastcell);
			var id = $(this).data('depid');
			var flag = $(this).prop('checked');
			var gridData = $(options.TableName).jqGrid("getRowData",id);//获取被选中的一行数据
			var count = 0;
			$('.notChk').each(function(){
				(flag && ($(this).data('depid') == id)) && ($(this).removeAttr("checked"));
				($(this).prop('checked') && count ++);
				if(flag && ($(this).data('depid') == id)){
					$(this).removeAttr("checked");
					$(options.TableName).jqGrid('setCell',id, 'remark', '');
				}
				(!$(this).prop('checked')) && ($(this).parent().next().html(''));
			});
			flag && $("input.checkUnDaily_CK").prop("checked",false);
			(count == 0) ? ($(options.TableName).setColProp('remark',{editable:false})) : ($(options.TableName).setColProp('remark',{editable:true})); 
		    var countCK =0;
			$(".chk").each(function(){ 
				($(this).prop('checked')) && (countCK ++);
			});
			var len =$("input[name='checkDaily']").length || 0;
			
			(countCK ==  len) ?  $("input.checkDaily_CK").prop("checked",true) : $("input.checkDaily_CK").prop("checked",false);
			
		}
		
		
		//列表    重置密码
		function rePwd(cellvalue, options, rowObjec)
		{
			return '<span class="rePwd" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
		}
		
		//日结复选框
		function checkBox(cellvalue, options, rowObjec)
		{
			var str = '';
			if(rowObjec.dailyStatus != null){
				str = '<input type="checkbox" class="del chk" data-rId="'+options.rowId+'" name="checkDaily" value="0"/>';
			}
			return str;
		}
		
		//反日结复选框
		function checkBoxNo(cellvalue, options, rowObjec)
		{
			var str = '';
			if(rowObjec.dailyDateString != null && rowObjec.dailyDateString != ''){
				str = '<input type="checkbox" class="del notChk" data-rId="'+options.rowId+'" name="checkUnDaily" value="1"/>';
			}
			return str;
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
