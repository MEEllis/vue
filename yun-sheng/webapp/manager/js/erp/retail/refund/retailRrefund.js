$.jgrid.defaults.width = 1280;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
var lastrow=null,lastcell=null;

var isView=false;//单据状态，true为查询，false为操作
var collectionDetails=null;//收款明细
//校验时间
$(document).on('blur','#datetimepickerStart1,#datetimepickerEnd1',function(e){
	if(!checkT.checkTime()){  
	    $.zxsaas_plus.showalert("warning","截止日期必须晚于生效日期！");
		$(this).val('');
	    return;  
	}  
});
var tableArr = [];//表格数据
$("#datetimepickerStart").timeControl()
/**
 * 商品名称选择
 */
$(document).on('click', '.goodsName',function(e){
	var rowId = $(this).data('rid');
	treeGoodsModal('goodsDataTree','jqGrid_goodsMsgAdd','gridpager_goods',basePath+'/retail/refund/selectGoodsDetail',false,rowId,basePath+'/retail/refund/findGoodsclassTree','#jqGrid_SubjectBalance');
	$("#jqGrid_goodsMsgAdd").trigger("reloadGrid");//重载表格
});
$('#billsTozero').keyup(function(){
	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字.输入
}).blur(function(){
	$(this).val(Number($(this).val()));
	if(isNaN($(this).val())||$(this).val()==''){
        $(this).val(0)
    }
})
//收款结算
$('#settleBtn').click(function () {
	if(isView){
		var posTotal=0;//pos总金额
		$('#myModal_settle').modal('show');
		$('#table_settle input,#table_pos input').val('');
		$('#deductionRemark').prop('disabled',true);
		$('#settle_sure').prop('disabled',true);
		$('#settle_receivable').html($('#payTotal').val());
		$.request({
			type: 'Post',
			url: basePath + '/retail/deposit/findAccountList',
			data: {
				sectionId : $("#sectionId").val()
			},
			dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			success: function (data) {
				var res=data.data.accountList;
				var _html;
				for(var i=0;i<res.length;i++){
					if(res[i].accountType==2){
						_html+='<tr><td>'+res[i].accountName+'</td><td><input class="posAccount" type="text" value="" disabled><input class="posAccountId" type="hidden" value="'+res[i].accountId+'"><input class="posAccountType" type="hidden" value="'+res[i].accountType+'"></td></tr>'
					}else{
						html='';
					}
				}
				$('#table_pos tbody').html(_html);
			},
			error: function () {
				alert("资金账户加载失败！");
			}
		});
		$.each(collectionDetails,function(i,val){
			if(val.remark==null){
				val.remark=''
			}
			switch(val.accountType){
			case '1':
				$('#cash').val(val.amount);
				$('#deductionRemark').val(val.remark);
				break;
			case '2':
				posTotal+=Number(val.amount)
				$('#pos').val(posTotal);
				$('#deductionRemark').val(val.remark);
				break;
			case '3':
				$('#weixin').val(val.amount);
				$('#deductionRemark').val(val.remark);
				break;
			case '4':
				$('#alipay').val(val.amount);
				$('#deductionRemark').val(val.remark);
				break;
			case '5':
				$('#coupons').val(val.amount);
				$('#deductionRemark').val(val.remark);
				break;
			case '6':
				$('#memberAmount').val(val.amount);
				$('#deductionRemark').val(val.remark);
				break;
			case '7':
				$('#deductionMoney').val(val.amount);
				$('#deductionRemark').val(val.remark);
				break;
			}
		})
		thisTimesettleTotal()
		//POS机
		$('#pos').focus(function () {
            $("#myModal_pos").modal('show');
            $.each(collectionDetails,function(i,val){
            	if(val.accountType==2){
            		$('.posAccountId').each(function(j,value){
            			if(val.accountId==$(this).val()){
            				$(this).closest('tr').find('.posAccount').val(val.amount)
            			}
    				})
            	}
            })
        });
        //促销券
        var coupons=$('#coupons');
        coupons.focus(function () {
            $("#myModal_coupons").modal('show');
        });
	}else{
		if(($.trim($('#customerName').val())==''&&$.trim($('#customerTel').val())!='')||($.trim($('#customerName').val())!=''&&$.trim($('#customerTel').val())=='')){
			$.zxsaas_plus.showalert('warning','姓名电话必须同时填写或者同时不填写！');
			return false;
		}
		$('#addAdminForm').bootstrapValidator('resetForm', false);//为true时清空表单内容
    	$('#addAdminForm').data('bootstrapValidator').validate();
        if (!$('#addAdminForm').data('bootstrapValidator').isValid()) {
        	$.zxsaas_plus.showalert('warning','验证不通过');
            return false;
        }else{
        	if(checkGoodsValue()){
        		var IDs=$('#jqGrid_SubjectBalance').jqGrid("getDataIDs");
        		var costArr=[];
        		for(var i=0,len=IDs.length;i<len;i++){
        			var rowData=$('#jqGrid_SubjectBalance').getRowData(IDs[i]);
        			if(Number(rowData.cost)==0){
        				costArr.push(i);
        			}
        		}
        		if(costArr.length){
        			$.zxsaas_plus.showconfirm('提示','有成本为零的商品，是否结算',function(){
        				 var payableList=$('#jqGrid_SubjectBalance').jqGrid('getCol','amount');
        	    			var payTotal=0;
        	    			$.each(payableList,function(index,item){
        	    				payTotal+=Number(item);
        	    			})
        	    			var addServicePayList=$('#jqGrid_serve').jqGrid('getCol','yfAmount');
        	    			$.each(addServicePayList,function(index,item){
        	    				payTotal+=Number(item);
        	    			})
        	    			payTotal-=$('#billsTozero').val();
        	    			$('#payTotal').val(payTotal);
        	    			$('#settle_receivable').html(payTotal);
        	    			$('#settle_balance').html(payTotal);
        	    			$('#settle_thisTime').html(0);
        	    		    $('#myModal_settle').modal('show');
        	    		    $('#settle_availableIntegral').html($('#customerScore').val());
        	    		    $('#settle_storedValue').html($('#customerAmount').val());
        	    		    $('#arrivalStandard span:eq(0)').html($('#dScore').val());
        	    		    $('#arrivalStandard span:eq(1)').html($('#dAmount').val())
        	    		    $.request({
        	    		    	url:basePath+'/retail/refund/findAccountList',
        	    		    	type:'get',
        	    		    	dataType:'json',
        	    		    	data:{
        	    		        	sectionId:$('#sectionId option:selected').val()
        	    		        },
        	    		        success:function(data){
        	    					$('#cash,#pos,#alipay,#weixin,#coupons,#memberAmount,#deductionMoney,#deductionScore').val('').prop('disabled',true);
        	    					var res=data.data.accountList;
        	    					var _html;
        	    					for(var i=0;i<res.length;i++){
        	    						if(res[i].accountType==1){
        	    							$('#cash').prop('disabled',false)
        	    							$('#cash').data('accountid',res[i].accountId);
        	    						}else if(res[i].accountType==2){
        	    							_html+='<tr><td>'+res[i].accountName+'</td><td><input class="posAccount payMethods" type="text" value=""><input class="posAccountId" type="hidden" value="'+res[i].accountId+'"></td></tr>'
        	    							$('#pos').prop('disabled',false)
        	    						}else if(res[i].accountType==3){
        	    							$('#alipay').prop('disabled',false)
        	    							$('#alipay').data('accountid',res[i].accountId);
        	    						}else if(res[i].accountType==4){
        	    							$('#weixin').prop('disabled',false)
        	    							$('#weixin').data('accountid',res[i].accountId);
        	    						}else if(res[i].accountType==5){
        	    							$('#coupons').prop('disabled',false)
        	    							$('#coupons').data('accountid',res[i].accountId);
        	    						}else if(res[i].accountType==6&&$('#cardId').val()!=''){
        	    							$('#memberAmount').prop('disabled',false)
        	    							$('#memberAmount').data('accountid',res[i].accountId);
        	    						}else if(res[i].accountType==7&&$('#cardId').val()!=''){
        	    							$('#deductionMoney').data('accountid',res[i].accountId);
        	    							$('#deductionMoney').prop('disabled',false);
        	    							$('#deductionScore').prop('disabled',false)
        	    						}
        	    					}
        	    					$('#table_pos tbody').html(_html);
        	    			    }
        	    		    })
        			},function(){
        				
        			})
        		}else{
        			
        		
        		
        		
	                var payableList=$('#jqGrid_SubjectBalance').jqGrid('getCol','amount');
	    			var payTotal=0;
	    			$.each(payableList,function(index,item){
	    				payTotal+=Number(item);
	    			})
	    			var addServicePayList=$('#jqGrid_serve').jqGrid('getCol','yfAmount');
	    			$.each(addServicePayList,function(index,item){
	    				payTotal+=Number(item);
	    			})
	    			payTotal-=$('#billsTozero').val();
	    			$('#payTotal').val(payTotal);
	    			$('#settle_receivable').html(payTotal);
	    			$('#settle_balance').html(payTotal);
	    			$('#settle_thisTime').html(0);
	    		    $('#myModal_settle').modal('show');
	    		    $('#settle_availableIntegral').html($('#customerScore').val());
	    		    $('#settle_storedValue').html($('#customerAmount').val());
	    		    $('#arrivalStandard span:eq(0)').html($('#dScore').val());
	    		    $('#arrivalStandard span:eq(1)').html($('#dAmount').val())
	    		    $.request({
	    		    	url:basePath+'/retail/refund/findAccountList',
	    		    	type:'get',
	    		    	dataType:'json',
	    		    	data:{
	    		        	sectionId:$('#sectionId option:selected').val()
	    		        },
	    		        success:function(data){
	    					$('#cash,#pos,#alipay,#weixin,#coupons,#memberAmount,#deductionMoney,#deductionScore').val('').prop('disabled',true);
	    					var res=data.data.accountList;
	    					var _html;
	    					for(var i=0;i<res.length;i++){
	    						if(res[i].accountType==1){
	    							$('#cash').prop('disabled',false)
	    							$('#cash').data('accountid',res[i].accountId);
	    						}else if(res[i].accountType==2){
	    							_html+='<tr><td>'+res[i].accountName+'</td><td><input class="posAccount payMethods" type="text" value=""><input class="posAccountId" type="hidden" value="'+res[i].accountId+'"></td></tr>'
	    							$('#pos').prop('disabled',false)
	    						}else if(res[i].accountType==3){
	    							$('#alipay').prop('disabled',false)
	    							$('#alipay').data('accountid',res[i].accountId);
	    						}else if(res[i].accountType==4){
	    							$('#weixin').prop('disabled',false)
	    							$('#weixin').data('accountid',res[i].accountId);
	    						}else if(res[i].accountType==5){
	    							$('#coupons').prop('disabled',false)
	    							$('#coupons').data('accountid',res[i].accountId);
	    						}else if(res[i].accountType==6&&$('#cardId').val()!=''){
	    							$('#memberAmount').prop('disabled',false)
	    							$('#memberAmount').data('accountid',res[i].accountId);
	    						}else if(res[i].accountType==7&&$('#cardId').val()!=''){
	    							$('#deductionMoney').data('accountid',res[i].accountId);
	    							$('#deductionMoney').prop('disabled',false);
	    							$('#deductionScore').prop('disabled',false)
	    						}
	    					}
	    					$('#table_pos tbody').html(_html);
	    			    }
	    		    })
        		}
    		}
        }
	}
});
//POS机
$('#pos').focus(function () {
    $("#myModal_pos").modal('show');
});
function thisTimesettleTotal(){//结算框计算
	var  STol=Number($('#cash').val())+Number($('#pos').val())+Number($('#alipay').val())+Number($('#weixin').val())+Number($('#coupons').val())+Number($('#memberAmount').val())+Number($('#deductionMoney').val());
	$('#settle_thisTime').html(Math.round(STol*100)/100);
	$('#settle_balance').html(Math.round((Number($('#settle_receivable').html())-Number($('#settle_thisTime').html()))*100)/100);//应收余额
}
function loadmodal(urlData){
	var options = {
		LoadBtnUrl: basePath+"/json/button.json", //按钮工具栏加载地址
		LoadTableUrl: urlData,
		TableName: "#jqGrid_SubjectBalance", //显示表格名称。遵照css选择器书写
	};
	var colNames = ['操作','赠品','入库仓库','商品类别','商品编码','商品名称','品牌','型号','颜色','串号','辅助串号','数量','原单单价','原单金额','第三方券','退款金额','是否分期','是否合约机','原单据号','入库成本','备注','是否原单引入','仓库Id','goodsId','最大数量','是否串号管理','串号id','sttrs','第三方券集合','retailMainId','商品明细id','串号长度','是否辅助串号','辅助串号长度'];
	var JqGridColModel=[
		{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete,sortable:false},
		{name:'giftFlag',index:'giftFlag',width:80,align:'center',formatter:'checkbox',formatoptions:{disabled:false},sortable:false,editoptions:{value:'1:0'}},
		{name:'storageName',index:'storageId', width:100,align:'center', sortable:false,editable:true,edittype:'select'},
		{name:'categoryName',index:'categoryName',sortable:false,width:200,align:'center'},//商品类别
		{name:'code',index:'code',sortable:false,width:200,align:'center'},//商品编码
		{name:'name',index:'name', width:200,align:'center',editable:true,edittype:'custom',sortable:false,editoptions:{
			custom_element:function(value,options){
				 var html='<input type="text" readonly="readonly" class="form-control" style="border:0;text-align:center;width:96%;" value="' + value +'" /><span style="float:right;margin-top:-27px;margin-right:20px;" class="goodsName glyphicon glyphicon-plus" data-toggle="modal" data-target="#goodsChoose" data-rId="' + options.rowId +'"></span>';
				 return $(html);
			},
			custom_value:function(value){
				return value.val();
			}
		}},
		{name:'brandName',index:'brandName',sortable:false,width:200,align:'center'},//品牌
		{name:'models',index:'models', sorttype:'integer', width:80,align:'center',sortable:false},
		{name:'color',index:'color', sorttype:'integer', width:80,align:'center',sortable:false},
		{name:'imei',index:'imei', sorttype:'integer', width:100,align:'center',sortable:false,editable:true,editoptions: {
            dataEvents: [{
                type: "blur",
                fn: function(){
	            	var rowid=$("#jqGrid_SubjectBalance").getGridParam("selrow");
	    			var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData",rowid);
	    			var len=rowData.imeiLength;
	            	if(len!=''&&len!=0&&$(this).val().length!=len){
	            		$.zxsaas_plus.showalert("warning",'请输入'+len+'位串号');
	            		$(this).val('')
	            	}
	    			$("#jqGrid_SubjectBalance").jqGrid("saveCell", lastrow, lastcell);
                }
            }]
        }},
        {name:'auxiliaryImei',index:'auxiliaryImei',sorttype:'integer',width:100,align:'center',sortable:false,editable:false,editoptions:{
            dataEvents: [{
                type:"blur",
                fn:function(){
	            	var rowid=$("#jqGrid_SubjectBalance").getGridParam("selrow");
	    			var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData",rowid);
	    			var len=rowData.auxiliaryImeiLength;
	            	if(len!=''&&len!=0&&$(this).val().length!=len){
	            		$.zxsaas_plus.showalert("warning",'请输入'+len+'位辅助串号');
	            		$(this).val('')
	            	}
            		$("#jqGrid_SubjectBalance").jqGrid("saveCell",lastrow,lastcell);
                }
            }]
        }},
		{name:'goodsNum',index:'goodsNum', width:80,align:'center',editable:true,sortable:false,formatter:"integer",editoptions:{
			dataEvents:[{
				type:"blur",
				fn:function(e){
					var rId=$(this).parents('tr').attr('id');
					var data=$('#jqGrid_SubjectBalance').jqGrid('getRowData',rId);
					var rex=/^[1-9]*$/;
					if(data.ifImport*1==1&&$(this).val()*1>data.maxNum*1){
						$.zxsaas_plus.showalert("warning","请输入不大于出货量的数字！");
						$(this).val(data.maxNum);
						return;
					}
					if(rex.test($(this).val())){
						$(this).parent().next().next().html(($(this).val().replace(/\,/g,'') * $(this).parent().next().html().replace(/\,/g,'')).toFixed(2))
						$("#jqGrid_SubjectBalance").jqGrid("saveCell",lastrow,lastcell);
						totalAll.totalCalc();
					}else{
						$.zxsaas_plus.showalert("warning","请输入正确数字！");
						$(this).val('');
					}
				}
			}]
		}},
		{name:'oldPrice',index:'oldPrice', width:100,align:'center',  sorttype:'float',formatter:"number",sortable:false},
		{name:'oldAmount',index:'oldAmount', width:100,align:'center',  sorttype:'float',formatter:"number",sortable:false},
		{name:'totalThridTicketAmount',index:'totalThridTicketAmount', width:80,align:'center',sorttype:'float',formatter:thirdTicket,sortable:false},
		{name:'amount',index:'amount', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,sortable:false,editoptions:{onblur:'amountOnblur($(this).val())'}},
		{name:'installFlag',index:'installFlag', width:80,align:'center',formatter:'checkbox',sortable:false,editoptions:{value:'1:0'}},
		{name:'cphoneFlag',index:'cphoneFlag', width:80,align:'center',formatter:'checkbox',sortable:false,editoptions:{value:'1:0'}},
		{name:'billsCode',index:'billsCode', width:200,align:'center', sorttype:'string',sortable:false},
		{name:'cost',index:'cost', width:100,align:'center', sorttype:'string',sortable:false,editable:false,formatter:'number',editoptions: {
            dataEvents: [{
                type: "blur",
                fn: function(){
                	$("#jqGrid_SubjectBalance").jqGrid("saveCell", lastrow, lastcell);
                }
            }]
        }},
        {name:'remark',index:'remark', width:300,align:'center', sorttype:'string',editable:true,sortable:false,editoptions: {
            dataEvents: [{
                type: "blur",
                fn: function(){
                	$("#jqGrid_SubjectBalance").jqGrid("saveCell", lastrow, lastcell);
                }
            }]
        }},
        {name:'ifImport',index:'ifImport',hidden:true},
        {name:'storageId',index:'storageIdTemp',hidden:true},
		{name:'goodsId',index:'goodsId',hidden:true},
		{name:'maxNum',index:'maxNum',hidden:true},
		{name:'ifManageImei',index:'ifManageImei',hidden:true},
		{name:'imeiId',index:'imeiId',hidden:true},
		{name:'attrs',index:'attrs',hidden:true},
		{name:'thridTicketVoList',index:'thridTicketVoList',hidden:true},
		{name:'retailMainId',index:'retailMainId',hidden:true},
		{name:'retailDetailId',index:'retailDetailId',hidden:true},
		{name:'imeiLength',index:'imeiLength',hidden:true},
		{name:'ifEnableAuxiliaryImei',index:'ifEnableAuxiliaryImei',hidden:true},
		{name:'auxiliaryImeiLength',index:'auxiliaryImeiLength',hidden:true}
    ];
	$(options.TableName).jqGrid({
		url:options.LoadTableUrl,
		mtype:"GET",
		datatype:"local",
		jsonReader:{
			root:"rows",
			repeatitems:false,
			id:'0'
		},
		colNames:colNames,          
        colModel:JqGridColModel,
        sortable:false,			            
        rownumbers:true,
        cellsubmit:'clientArray',//单元格保存内容的位置		
        editurl:'clientArray',
        rowNum:-1,
        autowidth:true,
        viewrecords: true,	
        autowidth:true,
       	cellEdit:true,
        width: "100%" ,
        height: $(window).height()*0.30,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow:true,  //设置表格显示表脚
		userDataOnFooter:true,//设置userData 显示在footer里
		ondblClickRow:function(id){
		},
        formatCell:function(){
			 $('#jqGrid_SubjectBalance').jqGrid('setColProp', 'storageName', { editoptions: {
					dataUrl:basePath+'/retail/refund/searchStorageVoList?sectionId='+sectionId,
					buildSelect:function(data){
						var data=JSON.parse(data);
						var storageVoList=data.data.storageVoList;
						var str='<select class="form-control">';
							$.each(storageVoList,function(index,item){
								str+='<option value='+item.id+' >'+item.name+'</option>'
							})
							str+='</select>'
						return str;
					},
					dataEvents:[{type:'blur',fn:function(){
						var rId=$(this).parents('tr').attr('id');
						$('#jqGrid_SubjectBalance').setCell(rId,'storageId',$(this).val());
					}}]
			 } });
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow;
			lastcell = iCol;
			mainRowId=rowid
		},
		onCellSelect:function(id,index,e){
			var colName=$('#jqGrid_SubjectBalance').jqGrid('getGridParam','colModel')[index].name 
	      	select_name=colName
	      	select_index=index;
			var ifImport=$('#jqGrid_SubjectBalance').jqGrid('getCell',id,'ifImport');
			var giftFlag=$('#jqGrid_SubjectBalance').jqGrid('getCell',id,'giftFlag');
	      	var ifManageImei = $('#jqGrid_SubjectBalance').jqGrid('getCell',id,'ifManageImei');
	      	var ifEnableAuxiliaryImei=$('#jqGrid_SubjectBalance').jqGrid('getCell',id,'ifEnableAuxiliaryImei');
	      	if(ifImport==1){
	      		$(options.TableName).setColProp('name',{editable:false});
	      		$(options.TableName).setColProp('giftFlag',{formatoptions:{disable:true}});
	      	}else{
	      		$(options.TableName).setColProp('name',{editable:true});
	      		$(options.TableName).setColProp('giftFlag',{formatoptions:{disable:false}});
	      	}
	      	if(ifManageImei==1){
	      		$(options.TableName).setColProp('goodsNum',{editable:false});
	      	}else{
	      		$(options.TableName).setColProp('goodsNum',{editable:true});
	      	}
	      	if(index==10){
	      		var ifImpt=$('#jqGrid_SubjectBalance').jqGrid('getCell',id,'billsCode');
	      		if(ifImpt==1){
	      			$('#jqGrid_SubjectBalance').setColProp('imei',{editable:false});
	      		}else{
	      			if(ifManageImei==1){
	    	      		$('#jqGrid_SubjectBalance').setColProp('imei',{editable:true});
	    	      	}else{
	    	      		$('#jqGrid_SubjectBalance').setColProp('imei',{editable:false});
	    	      	}
	      		}
	      	}
	      	if(index==11){
	      		var ifImpt=$('#jqGrid_SubjectBalance').jqGrid('getCell',id,'billsCode');
	      		if(ifImpt==1){
	      			$('#jqGrid_SubjectBalance').setColProp('auxiliaryImei',{editable:false});
	      		}else{
	      			if(ifEnableAuxiliaryImei==1){
	    	      		$('#jqGrid_SubjectBalance').setColProp('auxiliaryImei',{editable:true});
	    	      	}else{
	    	      		$('#jqGrid_SubjectBalance').setColProp('auxiliaryImei',{editable:false});
	    	      	}
	      		}
	      	}
	      	if(giftFlag==1){
	      		$('#jqGrid_SubjectBalance').setColProp('amount',{editable:false});
	      	}else{
	      		$('#jqGrid_SubjectBalance').setColProp('amount',{editable:true});
	      	}
	      	if(index==20){//入库成本
	      		$('#jqGrid_SubjectBalance').setColProp('cost',{editable:false});
	      		if($('#jqGrid_SubjectBalance').jqGrid('getCell',id,'storageId')==''){$.zxsaas_plus.showalert("warning","未选择仓库！");return false}
	      		if($('#jqGrid_SubjectBalance').jqGrid('getCell',id,'storageId')!=''&&$('#jqGrid_SubjectBalance').jqGrid('getCell',id,'goodsId')!=''){
	      			if(!ifImport){
		      			$.request({
		      				async:false,
			      			type:'post',
			    		 	url: basePath+'/retail/refund/getGoodsCostPrice',
			    		 	data:{
				      			storageId:$('#jqGrid_SubjectBalance').jqGrid('getCell',id,'storageId'),
				      			goodsId:$('#jqGrid_SubjectBalance').jqGrid('getCell',id,'goodsId')
				      		},
			    		 	dataType:'json',
			    		 	success: function(data) {
				      			if(data.result==1){
				      				if(data.data.cost==0){
				      					$('#jqGrid_SubjectBalance').setColProp('cost',{editable:true});
				      				}else{
				      					$('#jqGrid_SubjectBalance').setColProp('cost',{editable:false});
				      					$("#jqGrid_SubjectBalance").jqGrid("setCell",id,"cost",data.data.cost);
				      				}
				      			}else{
				      				alert(data.desc)
				      			}
			    		 	},
			    		 	error:function(){
			    		 		alert('response error')
			    		 	}
			    	 	});
	      			}
	      		}
	      	}
		},
		gridComplete: function() {
			var ids = $(options.TableName).jqGrid('getDataIDs');
			if(ids.length < 1){
				$(options.TableName).jqGrid('addRowData', 1, {}, 'last' );
				$('.goodsRid1').val('');
				$('.t1').html('0');
				$('.y1').html('');
			}
			totalAll.totalCalc();
		},
		loadComplete:function(){
//			for(var j = 0,len = arguments[0].rows.length;j < len;j ++){
//				chengben(j+1,arguments[0].rows[j].costMoney);
//			}
//			var arr = document.querySelectorAll('.goodsName');
//			for(var i = 0,len = arr.length;i < len;i ++){
//				(arr[i].dataset.rid == '') && (arr[i].className = 'goodsName');
//				(arr[i].dataset.rid == '') && (arr[i].dataset.target = '');
//			}
//			$('.goodsRid').attr('readonly',true);
//			$('.numberRid').attr('readonly',true).removeAttr('id');
//			$('.footrow td:first-child').html('合计');
		}
	})
	//获取仓库名称
	function getStorage(){
		var countries = {};
		$.request({
		 	url: basePath+'/retail/refund/searchStorageVoList?sectionId=10',//请求路径  
		 	async: false,  
		 	dataType:'JSON',
		 	success: function(data) {
		 		for(var i = 0,len = data.data.storageVoList.length;i < len;i ++){
		 			countries[data.data.storageVoList[i].id] = data.data.storageVoList[i].name;
		 		}
		 	},
		 	error:function(){
		 		
		 	}
	 	});
		return countries;
	};
	//切换仓库  事件
	$(document).on('click','select[id$="_storageId"]',function(e){
		$('#jqGrid_SubjectBalance').jqGrid('setCell',$(this).attr('rowid'),'storId',$(this).val());
	});
	//列表复选框
	function checkBox(cellvalue, options, rowObjec){
		//   0   非赠品
		//   1   赠品
		var str = '';
		if(cellvalue == '0'){
			str = '<input type="checkbox" class="del giftFlag' + options.rowId + '" data-flag="' + rowObjec.ifFlag + '"  data-id="' + options.rowId + '" />';
		}else{
			str = '<input type="checkbox" checked class="del giftFlag' + options.rowId + '" data-flag="' + rowObjec.ifFlag + '"  data-id="' + options.rowId + '" />';
		};
		return str;
	}
	$(document).on('click','.del',function(e){
		if($(this).is(':checked')){
			$(this).data('giftFlag',1);
		}else{
			$(this).data('giftFlag',0)
		}
	});
	//列表复选框  是否分期
	function checkBoxIm(cellvalue, options, rowObjec){
		//   0   非赠品
		//   1   赠品
		var str = '';
		if(cellvalue == '0'){
			str = '<input type="checkbox" class="del imstallmentFlag' + options.rowId + '" data-flag="' + rowObjec.imstallmentFlag + '"  data-id="' + options.rowId + '" />';
		}else{
			str = '<input type="checkbox" checked class="del imstallmentFlag' + options.rowId + '" data-flag="' + rowObjec.imstallmentFlag + '"  data-id="' + options.rowId + '" />';
		};
		return str;
	}
	//列表复选框  是否合约机
	function checkBoxCh(cellvalue, options, rowObjec){
		//   0   非赠品
		//   1   赠品
		var str = '';
		if(cellvalue == '0'){
			str = '<input type="checkbox" class="del chponeFlag' + options.rowId + '" data-flag="' + rowObjec.chponeFlag + '"  data-id="' + options.rowId + '" />';
		}else{
			str = '<input type="checkbox" checked class="del chponeFlag' + options.rowId + '" data-flag="' + rowObjec.chponeFlag + '"  data-id="' + options.rowId + '" />';
		};
		return str;
	}
	function addAndDelete(cellvalue, options, rowObjec){
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '" data-gId="' + rowObjec.goodsId + '"><span style="margin-right:10px" title="添加" class="glyphicon glyphicon-plus addRow"></span><span class="glyphicon glyphicon-trash delRow" aria-hidden="true" title="删除行"></span></div>';
		return addAndDel;
	}
	$(document).on('click','.addRow',function(e){
		var rowid=$("#jqGrid_SubjectBalance").jqGrid("getGridParam", "selrow");
		var ids = $('#jqGrid_SubjectBalance').jqGrid('getDataIDs');
		var maxid = (ids.length ==0 ) ? 0 : Math.max.apply(null,ids);
		$("#jqGrid_SubjectBalance").addRowData(maxid+1,{'totalThridTicketAmount':0},"after",rowid);
	});
	//删除一行
	$(document).on('click', '.delRow',function(e){
		var ids=$("#jqGrid_SubjectBalance").jqGrid("getDataIDs");
		var selid=$("#jqGrid_SubjectBalance").getGridParam("selrow");
		if(ids.length==1){
			$.zxsaas_plus.showalert("warning","至少保留一行！");
		}else{
			$('#jqGrid_SubjectBalance').jqGrid('delRowData',selid);
		}
	});
	//列表    第三方券
	function thirdTicket(cellvalue, options, rowObjec){
		return '<span class="third t' + options.rowId + '" data-id="' + rowObjec.id + '" data-rId="' + options.rowId + '" onclick="loadmodalThird(this)" style="color:#00CCFF;cursor:pointer;width:100%;height:100%;line-height:100%;text-align:center;">' + cellvalue + '</span>';
	}
	//列表    原单引入
	function yinru(cellvalue, options, rowObjec){
		return '<span class="yinru y' + options.rowId + '" data-id="' + rowObjec.id + '" data-rId="' + options.rowId + '" style="color:#00CCFF;cursor:pointer" onclick="">' + cellvalue + '</span>';
	}
	//商品名称修改
	function goodsModel(cellvalue, options, rowObject){
		return '<input type="text" class="goodsRid' + options.rowId +'" style="border:0;text-align:center;width:170px" value="' + cellvalue +'" /><span class="goodsName glyphicon glyphicon-plus" data-toggle="modal" data-target="#goodsChoose" data-rId="' + options.rowId +'"></span>';
	};
	//数字列检测
	$(document).on('blur','#checkNum',function(e){
		var value = $(this).val();
		var reg = /^[0-9]*[1-9][0-9]*$/;
		if(reg.test(value)){
			var $temp = $(this).parent().next().html().indexOf("<") == -1 ? $(this).parent().next().html().replace(/\,/g,'') : $(this).parent().next().find('input').val().replace(/\,/g,'');
			$(this).parent().next().next().html(($(this).val() * $temp).toFixed(2));
			totalAll.totalCalc();
		}else{
			$.zxsaas_plus.showalert("warning","请输入合法数字！");
			$(this).val('');
			$(this).parent().next().next().html('');
		}
	});
	//检测输入的是否为数字
	function checkNumber(value, colname) {
		var reg = /^[1-9]\d*$/;
		var arr = [];
		arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
		return arr;
	}
}
//主表格退款金额失焦事件
function amountOnblur(parm){
	var reg=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
	if(reg.test(parm)){
		totalAll.totalCalc();
	}else{
		$.zxsaas_plus.showalert("warning","请输入合法数字！");
		$(this).val('');
	}
}
//总计
var totalAll = {
	totalCalc:function(){//入库总计
		$("#jqGrid_SubjectBalance").jqGrid("saveCell",lastrow,lastcell);
		var idsLeft = $('#jqGrid_SubjectBalance').jqGrid('getDataIDs');
		var sumNumber = 0;//数量
		var sumMoney = 0,//退款金额
			thirdTicket = 0,//第三方券
			price = 0,//单价
			total = 0;//原单金额
		for(var i = 0,len = idsLeft.length;i < len ;i ++){
			var rowsData = $('#jqGrid_SubjectBalance').jqGrid('getRowData',idsLeft[i])
			sumMoney += ((rowsData.amount) * 1);
			thirdTicket += ($(rowsData.thirdTicket).html() * 1);
			sumNumber += (rowsData.goodsNum * 1);
			total += (rowsData.money * 1);
		}
        var sum_Fy=$("#jqGrid_SubjectBalance").getCol('amount',false,'sum');
        $("#jqGrid_SubjectBalance").footerData('set',{"amount":'合计',amount:sum_Fy});
	}
};
	/**
	 * 第三方券
	 */
	var loadmodalThird = function(that){
		if($(that).html()==0){
			$.zxsaas_plus.showalert('error','没有第三方券！！！')
			return;
		}
		$('#thirdChoose').modal('show');
		thirdTrickInit();
		$('#jqGrid_Third').jqGrid('clearGridData');
		var trickList=$('#jqGrid_SubjectBalance').jqGrid('getRowData',$(that).data('rid'))['thridTicketVoList'];
		var trickListObj=JSON.parse(trickList);
		if(trickListObj===undefined){
			return false;
		}
		for(var i=0,len=trickListObj.length;i<len;i++){
			$('#jqGrid_Third').jqGrid('addRowData','id',trickListObj[i]);
		}
	}	
/**
 * 第三方券初始化
 */
function thirdTrickInit(){
	$('#jqGrid_Third').jqGrid({
		url:'',
		mtype:"GET",
		datatype: "local",
		jsonReader  : {	
			root: "rows",
			repeatitems: false
		},
		colNames:['id','往来单位','券名称','抵现金额','券编号','备注'],          
	    colModel:[
          	{name:'id',index:'id', width:100,align:'center',sortable:false,hidden:true},
			{name:'unitName',index:'unitName', width:100,align:'center', sorttype:'string',sortable:false},
			{name:'ticketName',index:'ticketName', width:100,align:'center',sortable:false,},
			{name:'amount',index:'amount', width:100,align:'center',  sorttype:'float',formatter:"number",sortable:false},
			{name:'couponCode',index:'couponCode', width:100,align:'center',  sorttype:'string',editable:true,sortable:false},
			{name:'remark',index:'remark', width:150,align:'center', sorttype:'string',editable:true,sortable:false}
        ],
	    sortable:false,			            
	    rownumbers:true,
	    cellsubmit: 'clientArray',//单元格保存内容的位置		
	    editurl: 'clientArray',
	    viewrecords: true,		           
	   	cellEdit:true,
	    width: "100%" ,
	    height: $(window).height()*0.30,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow:false,  //设置表格显示表脚
		userDataOnFooter:false,//设置userData 显示在footer里
		onCellSelect:function(id,index,e){
			
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow; 
			lastcell = iCol;
		},
		gridComplete: function() {
		
		},
		loadComplete:function(){
			
		}
	})
}
//第三方券初始化完毕
/*
 * 增值服务初始化
 */
function serviceInit(){
	$('#jqGrid_serve').jqGrid({
		mtype:'post',
		datatype:"local",
		jsonReader:{	
			root: "row",
			repeatitems: false
		},
		colNames:['id','操作','服务名称','关联串号','关联串号id','关联会员卡号','实际收款','应付金额','备注','关联原单明细','顔色','商品Id','类型','原实例id','服务Id','单据明细'],          
		colModel:[
         	{name:'id',index:'id', width:100,align:'center',hidden:true},
         	{name:'operate',index:'operate',width:50,align:'center',formatter:function(cellvalue,options,rowObject){
         		var addAndDel = '<div><span data-gid='+options.gid+' data-rid='+options.rowId+' class="glyphicon glyphicon-trash addServiceDele" title="删除行"></span></div>';
				return addAndDel;
         	}},
          	{name:'serviceName',index:'serviceName', width:200,align:'center',sortable:false},
			{name:'imei',index:'imei', width:200,align:'center', sorttype:'string',sortable:false},
			{name:'imeiId',index:'imeiId', width:100,align:'center', sorttype:'string',sortable:false,hidden:true},
			{name:'cardNum',index:'cardNum', width:200,align:'center', sorttype:'string',sortable:false},
			{name:'actualAmount',index:'actualAmount', width:100,align:'center',sortable:false,},
			{name:'yfAmount',index:'yfAmount', width:100,align:'center',  sorttype:'float',editable:true,formatter:"number",sortable:false,editoptions: {
	            dataEvents: [{
	                type: "blur",
	                fn: function(){
		    			$("#jqGrid_serve").jqGrid("saveCell", lastrow, lastcell);
	                }
	            }]
	        }},
			{name:'remark',index:'remark', width:300,align:'center',  sorttype:'string',editable:true,sortable:false,editoptions: {
	            dataEvents: [{
	                type: "blur",
	                fn: function(){
		    			$("#jqGrid_serve").jqGrid("saveCell", lastrow, lastcell);
	                }
	            }]
	        }},
			{name:'serviceInstanceId',index:'serviceInstanceId', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
			{name:'goodsColor',index:'goodsColor', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
			{name:'goodsId',index:'goodsId', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
			{name:'goodsModel',index:'goodsModel', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
			{name:'oldInstanceId',index:'oldInstanceId', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
			{name:'serviceId',index:'serviceId', width:150,align:'center', sorttype:'string',sortable:false,hidden:true},
			{name:'retailDetailId',index:'retailDetailId', width:150,align:'center', sorttype:'string',sortable:false,hidden:true}
        ],
		sortable:false,			            
		rownumbers:true,
		cellsubmit: 'clientArray',//单元格保存内容的位置		
		editurl: 'clientArray',
		viewrecords: true,		           
		cellEdit:true,
		multiselect:true,
		height: $(window).height()*0.30,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow:false, //设置表格显示表脚
		loadComplete:function(){
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			lastrow = iRow; 
			lastcell = iCol;
		},
		gridComplete:function(){
		}
	})
}
//增值服务详情
$(document).on('click','.seeDetail',function(e){
	$('#jqGrid_serveDetail').jqGrid('clearGridData');
	var ids=$('#jqGrid_serve').jqGrid('getGridParam','selarrrow');
	var arr=[];
	if(ids.length==0){
		$.zxsaas_plus.showalert('warning','请勾选后再查看详情！！！');
		return;
	}
	for(var i=0,len=ids.length;i<len;i++){
		arr.push($('#jqGrid_serve').jqGrid('getCell',ids[i],'serviceInstanceId'));
	}
	var arr=arr.filter_(function(item,index){
		return item!='';
	})
	if(!arr.length){
		$.zxsaas_plus.showalert('error','没有增值服务');
		return;
	}
	$('#serveDetail').modal('show');
	$.each(arr,function(index,item){
		$.request({
			url:basePath+"/retail/refund/searchRefAddServiceDetailVoList",
			type:'get',
			dataType:'json',
			async:false,
			data:{
				sectionId:$('#sectionId option:selected').val(),
				serviceInstanceIds:item,
			},
			success:function(data){
				for(var j=0,dataLen=data.data.goodsAddServiceDetailVoList.length;j<dataLen;j++){
					var serviceListId=$('#jqGrid_serveDetail').jqGrid('getDataIDs');
					var maxserviceId=serviceListId.length==0?0:Math.max.apply(null,serviceListId);
					$("#jqGrid_serveDetail").jqGrid("addRowData",maxserviceId+1,data.data.goodsAddServiceDetailVoList[j],"last");
				}
			}
		})
	})
});
/**
 * 增值服务移除
 */
$(document).on('click','.addServiceDele',function(){
	var rowId=$(this).data('rid');
	var gid=$(this).data('gid');
	if($('#'+gid+' tr').length==2){
		$.zxsaas_plus.showalert('warning','至少保留一行！！！')
	}else{
		$.zxsaas_plus.showconfirm('提示','确定删除吗？？',function(){
			$('#'+gid).delRowData(rowId);
		})
	}
})
//	增值服务
function loadmodalServe(urlData,tName,flag){
	var options = {
		LoadBtnUrl: basePath+"/json/button.json", //按钮工具栏加载地址
		LoadTableUrl: urlData,
		TableName: tName, //显示表格名称。遵照css选择器书写
	};
	var colNames = [];
	var JqGridColModel = [];
	var colNamesDetail = ['ID','服务名称','生效日期','有效期限','效期内使用次数','商品编码','商品名称','颜色','型号','手机串号','会员卡号','零售单号','预设售价','会员价','实际收款','备注','服务流水号'];
	var JqGridColModelDetail=[
		{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
		{name:'serviceName',index:'serviceName', width:100,align:'center', sorttype:'string',sortable:false},
		{name:'billsDate',index:'billsDate', width:100,align:'center', sortable:false,editable: true,editoptions:{
            dataInit:function(e){
                $(e).datetimepicker({
				  lang:"ch",          
			      format:"Y-m-d",      
			      timepicker:false,    
			      todayButton:false    
				});
            }
        }},
		{name:'serviceDue',index:'serviceDue', sorttype:'integer', width:100,align:'center',sortable:false,editoptions:{
            dataInit:function(e){
                $(e).datetimepicker({
				  lang:"ch",      
			      format:"Y-m-d", 
			      timepicker:false,
			      todayButton:false 
				});
            }
        }},
		{name:'userNum',index:'userNum', sorttype:'integer', width:100,align:'center',sortable:false},
		{name:'goodsCode',index:'goodsCode', sorttype:'integer', width:100,align:'center',sortable:false},
		{name:'goodsName',index:'goodsName', width:100,align:'center',sortable:false},
		{name:'goodsColor',index:'goodsColor', width:60,align:'center',  sorttype:'string',sortable:false},
		{name:'goodsModel',index:'goodsModel', width:80,align:'center',  sorttype:'string',sortable:false},
		{name:'imei',index:'imei', width:100,align:'center',  sorttype:'string',sortable:false},
		{name:'cardNum',index:'cardNum', width:100,align:'center',  sorttype:'string',sortable:false},
		{name:'billsCode',index:'billsCode', width:100,align:'center',  sorttype:'string',sortable:false},
		{name:'setPrice',index:'setPrice', width:100,align:'center',  sorttype:'number',sortable:false},
		{name:'feeScale',index:'feeScale', width:100,align:'center',  sorttype:'number',sortable:false},
		{name:'actualAmount',index:'actualAmount', width:100,align:'center',  sorttype:'float',formatter:"number",sortable:false},
		{name:'remark',index:'remark', width:100,align:'center', sorttype:'string',sortable:false},
		{name:'serviceInstanceNo',index:'serviceInstanceNo', width:100,align:'center', sorttype:'string',sortable:false}
    ];
	var colNamesJ = ['操作','ID','服务名称','关联序号','关联会员卡号','实际收款','应付金额','备注','关联原单明细'];
	var JqGridColModelJ=[
		{name:'deliveryDo',index:'deliveryDo', width:70,align:'center',formatter: addAndDelete,sortable:false},
		{name:'id',index:'id', width:200,align:'center', sorttype:'int',hidden:true,sortable:false},
		{name:'serveName',index:'serveName', width:80,align:'center', sorttype:'string',sortable:false},
		{name:'conNo',index:'conNo', width:200,align:'center',sortable:false},
		{name:'card',index:'card', width:100,align:'center',  sorttype:'string',sortable:false},
		{name:'practicalMoney',index:'practicalMoney', width:100,align:'center',  sorttype:'float',formatter:"number",editable:true,sortable:false},
		{name:'handleMoney',index:'handleMoney', width:100,align:'center',  sorttype:'float',formatter:"number",sortable:false},
		{name:'remark',index:'remark', width:100,align:'center', sorttype:'string',editable:true,sortable:false},
		{name:'serialNumber',index:'serialNumber', width:100,align:'center', sorttype:'string',sortable:false}
    ];
	if(flag){
		colNames = colNamesJ;
		JqGridColModel = JqGridColModelJ;
	}else{
		colNames = colNamesDetail;
		JqGridColModel = JqGridColModelDetail;
	}
	loadtable();
	function loadtable(){
		$(options.TableName).jqGrid({
			url:options.LoadTableUrl,
			mtype:"GET",
			datatype: "local",
			jsonReader  : {	
				root: "rows",
				repeatitems: false
			},
			colNames:colNames,          
            colModel:JqGridColModel,
            sortable:false,			            
            rownumbers:true,
            cellsubmit: 'clientArray',//单元格保存内容的位置		
            editurl: 'clientArray',
            rowNum: 15,
            rowList: [10, 15, 20, 25, 40],
            pager:options.pager,
            viewrecords: true,		           
           	cellEdit:true,
            width: "100%" ,
            height: $(window).height()*0.25,
			autowidth:true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			footerrow:true,  //设置表格显示表脚
			userDataOnFooter:true,//设置userData 显示在footer里
			beforeEditCell:function(rowid,cellname,v,iRow,iCol){
				lastrow = iRow;
				lastcell = iCol;
			},
			onCellSelect:function(id,index,e){
				var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
		      	select_name=colName
		      	select_index=index;
			},
			gridComplete: function() {
				var ids=$(options.TableName).jqGrid("getDataIDs");
			},
			loadComplete:function(){
				var arr = document.querySelectorAll('.goodsName');
				for(var i = 0,len = arr.length;i < len;i ++){
					(arr[i].dataset.rid == '') && (arr[i].className = 'goodsName');
					(arr[i].dataset.rid == '') && (arr[i].dataset.target = '');
				}
				$('.goodsRid').attr('readonly',true);
				$('.numberRid').attr('readonly',true).removeAttr('id');
				totalAll.totalCalc();
				$('.footrow td:first-child').html('合计');
			},
			loadError:function(xhr,status,error){
			}
		})
	}
		
	function addAndDelete(cellvalue, options, rowObjec){
		var addAndDel = '<div class="operating" data-id="' + options.rowId + '" data-gId="' + rowObjec.goodsId + '"><span style="margin-right:0.7rem" id="remove_row" title="添加" class="glyphicon glyphicon-plus addRowServe"></span><span class="glyphicon glyphicon-trash trashServe" aria-hidden="true" id="add_row" title="删除行"></span></div>';
		return addAndDel;
	}
	//新增一行
	$(document).on('click', '.addRowServe',function(e){
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		var ids = $(options.TableName).jqGrid('getDataIDs');
		//获得当前最大行号（数据编号）
		var maxid;
		maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
		//当用户点击表格最后一行时,自动增加一行
		(rowId == maxid && rowId != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' )
		$('.goodsRid'+(maxid+1)).val('');
		$('.t'+(maxid+1)).html(0);
		$('.y'+(maxid+1)).html(0);
	});
	//删除一行
	$(document).on('click', '.trashServe',function(e){
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		if(thisTitle == "删除行"){
			if($(options.TableName+' tbody tr').length === 2) {
				$.zxsaas_plus.showalert("warning","至少保留一条数据!")
				return false;
			}
			$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
				var rData = $(options.TableName).jqGrid('getRowData',rowId);
				$(options.TableName).jqGrid('delRowData', rowId);
			},function(){
				
			});
		}
	});
	//检测输入的是否为数字
	function checkNumber(value, colname) {
		var reg = /^[1-9]\d*$/;
		var arr = [];
		arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
		return arr;
	}
}
/**
 * 引入原单的表格的初始化
 */
function billGridInit(){
	$('#billGrid').jqGrid({
		mtype:"post",
		datatype: "local",
		jsonReader  : {	
			root: "data.soldGoodsVoList",
			id:'0',
			repeatitems: false
		},
		colNames:['串号','串号id','辅助串号','是否串号管理','零售单号','业务日期','商品编码','商品名称','型号','颜色','客户姓名','联系电话','零售明细','主表单id','商品id'],          
        colModel:[
			{name:'imei',index:'imei', width:150,align:'center',sortable:false},
			{name:'imeiId',index:'imeiId', hidden:true},
			{name:'auxiliaryImei',index:'auxiliaryImei', width:150,align:'center',sortable:false},
			{name:'ifManageImei',index:'ifManageImei', width:70,align:'center',sortable:false,formatter:'select',editoptions:{value:"0:×;1:√"}},
			{name:'billsCode',index:'billsCode', width:200,align:'center',sortable:false},
			{name:'billsDate',index:'billsDate', width:100,align:'center',sortable:false},
			{name:'code',index:'code', width:100,align:'center',sortable:false},
			{name:'name',index:'name', width:100,align:'center',sortable:false},
			{name:'models',index:'models', width:100,align:'center',sortable:false},
			{name:'color',index:'color', width:100,align:'center',sortable:false},
			{name:'customerName',index:'customerName', width:100,align:'center',sortable:false},
			{name:'customerTel',index:'customerTel', width:120,align:'center',sortable:false},
			{name:'retailDetailId',index:'retailDetailId', width:120,align:'center',sortable:false,hidden:true,hidedlg:true},
			{name:'retailMainId',index:'retailDetailId', width:120,align:'center',sortable:false,hidden:true,hidedlg:true},
			{name:'id',index:'id', width:120,align:'center',sortable:false,hidden:true},
		],
		prmNames : {  
		   page:null,    // 表示请求页码的参数名称  
	       rows:null,    // 表示请求行数的参数名称  
	       sort: null, // 表示用于排序的列名的参数名称  
	       order: null, // 表示采用的排序方式的参数名称  
	       search:null, // 表示是否是搜索请求的参数名称  
	       nd:null, // 表示已经发送请求的次数的参数名称  
	       id:null // 表示当在编辑数据模块中发送数据时，使用的id的名称   
        },
        sortable:false,			            
        rownumbers:true,
        multiselect : true,
        multiboxonly: true,//是否可以同时多选
        cellEdit:false,
        rowNum:-1,
        viewrecords: true,		           
       	cellEdit:false,
        width: "100%" ,
        height: $(window).height()*0.45,
		autowidth:true,
		rownumWidth: 35, // the width of the row numbers columns
		shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
		footerrow:true,  //设置表格显示表脚
		userDataOnFooter:true,//设置userData 显示在footer里
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
		},
		onCellSelect:function(id,index,e){
		},
		gridComplete: function() {
		},
		loadComplete:function(){
			$('#cb_billGrid').attr('disabled',true);
		},
		loadError:function(xhr,status,error){
		},
		onSelectRow:function(rowid,status,e){
			if(status){
				var myMainId=$(this).jqGrid('getCell',rowid,'retailMainId');
				var rowIdList=$(this).jqGrid('getGridParam','selarrrow');
				var tempId=$(this).jqGrid('getCell',rowIdList[0],'retailMainId');
				if(myMainId!==tempId){
					$(e.target).click();
					$.zxsaas_plus.showalert("warning","不能同时选中不同单据!");
				}
			}
		},
		onSelectAll:function(rowList,status,e){
			if(status){
				$('#cb_billGrid').prop('checked',false);				
			}
		}
	})
	$('.billgrid div').css('width','auto');
}
/**
 * 全选触发事件
 */
/**
 * 加号点击事件
 */
var selectId='';//选中后暴露的全局行id
var checkedList=[];
$(document).on('click','.goodsName',function(){
	selectId=$(this).data('rid');
})
$('#barcodepro').jqGrid({
    url:basePath+'/inventory/common/getGoodsBarcodeVoList',
    mtype: "post",
    datatype: "local",
    jsonReader: {
        root: "data.goodsBarcodeVoList", 
        total: "data.total",
        records: "data.records",
        repeatitems: false
    },
    colNames:['条码', '商品编码', '商品名称', '类别','型号', '颜色', '仓库','goosid','条码id','零售价'],
    colModel:[
        {name: 'barcode', index: 'barcode',align: 'center',sortable: false,width:150},
        {name: 'code', index: 'code',align: 'center',sortable: false,width:200},
        {name: 'name', index: 'name',align: 'center',sortable: false,width:200},
        {name: 'brandName', index: 'brandName',align: 'center',sortable: false,width:80},
        {name: 'models', index: 'models',align: 'center',sortable: false,width:200},
        {name: 'color', index: 'color',align: 'center',sortable: false,width:100},
        {name: 'categoryName', index: 'categoryName',align: 'center',sortable: false,width:200},
        {name: 'goodsId', index: 'goodsId',hidden:true},
        {name: 'barcodeId', index: 'barcodeId',hidden:true},
        {name: 'retailPrice', index: 'retailPrice',hidden:true}
    ],
    sortable:false,
    rownumbers:true,
    cellsubmit:'clientArray', //单元格保存内容的位置		
    editurl:'clientArray',
    rowNum:-1,
    viewrecords:true,
    multiselect:false,
    cellEdit:true,
    width:"auto",
    height:350,
    autowidth:true,
    rownumWidth:35,
    shrinkToFit:false,
    footerrow:false,
    userDataOnFooter:true,
    ondblClickRow: function(rowid){
    	var ids=$("#jqGrid_SubjectBalance").jqGrid("getDataIDs");
    	var idxgoodsid=$("#barcodepro").jqGrid("getRowData",rowid).goodsId;
    	var addnew=false;
		$.each($("#jqGrid_SubjectBalance").getCol('goodsId',true),function(j,jj){
			if(jj.value==idxgoodsid){
				var mm=$("#jqGrid_SubjectBalance").jqGrid("getRowData",jj.id).goodsNum;
				$("#jqGrid_SubjectBalance").jqGrid("setCell",jj.id,"goodsNum",Number(mm)+1);
				addnew=false;
				return false;
			}else{
				addnew=true
			}
		})
		if(addnew){
			var val=$("#barcodepro").jqGrid("getRowData",rowid);
			var maxId = ids.length == 0 ? 0 : Math.max.apply(null,ids);
			$('#jqGrid_SubjectBalance').jqGrid('addRowData',maxId+1,{
				goodsId:val.goodsId,
				categoryName:val.categoryName,
				code:val.code,
				brandName:val.brandName,
	            name:val.name,
	            models:val.models,
	            color:val.color,
	            goodsNum:1,
	            totalThridTicketAmount:''
	        }, 'last');
			$.each($("#jqGrid_SubjectBalance").getCol('goodsId',true),function(j,jj){
				if(jj.value==''){
					$('#jqGrid_SubjectBalance').jqGrid('delRowData',jj.id);
				}
			})
		}
		$('#myModal_barcodepro').modal('hide');
		$('#searchInput').val('').focus()
    },
    beforeEditCell: function(rowid, cellname, v, iRow, iCol){
        lastrow = iRow;
        lastcell = iCol;
    },
    afterSaveCell: function(rowid, cellname, value, iRow, iCol){},
    onCellSelect: function(id, index, e){
    },
    onSelectRow: function(id){
    },
    beforeSelectRow: function(rowid, e){
    },
    afterInsertRow: function(rowid, aData){ //新增一行之后
    },
    gridComplete:function(){
    },
    loadComplete: function(data){
    },
    loadError: function(xhr,status,error){
    }
})
$('#myModal_barcodepro,#goodsChoose').on('shown.bs.modal', function (e) {
	$('.jqGrid_wrap div').css('width','auto')
})
/**
 * 搜索输入框的切换
 */
var searchState=2;//搜索状态，默认商品
$('#searchInput').keyup(function(e){
	if(e.ctrlKey&&e.keyCode==18){
		if(searchState==1){
			searchState=2;//商品
			$('.tip').html('请录入条码')
		}else{
			searchState=1;//会员
			$('.tip').html('请录入会员卡号或手机号、微信号、支付宝账号')
		}
	}
	if(e.keyCode==13){
		if(searchState==2){
			$.request({
	        	type:'post',
	        	url:basePath+'/inventory/common/getGoodsBarcodeVoList',
	        	data:{
	        		queryKey:$('#searchInput').val()
	        	},
	        	dataType:'json',
	        	success:function(data){
	        		if(data.result==1){
	        			var resArr=data.data.goodsBarcodeVoList;
	        			if(!resArr.length){
	        				$.zxsaas_plus.showalert("warning",'没有查询到商品!')
	        				return;
	        			}else if(resArr.length==1){
	        				var val=resArr[0];
	        				var idxgoodsid=resArr[0].goodsId;
	        				var ids=$("#jqGrid_SubjectBalance").jqGrid("getDataIDs");
	        				var addnew=false;
	        				$.each($("#jqGrid_SubjectBalance").getCol('goodsId',true),function(j,jj){
								if(jj.value==idxgoodsid){
									var mm=$("#jqGrid_SubjectBalance").jqGrid("getRowData",jj.id).goodsNum;
									$("#jqGrid_SubjectBalance").jqGrid("setCell",jj.id,"goodsNum",Number(mm)+1);
									addnew=false;
									return false;
								}else{
									addnew=true
								}
							})
							if(addnew){
								var maxId = ids.length == 0 ? 0 : Math.max.apply(null,ids);
								$('#jqGrid_SubjectBalance').jqGrid('addRowData',maxId+1,{
									categoryName:val.categoryName,
									brandName:val.brandName,
									goodsId:val.goodsId,
									categoryName:val.categoryName,
									code:val.code,
									brandName:val.brandName,
						            name:val.name,
						            models:val.models,
						            color:val.color,
						            goodsNum:1,
						            totalThridTicketAmount:'',
						            billsCode:val.billsCode,
						            ifManageImei:val.ifManageImei,
						            ifEnableAuxiliaryImei:val.ifEnableAuxiliaryImei,
						            imeiLength:val.imeiLength,
						            auxiliaryImeiLength:val.auxiliaryImeiLength
						        }, 'last');
								$.each($("#jqGrid_SubjectBalance").getCol('goodsId',true),function(j,jj){
									if(jj.value==''){
										$('#jqGrid_SubjectBalance').jqGrid('delRowData',jj.id);
									}
								})
							}
	        				$('#searchInput').val('').focus()
	        			}else{
	        				$('#myModal_barcodepro').modal('show');
	        				$("#barcodepro").jqGrid('setGridParam', {
	        					url:basePath+'/inventory/common/getGoodsBarcodeVoList',
	        					datatype:'json',
	        					postData:{queryKey:$('#searchInput').val()}
	        				}).trigger("reloadGrid");
	        				$('#searchInput').val('').focus()
	        			}
	        		}else{
	        			$.zxsaas_plus.showalert("error",data.desc)
	        		}
	    		},
	    		error:function(){
	    			alert('请求失败！')
	    		}
	        })
		}else{
			$('#myModal_rb_MQR').modal('show');
			$.request({
				url:basePath+'/retail/refund/searchCustomerVoList',
				type:'get',
				dataType:'json',
				data:{
	    			queryKey:$(this).val()
	    		},
				success:function(data){
	    			var rb_MQR=data.data.customerVoList;
	        		var html;
	        		if(rb_MQR.length==0){
	        			$("#rb_MQR tbody").html('')
	        		}else{
	        			$.each(rb_MQR,function(i,val){
	        				for(var k in val){
	        					if(val[k]==null)val[k]='';
	        				}
	        				var tempVal=JSON.stringify(val);
	            			html+='<tr>'+
	            			'<td><a class="rb_MQR_choose" href="javascript:void(0)">选择</a></td>'+
	                        '<td class="rb_MQR_cardNum">'+val.cardNum+'</td>'+
	                        '<td class="rb_MQR_customerName">'+val.customerName+'</td>'+
	                        '<td class="rb_MQR_customerTel">'+val.customerTel+'</td>'+
	                        '<td class="rb_MQR_customerType">'+val.customerType+'</td>'+
	                        '<td class="rb_MQR_contactUnitName">'+val.contactUnitName+'</td>'+
	                        '<td class="rb_MQR_remark">'+val.remark+'</td>'+
	                        '<input class="rb_MQR_cardTypeId" type="hidden" value="'+val.cardTypeId+'"/>'+
	                        '<input class="rb_MQR_memberId" type="hidden" value="'+val.cardId+'"/>'+
	                        '<input class="rb_MQR_customerAmount" type="hidden" value="'+val.customerAmount+'"/>'+
	                        '<input class="rb_MQR_customerScore" type="hidden" value="'+val.customerScore+'"/>'+
	                        '<input class="rb_MQR_dAmount" type="hidden" value="'+val.dAmount+'"/>'+
	            			'<input class="rb_MQR_dScore" type="hidden" value="'+val.dScore+'"/></tr>';
	            		})
	            		$("#rb_MQR tbody").html(html);
	        		}
	    		}
			})
		}
	}
})
/**
 * 模态窗点击后的操作
 */
$(document).on('click','.rb_MQR_choose',function(){
	var _this=$(this);
	var tr=_this.closest('tr')
	$('#cardNum').val(tr.find('.rb_MQR_cardNum').text())
	$('#cardId').val(tr.find('.rb_MQR_memberId').val())
	$('#customerName').val(tr.find('.rb_MQR_customerName').text())
	$('#customerTel').val(tr.find('.rb_MQR_customerTel').text())
	$('#customerType').val(tr.find('.rb_MQR_customerType').text())
	$('#customerAmount').val(Number(tr.find('.rb_MQR_customerAmount').val()))
	$('#customerScore').val(Number(tr.find('.rb_MQR_customerScore').val()))
	$('#dAmount').val(Number(tr.find('.rb_MQR_dAmount').val()))
	$('#dScore').val(Number(tr.find('.rb_MQR_dScore').val()))
	
	$('#myModal_rb_MQR').modal('hide');
	$('#addAdminForm').bootstrapValidator('resetForm', false);//为true时清空表单内容
	$('#addAdminForm').data('bootstrapValidator').validate();
    if (!$('#addAdminForm').data('bootstrapValidator').isValid()) {
        return;
    }else{
    	$('#customerName,#customerTel').prop('disabled',true);
    }
})
/**
 * 原单引入事件
 */
$(document).on('click','#billBtn',function(){
	$('#billImport').modal('show');
	$('#billGrid').setGridParam({
		url:basePath+'/retail/refund/searchSoldGoodsVoList',
		datatype: "json",
		postData:{
			memberId:$('#cardId').val(),
			sectionId:$('#sectionId option:selected').val()
		}
	}).trigger("reloadGrid");
})
/**
 * 原单引入的快速过滤
 */
$('#fastFilter').keyup(function(e){
	if(e.keyCode==13){
		$('#billGrid').setGridParam({
			url:basePath+'/retail/refund/searchSoldGoodsVoList',
			datatype: "json",
			postData:{
			memberId:$('#cardId').val(),
			sectionId:$('#sectionId option:selected').val(),
			queryKey:$(this).val()
			}
		}).trigger("reloadGrid");
	}
})
/**
 * 原单引入的确定控件
 */
$('#billSure').click(function(){
	var ids=$('#billGrid').jqGrid('getGridParam','selarrrow');
	if(ids.length==0){
		$.zxsaas_plus.showalert("warning","未勾选!");
		return false
	}else{
		$("#jqGrid_serve").jqGrid("clearGridData");
		var arr=[];
		var dataList=[];
		var retailMainIdList=$("#jqGrid_SubjectBalance").jqGrid('getCol','retailMainId');
		var tempRetailMainId=$('#billGrid').jqGrid('getRowData',ids[0]).retailMainId;
		var retailMainIdListTemp=[];
		var IDs=$("#jqGrid_SubjectBalance").jqGrid("getDataIDs");
		$.each(retailMainIdList,function(index,item){
			if(item!=0){
				retailMainIdListTemp.push(item);
			}
		})
		if(retailMainIdListTemp.length!=0&&retailMainIdList.indexOf(tempRetailMainId)==-1){
			$.zxsaas_plus.showalert("warning","无法引入单据号不相同的商品!");
			return false;
		}else{
			$('#customerName').val($('#billGrid').jqGrid('getRowData',ids[0])['customerName']);
			$('#customerTel').val($('#billGrid').jqGrid('getRowData',ids[0])['customerTel']);
		}
		for(var i=0; i < IDs.length; i++){
			var rowData = $("#jqGrid_SubjectBalance").jqGrid("getRowData",IDs[i]);//根据行ID得到行数据
			if($('#billGrid').jqGrid('getRowData',ids[0])['retailDetailId']==rowData['retailDetailId']){
				$.zxsaas_plus.showalert("warning","不允许重复引入!");
				return false;
			}
		}
		for(var i=0,len=ids.length;i<len;i++){
			arr.push($('#billGrid').jqGrid('getCell',ids[i],'retailDetailId'));
			dataList.push($('#billGrid').jqGrid('getRowData',ids[i]));
		}
		for(var j=0,tempLen=arr.length;j<tempLen;j++){
			$.request({
				url:basePath+'/retail/refund/loadSoldGoodsDetailVo',
				type:'post',
				async:false,
				data:{
					retailDetailId:arr[j],
					sectionId:$('#sectionId option:selected').val()
				},
				success:function(data){
					var thridTicketTotal=0;
					for(var k in data.data.soldGoodsDetail){
						dataList[j][k]=data.data.soldGoodsDetail[k];
					}
					$.each(data.data.thridTicketVoList,function(index,item){
						thridTicketTotal+=item.amount;
					})
					dataList[j]['thridTicketVoList']=JSON.stringify(data.data.thridTicketVoList);
					dataList[j]['totalThridTicketAmount']=thridTicketTotal;
					dataList[j]['ifImport']=1;
					dataList[j]['maxNum']=dataList[j]['goodsNum'];
				}
			})
		}
		if(arr.length)serviceDraw($('#sectionId option:selected').val(),$('#cardId').val(),arr[0]);
		for(var t=0,mainLen=dataList.length;t<mainLen;t++){
			var ids=$("#jqGrid_SubjectBalance").jqGrid('getDataIDs');
			var maxID=Math.max.apply(null,ids);
			$("#jqGrid_SubjectBalance").jqGrid("addRowData",maxID+1,dataList[t],"last");
			$.each(ids,function(i,val){
				if($("#jqGrid_SubjectBalance").jqGrid("getRowData",ids[i]).name==''){
					$('#jqGrid_SubjectBalance').jqGrid('delRowData',ids[i]);
				}
			})
		}
		$('#billImport').modal('hide');
	}
})
/**
 * 原单引入确定点击后增值服务表格
 */
function serviceDraw(sectionId,memberId,retailDetailId){
	$.request({
		url:basePath+'/retail/refund/searchRefAddServiceVoList',
		type:'get',
		dataType:'json',
		async:false,
		data:{
			sectionId:sectionId,
			memberId:memberId,
			retailDetailId:retailDetailId
		},
		success:function(data){
			var retailList=$("#jqGrid_serve").jqGrid('getCol','serviceInstanceId').map(function(item,index){
				return item*1;
			});
			$.each(data.data.goodsAddServiceVoList,function(index,item){
				var serviceListId=$('#jqGrid_serve').jqGrid('getDataIDs');
				var maxserviceId=serviceListId.length==0?0:Math.max.apply(null,serviceListId);
				var obj={};
//				if(retailList.indexOf(data.data.goodsAddServiceVoList[index].serviceInstanceId)!=-1){
//					$.zxsaas_plus.showalert("warning","增值服务相同！！");
//				}else{
					for(var k in data.data.goodsAddServiceVoList[index]){
						obj[k]=data.data.goodsAddServiceVoList[index][k];
					}
					obj['retailDetailId']=retailDetailId;
					$("#jqGrid_serve").jqGrid("addRowData",maxserviceId+1,obj,"last");
//				}
			})
		}
	})
}
$(document).on('keyup','.payMethods',function(){
	var totalPay=0;
	var settleReceivable=$('#settle_receivable').html();
	if($(this).attr('id')=='deductionMoney'){
		var scale=$('#arrivalStandard span:eq(0)').html()/$('#arrivalStandard span:eq(1)').html();
		$('#deductionScore').val($(this).val()*scale);
	}
	$('.payMethods').each(function(index,item){
		totalPay+=Number($(item).val());
	})
	$('#settle_thisTime').html(totalPay.toFixed(2));
	$('#settle_balance').html((settleReceivable-totalPay).toFixed(2));
})
$('#memberAmount').keyup(function(e){
	if(Number($(this).val())>Number($('#settle_storedValue').html()))$(this).val($('#settle_storedValue').html());
})
$('#deductionMoney').keyup(function(e){
	if(Number($(this).val())>Number($('#settle_storedValue').html()))$(this).val($('#settle_storedValue').html());
})
/**
 * 输入积分时的情况
 */
$('#deductionScore').keyup(function(){
	if(Number($(this).val())>Number($('#settle_availableIntegral').html()))$(this).val($('#settle_availableIntegral').html());
	var totalPay=0;
	var settleReceivable=$('#settle_receivable').html();
	var scale=$('#arrivalStandard span:eq(0)').html()/$('#arrivalStandard span:eq(1)').html();
	var total=Math.round($(this).val()/scale);
	$('#deductionMoney').val(total);
	$('.payMethods').each(function(index,item){
		totalPay+=Number($(item).val());
	})
	$('#settle_thisTime').html(totalPay);
	$('#settle_balance').html(settleReceivable-totalPay);
})
/**
 * 输入积分失去焦点
 */
$('#deductionScore').blur(function(){
	var scale=$('#arrivalStandard span:eq(0)').html()/$('#arrivalStandard span:eq(1)').html();
	var totalPay=0;
	var settleReceivable=$('#settle_receivable').html();
	if($(this).val()%scale){
		var num=Math.floor($(this).val()/scale);
		$(this).val(num*scale);
		$('#deductionMoney').val(num);
		$('.payMethods').each(function(index,item){
			totalPay+=Number($(item).val());
		})
		$('#settle_thisTime').html(totalPay);
		$('#settle_balance').html(settleReceivable-totalPay);
	}
})
/**
 * pos机的确认
 */
$(document).on('click','.posSure',function(){
	var posTotal=0;
	$('.posAccount').each(function(item){
		posTotal+=Number($(this).val());
	})
	$('#pos').val(posTotal);
})
/**
 * 结算确定按钮
 */
$(document).on('click','#settle_sure',function(){
	$('#mainUnpaid').val($('#settle_balance').html());
	$('#paySettlement').val($('#settle_thisTime').html());
	var param=getParam();
	$.request({
		url:basePath+'/retail/refund/saveOrder',
		type:'post',
		data:{jsonData:JSON.stringify(param)},
		success:function(data){
			if(data.result==1||data.desc=='保存失败,错误信息:单据生成成功，生成凭证失败'){
				$.zxsaas_plus.showconfirmsure("提示","结算成功！！！",function(){
					window.location.href=basePath+'/retail/refund/retailRefundMain';
				})
			}else{
				$.zxsaas_plus.showalert('error',data.desc);
			}
		}
	})
})
/**
 * 新开单
 */
$('.addAudit').click(function(){
	window.location.href=basePath+'/retail/refund/retailRefundMain';
})
/**
 * 取页面数据
 */
function getParam(){
	var obj={};
	var serviceYfAmount=0;
	$.each($('#jqGrid_serve').jqGrid('getCol','yfAmount'),function(index,item){
		serviceYfAmount+=Number(item);
	})
	var mainGoodsIdList=$('#jqGrid_SubjectBalance').jqGrid('getDataIDs');
	var mainGoodsDatailList=$.map(mainGoodsIdList,function(item,index){
		var goodsObjTemp=$('#jqGrid_SubjectBalance').jqGrid('getRowData',item);
		var goodsObj={};
		goodsObj.amount=goodsObjTemp.amount*1;
		goodsObj.cost=goodsObjTemp.cost*1;
		goodsObj.cphoneFlag=goodsObjTemp.cphoneFlag*1;
		goodsObj.goodsNum=goodsObjTemp.goodsNum*1;
		goodsObj.ifGift=goodsObjTemp.giftFlag*1;
		goodsObj.imei=goodsObjTemp.imei;
		goodsObj.imeiId=goodsObjTemp.imeiId;
		goodsObj.auxiliaryImei=goodsObjTemp.auxiliaryImei;
		goodsObj.installmentFlag=goodsObjTemp.installFlag*1;
		goodsObj.price=goodsObjTemp.oldPrice*1;
		goodsObj.remark=goodsObjTemp.remark;
		goodsObj.storageId=goodsObjTemp.storageId*1;
		if(goodsObjTemp.retailMainId!='')goodsObj.oldRetailId=goodsObjTemp.retailMainId;
		goodsObj.retailDetailId=goodsObjTemp.retailDetailId*1;
		goodsObj.goodsId=goodsObjTemp.goodsId*1;
		//缺goodsId
		return goodsObj
	});
	var filterMainGoodsDatailList=mainGoodsDatailList.filter_(function(item,index){
		return item.goodsId!=0;
	})
	obj.goodsList=filterMainGoodsDatailList;
	var serviceIdList=$('#jqGrid_serve').jqGrid('getDataIDs');
	var serviceList=$.map(serviceIdList,function(item,index){
		var tempObj=$('#jqGrid_serve').jqGrid('getRowData',item);
		var serviceObj={};
		serviceObj.actualAmount=tempObj.yfAmount*1;
		serviceObj.cardNo=tempObj.cardNum;
		serviceObj.color=tempObj.goodsColor;
		serviceObj.goodsId=tempObj.goodsId*1;
		serviceObj.imei=tempObj.imeiId;
		serviceObj.model=tempObj.goodsModel;
		serviceObj.oldInstanceId=tempObj.serviceInstanceId*1;
		serviceObj.serviceId=tempObj.serviceId*1;
		return serviceObj;
	})
	var filterServiceList=serviceList.filter_(function(item,index){
		return item.serviceId!='';
	})
	obj.addServiceList=filterServiceList;
	//支付方式的數據
	obj.payList=[];
	$('#cash,#pos,#alipay,#weixin,#coupons,#memberAmount,#deductionMoney').each(function(index,item){
		var payModeobj={};
		if(!$(this).prop('disabled')){
			switch($(this).attr('id')){
			    case 'cash':
			    	payModeobj.accountType="1";
			    	payModeobj.payreceiptAmout=$(this).val()*1;
			    	payModeobj.accountId=$(this).data('accountid')*1;
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&obj.payList.push(payModeobj)
			    	break;
			    case 'pos':
			    		var posList=[];
			    	$('.posAccount').each(function(posIndex,posItem){
			    		if($(this).val()==0){
			    			
			    		}else{
				    		var posObj={};
				    		posObj.accountType="2";
				    		posObj.accountId=$(this).next('.posAccountId').val()*1;
				    		posObj.payreceiptAmout=$(this).val()*1;
				    		posObj.remark=$('#deductionRemark').val();
				    		posList.push(posObj);
			    		}
			    	})
			    	payModeobj.posList=posList;
			    	posList.length&&obj.payList.push(payModeobj)
			    	break;
			    case 'alipay':
			    	payModeobj.accountType="3";
			    	payModeobj.payreceiptAmout=$(this).val()*1;
			    	payModeobj.accountId=$(this).data('accountid')*1;
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&obj.payList.push(payModeobj)
			    	break;
			    case 'weixin':
			    	payModeobj.accountType="4";
			    	payModeobj.payreceiptAmout=$(this).val()*1;
			    	payModeobj.accountId=$(this).data('accountid')*1;
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&obj.payList.push(payModeobj)
			    	break;
			    case 'coupons':
			    	payModeobj.accountType="5";
			    	payModeobj.payreceiptAmout=$(this).val()*1;
			    	payModeobj.accountId=$(this).data('accountid')*1;
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&obj.payList.push(payModeobj)
			    	break;
			    case 'memberAmount':
			    	payModeobj.accountType="6";
			    	payModeobj.payreceiptAmout=$(this).val()*1;
			    	payModeobj.accountId=$(this).data('accountid')*1;
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&obj.payList.push(payModeobj)
			    	break;
			    case 'deductionMoney':
			    	payModeobj.accountType="7";
			    	payModeobj.payreceiptAmout=$(this).val()*1;
			    	payModeobj.accountId=$(this).data('accountid')*1;
			    	payModeobj.remark=$('#deductionRemark').val();
			    	$(this).val()&&obj.payList.push(payModeobj)
			    	break;
			}
		}
	})
	obj.sectionId=$('#sectionId').val()*1;     //部门Id
	obj.salesmanId=$('#employeeId').val()*1;   //营业员Id
	obj.billsDate=$('#datetimepickerStart').val();  //业务日期
	obj.customName=$('#customerName').val();  //会员名称
	obj.memberId=$('#cardId').val();       //会员ID
	obj.telephone=$('#customerTel').val(); //会员电话
	obj.wfAmount=$('#mainUnpaid').val()*1;   //未付金额
	obj.billsAmount=$('#payTotal').val()*1;  //单据金额
	obj.sfAmount=$('#paySettlement').val()*1;//实付金额
	obj.serviceYfAmount=serviceYfAmount*1;   //增值服务应付
	obj.billsTozero=$('#billsTozero').val()*1;//原单抹零
	obj.remark=$('#mainRemark').val();      //备注
	obj.totalYfAmount=$('#payTotal').val()*1;
	return obj;
}
/**
 * 单据查询
 */
function dataRender(data){
	if(data.data.orderDetailVo!=null&&data.data.orderDetailVo.length!=0){
		var orderDetailVo=data.data.orderDetailVo;
		isView=true;
		$('#billsStatus').val(orderDetailVo.billsStatus);//单据状态
		var addServiceList=orderDetailVo.addServiceList
		var goodsList=orderDetailVo.goodsList;
		collectionDetails=orderDetailVo.payRecieveDetailList;
		$('#disabledInput').val(orderDetailVo.billsCode);
		$('#sectionId').trigger('change',[orderDetailVo.sectionId,orderDetailVo.salesmanId]);
		$('#employeeId').find('option[value='+orderDetailVo.salesmanId+']').attr('selected',true);
		$('#datetimepickerStart').val(orderDetailVo.billsDate);
		$('#refId').val(orderDetailVo.id);
		$('.getMessage').each(function(index,item){
			$(this).val(orderDetailVo[$(this).attr('id')]);
		})
		$('#customerAmount').val(orderDetailVo.memberAmount);
		$('#paySettlement').val(orderDetailVo.sfAmount);
		$('#mainUnpaid').val(orderDetailVo.wfAmount);
		$('#payTotal').val(orderDetailVo.totalYfAmount);
		$('#customerType').val(orderDetailVo.memberType);
		$('#xAmount').val(orderDetailVo.memberAmount);
		$('#customerScore').val(orderDetailVo.memberScore);
		$('#billsTozero').val(orderDetailVo.billsTozero);
		$('#jqGrid_serve').jqGrid('clearGridData');
		$('#jqGrid_SubjectBalance tbody tr:eq(1)').remove();
		$.each(goodsList,function(index,item){
			var ids = $("#jqGrid_SubjectBalance").jqGrid("getDataIDs");
			var maxid = (ids.length ==0 ) ? 0 : Math.max.apply(null,ids);
			$('#jqGrid_SubjectBalance').jqGrid('addRowData',maxid+1,item,'last');
			$('#jqGrid_SubjectBalance').setCell(maxid+1,'installFlag',item.installmentFlag);
			$('#jqGrid_SubjectBalance').setCell(maxid+1,'giftFlag',item.ifGift);
			$('#jqGrid_SubjectBalance').setCell(maxid+1,'imei',item.imeiStr);
			$('#jqGrid_SubjectBalance').setCell(maxid+1,'oldPrice',item.price);
			$('#jqGrid_SubjectBalance').setCell(maxid+1,'oldAmount',item.price*item.goodsNum);
			$('#jqGrid_SubjectBalance').setCell(maxid+1,'billsCode',item.oldBillsCode);
		})
		$('#jqGrid_serve tbody tr:eq(1)').remove();
		$.each(addServiceList,function(index,item){
			$('#jqGrid_serve').jqGrid('addRowData',index+1,item,'last')
		})
		$('.clearData').attr('disabled',true);
		$('.clearTop').attr('disabled',true);
		$('#jqGrid_SubjectBalance').setGridParam({'cellEdit':false});
		$(document).off('click','.addRow');
		$(document).off('click','.delRow');
		$(document).off('click','#billBtn');
		$('#jqGrid_serve').setGridParam({'cellEdit':false});
		$('#revoke').prop('disabled',false);
		$('#mainRemark').val(data.data.orderDetailVo.remark)
		switch($('#billsStatus').val()){
		case '7':
			//已过账
			$('#statusRed').show();
			break;
		default:
			$('#statusRed').hide();
		}
	}else{
		$.zxsaas_plus.showalert('warning','查询不到单据!');
	}
}
$(document).on('click','.searchOtherBill',function(){
	var _this=$(this);
	var flag=_this.data('flag');
	var refId=$('#refId').val();
	var param={};
	if(flag=="L"||flag=="F"){
		param={queryCodeStr:flag}
	}else{
		param={queryCodeStr:flag,refBillsId:refId}
	}
	$.request({
		url:basePath+'/retail/refund/loadRefundsOrder',
		type:'get',
		dataType:'json',
		data:param,
		success:function(data){
			if(data.result==1){
				dataRender(data)
			}else{
				switch(_this.data('flag')){
				case 'F':
					$.zxsaas_plus.showalert('warning','查询不到单据!');
					break;
				case 'P':
					$.zxsaas_plus.showalert('warning','没有上单!');
					break;
				case 'N':
					$.zxsaas_plus.showalert('warning','没有下单!');
					break;
				case 'L':
					$.zxsaas_plus.showalert('warning','查询不到单据!');
					break;
				}
			}
		}
	})
})
$('#sectionId').on('change',function(e,sectionId,salesmanId){
	$(this).find('option[value='+sectionId+']').attr('selected',true);
    $.request({
        type: 'Post',
        url: basePath + '/aboutPeople/interfaceSelfCompanyEmployees',
        async:false,
        data: {
    		sectionId : $("#sectionId").val()
    	},
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
    		// 营业员
    		$("#employeeId option").remove();
    		$(data.data.empList).each(function(index,item){
    			if(item.id ==salesmanId){
    				$("#employeeId").append("<option selected value='" + item.id + "'>" + item.name + "</opion>");
    			}else{
    			$("#employeeId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
    			}
    		});
        },
        error: function () {
            alert("营业员加载失败！");
        }
    });
    //重载表格数据
    $("#jqGrid_SubjectBalance").jqGrid("clearGridData");
})
/**
 * 红冲
 */
function formatDate(){
	var date = new Date(); 
	var mon = date.getMonth() + 1;
	var day = date.getDate();
	var nowDay = date.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
	return nowDay;
}

$('#revoke').click(function(){
	if($('#refId').val()&&$('#billsStatus').val()==6){
		$('#redModel').modal('show');
		$("#redDate").val($("#datetimepickerStart").val())
    	getAuthList(billMainRedDate)
		function billMainRedDate(){
			$("#redDate").datetimepicker({
			lang:"ch",           //语言选择中文
			format:"Y-m-d",      //格式化日期
			timepicker:false,    //关闭时间选项
			todayButton:false,    //关闭选择今天按钮
			maxDate:_authList.maxDate,  //设置红冲最大时间
			minDate:$("#datetimepickerStart").val()
		});
		}
	}else{
		$.zxsaas_plus.showalert("warning","非正式单据不允许红冲!");
	}
})
$('#redModelSure').click(function(){
	$.request({
		url:basePath+"/retail/refund/redRefundsOrder",
		type:'post',
		dataType:'json',
		data:{
			billsId:$('#refId').val(),
			redDate:$('#redDate').val()
		},
		success:function(data){
			if(data.result==1){
				$.zxsaas_plus.showalert("success","红冲成功");
				$('#statusRed').show();
			}else{
				$.zxsaas_plus.showalert("error",data.desc);
			}
		},
		error:function(){
			alert('error')
		}
	})
	$('#redModel').modal('hide');
})
Array.prototype.filter_=function(callBack){
	var tempArr=[];
	for(var i=0,len=this.length;i<len;i++){
		callBack(this[i],i,this)&&tempArr.push(this[i]);
	}
	return tempArr;
}
/**
 * 验证
 */
function checkGoodsValue(){
	var passCheck=true;
	var IDs=$('#jqGrid_SubjectBalance').jqGrid("getDataIDs");
	for(var i=0,len=IDs.length;i<len;i++){
		var rowData=$('#jqGrid_SubjectBalance').getRowData(IDs[i]);
		if(rowData.goodsId==''){
			$.zxsaas_plus.showalert("warning","存在空商品！！");
			passCheck=false;
			break;
		}else{
			if(rowData.storageName==""){
				$.zxsaas_plus.showalert("warning","请填写入库仓库！！");
				passCheck=false;
				break;
			}
			if(rowData.goodsNum==0){
				$.zxsaas_plus.showalert("warning","商品数量不能为0！！");
				passCheck=false;
				break;
			}
			if(rowData.giftFlag!=1&&rowData.amount==0){
				$.zxsaas_plus.showalert("warning","请填写非赠品商品退款金额！！");
				passCheck=false;
				break;
			}
//			if(Number(rowData.cost)==0){
//				$.zxsaas_plus.showalert("warning","请填写入库成本！！");
//				passCheck=false;
//				break;
//				
//			}
			if(rowData.ifManageImei==1&&(rowData.imei=='')){
				$.zxsaas_plus.showalert("warning","请填写串号！！");
				passCheck=false;
				break;
			}
			if(rowData.ifEnableAuxiliaryImei==1&&(rowData.auxiliaryImei=='')){
				$.zxsaas_plus.showalert("warning","请填写辅助串号！！");
				passCheck=false;
				break;
			}
		}
	}
	return passCheck;
};
//由报表进入该页面，先执行根据单据编码查询单据的功能wxm
$(function(){
	if(billsCode!=""){
		var param={billsCode:billsCode};
		$.request({
    		type:'post',
        	url:basePath+'/retail/refund/loadRefundsOrder',
        	data:param,
        	dataType:'json',
        	success:function(data){
				dataRender(data)
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
})
//验证
    //客户姓名联系电话
    $('#addAdminForm').bootstrapValidator({
    	 message: 'This value is not valid',
         feedbackIcons: {
             valid: 'glyphicon glyphicon-ok',
             invalid: 'glyphicon glyphicon-remove',
             validating: 'glyphicon glyphicon-refresh'
         },
         fields:{
        	 customerName:{
        	 	validators: {
//		        	 notEmpty: {
//			             message: '不能为空'
//			         },
		             stringLength: {
		            	 min: 2,
		            	 max: 15,
		            	 message: '2-15位'
		             },
		             regexp: {
		            	 regexp: /^[a-zA-Z0-9\u4E00-\u9FA5]+$/,
		            	 message: '不允许特殊符号'
		             },
	         	},
         	},
         	customerTel:{
	        	 validators: {
//		     		 notEmpty: {
//			             message: '不能为空'
//			         },
		             regexp: {
		            	 regexp: /^1(3|4|5|7|8)\d{9}$/,
		            	 message: '手机号码格式错误'
		             },
	         	}
        	}
         }
    })

$('#searchInput').focus()
  //******************** 打印  **********************//
 function printFunction(){
  	var id = $('#refId').val();
  	if(id==""){
		$.zxsaas_plus.showalert("提示","请选择一张单据");
		return;
	}
  	$.printBills(basePath + '/retail/print/tuihuo',{billsId:id});
  }


