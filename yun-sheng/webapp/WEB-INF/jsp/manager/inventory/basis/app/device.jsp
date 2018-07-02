<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../../inventoryInclude/head.jsp"/>
	
    <title>仓库助手备案</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/inventory/basis/app/device.css?v=${version}"/>
    <script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/xr.js?v=${version}" ></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/inventory/basis/app/device.js?v=${version}"></script>
    </head>
 <body>
    <!-------------------------------------主页面开始----------------------------------------->
	<div class="btn-group btnNav" id='AUTH' data-code='CKZSBA' >
        <button type="button" class="btn add" data-toggle="modal" data-target="#addModal">新增</button>
        <button type="button" class="btn amend">修改</button>
        <button type="button" class="btn del">删除</button>
        <button type="button" class="btn using">启用</button>
        <button type="button" class="btn off">禁用</button>
        <button type="button" class="btn" onclick="window.parent.openWorkBoxByMenutext('仓库助手备案数据导入','${basePath}/inventory/basis/app/device/import');">导入</button>
        <button type="button" class="btn derive">导出</button>
    </div>
    
    <div class="well header">
	<!--第一行-->
        <div class="row">
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="">设备类型：</label></div>
                    <div class="col-md-8">
                    	<select name="devicetype" class="form-control devicetype">
                    	</select>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="sectionId">关键字查询：</label></div>
                    <div class="col-md-8">
                    	<input type="text" placeholder="输入设备号、集团、发货人、备注" class="form-control keyWord" />
                   	</div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-12"><input class="queryDisEnbled" type="checkbox"/>禁用</div>
                </div>
            </div>
        </div>
        <!--第二行-->
        <div class="row">
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="bg_date">发货开始日期：</label></div>
                    <div class="col-md-8"><input id="bg_date" type="text" class="form-control" name='deviceDate' /></div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="col-md-4"><label for="end_date">发货结束日期：</label></div>
                    <div class="col-md-8"><input id="end_date" type="text" class="form-control" name='deviceDate' /></div>
                </div>
            </div>
            <div class="col-sm-4">
                <button class="btn search">查询</button>
            </div>
        </div>
    </div>
    
<!--表格开始-->
    <div class="jqGrid_wrap">
		<table id="dataGrid"></table> 
 			<div id="jqGridPager"></div>
	</div>
	
<!--新增模态框-->
	<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog w800" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">设备新增</h4>
	      </div>
	      <div class="modal-body pad30">
	      <form id="addForm">
	        <div class="row">
	            <div class="col-sm-6">
	                <div class="row form-group">
	                    <div class="col-md-4"><i>*</i>设备类型：</div>
	                    <div class="col-md-8">
	                    	<select name="devicetype" class="form-control">
	                    	</select>
	                    </div>
	                </div>
	            </div>
	            <div class="col-sm-6">
	                <div class="row form-group">
	                    <div class="col-md-4"><i>*</i>设备号：</div>
	                    <div class="col-md-8"><input name="devicenumber" type="text" class="form-control" value=""/></div>
	                </div>
	            </div>
        	</div>
        	<div class="row">
	            <div class="col-sm-6">
	                <div class="row form-group">
	                    <div class="col-md-4">集团：</div>
	                    <div class="col-md-8">
	                    	<select name="groupId" class="form-control">
	                    	</select>
	                    </div>
	                </div>
	            </div>
	            <div class="col-sm-6">
	                <div class="row form-group">
	                    <div class="col-md-4">发货日期：</div>
	                    <div class="col-md-8"><input id="fh_date" name="deviceDate" type="text" class="form-control" /></div>
	                </div>
	            </div>
        	</div>
        	<div class="row">
	            <div class="col-sm-6">
	                <div class="row form-group">
	                    <div class="col-md-4">发货人：</div>
	                    <div class="col-md-8"><input name="sendName" type="text" class="form-control" value=""/></div>
	                </div>
	            </div>
	            <div class="col-sm-6">
	                <div class="row form-group">
	                    <div class="col-md-4">发货单号：</div>
	                    <div class="col-md-8"><input name="sendNum" type="text" class="form-control" value=""/></div>
	                </div>
	            </div>
        	</div>
        	<div class="row h100 form-group">
                <div class="col-md-2">备注：</div>
                <div class="col-md-10"><textarea name="remark" rows="4"></textarea></div>
        	</div>
        	<div class="row form-group">
                <div class="col-md-12"><span><input name="status" type="checkbox"/>禁用</span></div>
        	</div>
        	</form>
	      </div>
	      <div class="modal-footer">
	      	<button type="button" class="btn btn-warning NewSave">保存并新增</button>
	      	<button type="button" class="btn btn-primary addSave">保存并关闭</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">仅关闭</button>
	      </div>
	    </div>
	  </div>
	</div>	
	
	<!--修改模态框-->
	<div class="modal fade" id="amendModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog w800" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">设备信息修改</h4>
	      </div>
	      <div class="modal-body pad30">
	      <form id="amendForm">
	        <div class="row">
	            <div class="col-sm-6">
	                <div class="row form-group">
	                    <div class="col-md-4"><i>*</i>设备类型：</div>
	                    <div class="col-md-8"><select name="devicetype" class="form-control amendtype"></select></div>
	                </div>
	            </div>
	            <div class="col-sm-6">
	                <div class="row form-group">
	                    <div class="col-md-4"><i>*</i>设备号：</div>
	                    <div class="col-md-8"><input name="devicenumber" type="text" class="form-control amendnumber" maxlength="256" /></div>
	                </div>
	            </div>
        	</div>
        	<div class="row">
	            <div class="col-sm-6">
	                <div class="row">
	                    <div class="col-md-4">集团：</div>
	                    <div class="col-md-8">
	                    	<select name="groupId" class="form-control amendId">
	                    	</select>
	                    </div>
	                </div>
	            </div>
	            <div class="col-sm-6">
	                <div class="row">
	                    <div class="col-md-4">发货日期：</div>
	                    <div class="col-md-8"><input id="xg_date" name="deviceDate" type="text" class="form-control amendDate" /></div>
	                </div>
	            </div>
        	</div>
        	<div class="row">
	            <div class="col-sm-6">
	                <div class="row">
	                    <div class="col-md-4">发货人：</div>
	                    <div class="col-md-8"><input name="sendName" type="text" class="form-control amendName" value=""/></div>
	                </div>
	            </div>
	            <div class="col-sm-6">
	                <div class="row">
	                    <div class="col-md-4">发货单号：</div>
	                    <div class="col-md-8"><input name="sendNum" type="text" class="form-control amendNum" value=""/></div>
	                </div>
	            </div>
        	</div>
        	<div class="row">
	            <div class="col-sm-6">
	                <div class="row">
	                    <div class="col-md-4">新增时间：</div>
	                    <div class="col-md-8"><input type="text" class="form-control createDateStr" readonly/></div>
	                </div>
	            </div>
	            <div class="col-sm-6">
	                <div class="row">
	                    <div class="col-md-4">新增人：</div>
	                    <div class="col-md-8"><input type="text" class="form-control createByName" readonly/></div>
	                </div>
	            </div>
        	</div>
        	<div class="row">
	            <div class="col-sm-6">
	                <div class="row">
	                    <div class="col-md-4">修改时间：</div>
	                    <div class="col-md-8"><input type="text" class="form-control updateDateStr" readonly/></div>
	                </div>
	            </div>
	            <div class="col-sm-6">
	                <div class="row">
	                    <div class="col-md-4">修改人：</div>
	                    <div class="col-md-8"><input type="text" class="form-control updateByName" readonly/></div>
	                </div>
	            </div>
        	</div>
        	<div class="row h100">
                <div class="col-md-2">备注：</div>
                <div class="col-md-10"><textarea name="remark" class="amendRemark" rows="4"></textarea></div>
        	</div>
        	<div class="row">
                <div class="col-md-12"><input name="status" class="amendStatus" type="checkbox"/>禁用</div>
        	</div>
        	</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary amendSave">保存并关闭</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">仅关闭</button>
	      </div>
	    </div>
	  </div>
	</div>
	
<!--	最近登录时间模态框-->
	<div class="modal fade" id="timeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">登录时间详情</h4>
	      </div>
	      <div class="modal-body">
	        <!--表格开始-->
		    <div class="jqGrid_wrap time_warp">
				<table id="timeGrid"></table> 
		 			<div id="jqGridPager_time"></div>
			</div>
			
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	      </div>
	    </div>
	  </div>
	</div>
	
 </body>
</html>
