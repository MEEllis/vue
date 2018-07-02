<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../Include/Header.jsp"%>
<script type="text/javascript">$(function() {
	
	
curdmodal.prototype.saveEdit=function(){
		var postdata1 =$.zxsaas_plus.getinput2json($(curdmodal.options.EditModalName + " .BasicInfo")) 
var postdata2 =$.zxsaas_plus.getinput2json($(curdmodal.options.EditModalName + " .EXpInfo")) 

		$.post(curdmodal.options.SaveEditUrl,{temployees:JSON.stringify(postdata1),temployeesext:JSON.stringify(postdata2)}, function(r) {

			if(r.result == 1) {
				$.zxsaas_plus.showalert("数据操作成功！", r.desc);
				$(curdmodal.options.EditModalName).modal("hide");
			} else {
				$.zxsaas_plus.showalert("数据操作失败！", r.desc);
				$(curdmodal.options.EditModalName).modal("hide");
			}

		});
	
};
curdmodal.prototype.saveAdd=function(){
	var postdata1 =$.zxsaas_plus.getinput2json($(curdmodal.options.EditModalName + " .BasicInfo")) 
var postdata2 =$.zxsaas_plus.getinput2json($(curdmodal.options.EditModalName + " .EXpInfo")) 

		$.post(curdmodal.options.SaveAddUrl,{temployees:JSON.stringify(postdata1),temployeesext:JSON.stringify(postdata2)}, function(r) {


			if(r.result == 1) {
				$.zxsaas_plus.showalert("数据操作成功！", r.desc);
				$(curdmodal.options.AddModalName).modal("hide");
			} else {
				$.zxsaas_plus.showalert("数据操作失败！", r.desc);
				$(curdmodal.options.AddModalName).modal("hide");
			}

		});
	
};

	$(".EXpInfo").hide();
	var pagemodolue = new curdmodal({
			
		GetRowInfoUrl: "../../employees/ajaxGetEmployees", //获取数据详细信息接口加载地址
		GetListUrl:"../../employees/lisEmployeesJson?pageSize=200",//获取列表数据接口
		SaveEditUrl: "../../employees/updateEmployees", //新增或修改后保存数据接口地址
		SaveAddUrl: "../../employees/saveEmployees", //新增或修改后保存数据接口地址	
	    DelRowUrl: "../../employees/deleteEmployees", // 删除信息接口地址
		SaveEditBtnName: ".savebutton", //保存按钮名称。遵照css选择器书写
		EditModalName: ".editbox", //新增 或者修改时弹窗名称。遵照css选择器书写
		SaveAddBtnName: ".addbutton", //保存按钮名称。遵照css选择器书写
		AddModalName: ".addbox", //新增 或者修改时弹窗名称。遵照css选择器书写
		listTempLate:'<li class="hidechild " data-id="{{id}}">{{groupName}}>{{companyName}}>{{sectionName}}--{{name}}<span class="pull-right eventbox"><a class="button" data-eventname="showAddChildModal">新增员工</a><a class="button"  data-eventname="showEditEmpModal">修改员工</a><a class="button" data-eventname="delRow">删除员工</a></span></li>\n'//显示列表的模板
		
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
		
		buttonevent.showEmployeesInfo($(this));
				event.stopPropagation();
	});
	buttonevent.loadingFunction(0,$(".grp_tree"));
	
$(document).on("click",".employeesInfoTab>a",function(event){
	var showid=$(this).attr("href")
	$(".employeesInfoTab>a").removeClass("active");
	$(this).addClass("active");
	$(this).parent().parent().find(".BasicInfo").hide();
	$(this).parent().parent().find(".EXpInfo").hide();
	$(this).parent().parent().find(showid).show();
			event.preventDefault();
			event.stopPropagation();
			
return false;
});
});</script>
	</head>
	<body id="employeesAdmin">
		

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
					<div class="employeesInfoTab"><a href=".BasicInfo" class="active">基本信息</a><a href=".EXpInfo">扩展属性</a></div>
				<ul class="list-group BasicInfo">
					
				<li class="list-group-item" ><span class="txt">所属集团：</span><font data-col="groupName"> 3333</font></li>
				<li class="list-group-item" ><span class="txt">所属公司：</span><font data-col="companyName"> </font></li>
				<li class="list-group-item" ><span class="txt">所属部门：</span><font data-col="sectionName"> </font></li>
				<li class="list-group-item" ><span class="txt">姓名：</span><font data-col="name"> </font></li>					
						<li class="list-group-item" ><span class="txt">员工编码：</span><font data-col="code"> </font></li>
				<li class="list-group-item" ><span class="txt">工号：</span><font data-col="type"> </font></li>
				<li class="list-group-item" ><span class="txt">角色：</span><font data-col="content"> </font></li>
									
						<li class="list-group-item" ><span class="txt">职位：</span><font data-col="code"> </font></li>
				<li class="list-group-item" ><span class="txt">员工属性：</span><font data-col="type"> </font></li>
			
				<li class="list-group-item" ><span class="txt">新增人：</span><font data-col="createUser"> </font></li>
				<li class="list-group-item" ><span class="txt">新增时间：</span><font data-col="createTimeString"> </font></li>
		
					<li class="list-group-item" ><span class="txt">在职状态：</span><font data-col="statusId"> </font>  </li> 
					<li class="list-group-item" ><span class="txt">备注：</span> <font data-col="remark"> </font> </li> 
		
				</ul>
				<ul class="list-group EXpInfo">
					
						<li class="list-group-item" ><span class="txt">入职日期：</span><font data-col="entryDay"> </font></li>
				<li class="list-group-item" ><span class="txt">离职日期：</span><font data-col="dimissionDay"> </font></li>
				<li class="list-group-item" ><span class="txt">可使用地区：</span><font data-col="allowAreasIds"> </font></li>
				<li class="list-group-item" ><span class="txt">可使用商品类型：</span><font data-col="allowGoodsTypeIds"> </font></li>					
						<li class="list-group-item" ><span class="txt">可查看报表天数：</span><font data-col="viewReportDays"> </font></li>
				<li class="list-group-item" ><span class="txt">可操作系统时间：</span><font data-col="useOperationTimeId"> </font></li>
				<li class="list-group-item" ><span class="txt">可查看总部成本：</span><font data-col="viewCompanyCost"> </font></li>
									
						<li class="list-group-item" ><span class="txt">可查看部门成本：</span><font data-col="viewSectionCost"> </font></li>
				<li class="list-group-item" ><span class="txt">允许低于最低零售价：</span><font data-col="allowLowMinRetailPrice"> </font></li>
			
				<li class="list-group-item" ><span class="txt">允许低于零售价：</span><font data-col="allowLowRetailPrice"> </font></li>
				<li class="list-group-item" ><span class="txt">允许低于批发价：</span><font data-col="allowLowWholesalePrice"> </font></li>
		
					<li class="list-group-item" ><span class="txt">允许低于最低批：</span><font data-col="allowLowMinWholesalePrice"> </font>  </li> 
					<li class="list-group-item" ><span class="txt">限定设备登录：</span> <font data-col="ifLimitMacLogin"> </font> </li>
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
  
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">编辑员工</h4>
      </div>
      <div class="modal-body">
<div class="employeesInfoTab"><a href=".BasicInfo" class="active">基本信息</a><a href=".EXpInfo">扩展属性</a></div>

	<div class="container-fluid inputbox clearfix BasicInfo">
           	<form  class="form">
           		<input type="hidden" name="id" value="" />
    
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">所属集团：</span><span class="box_input"><input type="text" name="groupId" id="" value="" placeholder="请输入选项编码" class="form-control" /></span>
			   </div>
			   
         </div>
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">所属公司：</span><span class="box_input"><input type="text" name="companyId" id="" value="" placeholder="请输入选项类型" class="form-control" /></span>
			   </div>
			   
         </div>
         <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">所属部门：</span><span class="box_input"><input type="text" name="sectionId" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">姓名：</span><span class="box_input"><input type="text" name="name" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">员工编码：</span><span class="box_input"><input type="text" name="code" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">工号：</span><span class="box_input"><input type="text" name="login" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
              <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">角色：</span><span class="box_input"><input type="text" name="rolesIds" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">职位：</span><span class="box_input"><input type="text" name="positionId" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
          <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">在职状态：</span><span class="box_input"><input type="text" name="statusId" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
              <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">员工属性：</span><span class="box_input"><input type="text" name="employeesAttributeId" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
         
          <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">备注：</span><span class="box_input"><input type="text" name="remark" id="" value="" placeholder="请输入备注内容" class="form-control" /></span>
				
             </div>
             
             
         </div>
            
    </form>
     </div>
	<div class="container-fluid inputbox clearfix EXpInfo">
         	<form  class="form">
    <input type="hidden" name="id" value="" />
       	
         <div class="row">
        
			          <div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
              <span class="box_text">入职日期：</span><span class="box_input"><input type="text" name="entryDay" id="" value="" placeholder="请输入选项编码" class="form-control" /></span>
			     </div>
			          
         </div>
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">离职日期：</span><span class="box_input"><input type="text" name="dimissionDay" id="" value="" placeholder="请输入选项编码" class="form-control" /></span>
			   </div>
			   
         </div>
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可使用地区：</span><span class="box_input"><input type="text" name="allowAreasIds" id="" value="" placeholder="请输入选项类型" class="form-control" /></span>
			   </div>
			   
         </div>
         <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可使用商品类型：</span><span class="box_input"><input type="text" name="allowGoodsTypeIds" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可查看报表天数：</span><span class="box_input"><input type="text" name="viewReportDays" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可操作系统时间：</span><span class="box_input"><input type="text" name="useOperationTimeId" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可查看总部成本价：</span><span class="box_input"><input type="text" name="viewCompanyCost" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
              <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可查看部门成本价：</span><span class="box_input"><input type="text" name="viewSectionCost" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">允许低于最低零售价权限：</span><span class="box_input"><input type="text" name="allowLowMinRetailPrice" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
              <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">允许低于零售价权限：</span><span class="box_input"><input type="text" name="allowLowRetailPrice" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">允许低于批发价权限：</span><span class="box_input"><input type="text" name="allowLowWholesalePrice" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>  
         <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">允许低于最低批发价权限：</span><span class="box_input"><input type="text" name="allowLowMinWholesalePrice" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div> 
         <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">是否限定设备登录：</span><span class="box_input"><input type="text" name="ifLimitMacLogin" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">启用标志：</span><span class="box_input"><input type="text" name="status" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
          <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">备注：</span><span class="box_input"><input type="text" name="remark" id="" value="" placeholder="请输入备注内容" class="form-control" /></span>
				
             </div>
             
             
         </div>
         </form>   
    
     </div>

</div>
     
   
    
         <div class="modal-footer text-center">
                <button type="button" class="btn btn-primary savebutton"  >保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

      </div>
     </div>
  </div>
</div>


<div class="modal fade addbox" id="ModolueEdit1">
  <div class="modal-dialog" style="width: 80%;">
    <div class="modal-content">
       	<form  class="form">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">新增选项</h4>
      </div>
      <div class="modal-body">
	<div class="employeesInfoTab"><a href=".BasicInfo" class="active">基本信息</a><a href=".EXpInfo">扩展属性</a></div>
	<div>
     <div class="container-fluid inputbox clearfix BasicInfo">
     	<input type="hidden" name="id" value="" />
       	

			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">所属集团：</span><span class="box_input"><input type="text" name="groupId" id="" value="" placeholder="请输入选项编码" class="form-control" /></span>
			   </div>
			   
         </div>
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">所属公司：</span><span class="box_input"><input type="text" name="companyId" id="" value="" placeholder="请输入选项类型" class="form-control" /></span>
			   </div>
			   
         </div>
         <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">所属部门：</span><span class="box_input"><input type="text" name="sectionId" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">姓名：</span><span class="box_input"><input type="text" name="name" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">员工编码：</span><span class="box_input"><input type="text" name="code" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">工号：</span><span class="box_input"><input type="text" name="login" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
              <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">角色：</span><span class="box_input"><input type="text" name="rolesIds" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">职位：</span><span class="box_input"><input type="text" name="positionId" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">在职状态：</span><span class="box_input"><input type="text" name="statusId" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
              <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">员工属性：</span><span class="box_input"><input type="text" name="employeesAttributeId" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
         
          <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">备注：</span><span class="box_input"><input type="text" name="remark" id="" value="" placeholder="请输入备注内容" class="form-control" /></span>
				
             </div>
             
             
         </div>
            
    
     </div>
<div class="container-fluid inputbox clearfix EXpInfo">
     <input type="hidden" name="id" value="" />
       	
         <div class="row">
        
			          <div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
              <span class="box_text">入职日期：</span><span class="box_input"><input type="text" name="entryDay" id="" value="" placeholder="请输入选项编码" class="form-control" /></span>
			     </div>
			          
         </div>
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">离职日期：</span><span class="box_input"><input type="text" name="dimissionDay" id="" value="" placeholder="请输入选项编码" class="form-control" /></span>
			   </div>
			   
         </div>
			<div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可使用地区：</span><span class="box_input"><input type="text" name="allowAreasIds" id="" value="" placeholder="请输入选项类型" class="form-control" /></span>
			   </div>
			   
         </div>
         <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可使用商品类型：</span><span class="box_input"><input type="text" name="allowGoodsTypeIds" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可查看报表天数：</span><span class="box_input"><input type="text" name="viewReportDays" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可操作系统时间：</span><span class="box_input"><input type="text" name="useOperationTimeId" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可查看总部成本价：</span><span class="box_input"><input type="text" name="viewCompanyCost" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
              <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">可查看部门成本价：</span><span class="box_input"><input type="text" name="viewSectionCost" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">允许低于最低零售价权限：</span><span class="box_input"><input type="text" name="allowLowMinRetailPrice" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
              <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">允许低于零售价权限：</span><span class="box_input"><input type="text" name="allowLowRetailPrice" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">允许低于批发价权限：</span><span class="box_input"><input type="text" name="allowLowWholesalePrice" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>  
         <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">允许低于最低批发价权限：</span><span class="box_input"><input type="text" name="allowLowMinWholesalePrice" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div> 
         <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">是否限定设备登录：</span><span class="box_input"><input type="text" name="ifLimitMacLogin" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
           <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
          	<span class="box_text">启用标志：</span><span class="box_input"><input type="text" name="status" id="" value="" placeholder="请输入选项内容" class="form-control" /></span>
			   </div>
			   
         </div>
          <div class="row">
          <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
			<span class="box_text">备注：</span><span class="box_input"><input type="text" name="remark" id="" value="" placeholder="请输入备注内容" class="form-control" /></span>
				
             </div>
             
             
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
