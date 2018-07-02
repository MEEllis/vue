$(function () {
    var projectId = 964;
    var searchParam=null; //最后一次的查询条件
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
        //载入 部门组件
        loadSectionName()
     
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
        	 searchParam = getSearchParams();
             var url = '/manager/finance/getSubjectLedgerPageList';
             if(searchParam.isEnableSub==1){
            	 
            	 var dropDom=$("#subjectWrapSelect");
                 //载入 科目下拉框
        		 $.ajax({
                     url: "/manager/finance/getSubjectLedgerList",
                     type: 'POST',
                     dataType: "json",
                     data:searchParam,
                     success: function (data) {
        			 	if(data.result==1){
        			 		var List = data.data.subjectList;
                            dropDom.html("");
                            var pushArr = [];
                            for (var i = 0; i<List.length; i++) {
                                var item = List[i];
                                pushArr.push($("<option value='" + item.subjectCode + "' >"+item.subjectCode +" " + item.subjectName + "</option>"));
                            }
                            dropDom.append(pushArr);
                            searchParam.subjectCode=dropDom.val();
                            dropDom.find("option:selected").text()
                            $(".gridTitle").text(dropDom.find("option:selected").text()+"总账");
                            
                            searchDetail(searchParam, url, projectId);
        			 	}
        			 	else{
        			 		jQuery("#rpGrid").jqGrid("clearGridData");
        			 	   $.zxsaas_plus.showalert("提示", data.desc);
        			 	}
                     }
                 });
             }
             else{
            	 $(".gridTitle").text("科目总账");
            	 searchDetail(searchParam, url, projectId);
             }
             
        });
        //重置
        $("#resetForm").click(function () {
        	location.reload();
        });

        //导出
        $('.export').click(function () {
        	var param=null;
        	if(searchParam==null){
        		params = getSearchParams();
        	}else{
        		params = searchParam;
        	}
        	
            functionObjExtent.construtForm('/manager/finance/export ', params)
        });
        
        //科目过滤
        $("#subjectWrapSelect").on("change",function(){
             var url = '/manager/finance//getSubjectLedgerPageList';
             searchParam.subjectCode=$("#subjectWrapSelect").val();
             searchDetail(searchParam, url, projectId);
             $(".gridTitle").text($("#subjectWrapSelect").find("option:selected").text()+"总账");
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
        var isLeiJi = $("#searchQuery input[name='isLeiJi']").is(":checked") ? "1" : "0";
        var isFilter = $("#searchQuery input[name='isFilter']").is(":checked") ? "1" : "0";
        var subjectCode = $("#subjectWrapSelect").val();
        if(isFilter==1){
            $(".subject-wrap").show();
        }else{
            $(".subject-wrap").hide();
            subjectCode=null;
        }
        
        //如果选择了只查询末级科目 ， 需要对科目层次 制空
        if(isOnlyEndSubject==1){
        	beginGrade=null;
        	endGrade=null;
        }
        
        return {
           
            startAccountingPeriod: beginTime,
            endAccountingPeriod: endTime,
            subjectStartCode: beginSubCode,
            subjectEndCode: endSubCode,
            startLevel: beginGrade,
            endLevel: endGrade,
            isLeaf: isOnlyEndSubject,
            sectionIds: sectionIds,

            isDisabled: isDisabled,
            isContained: isContained,
            isShowTotal: isLeiJi,
            isEnableSub: isFilter,

        
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
        //清除选中
        $("#searchQuery .isOnlyEndSubject").removeAttr("checked");
        $("#searchQuery input[name='isDisabled']").removeAttr("checked");
        $("#searchQuery input[name='isContained']").removeAttr("checked");
        $("#searchQuery input[name='isLeiJi']").removeAttr("checked");
        $("#searchQuery input[name='isFilter']").removeAttr("checked");
        //默认选中
        $("#searchQuery .isOnlySubject").attr("checked", "checked");
        $("#searchQuery input[name='isContained']").attr("checked", "checked");
        $("#searchQuery input[name='isLeiJi']").attr("checked", "checked");
        $("#beginGrade").prop('selectedIndex', 0);
        $("#endGrade").prop('selectedIndex', 0);
        $("#subjectWrapSelect").prop('selectedIndex', 0);
    }

    function searchDetail(params, url) {
        commonModular.searchDetail(params, url, {
            projectId: projectId,
            isEnableSub:params.isEnableSub
        }, {
            headCallback: function () {

            },
            callback: function (data) {
                var info = data.data.rows;
                $.each(info, function (i, detailItem) {
                    // 期初
                    if (detailItem.ifSumRow == 1) {
                        $("#rpGrid").jqGrid('setRowData', i + 1, {
                           // summary: "期初余额",
                           //  subjectClassName: detailItem.subjectClassName + "（小计）"
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
                         //   summary: "本年累计"
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

    
});



