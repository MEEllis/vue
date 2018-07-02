<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<head>
	<script type="text/javascript" src="${basePath}/js/lib/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="${basePath}/js/lib/ztree-3.5/jquery.ztree.all-3.5.js"></script>
	<script type="text/javascript" src="${basePath}/js/lib/My97DatePicker-4.8/WdatePicker.js"></script>
	<link rel="stylesheet" href="${basePath}/js/lib/ztree-3.5/zTreeStyle/zTreeStyle.css"/>
	<link rel="stylesheet" href="${basePath}/css/ga.css" />
	<script type="text/javascript">
		function deleteStrkOrder(id,pageSize){
			if(confirm('确实要删除该受托入库单吗?')){
				$.ajax({
					type : "post",
					url : "deleteStrkOrder",
					data : {
						"id" : id
					},
					success : function(result){
						if(result.result == 1){
							alert("删除成功!");
							window.location.href = "listStrkOrder";
						}else{
							alert(result.desc);
						}
					}
				});
				
			}
		}
		
		function changePageSize(){
			var pageSize = $("#pageSize").val();
			window.location.href="listStrkOrder?page="+1+"&pageSize="+pageSize;
		}

		function add(){
			window.location.href="view";
		}
	</script>
	<title>受托入库单</title>
</head>

<body>
	<div style="float:left;width: 100%;">
		<div>
			<div style="float:left;">
				<input type="button" value="新增" onclick="add();">
				<div>
					<table>
						<tbody>
							<tr>
								<td class="tdTitle">开始日期:</td>
								<td>
									<input class="Wdate infoInput" name="startDate" type="text" onClick="WdatePicker()" value="">
								</td>
								<td class="tdTitle">结束日期:</td>
								<td>
									<input class="Wdate infoInput" name="endDate" type="text" onClick="WdatePicker()" value="">
								</td>
								<td class="tdTitle">供应商:</td>
								<td>
									<select class="infoInput" id="">
										<option>--请选择--</option>
									</select>
								</td>
								<td class="tdTitle">单据状态:</td>
								<td>
									<select class="infoInput" id="">
										<option>--请选择--</option>
									</select>
								</td>
							</tr>
							<tr>
								<td class="tdTitle">部门名称:</td>
								<td>
									<select class="infoInput" id="">
										<option>--请选择--</option>
									</select>
								</td>
								<td class="tdTitle">采购员:</td>
								<td>
									<select class="infoInput" id="">
										<option>--请选择--</option>
									</select>
								</td>
								<td class="tdTitle">单据编号:</td>
								<td>
									<input class="infoInput" type="text" id=""/>
								</td>
								<td class="tdTitle">单据备注:</td>
								<td>
									<input class="infoInput" type="text" id=""/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				
				<table border="1">
					<thead>
						<tr>
							<th>操作</th>
							<th>单据编号</th>
							<th>入库日期</th>
							<th>部门名称</th>
							<th>供应商</th>
							<th>入库员</th>
							<th>单据金额</th>
							<th>单据状态</th>
							<th>关联订单</th>
							<th>备注</th>
							<th>制单人</th>
							<th>制单时间</th>
							<th>修改人</th>
							<th>修改时间</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${strkOrderList }" var="strkOrder" varStatus="sts">
							<tr>
								<td><input type="checkbox" value=""/></td>
								<td>${strkOrder.id }</td>
								<td>${strkOrder.name }</td>
								<td>${strkOrderType.content}</td>
								<td>${strkOrderFlag.content}</td>
								<td>${strkOrder.url }</td>
								<td>${strkOrder.parentId }</td>
								<td>${strkOrder.status }</td>
								<td>${strkOrder.remark }</td>
								<td>${strkOrder.createUid }</td>
								<td><fmt:formatDate value="${strkOrder.createTime }" pattern="yyyy-MM-dd HH:mm:ss"/>  </td>
								<td>${strkOrder.updateUid }</td>
								<td><fmt:formatDate value="${strkOrder.updateTime }" pattern="yyyy-MM-dd HH:mm:ss"/>  </td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
				
				
				当前第【${page}】页 
				每页显示
				<select id="pageSize" onchange="changePageSize();">
					<option value="10" <c:if test="${pageSize == 10}">selected</c:if>>10</option>
					<option value="20" <c:if test="${pageSize == 20}">selected</c:if>>20</option>
					<option value="50" <c:if test="${pageSize == 50}">selected</c:if>>50</option>
					<option value="100" <c:if test="${pageSize == 100}">selected</c:if>>100</option>
				</select>
				行
				<c:set var="maxPage" value="${pageCount}"></c:set>
				<c:if test="${page==1}" var="isFirstPage"></c:if>
				<c:if test="${page==pageCount}" var="isLastPage"></c:if>
				<c:choose>
					<c:when test="${page == 1 && pageCount == 1}">
						首页
						上一页
						下一页
						尾页
					</c:when>
					<c:when test="${page == 1 && pageCount > 1}">
						首页
						上一页
						<a href="listStrkOrder?page=${page+1}&&pageSize=${pageSize}">下一页</a>
						<a href="listStrkOrder?page=${pageCount}&&pageSize=${pageSize}">尾页</a>
					</c:when>
					<c:when test="${page < pageCount && page > 1}">
						<a href="listStrkOrder?page=1&&pageSize=${pageSize}">首页</a>
						<a href="listStrkOrder?page=${page-1}&&pageSize=${pageSize}">上一页</a>
						<a href="listStrkOrder?page=${page+1}&&pageSize=${pageSize}">下一页</a>
						<a href="listStrkOrder?page=${pageCount}&&pageSize=${pageSize}">尾页</a>
					</c:when>
					<c:otherwise>
						<a href="listStrkOrder?page=1&&pageSize=${pageSize}">首页</a>
						<a href="listStrkOrder?page=${page-1}&&pageSize=${pageSize}">上一页</a>
						下一页
						尾页
					</c:otherwise>
				</c:choose>
				共【${pageCount}】页总计【${totalCount}】记录
			</div>
		</div>
	</div>

</body>
</html>