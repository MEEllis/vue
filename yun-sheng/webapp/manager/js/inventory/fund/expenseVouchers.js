$(function(){
    init()
    function init(){
        getMonth()
        inpay()
        $('.search').trigger('click')
    }

	//获取摊销月份
	function getMonth(){
		$.ajax({
			url:'/manager/inventory/common/getCompanySupplyChainConfigVo',
			type:'post',
			dataType:'json',
			success:function(data){
			    var mTime=data.data.configVo.systemStartDateStr;
                getAuthList(function () {
                    mTime=mTime.substring(0,7);
                    var currentDate = (new Date(_authList.maxDate)).format("yyyy-MM");
                    $("#startDate").val(currentDate).bootstrapPicker({
                        format: 'yyyy-mm',
                        weekStart: 1,
                        autoclose: true,
                        startView: 3,
                        minView: 3,
                        forceParse: false,
                        startDate:mTime,
                        endDate: currentDate,   //默认当前月
                    })
                })

			}
		})
	}



    function inpay(){
		var type=1;
        $.ajax({
            url:'/manager/inventory/common/getIncomeExpendClassVoList',
            type:'post',
            dataType:'json',
			data:{type:type},
            success:function(data){
                if(data.data.dataList.length > 0){
                    $.each(data.data.dataList,function(k,v){
                        $('#inpayClass').append('<option value="' + v.id + '">' + v.name + '</option>')
                    })

                }
            }
        })
    }
    // 生成会计凭证
    $('.creatAvgDate').click(function(){
        var ids=$('#dataGrid').jqGrid('getGridParam','selarrrow');
        var mainIds=[];
        for(var i=0;i<ids.length;i++){
            var rowData = $("#dataGrid").jqGrid('getRowData', ids[i]);
            mainIds.push(rowData.amortizeId)
        }
        mainIds=mainIds.join(',')
		if(ids.length > 0){
			$.ajax({
				url:'/manager/inventory/fund/generateVouchers',
				type:'post',
				dataType:'json',
				data:{ids:mainIds},
				success:function(data){
					if(data.result == '1'){
                        if(data.executeResult!= ''){
						$.zxsaas_plus.showalert('提示',data.data.executeResult)
						setTimeout(function(){
							$("#dataGrid").trigger("reloadGrid");
						},1500)

                        }
					}


				}
			})
		}else{
			$.zxsaas_plus.showalert('warning','请选择一条数据')
		}

    })

    //部门
    $("#sectionName").storePlu({
        isStoreShow:false,
        isLoadDefaultName:0,
        checkMore: false,
        search: false,
        ifStore: false, // 控制部门选项
        changeStore:function(){
            var id=$("#sectionName").data('sectionId');
            //设置编辑器值
            $("input[name='sectionId']").val(id);

        }
    });


        $("#dataGrid").jqGrid({
            mtype: "POST",
            url: '/manager/inventory/fund/selectAmortizeExpense',
            datatype: "json",
            shrinkToFit: false,
            pager: "#dataGridPager",
            rowList: [100, 200, 500],
            rowNum: 100,
            autowidth: true,
            rownumbers: true, // show row numbers
            rownumWidth: 50, // the width of the row numbers columns
            width: "100%",
            height: $(window).height() * 0.8,
            sortable: false,
            viewrecords: true,
            sortorder: "desc",
            colNames: ['id','摊销明细ID','单据号','单据日期','已摊销月份','分摊月数','往来单位','支出类别id','支出类别','费用归集部门id','费用归集部门','总金额','已摊销金额','待摊销金额','本次摊销金额','凭证号','备注','费用单Id','凭证Id'],
            footerrow: true,
            userDataOnFooter: true,
            colModel: [
                {name: 'id', width: 150, align: 'center', hidden: true},
                {name: 'amortizeId', width: 150, align: 'center', hidden: true},
                {name: 'billsCode', width: 250, align: 'center',classes:'billsCodeStyle'
                    },
                {name: 'billsDateStr', width: 150, align: 'center'},
                {name: 'amortizeDateStr', width: 150, align: 'center'},
                {name: 'avgMonth', width: 150, align: 'center'},
                {name: 'unitName', width: 250, align: 'left'},
                {name: 'inpayClassId', width: 150, align: 'left' , hidden: true},
                {name: 'inpayClassName', width: 150, align: 'left'},
                {name: 'sectionId', width: 150, align: 'left' , hidden: true},
                {name: 'sectionName', width: 150, align: 'left'},
                {name: 'sumAmount', width: 150, align: 'right' ,editrules: {number: true},
                    formatter: 'number',},
                {name: 'amortizedAmount', width: 150, align: 'right', editrules: {number: true},
                    formatter: 'number',},
                {name: 'noAmortizedAmount', width: 150, align: 'right' ,editrules: {number: true},
                    formatter: 'number',},
                {name: 'amount', width: 150, align: 'right', editrules: {number: true},
                    formatter: 'number',},
                {name: 'docWord', width: 150, align: 'center', classes:'billsCodeStyle'},
                {name: 'remark', width: 150, align: 'left'},
                {name: 'billsId', width: 150, align: 'center', hidden: true},
                {name: 'voucherId', width: 150, align: 'center', hidden: true},
            ],
            multiselect: true,
            jsonReader: {
                repeatitems: false,
                root: 'data.dataList',
                total: 'data.total',
                page: 'data.page',
                records: 'data.records'
            },
            gridComplete: function () {
                $('table th').css('text-align', 'center')
                $('#dataGrid').resize()

            },
            onCellSelect: function (rowid, index, contents, event) {
                if($(event.target).attr('aria-describedby') == 'dataGrid_billsCode'){
                var info = $("#dataGrid").getRowData(rowid)
                var billsCode = info.billsCode
                var billsId = info.billsId
                var tarName=event.target.className||'';
                if ( tarName.indexOf('billsCodeStyle') >-1 ) {
                    window.parent.openWorkBoxByMenutext('费用单'," /manager/inventory/expend/expendBill?billsId="+billsId , true);
                }
                }
                if($(event.target).attr('aria-describedby') == 'dataGrid_docWord'){
                    var info = $("#dataGrid").getRowData(rowid)
                    var voucherId = info.voucherId
                    var tarName=event.target.className||'';
                    if ( (tarName.indexOf('billsCodeStyle') >-1)&&(info.docWord !='') ) {
                        window.parent.openWorkBoxByMenutext('填制凭证'," /manager/cw/test/voucher?bId="+voucherId , true);
                    }
                }

            },
            loadComplete: function (data) {
                $('#dataGrid').resize()


                    $('.footrow td:first-child').html('合计');

                    $(".ui-jqgrid-sdiv").show();
                function fmoney(s, n) {
                    n = n > 0 && n <= 20 ? n : 2;
                    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
                    var l = s.split(".")[0].split("").reverse(),
                        r = s.split(".")[1],
                        t = "";
                    for(var i = 0; i < l.length; i ++ )
                    {
                        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
                    }
                    return t.split("").reverse().join("") + "." + r;
                }
                    var sumAmount = $('#dataGrid').getCol('sumAmount', false, 'sum');
                    var amortizedAmount = $('#dataGrid').getCol('amortizedAmount', false, 'sum');
                    var noAmortizedAmount = $('#dataGrid').getCol('noAmortizedAmount', false, 'sum');
                    var amount = $('#dataGrid').getCol('amount', false, 'sum');
                    $('#dataGrid').footerData("set", {
                        "sumAmount": '<font>' + fmoney(sumAmount, 2) + '</font>',
                        "amortizedAmount": '<font  >' + fmoney(amortizedAmount, 2) + '</font>',
                        "noAmortizedAmount": '<font>' + fmoney(noAmortizedAmount, 2) + '</font>',
                        "amount": '<font  >' + fmoney(amount, 2) + '</font>',
                    }, false);


                    //分页滚动条 置顶
                    $("#dataGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;

                    //数据请求成功之后，若果有要操作数据的行为，在这里执行



            },
            ondblClickRow: function (id) {

            },
        });


    //		查询
    $('.search').click(function(){
        var obj = {
            page: 1,
            rows: 100,
            amortizeDateStr:$('#startDate').val(),
            sectionId:$('#sectionName').data('sectionId')||'',
            inpayClassId:$('#inpayClass').val()
        }
        $("#dataGrid").jqGrid("setGridParam",{
            page: 1,
            postData: obj
        }).trigger("reloadGrid");
    });
    $('.reset').click(function(){
        var currentDate = (new Date(_authList.maxDate)).format("yyyy-MM");
        $('#startDate').val(currentDate)
        $('#sectionName').val('')
        $("#sectionName").data('sectionId','')
        $('#inpayClass').val('')

    });

})
