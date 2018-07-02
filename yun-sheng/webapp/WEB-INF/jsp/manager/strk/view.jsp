<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript" src="${basePath}/js/lib/jquery-1.7.1.js"></script>
<script type="text/javascript"
	src="${basePath}/js/lib/jquery.validate.js"></script>
<script type="text/javascript" src="${basePath}/js/lib/messages_zh.js"></script>
<script type="text/javascript"
	src="${basePath}/js/lib/My97DatePicker-4.8/WdatePicker.js"></script>
<link rel="stylesheet" href="${basePath}/css/ga.css" />
<script type="text/javascript">
	/**
	保存
	*/
	function save(){
		$.ajax({
			url : "ajaxSave",
			type : "post",
			data : {
				data:"order001"
			},
			success : function(result){
				if(result.result == 1){
					alert("保存成功");
				}else{
					alert(result.desc);
				}
			},
			error : function(){
				alert("保存出错!");
			}
		});
	}
	/*
	调取草稿
	*/
	function getDraft(){
		$.ajax({
			url : "ajaxGetDraft",
			type : "post",
			data : {
				"billsCode":"STRK201607230009"
			},
			success : function(result){
				if(result.result == 1){
					alert("调取成功");
				}else{
					alert(result.desc);
				}
			},
			error : function(){
				alert("调取出错!");
			}
		});
	}
	/*过账*/
	function doPost(){
		$.ajax({
			url : "ajaxPost",
			type : "post",
			data : {
				"id":"6"
			},
			success : function(result){
				if(result.result == 1){
					alert("过账成功");
				}else{
					alert(result.desc);
				}
			},
			error : function(){
				alert("过账出错!");
			}
		});
	}
	/*红冲*/
	function doReturn(){
		$.ajax({
			url : "ajaxReturn",
			type : "post",
			data : {
				"id":"6"
			},
			success : function(result){
				if(result.result == 1){
					alert("红冲成功");
				}else{
					alert(result.desc);
				}
			},
			error : function(){
				alert("红冲出错!");
			}
		});
	}
	/*删除*/
	function doDelete(){
		$.ajax({
			url : "ajaxDelete",
			type : "post",
			data : {
				"id":"6"
			},
			success : function(result){
				if(result.result == 1){
					alert("删除成功");
				}else{
					alert(result.desc);
				}
			},
			error : function(){
				alert("删除出错!");
			}
		});
	}
</script>

<rapid:override name="head">
	<c:if test="${id == null}">
		<title>受托入库新增</title>
	</c:if>
	<c:if test="${id != null}">
		<title>受托入库修改</title>
	</c:if>
</rapid:override>

<rapid:override name="content">
	<div>
		<div id="treeDemoRoles" style="float:left;width:500px">
			<ul id="treeDemo" class="ztree"></ul>
		</div>
		<div style="float:left;">
			<form id="dataForm" action="" method="post">
				<input type="hidden" name="id" value="${id}">
				<table style="border-style: dashed">
					<tbody>
						<tr>
							<td class="tdTitle">单据编号：</td>
							<td class="infoInput">0001</td>
							<td class="tdTitle">
								供应商:
							</td>
							<td>
								<select class="infoInput" id="contactsunitId" name="contactsunitId">
									<option value="">--请选择--</option>
									<c:forEach items="${allSuppliers}" var="supplier" varStatus="status">
										<option value="${supplier.id }" <c:if test="${billsMain.contactsunitId == supplier.id }">selected="selected"</c:if> >${supplier.name }</option>
									</c:forEach>
								</select>
							</td>
							<td class="tdTitle">入库日期：</td>
							<td>
								<input class="Wdate infoInput" name="billsDate" type="text" onClick="WdatePicker()" value="">
							</td>
							<td class="tdTitle">
								采购员:
							</td>
							<td>
								<select class="infoInput" id="managersUid" name="managersUid">
									<option value="">--请选择--</option>
									<c:forEach items="${buyerList}" var="buyer" varStatus="status">
										<option value="${buyer.id }" <c:if test="${billsMain.managersUid == buyer.id }">selected="selected"</c:if> >${buyer.name }</option>
									</c:forEach>
								</select>
							</td>
						</tr>
						<tr>
							<td class="tdTitle">
								供应商余额:
							</td>
							<td>
								0
							</td>
							<td class="tdTitle">
								部门名称:
							</td>
							<td>
								${sectionName }
							</td>
							<td class="tdTitle">
								店仓名称:
							</td>
							<td>
								<select class="infoInput" >
									<option value="">--请选择--</option>
									<c:forEach items="${storageList}" var="storage" varStatus="status">
										<option value="${storage.id }" >${storage.name }</option>
									</c:forEach>
								</select>
							</td>
							<td class="tdTitle">
								单备注:
							</td>
							<td>
								<input class="infoInput" name="remark" value="${billsMain.remark }" />
							</td>
						</tr>
					</tbody>
				</table>
				入库商品信息：
				<table style="border: 1px;border-style: solid">
					<tbody>
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
						<tr>
							<td>1</td>
							<td>操作区</td>
							<td><input type="text"></td>
							<td>
								<select id="goods">
									<c:forEach items="${goodsList}" var="goods">
										<option value="${goods.id }">${goods.name }</option>
									</c:forEach>
								</select>
							</td>
							<td><input type="text"></td>
							<td><input type="text"></td>
							<td><input type="text"></td>
							<td><input type="text"></td>
						</tr>
						<tr>
							<td>2</td>
							<td>操作区</td>
							<td><input type="text"></td>
							<td>
								<select id="goods">
									<c:forEach items="${goodsList}" var="goods">
										<option value="${goods.id }">${goods.name }</option>
									</c:forEach>
								</select>
							</td>
							<td><input type="text"></td>
							<td><input type="text"></td>
							<td><input type="text"></td>
							<td><input type="text"></td>
						</tr>
						<tr>
							<td>3</td>
							<td>操作区</td>
							<td><input type="text"></td>
							<td>
								<select id="goods">
									<c:forEach items="${goodsList}" var="goods">
										<option value="${goods.id }">${goods.name }</option>
									</c:forEach>
								</select>
							</td>
							<td><input type="text"></td>
							<td><input type="text"></td>
							<td><input type="text"></td>
							<td><input type="text"></td>
						</tr>
					</tbody>
				</table>
				
				总金额:<input name="" value="">
		
				<input type="button" value="调出草稿" onclick="getDraft();"/>
				<input type="button" value="导入"/>
				<!-- 
				<input type="button" value="单据引入"/>
				 -->
				<input type="button" value="新增"/>
				<input type="button" value="保存" onclick="save();"/>
				<input type="button" value="删除" onclick="doDelete();"/>
				<input type="button" value="过账" onclick="doPost();"/>
				<input type="button" value="红冲" onclick="doReturn();"/>
				<input type="button" value="打印"/>
				<input type="button" value="返回列表"
					onclick="window.location='listStrk'" />
				<input type="button" value="后退" onclick="history.back();" />
		
			</form>
		</div>
</rapid:override>

