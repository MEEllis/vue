<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" href="${basePath}/css/inventory/finance/businessProcess/voucherManagement.css?v=${version}">
<script src="${basePath}/js/inventory/finance/businessProcess/voucherManagement.js?v=${version}"></script>

<title>凭证管理</title>
<style>
	#rpGrid tr td[aria-describedby="rpGrid_docWord"]{
		color: blue;
		cursor: pointer;
	}
	#jqgh_rpGrid_cb:after{
		content:'全部',

	}
</style>
</head>
<body>
	<header>
		<div id="AUTH" data-code="PZGL"></div>

		<form action="" class="form-inline clearfix" id="searchQuery">
			<div class="actionContainer" style="padding: 0 0 15px 15px;height: 44px;">
				<button type="button" class="btn" id="B_PZGL_0001">新增</button>
				<button type="button" class="btn" id="B_PZGL_0002">审核</button>
				<button type="button" class="btn" id="B_PZGL_0003">弃审</button>
				<button type="button" class="btn" id="B_PZGL_0004">删除</button>
				<div class="btn-group" role="group">
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						操作
						<span class="caret"></span>
					</button>
					<ul class="dropdown-menu actionBox" style="text-align: center">
						<li id="B_PZGL_0006">复制</li>
						<li id="B_PZGL_0007">冲销</li>
						<li id="B_PZGL_0008">作废</li>
						<li id="B_PZGL_0009">取消作废</li>
						<li id="B_PZGL_0010">出纳签字</li>
						<li id="B_PZGL_0011">取消出纳签字</li>
						<li id="B_PZGL_0012">主管签字</li>
						<li id="B_PZGL_0013">取消主管签字</li>
						<li id="B_PZGL_0014">标错</li>
						<li id="B_PZGL_0015">取消标错</li>
						<li id="B_PZGL_0016">断号整理</li>
					</ul>
				</div>
				<%--<div class="btn-group" role="group">--%>
					<%--<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">--%>
						<%--打印--%>
						<%--<span class="caret"></span>--%>
					<%--</button>--%>
					<%--<ul class="dropdown-menu">--%>
						<%--<li>打印列表</li>--%>
						<%--<li>打印选中</li>--%>
						<%--<li>批量打印</li>--%>

					<%--</ul>--%>
				<%--</div>--%>
				<button type="button" class="btn" id="export">导出</button>
				<button type="button" class="btn" id="print">凭证打印</button>
			</div>

			<div class="form-group col-sm-4">

				<label for="creatDate" style="width: 77px;">
					<div class="input-group">
						<input type="radio" id="creatDate" name="timeSection" checked>
					</div>
					凭证日期:
				</label>
				<div class="input-group col-sm-4">
					<input type="text" class="form-control" name="billsBeginDateStr" id="startDate" readonly placeholder="请选择开始日期">
				</div>
				--
				<div class="input-group col-sm-4">
					<input type="text" class="form-control" name="billsEndDateStr" id="endDate" readonly placeholder="请选择结束日期">
				</div>
			</div>

			<div class="form-group col-sm-4">

				<label for="startPeriod" class="width-25">
					<div class="input-group">
						<input type="radio" id="accountingPeriod" name="timeSection">
					</div>
					会计期间:
				</label>
				<div class="input-group col-sm-4">
					<input type="text" class="form-control " name="billsBeginDateStr" id="startPeriod" readonly disabled placeholder="请选择开始日期">

				</div>

				--
				<div class="input-group col-sm-4">
					<input type="text" class="form-control" name="billsEndDateStr" id="endPeriod" readonly disabled placeholder="请选择结束日期">
				</div>
			</div>

			<div class="form-group col-sm-4">
				<label for="startNum" class="width-25">凭证编号:</label>
				<div class="input-group col-sm-4">
					<input type="text" class="form-control" name="billsBeginDateStr" id="startNum" onkeyup="this.value=this.value.replace(/\D/g,'')">
				</div>
				--
				<div class="input-group col-sm-4">
					<input type="text" class="form-control" name="billsEndDateStr" id="endNum" onkeyup="this.value=this.value.replace(/\D/g,'')">
				</div>
			</div>

			<div class="form-group col-sm-4">
				<label  style="width: 77px;">审核状态:</label>
				<label  class="input-group">
					<input type="radio" checked  name="auditState" value="">
					全部
				</label>
				<label  class="input-group">
					<input type="radio"  name="auditState" value="1">
					已审核
				</label>
				<label  class="input-group">
					<input type="radio"  name="auditState" value="0">
					未审核
				</label>
			
				<label></label>
			</div>

			<div class="form-group col-sm-4">
				<label  class='width-25'>流量分配:</label>
				<label  class="input-group">
					<input type="radio" checked  name="flowAllocating" value="">
					全部
				</label>
				
				<label  class="input-group">
					<input type="radio"  name="flowAllocating" value="1">
					已分配
				</label>
				<label  class="input-group">
					<input type="radio"  name="flowAllocating" value="0">
					未分配
				</label>
				
			</div>
			<span id='moreTermList'>
				<div class="form-group col-sm-4">
					<label  class='width-25'>记账状态:</label>
					
					
					<label class="input-group">
						<input type="radio" checked  name="chargeState" value="">
						全部
					</label>
					
					<label class="input-group">
						<input type="radio"  name="chargeState" value="1">
						已记账
					</label>
					
					<label class="input-group">
						<input type="radio"  name="chargeState" value="0">
						未记账
					</label>
				</div>



				<div class="form-group col-sm-4">
					<label  style="width: 77px;">方向:</label>
					<label class="input-group">
						<input type="radio" checked name="directionState" value="">
						全部
					</label>
					<label class="input-group">
						<input type="radio"  name="directionState" value="1">
						借方
					</label>
					<label class="input-group">
						<input type="radio"  name="directionState" value="0">
						贷方
					</label>
				</div>

				<div class="form-group col-sm-4">
					<label  class='width-25'>作废状态:</label>
					<label class="input-group">
						<input type="radio" checked  name="cancellationState" value="">
						全部
					</label>
					<label class="input-group">
						<input type="radio"  name="cancellationState" value="1">
						已作废
					</label>
					<label class="input-group">
						<input type="radio"  name="cancellationState" value="0">
						未作废
					</label>
				</div>

				<div class="form-group col-sm-4">
					<label  class='width-25'>标错状态:</label>
					<label class="input-group">
						<input type="radio" checked  name="wrongState" value="">
						全部
					</label>
				
					<label class="input-group">
						<input type="radio"  name="wrongState" value="1">
						已标错
					</label>
					<label class="input-group">
						<input type="radio"  name="wrongState" value="0">
						未标错
					</label>
				</div>
				<div class="form-group col-sm-4">
					<label for="startMoney" style="width: 77px;">金额:</label>
					<div class="input-group col-sm-4">
						<input type="text" class="form-control" name="money" id="startMoney" onkeyup="getnum(this)">
					</div>
					--
					<div class="input-group col-sm-4">
						<input type="text" class="form-control" name="billsEndDateStr" id="endMoney" onkeyup="getnum(this)">
					</div>
				</div>

				<div class="form-group col-sm-4">
					<label for="voucherFrom" class='width-25'>凭证来源:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="voucherFrom" placeholder="请选择凭证来源">
					</div>
				</div>

				<div class="form-group col-sm-4">
					<label for="operatingDepartment" class='width-25'>业务部门:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="operatingDepartment" placeholder="请选择业务部门">
					</div>
				</div>

				<div class="form-group col-sm-4">
					<label for="contactsUnitName" style="width: 77px;">往来单位:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="contactsUnitName" placeholder="请选择往来单位">
					</div>
				</div>

				<div class="form-group col-sm-4">
					<label for="auxiliaryDepartment" class='width-25'>辅助部门:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="auxiliaryDepartment" placeholder="请选择辅助部门">
					</div>
				</div>

				<div class="form-group col-sm-4">
					<label for="employee" class='width-25'>职员:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="employee" placeholder="请选择职员">
					</div>
				</div>

				<div class="form-group col-sm-4">
					<label for="OperatorBusinessInput" style="width: 77px;">制单人:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="OperatorBusinessInput" placeholder="请选择制单人">
					</div>
				</div>

			    <%--<div class="form-group col-sm-4">--%>
			      <%--<div class="checkbox" style="margin-left:10%;line-height: 34px;">--%>

				    <%--<label>--%>
				      <%--<input type="checkbox" class="ifContainsDisable" style="float: left;margin: 11px 5px;"> 显示禁用信息--%>
				    <%--</label>--%>
				  <%--</div>--%>
			    <%--</div>--%>
		    </span>
			<div class="form-group col-sm-4">
				<span style="margin-left:10%;"></span>
				<button type="button" class="btn btn-primary mr15 actionBtn" id="search">查询</button>
				<button type="button" class="btn btn-default reset mr15 actionBtn" onclick='resetFun()'>重置</button>
				<%--<span class="explain">说明</span>--%>
				<%--<div class="explainBox">--%>
					<%--1、列出零售业务单据涉及到的收款结算信息</br>--%>
					<%--2、点击“单据编号”或双击行可查看单据详细信息</br>--%>
				<%--</div>--%>
			</div>
			<%--<div class="cb" ></div>--%>

			<div class="moreTerm">
				更多条件<span class="moreTermIconUp moreTermIcon"></span><span class="moreTermIconDown moreTermIcon"></span>
			</div>

		</form>

	</header>

	<div id="promptBox">
		<div class="checkImgBox">
			<img src="${basePath}/images/inventory/common/checkImg.png"/>
			<h2 >输入条件后,点击查询吧!</h2>
		</div>
		<%--<div class="explainImgBox" style="background:url('${basePath}/images/inventory/common/explain.png') no-repeat center center;background-size:contain;">--%>
			<%--1、对零售业务涉及到的“运营商业务”数据进行汇总，并提供多种系统预置方案</br>--%>
		<%--</div>--%>

	</div>

	<div class="loadingImgBox none" style="background:url('${basePath}/images/inventory/common/loading.gif') no-repeat center center;background-size:contain;"></div>
	<div class="notFounImgBox none" >
		<img src="${basePath}/images/inventory/common/notFoun.png" alt="">
	</div>


	<div id="rpContainer">
		<%--<div class="funBtnBox">--%>
			<%--<button type="button" class="btn btn-default mr15 export"><span class="iconBox exportIconBox" style="background:url('${basePath}/images/common/export_icon.png') no-repeat center center;background-size:contain;"></span>导出</button>--%>
			<%--<!--<button type="button" class="btn btn-default mr15 print"><span class="iconBox printIconBox"  style="background:url('${basePath}/images/common/print_icon.png') no-repeat center center;background-size:contain;"></span>打印</button>--%>
				 <%----><button type="button" class="btn btn-default mr15 lineSet"><span class="iconBox lineSetIconBox" style="background:url('${basePath}/images/common/lineSet_icon.png') no-repeat center center;background-size:contain;"></span>列设置</button>--%>
		<%--</div>--%>
		<%--<div class='gridTitle'>运营商业务明细</div>--%>
		<ul id="gridType" class="clearfix">
			<li class="activeType fl" value="1">全部凭证</li>
			<li class="fl" value="2">待审核</li>
			<li class="fl" value="3">待出纳签字</li>
			<li class="fl" value="4">待主管签字</li>
			<li class="fl" value="5">待记账</li>
			<li class="fl" value="6">有错凭证</li>
		</ul>
		<div class="checkBoxInfo none">
			<div class="checkinfoBox">
				已勾选<span class="checkLen"> </span> 行 <span class="checkAllBox none">,<span class="checkAllInfo">勾选本条件下 <span class="checkAllLen"></span> 行</span></span>
			</div>
			<span class="hasCheckedBox none">已勾选全部 <span class="checkAllLen"></span> 行 ，<span class="qxCheckBox"><span class="qxCheck">取消勾选</span></span></span>
		</div>
		<table id="rpGrid"></table>
		<div id="rpGridPager"></div>
	</div>


	<div id="lineSet-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">列设置</h4>
				</div>
				<div class="modal-body" style="width:600px;">
					<table id='lineSetGrid'></table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default sureLineSet" data-dismiss="modal" onclick="sureLineSet()">确认</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal" id="delModal" data-keyboard="true" data-backdrop="true">
		<div class="modal-dialog"  >
			<div class="modal-content" >
				<div class="modal-header">
					<h4 class="modal-title">
						提示
					</h4>
				</div>
				<div class="modal-body" style="width: 600px;">
					<div class="delBox none">
						删除后凭证无法恢复，确定继续？
						<div><label><input type="checkbox" checked class="ifSortDocNo" > 删除后自动整理凭证断号</label></div>
					</div>

					<div class="form-group sortBox none">
						<label style="margin-top: 7px;float: left;">整理月份:</label>
						<div class="input-group col-sm-8">
							<input type="text" class="form-control" id="sortMonthInput" placeholder="请选择整理月份">
							<input type="text" class="form-control none" id="reverseMonthInput" placeholder="请选择冲销时间">
						</div>
					</div>


					<div class="descBox"></div>
					<br/>
					<div class="gridBox none">
						<table id="subGrid"></table>
						<div id="subGridPager"></div>
					</div>
				</div>
				<div class="modal-footer" style="text-align: center;">
					<button type="button" class="btn btn-warning" id="delBtn">确定</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" id="noBtn">取消</button>
				</div>
			</div>
		</div>
	</div>

</body>
</html>