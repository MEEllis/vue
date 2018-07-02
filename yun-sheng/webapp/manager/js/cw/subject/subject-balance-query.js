var setting = {
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		onClick: zTreeOnClick
	}
};

$(function(){
	
	//初始化对象
	voucherManage = new VoucherManage(basePath);
	subjectBalanaceQuery = new SubjectBalanaceQuery(basePath);
	subjectPage = new SubjectPage(basePath);
	findFAccInit();
	searchTreeData();//查询 树
	$(".subspanA").click(function(){
		treeInit();
	});
//	initDataGrid();
});

//查询条件 树
function searchTreeData(){
	//树设置参数
	var setting = {  
		    data: {//数据属性设置
		        simpleData: {enable: true,idKey: "id",pIdKey: "pid",layerrCode:"layerrCode",rootPId: null}
	        },
	        async: {//从后台获取数据
	            enable: true,
	    		dataType: "json",
	    		url:'',
	            autoParam:[],
	            dataFilter: null
	        },
	        callback:{
	        	onClick: function (event, treeId, treeNode, msg) {
	        	    //zTreeClick(treeId,treeNode);
			   },
	        },
			view: {//样式设置
				showIcon: false
			}
	    }; 
	
	$.fn.zTree.init($("#searchTreeData"), setting);
	var zTree = $.fn.zTree.getZTreeObj("searchTreeData");
    zTree.expandAll(true);  
}

/*点击事件*/
function zTreeOnClick(event, treeId, treeNode) {
    //alert(treeNode.tId + ", " + treeNode.name);
    showRightPage(treeNode.id,treeNode.name);
};

function showRightPage(id,name){
	$("#companySubjectTable").html("");
	subjectPage.findFcompanyChildrens(id, function(data){
		var dataList = data.data.rows;
		for(var i = 0;i<dataList.length;i++){
			var obj = dataList[i];
			var directionStr = "";
			directionStr = obj.creditDirection==0?"贷方":"借方"; 
			checkHtml = '<tr class="updateRow"><td>'+i+1+'</td>'+
											  '<td>'+obj.subjectLevel+'</td>'+
											  '<th>'+obj.subjectCode+'</th>'+
											  '<td>'+obj.subjectName+'</td>'+
											  '<td>'+obj.subjectClssifyName+'</td>'+
											  '<td>'+directionStr+'</td>';
			$("#companySubjectTable").append(checkHtml);
		}
		$(".updateRow").dblclick(function(){
			currRow = $(this);
			pitchOnTr();
		});
	});
}

///******************************选中一行*****************************/
//var currRow = null;
//function pitchOnTr(){
//	currRow = $(currRow).children("th").html();
//	$("#subjectType").val(currRow);
//}
//
/*******************************会计期间****************************/
function findFAccInit(){
	$("#yearAndMonBegin").html("");
	$("#yearAndMonEnd").html("");
	var myDate = new Date();
	var dateStr = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
	dateStr += '.'+(myDate.getMonth()+1); //获取当前月份(0-11,0代表1月)
	voucherManage.findFAcc(12, function(data){
		var dataList = data.data.rows;
		for(var i = 0;i < dataList.length;i++){	
			var obj = dataList[i];
			var dateStr2 = obj.currentAccountingYear+'.'+obj.currentAccountingMonth;
			var checkHtml='<option value='+obj.currentAccountingYear+'.'+obj.currentAccountingMonth+'>'+obj.currentAccountingYear+'.'+obj.currentAccountingMonth+'</option>';
			$("#yearAndMonBegin").append(checkHtml);
			$("#yearAndMonEnd").append(checkHtml);
			if(dateStr2 == dateStr){
				$("#yearAndMonBegin option").attr('selected',true);
			}
			if(dateStr2 == dateStr){
				$("#yearAndMonEnd option").attr('selected',true);
			}
		}
		twoGroupHeaders();
	});
}

/*******************************删除键*******************************/
function delWholeInput(obj) {
    evt = event || window.event;
    if (evt.keyCode.toString() == "8" || evt.keyCode.toString() == "46" ){
        $("#"+obj.id).val("");       
    }
}

/*******************************初始化树****************************/
function treeInit(){
	subjectPage.findView(12, 2016, function(data){
		//初始化节点json zNodes
		zNodes = data.data.rows;
		//初始化树
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		
	});
}

/**
 * @author XiangRui
 * @note 打开科目参照对话框
 * @return
 */
var callBack ;
function selectReferenceOpen(name){
	$('#subjectReferenceModal').modal('show');
	callBack = function(){
		var subject = arguments[0][0];
		$("#"+name).val(subject.subjectCode);
		if(name == 'minSubjectCode'){
			$("#minSubjectId").val(subject.id);
		}else{
			$("#maxSubjectId").val(subject.id);
		}
		$('#subjectReferenceModal').modal('hide');
	}; 
}

/********************************分页查询***************************************/
function queryPage(){
	$("#jqGrid_subjectBal").jqGrid("setGridParam", { postData: accountSelect(),page:1}).trigger("reloadGrid");
}

/*****************************获取查询条件**************************/
function accountSelect(){
	var paras = new Object();
	$("#yearAndMon").html($("#yearAndMonBegin").val()+"-"+$("#yearAndMonEnd").val());
	paras.minYear = $("#yearAndMonBegin").val().split(".")[0];
	paras.maxYear = $("#yearAndMonEnd").val().split(".")[0];
	paras.minMonth = $("#yearAndMonBegin").val().split(".")[1];
	paras.maxMonth = $("#yearAndMonEnd").val().split(".")[1];
	if($("#minSubjectCode").val() == null || $("#minSubjectCode").val().trim() == ""){
		$("#minSubjectId").val("");
		paras.minSubjectId = $("#minSubjectId").val();
	}else{
		paras.minSubjectId = $("#minSubjectId").val();
	}
	
	if($("#maxSubjectCode").val() == null || $("#maxSubjectCode").val().trim() == ""){
		$("#maxSubjectId").val("");
		paras.maxSubjectId = $("#maxSubjectId").val();
	}else{
		paras.maxSubjectId = $("#maxSubjectId").val();
	}
	
	paras.minSubjectLevel = $("#minSubjectLevel").val();
	paras.maxSubjectLevel = $("#maxSubjectLevel").val();
	paras.ifEndSubject = true;
	if($(".uncheckA").is(":disabled")){
		paras.minSubjectLevel = null;
		paras.maxSubjectLevel = null;
	}else{
		paras.ifEndSubject = false;
	}
	paras.ofR = $("#ofR").is(":checked") ? true:false;
	console.log(paras);
	if(paras.minYear != paras.maxYear){
		alert('不能跨年!');
	}else{
		return paras;
	}
}

/********************************web前端js**************************************/

    //twoGroupHeaders();//页面加载默认二级表头
    //二级表头
    function twoGroupHeaders(){
    	$.jgrid.gridUnload("jqGrid_subjectBal");
		$.jgrid.defaults.width = 1280;
  		$.jgrid.defaults.responsive = true;
  		$.jgrid.defaults.styleUI = 'Bootstrap';	
    	  		
    	jQuery("#jqGrid_subjectBal").jqGrid({
    		url: basePath + '/cw/accountsQuery/accountList/'+initCompanyId+'/'+initGroupId,
            datatype : "json",
            height: $(window).height()*0.615,
		    colNames:['序号','科目类别', '科目编码', '科目名称','借方','贷方','借方','贷方','借方','贷方'],
		    colModel : [ 
		              	 {name : 'index',						index : 'index',						align:'center',sorttype:"int",	 					sortable: false},
	                     {name : 'subjectClssifyName',			index : 'subjectClssifyName',			align:'center',sorttype:'string',formatter:'string',sortable: false}, 
	                     {name : 'subjectCode',					index : 'subjectCode',					align:'center',										sortable: false}, 
	                     {name : 'subjectName',					index : 'subjectName',					align:'center',										sortable: false},  
	                     {name : 'periodBalanceBorrow',			index : 'periodBalanceBorrow',			align:'center',sorttype:'number',formatter:'number',sortable: false}, 
	                     {name : 'periodBalanceLoan',			index : 'periodBalanceLoan',			align:'center',sorttype:'number',formatter:'number',sortable: false}, 
	                     {name : 'currentPeriodBorrowAmuontSum',index : 'currentPeriodBorrowAmuontSum',	align:'center',sorttype:'number',formatter:'number',sortable: false}, 
	                     {name : 'currentPeriodLoanAmuontSum',	index : 'currentPeriodLoanAmuontSum',	align:'center',sorttype:'number',formatter:'number',sortable: false},   //,formatter:formatterCreditDirection
	                     {name : 'periodEndAmuontBorrow',		index : 'periodEndAmuontBorrow',		align:'center',sorttype:'number',formatter:'number',sortable: false},
	                     {name : 'periodEndAmuontLoan',			index : 'periodEndAmuontLoan',			align:'center',sorttype:'number',formatter:'number',sortable: false}
	                   ],
             shrinkToFit:true,
             pager: "#gridpager",
             jsonReader: {
                 root: "rows",
                 page: "page",
                 total: "total",
                 records: "records",
                 repeatitems: false
             },
             mtype: "POST",
             viewrecords: true,
             autowidth : true,
             multiselect : false,
             multiboxonly : true,
             forceFit:true,
             postData:accountSelect(),
             width:$(window).width()*0.9,
             footerrow:true,  //设置表格显示表脚
    		 userDataOnFooter:true,//设置userData 显示在footer里
             onCellSelect:function(rowid,iCol,cellcontent){
            	 if(iCol=="2"){
            		 var rowData = $('#jqGrid_subjectBal').jqGrid('getRowData',rowid);//获取该行数据  对象
            		 window.open('subjectBalDetail.html?subCode='+rowData.subCode);
            	 }
             },
             loadComplete:function(data){
            	$(".jqGrid_subjectBalghead_0").hide();
    			footerData();
    			}
    	});
    	   /*$("#jqGrid_subjectBal").dialog({  
		        autoOpen: false,      
		        modal: true,    // 设置对话框为模态（modal）对话框  
		        resizable: true,      
		        width: 480,  
		        buttons: {  // 为对话框添加按钮  
		            "取消": "",  
		            "添加": "",  
		            "保存": "",  
		            "删除": ""  
		        }  
		    }); */
    	//jQuery('#jqGrid_subjectBal').trigger('reloadGrid');
    	jQuery("#jqGrid_subjectBal").jqGrid('setGroupHeaders', {
			    useColSpanStyle: true, 
			    groupHeaders:[
			    	{startColumnName: 'periodBalanceBorrow', numberOfColumns: 2, titleText: '<em>初期余额</em>'},
			    	{startColumnName: 'currentPeriodBorrowAmuontSum', numberOfColumns: 2, titleText: '<em>本期发生</em>'},
			    	{startColumnName: 'periodEndAmuontBorrow', numberOfColumns: 2, titleText: '<em>末期余额</em>'}
			    ]  
			  });
    }
    //threeGroupHeaders();
    //三级表头
    function threeGroupHeaders(){
    	$.jgrid.gridUnload("jqGrid_subjectBal");
		$.jgrid.defaults.width = 1280;
	  		$.jgrid.defaults.responsive = true;
	  		$.jgrid.defaults.styleUI = 'Bootstrap';	
      	  		
      	jQuery("#jqGrid_subjectBal").jqGrid({
      		url: basePath + '/cw/accountsQuery/accountList/'+initCompanyId+'/'+initGroupId,
            datatype : "json",
            height: $(window).height()*0.58,
    		colNames:['序号','科目类别', '科目编码', '科目名称','数量','金额','数量','金额','数量','金额','数量','金额','数量','金额','数量','金额'],
    		colModel : [ 
    		            {name : 'index',						index : 'index',						align:'center',sorttype:"int",	 sortable: false},
                        {name : 'subjectClssifyName',			index : 'subjectClssifyName',			align:'center',sorttype:"string",sortable: false}, 
                        {name : 'subjectCode',					index : 'subjectCode',					align:'center',sortable: false}, 
                        {name : 'subjectName',					index : 'subjectName',					align:'center',sortable: false},  
                        {name : 'periodBalanceBorrowNum',		index : 'periodBalanceBorrowNum',		align:'center',sortable: false},
                        {name : 'periodBalanceBorrow',			index : 'periodBalanceBorrow',			align:'center',sortable: false}, 
                        {name : 'periodBalanceLoanNum',			index : 'periodBalanceLoanNum',			align:'center',sortable: false}, 
                        {name : 'periodBalanceLoan',			index : 'periodBalanceLoan',			align:'center',sortable: false}, 
                        {name : 'currentPeriodBorrowNumSum',	index : 'currentPeriodBorrowNumSum',	align:'center',sortable: false}, 
                        {name : 'currentPeriodBorrowAmuontSum',	index : 'currentPeriodBorrowAmuontSum',	align:'center',sortable: false}, 
                        {name : 'currentPeriodLoanNumSum',		index : 'currentPeriodLoanNumSum',		align:'center',sortable: false}, 
                        {name : 'currentPeriodLoanAmuontSum',	index : 'currentPeriodLoanAmuontSum',	align:'center',sortable: false},   //,formatter:formatterCreditDirection
                        {name : 'periodEndAmuontBorrowNum',		index : 'periodEndAmuontBorrowNum',		align:'center',sortable: false},
                        {name : 'periodEndAmuontBorrow',		index : 'periodEndAmuontBorrow',		align:'center',sortable: false},
                        {name : 'periodEndAmuontLoanNum',		index : 'periodEndAmuontLoanNum',		align:'center',sortable: false},
                        {name : 'periodEndAmuontLoan',			index : 'periodEndAmuontLoan',			align:'center',sortable: false}
                      ],
           shrinkToFit:true,
           pager: "#gridpager",
           jsonReader: {
               root: "rows",
               page: "page",
               total: "total",
               records: "records",
               repeatitems: false
           },
           mtype: "POST",
           viewrecords: true,
           autowidth : true,
           multiselect : false,
           multiboxonly : true,
           forceFit:true,
           postData:accountSelect(),
           width:$(window).width()*0.9,
           footerrow:true,  //设置表格显示表脚
  		 		userDataOnFooter:true,//设置userData 显示在footer里
           onCellSelect:function(rowid,iCol,cellcontent){
          	 if(iCol=="2"){
          		 var rowData = $('#jqGrid_subjectBal').jqGrid('getRowData',rowid);//获取该行数据  对象
          		 window.open('subjectBalDetail.html?subCode='+rowData.subCode);
          	 }
           },
           /*gridComplete: function() {
				var ids=$('#jqGrid_subjectBal').jqGrid("getDataIDs");
				$.each(ids,function(i,item){
					var rowdata=$('#jqGrid_subjectBal').jqGrid('getRowData',item);
					if(rowdata.money1.indexOf("-") >= 0){
						$('#jqGrid_subjectBal').jqGrid('setCell',item,"money2",rowdata.money1*(-1));
						$('#jqGrid_subjectBal').jqGrid('setCell',item,"money1",' ');
						$('#jqGrid_subjectBal').jqGrid('setCell',item,'num2',rowdata.num1);
						$('#jqGrid_subjectBal').jqGrid('setCell',item,"num1",' ');
					}else{
						$('#jqGrid_subjectBal').jqGrid('setCell',item,'num2',' ');
						$('#jqGrid_subjectBal').jqGrid('setCell',item,"money2",' ');
					}
				});	
			},*/
           loadComplete:function(data){
          	$(".jqGrid_subjectBalghead_0").hide();
  			footerData();
  			}
    	});
    	//jQuery('#jqGrid_subjectBal').trigger('reloadGrid');
      	//jQuery("#jqGrid_subjectBal").jqGrid('setGridParam',{colModel:}).trigger('reloadGrid');
    	//设置二级表头
    	jQuery("#jqGrid_subjectBal").jqGrid('setGroupHeaders', {
			    useColSpanStyle: true, 
			    groupHeaders:[
			    	{startColumnName: 'periodBalanceBorrowNum', numberOfColumns: 2, titleText: '<em>借方</em>'},
			    	{startColumnName: 'periodBalanceLoanNum', numberOfColumns: 2, titleText: '<em>贷方</em>'},
			    	{startColumnName: 'currentPeriodBorrowNumSum', numberOfColumns: 2, titleText: '<em>借方</em>'},
			    	{startColumnName: 'currentPeriodLoanNumSum', numberOfColumns: 2, titleText: '<em>贷方</em>'},
			    	{startColumnName: 'periodEndAmuontBorrowNum', numberOfColumns: 2, titleText: '<em>借方</em>'},
			    	{startColumnName: 'periodEndAmuontLoanNum', numberOfColumns: 2, titleText: '<em>贷方</em>'}
			    ]  
			  });
			  //设置三级表头
				jQuery("#jqGrid_subjectBal").jqGrid("setComplexGroupHeaders",{
					  complexGroupHeaders:[
					     {startColumnName:'periodBalanceBorrow',numberOfColumns:4,titleText:'初期余额'},
					     {startColumnName:'currentPeriodBorrowAmuontSum',numberOfColumns:4,titleText:'本期发生'},
					     {startColumnName:'periodEndAmuontBorrow',numberOfColumns:4,titleText:'末期余额'}
					  ]	
				});
    }
	//改变表格样式
	document.querySelector('.cla-one').onclick = function(){
		twoGroupHeaders();
	}
	document.querySelector('.cla-two').onclick = function(){
		threeGroupHeaders();
	}
	
	/**
	 * 修改表格底部
	 */
	function footerData(){			
		var sum_jie1 = $('#jqGrid_subjectBal').getCol('periodBalanceBorrow',false,'sum');
		var sum_dai1 = $('#jqGrid_subjectBal').getCol('periodBalanceLoan',false,'sum');
		var sum_jie2 = $('#jqGrid_subjectBal').getCol('currentPeriodBorrowAmuontSum',false,'sum');
		var sum_dai2 = $('#jqGrid_subjectBal').getCol('currentPeriodLoanAmuontSum',false,'sum');
		var sum_jie3 = $('#jqGrid_subjectBal').getCol('periodEndAmuontBorrow',false,'sum');
		var sum_dai3 = $('#jqGrid_subjectBal').getCol('periodEndAmuontLoan',false,'sum');
		$('#jqGrid_subjectBal').jqGrid('footerData','set',{
			"subjectName":"合计",
            "periodBalanceBorrow": sum_jie1,
            "periodBalanceLoan": sum_dai1,
            "currentPeriodBorrowAmuontSum": sum_jie2,
            "currentPeriodLoanAmuontSum": sum_dai2,
            "periodEndAmuontBorrow": sum_jie3,
            "periodEndAmuontLoan": sum_dai3,
	         }
		);
	}

		
