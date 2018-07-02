<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../Include/Header.jsp"%>
<script src="../../js/pagejs/xjz.js" type="text/javascript" charset="utf-8"></script>
	
	<script type="text/javascript">
		$(function(){
			xjzfunction.systemSet_GRP_Frame_load();
		})
	</script>
	</head>
	<body id="systemSet_GRP_Frame">
		

	

	<div class="searchbox">
		<div class="btnbox clearfix ">
			<button type="button" class="btn btn-default xjzbutton searchbtn"><i class="iconfont">&#xe604;</i>查询</button>
			<button type="button" class="btn btn-default xjzbutton addnewunit" data-eventname="addnewUnit"><i class="iconfont">&#xe62a;</i>新增公司</button>
			<button type="button" class="btn btn-default xjzbutton changeGroup" data-eventname="changeGroup"><i class="iconfont">&#xe62a;</i>修改集团</button>
			<button type="button" class="btn btn-default xjzbutton deleteGroup" data-eventname="deleteGroup"><i class="iconfont">&#xe62a;</i>删除集团</button>
			<button type="button" class="btn btn-default xjzbutton addnewChildUint" data-eventname="addnewUnit"><i class="iconfont">&#xe62a;</i>新增子公司</button>
			<button type="button" class="btn btn-default xjzbutton addnewDept"  data-eventname="addnewDept"><i class="iconfont">&#xe61c;</i>新增部门</button>
			<button type="button" class="btn btn-default xjzbutton changeunit"  data-eventname="changeUnit" ><i class="iconfont">&#xe61c;</i>修改公司</button>
			<button type="button" class="btn btn-default xjzbutton deleteUnit" data-eventname="deleteUnit"><i class="iconfont">&#xe61c;</i>删除公司</button>
			<button type="button" class="btn btn-default xjzbutton addnewChildDept"  data-eventname="addnewDept"><i class="iconfont">&#xe61c;</i>新增子部门</button>
			<button type="button" class="btn btn-default xjzbutton addnewStork"  data-eventname="addnewStork"><i class="iconfont">&#xe61c;</i>新增仓库</button>
			<button type="button" class="btn btn-default xjzbutton changeDept"  data-eventname="changeDept"><i class="iconfont">&#xe61c;</i>修改部门</button>
			<button type="button" class="btn btn-default xjzbutton deleteDept" data-eventname="deleteDept"><i class="iconfont">&#xe61c;</i>删除部门</button>
				<button type="button" class="btn btn-default xjzbutton changeStork"  data-eventname="changeStork"><i class="iconfont">&#xe61c;</i>修改仓库</button>
			<button type="button" class="btn btn-default xjzbutton deleteStork"  data-eventname="deleteStork"><i class="iconfont">&#xe61c;</i>删除仓库</button></div></div>	
		
		<div class="grp_tree">
		<ul>
			<!--<li><a class="xjzbutton" data-eventname="loadchildnode"><i class="iconfont">&#xe61f </i></a>测试集团<span class="pull-right eventbox"><a class="xjzbutton" data-eventname="addnewunit">新增公司</a><a class="xjzbutton"  data-eventname="addnewdept">新增部门</a><a class="xjzbutton"  data-eventname="editgroup">编辑</a><a class="xjzbutton" data-eventname="delgroup">删除</a></span>
				<ul>
			<li><a class="xjzbutton" data-eventname="loadchildnode"><i class="iconfont">&#xe61f </i></a>测试集团<span class="pull-right eventbox"><a class="xjzbutton" data-eventname="addnewunit">新增公司</a><a class="xjzbutton"  data-eventname="addnewdept">新增部门</a><a class="xjzbutton"  data-eventname="editgroup">编辑</a><a class="xjzbutton" data-eventname="delgroup">删除</a></span></li>-->
		</ul>
				
			</li>
		</ul></div>
		<div class="grp_info">
			<div id="groupInfo">
				<ul class="list-group">
					<!--<li class="list-group-item" ><span class="txt">集团编码：</span>888888</li>
					<li class="list-group-item" ><span class="txt">集团名称：</span>888888</li>
					<li class="list-group-item" ><span class="txt">新增人：</span>888888</li>
					<li class="list-group-item" ><span class="txt">新增时间：</span>888888</li>
					<li class="list-group-item" ><span class="txt">修改人：</span>888888</li>
					<li class="list-group-item" ><span class="txt">修改时间：</span>888888</li>
					<li class="list-group-item" ><span class="txt">使用期限：</span>888888</li>
					<li class="list-group-item" ><span class="txt">系统版本：</span>888888</li>
					<li class="list-group-item" ><span class="txt">平台标识：</span>888888</li> 
					<li class="list-group-item" ><span class="txt">备注：</span>888888</li> -->
					
					
				</ul>
			</div>
<div id="companyInfo">
				
			</div>
			<div id="deptInfo">
				
			</div>
			<div id="StorkInfo">
				
			</div>
		</div>

	

<div class="modal fade" id="GroupModal">
  <div class="modal-dialog" style="width: 80%;">
    <div class="modal-content">
    	<form id="GroupModalForm">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"></h4>
      </div>
      <input type="hidden" name="empCreateName" id="" value="" />
       <input type="hidden" name="empUpdateName" id="" value="" />
        <input type="hidden" name="createUid" id="" value="" />
         <input type="hidden" name="createTime" id="" value="" />
          <input type="hidden" name="updateUid" id="" value="" />
           <input type="hidden" name="updateTime" id="" value="" />
            <input type="hidden" name="expireDay" id="" value="" />
            <input type="hidden" name="systemVersion" id="" value="" />
            <input type="hidden" name="platform" id="" value="" />
            <input type="hidden" name="createTimeString" id="" value="" />
            <input type="hidden" name="updateTimeString" id="" value="" />
            <input type="hidden" name="expireDayString" id="" value="" />
         <div class="modal-body">

     <div class="container-fluid inputbox clearfix">
         <div class="row">
          <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">

              <span class="box_text">集团编码：</span><span class="box_input"><input type="text" name="code" id="" value="" placeholder="请输入集团编码" class="form-control" /></span>    </div>
                <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
              
              	<span class="box_text">集团名称：</span><span class="box_input"><input type="text" name="name" id="" value="" placeholder="请输入集团名称" class="form-control" /></span>
			     </div>
         </div>
         
          <div class="row">
          	  
          <div class="col-xs-6 col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">使用期限：</span><span class="box_input"><input type="text" name="expireId" id="" value="" placeholder="请输入最后使用期限" class="form-control timebox" /></span>
				
             </div>
             
          <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">系统版本：</span><span class="box_input"><input type="text" name="systemVersion" id="" value="" placeholder="请输入系统版本" class="form-control" /></span>
				
             </div>
            </div>
              <div class="row">
               <div class="col-xs-6  col-sm-6 col-md-6   col-lg-6">
			<span class="box_text">平台标识：</span><span class="box_input"><input type="text" name="platform" id="" value="" placeholder="请输入平台标识" class="form-control" /></span>
				
             </div>
             
         </div>
         
          <div class="row">
        <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
              <span class="box_text">备注：</span><span class="box_input"><textarea type="text" name="remark" id="" value="" placeholder="请填写备注信息" class="form-control" ></textarea></span>
			     </div>
             
             
         </div>
         
      <br/>
     </div>

      </div>
      
      <div class="modal-footer text-center">
                <button type="button" class="btn btn-primary xjzbutton"  data-eventname="saveGroupModalForm">保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

      </div>
      </form>
    </div>
  </div>
</div>

<div class="modal fade" id="UnitModal">
  <div class="modal-dialog" style="width: 80%;">
    <div class="modal-content">
    	<form id="UnitModalForm">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"></h4>
      </div>
   <div class="modal-body">

     <div class="container-fluid inputbox clearfix">
     	<input type="hidden" name="id" value="" />
     		
     		<input type="hidden" name="groupId" value="" />
     		<input type="hidden" name="parentId" value="" />
     		
         <div class="row">
          <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">

              <span class="box_text">公司编码：</span><span class="box_input"><input type="text" name="code" id="" value="" placeholder="请输入公司编码" class="form-control" /></span>    </div>
                <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
              
              	<span class="box_text">公司名称：</span><span class="box_input"><input type="text" name="name" id="" value="" placeholder="请输入公司名称" class="form-control" /></span>
			     </div>
			       
			  
        
             
         </div>
         
          <div class="row">
          	  
          <div class="col-xs-6 col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">所在区域：</span><span class="box_input"><input type="text" name="areasId" id="" value="" placeholder="请选择所在区域" class="form-control" /></span>
				
             </div>
             
          <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">分期商：</span><span class="box_input"><input type="text" name="tallymanIds" id="" value="" placeholder="请输入分期商IDS" class="form-control" /></span>
				
             </div>
            </div>
              <div class="row">
               <div class="col-xs-6  col-sm-6 col-md-6   col-lg-6">
			<span class="box_text">启用标志：</span><span class="box_input"><input type="text" name="status" id="" value="" placeholder="请选择公司是否启用" class="form-control" /></span>
				
             </div>
             
         </div>
         
          <div class="row">
        <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
              <span class="box_text">备注：</span><span class="box_input"><textarea type="text" name="remark" id="" value="" placeholder="请填写备注信息" class="form-control" ></textarea></span>
			     </div>
             
             
         </div>
         
      <br/>
     </div>

      </div>
      
  
  <div class="modal-footer text-center">
                <button type="button" class="btn btn-primary xjzbutton"  data-eventname="saveUnitModalForm">保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

      </div>
      </form>
    </div>
  </div>
</div>



<div class="modal fade" id="DeptModal">
  <div class="modal-dialog" style="width: 80%;">
    <div class="modal-content">
    	<form id="DeptModalForm">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"></h4>
      </div>
     <div class="modal-body">

     <div class="container-fluid inputbox clearfix">
     	<input type="hidden" name="id" value="" />
     	<input type="hidden" name="parentId" value="" />
     	<input type="hidden" name="groupId" value="" />
     	<input type="hidden" name="companyId" value="" />
     		
         <div class="row">
          <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">

              <span class="box_text">部门编码：</span><span class="box_input"><input type="text" name="code" id="" value="" placeholder="请输入部门编码" class="form-control" /></span>    </div>
                <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
              
              	<span class="box_text">部门名称：</span><span class="box_input"><input type="text" name="name" id="" value="" placeholder="请输入部门名称" class="form-control" /></span>
			     </div>
			       
			  
        
             
         </div>
         
          <div class="row">
          	  
          <div class="col-xs-6 col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">所在地区：</span><span class="box_input"><input type="text" name="areasId" id="" value="" placeholder="请选择所在区域" class="form-control " /></span>
				
             </div>
                  <div class="col-xs-6 col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">部门属性：</span><span class="box_input"><input type="text" name="sectionAttributeId" id="" value="" placeholder="请选择所在区域" class="form-control " /></span>
				
             </div>     
                 </div>
         
          <div class="row">
          <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">可使用资金账户：</span><span class="box_input"><input type="text" name="UseCapitalAccountIds" id="" value="" placeholder="请输入可使用资金账户" class="form-control" /></span>
				
             </div>
      
               <div class="col-xs-6  col-sm-6 col-md-6   col-lg-6">
			<span class="box_text">可转入资金账户：</span><span class="box_input"><input type="text" name="UseTransferAccountIds" id="" value="" placeholder="请选择可转入资金账户" class="form-control" /></span>
				
             </div>  
          </div>
              <div class="row">
                  <div class="col-xs-6  col-sm-6 col-md-6   col-lg-6">
			<span class="box_text">分期商：</span><span class="box_input"><input type="text" name="tallymanIds" id="" value="" placeholder="请选择公司是否启用" class="form-control" /></span>
				
             </div>
         </div>
                     <div class="row">
               <div class="col-xs-6  col-sm-6 col-md-6   col-lg-6">
			<span class="box_text">是否为门店：</span><span class="box_input"><input type="text" name="ifStore" id="" value="" placeholder="请选择公司是否为门店" class="form-control" /></span>
				
             </div>
                  <div class="col-xs-6  col-sm-6 col-md-6   col-lg-6">
			<span class="box_text">启用标志：</span><span class="box_input"><input type="text" name="status" id="" value="" placeholder="请选择公司是否启用" class="form-control" /></span>
				
             </div>
         </div>
          <div class="row">
        <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
              <span class="box_text">备注：</span><span class="box_input"><textarea type="text" name="remark" id="" value="" placeholder="请填写备注信息" class="form-control" ></textarea></span>
			     </div>
             
             
         </div>
         
      <br/>
     </div>

      </div>
      

      <div class="modal-footer text-center">
                <button type="button" class="btn btn-primary xjzbutton"  data-eventname="saveDeptModalForm">保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

      </div>
      </form>
    </div>
  </div>
</div>


<div class="modal fade" id="StorkModal">
  <div class="modal-dialog" style="width: 80%;">
    <div class="modal-content">
    	<form id="StorkModalForm">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"></h4>
      </div>
       <div class="modal-body">

     <div class="container-fluid inputbox clearfix">
     	<input type="hidden" name="id" value="" />
     	     	<input type="hidden" name="parentId" value="" />
     	<input type="hidden" name="groupId" value="" />
     	<input type="hidden" name="companyId" value="" />
     	     	<input type="hidden" name="SectionId" value="" />
     		<input type="hidden" name="parentId" value="" />
         <div class="row">
     <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
              
              	<span class="box_text">仓库名称：</span><span class="box_input"><input type="text" name="name" id="" value="" placeholder="请输入集团名称" class="form-control" /></span>
			     </div>
			       
			  
        
        </div>
         <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">仓库属性：</span><span class="box_input"><input type="text" name="storageAttributeId" id="" value="" placeholder="请输入仓库属性" class="form-control " /></span>
				
             </div>
             
          <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">启用标志：</span><span class="box_input"><input type="text" name="status" id="" value="" placeholder="请输入系统版本" class="form-control" /></span>
				
             </div>
            </div>
    
         
          <div class="row">
        <div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
              <span class="box_text">备注：</span><span class="box_input"><textarea type="text" name="remark" id="" value="" placeholder="请填写备注信息" class="form-control" ></textarea></span>
			     </div>
             
             
         </div>
         
      <br/>
     </div>
   <div class="modal-footer text-center">
                <button type="button" class="btn btn-primary xjzbutton"  data-eventname="saveStorkModalForm">保存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

      </div>
      </form>
    </div>
  </div>
</div>




	</body>
</html>
