<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../Include/Header.jsp"%>
<script type="text/javascript">
$(function() {
	var pagemodolue = new curdmodal({
		
		GetRowInfoUrl: "/manager/employees/employeesJsonById", //获取数据详细信息接口加载地址
		GetListUrl:"/manager/employees/lisEmployeesJson",//获取列表数据接口
		SaveEditUrl: "/manager/employees/updateEmployees", //新增或修改后保存数据接口地址
		SaveAddUrl: "/manager/employees/saveEmployees", //新增或修改后保存数据接口地址
	    DelRowUrl: "/manager/employees/deleteEmployees", // 删除信息接口地址
		SaveEditBtnName: ".savebutton", //保存按钮名称。遵照css选择器书写
		EditModalName: ".editbox" ,//新增 或者修改时弹窗名称。遵照css选择器书写
		listTempLate:'<li class="hidechild " data-id="{{id}}"><i class="iconfont">&#xe60d</i>{{name}}<span class="pull-right eventbox"><a class="button" data-eventname="showAddChildModal">新增角色</a><a class="button"  data-eventname="showEditModal">修改角色</a><a class="button" data-eventname="delRow">删除角色</a></span></li>\n',//显示列表的模板
		
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
						<span class="txt">角色名称：</span><font data-col="name"> </font>
					</li>
					<li class="list-group-item">
						<span class="txt">启用标志：</span><font data-col="status"> </font>
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
								新增功能
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
										<span class="box_text">入职日期：</span><span class="box_input"><input
												type="date" name="entry_day" class="timebox"
												value="2016-7-24" placeholder="年/月/日" class="form-control" />
										</span>
									</div>
									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">离职日期：</span><span class="box_input"><input
												type="date" name="dimission_day" class="timebox"
												value="2016-7-24" placeholder="年/月/日" class="form-control" />
										</span>
									</div>
									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">可使用地区：</span><span class="box_input"><select
												class="form-control" name="allow_areas_ids">

											</select> </span>
									</div>


								</div>
								<div class="row">

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">可使用商品类型：</span><span class="box_input"><select
												class="form-control" name="allow_goods_type_ids">

											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">可查看报表天数：</span><span class="box_input"><input
												type="text" name="view_report_days" id="" value=""
												placeholder="请输入可查看报表天数" class="form-control" />
										</span>
									</div>

									<div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
										<span class="box_text">可操作系统时间：</span><span class="box_input"><input
												type="text" name="use_operation_time_id" id="" value=""
												placeholder="请输入可操作系统时间" class="form-control" /> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">可查看总部成本价：</span><span class="box_input"><select
												class="form-control" name="view_company_cost">
												<option value="1">
													允许
												</option>
												<option value="0">
													不允许
												</option>

											</select> </span>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">可查看部门成本价：</span><span class="box_input"><select
												class="form-control" name="view_section_cost">
												<option value="1">
													允许
												</option>
												<option value="0">
													不允许
												</option>

											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">允许低于最低零售价权限：</span><span
											class="box_input"><select class="form-control"
												name="allow_low_min_retail_price">
												<option value="1">
													允许
												</option>
												<option value="0">
													不允许
												</option>

											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">允许低于批发价权限：</span><span
											class="box_input"><select class="form-control"
												name="allow_low_wholesale_price">
												<option value="1">
													允许
												</option>
												<option value="0">
													不允许
												</option>

											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">允许低于最低批发价权限：</span><span
											class="box_input"><select class="form-control"
												name="allow_low_min_wholesale_price">
												<option value="1">
													允许
												</option>
												<option value="0">
													不允许
												</option>

											</select> </span>
									</div>

									<div class="col-xs-4  col-sm-6 col-md-6    col-lg-4">
										<span class="box_text">是否限定设备登录：</span><span class="box_input"><select
												class="form-control" name="if_limit_mac_login">
												<option value="1">
													是
												</option>
												<option value="0">
													否
												</option>

											</select> </span>
									</div>



								</div>
								<div class="row">
									<div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
										<span class="box_text">设备地址列表：</span><span class="box_input"><input
												type="text" name="Device_IDS" id="" value=""
												placeholder="请输入设备地址" class="form-control" /> </span>
									</div>

									<div class="row">
										<div class="col-xs-12  col-sm-12 col-md-12    col-lg-12">
											<span class="box_text">备注：</span><span class="box_input"><input
													type="text" name="remark" id="" value=""
													placeholder="请输入流程图页面页面地址" class="form-control" /> </span>

										</div>


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



	</body>
</html>
