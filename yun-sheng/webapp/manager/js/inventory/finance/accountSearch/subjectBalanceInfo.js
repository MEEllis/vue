$(function () {
    var projectId = 943;
    init();

    //初始化
    function init() {
        initCom();
        initBindEvent();
    }

    //初始化组件
    function initCom() {
        defaultInit();
        var lastYear = (new Date($("#startDate").val())).getFullYear();
        loadSubCode(lastYear);
        loadSectionName();
    }

    //加载业务部门
    function loadSectionName(){
    	 //载入 部门组件
        $('#sectionName').storePlu({
            isLoadDefaultName: false,
            checkMore: true,
            search: false,
            ifStore: false // 控制部门选项
        });
        // 是否可以 点击业务部门 ,  0 是不能点击 ，1 是可以点击
        var sectionNameShowBox = $("#sectionName").siblings(".showBox");
        var sectionNamechildren = sectionNameShowBox.children(".btn-default");
        if(status==0){
        	sectionNamechildren.attr("disabled","disabled");
        	sectionNameShowBox.off("click");
        }else{
        	sectionNamechildren.removeAttr("disabled")
        }
    }
    
    //加载科目编码
    function loadSubCode(lastYear) {
        $("#beginSubCode").comSubjectCode({
            currentAccountingYear: lastYear
        });
        $("#endSubCode").comSubjectCode({
            currentAccountingYear: lastYear
        });
    }

    //绑定事件
    function initBindEvent() {
        //查询事件
        $('#search').click(function () {
            var params = getSearchParams();
            var url = '/manager/finance/loadSubjectBalaceInfo'
            searchDetail(params, url,projectId);
        });
        //重置
        $("#resetForm").click(function () {
        	location.reload();
        });

        //导出
        $('.export').click(function () {
            var options = getSearchParams();
            functionObjExtent.construtForm('', options)
        });


    }

    //获取参数
    function getSearchParams() {
        var beginTime = $("#startDate").val();
        var endTime = $("#endDate").val();
        var beginGrade = $("#beginGrade").val();
        var endGrade = $("#endGrade").val();
        var sectionIds = $("#sectionName").data("sectionId") || "";
        var beginSubCode = $("#beginSubCode").val();
        var endSubCode = $("#endSubCode").val();
        var isOnlyEndSubject = $("#searchQuery .isOnlyEndSubject").is(":checked") ? "1" : "0";
        var isDisabled = $("#searchQuery input[name='isDisabled']").is(":checked") ? "1" : "0";
        var isContained = $("#searchQuery input[name='isContained']").is(":checked") ? "1" : "0";
        
        //如果选择了只查询末级科目 ， 需要对科目层次 制空
        if(isOnlyEndSubject==1){
        	beginGrade=null;
        	endGrade=null;
        }
        
        return {
            beginTime: beginTime,
            endTime: endTime,
            beginGrade: beginGrade,
            endGrade: endGrade,
            sectionIds: sectionIds,
            beginSubCode: beginSubCode,
            endSubCode: endSubCode,
            isOnlyEndSubject: isOnlyEndSubject,
            isDisabled: isDisabled,
            isContained: isContained,

        };
    }

    //加载日期
    function loadDate() {
        var lastYear = null;
        $("#startDate").comDateAccounting({
            endDateId: "#endDate",
            changeDateBack: function () {
                var year = (new Date($("#startDate").val())).getFullYear();
                if (lastYear != year) {
                    lastYear = year;
                    loadSubCode(lastYear);
                }

            }
        });
        lastYear = (new Date($("#startDate").val())).getFullYear();
    }

    //默认科目层次 选中
    function defaultInit() {
        loadDate();
        $("#searchQuery .isOnlyEndSubject").removeAttr("checked");
        $("#searchQuery .isOnlySubject").attr("checked", "checked");
        $("#searchQuery input[name='isContained']").attr("checked", "checked");
        $("#beginGrade").prop('selectedIndex', 0);
        $("#endGrade").prop('selectedIndex', 0);
    }
    function searchDetail(params, url) {
        commonModular.searchDetail(params,url, {
            projectId: projectId,
            isEnableSub:params.isEnableSub
        },{
            footerrow:true,
            headCallback:function () {
        	   $("#rpGrid").setLabel("borrowBeginAmount","借方");
        	   $("#rpGrid").setLabel("loanBeginAmount","贷方");
        	   $("#rpGrid").setLabel("borrowAmount","借方");
        	   $("#rpGrid").setLabel("loanAmount","贷方");
        	   $("#rpGrid").setLabel("borrowAmountSum","借方");
        	   $("#rpGrid").setLabel("loanAmountSum","贷方");
        	   $("#rpGrid").setLabel("borrowEndAmount","借方");
        	   $("#rpGrid").setLabel("loanEndAmount","贷方");
        	 
        	
                $("#rpGrid").jqGrid('setGroupHeaders', {
                    useColSpanStyle: true,
                    groupHeaders: [
                        {startColumnName: 'borrowBeginAmount', numberOfColumns: 2, titleText: '期初余额'},
                        {startColumnName: 'borrowAmount', numberOfColumns: 2, titleText: '本期发生'},
                        {startColumnName: 'borrowAmountSum', numberOfColumns: 2, titleText: '本年累计'},
                        {startColumnName: 'borrowEndAmount', numberOfColumns: 2, titleText: '期末余额'},
                    ]
                });
            },
            ondblClickRow: function (rowid, iRow, iCol, e) {
                var sectionName=$("#sectionName").val()
                var curData = $("#rpGrid").getRowData(rowid) || {}
                var curSubjectCode = $.trim(curData.subjectCode)
                if (curSubjectCode != '') {
                    var params = getSearchParams();
                    var goUrl= encodeURI("/manager/finance/subjectDetailInfo?beginTime="
                        + params.beginTime + '&endTime=' + params.endTime
                        + '&beginGrade=' + params.beginGrade + '&endGrade=' + params.endGrade
                        + '&isOnlyEndSubject=' + params.isOnlyEndSubject
                        + '&skip=1'
                        + '&sectionIds=' + params.sectionIds
                        + '&sectionName=' + sectionName
                        + '&isDisabled=' + params.isDisabled
                        + '&isContained=' + params.isContained
                        + '&curSubjectCode=' + curSubjectCode)
                    window.parent.openWorkBoxByMenutext('科目明细账',goUrl, true);

                }
            },
            callback:function (data) {
                var info = data.data.rows;
                $.each(info, function (i, detailItem) {
                    // 期初
                    if (detailItem.ifSumRow == 1) {
                        $("#rpGrid").jqGrid('setRowData', i + 1, {
                           // summary: "期初余额",
                           // subjectClassName: detailItem.subjectClassName + "（小计）"
                        }, {"font-weight": 600});
                    }
                    //本月合计
                    else if (detailItem.ifSumRow == 2) {
                        $("#rpGrid").jqGrid('setRowData', i + 1, {
                          //  summary: "本月合计"
                        }, {"background-color": "#E9F2FE"});
                    }
                    //本年累计
                    else if (detailItem.ifSumRow == 3) {
                        $("#rpGrid").jqGrid('setRowData', i + 1, {
                          //  summary: "本年累计"
                        }, {"background-color": "#FCE8D7"});
                    }
                })
            	commonModular.resizeJgGrid();
            }
        });
    }


    $(function(){
        $(window).resize(function(){
        	commonModular.resizeJgGrid();
        });
    });

    
    /**
     * 导出
     */
    $("#export").click(function(){
    	  var beginTime = $("#startDate").val();
          var endTime = $("#endDate").val();
          var beginGrade = $("#beginGrade").val();
          var endGrade = $("#endGrade").val();
          var sectionIds = $("#sectionName").data("sectionId") || "";
          var beginSubCode = $("#beginSubCode").val();
          var endSubCode = $("#endSubCode").val();
          var isOnlyEndSubject = $("#searchQuery .isOnlyEndSubject").is(":checked") ? "1" : "0";
          var isDisabled = $("#searchQuery input[name='isDisabled']").is(":checked") ? "1" : "0";
          var isContained = $("#searchQuery input[name='isContained']").is(":checked") ? "1" : "0";
          
          //如果选择了只查询末级科目 ， 需要对科目层次 制空
          if(isOnlyEndSubject==1){
          	beginGrade='';
          	endGrade='';
          }
    	
        window.location.href= "/manager/finance/subject/export/2?page=1&beginTime="+beginTime+'&endTime='+endTime+'&sectionIds='
			+sectionIds+'&beginSubCode='+beginSubCode+'&endSubCode='+endSubCode+'&isContained='+isContained+'&isDisabled='+isDisabled
			+'&beginGrade='+beginGrade+'&endGrade='+endGrade+'&isOnlyEndSubject='+isOnlyEndSubject;
   	});
    
    
});



