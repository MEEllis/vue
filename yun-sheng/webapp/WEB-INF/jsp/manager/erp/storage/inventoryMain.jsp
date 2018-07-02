<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/market/public.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/select2.min.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/html/muti_select/multi.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/Storage/countOrder.css?v=${version}" />
		<title>盘点单</title>
		<script type="text/javascript">
			var basePath='${basePath}';
		</script>
		<style type="text/css">

			.Zpercent .showBox{
				top: -1px;
				position: absolute;
				left: 200px;
				height: 30px;
			}
		</style>
	</head>
	<body>
		<div class="well" style="    min-width: 1450px !important;">
			<div id="AUTH" data-code="PDD" class="btn-group btnHundred" role="group" >
			  <button type="button" class="btn btn-default searchOrder" data-flag="F">首单</button>
			  <button type="button" class="btn btn-default searchOrder" data-flag="P">上一单</button>
			  <button type="button" class="btn btn-default searchOrder" data-flag="N">下一单</button>	
			  <button type="button" class="btn btn-default searchOrder" data-flag="L">末单</button>	
			  <button type="button" class="btn btn-default" id="topAdd">新增</button>	
			  <button type="button" class="btn btn-default" id="mainSave">保存</button>	
			  <button type="button" class="btn btn-default" id="delete">删除</button>	
			  <button type="button" class="btn btn-default" id="filter">过滤</button>	
			  <button type="button" class="btn btn-default" id="derive">导出</button>	
			  <button type="button" class="btn btn-default" id="createOrder">生成报损报溢</button>	
			</div>
					
			<div class="newAD">
				<span class="closeAD"><img src="${basePath}/images/status/close.png"></span>
				<a href="/YSHomePage/pdDetail.jsp" target="_blank"><img src="${basePath}/images/status/storageAD.png"></a>
			</div>
					
			<form style="position:relative;">
				<div class="inputbox container-fluid">
					<!--第一行-->
					<div class="row topMargin">
						<div class="Zpercent">
							<span class="box_text2">单据号：</span>
							<span class="box_input input-group">
								<input type="text" class="form-control2" readonly id="billsCode"  />
								<input type="hidden" class="form-control2 mainGirdArg" argflag='billsId' id="billsId" readonly  />
							</span>
						</div>
						<div class="Zpercent">
							<span class="box_text2">部门名称：</span>
							<span class="box_input input-group">
						 <%--		<select class="form-control mainGirdArg" argflag='sectionId' id="sectionName">
						 		</select>--%>
									<input type="text" class="form-control2 mainGirdArg" argflag='sectionId' readonly id="sectionName"  />
							</span>
						</div>
						
						<div class="Zpercent">
							<span class="box_text2">经手人：</span>
							<span class="box_input input-group">
							<%--	<select class="form-control mainGirdArg" argflag="managersUid" id="Employee">
								</select>--%>
								<input type="text" class="form-control2 mainGirdArg" argflag="managersUid"  readonly id="Employee"  />
							</span>
						</div>
						<div class="Zpercent">
							<span class="box_text2">备注：</span>
							<span class="box_input input-group">
								<input type="text" class="form-control2 mainGirdArg" argflag="remark" id="mainRemark" />
							</span>
						</div>
					</div>
					<!--第二行-->
					<div class='row topMargin'>
						<div class="Zpercent ">
							<span class="box_text2">仓库名称：</span>
							<span class="box_input input-group" style="line-height:normal;">
								<select class="js-example-basic-multiple form-control mainGirdArg" argflag="storageIds" multiple="multiple" id="mainStorage">
								 
								</select>
							</span>
						</div>
						<div class="Zpercent">
							<span class="box_text2">商品类别：</span>
							<span class="box_input input-group">
								<div class="input-group box_input">
							 		  <input type="text" class="form-control2 form-control mainGirdArg" argflag="categoryIds" id="goodsTypeInput" />
								      <span class="input-group-addon" data-toggle="modal" data-target="#goodsType">
								      		<span class="glyphicon glyphicon-plus"></span>
								      </span>
								</div>
							</span>
						</div>
						<div class="Zpercent">
							<span class="box_text2">商品名称：</span>
							<span class="box_input input-group">
								<input type="text" class="form-control form-control2 mainGirdArg queryKey" argflag="queryKey" />
							</span>
						</div>
						<div class="Zpercent">
<!--							<div class="checkbox-inline">-->
<!--							    <label>-->
<!--							      <input class="mainGirdArg" type="checkbox" argflag="showZero" id="showZero">零库存-->
<!--							    </label>-->
<!--							  </div>-->
							  <div class="checkbox-inline">
							      <input type="checkbox" class="mainGirdArg" argflag="showDisabled" id="showDisable">显示禁用商品
							  </div>
							  <button type="button" data-flag="true" class="btn btn-primary btn-sm" id="add">添加</button>
							   <button type="button" class="btn btn-primary  btn-sm" id="refresCount">刷新系统库存</button>
						</div>
					</div>
				</div>
				<div id="statusWrap" style="width:80px;height:80px;overflow:hidden;position:absolute;top:20px;display:none;right:20px;">
					<img src="${basePath}/images/status/statusComplete.png" id="statusComplete" />
					<img src="${basePath}/images/status/statusNoComplete.png" id="statusNoComplete" />
				</div>
			 </form>
		</div>
		<!--表格-->
		<div class="mainTabs onceHide">
			<div style="margin:10px 0;">
				<div class="form-inline">
				  <div class="form-group">
	<!--			    <input type="text" class="form-control" id="searchImei"  placeholder="扫串号/条码">-->
				  </div>
				  <div id="mainTimeShow"></div>
				</div>
			</div>
		
			<table id="mainGrid">
				</table>
		
		<!--底部-->
		<div class="BottomMargin">
			<div class="Zpercent">
				<span class="box_text2">制单人：</span>
				<span class="box_input input-group">
					<input type="text" class="form-control2" id="mainCreateBy" readonly/>
				</span>
			</div>
			<div class="Zpercent">
				<span class="box_text2">修改人：</span>
				<span class="box_input input-group">
					<input type="text" class="form-control2" id="updateByName" readonly/>
				</span>
			</div>
			<div class="Zpercent">
				<span class="box_text2">结束人：</span>
				<span class="box_input input-group">
					<input type="text" class="form-control2" id="mainFinishBy" readonly/>
				</span>
			</div>
			<div class="Zpercent">
				<button class="btn pdbtn">盘点结果明细</button>
			</div>
		</div>
	</div>
	<div class="mainTabs">
		<div style="font-size: 30px;text-align: center;margin-top: 190px;">
			<span  class="numberFont">1</span>
			<span class="glyphicon glyphicon-arrow-right"></span>
			<i class="mainFont">引入盘点商品</i>
			<span class="glyphicon glyphicon-arrow-right"></span>
			<span class="numberFont">2</span>
			<i class="mainFont">录入盘点数据</i>
			<span class="glyphicon glyphicon-arrow-right"></span>
			<span class="numberFont">3</span>
			<i class="mainFont">生成报损报溢</i>
		</div>
	</div>
	<!--过滤模态窗-->
	<!--结算开始-->
    <div class="modal fade bs-example-modal-lg" id="main_filter" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width:1100px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">过滤条件</h4>
                </div>
                <div class="modal-body">
                  <form class="form-inline">
                  		<div class="form-group" style="margin-left:26px;">
                  			<span for="" class="control-label">单据时间：</span>
                  			<input type="text" class="form-control filterTime filterQuery" id="startTime" filterkey="startTime" style="width:167px;height:32px;" readonly>
                  			<span for="" class="control-label">——</span>
                  			<input type="text" class="form-control filterTime filterQuery" id="endTime" filterkey="endTime" style="width:167px;height:32px;" readonly>
                  			<span for="" class="control-label">单据编号：</span>
                  			<input type="text" class="form-control filterQuery" style="width:167px;height:32px;" filterkey="billsCodeKey">
                  		</div>
                  </form>
                  <div class="row BottomMargin">
	                  	<div class="Zpercent2">
							<span class="box_text2">部门名称：</span>
							<span class="box_input input-group">
								<div class="input-group box_input">
								 		 <select class="form-control filterQuery" filterkey="sectionId" id="filterSection"></select>
								</div>
							</span>
						</div>
						<div class="Zpercent2">
								<span class="box_text2">仓库名称：</span>
								<span class="box_input input-group" style="line-height:normal;">
									<select class="js-example-basic-multiple form-control filterQuery" filterkey="storageIds" multiple="multiple" id="filterStorage">
									 
									</select>
								</span>
						</div>
						<div class="Zpercent2">
								<span class="box_text2">商品名称：</span>
								<span class="box_input input-group">
									<input type="text" class="form-control filterQuery" filterkey="goodsNameKey" />
								</span>
						</div>
                  </div>
                  <!--第三行-->
                   <div class="row BottomMargin">
		                  	<div class="Zpercent2">
								<span class="box_text2">经手人：</span>
								<span class="box_input input-group">
									<select class="form-control filterQuery" id="filterEmployee" filterkey="managersUid">
										
									</select>
								</span>
							</div>
							<div class="Zpercent2">
								<span class="box_text2">制单人：</span>
								<span class="box_input input-group">
											<select class="form-control filterQuery" id="filterMadePerson" filterkey="createBy">
												
											</select>
								</span>
							</div>
							<div class="Zpercent2">
									<span class="box_text2">备注：</span>
									<span class="box_input input-group">
										<input type="text" class="form-control2 filterQuery" filterkey="remarkKey"/>
									</span>
							</div>
                  </div>
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-default" data-dismiss="modal" id="filterSureBtn">确定</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>

    <!--商品种类弹出窗-->
   <div class="modal fade" id="goodsType" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" >
                <div class="modal-header">
                	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"> ×</button>
                    <h4 class="modal-title">商品类别</h4>
                </div>
                <div class="modal-body" style="min-height:300px;max-height:500px;">
                	<ul id="goodsTypeZtree" class="ztree"></ul>
                </div>
                 <div class="modal-footer">
                	<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
       				 <button type="button" class="btn btn-primary" id="saveGoodsType">保存</button>
                </div>
            </div>
        </div>
    </div>
    
   
    <!--盘点详情-->
    <div class="modal fade" id="countMessage" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content"  >
                <div class="modal-header">
                	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"> ×</button>
                    <h4 class="modal-title"><i class="countMessagename"></i>盘点详情</h4>
                </div>
                <div class="modal-body countMbody">
                	<table class="table table-bordered table-condensed" id="countDetails">
                	<thead>
                		<tr>
                		    <th></th>
                			<th>串号</th>
                			<th>盘点状态</th>
                			<th>串号标识</th>
                		</tr>
                	</thead>
                	<tbody>
                	
                	</tbody>
                	</table>
                	<div class="countMtip">图释: <i class="green">√</i>匹配的串号 <i class="red">－</i>盘亏的序列号 <i class="blue">+</i>盘盈的序列号</div>
                </div>
                <div class="modal-footer">
                	<button type="button" class="btn btn-primary " data-dismiss="modal">确定</button>
                	<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
    
    <!--系统库存的模态窗-->
     <div class="modal fade" id="goodsBook" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"> ×</button>
                    <h4 class="modal-title"><i class="goodsBookname"></i>系统库存串号</h4>
                </div>
                <div class="modal-body" style="height:400px;overflow:auto;">
	              <table class="table table-bordered table-condensed" id="goodsBookDetails">
	                	<thead>
	                		<tr>
	                		    <th></th>
	                			<th>串号</th>
	                			<th>辅助串号</th>
	                		</tr>
	                	</thead>
	                	<tbody>
	                		
	                	</tbody>
	                </table>
                </div>
                <div class="modal-footer">
                	<button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                	<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
    
    <!--盘点库存的模态窗-->
     <div class="modal fade" id="countStock" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" style="width: 900px;">
            <div class="modal-content">
                <div class="modal-header">
                	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"> ×</button>
                    <h4 class="modal-title"><i class="countStockname"></i>盘点库存</h4>
                </div>
                <div class="modal-body count-main clearfix">
                	<div class="count-left">
                		<div class="countleft-title">系统库存串号</div>
                		<table class="table table-bordered table-condensed" id="countStockDetails">
		                	<thead>
		                		<tr>
		                		    <th></th>
		                			<th>串号</th>
		                			<th>辅助串号</th>
		                		</tr>
		                	</thead>
		                	<tbody>
		                		
		                	</tbody>
		                </table>
                	</div>
                	<div class="count-right">
	                	<div class="countStocktitle">
	                		<textarea id="imeiTextarea" placeholder="将word、Excel、txt文档中的串号复制粘贴到此处，支持以【空格、逗号、分号（英文格式）】分隔"></textarea>
	                		<button class="btn countStockSave">导入</button>
	                	</div>
	                   	<div>
	                  		<table class="table table-bordered table-condensed" id="imeiTable">
	                  			<thead>
			                		<tr>
			                		    <th></th>
			                		    <th>操作</th>
			                			<th>盘点串号</th>
			                			<th>串号标识</th>
			                		</tr>
		                		</thead>
		                		<tbody>
			                		<tr>
			                		   
			                		</tr>
		                		</tbody>
		                	</table>
	                  	</div>
                  	</div>
                  	
                </div>
                <div class="modal-footer">
                	<button type="button" class="btn btn-primary" id="countImeiSure">确定</button>
                	<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 报损报溢 -->
    <div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content"  style="width:350px;">
                <div class="modal-header">
                	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"> ×</button>
                    <h4 class="modal-title">生成报损报溢</h4>
                </div>
                <div class="modal-body" style="min-height:100px;">
              	<p style="color:red;font-weight:bold;font-size:18px;text-align:center;">(生成报损报溢后将结束此次盘点)</p>
                <p style="text-align:center;">你确定生成报损报溢吗？</p>
                </div>
                <div class="modal-footer">
                	<button type="button" class="btn btn-primary" id="sureTotal">确定</button>
                	<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 报损报溢选择 -->
    <div class="modal fade" id="totalModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content"  style="width:350px;">
                <div class="modal-header">
                	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"> ×</button>
                    <h4 class="modal-title">生成报损报溢</h4>
                </div>
                <div class="modal-body" style="min-height:100px;">
              	<button type="button" class="btn btn-primary btn-lg btn-block" id="lessOrder">报损单</button>
				<button type="button" class="btn btn-primary btn-lg btn-block" id="moreOrder">报溢单</button>
                </div>
                
            </div>
        </div>
    </div>
    <!-- 主表模态窗 -->
     <div class="modal fade" id="countStatusModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content"  style="width:350px;">
             <div class="modal-header">
                 <h5>选择</h5>
             </div>
             <div class="modal-body" style="min-height:100px;">
	               <ul class='list-group' id='statusChoose'>
		               <li class='list-group-item changeBackground' data-mainflag='0'>全部</li>
		               <li class='list-group-item' data-mainflag='1'>盘盈盘亏</li>
		               <li class='list-group-item' data-mainflag='2'>盘盈</li>
		               <li class='list-group-item' data-mainflag='3'>盘亏</li>
	               </ul>
              </div>
              <div class="modal-footer">
              		<button type="button" class="btn btn-primary" id="countStatusSure">确定</button>
                	<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              </div>
            </div>
        </div>
    </div>
    <!-- 盘点状态的模态窗 -->
    
    <div class="modal" id="goodsTip" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-sm">
            <div class="modal-content" >
                <div class="modal-header">
                    <h4 class="modal-title">提示</h4>
                </div>
                <div class="modal-body">
                	数据加载中，请稍后...
                </div>
            </div>
        </div>
    </div>
    <!-- 商品类别加载提示模态窗 -->
    
	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xm.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/select2.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/test/test.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/Storage/jquery.getoption.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/Storage/countOrder.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>














