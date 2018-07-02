
$(document).ready(function(){ 
	
//初始化
$.ajax({
		url:  '/manager/cw/accountQuery/cash/init',
		type : "post",
		success:function(data){
			var account=data.data.account;
			//会计期间
			for(var i=0;i<account.length;i++){
				$("#minMonth").append("<option value='"+account[i].currentAccountingYear+account[i].currentAccountingMonth+"'>"+account[i].currentAccountingYear+"-"+account[i].currentAccountingMonth+"</option>");
				$("#maxMonth").html("");
				$("#minMonth option").each(function () {
			        var val = $(this).val().substring(0,4); //获取单个value
			        if(val==$("#minMonth").val().substring(0,4)){
			        	  $("#maxMonth").append("<option value='"+$(this).val()+"'>"+
			        			  $(this).text()+"</option>");
			        }
			    });
			}
		}});
});

/**
 * 会计区间不允许跨年
 */
function onSelectYear(){
	if($("#minMonth").val().substring(0,4)!=$("#maxMonth").val().substring(0,4)){
		 $("#maxMonth").html("");
		 $("#minMonth option").each(function () {
		        var val = $(this).val().substring(0,4); //获取单个value
		        if(val==$("#minMonth").val().substring(0,4)){
		        	  $("#maxMonth").append("<option value='"+$(this).val()+"'>"+
		        			  $(this).text()+"</option>");
		        }
		    });
	}
}

/**
 * 选择科目
 */
var callBack = null;
function modalshow(){
		 subjectSelectFrame.loadDataCompanySubjectTree(null);
		 $('#subjectReferenceModal').modal('show');
		 callBack = function(){ //全局回掉函数变量	
			selectS =arguments[0];
			$("#subjectName").val(selectS[0].subjectName);
			$("#subjectId").val(selectS[0].id);
			 $('#subjectReferenceModal').modal('hide');
		}; 
}


function getSelect(){
	var obj=$("#shade").toJsonObject();
	//解析日期
	obj.minYear=$("#minMonth").val().substring(0,4)
	obj.minMonth=$("#minMonth").val().substring(4);
	obj.maxMonth=$("#maxMonth").val().substring(4);
	//判断是否选中
	obj.contactsCheck=$("#contactsCheck").is(":checked");
	obj.departmentCheck=$("#departmentCheck").is(":checked");
	obj.employeeCheck=$("#employeeCheck").is(":checked");
	obj.contactsTypeCheck=$("#contactsTypeCheck").is(":checked");
	obj.ifHappenShowCumulative=$("#ifHappenShowCumulative").is(":checked");	
	if($("#ifContainNotAccount").is(":checked")){
	obj.ifContainNotAccount=1;
	}
	else{
	obj.ifContainNotAccount=2;
	}
	return obj;
}

//一级过滤查询表格
function queryPage(obj){
	if(obj==1){
		selectOnChange();
	}
	else{
		threeGroupHeaders(getSelect());
	}
        
        function threeGroupHeaders(obj){
        	//jQuery("#jqGrid_subjectBal").jqGrid('destroyGroupHeader', false);//清除原有表头合并
        	$.jgrid.gridUnload("jqGrid_subjectBal");
    		$.jgrid.defaults.width = 1280;
  	  		$.jgrid.defaults.responsive = true;
  	  		$.jgrid.defaults.styleUI = 'Bootstrap';	
  	  		
          	jQuery("#jqGrid_subjectBal").jqGrid({
          		url:  '/manager/cw/assistQuery/assistGL',
          		datatype : "json",
        		/*datastr:dataList,*/
        	    colNames:['科目编码', '科目名称','部门','个人','往来单位','期间','摘要','借方','贷方','方向','余额'],
        	    colModel:[
      					{name:'subjectCode',index:'subjectCode',width:150,align:'left',sorttype:'string'},
      					{name:'subjectName',index:'subjectName',width:150,align:'left',sorttype:'string'},
      					{name:'departmentName',index:'departmentName', width:150, align:"left",sorttype:"string"},
      	                {name:'employeeName',index:'employeeName', width:150, align:"left",sorttype:"string"},
      	                {name:'contactsName',index:'contactsName', width:150, align:"left",sorttype:"string"},
      	                {name:'dataString',index:'dataString', width:150, align:"left",sorttype:"string"},
      	                {name:'summary',index:'summary', width:150, align:"left",sorttype:"string"},
      	                {name:'borrowCurrency',index:'borrowCurrency', width:150, align:"left",sorttype:"double"},
      	                {name:'loanCurrency',index:'loanCurrency', width:150, align:"left",sorttype:"double"},
      	                {name:'dirStr',index:'dirStr', width:150, align:"left",sorttype:"string"},
      	                {name:'periodEndAmuont',index:'periodEndAmuont', width:150, align:"left",sorttype:"double"},
                       ],
                   styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
                   pager: "#gridpager",
                   jsonReader: {
                           root: "rows",
                           page: "page",
                           total: "total",
                           records: "records",
                           repeatitems: false
                       },
                    rowNum: 10,
                    rowList: [10,20,30],
                    mtype: "POST",
                    viewrecords : true,
                    autowidth : true,
                    multiselect : false,
                    multiboxonly : true,
                    forceFit:true,
                    height: $(window).height()*0.66,
                    width:$(window).width()*0.9,
                    caption : "",
                    postData:obj,
                    //加载完成
                    loadComplete:function(data){
                    	   console.log(data);
                    	var ids = $("#jqGrid_subjectBal").getDataIDs();
                    	//显示会计期间
                    	$("#kjqj").text(obj.minYear+"."+obj.minMonth+"-"
                    			       +obj.minYear+"."+obj.maxMonth);
                    	//表格变色
                       	for(var i=0;i<ids.length;i++){
                       	    var rowData = $("#jqGrid_subjectBal").getRowData(ids[i]);
                       	    if(rowData.summary=='本月合计'){//如果天数等于0，则背景色置灰显示
                       	        $('#'+ids[i]).find("td").addClass("heJiRow");
                       	    }else if(rowData.summary=='本年累计'){
                       	    	$('#'+ids[i]).find("td").addClass("leiJiRow");
                       	    }
                       	}
                       	$("#subSelect").html("<option value=''>全部</option>");
                    	$("#empSelect").html("<option value=''>全部</option>");
                    	$("#depSelect").html("<option value=''>全部</option>");
                    	$("#perSelect").html("<option value=''>全部</option>");
                       	//科目列表
                       	var subarr=[];
                       	//往来单位列表
                       	var emparr=[];
                       	//部门
                       	var deparr=[];
                       	//人员
                       	var perarr=[];
                       	for(var i=0;i<data.allList.length;i++){
                       		//增加科目选项
                       		if(subarr.indexOf(data.allList[i].subjectCode+data.allList[i].subjectName)<0){
                       			subarr.push(data.allList[i].subjectCode+data.allList[i].subjectName);
                       			$("#subSelect").append("<option value='"+data.allList[i].subjectId+"'>"+
                       					data.allList[i].subjectCode+data.allList[i].subjectName+"</opntion>");
                       		}
                       		//增加单位选项
                       		if(emparr.indexOf(data.allList[i].contactsName)<0
                       				&&data.allList[i].contactsName!=null){
                       			emparr.push(data.allList[i].contactsName);
                       			$("#empSelect").append("<option value='"+data.allList[i].contactsId+"'>"+
                       					 data.allList[i].contactsName+"</opntion>");
                       		}
                       	    //增加部门选项
                       		if(deparr.indexOf(data.allList[i].departmentName)<0
                       				&&data.allList[i].departmentName!=null){
                       			deparr.push(data.allList[i].departmentName);
                       			$("#depSelect").append("<option value='"+data.allList[i].departmentId+"'>"+
                       					data.allList[i].departmentName+"</opntion>");
                       		}
                       	    //增加人员选项
                       		if(perarr.indexOf(data.allList[i].employeeName)<0
                       				&&data.allList[i].employeeName!=null){
                       			perarr.push(data.allList[i].employeeName);
                       			$("#perSelect").append("<option value='"+data.allList[i].employeeId+"'>"+
                       					data.allList[i].employeeName+"</opntion>");
                       		}
                       	}
                       	
                    	$(".jqGrid_subjectBalghead_0").hide();
                    	$(".jqfoot").hide();
            			footerData();
            			// 过滤条件中    判断 是否隐藏头部往来单位选项
            			if(($('.pickEmp').prop('checked')) || ($('.pickEmp1').prop('checked'))){
            				console.log('qqqqq');
                			jQuery("#jqGrid_subjectBal").setGridParam().showCol("contactsName").trigger("reloadGrid");
//                			jQuery("#jqGrid_subjectBal").setGridParam().showCol("subEmpJc").trigger("reloadGrid");
            	    	}else{
            	    		console.log('2222');
            		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("contactsName").trigger("reloadGrid");
//            		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subEmpJc").trigger("reloadGrid");
            	    	}
            	    	// 过滤条件中  判断 是否隐藏头部个人选项
            	    	if(!$('.pickPer').prop('checked')){
            		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("employeeName").trigger("reloadGrid");
            	    	}else{
            		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("employeeName").trigger("reloadGrid");
            	    	}
            	    	// 过滤条件中 判断 是否隐藏头部部门选项
            	    	if(!$('.pickDep').prop('checked')){
            		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("departmentName").trigger("reloadGrid");
            	    	}else{
            		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("departmentName").trigger("reloadGrid");
            	    	}
            	    	
            	    	// 判断是否隐藏头部科目选项
//        				if($('.subSelect').prop('checked')){
//        		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subjectCode").trigger("reloadGrid");
//        		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subjectName").trigger("reloadGrid");
//        		    		$('.sub').removeClass('sub-none');
//	        	    	}else{
//	        		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subjectCode").trigger("reloadGrid");
//	        		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subjectName").trigger("reloadGrid");
//	        		    		$('.sub').addClass('sub-none');
//	        	    	}
	        	    	// 判断 是否隐藏头部部门选项
	        	    	if($('.depSelect').prop('checked')){
	        		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("departmentName").trigger("reloadGrid");
	        		    		$('.dep').removeClass('sub-none');
	        	    	}else{
	        		    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subDep").trigger("reloadGrid");
	        		    		$('.dep').addClass('sub-none');
	        	    	}
	        	    	// 判断 是否隐藏头部个人选项
	        	    	if($('.perSelect').prop('checked')){
	        		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("employeeName").trigger("reloadGrid");
	        		    		$('.per').removeClass('sub-none');
	        	    	}else{
	        		    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subPer").trigger("reloadGrid");
	        		    		$('.per').addClass('sub-none');
	        	    	}
	        	    	// 判断 是否隐藏头部往来单位选项
	        	    	if($('.empSelect').prop('checked')){
	        		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("contactsName").trigger("reloadGrid");
	        		    		$('.emp').removeClass('sub-none');
	        	    	}else{
	        		    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subEmp").trigger("reloadGrid");
	        		    		$('.emp').addClass('sub-none');
	        	    	}
	                    }
        	});
          	
          	
        	jQuery("#jqGrid_subjectBal").jqGrid('setGroupHeaders', {
			    useColSpanStyle: true, 
			    groupHeaders:[
			    	{startColumnName: 'subPrice', numberOfColumns: 2, titleText: '<em>借方</em>'},
			    	{startColumnName: 'subPrice2', numberOfColumns: 2, titleText: '<em>贷方</em>'}
			    ]  
			  });
        	var ids = $("#jqGrid_subjectBal").getDataIDs();
        	for(var i=0;i<ids.length;i++){
        	    var rowData = $("#jqGrid_subjectBal").getRowData(ids[i]);
        	    if(rowData.summary=='本月合计'){//如果天数等于0，则背景色置灰显示
        	        $('#'+ids[i]).find("td").addClass("heJiRow");
        	    }else if(rowData.summary=='本年累计'){
        	    	$('#'+ids[i]).find("td").addClass("leiJiRow");
        	    }
        	}
        	
        }
		$('.bloc1').html($('.wnum').val());
		
		$('select[class*="sub"]').change( function() {
			$('#subject-top-na').html($('.subShow').val()+'统计');
		});
		
		$('select[class*="danwei2"]').change( function() {
			$('#subject-bottom-other').html('单位名称:'+$('.danwei2').val().replace(/\d+/g,''));
		});
		
		/**
		 * 自定义列计算
		 * @param val
		 * @param name
		 * @param record
		 * @returns {String}
		 */
		/*function mysum(val, name, record,str)
		{
			console.log(val+'...'+name);
			return record.subName;
		}*/
		function myCode(val, name, record)
		{
			return record.subCode;
		}
		function myName(val, name, record)
		{
			return record.subName;
		}
		function myDate(val, name, record)
		{
			index = record.subTime.lastIndexOf('-');
			//console.log(index);
			return record.subTime.substring(0,index).replace('-','.');
		}
		function myDigest(val, name, record)
		{
			return '本月合计';
		}
		function myDir(val, name, record)
		{
			return record.subDir;
		}
		/**
		 * 修改表格底部
		 */
		function footerData(){			
			var sum_jie1 = $('#jqGrid_subjectBal').getCol('money1',false,'sum');
			var sum_jie2 = $('#jqGrid_subjectBal').getCol('money3',false,'sum');
			var sum_jie3 = $('#jqGrid_subjectBal').getCol('money5',false,'sum');
			$('#jqGrid_subjectBal').jqGrid('footerData','set',{
				"id":"合计",
	            "money1": sum_jie1,
	            "money3": sum_jie2,
	            "money5": sum_jie3,
		         }
			);
		}
		
		
		function selectOnChange(){
			var model=getSelect();
			model.subjectId=$("#subSelect").val();
			model.departmentId=$("#depSelect").val();
			model.employeeId=$("#perSelect").val();
			model.contactsId=$("#empSelect").val();
			$("#jqGrid_subjectBal tr td").each(function(i, v){    //针对tb表格下的所有td进行遍历
				console.log("第"+(i + 1)+"格的数字是"+$(this).text());//返回当前td下的值
		})
			$.jgrid.gridUnload("jqGrid_subjectBal");
    		$.jgrid.defaults.width = 1280;
  	  		$.jgrid.defaults.responsive = true;
  	  		$.jgrid.defaults.styleUI = 'Bootstrap';	
          	jQuery("#jqGrid_subjectBal").jqGrid({
          		url:  '/manager/cw/assistQuery/assistGL',
          		datatype : "json",
        		/*datastr:dataList,*/
        	    colNames:['科目编码', '科目名称','部门','个人','往来单位','期间','摘要','借方','贷方','方向','余额'],
        	    colModel:[
      					{name:'subjectCode',index:'subjectCode',width:150,align:'left',sorttype:'string'},
      					{name:'subjectName',index:'subjectName',width:150,align:'left',sorttype:'string'},
      					{name:'departmentName',index:'departmentName', width:150, align:"left",sorttype:"string"},
      	                {name:'employeeName',index:'employeeName', width:150, align:"left",sorttype:"string"},
      	                {name:'contactsName',index:'contactsName', width:150, align:"left",sorttype:"string"},
      	                {name:'dataString',index:'dataString', width:150, align:"left",sorttype:"string"},
      	                {name:'summary',index:'summary', width:150, align:"left",sorttype:"string"},
      	                {name:'borrowCurrency',index:'borrowCurrency', width:150, align:"left",sorttype:"double"},
      	                {name:'loanCurrency',index:'loanCurrency', width:150, align:"left",sorttype:"double"},
      	                {name:'dirStr',index:'dirStr', width:150, align:"left",sorttype:"string"},
      	                {name:'periodEndAmuont',index:'periodEndAmuont', width:150, align:"left",sorttype:"double"},
                       ],
                   styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式  
                   pager: "#gridpager",
                   jsonReader: {
                           root: "rows",
                           page: "page",
                           total: "total",
                           records: "records",
                           repeatitems: false
                       },
                    rowNum: 10,
                    rowList: [10,20,30],
                    mtype: "POST",
                    viewrecords : true,
                    autowidth : true,
                    multiselect : false,
                    multiboxonly : true,
                    forceFit:true,
                    height: $(window).height()*0.66,
                    width:$(window).width()*0.9,
                    caption : "",
                    postData:model,
                    //加载完成
                    loadComplete:function(data){
                    	var ids = $("#jqGrid_subjectBal").getDataIDs();
                    	//表格变色
                       	for(var i=0;i<ids.length;i++){
                       	    var rowData = $("#jqGrid_subjectBal").getRowData(ids[i]);
                       	    if(rowData.summary=='本月合计'){//如果天数等于0，则背景色置灰显示
                       	        $('#'+ids[i]).find("td").addClass("heJiRow");
                       	    }else if(rowData.summary=='本年累计'){
                       	    	$('#'+ids[i]).find("td").addClass("leiJiRow");
                       	    }
                       	}
                    	$(".jqGrid_subjectBalghead_0").hide();
                    	$(".jqfoot").hide();
            			footerData();
            			// 过滤条件中    判断 是否隐藏头部往来单位选项
            			if(($('.pickEmp').prop('checked')) || ($('.pickEmp1').prop('checked'))){
                			jQuery("#jqGrid_subjectBal").setGridParam().showCol("subEmp").trigger("reloadGrid");
                			jQuery("#jqGrid_subjectBal").setGridParam().showCol("subEmpJc").trigger("reloadGrid");
            	    	}else{
            		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subEmp").trigger("reloadGrid");
            		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subEmpJc").trigger("reloadGrid");
            	    	}
            	    	// 过滤条件中  判断 是否隐藏头部个人选项
            	    	if(!$('.pickPer').prop('checked')){
            		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subPer").trigger("reloadGrid");
            	    	}else{
            		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subPer").trigger("reloadGrid");
            	    	}
            	    	// 过滤条件中 判断 是否隐藏头部部门选项
            	    	if(!$('.pickDep').prop('checked')){
            		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subDep").trigger("reloadGrid");
            	    	}else{
            		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subDep").trigger("reloadGrid");
            	    	}
                    }
        	});
		}
		
}
	

