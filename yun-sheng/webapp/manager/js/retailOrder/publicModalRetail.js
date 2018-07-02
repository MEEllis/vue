/**
 * 销售模块公共接口
 */
$(document).on('click','#slideThree',function(){
	$(".slideThree").toggleClass("color7D5F50");
	//  1   正式单据
	//  0   草稿单据
	$('#slideThree').prop('checked') ? $('#slideThree').val('1') : $('#slideThree').val('0');
	if($('#slideThree').val() == 1){
		$('.deleteReceipts').attr('disabled','true');
		$('.transfer').attr('disabled','true');
		$('.redRush').removeAttr('disabled');
//		$('.audit').attr('disabled','true');
	}else{
		$('.deleteReceipts').removeAttr('disabled');
		$('.transfer').removeAttr('disabled');
		$('.redRush').attr('disabled','true');
	}
})

//判断
var checkT = {
	//判断过滤条件中的日期
	checkTime : function(){
		var startTime = new Date($('#datetimepickerStart1').val().replace(/\-/g,'/'));
		var endTime = new Date($('#datetimepickerEnd1').val().replace(/\-/g,'/'));
		var flag = (endTime < startTime) ? false : true;
		return flag;
	},
	//检查数字
	checkNum : function(claStr){
		var rex=/^[0-9]*\.{0,1}[0-9]{0,2}$/;
		var num = $(claStr).val();
		if(!rex.test(num)){
			$.zxsaas_plus.showalert("提示","不合法的数字！");
			$(claStr).val('');
			return false;
		}else{
			return true;
		}
	},
	//判断一个对象是否为空
	isEmptyObject : function(e){
		var t;  
	    for (t in e)  
	        return !1;  
	    return !0
	}
}
/**
 * 填充数据
 * @param list  返回的数据
 * @param url   表格id
 * @return
 */
var fillData = function(list,url){
	$('.orderId').val(list.id);
	$('.orderSectionId').val(list.sectionId);
	$('#datetimepickerStart').val(list.createDateString);
	$('.depSearch').val(list.sectionId);
	$('.unitSearch').val(list.contactsunitId);
	$('.yuE').val(list.payreceiptMainId);
	$('.perSearch').val(list.managerUid);
	$('.remark').val(list.remark);
	console.log($('.depSearch').val());
	//加载表格 
	for(var i=0;i<list.data.orderDetails.length;i++){
	  $(url).jqGrid('addRowData', i + 1,data.data.orderDetails[i]);
  }
}




/**
 * 商品名称选择
 * @param  treeIdStr  树id
 * @param  tName      表格id
 * @param  pName      表脚id
 * @param  urlData    表格加载地址
 * @param  flag   
 * @param  str        点击的行id
 * @param  treeUrl    树加载地址
 */
var treeGoodsModal = function(treeIdStr,tName,pName,urlData,flag,str,treeUrl,mainName){
	//ztree
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
			onCheck:zTreeOnCheck
		},
		view: {
			showIcon: false
		}
    }; 
    
    var ids = [];//选中节点id的集合
    var names = [];//选中节点名字的集合
	function zTreeOnCheck(event, treeId, treeNode) {
		var id = treeNode.id;//获取数据的Id
		var tName = treeNode.name;
		if(treeNode.checked){
			ids.push(id);
			names.push(tName);
		}else{
			for(var i = 0;i<ids.length;i++){
				(ids[i] == id) && (ids.splice(i,1));
			}
			for(var i = 0;i<names.length;i++){
				(names[i] == tName) && (names.splice(i,1));
			}
		}
	}; 
	
	 $.ajax({
            type: 'Get',
            url: treeUrl,
            dataType: "json", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
            success: function (data) {
                $.fn.zTree.init($('#' + treeIdStr), setting, data);
                var zTree = $.fn.zTree.getZTreeObj(treeIdStr);
                zTree.expandAll(true);//展开全部节点
            },
            error: function (msg) {
                alert(" 数据加载失败！" + msg);
            }
        });
	
	 //加载表格

		var options = {
			LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
			LoadTableUrl: urlData,
			TableName: "#" + tName, //显示表格名称。遵照css选择器书写
			pager:"#" + pName
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
									{name:'id',index:'id', width:55,align:'center', sorttype:'string',hidden:true},
									{name:'code',index:'code', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'name',index:'name', width:100,align:'center', sorttype:'string',formatter: goodsCheck,sortable:false},
									{name:'goodsCategoryId',index:'goodsCategoryId', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'goodsBrandId',index:'goodsBrandId', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'goodsModel',index:'goodsModel', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'goodsColorId',index:'goodsColorId', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'valuationMethods',index:'valuationMethods', width:100,align:'center', sorttype:'string',sortable:false},
									{name:'ifManageImei',index:'ifManageImei', width:100,align:'center', sorttype:'string',formatter:'select', editoptions:{value:"1:√;0:",sortable:false}}
				                ];
				
				loadtable();
				
				function loadtable(){
						$(options.TableName).jqGrid({
							url:options.LoadTableUrl,
							mtype:"GET",
							datatype: "json",
							jsonReader  : {	
									root: "rows",
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
//							multiselect:flag,
							rownumWidth: 35, // the width of the row numbers columns
							shrinkToFit:false,  //此选项用于根据width计算每列宽度的算法。默认值为true。如果shrinkToFit为true且设置了width值，则每列宽度会根据width成比例缩放；如果shrinkToFit为false且设置了width值，则每列的宽度不会成比例缩放，而是保持原有设置，而Grid将会有水平滚动条。
							ondblClickRow:function(id){
							//双击进入编辑
				   				var delid = id;
				   				
							},
						})
			
				}
				
		//商品名称新增
		function goodsCheck(cellvalue, options, rowObject){
//			var str = '';
//			if(!flag){
			var	str = '<span class="goCheck" data-dismiss="modal" data-iMe="'+rowObject.ifManageImei+'">' + cellvalue + '</span>';
//			}else{
//				str = cellvalue;
//			}
			return str;
		};
		var str123 = str;
		var a = 1;
		$(document).on('click','.goCheck',function(e){
			if(a == 1){
				$(mainName).jqGrid('setCell', str123, 'goodsName', $(this).html());
				$(mainName).jqGrid('setCell', str123, 'ifManageImei', $(this).data('ime'));
				if($(this).data('ime')){
					$(mainName).jqGrid('setCell',str123,'goodsNum',1);
				}else{
					$(mainName).jqGrid('setCell',str123,'goodsNum','');
				}
				var $this = this;
				var rows = $(mainName).jqGrid("getRowData", str123);
     			$(mainName).jqGrid('setCell', str123, 'goodsId', $($this).parent().prev().prev().html());
     			flag ? totalAll.totalOut() : totalAll.totalCalc();//计算页脚总计
     			a++;
			}
		});
		
		//保存
		$(document).on('click','.goodsSave',function(e){
			var ids = $(options.TableName).jqGrid('getGridParam','selarrrow');//选中的行id
			var len = ids.length;
			var sIds = [];//选中节点id的集合
			var names = [];//选中节点名字的集合
			for(var i = 0;i < len;i ++){
				var gridData = $(options.TableName).jqGrid("getRowData",ids[i]);//获取被选中的一行数据
				var goodsId = gridData.id;//数据的id    blocId为此行数据的id
				var goodsName = gridData.name;//仓库名称
				sIds.push(goodsId);
				names.push(goodsName);
			}
			$('.goId').val(sIds);//ids存放于此 可以通过此隐藏域获取选中项id   $('.add_tree_ids').val();
			$('.goName').val(names);
			
		});
};














