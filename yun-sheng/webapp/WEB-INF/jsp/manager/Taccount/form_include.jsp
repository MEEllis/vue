<%@page import="com.zx.soft.model.*" %>
<%@ page contentType="text/html;charset=UTF-8" %>

	<input type="hidden" id="id" name="id" value="${id}"/>


	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span>集团ID:
		</td>		
		<td>
		<input path="account.groupId" id="groupId" name="groupId" value="${account.groupId}" cssClass="groupId " maxlength="16" />
		<font color='red'><form:errors path="groupId"/></font>
		</td>
	</tr>	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span>公司ID:
		</td>		
		<td>
		<input path="account.companyId" id="companyId" name="companyId" value="${account.companyId}" cssClass="companyId " maxlength="64" />
		<font color='red'><form:errors path="companyId"/></font>
		</td>
	</tr>	
	
	<tr>	
		<td class="tdLabel">
			账户编码:
		</td>		
		<td>
		<input path="account.code" id="code" name="code" value="${account.code}" cssClass="code " maxlength="16" />
		<font color='red'><form:errors path="code"/></font>
		</td>
	</tr>	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span>账户类型ID:
		</td>		
		<td>
		<input path="account.accounTypeId" id="accounTypeId" name="accounTypeId" value="${account.accounTypeId}" cssClass="layerCode " maxlength="16" />
		</td>
	</tr>	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span>银行名称ID:
		</td>		
		<td>
		<input path="account.bankNameIdid"  id="bankNameIdid" name="bankNameIdid" value="${account.bankNameIdid}" cssClass="bankNameIdid " maxlength="64" />
		<font color='red'><form:errors path="bankNameIdid"/></font>
		</td>
	</tr>	
	
	<tr>	
		<td class="tdLabel">
			开户名称:
		</td>		
		<td>
		<input path="account.accountHolder" id="accountHolder" name="accountHolder" value="${account.accountHolder}" cssClass="accountHolder " maxlength="64" />
		<font color='red'><form:errors path="accountHolder"/></font>
		</td>
	</tr>	
	
	<tr>	
		<td class="tdLabel">
			<span class="required">*</span>账户名称:
		</td>		
		<td>
		<input path="account.name" id="name" name="name" value="${account.name}" cssClass="name " maxlength="64" />
		<font color='red'><form:errors path="name"/></font>
		</td>
	</tr>	
	

	
	<tr>	
		<td class="tdLabel">
			银行卡号:
		</td>		
		<td>
		<input path="account.bankCard" id="bankCard" name="bankCard" value="${account.bankCard}" cssClass="bankCard " maxlength="64" />
		<font color='red'><form:errors path="bankCard"/></font>
		</td>
	</tr>	
	<tr>	
		<td class="tdLabel">
			刷卡手续费:
		</td>		
		<td>
		<input path="account.swipeFees" id="swipeFees" name="swipeFees" value="${account.swipeFees}" cssClass="swipeFees " maxlength="64" />
		<font color='red'><form:errors path="swipeFees"/></font>
		</td>
	</tr>
	<tr>	
		<td class="tdLabel">
			刷卡最高额:
		</td>		
		<td>
		<input path="account.swipeHighLines" id="swipeHighLines" name="swipeHighLines" value="${account.swipeHighLines}" cssClass="swipeHighLines " maxlength="64" />
		<font color='red'><form:errors path="swipeHighLines"/></font>
		</td>
	</tr>
	<tr>	
		<td class="tdLabel">
			刷卡手续费顶额:
		</td>		
		<td>
		<input path="account.swipeFeesHigh" id="swipeFeesHigh" name="swipeFeesHigh" value="${account.swipeFeesHigh}" cssClass="swipeFeesHigh " maxlength="64" />
		<font color='red'><form:errors path="swipeFeesHigh"/></font>
		</td>
	</tr>
	<tr>	
		<td class="tdLabel">
			刷卡最低额:
		</td>		
		<td>
		<input path="account.swipeLowLines" id="swipeLowLines" name="swipeLowLines" value="${account.swipeLowLines}" cssClass="updateUser " maxlength="64" />
		<font color='red'><form:errors path="updateUser"/></font>
		</td>
	</tr>
	<tr>	
		<td class="tdLabel">
			最低手续费:
		</td>		
		<td>
		<input path="account.swipeFeesLow" id="swipeFeesLow" name="swipeFeesLow" value="${account.swipeFeesLow}" cssClass="swipeFeesLow " maxlength="64" />
		<font color='red'><form:errors path="swipeFeesLow"/></font>
		</td>
	</tr>
	<tr>	
		<td class="tdLabel">
			启用标志（启用/不启用）:
		</td>		
		<td>
				<select name="status" id="status">
					<option value="1" <c:if test="${account.status}">selected="selected"</c:if>>启用</option>*
					<option value="0" <c:if test="${!account.status}">selected="selected"</c:if>>禁用</option>
				</select>
			</td>
	</tr>
	<tr>	
		<td class="tdLabel">
			备注:
		</td>		
		<td>
		<input path="account.remark" id="remark" name="remark" value="${account.remark}" cssClass="remark " maxlength="64" />
		<font color='red'><form:errors path="remark"/></font>
		</td>
	</tr>



