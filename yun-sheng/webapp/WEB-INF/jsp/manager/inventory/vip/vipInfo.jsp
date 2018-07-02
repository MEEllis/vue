<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" href="${basePath}/css/inventory/finance/businessProcess/voucherManagement.css?v=${version}">
<link rel="stylesheet" href="${basePath}/css/inventory/vip/vipInfo.css?v=${version}">
<script src="${basePath}/js/inventory/vip/vipInfo.js?v=${version}"></script>

<title>客户资料</title>
<script>
	var sysDate = "${sysDate}";
    var secDateId = "${section.dataId}";
    var secName = "${section.name}";
    var unitId = "${unit.id}";
    var unitName = "${unit.name}";
    var userId = "${user.id}";
    var userName = "${user.name}";
</script>
</head>
<body>
<header>
    <div class="none" id="MENU_CODE">KHWH,HYLXGL</div>
    <div id="AUTH" class="none" data-code="KHWH"></div>

    <form action="" class="form-inline clearfix" id="searchQuery">
        <div class="actionContainer" style="padding: 0 0 15px 15px;height: 44px;">
            <button type="button" class="btn addCustomer" >新增客户</button>
            <button type="button" class="btn blvip">办理会员</button>
            <button type="button" class="btn import">导入</button>
            <button type="button" class="btn" data-toggle="modal" data-target="#vipTypeModal">客户分类管理</button>
            <button type="button" class="btn SendMessage ">发送短信</button>
            <button type="button" class="btn frBtnColor vipWater">查看积分流水</button>
            <button type="button" class="btn frBtnColor vipExpense">查看消费记录</button>
        </div>

        <div class="form-group col-sm-4">

            <label for="joinDateBegin" style="width: 77px;">
                加入日期:
            </label>
            <div class="input-group col-sm-4">
                <input type="text" class="form-control date-time-icon" name="billsBeginDateStr" id="joinDateBegin" readonly
                       placeholder="请选择开始日期">
            </div>
            --
            <div class="input-group col-sm-4">
                <input type="text" class="form-control date-time-icon" name="billsEndDateStr" id="joinDateEnd" readonly
                       placeholder="请选择结束日期">
            </div>
        </div>

        <div class="form-group col-sm-4">
            <label for="latelyConsumptionDateBegin" class="width-25">
                最近消费期间:
            </label>
            <div class="input-group col-sm-4">
                <input type="text" class="form-control date-time-icon" name="billsBeginDateStr" id="latelyConsumptionDateBegin"
                       readonly
                       placeholder="请选择开始日期">
            </div>
            --
            <div class="input-group col-sm-4">
                <input type="text" class="form-control date-time-icon" name="billsEndDateStr" id="latelyConsumptionDateEnd" readonly
                       placeholder="请选择结束日期">
            </div>
        </div>

        <div class="form-group col-sm-4">
            <label for="vipInfo" class='width-25'>客户信息:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="vipInfo" placeholder="客户姓名,电话,卡号">
            </div>
        </div>

        <div class="form-group col-sm-4">
            <label for="scoreBegin" style="width: 77px;">积分范围:</label>
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="billsBeginDateStr" id="scoreBegin"
                       onkeyup="this.value=this.value.replace(/\D/g,'')">
            </div>
            --
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="billsEndDateStr" id="scoreEnd"
                       onkeyup="this.value=this.value.replace(/\D/g,'')">
            </div>
        </div>

        <div class="form-group col-sm-4">
            <label for="birthDateBegin" class="width-25">生日范围:</label>
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="billsBeginDateStr" id="birthDateBegin"
                       placeholder="01-01" onkeyup="getday(this)" />
            </div>
            --
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="billsEndDateStr" id="birthDateEnd"
                       placeholder="12-31" onkeyup="getday(this)" />
            </div>
        </div>

        <span id='moreTermList'>
				<div class="form-group col-sm-4">
					<label class='width-25'>性别:</label>
					<div class="input-group col-sm-8">
                        <select name="" class="form-control" id="sex">
                            <option value="">全部</option><option value="男">男</option><option value="女">女</option>
                        </select>
					</div>
				</div>

				<div class="form-group col-sm-4">
					<label for="joinSectionIds" style="width: 77px;">加入门店:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="joinSectionIds" placeholder="请选择加入门店">
					</div>
				</div>

                <div class="form-group col-sm-4">
					<label for="memberTypeIds" class='width-25'>会员类型:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="memberTypeIds" placeholder="请选择会员类型">
					</div>
				</div>

                <div class="form-group col-sm-4">
					<label for="memberTypeIds" class='width-25'>客户分类:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="customerClassIds" placeholder="请选择客户分类">
					</div>
				</div>

                <div class="form-group col-sm-4">
					<label for="handleSectionIds" style="width: 77px;">办理门店:</label>
					<div class="input-group col-sm-8">
						<input type="text" class="form-control" id="handleSectionIds" placeholder="请选择业务部门">
					</div>
				</div>

                <div class="form-group col-sm-4">
                    <div class="checkbox" style="margin-left:20%;line-height: 34px;">
                        <label>
                            <input type="checkbox" class="isVip" style="float: left;margin: 11px 5px;"> 非会员客户
                        </label>
                    </div>
                </div>
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
        <h2>输入条件后,点击查询吧!</h2>
    </div>
    <%--<div class="explainImgBox" style="background:url('${basePath}/images/inventory/common/explain.png') no-repeat center center;background-size:contain;">--%>
    <%--1、对零售业务涉及到的“运营商业务”数据进行汇总，并提供多种系统预置方案</br>--%>
    <%--</div>--%>

</div>

<div class="loadingImgBox none"
     style="background:url('${basePath}/images/inventory/common/loading.gif') no-repeat center center;background-size:contain;"></div>
<div class="notFounImgBox none">
    <img src="${basePath}/images/inventory/common/notFoun.png" alt="">
</div>


<div id="rpContainer">
    <div class="actionContainer" style="padding: 15px 0;margin:15px 0;height: 44px;">
        <button type="button" class="btn mergeBtn B_KHWH_0006 none">合并</button>
        <button type="button" class="btn renewBtn B_KHWH_0010 none">续费</button>
        <button type="button" class="btn integralBtn B_KHWH_0009 none">积分调整</button>
        <button type="button" class="btn updateBtn B_KHWH_0002 none">修改</button>
        <button type="button" class="btn btn-default B_KHWH_0008 none" id="export">导出</button>
        <button type="button" class="btn lineSet B_KHWH_0012 none">列设置</button>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                更多
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu actionBox">
                <li id="B_PZGL_0006" class="deleteBtn B_KHWH_0003 none">删除</li>
                <%--<li id="B_PZGL_0007" class="commissioningBtn">启用</li>--%>
                <%--<li id="B_PZGL_0008" class="disableBtn">禁用</li>--%>
                <li id="B_PZGL_0009" class="changeVipType none B_HYLXGL_0002">变更会员卡类型</li>
                <li id="B_PZGL_0010" class="changeCardBtn none B_HYLXGL_0002">换卡</li>
                <li id="B_PZGL_0011" class="cancellationCardBtn none B_HYLXGL_0002">注销会员</li>
            </ul>
        </div>
    </div>

    <table id="rpGrid"></table>
    <div id="rpGridPager"></div>
</div>


<div id="lineSet-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">列设置</h4>
            </div>
            <div class="modal-body" style="width:600px;">
                <table id='lineSetGrid'></table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default sureLineSet" data-dismiss="modal" onclick="sureLineSet()">
                    确认
                </button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="addCustomerModal" data-keyboard="true" data-backdrop="true">
    <div class="modal-dialog" style="width: 1000px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    新增客户
                </h4>
            </div>
            <div class="modal-body">
                <div class="customerInfoContainer clearfix">
                    <div class="col-sm-2" style="width:35px;line-height: 65px;">个人信息</div>
                    <div class="col-sm-10" style="width:900px;">
                        <form action="" class="form-inline clearfix" id="addVip">
                            <div class="form-group col-sm-4">
                                <label for="cardholder" class='width-25'>
                                    <div class="input-group">
                                        *
                                    </div>
                                    姓名:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control mustValue" name="cardholder" id="cardholder"
                                           placeholder="请输入客户姓名">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25'>性别:</label>
                                <label class="input-group">
                                    <input type="radio" checked name="sex" value="男">
                                    男
                                </label>

                                <label class="input-group">
                                    <input type="radio" name="sex" value="女">
                                    女
                                </label>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="tel1" class='width-25'>
                                    <div class="input-group">
                                        *
                                    </div>
                                    手机号码:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control mustValue" name="tel1" id="tel1"
                                           placeholder="请输入客户手机号码">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="birth" class='width-25'>
                                    生日:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="birth" id="birth" readonly
                                           placeholder="请选择客户生日">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' for="classLabelId">
                                    客户分类:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="classLabelId" id="classLabelId"
                                           placeholder="请选择客户分类">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' for="grade">
                                    客户等级:
                                </label>
                                <div class="input-group col-sm-8">
                                    <select name="grade" class="form-control" id="grade" placeholder="请选择客户等级">
                                        <option value=""></option>
                                        <option value="1">★</option>
                                        <option value="2">★★</option>
                                        <option value="3">★★★</option>
                                        <option value="4">★★★★</option>
                                        <option value="5">★★★★★</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="sectionIdAdd" class='width-25'>
                                    加入门店:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="sectionId" id="sectionIdAdd"
                                           placeholder="请选择门店">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">

                                <label class='width-25' for="inDate">
                                    加入日期:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="inDate" id="inDate"
                                           readonly placeholder="请选择开始日期">
                                </div>

                            </div>

                            <div class="form-group col-sm-4">
                                <label for="certificateno" class='width-25'>
                                    身份证号:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="certificateno" id="certificateno"
                                           placeholder="请输入客户身份证号">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25'>推荐渠道:</label>
                                <div class="input-group col-sm-8">
                                    <select name="" class="form-control" id="fzrType">
                                        <option value=""></option>
                                        <option value="1">往来单位</option>
                                        <option value="2">职员</option>
                                        <option value="3">会员</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="fzrId" class='width-25'>
                                    推荐人:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" readonly id="fzrId" placeholder="请选择推荐人">
                                    <%--<span class="input-group-btn showfzrIdModalBtn"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-option-horizontal"></span></button></span>--%>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="alipay" class='width-25'>
                                    支付宝:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" id="alipay" name="alipay"
                                           placeholder="请输入客户支付宝">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="qq" class='width-25'>
                                    QQ:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" id="qq" name="qq" placeholder="请输入客户QQ">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="wechat" class='width-25'>
                                    微信:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" id="wechat" name="wechat"
                                           placeholder="请输入客户微信">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="email" class='width-25'>
                                    Email:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" id="email" name="email"
                                           placeholder="请输入客户Email">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="address" class='width-25'>
                                    地址:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" id="address" name="address"
                                           placeholder="请输入客户地址">
                                </div>
                            </div>

                            <div class="form-group col-sm-8">
                                <label for="remark" style="width: 14%">
                                    备注:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" id="remark" name="remark"
                                           placeholder="请输入备注">
                                </div>
                            </div>
                            <div class="cb"></div>
                        </form>

                    </div>
                </div>
                <div class="vipInfoContainer clearfix none" style="margin-top: 15px;padding-top: 25px;border-top: 1px solid #e6e6e6">
                    <div class="col-sm-2" style="width:35px;line-height: 30px;">会员信息</div>
                    <div class="col-sm-10" style="width:900px;">
                        <form action="" class="form-inline clearfix" id="vipInfoForm">
                            <div class="form-group col-sm-4">
                                <label class='width-25'>会员类型:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control " name="cardTypeName" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25'>会员卡号:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control " name="cardNum" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="tel1" class='width-25'>生效日期:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control " name="effectiveDateString" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="birth" class='width-25'>往来单位:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control " name="unitName" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' >积分:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="integral" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' >经手人:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="fcardEmployeeName" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' >办理门店:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="handleSectionName" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' >办理日期:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="handleDateString" readonly>
                                </div>
                            </div>

                            <div class="cb"></div>
                        </form>

                    </div>
                </div>
            </div>
            <div class="modal-footer" style="text-align: center;">
                <button type="button" class="btn fr " data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary fr mr15" id="addCustomerBtn">保存</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="addVipModal" data-keyboard="true" data-backdrop="true">
    <div class="modal-dialog" style="width: 1000px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    办理会员
                </h4>
            </div>
            <div class="modal-body">

                <div style="width:900px;" class="clearfix">
                    <form action="" class="form-inline clearfix" id="addVipBox">
                        <div class="form-group col-sm-4">
                            <label for="vipTell" class='width-25'>
                                <div class="input-group">
                                    *
                                </div>
                                手机号码:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control mustValue" name="tel1" id="vipTell"
                                       placeholder="请输入手机号码" maxlength="11">
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label for="vipcardholder" class='width-25'>
                                <div class="input-group">
                                    *
                                </div>
                                姓名:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control mustValue" name="cardholder" id="vipcardholder"
                                       placeholder="请输入会员姓名">
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label class='width-25'>性别:</label>
                            <label class="input-group">
                                <input type="radio" checked name="sex" value="男">
                                男
                            </label>

                            <label class="input-group">
                                <input type="radio" name="sex" value="女">
                                女
                            </label>
                        </div>

                        <div class="form-group col-sm-4">
                            <label for="vipCardtypeId" class='width-25'>
                                <div class="input-group">
                                    *
                                </div>
                                会员类型:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control mustValue" name="cardtypeId" id="vipCardtypeId"
                                       placeholder="请选择会员类型">
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label for="cardNum" class='width-25'>
                                <div class="input-group">
                                    *
                                </div>
                                会员卡号:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control mustValue" name="cardNum" id="cardNum"
                                       placeholder="请输入会员卡号">
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label for="vipScore" class='width-25'>
                                初始积分:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="score" id="vipScore"
                                       placeholder="请输入会员积分">
                            </div>
                        </div>

                        <div>
                            <div class="form-group col-sm-4">
                                <label for="vipbirth" class='width-25'>
                                    生日:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="birth" id="vipbirth"
                                           placeholder="请选择会员生日">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="invalidDate" class='width-25'>
                                    截止日期:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="invalidDate" id="invalidDate"
                                           placeholder="请选择截止日期">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25'>
                                    客户等级:
                                </label>
                                <div class="input-group col-sm-8">
                                    <select name="grade" class="form-control" id="vipgrade">
                                        <option value=""></option>
                                        <option value="1">★</option>
                                        <option value="2">★★</option>
                                        <option value="3">★★★</option>
                                        <option value="4">★★★★</option>
                                        <option value="5">★★★★★</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="vipSectionId" class='width-25'>
                                    加入门店:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="sectionId" id="vipSectionId"
                                           placeholder="请选择加入门店">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">

                                <label class='width-25' for="vipInDate">
                                    加入日期:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="inDate" id="vipInDate"
                                           readonly
                                           placeholder="请选择加入日期">
                                </div>

                            </div>

                            <div class="form-group col-sm-4">

                                <label class='width-25' for="vipContactUnitid">
                                    往来单位:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="contactUnitid"
                                           id="vipContactUnitid"
                                           readonly placeholder="请选择往来单位">
                                </div>

                            </div>

                            <div class="form-group col-sm-4">

                                <label class='width-25' for="handleSection">
                                    办理门店:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="handleSection"
                                           id="handleSection"
                                           readonly placeholder="请选择办理门店">
                                </div>

                            </div>

                            <div class="form-group col-sm-4">

                                <label class='width-25' for="handleDate">
                                    办理日期:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="handleDate" id="handleDate"
                                           readonly
                                           placeholder="请选择办理日期">
                                </div>

                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25'>
                                    经手人:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="fcardEmployeeid"
                                           id="fcardEmployeeid"
                                           readonly placeholder="请选择经手人">
                                </div>

                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' for="vipFzrType">推荐渠道:</label>
                                <div class="input-group col-sm-8">
                                    <select name="" class="form-control" id="vipFzrType">
                                        <option value=""></option>
                                        <option value="1">往来单位</option>
                                        <option value="2">职员</option>
                                        <option value="3">会员</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' for="vipFzrId">
                                    推荐人:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="fzrId" id="vipFzrId" readonly>
                                </div>

                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' for="vipClassLabelId">

                                    客户分类:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="classLabelId"
                                           id="vipClassLabelId"
                                           placeholder="请选择客户分类">
                                </div>
                            </div>

                            <div class="form-group col-sm-12">
                                <label for="vipRemark" style="width:81px;">
                                    备注:
                                </label>
                                <div class="input-group col-sm-10">
                                    <input type="text" class="form-control" name="remark" id="vipRemark"
                                           placeholder="客户姓名,电话,卡号">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="vipCertificateno" class='width-25'>
                                    身份证号:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="certificateno" id="vipCertificateno"
                                           placeholder="请输入客户身份证号">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="vipQq" class='width-25'>
                                    QQ:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="qq" id="vipQq"
                                           placeholder="请输入客户QQ">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="vipWechat" class='width-25'>
                                    微信:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="wechat" id="vipWechat"
                                           placeholder="请输入客户微信">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="vipAlipay" class='width-25'>
                                    支付宝:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="alipay" id="vipAlipay"
                                           placeholder="请输入客户支付宝">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="vipEmail" class='width-25'>
                                    Email:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="email" id="vipEmail"
                                           placeholder="请输入客户Email">
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="vipAddress" class='width-25'>
                                    地址:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="address" id="vipAddress"
                                           placeholder="请输入客户地址">
                                </div>
                            </div>

                        </div>

                        <div id="vipPriceBox" class="none">
                            <div class="clearfix">
                                <div class="form-group col-sm-4">
                                    <label class='width-25'>
                                        会员售价:
                                    </label>
                                    <div class="input-group col-sm-8 vipPrice"></div>
                                </div>
                            </div>

                            <div class="blPriceBox">

                                <div class="form-group " style="width:19%">
                                    <label for="blcash" class='width-25'>
                                        现金:
                                    </label>
                                    <div class="input-group col-sm-8">
                                        <input type="text" class="form-control blinp" id="blcash" onkeyup="getnum(this)">
                                    </div>
                                </div>

                                <div class="form-group" style="width: 18%;position: relative;">
                                    <label for="blpos" class='width-25'>
                                        POS:
                                    </label>
                                    <div class="input-group col-sm-8">
                                        <input type="text" class="form-control" id="blpos" readonly>
                                    </div>
                                    <div class="blposDiv">
                                        <table class="table table-bordered" id="blposTab">
                                            <thead>
                                            <tr>
                                                <th>序</th>
                                                <th>银行</th>
                                                <th>收款金额</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                        <div class="blBtn">
                                            <button type="button" class="btn btn-info" id="blposSure">确定</button>
                                            <button type="button" class="btn btn-default" id="blposNone">取消</button>
                                        </div>
                                        <div class="tableTrangle"></div>
                                    </div>
                                </div>

                                <div class="form-group" style="width: 18%">
                                    <label for="blalipay" class='width-25'>
                                        支付宝:
                                    </label>
                                    <div class="input-group col-sm-8">
                                        <input type="text" class="form-control blinp" id="blalipay" onkeyup="getnum(this)">
                                    </div>
                                </div>

                                <div class="form-group" style="width: 18%">
                                    <label for="blweChat" class='width-25'>
                                        微信:
                                    </label>
                                    <div class="input-group col-sm-8">
                                        <input type="text" class="form-control blinp" id="blweChat" onkeyup="getnum(this)">
                                    </div>
                                </div>

                                <div class="form-group" style="width: 25%;position: relative;">
                                    <label for="blother" class='width-25'>
                                        其他账户:
                                    </label>
                                    <div class="input-group col-sm-8">
                                        <input type="text" class="form-control" id="blother" readonly>
                                    </div>
                                    <div class="blotherDiv">
                                        <table class="table table-bordered" id="blotherTab">
                                            <thead>
                                            <tr>
                                                <th>序</th>
                                                <th>银行</th>
                                                <th>收款金额</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                        <div class="blBtn">
                                            <button type="button" class="btn btn-info" id="blotherSure">确定</button>
                                            <button type="button" class="btn btn-default" id="blotherNone">取消</button>
                                        </div>
                                        <div class="tableTrangle"></div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="cb"></div>
                    </form>

                </div>
            </div>
            <div class="modal-footer" style="text-align: center;">
                <button type="button" class="btn fr" id="cancelCreatBtn" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary fr mr15" id="creatVipBtn">保存</button>
                <button type="button" class="btn fr mr15 none btnColor" id="receiptBtn">扫码收款</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="vipTypeModal" data-keyboard="true" data-backdrop="true">
    <div class="modal-dialog" style="width: 660px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">类别标签</h4>
            </div>
            <div class="modal-body">
                <div data-toggle="modal" data-target="#updateVipTypeModal"
                     style="margin: 10px 0; color: #337ab7;cursor: pointer">新增类别标签
                </div>
                <div style="width: 620px;">
                    <table id="vipTypeGrid"></table>
                    <div id="vipTypeGridPager"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" id="addVipTypeBtn">确定</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="updateVipTypeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog model-dialog3">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="">
                    类别标签修改
                </h4>
            </div>
            <div class="modal-body" id="model-body">
                <div class="container tp-info form-inline">
                    <input type="hidden" name="id" id="S_id"/>
                    <div class="row">

                        <div class="col-xs-3 col-sm-4 form-group">
                            <label class='width-25' for="S_code">编码：</label>
                            <div class="input-group col-sm-8">
                                <input id="S_code" type="text" name="code" class="form-control"/>
                            </div>
                        </div>
                        <div class="clearfix visible-xs-block"></div>
                    </div>
                    <div class="row">
                        <div class="col-xs-3 col-sm-4 form-group">
                            <label class='width-25' for="S_name">标签名称：</label>
                            <div class="input-group col-sm-8">
                                <input id="S_name" type="text" name="name" value="" class="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-3 col-sm-4 form-group">
                            <label class='width-25' for="S_remark">备注：</label>
                            <div class="input-group col-sm-8">
                                <input id="S_remark" type="text" name="remark" class="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn updateVipType btn-primary" data-dismiss="modal">确定</button>
                <button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<div class="modal fade" id="mergeModal" tabindex="-1" role="dialog" style=" padding-right: 16px;">
    <div class="modal-dialog  model-dialog1">
        <div class="modal-content" style="height: auto;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">信息合并</h4>
            </div>
            <div class="modal-body">
                <div class="tp-info">
                    <div class="row form-inline">
                        <div class="form-group" style="display: block">
                            <label class='width-25'>将所选客户信息合并至：</label>
                            <div class="input-group col-sm-8">
                                <select class="mergeSelect form-control">

                                </select>
                            </div>
                        </div>

                        <div class="clearfix visible-xs-block"></div>
                    </div>
                </div>

                <div>
                    <table id="hbGrid"></table>
                    <div id="hbGridPager"></div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary sureMerge">确定</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

            </div>

        </div>
    </div>
</div>

<div class="modal" id="integralModal" tabindex="-1" role="dialog" style=" padding-right: 16px;">
    <div class="modal-dialog" style="width: 900px;">
        <div class="modal-content" style="height: auto;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">积分调整</h4>
            </div>
            <div class="modal-body">
                <div>

                    <div class="form-inline clearfix">
                        <div class="col-sm-6">
                            <i class="red">*</i>调整后积分 <i style="margin: 0 9px;">=</i> 当前积分
                            <select class="countSel" style="padding: 6px 10px;margin: 0 10px;">
                                <option value="1">+</option>
                                <option value="2">-</option>
                                <option value="3">*</option>
                                <option value="4">/</option>
                            </select>
                            <input type="text" class="form-control ajustScore" style="width: 80px;display: inline-block;" />
                        </div>

                        <div class="col-xs-3 col-sm-4 form-group">
                            <label for="ajustScoreSection">部门：</label>
                            <div class="input-group col-sm-8">
                                <input id="ajustScoreSection" type="text" class="form-control"/>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <i class="red">*</i>调整原因：
                            <input type="text" class="form-control ajustReason" style="width: 700px;display: inline-block;" />
                        </div>

                        <div class="col-sm-12" style="border-bottom: 1px solid #e6e6e6;padding:0 0 0 100px;">
                            <button type="button" class="btn adjust" disabled>调整</button>
                        </div>

                        <div  class="col-sm-12" style="font-size: 16px;margin-top: 10px;height: 40px;line-height: 40px;">
                            客户调整预览
                            <button type="button" class="btn btn-primary adjustSure fr none" >保存</button>
                        </div>
                    </div>
                </div>
                <div style="overflow: auto">
                    <table id="jfGrid"></table>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="modal" id="vipRenewModal" data-keyboard="true" data-backdrop="true">
    <div class="modal-dialog" style="width: 1000px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    会员续费
                </h4>
            </div>
            <div class="modal-body">

                <div style="width:980px;" class="clearfix">
                    <form action="" class="form-inline clearfix" id="vipRenewBox">
                        <div class="form-group col-sm-4">
                            <label style="width: 77px;">
                                姓名:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="cardholder" readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label class='width-25'>
                                手机号码:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="tel1" readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label class='width-25'>
                                会员卡号:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="cardNum" readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label style="width: 77px;">
                                会员类型:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="cardTypeName" readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label class='width-25'>
                                会员生效日期:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="inDateString" readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label class='width-25'>
                                截止日期:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="invalidDateString" id="invalidDateString" readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-12">
                            <hr />
                        </div>

                        <div class="form-group col-sm-4">
                            <label style="width: 77px;">
                                门店名称:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" id="renewSectionName" readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label class='width-25'>
                                营业员:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" id="renewCreateMan" readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label class='width-25'>
                                续费日期:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" id="renewDate" readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label style="width: 77px;">
                                截止日期:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control date-time-icon" id="renewCloseDate" >
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label class='width-25'>
                                续费金额:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" id="renewPrice" onkeyup="getnum(this)" >
                            </div>
                        </div>

                        <div class="form-group col-sm-4">
                            <label class='width-25'>
                                会员售价:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="vipPrice" id="renewVipPrice" readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-12">
                            <label style="width: 77px;">
                                备注:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="" id="renewRemark">
                            </div>
                        </div>

                        <div class="form-group col-sm-3">
                            <label style="width: 77px;">
                                应收:
                            </label>
                            <div class="input-group col-sm-7">
                                <input type="text" class="form-control renewIncome" name=""  readonly>
                            </div>
                        </div>

                        <div class="form-group col-sm-3">
                            <label class='width-25'>
                                现金:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control xfinp" id="xfcash" onkeyup="getnum(this)" >
                            </div>
                        </div>

                        <div class="form-group col-sm-3" style="position: relative">
                            <label class='width-25'>
                                POS:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" id="xfpos"  readonly>
                            </div>
                            <div class="xfposDiv">
                                <table class="table table-bordered" id="xfposTab">
                                    <thead>
                                    <tr>
                                        <th>序</th>
                                        <th>银行</th>
                                        <th>收款金额</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                <div class="blBtn">
                                    <button type="button" class="btn btn-info" id="xfposSure">确定</button>
                                    <button type="button" class="btn btn-default" id="xfposNone">取消</button>
                                </div>
                                <div class="tableTrangle"></div>
                            </div>
                        </div>

                        <div class="form-group col-sm-3">
                            <label class='width-25'>
                                支付宝:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control xfinp" id="xfalipay" onkeyup="getnum(this)" >
                            </div>
                        </div>

                        <div class="form-group col-sm-3">
                            <label style="width: 77px;">
                                实收:
                            </label>
                            <div class="input-group col-sm-7">
                                <input type="text" class="form-control renewMoney" readonly >
                            </div>
                        </div>

                        <div class="form-group col-sm-3">
                            <label class='width-25'>
                                微信:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control xfinp" id="xfweChat" onkeyup="getnum(this)" >
                            </div>
                        </div>

                        <div class="form-group col-sm-3" style="position: relative;">
                            <label class='width-25'>
                                其他账户:
                            </label>
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" id="xfother" readonly>
                            </div>
                            <div class="xfotherDiv">
                                <table class="table table-bordered" id="xfotherTab">
                                    <thead>
                                    <tr>
                                        <th>序</th>
                                        <th>银行</th>
                                        <th>收款金额</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                <div class="blBtn">
                                    <button type="button" class="btn btn-info" id="xfotherSure">确定</button>
                                    <button type="button" class="btn btn-default" id="xfotherNone">取消</button>
                                </div>
                                <div class="tableTrangle"></div>
                            </div>
                        </div>

                        <div class="form-group col-sm-3 tr">
                            <button type="button" class="btn btnColor" id="renewCode" >扫码支付</button>
                        </div>

                        <div class="cb"></div>
                    </form>

                </div>
            </div>
            <div class="modal-footer" style="text-align: center;">
                <button type="button" class="btn fr" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary fr mr15" id="renewVipBtn">确定</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="changeCardModal" data-keyboard="true" data-backdrop="true">
    <div class="modal-dialog" style="width: 600px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    换卡
                </h4>
            </div>
            <div class="modal-body">
                <div class="customerInfoContainer clearfix">
                    <form action="" class="form-inline clearfix" id="changeCardBox">
                            <div class="form-group col-sm-6">
                                <label for="cardholder" style="width: 77px;">
                                     姓名:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control " name="consumerName" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-6">
                                <label for="tel1" class='width-25'>
                                    手机号码:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="consumerPhone" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-6">
                                <label for="birth" style="width: 77px;">
                                    会员类型:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control mustValue" name="memberType" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-6">
                                <label for="birth" class='width-25'>
                                    会员卡号:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control mustValue" name="memberCardNum" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-8">
                                <label style="width: 77px;">
                                    新卡号:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" id="newVipCardNum" >
                                </div>
                            </div>
                            <div class="cb"></div>
                        </form>

                </div>
            </div>
            <div class="modal-footer" style="text-align: center;">
                <button type="button" class="btn fr " data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary fr mr15" id="sureChangBtn">确定</button>
            </div>
        </div>
    </div>
</div>

<%--变更会员类型--%>
<div class="modal" id="changeVipModal" data-keyboard="true" data-backdrop="true">
    <div class="modal-dialog" style="width: 1000px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    变更会员类型
                </h4>
            </div>
            <div class="modal-body">
                <div class="customerInfoContainer clearfix">
                    <div class="col-sm-2" style="width:35px;line-height: 30px;">个人信息</div>
                    <div class="col-sm-10" style="width:900px;">
                        <form action="" class="form-inline clearfix" id="changeVip">
                            <div class="form-group col-sm-4">
                                <label for="tel1" class='width-25'>
                                    <div class="input-group">
                                        *
                                    </div>
                                    手机号码:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="tel1" readonly >
                                </div>
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="cardholder" class='width-25'>
                                    <div class="input-group">
                                        *
                                    </div>
                                    姓名:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="cardholder" readonly >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="sex" class='width-25'>性别:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="sex" readonly >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25'>
                                    <div class="input-group">
                                        *
                                    </div>
                                    生日:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="birthString" readonly >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' >
                                    <div class="input-group">
                                        *
                                    </div>
                                    客户分类:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="customerClassName" readonly >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' for="grade">
                                    <div class="input-group">
                                        *
                                    </div>
                                    客户等级:
                                </label>
                                <div class="input-group col-sm-8">
                                    <select name="grade" class="form-control" disabled >
                                        <option value="1">★</option>
                                        <option value="2">★★</option>
                                        <option value="3">★★★</option>
                                        <option value="4">★★★★</option>
                                        <option value="5">★★★★★</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25'>
                                    <div class="input-group">
                                        *
                                    </div>
                                    加入门店:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="inSectionName" readonly >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25'>
                                    <div class="input-group">
                                        *
                                    </div>
                                    加入日期:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="inDateString" readonly >
                                </div>
                            </div>
                            <div class="cb"></div>
                        </form>

                    </div>
                </div>

                <div class="vipInfoContainer clearfix" style="margin-top: 15px;padding-top: 25px;border-top: 1px solid #e6e6e6">
                    <div class="col-sm-2" style="width:35px;line-height: 65px;">会员信息</div>
                    <div class="col-sm-10" style="width:900px;">
                        <form action="" class="form-inline clearfix" id="changeVipForm">
                            <div class="form-group col-sm-4">
                                <label class='width-25'>
                                    <div class="input-group">
                                        *
                                    </div>
                                    会员类型:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control mustValue" id="changeTypeName" >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25'>会员卡号:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control " name="cardNum" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="tel1" class='width-25'>
                                    <div class="input-group">
                                        *
                                    </div>
                                    截止日期:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control mustValue date-time-icon" id="changeEffectDate" >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="tel1" class='width-25' style="width: 38%;">
                                    <div class="input-group">
                                        *
                                    </div>
                                    变更办理门店:
                                </label>
                                <div class="input-group col-sm-7">
                                    <input type="text" class="form-control mustValue" id="changeHandleSection" >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="tel1" class='width-25' style="width: 38%;">
                                    <div class="input-group">
                                        *
                                    </div>
                                    变更经手人:
                                </label>
                                <div class="input-group col-sm-7">
                                    <input type="text" class="form-control mustValue" id="changeEmployee" >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="tel1" class='width-25' style="width: 38%;">
                                    <div class="input-group">
                                        *
                                    </div>
                                    变更办理日期:
                                </label>
                                <div class="input-group col-sm-7">
                                    <input type="text" class="form-control mustValue date-time-icon" id="changeHandleDate" >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="birth" class='width-25'>往来单位:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control " name="unitName" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' >经手人:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="fcardEmployeeName" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' >当前积分:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="integral" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' >办理门店:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="handleSectionName" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label class='width-25' >办理日期:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="handleDateString" readonly>
                                </div>
                            </div>

                            <div class="form-group col-sm-4" style="height: 34px;"></div>

                            <div class="form-group col-sm-4">
                                <label class='width-25'>会员售价:</label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control" name="vipPrice" id="changeAmount" readonly >
                                </div>
                            </div>

                            <div class="form-group col-sm-4">
                                <label for="fzrId" class='width-25'>
                                    补差应收:
                                </label>
                                <div class="input-group col-sm-8">
                                    <input type="text" class="form-control mustValue" id="changePrice" onkeyup="getnum(this)" >
                                </div>
                            </div>

                            <div class="form-group col-sm-4" style="height: 34px"></div>

                            <div class="form-group" style="width: 19%;">
                                <label for="alipay" class='width-25'>
                                    现金:
                                </label>
                                <div class="input-group col-sm-7">
                                    <input type="text" class="form-control bginp" id="bgcash" onkeyup="getnum(this)" >
                                </div>
                            </div>

                            <div class="form-group" style="width: 19%;position: relative;">
                                <label for="wechat" class='width-25'>
                                    POS:
                                </label>
                                <div class="input-group col-sm-7">
                                    <input type="text" class="form-control" id="bgpos" readonly >
                                </div>
                                <div class="bgposDiv">
                                    <table class="table table-bordered" id="bgposTab">
                                        <thead>
                                        <tr>
                                            <th>序</th>
                                            <th>银行</th>
                                            <th>收款金额</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <div class="blBtn">
                                        <button type="button" class="btn btn-info" id="bgposSure">确定</button>
                                        <button type="button" class="btn btn-default" id="bgposNone">取消</button>
                                    </div>
                                    <div class="tableTrangle"></div>
                                </div>
                            </div>

                            <div class="form-group" style="width: 19%;">
                                <label for="email" class='width-25'>
                                    支付宝:
                                </label>
                                <div class="input-group col-sm-7">
                                    <input type="text" class="form-control bginp" id="bgalipay" onkeyup="getnum(this)" >
                                </div>
                            </div>

                            <div class="form-group" style="width: 19%;">
                                <label for="address" class='width-25'>
                                    微信:
                                </label>
                                <div class="input-group col-sm-7">
                                    <input type="text" class="form-control bginp" id="bgweChat" onkeyup="getnum(this)" >
                                </div>
                            </div>

                            <div class="form-group" style="width: 22%;position: relative;">
                                <label for="remark" style="width: 32%;">
                                    其他账户:
                                </label>
                                <div class="input-group col-sm-7">
                                    <input type="text" class="form-control" id="bgother" readonly >
                                </div>
                                <div class="bgotherDiv">
                                    <table class="table table-bordered" id="bgotherTab">
                                        <thead>
                                        <tr>
                                            <th>序</th>
                                            <th>银行</th>
                                            <th>收款金额</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <div class="blBtn">
                                        <button type="button" class="btn btn-info" id="bgotherSure">确定</button>
                                        <button type="button" class="btn btn-default" id="bgotherNone">取消</button>
                                    </div>
                                    <div class="tableTrangle"></div>
                                </div>
                            </div>

                            <div class="cb"></div>
                        </form>

                    </div>
                </div>
            </div>
            <div class="modal-footer" style="text-align: center;">
                <button type="button" class="btn fr " data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary fr mr15" id="changeVipBtn">保存</button>
                <button type="button" class="btn btnColor fr mr15" id="changeVipCode">扫码收款</button>
            </div>
        </div>
    </div>
</div>


<!--扫码收款-->
<div class="modal fade" id="codeModal" tabindex="-1" role="dialog" aria-labelledby="codeModalLabel">
    <div class="modal-dialog" role="document" style="width: 400px;" >
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="codeModalLabel">扫码收款</h4>
            </div>
            <div class="modal-body">
                <div class="codeTop">
                    <div>
                        <span>应收：</span>
                        <i class="code_ys"></i>
                    </div>
                    <div>
                        <span>已收：</span>
                        <i class="code_ss"></i>
                    </div>
                    <div>
                        <span>本次收款：</span>
                        <input type="text" class="form-control codeMoney" readonly />
                    </div>
                </div>
                <div class="blcodeTop" style="height: 80px;">
                    <div>
                        <span>已收：</span>
                        <i class="code_blss" style="width: 153px;display: inline-block;text-align: left;"></i>
                    </div>
                    <div>
                        <span>本次收款：</span>
                        <input type="text" class="form-control blcodeMoney" onkeyup="getnum(this)" />
                    </div>
                </div>
                <input type="text" class="form-control codeInp" />
                <input type="text" class="form-control blcodeInp" />
                <div class="codeDiv"><i>!</i>扫码完成会自动结算本单</div>
                <div class="eui-cell" style=" padding: 15px 30px 0px;">
                    <div class="eui-cell__bd">
                        <label for="payTypeWX">
                            <input style=" top: -4px; position: relative;" id="payTypeWX" type="radio" value="wechat"
                                   name="payType" checked>
                            <span style="color: #14B83B;font-size: 34px;" class="iconfont icon-weixinzhifu1"></span>
                        </label>
                    </div>
                    <div class="eui-cell__bd tr">
                        <label for="payTypeZb">
                            <input style=" top: -4px; position: relative;" id="payTypeZb" type="radio" value="alipay"
                                   name="payType">
                            <span style="color: #25ABEE;font-size: 34px;"
                                  class="iconfont icon-zhifubaozhifu-copy"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="text-align: center;">
                <button type="button" class="btn btn-info" id="startCode">开始扫码</button>
                <div class="red" style="display: none;">请勿做其它操作！</div>
            </div>
        </div>
    </div>
</div>

</body>
</html>