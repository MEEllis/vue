//初始化
$(function(){
	//initTree();//初始化树
})
//初始化树
var curr_tree_selectId = "";
var haveInit = false;
function initTree(){
	haveInit = true;
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
            url: basePath+'/section/findTree?status=0&companyId='+gl_companyId+"&opEmpId="+opEmpId,
            autoParam:[],
            dataFilter: ajaxDataFilter
        },
		callback: {//回调事件设置
        	onDblClick: function(event, treeId, treeNode){
	        	 try {
	        	 	if(treeNode.objType == "Tsection" && treeNode.obj.childrenNum == 1){  			
	        			parent.callBack([treeNode.obj]);
	        		}else{
	        		}
	 			 } catch (e) {
					//console.log("缺少父页面：parent.callBack([subject]);");
				 }
        	},
        	onAsyncSuccess: function(){
        		//更新此员工的公司数据权限
        	    var treeObj = $.fn.zTree.getZTreeObj("dataTree");
        	    var nodes = treeObj.getNodes();
        	    for(var i=0;i<nodes.length;i++){
        	    	eachTree(nodes[i]);
        	    }
        	    //显示隐藏按钮
        	    if(mulTag){
        	    	$("#saveBt").show();
        	    }else{
        	    	$("#saveBt").hide();
        	    }
        	    //递归遍历树节点
        	    function eachTree(node){
        	    	if(node.objType == "Tsection" && node.children.length == 0){
        	    		node.nocheck = mulTag?false:true;
        	    		
        	    		//判断之前是否已经选中过
        	    		if(("," + selectIds + ",").indexOf("," + node.obj.id + ",") >= 0){
        	    			node.checked = true;
        	    		}
        	    	}else{
        	    		node.nocheck = true;
        	    	}
        			$.fn.zTree.getZTreeObj("dataTree").updateNode(node);
        	    	for(var i=0;i<node.children.length;i++){
        	    		eachTree(node.children[i]);
        	    	}
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
    function ajaxDataFilter(treeId, parentNode, responseData) {
        if (responseData) {
          for(var i =0; i < responseData.length; i++) {
        	  if(responseData[i].children){
	               if(responseData[i].children.length>0){
	            	   for(var j=0;j<responseData[i].children.length;j++){
	            	      responseData[i].children[j].open=false;
	            	   }
	               }
        	  }
          }
        }
        return responseData;
    };
}
//多选设置
var mulTag = false;
var selectIds = null;
function mulSelect(tag, haveSelected){
	mulTag = tag;
	selectIds = haveSelected;//已选中的ID列表
	
	if(!haveInit){
		initTree();
	}else{
		//重新加载刷新数据
		var objTree = $.fn.zTree.getZTreeObj("dataTree");
	    objTree.reAsyncChildNodes(null, "refresh"); 
	}
}
//保存
function saveBtClick(){
	var tree = $.fn.zTree.getZTreeObj("dataTree");
	var nodes = tree.getCheckedNodes(); 
	var list = [];
	for (var i = 0; i < nodes.length; i++) {
		list.push(nodes[i].obj);
		//list.addClass("checkbox_true_full");
	}
	parent.callBack(list);
	
}
//取消引用
function cancleSelect(){
	//mulSelect(true);
	parent.callBack([]);
}