var searchParam={};
var $units; //辅助项--往来单位
var $depart;//辅助项--部门
var $clerk;//辅助项-- 职员
$(function () {
    var _thisbdepart; //业务部门

    initTable()
    loadModalLookup() //加载查询的模态框
	var param = location.search.split('=');
    var bId = $.trim(functionObjExtent.getQueryString('bId'))//查询单据id
    var voucherId = $.trim(functionObjExtent.getQueryString('voucherId')) //复制单据id
	var billsCode = $.trim(functionObjExtent.getQueryString('billsCode'))
    //复制一单
    if(voucherId){
		pageAjax(voucherId,function (data) {
			//清空信息
            $('.container-fluid form')[0].reset();
            $('#id').val('');
            if(!billsCode){
				$('#voucherNum').val('');
				//清空 戳
				$("#seal-wrap").html('');
				$('#save').prop('disabled',false);
			}
        });
	}
	//查询某一单
	else if(bId!=''){
        pageAjax(bId,function () {

        });
        $('#first,#prev,#next,#last,#lookup').attr('disabled',true);
	}

	//打印
	$('#print').click(function(){
	    var id = $("#id").val();
	    if (id == "")return;
		var printObj = new comProofPrintModal();
		printObj.setOption({
			ids: id,
			disabled: true
		});
		printObj.reLoadDom();
		printObj.showModal();

	    // var tempKindDIV = $(
	    //     '<fieldset class="fieLeft" id="form3">' +
	    //     '<legend>打印模板类型</legend>' +
	    //     '<div class="">' +
	    //     '<label class="radio-inline"><input type="radio" name="printTempKind" value="A4X2" checked>默认</label>' +
	    //     '</div>' +
	    //     '</fieldset>'
	    // );
	    // BootstrapDialog.show({
	    //     title: '凭证打印',
	    //     message: tempKindDIV,
	    //     buttons: [{
	    //         label: '确定', cssClass: 'btn-primary', action: function (dialogItself) {
	    //             dialogItself.close();
	    //             todo();
	    //         }
	    //     },
	    //         {
	    //             label: '取消', action: function (dialogItself) {
	    //             dialogItself.close();
	    //         }
	    //         }]
	    // });
	    // function todo() {
	    //     $.printBills(basePath + '/cw/voucherManager/print',
	    //         {
	    //     	    vids: id,
	    //             tempKind: tempKindDIV.find("input[name='printTempKind']:checked").val()
	    //         }
	    //     );
	    // }
	})
	
	//首张
	$('#first').click(function(){
		getSearchParams()
		searchParam.queryCodeStr='F';
    	pageAjaxs();
	})
	//上张
	$('#prev').click(function(){
    	getSearchParams()
		searchParam.queryCodeStr='P';
		searchParam.refBillsId=$('#id').val();
    	pageAjaxs();
	})
	//下张
	$('#next').click(function(){
		getSearchParams()
		searchParam.queryCodeStr='N';
		searchParam.refBillsId=$('#id').val();
    	pageAjaxs();
	})
	//末张
	$('#last').click(function(){
		getSearchParams()
		searchParam.queryCodeStr='L';
    	pageAjaxs();
	})
	//查找
	$("#lookup").click(function () {
		$("#myModal_lookup").modal('show')
    });
	//查询某一单的请求
	function pageAjax(voucherId,callback){
		$.ajaxPackage({
			url:'/manager/finance/voucher/manager/getVoucherOrderVoById',
			type:'post',
			dataType:'json',
			data:{
				voucherId:voucherId
			},
			success:function(data){
				dataTran(data);
				if(callback){
                    callback(data);
				}
			}
		})
	}
	//数据转换，最原始的是两个后台
	function dataTran(data){
		//e:由于后台是多人写的，字段名字都不一样 ，但是含义一样，这里需要特殊处理一下
		var reOrderVo=data.data.orderVo;
		var orderVo=$.extend(false,{},data.data.orderVo);
		//还一个空间 存住最原始 的 数据  
		data.data.originalOrderVo=orderVo;
		if(orderVo){
			var reDetailList=[];
			var detailList = orderVo.detailList||[];
			reOrderVo.billsId=orderVo.billsId;
			reOrderVo.docWord='记';
			reOrderVo.year=(new Date(orderVo.voucherDateStr)).getFullYear();
			reOrderVo.month=(new Date(orderVo.voucherDateStr)).getMonth();
			reOrderVo.docNo=orderVo.docNo;
			reOrderVo.docNum=orderVo.docWord.replace("记-",'');
			reOrderVo.voucherDate=orderVo.voucherDateStr;
			reOrderVo.attachNum=orderVo.attachNum;
			reOrderVo.supervisorName=orderVo.supervisorName;
			reOrderVo.auditorName=orderVo.auditorName;
			reOrderVo.bookKeeperName=orderVo.bookkeeperName;
			reOrderVo.cashierName=orderVo.cashierName;
			reOrderVo.createByName=orderVo.createByName;
			reOrderVo.detailList=orderVo.detailList;
			
			if(detailList !== undefined){
				if(detailList.length > 0){
					for(var i=0;i<detailList.length;i++){
						var detaiItem=detailList[i];
						reDetailList[i]={};
						reDetailList[i].summary=detaiItem.summary;
						reDetailList[i].subjectId=detaiItem.subjectId;
						reDetailList[i].subjectCode=detaiItem.subjectCode;
						reDetailList[i].subjectName=detaiItem.subjectName;
						reDetailList[i].partnerId=detaiItem.contactUnitId;
						reDetailList[i].partnerName=detaiItem.contactUnitName;
						reDetailList[i].departmentId=detaiItem.subsidiarySectionId;
						reDetailList[i].departmentName=detaiItem.subsidiarySectionName;
						reDetailList[i].employeeId=detaiItem.employeeId;
						reDetailList[i].employeeName=detaiItem.employeeName;
						reDetailList[i].aidedItemName=detaiItem.subsidiaryItemName;
						reDetailList[i].borrowCurrency=detaiItem.debtorAmount;
						reDetailList[i].loanCurrency=detaiItem.lenderAmount;
						reDetailList[i].depYeId=detaiItem.businessSectionId;
						reDetailList[i].depYeName=detaiItem.businessSectionName;
						
					}
                    $.extend(true,reOrderVo.detailList,reDetailList);

				}
			}
			
			//替换 orderVo
			data.data.orderVo = reOrderVo;
			seeSth(data);
		}
	}


	function seeSth(data){
		//清空 戳
		$("#seal-wrap").html('');
		console.log(data)
		var res=data.data.orderVo;
		$('#id').val(res.billsId);
		$('#proof').val(res.docWord);
		$('#voucherNum').val(res.docNum);
		$('#date').val(res.voucherDate).attr('data-OriginalDate',res.voucherDate);
		$('#elseData').val(res.attachNum);
		var len=res.detailList.length;
		$('.inputboxtable tbody').html('');
		maxnum=0;
		var w1,w2,w3;
		w1=$('.headbox thead tr th:eq(1)').width();
		w2=$('.headbox thead tr th:eq(2)').width();
		w3=$('.headbox thead tr th:eq(3)').width();
		maxnum=creattr(d_tr, maxnum, len);//初始化表格
		$('.inputboxtable tbody tr td:eq(1)').css('width',w1+1);
		$('.inputboxtable tbody tr td:eq(2)').css('width',w2+1);
		$('.inputboxtable tbody tr td:eq(3)').css('width',w3+1);
		var jieTol=0,daiTol=0;
		var isAllocateFlowsStatus=0; //标记是否是 "现金流量科目”的凭证
		$.each(res.detailList,function(i,val){
			$('.inputboxtable tbody tr:eq('+i+')').find('input[name=zy]').val(val.summary);//摘要
			$('.inputboxtable tbody tr:eq('+i+')').find('input[name=hsjr]:eq(0)').val(val.subjectName);//科目名
			$('.inputboxtable tbody tr:eq('+i+')').find('.subjectId').val(val.subjectId);//科目ID
			$('.inputboxtable tbody tr:eq('+i+')').find('.SubCode').val(val.subjectCode);//科目code
			$('.inputboxtable tbody tr:eq('+i+')').find('input[name=hsjr]:eq(1)').val(val.aidedItemName);//辅助项名
			$('.inputboxtable tbody tr:eq('+i+')').find('.auxiliaryId1').val(val.partnerId)//辅助项往来单位
			$('.inputboxtable tbody tr:eq('+i+')').find('.auxiliaryId2').val(val.departmentId)//辅助项部门
			$('.inputboxtable tbody tr:eq('+i+')').find('.auxiliaryId3').val(val.employeeId)//辅助项职员
			$('.inputboxtable tbody tr:eq('+i+')').find('.auxiliaryId1name').val(val.partnerName)//辅助项往来单位名
			$('.inputboxtable tbody tr:eq('+i+')').find('.auxiliaryId2name').val(val.departmentName)//辅助项部门名
			$('.inputboxtable tbody tr:eq('+i+')').find('.auxiliaryId3name').val(val.employeeName)//辅助项职员名
			$('.inputboxtable tbody tr:eq('+i+')').find('.Debit').find('input[name=je]').val(val.borrowCurrency);//借方
			formatints($('.inputboxtable tbody tr:eq('+i+')').find('.Debit').find('input[name=je]'),val.borrowCurrency);
			jieTol+=val.borrowCurrency;
			$('.inputboxtable tbody tr:eq('+i+')').find('.Credit').find('input[name=zkl]').val(val.loanCurrency);//贷方
			formatints($('.inputboxtable tbody tr:eq('+i+')').find('.Credit').find('input[name=zkl]'),val.loanCurrency);
			daiTol+=val.loanCurrency;
			$('.inputboxtable tbody tr:eq('+i+')').find('.BusinessDepart').val(val.depYeName);//业务名
			$('.inputboxtable tbody tr:eq('+i+')').find('.BusinessDepartId').val(val.depYeId);//业务ID
			if(val.cashFlow=='1'){
				isAllocateFlowsStatus=1;
			}
		})
		$('.DebitSum input[name=zkl]').val(jieTol);//借总
		formatints($('.DebitSum input[name=zkl]'),jieTol)
		$('.CreditSum input[name=zkl]').val(daiTol);//贷总
		formatints($('.CreditSum input[name=zkl]'),daiTol)
		$('#bookkeeper').val(res.bookKeeperName);
		$('#reviewer').val(res.auditorName);
		$('#cashier').val(res.cashierName);
		$('#singleMan').val(res.createByName);

        if(res.allocateFlowsStatus=="1"){
            $("#seal-wrap").append("<div class='seal-icon mr15'>已分配</div>");
        }else if(res.allocateFlowsStatus=="0"){
            $("#seal-wrap").append("<div class='seal-icon mr15'>未分配</div>");
    	}
        //现金流量科目”的凭证
        if(isAllocateFlowsStatus==1){
            //1.凭证查询状态时，凭证有现金流量科目时，“流量”应启用；2.凭证新增状态时，“流量”应禁用；3.凭证修改状态时，“流量”应禁用；4.凭证查询状态时，凭证无现金流量科目时，“流量”应禁用
            $('#flow').prop('disabled',false);
        }else{
        	 $('#flow').prop('disabled',true);
        }

		if(res.signWrongStatus=="1"){
			$("#seal-wrap").append("<div class='seal-icon mr15'>标错</div>");
		}
		if(res.cancelStatus=="1"){
			$("#seal-wrap").append("<div class='seal-icon mr15'>作废</div>");
		}
		//有下列状态的凭证不允许修改凭证凭何内容：已作废、已审核、已记账、已出纳签字、已主管签字
		if(res.cancelStatus=="1" || $('#reviewer').val().trim()!='' || res.tallyStatus=='1' ||  $('#cashier').val().trim()!='' || res.supervisorName!=null){
            $('#save').prop('disabled',true);
		}
		else{
            $('#save').prop('disabled',false);
		}


		checkBtnDisabled(res);
	}
	//当前凭证，检查 禁用那些图标  ，
	function checkBtnDisabled(res){
		//现金流量科目”的凭证
		var isAllocateFlowsStatus=0;
		
		//是否禁用 出纳签字 按钮
		var cashierDisable=0;
		var $cashierDom=$('#B_PZGL_0010');
		$cashierDom.attr('disabled','disabled');
		$.each(res.detailList,function(i,val){
			if(/^10/.test(val.subjectCode)  ){
				cashierDisable=1;
			}
			if(val.cashFlow=='1'){
				isAllocateFlowsStatus=1;
			}
		});
		
		//3.操作－出纳签字：当前凭证未记账、未审核、未出纳签字、未作废、未标错、有CODE为“10”开头的会计科目时启用此按钮；点击后对当前凭证执行出纳签字
		if(res.tallyStatus=='0' && $('#reviewer').val().trim()=="" &&
				res.cancelStatus=="0" && res.signWrongStatus=="0" && cashierDisable==1 && $('#cashier').val().trim()==""){
			$cashierDom.removeAttr('disabled');
		}
		
		//4.操作－取消出纳签字：当前凭证未记账、未审核、已出纳签字时启用此按钮；点击后对当前凭证执行出纳签字
		var $B_PZGL_0011=$('#B_PZGL_0011');
		$B_PZGL_0011.attr('disabled','disabled');
		if(res.tallyStatus=='0' && $('#reviewer').val().trim()=="" && $('#cashier').val().trim()!=""){
			$B_PZGL_0011.removeAttr('disabled');
		}
		
		var $examine=$("#examine");
		$examine.attr('disabled','disabled');
		if($('#reviewer').val().trim().length>0){
			$examine.text('弃审')
			// 当前凭证未记账、已审核时启用此功能按钮 且按钮名为“弃审”，点击后执行当前凭证弃审功能；
			if( res.tallyStatus=='0'){
				$examine.removeAttr('disabled');
			}
		}
		else{
			//审核 按钮的展示:当前凭证未记账、未审核、未作废、未标错、（“出纳凭证必须由出纳人员签字”已勾选时）出纳不为空或-1 时启用此功能按钮 且按钮名为“审核”，
			$examine.text('审核');
			$.get('/manager/finance/common/getCompanyFinanceConfigVo',function(data){
				if(res.tallyStatus=='0' && $('#reviewer').val().trim()=="" && res.cancelStatus=="0" && res.signWrongStatus=="0" ){
					 //勾选了：出纳凭证必须由出纳签字，    并且是  可以出纳签字
					if(data.data.configVo.requiredCashierSign=='1' && cashierDisable==1){
						if($('#cashier').val().trim()!=""){
							$examine.removeAttr('disabled');
						}
					}
					 //没有勾选了：出纳凭证必须由出纳签字，
					else{
						$examine.removeAttr('disabled');
					}
				}

            })
		}
		
		//5.操作－主管签字：当前凭证未记账、未审核、未主管签字、未作废、未标错时启用此按钮；点击后对当前凭证执行主管签字
		var $B_PZGL_0012=$('#B_PZGL_0012');
		$B_PZGL_0012.attr('disabled','disabled');
		if(res.tallyStatus=='0' && $('#reviewer').val().trim()=="" && res.supervisorName==null
			&&  res.cancelStatus=="0" && res.signWrongStatus=="0" ){
			$B_PZGL_0012.removeAttr('disabled');
		}
		
		
		//6.操作－取消主管签字：当前凭证未记账、未审核、已主管签字时启用此按钮；点击后对当前凭证执行取消主管签字
		var $B_PZGL_0013=$('#B_PZGL_0013');
		$B_PZGL_0013.attr('disabled','disabled');
		if(res.tallyStatus=='0' && $('#reviewer').val().trim()=="" && res.supervisorName!=null){
			$B_PZGL_0013.removeAttr('disabled');
		}
		
		//7.操作－作废：当前凭证未记账、未审核、未主管签字、未出纳签字、未标错、未作废时启用此按钮；点击后对当前凭证执行作废
		var $B_PZGL_0008=$('#B_PZGL_0008');
		$B_PZGL_0008.attr('disabled','disabled');
		if(res.tallyStatus=='0' && $('#reviewer').val().trim()=="" && res.supervisorName==null 
			&& $('#cashier').val().trim()==""	&&  res.cancelStatus=="0" && res.signWrongStatus=="0" ){
			$B_PZGL_0008.removeAttr('disabled');
		}
		//8.操作－取消作废：当前凭证未记账、已作废时启用此按钮；点击后对当前凭证执行取消作废
		var $B_PZGL_0009=$('#B_PZGL_0009');
		$B_PZGL_0009.attr('disabled','disabled');
		if(res.tallyStatus=='0' && res.cancelStatus=="1" ){
			$B_PZGL_0009.removeAttr('disabled');
		}
		
		//10.操作－标错：当前凭证未记账、未审核、未出纳签字、未主管签字、未作废、未标错时启用此按钮；点击后对当前凭证执行标错
		var $B_PZGL_0014=$('#B_PZGL_0014');
		$B_PZGL_0014.attr('disabled','disabled');
		if(res.tallyStatus=='0' && $('#reviewer').val().trim()=="" && res.supervisorName==null 
			&& $('#cashier').val().trim()==""	&&  res.cancelStatus=="0" && res.signWrongStatus=="0" ){
			$B_PZGL_0014.removeAttr('disabled');
		}
		
		//11.操作－取消标错：当前凭证已标错时启用此按钮；点击后对当前凭证执行取消标错。
		var $B_PZGL_0015=$('#B_PZGL_0015');
		$B_PZGL_0015.attr('disabled','disabled');
		if( res.signWrongStatus=="1" ){
			$B_PZGL_0015.removeAttr('disabled');
		}
	}
	//审核 按钮
	$("#examine").click(function(){
		var $this=$(this);
		var examineObj=$this.text();
		var url="";
		
		if(examineObj=='审核'){
			url='/manager/finance/voucher/manager/auditBatch';
		}else if(examineObj=='弃审'){
			url='/manager/finance/voucher/manager/cancelAuditBatch'
		}
		caozuo(url);
	})
	
	//批量作废
	$('#B_PZGL_0008').click(function(){
		caozuo('/manager/finance/voucher/manager/cancelBatch','作废')
	})

	//批量取消作废
	$('#B_PZGL_0009').click(function(){
		caozuo('/manager/finance/voucher/manager/cancelCancelBatch','取消作废')
	})

	//出纳签字
	$('#B_PZGL_0010').click(function(){
		caozuo('/manager/finance/voucher/manager/cashierSignBatch','出纳签字')
	})

	//取消出纳签字
	$('#B_PZGL_0011').click(function(){
		caozuo('/manager/finance/voucher/manager/cancelCashierSignBatch','取消出纳签字')
	})
	//主管签字
	$('#B_PZGL_0012').click(function(){
		caozuo('/manager/finance/voucher/manager/supervisorSignBatch','主管签字')
	})
	//取消主管签字
	$('#B_PZGL_0013').click(function(){
		caozuo('/manager/finance/voucher/manager/cancelSupervisorSignBatch','取消主管签字')
	})
	//标错
	$('#B_PZGL_0014').click(function(){
		caozuo('/manager/finance/voucher/manager/signWrongBatch','标错')
	})

	//取消标错
	$('#B_PZGL_0015').click(function(){
		caozuo('/manager/finance/voucher/manager/cancelSignWrongBatch','取消标错')
	})
	//统一操作
	function caozuo(url){
		var voucherIds=$('#id').val();
		if(!url || !voucherIds){
			return;
		}
		var data={
				voucherIds:voucherIds	
		};
		$.request({
    		type:'post',
        	url:url,
        	data:data,
        	dataType:'json',
        	success:function(data){
				if(data.result==1){
					if(data.data.failedList.length>0){
                        $.zxsaas_plus.showalert('提示',data.data.failedList[0].reason||"失败")
					}else{
                        $.zxsaas_plus.showalert('提示','操作成功！')
					}
                    pageAjax(voucherIds);
				}else{
					$.zxsaas_plus.showalert('warning',data.desc)
				}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
	}
	//初始化表格中的事件
	function initTable() {
        //业务部门
		$("#BusinessDepartModal").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: false,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var id=$('#BusinessDepartModal').data('sectionId');
                _thisbdepart.val($('#BusinessDepartModal').val())
                _thisbdepart.next('.BusinessDepartId').val(id)
            }
        });
		//辅助项--往来单位
        $('#contactsUnitModal').comModalsContactUnit({
            clickback:function(){
                var SELID=$('#AssTable').jqGrid('getGridParam','selrow');//
                var cellname=$('#contactsUnitModal').val();//
                var cellid=$('#contactsUnitModal').data("id");//
                $units.closest('td').find('.unitsInput').val(cellname);
                $("#AssTable").jqGrid("setCell",SELID,"uid",cellid);
                $("#AssTable").jqGrid("setCell",SELID,"unitsname",cellname);
			}
        });

        //辅助项--部门
        $("#fuzhuDepartModal").storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: false,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var SELID=$('#AssTable').jqGrid('getGridParam','selrow');
                var cellid=$('#fuzhuDepartModal').data('sectionId');
                var cellname=$('#fuzhuDepartModal').val();//
                $depart.closest('td').find('.departInput').val(cellname);
                $("#AssTable").jqGrid("setCell",SELID,"did",cellid);
                $("#AssTable").jqGrid("setCell",SELID,"departname",cellname);
            }
        });
        //辅助项-- 职员
        $("#employeeModal").funStoreSales({
            clickback:function(){
                var SELID=$('#AssTable').jqGrid('getGridParam','selrow');
                var cellid=$('#employeeModal').data('employeeId');
                var cellname=$('#employeeModal').val();//
                $clerk.closest('td').find('.clerkInput').val(cellname);
                $("#AssTable").jqGrid("setCell",SELID,"cid",cellid);//改变单元格的值
                $("#AssTable").jqGrid("setCell",SELID,"clerkname",cellname);//改变单元格的值
            }
        });

    }
	//加载查找模态框
	function loadModalLookup() {
		//移除样式
	    $('#myModal_lookup input:radio').iCheck('destroy')
        //凭证日期
        var news = new Date();
        var oneday = new Date()
		var lastYear=oneday.getFullYear();
        oneday.setDate(1);
        var ones = oneday.getFullYear()+"-"+("00"+(oneday.getMonth()+1)).substr(-2)+"-"+("00"+oneday.getDate()).substr(-2);
        var today = news.getFullYear()+"-"+("00"+(news.getMonth()+1)).substr(-2)+"-"+("00"+news.getDate()).substr(-2);
	    //凭证日期
	    $('#startDate').datetimepicker({
	        lang: "ch",
	        format: "Y-m-d",
	        timepicker: false,
	        todayButton: false,
	    });
	    $('#endDate').datetimepicker({
	        lang: "ch",
	        format: "Y-m-d",
	        timepicker: false,
	        todayButton: false,
	    });
        $('#startDate,#endDate').on('blur',function () {
            var startDate =	$('#startDate').val();
            var endDate =	$('#endDate').val();
            var $this =$(this);
            //两个日期都不为""
            if(startDate!="" && endDate!=""){
                var startTime = new Date(startDate.replace(/\-/g, '/'));
                var endTime = new Date(endDate.replace(/\-/g, '/'));
                var flag = (endTime < startTime) ? false : true;
                var flag1 = (endTime.getFullYear() == startTime.getFullYear()) ? true : false;
                if (!flag) {
                    $.zxsaas_plus.showalert("提示", "前后日期不合法!");
                    $this.val('');
                }else{
                	if(!flag1){
                        $.zxsaas_plus.showalert("提示", "前后日期必须在同一个年份中!");
                        $this.val('');
					}
                }
			}

            var year = (new Date($("#startDate").val()||$("#endDate").val())).getFullYear();
            subjectCode(year);


        })
	    //会计期间
	    $("#startPeriod").comDateAccounting({
	        endDateId:"#endPeriod",
            changeDateBack: function () {
                var year = (new Date($("#startPeriod").val()||$("#endPeriod").val())).getFullYear();
                subjectCode(year);
			}
	    })
		$('#startPeriod,#endPeriod').val('')
	    //凭证日期和会计期间切换
	    $("input[name='timeSection']").on('click',function () {
            if($(this).attr('id') == 'creatDate'){
                $('#startPeriod,#endPeriod').val('').prop('disabled',true)
                $('#startDate,#endDate').prop('disabled',false)
            }else{
                $('#startDate,#endDate').val('').prop('disabled',true)
                $('#startPeriod,#endPeriod').prop('disabled',false)
            }
        })
	    //凭证来源
	    $('#voucherFrom').combobox({
	        id: 'voucherFromTree',
	        url: basePath + '/finance/common/getVoucherSourceList',
	        param: {

	        },
	        placeholder: '请选择凭证来源',
	        checkType:'radio'
	    })
	    //业务部门
		$('#operatingDepartment').storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: true,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var id=$('#operatingDepartment').data('sectionId');
                //设置编辑器值
                $("input[name='sectionId']").val(id);
            }
        });
	    //辅助部门
	    $('#auxiliaryDepartment').storePlu({
            isStoreShow:false,
            isLoadDefaultName:0,
            checkMore: true,
            search: false,
            ifStore: false, // 控制部门选项
            changeStore:function(){
                var id=$('#auxiliaryDepartment').data('sectionId');
                //设置编辑器值
                $("input[name='sectionId']").val(id);
            }
        });

	    //载入 职员
	    $("#employee").funStoreSales({
	        checkMore: true
	    });
		//往来单位
	    $('#contactsUnitName').comModalsContactUnit({
            multiselect:true
	    });
		//会计科目
        $("#OperatorBusinessInput").comSubjectCode({
          /*  ifEndSubject:1,*/
            currentAccountingYear:lastYear
        });
        function subjectCode(year) {
            //会计科目
            if(lastYear!=year){
                lastYear=year;
                $("#OperatorBusinessInput").comSubjectCode({
                    /*ifEndSubject:1,*/
                    currentAccountingYear:lastYear
                });
            }
        }

        $.get('/manager/finance/common/getCompanyFinanceConfigVo',function(data){
			if(data.data.configVo.businessSectionAccounting == '0'){
				$('#operatingDepartment').siblings('span').hide()
			}else{
				$('#operatingDepartment').siblings('span').show()
			}
        })

	    // 查询
	    $('#lookup_sure').click(function () {
	    	getSearchParams()
	    	pageAjaxs();
	    })

		//重置
	    $('#lookup_reset').click(function () {
	        $('#searchQuery')[0].reset()
	        $('#OperatorBusinessInput,#voucherFrom,#operatingDepartment,#contactsUnitName,#auxiliaryDepartment,#employee').removeData()
	        $('#startPeriod,#endPeriod').val('').prop('disabled',true)
	        $('#startDate,#endDate').val('').prop('disabled',false)
	    })

	    $('#startMoney').blur(function () {
	        if ($('#endMoney').val().trim() !== '' && $('#startMoney').val().trim() !== '') {
	            testAmount()
	        }
	    })

	    $('#endMoney').blur(function () {
	        if ($('#startMoney').val().trim() !== '' && $('#endMoney').val().trim() !== '') {
	            testAmount()
	        }
	    })
	    function testAmount() {
	        if (accSubtr($('#endMoney').val().trim(), $('#startMoney').val().trim()) * 1 >= 0) {
	            return true;
	        } else {
	            $.zxsaas_plus.showalert("提示", "结束金额小于开始金额，请重新输入!");
	            $('#endMoney').val('');
	            return false
	        }
	    }
	}

	function getSearchParams(){
		searchParam={};
		searchParam.startVoucherDate=$('#creatDate').is(':checked') ? $('#startDate').val() : '';
	    searchParam.endVoucherDate=$('#creatDate').is(':checked') ?  $('#endDate').val() : '';
	    searchParam.startAccountingPeriod=$('#accountingPeriod').is(':checked') ?  $('#startPeriod').val() : '';
	    searchParam.endAccountingPeriod=$('#accountingPeriod').is(':checked') ?  $('#endPeriod').val() : '';
	    searchParam.startVoucherNumber=$('#startNum').val();
	    searchParam.endVoucherNumber=$('#endNum').val();
	    searchParam.voucherSource=$('#voucherFrom').data('id');
	    searchParam.allocateFlowsStatus= $("input[name='flowAllocating']:checked").val();
	    searchParam.tallyStatus=$("input[name='chargeState']:checked").val();
	    searchParam.auditStatus=$("input[name='auditState']:checked").val();
	    searchParam.cancelStatus=$("input[name='cancellationState']:checked").val();
	    searchParam.signWrongStatus=$("input[name='wrongState']:checked").val();
	    searchParam.direction=$("input[name='directionState']:checked").val();
	    searchParam.startAmount=$('#startMoney').val().trim();
	    searchParam.endAmount=$('#endMoney').val().trim();
	    searchParam.businessSectionId=$('#operatingDepartment').data('id');
	    searchParam.contactUnitId=$('#contactsUnitName').data('id');
	    searchParam.subsidiarySectionId=$("#auxiliaryDepartment").data('id');
	    searchParam.employeeId=$('#employee').data('employeeId');
	    searchParam.subjectCode=$('#OperatorBusinessInput').val();
	    searchParam.createById='';
	    searchParam.queryCodeStr='';
	    searchParam.refBillsId='';

	}

	function pageAjaxs(){
		$.ajax({
			url:'/manager/finance/voucher/searchVoucherOrder',
			type:'get',
			dataType:'json',
			data:searchParam,
			success:function(data){
				if(data.result==1){
					if(data.data.orderVo==null){
						$.zxsaas_plus.showalert('提示','没有数据了！')
					}else{
						dataTran(data);
					}
					
				}else{
					$.zxsaas_plus.showalert('warning',data.desc)
				}
			}
		})
	}
	
	//新增(先check明细表有没有数据，有的话先执行保存再新增)
	$('#newbill').click(function(){
		var j=0;
		$('.inputboxtable tbody tr').each(function(i,val){
    		if($(this).find('.subjectId').val()!=''){
    			j++;
    			return false;
    		}
		});
		if(j>0){
			doSave(1);
		}else{
			window.location.href=basePath+'/cw/test/voucher';
		}
	})
	//凭证编号输入限制
	$('#voucherNum').keyup(function(){
		$(this).val(($(this).val().replace(/[^0-9]/g,'')));//只允许数字输入
	})
    var drag1=false;
    var boxWidth1=$('.headbox thead tr th:eq(1)').width();
    $('.lab1').mousedown(function (){
    	drag1=true;
    	var boxLeft=$('.headbox thead tr th:eq(1)').offset().left;
        var l=event.clientX-parseInt($(this).css('left'));
        $(document).mousemove(function (event){
        	if(drag1){
                var ox=event.clientX-l;
                $('.lab1').css({left:ox});
        	}
        }).mouseup(function (e){
        	var _x=e.clientX;
        	var realx=_x-boxLeft
        	if(realx<boxWidth1){
        		realx=boxWidth1+1
        	}
        	$('.headbox thead tr th:eq(1)').css('width',realx);
        	$('.inputboxtable tbody tr td:eq(1)').css('width',realx);
        	var footerWidth=$('.headbox thead tr th:eq(1)').width()+$('.headbox thead tr th:eq(2)').width()+$('.headbox thead tr th:eq(3)').width();
        	$('.Capital').css('width',footerWidth+3)
        	$('.lab1').css({
        		'left':3,
        		'border-right':0
        	})
        	drag1=false;
        	$(this).unbind('mouseup')
        });
    });
    var drag2=false;
    var boxWidth2=$('.headbox thead tr th:eq(2)').width();
    $('.lab2').mousedown(function (){
    	drag2=true;
    	var boxLeft=$('.headbox thead tr th:eq(2)').offset().left;
        var l=event.clientX-parseInt($(this).css('left'));
        $(document).mousemove(function (event){
        	if(drag2){
                var ox=event.clientX-l;
                $('.lab2').css({left:ox});
        	}
        }).mouseup(function (e){
        	var _x=e.clientX;
        	var realx=_x-boxLeft
        	if(realx<boxWidth2){
        		realx=boxWidth2+1
        	}
        	$('.headbox thead tr th:eq(2)').css('width',realx);
        	$('.inputboxtable tbody tr td:eq(2)').css('width',realx);
        	var footerWidth=$('.headbox thead tr th:eq(1)').width()+$('.headbox thead tr th:eq(2)').width()+$('.headbox thead tr th:eq(3)').width();
        	$('.Capital').css('width',footerWidth+3)
        	$('.lab2').css({
        		'left':3,
        		'border-right':0
        	})
        	drag2=false;
        	$(this).unbind('mouseup')
        });
    });
    var drag3=false;
    var boxWidth3=$('.headbox thead tr th:eq(3)').width();
    $('.lab3').mousedown(function (){
    	drag3=true;
    	var boxLeft=$('.headbox thead tr th:eq(3)').offset().left;
        var l=event.clientX-parseInt($(this).css('left'));
        $(document).mousemove(function (event){
        	if(drag3){
                var ox=event.clientX-l;
                $('.lab3').css({left:ox});
        	}
        }).mouseup(function (e){
        	var _x=e.clientX;
        	var realx=_x-boxLeft
        	if(realx<boxWidth3){
        		realx=boxWidth3+1
        	}
        	$('.headbox thead tr th:eq(3)').css('width',realx);
        	$('.inputboxtable tbody tr td:eq(3)').css('width',realx);
        	var footerWidth=$('.headbox thead tr th:eq(1)').width()+$('.headbox thead tr th:eq(2)').width()+$('.headbox thead tr th:eq(3)').width();
        	$('.Capital').css('width',footerWidth+3)
        	$('.lab3').css({
        		'left':3,
        		'border-right':0
        	})
        	drag3=false;
        	$(this).unbind('mouseup')
        });
    });
    
    
    var maxnum = 0;//默认表格计数器
    var d_tr = $(".inputboxtable tbody tr:last-child");//获取表格默认模板
    $(".inputboxtable tbody tr").remove();//删除当前table中的内容
    maxnum = creattr(d_tr, maxnum, 10);//初始化表格
    $(document).on("click", ".inputboxtable tbody tr:last-child ", function (event) {//点击表格最后一行的，在一次增加10行表格
        maxnum = creattr(d_tr, maxnum, 10);//根据计数器创建表格
    });
    $(document).on("click", ".btnbox .pull-right", function () {//隐藏页面搜索条件
        $(this).toggleClass("hideinputbox");//切换隐藏按钮的状态
        $(this).parents(".searchbox").find(".inputbox").toggle();////切换搜索条件框的隐藏和显示
    });
    $(document).on("click", ".inputboxtable .Amountbox", function (event) {// 当鼠标移动到主表中的需要输入的表格，显示input窗口
        if ($(this).closest('tr').children('td').eq(1).find('input').val() != ''&&$(this).closest('tr').children('td').eq(2).find('input').val()!='') {//摘要不为空时允许输入
            $(this).find("div").hide();
            $(this).find("input").show();
            $(this).find("input").focus();
            event.stopPropagation();
        }else{
            $.zxsaas_plus.showalert('warning','摘要或科目为空')
        }
    });
    $(".inputboxtable").on("click", "tr>td:first-child", function (event) {
        $(this).parents("tbody").find("tr").removeClass("clicktr");
        $(this).parents("tr").addClass("clicktr");
        var l = $(".clicktr").offset().left + 40;
        var t = $(".clicktr").offset().top + 20;
        $(".rowsclick").css({"left": l + "px", "top": t + "px"});
        $(".rowsclick").show();
        if ($(".clicktr").index() == $(this).parents("tbody").find("tr").size()) {
            maxnum = creattr(d_tr, maxnum, 10);//根据计数器创建表格
        }
        event.stopPropagation();
        return false;
    });
    $(".rowsclick").on("click", "a.add", function () {
    	clicktr_a.addtr($(".clicktr"), d_tr);//增行
    	maxnum++;
    });
    $(".rowsclick").on("click", "a.copy", function () {
        clicktr_a.copytr($(".clicktr"));//复制
        maxnum++
    });
    $(".rowsclick").on("click", "a.delVoc", function () {
        clicktr_a.deltr($(".clicktr"));//删除
        maxnum--
    });
    $(".rowsclick").on("click", "a.inster", function () {
        clicktr_a.instertr($(".clicktr"), d_tr);//插入
        maxnum++;
    });
    $(document).on('click','.zxsaastable tbody tr td', function () {
        if ($(this).closest('tr').find('input[name=zy]').val()== ''){//tr摘要为空时复制此前最近行摘要值
            var arr = $(this).closest('tr').prevAll('tr');
            for (var i = 0; i <= arr.length; i++) {//逆向遍历此前所有行
                if (arr.eq(i).find('input[name=zy]').val() != '') {//当遇到存在值的行时break
                    var newVal = arr.eq(i).find('input[name=zy]').val();//取值当前行
                    for (var j = 0; j <= i; j++) {
                        arr.eq(j).find('input[name=zy]').val(newVal);//当前行至上一个存在值的摘要之间的摘要格赋值
                        $(this).closest('tr').find('input[name=zy]').val(newVal);//当前行摘要赋值
                    }
                    break;
                }
            }
        }
        if ($(this).closest('tr').find('.BusinessDepart').val()== ''){//tr摘要为空时复制此前最近行摘要值
            var arr = $(this).closest('tr').prevAll('tr');
            for (var i = 0; i <= arr.length; i++) {//逆向遍历此前所有行
                if (arr.eq(i).find('.BusinessDepart').val() != '') {//当遇到存在值的行时break
                    var newVal = arr.eq(i).find('.BusinessDepart').val();//取值当前行
                    var newValId = arr.eq(i).find('.BusinessDepartId').val();//取值当前行
                    for (var j = 0; j <= i; j++) {
                        arr.eq(j).find('.BusinessDepart').val(newVal);//当前行至上一个存在值的摘要之间的摘要格赋值
                        arr.eq(j).find('.BusinessDepartId').val(newValId);//当前行至上一个存在值的摘要之间的摘要格赋值
                        $(this).closest('tr').find('.BusinessDepart').val(newVal);//当前行摘要赋值
                        $(this).closest('tr').find('.BusinessDepartId').val(newValId);//当前行摘要赋值
                    }
                    break;
                }
            }
        }
    });
    //表格输入框回车切换方法
    $(document).on('keyup','.inputboxtable input:text', function (e) {
        var key = e.which;
        if (key == 13) {
            var nxtIdx = $('input:text').index(this) + 1;
            $(":input:text:eq(" + nxtIdx + ")").focus();
        }
    });
    //附单
    $('#elseData').keyup(function (event) {
    	$(this).val(($(this).val().replace(/[^0-9]/g,'')));//只允许数字小数点输入
    });
    $(document).click(function (e) {
        var _con = $('.SubAssbox');   // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('.SubAssbox').remove()
        }
    });
//  摘要
    var _this_zhaiyao;
    $(document).on("click", ".input2table .icon-search", function () {//弹出全部选择窗口
        _this_zhaiyao = $(this);
        $("#maxselect").modal("show");
        loadAccountTable()
        $('.details div').css('width','auto');
    });
    $('#searchType').keyup(function(e){
    	if(e.keyCode==13)$('.filNav').click();
    })
    //摘要录入
    $('.filNav').click(function(){
    	var _val=$('#searchType').val();
    	if(_val!=''){
    		$.request({
        		type:'post',
            	url:basePath+'/cw/pz/saveSummary',
            	data:{
        			summaryContent:_val
        		},
            	dataType:'json',
            	success:function(data){
    				if(data.result==1){
    					$('#accountTable').trigger("reloadGrid");
    					$('#searchType').val('');
    				}else{
    					$.zxsaas_plus.showalert('warning',data.desc)
    				}
        		},
        		error:function(){
        			alert('请求失败！')
        		}
        	})
    	}
    })
    
    //摘要模糊查询
    $(document).on('keyup','.input2table', function (event) {
        if($(this).find('input').val()==''&&event.keyCode!=13){
            $('.SubAssbox').remove();
        }else if($(this).find('input').val()!=''&&event.keyCode!=13){
            $(".SubAssbox").remove();
            var _this=$(this).find('input');
            $('body').append("<div class=\"SubAssbox\"><table id=\"subTab\" class=\"SubAssboxtable zxsaastable\"><thead><tr><td>常用摘要</td></tr></thead><tbody></tbody>\n</table></div>");
            $.ajax({
        		type:'post',
            	url:'/manager/cw/pz/getSummary',
            	data:{
            		keyword:_this.val()
            	},
            	dataType:'json',
            	success:function(data){
    				if(data.result==1){
    					var res=data.data.rows;
    					var html;
    					if(res.length!=0){
    						$.each(res,function(i,val){
    							html+='<tr><td>'+val.summaryContent+'</td></tr>'
    						})
    					}else{
    						html=''
    					}
    					$('.SubAssbox tbody').html(html);
    					$('.SubAssbox tbody tr').click(function(){
    						_this.val($(this).find('td:eq(0)').text());
    						$(".SubAssbox").remove();
    					})
    				}else{
    					$.zxsaas_plus.showalert('error',data.desc)
    				}
        		},
        		error:function(){
        			alert('请求失败！')
        		}
        	})
            var _this_t=$(this).find('input').offset().top;
            var _this_l=$(this).find('input').offset().left;
            var _this_h=$(this).find('input').height();
            $('.SubAssbox').css({
                'top':_this_t+_this_h,
                'left':_this_l,
                'position':'absolute',
                'zIndex':2,
                'maxHeight':'313px',
                'overflow-x':'hidden',
                'overflow-y':'auto'
            });
            $('.zxsaastable').css('background','#fff');
        }else if(event.keyCode==13){
            //保存录入信息并关闭	弹出框
            $(this).blur();
            $('.SubAssbox').remove();
        }
    });
	//科目框焦点
    $(document).on('focusin','.input2selectbox:even input[name=hsjr]', function () {
    	if($(this).closest('td').find('.subjectId').val()!=''){
    		var val=$(this).val();
    		var id=$(this).closest('td').find('.subjectId').val();
    	}
    	$(this).val('');
    	$(this).focusout(function(){
    		if($(this).closest('td').find('.subjectId').val()==''){
    			$(this).val('')
    		}else if($(this).closest('td').find('.subjectId').val()==id){
    			$(this).val(val)
    		}
    		$(this).off('focusout')
    	})
    })
    //科目模糊查询
    $(document).on('keyup','.input2selectbox:even', function (event) {
        if($(this).find('input').val()==''&&event.keyCode!=13){
            $('.SubAssbox').remove();
        }
        else if($(this).find('input').val()!=''&&event.keyCode!=13){
            $(".SubAssbox").remove();
            var _this=$(this).find('input');
            $('body').append("<div class=\"SubAssbox\"><table style=' background-color: #ffffff;  ' id=\"subTab\" class=\"SubAssboxtable \">"
				+"<thead style='background-color:#E9F2FE;font-size: 14px;line-height: 30px;border: 1px solid #e2e6ea; '><tr>"+
				"<td style='text-align: center;width: 106px;border: 1px solid #e2e6ea;'>科目编号</td>"+
				"<td style='text-align: center;width: 212px;border: 1px solid #e2e6ea;'>科目名称</td>"+
				"<td style='text-align: center;width: 106px;border: 1px solid #e2e6ea;'>上级科目</td></tr></thead><tbody></tbody>\n</table></div>");
            $.request({
        		type:'post',
            	url:'/manager/cw/pz/getSubject',
            	data:{
            		keyword:_this.val(),
            		year:$("#date").val().substring(0,4)
            	},
            	dataType:'json',
            	success:function(data){
	            	if(data.result==1){
						var res=data.data.rows;
						var html;
						if(res.length!=0){
							$.each(res,function(i,val){
								html+='<tr style="font-size: 12px;border: 1px solid #e2e6ea;">'+
									'<td style="border: 1px solid #e2e6ea;padding: 5px 5px;">'+val.subjectCode+'</td>'+
									'<td style="border: 1px solid #e2e6ea;padding: 5px 5px;">'+val.subjectName+'</td>'+
									'<td style="border: 1px solid #e2e6ea;padding: 5px 5px;">'+val.subjectClssifyName+'</td>'+
									'<td><input type="hidden" class="sbjId" value="'+val.id+'"/></td></tr>'
							})
						}else{
							html=''
						}
						$('.SubAssbox tbody').html(html);
                        $('.SubAssbox tbody tr:first').addClass('active')
                        $('.SubAssbox tbody tr').click(function(){
                            $('.SubAssbox tbody tr').removeClass('active')
                            $(this).addClass('active')
						})

						$('.SubAssbox tbody tr').dblclick(function(){
    						_this.val($(this).find('td:eq(0)').text()+' '+$(this).find('td:eq(1)').text());
    						_this.closest('tr').find('.subjectId').val($(this).find('.sbjId').val());
    						_this.closest('tr').find('.SubCode').val($(this).find('td:eq(0)').text());
    						_this.closest('td').next().find('input').val('');
    						$(".SubAssbox").remove();
    						$.request({
    				    		type:'post',
    				        	url:'/manager/cw/pz/checkAuxiliary/'+$(this).find('.sbjId').val(),
    				        	dataType:'json',
    				        	success:function(data){
    								var wldw=data.data.subject.partnerAccounting;
    			            		var bm=data.data.subject.departmentAccounting;
    			            		var yg=data.data.subject.employeeAccounting;
    			            		if(wldw==0&&bm==0&&yg==0){
    			            			_this.closest('tr').find('.fz').val(0)
                                        var zy= _this.closest('tr').find('.input2table input[name="zy"]').val()
										if(zy!=""){
                                            _this.closest('tr').find('.Debit').click()
										}

    			            		}else{
    			            			_this.closest('tr').find('.fz').val(1)
    			            			_this.closest('tr').find('.input2selectbox:eq(1) i').click()
    			            		}
    				    		},
    				    		error:function(){
    				    			alert('请求失败！')
    				    		}
    				    	})
    					})
					}else{
						$.zxsaas_plus.showalert('error',data.desc)
					}
        		},
        		error:function(){
        			alert('请求失败！')
        		}
        	})
            var _this_t=$(this).find('input').offset().top;
            var _this_l=$(this).find('input').offset().left;
            var _this_h=$(this).find('input').height();
            $('.SubAssbox').css({
                'top':_this_t+_this_h,
                'left':_this_l,
                'position':'absolute',
                'zIndex':2,
                'maxHeight':'218px',
                'overflow-x':'hidden',
                'overflow-y':'auto',
                'box-shadow':'0px 5px 12px 0px rgba(153, 153, 153, 0.5)',
            });
            $('.zxsaastable').css('background','#fff');
        }
        else if(event.keyCode==13){
            //保存录入信息并关闭	弹出框
            $(this).blur();
            if( $('.SubAssbox tbody tr:first').length>0){
                $('.SubAssbox tbody tr:first').trigger('dblclick');
			}
            $('.SubAssbox').remove();

        }
    });
    //初始化科目角标、辅助项角标
    var _this_Sub;//科目
    $(document).on('click','.input2selectbox i:even',function(){
    	_this_Sub =$(this).parent().find('input');
        $("#myModelSub").modal("show");
        SubTreeData();
        SubTableData();
        $("#SubTable").setGridParam({
    	    postData:{currentAccountingYear:$("#date").val().substring(0,4)}
	    }).trigger("reloadGrid");
        $('#myModelSub_sure').off('click').on('click',function () {
            var selectID=$("#SubTable").getGridParam("selrow");//选中行ID
            var rowData=$("#SubTable").jqGrid("getRowData",selectID);
            if(selectID==null){
                $.zxsaas_plus.showalert('warning','未选择')
                return false
            }else if(rowData['ifEndSubject']=='否'){
                $.zxsaas_plus.showalert('warning','该项非末级科目，无法选择')
                return false
            }
            else{
                var cellid=$("#SubTable").jqGrid("getCell",selectID,"id");
                var cellcode=$("#SubTable").jqGrid("getCell",selectID,"subjectCode");
                var cellname=$("#SubTable").jqGrid("getCell",selectID,"subjectName");
                var cellPath=$.trim($("#SubTable").jqGrid("getCell",selectID,"subjectPath")).split("/")[0]||"";
                // 科目编码(空格)一级科目/末级科目
				if(cellPath!=cellname){
                    _this_Sub.val(cellcode+' '+cellPath+'/'+cellname);
				}else{
                    _this_Sub.val(cellcode+' '+cellPath);
				}

                _this_Sub.closest('td').find('.subjectId').val(cellid);
                _this_Sub.closest('td').find('.SubCode').val(cellcode);
                _this_Sub.closest('tr').find('input[name=hsjr]:odd').val("");
                _this_Sub.closest('tr').find('.auxiliaryId1').val("");//ID
                _this_Sub.closest('tr').find('.auxiliaryId2').val("");//ID
                _this_Sub.closest('tr').find('.auxiliaryId3').val("");//ID
                _this_Sub.closest('tr').find('.auxiliaryId1name').val("");//
                _this_Sub.closest('tr').find('.auxiliaryId2name').val("");//
                _this_Sub.closest('tr').find('.auxiliaryId3name').val("");//
                $.request({
                    type:'post',
                    url:'/manager/cw/pz/checkAuxiliary/'+cellid,
                    dataType:'json',
                    success:function(data){
                        var wldw=data.data.subject.partnerAccounting;
                        var bm=data.data.subject.departmentAccounting;
                        var yg=data.data.subject.employeeAccounting;
                        if(wldw==0&&bm==0&&yg==0){
                            _this_Sub.closest('td').find('.fz').val(0);
                        }else{
                            _this_Sub.closest('td').find('.fz').val(1)
                            _this_Sub.closest('tr').find('.input2selectbox:eq(1) i').click()
                        }
                    },
                    error:function(){
                        alert('请求失败！')
                    }
                })
            }
        })
    })
    $('#myModelSub').on('hidden.bs.modal',function(){
    	$('#myModelSub_sure').off()
    })
	var _this_Ass;//辅助项
    $(document).on('click','.input2selectbox i:odd',function(){
    	_this_Ass = $(this);
        var _this_zy=$(this).closest('tr').find('input[name=zy]').val();
        var _this_km=$(this).closest('tr').find('input[name=hsjr]:even').val();
        var _this_kmId=$(this).closest('tr').find('.subjectId').val();
        var _this_kmbm=$(this).closest('tr').find('.SubCode').val();
        var auxiliaryId1=_this_Ass.closest('td').find('.auxiliaryId1').val();//往来单位id
        var auxiliaryId2=_this_Ass.closest('td').find('.auxiliaryId2').val();//部门id
        var auxiliaryId3=_this_Ass.closest('td').find('.auxiliaryId3').val();//职员id
        var auxiliaryId1name=_this_Ass.closest('td').find('.auxiliaryId1name').val();//往来单位名
        var auxiliaryId2name=_this_Ass.closest('td').find('.auxiliaryId2name').val();//部门名
        var auxiliaryId3name=_this_Ass.closest('td').find('.auxiliaryId3name').val();//职员名
        var num1=amoMoney(_this_Ass.closest('tr').find('.Debit'));//借
        var num2=amoMoney(_this_Ass.closest('tr').find('.Credit'));//贷
        if(_this_kmId!=''){
        	$.request({
    			type:'post',
    	    	url:'/manager/cw/pz/checkAuxiliary/'+_this_kmId,
    	    	dataType:'json',
    	    	success:function(data){
            		var wldw=data.data.subject.partnerAccounting;
            		var bm=data.data.subject.departmentAccounting;
            		var yg=data.data.subject.employeeAccounting;
            		console.log(wldw+','+bm+','+yg)
            		if(wldw==0&&bm==0&&yg==0){
            			$.zxsaas_plus.showalert('warning','没有辅助项')
            		}else{
            			$("#myModelAss").modal("show");
                		AssTableData();
                		var IDs=$("#AssTable").jqGrid("getDataIDs");//获取行ID数组
                		for(var i=1;i<IDs.length;i++){
                			$("#AssTable").jqGrid("delRowData",IDs[i]);
                		}
                		if(wldw==1){
                			$('#AssTable').setGridParam().showCol("units").trigger("reloadGrid");
                			_this_Ass.closest('tr').find('.wldw').val(wldw)
                		}else if(wldw==0){
                			$('#AssTable').setGridParam().hideCol("units").trigger("reloadGrid");
                			_this_Ass.closest('tr').find('.wldw').val(wldw)
                		}
                		if(bm==1){
                			$('#AssTable').setGridParam().showCol("depart").trigger("reloadGrid");
                			_this_Ass.closest('tr').find('.bm').val(bm)
                		}else if(bm==0){
                			$('#AssTable').setGridParam().hideCol("depart").trigger("reloadGrid");
                			_this_Ass.closest('tr').find('.bm').val(bm)
                		}
                		if(yg==1){
                			$('#AssTable').setGridParam().showCol("clerk").trigger("reloadGrid");
                			_this_Ass.closest('tr').find('.yg').val(yg)
                		}else if(yg==0){
                			$('#AssTable').setGridParam().hideCol("clerk").trigger("reloadGrid");
                			_this_Ass.closest('tr').find('.yg').val(yg)
                		}
                		if(auxiliaryId1==''){
                			auxiliaryId1=' '
                		}
                		if(auxiliaryId1name==''){
                			auxiliaryId1name=' '
                		}
                		if(auxiliaryId2==''){
                			auxiliaryId2=' '
                		}
                		if(auxiliaryId2name==''){
                			auxiliaryId2name=' '
                		}
                		if(auxiliaryId3==''){
                			auxiliaryId3=' '
                		}
                		if(auxiliaryId3name==''){
                			auxiliaryId3name=' '
                		}
                		if(num1==''){
                			num1=' '
                		}
                		if(num2==''){
                			num2=' '
                		}
                		$('#AssTable').jqGrid('setCell',IDs[0],'uid',auxiliaryId1);
            			$('#AssTable').jqGrid('setCell',IDs[0],'unitsname',auxiliaryId1name);
            			$('.unitsInput:eq(0)').val(auxiliaryId1name);
            			$('#AssTable').jqGrid('setCell',IDs[0],'did',auxiliaryId2);
            			$('#AssTable').jqGrid('setCell',IDs[0],'departname',auxiliaryId2name);
            			$('.departInput:eq(0)').val(auxiliaryId2name);
            			$('#AssTable').jqGrid('setCell',IDs[0],'cid',auxiliaryId3);
            			$('#AssTable').jqGrid('setCell',IDs[0],'clerkname',auxiliaryId3name);
            			$('.clerkInput:eq(0)').val(auxiliaryId3name);
            			$('#AssTable').jqGrid('setCell',IDs[0],'debit',num1);
            			$('#AssTable').jqGrid('setCell',IDs[0],'credit',num2);
            			//辅助项保存按钮
                    	var assObj={};
                    	$('#ModelAss_sure').click(function(){
                    		assObj.arr=new Array;
                    		var IDs=$('#AssTable').jqGrid('getDataIDs');
                    		for(var i=0; i < IDs.length; i++){
                    			var rowData = $("#AssTable").jqGrid("getRowData",IDs[i]);//根据行ID得到行数据
                				assObj.arr[i]={};
                				assObj.arr[i].uid=rowData["uid"];
                				assObj.arr[i].unitsname=rowData["unitsname"];
                				assObj.arr[i].did=rowData["did"];
                				assObj.arr[i].departname=rowData["departname"];
                				assObj.arr[i].cid=rowData["cid"];
                				assObj.arr[i].clerkname=rowData["clerkname"];
                				assObj.arr[i].debit=rowData["debit"];
                				assObj.arr[i].credit=rowData["credit"];
                    		}
//                    		console.log(assObj.arr)
                    		if(assObj.arr.length==1){
                    			_this_Ass.closest('td').find('input[name=hsjr]').val(assObj.arr[0].unitsname+'-'+assObj.arr[0].departname+'-'+assObj.arr[0].clerkname);//名
                    			_this_Ass.closest('td').find('.auxiliaryId1').val(assObj.arr[0].uid);//ID
                    			_this_Ass.closest('td').find('.auxiliaryId2').val(assObj.arr[0].did);//ID
                    			_this_Ass.closest('td').find('.auxiliaryId3').val(assObj.arr[0].cid);//ID
                    			_this_Ass.closest('td').find('.auxiliaryId1name').val(assObj.arr[0].unitsname);//
                    			_this_Ass.closest('td').find('.auxiliaryId2name').val(assObj.arr[0].departname);//
                    			_this_Ass.closest('td').find('.auxiliaryId3name').val(assObj.arr[0].clerkname);//
                    			_this_Ass.closest('tr').find('.Debit').find('input[name=je]').val(assObj.arr[0].debit);
                    			_this_Ass.closest('tr').find('.Credit').find('input[name=zkl]').val(assObj.arr[0].credit);
                    			formatints(_this_Ass.closest('tr').find('.Debit').find('input[name=je]'),assObj.arr[0].debit);
                    			formatints(_this_Ass.closest('tr').find('.Credit').find('input[name=zkl]'),assObj.arr[0].credit);
                    			_this_Ass.closest('tr').find('.Debit').find('input[name=je]').focusout();//合计初始化
                    		}
                    		if(assObj.arr.length>=2){
                    			var arr=assObj.arr.splice(0,1);
                    			assObj.arr.reverse();
//                    			console.log(arr);
//                    			console.log(assObj.arr);
                    			_this_Ass.closest('td').find('input[name=hsjr]').val(arr[0].unitsname+'-'+arr[0].departname+'-'+arr[0].clerkname);
                    			_this_Ass.closest('td').find('.auxiliaryId1').val(arr[0].uid);//ID
                    			_this_Ass.closest('td').find('.auxiliaryId2').val(arr[0].did);//ID
                    			_this_Ass.closest('td').find('.auxiliaryId3').val(arr[0].cid);//ID
                    			_this_Ass.closest('td').find('.auxiliaryId1name').val(arr[0].unitsname);//
                    			_this_Ass.closest('td').find('.auxiliaryId2name').val(arr[0].departname);//
                    			_this_Ass.closest('td').find('.auxiliaryId3name').val(arr[0].clerkname);//
                    			_this_Ass.closest('tr').find('.Debit').find('input[name=je]').val(arr[0].debit);
                    			_this_Ass.closest('tr').find('.Credit').find('input[name=zkl]').val(arr[0].credit);
                    			formatints(_this_Ass.closest('tr').find('.Debit').find('input[name=je]'),arr[0].debit);
                    			formatints(_this_Ass.closest('tr').find('.Credit').find('input[name=zkl]'),arr[0].credit);
                    			$.each(assObj.arr,function(i,val){
                    				clicktr_a.addtr(_this_Ass.closest('tr'),$(".inputboxtable tbody tr:last-child"));//增行
                                	maxnum++;
                                	var thistr=_this_Ass.closest('tr').next();
                                	thistr.find('input[name=zy]').val(_this_zy);
                                	thistr.find('input[name=hsjr]:even').val(_this_km);
                                	thistr.find('.subjectId').val(_this_kmId);
                                	thistr.find('.SubCode').val(_this_kmbm);
                                	thistr.find('input[name=hsjr]:odd').val(val.unitsname+'-'+val.departname+'-'+val.clerkname);
                                	thistr.find('.auxiliaryId1').val(val.uid);
                                	thistr.find('.auxiliaryId2').val(val.did);
                                	thistr.find('.auxiliaryId3').val(val.cid);
                                	thistr.find('.auxiliaryId1name').val(val.unitsname);
                                	thistr.find('.auxiliaryId2name').val(val.departname);
                                	thistr.find('.auxiliaryId3name').val(val.clerkname);
                                	thistr.find('.Debit').find('input[name=je]').val(val.debit);
                                	thistr.find('.Credit').find('input[name=zkl]').val(val.credit);
                                	formatints(thistr.find('.Debit').find('input[name=je]'),val.debit);
                        			formatints(thistr.find('.Credit').find('input[name=zkl]'),val.credit);
                    			})
                    			_this_Ass.closest('tr').find('.Debit').find('input[name=je]').focusout();//合计初始化
                    		}
                    	})
            		}
    			},
    			error:function(){
    				alert('请求失败！')
    			}
    		})
        }else{
        	$.zxsaas_plus.showalert('warning','没有科目！')
        }
    })
    $('#myModelAss').on('hidden.bs.modal',function(){
    	$("#ModelAss_sure").off();
    })
    //借贷框          按钮限制
    $('.Amountbox').keydown(function(event){
        return GetInput(event);
    });
    //数字键盘
    function GetInput(event){//屏蔽非数字和非退格符
        var k = event.keyCode;   //48-57是大键盘的数字键，96-105是小键盘的数字键，8是退格符←，   32是空格键     110,190是小数点，      189,109是-  187是=
        if ((k <= 57 && k >= 48) || (k <= 105 && k >= 96)||(k==8)||(k==32)||(k== 110)||(k==190)||(k==189)||(k==109)||(k==187)){
            return true;
        }else {
            return false;
        }
    }
    //****************借贷框录入***************
    $(document).on('keyup','.Debit input', function (event) {
        if(event.keyCode==32&&event.keyCode!=13&&($(this).closest('td').next().find('input').val()==''||$(this).closest('td').next().find('input').val()==0)){//当按下空格非回车且对方input值为空时，把自己的值赋值给对方，自己值为空
            if(isNaN($(this).val())){
            	$(this).val('')
            }
        	var _thisValLeft=$(this).val();
            $(this).val('');
            formatint($(this).closest('td').next().find('input').val(Number(_thisValLeft)));
        }else if(event.keyCode==32&&event.keyCode!=13&&($(this).closest('td').next().find('input').val()!=''||$(this).closest('td').next().find('input').val()!=0)){//当按下空格非回车且对面值不为空时拿取对方值，对方值为空
            var _thisValRight=$(this).closest('td').next().find('input').val();
            $(this).closest('td').next().find('input').val('');
            formatint($(this).val(_thisValRight));
            formatint($(this).closest('td').next().find('input').val(''));
        }else if(event.keyCode==13){
            //..解决回车键焦点切换冲突
        	$(this).blur();
        	$(this).closest('td').next().find('input:text').prev('div').hide();
        	$(this).closest('td').next().find('input:text').show().focus();
        }else if(event.keyCode==109||event.keyCode==189){//允许‘-’键，松开按键时不管其在哪里出现一律删除并且在此数字前添加‘-’
            $(this).val('-'+$(this).val().replaceAll('-',''));
            formatint($(this).closest('td').next().find('input').val(''));//对方值为空
        }else if(event.keyCode==187){//=号配平
        	if(isNaN($(this).val())){
        		$(this).val(0)
        	}
        	$(this).closest('tr').find('.Credit').find('input[name=zkl]').val(0);
        	formatint($(this).closest('tr').find('.Credit').find('input[name=zkl]'));
        	tolcalcu();
        	$(this).val(Number($('.CreditSum input[name=zkl]').val())-Number($('.DebitSum input[name=zkl]').val())+Number($(this).val()));
        	tolcalcu();
        }else{
            $(this).closest('td').next().find('input').val('');
            formatint($(this).closest('td').next().find('input'));
        }
        tolcalcu()
    });
    $(document).on('keyup','.Credit input', function (event) {
        if(event.keyCode==32&&event.keyCode!=13&&($(this).closest('td').prev().find('input').val()==''||$(this).closest('td').prev().find('input').val()==0)){
        	if(isNaN($(this).val())){
            	$(this).val('')
            }
            var _thisValLeft=$(this).val();
            $(this).val('');
            formatint($(this).closest('td').prev().find('input').val(Number(_thisValLeft)));
        }else if(event.keyCode==32&&event.keyCode!=13&&($(this).closest('td').prev().find('input').val()!=''||$(this).closest('td').prev().find('input').val()!=0)){
            var _thisValRight=$(this).closest('td').prev().find('input').val();
            $(this).closest('td').prev().find('input').val('');
            formatint($(this).val(_thisValRight));
            formatint($(this).closest('td').prev().find('input').val(''))
        }else if(event.keyCode==13){
            //..解决回车键焦点切换冲突
        }else if(event.keyCode==109||event.keyCode==189){
            $(this).val('-'+$(this).val().replaceAll('-',''));
            formatint($(this).closest('td').prev().find('input').val(''));
        }else if(event.keyCode==187){
        	if(isNaN($(this).val())){
        		$(this).val(0)
        	}
        	$(this).closest('tr').find('.Debit').find('input[name=je]').val(0);
        	formatint($(this).closest('tr').find('.Debit').find('input[name=je]'));
        	tolcalcu();
        	$(this).val(Number($('.DebitSum input[name=zkl]').val())-Number($('.CreditSum input[name=zkl]').val())+Number($(this).val()));
        	tolcalcu();
        }else{
            $(this).closest('td').prev().find('input').val('');
            formatint($(this).closest('td').prev().find('input'));
        }
        tolcalcu()
    });

    $(document).on("focusout", ".Amountbox input", function () {//借贷框 当input控件失去焦点的时候
    	var lastDebitValue=$('.Debit:last input[name=je]').val();
    	var lastCreditValue=$('.Credit:last input[name=zkl]').val();
    	if(lastDebitValue!=''||lastCreditValue!=''){
    		maxnum = creattr(d_tr, maxnum, 10);//初始化表格
    	}
        formatint($(this));//格式化当前控件的值 到金额中
        var newval,nArr;
        if($(this).val().indexOf('-')!=-1){//借贷框中存在负号，倒数第三位数字后面添加小数点，数前添加‘-’，赋值给此input
            var txt='';
            for(var p=0;p<$(this).prev().find('font').length;p++){//遍历font，将每个font中的值放入txt中拼接成txt
                txt+=$(this).prev().find('font').eq(p).text();
            }
            txt=txt.replace(/\s/g, "");//去掉字段前的空格符
            newval=txt;
            nArr=newval.toString().split('');
            nArr.splice(newval.toString().length-2,0,'.');
            $(this).val('-'+nArr.join(''));
        }else if($(this).val()==0){//当此input框值为0时失去焦点后赋值为空
            $(this).val('')
        }else{
            var txt='';
            for(var p=0;p<$(this).prev().find('font').length;p++){
                txt+=$(this).prev().find('font').eq(p).text();
            }
            txt=txt.replace(/\s/g, "");
            newval=txt;
            nArr=newval.toString().split('');
            nArr.splice(newval.toString().length-2,0,'.');
            $(this).val(nArr.join(''));
        }
        if($(this).val().indexOf('N')>=0){
//                    alert('错误！请重新填写');
            $(this).val('');
            $(this).focus();
            $(this).closest('td').next().find('div').css('display','inline');
        }else{
            $(this).parents("td").find("div").show();
            $(this).parents("td").find("input").hide();
            //计算列汇总开始
            var CreditSum = 0;//初始化借方合计变量
            var DebitSum = 0;//初始化贷方合计变量
            $.each($(this).parents(".grp_table").find(".inputboxtable tr"), function (i, item) {//循环需要输入的表格
                var Creditval = $(item).find("td.Credit>input").val();//获取借方值
                CreditSum = CreditSum + Number(Creditval);//借方值累加进借方合计
                var Debitval = $(item).find("td.Debit>input").val();//获取贷方值
                DebitSum = DebitSum + Number(Debitval);//贷方值累加进贷方合计
                if (Creditval == "" && Debitval == "") {
                    $(item).addClass("noinput");//如果借方值和贷方值 都为空  标识该行为空行
                } else {
                    $(".noinput").removeClass("noinput");//清除之前所有的空行标识
                    $(item).addClass("oninput");//如果借方表格和贷方表格有一个不为空   标识该行为非空行
                }
            });
         /*
		//desc: 财务管理--填制凭证页取消录入金额后自动生成差额的功能
         if (CreditSum != DebitSum) {//如果借方合计不等于贷方合计，及合计账目不平
                var nexttrval = CreditSum - DebitSum;//计算合计差额值
                if (nexttrval < 0) {//如果差额值小于0
                    $(this).parents(".inputboxtable").find("tr.noinput").eq(0).find("td.Credit input").val(0 - nexttrval);//获取到第一个没有输入值得行中  查找借方输入框并把差额值填入
					formatint($(this).parents(".inputboxtable").find("tr.noinput").eq(0).find("td.Credit input"));//格式化差额值
                    $(this).parents(".grp_table").find(".footbox tr>td.CreditSum input").val(DebitSum);//给借方合计输入框赋值 ，
                    formatint($(this).parents(".grp_table").find(".footbox tr>td.CreditSum input"));//格式化合计值
                    $(this).parents(".grp_table").find(".footbox tr>td.DebitSum input").val(DebitSum);//给贷方合计输入框赋值 ，
                    formatint($(this).parents(".grp_table").find(".footbox tr>td.DebitSum input"));// 格式化合计值
                } else {
                    $(this).parents(".inputboxtable").find("tr.noinput").eq(0).find("td.Debit input").val(nexttrval);//获取到第一个没有输入值得行中  查找贷方输入框并把差额值填入
                    formatint($(this).parents(".inputboxtable").find("tr.noinput").eq(0).find("td.Debit input"));//格式化差额值
                    $(this).parents(".grp_table").find(".footbox tr>td.CreditSum input").val(CreditSum);//给借方合计输入框赋值 ，
                    formatint($(this).parents(".grp_table").find(".footbox tr>td.CreditSum input"));// 格式化合计值
                    $(this).parents(".grp_table").find(".footbox tr>td.DebitSum input").val(CreditSum);//给贷方合计输入框赋值 ，
                    formatint($(this).parents(".grp_table").find(".footbox tr>td.DebitSum input"));// 格式化合计值
                }
            }*/
            //计算列汇总结束
            //                font框0值处理
            for(var j=0;j<$(this).prev('div').find('font').length;j++){
                if($(this).prev('div').find('font').eq(j).text()!=0){
                    break
                }else{
                    $(this).prev('div').find('font').eq(j).html('&nbsp;')
                }
            }
        }
    });

    $(document).on('click','.BusinessDepart',function(){
    	if($('#ifyw').val()==0){
    		$.zxsaas_plus.showalert('warning','没有业务部门')
    		return false
    	}else{
        	_thisbdepart=$(this);
			$('#BusinessDepartModal').parent().find('button').trigger('click')
    	}
    })

////按钮组事件
//流量
    $('#flow').click(function(){
    	$.request({
    		type:'post',
        	url:basePath+'/cw/pz/showCashFlow?billsId='+$('#id').val(),
        	contentType:"application/json",
        	dataType:'json',
        	success:function(data){
        		console.log(data)
        		if(data.result==1){
        			var res1=data.data.beforeList;
        			var res2=data.data.afterList;
        			$('#myModal_flow').modal('show');
        			$("#cashFlowTop").jqGrid("clearGridData");
        			$("#cashFlowBottom").jqGrid("clearGridData");
        			$.each(res1,function(i,val){
        				$("#cashFlowTop").jqGrid('addRowData',i+1,res1[i]);
        			})
        			$.each(res2,function(i,val){
        				$("#cashFlowBottom").jqGrid('addRowData',i+1,res2[i]);
        			})
        		}else{
        			$.zxsaas_plus.showalert('error',data.desc)
        			return false;
        		}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
    })
    $('#flow_distribution').click(function(){
    	var topSumjie=0,topSumdai=0;
    	var topIDs=$("#cashFlowTop").jqGrid("getDataIDs");//获取行ID数组
    	for(var i=0; i < topIDs.length; i++){
    		var rowData = $("#cashFlowTop").jqGrid("getRowData",topIDs[i]);//根据行ID得到行数据
    		if(rowData['direction']=='借'){
    			topSumjie+=Number(rowData['amount'])
    		}else{
    			topSumdai+=Number(rowData['amount'])
    		}
    	}
    	console.log(topSumjie)
    	console.log(topSumdai)
    	var botSumjie=0,botSumdai=0;
    	var botIDs=$("#cashFlowBottom").jqGrid("getDataIDs");//获取行ID数组
    	for(var i=0; i < botIDs.length; i++){
    		var rowData = $("#cashFlowBottom").jqGrid("getRowData",botIDs[i]);//根据行ID得到行数据
    		if(rowData['direction']=='流入'){
    			botSumjie+=Number(rowData['amount'])
    		}else{
    			botSumdai+=Number(rowData['amount'])
    		}
    	}
    	console.log(botSumjie)
    	console.log(botSumdai)
    	if(topSumjie!=botSumjie||topSumdai!=botSumdai){
    		$.zxsaas_plus.showalert('warning','借贷款不相等')
    		return false
    	}else{
    		$.request({
        		type:'post',
            	url:basePath+'/cw/pz/reallocateCashFlows',
            	data:{jsonData:JSON.stringify(flowDistributionDatas())},
//            	contentType:"application/json",
            	dataType:'json',
            	success:function(data){
            		if(data.result==1){
            			$.zxsaas_plus.showalert('success','分配成功')
            			window.location.href=basePath+'/cw/test/voucher';
            		}else{
            			$.zxsaas_plus.showalert('error',data.desc)
            			return false;
            		}
        		},
        		error:function(){
        			alert('请求失败！')
        		}
        	})
    	}
    })
    function flowDistributionDatas(){
    	var FcashFlow={};
    	FcashFlow.billsId=$('#id').val();
    	FcashFlow.cashFlowList=new Array;
    	var botIDs=$("#cashFlowBottom").jqGrid("getDataIDs");//获取行ID数组
    	for(var i=0; i < botIDs.length; i++){
    		var rowData = $("#cashFlowBottom").jqGrid("getRowData",botIDs[i]);//根据行ID得到行数据
    		if(rowData['flowItemId']!=null){
    			FcashFlow.cashFlowList[i]={};
    			FcashFlow.cashFlowList[i].flowId=rowData['flowItemId'];
    			FcashFlow.cashFlowList[i].currencyAmount=rowData['amount'];
    		}
    	}
    	return FcashFlow
    }
//保存
    $('#save').click(function(){
    	doSave(0);
    })
    
    function doSave(jump){
    	if($('#date').val()==''){
    		$.zxsaas_plus.showalert('warning','制单日期必须填')
    		$('#date').focus();
    		return false
    	}else{
            //修改已保存成功的凭证日期时不允许跨月（只能修改“日”）
            if($('#id').val().trim()!=''){
                var curDate=new Date($('#date').val());
                var origDate=new Date($('#date').attr('data-originaldate'));
				if((curDate.getFullYear()!=origDate.getFullYear()) ||(curDate.getMonth()!=origDate.getMonth()) ){
                    $.zxsaas_plus.showalert('warning','修改已保存成功的凭证日期时不允许跨月（只能修改“日”)')
                    return;
				}
            }
    		var save=true;
    		$('.subjectId').each(function(i,val){
    			var _this=$(this);
    			if(_this.val()!=''){
    				var _thistr=_this.closest('tr');
        			var index=_thistr.find('td:eq(0)').text();
    				if(Number(_thistr.find('input[name=je]').val())==0&&Number(_thistr.find('input[name=zkl]').val())==0){
    					$.zxsaas_plus.showalert('warning','第'+index+'行,借贷不能为0')
    					save=false;
    					return false
    				}
    				if($('#ifyw').val()==1){
    					if(_thistr.find('.BusinessDepartId').val()==''){
        					$.zxsaas_plus.showalert('warning','第'+index+'行,业务部门为空')
        					save=false;
        					return false
        				}
    				}

                    if(Number(_thistr.find('.fz').val())==1&_thistr.find('input[name=hsjr]').val()==''){
                        $.zxsaas_plus.showalert('warning','第'+index+'行,辅助项不能为空')
                        save=false;
                        return false
                    }
                    if(Number(_thistr.find('.fz').val())==1&_thistr.find('input[name=zy]').val()==''){
                        $.zxsaas_plus.showalert('warning','第'+index+'行,摘要不能为空')
                        save=false;
                        return false
                    }
    			}
    		})
        	$('.fz').each(function(i,val){
        		var _this=$(this);
        		if(_this.val()==1){
        			var _thistr=_this.closest('tr');
        			var index=_thistr.find('td:eq(0)').text();
        			if(_this.closest('tr').find('.wldw').val()==1&&$.trim(_this.closest('tr').find('.auxiliaryId1').val())==''){
        				$.zxsaas_plus.showalert('warning','第'+index+'行,辅助项-往来单位未填写')
        				save=false;
        				return false;
        			}
        			if(_this.closest('tr').find('.bm').val()==1&&$.trim(_this.closest('tr').find('.auxiliaryId2').val())==''){
        				$.zxsaas_plus.showalert('warning','第'+index+'行,辅助项-部门未填写')
        				save=false;
        				return false;
        			}
        			if(_this.closest('tr').find('.yg').val()==1&&$.trim(_this.closest('tr').find('.auxiliaryId3').val())==''){
        				$.zxsaas_plus.showalert('warning','第'+index+'行,辅助项-职员未填写')
        				save=false;
        				return false;
        			}
        		}
        	})

        	if(save){
            	$.request({
            		type:'post',
                	url:'/manager/cw/pz/save',
                	data:JSON.stringify(voucherData()),
                	contentType:"application/json",
                	dataType:'json',
                	success:function(data){
    	        		if(data.result==1){
    	        			$.zxsaas_plus.showalert('success','保存成功');
                            pageAjax(data.data.billsId);
                            if(jump == 1){
                            	setTimeout(function(){
                            		window.location.href=basePath+'/cw/test/voucher';
                            		},1000);
                            }
    	        		}else{
    	        			$.zxsaas_plus.showalert('error',data.desc)
    	        		}
            		},
            		error:function(){
            			alert('请求失败！')
            		}
            	})
        	}
    	}
    }
    function voucherData(){
    	var fmVoucher={};
    	fmVoucher.id=$('#id').val();//新增保存更新
    	fmVoucher.docWordId=$('#proof').val();//凭证字
    	if($('#voucherNum').val()==''){
    		fmVoucher.inNo=$('#voucherNum').val();//凭证编号
    	}else{
    		fmVoucher.inNo=Number($('#voucherNum').val());//凭证编号
    	}
    	fmVoucher.voucherDate=$('#date').val();//日期
    	fmVoucher.attachedVoucherNum=$('#elseData').val();//附单据数
    	fmVoucher.accuBorrowCurrAmuont=$('.DebitSum').find('input[name=zkl]').val();//借方金额
    	fmVoucher.accuBorrowOrigAmuont=$('.DebitSum').find('input[name=zkl]').val();//借方金额
    	fmVoucher.accuLoanCurrAmuont=$('.CreditSum').find('input[name=zkl]').val();//贷方金额
    	fmVoucher.accuLoanOrigAmuont=$('.CreditSum').find('input[name=zkl]').val();//贷方金额
    	fmVoucher.flist=new Array;
    	$('.inputboxtable tbody tr').each(function(i,val){
    		if($(this).find('.subjectId').val()!=''){
    			fmVoucher.flist[i]={};
    			fmVoucher.flist[i].summary=$(this).find('input[name=zy]').val();//摘要
    			fmVoucher.flist[i].subjectId=$(this).find('.SubCode').val();//科目编码
    			fmVoucher.flist[i].partnerId=$(this).find('.auxiliaryId1').val();//往来单位ID
    			fmVoucher.flist[i].departmentId=$(this).find('.auxiliaryId2').val();//部门ID
    			fmVoucher.flist[i].employeeId=$(this).find('.auxiliaryId3').val();//人员ID
    			fmVoucher.flist[i].borrowCurrency=$(this).find('.Debit').find('input[name=je]').val();//借方本币
    			fmVoucher.flist[i].borrowOrig=$(this).find('.Debit').find('input[name=je]').val();//借方原币
    			fmVoucher.flist[i].loanCurrency=$(this).find('.Credit').find('input[name=zkl]').val();//贷方本币
    			fmVoucher.flist[i].loanOrig=$(this).find('.Credit').find('input[name=zkl]').val();//贷方原币
    			fmVoucher.flist[i].depYeId=$(this).find('.BusinessDepartId').val();//业务部门ID
    			for(var key in fmVoucher.flist[i]){
    				if(fmVoucher.flist[i][key]==''){
    					delete fmVoucher.flist[i][key]
    				}
    			}
    		}
    	})
    	for(var key in fmVoucher){
    		if(fmVoucher[key]==''){
    			delete fmVoucher[key]
    		}
    	}
    	return fmVoucher
    }
    function loadAccountTable(){
    	$("#accountTable").jqGrid({
    		url:basePath+'/cw/pz/getSummary',
    		mtype:"post",
    		datatype: "json",
    		jsonReader  : {	
    			root:'data.rows',
    			page: "data.page",
    	        total: "data.total",
    	        records: "data.records",
    			repeatitems: false,
    		},
            colNames : ['操作','id','摘要'],
            colModel : [ 
    			{name:'delete',index:'delete',align:'center',formatter:function(){
    				return '<span class="glyphicon glyphicon-trash del" title="删除行" style="line-height:39px;"></span>';
    			}},
    			{name:'id',index:'id',hidden:true},
    			{name:'summaryContent',index:'summaryContent',width:300,align:'center'}
    		],
    		autowidth:true,
    		rownumbers: true,//行号
            rowNum : 15,
            cellEdit:true,
            rowList : [ 20, 50, 100 ],
            sortname : 'id',
            styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
            viewrecords : true,
            autowidth : true,
            multiselect : false,
            multiboxonly : false,
            sortorder : "asc",
            height : '500',
            caption : "",
//            pager:'#accountTablePager',
            ondblClickRow:function(rowid,iRow,iCol,e){
    			$('#maxselect').modal('hide');
    			var _val=$(this).jqGrid("getRowData",rowid).summaryContent;
    			console.log(_this_zhaiyao)
    			_this_zhaiyao.prev('input[name=zy]').val(_val);
    		},
            loadComplete:function(data){
    		}
    	}).trigger('reloadGrid');
    }
    $(document).on('click','.del',function(){
    	var id=$("#accountTable").getGridParam("selrow");
    	var thisid=$("#accountTable").jqGrid("getRowData",id)['id'];
    	$.request({
    		type:'post',
        	url:basePath+'/cw/pz/deleteSummary ',
        	data:{
    			id:thisid
    		},
        	dataType:'json',
        	success:function(data){
    			if(data.result==1){
    				$("#accountTable").trigger("reloadGrid");
    			}else{
    				$.zxsaas_plus.showalert('warning',data.desc)
    			}
    		},
    		error:function(){
    			alert('请求失败！')
    		}
    	})
    })
if(bId=='') {
    //设置默认凭证日期
    $.ajax({
        url: '/manager/cw/test/checkBaseInfo',
        type: "post",
        dataType: 'json',
        success: function (reData) {
            if (reData.result == 1) {
                $("#date").val(reData.data.voucherDate);
            } else {
                $.zxsaas_plus.showalert("提示", reData.desc);
            }
        }
    });
}
});
var clicktr_a = (function () {
    var addtr = function (tr, d_tr) {
    	tr.after(d_tr.clone());
    	tr.next('tr').find("input[ name='zy']").autCompleteTable({
            thead: '<thead><tr><th>序号</th><th>店名</th></tr></thead>\n',
            tbody: '<tr><td>{{xh}}</td><td>{{md}}</td></tr>\n',
            parentbox: $(".grp_table .nano"),
            ontrclick: function (obj, self, valself) {
            }
        });
        serialize(tr.parents("tbody"));
    };
    var instertr = function (tr, d_tr) {
        tr.before(d_tr.clone());
        tr.prev('tr').find("input[ name='zy']").autCompleteTable({
            thead: '<thead><tr><th>序号</th><th>店名</th></tr></thead>\n',
            tbody: '<tr><td>{{xh}}</td><td>{{md}}</td></tr>\n',
            parentbox: $(".grp_table .nano"),
            ontrclick: function (obj, self, valself) {
            }
        });
        serialize(tr.parents("tbody"));
    };
    var copytr = function (tr) {
        tr.after(tr.clone());
        serialize(tr.parents("tbody"));
        tolcalcu()
    };
    var deltr = function (tr) {
        var tbody = tr.parents("tbody");
        tr.remove();
        serialize(tbody);
        tolcalcu()
    };
    
    
    var serialize = function (tbody) {
        $.each(tbody.find("tr"), function (i, item) {
            $(item).find("td").eq(0).text(i + 1);
        });
    };
    return {
        addtr: addtr,
        deltr: deltr,
        copytr: copytr,
        instertr: instertr
    }
})()
function creattr(tr, maxnum, num) {
    for (var i = 1; i < num + 1; i++) {
        maxnum++;
        $(".inputboxtable tbody").append(tr.clone());
        $(".inputboxtable tbody tr:last-child td:first-child").text(maxnum);
        if(num<20){
            $(".inputboxtable tbody tr:last-child").find("input[ name='zy']").autCompleteTable({
                thead: '<thead><tr><th>序号</th><th>店名</th></tr></thead>\n',
                tbody: '<tr><td>{{xh}}</td><td>{{md}}</td></tr>\n',
                parentbox: $(".grp_table .nano"),
                ontrclick: function (obj, self, valself) {
                }
            });
		}

    }

    $(".nano").nanoScroller();
    return maxnum;
}
function PrefixInteger(num, length) {
    return (Array(length).join('a') + num).slice(-length);
}
function amoMoney($obj){
	var arr=[];
	$obj.find('font').each(function(i,val){
		arr.push($(this).text());
	})
	return Number(arr.join(''))/100
}
function formatint(obj) {
    var val = $(obj).val();
    if(val.toString().indexOf('-')>=0){
        $(obj).closest('td').find('font').css('color','red');
        val=Number(val.replace('-',''));
    }else{
        $(obj).closest('td').find('font').css('color','#000');
    }
    var numArr = Number(val).toFixed(2).split('');
    numArr.splice(-3, 1);
    val = numArr.join('');
    val = PrefixInteger(val, 11);
    var valArr = val.split("");
    for (var i = 0; i < 11; i++) {
        if (valArr[10 - i] == "a") {
            $(obj).parents("td").find("div>font").eq(10 - i).html("&nbsp;");
        } else {
            $(obj).parents("td").find("div>font").eq(10 - i).text(valArr[10 - i]);
        }
    }

}
function formatints($obj,value){
	var val = value;
    if(val.toString().indexOf('-')>=0){
        $obj.closest('td').find('font').css('color','red');
        val=(val.toString().replace('-',''));
    }else{
        $obj.closest('td').find('font').css('color','#000');
    }
    var numArr = Number(val).toFixed(2).split('');
    numArr.splice(-3, 1);
    val = numArr.join('');
    val = PrefixInteger(val, 11);
    var valArr = val.split("");
    for (var i = 0; i < 11; i++) {
        if (valArr[10 - i] == "a") {
            $obj.parents("td").find("div>font").eq(10 - i).html("&nbsp;");
        } else {
            $obj.parents("td").find("div>font").eq(10 - i).text(valArr[10 - i]);
        }
    }
}
function tolcalcu(){
	var DebitTol=0;
	$('.Debit').each(function(i,val){
		DebitTol+=Number($(this).find('input[name=je]').val())
	})
	var CreditTol=0;
	$('.Credit').each(function(i,val){
		CreditTol+=Number($(this).find('input[name=zkl]').val())
	})
	$('.DebitSum input[name=zkl]').val(DebitTol);
	$('.CreditSum input[name=zkl]').val(CreditTol);
	formatint($('.DebitSum input[name=zkl]'));
	formatint($('.CreditSum input[name=zkl]'));
}
$(document).on("click",".fil",function(event){
	var vl =$("#searchType1").val();
	$("#SubTable").jqGrid('setGridParam', {  
		    datatype:'json',  
	        postData:{keyWord:vl,currentAccountingYear:$("#date").val().substring(0,4)},
    }).trigger("reloadGrid");
});

$(document).on("keyup","#searchType",function(event){
    if(event.keyCode==13){
        $(".filNav").trigger('click')
    }
});

$(document).on("keyup","#searchType1",function(event){
    if(event.keyCode==13){
       $(".fil").trigger('click')
    }
});


function SubTreeData(){
	var nodes;
	$.request({
		type:'post',
    	url:'/manager/cw/company/findView',
    	data:{
			currentAccountingYear:$("#date").val().substring(0,4)
		},
    	dataType:'json',
    	success:function(data){
			nodes = data.data.rows;
			$.fn.zTree.init($("#accountTreeSub"),{
				data: {simpleData: {enable: true}},
				 view: {
	        		showLine: true
	        	 },
	             callback:{
		             onClick: function(event, treeId, treeNode){
		             	var param = {}
		             	if(treeNode.id < 0){
		             		param = {
								subjectClssify:treeNode.id,

							}
						}else{
							param = {
								id:treeNode.id,

							}
						}
		        		 $("#SubTable").jqGrid('setGridParam', {  
		     			     datatype:'json',
		     		         postData:param,
							 page:1
		        		 }).trigger("reloadGrid");
		        	 }
	             }
            },nodes);
		},
		error:function(){
			alert('请求失败！')
		}
	})
}
function SubTableData(){//科目表
	function formatterCreditDirection(cellvalue, options, rowObject){
		return cellvalue == 1 ? "借方":"贷方";
	}
	//辅助余额项
	function formatterAssistItem(cellvalue, options, rowObject){
		return rowObject.partnerAccounting == true ? "往来单位":"" + " " + rowObject.departmentAccounting == true ? "往来单位":"" + " " + rowObject.employeeAccounting == true ? "往来单位":"";
	}
	//数量核算
	function formatterIfNumAccounting(cellvalue, options, rowObject){
		return rowObject.ifNumAccounting == true ? "是":"否";
	}
	//是否启用
	function formatterEnable(cellvalue, options, rowObject){
		return rowObject.enable == true ? "否":"是";
	}
	//是否引用
	function formatterIsRefed(cellvalue, options, rowObject){
		return cellvalue == 1 ? "是":"否";
	}
    //是否往来核算
    function formatterPartnerAccounting(cellvalue, options, rowObject){
        return cellvalue == 1 ? "是":"否";
    }
    //是否部门核算
    function formatterDepartmentAccounting(cellvalue, options, rowObject){
        return cellvalue == 1 ? "是":"否";
    }
    //是否职员核算
    function formatterEmployeeAccounting(cellvalue, options, rowObject){
        return cellvalue == 1 ? "是":"否";
    }
   //  function my_input(value, options) {
	//     return $("<input type='text' size='10' style='background-color: red;' value='"+value+"'/>");
   //  }
   //  function my_value(value) {
   //      return "My value: "+value.val();
   // }


	var grid = $("#SubTable").jqGrid({
		url: basePath + '/cw/company/pageChildrens',
//		data:{
//			currentAccountingYear:2015
//		},
        datatype : "json",
        colNames : [ 'ID',  '科目编码', '科目名称', '科目类型','余额方向','是否被引用','是否末级科目','往来核算','部门核算','职员核算','路径'],
        colModel : [
	         {name : 'id',index : 'id',align:'center',width:90,hidden:true},
	         {name : 'subjectCode',index : 'subjectCode',align:'left',width:120},
	         {name : 'subjectName',index : 'subjectName',align:'left',width:200},
	         {name : 'subjectClssifyName',index : 'subjectClssifyName',align:'center',width:100},
	         {name : 'creditDirection',index : 'creditDirection',align:'center',formatter:formatterCreditDirection,width:80},
	         {name : 'isRefed',index : 'isRefed',align:'center',formatter:formatterIsRefed,width:100},
	         {name : 'ifEndSubject',index : 'ifEndSubject',align:'center',formatter:formatterIsRefed,width:100},
            {name : 'partnerAccounting',index : 'partnerAccounting',align:'center',formatter:formatterPartnerAccounting,width:100},
            {name : 'departmentAccounting',index : 'departmentAccounting',align:'center',formatter:formatterDepartmentAccounting,width:100},
            {name : 'employeeAccounting',index : 'employeeAccounting',align:'center',formatter:formatterEmployeeAccounting,width:100},
            {name : 'subjectPath',index : 'subjectPath',hidden:true},
	       ],
        styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
        pager : '#SubPager',
        jsonReader: {
            root: "data.rows",
            page: "data.page",
            total: "data.total",
            records: "data.records",
            repeatitems: false
        },
        mtype: "POST",
        viewrecords : true,
        rowNum: 100,
         rowList: [100, 200, 500],
         shrinkToFit:false,
        autoScroll: true,
        autowidth : false,
		width: '100%',
        height: $(window).height() * 0.4,
        multiselect : false,
        multiboxonly : false,
        caption : "",
        ondblClickRow:function(rowid,iRow,iCol,e){
            $('#myModelSub_sure').trigger('click')

		},
        postData:{currentAccountingYear:$("#date").val().substring(0,4)},
        loadComplete:function(data){
        	try {
			} catch (e) {
			}
        }
      });
}
function AssTableData(){
	var asslastrow = ""; 
	var asslastcell = "";
	$(document).on('focusout','#AssTable input',function(){
		$("#AssTable").jqGrid("saveCell",asslastrow,asslastcell);
	})
	$("#AssTable").jqGrid({
		datatype : "local",
		colNames : [ '操作','往来单位id','往来单位name','往来单位','部门id','部门name','部门','职员id','职员name','职员','借方','贷方'],
		colModel : [
            {name : 'handle',index:'handle',align:'center',width:50,sortable:false,formatter:function(cellvalue,options,rowObject){
            	return '<div class="addDiv"><span class="glyphicon glyphicon-plus addRow" title="添加行"></span><span class="glyphicon glyphicon-trash delRow" title="删除行"></span></div>'
            }},
            {name : 'uid',index : 'uid',hidden:true},
            {name : 'unitsname',index : 'unitsname',hidden:true},
			{name : 'units',index : 'units',align:'center',sorttype:"int",width:150,editable:false,sortable:false,formatter:function(cellvalue, options, rowObject){
            	return '<input class="unitsInput" type="text" readonly/><span class="addunits glyphicon glyphicon-plus"></span>'
			}},
			{name : 'did',index : 'did',hidden:true},
			{name : 'departname',index : 'departname',hidden:true},
			{name : 'depart',index : 'depart',align:'center',width:150,sortable:false,formatter:function(cellvalue, options, rowObject){
            	return '<input class="departInput" type="text" readonly/><input class="departInputId" type="hidden"/><span class="adddepart glyphicon glyphicon-plus"></span>'
			}},
			{name : 'cid',index : 'cid',hidden:true},
			{name : 'clerkname',index : 'clerkname',hidden:true},
			{name : 'clerk',index : 'clerk',align:'center',width:150,sortable:false,formatter:function(cellvalue, options, rowObject){
            	return '<input class="clerkInput" type="text" readonly/><span class="addclerk glyphicon glyphicon-plus"></span>'
			}},
			{name : 'debit',index : 'debit',align:'center',width:150,sortable:false,formatter:'number',editable:true},
			{name : 'credit',index : 'credit',align:'center',width:150,sortable:false,formatter:'number',editable:true}
		],
		rowNum : 20,
		cellEdit:true,
		cellsubmit: 'clientArray',
		rowList : [ 20, 50, 100 ],
//		sortname : 'id',
		styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
		viewrecords : true,
		autowidth : true,
		multiselect : false,
		multiboxonly : false,
//		sortorder : "asc",
		sortable:false,
		height : '270',
		caption : "辅助信息",
		loadComplete:function(data){
			if(!data.rows.length){
				$(this).jqGrid('addRowData',0, {'handle':'','units':'','depart':'','clerk':'','debit':'','credit':''}, 'last' );
			}
		},
		beforeEditCell:function(rowid,cellname,v,iRow,iCol){
			asslastrow = iRow; 
			asslastcell = iCol;
		},
		afterEditCell:function(rowid,name,val,iRow,iCol){
		},
		onCellSelect:function(id,index,e){//点击单元格事件
		},
		afterSaveCell:function(rowid,name,val,iRow,iCol){
			if(iCol==10){
				$('#AssTable').jqGrid('setCell',rowid,'credit',0)
			}else if(iCol==11){
				$('#AssTable').jqGrid('setCell',rowid,'debit',0)
			}
		}
	});
}
$(document).on('click', '.addRow',function(){
	var id = $("#AssTable").jqGrid("getGridParam", "selrow");//
	var ids = $('#AssTable').jqGrid('getDataIDs');
	var maxid=(ids.length ==0 ) ? 0 : Math.max.apply(Math,ids);
	$('#AssTable').jqGrid('addRowData',maxid+1, {'handle':'','units':'','depart':'','clerk':'','debit':'','credit':''},'after',id);
})
$(document).on('click','.delRow',function(){
	var rowId=$("#AssTable").jqGrid("getGridParam", "selrow");//
	if($('#AssTable tbody tr').length==2) {
		$.zxsaas_plus.showalert("warning","至少保留一条数据!")
		return false;
	}
	$.zxsaas_plus.showconfirm("","是否确定删除本行?",function(){
		$("#AssTable").jqGrid('delRowData', rowId);
	},function(){});
})

$(document).on('click','.addunits',function(){
	$units=$(this);
    $('#contactsUnitModal').next('.showBox').trigger('click')
})


$(document).on('click','.adddepart',function(){
	$depart=$(this);
    $('#fuzhuDepartModal').parent().find('button').trigger('click')
})


$(document).on('click','.addclerk',function(){
	$clerk=$(this);
    $('#employeeModal').parent().find('button').trigger('click')
})


