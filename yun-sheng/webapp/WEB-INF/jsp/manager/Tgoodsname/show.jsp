<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<!DOCTYPE html>
<head>
	<title>内容页</title>
	<script type="text/javascript" src="../js/lib/jquery-1.7.1.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			//保存
			$('.nav').click(function(){
				var the_url = "save.do";
				$.ajax({
					type : "post",
					url : the_url,
					dataType : "html",
					data : $('#form2').serialize(),
					cache: false,
					async : false,
					success : function(data){
						var obj = eval('(' + data + ')');
						if(obj.result == 1){
							alert(obj.desc);
							window.location.href = "list.do"
						}else{
							alert(obj.desc);
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {   
						alert("XMLHttpRequest.status="+XMLHttpRequest.status+"\nXMLHttpRequest.readyState="+XMLHttpRequest.readyState+"\ntextStatus="+textStatus);
			    	}
				});
			});
		});
	</script>
</head>

<body>
<div>
	<c:if test="${obj.id == null}">
		添加用户信息
	</c:if>
	<c:if test="${obj.id != null}">
		编辑用户信息
	</c:if>
</div>

<form name="form2" id="form2" method="post">
	<table border="1">
		<tr>
			<th>名称</th>
			<td>
				<input type="hidden" name="id" id="id" value="${obj.id }"/>
				<input type="text" name="name" id="name" value="${obj.name }"/>
			</td>
		</tr>
		<tr>
			<th>编码</th>
			<td><input type="text" name="code" id="code" value="${obj.code }" /></td>
		</tr>
		<tr>
			<th>集团</th>
			<td>
				<input type="text" name="groupId" id="groupId" value="${obj.groupId }" />groupName:${obj.groupName }
			</td>
		</tr>
		<tr>
			<th>分类</th>
			<td>
				<input type="text" name="goodsCategoryId" id="goodsCategoryId" value="${obj.goodsCategoryId }" />goodsCategoryName:${obj.goodsCategoryName }
			</td>
		</tr>
		<tr>
			<th>品牌</th>
			<td>
				<input type="text" name="goodsBrandId" id="goodsBrandId" value="${obj.goodsBrandId }" />goodsBrandName:${obj.goodsBrandName }
			</td>
		</tr>
		<tr>
			<th>型号</th>
			<td>
				<input type="text" name="goodsModelId" id="goodsModelId" value="${obj.goodsModelId }" />goodsModelName:${obj.goodsModelName }
			</td>
		</tr>
		<tr>
			<th>颜色</th>
			<td>
				<input type="text" name="goodsColorId" id="goodsColorId" value="${obj.goodsColorId }" />goodsColorName:${obj.goodsColorName }
			</td>
		</tr>
		<tr>
			<th>ifManageImei</th>
			<td>
				<input type="text" name="ifManageImei" id="ifManageImei" value="${obj.ifManageImei }" />
			</td>
		</tr>
		<tr>
			<th>imeiLength</th>
			<td>
				<input type="text" name="imeiLength" id="imeiLength" value="${obj.imeiLength }" />
			</td>
		</tr>
		<tr>
			<th>ifEnableAuxliaryImei</th>
			<td>
				<input type="text" name="ifEnableAuxliaryImei" id="ifEnableAuxliaryImei" value="${obj.ifEnableAuxliaryImei }" />
			</td>
		</tr>
		<tr>
			<th>auxliaryImeiLength</th>
			<td>
				<input type="text" name="auxliaryImeiLength" id="auxliaryImeiLength" value="${obj.auxliaryImeiLength }" />
			</td>
		</tr>
		<tr>
			<th>计价方式</th>
			<td>
				<input type="text" name="valuationMethods" id="valuationMethods" value="${obj.valuationMethods}" />valuationMethodsName:${obj.valuationMethodsName }
			</td>
		</tr>
		<tr>
			<th>税率</th>
			<td><input type="text" name="rate" id="rate" value="${obj.rate }" /></td>
		</tr>
		<tr>
			<th>注释</th>
			<td><input type="text" name="remark" id="remark" value="${obj.remark }" /></td>
		</tr>
		<tr>
			<th>是否启用</th>
			<td><input type="text" name="status" id="status" value="${obj.status }" /></td>
		</tr>
		<tr>
			<th>创建人:</th>
			<td>${obj.createUname }</td>
		</tr>
		<tr>
			<th>创建时间:</th>
			<td><fmt:formatDate value="${obj.createTime }" pattern="yyyy-MM-dd HH:mm"/></td>
		</tr>
		<tr>
			<th>修改人:</th>
			<td>${obj.updateUname }</td>
		</tr>
		<tr>
			<th>修改时间:</th>
			<td><fmt:formatDate value="${obj.updateTime }" pattern="yyyy-MM-dd HH:mm"/></td>
		</tr>
		
		<tr>
			<td colspan="2" align="center"><a href="javascript:void();" class="nav">保存</a></td>
		</tr>
	</table>
</form>

</body>
</html>