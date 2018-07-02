<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<link rel="stylesheet" href="${basePath}/css/inventory/vip/vipCard.css?v=${version}">
<script src="${basePath}/js/inventory/vip/vipCard.js?v=${version}"></script>
<script src="${basePath}/js/inventory/vip/vipMarkCard.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" charset="utf-8">
    var userName = '${user.name}';
</script>
<title>会员卡管理</title>
</head>
<body>
<header>
    <div class="none" id="MENU_CODE">HYKGL</div>
    <div id="AUTH" class="none" data-code="HYKGL"></div>
    <div>
        <button type="button" class="btn B_HYKGL_0001 none" id="card">制卡</button>
    </div>
    <div class="form-inline clearfix">
        <div class="form-group col-sm-3">
            <label class="width-25">搜索：</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="vipInfo" placeholder="卡号、姓名、手机号码"/>
            </div>
        </div>
        <div class="form-group col-sm-3">
            <label for="memberTypeIds" class='width-25' >会员类型:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="memberTypeIds" placeholder="请选择会员类型">
            </div>
        </div>
        <div class="form-group col-sm-3">
            <label class="width-25">卡状态</label>
            <div class="input-group col-sm-8">
                <select class="form-control cardState">
                    <option value="">全部</option>
                    <option value="1">未发卡</option>
                    <option value="2">已发卡</option>
                    <option value="3">已作废</option>
                </select>
            </div>
        </div>
        <div class="form-group col-sm-3">
            <label class="width-25">使用状态</label>
            <div class="input-group col-sm-8">
                <select class="form-control usedState">
                    <option value="">全部</option>
                    <option value="1">启用</option>
                    <option value="2">停用</option>
                    <option value="3">挂失</option>
                </select>
            </div>
        </div>
        <div class="form-group col-sm-9"></div>
        <div class="form-group col-sm-3" style="padding-left: 4%">
            <button type="button" class="btn" id="search">查询</button>
            <button type="button" class="btn" id="reset">重置</button>
        </div>
    </div>
</header>

<div class="navBtn">
    <button type="button" class="btn B_HYKGL_0002 none" id="amend">修改</button>
    <button type="button" class="btn btn-default B_HYKGL_0010 none" id="export">导出</button>
    <%--<button type="button" class="btn" id="">列设置</button>--%>
    <div class="wfkdiv">
        <button type="button" class="btn" >未发卡操作<i class="glyphicon glyphicon-triangle-bottom"></i></button>
        <div class="wfkbtn">
            <button type="button" class="btn B_HYKGL_0012 none" name="1">作废</button>
            <button type="button" class="btn" name="2">取消作废</button>
            <button type="button" class="btn" name="3">删除</button>
        </div>
    </div>
    <div class="yfkdiv">
        <button type="button" class="btn" >已发卡操作<i class="glyphicon glyphicon-triangle-bottom"></i></button>
        <div class="yfkbtn">
            <button type="button" class="btn B_HYKGL_0014 none" name="1">启用</button>
            <button type="button" class="btn B_HYKGL_0015 none" name="2">停用</button>
            <button type="button" class="btn B_HYKGL_0011 none" name="3">挂失</button>
        </div>
    </div>
</div>

<div class="gridwarp">
    <table id="grid"></table>
    <div id="gridPager"></div>
</div>

<%--修改模态框--%>
<div class="modal" id="amendModal" data-keyboard="true" data-backdrop="static">
    <div class="modal-dialog" style="width: 700px;">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">修改卡信息</h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-inline clearfix">
                    <div class="form-group col-sm-6">
                        <label for="storeInput" class="width-25">制卡部门：</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control" id="storeInput" placeholder="请选择部门">
                        </div>
                    </div>
                    <div class="form-group col-sm-6">
                        <label for="modalType" class="width-25">会员类型：</label>
                        <div class="input-group col-sm-8">
                            <input type="text" class="form-control" id="modalType">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" id="amendSave">确定</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>

<!--批量制卡 模态窗-->
<div class="modal fade" id="mkCardPileModal" tabindex="-1" role="dialog">
    <div class="modal-dialog  model-dialog1">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close clearMkCardContext" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title " id="mkCardPile">批量制卡</h4>
            </div>
            <div class="modal-body" id="plzk">
                <div class="tp-head btn-group" style="margin-bottom: 10px;box-shadow:1px 1px 9px #888;">
                    <a data-eventname="card-dstribute"  class="btn cancel-mkCard">清空</a>
                    <a data-eventname="pile-deal"  class="btn restart-mkCard" >重制上一张</a>
                    <a data-eventname='card-change' class="btn skip-thisCard" >跳过本张卡</a>
                </div>
                <div class="tp-info" style="min-height: 268px;background-color: #f5f5f5; padding-top: 20px;">
                    <div style="position: relative;">
                        <span>制卡部门：</span>
                        <input type="text" name="sectionName" value="${user.sectionName}" class="w-148 modal-ipt mkDis sectionName" disabled="disabled" readonly="readonly" />
                        <span>会员类型：</span>
                        <%--<div class="inpbox">--%>
                            <%--<div class="input-group">--%>
                                <%--<input type="text" class="form-control typeNamePiles" id="typeNamePiles">--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <select class="w-148 modal-ipt typeNamePiles" id="typeNamePiles" name="typeName" >

                        </select>
                    </div>
                    <p>
                        <span>卡号范围：</span>
                    </p>
                    <p class="tgle">
                        <span>需制卡张数：</span>
                        <input type="text"   class="w-148 modal-ipt needMk"  disabled="disabled" readonly="readonly"/>
                        <span>已制卡张数：</span>
                        <input type="text"   class="w-148 modal-ipt alMk" disabled="disabled" readonly="readonly"/>
                    </p>
                    <p class="tgle">
                        <span>卡号位数：</span>
                        <input type="text"   class="w-148 modal-ipt count-card" />
                        <label for="ornotNum" style="">是否号码卡</label><input type="checkbox" name="" id="ornotNum"   class="cardOrnot" />
                    </p>
                    <p class="cardNums">
                        <span>开始卡号：</span>
                        <input type="text"  class="w-148 modal-ipt startCard" maxlength="20"/><i class="hidden icon-exclamation-sign" style="color: red;"></i>
                        <span>截止卡号：</span>
                        <input type="text"  class="w-148 modal-ipt overCard" maxlength="20"/><i class="hidden icon-exclamation-sign" style="color: red;"></i>
                    </p>
                    <p class="hd">
                        <span class="span-title">当前卡号：</span>
                        <input type="text"  class="w-148 modal-ipt nowCardNum"  disabled="disabled" readonly="readonly"/>
                        <span class="span-title">卡密：</span>
                        <input type="text"  class="w-148 modal-ipt cardPsw" disabled="disabled" readonly="readonly"/>
                    </p>
                </div>



                <div class="bt-tble hd" style="width: 565px;">
                    <div class="tablebox retailDetailTable">
                        <div class="grid-wrap">
                            <table id="jqGrid_mkCardPile" class="zxsaastable"></table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary start-mkCard">开始制卡</button>
                <button type="button" class="btn plzkSave" >保存</button>
                <button type="button" class="btn btn-default clearMkCardContext" data-dismiss="modal">取消</button>
            </div>

        </div>
    </div>
</div> <!--modify end--><!--批量制卡莫态框 end-->

</body>
</html>