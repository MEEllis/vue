<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<jsp:include page="../../inventoryInclude/head.jsp"/>
<script src="${basePath}/js/ajaxfileupload.js?v=${version}"></script>
<link rel="stylesheet" href="${basePath}/css/inventory/vip/vipCard.css?v=${version}">
<script src="${basePath}/js/inventory/basis/imeiSignMain.js?v=${version}"></script>
<title>串号表示</title>
<style type="text/css">
    .modal .modal-header{
        background-color: #4e78a1;
        padding: 10px;
        color: #fff;
    }


    #imeiImportModal .row{
        padding-bottom: 0;
    }
</style>
</head>
<body>
<header>
    <div class="none" id="MENU_CODE">HYKGL</div>
    <div id="AUTH" class="none" data-code="HYKGL"></div>
    <div style="margin-bottom: 20px">
        <button type="button" class="btn e-btn e-btn-left B_HYKGL_0001 none" data-toggle="modal" data-target="#imeiModal">
            <span class="iconfont icon-fileManagement"></span>串号标识档案管理
        </button>
        <button type="button" class="btn e-btn e-btn-left B_HYKGL_0001 none" data-toggle="modal" id="import">
            <span class="iconfont icon-daoru"></span>串号导入
        </button>
        <button type="button" class="btn e-btn e-btn-left B_HYKGL_0001 none" id="amend">
            <span class="iconfont icon-bianji"></span>修改
        </button>
    </div>
    <div class="form-inline clearfix">
        <div class="form-group col-sm-3">
            <label class="width-25">快速搜索：</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="imeiInfo" placeholder="串号、辅助串号模糊匹配"/>
            </div>
        </div>
        <div class="form-group col-sm-3">
            <label class="width-25">串号标识：</label>
            <div class="input-group col-sm-8">
                <select class="form-control imeiSign" id="all_imeiSign">
                </select>
            </div>
        </div>
        <%--<div class="col-md-3 form-group ">--%>
            <%--<label class="width-25">商品名称:</label>--%>
            <%--<div class="input-group col-sm-8">--%>
                <%--<input type="text" class="form-control"  name="goodsName"  id="goodsName">--%>
            <%--</div>--%>
        <%--</div>--%>
        <div class="form-group col-sm-3" style="padding-left: 4%">
            <%--<div class="checkbox" style="line-height: 34px;margin-right: 10%">--%>
                <%--<label>--%>
                    <%--<input type="checkbox" class="ifContainsDisable" style="float: left;margin: 11px 5px;"> 显示禁用信息--%>
                <%--</label>--%>
            <%--</div>--%>
            <button type="button" class="btn" id="search">查询</button>
            <button type="button" class="btn" id="reset">重置</button>
            <span class="explain">说明</span>
            <div class="explainBox">
                1、可在“串号标识档案管理”，维护串号标识（新增、修改、删除、启用、禁用）</br>
                2、可在“串号导入”界面，将“串号标识”与“串号”关联。（支持EXCEL导入）</br>
                3、只能对在系统中录入过的串号关联“串号标识”（在库、出库都可以）</br>
                4、点击“修改”，修改“串号标识”与“串号”关联
            </div>
        </div>
    </div>
</header>

<div class="navBtn"></div>

<div class="gridwarp">
    <table id="grid"></table>
    <div id="gridPager"></div>
</div>

<!--  串号标识档案管理模态框（Modal） -->
<div class="modal fade" id="imeiModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modalNine">
        <div class="modal-content" style="width: 120%;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="">
                    串号标识档案管理
                </h4>
            </div>
            <div class="modal-body">
                <div class="grid-wrap">
                    <table id="dataGrid" class="zxsaastable"></table>
                    <div id="jqGridPager"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn erp-btn-bg imeiSave_btn">保存</button>
                <button type="button" class="btn erp-btn-lab" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div><!-- 串号标识档案管理模态框（Modal）结束 -->

<!--  串号修改模态框（Modal） -->
<div class="modal fade" id="amendModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modalNine">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title">
                    串号标识修改
                </h4>
            </div>
            <div class="modal-body" style="padding-top: 0px">
                <div class="form-inline">
                    <div class="form-group col-sm-6">
                        <label>串号标识：</label>
                        <div class="input-group col-sm-8">
                            <select class="form-control imeiSign" id="xg_imeiSign">
                                <option value=""> </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-6" style="color: red;line-height: 34px;font-size: 12px">
                        (选择空，代表当前所选中的这批串号不做标识)
                    </div>
                </div>
                <div class="grid-wrap">
                    <table id="amendGrid" class="zxsaastable" ></table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn erp-btn-bg amendSave_btn" title="" data-dismiss="modal" >保存</button>
                <button type="button" class="btn erp-btn-lab" data-dismiss="modal">取消</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<!--  串号修改模态框（Modal）结束 -->

<!--  串号导入模态框 (Modal) -->
<div class="modal fade" id="imeiImportModal" role="dialog" aria-hidden="true" data-backdrop="static">
     <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
             <div class="modal-header">
                   <button type="button" data-dismiss="modal" class="close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title imeiDr_title">串号导入</h4>
            </div>
            <div class="modal-body">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-6" style="padding-left:0">
                            <form id="imeiImportForm">
                                <b>Excel文件导入</b>
                                <div class="form-group" style="padding-top: 10px">
                                    <a href="/manager/qichu/串号标识导入模板.xls" download="串号标识导入模板.xls" style="color: #5184f0">下载模板</a>
                                    <span style="font-size: 12px">(串号、串号标识名称两列)</span>
                                </div>
                                <div class="form-inline">
                                    <div class="form-group" style="padding-left: 0px">
                                        <label>选择文件:</label>
                                        <div class="input-group col-sm-9">
                                            <input type="file" id="file" name="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button type="button" class="erp-btn-bg mr15 imeiImportOK">开始上传并导入</button>
                                    <a href="/manager/imei/change/excelFileExport" class="none erp-btn-lab  imeiImportError">导出错误信息</a>
                                </div>
                                <div class="form-group">
                                    <p id="imeiImportErrInfo"></p>
                                </div>
                            </form>
                            <b>已录入串号 <font class="imeiDr_num">0</font>个</b>
                            <table id="importGrid" class="zxsaastable"></table>
                        </div>
                        <div class="col-md-6" style="padding-left:0;padding-right: 0;">
                            <div class="form-inline" style="margin-top: 0px">
                                <div class="form-group col-sm-12" style="padding-left: 0px;padding-right: 0px;margin-bottom: 0px !important;">
                                    <b>粘贴</b>
                                    <div class="input-group col-sm-4" style="float: right">
                                        <select class="form-control imeiSign" id="imeiSign" style="height: 28px;padding: 0px;margin-top: -5px;"></select>
                                    </div>
                                    <label style="float: right;margin-right: 10px;"><i class="bitianX">*</i>串号标识</label>
                                </div>
                            </div>
                            <textarea class="form-control imeiDr_vone" style="height: 80px;resize:none;width: 100% !important;" placeholder="一行一串号。例：&#13;&#10;A88888888888888 &#13;&#10;869999999999999"></textarea>
                            <div style="height: 40px;line-height: 40px;margin: 5px 0px;">
                                <button type="button" class="erp-btn-bg imeiDr_import" >导入</button>
                                <button type="button" class="erp-btn-lab imeiDr_clear" >清空</button>
                            </div>
                            <div>
                                <b>错误提示</b>
                                <textarea class="form-control imeiDr_vtwo" style="height: 170px;resize:none" readonly></textarea>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
            <div class="modal-footer">
                <button type="button" class="erp-btn-bg imeiDr_sure">确定</button>
                <button type="button" class="erp-btn-lab" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<!--  串号导入模态框（Modal）结束 -->
</body>
</html>