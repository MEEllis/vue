$(function () {
    var projectId = 1155; //工程id
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

            var url = '/manager/finance/loadAuxiliaryBalaceInfo';
            searchParam = getSearchParams();
            if(checkParam(searchParam)===false){
                return;
            }
            var txt='';

            if(searchParam.isSelectUnit==1){
                txt+='往来';
            }
            if(searchParam.isSelectSection==1){
                txt+='部门';
            }
            if(searchParam.isSelectEmployee==1){
                txt+='职员';
            }
            if(searchParam.isEnableSub==1){
                txt+='科目';
            }
            var showTxt='';
            if(txt!=''){
                showTxt=txt+' 余额表'
            }else{
                showTxt=$('title').text().trim();
            }
            $('.fiter-wrap').hide();
            $(".gridTitle").text(showTxt);
            if(searchParam.isEnableSub==1 || searchParam.isEnableUnit==1
                || searchParam.isEnableSection==1 || searchParam.isEnableEmployee==1
            ){
                $('.fiter-wrap').show()
                //载入 科目下拉框
                $.ajax({
                    url: "/manager/finance/loadAuxiliaryDetailTableFilter/2",
                    type: 'POST',
                    dataType: "json",
                    data:searchParam,
                    success: function (data) {
                        if(data.result==1){
                            var subjectList = data.data.subjectList||[];//科目
                            var unitList = data.data.unitList||[];//往来单位
                            var sectionList = data.data.sectionList||[];//辅助部门
                            var employeeList = data.data.employeeList||[];//职员
                            var subjectWrapSelect=$("#subjectWrapSelect");
                            var unitWrapSelect=$("#unitWrapSelect");
                            var sectionWrapSelect=$("#sectionWrapSelect");
                            var employeeWrapSelect=$("#employeeWrapSelect");

                            loadSel(subjectWrapSelect,subjectList,'subjectCode')
                            loadSel(unitWrapSelect,unitList,'unitId')
                            loadSel(sectionWrapSelect,sectionList,'sectionId')
                            loadSel(employeeWrapSelect,employeeList,'employeeId')


                            searchDetail(searchParam, url, projectId);

                            function loadSel(dom,list,key){
                                dom.html("");
                                dom.closest('.form-group').hide();
                                if(list.length>0){
                                    var pushArr = [];
                                    for (var i = 0; i<list.length; i++) {
                                        var item = list[i];
                                        if(item==null){
                                            return;
                                        }
                                        if(key=='subjectCode'){
                                            pushArr.push($("<option value='" + item.id + "' >" +item.id +" "+ (item.name||'') + "</option>"));
                                        }else{
                                            pushArr.push($("<option value='" + item.id + "' >"+ (item.name||'') + "</option>"));
                                        }

                                    }
                                    dom.append(pushArr);
                                    var cc=function(){
                                        searchParam[key]=dom.val();
                                        dom.closest('.form-group').show();
                                    }
                                    if(searchParam.isEnableSub==1 && key=='subjectCode'){
                                        cc()
                                    }

                                    if(searchParam.isEnableUnit==1 && key=='unitId'){
                                        cc()
                                    }
                                    if(searchParam.isEnableSection==1 && key=='sectionId'){
                                        cc()
                                    }
                                    if(searchParam.isEnableEmployee==1 && key=='employeeId'){
                                        cc()
                                    }


                                }

                            }
                        }
                        else{
                            jQuery("#rpGrid").jqGrid("clearGridData");
                            $.zxsaas_plus.showalert("提示", data.desc);
                        }
                    }
                });
            }
            else{
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

            if(checkParam(searchParam)===false){
                return;
            }

            functionObjExtent.construtForm('', params)
        });

        //科目过滤
        $("#subjectWrapSelect,#unitWrapSelect,#sectionWrapSelect,#employeeWrapSelect").on("change",function(){
            var url = '/manager/finance/loadAuxiliaryBalaceInfo';
            searchParam.subjectCode=$("#subjectWrapSelect").val()||'';
            searchParam.unitId=$("#unitWrapSelect").val()||'';
            searchParam.sectionId=$("#sectionWrapSelect").val()||'';
            searchParam.employeeId=$("#employeeWrapSelect").val()||'';
            searchDetail(searchParam, url, projectId);
        });

        $("#searchQuery input[name='contactsunitName'] , #searchQuery input[name='sectionInfo'],#searchQuery input[name='employeeInfo']").on('click',function(){
            var $this=$(this);
            var name=$this.attr('name');
            $("#selPlan").val('-1');
            //清空输入框的内容
            $("#"+name).val('').removeData();;
            //过滤表头
            var filter = $("#searchQuery input[name='"+name+"Filter']");
            filter.removeAttr("checked");// 去掉过滤表头的选择
            var buttonWrap=$("#"+name).siblings('span');
            //按钮
            var button=buttonWrap.find('button');
            if($this.is(':checked')){
                filter.prop('disabled',false);
                button.prop('disabled',false);
            }else{
                filter.prop('disabled',true);
                button.prop('disabled',true);
            }
        })
        //查询方案
        $("#selPlan").on("change",function(){
            var $this = $(this);
            var planKey=$this.val();
            var tarArr=['contactsunitName','sectionInfo','employeeInfo']
            if(planKey!='-1'){
                for(var i=0;i<tarArr.length;i++){
                    if(planKey.indexOf(i)>-1){
                        if(!$("#searchQuery input[name='"+tarArr[i]+"']").is(':checked')){
                            //选择 方案
                            $("#searchQuery input[name='"+tarArr[i]+"']").trigger('click');
                        }
                        //不过滤科目
                        if( planKey.indexOf(i)==planKey.lastIndexOf(i)){
                            $("#searchQuery input[name='isFilter']").attr('checked','checked')
                        }
                        //过滤科目
                        else{
                            $("#searchQuery input[name='isFilter']").removeAttr('checked');
                        }
                    }
                    else{
                        if($("#searchQuery input[name='"+tarArr[i]+"']").is(':checked')){
                            $("#searchQuery input[name='"+tarArr[i]+"']").trigger('click');
                        }
                    }


                }
                $this.val(planKey)
            }
        });

        //检查参数
        function checkParam(searchParam) {
            if(searchParam.isSelectSection==0&&searchParam.isSelectEmployee==0&&searchParam.isSelectUnit==0){
                $.zxsaas_plus.showalert("提示", '往来单位,辅助部门,职员必须选一个！');
                return false;
            }
            return true;
        }
    }

    //获取参数
    function getSearchParams() {
        var beginTime = $("#startDate").val();
        var endTime = $("#endDate").val();
        var sectionIds = $("#sectionName").data("sectionId") || "";
        var beginSubCode = $("#beginSubCode").val();
        var endSubCode = $("#endSubCode").val();
        var isDisabled = $("#searchQuery input[name='isDisabled']").is(":checked") ? "1" : "0";
        var isContained = $("#searchQuery input[name='isContained']").is(":checked") ? "1" : "0";
        var isLeiJi = $("#searchQuery input[name='isLeiJi']").is(":checked") ? "1" : "0";
        var isFilter = $("#searchQuery input[name='isFilter']").is(":checked") ? "1" : "0";
        var unitInfo =$('#contactsunitName').data('contactUnitId');
        var sectionInfo =$('#sectionInfo').data('sectionId');
        var employeeInfo =$('#employeeInfo').data('employeeId');
        //部门
        var isSelectSection = $("#searchQuery input[name='sectionInfo']").is(":checked") ? "1" : "0";
        //员工
        var isSelectEmployee = $("#searchQuery input[name='employeeInfo']").is(":checked") ? "1" : "0";
        //往来单位
        var isSelectUnit = $("#searchQuery input[name='contactsunitName']").is(":checked") ? "1" : "0";
        var isEnableUnit = $("#searchQuery input[name='contactsunitNameFilter']").is(":checked") ? "1" : "0";
        var isEnableSection = $("#searchQuery input[name='sectionInfoFilter']").is(":checked") ? "1" : "0";
        var isEnableEmployee = $("#searchQuery input[name='employeeInfoFilter']").is(":checked") ? "1" : "0";
        return {
            rows:100,
            page:1,
            beginTime: beginTime,
            endTime: endTime,
            sectionIds:sectionIds,
            beginSubCode:beginSubCode,
            endSubCode:endSubCode,
            isContained:isContained,
            isDisabled:isDisabled,
            isShowTotal:isLeiJi,
            isEnableSub:isFilter,
            unitInfo:unitInfo,
            sectionInfo:sectionInfo,
            isEnableUnit:isEnableUnit,
            isEnableSection:isEnableSection,
            isEnableEmployee:isEnableEmployee,
            employeeInfo:employeeInfo,
            isSelectSection:isSelectSection,
            isSelectEmployee:isSelectEmployee,
            isSelectUnit:isSelectUnit,
            unitId:'',
            sectionId:'',
            employeeId:'',
            subjectCode:'',
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

    function defaultInit() {
        loadDate();
        //载入往来单位
        $('#contactsunitName').contactUnitPlu({
            checkMore: true,
            search:false
        }).siblings('span').find('button').prop('disabled',true);

        //载入 辅助部门
        $('#sectionInfo').storePlu({
            isLoadDefaultName: false,
            checkMore: true,
            search: false,
            ifStore: false // 控制部门选项
        }).siblings('span').find('button').prop('disabled',true);

        //载入 经手人
        $("#employeeInfo").funStoreSales({
            checkMore: true
        }).siblings('span').find('button').prop('disabled',true);
    }
    function searchDetail(params, url) {
        commonModular.searchDetail(params,url, {
            projectId: projectId,
            isEnableSub:params.isEnableSub,
            isSelectSection:params.isSelectSection,
            isSelectEmployee:params.isSelectEmployee,
            isSelectUnit:params.isSelectUnit,
            isEnableUnit:params.isEnableUnit,
            isEnableSection:params.isEnableSection,
            isEnableEmployee:params.isEnableEmployee,
        },{
            footerrow:true,
            headCallback:function () {

            },

            ondblClickRow: function (rowid, iRow, iCol, e) {
                var sectionName=$("#sectionName").val()
                var contactsunitName=$("#contactsunitName").val()
                var sectionInfo=$("#sectionInfo").val()
                var employeeInfo=$("#employeeInfo").val()
                var selPlan=$("#selPlan").val()
                var curData = $("#rpGrid").getRowData(rowid) || {}
                var curEmployeeId = $('#employeeInfo').data('employeeId') || ''
                var curUnitId =$('#contactsunitName').data('contactUnitId') || ''
                var curSubjectCode = $.trim(curData.subjectCode)
               var curSectionId = $('#sectionInfo').data('sectionId')|| "";
                if (curSubjectCode != '') {
                    var params = getSearchParams();
                    var goUrl= encodeURI("/manager/finance/auxiliaryDetailInfo?beginTime="
                        + params.beginTime + '&endTime=' + params.endTime

                        + '&sectionName=' + sectionName
                        + '&isShowTotal=' + params.isShowTotal
                        + '&isEnableSub=' + params.isEnableSub

                        + '&isEnableUnit=' + params.isEnableUnit
                        + '&isEnableSection=' + params.isEnableSection
                        + '&isEnableEmployee=' + params.isEnableEmployee
                        + '&selPlan=' + selPlan

                        + '&contactsunitName=' +contactsunitName
                        + '&sectionInfo=' + sectionInfo
                        + '&employeeInfo=' + employeeInfo

                        + '&isSelectSection=' + params.isSelectSection
                        + '&isSelectEmployee=' + params.isSelectEmployee
                        + '&isSelectUnit=' + params.isSelectUnit
                        + '&skip=1'
                        + '&isOnlyEndSubject=' + params.isOnlyEndSubject
                        + '&isDisabled=' + params.isDisabled
                        + '&isContained=' + params.isContained
                        + '&curEmployeeId=' + curEmployeeId
                        + '&curUnitId=' + curUnitId
                        + '&curSectionId=' + curSectionId
                        + '&curSubjectCode=' + curSubjectCode)
                    window.parent.openWorkBoxByMenutext('辅助明细账',goUrl , true);

                }
            },
            callback:function (data) {
                var info = data.data.rows;
                $.each(info, function (i, detailItem) {
                    //科目小计
                    if (detailItem.ifSumRow == 1) {
                        $("#rpGrid").jqGrid('setRowData', i + 1, {
                            //subjectName: detailItem.subjectName + "（小计）"
                        }, {});
                    }
                    //往来单位小计
                    else if (detailItem.ifSumRow == 2) {
                        $("#rpGrid").jqGrid('setRowData', i + 1, {
                          //  subjectCode:"" ,
                           // subjectName:"" ,
                          //  unitName: detailItem.unitName + "（小计）"
                        }, {"background-color": "#E9F2FE"});
                    }
                    //部门小计
                    else if (detailItem.ifSumRow == 3 || detailItem.ifSumRow == 4) {
                        $("#rpGrid").jqGrid('setRowData', i + 1, {
                         //   subjectCode:"" ,
                          //  subjectName:"" ,
                         //   unitName:"",
                         //   sectionName: detailItem.sectionName + "（小计）"
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
        var sectionIds = $("#sectionName").data("sectionId") || "";
        var beginSubCode = $("#beginSubCode").val();
        var endSubCode = $("#endSubCode").val();
        var isDisabled = $("#searchQuery input[name='isDisabled']").is(":checked") ? "1" : "0";
        var isContained = $("#searchQuery input[name='isContained']").is(":checked") ? "1" : "0";
        var isLeiJi = $("#searchQuery input[name='isLeiJi']").is(":checked") ? "1" : "0";
        var isFilter = $("#searchQuery input[name='isFilter']").is(":checked") ? "1" : "0";
        var unitInfo =$('#contactsunitName').data('contactUnitId')==undefined?'':$('#contactsunitName').data('contactUnitId');
        var sectionInfo =$('#sectionInfo').data('sectionId')==undefined?'':$('#sectionInfo').data('sectionId');
        var employeeInfo =$('#employeeInfo').data('employeeId')==undefined?'':$('#employeeInfo').data('employeeId');
        //部门
        var isSelectSection = $("#searchQuery input[name='sectionInfo']").is(":checked") ? "1" : "0";
        //员工
        var isSelectEmployee = $("#searchQuery input[name='employeeInfo']").is(":checked") ? "1" : "0";
        //往来单位
        var isSelectUnit = $("#searchQuery input[name='contactsunitName']").is(":checked") ? "1" : "0";
        var isEnableUnit = $("#searchQuery input[name='contactsunitNameFilter']").is(":checked") ? "1" : "0";
        var isEnableSection = $("#searchQuery input[name='sectionInfoFilter']").is(":checked") ? "1" : "0";
        var isEnableEmployee = $("#searchQuery input[name='employeeInfoFilter']").is(":checked") ? "1" : "0";
        window.location.href= "/manager/finance/auxiliary/export/2?page=1&beginTime="+beginTime+'&endTime='+endTime+'&sectionIds='
			+sectionIds+'&beginSubCode='+beginSubCode+'&endSubCode='+endSubCode+'&isContained='+isContained+'&isDisabled='+isDisabled+'&isShowTotal='+isLeiJi
			+'&isEnableSub='+isFilter+'&unitInfo='+unitInfo+'&sectionInfo='+sectionInfo+'&isEnableUnit='+isEnableUnit+'&isEnableSection='+isEnableSection+
			'&isEnableEmployee='+isEnableEmployee+'&employeeInfo='+employeeInfo+'&isSelectEmployee='+isSelectEmployee+'&isSelectUnit='+isSelectUnit+'&isSelectSection='+isSelectSection;
   	});

});



