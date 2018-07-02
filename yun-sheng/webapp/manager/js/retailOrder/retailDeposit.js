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
				url:"../../json/retailOrder/retailDeposit.json",
				mtype:"GET",
				datatype: "json",				
				jsonReader  : {	
						root: "row",
						repeatitems: false
							},
				colNames:['商品编码','操作','商品名称','类型','颜色','零售价','预售价','数量','定金','备注'],          
			    colModel:[
							{name:'goodsCode',index:'goodsCode',width:200,align:'center'},
							{name:'handle',index:'handle',width:60,align:'center',formatter:function(cellvalue, options, rowObjec){
								
								return '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash delect-boost" aria-hidden="true" id="add_row" title="删除行"></span></div>';
								
							}},
							{name:'goodsName',index:'goodsName',width:200,align:'center',formatter:function(cellvalue, options, rowObject){
								if(cellvalue==undefined){
									cellvalue="";
								}
								return '<input type="text" class="storRid' + options.rowId +'" style="border:0;text-align:center;width:170px" value="' + cellvalue +'" /><span class="storName glyphicon glyphicon-plus" data-toggle="modal" data-target="#goodsChoose" data-rId="' + options.rowId +'"></span>';
								}
							},
							{name:'goodsType',index:'goodsType',width:200,align:'center'},
							{name:'goodsColor',index:'goodsColor',width:200,align:'center'},
							{name:'retailPrice',index:'retailPrice',width:200,align:'center'},
							{name:'presale',index:'presale',width:200,align:'center',editable:true,formatter:"number"},
							{name:'number',index:'number',width:200,align:'center',formatter:"integer",editable:true},
							{name:'deposit',index:'deposit',width:200,align:'center',formatter:"number",editable:true},
							{name:'remark',index:'remark',width:200,align:'center',editable:true,formatter:'string'}
			            ],
			    sortable:false,	
			    rownumbers:true,
			    cellsubmit: 'clientArray',//单元格保存内容的位置		
			    editurl: 'clientArray',
			    rowList:[10,15,20],
			    pager:"#mainPager",
			    viewrecords: true,		           
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
					if(index===2){
						return false;
					}
					var colName=$(this).jqGrid('getGridParam','colModel')[index].name 
			      	select_name=colName
			      	select_index=index;
					var ids = $(this).jqGrid('getDataIDs');
					//获得当前最大行号（数据编号）
					var maxid;
					maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
//					console.log(maxid);
					//当用户点击表格最后一行时,自动增加一行
					(id == maxid) && $(this).jqGrid('addRowData', maxid+1, {}, 'last' )
				},
				onSelectRow:function(id){

				},
				beforeSelectRow:function(rowid,e){

				},
				afterInsertRow: function (rowid, aData) { //新增一行之后

				},
				gridComplete: function() {
					
				},
				loadComplete:function(data){
					 var rowNum = parseInt($(this).getGridParam('records'), 10);
	                    if (rowNum > 0) {
	                            $(".ui-jqgrid-sdiv").show();
	                            var numberTotal = $(this).getCol('number', false, 'sum');
	                            var depositTotal=$(this).getCol('deposit', false, 'sum');
	                       $(this).footerData("set", { "number":'数量合计：<font color="red" >'+numberTotal+'</font>',"deposit":'定金合计：<font color="red" >'+depositTotal+'元</font>'},false);
	                      } else {
	                        $(".ui-jqgrid-sdiv").hide();
	                    }
				},
				loadError:function(xhr,status,error){
					
				}
				})
		},
		/*商品名称弹窗*/
		goodsNamePopInit:function(){
			var options = {
					LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
					LoadTableUrl: "../../json/admin/metaData12.json",
					//LoadTableUrl: "../../cw/qc/getSubject", //表格数据加载接口地址
					GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
					//LoadTableFomatUrl:"../../json/T_roles.json",
					//LoadTableFomatUrl: "../../", //获取表格显示格式数据加载地址
					//SaveEditUrl: "", //新增或修改后保存数据接口地址
					//SaveAddUrl: "", //新增或修改后保存数据接口地址
					DelRowUrl: "", // 删除信息接口地址
					isSub:"",//是否有子级表格
					subLoadTableUrl:"",//子级表格数据来源地址
					//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
					TableName: "#jqGrid_goodsMsgAdd", //显示表格名称。遵照css选择器书写
					iconJsonUrl:"../json/icon.json",
					btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
					pager:"#gridpager_goods"
			//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
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
						//var toggleflag=false;//冻结时候切换用
						var colNames = ['ID','商品编码','商品名称','商品类别','商品品牌','商品型号','商品颜色','网络制式','是否管理串号'];
						var JqGridColModel=[
											{name:'blocId',index:'blocId', width:55,align:'center', sorttype:'string',hidden:true},
											{name:'metaSearch',index:'metaSearch', width:100,align:'center', sorttype:'string'},
											{name:'metaName',index:'metaName', width:100,align:'center', sorttype:'string',formatter: function(cellvalue, options, rowObject){
												
												return '<span class="goodsCheck" data-dismiss="modal">' + cellvalue + '</span>';
											}
											},
											{name:'metaUpdate',index:'metaUpdate', width:100,align:'center', sorttype:'string'},
											{name:'metaDelete',index:'metaDelete', width:100,align:'center', sorttype:'string'},
											{name:'metaGuo',index:'metaGuo', width:100,align:'center', sorttype:'string'},
											{name:'metaGuo',index:'metaGuo', width:100,align:'center', sorttype:'string'},
											{name:'metaGuo',index:'metaGuo', width:100,align:'center', sorttype:'string'},
											{name:'metaHong',index:'metaHong', width:100,align:'center', sorttype:'string'}
						                ];
						
						loadtable();
						
						//加载表格
					
						/*$.getJSON(options.LoadTableUrl,function(t_datat){
							mydata=t_datat;
							//$(options.TableName).setGridParam({data: mydata}).trigger('reloadGrid');  
						});*/
						function loadtable(){
			//				$.post(options.LoadTableUrl,{},function(r){
			//					if(r.data.rows!=null){
			//						 mydata=r.data;
			//					//console.log(mydata);
								$(options.TableName).jqGrid({
									url:options.LoadTableUrl,
									mtype:"GET",
			//						datatype: "jsonstring",
			//				        datastr: mydata,
									datatype: "json",
									//data:mydata,
									//datatype:"local",						
									//editurl: 'clientArray',
											
									jsonReader  : {	
											root: "rows",
											repeatitems: false
												},
									//cellsubmit: 'clientArray',//单元格保存内容的位置
									colNames:colNames,          
						            colModel:JqGridColModel,
						            //loadonce: false,
						            sortable:false,			            
						            rownumbers:true,
						            //loadonce: true,
						            rowNum: 20,
						            rowList: [20, 25, 40],
						            pager:options.pager,
						            viewrecords: true,		           
			//			            multiselect:true,
						           	//cellEdit:true,
						            width: "100%" ,
						            height: $(window).height()*0.44,
									autowidth:true,
									rownumWidth: 35, // the width of the row numbers columns
									shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
									ondblClickRow:function(id){
									//双击进入编辑
						   				var delid = id;
						   				
									},
									
									gridComplete: function() {
										var ids=$(options.TableName).jqGrid("getDataIDs");
			
									},
									loadComplete:function(data){
										//console.log(data);
										var len = data.rows.length;
										//表格加载完成 默认隐藏的列
//										$(options.TableName).setGridParam().hideCol("metaMoneySee");
//										$(options.TableName).setGridParam().hideCol("metaMoneyUpdate");
//										$(options.TableName).setGridParam().hideCol("clientSee");
										
									},
									loadError:function(xhr,status,error){
										//console.log(status)
									}
									})
					
						}
						
						
		},
		treeInit:function(){
			
				//树设置参数
				var setting = {
					data: {//数据属性设置
						simpleData: {enable: true,idKey: "id",pIdKey: "pid"}
					},
					callback: {//回调事件设置
			        
					},
					view: {//样式设置
						showIcon: true
					}
				};
			    $.ajax({
		            type: 'Get',
		            url: '../../json/admin/metaDataTree.json',
		            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
		            success: function (data) {
		            	console.log(data);
		                $.fn.zTree.init($("#goodsDataTree"), setting, data);

		            },
		            error: function (msg) {

		                alert(" 数据加载失败！" + msg);
		            }
		        });
			
		},
		businessInit:function(){
			$("#businessDate").datetimepicker({
				lang:"ch",           //语言选择中文
				format:"Y-m-d",      //格式化日期
				timepicker:false,    //关闭时间选项
				todayButton:false    //关闭选择今天按钮
				});
			$(".beginDate").datetimepicker({
				lang:"ch",           //语言选择中文
				format:"Y-m-d",      //格式化日期
				timepicker:false,    //关闭时间选项
				todayButton:false    //关闭选择今天按钮
				});
			$(".endDate").datetimepicker({
				lang:"ch",           //语言选择中文
				format:"Y-m-d",      //格式化日期
				timepicker:false,    //关闭时间选项
				todayButton:false    //关闭选择今天按钮
				});
			
		},
		popInit:function(){
		    $('#settleBtn').click(function () {
		        $('.rb_settle_con_back').show();
		        $('body').css('overflow','hidden');
		        //POS机
		        var pos=$('#pos');
		        var posTop=pos.offset().top+pos.height()-$('.rb_settle_con').offset().top;
		        var posLeft=pos.offset().left-$('.rb_settle_con').offset().left;
		        pos.focus(function () {
		            $('.table_pos_con').css({
		                'top':posTop,
		                'left':posLeft,
		                'zIndex':99,
		                'display':'block'
		            });
		        });
		        $('#table_pos_x').click(function(){
		            $('.table_pos_con').hide()
		        });
		        //促销券
		        var coupons=$('#coupons');
		        var couponsTop=coupons.offset().top+coupons.height()-$('.rb_settle_con').offset().top;
		        var couponsLeft=coupons.offset().left-$('.rb_settle_con').offset().left;
		        coupons.focus(function () {
		            $('.table_coupons_con').css({
		                'top':couponsTop,
		                'left':couponsLeft,
		                'zIndex':99,
		                'display':'block'
		            })
		        });
		        $('#table_coupons_x').click(function(){
		            $('.table_coupons_con').hide()
		        });
		        $('.settle_sure').click(function () {
		            $('.rb_settle_con_back').hide();
		            $('body').css('overflow','auto');
		        });
		        $('.settle_cancel').click(function () {
		            $('.rb_settle_con_back').hide();
		            $('body').css('overflow','auto');
		        })
		    });
		}
}
$(function(){
	mainScope.init();
	/**
	 * 删除一行
	 */
	//删除一行
	$(document).on('click', '.delect-boost',function(e){
		var thisTitle = $(this).attr("title");
		var rowId = $(this).parent().data('id');
		if(thisTitle == "删除行"){
			console.log('条数:' + $('#jqGrid_commodityLoan tbody tr').length);
			if($('#jqGrid_commodityLoan tbody tr').length === 2) {
				$.zxsaas_plus.showalert("错误","至少保留一条数据!")
				return false;
			}
			$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
				$("#mainGrid").jqGrid('delRowData', rowId);
			},function(){
				
			});

		}
	});
	
	
	
})


	
	

				

