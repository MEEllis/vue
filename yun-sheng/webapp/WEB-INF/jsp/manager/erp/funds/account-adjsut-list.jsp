<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8"/>
    <meta name="renderer" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/bootstrap.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/jquery-ui.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../js/skins/all.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/animate.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/bootstrap-select.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/font-awesome.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/iconfont.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/pagecss/treepage.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/jquery.datetimepicker.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css?v=${version}"/>
    <%--<link rel="stylesheet" type="text/css" href="../../css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>--%>
    <link rel="stylesheet" type="text/css" href="../../css/funds/adjust.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/><!-- 树 -->
    <link rel="stylesheet" type="text/css" href="../../js/cw/bootstrap/css/bootstrapValidator.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/market/public.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../html/muti_select/multi.css?v=${version}"/>
    <title>往来调整</title>
</head>
<script type="text/javascript">

	//**********全局变量
	//基本目录
	var basePath = "${basePath}";

	//获取地址栏的参数
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

	var billsCode = GetQueryString("billsCode") || '';
	var billId = GetQueryString("billsId") || ''
	var billDate = GetQueryString("billsDate") || ''
</script>
<style>
    .modal-content-dialog {
        width: 600px;
    }

    .input-group-btn {
        border: none;
        width: 0;
    }
</style>
<body>
<!-------------------------------------主页面开始----------------------------------------->
<div id="AUTH" data-code="YSYFTZ" class="btn-group btnHundred" role="group">
    <button type="button" class="btn btn-default" onclick="firstPage()">首单</button>
    <button type="button" class="btn btn-default" onclick="backPage()">上一单</button>
    <button type="button" class="btn btn-default" onclick="nextPage()">下一单</button>
    <button type="button" class="btn btn-default" onclick="lastPage()">末单</button>
    <button type="button" class="btn btn-default" onclick="add()">新增</button>
    <button type="button" class="btn btn-default saveAndPost" onclick="saveAndPost()">保存并过账</button>
    <button type="button" class="btn btn-default invalid" onclick="invalid();">红冲</button>
    <button type="button" class="btn btn-default" id="56" onclick="print(this.id)">打印</button>
    <button type="button" class="btn btn-default" onclick="filterModalBtnClick();">过滤</button>
    <button type="button" class="btn btn-default" id="copy" onclick="copy();" disabled="disabled">复制</button>
</div>
<!-------------------------------------搜索条件开始----------------------------------------->
<div class="collapse in" id="collapseExample">
    <div class="well">
        <form id="billsHeaderForm">
            <input type="hidden" name="id"/>
            <div class="inputbox container-fluid clearfix">
                <div class="row">
                    <div class="Zpercent form-group ">
                        <span class="box_text2">单据编号：</span>
                        <div class="col-sm-8">
                            <div class="input-group"><input type="text" class="form-control" name="billsCode"
                                                            id="billsCode" readonly="readonly" style="padding:0"/></div>
                        </div>
                    </div>

                    <div class="Zpercent form-group">
                        <span class="box_text2">部门名称：</span>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input type="text" class="form-control" name="sectionName" id="sectionName"
                                       readonly="readonly">
                                <input type="hidden" name="sectionId" id="sectionId">
                            </div>
                        </div>
                    </div>

                    <div class="Zpercent form-group">
                        <span class="box_text2">往来单位：</span>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input type="text" class="form-control" name="contactUnitName" id="contactUnitName"
                                       readonly="readonly" disabled>
                                <input type="hidden" name="contactsunitId" id="contactsunitId">
                            </div>
                        </div>
                    </div>

                    <div class="Zpercent form-group ">
                        <span for="datetimepickerStart" class="box_text2">单据日期：</span>
                        <div class="col-sm-8">
                            <div class="input-group"><input type="text" class="form-control2" name="billsDate"
                                                            id="billsDate" readonly="readonly" placeholder="年-月-日"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">

                    <div class="Zpercent form-group">
                         <span class="box_text2">调整类型：</span>
                         <div class="input-group col-sm-6" style="padding-left:15px ">
                             <select class="form-control" id="adjustType" name="adjustType" onchange="selectAdjustType()">
                                <option value="">请选择</option>
                            </select>
                            </div>
                    </div>

                    <div class="Zpercent form-group inpayClassIdDiv">
                        <input type="hidden" name="inpayClassId"/>
                        <span class="box_text2">类别名称：</span>
                        <div class=" col-sm-8">
                            <div class="input-group">
                            <input type="text" class="form-control" name="inpayClassName" id="inpayClassName"  data-bv-field="inpayClassName">
                        <%--<select class="form-control" id="inpayClassId" name="inpayClassId">--%>
                                <%--<option value="">请选择</option>--%>
                            <%--</select>--%>
                            </div>
                        </div>
                    </div>

                    <div class="Zpercent form-group yingfuAmountDiv">
                        <span class="box_text2">应付余额：</span>
                        <div class="col-sm-8">
                            <div class="input-group"><input type="text" class="form-control" name="yingfuAmount"
                                                            id="yingfuAmount" readonly="readonly" value="0"/></div>
                        </div>
                    </div>

                    <div class="Zpercent form-group yufuAmountDiv">
                        <span class="box_text2">预付余额：</span>
                        <div class="col-sm-8">
                            <div class="input-group"><input type="text" class="form-control" name="yufuAmount"
                                                            id="yufuAmount" readonly="readonly" value="0"/></div>
                        </div>
                    </div>

                    <div class="Zpercent form-group yingshouAmountDiv">
                        <span class="box_text2">应收余额：</span>
                        <div class="col-sm-8">
                            <div class="input-group"><input type="text" class="form-control" name="yingshouAmount"
                                                            id="yingshouAmount" readonly="readonly" value="0"/></div>
                        </div>
                    </div>

                    <div class="Zpercent form-group yushouAmountDiv">
                        <span class="box_text2">预收余额：</span>
                        <div class="col-sm-8">
                            <div class="input-group"><input type="text" class="form-control" name="yushouAmount"
                                                            id="yushouAmount" readonly="readonly" value="0"/></div>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <%--<div class="Zpercent form-group">
                        <span class="box_text2">调整后余额：</span><span class="box_input input-group"><input type="text" name="afterAdjustAmount" id="afterAdjustAmount" value="" placeholder="" class="form-control" disabled /></span>
                    </div>
                    --%>
                    <div class="Zpercent form-group">
                        <span class="box_text2">调整金额：</span>
                        <div class="col-sm-8">
                            <div class="input-group"><input type="text" name="adjustAmount" id="adjustAmount"
                                                            value="0.00" placeholder="" class="form-control"/></div>
                        </div>
                    </div>
                    <div class="Zpercent form-group">
                        <span class="box_text2">经手人：</span>
                        <div class="col-sm-8">
                            <div class="input-group">
                                <input type="text" class="form-control" name="managerUname" id="managerUname"
                                       placeholder="部门名称先选" readonly="readonly">
                                <input type="hidden" name="managersUid" id="managersUid">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 form-group">
                        <span class="box_text2">备注：</span>
                        <div class="">
                            <div class="input-group col-sm-8">
                                <input type="text" class="form-control" name="remark" id="remark">
                            </div>
                        </div>
                    </div>

                    <div class="rightMap">
                        <img src=""/>
                    </div>
                </div>
        </form>
    </div>
</div>
<!-------------------------------------搜索条件结束----------------------------------------->
<!-------------------------------------表格开始----------------------------------------->
<br/>
<div class="tablebox boxmainDiv" style="display: none">
</div>

<!-------------------------------------表格结束------------------------------------->
<!-------------------------------------主页面结束----------------------------------------->

<!--过滤弹出窗-->
<!-- 模态框（Modal） -->
<div class="modal fade" id="filterModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog model-dialog2">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    过滤条件
                </h4>
            </div>
            <div class="modal-body" id="model-body">
                <div class="showTab">
                    <div class="current ">
                        <form id="filterSearchForm">
                            <div class="demoText form-group">
                                <label for="" class='box_text2'>开始日期:</label>
                                <div class="col-sm-8">
                                    <input type="text" name="startTime" class="filterData form-control2"
                                           placeholder="年-月-日" value="" id="datetimepickerStart1"
                                           onblur='checkInput.checkTime(this,"#datetimepickerStart1","#datetimepickerEnd1");'/>
                                </div>
                            </div>
                            <div class="demoText form-group">
                                <label for="" class='box_text2'>结束日期:</label>
                                <div class="col-sm-8">
                                    <input type="text" name="endTime" class="filterData form-control2"
                                           placeholder="年-月-日" value="" id="datetimepickerEnd1"
                                           onblur='checkInput.checkTime(this,"#datetimepickerStart1","#datetimepickerEnd1	");'/>
                                </div>
                            </div>
                            <div class="demoText form-group">
                                <label for="" class='box_text2'>单据编号:</label>
                                <div class="col-sm-8">
                                    <input type="text" name="billsCode" value="" class="filterData form-control2"/>
                                </div>
                            </div>
                            <div class="demoText form-group">
                                <label for="" class='box_text2' style="margin-right: 15px;">往来单位:</label>
                                <div class="col-sm-8  input-group">
                                    <input type="text" class="filterData form-control" data-toggle="modal"
                                           name="contactUnitName2" id="contactUnitNameTo"/>
                                </div>
                            </div>
                            <div class="demoText form-group">
                                <label for="" class='box_text2' style="margin-right: 15px;">部门名称:</label>
                                <div class="col-sm-8  input-group">
                                    <input type="text" value="" class="depFilter form-control" placeholder=""
                                           data-toggle="modal" id="sectionNameFilter" name="sectionName"/>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" onclick="searchPayment();">查询</button>
                <button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-warning reset" onclick="reset();">重置</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<!-------------------------------------底部开始----------------------------------------->
<div class="collapse in" id="collapseExample">
    <form id="bottomForm">
        <div class="inputbox container-fluid clearfix">
            <div class="row">
                <div class="Zpercent ">
                    <span class="box_text2">公司名称  ：</span><span class="box_input"><input type="text" name="companyName"
                                                                                         class="form-control moneyCh"
                                                                                         readonly="readonly"/></span>
                </div>
                <div class="Zpercent ">
                    <span class="box_text2">过账人  ：</span><span class="box_input"><input type="text" name="postByName"
                                                                                        class="form-control moneyCh"
                                                                                        readonly="readonly"/></span>
                </div>
                <div class="Zpercent ">
                    <span class="box_text2">红冲人 ：</span><span class="box_input"><input type="text" name="invalidByName"
                                                                                       class="form-control moneyCh"
                                                                                       readonly="readonly"/></span>
                </div>
            </div>
        </div>
    </form>
</div>
<!-------------------------------------底部结束------------------------------------->
</body>
<script src="../../js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../html/muti_select/MultiSelectDropList.js?v=${version}" type="text/javascript"
        charset="utf-8"></script>
<script src="../../js/erp/funds/account-adjust.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/erp/funds/tree.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/erp/funds/common.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/bootstrapValidator.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="../../js/cw/bootstrap/js/validator-lynnjer.js?v=${version}" type="text/javascript"
        charset="utf-8"></script>

<script type="text/javascript" src="${basePath}/js/base.js?v=${version}"></script>
<!-- 打印 -->
<script type="text/javascript" charset="utf-8" src="../../js/bootstrap.min.js?v=${version}"></script>
<script type="text/javascript" charset="utf-8" src="../../js/jquery-migrate-1.2.1.min.js?v=${version}"></script>
<script type="text/javascript" charset="utf-8" src="../../js/jquery.jqprint-0.3.js?v=${version}"></script>
<script src="../../js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
<script src="../../js/erp/funds/invalid.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<!-- 菜单权限验证 -->
<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>

<script type="text/javascript">
	$(function () {
		checkRole('#billsHeaderForm');
		//checkRole('#filterSearchForm');
		$('.btnHundred button.btn,.slideThree').click(function () {
			if ($(this).html() != '保存并过账') {
				$("#billsHeaderForm").data('bootstrapValidator').resetForm();
			}
		});
	})
</script>
</html>

<!-------------------------------------模态框开始----------------------------------------->

<!-- 部门名称模态框 -->
<div class="modal fade" id="sectionModal" tabindex="-1" role="dialog" aria-labelledby="mySection" aria-hidden="true">
    <div class="modal-dialog tree-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    部门选择
                </h4>
            </div>
            <div class="modal-body tree-body">
                <ul id="sectionTreeData" class="ztree"></ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<!--往来单位模态框-->
<div class="modal fade" id="contactunitModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog model-dialog1">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    往来单位选择
                </h4>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="left">
                        <div class="left_tree">
                            <ul id="contactunitTreeData" class="ztree"></ul>
                        </div>
                    </div>
                    <!--展示列表开始-->
                    <div class="details">
                        <div class="right">
                            <input type="text" placeholder="编码、名称、助记码模糊搜索" id="contactunitRemCode"
                                   style="width:200px;"/>
                        </div>
                        <!--表格-->
                        <div class="jqGrid_wrap">
                            <table id="contactunitModalGrid" class="zxsaastable"></table>
                            <div id="contactunitGridpager"></div>
                        </div>
                    </div>
                    <!--展示列表结束-->
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
</div>


<!--经手人模态框-->
<div class="modal fade" id="managerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog model-dialog4">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">经办人选择</h4>
            </div>
            <div class="modal-body" id="model-body">
                <div class="showTab">
                    <div class="current change">
                        <div>
                            <input type="text" placeholder="编码、名称、助记码模糊搜索" style="width:200px;" id="managerRemCode"
                                   value=""/>
                            <span style="margin-left: 50px;">职位名称</span>
                            <select id="positionSelect" style="width:150px;">
                                <option value=''>请选择</option>
                            </select>
                        </div>
                        <div class="tablebox">
                            <div class="grid-wrap" style="margin-top: 10px">
                                <table id="managerModalGrid" class="zxsaastable"></table>
                                <div id="managerGridpager"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal">关闭</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
</div>
<!-------------------------------------模态框结束----------------------------------------->