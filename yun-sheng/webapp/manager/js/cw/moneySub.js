
/*现金流量.js*/
$(function(){
	sectionModal();
	subModal();
});
var lastcell="",lastrow="";

/*主页科目树*/
function sectionModal(){
	var setting = {  
        data: {
			simpleData: {enable: true,idKey: "id",pIdKey: "pId",rootPId: null}
		},
		callback: {
			onCheck:zTreeOnCheck
		},
		view: {
			showIcon: false
		}
    }; 
	function zTreeOnCheck(event, treeId, treeNode) {
		 $.ajax({
	    	url:'' + treeNode.id,
	    	type:'GET',
	    	dataType:'JSON',
	    	contentType:'application/json;charset=utf-8',
	    	async:false,
	    	success:function(data){
	    		$('#jqGrid_subject').jqGrid('clearGridData');
//	    		for(var i = 0,len = data.data.contactsunitList.length;i<len;i ++){
//	    			$('#jqGrid_subject').jqGrid('addRowData',i,data.data.contactsunitList[i],'last');
//	    		}
		    }
	    });
	}; 
	 $.ajax({
            type: 'Get',
            url: '../../json/cw/accountSub.json',
            dataType: "json",
            success: function (data) {
                $.fn.zTree.init($('#subjectTree'), setting, data);
                var zTree = $.fn.zTree.getZTreeObj('subjectTree');
                zTree.expandAll(true);//展开全部节点
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
        });
};

/*主表*/
function subModal(){
	var options = {
		LoadBtnUrl: "../../json/button.json", 
		LoadTableUrl: '../../json/cw/startBalance.json',
		TableName: '#jqGrid_subject',
		pager:'#jqGridPager_subject'
	};
		
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
	var colNames = ['ID','现金流量项','现金流量项','所属类别','方向','对应借方科目','对应贷方科目'];
	var JqGridColModel=[
						{name:'id',index:'id', width:100,align:'center', sorttype:'string',hidden:true},
						{name:'code',index:'code', width:200,align:'center', sorttype:'string',sortable:false},
						{name:'name',index:'name', width:200,align:'center', sorttype:'string',sortable:false},
						{name:'levev',index:'levev', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'clazz',index:'clazz', width:100,align:'center', sorttype:'string',sortable:false},
						{name:'jk',index:'jk', width:200,align:'center', sorttype:'string',editable:true,edittype:'custom',sortable:false,editoptions:{
								custom_element:function(value,options){
								 var html='<input type="text" readonly="readonly" class="form-control unitInput" style="border:0;text-align:center;width:96%;" value="' + value +'" /><span style="float:right;margin-top:-27px;margin-right:20px;" class="glyphicon glyphicon-plus" onclick="subChooseModal(this,1);" data-toggle="modal" data-target="" data-rId="' + options.rowId +'"></span>';
								 return $(html);
							},
								custom_value:function(value){
									return value.val();
								}
						}},
						{name:'dk',index:'dk', width:200,align:'center', sorttype:'string',editable:true,edittype:'custom',sortable:false,editoptions:{
								custom_element:function(value,options){
								 var html='<input type="text" readonly="readonly" class="form-control unitInput" style="border:0;text-align:center;width:96%;" value="' + value +'" /><span style="float:right;margin-top:-27px;margin-right:20px;" class="glyphicon glyphicon-plus" onclick="subChooseModal(this,2);" data-toggle="modal" data-target="" data-rId="' + options.rowId +'"></span>';
								 return $(html);
							},
								custom_value:function(value){
									return value.val();
								}
						}}
	                ];
		
	$(options.TableName).jqGrid({
		url:options.LoadTableUrl,
		mtype:"GET",
		datatype: "json",
		jsonReader  : {	
				root: "rows",
				repeatitems: false,
				page:'data.page',
				total:'data.pageCount',
				records:'data.totalCount'
					},
		colNames:colNames,          
        colModel:JqGridColModel,
        sortable:false,			            
        rownumbers:true,
        cellsubmit: 'clientArray',//单元格保存内容的位置		
        editurl: 'clientArray',
        cellEdit:true,
        rowNum: 50,
        rowList: [50, 100, 200],
//      pager:options.pager,
        viewrecords: true,
        width: "100%" ,
        height: $(window).height()*0.65,
		autowidth:true,
		rownumWidth: 35, 
		shrinkToFit:false,
		beforeSelectRow:function(rowid,e){
//	       	$(options.TableName).jqGrid('resetSelection');//设置单选  只能选中一行
//	       	return(true);
      	},
      	beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow;
			lastcell = iCol;
		},
		loadComplete:function(data){
			$(options.TableName).jqGrid('setLabel',0, '序号');
		}
	})
		
};

/*科目 参照*/
var lNum = '';
var flag = '';
function subChooseModal(t,str){
	$("#unitModalGrid").trigger("reloadGrid");
	$('#subSearch').val('');
	lNum = $(t).data('rid');
	flag = str;
	$('#subjectModal').modal('show');
	var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			LoadTableUrl: '../../json/cw/unit.json',
			TableName: "#unitModalGrid", 
			pager:"#unitGridpager"
			};
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var mydata;
			var hid=false;
			var lock=false;
			var myobj=[];
			var colNames = ['ID','公司ID','级次','科目编码','科目名称','科目类型','余额方向'];
			var JqGridColModel=[
								{name:'id',index:'id', width:55,align:'center', sorttype:'string',hidden:true},
								{name:'companyId',index:'companyId', width:55,align:'center', sorttype:'string',hidden:true},
								{name:'jc',index:'jc', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'name',index:'name', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'clazz',index:'clazz', width:100,align:'center', sorttype:'string',sortable:false},
								{name:'direction',index:'direction', width:100,align:'center', sorttype:'string',sortable:false}
			                ];
			
			console.log(lNum)
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
				datatype: "json",
				jsonReader  : {	
						root: "data.contactsunitList",
						repeatitems: false,
						page:'data.page',
						total:'data.pageCount',
						records:'data.totalCount'
							},
				colNames:colNames,          
	            colModel:JqGridColModel,
	            sortable:false,			            
	            rownumbers:true,
	            rowNum: 10,
	            rowList: [20, 25, 40],
	            pager:options.pager,
	            viewrecords: true,	
	            multiselect:true,
	            width: "100%" ,
	            height: $(window).height()*0.54,
				autowidth:true,
				rownumWidth: 35,
				shrinkToFit:false, 
				ondblClickRow:function(){
					var clickData = $(options.TableName).jqGrid('getRowData',arguments[0]);
					var clickId = clickData.id,
						clickName = clickData.name;
				},
				loadComplete:function(data){
					$(options.TableName).jqGrid('setLabel',0, '序号');
					
				}
			})
}

/*科目参照  保存*/
$(document).on('click','.saveSub',function(e){
	//获取选中行
	var ids = $('#unitModalGrid').jqGrid('getGridParam','selarrrow'),
		subCode = [],
		subName = [];
	$.each(ids, function() {
		var rData = $('#unitModalGrid').jqGrid('getRowData',arguments[1]);//获取每行数据
		subCode.push(rData.code);
		subName.push(rData.name);
	});
	var rName = (flag == '1') ? 'jk' : 'dk';	
	$('#jqGrid_subject').jqGrid('saveCell',lastrow,lastcell);
	$('#jqGrid_subject').jqGrid('setCell',lNum,rName,subName);
	$('#subjectModal').modal('hide');
});

/*科目参照搜索*/
$(document).on('keyup','#subSearch',function(){
	$.ajax({
		url:'' + $(this).val(),
		type:'GET',
	 	dataType:'json',
	 	contentType:'application/json;charset=utf-8',
		success:function(data){
			console.log(data);
			var sData = data.data.contactsunitList;
			$('#unitModalGrid').jqGrid('clearGridData');
			if(sData.length == 0){
				$.zxsaas_plus.showalert("错误","没有匹配的数据!")
			}else{
				for(var i = 0,len = sData.length;i<len;i ++){
					$('#unitModalGrid').jqGrid('addRowData',i,sData[i],'last');
				}
			}
		}
	});
});
