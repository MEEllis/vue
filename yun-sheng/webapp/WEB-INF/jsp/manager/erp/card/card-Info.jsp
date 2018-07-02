<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit" />
		<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE ; chrome=1" />
        <link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/> 	
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}" />
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery-ui.css?v=${version}" />
		<link rel="stylesheet" type="text/css" href="${basePath}/css/ui.jqgrid-bootstrap.css?v=${version}"/>
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
        <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/associator.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/cardinfo.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<title>会员卡信息</title>
		<style type="text/css">
			.ui-jqgrid .ui-jqgrid-htable .ui-th-div {
			  height:auto;
			}
			#sortChangeModal .tp-info span {
			   min-width:auto;
			}
			.jqGridPager{
				width: 1670px;
			}
			#gbox_jqGrid_blocMessage .ui-jqgrid-bdiv{
				height: 263px!important;
			}
			
			#mkCardPileModal .ui-jqgrid-view,#mkCardPileModal .ui-jqgrid-hdiv,#mkCardPileModal .ui-jqgrid-bdiv,#mkCardPileModal .ui-jqgrid {
				width: 563px!important;
			}
			#mkCardPileModal .ui-jqgrid-bdiv{
				height: 148px!important;
			}
			a{
			      text-decoration: none;
			}
			/*充值赠送*/
			.addCash-info span {
			   width:100px;	
			}
			.left-tree{
			    border-left:1px solid #cfcfcf;
			    border-bottom:1px solid #cfcfcf;
			}
			
			.btn-group a{color:#333}
		</style>
		<script type="text/javascript">
		var sectionId = ${SESSION_KEY_USER.sectionId};
		</script>
	</head>
	<body>
		<div class="content">
		<!--会员卡信息主页开始   -->
		<!--btns -->
		<div class="gridTools">
		  <div class="gridTop">  
	        <div class="">
				<div class="" style="padding: 0px;">
 				<div id="AUTH" data-code="HYKGL" class="btn-group btnHundred">
			    	<button type="button" class="btn btn-default navbar-btn" data-toggle="modal" data-target="#mkCardPileModal">批量制卡</button>
			    	<button type="button" class="btn btn-default navbar-btn fk">发卡/修改</button> 
			    	<div class="dropdown" style="display: inline-block;">
				        <button type="button" class="btn btn-default navbar-btn" id="dropdownMenu1" data-toggle="dropdown">批量处理<span class="caret"></span></button>
				        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
							<li role="presentation">
								<a role="menuitem" tabindex="-1" class='clearToZero' >积分清零</a>
							</li>
							<li role="presentation">
								<a role="menuitem" class='caozuo' id="2" tabindex="-1" >停用</a>
							</li>                                                        
							<li role="presentation">
								<a role="menuitem" class='caozuo' id="1" tabindex="-1" >启用</a>
							</li>
							<li role="presentation">
								<a role="menuitem" class='caozuo' id="3" tabindex="-1">挂失</a>
							</li>
							<li role="presentation">
								<a role="menuitem" class='caozuo' id="4" tabindex="-1" >作废</a>
							</li>
							<li role="presentation">
								<a role="menuitem"  class='deleteCard'  tabindex="-1">删除</a>
							</li>
						</ul>
			       </div>
			        <button type="button" class="btn btn-default navbar-btn huanka" >换卡</button>
			        <button type="button" class="btn btn-default navbar-btn addCash"  data-toggle="modal" >充值</button>
			       <div class="dropdown" data-eventname="find" style="display: inline-block;">
			        <button type="button" class="btn btn-default navbar-btn" id="dropdownMenu2" data-toggle="dropdown">升级管理<span class="caret"></span></button>
			        		<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu3">
								<li role="presentation">
									<a role="menuitem" tabindex="-1" onclick="upAndDown(1)">会员升级</a>
								</li>
								<li role="presentation">
									<a role="menuitem" tabindex="-1" onclick="upAndDown(2)">会员降级</a>
								</li>
								<li role="presentation">
									<a role="menuitem" tabindex="-1" class='lxbg'  >类型变更</a>
								</li>
								
							</ul>
			        </div>
			          <a  class="btn" onclick="window.location.reload()" style="line-height: 18px;">刷新</a>
				</div>
	        </div>
	    </div>

			
		<div class="content1">
			<!--快速检索 -->
			<div class="quickselect">
				<span id="">快速检索：</span>
				<input type="text" name="" id="" value=""  class="qick-ipt" placeholder="输入卡号或持卡人姓名"/>
				<a class="find-out">查询</a>
			</div>
			<!--快速检索   end-->
		</div></div>
		<div class="content2">
			<!--树结构 left-->
			<div class="left-tree" style="overflow:auto;">
					<ul id="sort-tree" class="ztree" style="width:300px;min-width:300px;"></ul>
			</div>
			<!--树结构 end-->
			<!--表格 right -->
			<div class="right-table">
				<div class="grid-wrap" >
					<table id="jqGrid_cardInfo" class="zxsaastable"></table>
				    <div id="jqGridPagercI"></div>
				</div>
			</div>
			<!--表格   end-->
		</div>
			</div>
		<!--会员卡信息主页结束   -->
		
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
						      	  <%--<a   data-eventname="pile-make"  class="btn  start-mkCard" style="border-left:1px solid #cfcfcf">开始制卡</a> --%>
									  <a   data-eventname="card-dstribute"  class="btn cancel-mkCard">清空</a>	
									  <a   data-eventname="pile-deal"  class="btn restart-mkCard" >重制上一张</a>	
									  <a   data-eventname='card-change' class="btn skip-thisCard" >跳过本张卡</a>
						
			      	  </div>
			          <div class="tp-info" style="min-height: 268px;background-color: #f5f5f5; padding-top: 20px;">
			          	<p>
			          		<span>制卡部门：</span>
			          		<input type="text" name="sectionName"  value="" class="w-148 modal-ipt mkDis sectionName" disabled="disabled" readonly="readonly" />
			          		<span>会员类型：</span>
			          		<select class="w-148 modal-ipt typeNamePiles" id="typeNamePiles" name="typeName" >
			          			
			          		</select>
			          	</p>
			          	<p>
			          		<span>卡号范围：</span>
			          	</p>
			          	<p class="tgle">
			          		<span>需制卡张数：</span>
			          		<input type="text" name="" id="" value=""  class="w-148 modal-ipt needMk"  disabled="disabled" readonly="readonly"/>
			          		<span>已制卡张数：</span>
			          		<input type="text" name="" id="" value=""  class="w-148 modal-ipt alMk" disabled="disabled" readonly="readonly"/>
			          	</p>
			          	<p class="tgle">
			          		<span>卡号位数：</span>
			          		<input type="text" name="" id="" value=""  class="w-148 modal-ipt count-card" />
			          		<label for="ornotNum" style="">是否号码卡</label><input type="checkbox" name="" id="ornotNum" value=""  class="cardOrnot" />
			          	</p>
			          	<p class="cardNums">
			          	   <span>开始卡号：</span>
			          	   <input type="text" name="" id="" value="" class="w-148 modal-ipt startCard" maxlength="20"/><i class="hidden icon-exclamation-sign" style="color: red;"></i>
			               <span>截止卡号：</span>
			          	   <input type="text" name="" id="" value="" class="w-148 modal-ipt overCard" maxlength="20"/><i class="hidden icon-exclamation-sign" style="color: red;"></i>
			          	</p>
			          	<p class="hd">
			          		<span class="span-title">当前卡号：</span>
			          		<input type="text" name="" id="" value="" class="w-148 modal-ipt nowCardNum"  disabled="disabled" readonly="readonly"/>
			          		<span class="span-title">卡密：</span>
			          		<input type="text" name="" id="" value="" class="w-148 modal-ipt cardPsw" disabled="disabled" readonly="readonly"/>
			          	</p>
			          </div>
			          
			          
			          
			          <div class="bt-tble hd" style="width: 565px;">
			          	<div class="tablebox retailDetailTable">
									<div class="grid-wrap">
										<table id="jqGrid_mkCardPile" class="zxsaastable"></table>
									    <div id="jqGridPagermkCardPile" ></div>
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
		
		
	<!--积分清零 模态窗-->
		<div class="modal fade" id="soreClearModal" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title ">积分清零</h4>
				  </div>
			      <div class="modal-body">
			          <div class="tp-info" >
			          <%--
			          	<p>
			          		<input type="radio" name="xz" id="yx" value="1" checked="checked"/><label for="yx">已选会员</label>
			          		<input type="radio" name="xz" id="sy" value="2" /><label for="sy">所有会员</label>
			          	</p>
			          	<p>
			          		<input type="radio" name="xz" id="acro" value="3" /><label for="acro">按会员类型清零</label>
			          	</p>
			          	<p>
			          		<span id="">会员类型</span>
			          		<select id="hylx" class='typeNamePiles' style="width: 148px; height: 28px;">
			          			
			          		</select>
			          	</p>--%>
			          	<p >
			          		<span id="">清零原因:</span>
			          		<input type="text" id="qlyy" style="height: 28px;border: 1px solid #cfcfcf;"/>
			          	</p>
			          </div>
			          
			          	<div class="tablebox retailDetailTable">
								<div class="grid-wrap" id="" style="width:551px;min-width:551px;height: 285px;">
									<table id="jqGrid_assoList" class="zxsaastable"></table>
								</div>
		            	</div>
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn btn-primary jfqlSave" >确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--积分清零  模态框 end-->
		
	<!--换卡  模态窗-->
		<div class="modal fade" id="chgeCardModal" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" >换卡</h4>
				  </div>
			      <div class="modal-body">
			          <div class="tp-info" style="height: 189px;">
			          	<p>
			          		<span>原卡号：</span>
			          		<input type="text" name="" id="ykh" disabled="disabled" />
			          		<input type="hidden" name="id">
			          	</p>
			          	<p>
			          		<span>新卡号：</span>
			          		
			          		<select  name="zcardId" id="newCard" >
			          		</select>
			          	</p>
			          	<p>
			          		<span>持卡人：</span>
			          		<input type="text" disabled="disabled" name="" id="ckr"  />
			          	</p><!--
			          	<p>
			          		<span>往来单位：</span>
			          		<input type="text" disabled="disabled" name="" id="wldw" />
			          	</p>
			          	--><p class="tgle">
			          		<span>证件号：</span>
			          		<input type="text" disabled="disabled" name="" id="zjh" />
			          	</p>
			          </div>
			          
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn btn-primary hkSave">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--换卡 莫态框 end-->
		
			<!--充值 模态窗-->
		<div class="modal fade" id="addCashModal" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" >充值</h4>
				  </div>
			      <div class="modal-body">
			          <div class="tp-info addCash-info" style="height: 189px;">
			          	<p>
			          		<span>会员卡号：</span>
			          		<input type="text " name="" id="cardNum" value="" class="w-148 modal-ipt hycz" readonly="readonly" disabled/>
			          	   <span>会员类型：</span>
			          		<input type="text " name="" id="cardType" value="" class="w-148 modal-ipt hycz"  readonly="readonly"/>
			          	</p>
			          	<p>
			          		<span>充值金额：</span>
			          		<input type="text " name="" id="czje" value="" class="w-148 modal-ipt hycz" onchange="rechargeGift()"/>
			          		<span>赠送金额：</span>
			          		<input type="text " name="" id="zsje" value="" class="w-148 modal-ipt hycz"/>
			          	</p>
			          	<p>
			          		<span>当前余额：</span>
			          		<input type="text " name="" id="" value="" class="w-148 modal-ipt currentCash hycz" readonly="readonly"/>
			          		<span>充值日期：</span>
			          		<input type="text " name="" id="czrq" value="" class="w-148 modal-ipt hycz" />
			          	</p>
			          	<p>
			          		<span>收款金额：</span>
			          		<input type="text " name="" id="payrecetiptAmount" value="" onclick="openPayrecetiptDetailModal()" class="w-148 modal-ipt hycz"/>
			          		<span>业务员：</span>
			          		<select name="" id="ywy" value="" class="w-148 modal-ipt hycz">
			          		</select>
			          	</p>
			          	<p class="tgle">
			          		<span>备注：</span>
			          		<input type="text " name="" id="" value="" class="w-148 modal-ipt hycz"/>
			          	</p>
			          </div>
			         
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn btn-primary" id="czSave">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--充值莫态框 end-->
		<!--类型变更  模态窗-->
		<div class="modal fade" id="sortChangeModal" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title " >更改会员卡类型</h4>
				  </div>
			      <div class="modal-body">
			          <div class="tp-info" style="min-height: 189px;">
			           <p>
			             <span style="width:auto">修改为会员卡类型:</span>
			             <select name="" id="updateType" class="typeNamePiles" style="width: 148px; height: 28px; margin-left:10px">
			          	</select>
			          	</p>
			          	<p>已选择会员卡</p>
			            <div class="bt-tble"  >
			          	<div class="tablebox retailDetailTable">
								<div class="grid-wrap" style="height:200px;width:552px;min-height:200px;min-width:552px;" >
									<table id="jqGrid_cardChoose" class="zxsaastable"></table>
									<%--<div id="jqGridPagercardChoose" ></div>--%>
								</div>
		            	</div>
			          </div>
			         
			          </div>
			          
			         
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn btn-primary lxbgSave" data-dismiss="modal">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--类型变更 end-->
		
		
		
		
<!-- 预付款明细录入 -->
<div class="modal fade" id="payrecetiptDetailModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width: 600px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                 付款方式
            </h4>
         </div>
         <div class="modal-body">
			<!-- /S 表体 -->
			<div class="jqGrid_wrapper">
				<table id="dataGrid2"></table> 
			</div><!-- /E 表体 -->
         </div>
         <!-- 模态框底部部分 -->
         <div class="modal-footer">
            <button type="button" class="btn btn-default"  onclick="savePayreceiptAmout()">保存</button>
            <button type="button" class="btn btn-default"  data-dismiss="modal">关闭</button>
         </div>
	  </div>
	</div>
</div>

	</body>
	<script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.jqGrid.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/grid.locale-cn.js?v=${version}" type="text/javascript" charset="utf-8"></script>	
	<script src="${basePath}/js/cw/jquery.ztree.all-3.5.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/jquery.datetimepicker.full.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/xr.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/commonjs/eidit-grid-test.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script src="${basePath}/js/associator/cardinfo.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function(){
    	initial();
    	$('#czrq').datetimepicker({
    		lang:"ch",           // 语言选择中文
    		format:"Y-m-d",      // 格式化日期
    		timepicker:false,    // 关闭时间选项
    		todayButton:false    // 关闭选择今天按钮
    		});
		//发卡/修改
    	   $("#issuingDate").datetimepicker({//发卡日期
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
			$("#effectiveDate").datetimepicker({//生效日期
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
			
			$("#birthDate").datetimepicker({//出生日期
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
    });
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>

