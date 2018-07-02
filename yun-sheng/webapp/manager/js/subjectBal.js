function loadmodal(){
  
        twoGroupHeaders();//页面加载默认二级表头
        //二级表头
        function twoGroupHeaders(){
        	//jQuery("#jqGrid_subjectBal").jqGrid('destroyGroupHeader', false);//清除原有表头合并
        	//jQuery("#jqGrid_subjectBal").GridUnload();
        	$.jgrid.gridUnload("jqGrid_subjectBal");
        	/*var mydata = [
        	  			{"id":"1","subCla":"资产","subCode":"1001","subName":"银行存款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"2","subCla":"资产","subCode":"1002","subName":"银行存款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"3","subCla":"资产","subCode":"1003","subName":"应收账款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"4","subCla":"资产","subCode":"1004","subName":"预付账款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"5","subCla":"负债","subCode":"1222","subName":"其他应收款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"6","subCla":"负债","subCode":"2111","subName":"原材料","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"7","subCla":"负债","subCode":"1005","subName":"固定资产","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"8","subCla":"负债","subCode":"1022","subName":"短期借款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"9","subCla":"负债","subCode":"1021","subName":"应付账款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"10","subCla":"权益","subCode":"1025","subName":"预收账款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"11","subCla":"权益","subCode":"1009","subName":"短期借款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"12","subCla":"权益","subCode":"1008","subName":"库存现金","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
        	  			{"id":"13","subCla":"权益","subCode":"1007","subName":"其他应收款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"}
        	            ];*/
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
        		  colNames:['序号','科目类别', '科目编码', '科目名称','借方','贷方','借方','贷方','借方','贷方'],
                  colModel:[
                   {name:'id',index:'id', width:50, sorttype:"int"},
                   {name:'subCla',index:'subCla', width:150, align:"left",sorttype:"string"},
                   {name:'subCode',index:'subCode', width:150, align:"left", cellattr: function () { return "title='联查' style='color:#0066CC;font-weight:bold;cursor: pointer;'"; }},
                   {name:'subName',index:'subName', width:150, align:"left",sorttype:"string",summaryType:mysum},
                   {name:'money1',index:'money1', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'},
                   {name:'money2',index:'money2', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'},    
                   {name:'money3',index:'money3', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'}, 
                   {name:'money4',index:'money4', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'}, 
                   {name:'money5',index:'money5', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'}, 
                   {name:'money6',index:'money6', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'}
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
                 footerrow:true,  //设置表格显示表脚
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
        			footerData();
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
				    	{startColumnName: 'money1', numberOfColumns: 2, titleText: '<em>初期余额</em>'},
				    	{startColumnName: 'money3', numberOfColumns: 2, titleText: '<em>本期发生</em>'},
				    	{startColumnName: 'money5', numberOfColumns: 2, titleText: '<em>末期余额</em>'}
				    ]  
				  });
        }
        //threeGroupHeaders();
        //三级表头
        function threeGroupHeaders(){
        	//jQuery("#jqGrid_subjectBal").jqGrid('destroyGroupHeader', false);//清除原有表头合并
        	$.jgrid.gridUnload("jqGrid_subjectBal");
        	/*var mydata = [
          	  			{"id":"1","subCla":"资产","subCode":"1001","subName":"银行存款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"2","subCla":"资产","subCode":"1002","subName":"银行存款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"3","subCla":"资产","subCode":"1003","subName":"应收账款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"4","subCla":"资产","subCode":"1004","subName":"预付账款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"5","subCla":"负债","subCode":"1222","subName":"其他应收款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"6","subCla":"负债","subCode":"2111","subName":"原材料","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"7","subCla":"负债","subCode":"1005","subName":"固定资产","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"8","subCla":"负债","subCode":"1022","subName":"短期借款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"9","subCla":"负债","subCode":"1021","subName":"应付账款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"10","subCla":"权益","subCode":"1025","subName":"预收账款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"11","subCla":"权益","subCode":"1009","subName":"短期借款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"12","subCla":"权益","subCode":"1008","subName":"库存现金","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"},
          	  			{"id":"13","subCla":"权益","subCode":"1007","subName":"其他应收款","num1":"100","money1":"123131","num2":"21","money2":"10.00","num3":"31","money3":"110.00","num4":"21","money4":"99","num5":"23","money5":"211","num6":"89","money6":"32"}
          	            ];*/
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
                  height: $(window).height()*0.58,
                  rowNum: 10,
                  rowList: [10,20,30],
        		colNames:['序号','科目类别', '科目编码', '科目名称','数量','金额','数量','金额','数量','金额','数量','金额','数量','金额','数量','金额'],
                colModel:[
                 {name:'id',index:'id', width:50, sorttype:"int"},
                 {name:'subCla',index:'subCla', width:150, align:"left",sorttype:"string"},
                 {name:'subCode',index:'subCode', width:150, align:"left", cellattr: function () { return "title='联查' style='color:#0066CC;font-weight:bold;cursor: pointer;'"; }},
                 {name:'subName',index:'subName', width:150, align:"left",sorttype:"string",summaryType:mysum},
                 {name:'num1',index:'num1', width:150,align:"right",sorttype:"float",formatter:"int",summaryType:'sum'},
                 {name:'money1',index:'money1', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'},
                 {name:'num2',index:'num2', width:150,align:"right",sorttype:"float",formatter:"int",summaryType:'sum'},
                 {name:'money2',index:'money2', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'},    
                 {name:'num3',index:'num3', width:150,align:"right",sorttype:"float",formatter:"int",summaryType:'sum'},
                 {name:'money3',index:'money3', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'},
                 {name:'num4',index:'num4', width:150,align:"right",sorttype:"float",formatter:"int",summaryType:'sum'},
                 {name:'money4',index:'money4', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'}, 
                 {name:'num5',index:'num5', width:150,align:"right",sorttype:"float",formatter:"int",summaryType:'sum'},
                 {name:'money5',index:'money5', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'}, 
                 {name:'num6',index:'num6', width:150,align:"right",sorttype:"float",formatter:"int",summaryType:'sum'},
                 {name:'money6',index:'money6', width:150,align:"right",sorttype:"float",formatter:"number",summaryType:'sum'}
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
               footerrow:true,  //设置表格显示表脚
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
      			footerData();
      			}
        	});
        	//jQuery('#jqGrid_subjectBal').trigger('reloadGrid');
          	//jQuery("#jqGrid_subjectBal").jqGrid('setGridParam',{colModel:}).trigger('reloadGrid');
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
		//改变表格样式
		document.querySelector('.cla-one').onclick = function(){
			twoGroupHeaders();
		}
		document.querySelector('.cla-two').onclick = function(){
			threeGroupHeaders();
		}
		
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
		function mysum(val, name, record)
		{
			return "("+record.subCla+")小计：";
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
				"id":"合计",
	            "money1": sum_jie1,
	            "money2": sum_dai1,
	            "money3": sum_jie2,
	            "money4": sum_dai2,
	            "money5": sum_jie3,
	            "money6": sum_dai3,
		         }
			);
		}
		
		//console.log($('#jqGrid_subjectBal').getCell('subCla','subCla'));
}
			