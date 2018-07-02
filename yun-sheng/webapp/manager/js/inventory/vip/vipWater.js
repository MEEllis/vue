var projectId
$(function () {
    $.jgrid.defaults.width = 1280;
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';

    //客户信息
    $('#vipInfo').vipPlu({
        gridLocation:'left',
        defaultBtnText:"客户信息:",
        changeVip: findVip,
    })

    initVip();

    $(window).resize(function() {
        initVip();
    });

	getCustomProject('积分流水')

	//列设置
	$('.lineSet').click(function(){
		$('#lineSet-modal').modal('show');
		$("#lineSetGrid").jqGrid('setGridParam', {
			url :'/manager/erp/projectAndColumn/getColumns',
			postData:{
				'rpMainId': projectId
			}
		}).trigger("reloadGrid");
	})

	/**
	 * 导出
	 */
	$('#export').click(function () {
		var url = '/manager/inventory/vip/report/selectVipScoreFlowExport?rpMainId='+projectId+'&vipId='+$('#vipInfo').data('id');
		window.location.href= url;
	})

	//列设置表格
	$("#lineSetGrid").jqGrid({
		mtype:"POST",
		datatype : "json",
		viewrecords:true,
		rowNum : 400,
		width: "100%" ,
		height: $(window).height()*0.55,
		colNames:['id','报表列字段','是否显示','code'],
		colModel:[
			{name:"id",width:'150px',align:"center",sortable:false,hidden:true},
			{name:"name",width:'150px',align:"center",sortable:false},
			{name:"isShow",width:'150px',align:"center",sortable:false,formatter: "checkbox",formatoptions:{disabled:false},edittype:'checkbox',editoptions:{value:'1:0'}},
			{name:"code",width:'150px',align:"center",sortable:false,hidden:true},
		],
		jsonReader: {
			repeatitems: false,
			root:'data.columnVoList',
		},
		gridComplete:function(){
			$('table th').css('text-align','center')
			$('#lineSetGrid')
		},
	});

    function initVip(){
        var w = $('.wbox').width();
        w += 80;
        $('#vipBox').css({'position':'absolute','left': -w,'top': '7px'});
        $('.vipName').hide();
        $('label[for="retailCardNum"]').eq(1).text('姓名:');
        $('label[for="retailCardNum"]').eq(2).text('手机号码:');
        $('label[for="retailCardNum"]').eq(3).text('会员类型:');
        $('label[for="retailCardNum"]').eq(4).text('当前积分:');
    }

    function findVip(data){
        if(data == undefined){
            $('.vipnone').show();
        }else{
            $('.vipnone').hide();
            $('#vipType').text(data.vipName);
            $('#vipCode').text(data.vipPhone);
            $('#vipScore').text(data.cardTypeName);
            $('#vipAmount').text(data.score);
            $('#vipInfo').data('id',data.id);
        }
    }


    // 查询
    $('#search').click(function () {
        var url = '/manager/inventory/vip/report/selectScoreFlowList'
        var params = {
            'vipId': $('#vipInfo').data('id'),
        }
        searchDetail(params, url, {})
    })

})

//公共查询方法
function searchDetail(params, url, options) {
    $('.notFounImgBox').hide()
    $('#rpContainer').show()
    $('.loadingImgBox').show()
    $('#promptBox').hide()
    var def = {
        multiselect: true, //是否多选
        sortable: true,//是否排序
        merge: false,//是否合并
        gotoable: false,//是否跳转
        rows: '100'//默认数量
    }
    def = $.extend({}, def, options)
    var alignArr = ['', 'left', 'center', 'right'];
    $.ajax({
        url: '/manager/finance/common/getReportHead',
        dataType: 'json',
        type: 'post',
        data: {
            'projectId': projectId,
        },
        success: function (data) {
            if (data.result == '-999') {
                $('#rpContainer').hide()
                $('.notFounImgBox').hide()
                return
            }
            var colName = [];
            var colModel = [];
            var groupHeader = [];
            var mergeArr = [];
            var complexData = {
                colName: colName,
                colModel: colModel,
                groupHeader: groupHeader
            };
            $.each(data.data.colModel, function (k, v) {
                colName.push(v.defualname);
                colModel.push({
                    name: v.code,
                    index: v.code,
                    width: v.columnSize,
                    align: alignArr[v.align],
                    hidden: !v.isShow,
                    id: v.id,
                    sortable: def.sortable,
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        return 'id=\'' + v.code + rowId + "\'";
                    }
                });
            });

            $.jgrid.gridUnload("rpGrid");

            $("#rpGrid").jqGrid({
                mtype: "POST",
                url: url,
                postData: params,
                datatype: "json",
                shrinkToFit: false,
                pager: "#rpGridPager",
                rowNum: def.rows,
                rowList: [100,200,500],
                autowidth: true,
                rownumbers: true, // show row numbers
                rownumWidth: 50, // the width of the row numbers columns
                width: "100%",
                height: $(window).height() * 0.55,
                sortable: def.sortable,
                viewrecords: true,
                sortorder: "desc",
                colNames: colName,
                footerrow: true,
                userDataOnFooter: true,
                colModel: colModel,
                multiselect: def.multiselect,
                jsonReader: {
                    repeatitems: false,
                    root: 'data.rows',
                    total: 'data.total',
                    page: 'data.page',
                    records: 'data.records'
                },
                gridComplete: function () {
                    $('table th').css('text-align', 'center')
                    $('#rpGrid').resize()

                    if (mergeArr.length > 0 && def.merge) {
                        Merger("rpGrid", mergeArr);
                    }
                },
                onCellSelect: function (rowid, index, contents, event) {

                },
                loadComplete: function (data) {
                    $('#rpGrid').resize()
                    if (Object.keys(data.data).length == 0 ) {
                        $('#rpContainer').hide()
                        $('.loadingImgBox').hide()
                        $('.notFounImgBox').show()

                    } else {
                        $('.loadingImgBox').hide()
                        $('.notFounImgBox').hide()
                        $('#rpContainer').show()
                    }
                    //分页滚动条 置顶
                    $("#rpGrid").parents(".ui-jqgrid-bdiv")[0].scrollTop = 0;
                },
                ondblClickRow: function (id) {

                },
            });
        }
    })
}