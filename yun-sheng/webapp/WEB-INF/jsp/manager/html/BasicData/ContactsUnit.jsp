<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../Include/Header.jsp"%>
		<script type="text/javascript">$(function() {
	var pagemodolue = new curdmodal({
		LoadBtnUrl: "../../json/button.json", //按钮工具栏加载地址
		GetRowInfoUrl: "../../contactsunit/getById", //获取数据详细信息接口加载地址
		GetListUrl:"../../contactsunit /listContactsunitJson",//获取列表数据接口
		SaveEditUrl:"../../contactsunit/updateContactsunit", //新增或修改后保存数据接口地址
		SaveAddUrl:"../../contactsunit/saveContactsunit", //新增或修改后保存数据接口地址
	    DelRowUrl:"../../contactsunit/deleteContactsunit", // 删除信息接口地址
		SaveEditBtnName: ".savebutton", //保存按钮名称。遵照css选择器书写
		SaveAddBtnName: ".addbutton", //保存按钮名称。遵照css选择器书写
		EditModalName: ".editbox", //新增 或者修改时弹窗名称。遵照css选择器书写
		AddModalName: ".addbox", //新增 或者修改时弹窗名称。遵照css选择器书写
		listTempLate:'<li class="hidechild " data-id="{{id}}"><i class="iconfont">&#xe60d</i>{{name}}<span class="pull-right eventbox"><a class="button" data-eventname="showAddChildModal">新增往来单位</a><a class="button"  data-eventname="showEditModal">修改往来单位</a><a class="button" data-eventname="delRow">删除往来单位</a></span></li>\n',//显示列表的模板
		
	});
	pagemodolue.modouleLoad();

$(document).off("mouseout", ".grp_tree");
	$(document).on("mouseout", ".grp_tree", function() {
		$(this).find("li").removeClass("hover");
	});
	$(document).off("mouseover", ".grp_tree ul li");
	$(document).on("mouseover", " .grp_tree ul li", function(event) {
		$(".grp_tree").find("li").removeClass("hover");

		$(this).addClass("hover");
		event.stopPropagation();
	});		
		$(document).off("click", ".grp_tree ul li");
	$(document).on("click", " .grp_tree ul li", function(event) {
		$(".grp_tree").find("li").removeClass("hover");
		$(".grp_tree").find("li").removeClass("select");
		$(this).addClass("select");	
		buttonevent.showFunctioninfo($(this));
				event.stopPropagation();
	});

buttonevent.loadingFunction(0,$(".grp_tree"));
	
$("#ModolueEdit").on("show.bs.modal",function(e){
	$("#iconbox span").each(function(i,item){
		if($(item).find("i").text()==$("input[name='iconcode'").val())
		{
			$(item).addClass("select");
		}
	});
});
});</script>
	</head>
	<body>


		<div class="searchbox">
			<div class="btnbox clearfix ">
			</div>
		</div>

		<div class="grp_tree">
			<ul>

			</ul>

			</li>
			</ul>
		</div>
		<div class="grp_info">
			<div id="groupInfo">
				<ul class="list-group">

					<li class="list-group-item">
						<span class="txt">启用标志：</span><font data-col="status"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">集团：</span><font data-col="groupId"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">公司：</span><font data-col="companyId"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">往来单位编码：</span><font data-col="code"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">助记码：</span><font data-col="mnemonicCode">
						</font>
					</li>
					<li class="list-group-item">
						<span class="txt">往来单位类型：</span><font data-col="name"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">往来单位名称：</span><font data-col="name"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">供货商类别：</span><font data-col="supplierTypeId">
						</font>
					</li>
					<li class="list-group-item">
						<span class="txt">经销商类别：</span><font data-col="dealerTypeId">
						</font>
					</li>
					<li class="list-group-item">
						<span class="txt">所属地区：</span><font data-col="districtId">
						</font>
					</li>
					<li class="list-group-item">
						<span class="txt">发展日期：</span><font data-col="developDay">
						</font>
					</li>
					<li class="list-group-item">
						<span class="txt">联系人：</span><font data-col="linkman"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">联系方式：</span><font data-col="contact"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">公司地址：</span><font data-col="companyAddr">
						</font>
					</li>
					<li class="list-group-item">
						<span class="txt">银行名称：</span><font data-col="brankNameId">
						</font>
					</li>
					<li class="list-group-item">
						<span class="txt">银行户名：</span><font data-col="brankUid"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">银行账号：</span><font data-col="brankAmount">
						</font>
					</li>
					<li class="list-group-item">
						<span class="txt">额度：</span><font data-col="limit"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">账期：</span><font data-col="paymentDays"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">业务员：</span><font data-col="salesmanId"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">新增人：</span><font data-col="createUid"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">新增时间：</span><font data-col="createTimeString">
						</font>
					</li>
					<li class="list-group-item">
						<span class="txt">修改人：</span><font data-col="updateUid"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">修改时间：</span><font data-col="updateTimeString">
						</font>
					</li>
					<li class="list-group-item">
						<span class="txt">备注：</span>
						<font data-col="remark"> </font>
					</li>



				</ul>
			</div>
			<div id="companyInfo">

			</div>
			<div id="deptInfo">

			</div>
			<div id="StorkInfo">

			</div>
		</div>



		<div class="modal fade editbox" id="ModolueEdit">
			<div class="modal-dialog" style="width: 80%;">
				<div class="modal-content">
					<form id="menuAdminForm" class="form">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 class="modal-title">
								修改往来单位
							</h4>
						</div>
						<div class="modal-body">

							<div class="container-fluid inputbox clearfix">
								<input type="hidden" name="id" value="" />

								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">是否启用：</span><span class="box_input"><select
												class="form-control" name="status">
												<option value="1">
													启用
												</option>
												<option value="0">
													不启用
												</option>
											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">集团名称：</span><span class="box_input"><select
												class="form-control" name="groupId">
												<option value="1">
													AB
												</option>
												<option value="0">
													CD
												</option>

											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">公司名称：</span><span class="box_input"><select
												class="form-control" name="companyId">
												<option value="1">
													AB公司
												</option>
												<option value="0">
													CD公司
												</option>

											</select> </span>
									</div>
								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">往来单位编码：</span><span class="box_input"><input
												type="text" name="code" id="" value="" placeholder="往来单位编码"
												class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">助记码：</span><span class="box_input"><input
												type="text" name="mnemonicCode" id="" value=""
												placeholder="请输入助记码" class="form-control" /> </span>
									</div>
									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">往来单位类型：</span><span class="box_input"><select
												class="form-control" name="contactsUnitId">

											</select> </span>
									</div>



								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">往来单位名称：</span><span class="box_input"><input
												type="text" name="name" id="" value=""
												placeholder="请输入往来单位名称" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">供货商类别：</span><span class="box_input"><select
												class="form-control" name="supplierTypeId">
												<option value="1">
													允许
												</option>
												<option value="0">
													不允许
												</option>

											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">经销商类别：</span><span class="box_input"><select
												class="form-control" name="dealerTypeId">

											</select> </span>
									</div>


								</div>
								<div class="row">
									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">所属地区：</span><span class="box_input"><select
												class="form-control" name="districtId">

											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">发展日期：</span><span class="box_input"><input
												type="date" name="developDay" class="timebox"
												value="2016-7-24" placeholder="年/月/日" class="form-control" />
										</span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">联系人：</span><span class="box_input"><input
												type="text" name="linkman" id="" value=""
												placeholder="请输入联系人" class="form-control" /> </span>
									</div>

								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">联系方式：</span><span class="box_input"><input
												type="text" name="contact" id="" value=""
												placeholder="请输入联系方式" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">公司地址：</span><span class="box_input"><input
												type="text" name="companyAddr" id="" value=""
												placeholder="请输入公司地址" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">银行名称：</span><span class="box_input"><select
												type="text" name="brankNameId" id="" value=""
												placeholder="请输入银行名称" class="form-control" ></select> </span>
									</div>
								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">银行户名：</span><span class="box_input"><input
												type="text" name="brankUid" id="" value=""
												placeholder="请输入银行户名" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">银行账号：</span><span class="box_input"><input
												type="text" name="brankAmount" id="" value=""
												placeholder="请输入银行账号" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">额度：</span><span class="box_input"><input
												type="text" name="limit" id="" value="" placeholder="请输入额度"
												class="form-control" /> </span>
									</div>
								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">账期：</span><span class="box_input"><input
												type="text" name="paymentDays" id="" value=""
												placeholder="请输入账期" class="timebox" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">业务员：</span><span class="box_input"><select
												type="text" name="salesmanId" id="" value=""
												placeholder="请输入业务员" class="form-control" ></select> </span>
									</div>

								</div>

								<div class="row">
									<div class="col-xs-5  col-sm-8 col-md-8    col-lg-5">
										<span class="box_text">备注：</span><span class="box_input"><input
												type="text" name="remark" id="" value=""
												placeholder="请输入往来单位备注" class="form-control" /> </span>

									</div>


								</div>

							</div>
							<div class="modal-footer text-center">
								<button type="button" class="btn btn-primary savebutton">
									保存
								</button>
								<button type="button" class="btn btn-default"
									data-dismiss="modal">
									取消
								</button>

							</div>
					</form>
				</div>
			</div>
		</div></div>
		
		
		
		<div class="modal fade addbox" id="ModolueEdit1">
			<div class="modal-dialog" style="width: 80%;">
				<div class="modal-content">
					<form id="menuAdminForm" class="form">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 class="modal-title">
								新增往来单位
							</h4>
						</div>
						<div class="modal-body">

							<div class="container-fluid inputbox clearfix">
								<input type="hidden" name="id" value="" />

								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">是否启用：</span><span class="box_input"><select
												class="form-control" name="status">
												<option value="1">
													启用
												</option>
												<option value="0">
													不启用
												</option>
											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">集团名称：</span><span class="box_input"><select
												class="form-control" name="groupId">
												<option value="1">
													AB
												</option>
												<option value="0">
													CD
												</option>

											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">公司名称：</span><span class="box_input"><select
												class="form-control" name="companyId">
												<option value="1">
													AB公司
												</option>
												<option value="0">
													CD公司
												</option>

											</select> </span>
									</div>
								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">往来单位编码：</span><span class="box_input"><input
												type="text" name="code" id="" value="" placeholder="往来单位编码"
												class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">助记码：</span><span class="box_input"><input
												type="text" name="mnemonicCode" id="" value=""
												placeholder="请输入助记码" class="form-control" /> </span>
									</div>
									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">往来单位类型：</span><span class="box_input"><input
												class="form-control" name="contactsUnitId">

											</input> </span>
									</div>



								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">往来单位名称：</span><span class="box_input"><input
												type="text" name="name" id="" value=""
												placeholder="请输入往来单位名称" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">供货商类别：</span><span class="box_input"><select
												class="form-control" name="supplierTypeId">
												<option value="1">
													允许
												</option>
												<option value="0">
													不允许
												</option>

											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">经销商类别：</span><span class="box_input"><input
												class="form-control" name="dealerTypeId">

											</input> </span>
									</div>


								</div>
								<div class="row">
									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">所属地区：</span><span class="box_input"><input
												class="form-control" name="districtId">

											</input> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">发展日期：</span><span class="box_input"><input
												type="date" name="developDay" class="timebox"
												value="2016-7-24" placeholder="年/月/日" class="form-control" />
										</span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">联系人：</span><span class="box_input"><input
												type="text" name="linkman" id="" value=""
												placeholder="请输入联系人" class="form-control" /> </span>
									</div>

								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">联系方式：</span><span class="box_input"><input
												type="text" name="contact" id="" value=""
												placeholder="请输入联系方式" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">公司地址：</span><span class="box_input"><input
												type="text" name="companyAddr" id="" value=""
												placeholder="请输入公司地址" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">银行名称：</span><span class="box_input"><input
												type="text" name="brankNameId" id="" value=""
												placeholder="请输入银行名称" class="form-control" /> </span>
									</div>
								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">银行户名：</span><span class="box_input"><input
												type="text" name="brankUid" id="" value=""
												placeholder="请输入银行户名" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">银行账号：</span><span class="box_input"><input
												type="text" name="brankAmount" id="" value=""
												placeholder="请输入银行账号" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">额度：</span><span class="box_input"><input
												type="text" name="limit" id="" value="" placeholder="请输入额度"
												class="form-control" /> </span>
									</div>
								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">账期：</span><span class="box_input"><input
												type="text" name="paymentDays" id="" value=""
												placeholder="请输入账期" class="timebox" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">业务员：</span><span class="box_input"><input
												type="text" name="salesmanId" id="" value=""
												placeholder="请输入业务员" class="form-control" /> </span>
									</div>

								</div>

								<div class="row">
									<div class="col-xs-5  col-sm-8 col-md-8    col-lg-5">
										<span class="box_text">备注：</span><span class="box_input"><input
												type="text" name="remark" id="" value=""
												placeholder="请输入往来单位备注" class="form-control" /> </span>

									</div>


								</div>

							</div>
							<div class="modal-footer text-center">
								<button type="button" class="btn btn-primary addbutton">
									保存
								</button>
								<button type="button" class="btn btn-default"
									data-dismiss="modal">
									取消
								</button>

							</div>
					</form>
				</div>
			</div>
		</div>
		



	</body>
</html>
