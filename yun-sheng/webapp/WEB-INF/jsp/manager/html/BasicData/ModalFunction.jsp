<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../Include/Header.jsp"%>
<script src="../../js/pagejs/modalFunction.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">$(function() {
$("body").modalFunction();
	
});
</script>
	</head>
	<body>
	<div class="searchbox">
		<div class="btnbox clearfix ">
			<button type="button" class="btn btn-default savebutton "><i class="iconfont">&#xe604;</i>保存</button>
		</div></div>	
		
	<div id="modaltree" class="modaltree">
	</div>
		<div class="functionList">
			<form id="modaltreeForm" class="modalfunctionform">
				<input type="hidden" name="resourceId"  value="" />
				<ul class="container-fluid list-group">
				
				</ul>
			</form>

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
     	<input type="hidden" name="id" value="0" />
     		
     		<input type="hidden" name="groupId" value="0" />
     		<input type="hidden" name="parentId" value="0" />
     		
         <div class="row">
          <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">

              <span class="box_text">公司编码：</span><span class="box_input"><input type="text" name="code" id="" value="" placeholder="请输入公司编码" class="form-control" /></span>    </div>
                <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
              
              	<span class="box_text">公司名称：</span><span class="box_input"><input type="text" name="name" id="" value="" placeholder="请输入公司名称" class="form-control" /></span>
			     </div>
			       
			  
        
             
         </div>
         
          <div class="row">
          	  
          <div class="col-xs-6 col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">所在区域：</span><span class="box_input"><input type="text" name="areasId" id="" value="" placeholder="请选择所在区域" class="form-control timebox" /></span>
				
             </div>
             
          <div class="col-xs-6  col-sm-6 col-md-6    col-lg-6">
			<span class="box_text">分期商IDS：</span><span class="box_input"><input type="text" name="tallymanIds" id="" value="" placeholder="请输入分期商IDS" class="form-control" /></span>
				
             </div>
            </div>
              <div class="row">
               <div class="col-xs-6  col-sm-6 col-md-6   col-lg-6">
			<span class="box_text">启用标志：</span><span class="box_input"><input type="text" name="enable" id="" value="" placeholder="请选择公司是否启用" class="form-control" /></span>
				
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



	</body>
</html>

