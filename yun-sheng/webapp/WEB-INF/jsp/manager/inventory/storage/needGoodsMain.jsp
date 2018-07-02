<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>要货单</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <strong><meta name="renderer" content="webkit|ie-comp|ie-stand"></strong>
    <!-- 引入文件 -->
    <jsp:include page="../../Include/import.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont/iconfont.css?v=${version}" />
    <script type="text/javascript">
		//跳转到报表页面的传参加密方法测试
		function encode64(sysIn) {
			var input = sysIn+"";
			var out = "";
			// base64加密开始
			var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";

			var chr1, chr2, chr3 = "";
			var enc1, enc2, enc3, enc4 = "";
			var i = 0;
			do {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				out = out + keyStr.charAt(enc1) + keyStr.charAt(enc2)
					+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
				chr1 = chr2 = chr3 = "";
				enc1 = enc2 = enc3 = enc4 = "";
			} while (i < input.length);

			return out;
		};

		//**********全局变量
		//基本目录
		var basePath = "${basePath}";
		var billsCode = "${billsCode}";
		var billId = "${billId}";
        var userId = encode64("${SESSION_KEY_USER.id}");
        var companyId = encode64("${SESSION_KEY_USER.companyId}");
    </script>
    <style>
        .showBox button{
            height: 34px;
        }
        .ui-jqgrid-pager{
            height: 39px;
        }
    </style>
</head>

<body class="e-body-bg pageBill">
<div class="">
    <div class="btn-toolbar" id="MenuTool" role="toolbar" data-code="YHD"></div>
    <div class="none gridTools">
        <div class="col-md-12">
            <div class="" style="padding: 0px;margin-top: 10px;">
                <div id='AUTH' data-code='YHD' class="none btn-group btnHundred">
                    <button type="button" class="btn btn-default navbar-btn" onclick="firstPage()">首单</button>
                    <button type="button" class="btn btn-default navbar-btn" onclick="backPage()">上一单</button>
                    <button type="button" class="btn btn-default navbar-btn" onclick="nextPage()">下一单</button>
                    <button type="button" class="btn btn-default navbar-btn" onclick="lastPage()">末单</button>
                    <button type="button" class="btn btn-default navbar-btn" onclick="addBtClick()">新增</button>
                    <button type="button" class="btn btn-default navbar-btn" onclick="saveBtClick()">保存</button>
                    <button type="button" class="btn btn-default navbar-btn delBt" onclick="delBtClick()">删除</button>
                    <button type="button" class="btn btn-default navbar-btn checkBt" onclick="openCheckDetailModal()">审核</button>
                    <button type="button" class="btn btn-default navbar-btn forceFinish" onclick="forceFinishBtClick()">强制完成</button>
                    <button type="button" class="btn btn-default navbar-btn" onclick="print()">打印</button>
                    <button type="button" class="btn btn-default navbar-btn" onclick="filterBtClick()">过滤</button>
                    <button type="button" class="btn btn-default navbar-btn" onclick="refreshBtClick()">刷新</button>
                    <button type="button" class="btn btn-default navbar-btn copyBills" onclick="copyBtClick()">复制</button>
                    <div class="slideThree none">
                        <input type="checkbox" value="1" id="slideThree" name="check" />
                        <label for="slideThree"></label>
                    </div>
                    <button type="button" class="btn btn-default btn-yindao-btn" style="float:right;"
                            onclick="window.parent.openWorkBoxByMenutext('要货单单据列表',  '/manager/inventory/storage/needGoods/historyMain', true)">历史单据</button>
                </div>
            </div>
        </div>
    </div>
    <div class="pageBillForm gridTop">
        <form class="clearfix form-inline" role="form" id="topForm">
            <div id="billsCodeWrap" class="col-sm-3">
                <label class="width-25">单据编号:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="billsCode" readonly="readonly">
                    <input type="text" class="form-control" name="id" style="display: none;">
                    <input type="hidden" name="billsStatus">
                </div>
            </div>
            <div class="form-group col-sm-3">
                <label class="width-25"><i class="bitianX">*</i>单据日期:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="billsDateStr" id="billsBeginDateStr"
                           data-bv-field="billsDateStr">
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label class="width-25"><i class="bitianX">*</i>要货部门:</label>
                <div class="input-group col-sm-8">
                    <input id="needSectionName"  class="form-control" name="needSectionName" type="text" readonly>
                </div>
            </div>

            <div class="form-group col-sm-3">
                <input type="hidden" name="managerId"/>
                <label class="width-25"><i class="bitianX">*</i>经手人:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="managerName" id="managerName" placeholder="部门名称先选"
                           readonly="readonly" data-bv-field="managerName">
                </div>
            </div>
            <div class="form-group col-sm-3">
                <label class="width-25"><i class="bitianX">*</i>发货部门:</label>
                <div class="input-group col-sm-8">
                    <input id="sendSectionName"  class="form-control" name="sendSectionName" type="text" readonly>
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label class="width-25">历史统计&nbsp;</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" style="width:28%;" name="historyDays" id="historyDays" onkeyup="if(!/^[1-9]\d*$/.test(this.value)){this.value='';}" />&nbsp;&nbsp;天，计划备货&nbsp;&nbsp;<input type="text" class="form-control" style="width:28%;float: none" name="planDays" id="planDays" onkeyup="if(!/^[1-9]\d*$/.test(this.value)){this.value='';}" />&nbsp;&nbsp;天
                </div>
            </div>

            <div class="form-group col-sm-3">
                <label class="width-25">备注:</label>
                <div class="input-group col-sm-8">
                    <input type="text" class="form-control" name="remark">
                </div>
            </div>
            <div class="rightMap">
                <img  id="billsStautsImg" class="mr10" >
                <img>
            </div>

        </form>
    </div>
    <div class="gridBody">
        <div class="none">
            <input type="hidden" id="dataGridGood" data-desc="商品名称模态框">
        </div>
        <div style="color: red;padding: 5px 20px;">说明: 门店库存含调入在途, 发货部门不含</div>
        <div class="col-md-12">
            <div class="jqGrid_wrapper">
                <table id="dataGrid"></table>
            </div>
        </div>
    </div>
</div>

<!-- 引用自定义JS文件 -->
<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
<script type="text/javascript" src="${basePath}/js/inventory/storage/needGoods.js?v=${version}"></script>
<script type="text/javascript" src="${basePath}/js/erp/purchase/validator.js?v=${version}"></script>

<!-- 菜单权限验证 -->
<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</body>



</html>
