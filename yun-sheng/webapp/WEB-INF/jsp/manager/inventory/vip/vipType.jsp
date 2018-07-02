<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" href="${basePath}/css/inventory/vip/vipType.css?v=${version}">
<script src="${basePath}/js/inventory/vip/vipType.js?v=${version}"></script>

<title>会员类型管理</title>
</head>
<body>
	<header>
		<div class="none" id="MENU_CODE">HYLXGL</div>
		<div id="AUTH" class="none" data-code="HYLXGL"></div>
		<input type="text" class="form-control B_HYLXGL_0007 none" id="vipType" placeholder="请输入会员类型名称、编码">
		<button type="button" class="btn B_HYLXGL_0007 none" id="search">搜索</button>
		<button type="button" class="btn addservice none B_HYLXGL_0004">增值服务设置</button>
	</header>

	<div class="navBtn">
		<button type="button" class="btn B_HYLXGL_0001 none" id="add">新增会员类型</button>
		<button type="button" class="btn B_HYLXGL_0002 none" id="amend">修改</button>
		<button type="button" class="btn B_HYLXGL_0003 none" id="del">删除</button>
		<button type="button" class="btn B_HYLXGL_0005 none" id="using">启用</button>
		<button type="button" class="btn B_HYLXGL_0005 none" id="off">禁用</button>
		<button type="button" class="btn btn-default B_HYLXGL_0006 none" id="export">导出</button>
	</div>

	<div class="gridbox">
		<table id="grid"></table>
	</div>

	<%--新增会员类型弹窗--%>
	<div id="addModal" class="modal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title vipAddtitle">会员类型-新增</h4>
				</div>
				<div class="modal-body">
					<div class="mlefy">
						<div class="vone">
							<p><i class="red">*</i>会员类型编码：<input type="text" class="inp typeCode"></p>
							<p><i class="red">*</i>会员类型名称：<input type="text" class="inp typeName"></p>
						</div>
						<div class="vone">
							<p><i class="red">*</i>有效期：<label class="shu"><input type="checkbox" checked class="ever">永久</label><input type="text" class="inp month numinp" disabled>月</p>
							<p>购买价格：<input type="text" placeholder="0.00" class="inp amount numfixinp">元/年</p>
						</div>
						<div class="vone">
							<font class="fl">备注：</font><textarea class="inp remark"></textarea>
						</div>
					</div>
					<div class="mright">
						<div class="vone">
							<label class="labbox">
								<input type="checkbox" class="integral">积分设置
							</label>
							<label class="labbox">
								<input type="checkbox" class="discount">折扣设置
							</label>
							<label class="labbox">
								<input type="checkbox" class="addserve">增值服务
							</label>
						</div>
						<div class="mnav">
							<ul>
								<li class="sli integralLi">积分设置</li>
								<li class="sli discountLi">折扣设置</li>
								<li class="sli addserveLi">增值服务</li>
							</ul>
						</div>
						<div class="mbox">
							<div class="integralBox">
								<div>
									<p class="emp">积分抵现通用规则设置<input type="text" class="numinp np1"> <i>积分</i> = <input type="text" class="numinp np2"> 元</p>
									<p class="emp">积分生成通用规则设置<input type="text" class="numinp np3"> <i>元</i> = <input type="text" class="numinp np4"> 积分</p>
									<p class="emp">积分生成特殊商品积分设置：<button type="button" class="btn addIntegral">新增行</button></p>
								</div>
								<div class="gridwrap">
									<table id="integralGrid"></table>
								</div>
							</div>
							<div class="addserveBox">
								<table id="addserveGrid"></table>
							</div>
							<div class="discountBox">
								<div>
									<p><i class="red">*</i>通用设置：<input type="text" class="inp numinp disinp">%</p>
									<p>特殊商品折扣设置:<button type="button" class="btn adddiscount">新增一行</button></p>
								</div>
								<div class="disfl">
									<table id="discountGrid"></table>
								</div>
							</div>
						</div>
						<div class="mfoot">
							<button type="button" class="btn addSave">保存</button>
							<button type="button" class="btn addoff" data-dismiss="modal">取消</button>
						</div>

					</div>

				</div>
			</div>
		</div>
	</div>

</body>
</html>