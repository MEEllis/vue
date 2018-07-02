<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../Include/Header.jsp"%>

		<script type="text/javascript">
			$(function() {
				$(".json").val("{}");
				$(document).on("focusin", ".inputboxtable tbody tr:last-child td input", function() {
					var tr = $(this).parents("tr").clone();
					$(this).parents("tbody").append(tr);
					$(".zxsaastable tbody tr:last-child td:first-child").text($(".zxsaastable tbody tr:last-child td:first-child").text() - 1 + 2);
				});

				$(document).on("click", ".save", function() {
					var postdata = getinput2json($(".inputbox .form"));
					var postdata1 = getinput2json($(".footer .form"));
					var tablelist = [];
					$.each($(".inputboxtable tbody tr"), function(i, item) {
						if($(item).find("input[name='goodsId']").val() == "") {
							//$(item).remove();
						} else {
							var tr = getinput2json(item);
							tablelist.push(tr);
						}
					});

					postdata["tableList"] = tablelist;
					postdata = $.mergeJsonObject(postdata, postdata1);
			
					var the_url = "wtckSave.do";
					$.ajax({
					type : "post",
					url : the_url,
					data :{data:JSON.stringify(postdata)},
					cache: false,
					async : false,
					success : function(data){
						if(data.result == 1){
							alert("保存成功");
							window.location.href = "outstorage.do"
						}else{
							alert("保存失败");
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {   
						alert("XMLHttpRequest.status="+XMLHttpRequest.status+"\nXMLHttpRequest.readyState="+XMLHttpRequest.readyState+"\ntextStatus="+textStatus);
			    	}
				});
					console.log(postdata);
				});

				$(document).on("focus", ".showstockIMEI", function() {
				var stockIMEIstr=JSON.parse($(this).nextAll("input[name='stockIMEI']").val());
				//console.log(stockIMEIstr);
				$(".snList tbody tr").remove();
				$.each(stockIMEIstr,function(i,item){
					$(".snList tbody").prepend("<tr>  <td>" + (i+1) + "</td>   <td><input  name='imei' type='text' value='" +item.imei + "' /></td>   <td><input  name='auxiliary_imei'  type='text' value='" + item.auxiliary_imei + "' /></td>   </tr>");
								});
						
					$("#stockIMEI .rowindex").val($(this).parents("tr").index());
					$("#stockIMEI .prodname font").text($(this).parents("tr").find(".prodname").val());
					
					$("#stockIMEI").modal("show");
					$("#stockIMEI").find(".zch").focus();
				});

				$(document).on("keydown", ".zch", function(event) {
					if(event.keyCode == 13) {
						$(".fch").focus();
					}
				});

				$(document).on("keydown", ".fch", function(event) {
					if(event.keyCode == 13) { //imei    auxiliary_imei
						var maxnum = $(".snList tbody tr:first-child td:first-child").text();
						if(maxnum == "") {
							maxnum = 0;
						}
						$(".snList tbody").prepend("<tr>  <td>" + (maxnum - 1 + 2) + "</td>   <td><input  name='imei' type='text' value='" + $(".zch").val() + "' /></td>   <td><input  name='auxiliary_imei'  type='text' value='" + $(".fch").val() + "' /></td>   </tr>");
						$(".zch").val("");
						$(".fch").val("");
						$(".activeNum font").text($(".snList tbody tr").size());
						$(".zch").focus();
					}
				});

				$(document).on("click", ".saveImei", function() {
					var imeilist = [];
					$.each($(".snList tbody tr"), function(i, item) {
						var imeistr = getinput2json($(".snList tbody"));
						imeilist.push(imeistr);
					});

					$(".inputboxtable tbody tr").eq($("#stockIMEI .rowindex").val()).find("input[name='stockIMEI']").val(JSON.stringify(imeilist));
					$("#stockIMEI").modal("hide");
				});
				$(document).on("click", ".btnbox .pull-right", function() {

					$(this).toggleClass("hideinputbox");
					$(this).parents(".searchbox").find(".inputbox").toggle();
				});

				function getinput2json(item) {
					var tr = {};
					$.each($(item).find("input"), function(j, input) {
						if($(input).hasClass("json") && $(input).val() != "") {
							tr[$(input).prop("name")] = JSON.parse($(input).val());
						} else {
							tr[$(input).prop("name")] = $(input).val();
						}
					});
					return tr;
				}
			});
		</script>
	</head>
	<body>
		<div class="searchbox">
			<div class="btnbox clearfix ">
				<a class="save">保存</a>

				<a class="pull-right"><i class="iconfont icon-xia"></i><i class="iconfont icon-shang"></i></a>
			</div>
			<div class="inputbox">
				<form class="form">
				<!-- 设置单据为正常单据前端设置 草稿对应code为1,未过账对应code为0 -->
				<input type="hidden" name="flag" value="0">
				<!--<input type="hidden" name="flag" value="1"> -->
					<div class="container-fluid">
						<div class="row">
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon input-group-title" id="basic-addon1"> 单据编号：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="billsCode">
								</div>
							</div>
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon input-group-title" id="basic-addon1"> 采购日期：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="billsDate">
								</div>
							</div>
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon input-group-title" id="basic-addon1"> 部门名称：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="inDepartmentId">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-3">
								<div class="input-group">
									<span class="input-group-addon input-group-title" id="basic-addon1"> 采购员：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="managersUid">
								</div>
							</div>
							<div class="col-xs-3 ">
								<div class="input-group">
									<span class="input-group-addon input-group-title" id="basic-addon1"> 单备注：</span>
									<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="remark">
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
						<th>单价</th>
						<th>金额</th>
						<th>备注</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>1</td>
						<td><i class="iconfont icon-lajitong"></i><i class="iconfont icon-add"></i></td>
						<td><input type="text" name="storageId"  /></td>
						<td><input type="text" name="goodsId" class="prodname"  /></td>
						<td>
							<input type="text" name="goodsNumber" class="showstockIMEI"  />
							<input type="hidden" name="stockIMEI" class="json" value="[{'zch'：'111111'},{'zch'：'111111'},{'zch'：'111111'},{'zch'：'111111'}]" />
						</td>
						</td><td><input type="text" name="taxPrice"  /></td>
						<td><input type="text" name="taxAmount"  /></td>
						<td><input type="text" name="remark"  />
					</tr>
				</tbody>
			</table>
		</div>

		<div class="container-fluid mt20 footer">
			<form class="form">
				<div class="row">
					<div class="col-xs-2 ">
						<div class="input-group">
							<span class="input-group-addon input-group-title" id="basic-addon1"> 付款方式：</span>
							<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="fkfs">
						</div>
					</div>
					<div class="col-xs-2 ">
						<div class="input-group">
							<span class="input-group-addon input-group-title" id="basic-addon1"> 应付金额：</span>
							<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="yfje">
						</div>
					</div>
					<div class="col-xs-2 ">
						<div class="input-group">
							<span class="input-group-addon input-group-title" id="basic-addon1"> 未付金额：</span>
							<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="wfje">
						</div>
					</div>
					<div class="col-xs-2">
						<div class="input-group">
							<span class="input-group-addon input-group-title" id="basic-addon1"> 整单折扣：</span>
							<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="zdzk">
						</div>
					</div>
					<div class="col-xs-2 ">
						<div class="input-group">
							<span class="input-group-addon input-group-title"  id="basic-addon1"> 折后金额：</span>
							<input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
						</div>
					</div>
				</div>
			</form>
		</div>

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
										商品名称：
										<font></font>
									</div>
									<div class="col-xs-3 ">
										应入数量：<input type="text" name="numModal" value="0" class="number form-control" />
									</div>
									<div class="col-xs-3 activeNum">
										当前数量：
										<font>0</font>
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
											<span class="input-group-addon input-group-title" id="basic-addon1">主串号</span>
											<input type="text" class="form-control zch" placeholder="输入主串号后按“ENter”键保存" aria-describedby="basic-addon1" name="zch">
										</div>
									</div>
									<div class="col-xs-6">
										<div class="input-group">
											<span class="input-group-addon input-group-title" id="basic-addon1">辅串号</span>
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