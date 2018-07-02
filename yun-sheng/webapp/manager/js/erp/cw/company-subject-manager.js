/**
 * 公司科目管理 js
 */

$(function(){
	
	//初始化公司科目树
	initCompanySubjectTree();
	
});

//初始化公司科目树
function initCompanySubjectTree(){
	//树设置参数
	var setting = {
        async: {//从后台获取数据
            enable: true,
            url: basePath+"/cw/company/findView",
            autoParam:[],
            dataFilter: null
        },
		callback: {//回调事件设置
			onClick: function(event, treeId, treeNode){
	        	 try {
	     		 	//判断点击的是类型还是科目
	     		 	if(treeNode.id < 0){
	     		 		model.subjectClssify = treeNode.id;
	     		 	}else{
	     		 		model.id = treeNode.id;
	     		 	}
	 			 } catch (e) {
					console.log("缺少父页面：parent.callBack([subject]);");
				 }
        	}
		},
		view: {//样式设置
			showIcon: true,
			dblClickExpand: true
		}
	};
	$.fn.zTree.init($("#dataTree"), setting);
	var zTree = $.fn.zTree.getZTreeObj("dataTree");
    zTree.expandAll(true);  
   
}