$(function () {
    var projectId = 1026; //工程id
    var searchParam=null; //最后一次的查询条件
    init();

    //初始化
    function init() {
        initCom();
        initBindEvent();

        var skip = functionObjExtent.getQueryString('skip')
        if(skip==1){
            var beginTime = functionObjExtent.getQueryString('beginTime')
            var endTime = functionObjExtent.getQueryString('endTime')
            var isOnlyEndSubject = functionObjExtent.getQueryString('isOnlyEndSubject')
            var sectionName =functionObjExtent.getQueryString('sectionName')
            var isDisabled = functionObjExtent.getQueryString('isDisabled')
            var isContained = functionObjExtent.getQueryString('isContained')
            var curSubjectCode = functionObjExtent.getQueryString('curSubjectCode')


            var isShowTotal = functionObjExtent.getQueryString('isShowTotal')
            var isEnableSub = functionObjExtent.getQueryString('isEnableSub')

            var isEnableUnit = functionObjExtent.getQueryString('isEnableUnit')
            var isEnableSection = functionObjExtent.getQueryString('isEnableSection')
            var isEnableEmployee = functionObjExtent.getQueryString('isEnableEmployee')

            var isSelectSection = functionObjExtent.getQueryString('isSelectSection')
            var isSelectEmployee = functionObjExtent.getQueryString('isSelectEmployee')
            var isSelectUnit = functionObjExtent.getQueryString('isSelectUnit')
            var curEmployeeId = functionObjExtent.getQueryString('curEmployeeId')
            var curUnitId = functionObjExtent.getQueryString('curUnitId')
            var curSectionId = functionObjExtent.getQueryString('curSectionId')

            var contactsunitName = functionObjExtent.getQueryString('contactsunitName')
            var sectionInfo = functionObjExtent.getQueryString('sectionInfo')
            var employeeInfo = functionObjExtent.getQueryString('employeeInfo')
            var selPlan = functionObjExtent.getQueryString('selPlan')


            $("#startDate").val(beginTime);
            $("#endDate").val(endTime);
            $("#sectionName").val(sectionName) ;
            $("#beginSubCode").val(curSubjectCode);
            $("#endSubCode").val(curSubjectCode);
            $("#searchQuery .isOnlyEndSubject").attr("checked",!!Number(isOnlyEndSubject))
            $("#searchQuery .isOnlySubject").attr("checked",!Number(isOnlyEndSubject))
            $("#searchQuery .isDisabled").attr("checked",!!Number(isDisabled))
            $("#searchQuery .isContained").attr("checked",!!Number(isContained))

            $('#contactsunitName').data('contactUnitId',curUnitId)
            $('#sectionInfo').data('sectionId',curSectionId);
            $('#employeeInfo').data('employeeId',curEmployeeId);

            $("#searchQuery input[name='sectionInfo']").attr("checked",!!Number(isSelectSection))
            $("#searchQuery input[name='employeeInfo']").attr("checked",!!Number(isSelectEmployee))
            $("#searchQuery input[name='contactsunitName']").attr("checked",!!Number(isSelectUnit))
            $("#searchQuery input[name='contactsunitNameFilter']").attr("checked",!!Number(isEnableUnit))
            $("#searchQuery input[name='sectionInfoFilter']").attr("checked",!!Number(isEnableSection))
            $("#searchQuery input[name='employeeInfoFilter']").attr("checked",!!Number(isEnableEmployee))
            $("#searchQuery input[name='sectionInfoFilter']").attr("checked",!!Number(isEnableSection))

            $("#searchQuery input[name='isLeiJi']").attr("checked",!!Number(isShowTotal))
            $("#searchQuery input[name='isFilter']").attr("checked",!!Number(isEnableSub))
            $("#contactsunitName").val(contactsunitName)
            $("#sectionInfo").val(sectionInfo)
            $("#employeeInfo").val(employeeInfo)
            $("#selPlan").val(selPlan)


            $('#search').trigger("click")
        }
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

            var url = '/manager/finance/loadAuxiliaryDetailInfo';
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
                showTxt=txt+' 明细账'
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
		                url: "/manager/finance/loadAuxiliaryDetailTableFilter/1",
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
		   			 			
			                    //$(".gridTitle").text(dropDom.find("option:selected").text()+"明细账");
			                    
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
             var url = '/manager/finance/loadAuxiliaryDetailInfo';
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
            $("#"+name).val('').removeData();
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
            headCallback:function () {

            },
            onCellSelect: function (rowid, iCol, contents, event) {
                if (iCol ==7) {

                    var data = $('#rpGrid').getRowData(rowid);

                    window.parent.openWorkBoxByMenutext('填制凭证',basePath + '/cw/test/voucher?bId='+ data.voucherId,true);

                }
            },
            callback:function (data) {
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
         window.location.href= "/manager/finance/auxiliary/export/1?page=1&beginTime="+beginTime+'&endTime='+endTime+'&sectionIds='
			+sectionIds+'&beginSubCode='+beginSubCode+'&endSubCode='+endSubCode+'&isContained='+isContained+'&isDisabled='+isDisabled+'&isShowTotal='+isLeiJi
			+'&isEnableSub='+isFilter+'&unitInfo='+unitInfo+'&sectionInfo='+sectionInfo+'&isEnableUnit='+isEnableUnit+'&isEnableSection='+isEnableSection+
			'&isEnableEmployee='+isEnableEmployee+'&employeeInfo='+employeeInfo+'&isSelectEmployee='+isSelectEmployee+'&isSelectUnit='+isSelectUnit+'&isSelectSection='+isSelectSection;
    	});
    
});



