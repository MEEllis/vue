//初始化
$(function(){
	initModalsEmployee(); //操作员初始化
	initCompanyTree();//公司树
	initGrid();//初始化表格
	initBindEvent();

})

//组织机构
function initCompanyTree() {
	$('#OrganizationInput').combobox({
		url: '/manager/component/company/getGroupCompanyTreeNodeVoList',
		placeholder:'请选择组织机构'
	})
}

//载入 经手人
function  initModalsEmployee() {
	$("#managerUname").comModalsEmployee({
		multiselect: true,
		name: '操作员',
		girdUrl: '/manager/component/employee/getGroupEmployeeVoPageList',
		clickback:function () {
			var obj= $("input[name='managerUname']");
			//设置编辑器值
			$("input[name='managersUid']").val(obj.data('id'));
		}
	});
}


//绑定事件
function initBindEvent() {
	//查询事件
	$('#search').click(function () {
		var noneDataEle = $('.notFounImgBox'); //空数据容器
		var rpContainer = $('#rpContainer'); //表格容器
		var loadingImgBox = $('.loadingImgBox'); //加载容器
		var promptBox = $('#promptBox'); //输入条件后,点击查询吧! 容器
		noneDataEle.hide();
		rpContainer.show();
		promptBox.hide();
		loadingImgBox.show();
		jQuery("#rpGrid").jqGrid("clearGridData");

		$('#allNum').text(0);
		$('#currentNum').text(0);

		$("#rpGrid").jqGrid('setGridParam',{
			datatype:'json',
			postData:getSearchParams()
		}).trigger("reloadGrid");
	});

	//重置
	$("#resetForm").click(function () {
		location.reload();
	});

}


//获取参数
function getSearchParams() {
	var companyIds = $('#OrganizationInput').data('id');
	var employeeIds = $("input[name='managersUid']").val();
	var status =  $("#status ").val(); //在线状态

	return {
		rows:100,
		page:1,
		companyIds: companyIds,
		employeeIds: employeeIds,
		status: status
	};
}


//初始化表格
function initGrid(){
	$('#rpContainer').show();

	//当前状态(0:在线;1:离线)
	function formatterStatus(cellvalue, options, rowObject){
		if(cellvalue == 0){
			return '<span style="cursor:pointer;color:blue;">强制退出</span>';
		}else if(cellvalue == 1){
			return "";
		}
	}

	$("#rpGrid").jqGrid({
		url: basePath + '/inventory/groupadmin/employeeLoginStatus/getEmployeeLoginStatusList',
		datatype : "json",
		colNames : [ '操作','操作员编码','操作员姓名','状态','当前状态','所属公司',
			'所属部门','联系方式','最近登录时间','最后退出时间', '购买用户数', '当前在线人数', '操作员ID'],
		colModel : [
			{name : 'status', index: 'status', align:'center', width: 80, sortable: false, formatter:formatterStatus},
			{name : 'employeeCode', index: 'employeeCode', align:'left', width: 100, sortable: false},
			{name : 'employeeName', index: 'employeeName', align:'left', width: 100, sortable: false},
			{name : 'status', index: 'status', align:'left', hidden: true, sortable: false},
			{name : 'statusName', index: 'statusName', align:'center', width: 60, sortable: false},
			{name : 'companyName', index: 'companyName', align: 'left', width: 200, sortable: false},
			{name : 'sectionName', index: 'sectionName', align: 'left', width: 200, sortable: false},
			{name : 'telephone', index: 'telephone', align: 'left', width: 120, sortable: false},
			{name : 'loginTime', index: 'loginTime', align: 'left', width: 160, sortable: false},
			{name : 'logoutTime', index: 'logoutTime', align: 'left', width: 160, sortable: false},
			{name : 'purchaseEmployeeNum', index: 'purchaseEmployeeNum', align: 'center', hidden: true, sortable: false},
			{name : 'concurrentEmployeeNum', index: 'concurrentEmployeeNum', align: 'left', hidden: true, sortable: false},
			{name : 'employeeId', index: 'employeeId', align: 'left', hidden : true, sortable: false}
		],
		styleUI: 'Bootstrap',
		pager: '#rpGridPager',
		jsonReader: { root: "data.dataList", total: "data.total", page: "data.page", records: "data.records",repeatitems: false},
		mtype: "POST",
		viewrecords : true,
		multiselect : true,
		multiboxonly : true,
		rownumbers:true,
		caption : "",
		rowNum : 10,
		rowList : [ 100, 200, 500 ],
		autowidth: true,
		onCellSelect: function (rowid, iCol) {
			var data = $('#rpGrid').getRowData(rowid);
			if (iCol == 2 && data.status == 0) {
				$.zxsaas_plus.showconfirm('提示', "确定将 "+ data.employeeName +" 强制退出系统吗？", function () {
					parent.websocket.send("force_kickOut;"+data.employeeId);
					$("#rpGrid").jqGrid('setGridParam',{
						datatype:'json',
						postData:getSearchParams()
					}).trigger("reloadGrid");
				});
			}
		},
		postData:getSearchParams(),
		gridComplete:function(){
			wResize();
		},
		loadComplete:function(data){
			wResize();
			if (data.result == 1) {
				if (data.data.dataList.length == 0) {
					$('#rpContainer').hide()
					$('.loadingImgBox').hide()
					$('.notFounImgBox').show()

				} else {
					$('.loadingImgBox').hide()
					$('.notFounImgBox').hide()
					$('#rpContainer').show()
				}

				if (data.data.employeeLoginNum) {
					$('#allNum').text(data.data.employeeLoginNum.purchaseEmployeeNum);
					$('#currentNum').text(data.data.employeeLoginNum.concurrentEmployeeNum);
				}

				//分页滚动条 置顶
				$("#rpGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;
			} else {
				$.zxsaas_plus.showalert("提示", data.desc);
				$('#rpContainer').hide()
				$('.loadingImgBox').hide()
				$('.notFounImgBox').show()
			}

		}
	});
}


//窗口大小改变
function wResize(){
	var height = $(window).height() - $("#searchQuery").height()
		- $("#rpContainerTop").outerHeight()
		- $("#rpGridPager").outerHeight()
		- $(".ui-jqgrid-htable[aria-labelledby='gbox_rpGrid']").outerHeight()
		- $(".ui-jqgrid-sdiv").outerHeight()
		- ($(".fiter-wrap").is(':hidden') ? 0 : $(".fiter-wrap").outerHeight())
		- 15
	;
	var width=$('#rpContainer').width()-5;
	$("#rpGrid").setGridWidth(width)
	$("#rpGrid").setGridHeight(height);
}
