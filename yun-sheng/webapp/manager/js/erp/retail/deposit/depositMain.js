var isView=false;//单据状态，true为查询，false为操作
var collectionDetails=null;//收款明细
var selectTreeClassId="";
// 当前操作行
var actionRowIndex = 1;
// 已加入的商品id,eg:[1][2]
var selectedGoodsIds = "";
var mainScope={
	init:function(){
		this.gridInit();
		this.businessInit();
		this.popInit();
		this.goodsNamePopInit();
		this.treeInit();
	},
	/*主表格初始化*/
	gridInit:function(){
		$.jgrid.defaults.width = 1280;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';	
		$("#mainGrid").jqGrid({
			// 加载初始化数据
			url:'',
			mtype:"GET",
			datatype: "local",				
			jsonReader  : {	
				root: "data.retailDepositOrder.retailGoodsVoList",
				repeatitems: false
			},
			colNames:['商品id','操作','商品类别','商品编码','商品名称','品牌','型号','颜色','零售价','预售价','数量','定金','剩余定金','备注'],
		    colModel:[
              	{name:'id',index:'id',hidden:true},
              	{name:'handle',index:'handle',sortable:false,width:60,align:'center',formatter:function(cellvalue, options, rowObjec){
					return '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-plus add-boost" aria-hidden="true" id="add_row" title="添加行"></span><span class="glyphicon glyphicon-trash delect-boost" aria-hidden="true" id="add_row" title="删除行"></span></div>';
				}},
				{name:'categoryName',index:'categoryName',sortable:false,width:200,align:'center'},//商品类别
				{name:'code',index:'code',sortable:false,width:200,align:'center'},
				{name:'name',index:'name',sortable:false,width:250,align:'center',formatter:function(cellvalue, options, rowObject){
						if(cellvalue==undefined){ 
							cellvalue="";
						}
						return '<input type="text" readonly class="storRid' + options.rowId +'" style="border:0;text-align:center;width:170px" value="' + cellvalue +'" /><span class="storName glyphicon glyphicon-plus" data-toggle="modal" data-target="#goodsChoose" data-rId="' + options.rowId +'"></span>';
					}
				},
				{name:'brandName',index:'brandName',sortable:false,width:200,align:'center'},//品牌
				{name:'models',index:'models',sortable:false,width:200,align:'center'},
				{name:'color',index:'color',sortable:false,width:150,align:'center'},
				{name:'retailPrice',index:'retailPrice',sortable:false,width:150,align:'center',formatter:"number"},
				{name:'presetPrice',index:'presetPrice',sortable:false,width:150,align:'center',formatter:"number",editable:true,editoptions:{
					dataEvents:[{
						type:'blur',
						fn:function(e){
							$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
						}
					},{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
				}},
				{name:'goodsNum',index:'goodsNum',sortable:false,width:150,align:'center',formatter:"number",editable:true,formatoptions:{decimalPlaces:0},editoptions:{
                    onkeyup: "checkInput.clearNoNum(this,10)",
					dataEvents:[{
						type:'blur',
						fn:function(e){
							if(e.target.value*1 < 0){
								e.target.value = 1
							}
							$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
						}
					},{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
				}},
				{name:'deposit',index:'deposit',sortable:false,width:150,align:'center',formatter:"number",editable:true,editoptions:{
					dataEvents:[{
						type:'blur',
						fn:function(e){
							$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
							refreshBottom();
						}
					},{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
				}},
				{name:'remainderAmount',index:'remainderAmount',sortable:false,width:150,align:'center',formatter:"number",editable:false,hidden:true},
				{name:'remark',index:'remark',sortable:false,width:200,align:'center',editable:true,editoptions:{
					dataEvents:[{
						type:'blur',
						fn:function(e){
							$("#mainGrid").jqGrid("saveCell",lastrow,lastcell);
						}
					},{
                        type: "focus",
                        fn: function(){
                            this.select()
                        }
                    }]
				}}
            ],
		    sortable:false,	
		    rownumbers:true,
		    cellsubmit: 'clientArray',//单元格保存内容的位置		
		    editurl: 'clientArray',
		    rowNum:-1,
		    viewrecords: true,		           
		   	cellEdit:true,
		    width:'' ,
		    footerrow:true,
		    height: $(window).height()*0.3,
			autowidth:true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			userDataOnFooter:true,//设置userData 显示在footer里
			ondblClickRow:function(id){
			
			},
			prmNames:{  
	            page:null,    // 表示请求页码的参数名称  
	            rows:null,    // 表示请求行数的参数名称  
	            sort: null, // 表示用于排序的列名的参数名称  
	            order: null, // 表示采用的排序方式的参数名称  
	            search:null, // 表示是否是搜索请求的参数名称  
	            nd:null, // 表示已经发送请求的次数的参数名称  
	            id:null // 表示当在编辑数据模块中发送数据时，使用的id的名称   
	        },
			onCellSelect:function(rowid,iCol,cellcontent,e){
			},
			onSelectRow:function(id){
				refreshBottom();
			},
			beforeSelectRow:function(rowid,e){
				refreshBottom();
			},
			beforeEditCell:function(rowid,cellname,v,iRow,iCol){
				lastrow = iRow; 
				lastcell = iCol;
			},
			afterInsertRow: function (rowid, aData) { //新增一行之后
				refreshBottom();
			},
            afterSaveCell : function(rowid,name,val,iRow,iCol) {
                refreshBottom()
            },
			gridComplete: function() {
				
			},
			loadComplete:function(data){
				refreshBottom();
				var ids = $('#mainGrid').jqGrid('getDataIDs');
				if(ids.length < 1){
					$(this).jqGrid('addRowData',0, {"id":"","code":"","handle":"","name":"","models":"","color":"","retailPrice":"0","presetPrice":"0","goodsNum":"0","deposit":"0","remainderAmount":"0","remark":"",'goodsId':''}, 'last' );
				}
			},
			loadError:function(xhr,status,error){}
		});
	},
	/*商品名称弹窗*/
	goodsNamePopInit:function(){
		var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			LoadTableUrl:basePath + "/retail/deposit/selectGoodsDetail",
			TableName: "#jqGrid_goodsMsgAdd", //显示表格名称。遵照css选择器书写
			iconJsonUrl:"../json/icon.json",
			btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
			pager:"#gridpager_goods"
		};
		$.jgrid.defaults.width = 1200;
		$.jgrid.defaults.responsive = true;
		$.jgrid.defaults.styleUI = 'Bootstrap';	
		var lastsel='';//最后一次选中的行
		var rightClickColid="";//右键列id
		var rightClickColIndex=0;//右键index
		var mydata;
		var hid=false;
		var lock=false;
		var myobj=[];
		var colNames = ['商品编码','商品名称','商品类别','商品品牌','商品型号','商品颜色','网络制式','是否管理串号'];
		var JqGridColModel=[
			{name:'goodsCode',index:'goodsCode',sortable:false, width:80,align:'center',sorttype:"string"},
			{name:'goodsName',index:'goodsName',sortable:false, width:120,align:'center', sorttype:'string'},
			{name:'goodsClassName',index:'goodsClassName',sortable:false, width:100,align:'center', sorttype:'string'},
			{name:'goodsBrandName',index:'goodsBrandName',sortable:false, width:100,align:'center', sorttype:'string'},
			{name:'goodsModel',index:'goodsModel',sortable:false, width:100,align:'center', sorttype:'string'},
			{name:'goodsColorName',index:'goodsColorName',sortable:false, width:80,align:'center', sorttype:'string'},
			{name:'networkStandard',index:'networkStandard',sortable:false, width:80,align:'center', sorttype:'string'},
			{name:'ifManageIMei',index:'ifManageIMei',sortable:false, width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"1:√;0:"}}
        ];
		loadtable();
		//加载表格
		function loadtable(){
			$(options.TableName).jqGrid({
				url:options.LoadTableUrl,
				mtype:"GET",
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
	            rowList: [20, 25, 40],
	            pager:options.pager,
	            viewrecords: true,		           
	            width: "100%" ,
	            height: $(window).height()*0.44,
				autowidth:true,
				rownumWidth: 30, // the width of the row numbers columns
				shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
				ondblClickRow:function(id){
					var ids=$("#mainGrid").jqGrid("getDataIDs");
			    	for(var i=0; i < ids.length; i++){
			    		var rowData = $("#mainGrid").jqGrid("getRowData",ids[i]);
			    		if(id==rowData["id"]){
			    			$.zxsaas_plus.showalert("warning",'商品已存在');
			    			return false;
			    		}
			    	}
					selectedGoodsIds = selectedGoodsIds + "<" + id + ">";
				    $.request({
				        type: 'Post',
				        url: basePath + '/retail/deposit/loadRetailGoodsVo',
				        data: {
				    		goodsId : id
				    	},
				        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
				        success: function (data) {
				    		// 修改时,则删掉原来的已选中id
				    		var goodsId = $("#mainGrid").getCell(actionRowIndex,"goodsId");
				    		if(goodsId != ""){
				    			selectedGoodsIds = selectedGoodsIds.replace("<"+ goodsId +">", "");
				    		}
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"id",data.data.goodsVo.id); 
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"categoryName",data.data.goodsVo.categoryName); //商品类别
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"brandName",data.data.goodsVo.brandName); //品牌
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"code",data.data.goodsVo.code); 
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"name",data.data.goodsVo.name); 
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"models",data.data.goodsVo.models); 
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"color",data.data.goodsVo.color); 
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"retailPrice",data.data.goodsVo.retailPrice); 
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"presale","0.00"); 
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"number","1"); 
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"deposit","0.00"); 
				    		$("#mainGrid").jqGrid('setCell',actionRowIndex,"remark",""); 
				    		// 关闭商品选择模态框
					    	$("#goodsChoose").modal('hide');
					    	refreshBottom()
				        },
				        error: function () {
				            alert("加载商品信息失败！");
				        }
				    });
				},
				gridComplete: function() {
					var ids=$(options.TableName).jqGrid("getDataIDs");
				},
				loadComplete:function(data){
				},
				loadError:function(xhr,status,error){
				}
			});
		}
	},
	treeInit:function(){
		//树设置参数
		var setting = {
			data: {//数据属性设置
				simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
			},
	        async: {//从后台获取数据
	            enable: true,
	            url: basePath + "/retail/deposit/findGoodsclassTree",
	            autoParam:[],
	            dataFilter: null
	        },
			callback: {// 回调事件设置
	        	onClick:function(event, treeId, treeNode){
					// 通过选中节点id查询类型下所有商品
				    selectTreeClassId = Number(treeNode.id);
				    reLoadGrid();
	        	}
			},
			view: {//样式设置
				showIcon: false
			}
		};
		$.fn.zTree.init($("#goodsDataTree"), setting);
		var zTree = $.fn.zTree.getZTreeObj("goodsDataTree");
	    zTree.expandAll(true);  
	},
	businessInit:function(){
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
		$("#redDate").datetimepicker({
			lang:"ch",           //语言选择中文
			format:"Y-m-d",      //格式化日期
			timepicker:false,    //关闭时间选项
			todayButton:false    //关闭选择今天按钮
		}).addClass('date-time-icon');
	},
	popInit:function(){
	    $('#settleBtn').click(function () {
//	    	if(($.trim($('#customerName').val())==''&&$.trim($('#customerTel').val())!='')||($.trim($('#customerName').val())!=''&&$.trim($('#customerTel').val())=='')){
//    			$.zxsaas_plus.showalert('warning','姓名电话必须同时填写或者同时不填写！');
//    			return false;
//    		}
	    	$('#addAdminForm').bootstrapValidator('resetForm', false);//为true时清空表单内容
	    	$('#addAdminForm').data('bootstrapValidator').validate();
	    	if(!$('#addAdminForm').data('bootstrapValidator').isValid()){
	    		$.zxsaas_plus.showalert('warning','验证出错!');
	    		return false;
	    	}else{
	    		if(isView){
	    			var posTotal=0;//pos总金额
	    			var otherTotal=0;
		    		$('#myModal_rb_settle').modal('show');
		    		$('#settle_sure').prop('disabled',true);
		    		$('#table_settle input,#table_pos input').val('');
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
		    				otherTotal+=Number(val.amount)
		    				$('#other').val(otherTotal);
		    				$('#otherRemark').val(val.remark);
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
		    		var canSettle=true;
			    	var ids=$("#mainGrid").jqGrid("getDataIDs");
			    	for(var i=0; i < ids.length; i++){
			    		var rowData = $("#mainGrid").jqGrid("getRowData",ids[i]);
						if(rowData["id"]==null||rowData["id"]==''){
							canSettle=false;
							break;
						}
			    	}
			    	if(!canSettle){
			    		$.zxsaas_plus.showalert('warning','存在空商品!');
			    		return false;
			    	}else{
			    		var zzz=false;
			    		var deposits= $('#mainGrid').getCol('deposit',true);
			    		$.each(deposits,function(i,val){
			    			if(Number(val.value)==0){
			    				$.zxsaas_plus.showalert('warning','定金不能为0!');
			    				zzz=false
			    				return false
			    			}else{
			    				zzz=true
			    			}
			    		})
			    		if(!zzz){
			    			return false
			    		}
						refreshBottom();
						$("#table_pos tbody tr").remove();
						$("#cash,#cashRemark,#pos,#posRemark,#alipay,#alipayRemark,#weixin,#weixinRemark,#memberAmount,#memberAmountRemark,#deductionMoney,#deductionScore,#deductionRemark").removeAttr("accountId").prop("disabled",true).val("");
						// 获取并加载可使用资金账户
						$.request({
							type: 'Post',
							url: basePath + '/retail/deposit/findAccountList',
							data: {
								sectionId : $("#sectionId").val()
							},
							dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
							success: function (data) {
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
									}else if(item.content == "其它"){
										$("#table_other tbody").append("<tr><td>"+ item.accountName +"</td><td><input class='otherItem inputVal' accountId='"+ item.accountId +"' accountType='"+ item.accountType +"' type='text' onchange='sumOther();'/></td></tr>");
										$("#other").prop("disabled",false);
										$("#otherRemark").prop("disabled",false);
									}else if(item.content == "会员储值"){
										// 判断是否是会员
										if($("#cardId").val()!="" && $("#spanCustomerAmount").text()>0){
											// 存在会员时会员储值和积分抵现可用
											$("#memberAmount").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
											$("#memberAmountRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
										}
									}else if(item.content == "积分抵现"){
										// 判断是否是会员
										if($("#cardId").val()!="" && $("#spanCustomerScore").text()>0){
											// 存在会员时会员储值和积分抵现可用
											$("#deductionMoney").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
											$("#deductionScore").prop("disabled",false);
											$("#deductionRemark").attr("accountId",item.accountId).attr("accountType",item.accountType).prop("disabled",false);
										}
									}
								});
							},
							error: function () {
								alert("资金账户加载失败！");
							}
						});
						$('#myModal_rb_settle').modal('show');
				        $('#settle_thisTime').html('');
//				        $('#settle_balance').html('');
				        $('#spanCustomerScore').html($('#customerScore').val());//可用积分
				        $('#dScore').html($('#dScore_').val())
				        $('#dAmount').html($('#dAmount_').val())
				        $('#spanCustomerAmount').html($('#customerAmount').val());//储值余额
				        //POS机
				        $('#pos').focus(function () {
				            $('#myModal_table_pos_con').modal('show')
				        });
				        $('#other').focus(function () {
				            $('#myModal_table_other_con').modal('show')
				        });
				        $('#settle_sure').click(function () {
				        	if(Number($('#settle_balance').text())!=0){
				        		$.zxsaas_plus.showalert("warning",'应收余额必须为0');
				        		return false;
				        	}else{
				        		// 封装参数
					        	var retailMainDraft = {};
					        	retailMainDraft.sectionId = $("#sectionId").val().trim();
					        	retailMainDraft.salesmanId = $("#employeeId").val().trim();
					        	retailMainDraft.billsDate = $("#businessDate").val().trim();
					        	retailMainDraft.ssAmount = $("#depositTotal").val().trim();
					        	retailMainDraft.memberId = $("#memberId").val().trim();
					        	retailMainDraft.customName = $("#customerName").val().trim();
					        	retailMainDraft.telephone = $("#customerTel").val().trim();
					        	retailMainDraft.remark = $("#remark").val().trim();
					        	var retailDepositDraftList = [];
					        	var ids=$("#mainGrid").jqGrid("getDataIDs");
					        	for(var i=0; i < ids.length; i++){
					        		var rowData = $("#mainGrid").jqGrid("getRowData",ids[i]);
									if(rowData["id"] != null && rowData["id"] != ''){
						        		var retailDepositDraft={}; 
						        		retailDepositDraft.goodsId = rowData["id"];
						            	retailDepositDraft.presetPrice = rowData["presetPrice"];
						            	retailDepositDraft.goodsNum = rowData["goodsNum"];
						            	retailDepositDraft.deposit = rowData["deposit"];
						            	retailDepositDraft.remark = rowData["remark"];
						            	retailDepositDraftList.push(retailDepositDraft);
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
					            		if($(it).hasClass("inputRemark")){
					            			payItem.remark = $(it).val().trim();
					            		}
					            	});
					            	if(hasAccountId&&payItem.payreceiptAmout!=''){
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
					            		payItem.remark = $("#posRemark").val().trim();
					            		if(payItem.payreceiptAmout!=''){
					            			payList.push(payItem);
					            		}
					            	});
					            });
					         // other信息
					            $("#table_other tbody tr").each(function(index,item){
					            	$(item).find("input[accountId]").each(function(i,it){
					            		var payItem = {};
					            		payItem.accountId = $(it).attr("accountId");
					            		payItem.accountType = $(it).attr("accountType");
					            		if($(it).hasClass("inputVal")){
					            			payItem.payreceiptAmout = $(it).val().trim();
					            		}
					            		payItem.remark = $("#otherRemark").val().trim();
					            		if(payItem.payreceiptAmout!=''){
					            			payList.push(payItem);
					            		}
					            	});
					            });
					        	var obj = {};
					        	obj.retailMainDraft = retailMainDraft;
					        	obj.retailDepositDraftList = retailDepositDraftList;
					        	obj.payList = payList;
								$.request({
									url: basePath + '/retail/deposit/saveOrder',
									type: "POST",
									datatype : "json",
									data: {jsonData : JSON.stringify(obj)},
									traditional: true,
									success: function (data) {
										if(data.result==1||data.result==2||data.result==-2){
											$.zxsaas_plus.showconfirmsure("提示",data.desc,function(){
												window.location.href=basePath+'/retail/deposit/retailDepositMain';
											});
										} else {
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
	    	}
	    });
	}
}

function locationhref(){
	var localUrl = window.location.href;
	var url1 = localUrl.split("?")[1];
	if(url1 == undefined){
		return
	}
	var url2 = url1.split('=');
	if(url2[0] == "retailMainId" || url2[0] == "retailMainIdCopy"){
		var obj ={
			retailMainId : url2[1]
		};
		$.request({
			url:basePath + '/retail/deposit/searchDepostOrder',
			type:'post',
			dataType:'json',
			data:obj,
			success:function(data){
				if(data.result==1){
					$("#mainGrid").jqGrid('setGridParam', {
						ajaxGridOptions:{async:false},
						mtype:'post',
						url:basePath+'/retail/deposit/searchDepostOrder',
						datatype:'json',
						postData:obj
					}).trigger("reloadGrid");
					checkDoc(data)
					var order = data.data.retailDepositOrder;

					$('#sectionId').find('option[value='+ order.sectionId +']').attr("selected",true);
					$('#sectionId').change();
					$('#employeeId').find('option[value='+ order.salesmanId +']').attr("selected",true);
					$('#businessDate').val(order.billsDate);
					$('#remark').val(order.remark);
					if(url2[0] == "retailMainIdCopy"){
						$('#billsNum').val('');
					}else{
						$('#billsNum').val(order.billsCode);
					}

					$('#cardNum').val(order.cardNum);
//					$('#cardTypeId').val(order.cardTypeId);
					$('#customerName').val(order.customerName);
					$("#memberId").val(order.cardId);
					$('#customerTel').val(order.customerTel);
					$('#customerType').val(order.customerType);
					$('#customerAmount').val(order.customerAmount);
					$('#customerScore').val(order.customerScore);

				}else{
					$.zxsaas_plus.showalert("error",data.desc);
				}
			},
			error:function(msg){
				$.zxsaas_plus.showalert("error","过滤失败"+msg);
			}
		})
	}
	
}

$(function(){
	mainScope.init();
	// 加载可使用部门和部门下的营业员
	loadSectionAndEmployee();
	// 部门下拉框添加change事件
	bindChangeEvent();
	// 删除按钮绑定click事件
	bindClickEvent();
	//查询的截至日期及开始日期初始化
	
	
//	判断是否复制一单
	locationhref();

    var billsId=functionObjExtent.getQueryString('billsId')

    var billsCode=functionObjExtent.getQueryString('billsCode')
    //	是否从报表进入
    if (billsId != '' || billsCode != '') {
        var obj={};
        obj.billsId=billsId;
       queryPage(obj)
    }

	//过滤的按钮触发事件
	$('#modalFilter').click(function(){
		var obj={};
		obj.startTime=$.trim($('.beginDate').val());
		obj.endTime=$.trim($('.endDate').val());
		obj.billsCode=$.trim($('#modalBillsCode').val());
		obj.cardNum=$.trim($('#modalCardNum').val());
		obj.customerName=$.trim($('#modalCustomers').val());
		obj.customerTel=$.trim($('#modalPhone').val());
		obj.queryCodeStr='F';
		obj.refBillsId=$('#billsId').val()
		$.request({
			url:basePath + '/retail/deposit/searchDepostOrder',
			type:'post',
			dataType:'json',
			data:obj,
			success:function(data){
				if(data.result==1){
					$("#mainGrid").jqGrid('setGridParam', {
						ajaxGridOptions:{async:false},
						mtype:'post',
						url:basePath+'/retail/deposit/searchDepostOrder',
						datatype:'json',
						postData:obj
					}).trigger("reloadGrid");
					checkDoc(data)
				}else{
					$.zxsaas_plus.showalert("error",data.desc);
				}
			},
			error:function(msg){
				$.zxsaas_plus.showalert("error","过滤失败"+msg);
			}
		})
	})
	//模态窗的过滤失焦事件
	$('#goodsNameKeyWord').blur(function(){
//		reLoadGrid();
	});
	$('#goodsSearchBtn').click(function(){
		reLoadGrid();
		$('.jqGrid_wrap div').css('width','auto');
	})
	//退定事件
	$('#deleBtn').click(function(){
		$('#sureReturn').modal('show');
		var deHtml=$('#sectionId').html();
		$('#department').html(deHtml);
		var index=$('#sectionId option:selected').index();
		$('#department option:eq('+index+')').prop('selected',true);
	})
	//快速检索
	$('#fastSearch').keydown(function(e){
		if(e.keyCode===13){
			var $that=$(this);
			$.request({
				url:basePath + '/retail/deposit/searchDepostGoodsList',
				type:'get',
				dataType:'json',
				data:{
					allParams:$that.val(),
					sectionIds:$('#department option:selected').val()
				},
				success:function(data){
					if(data.result===1){
						var retailDepositOrder=data.data.retailDepositOrder;
						var html='';
						var arr=[];
						if(!$("#modalDeposit tbody tr:first").find('td').eq(1).html()){
							$("#modalDeposit tbody tr:first").remove();
						}
						$("#modalDeposit tbody tr").each(function(){
							arr.push($(this).data('id'));
						})
						if(arr.indexOf(retailDepositOrder.billsId)===-1){
							html="<tr data-id='"+retailDepositOrder.billsId+"'><td><input type='checkbox' class='depositCheckbox' /></td><td>"+retailDepositOrder.billsCode+"</td><td>"+retailDepositOrder.billsDate.split(' ')[0]+"</td><td>"+retailDepositOrder.customerName+"</td><td>"+retailDepositOrder.customerTel+"</td><td>"+retailDepositOrder.remainDeposit+"</td></tr>"
							$("#modalDeposit tbody").append(html);
						}else{
							$.zxsaas_plus.showalert("warning","单据已展示!")
						}
					}
				}
			})
		}
	})
	//快速查询中的checkbox
	$(document).on('click','.depositCheckbox',function(){
		if($(this).prop('checked')){
			$('.depositCheckbox').prop('checked',false);
			$(this).prop('checked',true);
		}
	})
	//退定已选单据
	$('.deleChecked').click(function(){
		var billId;
		$('.depositCheckbox').each(function(){
			if($(this).prop('checked')){
				billId=$(this).parents('tr').data('id');
			}
		})
		if(!billId){
			$.zxsaas_plus.showalert("warning","请勾选单据!")
		}else{
			location.href=basePath + "/retail/deposit/retailDepositMainBack?retailMainId="+billId;
		}
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
//	    rowList:[10, 15, 20, 25, 40],
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
	    	var ids=$("#mainGrid").jqGrid("getDataIDs");
	    	var idxgoodsid=$("#barcodepro").jqGrid("getRowData",rowid).goodsId;
	    	var addnew=false;
			$.each($("#mainGrid").getCol('id',true),function(j,jj){
				if(jj.value==idxgoodsid){
					var mm=$("#mainGrid").jqGrid("getRowData",jj.id).goodsNum;
					$("#mainGrid").jqGrid("setCell",jj.id,"goodsNum",Number(mm)+1);
					addnew=false;
					return false;
				}else{
					addnew=true
				}
			})
			if(addnew){
				var val=$("#barcodepro").jqGrid("getRowData",rowid);
				var maxId = ids.length == 0 ? 0 : Math.max.apply(null,ids);
				$('#mainGrid').jqGrid('addRowData',maxId+1,{
		            id:val.goodsId,
		            brandName:val.brandName,
		            categoryName:val.categoryName,
		            code:val.code,
		            name:val.name,
		            models:val.models,
		            color:val.color,
		            retailPrice:val.retailPrice,
		            goodsNum:1
		        }, 'last');
				$.each($("#mainGrid").getCol('id',true),function(j,jj){
					if(jj.value==''){
						$('#mainGrid').jqGrid('delRowData',jj.id);
					}
				})
			}
			$('#myModal_barcodepro').modal('hide');
			$('#rb_superInput').val('').focus()
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
	$('#myModal_barcodepro').on('shown.bs.modal', function (e) {
		$('.gridWrap div').css('width','auto')
	})
	//商品、会员
	var searchState=2;//搜索状态，默认商品
	$('#rb_superInput').keyup(function(e){
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
			if(searchState==2){//商品
				if($('#rb_superInput').val().length<5){$.zxsaas_plus.showalert('warning','索引长度至少5位！');$('#rb_superInput').blur();return;}
				$.request({
		        	type:'post',
		        	url:basePath+'/inventory/common/getGoodsBarcodeVoList',
		        	data:{
		        		queryKey:$('#rb_superInput').val()
		        	},
		        	dataType:'json',
		        	success:function(data){
		        		if(data.result==1){
		        			var resArr=data.data.goodsBarcodeVoList;
		        			if(!resArr.length){
		        				$.zxsaas_plus.showalert("warning",'没有查询到商品!')
		        			}else if(resArr.length==1){
		        				var val=resArr[0];
		        				var idxgoodsid=resArr[0].goodsId;
		        				var ids=$("#mainGrid").jqGrid("getDataIDs");
		        				var addnew=false;
		        				$.each($("#mainGrid").getCol('id',true),function(j,jj){
									if(jj.value==idxgoodsid){
										var mm=$("#mainGrid").jqGrid("getRowData",jj.id).goodsNum;
										$("#mainGrid").jqGrid("setCell",jj.id,"goodsNum",Number(mm)+1);
										addnew=false;
										return false;
									}else{
										addnew=true
									}
								})
								if(addnew){
									var maxId = ids.length == 0 ? 0 : Math.max.apply(null,ids);
									$('#mainGrid').jqGrid('addRowData',maxId+1,{
										categoryName:val.categoryName,
										brandName:val.brandName,
							            id:val.goodsId,
							            code:val.code,
							            name:val.name,
							            models:val.models,
							            color:val.color,
							            retailPrice:val.retailPrice,
							            goodsNum:1
							        }, 'last');
									$.each($("#mainGrid").getCol('id',true),function(j,jj){
										if(jj.value==''){
											$('#mainGrid').jqGrid('delRowData',jj.id);
										}
									})
								}
		        				$('#rb_superInput').val('').focus()
		        			}else{
		        				$('#myModal_barcodepro').modal('show');
		        				$("#barcodepro").jqGrid('setGridParam', {
		        					url:basePath+'/inventory/common/getGoodsBarcodeVoList',
		        					datatype:'json',
		        					postData:{queryKey:$('#rb_superInput').val()}
		        				}).trigger("reloadGrid");
		        				$('#rb_superInput').val('').focus()
		        			}
		        		}else{
		        			$.zxsaas_plus.showalert("error",data.desc)
		        		}
		    		},
		    		error:function(){
		    			alert('请求失败！')
		    		}
		        })
			}else{//会员
				$('#myModal_rb_MQR').modal('show');
				$.request({
		        	type:'post',
		        	url:basePath+'/retail/billing/searchCustomerVoList',
		        	data:{
		        		queryKey:$('#rb_superInput').val()
		        	},
		        	dataType:'json',
		        	success:function(data){
		        		var rb_MQR=data.data.customerVoList;
		        		var html;
		        		if(rb_MQR.length==0){
		        			$("#rb_MQR tbody").html('')
		        		}else{
		        			$.each(rb_MQR,function(i,val){
		        				for(var key in val){
		        					if(val[key]==null){
		        						val[key]='';
		        					}
		        				}
		            			html+='<tr><td><a class="rb_MQR_choose" href="javascript:void(0)">选择</a><input class="rb_MQR_cardNumID" type="hidden" value="'+val.cardId+'"/><input class="rb_MQR_dAmount" type="hidden" value="'+val.dAmount+'"/><input class="rb_MQR_dScore" type="hidden" value="'+val.dScore+'"/></td>'+
		                        '<td class="rb_MQR_cardNum">'+val.cardNum+'</td>'+
		                        '<td class="rb_MQR_customerName">'+val.customerName+'</td>'+
		                        '<td class="rb_MQR_customerTel">'+val.customerTel+'</td>'+
		                        '<td class="rb_MQR_customerType">'+val.customerType+'<input class="rb_MQR_cardTypeId" type="hidden" value="'+val.cardTypeId+'"/></td>'+
		                        '<td class="rb_MQR_contactUnitName">'+val.contactUnitName+'<input class="rb_MQR_contactUnitId" type="hidden" value="'+val.contactUnitId+'"/></td>'+
		                        '<td class="rb_MQR_remark">'+val.remark+'</td>'+
		                        '<input class="rb_MQR_customerScore" type="hidden" value="'+val.customerScore+'"/>'+
		                        '<input class="rb_MQR_customerAmount" type="hidden" value="'+val.customerAmount+'"/></tr>';
		            		})
		            		$("#rb_MQR tbody").html(html)
		        		}
		    		},
		    		error:function(){
		    			alert('请求失败！')
		    		}
		        })
			}
		}
	})
	//会员查询结果选择按钮
	$(document).on('click','.rb_MQR_choose',function(){
		var _thisClosestTr=$(this).closest('tr');
		$('#cardNum').val(_thisClosestTr.find('.rb_MQR_cardNum').text())
		$("#memberId").val(_thisClosestTr.find('.rb_MQR_cardNumID').val())
		$('#cardTypeId').val(_thisClosestTr.find('.rb_MQR_cardTypeId').val())
		$('#customerName').val(_thisClosestTr.find('.rb_MQR_customerName').text())
		$('#customerTel').val(_thisClosestTr.find('.rb_MQR_customerTel').text())
		$('#customerType').val(_thisClosestTr.find('.rb_MQR_customerType').text())
		$('#customerAmount').val(_thisClosestTr.find('.rb_MQR_customerAmount').val())
		$('#customerScore').val(_thisClosestTr.find('.rb_MQR_customerScore').val())
		$('#dAmount_').val(_thisClosestTr.find('.rb_MQR_dAmount').val())
		$('#dScore_').val(_thisClosestTr.find('.rb_MQR_dScore').val())
		$("#rb_superInput").val('');
		$('#myModal_rb_MQR').modal('hide');
		$('#addAdminForm').bootstrapValidator('resetForm', false);//为true时清空表单内容
		$('#addAdminForm').data('bootstrapValidator').validate();
	    if (!$('#addAdminForm').data('bootstrapValidator').isValid()) {
	        return false;
	    }else{
	    	$('#customerName,#customerTel').prop('disabled',true);
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
		        	 notEmpty: {
			             message: '不能为空'
			         },
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
					 notEmpty: {
					     message: '不能为空'
					 },
		             regexp: {
		            	 regexp: /^1(3|4|5|7|8|9)\d{9}$/,
		            	 message: '手机号码格式错误'
		             },
	         	}
        	}
         }
    })
})

// 加载可使用部门和部门下的营业员
function loadSectionAndEmployee(){
    $.request({
        type: 'Post',
		async:false,
        url: basePath + '/department/interfaceDeptAndEmp',
        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        success: function (data) {
    		var curSectionId = data.data.curSectionId;
    		// 门店
	    	$("#sectionId option").remove();
    		$(data.data.sectionList).each(function(index,item){
    			if(item.id == curSectionId){
    				$("#sectionId").append("<option value='" + item.id + "' selected>" + item.name + "</opion>");
    			}else{
    				$("#sectionId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
    			}
    		});
    		// 营业员
    		$("#employeeId option").remove();
    		$(data.data.empList).each(function(index,item){
    			$("#employeeId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
    		});
        },
        error: function () {
            alert("可使用部门和营业员加载失败！");
        }
    });
}
// 绑定值改变事件
function bindChangeEvent(){
	$("#sectionId").bind("change", function() {
	    $.request({
	    	async: false,
	        type: 'Post',
	        url: basePath + '/aboutPeople/interfaceSelfCompanyEmployees',
	        data: {
	    		sectionId : $("#sectionId").val()
	    	},
	        dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
	        success: function (data) {
	    		// 营业员
	    		$("#employeeId option").remove();
	    		$(data.data.empList).each(function(index,item){
	    			$("#employeeId").append("<option value='" + item.id + "'>" + item.name + "</opion>");
	    		});
	        },
	        error: function () {
	            alert("营业员加载失败！");
	        }
	    });
	});
	$('#searchVip').click(function(){
		$("#deductionMoney,#deductionScore,#deductionRemark,#memberAmount,#memberAmountRemark,#cardNum,#customerName,#customerTel").prop("disabled",true);
		$.request({
			type: 'Post',
			url: basePath + '/retail/deposit/loadCustomerVo',
			data: {
				cardNum : $("#cardNum").val(),
				customerName : $("#customerName").val(),
				customerTel : $("#customerTel").val()
			},
			dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
			success: function(data){
				$("#cardId").val(data.data.customerVo.cardId);
				$("#cardNum").val(data.data.customerVo.cardNum);
				$("#customerName").val(data.data.customerVo.customerName);
				$("#customerTel").val(data.data.customerVo.customerTel);
				$("#customerType").val(data.data.customerVo.customerType);
				$("#customerScore").val(data.data.customerVo.customerScore);
				$("#customerAmount").val(data.data.customerVo.customerAmount);
				// 会员拥有的积分和储值
				$("#spanCustomerScore").text(data.data.customerVo.customerScore);
				$("#spanCustomerAmount").text(data.data.customerVo.customerAmount);
				// 抵现标准
				$("#dScore").text(data.data.customerVo.dScore);
				$("#dAmount").text(data.data.customerVo.dAmount);
				if(data.data.customerVo.customerScore > 0){
					$("#deductionMoney").prop("disabled",false);
					$("#deductionScore").prop("disabled",false);
					$("#deductionRemark").prop("disabled",false);
				}
				if(data.data.customerVo.customerAmount > 0){
					$("#memberAmount").prop("disabled",false);
					$("#memberAmountRemark").prop("disabled",false);
				}
			},
			error: function () {
				alert("会员加载失败！");
			}
		});
	})
}
// 绑定点击事件
function bindClickEvent(){
	//增加一行
	$(document).on('click', '.add-boost',function(e){
		var id = $("#mainGrid").jqGrid("getGridParam", "selrow");//index
		var ids=$("#mainGrid").jqGrid("getDataIDs");//获取行ID数组
		var maxid = (ids.length ==0 ) ? 0 : Math.max.apply(null,ids);
		$('#mainGrid').addRowData(maxid+1,{"id":"","code":"","handle":"","name":"","models":"","color":"","retailPrice":"0","presetPrice":"0","goodsNum":"0","deposit":"0","remark":""},'after',id);
	})
	// 删除一行
	$(document).on('click', '.delect-boost',function(e){
		var id = $("#mainGrid").jqGrid("getGridParam", "selrow");//index
		var ids=$("#mainGrid").jqGrid("getDataIDs");//获取行ID数组
		if(ids.length==1){
			$.zxsaas_plus.showalert("warning","至少保留一条数据!")
			return false
		}else{
			$.zxsaas_plus.showconfirm("提示","是否确定删除本行?",function(){
				$("#mainGrid").jqGrid('delRowData',id);
				refreshBottom()
			});
		}
	});
	// 加号事件
	$(document).on('click', '.storName',function(e){
		actionRowIndex = $(this).attr("data-rId");
	});
	// 上一单,下一单按钮事件
	$(".handover").bind("click",function(){
		$('#rb_superInput').val('')
		var _this=$(this);
		var obj={};
		obj.startTime=$.trim($('.beginDate').val());
		obj.endTime=$.trim($('.endDate').val());
		obj.billsCode=$.trim($('#modalBillsCode').val());
		obj.cardNum=$.trim($('#modalCardNum').val());
		obj.customerName=$.trim($('#modalCustomers').val());
		obj.customerTel=$.trim($('#modalPhone').val());
		obj.queryCodeStr=_this.attr("code");
		obj.refBillsId=$('#billsId').val()

        queryPage(obj,function (data) {
            var codeFlag=_this.attr('code');
            if(data.result!=1){
                switch(codeFlag){
                    case 'F':
                        $.zxsaas_plus.showalert("warning","未查询到该单据!")
                        break;
                    case 'P':
                        $.zxsaas_plus.showalert("warning","没有上一单了!")
                        break;
                    case 'N':
                        $.zxsaas_plus.showalert("warning","没有下一单了!")
                        break;
                    case 'L':
                        $.zxsaas_plus.showalert("warning","未查询到该单据!")
                        break;
                }
			}
        })
	});


	
    //稽核、取消稽核
    $('.listAudit').click(function () {
        var $this=$(this)
        var auditStatus=$this.data('auditstatus')
        var billsId=$('#billsId').val();
        var billsStatus=$("#billsStatus").val()
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
                billsType:48,
            },
            success:function(data){
                $.zxsaas_plus.showalert('success', "稽核成功!");
                var obj={};
                obj.refBillsId=billsId;
                obj.queryCodeStr='';
                queryPage(obj)
            }
        })
    })
}
//重新加载刷新数据
function reLoadGrid(){
    $("#jqGrid_goodsMsgAdd").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:getQueryModel(),
        page:1  
    }).trigger("reloadGrid"); //重新载入  
}
//获取分页查询参数
function getQueryModel(){
    var model = {};
    model.goodsName = $("#goodsNameKeyWord").val();
    model.goodsCategoryId = selectTreeClassId ;
	return model;
}
// 刷新表格底部数量及金额
function refreshBottom(){
	var depositTotal=($("#mainGrid").getCol('deposit',false,'sum')).toFixed(2);
	$("#mainGrid").footerData('set',{"deposit":'定金合计:'+depositTotal},false);
    $("#depositTotal").val(depositTotal);
    $("#spanDepositTotal").text(depositTotal);
    $("#settle_balance").text(depositTotal);
}
// pos刷卡金额汇总
function sumPos(){
	var sumAmount = 0;
	$("#table_pos tbody tr input").each(function(){
		sumAmount = sumAmount + Number($(this).val());
	});
	$("#pos").val(sumAmount);
}
function queryPage(obj,callback) {
    $.request({
        type: 'post',
        url: basePath + '/retail/deposit/searchDepostOrder',
        data:obj,
        dataType: "json",
        success: function (data) {
            if(data.result==1){
                $("#mainGrid").jqGrid('setGridParam', {
                    ajaxGridOptions:{async:false},
                    mtype:'post',
                    url:basePath+'/retail/deposit/searchDepostOrder',
                    datatype:'json',
                    postData:obj
                }).trigger("reloadGrid");
                checkDoc(data)
            }
            if(callback){
                callback(data)
            }
        },
        error: function () {
            alert("查询单据失败！");
        }
    });
}

//其它账户金额汇总
function sumOther(){
	var sumAmount = 0;
	$("#table_other tbody tr input").each(function(){
		sumAmount = sumAmount + Number($(this).val());
	});
	$("#other").val(sumAmount);
}
//模态窗的参数封装
function getFilterParam(){
	var obj={};
	obj.startTime=$.trim($('.beginDate').val());
	obj.endTime=$.trim($('.endDate').val());
	obj.billsCode=$.trim($('#modalBillsCode').val());
	obj.cardNum=$.trim($('#modalCardNum').val());
	obj.customerName=$.trim($('#modalCustomers').val());
	obj.customerTel=$.trim($('#modalPhone').val());
	obj.refBillsId=$('#billsId').val()
	return obj;
}
//上一单下一单及过滤后重绘页面
function checkDoc(data){
	isView=true;
	var retailDepositOrder=data.data.retailDepositOrder;
	var retailGoodsVoList=data.data.retailDepositOrder.retailGoodsVoList;
	var empList=data.data.empList;
	var sectionList=data.data.sectionList;
	var empHtml='';
	var sectionHtml='';
	$('#spanCustomerScore,#dScore,#dAmount,#spanCustomerAmount').html('')
	collectionDetails=data.data.retailDepositOrder.payRecieveDetailList;//收款明细
	$('#billsId').val(retailDepositOrder.billsId);
	$('#billsNum').val(retailDepositOrder.billsCode);
	$('#billsStatus').val(retailDepositOrder.billsStatus);
	$('#auditStatus').val(retailDepositOrder.auditStatus);
	$('#businessDate').val(retailDepositOrder.billsDate.split(' ')[0]);
	$('#cardNum').val(retailDepositOrder.cardNum);
	$('#customerName').val(retailDepositOrder.customerName);
	$('#customerTel').val(retailDepositOrder.customerTel);
	$('#customerType').val(retailDepositOrder.customerType);
	$('#customerAmount').val(retailDepositOrder.customerAmount);
	$('#customerScore').val(retailDepositOrder.customerScore);
	for(var i=0,len=empList.length;i<len;i++){
		 empHtml+='<option value="'+empList[i].id+'">'+empList[i].name+'</option>'
	}
	for(var i=0,len=sectionList.length;i<len;i++){
		sectionHtml+='<option value="'+sectionList[i].id+'">'+sectionList[i].name+'</option>'
	}
	$('#employeeId').html(empHtml);
	$('#sectionId').html(sectionHtml);
	$('#sectionId option').each(function(i,item){
		if($(this).val()==retailDepositOrder.sectionId){
			$(this).prop('selected',true);
		}
	})
	$('#employeeId option').each(function(i,item){
		if($(this).val()==retailDepositOrder.salesmanId){
			$(this).prop('selected',true);
		}
	})
	$('#depositTotal').val(retailDepositOrder.billsAmount);
	$("#receipt").val(retailDepositOrder.billsAmount);
	$('#remark').val(retailDepositOrder.remark);
	
	$('#mainGrid').setGridParam({'cellEdit': false});
	btnProhibit();
	if($('#billsStatus').val()==7){
		$('#redSign').show();
		$('#red').prop('disabled',true);
	}else{
		$('#redSign').hide();
		$('#red').prop('disabled',false);
	}

    if (retailDepositOrder.auditStatus == 1) {
        $('#imgAudit').attr('src', '/manager/images/audit.png');
    } else if (retailDepositOrder.auditStatus == 0){
        $('#imgAudit').attr('src', '/manager/images/auditNo.png');
    }else{
        $('#imgAudit').attr('src', '');
    }
}
$('#newBill').click(function(){
	window.location.href=basePath+'/retail/deposit/retailDepositMain';
})
$('#table_settle').keyup(function(){
	thisTimesettleTotal()
})
$('#myModal_table_pos_con').on('hidden.bs.modal',function(){
	thisTimesettleTotal()
})
$('#myModal_table_other_con').on('hidden.bs.modal',function(){
	thisTimesettleTotal()
})
function thisTimesettleTotal(){//结算框计算
	var STol=(Number($('#cash').val())+Number($('#pos').val())+Number($('#alipay').val())+Number($('#weixin').val())+Number($('#other').val())+Number($('#memberAmount').val())+Number($('#deductionMoney').val())).toFixed(2);
	$('#settle_thisTime').html(STol);
	$('#settle_balance').html((Number($('#spanDepositTotal').html())-Number($('#settle_thisTime').html())).toFixed(2));//应收余额
}
//积分&余额
$('#deductionMoney').keyup(function(){//余额
	var bl=Number($('#dAmount').text())/Number($('#dScore').text());
	if(Number($(this).val())>(Number($('#spanCustomerScore').html())*bl)){
		$(this).val(Number($('#spanCustomerScore').html())*bl)
	}
	$('#deductionScore').val(Number($(this).val())/bl);
});
$('#deductionScore').keyup(function(){//积分
	var bl=Number($('#dAmount').text())/Number($('#dScore').text());
	if(Number($(this).val())>Number($('#spanCustomerScore').html())){
		$(this).val(Number($('#spanCustomerScore').html()))
	}
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
function btnProhibit(){
	$('.add-boost,.delect-boost,.storName').css({
		'width':'0',
		'overflow':'hidden'
	})
	$('.inputbox select,.inputbox button').prop('disabled',true);
	// $('input').prop('disabled',true);
	$('#search input,#redDate,#toAccount,#pos').prop('disabled',false);
	
}
$('#red').click(function(){
	$('#myModal_red').modal('show');
})
$('#red_sure').click(function(){
	$.request({
		type:'post',
    	url:basePath+'/retail/deposit/redDepositOrder',
    	data:{
			billsId:$('#billsId').val(),
			redDate:$('#redDate').val()
		},
    	dataType:'json',
    	success:function(data){
			if(data.result==1){
				$.zxsaas_plus.showalert("success","红冲成功!")
			}else{
				$.zxsaas_plus.showalert("error",data.desc)
			}
		},
		error:function(){
			alert('请求失败！')
		}
	})
})
$('#resetSearchOptions').click(function(){
	$('.formWrap input').val('')
})
$('#rb_superInput').focus()



//******************** 打印  **********************//
function print(){
	var id = $('#billsId').val();
	if(id==""){
		$.zxsaas_plus.showalert("提示","请选择一张单据");
		return;
	}
	$.printBills(basePath + '/retail/print/dingjin',{billsId:id});
}











