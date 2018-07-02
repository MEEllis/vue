function loadmodal(){
  
        twoGroupHeaders();//页面加载默认二级表头
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
                url:"../json/subjectBal.json",
                datatype: "json",
                mtype:"GET",
				jsonReader  : {	
					root: "rows",
					repeatitems: false
						},
                //datatype: "local",
                height: $(window).height()*0.615,
                rowNum: 10,
                rowList: [10,20,30],
        		  colNames:['序号', '科目编码', '科目名称','部门','个人','往来单位','借方','贷方','借方','贷方','借方','贷方'],
                  colModel:[
                   {name:'id',index:'id', width:50, sorttype:"int",hidden:true},
                   {name:'subCode',index:'subCode', width:150, align:"left",sorttype:"int"},
                   {name:'subName',index:'subName', width:150, align:"left",sorttype:"string",summaryType:mysum},
                   {name:'subDep',index:'subDep', width:150, align:"left",sorttype:"string"},
                   {name:'subPer',index:'subPer', width:150, align:"left",sorttype:"string"},
                   {name:'subEmp',index:'subEmp', width:150, align:"left",sorttype:"string"},
                   {name:'money1',index:'money1', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'},
                   {name:'money2',index:'money2', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'},    
                   {name:'money3',index:'money3', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'}, 
                   {name:'money4',index:'money4', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'}, 
                   {name:'money5',index:'money5', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum', cellattr: function () { return "title='联查辅助明细帐' style='color:#0066CC;font-weight:bold;cursor: pointer;'"; }}, 
                   {name:'money6',index:'money6', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum', cellattr: function () { return "title='联查辅助明细帐' style='color:#0066CC;font-weight:bold;cursor: pointer;'"; }}
                 ],
                 shrinkToFit:true,
                 pager: "#gridpager",
                 viewrecords: true,
                 sortname: 'subCode',
                 sortorder:'asc',
                 sortable:true,
                 rownumbers:true,
                 width:$(window).width()*0.9,
                 footerrow:true,  //设置表格显示表脚
        		 		 userDataOnFooter:true,//设置userData 显示在footer里
        		 		 grouping:true,
                 groupingView : {
                   groupField : ['subCode'],
                   groupSummary : [true],
                   groupColumnShow : [true],
                   groupCollapse : false,
                   groupOrder: ['asc']
                 },
                 onCellSelect:function(rowid,iCol,cellcontent){
                  	 console.log(rowid+"...."+iCol+"...."+cellcontent);
                 		//var rowid = $("#jqGrid_subjectBal").getGridParam("selrow");
                 		var colNames=$("#jqGrid_subjectBal").jqGrid('getGridParam','colNames');
                	 if(iCol==(colNames.length-1) || iCol==(colNames.length-2)){
                		 var rowData = $('#jqGrid_subjectBal').jqGrid('getRowData',rowid);//获取该行数据  对象
//              		 console.log(rowData);
                		 window.open('subjectBalDetail.html?subCode='+rowData.subCode);
                	 }
                 },
                 loadComplete:function(data){
                 	$(".jqGrid_subjectBalghead_0").hide();
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
									
									// 判断是否隐藏头部科目选项
					//				if($('.subSelect').prop('checked')){
					//		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subName").trigger("reloadGrid");
					//		    		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subCode").trigger("reloadGrid");
					//		    		$('.sub').removeClass('sub-none');
					//	    	}else{
					//		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subName").trigger("reloadGrid");
					//		    		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subCode").trigger("reloadGrid");
					//		    		$('.sub').addClass('sub-none');
					//	    	}
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
        	jQuery("#jqGrid_subjectBal").jqGrid('setGroupHeaders', {
				    useColSpanStyle: true, 
				    groupHeaders:[
				    	{startColumnName: 'money1', numberOfColumns: 2, titleText: '<em>初期余额</em>'},
				    	{startColumnName: 'money3', numberOfColumns: 2, titleText: '<em>本期发生</em>'},
				    	{startColumnName: 'money5', numberOfColumns: 2, titleText: '<em>末期余额</em>'}
				    ]  
				  });
        }
       
		//改变表格样式
		document.querySelector('.cla-one').onclick = function(){
			twoGroupHeaders();
		}
		document.querySelector('.cla-two').onclick = function(){
			twoGroupHeaders();
		}
		
		// 查询弹出层
//		$('.sure').click( function(){
//				console.log('-------------------------');
//				document.querySelector('#shade').style.display = 'none';
//				
//		});
		$('.bloc1').html($('.wnum').val());
		
		$('select[class*="subShow"]').change( function() {
			$('#subject-top-na').html($('.subShow').val()+'明细账');
		});
		
		$('select[class*="danwei2"]').change( function() {
			$('#subject-bottom-other').html('单位名称:'+$('.danwei2').val().replace(/\d+/g,''));
		});
		
		function mysum(val, name, record)
		{
			return "("+record.subName+")小计：";
		}
		
		/**
		 * 修改表格底部
		 */
		function footerData(){			
			var sum_jie1 = $('#jqGrid_subjectBal').getCol('money1',false,'sum');
			var sum_dai1 = $('#jqGrid_subjectBal').getCol('money2',false,'sum');
			var sum_jie2 = $('#jqGrid_subjectBal').getCol('money3',false,'sum');
			var sum_dai2 = $('#jqGrid_subjectBal').getCol('money4',false,'sum');
			var sum_jie3 = $('#jqGrid_subjectBal').getCol('money5',false,'sum');
			var sum_dai3 = $('#jqGrid_subjectBal').getCol('money6',false,'sum');
			$('#jqGrid_subjectBal').jqGrid('footerData','set',{
				"subCode":"合计",
	            "money1": sum_jie1,
	            "money2": sum_dai1,
	            "money3": sum_jie2,
	            "money4": sum_dai2,
	            "money5": sum_jie3,
	            "money6": sum_dai3,
		         }
			);
		}
		
}
			