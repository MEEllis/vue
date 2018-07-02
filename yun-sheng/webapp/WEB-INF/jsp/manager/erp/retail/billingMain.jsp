<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<jsp:include  page="../../inventoryInclude/head.jsp"/>
	<title>零售开单</title>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/retailOrder/retailBillingMain.css?v=${version}"/>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/jquery-migrate-1.2.1.min.js?v=${version}"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/xr.js?v=${version}" ></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" ></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/js/cw/underscore-min.js?v=${version}"></script>
	<script src="${basePath}/js/erp/retail/billingMain.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		var gl_groupId = "${groupId}";
		var basePath = "${basePath}";
		var billsCode = "${billsCode}";
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</head>
<body>
<div class="container-lg" style="padding:15px;">
    <div id="AUTH" data-code="LSKD" class="btn-group btnHundred">
        <button id="firstSingle" data-code='F' type="button" class="btn btn-default billSearch">首单</button>
        <button id="prevSingle" data-code='P' type="button" class="btn btn-default billSearch">上一单</button>
        <button id="nextSingle" data-code='N' type="button" class="btn btn-default billSearch">下一单</button>
        <button id="finalSingle" data-code='L' type="button" class="btn btn-default billSearch">末单</button>
        <button id="newSingle" type="button" class="btn btn-default">新开单</button>
        <button id="introSingle" type="button" class="btn btn-default">引入定单</button>
        <button id="operator" type="button" class="btn btn-default">运营商业务</button>
        <button id="serPur" type="button" class="btn btn-default">服务购买</button>
        <button id='print' type="button" class="btn btn-default" onclick="printFunction()">打印</button>
        <button id="rb_mistake" type="button" class="btn btn-default" disabled>红冲</button>
        <button id="hangSingle" type="button" class="btn btn-default">挂单</button>
        <button id="transferSingle" type="button" class="btn btn-default">调入挂单</button>
        <button id="copy" type="button" class="btn btn-default" disabled>复制</button>
        <input id="tempOprAmount" type="hidden"/>
        <input id="tempOprRealAmount" type="hidden"/>
    </div>
    <div class="well header">
    	<div class="headerCon">
	   		<div class="rb_header">
	            <div class="row">
	                <div class="col-sm-3">
	                    <div class="row">
	                        <div class="col-md-4"><label for="">单据号：</label></div>
	                        <div class="col-md-8">
	                        	<input id='billNum' type="text" value="" class="form-control" disabled/>
	                        	<input id='billNumId' type='hidden' />
	                        	<input id='relatedId' type='hidden' />
	                        	<input id='ifDraft' type='hidden' value='0'/>
	                        	<input id='DraftId' type='hidden'/>
	                        </div>
	                    </div>
	                </div>
	                <div class="col-sm-3">
	                    <div class="row">
	                        <div class="col-md-4"><label for="sectionId">门店：</label></div>
	                        <div class="col-md-8">
	                        	<select name="sectionId" id="sectionId" class="form-control"></select>
                        	</div>
	                    </div>
	                </div>
	                <div class="col-sm-3">
	                    <div class="row">
	                        <div class="col-md-4"><label for="employeeId">营业员：</label></div>
	                        <div class="col-md-8">
	                            <select name="employeeId" id="employeeId" class="form-control"></select>
	                        </div>
	                    </div>
	                </div>
	                <div class="col-sm-3">
	                    <div class="row">
	                        <div class="col-md-4"><label for="rb_date">业务日期：</label></div>
	                        <div class="col-md-8"><input id="rb_date" type="text" class="form-control" value="${currentDate}" readonly/></div>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div class="rb_header_right">
	        	<input id="billsStatus" type="hidden"/>
	        	<img id="redSign" src="../../images/status/statusRed.png">
	        </div>
    	</div>
    </div>
    <label class="shuru" for="rb_superInput">索引框：</label><input id="rb_superInput" type="text" placeholder="输入要查找的内容,按ctrl+alt键切换,回车搜索" class="form-control"/> <span class="tip">请录入串号或条码</span>
    <div class="rb_body well">
        <table id="rb_table" class="table table-bordered table-responsive">
            <thead>
            <tr>
                <td>序号</td>
                <td>操作</td>
                <td>赠品</td>
                <td>商品名称</td>
                <td>型号</td>
                <td>颜色</td>
                <td>串号</td>
                <td>数量</td>
                <td>金额</td>
                <td>第三方抵扣</td>
                <td colspan="2" >价格售息</td>
                <td colspan="2">分期信息</td>
                <td colspan="2">其他信息</td>
            </tr>
            </thead>

            <tbody class="rb_tbody">
            <tr>
                <td rowspan="3">1</td>
                <td rowspan="3">
                	<span class="rb_add glyphicon glyphicon-plus"></span> <span class="rb_del glyphicon glyphicon-minus"></span>
                </td>
                <td rowspan="3"><input class="rb_gift" type="checkbox" disabled/><input class="giftFlag" type="hidden" value="0"/></td><!--赠品-->
                <td rowspan="3">
                    <input class="rb_proName" type="text" disabled/>
                    <input class="rb_proNameId" type="hidden"/>
                    <input class="rb_proCode" type="hidden"/>
                    <button class="rb_proNameBtn smBtn btn btn-default">
                    	<span class='glyphicon glyphicon-plus'></span>
                    </button>
                    <input class="rb_proSerialNumId" type="hidden"/>
                    <input class="rb_ifManageImei" type="hidden"/>
                </td>
                <td class="rb_proModel" rowspan="3"></td>
                <td class="rb_proColor" rowspan="3"></td>
                <td class="rb_proSerialNum" rowspan="3"></td>
                <td rowspan="3"><input class="rb_proNum" type="text"/></td> <!--数量-->
                <td rowspan="3"><input class="rb_proPrice" type="text"/></td><!--金额-->
                <td rowspan="3">
                    <input class="rb_voucher" type="text" disabled/><!--第三方抵扣-->
                    <input class="rb_voucherData" type="hidden"/><!--第三方抵扣data对象-->
                    <input class="thridTicketdata" type="hidden"/><!--第三方抵扣data对象 整单-->
                    <button class="voucherBtn smBtn btn btn-default"><span class='glyphicon glyphicon-plus'></span></button>
                </td>
                <td>标价</td>
                <td><input class="rb_bPrice" type="text" disabled/></td>
                <td>
                	<a class="stages">分期商</a>
                	<input class="rb_stages_payments" type="hidden"/>
                	<input class="rb_stages_balance" type="hidden"/>
                	<input class="rb_stages_monthly" type="hidden"/>
                	<input class="rb_stages_contract" type="hidden"/>
                	<input class="rb_stages_remarks" type="hidden"/>
                </td>
                <td><select name="" class="rb_stages_opt"></select></td>
                <td>是否合约机</td>
                <td><input class="rb_isContract" type="checkbox" value="0"/></td>
            </tr>
            <tr>
                <td>折扣率(Z)</td>
                <td><input class="rb_discountRate" type="text" value="100"/>%</td>
                <td>分期数</td>
                <td><input type="text" class="rb_StageNum" disabled/></td>
                <td>备注</td>
                <td>
                	<input class="rb_remark" type="text"/>
                </td>
            </tr>
            <tr>
                <td>折后价(J)</td>
                <td><input class="rb_discountPrice" type="text"/></td>
                <td>首付</td>
                <td><input class="rb_downPayments" type="text" disabled/></td>
                <td>仓库<input class="rb_storageId" type="hidden" /></td>
                <td class="rb_warehouse"></td>
            </tr>
            </tbody>

            <tbody class="table_bottom">
            <tr>
                <td colspan="8">合计</td>
                <td id="rb_proPrice_total"></td>
                <td id="rb_voucher_total"></td>
                <td colspan="2">折扣合计：<span id="rb_discountPrice_total"></span></td>
                <td colspan="2">首付合计：<span id="rb_downPayments_total"></span></td>
                <td colspan="2"></td>
            </tr>
            </tbody>
        </table>
    </div>
    <form id='addAdminForm' method="post" action="">
	    <div class="well vip">
	        <ul>
	            <li>
	            	<span class="vipLabel">会员卡号：</span>
	            	<div class="customerNameChe" class="form-group">
		            	<input id="cardNum" type="text" class="form-control" disabled/>
		            	<input id="cardTypeId" type="hidden"/>
	            	</div>
	           	</li>
	            <li>
	            	<span class="vipLabel">客户姓名：</span>
	           	    <div id="customerNameChe" class="form-group">
						<input id="customerName" name="customerName" class="customInfo form-control" type="text"/>
						<input id="memberId" type="hidden" />
					</div>
	           	</li>
	            <li>
	            	<span class="vipLabel">联系电话：</span>
	            	<div id="customerTelChe" class="form-group">
	            		<input id="customerTel" name="customerTel" maxlength='11' class="customInfo form-control" type="text"/>
	            	</div>
	            </li>
	            <li>
	            	<span class="vipLabel">会员类型：</span>
	            	<div class="customerNameChe" class="form-group">
		            	<input id="customerType" type="text" class="form-control" disabled/>
	            	</div>
	           	</li>
	            <li>
	            	<span class="vipLabel">当前余额：</span>
	            	<div class="customerNameChe" class="form-group">
		            	<input id="CurrentBalance" type="text" class="form-control" disabled/>
	            		<input id="dAmount" type="hidden" />
	            	</div>
	           	</li>
	            <li>
	            	<span class="vipLabel">当前积分：</span>
	            	<div class="customerNameChe" class="form-group">
		            	<input id="CurrentIntegration" type="text" class="form-control" disabled/>
	            		<input id="dScore" type="hidden" />
	            	</div>
	           	</li>
	        </ul>
	    </div>
    </form>
    <div class="rb_controller">
        <div class="mainL">
            <div class="widthFull">
                <div class="width25"><label for="shouldReceive">增值服务应收：</label><input id="shouldReceive" type="text" disabled class="form-control"/></div>
                <div class="width25"><label for="receivableTotal">应收合计：</label><input id="receivableTotal" type="text" disabled class="form-control"/></div>
                <div class="width25"><label for="retailDeposit">零售定金：</label><input id="retailDeposit" type="text" disabled class="form-control"/><input id="depositMainId" type="hidden"/><input id="depositDetailList" type="hidden"/></div>
                <div class="clear"></div>
            </div>
            <div class="widthFull">
                <div class="width25"><label for="receivableIgnore">应收抹零：</label><input id="receivableIgnore" value="0" type="text" class="form-control"/><input id="receivableIgnoreMax" type="hidden"/></div>
                <div class="width25"><label for="settle">收款结算：</label><input id="settle" type="text" disabled class="form-control"/><input id="settleData" type="hidden"/><span style="position: relative;"><button id="settleBtn" class="btn btn-primary"><span class='glyphicon glyphicon-plus'></span></button></span></div>
                <div class="width25"><label for="uncollected">未收金额：</label><input id="uncollected" type="text" disabled class="form-control"/></div>
                <div class="clear"></div>
            </div>
            <label for="remarks">备　　注：</label><input id="remarks" type="text" class="form-control" maxlength='100'/>
            <div class="clear"></div>
        </div>
        <div class="mainR" style="display:none;">
            <div class="rb_block">
                <p class="rb_title">促销方案</p>
                <table id="table_promotion" class="table table-bordered">
		            <thead>
		            <tr>
		                <td>是否启用</td>
		                <td>促销方案</td>
		            </tr>
		            </thead>
		            <tbody>
		            <tr>
		                <td><input type="checkbox"/></td>
		                <td><a class="programme" href="javascript:void(0);"></a></td>
		            </tr>
		            </tbody>
		        </table>
            </div>
        </div>
        
    </div>
    <!--********************弹框********************-->
    <!--引入定单-->
    <div class="modal fade bs-example-modal-lg" id="myModal_introSingle" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style='min-width:1200px;'>
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">定单引入</h4>
                </div>
                <div class="modal-body">
                    <p class="rb_proName_title">快速检索：<input id="introSearch" type="text" placeholder="会员卡号、客户姓名或手机号"> <button id='introSearchBtn' class='btn btn-info'>定单查询</button></p>
                    <table id="table_introSingle" class="table table-bordered">
                        <thead>
                        <tr>
                            <td></td>
                            <td>零售定单编码</td>
                            <td>客户姓名</td>
                            <td>联系电话</td>
                            <td>商品名称</td>
                            <td>型号</td>
                            <td>颜色</td>
                            <td>本次引入金额</td>
                            <td>定金</td>
                            <td>已核销金额</td>
                            <td>已退定金</td>
                            <td>定金结余</td>
                            <td>定单数量</td>
                            <td>已核销数量</td>
                            <td>已退数量</td>
                            <td>数量结余</td>
                            <td>备注</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input class='rb_check' type="checkbox"/><input class='introCode' type="hidden"/></td>
                            <td class='rb_introOrderCode'></td>
                            <td class='rb_introName'></td>
                            <td class='rb_introTel'></td>
                            <td class='rb_introProName'></td>
                            <td class='rb_introModel'></td>
                            <td class='rb_introColor'></td>
                            <td><input class='rb_introTTD' type="text"/></td>
                            <td class='rb_introDeposit'></td>
                            <td class='rb_introWriteOff'></td>
                            <td class='rb_introRetired'></td>
                            <td class='rb_introBalance'></td>
                            <td class='rb_introOrderNum'></td>
                            <td class='rb_introWriteOffNum'></td>
                            <td class='rb_introRetiredNum'></td>
                            <td class='rb_introNumBalance'></td>
                            <td class='rb_introRemark'></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="introSingle_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button id="introSingle_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--调入挂单-->
    <div class="modal fade bs-example-modal-lg" id="myModal_transferSingle" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">调入挂单</h4>
                </div>
                <div class="modal-body">
                    <table id="table_transferSingle" class="table table-bordered">
                        <thead>
                        <tr>
                            <td>调入</td>
                            <td>操作</td>
                            <td>单据日期</td>
                            <td>会员卡号</td>
                            <td>客户姓名</td>
                            <td>联系电话</td>
                            <td>备注</td>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="transferSingle_cancel" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <!--服务购买-->
    <div class="modal fade bs-example-modal-lg" id="myModal_serPur" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="min-width:1630px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">添加增值服务</h4>
                </div>
                <div class="modal-body">
                <div class="modalBody"></div>
                    <table id="table_serPur" class="table table-bordered">
                        <thead>
                        <tr>
                            <td>序号</td>
                            <td>操作</td>
                            <td>增值服务名称</td>
                            <td>生效日期</td>
                            <td>关联序号</td>
                            <td>有效期限</td>
                            <td>效期内使用次数</td>
                            <td>商品编码</td>
                            <td>商品名称</td>
                            <td>颜色</td>
                            <td>型号</td>
                            <td>手机串号</td>
                            <td>会员卡号</td>
                            <td>零售单号</td>
                            <td>预设售价</td>
                            <td>会员价</td>
                            <td>实际收款</td>
                            <td>备注</td>
                            <td>服务流水号</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                            	<span class="rb_serPur_add glyphicon glyphicon-plus"></span> <span class="rb_serPur_del glyphicon glyphicon-minus"></span>
                            </td>
                            <td>
                                <select name="" class="rb_serPur_name"></select>
                                <input class="rb_serPur_ID" type="hidden"/>
                                <input class="rb_serPur_EFmonth" type="hidden"/>
                            </td>
                            <td class="rb_serPur_date">默认单据</td>
                            <td>
                                <select name="" class="rb_serPur_ToIndex"></select>
                            </td>
                            <td class="rb_serPur_serviceDue"></td>
                            <td class="rb_serPur_userNum"></td>
                            <td class="rb_serPur_Code"></td>
                            <td>
                            	<input class="rb_serPur_ProName" disabled/>
                            	<input class="rb_serPur_ProNameId" type="hidden"/>
                            	<button class="rb_serPur_ProNameBtn smBtn btn btn-default" disabled><span class='glyphicon glyphicon-plus'></span></button>
                            </td>
                            <td class="rb_serPur_color"></td>
                            <td class="rb_serPur_model"></td>
                            <td>
                            	<input class="rb_serPur_SerialNum" disabled type="text"/>
                            	<input class="rb_serPur_if" type="hidden"/>
                            	<input class="rb_serPur_NumId" type="hidden"/>
                            </td>
                            <td class="rb_serPur_cardNum"></td>
                            <td class="rb_serPur_retailNum"></td>
                            <td class="rb_serPur_setPrice"></td>
                            <td class="rb_serPur_vipPrice"></td>
                            <td>
                            	<input class="rb_serPur_Actual" type="text" />
                            </td>
                            <td>
                            	<input class="rb_serPur_remark" type="text" maxlength="100"/>
                            </td>
                            <td class="rb_serPur_serviceNum"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                	<button id="serPur_cancel" type="button" class="btn btn-default">取消</button>
                    <button id="serPur_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--运营商业务-->
    <div class="modal fade bs-example-modal-lg" id="myModal_operatorBusiness" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width:1200px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">运营商业务</h4>
                </div>
                <div class="modal-body">
                    <table id="table_operatorBusiness" class="table table-bordered">
                        <thead>
                        <tr>
                            <td>序号</td>
                            <td>操作</td>
                            <td>运营商</td>
                            <td>业务名称</td>
                            <td>充值金额</td>
                            <td>实收金额</td>
                            <td>佣金金额</td>
                            <td>串号</td>
                            <td>手机号</td>
                            <td>业务号</td>
                            <td>备注</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                            	<span class="operatorBusinessAdd glyphicon glyphicon-plus"></span>
                            	<span class="operatorBusinessDel glyphicon glyphicon-minus"></span>
                            </td>
                            <td><select name="billshangId" class="billshangId"></select></td>
                            <td><select name="billywId" class="billywId"></select></td>
                            <td><input class='Tb_opr_rechargeAmount' type='text'/></td>
                            <td><input class='Tb_opr_netAmount' type='text'/></td>
                            <td><input class='Tb_opr_commissionAmount' type='text'/></td>
                            
                            <td><input class='Tb_opr_imei' type='text'/></td>
                            <td><input class='Tb_opr_tel' type='text'/></td>
                            <td><input class='Tb_opr_servNum' type='text'/></td>
                            
                            <td><input class='Tb_opr_remark' type='text'/></td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan='4'>合计：</td>
                            <td id='Tb_opr_rechargeAmountSum'></td>
                            <td id='Tb_opr_netAmountSum'></td>
                            <td id='Tb_opr_commissionAmountSum'></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tfoot>
                    </table>
                    <input id='table_operatorBusiness_data' type='hidden'/>
                </div>
                <div class="modal-footer">
                    <button id="operatorBusiness_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button id="operatorBusiness_sure" type="button" class="btn btn-primary">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--商品名称框-->
    <div class="modal fade bs-example-modal-lg" id="myModal_proName" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width:1200px;">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">商品参照</h4>
                </div>
                <div class="modal-body">
                    <p class="rb_proName_title">快速过滤：<input id="quickSearch" type="text" placeholder="可编码/名称/条码/型号/助记码搜索"/> <button id='dosearch' class='btn btn-info'>搜索</button></p>
                    <div class="rb_proName_con_left fl">
                        <ul id="ztree1" class="ztree"></ul>
                    </div>
                    <div class="rb_proName_con_mid fl">
                   		<table id="rb_proNameL" class="table table-bordered table-responsive">
                            <thead>
                            <tr>
                                <td>商品编码</td>
                                <td>商品名称</td>
                                <td>型号</td>
                                <td>颜色</td>
                                <td>零售价</td>
                                <td>仓库</td>
                                <td>现存量</td>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div class="rb_proName_con_right fl">
                        <table id="rb_proNameR" class="table table-bordered">
                            <thead>
                            <tr>
                                <td>序号</td>
                                <td>串号</td>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="rb_proName_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button id="rb_proName_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--第三方抵扣-->
    <div class="modal fade bs-example-modal-lg" id="myModal_voucher" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">第三方抵扣</h4>
                </div>
                <div class="modal-body">
                    <table id="rb_voucher" class="table table-bordered">
                        <thead>
                        <tr>
                            <td>序号</td>
                            <td>操作</td>
                            <td>往来单位</td>
                            <td>活动名称</td>
                            <td>抵现金额</td>
                            <td>业务号</td>
                            <td>备注</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                            	<span class="rb_voucher_add glyphicon glyphicon-plus"></span> <span class="rb_voucher_del glyphicon glyphicon-minus"></span>
                            </td>
                            <td>
                            	<select name="rb_voucher_units" class="rb_voucher_units"></select>
                            </td>
                            <td>
                                <select name="rb_voucher_name" class="rb_voucher_name"></select>
                            </td>
                            <td><input class="rb_voucher_credit" type="text" disabled/></td>
                            <td><input class="rb_voucher_num" type="text" disabled/></td>
                            <td><input class="rb_voucher_remark" type="text" disabled maxlength='100'/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="voucher_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button id="voucher_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--分期框-->
    <div class="modal fade bs-example-modal-lg" id="myModal_stages" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width:1200px">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">分期详情</h4>
                </div>
                <div class="modal-body">
                    <table id="rb_stages" class="table table-bordered">
                        <thead>
                        <tr>
                            <td>序号</td>
                            <td>分期商</td>
                            <td>分期数</td>
                            <td>商品金额</td>
                            <td>首付</td>
                            <td>余额</td>
                            <td>月付</td>
                            <td>合同号</td>
                            <td>备注</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <input id="rb_stages_business" type="text"/>
                                <button type="button" class="smBtn btn btn-default"><span class='glyphicon glyphicon-plus'></span></button>
                            </td>
                            <td><input id="rb_stages_num" type="text"/></td>
                            <td><input id="rb_stages_proPrice" type="text"/></td>
                            <td><input id="rb_stages_payments" type="text"/></td>
                            <td><input id="rb_stages_balance" disabled type="text"/></td>
                            <td><input id="rb_stages_monthly" disabled type="text"/></td>
                            <td><input id="rb_stages_contract" type="text"/></td>
                            <td><input id="rb_stages_remarks" type="text" maxlength='100'/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="stages_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button id="stages_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--结算-->
    <div class="modal fade bs-example-modal-lg" id="myModal_settle" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">结算</h4>
                </div>
                <div class="modal-body">
                    <p class="settleTitle2">应收金额：<span id="settle_receivable"></span>； 本次结算：<span id="settle_thisTime"></span>； 应收余额：<span id="settle_balance"></span>；</p>
                    <table id="table_settle" class="table table-bordered">
                        <thead>
                        <tr>
                            <td>结算方式</td>
                            <td>结算余额</td>
                            <td>备注</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>现金</td>
                            <td>
                            	<input id="cash" class="width300" type="text" disabled/>
                            	<input class="tb_se_accountId" type="hidden"/>
                            	<input class="tb_se_accountType" type="hidden"/>
                            </td>
                            <td rowspan="7"><input id="deductionRemark" class="width300" type="text" maxlength='255'/></td>
                        </tr>
                        <tr>
                            <td>POS</td>
                            <td>
                            	<input id="pos" class="width300" type="text" readonly/>
                            	<input class="tb_se_accountId" type="hidden"/>
                            	<input class="tb_se_accountType" type="hidden"/>
                            </td>
                        </tr>
                        <tr>
                            <td>微信</td>
                            <td>
                            	<input id="weixin" class="width300" type="text" disabled/>
                            	<input class="tb_se_accountId" type="hidden"/>
                            	<input class="tb_se_accountType" type="hidden"/>
                           	</td>
                        </tr>
                        <tr>
                            <td>支付宝</td>
                            <td>
                            	<input id="alipay" class="width300" type="text" disabled/>
                            	<input class="tb_se_accountId" type="hidden"/>
                            	<input class="tb_se_accountType" type="hidden"/>
                           	</td>
                        </tr>
                        <tr>
                            <td>促销券</td>
                            <td>
                            	<input id="coupons" class="width300" type="text" disabled/>
                            	<input class="tb_se_accountId" type="hidden"/>
                            	<input class="tb_se_accountType" type="hidden"/>
                           	</td>
                        </tr>
                        <tr>
                            <td>消费 会员储值</td>
                            <td>
                            	<input id="memberAmount" class="width300" type="text" disabled/>
                            	<input class="tb_se_accountId" type="hidden"/>
                            	<input class="tb_se_accountType" type="hidden"/>
                           	</td>
                        </tr>
                        <tr>
                            <td>积分抵现</td>
                            <td>抵扣金额 <input id="deductionMoney" class="width100" type="text" disabled/>
                            			<input class="tb_se_accountId" type="hidden"/>
                            			<input class="tb_se_accountType" type="hidden"/>
                            	 扣减积分 <input id="deductionScore" class="width100" type="text" disabled/>
                           	 </td>
                        </tr>
                        </tbody>
                    </table>
                    <p class="settleTitle3">可用积分：<span id="settle_availableIntegral"></span>； 抵现标准：<span id="arrivalStandard"></span>（积分：金额）；  储值余额：<span id="settle_storedValue"></span>；</p>
                </div>
                <div class="modal-footer">
                    <button id="settle_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button id="settle_sure" type="button" class="btn btn-primary">结算</button>
                </div>
            </div>
        </div>
    </div>
    <!--pos弹框-->
    <div class="modal fade" id="myModal_pos" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">pos</h4>
                </div>
                <div class="modal-body">
                    <table id="table_pos" class="table table-bordered">
                        <thead>
                        <tr>
                            <td>POS机编号</td>
                            <td>结算金额</td>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="pos_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--会员查询-->
    <div class="modal fade bs-example-modal-lg" id="myModal_rb_MQR" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">会员查询结果</h4>
                </div>
                <div class="modal-body">
                    <table id="rb_MQR" class="table table-bordered">
                        <thead>
                        <tr>
                            <td></td>
                            <td>会员卡号</td>
                            <td>持卡人</td>
                            <td>手机号</td>
                            <td>会员类型</td>
                            <td>往来单位</td>
                            <td>备注</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><a class="rb_MQR_choose href="javascript:void(0)">选择</a></td>
                            <td class="rb_MQR_cardNum"></td>
                            <td class="rb_MQR_customerName"></td>
                            <td class="rb_MQR_customerTel"></td>
                            <td class="rb_MQR_customerType"></td>
                            <td class="rb_MQR_contactUnitName"></td>
                            <td class="rb_MQR_remark"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="rb_MQR_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 串号查询 -->
    <div class="modal fade bs-example-modal-lg" id="myModal_rb_MQI" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style='width:1000px;'>
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">串号查询结果</h4>
                </div>
                <div class="modal-body">
                    <table id="rb_MQI" class="table table-bordered">
                        <thead>
                        <tr>
                            <td></td>
                            <td>串号</td>
                            <td>条码</td>
                            <td>商品编码</td>
                            <td>商品名称</td>
                            <td>类别</td>
                            <td>型号</td>
                            <td>颜色</td>
                            <td>仓库</td>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button id="rb_MQI_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button id="rb_MQI_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!--红冲 -->
    <div class="modal fade" id="myModal_mistake" tabindex="-1" role="dialog" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <h4 class="modal-title">红冲</h4>
	            </div>
	            <div class="modal-body">
	               <input type="text" class="form-control" id="mistakeDate" value="2016-12-30" placeholder="年-月-日" readonly/>
	            </div>
	            <div class="modal-footer">
	                <button id="mistake_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	                <button id="mistake_sure" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
	            </div>
	        </div>
	    </div>
	</div>
</div>
</body>
</html>














