$(function(){
	loadmodal();
});

function loadmodal(){
		var options = {
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		LoadTableUrl: "/manager/authority/companyInfo/selectContactUnitList",//查询集团信息接口地址
		GetRowInfoUrl: "", //编辑时获取数据详细信息接口加载地址
		DelRowUrl: "", // 删除信息接口地址
		isSub:"",//是否有子级表格
		subLoadTableUrl:"",//子级表格数据来源地址
		//ModouleName: "", //模块名称。遵照css选择器书写  systemSet_companyParameter
		TableName: "#jqGrid_blocMessage", //显示表格名称。遵照css选择器书写
		iconJsonUrl:"../json/icon.json",
		btnbox: ".btnbox ",//功能按钮存放容器。遵照css选择器书写	
		pager:"#jqGridPager"
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
			var colNames = ['ID','往来单位编码','往来单位名称'];
			var JqGridColModel=[
								{name:'id',index:'id', width:50,align:'center', sorttype:'string',hidden:true, key: true,sortable:false},
								{name:'code',index:'code', width:200,align:'center', sorttype:'String',sortable:false},
								{name:'name',index:'name', width:200,align:'center', sorttype:'string',sortable:false},
								/*{name:'adminLogin',index:'adminLogin', width:150,align:'center', sorttype:'string'},
								{name:'adminPwd',index:'adminPwd', width:150,align:'center', sorttype:"string",formatter:rePwd},
								{name:'status',index:'status', width:100,align:'center',formatter:formatStatus},
								{name:'remark',index:'remark', width:100,align:'center',  sorttype:'string'},
								{name:'createUName',index:'createUName', width:100,align:'center',  sorttype:'string'},
								{name:'createId',index:'createId', width:100,align:'center',  sorttype:'Long',hidden:true},
								{name:'createTime',index:'createTime', width:200,align:'center',sorttype:'string'},
								{name:'updateUName',index:'updateUName', width:100,align:'center',  sorttype:'string'},
								{name:'updateId',index:'updateId', width:100,align:'center',  sorttype:'Long',hidden:true},
								{name:'updateTime',index:'updateTime', width:200,align:'center', sorttype:'string'},
								{name:'templetId',index:'templetId', width:100,align:'center',  sorttype:'Long',hidden:true}*/
			                ];
			
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
			            sortable:false,			            
			            rownumbers:true,
			            rowNum: 20,
			            rowList: [20, 25, 40],
			            pager:options.pager,
			            viewrecords: true,		           
			            width: "100%" ,
			            height: $(window).height()*0.65,
			            multiselect:true,//定义是否可以多选
			            multiselectWidth:40,
						autowidth:true,
						rownumWidth: 35, // the width of the row numbers columns
						shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
						beforeSelectRow : function(rowid, e) {
						  var check = $(e.target).is('input[type=checkbox]');
						  if (check) {
							$(options.TableName).jqGrid('setSelection', rowid);
						  }
						    return check;
					  },
						loadComplete:function(data){
							$(options.TableName).find('td').find(':checkbox').removeClass();
						 }
					 })
		
			}
			
			//列表    重置密码
			function rePwd(cellvalue, options, rowObjec){
			    if(rowObjec.adminLogin=="" || rowObjec.adminLogin==null){
			    	return "";
			    }else{
			    	return '<span class="rePwd" id="'+rowObjec.id+'" data-blocId="' + rowObjec.id + '" data-id="' + options.rowId + '" style="color:#00CCFF;cursor:pointer">重置密码</span>';
			    }
			}
			
			//格式禁用、启用
			function formatStatus(cellvalue, options, rowObjec){
				return cellvalue == 1?"√":"";
			}
	  
			//非集团信息查询按钮单击事件
			$(".row .btn-success").on('click',function(){
				var params={};
				params.code=$("#companyCode").val();
				params.name=$("#companyName").val();
				params.remark=$("#companyRemark").val();
				if($('#companyStatus').is(':checked')){
					params.status=1;
				}else{
					params.status=0;
				}
				$(options.TableName).jqGrid('setGridParam',{  
			        datatype:'json',  
			        postData:params, //发送数据  
			        page:1  
			    }).trigger("reloadGrid"); //重新载入
			});
			
}
		

