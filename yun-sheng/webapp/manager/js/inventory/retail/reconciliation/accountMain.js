//初始化
$(function(){
    //载入日期组件
    $('#startDate').datePlu({
        dateEnd: '#endDate',
        endDate: true,
        minTime:"1970-01-01",
        ifPermissions:false,
    });

	$('#storeInput').storePlu({
		search:false,
		checkMore:true,
		saleManId:'createByIds',
		changeStore:changeStore
		
	})

	$('#createByIds').storeSales({
		checkMore:true,
		search:false,
		sectionId:'storeInput'
	})
	
	$('#accountIds').accountPlu({
		sectionId:'#storeInput',
		checkMore:true,
		search:false
	})
	
	//核对改变
	$('#isCheck').change(function(){
		if($(this).val() != '0'){
			$('#isBalance').prop('disabled',false);
		}else{
			$('#isDeal').prop('disabled',true);
			$('#isBalance').prop('disabled',true);
		}
	})
	
	//差额改变
	$('#isBalance').change(function(){
		if($(this).val() != '0'){
			$('#isDeal').prop('disabled',false);
		}else{
			$('#isDeal').prop('disabled',true);
		}
	})
	$('#maxAmount').blur(function(){
		if($('#minAmount').val().trim() != ''){
			testAmount()	
		}
	})
	
	$('#minAmount').blur(function(){
		if($('#maxAmount').val().trim() !== ''){
			testAmount()
		}
		
	})
	
	function changeStore(){
		$('#createByIds').val('').data('employeeId','')
		$('#accountIds').val('').data('accountId','')
	}
	
	function testAmount(){
		if(accSubtr($('#maxAmount').val().trim(),$('#minAmount').val().trim())*1 >= 0){
			return true;
		}else{
			$.zxsaas_plus.showalert("提示","最大金额小于最小金额，请重新输入!");
			$('#maxAmount').val('');
			return false
		}
	}
	
	
	
	//重置
	$('.reset').click(function(){
		$('#searchQuery')[0].reset()
		$('#storeInput').data('sectionId','')
		$('#createByIds').data('employeeId','')
	})
	
	//查询
	$('#search').click(function(){
		
		$('#accountGrid').jqGrid('setGridParam', {
			url:"/manager/inventory/retail/reconciliation/accountRecon/getAccountReconPageList",
			postData:{
				page:1,
				billsBeginDateStr:$('#startDate').val(),
				billsEndDateStr:$('#endDate').val(),
				sectionIds:$('#storeInput').data('sectionId'),
				minAmount:$('#minAmount').val(),
				maxAmount:$('#maxAmount').val(),
				accountIds:$('#accountIds').data('accountId') ? $('#accountIds').data('accountId') : '',
				createByIds:$('#createByIds').data('employeeId'),
				isCheck:$('#isCheck').val(),
				isBalance:$('#isBalance').attr('disabled') == 'disabled' ? '' : $('#isBalance').val(),
				isDeal:$('#isDeal').attr('disabled') == 'disabled' ? '' : $('#isDeal').val()
			}
		}).trigger("reloadGrid");
	})
	
	//导出
	$('#export').click(function(){
		if($('input[name="sectionIds"]').length){
			$('input[name="sectionIds"]').val($('#storeInput').data('sectionId'))
		}else{
			$("#searchQuery").append('<input type="hidden" value="'+$('#storeInput').data('sectionId')+'" name="sectionIds" >')
		}
		if($('input[name="createByIds"]').length){
			$('input[name="createByIds"]').val($('#createByIds').data('employeeId'))
		}else{
			$("#searchQuery").append('<input type="hidden" value="'+$('#createByIds').data('employeeId')+'" name="createByIds" >')
		}
		if($('input[name="accountIds"]').length){
			$('input[name="accountIds"]').val($('#accountIds').data('accountId') ? $('#accountIds').data('accountId') : '')
		}else{
			$("#searchQuery").append('<input type="hidden" value="'+($('#accountIds').data('accountId') ? $('#accountIds').data('accountId') : '')+'" name="accountIds" >')
		}
		$("#searchQuery").attr("action","/manager/inventory/retail/reconciliation/accountRecon/export").submit();
		
	})
	
		//导出
	$('#exportSum').click(function(){
		if($('input[name="sectionIds"]').length){
			$('input[name="sectionIds"]').val($('#storeInput').data('sectionId'))
		}else{
			$("#searchQuery").append('<input type="hidden" value="'+$('#storeInput').data('sectionId')+'" name="sectionIds" >')
		}
		if($('input[name="createByIds"]').length){
			$('input[name="createByIds"]').val($('#createByIds').data('employeeId'))
		}else{
			$("#searchQuery").append('<input type="hidden" value="'+$('#createByIds').data('employeeId')+'" name="createByIds" >')
		}
		
		if($('input[name="sumColumns"]').length){
			$('input[name="sumColumns"]').val(sumColumnsArr.join(','))
		}else{
			$("#searchQuery").append('<input type="hidden" value="'+sumColumnsArr.join(',')+'" name="sumColumns" >')
		}
		$("#searchQuery").attr("action","/manager/inventory/retail/reconciliation/accountRecon/exportSum").submit();
		
	})
	
	//差异处理
	$('#dealDif').click(function(){
		$.ajax({
			url: '/manager/inventory/retail/reconciliation/accountRecon/deal', 
	        type: "POST",
		    traditional: true,
			datatype : "json",
			data:{
				'ids':'',
				'billsBeginDateStr':$('#startDate').val(),
				'billsEndDateStr':$('#endDate').val(),
				'sectionIds':$('#storeInput').data('sectionId')
			},
		    success: function (data) {
				
				$('#accountGrid').jqGrid('setGridParam', {
						
				}).trigger("reloadGrid");
				$.zxsaas_plus.showalert("提示",data.desc);
			},
		    error: function (msg) {
		         
		    }
		})
	})
	
	$('.checkSum').click(function(){
		$('.dealTime').text($('#startDate').val() +'  至   '+$('#endDate').val())
		$('#sumModal').modal('show');
		
		$('#sumGrid').jqGrid('setGridParam', {
				postData:{
					isCheck:$('#isCheck').val(),
					isBalance:$('#isBalance').val(),
					isDeal:$('#isDeal').val(),
					billsBeginDateStr:$('#startDate').val(),
					billsEndDateStr:$('#endDate').val(),
					sectionIds:$('#storeInput').data('sectionId'),
					minAmount:$('#minAmount').val().trim(),
					maxAmount:$('#maxAmount').val().trim(),
					accountIds:$('#accountIds').data('accountId'),
					createByIds:$('#createByIds').data('employeeId'),
					sumColumns:sumColumnsArr.join(',')
				},
		}).trigger("reloadGrid");
	})



    function my_bt_input(value, options) {
        var html =  '<input type="text" readonly="readonly" class="form-control" value="'+value+'">'+
            '<span class="glyphicon glyphicon-plus" data-toggle="modal" style="float:right;cursor: pointer;margin-top: -25px;margin-right: 7px;"'+
            ' onclick="javascript:'+options.custom_element_bt_click+'({rowId:\''+options.rowId+'\',cellInputId:\''+options.id+'\'})'+'"></span>';
        return $(html);
    }


    function my_bt_value(value) {
        return value.val();
    }

//表格初始化
$('#accountGrid').jqGrid({
	scroll: 1,
	mtype:"POST",
	datatype: "json",				
	jsonReader  : {	
			root: "data.accountList",
			total:"data.total",
			records:"data.records",
			repeatitems: false
	},
	postData:{
		isCheck:0,
		billsBeginDateStr:$('#startDate').val(),
		billsEndDateStr:$('#endDate').val(),
		sectionIds:$('#storeInput').data('sectionId'),
	},
	gridview: true,
	colNames:['id','单据日期','单据类型','单据号','门店','sectionId','营业员','资金账户','金额','已核','isCheck','实际到账','差额','差额处理方式','diffTypeNameBox','责任人','dutyId','备注','核对人'
	          ,'核对时间','制单人','制单时间','处理人','处理时间','isDeal','contactUnitId','billsStatus'],          
    colModel:[
                {name:"id",width:"150px",align:"center",sortable:false,hidden:true},  
                {name:"billsDateStr",width:"150px",align:"center",sortable:false,},  
            	{name:"billsType",width:"150px",align:"center",sortable:false},  
            	{name:"billsCode",width:"200px",align:"center",sortable:false}, // 交款人
            	{name:"sectionName",width:"150px",align:"center",sortable:false}, // 上交金额（交款金额）
            	{name:"sectionId",width:"150px",align:"center",sortable:false,hidden:true},
            	{name:"managerName",width:"150px",align:"center",sortable:false}, // 收款账户loadSelect
            	{name:"accountName",width:"150px",align:"center",sortable:false,editoptions:{}}, //实际收款
            	{name:"amount",width:"150px",align:"center",sortable:false,editoptions:{}}, 
        		{name:"isCheckBox",width:"150px",align:"center",sortable:false,editable:false,formatter:function(v,x,r){
	            				return "<input type='checkbox'  onClick='test(this,"+JSON.stringify(r)+")' "+(r.isCheck == '1' ? 'checked' :  null) +"/>"; 
	            			}
            	
        		}, 
        		{name:"isCheck",width:"150px",align:"center",sortable:false,hidden:true}, 
            	{name:"realAmount",width:"150px",align:"center",sortable:false,editoptions:{
        			onkeyup:"",
            		dataEvents:[
	            		            
	            		            {type:"blur",fn:function(){	
	            		            		if($(this).val().trim() != ''){
	            		            			checkInput.checkPositiveNativeNum(this,12)
	            		            		}

	            		            		console.log($(this).val().trim())
	            		            		var amount = $("#accountGrid").getCell(lastrowid,'amount')
	            		            		if( $(this).val().trim() != "0" && $(this).val().trim() != ""){
	            		            			$("#accountGrid").setCell(lastrowid,'diffAmount',accSubtr(amount,$(this).val().trim()))
	            		            		var inpay =	(accSubtr(amount,$(this).val().trim())*1) > 0 ? -3 : -2

                                                $('#dataGridDiffTypeName').comModalsInpayClass('setOption',{
                                                    girdParam:{
                                                        dataId:inpay
                                                    },

                                                    treeParams:{
                                                        type:inpay
                                                    },
                                                });
	            		            		}else{
	            		            			if($(this).val().trim() == "0" || $(this).val().trim() == ""){
	            		            				$('#'+lastrowid+' input').prop('checked',false)
		            		            			$("#accountGrid").setCell(lastrowid,'diffAmount',"0")
		            		            			$("#accountGrid").setCell(lastrowid,'realAmount',"0")
		            		            			$("#accountGrid").setCell(lastrowid,'diffTypeName')
	            		            			}
	            		            		}
	            		            		
	            		            		
	            		            		$("#accountGrid").saveCell(lastrow,lastcell);
	            		            		 var accountRealAmount = $('#accountGrid').getCol('realAmount', false, 'sum');
	            		                     var accountDiffAmount = $('#accountGrid').getCol('diffAmount', false, 'sum');
	            		                     var accountRealAmount = $('#accountGrid').getCol('realAmount', false, 'sum');
	            		            		 $('#accountGrid').footerData("set", {
	            		                         "realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
	            		                         "diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
	            		                         "realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
	            		                     }, false);
	            		            		 $("#accountGrid").setCell(lastrowid,'isCheck',1)
	            		            		updateAccountRecon(lastrowid)
	            		            		
				            			}
	            		            },
	            		            {type:'keydown',fn:function(e){
	            		            	 if ((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
	            		            		 $(this).blur()
	            		            	 }
	            		            }}
	            		           
	            		       ]
            	}}, 
            	{name:"diffAmount",width: 80,align: "center",sortable: false}, //是否确认
            	{name:"diffTypeName",width:"150px",align:"center",sortable:false,
                    editable: false,
                    edittype: 'custom',
                    editoptions: {
                        custom_element: my_bt_input,
                        custom_value: my_bt_value,
                        custom_element_bt_click: 'selectStorageReferenceOpen'
                    },
				},
            	{name:"diffType",width:"150px",align:"center",sortable:false,hidden:true}, 
            	{name:"dutyName",width:"150px",align:"center",sortable:false}, 
            	{name:"dutyId",width:"150px",align:"center",sortable:false,hidden:true}, 
            	{name:"remark",width:"150px",align:"center",sortable:false,editable:true,editoptions:{
            		dataEvents:[
              		          {type:"blur",fn:function(){
              		        	  $("#accountGrid").saveCell(lastrow,lastcell);
              		        	  updateAccountRecon(lastrowid)
              		          }}	       
              		]
              	}},
            	{name:"checkedByName",width:"150px",align:"center",sortable:false},
            	{name:"checkedDateStr",width:"150px",align:"center",sortable:false},
            	{name:"createByName",width:"150px",align:"center",sortable:false},
            	{name:"createDateStr",width:"150px",align:"center",sortable:false},
            	{name:"dealByName",width:"150px",align:"center",sortable:false},
            	{name:"dealDateStr",width:"150px",align:"center",sortable:false},
            	{name:"isDeal",width:"150px",align:"center",sortable:false,hidden:true},
            	{name:"contactUnitId",width:"150px",align:"center",sortable:false,hidden:true},
            	{name:"billsStatus",width:"150px",align:"center",sortable:false,hidden:true},
            ],
    sortable:false,	
    rownumbers:true,
    cellsubmit: 'clientArray',// 单元格保存内容的位置
    editurl: 'clientArray',
    rowNum:15,
    pager:'#accountGridPager',
    viewrecords: true,		           
   	cellEdit:true,
    width:'' ,
    footerrow:true,
//    multiselect:true,
//	multiboxonly:true,
//	multiselectWidth:38,
    height: $(window).height()*0.5,
	autowidth:true,
	rownumWidth: 35, // the width of the row numbers columns
	shrinkToFit:false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
	userDataOnFooter:true,// 设置userData 显示在footer里
	ondblClickRow:function(id){
	
	},
    onCellSelect:function(rowid, index, contents, event){
		lastrowid = rowid*1;
		console.log(index)
		var info = $("#accountGrid").getRowData(rowid)
		if(index == 12){
			
			var realAmount = $("#accountGrid").getCell(rowid,'realAmount')
			if(info.isDeal == '0' && info.billsStatus != '7'){
				if(realAmount == "0" || realAmount == ''){
					$("#accountGrid").setCell(rowid,'realAmount',$("#accountGrid").getCell(rowid,'amount'))
					$('#'+rowid+' input').prop('checked',true)
				}else{
					 $("#accountGrid").setColProp('realAmount',{editable:true});  
				}
			}else{
				 $("#accountGrid").setColProp('realAmount',{editable:false}); 
				return
			}
            if(diffAmount !=="0"|| diffAmount !=="0.00"){
                var diffAmount = $("#accountGrid").getCell(lastrowid,'diffAmount');
                $("#accountGrid").setColProp('diffTypeName',{editable:true});
		}
		}
		if(index == 14){
			
			var diffAmount = $("#accountGrid").getCell(lastrowid,'diffAmount');
			var realAmount = $("#accountGrid").getCell(lastrowid,'realAmount');
			if(info.isDeal == '0' && info.billsStatus != '7'){
				if(diffAmount !=="0" ){
                    $("#accountGrid").setColProp('diffTypeName',{editable:true});
                    var inpay= diffAmount*1 > 0 ? -3 : -2
                    $('#dataGridDiffTypeName').comModalsInpayClass('setOption',{
                        girdParam:{
                            dataId:inpay
                        },

                        treeParams:{
                            type:inpay
                        },
                    });
				}else{
                    $("#accountGrid").setColProp('diffTypeName',{editable:false});
					$('.diffTypeName').remove()
				}
			}else{
				return
			}
		}
		if(index == 16){	
			var diffAmount = $("#accountGrid").getCell(lastrowid,'diffAmount');
			var realAmount = $("#accountGrid").getCell(lastrowid,'realAmount');
			
			if(info.isDeal == '0' && info.billsStatus != '7'){
				if(diffAmount != "0" && diffAmount != ""){
					var sectionId = $("#accountGrid").getCell(lastrowid,'sectionId');
					getEmployeeVoList(sectionId)
				}else{
					$('.dutyName').remove()
				}
				
			}else{
				return
			}
		}
    },
	beforeEditCell:function(rowid,cellname,v,iRow,iCol){
    	lastrowid = rowid*1;
		lastrow = iRow;
		lastcell = iCol;

	},
	beforeSelectRow:function(rowid,e){
		
	},
	afterInsertRow: function (rowid, aData) { // 新增一行之后

	},
	onSelectRow:function(id,status){	
	
	},
	gridComplete: function() {
		$('table th').css('text-align','center');
	},
	loadComplete:function(data){
		console.log(data)
		
		var info = data.data.accountList
		for(var i=0;i<info.length;i++){
			if(info[i].isDeal == '1' || info[i].billsStatus == '7'){
				$('#'+info[i].id).find('input').prop('disabled',true);
				$('#'+info[i].id).css('color','red')
			}
		}
		
		$('.footrow td:first-child').html('合计');
		var rowNum = parseInt($(this).getGridParam('records'), 10);
        if (rowNum > 0) {
            $(".ui-jqgrid-sdiv").show();
            var accountAmount = $(this).getCol('amount', false, 'sum');
            var accountRealAmount = $(this).getCol('realAmount', false, 'sum');
            var accountDiffAmount = $(this).getCol('diffAmount', false, 'sum');
            $(this).footerData("set", {
                "amount": '<font color="red" >' + Number(accountAmount).toFixed(2) + '</font>',
                "realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
                "diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
            }, false);
        }
        else {
            $(".ui-jqgrid-sdiv").hide();
        }
	},
	loadError:function(xhr,status,error){
		
	}
})

    //获取差额处理方式
    $('#dataGridDiffTypeName').comModalsInpayClass({
        isReloadTree:true,
        clickback:function () {
            var $Obj=$("#dataGridDiffTypeName");
            var  selrow=$("#accountGrid").jqGrid('getGridParam','selrow');
            //设置编辑器值
            $("#accountGrid input[name='diffTypeName']").val($Obj.val());
            $("#accountGrid").jqGrid('setCell', selrow, "diffType", $Obj.data('id'));
            $Obj.data('id','').val('')
        }
    });

//表格初始化
$('#sumGrid').jqGrid({
	scroll: 1,
	url:"/manager/inventory/retail/reconciliation/accountRecon/getSumAccountReconPageList",
	mtype:"POST",
	datatype: "json",				
	jsonReader  : {	
			root: "data.accountSumList",
			total:"data.total",
			records:"data.records",
			repeatitems: false
	},
	
	gridview: true,
	colNames:['单据日期','单据类型','门店','sectionId','资金账户','金额','实际到账','差额'],          
    colModel:[
                {name:"billsDateStr",width:"150px",align:"center",sortable:false,},  
            	{name:"billsType",width:"150px",align:"center",sortable:false},  
            	
            	{name:"sectionName",width:"150px",align:"center",sortable:false}, 
            	{name:"sectionId",width:"150px",align:"center",sortable:false,hidden:true},
            	
            	{name:"accountName",width:"150px",align:"center",sortable:false,editoptions:{}},
            	{name:"amount",width:"150px",align:"center",sortable:false,editoptions:{}}, 
        	
            	{name:"realAmount",width:"150px",align:"center",sortable:false,}, 
            	{name:"diffAmount",width: 80,align: "center",sortable: false}, //是否确认
//            	{name:"diffTypeNameBox",width:"150px",align:"center",sortable:false}, 
//            	{name:"diffType",width:"150px",align:"center",sortable:false,hidden:true}, 
//            	{name:"dutyName",width:"150px",align:"center",sortable:false}, 
//            	{name:"dutyId",width:"150px",align:"center",sortable:false,hidden:true}, 
//            	{name:"remark",width:"150px",align:"center",sortable:false},
//            	{name:"checkedByName",width:"150px",align:"center",sortable:false}
            ],
    sortable:false,	
    rownumbers:true,
    cellsubmit: 'clientArray',// 单元格保存内容的位置
    editurl: 'clientArray',
    rowNum:15,
    pager:'#sumGridPager',
    viewrecords: true,		           
   	cellEdit:true,
    width:'' ,
    footerrow:true,
    height: $(window).height()*0.6,
	autowidth:true,
	rownumWidth: 35, // the width of the row numbers columns
	shrinkToFit:false,  // 此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
	userDataOnFooter:true,// 设置userData 显示在footer里
	ondblClickRow:function(id){
	
	},
    onCellSelect:function(rowid, index, contents, event){
		lastrowid = rowid*1;
		console.log(index)
		if(index == 12){
			var realAmount = $("#accountGrid").getCell(rowid,'realAmount')
			if(realAmount == "0" || realAmount == ''){
				$("#accountGrid").setCell(rowid,'realAmount',$("#accountGrid").getCell(rowid,'amount'))
				$('#'+rowid+' input').prop('checked',true)
			}else{
				 $("#accountGrid").setColProp('realAmount',{editable:true});  
			}
		}
		if(index == 14){
			
			var diffAmount = $("#accountGrid").getCell(lastrowid,'diffAmount');
			var realAmount = $("#accountGrid").getCell(lastrowid,'realAmount');
			if(diffAmount != "0" && diffAmount != ""){
				var flag = diffAmount*1 > 0 ? -3 : -2

                $('#dataGridDiffTypeName').comModalsInpayClass('setOption',{
                    girdParam:{
                        dataId:flag
                    },

                    treeParams:{
                        type:flag
                    },
                });
			}else{
				$('.diffTypeName').remove()
			}
		}
    },
	beforeEditCell:function(rowid,cellname,v,iRow,iCol){
    	lastrowid = rowid*1;
		lastrow = iRow;
		lastcell = iCol;
	},
	beforeSelectRow:function(rowid,e){
		
	},
	afterInsertRow: function (rowid, aData) { // 新增一行之后

	},
	onSelectRow:function(id,status){	
		console.log('1')
	},
	gridComplete: function() {
		$('table th').css('text-align','center');
	},
	loadComplete:function(data){
		
		$('.footrow td:first-child').html('合计');
		var rowNum = parseInt($(this).getGridParam('records'), 10);
        if (rowNum > 0) {
            $(".ui-jqgrid-sdiv").show();
            var accountAmount = $(this).getCol('amount', false, 'sum');
            var accountRealAmount = $(this).getCol('realAmount', false, 'sum');
            var accountDiffAmount = $(this).getCol('diffAmount', false, 'sum');
            $(this).footerData("set", {
                "amount": '<font color="red" >' + Number(accountAmount).toFixed(2) + '</font>',
                "realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
                "diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
            }, false);
        }
        else {
            $(".ui-jqgrid-sdiv").hide();
        }
	},
	loadError:function(xhr,status,error){
		
	}
})


$('.sumColumnsCheck').change(function(e){
		if(e.target.checked){
			sumColumnsArr.push(e.target.name)
			$('#sumGrid').jqGrid('setGridParam', {
					postData:{
						sumColumns:sumColumnsArr.join(',')
					},
			}).trigger("reloadGrid");
		}else{
			sumColumnsArr.splice($.inArray(e.target.name,sumColumnsArr),1);
			$('#sumGrid').jqGrid('setGridParam', {
					postData:{
						sumColumns:sumColumnsArr.join(',')
					},
			}).trigger("reloadGrid");
		}
	})

})

var sumColumnsArr = ['billsDateStr','billsType','sectionName','accountName'];

//打开支出类别引用对话框
function selectStorageReferenceOpen(cellInfo) {
    $('#dataGridDiffTypeName').next(".showModalBtn").trigger('click')
}



//获取责任人
function getEmployeeVoList(sectionId){
	$.ajax({
		url: '/manager/inventory/common/getEmployeeVoList', 
		type: "POST",
		async:false,
	    traditional: true,
		datatype : "json",
		data:{
			'sectionId' : sectionId
		},
      success: function (data) {
			
			
			if(data.result==1||data.result=="1"){
				
				var nameList = '<select class="dutyName"><option value="">请选择</option>';
				var list = data.data.employeeVoList;
				for(var i=0;i<list.length;i++){
					nameList += '<option value="'+list[i].employeeId+'">'+list[i].name+'</option>'
				}
				$("#accountGrid").setCell(lastrowid,'dutyName',nameList+'</select>')
				//差额处理方式变更
				$('.dutyName').on('change',function(){
				
					$("#accountGrid").setCell(lastrowid,'dutyName',$(this).find("option:selected").text())
					$("#accountGrid").setCell(lastrowid,'dutyId',$(this).val())
					updateAccountRecon(lastrowid)
				})
				
			}else{
				$.zxsaas_plus.showalert("提示",data.desc);
			}
		   	
	    },
      error: function (msg) {
          alert(" 数据加载失败！" + msg);
      }
	})
}

//改变已核
function test(e,data){
	if(e.checked){
		$("#accountGrid").setCell(data.id,'realAmount',$("#accountGrid").getCell(data.id,'amount'))
		 var accountRealAmount = $('#accountGrid').getCol('realAmount', false, 'sum');
        var accountDiffAmount = $('#accountGrid').getCol('diffAmount', false, 'sum');
        $("#accountGrid").setCell(data.id,'isCheck',1)
		 $('#accountGrid').footerData("set", {
            "realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
            "diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
        }, false);
	}else{
		$("#accountGrid").setCell(data.id,'realAmount','0')
		$("#accountGrid").setCell(data.id,'diffAmount','0')
		$("#accountGrid").setCell(data.id,'diffTypeNameBox')
		$("#accountGrid").setCell(data.id,'diffType','')
		 $("#accountGrid").setCell(data.id,'isCheck',0)
		 var accountRealAmount = $('#accountGrid').getCol('realAmount', false, 'sum');
        var accountDiffAmount = $('#accountGrid').getCol('diffAmount', false, 'sum');
		 $('#accountGrid').footerData("set", {
            "realAmount": '<font color="red" >' + Number(accountRealAmount).toFixed(2) + '</font>',
            "diffAmount": '<font color="red" >' + Number(accountDiffAmount).toFixed(2) + '</font>',
        }, false);
		 
	}
	updateAccountRecon(data.id , e.checked)
	
}

function updateAccountRecon(rowid){
	var info = $("#accountGrid").getRowData(rowid)
	$.ajax({
		url: '/manager/inventory/retail/reconciliation/accountRecon/updateAccountRecon', 
		type: "POST",
	    traditional: true,
		datatype : "json",
		data:{
			'id' : info.id,
			'isCheck' : info.isCheck,
			'realAmount' : info.realAmount,
			'diffAmount' : info.diffAmount,
			'diffType' : info.diffType,
			'dutyId' : info.dutyId,
			'remark' : info.remark,
			'contactUnitId':info.contactUnitId,
			'sectionId':info.sectionId
		}, 
		success: function (data) {
			
			$("#accountGrid").setCell(rowid,'checkedByName',data.data.checkedByName)
			$("#accountGrid").setCell(rowid,'checkedDateStr',data.data.checkedDateStr)
		
//			if(data.result==1||data.result=="1"){
//				$('.diffTypeName').remove()
//				
//				var nameList = '<select class="diffTypeName">';
//				var list = data.data.inpayList;
//				for(var i=0;i<list.length;i++){
//					nameList += '<option value="'+list[i].id+'">'+list[i].name+'</option>'
//				}
//				$("#accountGrid").setCell(lastrowid,'diffTypeName',nameList+'</select>')
//				//差额处理方式变更
//				$('.diffTypeName').on('change',function(){
//					console.log($(this).val().trim())
//					console.log(lastrowid)
//					$("#accountGrid").setCell(lastrowid,'diffTypeName',$(this).find("option:selected").text())
//				})
//			}else{
//				$.zxsaas_plus.showalert("提示",data.desc);
//			}
		   	
	    },
	    error: function (msg) {
          alert(" 数据加载失败！" + msg);
	    }
	})
	
	

}

//只能输入数字
function getnum(obj){
	obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
	obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
}



