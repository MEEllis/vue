<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
	<head>
		<meta charset="UTF-8">
		<title>科目余额表</title>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/js/skins/all.css" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/animate.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap-select.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/treepage.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/table.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/subjectBal.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/query-ledger.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/select2.min.css" />
		<script type="text/javascript" charset="utf-8" src="${basePath}/js/select2.full.js" ></script>
		<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="shade">
			<div id="shade-box">
				<div class="shade-title">
					<b class="shade-b">查询</b>
					<label class="shade-close">×</label>
				</div>
				<div class="shade-main">
					<div class="shade-mainleft">
						<div class="shade-mainleft-nav">
							<span class="glyphicon glyphicon-saved" title='保存'></span>
							<span class="glyphicon glyphicon-log-in" title='另存为'></span>
							<span class="glyphicon glyphicon-remove" title='删除' style='color:red;'></span>
							<span class="glyphicon glyphicon-pencil" title='修改'></span>
						</div>
						<div class=''>
							<ul id="searchTreeData" class="ztree"></ul>
						</div>
					</div>
					<!--选项卡-->
					<div class="shade-mainright">
						<div class="shade-mainright-nav">
							<ul>
								<li class="pageA bgcolor">过滤条件</li>
							
							</ul>
						</div>
						<!--过滤条件页面-->
						<div class="shade-mainright-pageA">
							<p class="bloc">公司名称：
								<select class="wnum js-example-basic-multiple" id="comNameSelects" multiple="multiple">
									<option>Alibaba</option>
									<option>Tencent</option>
									<option>Sina</option>
								</select>
							</p>
							
							<p class="company">业务部门：
								<select class="wnum js-example-basic-multiple" id="salesTimeSelects" multiple="multiple">
									<optgroup label="汽车">
										<option>宝马</option>
										<option>奔驰</option>
										<option>拖拉机</option>
									</optgroup>
									<optgroup label="飞机">
										<option>123</option>
										<option>23532</option>
									</optgroup>
									<optgroup label="人">
										<option>ff</option>
									</optgroup>
								</select>
							</p>
							<hr />
							<p class="period">期间： <select id="yearAndMonBegin" name="minAccountAnnual" class="snum"></select>-
													<select id="yearAndMonEnd" name="maxAccountAnnual" class="snum"></select>
							</p>
													<input id="minSubjectId" type="hidden"/>
													<input id="maxSubjectId" type="hidden"/>
							<p class="company">科目类别：
								<select class="wnum js-example-basic-multiple" id="clazzSelects" multiple="multiple">
									<option>资产</option>
									<option>负责</option>
									<option>所有者权益</option>
								</select>
							</p>
							<p class="subject">科目编码：<input id="minSubjectCode"  name="minSubjectCode"  class="snum" onkeydown="delWholeInput(this)" type="text" /><span onclick="selectReferenceOpen('minSubjectCode')" class="subspanA glyphicon glyphicon-search"></span> - 
													<input  id="maxSubjectCode" name="maxSubjectCode" class="snum" onkeydown="delWholeInput(this)" type="text" /><span onclick="selectReferenceOpen('maxSubjectCode')" class="subspanB glyphicon glyphicon-search"></span>
							</p>
							<hr />
							<p class="level"><input id="levelNum1" class="mr pickA" type="radio" name="pick" checked />科目级次：<select id="minSubjectLevel" name="minSubjectLevel" class="uncheckA snum">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								<option>6</option>
							</select> - <select id="maxSubjectLevel" name="maxSubjectLevel" class="uncheckB snum">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								<option>6</option>
							</select></p>
							<p class="course"><input id="levelNum2" class="mc pickB" type="radio" name="pick" />末级科目</p>
							<hr />
							<p class="nocharge"><input id="ofR" name="ofR" class="mr" type="checkbox" />包含未记账</p>					
					</div>
					
					
				</div>
				<div class="shade-footer">
					<button class="sure">确定</button>
					<button class="cancel">取消</button>
				</div>
			</div>
			</div>	
		</div>
		<div class="btn-group" role="group" >
			<ul>
				<li>打印</li>
				<li>导出</li>
				<li>发送邮件</li>
				<li class="search-li">查询</li>
				<li>显示图表</li>
				<li class="claChoose">样式
					<ul class="cla-ul"><li class="cla-one">金额式</li><li class="cla-two">数量金额式</li></ul>
				</li>
				<li>设置</li>
				<li>刷新</li>
				<li>小计隐藏</li>
				<li>合计隐藏</li>
				<li>联查隐藏</li>
				<li class="close-li">退出</li>
			</ul>	
		</div>
		<!--头部-->
		<div id="subject-top">
			<div id="subject-top-na">发生额及余额表</div>
			<div id="subject-top-search">
				集团:<label class="sub-comp">执信</label>
				公司:
				<!--<input class="sub-comp" value="qweqew" list="computers" >
				<datalist id="computers">
				  <option value="xxxxxxxxxx">
				  <option value="sssssssssssss">
				  <option value="wwwwwwwwww">
				  <option value="wqqqqaww">
				</datalist>-->
				<select class="sub-comp">
						<option value='1001'>阿里巴巴</option>
						<option value='1002'>腾讯</option>
						<option value='1003'>百度</option>
						<option value='1004'>搜狐</option>
					</select><%--
				科目:<select class="sub-comp">
						<option value='1001'>库存现金</option>
						<option value='1002'>银行存款</option>
						<option value='1003'>其他货币资金</option>
						<option value='1004'>短期投资</option>
						<option value='1005'>应收票据</option>
					</select>--%>
				期间:<label id="yearAndMon" class="sub-comp"></label>
			</div>
		</div>
		<!--表格开始-->
		<div class="tablebox retailDetailTable">
			<div class="grid-wrap" style="margin-top:10px">
				<table id="jqGrid_subjectBal" class="zxsaastable">
				</table>
				<div id="gridpager"></div>
			</div>
		</div>
		<!--底部-->
		<div id="subject-bottom">
			<div id="subject-bottom-other" class="fb">单位名称:</div>
			<div id="subject-bottom-per" class="fb">制表人:008</div>
			<div id="subject-bottom-time" class="fb"></div>
		</div>
		
		
	


	</body>
		<script src="${basePath}/js/jquery-1.12.4.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.jqGrid.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/jquery.datetimepicker.full.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/grid.locale-cn.js" type="text/javascript" charset="utf-8"></script>		
		<script src="${basePath}/js/commonjs/xm.js" type="text/javascript" charset="utf-8"></script>
		<script src="${basePath}/js/zxsaas_plus.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.core-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.excheck-3.5.min.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/jquery.ztree.exedit-3.5.min.js"></script>
		<script type="text/javascript">
		var basePath = "${basePath}";
		var subjectBalanaceQuery = null;
		var voucherManage = null;
		var subjectPage = null;
		var initCompanyId = 12;
		var initGroupId = 8888888;
		</script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/subject-balance-query.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/model-subject-balanace-query.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/model-voucher-manage.js"></script>
		<script type="text/javascript" src="${basePath}/js/cw/subject/model-subject-page.js"></script>
		<script src="${basePath}/js/jquery.jqGrid.groupHeader-0.2.1.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" charset="utf-8" src="${basePath}/js/select2.full.js" ></script>
		<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">

			// 搜索
			var search = document.querySelector(".sub-comp");
			search.onchange = function(){
				alert("just for test!");
			}
			var myDate=new Date();
			var year = myDate.getFullYear();
			var month = myDate.getMonth()+1;
			var day = myDate.getDate();
			document.querySelector("#subject-bottom-time").innerHTML = "打印日期:"+year+"/"+month+"/"+day;
		
		var shade = document.querySelector("#shade");
		var body = document.querySelector("body");
		//shade.style.height = document.body.clientHeight + document.body.scrollHeight + "px";
		shade.style.height = 15 + document.body.scrollHeight + "px";
	
		var pickA = document.querySelector(".pickA");
		var pickB = document.querySelector(".pickB");
		var course = document.querySelector(".course");
		var uncheckA = document.querySelector(".uncheckA");
		var uncheckB = document.querySelector(".uncheckB");
		var mainRightPageA = document.querySelector(".shade-mainright-pageA");
		var mainRightPageB = document.querySelector(".shade-mainright-pageB");

		//多选框
		$("#salesTimeSelects").select2({
			//data:data,
			'width': '326px',
			placeholder: "多选", //默认提示语
			//maximumSelectionLength: 3, //最多能够选择的个数
			language: "zh-CN"
		});
		$("#comNameSelects").select2({
			'width': '326px',
			placeholder: "多选", 
			language: "zh-CN"
		});
		$("#clazzSelects").select2({
			'width': '326px',
			placeholder: "多选",
			language: "zh-CN"
		});
		
	//	级次判断选择
		uncheckA.onclick = function(){
			var val = uncheckA.value;
			uncheckB.options.length = 0;
			for(var i = val;i<7;i++){
				var opt = document.createElement("OPTION");
				opt.value = i;
				opt.text = i;
				uncheckB.appendChild(opt);
			}
		}
		
	//	选择级次
		pickA.onclick = function(){
			if(this.checked = true){
				course.style.opacity = "0.5";
				uncheckA.disabled = "";
				uncheckB.disabled = "";
			}
		}
		
	//	选择末级科目
		pickB.onclick = function(){
			if(this.checked = true){
				uncheckA.disabled = "disabled";
				uncheckB.disabled = "disabled";
				course.style.opacity = "1";
			}
		}
		
	//	方法
		function hasClass(elem, cls){
		    cls = cls || '';
		    if(cls.replace(/\s/g, '').length == 0) return false;
		    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
		}
	
		function addClass(elem, cls){
		    if(!hasClass(elem, cls)){
		        elem.className += ' ' + cls;
		    }
		}
		
		function removeClass(elem, cls){
		    if(hasClass(elem, cls)){
		        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
		        while(newClass.indexOf(' ' + cls + ' ') >= 0){
		            newClass = newClass.replace(' ' + cls + ' ', ' ');
		        }
		        elem.className = newClass.replace(/^\s+|\s+$/g, '');
		    }
		}
		
		document.querySelector('.search-li').onclick = function(){
			document.querySelector('#shade').style.display = 'block';
			document.querySelector('#shade').style.backgroundColor = 'rgba(0,0,0,0.2)';
		}
		document.querySelector('.sure').onclick = function(){
			document.querySelector('#shade').style.display = 'none';
			queryPage();
		}
		document.querySelector('.cancel').onclick = function(){
			document.querySelector('#shade').style.display = 'none';
		}
		document.querySelector('.shade-close').onclick = function(){
			document.querySelector('#shade').style.display = 'none';
		}
		</script>
</html>


<!-- 科目参照 -->
<div class="modal fade" id="subjectReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
         <!-- //科目双击事件 -->
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                   科目参照
            </h4>
         </div>
         <div class="modal-body">
			<iframe frameborder="0" style="width: 100%;height:400px;" src="${basePath}/cw/test/subjectReference"></iframe>
         </div>
	  </div>
	</div>
</div>	
