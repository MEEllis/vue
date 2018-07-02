<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
	<head>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-treeview.min.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.min.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/zxsaas_plus.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/bills.css"/>
		<script src="${basePath}/js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.query.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/base/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap-treeview.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap-select.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/icheck.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/curdmodal.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			$(function() {
				var pagemodolue = new curdmodal();
				pagemodolue.modouleLoad();
				$(".json").val("{}");
				$(document).on("focusin",".inputboxtable tbody tr:last-child td input",function(){
					var tr=	$(this).parents("tr").clone();
					$(this).parents("tbody").append(tr);
					$(".zxsaastable tbody tr:last-child td:first-child").text($(".zxsaastable tbody tr:last-child td:first-child").text()-1+2);
				});
				
				$(document).on("click","#save",function(){
					var postdata=getinput2json($(".inputbox .form"))
					var postdata1=getinput2json($(".footer .form"))
					var tablelist=[];
					$.each($(".inputboxtable tbody tr"), function(i,item) {
						var tr=getinput2json(item);
						tablelist.push(tr);
					});
	
					postdata["tableList"]=tablelist;
					postdata=$.mergeJsonObject(postdata,postdata1);
					
					console.log(postdata);
				});
	
				$(document).on("focus",".showstockIMEI",function(){
					$("#stockIMEI .rowindex").val($(this).parents("tr").index());
					$("#stockIMEI .prodname font").text($(this).parents("tr").find(".prodname").val());
					$("#stockIMEI").modal("show");
					$("#stockIMEI").find(".zch").focus();
				});
	
				$(document).on("keydown",".zch",function(event){
					if(event.keyCode==13){
	         				$(".fch").focus();
	         			}
				});
				
				$(document).on("keydown",".fch",function(event){
					if(event.keyCode==13){//imei    auxiliary_imei
						var maxnum=$(".snList tbody tr:first-child td:first-child").text();
						if(maxnum==""){maxnum=0;}
	         				$(".snList tbody").prepend("<tr>  <td>"+(maxnum-1+2)+"</td>   <td><input  name='imei' type='text' value='"+$(".zch").val()+"' /></td>   <td><input  name='auxiliary_imei'  type='text' value='"+$(".fch").val()+"' /></td>   </tr>");
	         				$(".zch").val("");
	         				$(".fch").val("");
	         				$(".activeNum font").text($(".snList tbody tr").size());
	         				$(".zch").focus();
	         			}
				});
				
				$(document).on("click",".saveImei",function(){
					var imeilist=[];
					$.each($(".snList tbody tr"), function(i,item) {
						var imeistr=getinput2json($(".snList tbody"));
						imeilist.push(imeistr);
					});
	
	
					$(".inputboxtable tbody ").eq($("#stockIMEI .rowindex").val()).find("input[name='stockIMEI']").val(JSON.stringify(imeilist));
					$("#stockIMEI").modal("hide");
				});
				
				function getinput2json(item){
					var tr={};
					$.each($(item).find("input"),function(j,input){
						if($(input).hasClass("json")){
							tr[$(input).prop("name")]=JSON.parse($(input).val());	
						}else{
							tr[$(input).prop("name")]=$(input).val();
						}
					});
					return tr;
				}
			});
		</script>
		<title>受托入库单</title>
	</head>

	<body >
		<div class="searchbox">
			<div class="btnbox clearfix "></div>
			<div class="inputbox">
				<form class="form">			
					<div class="container-fluid">
						<div class="row">
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"> 单据编号：</span>
  									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="djbh">
								</div>
							</div>
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"> 供应商：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="gys">
								</div>
							</div>
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"> 采购日期：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="djbh">
								</div>
							</div>
							<div class="col-xs-3">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"> 采购员：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="cgy">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"> 供货商余额：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="gysye">
								</div>
							</div>
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"> 部门名称：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="bmmc">
								</div>
							</div>
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"> 店仓名称：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="cdmc">
								</div>
							</div>
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1"> 单备注：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="dbz">
								</div>
							</div>
						</div>
					</div>
				</form>	
			</div>	
		</div>	
		
		<div class="grp_table">
			<table class="zxsaastable inputboxtable">
				<thead>
					<tr>
						<th>行号</th>
						<th>操作</th>
						<th>店仓名称</th>
						<th>商品名称</th>
						<th>数量</th>
						<th>含税单价</th>
						<th>含税金额</th>
						<th>单价</th>
						<th>金额</th>
						<th>折后金额</th>
						<th>折扣金额</th>
						<th>税率</th>
						<th>税额</th>
						<th>备注</th>
					</tr>
				</thead>
				
				<tbody>
					<tr>
						<td>1</td>
						<td><i class="iconfont icon-lajitong"></i><i class="iconfont icon-add"></i></td>
						<td><input type="text" name="ck" data-src=""/></td>
						<td><input type="text" name="cp" class="prodname" data-src=""/></td>
						<td>
							<input type="text" name="sl" class="showstockIMEI"  data-src=""/>
							<input type="hidden" name="stockIMEI" class="json" value=""/>
						</td>
						<td><input type="text" name="hsdj" data-src=""/></td>
						<td><input type="text" name="hsjr" data-src=""/></td>
						<td><input type="text" name="dj" data-src=""/></td>
						<td><input type="text" name="je" data-src=""/></td>
						<td><input type="text" name="zkl" data-src=""/></td>
						<td><input type="text" name="zkje" data-src=""/></td>
						<td><input type="text" name="sl" data-src=""/></td>
						<td><input type="text" name="se" data-src=""/></td>
						<td><input type="text" name="bz" data-src=""/></td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<div class="container-fluid mt20 footer">
			<form class="form">	
				<div class="row">
					<div class="col-xs-2 ">
						<div class="input-group">
							<span class="input-group-addon" id="basic-addon1"> 付款方式：</span>
							<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="fkfs">
						</div>
					</div>
					<div class="col-xs-2 ">
						<div class="input-group">
							<span class="input-group-addon" id="basic-addon1"> 应付金额：</span>
							<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="yfje">
						</div>
					</div>
					<div class="col-xs-2 ">
						<div class="input-group">
							<span class="input-group-addon" id="basic-addon1"> 未付金额：</span>
							<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="wfje">
						</div>
					</div>
					<div class="col-xs-2">
						<div class="input-group">
							<span class="input-group-addon" id="basic-addon1"> 整单折扣：</span>
							<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="zdzk">
						</div>
					</div>
					<div class="col-xs-2 ">
						<div class="input-group">
							<span class="input-group-addon" id="basic-addon1"> 折后金额：</span>
							<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
						</div>
					</div>
				</div>
			</form>
		</div>
		
		<button type="button" id="save">保存</button>

		<div class="modal fade editbox" id="stockIMEI">
			<div class="modal-dialog" style="width: 800px;">
				<div class="modal-content">
					<form id="menuAdminForm" class="form">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title">串号管理</h4>
						</div>
						<div class="modal-body">
							<div class="container-fluid snAdminTitle">
								<input type="hidden" class="rowindex" />
								<div class="row">
									<div class="col-xs-3 prodname">
										商品名称：<font></font>
									</div>
									<div class="col-xs-3 ">
										应入数量：<input type="text" name="numModal" value="0" class="number form-control" />
									</div>
									<div class="col-xs-3 activeNum">
										当前数量：<font>0</font>
									</div>
									<div class="col-xs-3 ">
										<div class="input-group">
											<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="djbh">
											<span class="input-group-addon" id="basic-addon1"><i class="iconfont icon-fangdajing"></i></span>
										</div>	
									</div>
								</div>
								<div class="row">
									<div class="col-xs-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">主串号</span>
											<input type="text" class="form-control zch" placeholder="输入主串号后按“ENter”键保存" aria-describedby="basic-addon1" name="zch">
										</div>
									</div>
									<div class="col-xs-6">
										<div class="input-group">
											<span class="input-group-addon" id="basic-addon1">辅串号</span>
											<input type="text" class="form-control fch" placeholder="输入辅串号后按“ENter”键保存" aria-describedby="basic-addon1" name="fch">
										</div>
									</div>
								</div>
								<div class="row tablebox">
									<table class="zxsaastable snList">
										<thead>
											<th style="width: 100px">序号</th>
											<th style="width: 350px">主串号</th>
											<th style="width: 350px">辅助串号</th>
										</thead>
										<tbody>
										</tbody>
         							</table>
								</div>
							</div>
						</div>
						<div class="modal-footer text-center">
							<button type="button" class="btn btn-primary saveImei">保存</button>
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</body>
</html>