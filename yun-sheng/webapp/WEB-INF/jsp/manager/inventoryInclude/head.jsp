<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <strong><meta name="renderer" content="webkit|ie-comp|ie-stand"></strong>  
    <link rel="stylesheet" href="${basePath}/css/bootstrap.css?v=${version}"/>
    <link rel="stylesheet" href="${basePath}/css/bootstrapValidator.css?v=${version}"/><!-- 验证 -->
    <link rel="stylesheet" href="${basePath}/css/cw/zTreeStyle/zTreeStyle_.css?v=${version}"/><!-- 树 -->
    <link rel="stylesheet" href="${basePath}/css/jquery-ui.css?v=${version}"/><!-- 表格 -->
    <link rel="stylesheet" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/><!-- 表格 -->
    <link rel="stylesheet" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/><!-- 日期 -->
    <link rel="stylesheet" href="${basePath}/css/base.css?v=${version}"/>
    <link rel="stylesheet" href="${basePath}/css/iconfont/iconfont.css?v=${version}"/>
    <link rel="stylesheet" href="${basePath}/css/bootstrap-datetimepicker.css?v=${version}"/>
    <%--新版公共样式表--%>
    <link rel="stylesheet" href="${basePath}/css/inventory/common.css?v=${version}"/>

    <script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}"></script>
    <script src="${basePath}/js/jquery-ui.js?v=${version}"></script><!-- 表格 -->
    <script src="${basePath}/js/bootstrap.js?v=${version}"></script>
    <script src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}"></script>
    <script src="${basePath}/js/bootstrapValidator.js?v=${version}"></script><!-- 验证 -->
    <script src="${basePath}/js/jquery.ztree.all.min.js?v=${version}"></script><!-- 树 -->
    <script src="${basePath}/js/jquery.ztree.exhide.min.js?v=${version}"></script><!-- 树 -->
    <script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}"></script><!-- 表格 -->
    <script src="${basePath}/js/grid.locale-cn.js?v=${version}"></script><!-- 表格 -->
    <script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}"></script><!-- 日期 -->
    <script src="${basePath}/js/bootstrap-datetimepicker1.js?v=${version}"/></script><!-- 日期(年月) -->
    <script src="${basePath}/js/jquery-migrate-1.2.1.min.js?v=${version}"></script><!-- 打印 -->
    <script src="${basePath}/js/jquery.jqprint-0.3.js?v=${version}"></script><!-- 打印 -->
    <script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
     <script src="${basePath}/js/inventoryCommonJs/gridConfig.js?v=${version}"></script> <!-- 公共效验方法 -->
    <script  src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" ></script>
    <script src="${basePath}/js/cw/underscore-min.js?v=${version}"></script>
    <!-- 公共组件 -->
    <script src="${basePath}/js/component.js?v=${version}"></script>
    <script src="${basePath}/js/zxsaas_plus.js?v=${version}"></script>

    <script src="${basePath}/js/base.js?v=${version}"></script>
    <script src="${basePath}/js/inventoryCommonJs/validator.js?v=${version}"></script> <!-- 公共效验方法 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script> <%--菜单权限--%>
	<script type="text/javascript">
		var basePath = "${basePath}";
		var billsCode = "${billsCode}";
		var billsId = "${billsId}";
	</script>
    
