
//设置表格
function setGrid(tn){	
	$(tn).setGridWidth($(tn).parents(".grid-wrap").width());
}
$(".orderSort").on("change,click,focus",function(){
	console.log($(".select2").width());
})
function initial(){
	 //加载多选下拉的单据类型
    var dataList = [
        { id: 45, text: '零售出库单' },
        { id: 46, text: '零售退货单' }
    ];
    $(".orderSort").select2({
        data: dataList,
        language: "zh-CN"
    })

	  drawTable("#jqGrid_cusRecord","#jqGridCusRecord","0");//消费记录主表
}

/*global var*/
var newRowId ="";

function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];//'发卡公司','发卡部门','发卡人',
	
		var colName0 = ['id','增值服务','运营商业务','客户姓名','联系电话','单据类型','单据编号','业务日期','商品类别','商品名称','品牌','型号','颜色','标价','折后价','数量','折后金额','第三方单位','第三方折扣','分期商','首付','分期数','分期余额','主串号','辅串号','部门名称'];  //消费记录
		colNamec[0]=colName0;
		var JqGridColModelc = [];
	
		var JqGridColModel0 =[	
		                    {name:'id',index:'id', width:150,align:'center',sortable:true,hidden:true},
                            {name:'zzfw',index:'zzfw', width:150,align:'center',sortable:true},//增值服务
                            {name:'yysfw',index:'yysfw', width:150,align:'center',sortable:true},//运营商业务
                            {name:'customerName',index:'customerName', width:150,align:'center',sortable:true},//客户姓名
                            {name:'phone',index:'phone', width:150,align:'center',sortable:true},//联系电话
                            {name:'billsType',index:'billsType', width:150,align:'center',sortable:true},//单据类型
						    {name:'billsCode',index:'billsCode', width:200,align:'center',sortable:true},//单据编号
							{name:'billsDateStr',index:'billsDate', width:200,align:'center',sortable:true},//业务日期
							{name:'goodsClass',index:'goodsClass', width:200,align:'center',sortable:true},//商品类别
							{name:'goodsName',index:'goodsName', width:100,align:'center',sortable:true},//商品名称
							{name:'goodsBrand',index:'goodsBrand', width:100,align:'center',sortable:true},//品牌
							{name:'goodsModel',index:'goodsModel', width:100,align:'center',sortable:true},//型号
							{name:'goodsColor',index:'goodsColor', width:100,align:'center',sortable:true},//颜色
							{name:'price',index:'price', width:200,align:'center',sortable:true},//标价
							{name:'disPrice',index:'disPrice', width:200,align:'center',sortable:true},//折后价
							{name:'goodsNumber',index:'goodsNumber', width:200,align:'center',sortable:true},//数量
							{name:'disAmount',index:'disAmount', width:200,align:'center',sortable:true},//折后金额
							{name:'unitName',index:'unitName', width:200,align:'center',sortable:true},//第三方单位
							{name:'unitDeductible',index:'unitDeductible', width:100,align:'center',sortable:true},//第三方折扣
							{name:'stagesName',index:'stagesName', width:100,align:'center',sortable:true},//分期商
							{name:'stagesPayments',index:'stagesPayments', width:200,align:'center', sorttype:'string',sortable:true},//首付
							{name:'stagesNum',index:'stagesNum', width:200,align:'center', sortable:true},//分期数
							{name:'stagesBalance',index:'stagesBalance', width:200,align:'center',sortable:true},//分期余额
							{name:'imeiStr',index:'imei', width:200,align:'center',sortable:true},//主串号
							{name:'auxiliaryImei',index:'auxiliaryImei', width:200,align:'center',sortable:true},
							{name:'sectionName',index:'section_id', width:200,align:'center',sortable:true}//部门名称
			                ];
		JqGridColModelc[0]=	JqGridColModel0;    
		
		//全局当前选择的rowid colid
		var rowid='';
		var colid='';
		var select_name='';
		var defaults = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/associator/typemanager.json",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"",
		TableInfo:"",
		choose:false,
		celledit:false,
		parsHeight:$(window).height(),
		shrinkFit:false
		};
		var options = $.extend(defaults,options);
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
			var c=options.TableInfo;//参数index
				
			var colNames = colNamec[c];
			var JqGridColModel = JqGridColModelc[c];
			loadtable();
		//加载表格
		
			function loadtable(){
					$(options.TableName).jqGrid({
						url:options.LoadTableUrl,
						mtype:"GET",
						datatype: "json",
						jsonReader  : {	
							root: "data.rows",
							page: "data.page",
					        total: "data.total",
					        records: "data.records",
							repeatitems: false
								},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            cellEdit:options.celledit,
			            cellsubmit:'clientArray',
			            editurl: 'clientArray',
			            sortable:true,	
			            sortorder: 'desc',
			            sortname:"id",			            
			            rownumbers:true,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		       
			            width:"100%" ,
			            height: options.parsHeight*0.65,
						autowidth:true,
						rownumWidth: 35,
						shrinkToFit:options.shrinkFit, 
						multiselect:options.choose,
						multiboxonly:false,
						footerrow: true,
					    userDataOnFooter: true,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
						},
						beforeEditCell:function(rowid,cellname,v,iRow,iCol){
							lastrow = iRow;
							lastcell = iCol;
						},
						onCellSelect:function(id,index,cellcontent,e){
						
						},
						onSelectRow:function(rowid,status){
						},
						beforeSelectRow:function(rowid,e){
                            
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后
                               
						},
						gridComplete: function() {
						//	var ids=$(options.TableName).jqGrid("getDataIDs");
							//parseInt($(this).getGridParam('totalSum'))
				            var rowNum = parseInt($(this).getGridParam('records'), 10);
		                    if (rowNum > 0) {
		                            $(".ui-jqgrid-sdiv").show();
		                            //计算合计
		  						  /*总合计*/
		  				             $(this).jqGrid('footerData', 'set', { discountPrice : "<span style='color:red'>总合计</span>" });
		  						  /*数量*/
		  					        var goodsNum =  $(this).jqGrid('getCol', 'goodsNum', false, 'sum');
		  				             $(this).jqGrid('footerData', 'set', { goodsNum : "<span style='color:red'>"+goodsNum+"</span>"  });
		  				       	  /*折后金额*/
		  						        var amount   =  $(this).jqGrid('getCol', 'amount', false, 'sum');
		  					             $(this).jqGrid('footerData', 'set', { amount : "<span style='color:red'>"+amount+"</span>" });
		  			             /*第三方折扣*/
		  					        var couponName =  $(this).jqGrid('getCol', 'couponName', false, 'sum');
		  				             $(this).jqGrid('footerData', 'set', { couponName : "<span style='color:red'>"+couponName+"</span>" });
		  			             /*首付*/
		  					        var installmentPayment  =  $(this).jqGrid('getCol', 'installmentPayment', false, 'sum');
		  				             $(this).jqGrid('footerData', 'set', { installmentPayment :"<span style='color:red'>"+installmentPayment+"</span>"});
		  			             /*分期数*/
		  					        var installmentPaymentCount  =  $(this).jqGrid('getCol', 'installmentPaymentCount', false, 'sum');
		  				             $(this).jqGrid('footerData', 'set', { installmentPaymentCount :"<span style='color:red'>"+installmentPaymentCount+"</span>"});
		  			             /*分期余额*/
		  					        var  installmentBalance  =  $(this).jqGrid('getCol', 'installmentBalance', false, 'sum');
		  				             $(this).jqGrid('footerData', 'set', {  installmentBalance : "<span style='color:red'>"+installmentBalance+"</span>" });
		                            
		  				           /*总合计*/
		                           // $(this).jqGrid('footerData', 'set', { zzfw : "<span style='color:red'>总合计</span>" });
		                           // var totalSum = parseInt($(this).getGridParam('totalSum'));
		                          //  $(this).jqGrid('footerData', 'set', {  yysfw : "<span style='color:red'>"+totalSum+"</span>" });
		                      } else {
		                        $(".ui-jqgrid-sdiv").hide();
		                    }
						},
					
						loadComplete:function(data){
						  setGrid(options.TableName);
						},
						loadError:function(xhr,status,error){
						}
						})
		
		}
			
			  function addAndDelete(cellvalue, options, rowObjec){
					var addAndDel ='<div class="operating" data-id="' + options.rowId + '"><span style="cursor:pointer;margin-right:10px" class="icon-edit" id="icon-edit" title="修改" ></span><span style="cursor:pointer;" class="icon-trash" id="icon-trash" title="删除"></span></div>';
					return addAndDel;
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


		    //类别标签修改  删除按钮
		    function manage(cellvalue, options, rowObjec) {
		        return '<span class="update"  data-code="' + rowObjec.code + '" data-id="' + rowObjec.id + '" data-name="' + rowObjec.name + '" data-remark="' + rowObjec.remark + '" data-toggle="modal" data-target="#modalSignUpdate" style="color:#00CCFF;cursor:pointer;margin-right:40px;">修改</span><span class="deleteSort" data-depId="' + rowObjec.depId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">删除</span>';
		    }
     
			 //消费记录查看按钮(增值服务/运行商业务)
		    function search(cellvalue, options, rowObjec) {
		        return '<span class=""  data-id="' + rowObjec.id + '" data-name="' + rowObjec.name + '"  data-toggle="modal" data-target="#" style="color:#00CCFF;cursor:pointer;margin-right:40px;">查看</span>';
		    }

		   
		
}
var lastrow="";
var lastcell=""; 

function drawTable(tn,pger,tableinfo){
	 if(tableinfo == "0"){//消费记录
		var url = '/manager/member/customer/selectConsumptionRecordsList';
	   if($("#id").val()){
		   url = url + '?customerId='+$("#id").val();
	   }
	   loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: url});	
     }
}

//模糊查询
$(document).on("click",".find-out",function(event){			
		var val = $(".orderSort").select2('val');
		if(val){
			val = val.join(",")
		}
			 jQuery("#jqGrid_cusRecord").jqGrid('setGridParam', {  
				    datatype:'json',  
				    page:1,
			        postData:{"customerName":$("#customName").val(),"phone":$("#contact").val(),"billsTypes":val}, //发送数据  
			    }).trigger("reloadGrid");  
});


$(document).on("click","#hyQuery",function(e){
	 jQuery("#jqGrid_hy").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{"keyword":$(".search_hy").val()}, //发送数据  
	    }).trigger("reloadGrid");  
});

//员工搜索
$(document).on("click","#ygQuery",function(e){
	 jQuery("#jqGrid_yg").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{"keyWord":$(".search_wldw").val()}, //发送数据  
	    }).trigger("reloadGrid");  
});






