<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../Include/Header.jsp"%>
		<script type="text/javascript">
			$(function() {
				var pagemodolue = new curdmodal({

					GetRowInfoUrl: " ../../account/AccountJsonById", //获取数据详细信息接口加载地址
					GetListUrl: "../../account/listAccountJson", //获取列表数据接口
					SaveEditUrl: " ../../account/toAccountUpdate", //新增或修改后保存数据接口地址
					SaveAddUrl: " ../../account/saveAccount", //新增或修改后保存数据接口地址
					SaveEditBtnName: ".savebutton", //保存按钮名称。遵照css选择器书写
					SaveAddBtnName: ".addbutton", //保存按钮名称。遵照css选择器书写
					DelRowUrl: "../../account/deleteAccount", // 删除信息接口地址
					EditModalName: ".editbox", //新增 或者修改时弹窗名称。遵照css选择器书写
					AddModalName: ".addbox", //新增 或者修改时弹窗名称。遵照css选择器书写
					listTempLate: '<li class="hidechild " data-id="{{id}}"><i class="iconfont">&#xe60d</i>{{bankname}}<span class="pull-right eventbox"><a class="button" data-eventname="showAddChildModal">新增资金账户</a><a class="button"  data-eventname="showEditModal">修改资金账户</a><a class="button" data-eventname="delRow">删除资金账户</a></span></li>\n', //显示列表的模板

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

				buttonevent.loadingFunction(0, $(".grp_tree"));

				$("#ModolueEdit").on("show.bs.modal", function(e) {
					$("#iconbox span").each(function(i, item) {
						if($(item).find("i").text() == $("input[name='iconcode'").val()) {
							$(item).addClass("select");
						}
					});
				});
			});
		</script>
	</head>

	<body>

		<div class="searchbox">
			<div class="btnbox clearfix ">
			</div>
		</div>

		<div class="grp_tree">
			<ul>
				<!--<li><a class="button" data-eventname="loadchildnode"><i class="iconfont">&#xe61f </i></a>测试集团<span class="pull-right eventbox"><a class="button" data-eventname="addnewunit">新增公司</a><a class="button"  data-eventname="addnewdept">新增部门</a><a class="button"  data-eventname="editgroup">编辑</a><a class="button" data-eventname="delgroup">删除</a></span>
				<ul>
			<li><a class="button" data-eventname="loadchildnode"><i class="iconfont">&#xe61f </i></a>测试集团<span class="pull-right eventbox"><a class="button" data-eventname="addnewunit">新增公司</a><a class="button"  data-eventname="addnewdept">新增部门</a><a class="button"  data-eventname="editgroup">编辑</a><a class="button" data-eventname="delgroup">删除</a></span></li>-->
			</ul>

			</li>
			</ul>
		</div>
		<div class="grp_info">
			<div id="groupInfo">
				<ul class="list-group">

					<li class="list-group-item">
						<span class="txt">启用标志：</span>
						<font data-col="status"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">集团名称：</span>
						<font data-col="groupName"> </font>
					</li>

					<li class="list-group-item">
						<span class="txt">公司名称：</span>
						<font data-col="companyName"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">账户编码：</span>
						<font data-col="code"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">账户类型：</span>
						<font data-col="accountype"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">银行名称：</span>
						<font data-col="bankname"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">开户名称：</span>
						<font data-col="accountHolder"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">账户名称：</span>
						<font data-col="name"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">银行卡号：</span>
						<font data-col="bankCard"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">刷卡手续费：</span>
						<font data-col="swipeFees"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">刷卡最高额：</span>
						<font data-col="swipeHighLines"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">刷卡最低额：</span>
						<font data-col="swipeLowLines"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">最低手续费：</span>
						<font data-col="swipeFeesLow"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">刷卡手续费顶额：</span>
						<font data-col="swipeFeesHigh"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">新增人ID：</span>
						<font data-col="createUid"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">新增时间：</span>
						<font data-col="createTimeString"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">修改人ID：</span>
						<font data-col="updateUid"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">修改时间：</span>
						<font data-col="updateTimeString"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">备注：</span>
						<font data-col="name"> </font>
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
		<!-- 修改资金账户弹出框 -->
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
								修改资金账户
							</h4>
						</div>
						<div class="modal-body">

							<div class="container-fluid inputbox clearfix">
								<input type="hidden" name="id" value="" />

								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">是否启用：</span><span class="box_input"><input
												class="" name="status" type="checkbox"/>
												</span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">集团名称：</span><span class="box_input"><select
												class="form-control" name="groupId">
												<option value="1">
													启用
												</option>
												<option value="0">
													不启用
												</option>
											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">公司名称：</span><span class="box_input"><select
												class="form-control" name="companyId">
												<option value="1">
													启用
												</option>
												<option value="0">
													不启用
												</option>
											</select> </span>
									</div>

								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">账户编码：</span><span class="box_input"><input
												type="text" name="code" id="" value="" placeholder="系统自动显示"
												class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">账户类型：</span><span class="box_input"><select
												class="form-control" name="accounTypeId">

												<option value="1">
													启用
												</option>
												<option value="0">
													不启用
												</option>
											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">银行名称：</span><span class="box_input"><select
												type="text" name="bankNameIdid" id="" value=""
												placeholder="请输入银行名称" class="form-control">
												<option value="1">
													启用
												</option>
												<option value="0">
													不启用
												</option>
											</select> </span>
									</div>

								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">开户名称：</span><span class="box_input"><input
												type="text" name="accountHolder" id="" value=""
												placeholder="请输入开户名称" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">账户名称：</span><span class="box_input"><select
												type="text" name="name" id="" value="bankname"
												placeholder="请输入账户名称" class="form-control">
												<option value="1">
													账户
												</option>
												<option value="0">
													账户的
												</option>
											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">银行卡号：</span><span class="box_input"><input
												type="text" name="bankCard" id="" value=""
												placeholder="请输入银行卡号" class="form-control" /> </span>
									</div>
								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">刷卡手续费：</span><span class="box_input"><input
												type="text" name="swipeFees" id="" value=""
												placeholder="请输入刷卡手续费" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">刷卡最高额：</span><span class="box_input"><input
												type="text" name="swipeHighLines" id="" value=""
												placeholder="请输入刷卡最高额" class="form-control" /> </span>
									</div>

								</div>
								<div class="row">
									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">刷卡最低额：</span><span class="box_input"><input
												type="text" name="swipeLowLines" id="" value=""
												placeholder="请输入刷卡最低额" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">最低手续费：</span><span class="box_input"><input
												type="text" name="swipeFeesLow" id="" value=""
												placeholder="请输入最低手续费" class="form-control" /> </span>
									</div>

								</div>


								<div class="row">


									<div class="col-xs-4  col-sm-7 col-md-6    col-lg-4">
										<span class="box_text">刷卡手续费顶额：</span><span class="box_input"><input
												type="text" name="swipeFeesHigh" id="" value=""
												placeholder="请输入刷卡手续费顶额" class="form-control" /> </span>
									</div>

									<div class="col-xs-6  col-sm-12 col-md-12    col-lg-6">
										<span class="box_text">备注：</span><span class="box_input"><input
												type="text" name="remark" id="" value=""
												placeholder="请输入资金账户表" class="form-control" /> </span>

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
		</div>
		</div>

		<!-- 新增资金账户弹出框 -->
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
								新增资金账户
							</h4>
						</div>
						<div class="modal-body">

							<div class="container-fluid inputbox clearfix">
								<input type="hidden" name="id" value="" />

								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">是否启用：</span><span class="box_input"><input
												class="" name="status" type="checkbox"/>
											</span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">集团名称：</span><span class="box_input"><select
												class="form-control" name="groupId">
												<option value="1">
													启用
												</option>
												<option value="0">
													不启用
												</option>
											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">公司名称：</span><span class="box_input"><select
												class="form-control" name="companyId">
												<option value="1">
													启用
												</option>
												<option value="0">
													不启用
												</option>
											</select> </span>
									</div>

								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">账户编码：</span><span class="box_input"><input
												type="text" name="code" id="" value="" placeholder="系统自动显示"
												class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">账户类型：</span><span class="box_input"><select
												class="form-control" name="accounTypeId">

												<option value="1">
													启用
												</option>
												<option value="0">
													不启用
												</option>
											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">银行名称：</span><span class="box_input"><select
												type="text" name="bankNameIdid" id="" value=""
												placeholder="请输入银行名称" class="form-control">
												<option value="1">
													启用
												</option>
												<option value="0">
													不启用
												</option>
											</select> </span>
									</div>

								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">开户名称：</span><span class="box_input"><input
												type="text" name="accountHolder" id="" value=""
												placeholder="请输入开户名称" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">账户名称：</span><span class="box_input"><select
												type="text" name="name" id="" value="bankname"
												placeholder="请输入账户名称" class="form-control">
												<option value="1">
													账户
												</option>
												<option value="0">
													账户的
												</option>
											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">银行卡号：</span><span class="box_input"><input
												type="text" name="bankCard" id="" value=""
												placeholder="请输入银行卡号" class="form-control" /> </span>
									</div>
								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">刷卡手续费：</span><span class="box_input"><input
												type="text" name="swipeFees" id="" value=""
												placeholder="请输入刷卡手续费" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">刷卡最高额：</span><span class="box_input"><input
												type="text" name="swipeHighLines" id="" value=""
												placeholder="请输入刷卡最高额" class="form-control" /> </span>
									</div>

								</div>
								<div class="row">
									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">刷卡最低额：</span><span class="box_input"><input
												type="text" name="swipeLowLines" id="" value=""
												placeholder="请输入刷卡最低额" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">最低手续费：</span><span class="box_input"><input
												type="text" name="swipeFeesLow" id="" value=""
												placeholder="请输入最低手续费" class="form-control" /> </span>
									</div>

								</div>


								<div class="row">


									<div class="col-xs-4  col-sm-7 col-md-6    col-lg-4">
										<span class="box_text">刷卡手续费顶额：</span><span class="box_input"><input
												type="text" name="swipeFeesHigh" id="" value=""
												placeholder="请输入刷卡手续费顶额" class="form-control" /> </span>
									</div>

									<div class="col-xs-6  col-sm-12 col-md-12    col-lg-6">
										<span class="box_text">备注：</span><span class="box_input"><input
												type="text" name="remark" id="" value=""
												placeholder="请输入资金账户表" class="form-control" /> </span>

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