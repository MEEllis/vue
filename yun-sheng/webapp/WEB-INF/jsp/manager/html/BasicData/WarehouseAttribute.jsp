<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../Include/Header.jsp"%>
<script type="text/javascript">$(function() {
	var pagemodolue = new curdmodal({
		
		GetRowInfoUrl: "../../Iwarehouseattribute/listIwarehouseattributeByJson", //获取数据详细信息接口加载地址
		GetListUrl:"../../Iwarehouseattribute/listIwarehouseattributeJson",//获取列表数据接口
		SaveEditUrl: "../../Iwarehouseattribute/editsaveIwarehouseattribute", //新增或修改后保存数据接口地址
	    DelRowUrl: "../../Iwarehouseattribute/deleteIwarehouseattribute", // 删除信息接口地址
		SaveEditBtnName: ".savebutton", //保存按钮名称。遵照css选择器书写
		EditModalName: ".editbox" ,//新增 或者修改时弹窗名称。遵照css选择器书写
		listTempLate:'<li class="hidechild " data-id="{{id}}"><i class="iconfont">&#xe60d</i>{{name}}<span class="pull-right eventbox"><a class="button" data-eventname="showAddChildModal">新增仓库</a><a class="button"  data-eventname="showEditModal">修改仓库</a><a class="button" data-eventname="delRow">删除仓库</a></span></li>\n',//显示列表的模板
		
	});
	pagemodolue.modouleLoad();

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
		buttonevent.showFunctioninfo($(this));
				event.stopPropagation();
	});

buttonevent.loadingFunction(0,$(".grp_tree"));
	
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
			
		</ul>
				
			</li>
		</ul></div>
		<div class="grp_info">
			<div id="groupInfo">
				<ul class="list-group">
					
						<li class="list-group-item" ><span class="txt">集团名称：</span><font data-col="groupName"> </font></li>
						<li class="list-group-item" ><span class="txt">公司名称：</span><font data-col="groupName"> </font></li>
								<li class="list-group-item" ><span class="txt">启用标志：</span><font data-col="status"> </font>  </li> 
					<li class="list-group-item" ><span class="txt">备注：</span> <font data-col="remark"> </font> </li> 
					
					
					
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
        <h4 class="modal-title">新增仓库</h4>
      </div>
      <div class="modal-body">

     <div class="container-fluid inputbox clearfix">
     	<input type="hidden" name="id" value="" />
       
         <div class="row">
               <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
              <span class="box_text">是否启用：</span><span class="box_input"><select class="form-control" name="status">
              	<option value="1">启用</option><option value="0">不启用</option>
              </select></span>
			     </div>
			     <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
			      <span class="box_text">仓库属性名称：</span><span class="box_input"><input type="text" name="name" id="" value="" placeholder="请输入角色编码" class="form-control" /></span>
			 </div> 
			 
         </div>
         <div class="row">
         <div class="col-xs-6  col-sm-6  col-md-6    col-lg-6">
          	       <span class="box_text">集团Id：</span><span class="box_input"><input type="text" name="groupId" id="" value="" placeholder="请输入角色编码" class="form-control" /></span>             	   
			  </div>
               <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
                  <span class="box_text">公司Id：</span><span class="box_input"><input type="text" name="companyId" id="" value="" placeholder="请输入角色编码" class="form-control" /></span>
			  </div>  			  
         </div>
         <div class="row">
              <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			      <span class="box_text">备注：</span><span class="box_input"><input type="text" name="remark" id="" value="" placeholder="请输入备注" class="form-control" /></span>
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
