<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<head>
	<link rel="stylesheet" type="text/css" href="../../css/base.css" />
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="../../css/bootstrap-select.css" />
	    <link rel="stylesheet" type="text/css" href="../../css/cw/zTreeStyle/zTreeStyle.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/iconfont.css" />
		<link rel="stylesheet" type="text/css" href="../../css/jquery.datetimepicker.css" />
		<link rel="stylesheet" type="text/css" href="../../js/skins/all.css" />
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/treepage.css" />
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/ui.jqgrid-bootstrap-ui.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/zxsaas_plus.css" />
		<link rel="stylesheet" type="text/css" href="../../css/pagecss/bills.css" />
		<link rel="stylesheet" type="text/css" href="../../js/Input2select/input2select.0.2.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/font-awesome.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/font-awesome-ie7.css"/>
		<link rel="stylesheet" type="text/css" href="../../css/nanoscroller.css"/>
		<script src="../../js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/jquery.query.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/base/jquery.cookie.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/cw/jquery.ztree.all-3.5.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/bootstrap-select.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/icheck.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/jquery.jqGrid.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/curdmodal.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/Input2select/input2select.0.2.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/jquery.nanoscroller.js" type="text/javascript" charset="utf-8"></script>
		<script src="../../js/pagejs/common.js" type="text/javascript" charset="utf-8"></script>
		<script src=" ../../js/cw/subject/model-subject-compare.js" type="text/javascript" charset="utf-8"></script>
		<script src="subject-management.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" charset="utf-8" src="../../js/cw/subject/voucher.js"></script>
	</head>
<body>
<div class="searchbox">
    <div class="btnbox clearfix ">
        <a class="save">保存</a>

        <a class="pull-right"><i class="iconfont icon-xia"></i><i class="iconfont icon-shang"></i></a>
    </div>

    <div class="inputbox">

        <form class="form">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-2" style="width:262px;">
                        <div class="input-group">
                            <span class="input-group-addon input-group-title" id="basic-addon1"> 凭证字号：</span>
                            <input id="proof" type="text" class="form-control" placeholder="类别" aria-describedby="basic-addon1"
                                   name="djbh" maxlength="2" style="width: 80px;">
                            <button id="browse" type="button" data-src="listtable.json" data-valin="zyid" data-namecol="md" data-valcol="id"></button>
                        </div>
                    </div>
                    <div class="col-xs-2" style="position: relative;left:-60px;">
                        <div class="input-group">
                            <!--<span class="input-group-addon input-group-title" id="basic-addon1"> 凭证编号：</span>-->
                            <input type="text" class="form-control" placeholder="凭证编号" aria-describedby="basic-addon1"
                                   name="cgy">
                        </div>
                    </div>
                    <div class="col-xs-3 ">
                        <div class="input-group">
                            <span class="input-group-addon input-group-title" id="basic-addon1"> 制单日期：</span>
                            <input type="text" class="form-control timebox" placeholder="制单日期"
                                   aria-describedby="basic-addon1" name="gys">
                        </div>
                    </div>
                    <div class="col-xs-3 ">
                        <div class="input-group">
                            <span class="input-group-addon input-group-title" id="basic-addon1"> 附单据数：</span>
                            <input id="elseData" type="number" class="form-control" placeholder="附单据数" aria-describedby="basic-addon1"
                                   name="djbh">
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </div>
</div>
<div class="grp_table" style="border: 1px solid #cfcfcf;">

    <table class="zxsaastable headbox" style="width:auto ;">
        <thead>
        <tr>
            <th rowspan="2" style="width: 50px;">序号</th>
            <th rowspan="2" style="width: 150px;"><font class="red">*</font>摘要</th>
            <th rowspan="2" style="width: 250px;">科目名称</th>
            <th rowspan="2" style="width: 250px;">辅助项</th>
            <th style="width: 232px;">借方</th>
            <th style="width: 232px;">贷方</th>

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
        <div class="nano-content">
            <table class="zxsaastable inputboxtable" style="width:auto ;">

                <tbody>
                <tr>
                    <td style="width: 50px;">1</td>
                    <td style="width: 150px;">
                        <input type="text" name="zy" data-autocompletetablesrc="/manager/cw/pz/getSummary" data-type="table"
                               data-valin="zyid" data-namecol="md" data-valcol="id"/>
                        <input type="hidden" name="zyid" id="aid" value=""/>
                    </td>
                    <td style="width: 250px;"><input type="text" name="hsjr" data-src="/manager/cw/pz/getSubject" data-valin="zyid" data-namecol="md" data-valcol="id"/></td>
                    <td style="width: 250px;"><input type="text" name="hsjr" data-src="listtable.json"/></td>
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
                        <input type="text" name="je" maxlength="11"/></td>
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
                        <input type="text" name="zkl" maxlength="11"/></td>
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
                    <input type="hidden" name="zkl" maxlength="11"/>
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
                    <input type="hidden" name="zkl" maxlength="11"/>
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
                    <input type="text" class="form-control" placeholder="记账人" aria-describedby="basic-addon1"
                           name="fkfs">
                </div>
            </div>
            <div class="col-xs-3 ">
                <div class="input-group">
                    <span class="input-group-addon input-group-title" id="basic-addon1"> 审核人：</span>
                    <input type="text" class="form-control" placeholder="审核人" aria-describedby="basic-addon1"
                           name="yfje">
                </div>
            </div>
            <div class="col-xs-3 ">
                <div class="input-group">
                    <span class="input-group-addon input-group-title" id="basic-addon1"> 出纳：</span>
                    <input type="text" class="form-control" placeholder="出纳" aria-describedby="basic-addon1"
                           name="wfje">
                </div>
            </div>
            <div class="col-xs-3">
                <div class="input-group">
                    <span class="input-group-addon input-group-title" id="basic-addon1"> 制单人：</span>
                    <input type="text" class="form-control" placeholder="制单人" aria-describedby="basic-addon1"
                           name="zdzk">
                </div>
            </div>
        </div>
    </form>
</div>
<div class="modal fade addbox" id="maxselect">
    <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
            <form id="menuAdminForm" class="form">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">

                    </h4>
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
                                <div class="searchNav">
                                    <label for="searchType" style="font-size: 18px">查询类别:</label>
                                    <input id="searchType" type="text"/><span class="downAngel"></span>
                                    <input type="text" style="font-size: 20px;margin:3px;"/>
                                    <input class="fil" type="button" value="过滤"/>
                                    <input class="filNav" type="button" value="栏目"/>
                                </div>
                                <div style="float: left;width:200px;">
                                    <div class="left_tree">
                                        <ul id="accountTree" class="ztree"></ul>
                                    </div>
                                </div>
                                <div style="float: left;width:80%;">
                                    <!--会计科目-->
                                    <div class="details">
                                        <!--表格-->
                                        <div class="jqGrid_wrapper">
                                            <table id="accountTable"></table>
                                            <div id="pager"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-primary addbutton">
                        保存
                    </button>

                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        关闭
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<!--科目-->
<div class="modal fade addbox" id="myModelSub">
    <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
            <form id="menuAdminForm1" class="form">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">
                    </h4>
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
                                <div class="searchNav">
                                    <label for="searchType1" style="font-size: 18px">查询类别:</label>
                                    <input id="searchType1" type="text"/><span class="downAngel"></span>
                                    <input type="text" style="font-size: 20px;margin:3px;"/>
                                    <input class="fil" type="button" value="过滤"/>
                                    <input class="filNav" type="button" value="栏目"/>
                                </div>
                                <div style="float: left;width:200px;">
                                    <div class="left_tree">
                                        <ul id="accountTreeSub" class="ztree"></ul>
                                    </div>
                                </div>
                                <div style="float: left;width:80%;">
                                    <!--会计科目-->
                                    <div class="details">
                                        <!--表格-->
                                        <div class="jqGrid_wrapper">
                                            <table id="SubTable"></table>
                                            <div id="SubPager"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-primary addbutton">
                        保存
                    </button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        关闭
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<!--辅助项-->
<div class="modal fade addbox" id="myModelAss">
    <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
            <form id="menuAdminForm2" class="form">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">
                    </h4>
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
                                <div class="searchNav">
                                    <label for="searchType2" style="font-size: 18px">查询类别:</label>
                                    <input id="searchType2" type="text"/><span class="downAngel"></span>
                                    <input type="text" style="font-size: 20px;margin:3px;"/>
                                    <input class="fil" type="button" value="过滤"/>
                                    <input class="filNav" type="button" value="栏目"/>
                                </div>
                                <div style="float: left;width:200px;">
                                    <div class="left_tree">
                                        <ul id="accountTreeAss" class="ztree"></ul>
                                    </div>
                                </div>
                                <div style="float: left;width:80%;">
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
                    <button type="button" class="btn btn-primary addbutton">
                        保存
                    </button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                        关闭
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="rowsclick">
    <a class="btn btn-primary btn-sm add">增行</a><a class="btn btn-primary btn-sm inster">插行</a><a
        class="btn btn-primary btn-sm copy">复制行</a><a class="btn btn-primary btn-sm del">删行</a>
</div>
<div class="zxsaaspage"><a>上一页</a><a>1</a><a class="active">2</a><a>3</a><a>4</a><a>1</a><a>1</a></div>
</body>

</html>

<!-- 流量分配 -->
<div class="modal fade flow" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
<div class="modal-dialog modal-lg">
	<div class="modal-content">
	<div class="modal-header">
				<div class="row">
					<div class="col-md-12">
						现金流量录入
					</div>
				</div>
			</div>
			<div class="modal-body">
				<div class="container-fluid">
					<div class="row">
						<div style="height: 180px">
						<table class="zxsaastable" id="flow">
							<!--<table style="width: 100%;" border="1px" cellspacing="1" id="flow">
							--><thead>
								<tr style="text-align: center; COLOR: #0076C8; BACKGROUND-COLOR: #F4FAFF; font-weight: bold">
									<td>现金流量科目</td>
									<td>方向</td>
									<td>金额</td>
								</tr>
							</thead>
							<tbody style="text-align: center; font-weight: bold" > 
							</tbody>
							</table>
						</div>
						<div align="right">
						净流入：<p id="cashsum"></p>
						</div>
						<div style="margin-top: 10px;height: 200px">
						<table class="zxsaastable" id="flowlist">
						<thead>
								<tr style="text-align: center; COLOR: #0076C8; BACKGROUND-COLOR: #F4FAFF; font-weight: bold">
									<td>流量项目</td>
									<td>项目方向</td>
									<td>金额</td>
								</tr>
						</thead>
						<tbody style="text-align: center; font-weight: bold">
						
						</tbody>
							</table>
						</div>
						<div align="right">
						合计： <p id="sum"></p>
						</div>
						<div align="right">
						<button>分配</button>
						<button>手工分配</button>
						<button data-dismiss="modal">取消</button>
						</div>
					</div>
			</div>
	 	</div>
	 </div>
 </div>
</div>

