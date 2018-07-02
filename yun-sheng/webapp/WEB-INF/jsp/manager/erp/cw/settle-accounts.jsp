<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <title>结账</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <!-- 引入文件 -->
    <jsp:include page="../../Include/import_cw.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/erp/cw/settle-accounts.css?v=${version}"/>
    <script type="text/javascript">
        //**********全局变量
        //基本目录
        var basePath = "${basePath}";
   
    	function print(){
    		$("#errorPrint").jqprint({
    		     debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
    		     importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
    		     printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
    		     operaSupport: true//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
    		});
    	}
    </script>
</head>
<body>
<input id="AUTH" type="hidden" data-code="YMJZ">
<!-- 财务结账 -->
<div class="modal fade" id="settleAccountsModal" tabindex="-1" role="dialog" aria-hidden="false" data-backdrop="static">
    <div class="modal-dialog" style="width:520px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title">财务结账</h4>
            </div>
            <div class="modal-body" style="padding-bottom: 0px;">
                <%--产品要求再加两个按钮--%>
                <div class="" style="margin-bottom: 15px">
                    <button type="button" class="btn " id="creatNextBtn">生成下一年度基础资料</button>
                    <button type="button" class="btn mr15"  id="toNextBtn">结转余额至下一年</button>
                </div>

                <!-- 工具栏  -->
                <div style="width: 100%;padding-bottom: 2px;">
			          <span>年度:
					      <select class="form-control input-sm" id="yearSelect" style="display: inline;width: 75px;">
                              <option value="2016">2016</option>
                              <option value="2015">2015</option>
                              <option value="2014">2014</option>
                          </select>  
			          </span>&nbsp;&nbsp;
                    <span style="width:150px;display: inline-block;">待结账期间：<span id="settleDate"></span></span>
                    <span>取消结账期间：<span id="unSettleDate"></span></span>
                </div>
                <!-- 期间表格 -->
                <div class="row gridBody" style="width: 450px;;">
                    <div class="col-md-12" style="padding-left: 0px;">
                        <div class="jqGrid_wrapper">
                            <table id="dataGrid"></table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 模态框底部部分 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">退出</button>
                <button type="button" class="btn btn-default" onclick="openComparemModel()">下一步</button>
                <button type="button" class="btn btn-default" onclick="cancle()">取消结账</button>
            </div>
        </div>
    </div>
</div>
<!--  财务期末结账  对账-->
<div class="modal fade" id="cwdzModal" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="modal-dialog" style="width:600px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title">
                    财务期末结账
                </h4>
            </div>
            <div class="modal-body" style="padding-bottom: 0px;">
                <!-- 当前操作步骤 -->
                <div style="width: 100%;height: 40px;">
                    <span>对账</span>
                </div>
                <!-- 对账内容-->
                <div>
                    <div style="margin-bottom: 6px;">核对<span class="currYear"></span>年<span class="currMonth"></span>月账簿
                    </div>
                    <div style="padding-left: 100px;"><span id="dzResult1"></span><span>总账与明细账</span></div>
                    <div style="padding-left: 100px;"><span id="dzResult2"></span><span>总账与辅助总账</span></div>
                    <div style="padding-left: 100px;"><span id="dzResult3"></span><span>辅助总账与辅助明细账</span></div>
                </div>
                <!-- 在线提示-->
                <div style="color: red;" class="doInfo">对账</div>
            </div>
            <!-- 模态框底部部分 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default" onclick="openComparemErrorInfoModel()">查看对账错误明细</button>
                <button type="button" class="btn btn-default" onclick="openWorkInfoModel()">下一步</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">退出</button>
            </div>
        </div>
    </div>
</div>
<!--  财务期末结账  月度工作报告-->
<div class="modal fade" id="gzbgModal" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="modal-dialog" style="width:600px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title">财务期末结账</h4>
            </div>
            <div class="modal-body" style="padding-bottom: 0px;">
                <!-- 当前操作步骤 -->
                <div style="width: 100%;height: 40px;">
                    <span>月度工作报告</span>
                </div>
                <!-- 月度工作报告-->
                <div>
                    <span><span class="currYear"></span>年<span class="currMonth"></span>月工作报告</span>
                    <div>
                        <span>（一）本期损益未结转为0的一级科目</span>
                        <div id="weijiezhuan" style="padding: 10px;padding-bottom: 0px;padding-top:0px;"> 无</div>
                        <span>（二）本期账面试算平衡表</span>
                        <div>
                            <span id="allR"></span>
                            <span>余额平衡</span>
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th>科目类型</th>
                                    <th>方向</th>
                                    <th>余额</th>
                                    <th>科目类型</th>
                                    <th>方向</th>
                                    <th>余额</th>
                                </tr>
                                </thead>
                                <tbody id="groupSubjectTabledddd">
                                </tbody>
                            </table>
                            <span id="phResult"></span>
                        </div>
                        <span>（三）本期工作量</span><br/>
                        <span id="workcuont"></span><br/>
                        <span>（四）本期凭证断号</span><br/>
                        <span id="dhhhhh"></span>
                    </div>
                </div>
                <!-- 在线提示-->
                <div style="color: red;" class="doInfo">月度工作报告</div>
            </div>
            <!-- 模态框底部部分 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default" onclick="()">打印月度工作报告</button>
                <button type="button" class="btn btn-default" onclick="openComparemModel()">上一步</button>
                <button type="button" class="btn btn-default" onclick="openSettleModel()">下一步</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">退出</button>
            </div>
        </div>
    </div>
</div>
<!--  财务期末结账  结账-->
<div class="modal fade" id="cwjzModal" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="modal-dialog" style="width:600px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title">财务期末结账</h4>
            </div>
            <div class="modal-body" style="padding-bottom: 0px;">
                <!-- 当前操作步骤 -->
                <div style="width: 100%;height: 40px;">
                    <span>结账</span>
                </div>
                <!-- 提示语-->
                <div>
                    <span class="currYear"></span>年<span class="currMonth"></span>月工作通过月度工作检查，可以进行结账！
                    <div class="autoCreatBox" style="color: #e6e6e6;">
                        <input type="checkbox" class="autoCreat" style="float:left;margin-right: 5px" disabled> 自动生成下一年度期初信息
                    </div>
                </div>
                <!-- 在线提示-->
                <div style="color: red;" class="doInfo">结账</div>
            </div>
            <!-- 模态框底部部分 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-default" onclick="openWorkInfoModel()">上一步</button>
                <button type="button" class="btn btn-default" onclick="closingAccounts()">结账</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">退出</button>
            </div>
        </div>
    </div>
</div>
<!--  财务期末结账  对账错误表格-->
<div class="modal fade" id="cwdzErroInfoModal" tabindex="-1" role="dialog" aria-hidden="false">
    <div class="modal-dialog" style="width:900px;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> &times;</button>
                <h4 class="modal-title">对账错误信息表</h4>
            </div>
            <div class="modal-body" style="padding-bottom: 0px;">
                <div class="row">
                    <div class="col-md-12" style="padding-left: 12px;">
                        <div class="jqGrid_wrapper" id="errorPrint">
                            <table id="dataGrid2"></table>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;text-align: center;padding: 3px;">
                    <!-- <button type="button" class="btn btn-default" onclick="">打印设置</button> -->
                    <button type="button" class="btn btn-default" onclick="print()">打印</button>
                    <!-- <button type="button" class="btn btn-default" onclick="()">预览</button> -->
                    <button type="button" class="btn btn-default" data-dismiss="modal">退出</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 引用自定义JS文件-->
<script type="text/javascript" src="${basePath}/js/erp/cw/settle-accounts.js?v=${version}"></script>
<!-- 菜单权限验证 -->
<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</body>
</html>
