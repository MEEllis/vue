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
		<link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrapValidator.css?v=${version}"/>
	    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
        <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome-ie7.css?v=${version}"/>
        <link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/associator/asso.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/cw/zTreeStyle/zTreeStylePublicModel.css?v=${version}"/>
		<link rel="stylesheet" type="text/css" href="${basePath}/css/jquery.datetimepicker.css?v=${version}"/>
		<title>会员卡类型新增</title>
		<style type="text/css">
		    .ui-jqgrid{
		    	width: 100%;
		    	border-left: none;
		    	border-right: none;
		    }
			.ui-jqgrid-bdiv{
				width: 1670px;
				height: 143px!important;
			}
			.jqGridPager{
				width: 1670px;
			}
			.container{
			  padding-left:0px;
			  padding-right:0px;
			}
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
            #togglingFormSJ .row{
              margin-left:0px;
            }
		</style>
	</head>
	<body>
		<div class="content container" style="border:0">
		<input type="hidden" id ="tid" value="${id}"/>
		<!--会员卡新增页面开始   -->
		    <div class="content1" style="background-color: #f5f5f5;border:1px solid #e3e3e3;border-radius: 2px;">
			 <!--top -->
			<div  id="AUTH" data-code="HYLXGL" class="btn-grp" role="group" >
			  <a  class="bn saveType"   data-eventname="save">保存</a>
			</div>
			<form id="togglingForm" class="">
			<!--top end-->
			<div class="row top2" id="typeMain" >
			<!--使用范围 -->
			<div class="form-group div-one" >
				<label id="" class="col-lg-1">适用范围：</label>
				<div class="col-lg-2 mr-rght"><input type="text" disabled="disabled" class="groupName ipt va_ipt"></div>
				<label class="col-lg-1">有效时间：</label>
				<div class="col-lg-2"><input type="text" maxlength="4" name="activeTime" id="" value="" class="ipt limit-time  va_ipt" style="margin-right:1%"/></div>
				<label  class="col-lg-1">月</label>
			</div>
			<!--使用范围   end-->
			<!--类型text-->
			 <div class="form-group div-two">	
			    	<label id="" class="col-lg-1">类型编码：</label>
			    	<div class="col-lg-2 mr-rght"><input type="text" maxlength="32" name="typeCode" id="" value="" class="va_ipt" maxlength="32"/></div>
				    <label id="" class="col-lg-1">类型名称：</label>
				    <div class="col-lg-2 mr-rght"><input type="text" maxlength="32" name="typeName" id="" value="" class="va_ipt"/></div>
				    <label id="" class="col-lg-1">所属分类：</label>
			    	<div class="col-lg-2 mr-rght"><select name="categoryCode" class="categoryCode  va_ipt" style="width:148px; height:28px; border:1px solid #cfcfcf;">
				    </select></div>
			        <label id="" class="col-lg-1">备注：</label>
			        <div class="col-lg-2 mr-rght"><input type="text" maxlength="100" class="remark  va_ipt" name="remark" maxlength="100"/></div>
			 </div>
			<!--类型text end-->
			<!--备注 储值 密码验证-->
			 <div class="form-group div-three">	
			    <div class="col-lg-1"><input type="checkbox" class="save-val  va_ipt" name="isValue" value="1" id="storgeVal"/></div>
			    <label id="" for="storgeVal"  class="col-lg-1 mr-rght">储值功能</label>
			    <div class="col-lg-1"><input type="checkbox" class="validate-psw-ornot  va_ipt" value="1" name="isPassword" id="passwordCk"/></div>
			    <label for="passwordCk"  class="col-lg-1 mr-rght">是否需要密码验证</label>
			    <label id="" class="col-lg-1  hidden tog">密码位数:</label>
			    <div class="col-lg-2"><input type="text"  name="sizeN" class="f5 ipt pswCount hidden tog  va_ipt" placeholder="大于等于6位"/></div>
			 </div>
			<!--备注 储值 密码验证 end-->
			<!--会员卡功能 -->
			<div id="" class="form-group div-four">
					<label  class="col-lg-1 mr-rght" >会员卡功能:</label>
					 <div class="col-lg-1"><input type="checkbox" name="isScore" id="jfFun" value="1" class="points-fct va_ipt"/></div>
					<label for="jfFun"  class="col-lg-1 control-label mr-rght" >积分功能</label>
					 <div class="col-lg-1"><input type="checkbox" name="isRebate" id="dzFun" value="1" class="sale-fct va_ipt"/></div>
					<label for="dzFun"  class="col-lg-1 control-label mr-rght" >打折功能</label>
					 <div class="col-lg-1"><input type="checkbox" name="isUp" id="upFun" value="1" class="upgrade-fct va_ipt"/></div>
					<label for="upFun"  class="col-lg-1 control-label" >会员升级</label>
			</div>
			<!--会员卡功能end -->
			</div><!--top2 end--></form></div><!--content1 end-->
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
					<div class="tab-content" style="border: 1px solid #e3e3e3;border-top:0;background-color: #f5f5f5;">
                           <!--积分设置 -->
						<div class="tab-pane score-set jf"   id="score-set">
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
								
							</div></form>
							<div class="btm">
								<p>特殊商品积分设置：</p>
								<div class="tablebox retailDetailTable">
									<div class="grid-wrap"  >
										<table id="jqGrid_jfsz" class="zxsaastable"></table>
								       <div id="jqGridPagerJF"></div>
									</div>
								</div>
							</div>
						</div>	
						   <!--折扣设置 -->
						<div class="tab-pane buget-set zk"  id="buget-set">
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
								<div class="col-lg-1"><input type="text" name="rate" id="" value="" /></div>
								<label for="" class="col-lg-1">%</label>
								
							</div></div></form>
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
							<form id="togglingFormSJ">
							<div class="top row">
							<div class="limit form-group">
								<input type="radio" name="timeFlag" id="noLimit" value="1" checked="checked" />
								<label for="noLimit" style="margin-right: 17px;">无时限</label>
								<input type="radio" name="timeFlag" id="byLimit" value="2" />
								<label for="byLimit">按时限</label>
							</div>
							<div class="form-group">
								<label id=""  class="col-lg-1">统计时间段</label>
								<div class="col-lg-1"><input type="text" name="tjNum" id="" value="" style="width:138px" disabled="true"/></div>
								<span id="" style="margin-right: 11px;">年</span><span id="">每年检测日期</span>
								<input type="text" name="checkDate" id="checkDate" value="" style="width:138px" disabled="true"/>
							</div>
							</div></form>
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
							
						</div>
						   <!--增值服务 -->
						<div class="tab-pane upvalue-set"  id="upvalue-set">
							<div class="service-tt">
								<p>选择增值服务并设置其收费标准</p>
								<div class="tablebox retailDetailTable">
								<div class="grid-wrap">
									<table id="jqGrid_addService" class="zxsaastable"></table>
								<!--<div id="jqGridPager"></div>-->
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
		<!--会员卡新增页面结束   -->
			
	</body>
		<!-- 商品名称模态框（Modal） -->
		<div class="modal fade" id="goodsch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog modalNine">
				<div class="modal-content " style=" width: 883px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							商品资料
						</h4>
					</div>
				  <div class="modal-body">
				  
					<div style="overflow: auto;">
						<div class="left-tree">
							<input type="hidden"/>
							<ul id="goodsDataTree" class="ztree"></ul>
						</div>							
					</div>
					
				   </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>
					</div>
					
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div><!-- 商品名称模态框（Modal）结束 -->
	
	
	<jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/addCardType.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
	<script type="text/javascript">
	 $(function(){
		 useJfUp();
     });
	
	</script>
    
</html>


