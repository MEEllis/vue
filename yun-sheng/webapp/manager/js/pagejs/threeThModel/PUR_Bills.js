		function loadmodal()
			{
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "../../json/T_rolesdata.json", //表格数据加载接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		LoadTableFomatUrl: "../../json/T_roles.json", //获取表格显示格式数据加载地址
		//SaveEditUrl: "", //新增或修改后保存数据接口地址
		//SaveAddUrl: "", //新增或修改后保存数据接口地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		TableName: ".zxsaastable", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager"
//		inputbox: ".inputbox" //搜索条件框存放容器。遵照css选择器书写
		};
		
		//加载功能按钮
		$.getJSON(options.LoadBtnUrl, function(r) {
			$(options.btnbox).html("");
			var btnjson = r.data;
			$.each(btnjson, function(i, item) {				
				var buttonstr = '<button type="button" class="btn btn-default button" data-eventname="' + item.name + '" data-editid="0"><i class="iconfont">' + item.iconcode + '</i>' + item.text + '</button>'
				$(options.btnbox).append(buttonstr);
			});
		})
		

		//加载表格
		$.getJSON(options.LoadTableFomatUrl,function(t_data){
			var JqGridColModel=t_data.jqmodel;
			var jqsubGridColModel=t_data.jqsubGridColModel;
			$.jgrid.defaults.width = 1280;
			$.jgrid.defaults.responsive = true;
			$.jgrid.defaults.styleUI = 'Bootstrap';	
			var lastsel='';//最后一次选中的行
			var rightClickColid="";//右键列id
			var rightClickColIndex=0;//右键index
			//var toggleflag=false;//冻结时候切换用
			var isEditable=false;//是否可以编辑
			var isSortable=false;//是否可以排序

			$(options.TableName).jqGrid({
			url:options.LoadTableUrl,
			mtype:"POST",
			//data:{},
			datatype:"json",
			//datatype: "local",
			//editurl: 'clientArray',
			postData:$.zxsaas_plus.getinput2json("#inquire_option"),			
			datatype: "json",
			jsonReader  : {
				
						   root: "rows",
						   page: "page",
						   total: "total",
						   records: "records",
						   repeatitems: false,
						},
			cellsubmit: 'clientArray',//单元格保存内容的位置
			ajaxGridOptions : {contentType: 'application/json; charset=utf-8'},
			serializeGridData: function (postData)
    		{
                return JSON.stringify(postData);
   			},            
            colModel:JqGridColModel,
            loadonce: false,
            rowNum: 10,
            rowList: [10, 15, 20, 25, 40],
            pager:options.pager,
            viewrecords: true,
            sortable:isSortable,
          	sortorder: "desc",
            sortname:'xuhao',          
            multiselect:true,
           	cellEdit:isEditable,
            width: "100%" ,
            height: $(window).height()*0.7,
            scroll:true,
            /*altRows:true,
            altclass:'.grid-row-odd',*/
			autowidth:true,
			rownumWidth: 35, // the width of the row numbers columns
			shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
			/*footerrow:true,  //设置表格显示表脚
			userDataOnFooter:true,//设置userData 显示在footer里*/
			ondblClickRow:function(id){
			//双击进入编辑
   				var delid = id;
   				
			},
			onCellSelect:function(id,index,e){
				
			},
			onSelectRow:function(id){
				if(id!=lastsel&&lastsel!=''){
					$(options.TableName).jqGrid('saveRow',lastsel);
				}
				var ret=$(options.TableName).jqGrid('getRowData',id);
				lastsel=id;
			},
			
			beforeSelectRow:function(rowid,e){

			},
			afterInsertRow: function (rowid, aData) { //新增一行之后

			},
			gridComplete: function() {
				//rightClickMenu();
			},
			loadComplete:function(data){
				//obj.trigger("reloadGrid");
			},
			
			subGrid: options.isSub,
			subGridOptions: {
				selectOnLoad :true,
				reloadOnExpand:false
			},
			subGridBeforeExpand: function(subgrid_id, row_id) {

			},
			subGridRowExpanded: function(subgrid_id, row_id) {
				var subgrid_table_id = subgrid_id+"_t";
				var subgrid_pager_id=pager_id = "p_"+subgrid_table_id; 
			     $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table>");
				 $("#RemunerationGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });		
			     $("#"+subgrid_table_id).jqGrid({
			        url:options.subLoadTableUrl+row_id,
			        datatype: "json",
			  	  	serializeGridData:function(postData){
				       return JSON.stringify(postData);
			  	  	},		
					colModel: jqsubGridColModel,
			        rownumbers:true,
			        width:"100%",
			      	height:"100%",
			      	sortable:true,
			      	 jsonReader: {   // 针对子表格的jsonReader设置  
                    root:"subrows",  
                    records: "records",  
                    repeatitems : false  
                	},
                	pager: subgrid_pager_id
			     });
					},
					subGridRowColapsed: function(subgrid_id, row_id){
		
					}
				})
		});
		
		
		//查询
		$(document).on("click",".btnbox button[data-eventname='inquire']",function(event){
			
			$(options.TableName).setGridParam({search:true}).trigger("reloadGrid");
			
		});
	//新增，跳转		
		$(document).on("click",".btnbox button[data-eventname='showAddModal']",function(event){
			window.location.href = "newpage.html";
			
		});
	//编辑，跳转
		$(document).on("click",".btnbox button[data-eventname='showEditModal']",function(event){
			var ids=$(options.TableName).getGridParam("selarrrow");
			if(ids.length==1){
			var delid = $(options.TableName).getGridParam("selrow");
			//console.log(delid);
			window.location.href = "newpage.html?p="+delid;
			}else{
			$.scojs_message('编辑时必须只选中一行或者双击该行', $.scojs_message.TYPE_ERROR);
			}
		});	
		
	//删除
		$(document).on("click",".btnbox button[data-eventname='delRow']",function(event){
			$.zxsaas_plus.showconfirm("数据删除提醒", "您正在删除系统数据，该操作将导致不可逆的数据销毁！您确定要执行改操作吗？",
				function() {
				var ids=$(options.TableName).getGridParam("selarrrow");
				if(ids.length>=1){
					var delids =  $(options.TableName).getGridParam("selarrrow");
					console.log(delids);
					$.post(options.DelRowUrl, {
						id: delids
					}, function(r) {		
						if(r.result == 1) {
							$.zxsaas_plus.showalert("数据操作成功！", "数据操作成功");
						} else {
							$.zxsaas_plus.showalert("数据操作失败！", "数据操作失败");
						}
					});
				}else{
					$.scojs_message('编辑时必须至少选择一行', $.scojs_message.TYPE_ERROR);
				}
				},
				function() {
			
				});
			
		});
		$(document).on("click",".btnbox button[data-eventname='printbtn']",function(event){
			$.zxsaas_plus.showalert("表格打印操作", "表格打印操作咱未完成，敬请期待");
			
		});
		$(document).on("click",".btnbox button[data-eventname='exportTablename']",function(event){
			$.zxsaas_plus.showalert("表格导出操作", "表格导出操作咱未完成，敬请期待");
			
		});
}
