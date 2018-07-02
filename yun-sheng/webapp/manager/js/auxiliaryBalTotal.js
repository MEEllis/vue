function loadmodal(){
  
        twoGroupHeaders();//页面加载默认二级表头
        //二级表头
        function twoGroupHeaders(){
        	$.jgrid.gridUnload("jqGrid_subjectBal");
    		$.jgrid.defaults.width = 1280;
	  		$.jgrid.defaults.responsive = true;
	  		$.jgrid.defaults.styleUI = 'Bootstrap';	
        	  		
        	jQuery("#jqGrid_subjectBal").jqGrid({
                url:"../json/subjectBalDetail.json",
                datatype: "json",
                mtype:"GET",
				jsonReader  : {	
					root: "rows",
					repeatitems: false
						},
                height: $(window).height()*0.615,
                rowNum: 10,
                rowList: [10,20,30],
        		  colNames:['序号','科目编码', '科目名称','部门','个人','往来单位','期间','摘要','单价','金额','单价','金额','方向','余额'],
                  colModel:[
					{name:'id',index:'id', width:50,sorttype:'int'},
					{name:'subCode',index:'subCode',width:150,align:'left',sorttype:'string'},
					{name:'subName',index:'subName',width:150,align:'left',sorttype:'string'},
					{name:'subDep',index:'subDep', width:150, align:"left",sorttype:"string"},
	                {name:'subPer',index:'subPer', width:150, align:"left",sorttype:"string"},
	                {name:'subEmp',index:'subEmp', width:150, align:"left",sorttype:"string"},
					{name:'subTime',index:'subTime',width:150,align:'left',sorttype:'string'},
					{name:'subDigest',index:'subDigest',width:150,align:'left',sorttype:'string',formatter:'string'},
					{name:'subPrice',index:'subPrice',width:150,align:'left',sorttype:'float',formatter:'string'},
					{name:'money1',index:'money1',width:150,align:'right',sorttype:'float',formatter:'number'},
					{name:'subPrice2',index:'subPrice2',width:150,align:'left',sorttype:'float',formatter:'string'},
					{name:'money2',index:'money2',width:150,align:'right',sorttype:'float',formatter:'number'},
					{name:'subDir',index:'subDir',width:150,align:'left',sorttype:'string',formatter:'select', editoptions:{value:"0:借;1:贷;2:平"}},
//					{name:'subDir',index:'subDir',width:150,align:'left',sorttype:'string',formatter:'string',summaryType:myDir},
					//{name:'subYdan',index:'subYdan',width:150,align:'right',sorttype:'float',formatter:'string'},
					{name:'money3',index:'money3',width:150,align:'right',sorttype:'float',formatter:'number'}
                 ],
                 shrinkToFit:true,
                 pager: "#gridpager",
                 viewrecords: true,
                 sortname: 'subCode',
                 //rownumbers:true,
                 width:$(window).width()*0.9,
             
                 footerrow:true,  //设置表格显示表脚
        		 userDataOnFooter:true,//设置userData 显示在footer里
                 onCellSelect:function(rowid,iCol,cellcontent){
                	 var colNames=$("#jqGrid_subjectBal").jqGrid('getGridParam','colNames');
                  	 if(iCol==(colNames.length-8)){
                  		 var rowData = $('#jqGrid_subjectBal').jqGrid('getRowData',rowid);//获取该行数据  对象
                		 //console.log(rowData);
                		 window.open('subjectBalDetail.html?subNo='+rowData.subNo);
                	 }
                 },
                 onSelectRow:function(ids){
                 	
                 },
                 loadComplete:function(data){
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
                	
                    //计算余额
                	var rowIds = jQuery("#jqGrid_subjectBal").jqGrid('getDataIDs');
                	//var rowIds=$("#jqGrid_subjectBal").getGridParam("selarrrow");//selIDs是一个选中行ID的数组
                	console.log(rowIds);
                  	for(var i=0;i<rowIds.length;i++){
                        var gridDataUp = $("#jqGrid_subjectBal").jqGrid("getRowData",rowIds[i-1]);//获得某一行的数据 
                        var gridDataDown = $("#jqGrid_subjectBal").jqGrid("getRowData",rowIds[i]);//获得某一行的数据 
                        if(gridDataUp.subCode == gridDataDown.subCode){
                        	console.log(gridDataUp.subDigest);
                        	var monUp1 = gridDataUp.money1;//上一行的金额
                        	var monUp2 = gridDataUp.money2;
                        	console.log(monUp1+'....;.'+monUp2);
                        	var monDown1 = gridDataDown.money1;//下一行的金额
                        	var monDown2 = gridDataDown.money2;
                        	var monUp3 = gridDataUp.money3;
							var money3 = 0;
//                      	上一行如果是 借  加借减贷
//                      	上一行如果是 贷  加贷减借
                        	var type = gridDataUp.subDir;//借贷方向
                        	console.log(type+'..........');
                        	if(type == '0'){
                        		money3 = Math.abs(Number(monUp3) + Number(monDown1) - Number(monDown2));
                        	}else if(type == '1'){
                        		money3 = Math.abs(Number(monUp3) + Number(monDown2) - Number(monDown1));
                        	}else{
                        		
                        	}

                        	$("#jqGrid_subjectBal").jqGrid("setCell",rowIds[i],'money3',money3);
                        	
                        }
        			}
                 }
        	});
				  
        }
        //threeGroupHeaders();
        //三级表头
        function threeGroupHeaders(){
        	//jQuery("#jqGrid_subjectBal").jqGrid('destroyGroupHeader', false);//清除原有表头合并
        	$.jgrid.gridUnload("jqGrid_subjectBal");
    		$.jgrid.defaults.width = 1280;
  	  		$.jgrid.defaults.responsive = true;
  	  		$.jgrid.defaults.styleUI = 'Bootstrap';	
          	  		
          	jQuery("#jqGrid_subjectBal").jqGrid({
                  url:"../json/subjectBalDetail.json",
                  datatype: "json",
                  mtype:"GET",
  				jsonReader  : {	
  					root: "rows",
  					repeatitems: false
  						},
                  height: $(window).height()*0.66,
                  rowNum: 10,
                  rowList: [10,20,30],
                  colNames:['序号','科目编码', '科目名称','部门','个人','往来单位','期间','摘要','单价','金额','单价','金额','方向','余额'],
                  colModel:[
					{name:'id',index:'id', width:50,sorttype:'int'},
					{name:'subCode',index:'subCode',width:150,align:'left',sorttype:'string'},
					{name:'subName',index:'subName',width:150,align:'left',sorttype:'string'},
					{name:'subDep',index:'subDep', width:150, align:"left",sorttype:"string"},
	                {name:'subPer',index:'subPer', width:150, align:"left",sorttype:"string"},
	                {name:'subEmp',index:'subEmp', width:150, align:"left",sorttype:"string"},
					{name:'subTime',index:'subTime',width:150,align:'left',sorttype:'string'},
					{name:'subDigest',index:'subDigest',width:150,align:'left',sorttype:'string',formatter:'string'},
					{name:'subPrice',index:'subPrice',width:150,align:'left',sorttype:'float',formatter:'string'},
					{name:'money1',index:'money1',width:150,align:'right',sorttype:'float',formatter:'number'},
					{name:'subPrice2',index:'subPrice2',width:150,align:'left',sorttype:'float',formatter:'string'},
					{name:'money2',index:'money2',width:150,align:'right',sorttype:'float',formatter:'number'},
					{name:'subDir',index:'subDir',width:150,align:'left',sorttype:'string',formatter:'select', editoptions:{value:"0:借;1:贷;2:平"}},
//					{name:'subDir',index:'subDir',width:150,align:'left',sorttype:'string',formatter:'string',summaryType:myDir},
					//{name:'subYdan',index:'subYdan',width:150,align:'right',sorttype:'float',formatter:'string'},
					{name:'money3',index:'money3',width:150,align:'right',sorttype:'float',formatter:'number'}
                 ],
               shrinkToFit:true,
               pager: "#gridpager",
               viewrecords: true,
               sortname: 'subCode',
               rownumbers:true,
               width:$(window).width()*0.9,
               footerrow:true,  //设置表格显示表脚
      		   userDataOnFooter:true,//设置userData 显示在footer里
               onCellSelect:function(rowid,iCol,cellcontent){
//              	 console.log(rowid+"...."+iCol+"...."+cellcontent);
            	   var colNames=$("#jqGrid_subjectBal").jqGrid('getGridParam','colNames');
              	 if(iCol==(colNames.length-8)){
              		 var rowData = $('#jqGrid_subjectBal').jqGrid('getRowData',rowid);//获取该行数据  对象
              		 console.log(rowData);
              		 window.open('subjectBalDetail.html?subNo='+rowData.subNo);
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
              	$(".jqfoot").hide();
                //计算余额
              	var rowIds = jQuery("#jqGrid_subjectBal").jqGrid('getDataIDs');
            	//var rowIds=$("#jqGrid_subjectBal").getGridParam("selarrrow");//selIDs是一个选中行ID的数组
            	console.log(rowIds);
              	for(var i=0;i<rowIds.length;i++){
                    var gridDataUp = $("#jqGrid_subjectBal").jqGrid("getRowData",rowIds[i-1]);//获得某一行的数据 
                    var gridDataDown = $("#jqGrid_subjectBal").jqGrid("getRowData",rowIds[i]);//获得某一行的数据 
                    if(gridDataUp.subCode == gridDataDown.subCode){
                    	console.log(gridDataUp.subDigest);
                    	var monUp1 = gridDataUp.money1;//上一行的金额
                    	var monUp2 = gridDataUp.money2;
                    	console.log(monUp1+'....;.'+monUp2);
                    	var monDown1 = gridDataDown.money1;//下一行的金额
                    	var monDown2 = gridDataDown.money2;
                    	var monUp3 = gridDataUp.money3;
						var money3 = 0;
//                  	上一行如果是 借  加借减贷
//                  	上一行如果是 贷  加贷减借
                    	var type = gridDataUp.subDir;//借贷方向
                    	console.log(type+'..........');
                    	if(type == '0'){
                    		money3 = Math.abs(Number(monUp3) + Number(monDown1) - Number(monDown2));
                    	}else if(type == '1'){
                    		money3 = Math.abs(Number(monUp3) + Number(monDown2) - Number(monDown1));
                    	}else{
                    		
                    	}
                    	$("#jqGrid_subjectBal").jqGrid("setCell",rowIds[i],'money3',money3);
                    	
                    }
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
        	
        }
		//改变表格样式
		document.querySelector('.cla-one').onclick = function(){
			twoGroupHeaders();
		}
		document.querySelector('.cla-two').onclick = function(){
			threeGroupHeaders();
		}
		
	
		$('.bloc1').html($('.wnum').val());
		
		$('select[class*="sub"]').change( function() {
			$('#subject-top-na').html($('.subShow').val()+'明细账');
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
		
}
			