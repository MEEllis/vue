
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
        async: {//从后台获取数据
            enable: true,
            url: basePath+'/Istorage/findTree?status=0&companyId='+gl_companyId,
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
        	onDblClick: function(event, treeId, treeNode){
	        	 try {
	        	 	if(treeNode.objType == "Istorage"){  
	        	 		treeNode.obj.name = treeNode.name;
	        			parent.callBack([treeNode.obj]);
	        		}else{
	        			
	        		}
	 			 } catch (e) {
					console.log(e);
				 }
        	},
			onAsyncSuccess: function(event, treeId, treeNode, msg){
				removeList = [];
			    var treeObj = $.fn.zTree.getZTreeObj("dataTree");
			    var nodes = treeObj.getNodes();
			    for(var i=0;i<nodes.length;i++){
			    	eachTree(nodes[i]);
			    }
			    
			    for (var int = 0; int < removeList.length; int++) {
			    	treeObj.removeNode(removeList[int]);
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

//递归遍历树节点
var removeList = [];
function eachTree(node){
	for(var i=0;i<node.children.length;i++){
		eachTree(node.children[i]);
	}
	if(node.objType=="Tsection" && node.children.length == 0){
		removeList.push(node);
	}
}

//重新加载刷新数据
function reLoadGrid(){
	var objTree = $.fn.zTree.getZTreeObj("dataTree");
    objTree.reAsyncChildNodes(null, "refresh"); 
}


//取消引用
function cancleSelect(){
	parent.callBack([]);
}

//根据查询的树筛选出可食用仓库
function findKsyckIDS(){
	var ckIdList = [];
	
    var nodes = $.fn.zTree.getZTreeObj("dataTree").getNodes();
    for(var i=0;i<nodes.length;i++){
    	eachTree(nodes[i]);
    }
	function eachTree(node){
    	if(node.objType=="Istorage"){
    		ckIdList.push(node.obj.id);
    	}	
    	for(var i=0;i<node.children.length;i++){
    		eachTree(node.children[i]);
    	}
	}
	return ckIdList;
}

