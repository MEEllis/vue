var xjzfunction = {
		
	systemSet_GRP_Frame_load:function()
	{
		$("#systemSet_GRP_Frame .btnbox button").hide();
				$("#systemSet_GRP_Frame .btnbox .searchbtn").show();
			$.getJSON("../../TreeMenu/treeGrouptMenu",function(r){
				var li="";
				$.each(r.grouplist, function(i,item) {
					li='<li class="hidechild " data-unitid="0"><a class="xjzbutton showul" data-eventname="loadingunit"><i class="iconfont">&#xe62c </i></a><a class="xjzbutton hideul" data-eventname="hideul"><i class="iconfont">&#xe62d </i></a><i class="iconfont">&#xe601 </i>'+item.name+'<span class="pull-right eventbox"><a class="xjzbutton" data-eventname="addnewUnit">新增公司</a><a class="xjzbutton"  data-eventname="changeGroup">修改集团</a><a class="xjzbutton" data-eventname="deleteGroup">删除集团</a></span></li>\n';	
					$("#systemSet_GRP_Frame .grp_tree ul").append(li);
				});
				
			});
				$(document).off("mouseout","#systemSet_GRP_Frame  .grp_tree");
			$(document).on("mouseout","#systemSet_GRP_Frame  .grp_tree",function(){
				$(this).find("li").removeClass("hover");
			});
				$(document).off("mouseover","#systemSet_GRP_Frame  .grp_tree ul li");
			$(document).on("mouseover"," #systemSet_GRP_Frame  .grp_tree ul li",function(event){
				$("#systemSet_GRP_Frame  .grp_tree").find("li").removeClass("hover");
			
				
					$(this).addClass("hover");
				event.stopPropagation();
			});
			$(document).off("click","#systemSet_GRP_Frame .grp_tree ul li");
				$(document).on("click"," #systemSet_GRP_Frame .grp_tree ul li",function(event){
				$("#systemSet_GRP_Frame .grp_tree").find("li").removeClass("hover");
					$("#systemSet_GRP_Frame .grp_tree").find("li").removeClass("select");
					$(this).addClass("select");
					//$("#systemSet_GRP_Frame .grp_info").html($(this).text());
				
					$("#systemSet_GRP_Frame .searchbox ").removeAttr("data-unitid");
				$(" #systemSet_GRP_Frame .searchbox ").removeAttr("data-deptid");
				$("#systemSet_GRP_Frame .searchbox ").removeAttr("data-storkid");
		$("#systemSet_GRP_Frame .btnbox button").hide();
				$("#systemSet_GRP_Frame .btnbox .searchbtn").show();
		if(typeof($(this).attr("data-unitid"))!="undefined"){
			
			if($(this).attr("data-unitid")=="0")
			{
				
		
				$("#systemSet_GRP_Frame .btnbox .addnewunit").show();
				$("#systemSet_GRP_Frame .btnbox .changeGroup").show();
				$("#systemSet_GRP_Frame .btnbox .deleteGroup").show();
				xjzfunction.showGroupinfo();
				
			}else
			{
				$("#systemSet_GRP_Frame .btnbox .addnewChildUint").show();
				$("#systemSet_GRP_Frame .btnbox .addnewDept").show();
				$("#systemSet_GRP_Frame .btnbox .changeunit").show();
					$("#systemSet_GRP_Frame .btnbox .deleteUnit").show();
					xjzfunction.showCompanyinfo($(this).attr("data-unitid"));
			}
			$("#systemSet_GRP_Frame .searchbox ").attr("data-unitid",$(this).data("unitid"));
		
		}else if(typeof($(this).attr("data-deptid"))!="undefined")
		{
			$("#systemSet_GRP_Frame .searchbox ").attr("data-deptid",$(this).data("deptid"));
				$("#systemSet_GRP_Frame .btnbox .addnewChildDept").show();
				$("#systemSet_GRP_Frame .btnbox .addnewStork").show();
				$("#systemSet_GRP_Frame .btnbox .changeDept").show();
					$("#systemSet_GRP_Frame .btnbox .deleteDept").show();
					xjzfunction.showDeptinfo($(this).attr("data-deptid"));
		}else if(typeof($(this).attr("data-storkid"))!="undefined")
		{
			$("#systemSet_GRP_Frame .searchbox ").attr("data-storkid",$(this).data("storkid"));
				$("#systemSet_GRP_Frame .btnbox .changeStork").show();
				$("#systemSet_GRP_Frame .btnbox .deleteStork").show();
				xjzfunction.showStorkinfo($(this).attr("data-storkid"));

		}else
		{
			    $("#systemSet_GRP_Frame .searchbox ").attr("data-unitid","0");
				$("#systemSet_GRP_Frame .btnbox .addnewunit").show();
				$("#systemSet_GRP_Frame .btnbox .changeGroup").show();
				$("#systemSet_GRP_Frame .btnbox .deleteGroup").show();
				xjzfunction.showGroupinfo();
		}
		
					//$("#systemSet_GRP_Frame .btnbox").
				event.stopPropagation();
			});
			
			
	xjzfunction.addEvent();			
			//$.zxsaas_plus.treeload("../json/tree.json",$(".grp_tree"));//树形结构
	},

	systemSet_modalFunction_load:function(){
	
	$.getScript("contentpage/systemSet/modalFunction.js",function(){
		$("#systemSet_modalFunction").modalFunction();
	
			
	});
},
systemSet_staffRecord_load:function(){
	//console.log("ddd");
	$.getScript("contentpage/systemSet/staffRecord.js",function(){
		$("#systemSet_staffRecord").systemSet_staffRecord();
			
	});
},
showGroupinfo:function(){//显示集团详细信息
		$.getJSON("../../group/getGroupJson",function(r){
			
						if(r.result==1)
						{
							var Gdata=r.data.groupList[0];
							var ullist='<div id="groupInfo">'+
				'<ul class="list-group">'+
				'	<li class="list-group-item" ><span class="txt">集团编码：</span>'+Gdata.code+'</li>'+
				'	<li class="list-group-item" ><span class="txt">集团名称：</span>'+Gdata.name+'</li>'+
				'	<li class="list-group-item" ><span class="txt">新增人：</span>'+Gdata.empCreateName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">新增时间：</span>'+Gdata.createTimeString+'</li>'+
				'	<li class="list-group-item" ><span class="txt">修改时间：</span>'+Gdata.updateTimeString+'</li>'+
				'	<li class="list-group-item" ><span class="txt">修改人：</span>'+Gdata.empUpdateName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">使用期限：</span>'+Gdata.expireDay+'</li>'+
				'	<li class="list-group-item" ><span class="txt">系统版本：</span>'+Gdata.systemVersion+'</li>'+
				'	<li class="list-group-item" ><span class="txt">平台标识：</span>'+Gdata.platform+'</li> '+
				'	<li class="list-group-item" ><span class="txt">备注：</span>'+Gdata.remark+'</li> '+
				'					</ul>'+
			'</div>';
							$("#systemSet_GRP_Frame .grp_info").html(ullist);
						
							
						}else
						{
						$.zxsaas_plus.showalert("获取数据错误");	
						}
					});
},
showCompanyinfo:function(id){//显示公司详细信息
		$.getJSON("../../company/getCompanyJson?id="+id,function(r){
			
						if(r.result==1)
						{
							var Gdata=r.data.companyList[0];
							var ullist='<div id="groupInfo">'+
				'<ul class="list-group">'+
				'	<li class="list-group-item" ><span class="txt">公司编码：</span>'+Gdata.code+'</li>'+
				'	<li class="list-group-item" ><span class="txt">公司名称：</span>'+Gdata.name+'</li>'+
				'	<li class="list-group-item" ><span class="txt">所属集团：</span>'+Gdata.groupName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">上级公司：</span>'+Gdata.parentCompanyName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">新增人：</span>'+Gdata.empCreateName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">新增时间：</span>'+Gdata.createTimeString+'</li>'+
				'	<li class="list-group-item" ><span class="txt">修改时间：</span>'+Gdata.updateTimeString+'</li>'+
				'	<li class="list-group-item" ><span class="txt">修改人：</span>'+Gdata.empUpdateName+'</li>'+
				
				'	<li class="list-group-item" ><span class="txt">所在地区：</span>'+Gdata.areasName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">分期商：</span>'+Gdata.tallymanIds+'</li>'+
				'	<li class="list-group-item" ><span class="txt">是否启用：</span>'+Gdata.status+'</li> '+
				'	<li class="list-group-item" ><span class="txt">备注：</span>'+Gdata.remark+'</li> '+
				'					</ul>'+
			'</div>';
							$("#systemSet_GRP_Frame .grp_info").html(ullist);
						
							
						}else
						{
						$.zxsaas_plus.showalert("获取数据错误");	
						}
					});
},
showDeptinfo:function(id){//显示部门详细信息
		$.getJSON("../../section/getSectionJson?id="+id,function(r){
			
						if(r.result==1)
						{
							var Gdata=r.data.sectionList[0];
							var ullist='<div id="groupInfo">'+
				'<ul class="list-group">'+
				'	<li class="list-group-item" ><span class="txt">部门编码：</span>'+Gdata.code+'</li>'+
				'	<li class="list-group-item" ><span class="txt">部门名称：</span>'+Gdata.name+'</li>'+
				'	<li class="list-group-item" ><span class="txt">所属集团：</span>'+Gdata.groupName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">所属公司：</span>'+Gdata.companyName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">新增人：</span>'+Gdata.empCreateName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">新增时间：</span>'+Gdata.createTimeString+'</li>'+
				'	<li class="list-group-item" ><span class="txt">修改时间：</span>'+Gdata.updateTimeString+'</li>'+
				'	<li class="list-group-item" ><span class="txt">修改人：</span>'+Gdata.empUpdateName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">所在地区：</span>'+Gdata.areasName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">部门属性：</span>'+Gdata.sectionAttributeName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">可使用资金账户：</span>'+Gdata.workableAccountName+'</li> '+
				'	<li class="list-group-item" ><span class="txt">可转入资金账户：</span>'+Gdata.transferAccountName+'</li> '+
				'	<li class="list-group-item" ><span class="txt">分期商：</span>'+Gdata.tallymanName+'</li> '+
				'	<li class="list-group-item" ><span class="txt">是否为门店：</span>'+Gdata.ifStore+'</li> '+
				'	<li class="list-group-item" ><span class="txt">是否启用：</span>'+Gdata.status+'</li> '+
				'	<li class="list-group-item" ><span class="txt">备注：</span>'+Gdata.remark+'</li> '+
				'					</ul>'+
			'</div>';
							$("#systemSet_GRP_Frame .grp_info").html(ullist);
						
							
						}else
						{
						$.zxsaas_plus.showalert("获取数据错误");	
						}
					});
},
showStorkinfo:function(id){//显示仓库详细信息 
		$.getJSON("../../storage/getStorageJson?id="+id,function(r){
			
						if(r.result==1)
						{
							var Gdata=r.data.storageList[0];
							var ullist='<div id="groupInfo">'+
				'<ul class="list-group">'+
				'	<li class="list-group-item" ><span class="txt">仓库名称：</span>'+Gdata.name+'</li>'+
				'	<li class="list-group-item" ><span class="txt">所属集团：</span>'+Gdata.groupName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">所属公司：</span>'+Gdata.companyName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">所属部门：</span>'+Gdata.sectionName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">新增人：</span>'+Gdata.empCreateName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">新增时间：</span>'+Gdata.createTimeString+'</li>'+
				'	<li class="list-group-item" ><span class="txt">修改时间：</span>'+Gdata.updateTimeString+'</li>'+
				'	<li class="list-group-item" ><span class="txt">修改人：</span>'+Gdata.empUpdateName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">仓库属性：</span>'+Gdata.storageAttributeName+'</li>'+
				'	<li class="list-group-item" ><span class="txt">是否启用：</span>'+Gdata.status+'</li>'+
				'	<li class="list-group-item" ><span class="txt">备注：</span>'+Gdata.remark+'</li> '+
				'					</ul>'+
			'</div>';
							$("#systemSet_GRP_Frame .grp_info").html(ullist);
						
							
						}else
						{
						$.zxsaas_plus.showalert("获取数据错误");	
						}
					});
},
addEvent: function() {
		$(document).off("click",".xjzbutton[data-eventname]");
		$(document).on("click",".xjzbutton[data-eventname]",function(e){
			var btnEventNmae = $(this).data("eventname");
			switch (btnEventNmae) {
				case "hideInputBox":
					xjzfunction.hideInputBox($(this));
					break;
				case "loadingunit":
					    xjzfunction.loadingunit($(this).parent());
						xjzfunction.loadingdept($(this).parent());
					break;
				case "loadingdept":
				    xjzfunction.loadingunit($(this).parent());
					xjzfunction.loadingdept($(this).parent());
					
				    break;
				    case "loadingstork":
				    xjzfunction.loadingdept($(this).parent());
					xjzfunction.loadingstork($(this).parent());
				    break;
				    case "hideul":
					xjzfunction.hideul($(this).parent());
				    break;
				  case "addnewUnit":
					xjzfunction.addnewUnit($(this).parent().parent());
				    break;
				      case "changeGroup":
					xjzfunction.changeGroup($(this).parent().parent());
				    break;
				      case "deleteGroup":
					xjzfunction.deleteGroup($(this).parent().parent());
				    break;
				         case "addnewDept":
					xjzfunction.addnewDept($(this).parent().parent());
				    break;
				      case "changeUnit":
					xjzfunction.changeUnit($(this).parent().parent());
				    break;
				      case "deleteUnit":
					xjzfunction.deleteUnit($(this).parent().parent(),e);
				    break;
				  
				      case "addnewStork":
					xjzfunction.addnewStrork($(this).parent().parent());
				    break;
				      case "changeDept":
					xjzfunction.changeDept($(this).parent().parent());
				    break;
				      case "deleteDept":
					xjzfunction.deleteDept($(this).parent().parent(),e);
				    break;
				      case "changeStork":
					xjzfunction.changeStork($(this).parent().parent());
				    break;
				      case "deleteStork":
					xjzfunction.deleteStork($(this).parent().parent(),e);
				    break;
				       case "saveGroupModalForm":
				    xjzfunction.saveGroupModalForm();
				    break;
				       case "saveUnitModalForm":
				    xjzfunction.saveUnitModalForm();
				    break;
				       case "saveDeptModalForm":
				    xjzfunction.saveDeptModalForm();
				    break;
				       case "saveStorkModalForm":
				    xjzfunction.saveStorkModalForm();
				    break;
					default:
					break;
			}
		});
	},
loadingunit:function(obj){
	var unitid=obj.data("unitid");

	obj.removeClass("hidechild");
	obj.addClass("showchild");
obj.find("ul").remove();
$(obj).append("<ul></ul>");
	$.getJSON("../../TreeMenu/treeCompanyMenu?parent_id="+unitid,function(r){
				var li="";
				$.each(r.companylist, function(i,item) {
					li='<li class="hidechild" data-unitid="'+item.id+'"><a class="xjzbutton showul" data-eventname="loadingdept"><i class="iconfont">&#xe62c </i></a><a class="xjzbutton hideul" data-eventname="hideul"><i class="iconfont">&#xe62d </i></a><i class="iconfont">&#xe601 </i>'+item.name+'<span class="pull-right eventbox"><a class="xjzbutton" data-eventname="addnewUnit">新增子公司</a><a class="xjzbutton" data-eventname="addnewDept">新增部门</a><a class="xjzbutton"  data-eventname="changeUnit">修改公司</a><a class="xjzbutton" data-eventname="deleteUnit">删除公司</a></span></li>\n';	
					$(obj).find("ul").append(li);
				});
				
			});
					
},
loadingdept:function(obj){
	
	var unitid=obj.data("unitid");
	if(typeof(unitid)=='undefined')
	{
		unitid=0;
	}
	var deptid=obj.data("deptid");
	if(typeof(deptid)=='undefined')
	{
		deptid=0;
	}
	obj.removeClass("hidechild");
	obj.addClass("showchild");
	obj.find("ul").remove();
	$(obj).append("<ul></ul>");
	$.getJSON("../../TreeMenu/treeSectionMenu?company_id="+unitid+"&section_id="+deptid,function(r){
				var li="";
				$.each(r.sectionlist, function(i,item) {
					li='<li class="hidechild" data-deptid="'+item.id+'"><a class="xjzbutton showul" data-eventname="loadingstork"><i class="iconfont">&#xe62c </i></a><a class="xjzbutton hideul" data-eventname="hideul"><i class="iconfont">&#xe62d </i></a><i class="iconfont">&#xe601 </i>'+item.name+'<span class="pull-right eventbox"><a class="xjzbutton" data-eventname="addnewDept">新增子部门</a><a class="xjzbutton" data-eventname="addnewStork">新增仓库</a><a class="xjzbutton"  data-eventname="changeDept">修改部门</a><a class="xjzbutton" data-eventname="deleteDept">删除部门</a></span></li>\n';	
					$(obj).find("ul").append(li);
				});
				
			});
},
loadingstork:function(obj){
	
	var deptid=obj.data("deptid");
	obj.removeClass("hidechild");
	obj.addClass("showchild");
	obj.find("ul").remove();
	$(obj).append("<ul></ul>");
	$.getJSON("../../TreeMenu/treeStorageMenu?section_id="+deptid,function(r){
				var li="";
				$.each(r.storagelist, function(i,item) {
					li='<li class="hidechild" data-storkid="'+item.id+'"><a class="xjzbutton noshow"><i class="iconfont">&#xe62c </i></a><i class="iconfont">&#xe60b </i>'+item.name+'<span class="pull-right eventbox"><a class="xjzbutton"  data-eventname="changeStork">修改仓库</a><a class="xjzbutton" data-eventname="deleteStork">删除仓库</a></span></li>\n';	
					$(obj).find("ul").append(li);
				});
				
			});
},
hideul:function(obj){
		obj.removeClass("showchild");
	obj.addClass("hidechild");
	obj.find("ul").remove();
},
changeGroup:function(obj){	
	$.getJSON("../../group/getGroupJson",function(r){
			if(r.result==1)
						{
							var Gdata=r.data.groupList[0];
							for(var key in Gdata)
							{
							$("#GroupModal input[name='"+key+"']").val(Gdata[key]);
							}
						}else
						{
							$.zxsaas_plus.showalert("数据获取失败",r.desc);
						}
				
	});
	$("#GroupModal").modal("show");
},
deleteGroup:function(obj){	

	//$.post("",function(){});
},
addnewUnit:function(obj){	
	var id=$(obj).data("unitid");
	if(id!=0)
	{
			$("#UnitModal input[name='parentId']").val(id);
	}

	//$("#UnitModal input[name='id']").val();
	$("#UnitModal").modal("show");
	
},
changeUnit:function(obj){	
	var id=$(obj).data("unitid");
	$("#UnitModal input[name='id']").val(id);
	$.getJSON("../../company/getCompanyJson?id="+id,function(r){
			if(r.result==1)
						{
							var Gdata=r.data.companyList[0];
							for(var key in Gdata)
							{
							$("#UnitModal input[name='"+key+"']").val(Gdata[key]);
							}
						}
						else
						{
							$.zxsaas_plus.showalert("数据获取失败",r.desc);
						}
				
	});
	$("#UnitModal").modal("show");
},
deleteUnit:function(obj,e){	
var unitid=	$(obj).data("unitid");
	$.post("../../company/deleteCompanyJson",{id:unitid},function(r){
		if(r.result==1)
	{
		$.zxsaas_plus.showalert("数据操作成功！","数据操作成功")
	}else
	{
		$.zxsaas_plus.showalert("数据操作失败！","数据操作失败");
	}
	});
	
$("li[data-unitid='"+unitid+"']").remove();
	e.stopPropagation();
	return false;
},
addnewDept:function(obj){	
	var id=$(obj).data("deptid");
	var unitid=$(obj).data("unitid");
	if(typeof(id)!="undefined")
	{
			$("#DeptModal input[name='parentId']").val(id);
	}else
	{
		$("#DeptModal input[name='parentId']").val("");	
	}
	if(typeof(unitid)!="undefined")
	{
			$("#DeptModal input[name='companyId']").val(unitid);
	}else
	{
		$("#DeptModal input[name='companyId']").val("");	
	}
	$("#DeptModal").modal("show");
},
changeDept:function(obj){	
	var id=$(obj).data("deptid");
	$("#DeptModal input[name='id']").val(0);
$.getJSON("../../section/getSectionJson?id="+id,function(r){
			if(r.result==1)
						{
							var Gdata=r.data.sectionList[0];
							for(var key in Gdata)
							{
							$("#DeptModal input[name='"+key+"']").val(Gdata[key]);
							}
						}
						else
						{
							$.zxsaas_plus.showalert("数据获取失败",r.desc);
						}
				
	});
	$("#DeptModal").modal("show");
},
deleteDept:function(obj,e){
	var deptid=	$(obj).data("deptid");
		$.post("../../section/deleteSectionJson",{id:deptid},function(r){
		if(r.result==1)
	{
		$.zxsaas_plus.showalert("数据操作成功！","数据操作成功")
	}else
	{
		$.zxsaas_plus.showalert("数据操作失败！","数据操作失败");
	}
	});
$("li[data-deptid='"+deptid+"']").remove();
	e.stopPropagation();
	return false;
},
addnewStrork:function(obj)
{
	var deptid=	$(obj).data("deptid");
	$("#StorkModal input[name='SectionId']").val(deptid);
	$("#StorkModal input[name='id']").val("");
	$("#StorkModal").modal("show");	
},
changeStork:function(obj){
		var id=$(obj).data("storkid");
	$("#StorkModal input[name='id']").val(id);
	
$.getJSON("../../storage/getStorageJson?id="+id,function(r){
			if(r.result==1)
						{
							var Gdata=r.data.storageList[0];
							for(var key in Gdata)
							{
							$("#StorkModal input[name='"+key+"']").val(Gdata[key]);
							}
						}
						else
						{
							$.zxsaas_plus.showalert("数据获取失败",r.desc);
						}
				
	});
	$("#StorkModal").modal("show");
		
},
deleteStork:function(obj,e){
		var storkid=	$(obj).data("storkid");
	$.post("../../storage/deleteStorage",{id:storkid},function(r){
		if(r.result==1)
	{
		$.zxsaas_plus.showalert("数据操作成功！","数据操作成功")
	}else
	{
		$.zxsaas_plus.showalert("数据操作失败！","数据操作失败");
	}
	});
	$("li[data-storkid='"+storkid+"']").remove();
	e.stopPropagation();
	return false;
}
,
saveUnitModalForm:function(){//保存公司信息，新增是  id为0，修改时id为修改的值
var postdata=$("#UnitModalForm").serializeArray();

$.post("../../company/saveCompanys",postdata,function(r){
	if(r.result==1)
	{
		$.zxsaas_plus.showalert("数据操作成功！")
	}else
	{
		$.zxsaas_plus.showalert("数据操作失败！");
	}
});
	$("#UnitModalForm")[0].reset();
		$("#UnitModal").modal("hide");
},

saveGroupModalForm:function(){//保存集团信息
	var postdata=$("#GroupModalForm").serializeArray();
	$.post("../../group/updateGroupJson",postdata,function(r){
	if(r.result==1)
	{
		$.zxsaas_plus.showalert("数据操作成功！")
	}else
	{
		$.zxsaas_plus.showalert("数据操作失败！");
	}
});
	$("#GroupModalForm")[0].reset();
		$("#GroupModal").modal("hide");
},
saveDeptModalForm:function(){//保存部门信息
	var postdata=$("#DeptModalForm").serializeArray();

	
$.post("../../section/saveSection",postdata,function(r){
	if(r.result==1)
	{
		$.zxsaas_plus.showalert("数据操作成功！","数据操作成功")
	}else
	{
		$.zxsaas_plus.showalert("数据操作失败！","数据操作失败");
	}
});
	$("#DeptModalForm")[0].reset();
	$("#DeptModal").modal("hide");
},
saveStorkModalForm:function(){//保存仓库信息
	var postdata=$("#StorkModalForm").serializeArray();
	
$.post("../../storage/saveStorage",postdata,function(r){
	if(r.result==1)
	{
		$.zxsaas_plus.showalert("数据操作成功！","数据操作成功")
	}else
	{
		$.zxsaas_plus.showalert("数据操作失败！","数据操作失败");
	}
	
});
$("#StorkModalForm")[0].reset();
$("#StorkModal").modal("hide");

}



};


