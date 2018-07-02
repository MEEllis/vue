<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>公司参数设置</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 引入文件 -->
	<jsp:include page="../Include/import.jsp"></jsp:include>
	<link rel="stylesheet" type="text/css" href="${basePath}/css/Tparam/company_param_set.css" />
	<script type="text/javascript">
	
		//**********全局变量
		//基本目录
		var basePath = "${basePath}";
	</script>
  </head>
 
  <body>
	<div class="well">
		<div id="AUTH" data-code="GSCSSZ" class="btn-group btnHundred" role="group" >
			<button type="button" class="btn btn-default" style="margin-right: 15px;" onclick="saveParamForm()">保存</button>
		    <button type="button" class="btn btn-default" onclick="enable(true)">修改</button>	
		</div>
    </div>
	<!-- main -->
    <div class="row mainBody">
        <div class="col-md-12">
			<ul class="nav nav-tabs btn-group" id="kindTab">
			   <li class="active">
			   		<button href="#tab1-1" data-toggle="tab" style="">公共参数</button>
			   </li>
			   <li>
			   		<button href="#tab1-2" data-toggle="tab">财务参数</button>
			   </li>
			   <li>
			   		<button href="#tab1-3" data-toggle="tab">供应链参数</button>
			   </li>
			</ul>
			
			<div id="kindTabContent" class="tab-content" style="padding-left: 15px;">
			   <div class="tab-pane fade in active" id="tab1-1">
			      <!-- 公共参数 -->
				  <div class="form-group">
				      <div class="checkbox">
				        <label for="ifC01001">
				          <input type="checkbox" id="ifC01001">启用单据自动保存 <span>&nbsp;&nbsp;&nbsp;
				        </label>
				                    单据自动保存时间：<input type="text" style="width: 60px;" name="C01001"/>秒</span>
				      </div>
				  </div>
				  <div class="form-group">
				      <div class="checkbox">
				        <label for="ifC01002">
				          <input type="checkbox" id="ifC01002">退货提醒天数 <span>&nbsp;&nbsp;&nbsp;
				        </label>
				        <input type="text" style="width: 60px;" name="C01002"/>天</span>
				      </div>
				  </div>
				  <div class="form-group">
				      <div class="checkbox">
				        <label for="ifC01003">
				          <input type="checkbox" id="ifC01003">单据打印次数限制 <span>&nbsp;&nbsp;&nbsp;
				        </label>
				        <input type="text" style="width: 60px;" name="C01003"/>次</span>
				      </div>
				  </div>
				  <div class="form-group" style="display: none;">
				      <div class="checkbox">
				        <label for="C01004">
				          <input type="checkbox" name="C01004" id="C01004">是否隶属集团 <span>
				        </label>
				      </div>
				  </div>
				  
				  <!-- 公共参数 -->
			   </div>
			   <div class="tab-pane fade form-horizontal" id="tab1-2">
			          <div class="col-sm-5">
						  <div class="form-group" style="width: 450px;margin-top: 10px;">
						    <label style="font-weight: normal;">系统启用日期</label>
						    <input type="text" value="" style="width:120px;" name="C02001"> 
						  </div>
						  <div class="form-group">
						      <div class="checkbox"> <label for="C02002"><input type="checkbox" name="C02002" id="C02002">业务单据过账时自动生成会计凭证 </label></div>
						  </div>

						  <div class="form-group">
						      <div class="checkbox"> <label for="C02003"><input type="checkbox" name="C02003" id="C02003">是否按业务部门核算 </label></div>
						  </div>
						  <div class="form-group">
						      <div class="checkbox"> <label for="C02004"><input type="checkbox" name="C02004" id="C02004">未审核凭证允许记账 <span></label></div>
						  </div>
						  <div class="form-group">
						      <div class="checkbox"> <label for="C02005"><input type="checkbox" name="C02005" id="C02005">制单人与审核人可为同一人 <span></label></div>
						  </div>
						  <div class="form-group">
						      <div class="checkbox"> <label for="C02006"><input type="checkbox" name="C02006" id="C02006">出纳凭证必须由出纳签字 <span></label></div>
						  </div>
						  <div class="form-group">
						      <div class="checkbox"> <label for="C02007"><input type="checkbox" name="C02007" id="C02007">有业务单据未生成凭证时允许总账月结 <span></label></div>
						  </div>
			          </div>
					  <div class="col-sm-5">
					  	  <fieldset style="margin-bottom: 15px;margin-left: 8px;">
							  <legend style="margin-bottom: 2px;">新增凭证日期默认</legend>
							  <label style="font-weight: normal;cursor: pointer;" for="C02008_1"><input type="radio" value="1" name="C02008" checked="checked" id="C02008_1">最后一张凭证日期</label>
						      <label style="font-weight: normal;cursor: pointer;" for="C02008_2"><input type="radio" value="2" name="C02008" id="C02008_2">当前登陆日期</label>
						  </fieldset>
						  <div class="form-group" style="padding-left: 20px;margin-bottom: 2px;">
						      <div class="checkbox"> <label for="C02009"><input type="checkbox" name="C02009" id="C02009">其它系统生成的凭证是否允许修改<span></label></div>
						  </div>
						  <div class="form-group" style="padding-left: 40px;">
						      <div class="checkbox"> <label for="C02010"><input type="checkbox" name="C02010" id="C02010">只允修改凭证摘要<span></label></div>
						  </div>
						  <div class="form-group" style="padding-left: 20px;">
						      <div class="checkbox"> <label for="C02011"><input type="checkbox" name="C02011" id="C02011">凭证允许手工编号<span></label></div>
						  </div>
						  <div class="form-group" style="padding-left: 20px;">
						      <div class="checkbox"> <label for="C02012"><input type="checkbox" name="C02012" id="C02012">是否允许修改他人填制的凭证<span></label></div>
						  </div>
					  </div>
			   </div>
			   <div class="tab-pane fade form-horizontal" id="tab1-3">
				  <!-- 供应链参数 -->
			          <div class="col-sm-5">
						  <div class="form-group" style="width: 450px;margin-top: 10px;">
						    <label style="font-weight: normal;">系统启用日期</label>
						    <input type="text" value="" style="width:120px;" name="C03001"> 
						  </div>
						  <div class="form-group">
							  <div class="checkbox"> <label for="C03010"><input type="checkbox" name="C03010" id="C03010">允许串号入库时可选是否启用辅助串号 </label></div>
						  </div>
						  <div class="form-group" style="width: 450px;margin-top: 10px;">
								  <label for="C03028" style="font-weight: normal;">变价调拨发货单，默认取商品价格管理设置的</label>
								  <select name="C03028" id="C03028" style="height:28px">
									  <option value="部门考核价">部门考核价</option>
									  <option value="调拨价">调拨价</option>
								  </select>
						  </div>
						  <div class="form-group" style="width: 450px;margin-top: 10px; display: none">
						    <label style="font-weight: normal;">增值税默认税率</label>
						    <input type="text" value="" style="width:120px;" name="C03002" >% 
						  </div>
						  <div class="form-group">
						      <div class="checkbox">
						        <label for="ifC03003">
						          <input type="checkbox" id="ifC03003">允许零售整单抹零   <span>&nbsp;&nbsp;&nbsp;
						        </label>
						                    抹零最大金额：<input type="text" style="width: 60px;" name="C03003"/>元</span>
						      </div>
						  </div>
						  <div class="form-group" style="width: 450px;margin-top: 10px;">
						    <label style="font-weight: normal;">默认零售客户</label>
						    <input type="text" value="" style="width:120px;display: none;" name="C03005">
						    <input type="text" value="" style="width:120px;" id="C03005" readonly="readonly" onclick="selectContactUnitReferenceOpen()">
						  </div>

						  <div class="form-group" style="width: 450px;margin-top: 10px;">
							  <label style="font-weight: normal;">收入、费用默认往来单位</label>
							  <input type="hidden" value="" name="C03016">
							  <input type="text" value="" style="width:120px;" id="C03016" readonly="readonly" onclick="selectContactUnitReferenceOpen1()">
						  </div>
						  <div class="form-group">
							  <div class="checkbox">
								  <label for="C03026">
									  <input type="checkbox" name="C03026" id="C03026">启用系统锁屏功能   </br>
								  </label>
								  用户在 <input type="number" style="width: 60px;" name="C03027" value="10" min="1" onkeyup="this.value=this.value.replace(/\D|^0/g,'')"/> 分钟内没做任何操作，系统将锁屏
								  <div style="color: red;font-size: small;padding:4px 20px;">(注：修改后需要重新登录系统才生效)</div>
							  </div>
						  </div>
						  <div class="form-group" style="width: 450px;margin-top: 10px;">
						    <label style="font-weight: normal;">零售单打印自定义说明</label><br>
						    <textarea rows="" cols="" name="C03006" style="width: 400px;height: 100px;"></textarea>
						  </div>  
						  <div class="form-group" style="width: 450px;margin-top: 10px;">
						    <label style="font-weight: normal;">零售退货单打印自定义说明</label><br>
						    <textarea rows="" cols="" name="C03007" style="width: 400px;height: 100px;"></textarea>
						  </div>  
						  <div class="form-group" style="width: 450px;margin-top: 10px;">
						    <label style="font-weight: normal;">零售定金单打印自定义说明</label><br>
						    <textarea rows="" cols="" name="C03008" style="width: 400px;height: 100px;"></textarea>
						  </div>  
						  <div class="form-group" style="width: 450px;margin-top: 10px;">
						    <label style="font-weight: normal;">零售退定单打印自定义说明</label><br>
						    <textarea rows="" cols="" name="C03009" style="width: 400px;height: 100px;"></textarea>
						  </div>  
			          </div>
					  <div class="col-sm-5">
					  	  <fieldset style="margin-bottom: 15px;margin-left: 8px;">
							  <legend style="margin-bottom: 2px;">业务提成计算时间</legend>
							  <label style="font-weight: normal;cursor: pointer;" for="C03004_1"><input type="radio" value="1" name="C03004" checked="checked" id="C03004_1">业务单据过账时</label>
						      <label style="font-weight: normal;cursor: pointer;" for="C03004_2"><input type="radio" value="2" name="C03004" id="C03004_2">日结时计算</label>
						      <label style="font-weight: normal;cursor: pointer;" for="C03004_3"><input type="radio" value="3" name="C03004" id="C03004_3">手动计算</label>
						  </fieldset>

				<%--		  <div class="form-group">
							  <div class="checkbox"> <label for="C03015"><input type="checkbox" name="C03015" id="C03015" >供应商保价更改“个别计价”商品的部门成本 </label></div>
						  </div>--%>

						  <fieldset style="margin-bottom: 15px;margin-left: 8px;">
							  <legend style="margin-bottom: 2px;">滞销库存默认天数设置</legend>
							  <div  class="form-group">
								  <label style="font-weight: normal;">库龄默认天数</label>
								  <input type="text" value="" style="width:120px;"  name="C03017" id="C03017" >
							  </div>

							  <div class="form-group">
							  <label style="font-weight: normal;">店龄默认天数</label>
							  <input type="text" value="" style="width:120px;" name="C03018" id="C03018" >
							  </div>
						  </fieldset>

						  <fieldset style="margin-bottom: 15px;margin-left: 8px;">
							 <legend style="margin-bottom: 2px;"></legend>

							  <div class="form-group">
								  <div class="checkbox">
									  <label for="C03011"><input type="checkbox" name="C03011" id="C03011" >允许零售欠款</label>
								  </div>
							  </div>

							  <div class="form-group">
								  <div class="checkbox">
									  <label for="C03012"><input type="checkbox" name="C03012" id="C03012" >单据必须稽核后才能生成凭证</label>
								  </div>
							  </div>

						  </fieldset>
						  
						  <fieldset style="margin-bottom: 15px;margin-left: 8px;">
							  <legend style="margin-bottom: 2px;">账期及额度限制</legend>
							  <div  class="form-group">
								  <div class="checkbox">
									  <label for="C03013"><input type="checkbox" name="C03013" id="C03013" >
										  往来单位应收合计余额超出预设额度时，批发单、批发换货单不允许过账</label>
								  </div>
								  <div class="checkbox">
									  <label for="C03014"><input type="checkbox" name="C03014" id="C03014" >
										  往来单位存在已超账期的未结清单据时，批发单、批发换货单不允许过账</label>
								  </div>
							  </div>
						  </fieldset>

						  <fieldset style="margin-bottom: 15px;margin-left: 8px;">
							  <legend style="margin-bottom: 2px;">退货类单据往来单位限制</legend>
							  <div  class="form-group">
								  <div class="checkbox">
									  <label for="C03021"><input type="checkbox" name="C03021" id="C03021" >
										  串号商品采购退货单及采购换出单的往来单位限制为此串号最终供货商</label>
								  </div>
							  </div>
							  <div  class="form-group">
								  <div class="checkbox">
									  <label for="C03019"><input type="checkbox" name="C03022" id="C03022" >
										  串号商品批发退货单及批发换入单的往来单位限制为此串号最后一次批发客户</label>
								  </div>
							  </div>

						  </fieldset>

						  <div class="form-group" style="width: 450px;margin-top: 10px;">
							  <label style="font-weight: normal;">批发单打印自定义说明</label><br>
							  <textarea rows="" cols="" name="C03023" style="width: 400px;height: 100px;"></textarea>
						  </div>
						  <div class="form-group" style="width: 450px;margin-top: 10px;">
							  <label style="font-weight: normal;">批发退货单打印自定义说明</label><br>
							  <textarea rows="" cols="" name="C03024" style="width: 400px;height: 100px;"></textarea>
						  </div>
						  <div class="form-group" style="width: 450px;margin-top: 10px;">
							  <label style="font-weight: normal;">批发换货单打印自定义说明</label><br>
							  <textarea rows="" cols="" name="C03025" style="width: 400px;height: 100px;"></textarea>
						  </div>
					  </div>
				
			   </div>
			</div>
			<!-- 标签页结束 -->
        </div>
    </div>

					
	<!-- 引用自定义JS文件 -->
	<script type="text/javascript" src="${basePath}/js/Tparam/company_param_set.js"></script>
	<!-- 菜单权限验证 -->
	<script type="text/javascript" src="${basePath}/js/erp/authority/menuValidation.js"></script>
  </body>
  
</html>

<!-- 往来单位引用 -->
<div class="modal fade" id="contactUnitReferenceModal" tabindex="-1" role="dialog"  aria-hidden="true">
   <div class="modal-dialog" style="width:930px;">
      <div class="modal-content">
	     <div class="modal-header">
            <button type="button" class="close"  data-dismiss="modal" aria-hidden="true"> &times;</button>
            <h4 class="modal-title">
                                  往来单位引用
            </h4>
         </div>
         <div class="modal-body" style="padding: 0px;">
			<iframe name="contactUnitReferenceFrame" class="referenceFrame" frameborder="0" style="width: 100%;" src="${basePath}/TcontactUnit/reference"></iframe>
         </div>
	  </div>
	</div>
</div>