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
		<title>发卡</title>
		<style type="text/css">
		    html,body{width:100%;height:100%;}
			.top1 span,
			.top2 span,
			.top3 span{
			   display: inline-block;
			   width: 90px;
			   text-align: rigth;
			   text-align: right;
			   margin-right: 10px;
			}
			.top1 input[type=text],
			.top2 input[type=text],
			.top3 input[type=text],
			.content2 .top1 select,
			.content2 .top2 select,
			.content2 .top3 select{
			  width:100%;
			  height:28px;
			  border:1px solid #e3e3e3;
			}
			
			.col-lg-1 {
			  padding-left:0;
			  padding-right:0;
			  margin-bottom:8px;
			}
			.content>.content2>.top2 {
			  height:auto;
			}
			.content2 .row{
			   margin:0;
			}
			.form-group{height: auto;overflow: hidden;}
			.btn-grp{border:1px solid #e3e3e3;}
			.content2,.tt,.ct,.top3{background-color: #f5f5f5;}
			    
		</style>
	</head>
	<body>
		<div class="content" id="mainInfo" style="height:95%;">
		<!--发卡主页面开始   -->
		    <div class="content1" >
				<!--top -->
				<div id="AUTH" data-code="HYKGL" class="btn-grp" role="group" >
				  <button class="bn save"   data-eventname="pile-make"  id="confirm_fa" >确认发卡</button>
				</div>
				<!--top end-->
			</div>
			<input type="hidden" id="zcardId" name="zcardId" value="${id}"/>
			<input type="hidden" id="id" name="id" value="${fid}"/>
			<div class="content2"  style="height: 96.6%;overflow: inherit;">
			<!--top1-->
			<form id="topValidate" >
			<div class="top1  row" style="height:32%; padding: 2.1% 0.6%;overflow: auto;">
				<div class="form-group">
				    <label class="hykh col-lg-1">会员卡卡号:</label>
				    <div class="col-lg-1"><input type="text" disabled="disabled"  id="cardNum" value="${cardNum}" /></div>
				
				   <label id="" class="hyklx col-lg-1">会员卡类型:</label>
				   <div class="col-lg-1">
				   <select name="cardTypeId" id="typeName"  disabled="disabled">
				   
				   </select>
				   </div>
				 <input name="cardTypeId"  value="${typeId}" type="hidden" />
				   <label id="" class="ckr col-lg-1">持卡人:</label>
				   <div class="col-lg-1"><input name="cardholder" id="cardholder" type="text"/></div>
				   <label id="" class="ckmm col-lg-1">持卡密码:</label>
				   <div class="col-lg-1"><input type="text" name="cardPassword" id="" value="" /></div>
				   <label id="" class="wldw col-lg-1">往来单位:</label><!-- 
				  <div class="col-lg-1">
				   <select name="contactUnitid" id="contactUnitid">
				     	<option value=""></option>
				   </select></div>
				   
				     -->
				     <div class="col-lg-1">
				     <div class="inputWrap" style="position: relative;display:inline-block;">
	                 <input type="hidden" id="contactUnitid" name="contactUnitid" value="">
	                <input type="text"  id="unitCome" name="unitName" readonly="" class="form-control" />
	                <span style="position: absolute;right:6px;top:9px;vertical-align: middle;cursor:pointer;z-index:2;" class="inputAssPlus glyphicon glyphicon-plus unitCome"></span></div>
				    </div>
				</div>	
				<div  class="form-group">
				   <label id="" class="fkrq col-lg-1">发卡日期:</label>
				    <div class="col-lg-1"><input type="text" name="issuingDate"  class="" id="issuingDate" value="" /></div>
				   <label id="" class="sxrq col-lg-1">生效日期:</label>
				    <div class="col-lg-1"><input type="text" name="effectiveDate" class="" id="effectiveDate" value="" /></div>
				   <label id="" class="yxsj col-lg-1">有效时间(月):</label>
				    <div class="col-lg-1"><input type="text" name="effectivMon" class="" id="effectivMon" value="" maxlength="10"  disabled="disabled"/></div>
				   <label id="" class="sxsj col-lg-1">失效日期:</label>
				    <div class="col-lg-1"><input type="text" name="invalidDate" class=""  disabled="disabled"  id="invalidDate" value="" maxlength="10"/></div>
			
				   <label id="" class="csjf col-lg-1">初始积分:</label>
				    <div class="col-lg-1"><input type="text" name="score" id="" value="0" /></div>
				  
				</div>	
			</div></form>
			<!--top1 end-->
			<!--top2-->
			<div class="top2" style="height:40%;padding: 2.1% 0.6%;overflow: auto;background-color: #f5f5f5;">
			<form id="bottomValidate">
				<div class="tt">
					<p>持卡人信息</p>
				</div>
				<div class="ct row">
					<div  class="form-group">
						 <label class="col-lg-1">手机号码:</label>
						 <div class="col-lg-1"><input type="text" name="tel1" id="" value="" maxlength="11"/></div>
						<label class="col-lg-1">其他联系方式:</label>
						 <div class="col-lg-1"><input type="text" name="tel2" id="" value="" maxlength="11"/></div>
						<label class="col-lg-1">证件类型:</label>
						 <div class="col-lg-1">
						 <select name="documenttype">
							<option>身份证</option>
						</select></div>
						<label class="col-lg-1">证件号:</label>
						 <div class="col-lg-1"><input type="text" name="certificateno" id="" value="" maxlength="18"/></div>
				
						<label class="col-lg-1">微信号:</label>
						<div class="col-lg-1">
						   <input type="text" name="wechat" id="" value="" maxlength="20"/>
						</div>
						
					</div>
					<div  class="form-group">
					<label class="col-lg-1">发展类型:</label>
					 <div class="col-lg-1">
					 <select name="fzrType" id="fzrType" >
					    <option value="" selected="selected">---请选择类型---</option>
						<option value="1">往来单位</option>
						<option value="2">员工</option>
						<option value="3">会员</option>
					</select></div>
					<label class="col-lg-1">发展人:</label>
					 <div class="col-lg-1">
					 <div class="inputWrap" style="position: relative;display:inline-block;">
					 	<input type="hidden" id="fzrId" name="fzrId" value=""/>
					    <input id="fzrName" name="fzrName" type="text" readonly="" class="form-control">
					    <span style="position: absolute;right:6px;top:9px;vertical-align: middle;cursor:pointer;z-index:2;" class="inputAssPlus glyphicon glyphicon-plus fzrName" data-toggle="modal"></span>
					 </div>	</div>
					 
					   <label class="col-lg-1">发展时间:</label>
						<div class="col-lg-1">
						   <input type="text" name="fzDate" class="" id="devolopDate">
						</div>
						
				   	   <label class="col-lg-1">支付宝账号:</label>
						<div class="col-lg-1">
						   <input type="text" name="alipay" id="" value="" maxlength="11"/>
						</div>
						
						<label class="col-lg-1">出生日期:</label>
						 <div class="col-lg-1">
						   <input type="text" name="birth" id="birthDate" value=""/>
						</div>
						
					</div>
					<div class="form-group">
					    <label class="col-lg-1">QQ号:</label>
						<div class="col-lg-1">
						   <input type="text" name="qq" id="" value="" maxlength="20"/>
						</div>
						
						<label class="col-lg-1">E-mail:</label>
						<div class="col-lg-1">
						   <input type="text" name="email" id="" value=""/>
						</div>
						<label class="col-lg-1">通讯地址:</label>
						<div class="col-lg-1">
						   <input type="text" name='address' id="" value=""/>
						</div>
					    <label id="" class="bz col-lg-1">备注:</label>
					    <div class="col-lg-1"><input type="text" name="remark" id="" value="" /></div>
				
					</div>
				</div></form>
			</div>
			<!--top2 end-->
			<!--top3-->
			<div class="top3 pd-t pd-l"  style="height: 18%;min-height: 18%;padding: 2.1% 0.6%;overflow: auto">
				<div class="row">
				<div class="form-group">
						<label id="" class="col-lg-1">发卡公司:</label>
						 <div class="col-lg-1"><input type="text" name="" disabled="disabled" id="" value="${fkgs}" /></div>
						<label id="" class="col-lg-1">发卡部门:</label>
						<div class="col-lg-1"><input type="text" name="" disabled="disabled" id="" value="${fkbm}" /></div>
						<label id="" class="col-lg-1">发卡人:</label>
						<div class="col-lg-1"><input type="text" name="" disabled="disabled" id="" value="${fkr}" /></div>
				</div>
				</div>
			</div>
			<!--top3 end-->
			</div>
			</div>
		<!--发卡主页面结束   -->
			<!--往来单位模态窗-->
		<div class="modal fade" id="wldw2" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title " id="deple_wldw2">往来单位</h4>
				  </div>
			      <div class="modal-body" id="plzk_wldw2">
			          <div class="bt-tble hd"  style="width:100%;">
			            <div style="margin-bottom:10px"><label>快速检索：</label>
			            <input  type="text" class="search_wldw" style="width:200px;height:28px;border:1px solid #cfcfcf;font-size:0.5em"  placeholder="请输入编码或名称"/>
			            <button id="wldwQuery2">查询</button>
			            </div>
			          	<div class="tablebox retailDetailTable" style="width:100%;">
							<div class="grid-wrap" style="width:100%;">
								<table id="jqGrid_wldw2" class="zxsaastable"></table>
							    <div id="jqGridPagerWldw2" ></div>
							</div>
		            	</div>
			          </div>
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn saveWLDW2" data-dismiss="modal">保存</button>
						<button type="button" class="btn btn-default " data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--往来单位莫态框 end-->
			<!--发展人 (往来单位)模态窗-->
		<div class="modal fade" id="wldw" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title " id="deple_wldw">发展人</h4>
				  </div>
			      <div class="modal-body" id="plzk_wldw">
			          <div class="bt-tble hd"  >
			            <div style="margin-bottom:10px"><label>快速检索：</label>
			            <input  type="text" class="search_fzwldw" style="width:200px;height:28px;border:1px solid #cfcfcf;font-size:0.5em" placeholder="请输入编码或名称"/>
			            <button id="wldwQuery">查询</button>
			            </div>
			          	<div class="tablebox retailDetailTable" >
								<div class="grid-wrap" >
									<table id="jqGrid_wldw" class="zxsaastable"></table>
								    <div id="jqGridPagerWldw" ></div>
								</div>
		            	</div>
			          </div>
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn saveWLDW" data-dismiss="modal">保存</button>
						<button type="button" class="btn btn-default " data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--发展人(往来单位)莫态框 end-->
			
				<!--发展人 (员工)模态窗-->
		<div class="modal fade" id="yg" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title " id="deple_yg">发展人</h4>
				  </div>
			      <div class="modal-body" id="plzk_yg">
			          <div class="bt-tble hd"  >
			            <div style="margin-bottom:10px"><label>快速检索：</label><input  type="text" class="search_yg" style="width:200px;height:28px;border:1px solid #cfcfcf;font-size:0.5em" placeholder="请输入编码或名称"/>
			            <button id="ygQuery">查询</button>
			            </div>
			          	<div class="tablebox retailDetailTable" >
								<div class="grid-wrap" >
									<table id="jqGrid_yg" class="zxsaastable"></table>
								    <div id="jqGridPagerYg" ></div>
								</div>
		            	</div>
			          </div>
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn saveYG" data-dismiss="modal">保存</button>
						<button type="button" class="btn btn-default " data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--发展人(员工)莫态框 end-->
			<!--发展人 (会员)模态窗-->
		<div class="modal fade" id="hy" tabindex="-1" role="dialog">	
			<div class="modal-dialog  model-dialog1">
			    <div class="modal-content">
			      <div class="modal-header" >
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title " id="deple_hy">发展人</h4>
				  </div>
			      <div class="modal-body" id="plzk_hy">
			          <div class="bt-tble hd"  >
			            <div style="margin-bottom:10px"><label>快速检索：</label><input  type="text" class="search_hy" style="width:200px;height:28px;border:1px solid #cfcfcf;font-size:0.5em" placeholder="请输入卡号、持卡人或手机号"/>
			            <button id="hyQuery">查询</button>
			            </div>
			          	<div class="tablebox retailDetailTable" >
								<div class="grid-wrap" >
									<table id="jqGrid_hy" class="zxsaastable"></table>
								    <div id="jqGridPagerHy" ></div>
								</div>
		            	</div>
			          </div>
			      </div>
			      <div class="modal-footer">
			      		<button type="button" class="btn saveHY" data-dismiss="modal">保存</button>
						<button type="button" class="btn btn-default " data-dismiss="modal">取消</button>
					
                  </div>
			      
			    </div>
  			</div>
		</div> <!--modify end--><!--发展人(会员)莫态框 end-->
	</body>
    <jsp:include page="import_card.jsp"></jsp:include>
	<script src="${basePath}/js/associator/distributeCard.js?v=${version}" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
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
			//发展日期
			$("#devolopDate").datetimepicker({
			  lang:"ch",           //语言选择中文
		      format:"Y-m-d",      //格式化日期
		      timepicker:false,    //关闭时间选项
		      todayButton:false    //关闭选择今天按钮
			});
	</script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js?v=${version}"></script>
</html>

