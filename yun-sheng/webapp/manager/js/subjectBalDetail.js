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
//              rowNum: 10,
//              rowList: [10,20,30],
        		  colNames:['序号','科目编码', '科目名称','日期','凭证字号','摘要','单价','计量单位','数量','金额','数量','金额','方向','单价','数量','金额'],
                  colModel:[
					{name:'id',index:'id', width:50,sorttype:'int'},
					{name:'subCode',index:'subCode',width:150,align:'left',sorttype:'string'},
					{name:'subName',index:'subName',width:150,align:'left',sorttype:'string'},
					{name:'subTime',index:'subTime',width:150,align:'left',sorttype:'string'},
					{name:'subNo',index:'subNo',width:150,align:'center',sorttype:'string',formatter:'string',cellattr: function () { return "title='联查凭证' style='color:#0066CC;font-weight:bold;cursor: pointer;'" }},
					{name:'subDigest',index:'subDigest',width:150,align:'left',sorttype:'string',formatter:'string'},
					{name:'subPrice',index:'subPrice',width:150,align:'left',sorttype:'float',formatter:'string'},
					{name:'subDanwei',index:'subDanwei',width:150,align:'left',sorttype:'string',formatter:'string'},
					{name:'num1',index:'num1',width:150,align:'right',sorttype:'float',formatter:'int'},
					{name:'money1',index:'money1',width:150,align:'right',sorttype:'float',formatter:'number'},
					{name:'num2',index:'num2',width:150,align:'right',sorttype:'float',formatter:'int'},
					{name:'money2',index:'money2',width:150,align:'right',sorttype:'float',formatter:'number'},
					{name:'subDir',index:'subDir',width:150,align:'left',sorttype:'string',formatter:'select', editoptions:{value:"0:借;1:贷;2:平"}},
//					{name:'subDir',index:'subDir',width:150,align:'left',sorttype:'string',formatter:'string',summaryType:myDir},
					{name:'subYdan',index:'subYdan',width:150,align:'right',sorttype:'float',formatter:'string'},
					{name:'num3',index:'num3',width:150,align:'right',sorttype:'float',formatter:'int'},
					{name:'money3',index:'money3',width:150,align:'right',sorttype:'float',formatter:'number'}
                 ],
                 shrinkToFit:true,
//               pager: "#gridpager",
                 viewrecords: true,
                 sortname: 'subCode',
                 //rownumbers:true,
                 width:$(window).width()*0.9,
                 grouping:true,
                 groupingView : {
                   groupField : ['subCode'],
                   groupSummary : [true],
                   groupColumnShow : [true],
                   groupCollapse : false,
                   groupOrder: ['asc']
                 },
                 //footerrow:true,  //设置表格显示表脚
        		 //userDataOnFooter:true,//设置userData 显示在footer里
                 onCellSelect:function(rowid,iCol,cellcontent){
                	 if(iCol=="4"){
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
        			//footerData();
                	var rowIds = jQuery("#jqGrid_subjectBal").jqGrid('getDataIDs');
                	//var rowIds=$("#jqGrid_subjectBal").getGridParam("selarrrow");//selIDs是一个选中行ID的数组
                	console.log(rowIds);
                  	for(var i=0;i<rowIds.length;i++){
                        var gridDataUp = $("#jqGrid_subjectBal").jqGrid("getRowData",rowIds[i-1]);//获得某一行的数据 
                        var gridDataDown = $("#jqGrid_subjectBal").jqGrid("getRowData",rowIds[i]);//获得某一行的数据 
                        
                        //统计: 期初余额  本月合计 本年累计
                        
                        if(gridDataUp.subCode != gridDataDown.subCode){
                        	var newrowid = Number(gridDataUp.id) + 1;
                        	if(gridDataUp.subTime != null){
                        		console.log(gridDataUp.subTime);
                        		var index = (gridDataUp.subTime).lastIndexOf('-');
                              	var newTime = gridDataUp.subTime.substring(0,index).replace('-','.');
                              	console.log(newTime);
                        	}
                      	
                        	var dataRowYear = {    
											        id: "",  
											        subCode:gridDataUp.subCode,  
											        subName:gridDataUp.subName,  
											        subTime:newTime,  
											        subNo:'',  
											        subDigest:'本年累计',  
											        subPrice:'',  
											        subDanwei:'',  
											        num1:'',  
											        money1:'',  
											        num2:'',  
											        money2:'',
											        subDir:'',
											        subYdan:'',  
											        num3:'',
											        money3:''
											    };
											    var dataRowMonth = {    
											        id: "",  
											        subCode:gridDataUp.subCode,  
											        subName:gridDataUp.subName,  
											        subTime:newTime,  
											        subNo:'',  
											        subDigest:'本月合计',  
											        subPrice:'',  
											        subDanwei:'',  
											        num1:'',  
											        money1:'',  
											        num2:'',  
											        money2:'',
											        subDir:'',
											        subYdan:'',  
											        num3:'',
											        money3:''
											    }; 
											    var dataRowYu = {    
											        id: "",  
											        subCode:gridDataDown.subCode,  
											        subName:gridDataDown.subName,  
											        subTime:'',  
											        subNo:'',  
											        subDigest:'期初余额',  
											        subPrice:'',  
											        subDanwei:'',  
											        num1:'',  
											        money1:'',  
											        num2:'',  
											        money2:'',
											        subDir:'0',
											        subYdan:'',  
											        num3:'',
											        money3:'5'
											    };      
											      
											    //将新添加的行插入到第一列  
											    $("#jqGrid_subjectBal").jqGrid("addRowData", 'bgFFF7AD', dataRowYear, "after",gridDataUp.id);  
											    $("#jqGrid_subjectBal").jqGrid("addRowData", 'bgD7EBF9', dataRowMonth, "after",gridDataUp.id);  
											    $("#jqGrid_subjectBal").jqGrid("addRowData", 'bgFFFFFF', dataRowYu, "before",gridDataDown.id);  
                        	
                        }
                        //计算余额
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
//													if(money3 < 0){
//                      		$("#jqGrid_subjectBal").jqGrid("setCell",rowIds[i],'subDir','贷');
//                      	}else if(money3 == 0){
//                      		$("#jqGrid_subjectBal").jqGrid("setCell",rowIds[i],'subDir','平');
//                      	}else{
//                      		$("#jqGrid_subjectBal").jqGrid("setCell",rowIds[i],'subDir','借');
//                      	}
                        	//money3 < 0 ? money3 = (-money3) : money3 = money3;
                        	$("#jqGrid_subjectBal").jqGrid("setCell",rowIds[i],'money3',money3);
                        	
                        }
                  	}
        			}
        	});
        	jQuery("#jqGrid_subjectBal").jqGrid('setGroupHeaders', {
				    useColSpanStyle: true, 
				    groupHeaders:[
				    	{startColumnName: 'num1', numberOfColumns: 2, titleText: '<em>借方</em>'},
				    	{startColumnName: 'num2', numberOfColumns: 2, titleText: '<em>贷方</em>'},
				    	{startColumnName: 'subYdan', numberOfColumns: 3, titleText: '<em>余额</em>'}
				    ]  
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
        		colNames:['序号','科目编码', '科目名称','日期','凭证字号','摘要','借方','贷方','方向','余额'],
                colModel:[
					{name: 'id',index:'id', width:50,sorttype:'int'},
					{name:'subCode',index:'subCode',width:150,align:'left',sorttype:'string'},
					{name:'subName',index:'subName',width:150,align:'left',sorttype:'string'},
					{name:'subTime',index:'subTime',width:150,align:'left',sorttype:'string'},
					{name:'subNo',index:'subNo',width:150,align:'center',sorttype:'string',formatter:'string',cellattr: function () { return "title='联查凭证' style='color:#0066CC;font-weight:bold;cursor: pointer;'" }},
					{name:'subDigest',index:'subDigest',width:150,align:'left',sorttype:'string',formatter:'string'},
					{name:'money1',index:'money1',width:150,align:'right',sorttype:'float',formatter:'number'},
					{name:'money2',index:'money2',width:150,align:'right',sorttype:'float',formatter:'number'},
					{name:'subDir',index:'subDir',width:150,align:'left',sorttype:'string',formatter:'select', editoptions:{value:"0:借;1:贷;2:平"}},
					{name:'money3',index:'money3',width:150,align:'right',sorttype:'float',formatter:'number'}
               ],
               shrinkToFit:true,
               pager: "#gridpager",
               viewrecords: true,
               sortname: 'subCode',
               rownumbers:true,
               width:$(window).width()*0.9,
               grouping:true,
               groupingView : {
                 groupField : ['subCode'],
                 groupSummary : [true],
                 groupColumnShow : [true],
                 groupCollapse : false,
                 groupOrder: ['asc']
               },
               //footerrow:true,  //设置表格显示表脚
      		 //userDataOnFooter:true,//设置userData 显示在footer里
               onCellSelect:function(rowid,iCol,cellcontent){
//              	 console.log(rowid+"...."+iCol+"...."+cellcontent);
              	 if(iCol=="4"){
              		 var rowData = $('#jqGrid_subjectBal').jqGrid('getRowData',rowid);//获取该行数据  对象
              		 console.log(rowData);
              		 window.open('subjectBalDetail.html?subNo='+rowData.subNo);
              	 }
               },
               loadComplete:function(data){
              	$(".jqGrid_subjectBalghead_0").hide();
      			//footerData();
              	$(".jqfoot").hide();
              	var rowIds = jQuery("#jqGrid_subjectBal").jqGrid('getDataIDs');
            	//var rowIds=$("#jqGrid_subjectBal").getGridParam("selarrrow");//selIDs是一个选中行ID的数组
            	console.log(rowIds);
              	for(var i=0;i<rowIds.length;i++){
                    var gridDataUp = $("#jqGrid_subjectBal").jqGrid("getRowData",rowIds[i-1]);//获得某一行的数据 
                    var gridDataDown = $("#jqGrid_subjectBal").jqGrid("getRowData",rowIds[i]);//获得某一行的数据 
                    
                    //统计: 期初余额  本月合计 本年累计
                    
                    if(gridDataUp.subCode != gridDataDown.subCode){
                    	var newrowid = Number(gridDataUp.id) + 1;
                    	if(gridDataUp.subTime != null){
                    		console.log(gridDataUp.subTime);
                    		var index = (gridDataUp.subTime).lastIndexOf('-');
                          	var newTime = gridDataUp.subTime.substring(0,index).replace('-','.');
                          	console.log(newTime);
                    	}
                  	
                    	var dataRowYear = {    
										        id: "",  
										        subCode:gridDataUp.subCode,  
										        subName:gridDataUp.subName,  
										        subTime:newTime,  
										        subNo:'',  
										        subDigest:'本年累计',  
										        subPrice:'',  
										        subDanwei:'',  
										        num1:'',  
										        money1:'',  
										        num2:'',  
										        money2:'',
										        subDir:'',
										        subYdan:'',  
										        num3:'',
										        money3:''
										    };
										    var dataRowMonth = {    
										        id: "",  
										        subCode:gridDataUp.subCode,  
										        subName:gridDataUp.subName,  
										        subTime:newTime,  
										        subNo:'',  
										        subDigest:'本月合计',  
										        subPrice:'',  
										        subDanwei:'',  
										        num1:'',  
										        money1:'',  
										        num2:'',  
										        money2:'',
										        subDir:'',
										        subYdan:'',  
										        num3:'',
										        money3:''
										    }; 
										    var dataRowYu = {    
										        id: "",  
										        subCode:gridDataDown.subCode,  
										        subName:gridDataDown.subName,  
										        subTime:'',  
										        subNo:'',  
										        subDigest:'期初余额',  
										        subPrice:'',  
										        subDanwei:'',  
										        num1:'',  
										        money1:'',  
										        num2:'',  
										        money2:'',
										        subDir:'0',
										        subYdan:'',  
										        num3:'',
										        money3:'5'
										    };      
										      
										    //将新添加的行插入到第一列  
										    $("#jqGrid_subjectBal").jqGrid("addRowData", 'bgFFF7AD', dataRowYear, "after",gridDataUp.id);  
										    $("#jqGrid_subjectBal").jqGrid("addRowData", 'bgD7EBF9', dataRowMonth, "after",gridDataUp.id);  
										    $("#jqGrid_subjectBal").jqGrid("addRowData", 'bgFFFFFF', dataRowYu, "before",gridDataDown.id);  
                    	
                    }
                    //计算余额
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
//												if(money3 < 0){
//                  		$("#jqGrid_subjectBal").jqGrid("setCell",rowIds[i],'subDir','贷');
//                  	}else if(money3 == 0){
//                  		$("#jqGrid_subjectBal").jqGrid("setCell",rowIds[i],'subDir','平');
//                  	}else{
//                  		$("#jqGrid_subjectBal").jqGrid("setCell",rowIds[i],'subDir','借');
//                  	}
                    	//money3 < 0 ? money3 = (-money3) : money3 = money3;
                    	$("#jqGrid_subjectBal").jqGrid("setCell",rowIds[i],'money3',money3);
                    	
                    }
              	}
    			}
      			
        	});
        	
        }
		//改变表格样式
		document.querySelector('.cla-one').onclick = function(){
			threeGroupHeaders();
		}
		document.querySelector('.cla-two').onclick = function(){
			twoGroupHeaders();
		}
		
		$('select[class*="danwei2"]').change( function() {
			$('#subject-bottom-other').html('单位名称:'+$('.danwei2').val().replace(/\d+/g,''));
		});
		
		// 弹出层
		$('.sure').click( function(){
			console.log('-------------------------');
			document.querySelector('#shade').style.display = 'none';
			if($('.dis').prop('checked')){
        		jQuery("#jqGrid_subjectBal").setGridParam().hideCol("subName").trigger("reloadGrid");
        		$('.sub').removeClass('sub-none');
        	}else{
        		jQuery("#jqGrid_subjectBal").setGridParam().showCol("subName").trigger("reloadGrid");
        		$('.sub').addClass('sub-none');
        	}
		});
		$('.bloc1').html($('.wnum').val());
		
		$('select[class*="sub"]').change( function() {
			$('#subject-top-na').html($('.subShow').val()+'明细账');
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
		/*function footerData(){			
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
		}*/
		
}
			