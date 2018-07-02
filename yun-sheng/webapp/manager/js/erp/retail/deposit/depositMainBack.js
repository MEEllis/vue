var isView=false;//单据状态，true为查询，false为操作
var collectionDetails=null;//收款明细
var mainScope={
		init:function(){
			this.gridInit();
			this.timeInit();
			this.popInit();
		},
		/*表格初始化*/
		gridInit:function(){
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			$("#mainGrid").jqGrid({
				url:"",
				mtype:"GET",
				datatype: "local",				
				jsonReader  : {	
					root: "undo",
					repeatitems: false
				},
				colNames:['主单ID','零售ID','商品ID','商品类别','商品编码','商品名称','品牌','型号','颜色','零售价','预售价','数量','退定数量','原定金','剩余定金','退定金额','收定营业员','备注'],          
			    colModel:[
	              	{name:'depositMainId',index:'depositMainId',sortable:false,hidden:true},
	              	{name:'depositId',index:'depositId',sortable:false,hidden:true},
	              	{name:'id',index:'id',sortable:false,hidden:true},
	              	{name:'categoryName',index:'categoryName',sortable:false,width:200,align:'center'},//商品类别
					{name:'code',index:'code',sortable:false,width:150,align:'center'},
					{name:'name',index:'name',sortable:false,width:150,align:'center'},
					{name:'brandName',index:'brandName',sortable:false,width:200,align:'center'},//品牌
					{name:'models',index:'models',sortable:false,width:150,align:'center'},
					{name:'color',index:'color',sortable:false,width:150,align:'center'},
					{name:'retailPrice',index:'retailPrice',sortable:false,width:150,align:'center'},
					{name:'presetPrice',index:'presetPrice',sortable:false,width:150,align:'center',formatter:"number"},
					{name:'goodsCount',index:'goodsNum',sortable:false,width:150,align:'center',formatter:"integer"},
					{name:'tdGoodsCount',index:'tdGoodsCount',sortable:false,width:150,align:'center',formatter:"integer",formatoptions:{decimalPlaces:0},editable:true,editoptions:{
						dataEvents:[{
							type:'blur',
							fn:function(){
								var _this=$(this);
								var selectID=$("#mainGrid").getGridParam("selrow");
								var rowData=$("#mainGrid").jqGrid("getRowData",selectID);
								console.log(_this.val())
								console.log(Number(rowData.goodsCount))
								if(Number(_this.val())<=Number(rowData.goodsCount)){
									$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
								}else{
									$.zxsaas_plus.showalert("warning","数量过大!")
									$(this).val(0);
									$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
								}
							}
						},{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
					}},
					{name:'depositAmount',index:'depositAmount',sortable:false,width:150,align:'center',formatter:"number"},
					{name:'remainderAmount',index:'remainderAmount',sortable:false,width:150,align:'center',formatter:"number",editable:false},
					{name:'tdAmount',index:'tdAmount',sortable:false,width:150,align:'center',formatter:"number",editable:true,editoptions:{
						dataEvents:[{
							type:'blur',
							fn:function(e){
								var $that=$(this);
								if($that.val()*1<=$that.parent().prev().html().replace(/\,/g,'')*1){
									$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
									refreshBottom();
								}else{
									$.zxsaas_plus.showalert("warning","定金过大!")
									$that.val(0);
									$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
								}
							}
						},{
                            type: "focus",
                            fn: function(){
                                this.select()
                            }
                        }]
					}},
					{name:'salesmanName',index:'salesmanName',sortable:false,width:150,align:'center',formatter:'string'},
					{name:'remark',index:'remark',sortable:false,width:150,align:'center',editable:true,formatter:'string',editable:true}
	            ],
			    sortable:false,	
			    rownumbers:true,
			    cellsubmit: 'clientArray',//单元格保存内容的位置		
			    editurl: 'clientArray',
			    rowNum:-1,
			    viewrecords:false,
			   	cellEdit:true,
			    width:'' ,
			    footerrow:true,
			    height: $(window).height()*0.4,
				autowidth:true,
				rownumWidth: 35, // the width of the row numbers columns
				shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
				userDataOnFooter:true,//设置userData 显示在footer里
				ondblClickRow:function(id){
				},
				prmNames : {  
			            page:null,    // 表示请求页码的参数名称  
			            rows:null,    // 表示请求行数的参数名称  
			            sort: null, // 表示用于排序的列名的参数名称  
			            order: null, // 表示采用的排序方式的参数名称  
			            search:null, // 表示是否是搜索请求的参数名称  
			            nd:null, // 表示已经发送请求的次数的参数名称  
			            id:null // 表示当在编辑数据模块中发送数据时，使用的id的名称   
		        },
				onCellSelect:function(id,index,e){
				},
				onSelectRow:function(id){
				},
				beforeSelectRow:function(rowid,e){
				},
				beforeEditCell:function(rowid,cellname,v,iRow,iCol){
					lastrow = iRow; 
					lastcell = iCol;
				},
				afterInsertRow: function (rowid, aData) { //新增一行之后
				},
                afterSaveCell : function(rowid,name,val,iRow,iCol) {
                    refreshBottom()
                },
				gridComplete: function() {
				},
				loadComplete:function(data){
					refreshBottom()
				},
				loadError:function(xhr,status,error){
				}
			})
		},
		popInit:function(){//收款结算************************
		    $('#settleBtn').click(function () {
		    	if(isView){
		    		var posTotal=0;
		    		$('#myModal_rb_settle').modal('show');
		    		$('#settle_sure').prop('disabled',true);
		    		$('#table_settle input,#table_pos input').val('');
		    		$('#spanDepositTotal').text($('#receipt').val());
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
		    				$('#cashRemark').val(val.remark);
		    				break;
		    			case '2':
		    				posTotal+=Number(val.amount)
		    				$('#pos').val(posTotal);
		    				$('#posRemark').val(val.remark);
		    				break;
		    			case '3':
		    				$('#weixin').val(val.amount);
		    				$('#alipayRemark').val(val.remark);
		    				break;
		    			case '4':
		    				$('#alipay').val(val.amount);
		    				$('#weixinRemark').val(val.remark);
		    				break;
		    			case '5':
		    				$('#coupons').val(val.amount);
		    				$('#memberAmountRemark').val(val.remark);
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
		    		//pos机
		    		$('#pos').focus(function () {
			            $('#myModal_table_pos_con').modal('show');
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
		    	}else{
		    		if($('#receipt').val()==''||$('#receipt').val()==0){
			    		$.zxsaas_plus.showalert("warning",'退定金为0');
			    		return false
			    	}else{
			    		$('#myModal_rb_settle').modal('show');
				    	$('#spanDepositTotal').text($('#receipt').val());
				        $('#settle_thisTime').html('');
				        $('#settle_balance').html('');
				        $('#settle_availableIntegral').val($('#customerScore').val());//可用积分
				        $('#settle_storedValue').val($('#customerAmount').val());//储值余额
				        $('#table_settle tbody input').val('')
				        $('#table_pos input').val('')
				        //POS机
				        $('#pos').focus(function () {
				            $('#myModal_table_pos_con').modal('show')
				        });
				        $('#settle_sure').click(function () {
				        	if(Number($('#settle_balance').text())!=0){
				        		$.zxsaas_plus.showalert("warning",'应收余额必须为0');
				        		return false;
				        	}else if($('#settle_thisTime').text()==0||$('#settle_thisTime').text()==''){
				        		$.zxsaas_plus.showalert("warning",'未退款');
				        		return false;
				        	}else{
				        		// 封装参数
					        	var obj = {};
					        	obj.sectionId = $("#sectionId").val();
					        	obj.salesmanId = $("#employees").val();
					        	obj.billsDate = $("#businessDate").val();
					        	obj.billsAmount = $("#receipt").val();
					        	obj.sfAmount =$('#receipt').val(); //结算金额
				        		obj.memberId = $("#cardId").val();
					        	obj.customName = $("#customerName").val();
					        	obj.telephone = $("#customerTel").val();
				        		obj.totalYfAmount=$('#totalYfAmount').val();//应收合计
				        		obj.remark = $("#remark").val();
					        	
				        		var bId = $('#bId').val();
				        		
					        	var goodsList = [];
					        	var ids=$("#mainGrid").jqGrid("getDataIDs");
					        	for(var i=0; i < ids.length; i++){
					        		var rowData = $("#mainGrid").jqGrid("getRowData",ids[i]);
					        		
					        		if(bId !== null && bId !==""){
					        			var retailDepositDraft={}; 
						        		retailDepositDraft.depositMainId = bId;
						        		obj.depositMainId= bId;
						            	retailDepositDraft.depositId = rowData["depositId"];
						            	retailDepositDraft.goodsId = rowData["id"];
						            	retailDepositDraft.unsubscribeAmount = rowData["tdAmount"];
						            	retailDepositDraft.unsubscribeNum = rowData["tdGoodsCount"];
						            	retailDepositDraft.remark = rowData["remark"];
						            	goodsList.push(retailDepositDraft);
					        		}else{
					        			if(rowData["depositMainId"] != null && rowData["depositMainId"] != ''){
							        		var retailDepositDraft={}; 
							        		retailDepositDraft.depositMainId = rowData["depositMainId"];
							        		obj.depositMainId=rowData["depositMainId"];
							            	retailDepositDraft.depositId = rowData["depositId"];
							            	retailDepositDraft.goodsId = rowData["id"];
							            	retailDepositDraft.unsubscribeAmount = rowData["tdAmount"];
							            	retailDepositDraft.unsubscribeNum = rowData["tdGoodsCount"];
							            	retailDepositDraft.remark = rowData["remark"];
							            	goodsList.push(retailDepositDraft);
										}
					        		}
					        	}
					            // 支付信息
					            var payList = [];
					            $("#table_settle tbody tr").each(function(index,item){
					            	// 包含accountId属性的对象
					            	var payItem = {};
					            	var hasAccountId = false;
					            	$(item).find("input[accountId]").each(function(i,it){
					            		payItem.accountId = $(it).attr("accountId");
					            		payItem.accountType = $(it).attr("accountType");
					            		hasAccountId = true;
					            		if($(it).hasClass("inputVal")){
					            			payItem.payreceiptAmout = $(it).val().trim();
					            		}
					            		if($(it).hasClass("inputRemark")&&($(it).val().trim()!='')){
					            			payItem.remark = $(it).val().trim();
					            		}
					            	});
					            	if(hasAccountId&&(payItem.payreceiptAmout!=0||payItem.payreceiptAmout!='')){
					            		payList.push(payItem);
					            	}
					            });
					            // pos机信息
					            $("#table_pos tbody tr").each(function(index,item){
					            	$(item).find("input[accountId]").each(function(i,it){
					            		var payItem = {};
					            		payItem.accountId = $(it).attr("accountId");
					            		payItem.accountType = $(it).attr("accountType");
					            		if($(it).hasClass("inputVal")){
					            			payItem.payreceiptAmout = $(it).val().trim();
					            		}
					            		if($("#posRemark").val().trim()!=''||$("#posRemark").val().trim()!=0){
					            			payItem.remark = $("#posRemark").val().trim();
					            		}
					            		if(payItem.payreceiptAmout!=0||payItem.payreceiptAmout!=''){
					            			payList.push(payItem);
					            		}
					            	});
					            });
					            
					        	obj.goodsList = goodsList;
					        	obj.payList = payList;
					        	for(var key in obj){
					        		if(obj[key]==''){
					        			delete(obj[key])
					        		}
					        	}
								$.request({
									url: basePath + '/retail/reDeposit/saveOrder',
									type: "POST",
									datatype : "json",
									data: {jsonData : JSON.stringify(obj)},
									traditional: true,
									success: function (data) {
										if(data.result==1||data.result==2||data.result==-2){
											$.zxsaas_plus.showconfirmsure("提示",data.desc,function(){
												$('#LBill').click();
											});
										}else{
											$.zxsaas_plus.showalert("error",data.desc);
										}
										$("#jqGrid_addService").trigger("reloadGrid");
								    },
								    error: function (msg) {
								    	$.zxsaas_plus.showalert("error"," 数据保存失败！" + msg);
								    }
								});
				        	}
				        });
			    	}
		    	}
		    })
		},
		/*时间控件初始化*/
		timeInit:function(){
			$("#businessDate").addClass('date-time-icon').timeControl()
			$(".beginDate").datetimepicker({
				lang:"ch",           //语言选择中文
				format:"Y-m-d",      //格式化日期
				timepicker:false,    //关闭时间选项
				todayButton:false    //关闭选择今天按钮
			}).addClass('date-time-icon');
			$(".endDate").datetimepicker({
				lang:"ch",           //语言选择中文
				format:"Y-m-d",      //格式化日期
				timepicker:false,    //关闭时间选项
				todayButton:false    //关闭选择今天按钮
			}).addClass('date-time-icon');
		}
}
$(function(){
	mainScope.init();
	
	locationhref()
    var billsId=functionObjExtent.getQueryString('billsId')

    var billsCode=functionObjExtent.getQueryString('billsCode')
    //	是否从报表进入
    if (billsId != '' || billsCode != '') {
        var obj={};
        obj.retailMainId=billsId;
        queryPage(obj)
    }
//	//输出数据
	$('#qwer').click(function(){
	})
	//查看单据
	$('#fBill').click(function(){
		var obj={};
		obj.startTime=$.trim($('.beginDate').val());
		obj.endTime=$.trim($('.endDate').val());
		obj.billsCode=$.trim($('#modalFilterbillscode').val());
		obj.cardNum=$.trim($('#modalCardNum').val());
		obj.customerName=$.trim($('#modalCustomers').val());
		obj.customerTel=$.trim($('#modalPhone').val());
		obj.refBillsId=$('#refbillsId').val();
		$.request({
	        type: 'Post',
	        url: basePath + '/retail/reDeposit/loadRedepositOrder?queryCodeStr=F',
	        data:obj,
	        dataType: "json", 
	        success: function (data) {
	        	if(data.result==1){
	        		if(data.data.orderDetailVo!=null){
	        			var res=data.data.orderDetailVo;
	        			checkDoc(res)
	        		}else{
	        			$.zxsaas_plus.showalert("warning","未查询到该单据!")
	        		}
	        	}else{
	        		$.zxsaas_plus.showalert("error",data.desc);
	        	}
	        },
	        error: function () {
	            alert("加载失败！");
	        }
	    });
	})
	$('#PrevBill').click(function(){//上一单
		var obj={};
		obj.startTime=$.trim($('.beginDate').val());
		obj.endTime=$.trim($('.endDate').val());
		obj.billsCode=$.trim($('#modalFilterbillscode').val());
		obj.cardNum=$.trim($('#modalCardNum').val());
		obj.customerName=$.trim($('#modalCustomers').val());
		obj.customerTel=$.trim($('#modalPhone').val());
		obj.refBillsId=$('#refbillsId').val();
		$.request({
	        type: 'Post',
	        url: basePath + '/retail/reDeposit/loadRedepositOrder?queryCodeStr=P',
	        data:obj,
	        dataType: "json", 
	        success: function (data) {
	        	if(data.result==1){
	        		if(data.data.orderDetailVo!=null){
	        			var res=data.data.orderDetailVo;
	        			checkDoc(res)
	        		}else{
	        			$.zxsaas_plus.showalert("warning","没有上一单了!")
	        		}
	        	}else{
	        		$.zxsaas_plus.showalert("error",data.desc);
	        	}
	        },
	        error: function () {
	            alert("加载失败！");
	        }
	    });
	})
	$('#NextBill').click(function(){//下一单
		var obj={};
		obj.startTime=$.trim($('.beginDate').val());
		obj.endTime=$.trim($('.endDate').val());
		obj.billsCode=$.trim($('#modalFilterbillscode').val());
		obj.cardNum=$.trim($('#modalCardNum').val());
		obj.customerName=$.trim($('#modalCustomers').val());
		obj.customerTel=$.trim($('#modalPhone').val());
		obj.refBillsId=$('#refbillsId').val();
		$.request({
	        type: 'Post',
	        url: basePath + '/retail/reDeposit/loadRedepositOrder?queryCodeStr=N',
	        data:obj,
	        dataType: "json", 
	        success: function (data) {
	        	if(data.result==1){
	        		if(data.data.orderDetailVo!=null){
	        			var res=data.data.orderDetailVo;
	        			checkDoc(res)
	        		}else{
	        			$.zxsaas_plus.showalert("warning","没有下一单了!")
	        		}
	        	}else{
	        		$.zxsaas_plus.showalert("error",data.desc);
	        	}
	        },
	        error: function () {
	            alert("加载失败！");
	        }
	    });
	})
	$('#LBill').click(function(){
		var obj={};
		obj.startTime=$.trim($('.beginDate').val());
		obj.endTime=$.trim($('.endDate').val());
		obj.billsCode=$.trim($('#modalFilterbillscode').val());
		obj.cardNum=$.trim($('#modalCardNum').val());
		obj.customerName=$.trim($('#modalCustomers').val());
		obj.customerTel=$.trim($('#modalPhone').val());
		obj.refBillsId=$('#refbillsId').val();
		$.request({
	        type: 'Post',
	        url: basePath + '/retail/reDeposit/loadRedepositOrder?queryCodeStr=L',
	        data:obj,
	        dataType: "json", 
	        success: function (data) {
	        	if(data.result==1){
	        		if(data.data.orderDetailVo!=null){
	        			var res=data.data.orderDetailVo;
	        			checkDoc(res)
	        		}else{
	        			$.zxsaas_plus.showalert("warning","未查询到该单据!")
	        		}
	        	}else{
	        		$.zxsaas_plus.showalert("error",data.desc);
	        	}
	        },
	        error: function () {
	            alert("加载失败！");
	        }
	    });
	})
	//过滤
	$('#modalFilter').click(function(){
		$.request({
			url:basePath + '/retail/reDeposit/loadRedepositOrder',
			type:'get',
			dataType:'json',
			data:getFilterParam(),
			success:function(data){
				var res=data.data.orderDetailVo;
				if(res!=null){
					checkDoc(res)
				}else{
					$.zxsaas_plus.showalert("warning","未查询到该单据!")
				}
			},
			error:function(msg){
				$.zxsaas_plus.showalert("error","过滤失败"+msg);
			}
		})
	})
	//模态窗的参数封装
	function getFilterParam(){
		var obj={};
		obj.startTime=$.trim($('.beginDate').val());
		obj.endTime=$.trim($('.endDate').val());
		obj.billsCode=$.trim($('#modalFilterbillscode').val());
		obj.cardNum=$.trim($('#modalCardNum').val());
		obj.customerName=$.trim($('#modalCustomers').val());
		obj.customerTel=$.trim($('#modalPhone').val());
		obj.refBillsId=$('#refbillsId').val();
		return obj;
	}
	//新开单
	$('#newBill').click(function(){
		window.location.href=basePath+'/retail/reDeposit/retailReDepositMain';
	})
	//退定按钮
	$('#takeDown').click(function(){
		loadModalSectionId();//门店加载
		$('#sureReturn').modal('show');
		$('#modal_table_back tbody').html('');
		$("#mainGrid").jqGrid("clearGridData");
		$('#totalYfAmount,#receipt,#modelSerchTxt').val('');
	})
	//搜索定单
	$('#modalSearch').click(function(){
		code='';
		$.request({
	        type: 'Post',
	        url: basePath + '/retail/reDeposit/searchDepositGoodsList',
	        data:{
				sectionId:$('#modalSection').val(),
				queryKey:$('#modelSerchTxt').val()
			},
	        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	        success: function (data) {
				if(data.result==1){
					var res=data.data.depositGoodsList;
					var html;
					if(res.length==0){
						html=''
					}else{
						$.each(res,function(i,val){
							for(var key in val){
								if(val[key]==null){
									val[key]=''
								}
							}
							html+='<tr><td><input class="modal_Index" type="checkbox"><input class="modal_id" value="'+val.retailDepositId+'" type="hidden"></td>'+
			      	  	         '<td class="modal_code">'+val.billsCode+'</td>'+
			      	  	         '<td class="modal_name">'+val.customerName+'</td>'+
			      	  	         '<td class="modal_tel">'+val.customerTel+'</td>'+
			      	  	         '<td class="modal_proName">'+val.name+'</td>'+
			      	  	         '<td class="modal_model">'+val.models+'</td>'+
			      	  	         '<td class="modal_color">'+val.color+'</td>'+
			      	  	         '<td class="modal_surplus">'+val.remainderAmount+'</td></tr>';
						})
					}
					$('#modal_table_back tbody').html(html);
				}else{
					$.zxsaas_plus.showalert("error",data.desc);
				}
	        },
	        error: function () {
	            alert("加载失败！");
	        }
	    });
	})
	//退定勾选
	var code='';
	var billCode='';
	$(document).on('click','.modal_Index',function(){
		if($(this).prop('checked')==true){
			if(code==''){
				code=$(this).closest('tr').find('.modal_code').text();
				billCode=$(this).closest('tr').find('.modal_code').text();
			}else{
				if(code!=$(this).closest('tr').find('.modal_code').text()){
					$.zxsaas_plus.showalert("warning",'请勾选相同零售单编码的选项!');
					return false
				}
			}
		}else{
			var len=$('.modal_Index').length
			for(var i=0,q=0;i<len;i++){
				if($('.modal_Index:eq('+i+')').prop('checked')==true){
					q++
				}
			}
			if(q==0){
				code='';
			}
		}
	})
	//退定已选
	var selectedBillid=[];
	var selBillscode;
	$('#modalBackBill').click(function(){
		var q=0;
		selectedBillid=[];
		selBillscode=null;
		$('.modal_Index').each(function(i,val){
			if($(this).prop('checked')==true){
				q++;
				selectedBillid.push($(this).closest('tr').find('.modal_id').val());
				selBillscode=$(this).closest('tr').find('.modal_code').text();
			}
		})
		if(q==0){
			$.zxsaas_plus.showalert('warning','未勾选');
			return false
		}else{
			var selectedstr=selectedBillid.join(',');//退定单id
			$('#billsNum').val(selBillscode);
			$('#section').val($('#modalSection option:selected').text());
			$('#sectionId').val($('#modalSection').val());//门店ID
			//获取营业员
			$.request({
    			url:basePath + '/aboutPeople/interfaceSelfCompanyEmployees',
    			type:'post',
    			dataType:'json',
    			data:{
    				sectionId : $('#modalSection').val()
    			},
    			success:function(data){
    				if(data.result==1){
    					$("#employees option").remove();
    					var html;
        	    		$(data.data.empList).each(function(index,item){
        	    			html+="<option value='" + item.id + "'>" + item.name + "</opion>";
        	    		});
        	    		$("#employees").append(html);
    				}else{
    					$.zxsaas_plus.showalert("error",data.desc);
    				}
    			}
    		})
			//返回数据
			$.request({
		        type: 'Post',
		        url: basePath + '/retail/reDeposit/loadReDepositDetailInfo',
		        data:{
					depositIds:selectedstr
				},
		        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		        success: function (data) {
					if(data.result==1){
						var res=data.data;
						if(res.customerVo!=undefined){
							for(var key in res.customerVo){
								if(res.customerVo[key]==null){
									res.customerVo[key]=''
								}
							}
							$('#cardNum').val(res.customerVo.cardNum);//会员卡号
							$('#cardId').val(res.customerVo.cardId);//会员ID
							$('#customerName').val(res.customerVo.customerName);//客户姓名
							$('#customerTel').val(res.customerVo.customerTel);//联系电话
							$('#customerType').val(res.customerVo.customerType);//会员类型
							$('#customerAmount').val(res.customerVo.customerAmount);//储值余额
							$('#customerScore').val(res.customerVo.customerScore);//当前积分
							$('#spanCustomerAmount').text(res.customerVo.customerAmount);//储值余额
							$('#spanCustomerScore').text(res.customerVo.customerScore);//当前积分
							$("#dScore").text(res.customerVo.dScore);
							$("#dAmount").text(res.customerVo.dAmount);
						}
						//加载表格数据
						for(var i=0;i<res.reDepositGoodsVoList.length;i++){
							for(var key in res.reDepositGoodsVoList[i]){
								if(res.reDepositGoodsVoList[i][key]==null){
									res.reDepositGoodsVoList[i][key]=''
								}
							}
					
							$("#mainGrid").addRowData(i,res.reDepositGoodsVoList[i],'last');
						}
						$("#table_pos tbody tr").remove();
						$("#cash,#cashRemark,#pos,#posRemark,#alipay,#alipayRemark,#weixin,#weixinRemark,#memberAmount,#memberAmountRemark,#deductionMoney,#deductionScore,#deductionRemark").removeAttr("accountId").prop("disabled",true).val("");
						$(data.data.accountList).each(function(index,item){
							if(item.content == "现金"){
								$("#cash").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
								$("#cashRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
							}else if(item.content == "银行"){
								$("#table_pos tbody").append("<tr><td>"+ item.accountName +"</td><td><input class='posItem inputVal' accountId='"+ item.accountId +"' accountType='"+ item.accountType +"' type='text' onchange='sumPos();'/></td></tr>");
								$("#pos").prop("disabled",false);
								$("#posRemark").prop("disabled",false);
							}else if(item.content == "支付宝"){
								$("#alipay").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
								$("#alipayRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
							}else if(item.content == "微信"){
								$("#weixin").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
								$("#weixinRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
							}else if(item.content == "会员储值"){
								// 判断是否是会员
								$("#memberAmount").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
								$("#memberAmountRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
							}else if(item.content == "积分抵现"){
								// 判断是否是会员
								$("#deductionMoney").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
								$("#deductionScore").prop("disabled",false);
								$("#deductionRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
							}
						});
					}else{
						$.zxsaas_plus.showalert("error",data.desc);
					}
		        },
		        error: function () {
		            alert("可使用部门加载失败！");
		        }
		    });
		}
	})
	//红冲
	$('#red').click(function(){
		$('#myModal_red').modal('show');
    	getAuthList(billMainRedDate)
		function billMainRedDate(){
			var min = CompareDate(_authList.minDate,$("#businessDate").val())?_authList.minDate:$("#businessDate").val()
			$("#redDate").val(min)
			$("#redDate").datetimepicker({
			lang:"ch",           //语言选择中文
			format:"Y-m-d",      //格式化日期
			timepicker:false,    //关闭时间选项
			todayButton:false,    //关闭选择今天按钮
			maxDate:_authList.maxDate,  //设置红冲最大时间
			minDate:min
		}).addClass('date-time-icon');
		}
	})
	$('#red_sure').click(function(){
		$.request({
			type:'post',
	    	url:basePath+'/retail/reDeposit/redReDepositOrder',
	    	data:{
				billsId:$('#refbillsId').val(),
				redDate:$('#redDate').val()
			},
	    	dataType:'json',
	    	success:function(data){
				if(data.result==1){
					$.zxsaas_plus.showalert("success",'红冲成功!');
				}else{
					$.zxsaas_plus.showalert("error",data.desc);
				}
			},
			error:function(){
				alert('请求失败！')
			}
		})
	})

    //稽核、取消稽核
    $('.listAudit').click(function () {
        var $this=$(this)
        var auditStatus=$this.data('auditstatus')
		var billsId=$('#refbillsId').val();
		var billsStatus=$("#billstatu").val()
		var auditStatusCode=$("#auditStatus").val()
        if(!(billsStatus !=1 && auditStatusCode!=auditStatus)){
            if(auditStatus==1){
                $.zxsaas_plus.showalert('提示', "只能对正式且未稽核单据稽核!");
            }else{
                $.zxsaas_plus.showalert('提示', "只能对已稽核单据取消稽核!");
            }
            return false;
        }
        $.ajaxPackage({
            url:'/manager/inventory/retail/updateAuditStatus',
            data:{
                billsId:billsId,
                auditStatus:auditStatus,
                billsType:50,
            },
            success:function(data){
                $.zxsaas_plus.showalert('success', "稽核成功!");
                var obj={};
                obj.refBillsId=$('#refbillsId').val();
                $.request({
                    type: 'Post',
                    url: basePath + '/retail/reDeposit/loadRedepositOrder',
                    data:obj,
                    dataType: "json",
                    success: function (data) {
                        if(data.result==1){
                            if(data.data.orderDetailVo!=null){
                                var res=data.data.orderDetailVo;
                                checkDoc(res)
                            }else{
                                $.zxsaas_plus.showalert("warning","没有下一单了!")
                            }
                        }else{
                            $.zxsaas_plus.showalert("error",data.desc);
                        }
                    },
                    error: function () {
                        alert("加载失败！");
                    }
            	})
            }
        })
	})
	
})

function queryPage(obj,callback) {
    $.request({
        type: 'Post',
        url: basePath + '/retail/reDeposit/loadRedepositOrder',
        data:obj,
        dataType: "json",
        success: function (data) {
            if(data.result==1){
                if(data.data.orderDetailVo!=null){
                    var res=data.data.orderDetailVo;
                    checkDoc(res)
                }
                if(callback){
                    callback(data)
                }
            }else{
                $.zxsaas_plus.showalert("error",data.desc);
            }
        },
        error: function () {
            alert("加载失败！");
        }
    });

}
// pos刷卡金额汇总
function sumPos(){
	var sumAmount = 0;
	$("#table_pos tbody tr input").each(function(){
		sumAmount = sumAmount + Number($(this).val());
	});
	$("#pos").val(sumAmount);
}
//刷新表格底部数量及金额
function refreshBottom(){
	var depositTotal = ($("#mainGrid").getCol('tdAmount', false, 'sum')).toFixed(2);
	$("#mainGrid").footerData('set',{"tdAmount":'定金合计:'+depositTotal},false);
	$("#totalYfAmount").val(depositTotal);
	$("#receipt").val(depositTotal);
}
//加载退定框门店
function loadModalSectionId(){
	$.request({
        type: 'Post',
        url: basePath + '/department/interfaceDeptAndEmp',
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
			var html;
			if(data.result==1){
				var res=data.data.sectionList;
				$("#modalSection option").remove();
				$.each(res,function(i,val){
					html+="<option value='" + val.id + "' selected>" + val.name + "</opion>";
				})
				$("#modalSection").append(html);
				$("#modalSection").get(0).selectedIndex=0;
			}
        },
        error: function () {
            alert("可使用部门加载失败！");
        }
    });
}

//绑定值改变事件
$('#table_settle').keyup(function(){
	thisTimesettleTotal()
})
$('#myModal_table_pos_con').on('hidden.bs.modal',function(){
	thisTimesettleTotal()
})
function thisTimesettleTotal(){//结算框计算
	var STol=Number($('#cash').val())+Number($('#pos').val())+Number($('#alipay').val())+Number($('#weixin').val())+Number($('#memberAmount').val())+Number($('#deductionMoney').val());
	$('#settle_thisTime').html(STol.toFixed(2));
	$('#settle_balance').html((Number($('#spanDepositTotal').html())-Number($('#settle_thisTime').html())).toFixed(2));//应收余额
}
//function thisTimesettleTotal(){//结算框计算
//	var  STol=Number($('#cash').val())+Number($('#pos').val())+Number($('#alipay').val())+Number($('#weixin').val())+Number($('#coupons').val())+Number($('#memberAmount').val())+Number($('#deductionMoney').val());
//	$('#settle_thisTime').html(STol.toFixed(2));
//	$('#settle_balance').html(Math.round((Number($('#settle_receivable').html())-Number($('#settle_thisTime').html()))*100)/100);//应收余额
//}
$('#memberAmount').keyup(function(){
	if(Number($(this).val())>Number($('#spanCustomerAmount').text())){
		$(this).val($('#spanCustomerAmount').text())
	}
})
//积分&余额
$('#deductionMoney').keyup(function(){//余额
	var bl=Number($('#dAmount').text())/Number($('#dScore').text());
	$('#deductionScore').val(Number($(this).val())/bl);
});
$('#deductionScore').keyup(function(){//积分
	var bl=Number($('#dAmount').text())/Number($('#dScore').text());
	$('#deductionMoney').val(Number($(this).val())*bl);
})
$("#deductionMoney").focusout(function(){
	var bl=Number($('#dAmount').text())/Number($('#dScore').text());
	$(this).val(parseInt($(this).val()));
	$('#deductionScore').val(Number($(this).val())/bl);
	thisTimesettleTotal();
})
$("#deductionScore").focusout(function(){
	var bl=Number($('#dAmount').text())/Number($('#dScore').text());
	$('#deductionMoney').val(parseInt($('#deductionMoney').val()));
	$('#deductionScore').val(Number($('#deductionMoney').val())/bl);
	thisTimesettleTotal();
})
$('#myModal_rb_settle').on('hidden.bs.modal',function(){
	$('#settle_sure').off()
})
//结算框输入限制
    $("#table_settle tbody tr").find('td:eq(1) input').keyup(function(){
    	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字小数点输入
    });
    $(document).on('keyup','#table_pos input',function(){
    	$(this).val(($(this).val().replace(/[^0-9.]/g,'')));//只允许数字小数点输入
    })
    $("#table_settle tbody tr").find('td:eq(1) input').focusout(function(){
    	$(this).val(Number($(this).val()));
    	if(isNaN($(this).val())){
    		$(this).val(0)
    	}
    });
    $(document).on('focusout','#table_pos input',function(){
    	$(this).val(Number($(this).val()));
    	if(isNaN($(this).val())){
    		$(this).val(0)
    	}
    })
    function checkDoc(res){
    	isView=true;
    	collectionDetails=res.payRecieveDetailList;
    	$('#red').prop('disabled',false);
    	$('#takeDown').prop('disabled',true);
    	$('#billsNum').val(res.billsCode);
    	$('#refbillsId').val(res.id);
    	$('#billstatu').val(res.billsStatus);
    	$('#auditStatus').val(res.auditStatus);
    	$('#section').val(res.sectionName);
    	$('#sectionId').val(res.sectionId);
    	$('#employees option').remove();
    	$('#employees').append('<option>'+res.salesmanName+'</option>');
    	$('#employees').prop('disabled',true);
    	$('#businessDate').val(res.billsDate);
    	$('#businessDate').prop('disabled',true);
    	$('#cardNum').val(res.cardNum);
    	$('#customerName').val(res.customerName);
    	$('#customerTel').val(res.customerTel);
    	$('#customerType').val(res.memberType);
    	$('#customerAmount').val(res.memberAmount);
    	$('#customerScore').val(res.memberScore);
    	$("#mainGrid").jqGrid("clearGridData");//清空表格
    	for(var i=0;i<res.goodsList.length;i++){
    		for(var key in res.goodsList[i]){
    			if(res.goodsList[i][key]==null){
    				res.goodsList[i][key]=''
    			}
    		}
			$("#mainGrid").addRowData(i,res.goodsList[i],'last');
			refreshBottom()
		}
    	$('#mainGrid').setColProp('tdGoodsCount',{editable:false});
		$('#mainGrid').setColProp('tdAmount',{editable:false});
		$('#mainGrid').setColProp('remark',{editable:false});
    	$('#totalYfAmount').val(res.totalYfAmount);
    	$('#receipt').val(res.sfAmount);
    	$('#remark').val(res.remark);
    	$('#remark').prop('disabled',true);
    	if($('#billstatu').val()==7){
			$('#redSign').show();
			$('#red').prop('disabled',true);
		}else{
			$('#redSign').hide();
			$('#red').prop('disabled',false);
		}

        if (res.auditStatus == 1) {
            $('#imgAudit').attr('src', '/manager/images/audit.png');
        } else if (res.auditStatus == 0){
            $('#imgAudit').attr('src', '/manager/images/auditNo.png');
        }else{
            $('#imgAudit').attr('src', '');
		}

    }
    $('#resetSearchOptions').click(function(){
    	$('.formWrap input').val('')
    })
    
    function locationhref(){
		var localUrl = window.location.href;
		var url1 = localUrl.split("?")[1];
		if(url1 == undefined){
			return
		}
		var url2 = url1.split('=');
		if(url2[0] == "bId"){
			var obj ={
				retailMainId : url2[1]
			};
			
			//返回数据
		$.request({
	        type: 'Post',
	        url: basePath + '/retail/reDeposit/loadRedepositOrder',
	        data:{
				retailMainId: url2[1]
			},
	        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	        success: function (data) {
				if(data.result==1){
					var res=data.data.orderDetailVo;
					if(res !=undefined){
						$('#businessDate').val(res.billsDate);
						$('#billsNum').val('');
						$('#section').val(res.sectionName);
						$('#sectionId').val(res.sectionId);
						$('#billsNum').val(res.billsCode);
						getEmploy(res.sectionId);
						$('#employees').val(res.salesmanId);
						$('#cardNum').val(res.cardNum);//会员卡号
						$('#cardId').val(res.memberId);//会员ID
						$('#customerName').val(res.customerName);//客户姓名
						$('#customerTel').val(res.customerTel);//联系电话
						$('#customerType').val(res.memberType);//会员类型
						$('#customerAmount').val(res.memberAmount);//储值余额
						$('#customerScore').val(res.memberScore);//当前积分
						$('#spanCustomerAmount').text(res.memberAmount);//储值余额
						$('#spanCustomerScore').text(res.memberScore);//当前积分
						$("#dScore").text(res.dScore);
						$("#dAmount").text(res.dAmount);
					}
					var nums = 0;
					//加载表格数据
					for(var i=0;i<res.goodsList.length;i++){
						for(var key in res.goodsList[i]){
							if(res.goodsList[i][key]==null){
								res.goodsList[i][key]=''
							}
						}
						nums+=res.goodsList[i].tdAmount*1;
						$("#mainGrid").addRowData(i,res.goodsList[i],'last');
					}
					$("#mainGrid").footerData("set", {
		                "tdAmount": '定金合计:'+ nums.toFixed(2)
		            }, false);
					$('#totalYfAmount').val(nums.toFixed(2))
					$('#receipt').val(nums.toFixed(2))
					
					$("#table_pos tbody tr").remove();
					$("#cash,#cashRemark,#pos,#posRemark,#alipay,#alipayRemark,#weixin,#weixinRemark,#memberAmount,#memberAmountRemark,#deductionMoney,#deductionScore,#deductionRemark").removeAttr("accountId").prop("disabled",true).val("");
					$(res.payRecieveDetailList).each(function(index,item){
						if(item.content == "现金"){
							$("#cash").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
							$("#cashRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
						}else if(item.content == "银行"){
							$("#table_pos tbody").append("<tr><td>"+ item.accountName +"</td><td><input class='posItem inputVal' accountId='"+ item.accountId +"' accountType='"+ item.accountType +"' type='text' onchange='sumPos();'/></td></tr>");
							$("#pos").prop("disabled",false);
							$("#posRemark").prop("disabled",false);
						}else if(item.content == "支付宝"){
							$("#alipay").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
							$("#alipayRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
						}else if(item.content == "微信"){
							$("#weixin").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
							$("#weixinRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
						}else if(item.content == "会员储值"){
							// 判断是否是会员
							$("#memberAmount").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
							$("#memberAmountRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
						}else if(item.content == "积分抵现"){
							// 判断是否是会员
							$("#deductionMoney").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
							$("#deductionScore").prop("disabled",false);
							$("#deductionRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
						}
					});
				}else{
					$.zxsaas_plus.showalert("error",data.desc);
				}
	        },
	        error: function () {
	            alert("可使用部门加载失败！");
	        }
	    });
		}
		
	}
    
  //获取营业员
    function getEmploy(id){
    	$.request({
    		url:basePath + '/aboutPeople/interfaceSelfCompanyEmployees',
    		type:'post',
    		async: false,
    		dataType:'json',
    		data:{
    			sectionId : id
    		},
    		success:function(data){
    			if(data.result==1){
    				$("#employees option").remove();
    				var html = "";
    	    		$(data.data.empList).each(function(index,item){
    	    			html+="<option value='" + item.id + "'>" + item.name + "</opion>";
    	    		});
    	    		$("#employees").append(html);
    			}else{
    				$.zxsaas_plus.showalert("error",data.desc);
    			}
    		}
    	})
    }
	
    
    
//******************** 打印  **********************//
function print(){
	var id = $('#refbillsId').val();
	if(id==""){
		$.zxsaas_plus.showalert("提示","请选择一张单据");
		return;
	}
	$.printBills(basePath + '/retail/print/tuiding',{billsId:id});
}

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    