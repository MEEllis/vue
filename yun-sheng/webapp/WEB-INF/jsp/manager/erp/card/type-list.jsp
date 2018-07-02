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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/asso.css?v=${version}"/>
		<title>会员类型管理(查询)</title>
		<style type="text/css">
		    html,body{width:100%;height:100%;}
			.btn-grp>a:hover{border:0;}
			.top2>div{
			 /* width:60%;*/
			   height:auto;
			   overflow:hidden;
			   margin-bottom:1%;
			   margin-left: 1%;
			}
			.content1{
			   overflow-y: auto;
			}
			.col-lg-1,.col-lg-2 {
               width: auto;
               padding-left: 0px; 
             }
             .col-lg-2{
               width: 148px;
             }
             .form-group .col-lg-2 .va_ipt{
               margin-left:0px;
             }
             .help-block {
               margin-top:0px;
               margin-bottom:0px;
             }
             .mr-rght{
               margin-right: 4%;
             }
             .top2{
               padding-top:1.5%;
             }
             .score-set>.tp>div.score-crash {
               width:auto;
             }
             .mr0_ml0{
              margin-right: 0px;
              margin-left:0px;
             }
              #togglingFormJF .row{
                margin-left:1%;
             }
             #togglingFormJF .cks{
                height:auto;
                overflow:hidden;
                 margin-top: 1%;
             
             }
             #togglingFormJF input[type=text]{
                width:128px;   
                margin-left: 0px;
                margin-right: 0px;
             }
             #togglingFormZK .row{
                margin-left:15px;
             }
            #togglingFormZK .row .form-group{
                height: auto;
                overflow: hidden;
            }
            #togglingFormZK .row .prince{
               margin-top:15px;
            
            }
		</style>
	</head>
	<body>
		<div class="content" style="border:0">
		<!--会员类型管理主页开始   -->
		    <div class="content1" style="width:100%;height:40%;">
			<!--top -->
			<div id="AUTH" data-code="HYLXGL" class="btn-grp" role="group" style="border: 1px solid #e3e3e3;">
			  <button type="button" class="btn" ><a class="bn"   onclick="window.parent.openWorkBoxByMenutext('新增会员类型','${basePath}/member/cardType/toAddType');" data-eventname="add" >新增</a></button>
			  <button type="button" class="btn" ><a  class="bn update"     data-eventname="update" >修改</a></button>
			  <button type="button" class="btn" ><a  class="bn  delete" data-eventname="delete">删除</a></button>	
			  <button type="button" class="btn" ><a  class="bn  enhanceservice" onclick="window.parent.openWorkBoxByMenutext('增值服务','${basePath}/member/cardType/toAddService');"  data-eventname='enhanceservice'>增值服务</a></button>
			  <button type="button" class="btn" ><a  class="bn  stopType" data-eventname="stopuse">停用/启用</a></button>
			  <a  class="btn" data-eventname="" onclick="window.location.reload();">刷新</a>
			</div>
			<!--top end-->
			<!--表格 -->
			<div class="tablebox retailDetailTable">
				<div class="grid-wrap" >
					<table id="jqGrid_blocMessage" class="zxsaastable"></table>
				    <%--<div id="jqGridPager"></div>--%></div>
			</div>
			<!--表格   end-->
			</div>
			
			<div class="content2">
			<!--参数详情 -->
			<div class="para" >
				<div class="">
					<ul class="nav nav-tabs" id="myTab">
						<li class="jf hidden" ><a href="#score-set" data-toggle="tab">积分设置</a></li>
						<li class="zk hidden"><a href="#buget-set" data-toggle="tab">折扣设置</a></li>
						<li class="sj hidden"><a href="#update-set" data-toggle="tab">升级设置</a></li>
						<li class="zzfw" ><a href="#upvalue-set" data-toggle="tab">增值服务</a></li>
					 </ul>
					<div class="tab-content"  style="border:1px solid #e3e3e3;border-top:0;background-color:#f5f5f5;">
                           <!--积分设置 -->
						<div class="tab-pane score-set jf"   id="score-set">
						<fieldset disabled>
						<form id="togglingFormJF">
							<div class="tp row">
								<div class="cks form-group">
									<div class="cxgoods col-lg-1">
										<input type="checkbox" name="isScore"  id="notTake" value="1" />
									</div>
									<label id="" class="col-lg-1 mr-rght" for="notTake" >促销商品不参加积分</label>
									<label id="" class="col-lg-1" >消费金额</label>
									<div class="col-lg-1">
										<input type="text" name="xamount" id="" value="" class="f5 mr0_ml0" >
									</div>
									<label id="" class="col-lg-1">(元)&nbsp;&nbsp;对应积分</label>
									<div class="col-lg-1"><input type="text" name="xsoure" id="" value="" class="f5 mr0_ml0 mr-rght"/></div>
									<div class="col-lg-1"><input type="checkbox" name="isMultiple" id="byScore" value="1" class="mr0_ml0"/></div>
									<label for="byScore" class="col-lg-1">按金额整倍积分</label>
								</div>
								<div class="score-crash form-group">
									<label class="score-tt col-lg-1 mr-rght">积分抵现</label>
									<label id="" class="col-lg-1">每</label>
									<div class="col-lg-1"><input type="text" name="dsoure" id="" value=""  class="mr0_ml0"/></div>
									<label id=""  class="col-lg-1">积分抵</label>
									<div class="col-lg-1"><input type="text" name="damount" id="" value="" class="mr0_ml0"/></div>
									<label id=""  class="col-lg-1">元</label>
								</div>
								
							</div></form></fieldset>
							<div class="btm">
								<p>特殊商品积分设置：</p>
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap" style="width:100%">
										<table id="jqGrid_jfsz" class="zxsaastable"></table>
								       <div id="jqGridPagerJF"></div>
									</div>
								</div>
							</div>
						</div>	
						   <!--折扣设置 -->
						<div class="tab-pane buget-set zk"  id="buget-set">
							<fieldset disabled>
							<form id="togglingFormZK">
							<div class="tp row">
							<div class="prince form-group">
								<span >适用价格：</span>
								<select  name="syPrice" class="syjg">
								</select>
							</div>
							<div class="zkprince form-group">
								<div class="col-lg-1"><input type="radio" name="modeFlag" id="common" value="1" checked="checked" /></div>
								<label for="common"  class="col-lg-1">统一折扣</label>
								<div class="col-lg-1"><input type="radio" name="modeFlag" id="byGoods" value="2" /></div>
								<label for="byGoods" class="col-lg-1">按商品类型折扣</label>
								
							</div> 
							<div class="zkvalue form-group">
								<div class="col-lg-1"><input type="checkbox" name="isRebate" id="allowZk" value="1"/></div>
								<label for="allowZk" class="col-lg-1">促销商品是否允许折扣</label>
								<label for="" class="col-lg-1">通用折扣率：</label>
								<div class="col-lg-1"><input type="text" name="rate" id="" value="" placeholder="100"/></div>
								<label for="" class="col-lg-1">%</label>
								
							</div></div></form></fieldset>
							<div class="btm">
								<p>特殊商品折扣：</p>
								<div class="tablebox retailDetailTable">
								<div class="grid-wrap" >
									<table id="jqGrid_goodsDiscount" class="zxsaastable">
									</table>
									<div id="jqGridPagerZK"></div>
				               </div>
				               </div>
							</div>
						</div>	
						   <!--升级设置 -->
							<div class="tab-pane update-set sj"  id="update-set">
							<fieldset disabled>
							<div class="top">
							<p class="limit">
								<input type="radio" name="timeFlag" id="noLimit" value="1" checked="checked" />
								<label for="noLimit" style="margin-right: 17px;">无时限</label>
								<input type="radio" name="timeFlag" id="byLimit" value="2" />
								<label for="byLimit">按时限</label>
							</p>
							<p><span id="">统计时间段</span><input type="text" name="tjNum" id="" value="" style="width:138px" /><span id="" style="margin-right: 8px;">年</span><span id="">每年检测日期</span><input type="text" name="checkDate" id="checkDate" value="" style="width:138px" /></p>
							</div>
							<div class="btm">
								
								<div class="kind">
									        <div class="ud">
											        <p class="uper">
											        <span id="">上级类别：</span>
													<select  name="lastCardtypeId" class="lastCardtypeId" onchange="selectUpOrDown(1)">
													
													</select></p>
													<p class="notup">
														<input type="checkbox" name="isAutoup" id="autoUpgrade" value="1" />
														<label for="autoUpgrade">是否自动升级</label>
													</p>
													 
									         </div>
											
											<div class="cksnot">
													<p class="downer">
											        <span id="">下级类别：</span>
													<select name="nextCardtypeId" class="nextCardtypeId" onchange="selectUpOrDown(2)">
													
													</select></p>
													<p class="notdown">
														<input type="checkbox" name="isAutodown" id="autoDownGrade" value="2" />
														<label for="autoDownGrade">条件不足时自动降级</label>
													</p>
								            </div>
								</div>
								<div class="upgrade">
									<p>
									<input type="radio" name="upFlag" id="byCustomUpGrade" value="1" checked="checked"/>
									<label for="byCustomUpGrade" style="margin-right: 18px;">按消费金额升级</label></p>
									<p>
									<input type="radio" name="upFlag" id="byScoreUpGrade" value="2" />
									<label for="byScoreUpGrade">按积分升级</label></p>
								</div>
								
							</div>
							</fieldset>
						</div>
						   <!--增值服务 -->
						<div class="tab-pane upvalue-set"  id="upvalue-set">
							<div class="service-tt">
								<p>选择增值服务并设置其收费标准</p>
								<div class="tablebox retailDetailTable">
								<div class="grid-wrap">
									<table id="jqGrid_addService" class="zxsaastable">
									</table>
								<!--	<div id="jqGridPager"></div>-->
				                </div>
				                </div>
							</div>
							
							
						</div>	
					</div>
				</div>
			</div> 
			<!--参数详情   end-->
			</div>
			</div>
		<!--会员类型管理主页结束   -->
	</body>
	<jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/typemanager.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	
    <script type="text/javascript">
    $(function(){
    	loadmodal({TableName: "#jqGrid_blocMessage",TableInfo:"0",parentHeight:$(window).height()*0.42,LoadTableUrl: "/manager/member/cardType/selectTypeList",choose:true});
    	// loadmodal({TableName:"#jqGrid_addService",TableInfo:"4" ,LoadTableUrl: '/manager/member/cardType/selectaddServiceList',choose:true});		//增值服务
    	 $("#jqGrid_blocMessage").jqGrid('setLabel',1, '选择', 'labelstyle');
    	 $.ajax({
             url: '/manager/member/cardType/initType',
             success: function (data) {
    		   //下级类别
    		    $(".nextCardtypeId").html("");
    	 		$(".nextCardtypeId").append("<option value=''>--- 不选择下级 ---</option>");
    	 		//上级类别
    	 		$(".lastCardtypeId").html("");
    	 		$(".lastCardtypeId").append("<option value=''>--- 不选择上级 ---</option>");
    	 	
    		 	for(var i=0;i<data.data.cardList.length;i++){//升级设置 
    		 		//下级类别
    		 		$(".nextCardtypeId").append("<option value='"+data.data.cardList[i].id+"'>"+data.data.cardList[i].typeName+"</option>");
    		 		//上级类别
    		 		$(".lastCardtypeId").append("<option value='"+data.data.cardList[i].id+"'>"+data.data.cardList[i].typeName+"</option>");
    		 	}
				
				$(".syjg").html("");
			 	//适用价格
			 	for(var i=0;i<data.data.syjg.length;i++){
			 		$(".syjg").append("<option value='"+data.data.syjg[i].code+"'>"+data.data.syjg[i].content1+"</option>");
			 	}
    	 	},
             error: function (msg) {
             }
         });
    	 initial();
    });
	</script>
</html>

