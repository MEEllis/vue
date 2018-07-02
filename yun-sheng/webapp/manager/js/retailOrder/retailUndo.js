var mainScope={
		init:function(){
			this.gridInit();
			this.businessInit();
			this.popInit();
		},
		/*表格初始化*/
		gridInit:function(){
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			$("#mainGrid").jqGrid({
				url:"../../json/retailOrder/retailDeposit.json",
				mtype:"GET",
				datatype: "json",				
				jsonReader  : {	
						root: "undo",
						repeatitems: false
							},
				colNames:['商品编码','商品名称','类型','颜色','零售价','预售价','数量','退定数量','定金','退定金额','收定营业员','备注'],          
			    colModel:[
							{name:'goodsCode',index:'goodsCode',width:150,align:'center'},
							{name:'goodsName',index:'goodsName',width:150,align:'center'},
							{name:'goodsType',index:'goodsType',width:150,align:'center'},
							{name:'goodsColor',index:'goodsColor',width:150,align:'center'},
							{name:'retail',index:'retail',width:150,align:'center'},
							{name:'presell',index:'presell',width:150,align:'center',formatter:"number"},
							{name:'number',index:'number',width:150,align:'center',formatter:"integer"},
							{name:'undoNum',index:'undoNum',width:150,align:'center',formatter:"integer",editable:true},
							{name:'deposit',index:'deposit',width:150,align:'center',formatter:"number"},
							{name:'undoDeposit',index:'undoDeposit',width:150,align:'center',formatter:"number",editable:true},
							{name:'person',index:'person',width:150,align:'center',formatter:'string'},
							{name:'remark',index:'remark',width:150,align:'center',editable:true,formatter:'string',editable:true}
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
	                            var numTotal = $(this).getCol('number', false, 'sum');
	                            var unNumTotal = $(this).getCol('undoNum', false, 'sum');
	                            var priceTotal=$(this).getCol('deposit', false, 'sum');
	                            var unPriceTotal=$(this).getCol('undoDeposit', false, 'sum');
	                       $(this).footerData("set", 
	                    	   {
	                    	   "number":'数量合计：<font color="red" >'+numTotal+'</font>',
	                    	   "deposit":'定金合计：<font color="red" >'+priceTotal+'元</font>',
	                    	   "undoNum":'退定数量合计：<font color="red" >'+unNumTotal+'</font>',
	                    	   "undoDeposit":'退定定金合计：<font color="red" >'+unPriceTotal+'元</font>'
	                    	   },false);
	                      } else {
	                        $(".ui-jqgrid-sdiv").hide();
	                    }
				},
				loadError:function(xhr,status,error){
					
				}
				})
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
		},
		/*时间控件初始化*/
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
		}
}
$(function(){
	mainScope.init();
})
