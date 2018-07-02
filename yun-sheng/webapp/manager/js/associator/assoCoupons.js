//(function(){
initPage();
initial();	 
function initPage(){
	//初始化查询页面 的会员促销券管理表
    loadmodal({TableName:"#jqGrid_coupons",pager:"#jqGridPagercoupons",TableInfo:0,choose:true,LoadTableUrl: "/manager/member/ticket/selectList/0"});	
}

function active(bdy,hd){
	var idx =$("."+hd+">li.active").index();
	$("."+bdy).children("div:eq("+idx+")").css({"display":"none"});
	$("."+hd+">li.active").removeClass("active");
	$("."+hd+">li:not(:hidden)").eq(0).addClass("active");
	$("."+hd+">li:not(:hidden)").eq(0).click();
	
}

var rowID="";
function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];
		var colName0 = ['id','券编号','券名称','券分类','面值','使用门槛','使用范围','使用状态','生效日期','截至日期','时效状态','说明','短信','备注'];//会员促销券
		colNamec[0]=colName0;
		
		var colName1 = ['商品分类编码','商品分类名称'];//详细使用范围 查询
		colNamec[1]=colName1;
		
		var colName2 = ['金额达到','抵现金额'];//使用门槛 查询
		colNamec[2]=colName2;
		
		var colName3 = ['操作','商品ID','商品分类编码','商品分类名称'];//详细使用范围 新增
		colNamec[3]=colName3;
		
		var colName4 = ['操作','金额达到','抵现金额'];//使用门槛 新增
		colNamec[4]=colName4;
		
		
		var colName5 = ['券编号','券名称','券分类','面值','生效日期','截至日期','状态','会员卡号','持卡人','手机','会员类型','短信状态','发放状态'];//发放状况 
		colNamec[5]=colName5;
		
		var colName6 = ['会员卡号','持卡人','手机号1','是否已发'];//会员促销券发放 
		colNamec[6]=colName6;
		var JqGridColModelc = [];
		//会员促销券
		var JqGridColModel0 =[
		                        {name:'id',index:'id', width:100,align:'center',sortable:false,hidden:true},
		                        {name:'ticketNo',index:'ticketNo', width:100,align:'center',sortable:false},//券编号
		                      	{name:'ticketName',index:'ticketName', width:100,align:'center',sortable:false},//券名称
								{name:'couponsSort',index:'couponsSort', width:100,align:'center',sortable:false},
							    {name:'amount',index:'amount', width:100,align:'center',sortable:false},//面值
		                      	{name:'isSill',index:'isSill', width:100,align:'center',sortable:false,formatter:'select',editoptions:{value:"1:无门槛;0:有门槛"}},//使用门槛
								{name:'isRange',index:'isRange', width:100,align:'center',sortable:false},//使用范围
								{name:'status ',index:'status ', width:100,align:'center',sortable:false,formatter:'select',editoptions:{value:"1:停用;0:启用"}},//停用
								{name:'openDate',index:'openDate', width:222,align:'center',sortable:false,formatter:'date',formatoptions:{srcformat:'u',newformat:'Y-m-d'}},//生效日期
								{name:'closeDate',index:'closeDate', width:222,align:'center',sortable:false},//截至日期
								{name:'isEffect',index:'isEffect', width:100,align:'center',sortable:false},//状态
								{name:'direction',index:'direction', width:100,align:'center',sortable:false,hidden:true},//说明
								{name:'modSms',index:'modSms', width:100,align:'center',sortable:false,hidden: true},//短信
								{name:'remark',index:'remark', width:100,align:'center',sortable:false}
			                ];
		JqGridColModelc[0]=	JqGridColModel0;     
		//详细使用范围 查询
		var JqGridColModel1 =[
							    {name:'code',index:'code', width:100,align:'center',sortable:false},//商品分类编码
								{name:'name',index:'name', width:150,align:'center',sortable:false}];//商品分类名称
		JqGridColModelc[1]=	JqGridColModel1;     
		 //使用门槛 查询
		var JqGridColModel2 =[
		                       
							    {name:'saleAmount',index:'saleAmount', width:100,align:'center',sortable:false},//金额到达
								{name:'discountAmount',index:'discountAmount', width:150,align:'center',sortable:false}];//抵现金额
		JqGridColModelc[2]=	JqGridColModel2; 
		//详细使用范围 新增
		var JqGridColModel3 =[ 
		                        {name:'do',index:'do', width:100,align:'center',sortable:false,formatter:addAndDelete},
		                        {name:'goodsClassId',index:'goodsClassId', width:100,align:'center',sortable:false,hidden:true},
							    {name:'code',index:'code', width:100,align:'center',sortable:false,formatter:Goodsmodel},
								{name:'name',index:'name', width:150,align:'center',sortable:false,formatter:Goodsmodel}];
		JqGridColModelc[3]=	JqGridColModel3;     
		 //使用门槛 新增
		var JqGridColModel4 =[
		                        {name:'do',index:'do', width:100,align:'center',sortable:false,formatter:addAndDelete},
							    {name:'saleAmount',index:'saleAmount',width:100,align:'center',sortable:false,editable:true},
								{name:'discountAmount',index:'discountAmount',width:150,align:'center',sortable:false,editable:true}];

		JqGridColModelc[4]=	JqGridColModel4; 
		 //发放状态
		var JqGridColModel5 =[
		                        {name:'ticketNo',index:'ticketNo', width:180,align:'center',sortable:false},
							    {name:'ticketName',index:'ticketName', width:180,align:'center',sortable:false},
								{name:'ticketType',index:'ticketType', width:150,align:'center',sortable:false},
		                        {name:'amount',index:'amount', width:150,align:'center',sortable:false},
		                        {name:'openDate',index:'openDate', width:150,align:'center',sortable:false},
		                        {name:'closeDate',index:'closeDate', width:150,align:'center',sortable:false},
		                        {name:'isEffect',index:'isEffect', width:150,align:'center',sortable:false},
		                        {name:'cardNum',index:'cardNum', width:150,align:'center',sortable:false},
		                        {name:'cardHolder',index:'cardHolder', width:150,align:'center',sortable:false},
		                        {name:'phoneNum',index:'phoneNum', width:150,align:'center',sortable:false},
		                        {name:'typeName',index:'typeName', width:150,align:'center',sortable:false},
		                        {name:'sendStatus',index:'sendStatus', width:150,align:'center',sortable:false},
		                        {name:'msgStatus',index:'msgStatus', width:150,align:'center',sortable:false}];
		JqGridColModelc[5]=	JqGridColModel5;    
		 //会员促销券发放
		var JqGridColModel6 =[
		                        {name:'cardNum',index:'cardNum', width:100,align:'center',sortable:false},
							    {name:'cardholder',index:'cardholder', width:100,align:'center',sortable:false},
								{name:'tel1',index:'tel1', width:150,align:'center',sortable:false},
		                        {name:'disOrNot',index:'disOrNot', width:150,align:'center',sortable:false}];
		JqGridColModelc[6]=	JqGridColModel6;    
		var defaults = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		TableName: "", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"",
		TableInfo:"",
		choose:false	
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
						prmNames:{
							sort:null,
							order:null,
							search:null,
							nd:null
							
						},
						cellEdit:false,
					 	cellsubmit: 'clientArray',//单元格保存内容的位置	
					    editurl: 'clientArray',
						colNames:colNames,          
			            colModel:JqGridColModel,
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: 12,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		       
			            width: "100%" ,
			            height: $(window).height()*0.65,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						multiselect:options.choose,
						multiboxonly:true,
						multiselectWidth:56,
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
			   				
						},
						onCellSelect:function(id,index,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
							rowid=id;


							if(options.TableName == "#jqGrid_DetailsAdd" ||options.TableName == "#jqGrid_useGradeAdd" ){
								var ids = $(options.TableName).jqGrid('getDataIDs');
//								//获得当前最大行号（数据编号）
								var maxid;
								maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
//								//当用户点击表格最后一行时,自动增加一行
//								
								 $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );
								
							}
							else if(options.TableName == "#jqGrid_DetailsModify" ||options.TableName == "#jqGrid_useGradeModify"){
								var ids = $(options.TableName).jqGrid('getDataIDs');

								var maxid;
								maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);	
								(id == maxid && index != 1) && $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );						
								maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
//								//当用户点击表格最后一行时,自动增加一行
//								
								 $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );
								
							}
							
						},
						onSelectRow:function(rowid,status){
							
							if(options.TableName == "#jqGrid_coupons"){	
								if(status == true){
									 //$("#jqGrid_Details").jqGrid("clearGridData") ; 
									// $("#jqGrid_useGrade").jqGrid("clearGridData"); 
									  //$("#jqGrid_Details").setGridParam({url:"/manager/member/ticket/selectGoodsInfo/"+rowid});
									
									 $(".pabody").find("div:eq('"+$(".phead>li.active").index()+"')").css({"display":"block"});
								
									  $("#jqGrid_Details").setGridParam({url:"/manager/member/ticket/selectGoodsInfo/"+rowid}).trigger("reloadGrid");
								
									  $("#jqGrid_useGrade").setGridParam({url:"/manager/member/ticket/selectdiscountInfo/"+rowid}).trigger("reloadGrid");
									 
								}else{
							 
									 $("#jqGrid_Details").jqGrid("clearGridData").trigger("reloadGrid") ;  
									 $("#jqGrid_useGrade").jqGrid("clearGridData").trigger("reloadGrid") ; 
										$(".details1,.useclass1").css({"display":"none"});
								}
							}
						},
						beforeSelectRow:function(rowid,e){
                             rowID =rowid; 
                             if(options.TableInfo!=0){
                                 return $(e.target).is('input[type=checkbox]');
                              }
                              if(options.TableInfo==0){
                              	if($(options.TableName).find("tr.success").hasClass("success")){
                              		$(options.TableName).find("tr.success").find("input:checkbox").prop("checked",false);
                              		$(options.TableName).find("tr.success").removeClass("success");
                              	}
                                 return true;
                              }
                         
						},
						 beforeEditCell:function(rowid,cellname,v,iRow,iCol)
						{
						  lastrow = iRow; 
						  lastcell = iCol;
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
							var ids=$(options.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
							//var len = data.data.rows.length;
							
							if(options.TableName == "#jqGrid_DetailsAdd" ||options.TableName == "#jqGrid_useGradeAdd" ){
								var ids = $(options.TableName).jqGrid('getDataIDs');
//								//获得当前最大行号（数据编号）
								var maxid;
								maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
//								//当用户点击表格最后一行时,自动增加一行
								 $(options.TableName).jqGrid('addRowData',"1",{},'last'); 
							}
							else if(options.TableName == "#jqGrid_DetailsModify" ||options.TableName == "#jqGrid_useGradeModify"){
								var ids = $(options.TableName).jqGrid('getDataIDs');
//								//获得当前最大行号（数据编号）
								var maxid;
								maxid = (ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
//								//当用户点击表格最后一行时,自动增加一行
//								
								 $(options.TableName).jqGrid('addRowData', maxid+1, {}, 'last' );
								
							}
							
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
		
			}
			
			
 
			/*表头选择更改*/
		    $("#jqGrid_coupons").jqGrid('setLabel',1, '选择', 'labelstyle' );
		    $("#jqGrid_disTributeCoupons").jqGrid('setLabel',1, '选择', 'labelstyle');
			
			$(window).bind('click', function saveEdit(e) {
				var rowId = $(e.target).parent("tr").attr("id");
				if (lastsel != "" && lastsel != rowId) { //用于点击其他地方保存正在编辑状态下的行
					if ($(e.target).closest(options.TableName).length == 0) { 
						$(options.TableName).jqGrid('saveRow', lastsel);						
						lastsel='';
					}
				}
			})
			
			/*操作列*/
			function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel = '<div class="operating" data-id="' + options.rowId + '"><span class="glyphicon glyphicon-trash" aria-hidden="true" id="remove_row" title="删除行"></span></div>';
				return addAndDel;
			}
			
			
			
			
			/*添加goodSort类*/
			 function Goodsmodel(cellvalue, options, rowObject){
		            if(cellvalue == undefined || cellvalue == ""){
	                	cellvalue = "";
	                }
					return '<span class="goodsSort" style="display: inline-block; width: 89px;height: 16px;" data-toggle="modal" data-target="#goodsch" data-rId="' + options.rowId +'">' + cellvalue + '</span>';     
			}
				//删除一行
			$(document).on('click', '.glyphicon-trash',function(e){
				var thisTitle = $(this).attr("title");
				var rowId = $(this).parent().data('id');
				if(thisTitle == "删除行"){
					//console.log('条数:' + $('#jqGrid_SubjectBalance tbody tr').length);
					if($(options.TableName+' tbody tr').length === 2) {
						$.zxsaas_plus.showalert("错误","至少保留一条数据!")
						return false;
					}
					$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
						$(options.TableName).jqGrid('delRowData', rowId);
					},function(){
						
					});

				}
			});
		
			
			
			//列表    重密码
			function rePwd(cellvalue, options, rowObjec)
			{
				return '<span class="rePwd" data-blocId="' + rowObjec.blocId + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
			}
			
			//列表复选框
			function checkBox(cellvalue, options, rowObjec)
			{
				return '<input type="checkbox" class="del" data-blocId="' + rowObjec.blocId + '"  data-id="' + options.rowId + '" />';
			}
			
		//查询
		$(document).on("click",".btn-group button[data-eventname='inquire']",function(event){			
			if(flag==true){
			$.jgrid.GridDestroy(options.TableName);
			loadtable();
			}else{
				flag=true;
			}
			
		});
		

		$(document).on("click",".btnbox button[data-eventname='printbtn']",function(event){
			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
			
		});
		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
			
		});
}
		



function drawTable(tn,tableinfo){
	if(tableinfo == 0){//会员促销券
	    //loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "../../json/associator/pileCards.json"});	
	     loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "../../json/associator/assoCoupons.json"});	
	}
	else if(tableinfo == 1){//详细使用范围 查询
		loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardType/selectAll"});	
	}
	else if(tableinfo == 2){//使用门槛 查询
		loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardType/selectAll"});	
	}else if(tableinfo == 3){//详细使用范围 新增/修改
		loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardType/selectAll"});	
	}
	else if(tableinfo == 4){//使用门槛 新增/修改
		loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/member/cardType/selectAll"});	
	}else if(tableinfo == 5){//发放状态
		loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "../../json/associator/pileCards.json"});	
	}else if(tableinfo == 6){//会员促销券发放
		loadmodal({TableName:tn,pager:pger,TableInfo:tableinfo,LoadTableUrl: "../../json/associator/pileCards.json"});	
	}
}

function initial(){
	//$(".pabody").find("div:eq('"+$(".phead>li.active").index()+"')").css({"display":"block"});
	//drawTable("#jqGrid_Details","#jqGridPagerDetails",1);
	//drawTable("#jqGrid_useGrade","#jqGridPageruseGrade",2);
	///  $(".pabody").find("div:eq('"+$(".phead>li.active").index()+"')").css({"display":"block"});
	drawTable("#jqGrid_Details",1);//详细使用范围查询初始化
	drawTable("#jqGrid_useGrade",2);//使用门槛查询初始化
	//drawTable("#jqGrid_useGrade",3);//详细使用范围新增
	//drawTable("#jqGrid_useGrade",4);//使用门槛新增
    initaialAddModal();//初始化新增模态框
    initaialModifyModal();//初始化修改模态框
    
    //tree();//初始化树结构
 //##   drawTable("#jqGrid_disTributeStatus","#jqGridPagerdisTributeStatus","5");//初始化发放情况表格
 //##   drawTable("#jqGrid_disTributeCoupons","#jqGridPagerdisTributeCoupons","6");//初始化会员促销券发放表格
}
/*切换查询页面的详细使用范围  使用门槛*/
$(document).on("click",".phead>li.bn1",togglePara);
function togglePara(){
	var ids=$("#jqGrid_coupons").jqGrid("getGridParam","selarrrow");   
	if(ids.length == 1){
		$(".pabody").children("div:eq('"+$(".phead>li.active").index()+"')").css({"display":"none"});
		$(".phead>li.active").removeClass("active");
		$(this).addClass("active");
	
		$(".pabody").children("div:eq('"+$(this).index()+"')").css({"display":"block"});
		
	}else{
		$(".phead>li.active").removeClass("active");
		$(this).addClass("active");
		$(".pabody").children("div:eq('"+$(this).index()+"')").css({"display":"none"});
	}
	//var tableinfo =$(this).index();

	//$(".pabody").children("div:eq('"+$(this).index()+"')").find(".grid-wrap>table").jqGrid('setFrozenColumns');//冻结此列
	// jQuery("#jqGrid_jfsz").jqGrid('setFrozenColumns');
}
/*查询 li切换*/
function drawTable_tog(rowid){
	
	
		var tableinfo =$(".phead>li.active").index();//参数索引
		if(tableinfo==0){
		   $("#jqGrid_Details").jqGrid("clearGridData");
		}
		else{
		   $("#jqGrid_useGrade").jqGrid("clearGridData");
		}

		var tableinfo =$(".phead>li.active").index();//参数索引
	
			if(tableinfo==0){
			 loadmodal({TableName:"#jqGrid_Details",TableInfo:tableinfo,LoadTableUrl: "/manager/member/ticket/selectGoodsInfo/"+rowid});
			 $("#jqGrid_Details").trigger("reloadGrid") ; 
			}
			else{
			 loadmodal({TableName:"#jqGrid_useGrade",TableInfo:tableinfo,LoadTableUrl: "/manager/member/ticket/selectdiscountInfo/"+rowid});
			 $("#jqGrid_useGrade").trigger("reloadGrid") ; 
			}
		
	}
	





/*新增模态框*/
function initaialAddModal(){
	 drawTable("#jqGrid_DetailsAdd",3);
	 drawTable("#jqGrid_useGradeAdd",4);
	var idx =$(".pheadAdd>li.active").index();
	 $(".pabodyAdd").children("div:eq("+idx+")").css({"display":"block"});
	var tableinfo =$(".pheadAdd>li.active").index()+3;//参数索引
	var v =$("input[name=same-add]:checked").val();//全部 部分
	
	drawTableN("new",tableinfo,v);
	
}

/*修改模态框*/

function initaialModifyModal(){
	 drawTable("#jqGrid_DetailsModify",3);
	 drawTable("#jqGrid_useGradeModify",4);
	var idx =$(".pheadModify>li.active").index();
	 $(".pabodyModify").children("div:eq("+idx+")").css({"display":"block"});
	var tableinfo =$(".pheadModify>li.active").index()+3;//参数索引
	var v =$("input[name=same-Modify]:checked").val();//全部 部分
	
	drawTableN("modify",tableinfo,v);
	
//	---------------
//	 $(".pabodyModify").find("div:eq('"+$(".pheadModify>li.active").index()+"')").css({"display":"block"});
//	var tn ="#"+$(".pabodyModify").children("div:eq('"+$(".pheadModify>li.active").index()+"')").find(".grid-wrap>table").attr("id");//表名
//	var pger = "#"+$(".pabodyModify").children("div:eq('"+$(".pheadModify>li.active").index()+"')").find(".grid-wrap>div").attr("id");//分页名
//	var tableinfo =$(".pheadModify>li.active").index()+3;//参数索引

//##	drawTable(tn,pger,tableinfo);
}
/*切换新增详细适用范围 、新增使用门槛*/

$(document).on("click",".pheadAdd>li.bn2",togglePara_new);
function togglePara_new(){
	$(".pabodyAdd").children("div:eq('"+$(".pheadAdd>li.active").index()+"')").css({"display":"none"});
	$(".pheadAdd>li.active").removeClass("active");
	$(this).addClass("active");
	$(".pabodyAdd").children("div:eq('"+$(this).index()+"')").css({"display":"block"});
	/*根据index加载数据*/	
	var v =$("input[name=same-add]:checked").val();//全部 部分
     /*设置表格参数*/

	var tableinfo =$(".pheadAdd>li.active").index()+3;//参数索引
//	drawTableN("new",tableinfo,v);
	
}/*-----------------end-------------------*/
/*切换修改详细适用范围 、修改使用门槛*/

$(document).on("click",".pheadModify>li.bn2",togglePara_modify);
function togglePara_modify(){
	$(".pabodyModify").children("div:eq('"+$(".pheadModify>li.active").index()+"')").css({"display":"none"});
	$(".pheadModify>li.active").removeClass("active");
	$(this).addClass("active");
	$(".pabodyModify").children("div:eq('"+$(this).index()+"')").css({"display":"block"});
	/*根据index加载数据*/	
	var v =$("input[name=same-Modify]:checked").val();//全部 部分
     /*设置表格参数*/

	var tableinfo =$(".pheadModify>li.active").index()+3;//参数索引
//	drawTableN(tableinfo,v);
	
}/*-----------------end-------------------*/
/*切换新增 全部  部分*/
$(document).on("click",".same-add",function(){
	
	var tableinfo =$(".pheadAdd>li.active").index()+3;//参数索引
	 drawTableN("new",tableinfo,$(this).val());

	
	 
});

/*切换修改 全部  部分*/
$(document).on("click",".same-Modify",function(){
	
	var tableinfo =$(".pheadModify>li.active").index()+3;//参数索引

	 drawTableN("modify",tableinfo,$(this).val());

	
	 
});
/*新增  是否有使用门槛*/
$(document).on("click","#gateClass",function(){
	 $(this).prop("checked")&&$("#jqGrid_useGradeAdd").setGridParam({cellEdit:true}).trigger("reloadGrid");
	 $(this).prop("checked")||$("#jqGrid_useGradeAdd").setGridParam({cellEdit:false}).trigger("reloadGrid");
});

/*修改   是否有使用门槛*/
$(document).on("click","#gateClass_M",function(){
	 $(this).prop("checked")&&$("#jqGrid_useGradeModify").setGridParam({cellEdit:true}).trigger("reloadGrid");
	 $(this).prop("checked")||$("#jqGrid_useGradeModify").setGridParam({cellEdit:false}).trigger("reloadGrid");
});


/*新增模态框中的 生成说明*/
$(document).on("click",".direction",function(){
	    // 更新说明中的最新内容
	//$(".openDate").text($("input[name=openDate]").val());
	//$(".closeDate").text($("input[name=closeDate]").val());
	//$(this).parent(".two-bn").next().find(".hidden").removeClass("hidden");

	$(this).parent(".two-bn").next().find(".drct_cotent_add").val("使用说明:"+"\n"+
			"1.本券有效期限"+$("input[name=openDate]").val()+"至;"+$("input[name=closeDate]").val()+"\n"+
			"2.本券只允许在　[XXXX年XX月XX日手机连锁公司]　门店使用；"+"\n"+
			"3.本券够买　[任意/部分]　商品可按券面值　[全额抵现]" +"\n"+
			"/ 本券使用规则：在购买　[任意/部分]　商品，[<span>金额达到1000元可抵减50元；金额达到1800元可抵扣100元；金额达到3000元可抵扣200元</span>]。详情请至门店咨询；"+"\n"+
			"4.本券只限使用一次，本券不兑现不找零；"+"\n"+
			"5.本券解释权归本公司所有。");

});

/*修改模态框中的 生成说明*/
$(document).on("click",".direction_M",function(){
	    // 更新说明中的最新内容
	//$(".openDate").text($("input[name=openDate]").val());
	//$(".closeDate").text($("input[name=closeDate]").val());
	//$(this).parent(".two-bn").next().find(".hidden").removeClass("hidden");
	$(this).parent(".two-bn").next().find(".drct_cotent").val("使用说明:"+"\n"+
			"1.本券有效期限"+$("input[name=openDate]").val()+"至;"+$("input[name=closeDate]").val()+"\n"+
			"2.本券只允许在　[XXXX年XX月XX日手机连锁公司]　门店使用；"+"\n"+
			"3.本券够买　[任意/部分]　商品可按券面值　[全额抵现]" +"\n"+
			"/ 本券使用规则：在购买　[任意/部分]　商品，[金额达到1000元可抵减50元；金额达到1800元可抵扣100元；金额达到3000元可抵扣200元]。详情请至门店咨询；"+"\n"+
			"4.本券只限使用一次，本券不兑现不找零；"+"\n"+
			"5.本券解释权归本公司所有。");
});


function drawTableN(tableSort,tableinfo,v){
	if(v ==2){
		if(tableinfo == 3){
			if(tableSort == "new"){//详细使用范围新增
			loadmodal({TableName:"#jqGrid_DetailsAdd",TableInfo:tableinfo,LoadTableUrl:"/manager/member/cardType/selectAll"});	
	         $("#jqGrid_DetailsAdd").trigger("reloadGrid") ; 
			}
			else if(tableSort == "modify"){
				loadmodal({TableName:"#jqGrid_DetailsModify",pager:"#jqGridPagerDetailsModify",TableInfo:tableinfo,LoadTableUrl:"/manager/member/cardType/selectAll"});	
		         $("#jqGrid_DetailsModify").trigger("reloadGrid") ; 
			}
		}
		if(tableinfo == 4){
			if(tableSort == "new"){//使用门槛范围新增
			 loadmodal({TableName:"#jqGrid_useGradeAdd",pager:"#jqGridPageruseGradeAdd",TableInfo:tableinfo,LoadTableUrl:"/manager/member/cardType/selectAll"});	
			$("#jqGrid_useGradeAdd").trigger("reloadGrid") ; 
			}
			else if(tableSort == "modify"){
	console.log("!!!!!!");			
				loadmodal({TableName:"#jqGrid_useGradeModify",pager:"#jqGridPageruseGradeModify",TableInfo:tableinfo,LoadTableUrl:"/manager/member/cardType/selectAll"});	
				$("#jqGrid_useGradeModify").trigger("reloadGrid") ; 
			}
		}
	}else{
		//不显示
		if(tableinfo == 3){//详细使用范围新增
			// loadmodal({TableName:"#jqGrid_DetailsAdd",pager:"#jqGridPagerDetailsAdd",TableInfo:tableinfo,LoadTableUrl:"/manager/cardType/selectAll"});	
			// loadmodal({TableName:"#jqGrid_DetailsAdd",pager:"#jqGridPagerDetailsAdd",TableInfo:3});	
			if(tableSort == "new"){
				$("#jqGrid_DetailsAdd").jqGrid("clearGridData");
			}
			else if(tableSort == "modify"){
				$("#jqGrid_DetailsModify").jqGrid("clearGridData");
				
			}
			
			// $("#jqGrid_DetailsAdd").trigger("reloadGrid") ; 
		}
		if(tableinfo == 4){//使用门槛范围新增
			// loadmodal({TableName:"#jqGrid_useGradeAdd",pager:"#jqGridPageruseGradeAdd",TableInfo:tableinfo,LoadTableUrl:"/manager/cardType/selectAll"});	
			 //loadmodal({TableName:"#jqGrid_useGradeAdd",pager:"#jqGridPageruseGradeAdd",TableInfo:4});	
			if(tableSort == "new"){
			  $("#jqGrid_useGradeAdd").jqGrid("clearGridData");
			}
			else if(tableSort == "modify"){
				$("#jqGrid_useGradeModify").jqGrid("clearGridData");
			}
		}
	}
	
}

/*树形结构*/
var rowId = '';
$(document).on('click','.goodsSort',function(){
	
	var ptId = $(this).parents("table").attr("id");
	rowId = $(this).data('rid');
	$('#goodUse').find('#goodsDataTree').html("");//清空树结构
	
	var v ="";
    if(ptId == "jqGrid_DetailsModify"){//修改详细适用范围
		v =$("input[name=same-Modify]:checked").val();
	}else if(ptId == "jqGrid_DetailsAdd"){//新增详细适用范围
		v =$("input[name=same-add]:checked").val();
	}
	if(v==2){
		ul ="/manager/Tgoodsclass/findTree2";
		var setting = {  
		        data: {
					simpleData: {
						enable: true, 
						idKey: "id",
						pIdKey: "pid",
						rootPId: null
					}
				},
				callback: {
					onClick: function (event, treeId, treeNode, msg) {
						//controllAdd(treeNode.id);//通过id调用对应方法 重构表格

					},
					onDblClick: function(event, treeId, treeNode){
							if(v==2){
								$("#"+ptId).setCell(rowId,'code',treeNode.obj.code)//商品分类编码
						        $("#"+ptId).setCell(rowId,'name',treeNode.obj.name)//商品分类名称
							    $("#"+ptId).setCell(rowId,'goodsClassId',treeNode.obj.id)//商品ID          
						    
							}
							$('#goodsch').modal('hide');//关闭商品资料模态框
					}
				},
				view: {
					showIcon: false
				}
		    }; 
		
		  $.request({
	          type: 'Get',
	          url: ul,//树结构地址
	          dataType: "json", 
	          success: function (data1) {
	              $.fn.zTree.init($("#goodsDataTree"), setting, data1);
	              var zTree1 = $.fn.zTree.getZTreeObj("goodsDataTree");
	          	  zTree1.expandAll(true);//展开全部节点
	          },
	          error: function (msg) {
	              alert("商品范围数据加载失败！" + msg);
	          }
	     });
	}
});

/*切换修改详细适用范围 、修改使用门槛*/

//$(document).on("click",".pheadModify>li.bn2",togglePara3);
//function togglePara3(){
//	$(".pabodyModify").children("div:eq('"+$(".pheadModify>li.active").index()+"')").css({"display":"none"});
//	$(".pheadModify>li.active").removeClass("active");
//	$(this).addClass("active");
//	$(".pabodyModify").children("div:eq('"+$(this).index()+"')").css({"display":"block"});
//	/*根据index加载数据*/	
//     /*设置表格参数*/
//	var tn ="#"+$(".pabodyModify").children("div:eq('"+$(this).index()+"')").find(".grid-wrap>table").attr("id");//表名
//	var pger = "#"+$(".pabodyModify").children("div:eq('"+$(this).index()+"')").find(".grid-wrap>div").attr("id");//分页名
//	var tableinfo =$(".pheadModify>li.active").index()+3;//参数索引
//	drawTable(tn,pger,tableinfo);
//}/*-----------------end-------------------*/


(function(){
	
	/*会员促销券发放*/
	$(document).on("click",".distAsso",function(){
		  var slctids=$("#jqGrid_coupons").jqGrid("getGridParam","selarrrow");//选中的行id
		  if(slctids.length !=0){
			   if(slctids.length ==1){//选中一条数据
				   $("#CouponsModal").modal();
			   }else{//选中多条数据
				   $.zxsaas_plus.showalert("错误","请选择其中一张券!");
			   }
		   }else{
			   $.zxsaas_plus.showalert("错误","至少选择一张券!");
		   }
     });


/*会员促销券发放态框弹出后触发*/
$('#CouponsModal').on('show.bs.modal', function (e) {
	 $("#CouponsModal  .show-close>.asso_distri").val("");
	 var slctid=$("#jqGrid_coupons").jqGrid("getGridParam","selrow");//选中的行id
	  var rowData =$("#jqGrid_coupons").jqGrid('getRowData',slctid);
	  $("#CouponsModal  input[name=id]").val(slctid);//选中的行id
	  $("#CouponsModal input[name=ticketNo]").val(rowData.ticketNo);//券编号
	  $("#CouponsModal input[name=ticketName]").val(rowData.ticketName);//券名称
	  $("#CouponsModal input[name=openDate]").val(rowData.openDate);//生效日期
	  $("#CouponsModal input[name=closeDate]").val(rowData.closeDate);//截至日期
	  tree("/manager/cardInfo/initCardInfoTree");
	  // tree("../../json/associator/Tree.json");
	  loadmodal({TableName:"#jqGrid_disTributeCoupons",pager:"#jqGridPagerdisTributeCoupons",TableInfo:6,choose:true,LoadTableUrl:"/manager/member/ticket/selectFcardInfo"});
      if(rowData.modSms.replaceAll("\\s+", "") != ""){
    	  $("#CouponsModal  .show-close>.asso_distri").val(rowData.modSms);
      }
});
/*会员促销券发放*/
/*树结构*/
function tree(url){

	var setting = {  
	        data: {
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: null
				}
				
			},
			
			callback: {
				onClick: function (event, treeId, treeNode, msg) {
                     reloadTable(treeNode.id);//点击字段刷新表格
				},
				onDblClick: function(event, treeId, treeNode){
			   },
			   beforeCheck: function(treeId, treeNode){
				  
			   },
			 	onCheck:function(event, treeId, treeNode){
				   //点击左边右面表格不能select
				   $("#jqGrid_disTributeCoupons .checkbox").attr("checked",false);
				   $("#jqGrid_disTributeCoupons .checkbox").attr("disabled",true);
				
			   }
			},
			view:{
				showIcon: false
				
			},
			check:{
				enable: true,
				chkStyle: "checkbox",
                chkboxType: { "Y": "s", "N": "s" }
			}
			
	    }; 
	  
	    function filter(node) {
	        return node;
	    }
	 
	    function DynamicUpdateNodeCheck() {
	        var zTree = $.fn.zTree.getZTreeObj("left-tree1");
	        var nodes = zTree.getNodesByFilter(filter);
	        for (var i = 0; i < nodes.length; i++) {
	            var node = nodes[i];
	            node.nocheck = false; 
	            zTree.updateNode(node);
	        }
	    }
		
	     $.request({
	            type: 'Get',
	            url: url,//树结构地址
	            dataType: "json", 
	            success: function (data) {
                    $.fn.zTree.init($("#left-tree1"), setting, data).expandAll(true);
                	DynamicUpdateNodeCheck();//动态设置zTree的所有节点有checkbox
	            },
	            error: function (msg) {
	           
	            }
	        });
}

/*表格结构*/
function reloadTable(treeID){//点击字段刷新表格
	  $("#jqGrid_disTributeCoupons").setGridParam({url:"/manager/member/ticket/selectFcardInfo"+treeID}).trigger("reloadGrid");//(??????地址不对)
}
/*会员促销券发放_确认发送*/
$(document).on("click",".sure_send",function(){
	var result={};
	    result.id =$("#jqGrid_coupons").jqGrid("getGridParam","selrow");//主表行id
	    
	   
	    /*选中树节点ids*/
	    var treeObj=$.fn.zTree.getZTreeObj("left-tree1");
        var nodes=treeObj.getCheckedNodes(true);
        var v=[];
        for(var i=0;i<nodes.length;i++){
            v.push(nodes[i].id);
        }
	    result.typeIds=v//左边树
	                   
	    /*右边表格*/               
	   var idS =$("#jqGrid_disTributeCoupons").jqGrid("getDataIDs")||[];
	   result.ids=idS//右边表格
	   
	   if($("#showOrnot").prop("checked")){
		   result.ifContain ="1";
	   }else{
		   result.ifContain ="0";
	   }
	   $.request({
		   url:'/manager/member/ticket/saveSentInfo',
		   type:"POST",
		   data:{"typeIds":result.typeIds,"ids":result.ids,"id":result.id,"ifContain":result.ifContain},
		   traditional:true,
		   success:function(data){
				if(data.result==1){
		    		$.zxsaas_plus.showalert("提示",data.desc);
		    	}else{
		    		$.zxsaas_plus.showalert("错误",data.desc);
		    	}
			},
			error:function(msg){
		
				
			}
		   
	   });
});
	
	
})()



/*-----------------end-------------------*/




	var lastrow="";
	var lastcell="";
/*新增提交保存*/	
	$(document).on("click",".save_new",function(){
		$("#jqGrid_useGradeAdd").jqGrid("saveCell",lastrow,lastcell);
		var result =$("#newAdd").toJsonObject();//新增模态框
		console.log("------------------++++++++++++++++");
		console.log(result);
		result.ticketType = $("select[name=ticketType]>option:selected").val();//券分类
		//$("input[name=isStill]").prop("checked")&& result.isStill = "1";
		//$("input[name=isStill]").prop("checked")|| result.isStill ="0";
		if($("#newAdd .isStill").prop("checked")){//是否有使用门槛
			//使用门槛
			result.isStill ="1";
			var symkIDS =$("#jqGrid_useGradeAdd").jqGrid('getDataIDs');
			var arr =[];
			for(var i=0;i<symkIDS.length;i++){
				 var sp ={};
				 var rowData =$("#jqGrid_useGradeAdd").jqGrid('getRowData',symkIDS[i]);
				 if(rowData.discountAmount !=""){
					 sp.discountAmount = rowData.discountAmount;
					 sp.saleAmount = rowData.saleAmount;
					 arr.push(sp);
				 }
			}
			if(arr.length!=0)
		    result.sillList=arr; 
		}else{
			result.isStill ="0";
			
		}
		delete result["same-add"];
		//商品范围
		var spfwIDS =$("#jqGrid_DetailsAdd").jqGrid('getDataIDs');
		console.log("*****"+spfwIDS);
		var arr =[];
		for(var i=0;i<spfwIDS.length;i++){
			 var sp ={};
			 var rowData =$("#jqGrid_DetailsAdd").jqGrid('getRowData',spfwIDS[i]);
			 if(rowData.goodsClassId !=""){
				 sp.goodsClassId = rowData.goodsClassId;
				 arr.push(sp);
			 }
		}
		if(arr.length!=0)
	    result.goodsList=arr; 
		 result.status=0; 
		 result.direction=$(".drct_cotent_add").val(); //说明
		 result.modSms=$(".msg_cotent_add").val(); //短信模板
		 
		 console.log("-----------------------");
		 console.log(result);
		$.request({
			url:"/manager/member/ticket/saveInfo",
			type:"POST",
			datatype:"json",
			contentType:"application/json",
			data:JSON.stringify(result),
			traditional:true,
			success:function(data){
				if(data.result==1){
		    		$.zxsaas_plus.showalert("提示",data.desc);
		    		 $("#jqGrid_coupons").trigger("reloadGrid") ; 
		    	}else{
		    		$.zxsaas_plus.showalert("错误",data.desc);
		    	}
				
	    	  
         
			},
			error:function(msg){
				
			}
			
		});
		
	});	

	/*点击修改按钮*/
	$(document).on("click",".modify",function(){
		
		  var slctids=$("#jqGrid_coupons").jqGrid("getGridParam","selarrrow");//选中的行id
		  if(slctids.length !=0){
			   if(slctids.length ==1){//选中一条数据
				   $("#ModifyModal").modal();
			   }else{//选中多条数据
				   $.zxsaas_plus.showalert("错误","请选择其中一张券!");
			   }
		   }else{
			   $.zxsaas_plus.showalert("错误","至少选择一张券!");
		   }
//		
//		  var slctid=$("#jqGrid_coupons").jqGrid("getGridParam","selrow");//选中的行id
//		  if(slctid!=null){
//			  var rowData =$("#jqGrid_coupons").jqGrid('getRowData',slctid);
//			  console.log(slctid);
//			  console.log(rowData);
//			  $("#ModifyModal  input[name=id]").val(slctid);//选中的行id
//			  $("#ModifyModal input[name=ticketNo]").val(rowData.ticketNo);//券编号
//			  $("#ModifyModal input[name=ticketName]").val(rowData.ticketName);//券名称
//			  //$("#ModifyModal input[name=ticketName]").text(rowData.ticketType);//券分类
//			  $("#ModifyModal input[name=remark]").val(rowData.remark);//备注
//			  $("#ModifyModal input[name=openDate]").val(rowData.openDate);//生效日期
//			  $("#ModifyModal input[name=closeDate]").val(rowData.closeDate);//截至日期
//			  
//			  if(rowData.direction !="" || rowData.direction !=undefined){
//			  $("#ModifyModal  .two-bn").next().html("<div class='drct_cotent' name='direction' style='width: 100%;height: 100%;border: none; overflow-y:auto;'>"+rowData.direction+"</div>");
//			  }  
//			  console.log(":::::"+rowData.modSms);
//			  if(rowData.modSms!= "" ||rowData.modSms!=undefined){
//			  $(".modelOrNot_M").prop("checked",true);
//			  $("#newAddMessage_M .message-content").html("<div class='msg_cotent' name='modSms' style='width: 100%;height: 100%;border: none; overflow-y:auto;'>"+ rowData.modSms+"</div>");
//			  }
//		  }
		 // $(".drct_cotent").text(rowData.direction); //说明
		  // $(".msg_cotent").text(rowData.modSms); //短信模板
	});
	/*修改提交保存*/	
	$(document).on("click",".save_M",function(){
		
		$("#jqGrid_useGradeModify").jqGrid("saveCell",lastrow,lastcell);
		
		var result =$("#ModifyModal").toJsonObject();//修改模态框
		result.ticketType = $("select[name=ticketType]>option:selected").val();//券分类
		//$("input[name=isStill]").prop("checked")&& result.isStill = "1";
		//$("input[name=isStill]").prop("checked")|| result.isStill ="0";
		if($("#ModifyModal .isStill").prop("checked")){//是否有使用门槛
			//使用门槛
			result.isStill ="1";
		
			var symkIDS =$("#jqGrid_useGradeModify").jqGrid('getDataIDs');
			var arr =[];
			for(var i=0;i<symkIDS.length;i++){
				 var sp ={};
				 var rowData =$("#jqGrid_useGradeModify").jqGrid('getRowData',symkIDS[i]);
				 if(rowData.discountAmount !=""){
					 sp.discountAmount = rowData.discountAmount;
					 sp.saleAmount = rowData.saleAmount;
					 arr.push(sp);
				 }
			}
			if(arr.length!=0)
		    result.sillList=arr; 
		}else{
			result.isStill ="0";
			
		}
		delete result["same-Modify"];
		//商品范围
		var spfwIDS =$("#jqGrid_DetailsModify").jqGrid('getDataIDs');
		console.log("*****"+spfwIDS);
		var arr =[];
		for(var i=0;i<spfwIDS.length;i++){
			 var sp ={};
			 var rowData =$("#jqGrid_DetailsModify").jqGrid('getRowData',spfwIDS[i]);
			 if(rowData.goodsClassId !=""){
				 sp.goodsClassId = rowData.goodsClassId;
				 arr.push(sp);
			 }
		}
		if(arr.length!=0)
	    result.goodsList=arr; 
		result.direction=$(".drct_cotent").val(); //说明
		result.modSms=$(".msg_cotent").val(); //短信模板
		
		
		$.request({
			url:"/manager/member/ticket/saveInfo",
			type:"POST",
			datatype:"json",
			contentType:"application/json",
			data:JSON.stringify(result),
			traditional:true,
			success:function(data){
				if(data.result==1){
		    		$.zxsaas_plus.showalert("提示",data.desc);
		    		 $("#jqGrid_coupons").trigger("reloadGrid") ; 
		    	}else{
		    		$.zxsaas_plus.showalert("错误",data.desc);
		    	}
	    	
         
			},
//			error:function(msg){
//				 alert(" 数据加载失败RRRR！" + msg);	
//				
//			}
			
		});
	});	
	
	/*删除按钮*/
$(document).on("click",".delete",function(){
	

	  var slctids=$("#jqGrid_coupons").jqGrid("getGridParam","selarrrow");//选中的行id
	   if(slctids.length !=0){
		   if(slctids.length ==1){//选中一条数据
			   $.zxsaas_plus.showconfirm("","是否删除该券?",function(){
					//$("#jqGrid_coupons").jqGrid('delRowData',slctids[0]);
				   $.request({
					   url:"/manager/member/ticket/delete/"+slctids[0],
					   type:"GET",
					   success:function(data){
							if(data.result==1){
					    		$.zxsaas_plus.showalert("提示",data.desc);
					    		$("#jqGrid_coupons").trigger("reloadGrid");
					    	}else{
					    		$.zxsaas_plus.showalert("错误",data.desc);
					    	}
						},
						error:function(msg){
							
						}
					   
				   });
				},function(){
					
				});
		   }else{//选中多条数据
			   $.zxsaas_plus.showalert("错误","只能选中一条数据!");
		   }
	   }else{
		   $.zxsaas_plus.showalert("错误","至少选中一条数据!");
	   }

});


/*启用按钮*/
$(document).on("click",".start_use",function(){
	
	  var slctids=$("#jqGrid_coupons").jqGrid("getGridParam","selarrrow");//选中的行id
	
	  if(slctids.length !=0){
		   if(slctids.length ==1){//选中一条数据
			   $.zxsaas_plus.showconfirm("","是否启用该券?",function(){
				   $.request({
					   url:"/manager/member/ticket/updateStatus/"+slctids[0]+"/0",
					   type:"POST",
					   datatype:"json",
					   traditional:true,
					   success:function(data){
							if(data.result==1){
					    		$.zxsaas_plus.showalert("提示",data.desc);
					    		$("#jqGrid_coupons").trigger("reloadGrid");
					    	}else{
					    		$.zxsaas_plus.showalert("错误",data.desc);
					    	}
						},
						error:function(msg){
							
						}
					   
				   });
				},function(){
					
				});
		   }else{//选中多条数据
			   $.zxsaas_plus.showalert("错误","只能选中一条数据!");
		   }
	   }else{
		   $.zxsaas_plus.showalert("错误","至少选中一条数据!");
	   }

});

/*停用按钮*/
$(document).on("click",".stop_use",function(){
	
	  var slctids=$("#jqGrid_coupons").jqGrid("getGridParam","selarrrow");//选中的行id
	  if(slctids.length !=0){
		   if(slctids.length ==1){//选中一条数据
			   $.zxsaas_plus.showconfirm("","是否停用该券?",function(){
				   $.request({
					   url:"/manager/member/ticket/updateStatus/"+slctids[0]+"/1",
					   type:"POST",
					   datatype:"json",
					   traditional:true,
					   success:function(data){
							if(data.result==1){
					    		$.zxsaas_plus.showalert("提示",data.desc);
					    		$("#jqGrid_coupons").trigger("reloadGrid");
					    	}else{
					    		$.zxsaas_plus.showalert("错误",data.desc);
					    	}
						},
						error:function(msg){
						}
					   
				   });
				},function(){
					
				});
		   }else{//选中多条数据
			   $.zxsaas_plus.showalert("错误","只能选中一条数据!");
		   }
	   }else{
		   $.zxsaas_plus.showalert("错误","至少选中一条数据!");
	   }

});

	
/*发放情况*/

/*选择添加到发放情况表格中*/
$(document).on("click",'.ff',function(){
	 $("#jqGrid_disTributeStatus").jqGrid('clearGridData');
	   var id= $("#jqGrid_coupons").jqGrid('getGridParam','selrow');
	   var rowData =$("#jqGrid_coupons").jqGrid('getRowData',id);//待添加内容~~~
			

});

/*发放情况 模态框弹出后加载表格*/
$("#dstributCouponsModal").on('show.bs.modal', function (e) {
	loadmodal({TableName:"#jqGrid_disTributeStatus",pager:"#jqGridPagerdisTributeStatus",TableInfo:5,LoadTableUrl:'/manager/member/ticket/selectSentInfo'});
});

/*显示已失效会员促销券*/
$(document).on("click","#show-disVali",function(){
		$(this).prop("checked")&& $("#jqGrid_coupons").setGridParam({url:"/manager/member/ticket/selectList/1"}).trigger("reloadGrid");
		$(this).prop("checked")|| $("#jqGrid_coupons").setGridParam({url:"/manager/member/ticket/selectList/0"}).trigger("reloadGrid");
});
/*新增模态框弹出后触发*/
$('#newAdd').on('show.bs.modal', function (e) {
	$("#newAdd input[type=text]").val("");
	$("#newAdd input[type=checkbox]").prop("checked",false);  
	$("#jqGrid_DetailsAdd").jqGrid("clearGridData").trigger("reloadGrid") ; 
	$("#jqGrid_useGradeAdd").jqGrid("clearGridData").trigger("reloadGrid") ; 
});


/*修改框弹出后触发*/
$("#ModifyModal").on('show.bs.modal', function (e) {
	 $(".modelOrNot_M").prop("checked",false);
	 var slctid=$("#jqGrid_coupons").jqGrid("getGridParam","selrow");//选中的行id
		  var rowData =$("#jqGrid_coupons").jqGrid('getRowData',slctid);
		  console.log(slctid);
		  console.log(rowData);
		  $("#ModifyModal  input[name=id]").val(slctid);//选中的行id
		  $("#ModifyModal input[name=ticketNo]").val(rowData.ticketNo);//券编号
		  $("#ModifyModal input[name=ticketName]").val(rowData.ticketName);//券名称
		  //$("#ModifyModal input[name=ticketName]").text(rowData.ticketType);//券分类
		  $("#ModifyModal input[name=remark]").val(rowData.remark);//备注
		  $("#ModifyModal input[name=openDate]").val(rowData.openDate);//生效日期
		  $("#ModifyModal input[name=closeDate]").val(rowData.closeDate);//截至日期
		  
		  if(rowData.direction.replaceAll("\\s+", "") != ""){
		      $("#ModifyModal  .two-bn").next().find(".drct_cotent").val(rowData.direction);
		  }  
		  console.log(":::::"+typeof(rowData.modSms));
		  console.log(":::::"+rowData.modSms.replaceAll("\\s+", "")+"::");
		  
		  if(rowData.modSms.replaceAll("\\s+", "") != "" ){
			
			  $("#newAddMessage_M .message-content>.msg_cotent").val(rowData.modSms);
			  $(".modelOrNot_M").prop("checked",true);
		  }
	  
	 // $(".drct_cotent").text(rowData.direction); //说明
	///   $(".msg_cotent").text(rowData.modSms); //短信模板
});


$("#newAddMessage").on('show.bs.modal', function (e) {
      $("#newAddMessage .message-content>.msg_cotent_add").val(
 			"[ＸＸＸＸＸＸＸＸ手机连锁公司]　尊敬的会员："+"\n"+
 			"为庆贺ＸＸＸＸ，我公司特为您准备了一张面值为ＸＸＸ元的抵现券。"+"\n"+
 			"使用说明："+"\n"+
 			"1.本券有效期限　[XXXX年XX月XX日]　至　[XXXX年XX月XX日]；"+"\n"+ 
 			"2.本券只允许在　[XXXXXX手机连锁公司]　门店使用；"+"\n"+ 
 			"3.本券够买　[任意（或部份）]　商品可按券面值　[全额抵现]  /   本券使用规则：在购买　[任意或部份）]　商品，[金额达到1000元可抵减50元；金额达到1800元可抵扣100元；金额达到3000元可抵扣200元]　。详情请至门店咨询；"+"\n"+
 			"4.本券只限使用一次，本券不兑现不找零；"+"\n"+
 			"5.本券解释权归本公司所有。");
     
});

/*修改信息模态框触发后*/
$("#newAddMessage_M").on('show.bs.modal', function (e) {

		 $(".modelOrNot_M").prop("checked")||$("#newAddMessage_M .message-content>.msg_cotent").val(
   			   "[ＸＸＸＸＸＸＸＸ手机连锁公司]　尊敬的会员："+"\n"+
   			   "为庆贺ＸＸＸＸ，我公司特为您准备了一张面值为ＸＸＸ元的抵现券。"+"\n"+
   				"使用说明："+"\n"+
   				"1.本券有效期限　[XXXX年XX月XX日]　至　[XXXX年XX月XX日]；"+"\n"+ 
   				"2.本券只允许在　[XXXXXX手机连锁公司]　门店使用；"+"\n"+ 
   				"3.本券够买　[任意（或部份）]　商品可按券面值　[全额抵现]  /   本券使用规则：在购买　[任意或部份）]　商品，[金额达到1000元可抵减50元；金额达到1800元可抵扣100元；金额达到3000元可抵扣200元]　。详情请至门店咨询；"+"\n"+
   				"4.本券只限使用一次，本券不兑现不找零；"+"\n"+
   				"5.本券解释权归本公司所有。");
 
     
});



/*保存新增短信模板*/
$(document).on("click",".save_megsModel",function(e){
	if($("#newAddMessage .message-content>.msg_cotent_add").val()!=""){
		$(".modelOrNot").prop("checked",true);
		
	}else{
		 $(".modelOrNot").prop("checked",false);
	}
	
	e.preventDefault;
});

/*保存修改短信模板*/
$(document).on("click",".save_megsModel_M",function(e){
	if($("#newAddMessage_M .message-content>.msg_cotent").val()!=""){
		$(".modelOrNot_M").prop("checked",true);
		
	}else{
		 $(".modelOrNot_M").prop("checked",false);
	}
	e.preventDefault;
});

/*毫秒 转化成正确格式的时间*/
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
    switch(a){
        case 'yyyy':
            return tf(t.getFullYear());
            break;
        case 'MM':
            return tf(t.getMonth() + 1);
            break;
        case 'mm':
            return tf(t.getMinutes());
            break;
        case 'dd':
            return tf(t.getDate());
            break;
        case 'HH':
            return tf(t.getHours());
            break;
        case 'ss':
            return tf(t.getSeconds());
            break;
    }
})
}
