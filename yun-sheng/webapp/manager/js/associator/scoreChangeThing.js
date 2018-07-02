
function loadmodal(options){
	/*初始化表格参数*/
        var colNamec = [];
		var colName0 = ['操作','id','商品ID','礼品（商品）编码','礼品（商品）名称','会员类型范围','兑换积分','补款金额','兑换开始日期','兑换结束日期','零售价'];//积分换购设置
		colNamec[0]=colName0;
		
		var colName2 = ['id','类型编码','类型名称'];//会员类型范围选择
		colNamec[2]=colName2;
		
		var JqGridColModelc = [];
		//积分调整表初始化
		var JqGridColModel0 =[    
		                        {name:'do',index:'do', width:100,align:'center', sortable:false,formatter:addAndDelete},
		                        {name:'id',index:'id', width:100,align:'center', sortable:false,hidden:true},
                                {name:'goodsId',index:'goodsId', width:100,align:'center', sortable:false,hidden:true},
								{name:'code',index:'code', width:100,align:'center', sortable:false,formatter:Goodsmodel},
								{name:'name',index:'name', width:100,align:'center', sortable:false,formatter:Goodsmodel},
								{name:'cardTypeId',index:'cardTypeId', width:100,align:'center', sortable:false},//会员类型范围多选
								{name:'exScore',index:'exScore', width:100,align:'center', sortable:false,editable:true},
								{name:'reAmount',index:'reAmount', width:100,align:'center', sortable:false,editable:true},
								{name:'startDate',index:'startDate', width:100,align:'center', sortable:false,editable:true,editoptions:{dataEvents:[{type:"focus",fn:function(){timePicker($(this).attr("id"));}}]}},
								{name:'endDate',index:'endDate', width:100,align:'center', sortable:false,editable:true,editoptions:{dataEvents:[{type:"focus",fn:function(){timePicker($(this).attr("id"));}}]}},
								{name:'prince',index:'prince', width:100,align:'center', sortable:false}
								
			                ];
		JqGridColModelc[0]=	JqGridColModel0;     
		//会员类型范围表格初始化
		var JqGridColModel2 =[    
		                       
		                  	{name:'id',index:'id', width:100,align:'center',  sortable:false,hidden:true},
	                      	{name:'typeCode',index:'typeCode', width:100,align:'center',  sortable:false},
							{name:'typeName',index:'typeName', width:100,align:'center', sortable:false},
								
			                ];
		JqGridColModelc[2]=	JqGridColModel2;     
		
		//全局当前选择的rowid colid
		var rowid='';
		var colid='';
		var select_name='';
		
		var defaults = {
		LoadTableUrl: "",
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		TableName: "", //显示表格名称。遵照css选择器书写
		pager:"",
		TableInfo:"0",
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
								repeatitems: false
								},
						colNames:colNames,          
			            colModel:JqGridColModel,
			            cellEdit:true,
			            cellsubmit:'clientArray',
			            editurl: 'clientArray',
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: 10,
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
						ondblClickRow:function(id){
						//双击进入编辑
			   				var delid = id;
						},
						onCellSelect:function(id,index,cellcontent,e){
							var colName=$(options.TableName).jqGrid('getGridParam','colModel')[index].name 
					      	select_name=colName
					      	select_index=index;
					      	rowid=id;
					      	
					        if(colName=="cardTypeId"){  
					        	 $(options.TableName).find("tr#"+id).find("td:eq(6)").attr("data-toggle","modal").attr("data-target","#assoSortExtend");
					        	// $(options.TableName).find("tr#"+id).find("td:eq(5)").attr("data-target","#assoSortExtend");
					        }
					        if(colName=="startDate"||colName=="endDate"){
					        
					        	//var iptId =$(options.TableName).find("tr#"+id).find("td:eq(9)").find("input").attr("id");//兑换开始日期
					        	//alert(iptId);
					        	var iptId =$("input[rowid="+id+"]").attr("id")
					        	timePicker(iptId);
					        }
						},
//						onSelectRow:function(id){
//							if(id!=lastsel&&lastsel!=''){
//								$(options.TableName).jqGrid('saveRow',lastsel,{
//									aftersavefunc:function(rowid,response ){
//										console.log(id);
//									}
//									});
//							}
//							lastsel=id;
//						var rec = $(options.TableName).jqGrid('getRowData', id);
//						
//						},
						 beforeEditCell:function(rowid,cellname,v,iRow,iCol)
						 {
						  lastrow = iRow; 
						  lastcell = iCol;
						  },
						beforeSelectRow:function(rowid,e){
                          
                            
						},
						afterInsertRow: function (rowid, aData) { //新增一行之后

						},
						gridComplete: function() {
						//	var ids=$(options.TableName).jqGrid("getDataIDs");

						},
						loadComplete:function(data){
					      //  $(options.TableName).jqGrid('addRowData', "1", {},'last' );
						
						},
						loadError:function(xhr,status,error){
							//console.log(status)
						}
						})
		
		}
			(function(){
				/*会员范围模态框弹出后*/
				var parentId="";
				$(document).on('show.bs.modal',"#assoSortExtend", function (e) {
					loadmodal({TableName:"#jqGrid_assoSortExtend",TableInfo:2,LoadTableUrl: "/manager/member/cardType/selectTypeList",choose:true});	
					parentId=$(e.relatedTarget).parent("tr").attr("id");
				});
				/*保存关闭会员类型模态框*/
				$(".saveAssoSort").on("click",function(){
					var ids =$("#jqGrid_assoSortExtend").jqGrid("getGridParam","selarrrow");
					if(parentId!=""){
					if(ids!=0){
						var data=[];
						for(var i=0;i<ids.length;i++){
						   var rowData =$("#jqGrid_assoSortExtend").jqGrid("getRowData",ids[i]);
						   data[i]=rowData.id;
						}
						data.join(",");
						$("#jqGrid_scoreChangeSet").jqGrid("setCell",parentId,'cardTypeId',data);
					}
					}
				});
				
				
			})();
			 /*加载日期控件*/
			 function timePicker(id){
					
				 $("#"+id).datetimepicker({
					  lang:"ch",           //语言选择中文
				      format:"Y-m-d",      //格式化日期
				      timepicker:false,    //关闭时间选项
				      todayButton:false    //关闭选择今天按钮
					});
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
			
			
			/*操作列*/
			
			function addAndDelete(cellvalue, options, rowObjec){
				var addAndDel ='<div class="operating" data-id="' + options.rowId + '"><span style="cursor:pointer;margin-right:10px" class="icon-plus" id="icon-plus" title="添加" ></span><span style="cursor:pointer;" class="icon-trash" id="icon-trash" title="删除"></span></div>';
				return addAndDel;
			}
			

			 function Goodsmodel(cellvalue, options, rowObject){
		            if(cellvalue == undefined || cellvalue == ""){
	                	cellvalue = "";
	                }
					return '<span class="goodsSort" style="display: inline-block; width: 89px;height: 16px;" data-toggle="modal" data-target="#goodsch" data-rId="' + options.rowId +'">' + cellvalue + '</span>';     
			}
			
			
				//新增一行
			   	$(document).on("click",".icon-plus",function(){
					var rowId = $(this).parent().data('id');
					var ids = $("#jqGrid_scoreChangeSet").jqGrid('getDataIDs');
					//获得当前最大行号（数据编号）
					var maxid;
					maxid = (ids.length ==0 ) ? 0 : Math.min.apply(Math,ids);
					var maxid;
					if(maxid>0)
						maxid=0-maxid;
					else
						maxid=maxid-1;
					$("#jqGrid_scoreChangeSet").jqGrid('addRowData', maxid, {}, 'last' );
			   		
			   	});
			   	
			   	//删除一行
				$(document).on('click','.icon-trash',function(e){
					var thisTitle = $(this).attr("title");
					var rowId = $(this).parent().data('id');
					var checkedList =[];
					checkedList.push(rowId);
					if(thisTitle == "删除"){
						$.zxsaas_plus.showconfirm("删除","是否确定删除本行?",function(){
							$.request({
								url:"/manager/beginning/employee/delete",
								type:"POST",
								data:{"ids":checkedList},
								traditional: true,
								 success: function (data) {
										 if(data.result==1){
									    		$.zxsaas_plus.showalert("提示",data.desc);
									    	}else{
									    		$.zxsaas_plus.showalert("错误",data.desc);
									    	}
											$("#jqGrid_scoreChangeSet").trigger("reloadGrid");
											freshTableTitle();//刷新表头信息
								   },
						          error: function (msg) {
						            
						          }
								
								
								
							});
							//$(options.TableName).jqGrid('delRowData', rowId);
						},function(){
							
						});

					}
				}); 
            //创建一个input输入框
            function myelem (value, options) {
             var reg =/[^\d\s]/g;
              var el = document.createElement("input");
              el.type="text";
              $(el).on("input propertychange",function(){/*只允许正整数*/
              	   $(this).val($(this).val().replace(reg,''));
              });
              el.value = value;
              return el;
            }
            
            //获取值
            function myvalue(elem) {
              return $(elem).val();
            } 
//		   //检测输入的是否为正整数
		  function checkNumber(value, colname) {
				var reg = /^[1-9]\d*$/;
				var arr = [];
				arr = (!reg.test(value)) ? ([false,'请输入数字']) : ([true,""])
				return arr;
			}
		   
		
			
			//修改信息
			$('.updateBloc').click(function(){
				var checkedList = [];//存放已勾选行id
				$('.del').each(function (index, domEle) { 
					  // domEle == this 
					($(domEle).prop('checked')) ? (checkedList.push($(domEle).data('id'))) : '';
				});
				var len = checkedList.length;
				var gridData = $(options.TableName).jqGrid("getRowData",checkedList[0]);//获取被选中的一行数据
				//var id = gridData.blocId;
				//console.log('id:' + id);
				if(len != 1){
					$.zxsaas_plus.showalert("错误","一次只能修改一条信息!");
					return false;
				}else{
					$('.blocId').val(gridData.blocId);
					$('.blocPer').val(gridData.blocPer);
					$('.blocTime').val(gridData.blocTime);
					$('.blocUpdate').val(gridData.blocUpdate);
					$('.blocUpdateTime').val(gridData.blocUpdateTime);
					$('.blocNo').val(gridData.blocNo);
					$('.blocName').val(gridData.blocName);
					$('.blocMark').val(gridData.blocMark);
					$('.blocAdmin').val(gridData.blocAdmin);
					$('.blocPwd').html(gridData.blocPwd);
					//$('.blocDouble').val(gridData.blocDouble);
					if(gridData.blocDouble == '1'){
						//不禁用
						$('.blocDouble').prop({'checked':''});
					}else{
						$('.blocDouble').prop({'checked':'checked'});
					}
					
					return true;
				}
			});
			
			
			
			
			//列表    重置密码
			function rePwd(cellvalue, options, rowObjec)
			{
				console.log(options + ';;;;;');
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

function drawTable(tn,pger,tableinfo){
	if(tableinfo == 0){//积分换购设置
		loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/member/scoreBuy/selectList"});	
  // 	loadmodal({TableName:tn,TableInfo:tableinfo,LoadTableUrl: "/manager/card/selectAll"});	
     //    $(tn).jqGrid('setLabel',1, '选择', 'labelstyle');

	}
	
}

function initial(){

	 drawTable("#jqGrid_scoreChangeSet","#jqGridPagerscoreChangeSet","0");
}
(function(){
	/*树形结构*/
	var rowId = '';
	$(document).on('click','.goodsSort',function(){
		var ptId = $(this).parents("table").attr("id");
		rowId = $(this).data('rid');
		$('#goodsch').find('#goodsDataTree').html("");//清空树结构
		//	ul ="/manager/Tgoodsclass/findTree2";
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
								$("#"+ptId).setCell(rowId,'code',treeNode.obj.code)//商品分类编码
						        $("#"+ptId).setCell(rowId,'name',treeNode.obj.name)//商品分类名称
							    $("#"+ptId).setCell(rowId,'goodsId',treeNode.obj.id)//商品ID   
								$('#goodsch').modal('hide');//关闭商品资料模态框
						}
					}
			    }; 
			
			  $.request({
		          type: 'Get',
		          url: "/manager/Tgoodsclass/findTree2",//树结构地址
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
		

	});
	
	
})();


var lastrow="";
var lastcell="";
/*保存积分换购*/
$(document).on("click",".save_soreBuy",function(){
	var result={};
	$("#jqGrid_scoreChangeSet").jqGrid("saveCell",lastrow,lastcell);
	 var jfhgIDS =$("#jqGrid_scoreChangeSet").jqGrid('getDataIDs');
		
		arr =[];
		for(var i=0;i<jfhgIDS.length;i++){
			 var sp ={};
			 var rowData =$("#jqGrid_scoreChangeSet").jqGrid('getRowData',jfhgIDS[i]);
	
			 if(rowData.goodsId !=""){
				 sp.goodsId  = rowData.goodsId ;
				 sp.cardTypeId ="1,2,3";            //rowData.cardTypeId ;//格式
				 sp.exScore =rowData.exScore ;
				 sp.reAmount =rowData.reAmount ;
				 sp.startDate =rowData.startDate ;
				 sp.endDate =rowData.endDate;
				 arr.push(sp);
			 }
		}
		if(arr.length!=0)
		console.log(JSON.stringify(result));
		$.request({
			url:"/manager/member/scoreBuy/saveSentInfo",
			type:"POST",
			datatype:"json",
			contentType:"application/json",
			data:JSON.stringify(arr),
			 success: function (data) {
					 if(data.result==1){
				    		$.zxsaas_plus.showalert("提示",data.desc);
				    	}else{
				    		$.zxsaas_plus.showalert("错误",data.desc);
				    	}
				    	
			          },
	          error: function (msg) {
	                alert(" 数据加载失败！" + msg);
	          }
			
			
			
		});
	
});
