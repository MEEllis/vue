<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta charset="UTF-8">
    <title>填制凭证</title>
    <link rel="stylesheet" type="text/css" href="../../css/base.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/bootstrap.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/bootstrap-select.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/iconfont.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/jquery.datetimepicker.css?v=${version}"/>
    <link rel="stylesheet" href="${basePath}/css/bootstrap-datetimepicker.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../js/skins/all.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/pagecss/treepage.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap-ui.css?v=${version}"/>

    <link rel="stylesheet" type="text/css" href="../../css/pagecss/bills.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../js/Input2select/input2select.0.2.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/font-awesome.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/font-awesome-ie7.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/nanoscroller.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/bootstrap-responsive.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/jquery.resizableColumns.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="../../css/zxsaas_plus.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/js/cw/bootstrap/css/bootstrap-dialog.min.css?v=${version}">
    <script src="../../js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery-migrate-1.2.1.min.js?v=${version}"></script>

    <script src="../../js/jquery.query.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/base/jquery.cookie.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/bootstrap-select.js?v=${version}" type="text/javascript" charset="utf-8"></script>
   <script src="../../js/icheck.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/js/bootstrap-datetimepicker1.js?v=${version}"  type="text/javascript" charset="utf-8"></script><!-- 日期(年月) -->
    <script src="${basePath}/js/inventoryCommonJs/gridConfig.js?v=${version}?v=${version}"  type="text/javascript" charset="utf-8"></script>
    <script src="../../js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/component.js?v=${version}?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/commonjs/eidit-grid-test.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/Input2select/input2select.0.2.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/jquery.nanoscroller.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/pagejs/common.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8" src="../../js/commonjs/xr.js?v=${version}"></script>
    <script src=" ../../js/cw/subject/model-subject-compare.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../html/cw/subject-management.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="../../js/cw/store.js?v=${version}" type="text/javascript"></script>
    <script src="../../js/cw/jquery.ResizableColumns.js?v=${version}" type="text/javascript"></script>
    <script src="../../js/cw/voucher.js?v=${version}" type="text/javascript"></script>
    <script src="../../js/base.js?v=${version}" type="text/javascript"></script>
    <script type="text/javascript" charset="utf-8"
            src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
    <script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery.jqprint-0.3.js?v=${version}"></script>
    <!-- 菜单权限验证 -->
    <script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
    <script type="text/javascript">
        var basePath = "${basePath}";
    </script>
    <style type="text/css">
        .ui-jqgrid-btable  tbody tr td input[type="checkbox"]{
            width: auto;
        }

        #myModal_lookup span.input-group-btn,
        #myModal_lookup span.input-group-btn > button
        {
            height: 100%;
        }
        .ui-jqgrid .ui-jqgrid-bdiv{
            overflow-x:auto;
        }
        #SubPager_left{
            width:50px;
        }
        #SubPager_center{
            text-align: left;
            width:360px;
        }
        #SubPager_right{
            width:200px;
        }
    </style>
</head>
<body>
<div class="searchbox">
    <div id="AUTH" data-code="TZPZ" class="btnbox clearfix btn-group">
        <button id="first" class='btn btn-default'>首张</button>
        <button id="prev" class='btn btn-default'>上张</button>
        <button id="next" class='btn btn-default'>下张</button>
        <button id="last" class='btn btn-default'>末张</button>
        <button id="newbill" class='btn btn-default'>新增</button>
        <button id="save" class='btn btn-default'>保存</button>
        <button id="examine" class='btn btn-default' disabled>审核</button>
        <%--<button id="accounting" class='btn btn-default'  disabled>记账</button>--%>
        <!--<button id="operation" class='btn btn-default' disabled>操作</button>

        -->
        <div class="btn-group" role="group">
            <button id="operation" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                操作
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu actionBox" style="text-align: center">
                <li><input id="B_PZGL_0008" class='e-caozuo' type='button' value='作废'/></li>
                <li><input id="B_PZGL_0009" class='e-caozuo' type='button' value='取消作废'/></li>
                <li><input id="B_PZGL_0010" class='e-caozuo' type='button' value='出纳签字'/></li>
                <li><input id="B_PZGL_0011" class='e-caozuo' type='button' value='取消出纳签字'/></li>
                <li><input id="B_PZGL_0012" class='e-caozuo' type='button' value='主管签字'/></li>
                <li><input id="B_PZGL_0013" class='e-caozuo' type='button' value='取消主管签字'/></li>
                <li><input id="B_PZGL_0014" class='e-caozuo' type='button' value='标错'/></li>
                <li><input id="B_PZGL_0015" class='e-caozuo' type='button' value='取消标错'/></li>
            </ul>
        </div>


        <button id="flow" class='btn btn-default' disabled>流量</button>
        <button id="lookup" class='btn btn-default'>查找</button>
        <button id="check" class='btn btn-default' disabled>联查</button>
        <button id="print" class='btn btn-default'>打印</button>
        <%-- <button id="signOut" class='btn btn-default'  disabled>退出</button>--%>

        <a class="pull-right"><i class="iconfont icon-xia"></i><i class="iconfont icon-shang"></i></a>
    </div>

    <div class="inputbox">
        <form class="form">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-2" style="width:262px;">
                        <div class="input-group">
                            <span class="input-group-addon input-group-title" id="basic-addon1"> 凭证字号：</span>
                            <input id='id' type="hidden"/>
                            <input id="proof" readonly="readonly" type="text" class="form-control" value="记" aria-describedby="basic-addon1"
                                   name="djbh" maxlength="2" style="width: 80px;">
                            <input id='ifyw' type="hidden" value='${ifyw}'/>
                            <button id="browse" style="display:none;" type="button" data-src="listtable.json"
                                    data-valin="zyid" data-namecol="md" data-valcol="id"></button>
                        </div>
                    </div>
                    <div class="col-xs-2" style="position: relative;left:-60px;">
                        <div class="input-group">
                            <!--<span class="input-group-addon input-group-title" id="basic-addon1"> 凭证编号：</span>-->
                            <input id='voucherNum' type="text" class="form-control" placeholder="凭证编号"
                                   aria-describedby="basic-addon1" name="cgy" maxlength='7'>
                        </div>
                    </div>
                    <div class="col-xs-3 ">
                        <div class="input-group">
                            <span class="input-group-addon input-group-title" id="basic-addon1">凭证日期：</span>
                            <input id='date' readonly type="text" class="form-control timebox" placeholder="凭证日期"
                                   aria-describedby="basic-addon1" name="gys" value=''>
                        </div>
                    </div>
                    <div class="col-xs-3 ">
                        <div class="input-group">
                            <span class="input-group-addon input-group-title" id="basic-addon1"> 附单据数：</span>
                            <input id="elseData" type="text" class="form-control" placeholder="附单据数"
                                   aria-describedby="basic-addon1" name="djbh">
                        </div>
                    </div>

                    <span id='seal-wrap'>
                    	
                    </span>

                </div>
            </div>
        </form>
    </div>
</div>
<div class="grp_table" style="border: 1px solid #cfcfcf;min-width: 1320px;">
    <table class="zxsaastable headbox" style="width:auto ;">
        <thead>
        <tr>
            <th rowspan="2" style="width: 50px;">序号</th>
            <th rowspan="2" style="width: 150px;"><font class="red">*</font>摘要<label class="lab1"></label></th>
            <th rowspan="2" style="width: 250px;"><font class="red">*</font>科目名称<label class="lab2"></label></th>
            <th rowspan="2" style="width: 250px;">辅助项<label class="lab3"></label></th>
            <th style="width: 232px;">借方</th>
            <th style="width: 232px;">贷方</th>
            <th rowspan="2" style="width:150px">业务部门</th>
        </tr>
        <tr>
            <th class="Amountbox">
                <font>亿</font>
                <font>千</font>
                <font class="blueline">百</font>
                <font>十</font>
                <font>万</font>
                <font class="blueline">千</font>
                <font>百</font>
                <font>十</font>
                <font class="redline">元</font>
                <font>角</font>
                <font class="lastline">分</font>

            </th>
            <th class="Amountbox">
                <font>亿</font>
                <font>千</font>
                <font class="blueline">百</font>
                <font>十</font>
                <font>万</font>
                <font class="blueline">千</font>
                <font>百</font>
                <font>十</font>
                <font class="redline">元</font>
                <font>角</font>
                <font class="lastline">分</font>
            </th>

        </tr>
        </thead>
    </table>
    <div class=" nano" style="height: 500px;">
        <div class="none">
            <div>
                <input type="hidden"  id="BusinessDepartModal" value="业务部门模态框"/>
            </div>
            <input type="hidden"  id="contactsUnitModal" value="辅助项--往来单位"/>
            <div>
                <input type="hidden"  id="fuzhuDepartModal" value="部门模态框"/>
            </div>
            <div>
                <input type="hidden"  id="employeeModal" value="职员部门模态框"/>
            </div>
        </div>
        <div class="nano-content">
            <table class="zxsaastable inputboxtable" style="width:auto ;">

                <tbody>
                <tr>
                    <td style="width: 50px;">1</td>
                    <td style="width: 150px;">
                        <input type="text" name="zy" data-autocompletetablesrc="" data-type="table" data-valin="zyid"
                               data-namecol="md" data-valcol="id"/>
                        <input type="hidden" name="zyid" id="aid" value=""/>
                    </td>
                    <td style="width: 250px;">
                        <input type="text" name="hsjr" data-src="" data-valin="zyid" data-namecol="md"
                               data-valcol="id"/>
                        <input class="subjectId" type="hidden" value=""/>
                        <input class="SubCode" type="hidden" value=""/>
                        <input class="fz" type="hidden" value=""/>
                    </td>
                    <td style="width: 250px;">
                        <input type="text" name="hsjr" data-src="" readonly/>
                        <input class="wldw" type="hidden"/>
                        <input class="bm" type="hidden"/>
                        <input class="yg" type="hidden"/>
                        <input class="auxiliaryId1" type="hidden" value=""/>
                        <input class="auxiliaryId2" type="hidden" value=""/>
                        <input class="auxiliaryId3" type="hidden" value=""/>
                        <input class="auxiliaryId1name" type="hidden" value=""/>
                        <input class="auxiliaryId2name" type="hidden" value=""/>
                        <input class="auxiliaryId3name" type="hidden" value=""/>
                    </td>
                    <td class="Amountbox Debit" style="width: 232px;">
                        <div>
                            <font>&nbsp;</font>
                            <font>&nbsp;</font>
                            <font class="blueline">&nbsp;</font>
                            <font>&nbsp;</font>
                            <font>&nbsp;</font>
                            <font class="blueline">&nbsp;</font>
                            <font>&nbsp;</font>
                            <font>&nbsp;</font>
                            <font class="redline">&nbsp;</font>
                            <font>&nbsp;</font>
                            <font class="lastline">&nbsp;</font>
                        </div>
                        <input type="text" name="je" maxlength="13"/></td>
                    <td class="Amountbox Credit" style="width:232px;">
                        <div>
                            <font>&nbsp;</font>
                            <font>&nbsp;</font>
                            <font class="blueline">&nbsp;</font>
                            <font>&nbsp;</font>
                            <font>&nbsp;</font>
                            <font class="blueline">&nbsp;</font>
                            <font>&nbsp;</font>
                            <font>&nbsp;</font>
                            <font class="redline">&nbsp;</font>
                            <font>&nbsp;</font>
                            <font class="lastline">&nbsp;</font>
                        </div>
                        <input type="text" name="zkl" maxlength="13"/>
                    </td>
                    <td style="width:150px;">
                        <input class='BusinessDepart' type="text" readonly/>
                        <input class='BusinessDepartId' type="hidden"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div>
        <table class="zxsaastable footbox" style="width:auto ;">

            <tfoot>
            <tr>
                <td style="width: 50px;">合计</td>
                <td colspan="3" style="width: 650px;" class="Capital">

                </td>

                <td class="DebitSum Amountbox" style="width: 232px;">
                    <div>
                        <font>&nbsp;</font>
                        <font>&nbsp;</font>
                        <font class="blueline">&nbsp;</font>
                        <font>&nbsp;</font>
                        <font>&nbsp;</font>
                        <font class="blueline">&nbsp;</font>
                        <font>&nbsp;</font>
                        <font>&nbsp;</font>
                        <font class="redline">&nbsp;</font>
                        <font>&nbsp;</font>
                        <font class="lastline">&nbsp;</font>
                    </div>
                    <input type="hidden" name="zkl" maxlength="13"/>
                </td>
                <td class="CreditSum Amountbox" style="width:232px;">
                    <div>
                        <font>&nbsp;</font>
                        <font>&nbsp;</font>
                        <font class="blueline">&nbsp;</font>
                        <font>&nbsp;</font>
                        <font>&nbsp;</font>
                        <font class="blueline">&nbsp;</font>
                        <font>&nbsp;</font>
                        <font>&nbsp;</font>
                        <font class="redline">&nbsp;</font>
                        <font>&nbsp;</font>
                        <font class="lastline">&nbsp;</font>
                    </div>
                    <input type="hidden" name="zkl" maxlength="13"/>
                </td>
                <td style='width:150px;'>

                </td>
            </tr>
            </tfoot>
        </table>

    </div>
</div>

<div class="container-fluid mt20 footer">
    <form class="form">
        <div class="row">
            <div class="col-xs-3 ">
                <div class="input-group">
                    <span class="input-group-addon input-group-title" id="basic-addon1"> 记账人：</span>
                    <input id='bookkeeper' type="text" class="form-control" aria-describedby="basic-addon1" name="fkfs"
                           disabled>
                </div>
            </div>
            <div class="col-xs-3 ">
                <div class="input-group">
                    <span class="input-group-addon input-group-title" id="basic-addon1"> 审核人：</span>
                    <input id='reviewer' type="text" class="form-control" aria-describedby="basic-addon1" name="yfje"
                           disabled>
                </div>
            </div>
            <div class="col-xs-3 ">
                <div class="input-group">
                    <span class="input-group-addon input-group-title" id="basic-addon1"> 出纳：</span>
                    <input id='cashier' type="text" class="form-control" aria-describedby="basic-addon1" name="wfje"
                           disabled>
                </div>
            </div>
            <div class="col-xs-3">
                <div class="input-group">
                    <span class="input-group-addon input-group-title" id="basic-addon1"> 制单人：</span>
                    <input id='singleMan' type="text" class="form-control" aria-describedby="basic-addon1" name="zdzk"
                           disabled>
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal fade addbox" id="maxselect">
    <div class="modal-dialog">
        <div class="modal-content">
            <form id="menuAdminForm" class="form">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">常用摘要参照</h4>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="container" style="width:100%;">
                                <div class="searchNav">
                                    <label for="searchType" style="font-size: 18px">录入常用摘要:</label>
                                    <input id="searchType" type="text" class="form-control"/>
                                    <input class="filNav btn btn-info" type="button" value="录入"/>
                                </div>
                                <!--会计科目-->
                                <div class="details">
                                    <!--表格-->
                                    <div class="jqGrid_wrapper">
                                        <table id="accountTable"></table>
                                        <div id="accountTablePager"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-primary addbutton">保存</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal"> 关闭</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!--辅助项-->
<div class="modal fade addbox" id="myModelAss">
    <div class="modal-dialog" style="width: 600px;">
        <div class="modal-content">
            <form id="menuAdminForm2" class="form">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">辅助项</h4>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xs-12">
                                <!--查询类别：<select>
                                    </select>-->
                            </div>
                        </div>
                        <div class="row">
                            <div class="container" style="width:100%;">
                                <div style="float: left;width:100%;">
                                    <!--会计科目-->
                                    <div class="details">
                                        <!--表格-->
                                        <div class="jqGrid_wrapper">
                                            <table id="AssTable"></table>
                                            <div id="AssPager"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button id='ModelAss_sure' type="button" class="btn btn-primary addbutton" data-dismiss="modal">保存
                    </button>
                    <button id='ModelAss_cancel' type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- 流量 -->
<div class="modal fade bs-example-modal-lg" id="myModal_flow" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">现金流量录入</h4>
            </div>
            <div class="modal-body">
                <div class='flowTop'>
                    <table id="cashFlowTop"></table>
                    <div id='cashFlowTopPager'></div>
                </div>
                <p class='flowP'>净流入：<span class='flowSpan'>0.00</span></p>
                <div class='flowBottom'>
                    <table id="cashFlowBottom"></table>
                    <div id='cashFlowBottomPager'></div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="flow_distribution" type="button" class="btn btn-info" data-dismiss="modal">分配</button>
                <button id="flow_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <!-- 
                <button id="flow_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                 -->
            </div>
        </div>
    </div>
</div>
<!-- 查找 -->
<div class="modal fade bs-example-modal-lg" id="myModal_lookup" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">查询条件</h4>
            </div>

            <div class="modal-body">
                <form action="" class="form-inline" id="searchQuery">
                    <div class="form-group col-sm-6">
                        <label for="creatDate" class="width-25">
                            <div class="input-group">
                                <input type="radio" id="creatDate" name="timeSection" checked>
                                凭证日期:
                            </div>

                        </label>
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="billsBeginDateStr" id="startDate" readonly
                                   placeholder="请选择开始日期">
                        </div>
                        --
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="billsEndDateStr" id="endDate" readonly
                                   placeholder="请选择结束日期">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">

                        <label for="accountingPeriod" class="width-25">
                            <div class="input-group">
                                <input type="radio" id="accountingPeriod" name="timeSection">
                                会计期间:
                            </div>
                        </label>
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control " name="billsBeginDateStr" id="startPeriod" readonly
                                   disabled placeholder="请选择开始日期">

                        </div>

                        --
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="billsEndDateStr" id="endPeriod" readonly
                                   disabled placeholder="请选择结束日期">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="startNum" class="width-25">凭证编号:</label>
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="billsBeginDateStr" id="startNum"
                                   onkeyup="this.value=this.value.replace(/\D/g,'')">
                        </div>
                        --
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="billsEndDateStr" id="endNum"
                                   onkeyup="this.value=this.value.replace(/\D/g,'')">
                        </div>
                    </div>

                    <div class="form-group col-sm-6 ">
                        <label for="OperatorBusinessInput"  class='width-25'>会计科目:</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control" id="OperatorBusinessInput" placeholder="请选择会计科目">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label  class='width-25'>方向:</label>
                        <label class="input-group">
                            <input type="radio" checked name="directionState" value="">
                            全部
                        </label>
                        <label class="input-group">
                            <input type="radio" name="directionState" value="1">
                            借方
                        </label>
                        <label class="input-group">
                            <input type="radio" name="directionState" value="0">
                            贷方
                        </label>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="startMoney" class='width-25' >金额:</label>
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="money" id="startMoney" onkeyup="functionObjExtent.getnum(this)">
                        </div>
                        --
                        <div class="input-group col-sm-4">
                            <input type="text" class="form-control" name="billsEndDateStr" id="endMoney"
                                   onkeyup="functionObjExtent.getnum(this)">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label  class="width-25">审核状态:</label>
                        <label class="input-group">
                            <input type="radio" checked name="auditState" value="">
                            全部
                        </label>
                        <label class="input-group">
                            <input type="radio" name="auditState" value="1">
                            已审核
                        </label>
                        <label class="input-group">
                            <input type="radio" name="auditState" value="0">
                            未审核
                        </label>

                        <label></label>
                    </div>

                    <div class="form-group col-sm-6">
                        <label class='width-25'>流量分配:</label>
                        <label class="input-group">
                            <input type="radio" checked name="flowAllocating" value="">
                            全部
                        </label>

                        <label class="input-group">
                            <input type="radio" name="flowAllocating" value="1">
                            已分配
                        </label>
                        <label class="input-group">
                            <input type="radio" name="flowAllocating" value="0">
                            未分配
                        </label>

                    </div>
                    <div class="form-group col-sm-6">
                        <label class='width-25'>记账状态:</label>


                        <label class="input-group">
                            <input type="radio"  name="chargeState" value="">
                            全部
                        </label>

                        <label class="input-group">
                            <input type="radio" name="chargeState" value="1">
                            已记账
                        </label>

                        <label class="input-group">
                            <input type="radio" checked name="chargeState" value="0">
                            未记账
                        </label>
                    </div>

                    <div class="form-group col-sm-6">
                        <label class='width-25'>作废状态:</label>
                        <label class="input-group">
                            <input type="radio" checked name="cancellationState" value="">
                            全部
                        </label>
                        <label class="input-group">
                            <input type="radio" name="cancellationState" value="1">
                            已作废
                        </label>
                        <label class="input-group">
                            <input type="radio" name="cancellationState" value="0">
                            未作废
                        </label>
                    </div>

                    <div class="form-group col-sm-6">
                        <label class='width-25'>标错状态:</label>
                        <label class="input-group">
                            <input type="radio" checked name="wrongState" value="">
                            全部
                        </label>

                        <label class="input-group">
                            <input type="radio" name="wrongState" value="1">
                            已标错
                        </label>
                        <label class="input-group">
                            <input type="radio" name="wrongState" value="0">
                            未标错
                        </label>
                    </div>


                    <div class="form-group col-sm-6">
                        <label for="voucherFrom" class='width-25'>凭证来源:</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control" id="voucherFrom" placeholder="请选择凭证来源">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="operatingDepartment" class='width-25'>业务部门:</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control" id="operatingDepartment" placeholder="请选择业务部门">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="contactsUnitName"  class='width-25'>往来单位:</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control" id="contactsUnitName" placeholder="请选择往来单位">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="auxiliaryDepartment" class='width-25'>辅助部门:</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control" id="auxiliaryDepartment" placeholder="请选择辅助部门">
                        </div>
                    </div>

                    <div class="form-group col-sm-6">
                        <label for="employee" class='width-25'>职员:</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control" id="employee" placeholder="请选择职员" disabled>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="lookup_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="lookup_sure" type="button" class="btn btn-primary" data-dismiss="modal">查询</button>
                <button id="lookup_reset" type="button" class="btn btn-warning " >重置</button>
            </div>
        </div>
    </div>
</div>
<!--科目-->
<div class="modal fade addbox" id="myModelSub">
    <div class="modal-dialog" style="width: 800px; height: 500px;">
        <div class="modal-content">
            <form id="menuAdminForm1" class="form">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">科目</h4>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-xs-12">

                            </div>
                        </div>
                        <div class="row">
                            <div class="container" style="width:100%;">
                                <div class="searchNav" style="margin-bottom: 5px">
                                    <label for="searchType1" style="font-size: 18px">查询类别:</label>
                                    <input id="searchType1" type="text" class="form-control"/>
                                    <input class="fil btn btn-info" type="button" value="过滤"
                                           style='height:30px;padding:0 10px;'/>
                                </div>
                                <div style="float: left;width:200px;">
                                    <div class="left_tree">
                                        <ul id="accountTreeSub" class="ztree"></ul>
                                    </div>
                                </div>
                                <div style="float: left;width:550px;">
                                    <div class="details">
                                        <%--<div class="jqGrid_wrapper">--%>
                                            <table id="SubTable"></table>
                                            <div id="SubPager"></div>
                                        <%--</div>--%>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id='myModelSub_sure' type="button" class="btn btn-primary addbutton" data-dismiss="modal">
                        确定
                    </button>

                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade bs-example-modal-lg" id="myModal_smflow" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" style='width:1250px;'>
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">现金流量辅助弹窗</h4>
            </div>
            <div class="modal-body">
                <div style="float: left;min-width:200px;height:617px;overflow-y: auto;">
                    <div class="left_tree">
                        <ul id="smflowTree" class="ztree"></ul>
                    </div>
                </div>
                <div style="float: left;width:1000px;">
                    <div class="details">
                        <div class="jqGrid_wrapper">
                            <table id="smflowTable"></table>
                            <div id="smflow"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="smflow_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="smflow_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
            </div>
        </div>
    </div>
</div>
<div class="rowsclick">
    <a class="btn btn-primary btn-sm add">增行</a><a class="btn btn-primary btn-sm inster">插行</a><a
        class="btn btn-primary btn-sm copy">复制行</a><a class="btn btn-primary btn-sm delVoc">删行</a>
</div>
<div class="zxsaaspage" style='display:none;'><a>上一页</a><a>1</a><a class="active">2</a><a>3</a><a>4</a><a>1</a><a>1</a>
</div>
</body>
</html>








