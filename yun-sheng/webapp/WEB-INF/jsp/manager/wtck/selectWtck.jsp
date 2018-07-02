<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!DOCTYPE html>
<head>
	<title>委托出库单（demo）</title>

	<script type="text/javascript">
		function del(id) {
			var msg = "您真的确定要删除吗？\n\n请确认！";
			if (confirm(msg)){
				window.location.href="wtckDelete?ids="+id;
			}
		}
		function sava() {
				window.location.href="toWtckSava";
		}
	</script>
</head>


<body>
	
	
	
	<form action="receive" method="post">
	<input id="submitButton" name="submitButton" type="submit" value="查询" />
	<input id="input" type="button" value="导入"/>
	<input id="insert" type="button" value="新增" onclick="sava()" />
	<input id="updata" type="button" value="修改" />
	<input id="idte" type="button" value="删除" />
	<input id="guozhang" type="button" value="过账" />
	<input id="hongchong" type="button" value="红冲" />
	<input id="out" type="button" value="导出" />
	<input id="daying" type="button" value="打印" />
		<br/>
		
		供应商：
		<select name="" id="">
			<option value="">	
				--请选择供应商--
			</option>
			<option value="1">
				A供应商
			</option>
			<option value="2">
				B供应商
			</option>
			<option value="3">
				C供应商
			</option>
		</select>
		单据状态：
		<select name="billsStatus" id="billsStatus">
			<option value="">
				--请选择状态--
			</option>
			<option value="41">
				未过账
			</option>
			<option value="42">
				已过账
			</option>
			<option value="40">
				草稿
			</option>
			<option value="43">
				红冲
			</option>
		</select>
		
		部门名称
		<select name="sectionId" id="sectionId">
			<option value="">
				--请选择部门--
			</option>
			<option value="1">
				设计部
			</option>
			<option value="2">
				销售部
			</option>
			<option value="3">
				人事部
			</option>
		</select>
		<br/>
		采购员：
		<select name="managersUid" id="managersUid">
			<option value="">
				--请选择人员--
			</option>
			<option value="1">
				张三
			</option>
			<option value="2">
				李四
			</option>
			<option value="3">
				王五
			</option>
		</select>
		单据编号：
		<input id="billsCode" name="billsCode" type="text" value="" />
		备注：
		<input id="remark" name="remark" type="text" value="" />
		<br/>
		
		
		
		<table border="1">
			<thead>
				<tr>
				<th>ID</th>
					<th>
						操作
					</th>
					<th>
						单据编号
					</th>
					<th>
						入库日期
					</th>

					<th>
						部门名称
					</th>
					<th>
						供应商
					</th>
					<th>
						入库员
					</th>
					<th>
						单据状态
					</th>
					<th>
						关联订单
					</th>
					<th>
						备注
					</th>
					<th>
						制单人
					</th>
					<th>
						制单时间
					</th>
					<th>
						修改人
					</th>
					<th>
						修改时间
					</th>
					<th>
						过账人
					</th>
					<th>
						过账时间
					</th>
					<th>
						红冲人
					</th>
					<th>
						红冲时间
					</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${cghzdList}" var="list" varStatus="status">
					<tr>
						<td>${list.id }</td>
						<td>
						<a href="javascript:void(0);" onclick="del(${list.id });" >删除
						<a href="${path}/manager/wtck/detail?id=${list.id }" >查看详细数据
						</td>
						<td>
							${list.billsCode }
						</td>
						<td>
						<fmt:formatDate value="${list.drDate }"
								pattern="yyyy-MM-dd HH:mm:ss:SSS" />
						</td>

						<td>
							${list.inDepartmentName }
						</td>
						<td></td>
						<td>
							${list.managersUName }
						</td>
						<td>
							${list.billsStatusName }
						</td>
						<td>
							${list.billsCode }
						</td>
						<td>
							${list.remark }
						</td>
						<td>
							${list.createByName }
						</td>
						<td>
							<fmt:formatDate value="${list.createDate }"
								pattern="yyyy-MM-dd HH:mm:ss:SSS" />
						</td>
						<td>
							${list.lastupdateByName }
						</td>
						<td>
							<fmt:formatDate value="${list.lastupdateDate }"
								pattern="yyyy-MM-dd HH:mm:ss:SSS" />
						</td>
						<td>${list.postByName }</td>
						<td>${list.postDate }</td>
						<td>${list.invalidByName }</td>
						<td>${list.invalidDate }</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</form>
	当前第【${page}】页 &nbsp;&nbsp; 共【${pageCount}】页 &nbsp;&nbsp;
	总计【${totalCount}】记录
	<a
		href="${path}/manager/wtck/outstorage?page=1&&pageSize=${pageSize}">首页</a>
	<a
		href="${path}/manager/wtck/outstorage?page=${page-1}&&pageSize=${pageSize}">上一页</a>
	<a
		href="${path}/manager/wtck/outstorage?page=${page+1}&&pageSize=${pageSize}">下一页</a>
	<a
		href="${path}/manager/wtck/outstorage?page=${pageCount}&&pageSize=${pageSize}">尾页</a>

</body>
