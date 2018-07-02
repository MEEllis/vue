<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../Include/Header.jsp"%>
<script type="text/javascript">$(function() {
	var pagemodolue = new curdmodal({
			
		GetRowInfoUrl: "../../Tpublictabs/tpublictabsJsonById", //获取数据详细信息接口加载地址
		GetListUrl:"../../Tpublictabs/listTpublictabsJson?pageSize=200",//获取列表数据接口
		SaveEditUrl: "../../Tpublictabs/editsaveTpublictabs", //新增或修改后保存数据接口地址
		SaveAddUrl: "../../Tpublictabs/addsaveTpublictabs", //新增或修改后保存数据接口地址	
	    DelRowUrl: "../../Tpublictabs/deleteTpublictabs", // 删除信息接口地址
		SaveEditBtnName: ".savebutton", //保存按钮名称。遵照css选择器书写
		EditModalName: ".editbox", //新增 或者修改时弹窗名称。遵照css选择器书写
		SaveAddBtnName: ".addbutton", //保存按钮名称。遵照css选择器书写
		AddModalName: ".addbox", //新增 或者修改时弹窗名称。遵照css选择器书写
		listTempLate:'<li class="hidechild " data-id="{{id}}">{{type}}--{{content}}<span class="pull-right eventbox"><a class="button" data-eventname="showAddChildModal">新增选项</a><a class="button"  data-eventname="showEditModal">修改选项</a><a class="button" data-eventname="delRow">删除选项</a></span></li>\n'//显示列表的模板
		
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
	
		</div>
		
		<div class="grp_info">
			<div id="groupInfo">
				<ul class="list-group">
					
						<li class="list-group-item" ><span class="txt">选项编码：</span><font data-col="code"> </font></li>
				<li class="list-group-item" ><span class="txt">选项类型：</span><font data-col="type"> </font></li>
				<li class="list-group-item" ><span class="txt">选项内容：</span><font data-col="content"> </font></li>
				<li class="list-group-item" ><span class="txt">新增人：</span><font data-col="createName"> </font></li>
				<li class="list-group-item" ><span class="txt">新增时间：</span><font data-col="createTimeString"> </font></li>
				<li class="list-group-item" ><span class="txt">修改人：</span><font data-col="updateName"> </font></li>
				<li class="list-group-item" ><span class="txt">修改时间：</span><font data-col="updateTimeString"> </font></li>
					<li class="list-group-item" ><span class="txt">启用标志：</span><font data-col="status"> </font>  </li> 
					<li class="list-group-item" ><span class="txt">备注：</span> <font data-col="remark"> </font> </li> 
		
				</ul>
			</div>
		</div>
			<!--<div class="zxsaaspage" data-type="2" >
		</div>-->

	

<div class="modal fade editbox" id="ModolueEdit">
  <div class="modal-dialog" style="width: 80%;">
    <div class="modal-content">
       	<form id="menuAdminForm" class="form">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">新增功能</h4>
      </div>
      <div class="modal-body">

     <div class="container-fluid inputbox clearfix">
     	<input type="hidden" name="id" value="" />
       	
         <div class="row">
        
			          <div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
              <span class="box_text">是否启用：</span><span class="box_input"><select class="form-control" name="status">
              	<option value="1">启用</option><option value="0">不启用</option>
              </select></span>
			     </div>
			     
			          
         </div>
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">选项编码：</span><span class="box_input"><input type="text" name="code" id="" value="" placeholder="请输入选项编码" class="form-control" /></span>
			   </div>
			   
         </div>
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">选项类型：</span><span class="box_input"><input type="text" name="type" id="" value="" placeholder="请输入选项类型" class="form-control" /></span>
			   </div>
			   
         </div>
         <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">选项内容：</span><span class="box_input"><input type="text" name="content" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
          <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">备注：</span><span class="box_input"><input type="text" name="remark" id="" value="" placeholder="请输入备注内容" class="form-control" /></span>
				
             </div>
             
             
         </div>
                    <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">功能图标：</span><span class="box_input"><input type="hidden" name="iconId" id="iconcode"><div id="iconbox">
				
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


<div class="modal fade addbox" id="ModolueEdit1">
  <div class="modal-dialog" style="width: 80%;">
    <div class="modal-content">
       	<form id="menuAdminForm" class="form">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">新增选项</h4>
      </div>
      <div class="modal-body">

     <div class="container-fluid inputbox clearfix">
     	<input type="hidden" name="id" value="" />
       	
         <div class="row">
        
			          <div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
              <span class="box_text">是否启用：</span><span class="box_input"><select class="form-control" name="status">
              	<option value="1">启用</option><option value="0">不启用</option>
              </select></span>
			     </div>
			     
			          
         </div>
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">选项编码：</span><span class="box_input"><input type="text" name="code" id="" value="" placeholder="请输入选项编码" class="form-control" /></span>
			   </div>
			   
         </div>
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">选项类型：</span><span class="box_input"><input type="text" name="type" id="" value="" placeholder="请输入选项类型" class="form-control" /></span>
			   </div>
			   
         </div>
         <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">选项内容：</span><span class="box_input"><input type="text" name="content" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
          <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">备注：</span><span class="box_input"><input type="text" name="remark" id="" value="" placeholder="请输入备注内容" class="form-control" /></span>
				
             </div>
             
             
         </div>
             
    
     </div>

      </div>
      <div class="modal-footer text-center">
                <button type="button" class="btn btn-primary addbutton"  >保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

      </div>
      </form> </div>
  </div>
</div>




	</body>
</html>
