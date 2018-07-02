//初始化
$(function(){
	initTree();//初始化树
})
//初始化树
var curr_tree_selectId = "";
function initTree(){
	//树设置参数
	var setting = {
		data: {//数据属性设置
			simpleData: {enable: true,idKey: "id",pIdKey: "pid",rootPId: null}
		},
		check: {
	        enable: true,
            chkboxType : { "Y" : "", "N" : "" }
	    },
        async: {//从后台获取数据
            enable: true,
            url: basePath+'/section/findTreeForMulCompany?status=0',
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
        	onDblClick: function(event, treeId, treeNode){
	        	 try {
	        	 	if(treeNode.objType == "Tsection" && treeNode.obj.childrenNum == 1){  			
	        			parent.callBack([treeNode.obj]);
	        		}else{
	        			//parent.callBack([]);
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
//多选设置
function mulSelect(tag, haveSelected){
	//更新此员工的公司数据权限
    var treeObj = $.fn.zTree.getZTreeObj("dataTree");
    var nodes = treeObj.getNodes();
    for(var i=0;i<nodes.length;i++){
    	eachTree(nodes[i]);
    }
    //显示隐藏按钮
    if(tag){
    	$("#saveBt").show();
    }else{
    	$("#saveBt").hide();
    }
    //递归遍历树节点
    function eachTree(node){
    	if(node.objType == "Tsection" && node.children.length == 0){
    		node.nocheck = tag?false:true;
    	}else{
    		node.nocheck = true;
    	}
		$.fn.zTree.getZTreeObj("dataTree").updateNode(node);
    	for(var i=0;i<node.children.length;i++){
    		eachTree(node.children[i]);
    	}
    }
}
//保存
function saveBtClick(){
	var tree = $.fn.zTree.getZTreeObj("dataTree");
	var nodes = tree.getCheckedNodes(); 
	var list = [];
	for (var i = 0; i < nodes.length; i++) {
		list.push(nodes[i].obj);
	}
	console.log(list);
	parent.callBack(list);
}
//取消引用
function cancleSelect(){
	mulSelect(true);
	parent.callBack([]);
}