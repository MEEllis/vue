<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>科目期初余额</title>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/demo.css">
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStyle.css">
		<link href="${basePath}/css/cw/bootstrap/bootstrap.min.css" rel="stylesheet">
		<link href="${basePath}/css/cw/bootstrap/bootstrap-theme.min.css" rel="stylesheet">
		<script src="${basePath}/js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<!--<script type="text/javascript" src="${basePath}/js/cw/jquery.min.js"></script>-->
		<script src="${basePath}/js/cw/bootstrap/jquery.min.js"></script>
		<script src="${basePath}/js/cw/bootstrap/bootstrap.min.js"></script>
		<script src="${basePath}/js/cw/bootstrap/ie10-viewport-bug-workaround.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.core-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.excheck-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.exedit-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/begin-balance.js"></script>
        <style type="text/css">
        /**********对bootstrap的modal样式进行重写使模态框居中**********/  
        .modal-dialog {margin: 200px auto;}   
        </style>

	</head>
	<body >
    <div class="wrapper" style="width:98%;margin-left:20px;">
        <div class="col-md-12">
            <button type="button" class="btn btn-default" onclick="saveBeginBalance();">保存</button> 
			<button type="button" class="btn btn-default disabled">明细</button> 
			<a class="btn btn-default" href="#" role="button">查找</a>
			<a class="btn btn-default" href="#" role="button">试算平衡</a>
			<button type="button" class="btn btn-default disabled">清零</button> 
			<a class="btn btn-default" href="#" role="button">对账</a>
			<a class="btn btn-default" href="#" role="button">导入</a>
			<a class="btn btn-default" href="#" role="button">导出</a>
			<a class="btn btn-default" href="#" role="button">设置</a>
			<a class="btn btn-default" href="#" role="button">打印</a>
			<a class="btn btn-default" href="#" role="button">刷新</a>
			<a class="btn btn-default" href="#" role="button">退出</a>
		</div>
      
        <div class="col-xs-12">
                                             期间：${openDate}
              <table class="table table-bordered table-hover" id="subjectTable">
                <thead align="center">
                <tr >
                  <td rowspan="2" colspan="1" style="vertical-align:middle">序号</td>
                  <td rowspan="2" colspan="1" style="vertical-align:middle">科目编码</td>
                  <td rowspan="2" colspan="1" style="vertical-align:middle" >科目名称</td>
                  <td rowspan="2" colspan="1" style="vertical-align:middle">方向</td>
                  <td rowspan="2" colspan="1" style="vertical-align:middle">计量单位</td>
                  <td rowspan="1" colspan="2">累计借方</td>
                  <td rowspan="1" colspan="2">累计贷方</td> 
                  <td rowspan="1" colspan="2">期初余额</td>
                  <td rowspan="1" colspan="2">年初余额</td> 
                </tr>
                <tr >
                  <td rowspan="1" colspan="1">数量</td>
                  <td rowspan="1" colspan="1">金额</td>
                  <td rowspan="1" colspan="1">数量</td>
                  <td rowspan="1" colspan="1">金额</td>
                  <td rowspan="1" colspan="1">数量</td>
                  <td rowspan="1" colspan="1">金额</td>
                  <td rowspan="1" colspan="1">数量</td>
                  <td rowspan="1" colspan="1">金额</td>                                                                                                                                             
                </tr>
                <thead>
                
               <tbody id="rows">
               <c:forEach items="${rows}" var="subject" varStatus="status">
                <tr ondblclick="addAssist(${subject.id});">
                 <td >${status.index+1}</td>
                 <td style="display: none">${subject.id}</td>
                 <td >${subject.subjectCode}</td>
                 <td>${subject.subjectName}</td>
                 <td><c:if test="${subject.creditDirection==1}">借方</c:if>
                     <c:if test="${subject.creditDirection==0}">贷方</c:if>
                 </td>
                 <td>${subject.unit}</td>
                 <td>${subject.accumulateBorrowNum}</td>
                 <td>${subject.accumulateBorrowAmuont}</td>
                 <td>${subject.accumulateLoanNum}</td>
                 <td>${subject.accumulateLoanAmuont}</td>
                 <td>${subject.periodBeginNum}</td>
                 <td>${subject.periodBeginAmount}</td>
                 <td>${subject.yearBeginNum}</td>
                 <td>${subject.yearBeginBalance}</td>
                </tr>
		       </c:forEach>
               </tbody>
                
              </table>
        </div>
      </div>
</div>

</body>
</html>

  <!-- 辅助核算期初模态框 -->
	<div class="modal fade" id="assistBalaceModal">
		<div class="modal-dialog" style="width:890px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" onclick="closeMymodal();">x</button>
					<h4 class="modal-title">辅助核算期初</h4>
					
					<div class="row">
					<div class="col-md-12">
						<button type="button" class="btn btn-default" onclick="saveAssistBalance();">保存</button> 
						<button type="button" class="btn btn-default">明细</button> 
						<button type="button" class="btn btn-default">导出</button> 
						<button type="button" class="btn btn-default">设置</button> 
						<a class="btn btn-default" data-toggle="dropdown" href="#">打印 <b class="caret"></b></a>
	                    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
	                        <li><a href="#">打印</a></li>
	                        <li><a href="#">预览 Alt+/</a></li>
	                    </ul>
	                    
						<button type="button" class="btn btn-default">退出</button> 
					</div>
				</div>
				</div>
		<div class="modal-body" >
		  科目：<span id="subjectCode"></span> &nbsp;&nbsp;应收账款方向：<span id="creditDirection"></span><input id="subjectId" type="hidden" value=""/>
			<table  class="table table-bordered table-hover" id="assistTable">
				<thead align="center">
                <tr id="assistTable">
                  <td rowspan="2" colspan="1" style="vertical-align:middle" width="6%">序号</td>
                  <td >累计借方</td>
                  <td >累计贷方</td> 
                  <td >期初余额</td>
                  <td >年初余额</td> 
                </tr>
                <tr >
                  <td rowspan="1" colspan="1">金额</td>
                  <td rowspan="1" colspan="1">金额</td>
                  <td rowspan="1" colspan="1">金额</td>
                  <td rowspan="1" colspan="1">金额</td>                                                                                                                                             
                </tr>
                <thead>
                
                <tbody id="assistTbody">
                  
                </tbody>
			  </table>
			  <span style="color:red">在线提示：启用往来辅助核算的科目，辅助期初与往来明细需一致，辅助期初生成时自动生成往来明细。需要往来核销的科目，建议先录入往来明细。</span>
			  </div>
			</div>
		</div>
	</div>

