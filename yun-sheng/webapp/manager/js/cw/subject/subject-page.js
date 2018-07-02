/************************************** ztree开始 **********************************/
var setting = {
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		onClick: zTreeOnClick
	}
};

var zNodes =[
	{ id:1, pId:0, name:"父节点1 - 展开"},
	{ id:11, pId:1, name:"父节点11 - 折叠"},
	{ id:111, pId:11, name:"叶子节点111"},
	{ id:112, pId:11, name:"叶子节点112"},
	{ id:113, pId:11, name:"叶子节点113"},
	{ id:114, pId:11, name:"叶子节点114"},
	{ id:12, pId:1, name:"父节点12 - 折叠"},
	{ id:121, pId:12, name:"叶子节点121"},
	{ id:122, pId:12, name:"叶子节点122"},
	{ id:123, pId:12, name:"叶子节点123"},
	{ id:124, pId:12, name:"叶子节点124"},
	{ id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
	{ id:2, pId:0, name:"父节点2 - 折叠"},
	{ id:21, pId:2, name:"父节点21 - 展开"},
	{ id:211, pId:21, name:"叶子节点211"},
	{ id:212, pId:21, name:"叶子节点212"},
	{ id:213, pId:21, name:"叶子节点213"},
	{ id:214, pId:21, name:"叶子节点214"},
	{ id:22, pId:2, name:"父节点22 - 折叠"},
	{ id:221, pId:22, name:"叶子节点221"},
	{ id:222, pId:22, name:"叶子节点222"},
	{ id:223, pId:22, name:"叶子节点223"},
	{ id:224, pId:22, name:"叶子节点224"},
	{ id:23, pId:2, name:"父节点23 - 折叠"},
	{ id:231, pId:23, name:"叶子节点231"},
	{ id:232, pId:23, name:"叶子节点232"},
	{ id:233, pId:23, name:"叶子节点233"},
	{ id:234, pId:23, name:"叶子节点234"},
	{ id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
];
/*点击事件*/
function zTreeOnClick(event, treeId, treeNode) {
    //alert(treeNode.tId + ", " + treeNode.name);
    showRightPage(treeNode.id,treeNode.name);
};
/*
$(document).ready(function(){
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
});
*/
$(document).ready(function(){
	 $.ajax({
		 //url: 'http://localhost:8080/manager/cw/company/findView/12/2016',//公司
		  url: '/manager/cw/fsubject/tree/1/2016',//集团
		type : "get",
		dataType : 'json',
		success:function(data){
			//初始化节点json zNodes
			zNodes = data.data.list;
			//初始化树
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			//$("#selectAll").bind("click", selectAll);
			
			//保存初始树，点击保存树时做对比
			//var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
			//treeConstrctionOrg = treeObj.transformToArray(treeObj.getNodes());
			//treeConstrctionOrg=zNodes;
		}
	}); 
});
/*************************************** ztree结束 ********************************************/

/*** 右侧列表显示 *****************************/
function showRightPage(id,name){
	$("tbody").html("");
	$.ajax({
		url:  '/manager/cw/fsubject/listChildrens/' + id,
		type : "get",
		dataType : 'json',
		success:function(data){
			var dataList = data.data.list;
			for(var i = 0;i < dataList.length;i++){
				$("tbody").append("<tr><th>"+dataList[i].subjectCode+"</th><td>"+dataList[i].subjectName+"</td><td>"+dataList[i].subjectLevel+"</td><td>"+dataList[i].subjectClssifyName+"</td><td>"+dataList[i].creditDirection+"</td><td>NoN</td><td>"+dataList[i].useStatus+"</td><td>NoN</td></tr>");
			}
		}
	}); 
}