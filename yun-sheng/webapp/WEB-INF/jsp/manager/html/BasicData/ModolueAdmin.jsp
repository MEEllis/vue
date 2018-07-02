<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../Include/Header.jsp"%>
<script type="text/javascript">$(function() {
	var pagemodolue = new curdmodal({
		GetRowInfoUrl: "../../resource/ajaxGetResource", //获取数据详细信息接口加载地址
		GetListUrl:"../../resource/ajaxGetResources",//获取列表数据接口
		SaveEditUrl: "../../resource/ajaxSave", //新增或修改后保存数据接口地址
	    DelRowUrl: "../../resource/deleteResource", // 删除信息接口地址
		SaveEditBtnName: ".savebutton", //保存按钮名称。遵照css选择器书写
		EditModalName: ".editbox" //新增 或者修改时弹窗名称。遵照css选择器书写
			});
	pagemodolue.modouleLoad();

//	$.getJSON("../../resource/ajaxGetResources",{parentId:0}, function(r) {
//		var li = "";
//		$.each(r, function(i, item) {
//			li = '<li class="hidechild " data-id="'+item.id+'"><a class="button showul" data-eventname="loadingModolue"><i class="iconfont">&#xe62c </i></a><a class="button hideul" data-eventname="hideul"><i class="iconfont">&#xe62d </i></a><i class="iconfont">'+item.iconCode+'  </i>' + item.name + '<span class="pull-right eventbox"><a class="button" data-eventname="showAddModal">新增子模块</a><a class="button"  data-eventname="showEditModal">修改模块</a><a class="button" data-eventname="delRow">删除模块</a></span></li>\n';
//			$(".grp_tree ul").append(li);
//			
//		});
//		});

buttonevent.loadingModolue($(".grp_tree"));
	$(document).off("mouseout", ".grp_tree");
	$(document).on("mouseout", ".grp_tree", function() {
		$(this).find("li").removeClass("hover");
	});
	$(document).off("mouseover", ".grp_tree ul li");
	$(document).on("mouseover", " .grp_tree ul li", function(event) {
		$(".grp_tree").find("li").removeClass("hover");

		$(this).addClass("hover");
		event.stopPropagation();
	});		
		$(document).off("click", ".grp_tree ul li");
	$(document).on("click", " .grp_tree ul li", function(event) {
		$(".grp_tree").find("li").removeClass("hover");
		$(".grp_tree").find("li").removeClass("select");
		$(this).addClass("select");	
		buttonevent.showModlueinfo($(this));
				event.stopPropagation();
	});

		$.getJSON("../../icon/listAllIcon", function(r) {
			$.each(r, function(i, item) {
				//console.log(item);
				var span = '	<span class="iconbox" data-index="'+item.id+'">' +
					'<i class="iconfont" >' + item.iconCode + '</i></span>';
				$("#iconbox").append(span);
			});		
		});
	$(document).on("click", "#iconbox span", function() {
			$("#iconbox span").removeClass("select");
			$(this).addClass("select");
			$("#iconcode").val($(this).data("index").toString());
			console.log($(this).text().toString());
		});		
		
$("#ModolueEdit").on("show.bs.modal",function(e){
	$("#iconbox span").each(function(i,item){
		if($(item).find("i").text()==$("input[name='iconcode'").val())
		{
			$(item).addClass("select");
		}
	});
});
});</script>
	</head>
	<body>
		

	<div class="searchbox">
		<div class="btnbox clearfix ">
				</div>
	</div>	
		
		<div class="grp_tree">
		<ul>
			<!--<li><a class="button" data-eventname="loadchildnode"><i class="iconfont">&#xe61f </i></a>测试集团<span class="pull-right eventbox"><a class="button" data-eventname="addnewunit">新增公司</a><a class="button"  data-eventname="addnewdept">新增部门</a><a class="button"  data-eventname="editgroup">编辑</a><a class="button" data-eventname="delgroup">删除</a></span>
				<ul>
			<li><a class="button" data-eventname="loadchildnode"><i class="iconfont">&#xe61f </i></a>测试集团<span class="pull-right eventbox"><a class="button" data-eventname="addnewunit">新增公司</a><a class="button"  data-eventname="addnewdept">新增部门</a><a class="button"  data-eventname="editgroup">编辑</a><a class="button" data-eventname="delgroup">删除</a></span></li>-->
		</ul>
				
			</li>
		</ul></div>
		<div class="grp_info">
			<div id="groupInfo">
				<ul class="list-group">
					
					
					
				</ul>
			</div>
<div id="companyInfo">
				
			</div>
			<div id="deptInfo">
				
			</div>
			<div id="StorkInfo">
				
			</div>
		</div>

	

<div class="modal fade editbox" id="ModolueEdit">
  <div class="modal-dialog" style="width: 80%;">
    <div class="modal-content">
       	<form id="menuAdminForm" class="form">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">新增模块</h4>
      </div>
      <div class="modal-body">

     <div class="container-fluid inputbox clearfix">
     	<input type="hidden" name="id" value="" />
     	<input type="hidden" name="parentId" value="0" />
     	
         <div class="row">
        
			          <div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
              <span class="box_text">是否启用：</span><span class="box_input"><select class="form-control" name="status">
              	<option value="1">启用</option><option value="0">不启用</option>
              </select></span>
			     </div>
			     
			          <div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
              <span class="box_text">模块类别：</span><span class="box_input"><select class="form-control" name="resourceTypeId">
              	<option value="1">报表</option><option value="2">功能</option>
              </select></span>
			     </div>
			    <div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
              <span class="box_text">模块标识：</span><span class="box_input"><select class="form-control" name="resourceFlagId">
              	<option value="1">报表</option><option value="2">功能</option>
              </select></span>
			     </div>
         </div>
			          <!--<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">模块名称：</span><span class="box_input"><input type="text" name="name" id="" value="" placeholder="请输入模块名称" class="form-control" /></span>
			   </div>
         </div>-->
			          <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">模块名称：</span><span class="box_input"><input type="text" name="menuText" id="" value="" placeholder="请输入模块菜单文字" class="form-control" /></span>
				
             </div>
             
             
         </div>
         
          <!--<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">流程图页面：</span><span class="box_input"><input type="text" name="menuPage" id="" value="" placeholder="请输入流程图页面页面地址" class="form-control" /></span>
				
             </div>
             
             
         </div>-->
            <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">模块访问地址：</span><span class="box_input"><input type="text" name="url" id="" value="" placeholder="请输入页面地址" class="form-control" /></span>
				
             </div>
             
             
         </div>
          <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">模块图标：</span><span class="box_input"><input type="hidden" name="iconId" id="iconcode"><div id="iconbox">
				
			</div></span>
				
             </div>
             
             
         </div>
         
      
     </div>

      </div>
      <div class="modal-footer text-center">
                <button type="button" class="btn btn-primary savebutton"  >保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

      </div>
      </form> </div>
  </div>
</div>



	</body>
</html>
