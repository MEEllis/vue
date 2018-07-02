var dataList;
function loadmodal(){
	
        threeGroupHeaders();;//默认页面加载三级表头
        //二级表头
        function twoGroupHeaders(){
        	//jQuery("#jqGrid_subjectBal").jqGrid('destroyGroupHeader', false);//清除原有表头合并
        	//jQuery("#jqGrid_subjectBal").GridUnload();
        	$.jgrid.gridUnload("jqGrid_subjectBal");
 
    		$.jgrid.defaults.width = 1280;
	  		$.jgrid.defaults.responsive = true;
	  		$.jgrid.defaults.styleUI = 'Bootstrap';	
        	jQuery("#jqGrid_subjectBal").jqGrid({
        		
        		//data: mydata,
                url:"/manager/cw/assistQuery/assistGL",
                datatype: "json",
                postData:JSON.stringify($("#shade").toJsonObject),
                mtype:"POST",
				jsonReader  : {	
					root: "rows",
					repeatitems: false
						},
                //datatype: "local",
                height: $(window).height()*0.615,
                rowNum: 10,
                rowList: [10,20,30],
        		  colNames:['序号','期间', '摘要','数量','金额','数量','金额','方向','数量','金额'],
                  colModel:[
                   {name:'id',index:'id', width:50, sorttype:"int"},
                   {name:'subCla',index:'subCla', width:150, align:"left",sorttype:"string",editable:false},
                   {name:'subCode',index:'subCode', width:150, align:"left", editable:false},
                   {name:'num1',index:'num1', width:150, align:"right",sorttype:"float",formatter:"number",editable:true,summaryType:'sum'},
                   {name:'money1',index:'money1', width:150,align:"right",sorttype:"float",formatter:"number",editable:true,summaryType:'sum'},
                   {name:'num2',index:'num2', width:150,align:"right",sorttype:"float",formatter:"number",editable:true,summaryType:'sum'},    
                   {name:'money2',index:'money2', width:150,align:"right",sorttype:"float",formatter:"number",editable:true,summaryType:'sum'}, 
                   {name:'direction',index:'direction', width:150,align:"right",sorttype:"float",formatter:"string",editable:true}, 
                   {name:'num3',index:'num3', width:150,align:"right",sorttype:"float",formatter:"number",editable:true,summaryType:'sum'}, 
                   {name:'money3',index:'money3', width:150,align:"right",sorttype:"float",formatter:"number",editable:true,summaryType:'sum'}
                 ],
                 shrinkToFit:true,
                 pager: "#gridpager",
                 viewrecords: true,
                 sortname: 'subCode',
                 rownumbers:true,
                 width:$(window).width()*0.9,
                 grouping:true,
                 groupingView : {
                   groupField : ['subCla'],
                   groupSummary : [true],
                   groupColumnShow : [true],
                   groupCollapse : false,
                   groupOrder: ['asc']
                 },
                 footerrow:false,  //设置表格显示表脚
        		 userDataOnFooter:true,//设置userData 显示在footer里
                 onCellSelect:function(rowid,iCol,cellcontent){
//                	 console.log(rowid+"...."+iCol+"...."+cellcontent);
                	 if(iCol=="2"){
                		 var rowData = $('#jqGrid_subjectBal').jqGrid('getRowData',rowid);//获取该行数据  对象
                		 console.log(rowData);
                		 window.open('subjectBalDetail.html?subCode='+rowData.subCode);
                	 }
                 },
                 loadComplete:function(data){
                	$(".jqGrid_subjectBalghead_0").hide();
//        			footerData();
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
        				
        				// 判断是否隐藏头部科目选项
//        				if($('.subSelect').prop('checked')){
//        		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subName").trigger("reloadGrid");
//        		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subCode").trigger("reloadGrid");
//        		    		$('.sub').removeClass('sub-none');
//        	    	}else{
//        		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subName").trigger("reloadGrid");
//        		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subCode").trigger("reloadGrid");
//        		    		$('.sub').addClass('sub-none');
//        	    	}
        	    	// 判断 是否隐藏头部部门选项
        	    	if($('.depSelect').prop('checked')){
        		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subDep").trigger("reloadGrid");
        		    		$('.dep').removeClass('sub-none');
        	    	}else{
        		    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subDep").trigger("reloadGrid");
        		    		$('.dep').addClass('sub-none');
        	    	}
        	    	// 判断 是否隐藏头部个人选项
        	    	if($('.perSelect').prop('checked')){
        		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subPer").trigger("reloadGrid");
        		    		$('.per').removeClass('sub-none');
        	    	}else{
        		    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subPer").trigger("reloadGrid");
        		    		$('.per').addClass('sub-none');
        	    	}
        	    	// 判断 是否隐藏头部往来单位选项
        	    	if($('.empSelect').prop('checked')){
        		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subEmp").trigger("reloadGrid");
        		    		$('.emp').removeClass('sub-none');
        	    	}else{
        		    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subEmp").trigger("reloadGrid");
        		    		$('.emp').addClass('sub-none');
        	    	}
        			}
        	});
        	   /*$("#jqGrid_subjectBal").dialog({  
			        autoOpen: false,      
			        modal: true,    // 设置对话框为模态（modal）对话框  
			        resizable: true,      
			        width: 480,  
			        buttons: {  // 为对话框添加按钮  
			            "取消": "",  
			            "添加": "",  
			            "保存": "",  
			            "删除": ""  
			        }  
			    }); */
        	//jQuery('#jqGrid_subjectBal').trigger('reloadGrid');
        	jQuery("#jqGrid_subjectBal").jqGrid('setGroupHeaders', {
				    useColSpanStyle: true, 
				    groupHeaders:[
				    	{startColumnName: 'num2', numberOfColumns: 2, titleText: '<em>贷方</em>'},
				    	{startColumnName: 'num1', numberOfColumns: 2, titleText: '<em>借方</em>'},
				    	{startColumnName: 'num3', numberOfColumns: 2, titleText: '<em>余额</em>'}
				    ]  
				  });
        }
        
        //threeGroupHeaders();
        //三级表头
        function threeGroupHeaders(dataList){
        	//jQuery("#jqGrid_subjectBal").jqGrid('destroyGroupHeader', false);//清除原有表头合并
        	$.jgrid.gridUnload("jqGrid_subjectBal");
    		$.jgrid.defaults.width = 1280;
  	  		$.jgrid.defaults.responsive = true;
  	  		$.jgrid.defaults.styleUI = 'Bootstrap';	
          	jQuery("#jqGrid_subjectBal").jqGrid({
          		datatype:"jsonstring",
        		datastr:dataList,
  				jsonReader  : {	
  					root: "rows",
  					repeatitems: false
  						},
                  height: $(window).height()*0.58,
                  rowNum: 10,
                  rowList: [10,20,30],
        		colNames:['科目编码'],
                colModel:[
                 {name:'subjectName',index:'subjectName', width:150, align:"left",sorttype:"string",editable:false},
               ],
               shrinkToFit:true,
               pager: "#gridpager",
               viewrecords: true,
               sortname: 'subjectName',
               rownumbers:true,
               width:$(window).width()*0.9,
               grouping:true,
               groupingView : {
                 groupField : ['subjectCode'],
                 groupSummary : [true],
                 groupColumnShow : [true],
                 groupCollapse : false,
                 groupOrder: ['asc']
               },
               footerrow:false,  //设置表格显示表脚
      		 userDataOnFooter:true,//设置userData 显示在footer里
               onCellSelect:function(rowid,iCol,cellcontent){
//              	 console.log(rowid+"...."+iCol+"...."+cellcontent);
              	 if(iCol=="2"){
              		 var rowData = $('#jqGrid_subjectBal').jqGrid('getRowData',rowid);//获取该行数据  对象
              		 console.log(rowData);
              		 window.open('subjectBalDetail.html?subCode='+rowData.subCode);
              	 }
               },
               /*gridComplete: function() {
					var ids=$('#jqGrid_subjectBal').jqGrid("getDataIDs");
					$.each(ids,function(i,item){
						var rowdata=$('#jqGrid_subjectBal').jqGrid('getRowData',item);
						if(rowdata.money1.indexOf("-") >= 0){
							$('#jqGrid_subjectBal').jqGrid('setCell',item,"money2",rowdata.money1*(-1));
							$('#jqGrid_subjectBal').jqGrid('setCell',item,"money1",' ');
							$('#jqGrid_subjectBal').jqGrid('setCell',item,'num2',rowdata.num1);
							$('#jqGrid_subjectBal').jqGrid('setCell',item,"num1",' ');
						}else{
							$('#jqGrid_subjectBal').jqGrid('setCell',item,'num2',' ');
							$('#jqGrid_subjectBal').jqGrid('setCell',item,"money2",' ');
						}
					});	
				},*/
				
				
              loadComplete:function(data){
              	$(".jqGrid_subjectBalghead_0").hide();
//    			footerData();			//显示页脚合计
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
    				
    				// 判断是否隐藏头部科目选项
//    				if($('.subSelect').prop('checked')){
//    		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subName").trigger("reloadGrid");
//    		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subCode").trigger("reloadGrid");
//    		    		$('.sub').removeClass('sub-none');
//    	    	}else{
//    		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subName").trigger("reloadGrid");
//    		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subCode").trigger("reloadGrid");
//    		    		$('.sub').addClass('sub-none');
//    	    	}
    	    	// 判断 是否隐藏头部部门选项
    	    	if($('.depSelect').prop('checked')){
    		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subDep").trigger("reloadGrid");
    		    		$('.dep').removeClass('sub-none');
    	    	}else{
    		    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subDep").trigger("reloadGrid");
    		    		$('.dep').addClass('sub-none');
    	    	}
    	    	// 判断 是否隐藏头部个人选项
    	    	if($('.perSelect').prop('checked')){
    		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subPer").trigger("reloadGrid");
    		    		$('.per').removeClass('sub-none');
    	    	}else{
    		    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subPer").trigger("reloadGrid");
    		    		$('.per').addClass('sub-none');
    	    	}
    	    	// 判断 是否隐藏头部往来单位选项
    	    	if($('.empSelect').prop('checked')){
    		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subEmp").trigger("reloadGrid");
    		    		$('.emp').removeClass('sub-none');
    	    	}else{
    		    		//jQuery("#jqGrid_subjectBal").setGridParam().showCol("subEmp").trigger("reloadGrid");
    		    		$('.emp').addClass('sub-none');
    	    	}
      			}
        	});
        	
        	
        	
        	//jQuery('#jqGrid_subjectBal').trigger('reloadGrid');
          	//jQuery("#jqGrid_subjectBal").jqGrid('setGridParam',{colModel:}).trigger('reloadGrid');
          	
          	
          /*
        	//设置二级表头
        	jQuery("#jqGrid_subjectBal").jqGrid('setGroupHeaders', {
				    useColSpanStyle: true, 
				    groupHeaders:[
				    	{startColumnName: 'num1', numberOfColumns: 2, titleText: '<em>借方</em>'},
				    	{startColumnName: 'num2', numberOfColumns: 2, titleText: '<em>贷方</em>'},
				    	{startColumnName: 'num3', numberOfColumns: 2, titleText: '<em>借方</em>'},
				    	{startColumnName: 'num4', numberOfColumns: 2, titleText: '<em>贷方</em>'},
				    	{startColumnName: 'num5', numberOfColumns: 2, titleText: '<em>借方</em>'},
				    	{startColumnName: 'num6', numberOfColumns: 2, titleText: '<em>贷方</em>'}
				    ]  
				  });
				  //设置三级表头
					jQuery("#jqGrid_subjectBal").jqGrid("setComplexGroupHeaders",{
						  complexGroupHeaders:[
						     {startColumnName:'num1',numberOfColumns:4,titleText:'初期余额'},
						     {startColumnName:'num3',numberOfColumns:4,titleText:'本期发生'},
						     {startColumnName:'num5',numberOfColumns:4,titleText:'末期余额'}
						  ]	
					});
        }
        */
        }
        
		//改变表格样式
		document.querySelector('.cla-one').onclick = function(){
			threeGroupHeaders();
		}
		document.querySelector('.cla-two').onclick = function(){
			twoGroupHeaders();
		}
		
		// 查询弹出层
		$('.sure').click( function(){
			document.querySelector('#shade').style.display = 'none';
				// 判断是否隐藏头部科目选项
			if($('.sub').prop('checked')){
		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subName").trigger("reloadGrid");
		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subCode").trigger("reloadGrid");
		    		$('.sub').removeClass('sub-none');
	    	}else{
		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subName").trigger("reloadGrid");
		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subCode").trigger("reloadGrid");
		    		$('.sub').addClass('sub-none');
	    	}
	    	// 判断 是否隐藏头部部门选项
	    	if($('.dep').prop('checked')){
		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subDep").trigger("reloadGrid");
		    		$('.dep').removeClass('sub-none');
	    	}else{
		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subDep").trigger("reloadGrid");
		    		$('.dep').addClass('sub-none');
	    	}
	    	// 判断 是否隐藏头部个人选项
	    	if($('.per').prop('checked')){
		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subPer").trigger("reloadGrid");
		    		$('.per').removeClass('sub-none');
	    	}else{
		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subPer").trigger("reloadGrid");
		    		$('.per').addClass('sub-none');
	    	}
	    	// 判断 是否隐藏头部往来单位选项
	    	if($('.emp').prop('checked')){
		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subEmp").trigger("reloadGrid");
		    		$('.emp').removeClass('sub-none');
	    	}else{
		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subEmp").trigger("reloadGrid");
		    		$('.emp').addClass('sub-none');
	    	}
		});
		$('.bloc1').html($('.wnum').val());
		
		$('select[class*="subShow"]').change( function() {
			$('#subject-top-na').html($('.subShow').val()+'明细账');
		});
		
		
		
		/**
		 * 自定义列计算
		 * @param val
		 * @param name
		 * @param record
		 * @returns {String}
		 */
		function mysum(val, name, record)
		{
			return "("+record.subCode+")小计：";
		}
		/**
		 * 修改表格底部
		 */
//		function footerData(){		
//			var sum_jie1 = $('#jqGrid_subjectBal').getCol('num1',false,'sum');
//			var sum_dai1 = $('#jqGrid_subjectBal').getCol('money1',false,'sum');
//			var sum_jie2 = $('#jqGrid_subjectBal').getCol('num2',false,'sum');
//			var sum_dai2 = $('#jqGrid_subjectBal').getCol('money2',false,'sum');
//			var sum_jie3 = $('#jqGrid_subjectBal').getCol('num3',false,'sum');
//			var sum_dai3 = $('#jqGrid_subjectBal').getCol('money3',false,'sum');
//			$('#jqGrid_subjectBal').jqGrid('footerData','set',{
//				"id":"合计",
//	            "num1": sum_jie1,
//	            "money1": sum_dai1,
//	            "num2": sum_jie2,
//	            "money2": sum_dai2,
//	            "num3": sum_jie3,
//	            "money3": sum_dai3,
//		        });
//		};
		
		//console.log($('#jqGrid_subjectBal').getCell('subCla','subCla'));
        
}
			