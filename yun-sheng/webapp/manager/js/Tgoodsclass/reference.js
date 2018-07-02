
//初始化
$(function(){
	initTree();//初始化树
	initEvents();//初始化事件
})

//初始化事件
function initEvents(){
	
	//注册窗口改变事件
	$(window).resize(wResize);
	wResize();

}

//窗口大小改变
function wResize(){
	//$("#dataTree").height($(window).height()-350);
	$("#dataTree").width(300); 
}

//初始化树
var curr_tree_selectId = "";
function initTree(){
	//树设置参数
	var setting = {
		data: {//数据属性设置
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
		},
        async: {//从后台获取数据
            enable: true,
            url: basePath+'/Tgoodsclass/findTree2?status=0&companyId='+gl_companyId,
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
        	onDblClick: function(event, treeId, treeNode){
	        	 try {
	        	 	if(treeNode.objType == "Tgoodsclass"){  			
	        			parent.callBack([treeNode.obj]);
	        		}else{
	        			parent.callBack([]);
	        		}
	 			 } catch (e) {
					console.log("缺少父页面：parent.callBack([subject]);");
				 }
        	}
		},
		view: {//样式设置
			showIcon: true,
			dblClickExpand: false
		}
	};
	$.fn.zTree.init($("#dataTree"), setting);
	var zTree = $.fn.zTree.getZTreeObj("dataTree");
    zTree.expandAll(true);  
}

//重新加载刷新数据
function reLoad(){
	var objTree = $.fn.zTree.getZTreeObj("dataTree");
    objTree.reAsyncChildNodes(null, "refresh"); 
}

//取消引用
function cancleSelect(){
	parent.callBack([]);
}