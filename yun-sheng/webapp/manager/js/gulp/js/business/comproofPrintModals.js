/*
 组件:凭证打印
*/

!function ($) {
	// 构造函数
	var comProofPrintModal = function (el, option) {
		// 默认参数
		var defaults = {
			type: 1, //1.凭证打印 2.账簿打印
			ids: "",   //凭证单ID
			startDate: "", //打印开始日期
			endDate: "",   //打印结束日期
			disabled: false, //是否禁用区间打印
			url: "/finance/voucher/manager/printgenerateVou" //路由
		};
		this.option = $.extend(true, defaults, option);
		this.element = $(el);
		this.dom = null;
		this._init();
	};

	comProofPrintModal.prototype = {
		_init: function () {
			this.loadDom();
		},
		reLoadDom: function () {
			this.clearDom();
			this._init();
		},
		loadDom: function () {
			var _self = this;
			var $_template = $(_self.getTemplate());
			_self.dom = $_template;
			_self.createEvent();
			$("body").append(_self.dom);
		},
		createEvent: function () {
			var _self = this;
			_self.importEvent();
		},
		importEvent () {
			var _self = this;
			var $_template = _self.dom;
			$_template.find('#cancelBtn').bind("click", function () { _self.hideModal() }); //取消按钮
			$_template.find('#printBtn').bind("click", function () { printProot(_self) }); //打印按钮
		},
		clearDom: function () {
			if (this.dom !== null) {
				this.dom.remove();
				this.dom = null;
			}
		},
		showModal: function () {
			var $_template = this.dom;
			switch (this.option.type){
				case 1:   //凭证打印
					if( this.option.ids == "" && ( this.option.startDate == "" ||  this.option.endDate == "")){
						$.zxsaas_plus.showalert('提示','请先选择要打印的凭证或选择要打印凭证的起止日期');
						return
					}
					//设置默认打印参数
					var printParams = window.localStorage.getItem('printParams');
					if(printParams){ //如果存在打印参数
						$.each(printParams.split("&"),function(index,item){
							var data = item.split("=");
							switch( data[0]){
								case 'printFormat':
									$_template.find("select[name='" + data[0] + "']").val(data[1]);
									$_template.find('input[name=printSep]').prop("disabled",function () {
										return data[1] == '1';
									});
									break;
								case 'pgOrient':
									$_template.find(":radio[name='" + data[0] + "'][value='" + data[1] + "']").prop("checked", "checked");
									break;
								case 'printSep':
									$_template.find("input[name='" + data[0] + "']").prop("checked",function(){
										return data[1] == '1';
									});
									break;
								case 'innoStr':
								case 'innoEnd':
									$_template.find(":radio[name='printVoucher'][value='2']").prop("checked", "checked");
									$_template.find("input[name='" + data[0] + "']").removeAttr("disabled");
									$_template.find("input[name='" + data[0] + "']").val(data[1]);
									break;
								case 'printVoucher':
									break;
								default:
									$_template.find("input[name='" + data[0] + "']").val(data[1]);
									break;
							}

						});
					}

					//禁用凭证区间
					this.option.disabled ? $_template.find('input[name="printVoucher"]').eq(1).attr("disabled","disabled") : '';

					//打印凭证切换
					$_template.find('input[name="printVoucher"]').unbind('click').on('click', function () {
						if ( $(this).val() == "2" ) {
							$(":disabled").removeAttr("disabled")
						} else {
							$_template.find('input[name=innoStr]').val("");
							$_template.find('input[name=innoStr]').attr("disabled", "disabled");
							$_template.find('input[name=innoEnd]').val("");
							$_template.find("input[name=innoEnd]").attr("disabled", "disabled");
						}
					});
					//纸张切换
					$_template.find("select.addStorage").change(function(){
						if ( $(this).val() == "1" ) {  //21*12金额式
							$_template.find('input[name=printSep]').attr("disabled","disabled");
							$_template.find('input[name=printSep]').removeAttr("checked");
						} else {
							$_template.find('input[name=printSep]').removeAttr("disabled");
							$_template.find('input[name=printSep]').attr("checked","checked");
						}
					});
					break;
				case 2:  //账簿打印
					function getNowFormatDate() {
						var date = new Date();
						var seperator1 = "-";
						var year = date.getFullYear();
						var month = date.getMonth() + 1;
						var strDate = date.getDate();
						if (month >= 1 && month <= 9) {
							month = "0" + month;
						}
						var currentdate = year + seperator1 + month;
						return currentdate;
					}


					var startDate = getNowFormatDate(),endDate = getNowFormatDate();
					var lastYear = (new Date($("#startDate").val())).getFullYear() ? (new Date($("#startDate").val())).getFullYear() : new Date().getFullYear();
					$.ajax({
						url:'/manager/finance/common/getCompanyFinanceConfigVo',
						type:'post',
						dataType:'json',
						success:function(data){
							var acount = data.data.configVo;
							if(acount.businessSectionAccounting == "0"){
								$_template.find('#condition').attr("disabled", "disabled");
							}
							var start = acount.systemStartDateStr.substring(0, 7);
							$_template.find("#startDate").comDateAccounting({
								endDateId: "#endDate",
								startDate: start,
								changeDateBack: function () {
									var year = new Date(start).getFullYear();
									if (lastYear != year) {
										lastYear = year;
										loadSubCode(lastYear);
									}
									startDate = $_template.find("#startDate").val();
									endDate = $_template.find("#endDate").val();
								}
							})

						}
					});

					//加载科目编码
					function loadSubCode(lastYear) {
						$_template.find("input[name='subjectStartCode']").comSubjectCode({
							currentAccountingYear: lastYear
						});
						$_template.find("input[name='subjectEndCode']").comSubjectCode({
							currentAccountingYear: lastYear
						});
					}
					loadSubCode(lastYear);

					//部门下拉框初始化
					$_template.find("input[name='deptName']").storePlu({
						isStoreShow: false,
						isLoadDefaultName: 0,
						checkMore: false,
						search: false,
						ifStore: false, //控制部门选项
						changeStore: function() {
							var id=$_template.find("input[name='deptName']").data('sectionId'); //设置编辑器值
							$_template.find("input[name='deptIds']").val(id);
						}
					});

					//业务部门下拉框初始化
					$_template.find("input[name='sectionsName']").storePlu({
						isStoreShow: false,
						isLoadDefaultName: 0,
						checkMore: false,
						search: false,
						ifStore: false, // 控制部门选项
						changeStore: function(){
							var id = $_template.find("input[name='sectionsName']").data('sectionId'); //设置编辑器值
							$_template.find("input[name='sectionIds']").val(id);
						}
					});

					//载入往来单位
					$_template.find("input[name='contactUnitName']").comModalsContactUnit({
						clickback:function () {
							var id = $_template.find("input[name='contactUnitName']").data('id');
							$_template.find("input[name='contactUnitId']").val(id)
						}
					});

					//载入会员
					$_template.find("input[name='employeeInfoName']").funStoreSales({
						checkMore: true,
						clickback: function () {
							var id = $_template.find("input[name='employeeInfoName']").data('employeeId'); //设置编辑器值
							$_template.find("input[name='employeeId']").val(id);
						}
					});

					$_template.find('.tab div:first').addClass('active');

					//按业务部门打印
					$_template.find('#condition').on('click', function (){
						$('input[name="sectionIds"]').val("");
						$('input[name="sectionsName"]').val("");
						$("#sections").toggle();
					});

					//打印范围切换
					$_template.find('input[name="printType"]').not('input[name="printType"]:eq(1)').unbind('click').on('click', function (e) {
						$_template.find('input[name="printNum"]').val("");
						$_template.find('input[name="printNum"]').prop('disabled', true);
					});
					$_template.find('input[name="printType"]').eq(1).unbind('click').on('click', function (e) {
						$_template.find('input[name="printNum"]').prop('disabled', false);
					});

					//打印末级科目
					$_template.find('input[name="ifEndSubject"]').on('click', function () {
						this.value = (this.value == 0) ? 1 : 0;
						$_template.find('select[name="startLevel"], select[name="endLevel"]').prop('disabled', function () {
							return ! $(this).prop('disabled');
						});
					});

					//初始化下拉框的值
					function initForm() {
						$("#printForm")[0].reset();
						$_template.find("#startDate").val(startDate);
						$_template.find("#endDate").val(endDate);
					}

					//切换tab
					$_template.find('.tab div').unbind('click').on('click', function() {
						$(this).addClass('active').siblings().removeClass('active');
						initForm();
						var onlylast = $_template.find('input[name="ifEndSubject"]');
						switch ($(this).index()){
							case 0: //科目总账
								$("input[name='subjectType']").val(1);
								$("#sections").hide();
								$("#dept").hide();
								$("#contactUnit").hide();
								$("#employeeInfo").hide();
								onlylast.removeAttr("checked", "checked");
								onlylast.removeAttr("disabled");
								break;
							case 1: //科目明细
								$("input[name='subjectType']").val(2);
								$("#sections").hide();
								$("#dept").hide();
								$("#contactUnit").hide();
								$("#employeeInfo").hide();
								onlylast.removeAttr("checked", "checked");
								onlylast.removeAttr("disabled");
								break;
							case 2: //往来辅助账
								$("input[name='subjectType']").val(3);
								$("#sections").hide();
								$("#dept").hide();
								$("#contactUnit").show();
								$("#employeeInfo").hide();
								onlylast.attr("checked", "checked");
								onlylast.attr("disabled", "disabled");
								break;
							case 3: //部门辅助账
								$("input[name='subjectType']").val(4);
								$("#sections").hide();
								$("#dept").show();
								$("#contactUnit").hide();
								$("#employeeInfo").hide();
								onlylast.attr("checked", "checked");
								onlylast.attr("disabled", "disabled");
								break;
							case 4: //个人往来明细账
								$("input[name='subjectType']").val(5);
								$("#sections").hide();
								$("#dept").hide();
								$("#contactUnit").hide();
								$("#employeeInfo").show();
								onlylast.attr("checked", "checked");
								onlylast.attr("disabled", "disabled");
								break;
						}
						if( $_template.find('input[name="printType"]').eq(0).is(":checked") ){
							$_template.find('input[name="printNum"]').prop('disabled',true)
						}else{
							$_template.find('input[name="printNum"]').prop('disabled',false);
						}
						onlylast.is(":checked") ? $_template.find('select[name="startLevel"], select[name="endLevel"]').prop('disabled',true) : $_template.find('select[name="startLevel"], select[name="endLevel"]').prop('disabled',false);
					});

					break;
			}

			this.dom.modal('show');
		},
		hideModal: function () {
			this.dom.modal('hide')
		},
		setOption: function (data) {
			this.option = $.extend(false, this.option, data)
		},
		getTemplate: function () {
			var template_head =`
				<div class="modal fade proofPrint" id="printModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content"  style="width: ${this.option.type == '2' ? '800px': 'auto'}">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
									&times;
								</button>
								<h4 class="modal-title">
									${this.option.type == '1' ? '凭证打印' : '账簿打印'}
								</h4>
							</div>`;

			switch (this.option.type) {
				case 1:
					var template_body = `<div class="modal-body">
						<div class="change" style="min-height:200px;height:230px;">
							<form id="printForm">
								<div>
									<label>打印格式:</label>
									<select class="addStorage" name="printFormat">
										<option value="0">A4纸</option>
										<option value="1">21*12金额式</option>
									</select>
									<span class="msg"></span>
								</div>
								<div>
									<label>左边距:</label>
									<input type="number" min="0" max="35" name="marginLeft" value="25" onkeyup="if(!/^([0-9]|[1-2][0-9]{1}|3[0-5]{1})$/.test(this.value)){this.value='';}" />mm
									<span class="msg"></span>
								</div>
								<div>
									<label>上边距:</label>
									<input type="number" min="0" max="10" name="marginRight" value="5" onkeyup="if(!/^([0-9]|10)$/.test(this.value)){this.value='';}" />mm
									<span class="msg"></span>
								</div>
								<div>
									<label>纸张方向:</label>
									<input type="radio" name="pgOrient"  value="0" checked="checked"  class="radioInput" /><span>纵向</span>
									<input type="radio" name="pgOrient"  value="1"  class="radioInput" /><span>横向</span>
									<span class="msg"></span>
								</div>
								<div>
									<label>凭证间隔:</label>
									<input type="number" min="0" name="proofInterval" value="14" readonly="readonly" />mm
									<input type="checkbox" name="printSep" value="1" checked /><span>打印分隔线</span>
									<span class="msg"></span>
								</div>
								<div>
									<div class="btmRadio">
										<input type="radio" name="printVoucher"  value="1"  class="radioInput" checked /><span>打印所选择的凭证</span>
									</div>
									<div class="btmRadio">
										<input type="radio" name="printVoucher"  value="2"  class="radioInput" /><span>按凭证号打印</span>
										<input type="text" name="innoStr" disabled> -- <input type="text" name="innoEnd" disabled>
									</div>
									<span class="msg"></span>
								</div>
							</form>
						</div>
					</div>`;

					break;

				case 2:
					var template_body = `<div class="modal-body">
						<form id="printForm">
							<div class="tab">
								<div onselectstart="return false">科目总账</div>
								<div onselectstart="return false">科目明细账</div>
								<div onselectstart="return false">往来辅助账</div>
								<div onselectstart="return false">部门辅助账</div>
								<div onselectstart="return false">个人往来辅助账</div>
							</div>
							<div class="content form-inline">
								<input type="hidden" name="subjectType" value="1" />
								<div class="form-group col-sm-6">
									<label>会计期间：</label>
									<div class="input-group col-sm-4">
										<input id="startDate" type="text" name="startAccountingPeriod" class="form-control" placeholder="年-月" />
									</div>	-- 
									<div class="input-group col-sm-4">
										<input id="endDate" type="text" name="endAccountingPeriod" class="form-control" placeholder="年-月" />
									</div>
								</div>
								<div class="form-group col-sm-6">
									<label>科目编码：</label>
									<div class="input-group col-sm-4">
										<input type="text" class="form-control" name="subjectStartCode">
									</div> --
									<div class="input-group col-sm-4">
										<input type="text" class="form-control" name="subjectEndCode">
									</div>
								</div>
								<div class="form-group col-sm-6">
									<label>科目级次：</label>
									<div class="input-group col-sm-4">
										<select class="form-control" name="startLevel" >
											<option value='1'> 1 </option>
											<option value='2'> 2 </option>
											<option value='3'> 3 </option>
											<option value='4'> 4 </option>
											<option value='5'> 5 </option>
											<option value='6'> 6 </option>
										</select>
									</div>	-- 
									<div class="input-group col-sm-4">
										<select class="form-control" name="endLevel">
											<option value='1'> 1 </option>
											<option value='2'> 2 </option>
											<option value='3'> 3 </option>
											<option value='4'> 4 </option>
											<option value='5'> 5 </option>
											<option value='6'> 6 </option>
										</select>
									</div>
								</div>
								<div class="form-group col-sm-6" id="contactUnit" style="display:none;">
									<label>往来单位：</label>
									<div class="input-group col-sm-8">
										<input type="hidden" name="contactUnitId" id="contactUnitId" />
										<input type="text" class="form-control" name="contactUnitName" id="contactUnitName" readonly="readonly" disabled />
									</div>
								</div>
								<div class="form-group col-sm-6" id="employeeInfo" style="display:none;">
									<label>职员：</label>
									<div class="input-group col-sm-8">
										<input type="hidden" name="employeeId" id="employeeId" />
										<input type="text" class="form-control" name="employeeInfoName" id="employeeInfoName" readonly="readonly" disabled />
									</div>
								</div>
								<div class="form-group col-sm-6" id="dept" style="display:none;">
									<label>部门：</label>
									<div class="input-group col-sm-8">
										<input type="hidden" name="deptIds" />
										<input type="text" class="form-control" name="deptName" id="deptName" readonly="readonly" disabled />
									</div>
								</div>
								<div class="form-group col-sm-6" id="sections" style="display:none;">
									<label>业务部门：</label>
									<div class="input-group col-sm-8">
										<input type="hidden" name="sectionIds" />
										<input type="text" class="form-control" name="sectionsName" readonly="readonly" disabled />
									</div>
								</div>
								<div class="form-group col-sm-12">
									<label></label>
									<div class="input-group col-sm-3">
										<input type="checkbox" class="input_rt" id="condition"/>按业务部门打印
									</div>
									<div class="input-group col-sm-3">
										<input type="checkbox" class="input_rt" name="ifEndSubject" value="0" />只打印末级科目
									</div>
									<div class="input-group col-sm-4">
										<input type="checkbox" class="input_rt" checked/>科目有年初余额,本期无发生额也打印
									</div>
								</div>
								<div class="form-group col-sm-12">
									<label>打印范围：</label>
									<div class="input-group col-sm-2">
										<input type="radio" class="input_rt" name="printType" value="0" checked/>全部
									</div>
									<div class="input-group col-sm-8">
										<input type="radio" class="input_rt" name="printType" value="3" />页码
										<input type="text" class="form-control" style="width: 22%;float: none;" placeholder="需打印的页码" name="printNum" disabled />
										<span style="font-size: 12px;margin-left: 10px;">(输入页面号码和/或页面范围,以英文逗号分割。如：1,3,5-12)</span>									
									</div>
								</div>
								<div class="form-group col-sm-12">
									<label></label>
									<div class="input-group col-sm-2">
										<input type="radio" class="input_rt" name="printType" value="1" />仅打印封面
									</div>
									<div class="input-group col-sm-2">
										<input type="radio" class="input_rt" name="printType" value="2"/>仅打印账页
									</div>
								</div>
								<div class="form-group col-sm-12">
									<label>页边距：</label>
									<div class="input-group col-sm-3">
										<span class="input-group-addon input_lt">左边距</span>
										<input type="number" name="leftMargin" min="0" max="30" class="form-control" value="25" onkeyup="if(!/^([0-9]|[1-2][0-9]{1}|30)$/.test(this.value)){this.value=''}" />
									</div>
									<div class="input-group col-sm-3">
										<span class="input-group-addon input_lt">上边距</span>
										<input type="number" name="rightMargin" min="0" max="10" class="form-control" value="5" onkeyup="if(!/^([0-9]|10)$/.test(this.value)){this.value=''}" />
									</div>
								</div>
							</div>
						</form>
					</div>`;

					break;
			}

			var template_foot = `<div class="modal-footer">
							<button type="button" class="btn btn-primary" id="printBtn">打印</button>
							<button type="button" class="btn" data-dismiss="modal" id="cancelBtn">取消</button>
						</div>
					</div>
				</div>
			</div>`;

			return template_head + template_body + template_foot;
		}
	};


	function printProot(_self) {
		var $_template = _self.dom, params = {};
		var formData = $_template.find('#printForm').serialize();
		switch ( _self.option.type ) {
			case 1:  //打印凭证
				if ( $_template.find('input[name="printVoucher"]:checked').val() == "2" ) {   //勾选按凭证号打印
					if ( _self.option.startDate == "" || _self.option.endDate == "" ) {
						$.zxsaas_plus.showalert('提示', '当前未设置打印凭证的起止日期');
						return
					}
					params.startVoucherYearMonth = _self.option.startDate;   //凭证日期
					params.endVoucherYearMonth = _self.option.endDate;
				} else {   //勾选打印
					if(_self.option.ids == "") {
						$.zxsaas_plus.showalert('提示','当前未选择要打印的凭证');
						return
					}
					params.billsIds = _self.option.ids;   //凭证单号
				}
				for (var Key in params) {
					formData += "&" + Key + "=" + params[Key];
				}
				if (formData.indexOf('printSep') == -1) {
					formData += "&" + "printSep=0";
				}

				//保存打印参数
				var printParams = window.localStorage.getItem('printParams');
				if(printParams){
					localStorage.removeItem('printParams');
				}
				window.localStorage.setItem('printParams', formData);

				_self.hideModal();

				$.printBills(basePath + _self.option.url, formData, $_template.find(":radio[name='pgOrient']:checked").val() == '1'?'horizontal':'');

				break;
			case 2:
				if($('#startDate').val().length == 0 || $('#endDate').val().length == 0){
					$.zxsaas_plus.showalert('提示','请选择会计期间');
					return
				}

				if( $_template.find('input[name="printType"]').eq(1).is(":checked") &&  $_template.find('input[name="printNum"]').val().length == 0) {
					$.zxsaas_plus.showalert('提示','请填写要打印的页码');
					return
				}

				if (formData.indexOf('ifEndSubject') == -1) {
					if($_template.find('input[name="ifEndSubject"]').is(":checked")){
						formData += "&" + "ifEndSubject=1";
					}else {
						formData += "&" + "ifEndSubject=0";
					}

				}

				$.printBills(basePath + _self.option.url, formData, 'horizontal');
				break;
		}

	}

	window.comProofPrintModal = comProofPrintModal;

	//在插件中使用组件对象
	$.fn.comProofPrintModal = function (options) {
		//创建的实体
		var obj = new comProofPrintModal(this, options);
		//调用其方法
		return obj;
	}
}(jQuery);