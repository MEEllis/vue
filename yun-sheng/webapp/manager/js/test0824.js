function loadmodal(){
  
        twoGroupHeaders();//页面加载默认二级表头
        //二级表头
        function twoGroupHeaders(){
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
        		  colNames:['序号', '项目编码', '项目名称','日期','字号','方向','余额'],
                  colModel:[
                   {name:'id',index:'id', width:50, sorttype:"int",hidden:true},
                   {name:'subCode',index:'subCode', width:150, align:"left",sorttype:"int"},
                   {name:'subName',index:'subName', width:150, align:"left",sorttype:"string"},
                   {name:'subTime',index:'subTime', width:150, align:"left",sorttype:"string"},
                   {name:'subNo',index:'subNo', width:150, align:"left",sorttype:'string',formatter:'select', editoptions:{value:"0:借;1:贷;2:平"}},
                   {name:'subF',index:'subF', width:150, align:"left",sorttype:"string"},
                   {name:'subMon',index:'subMon', width:150,align:"right",sorttype:"float",formatter:"number"}
                 ],
                 shrinkToFit:true,
                 pager: "#gridpager",
                 viewrecords: true,
                 sortname: 'subCode',
                 sortorder:'asc',
                 sortable:true,
                 rownumbers:true,
                 width:$(window).width()*0.9,
                 //footerrow:true,  //设置表格显示表脚
        		 		 //userDataOnFooter:true,//设置userData 显示在footer里
                 onCellSelect:function(rowid,iCol,cellcontent){
                  	 console.log(rowid+"...."+iCol+"...."+cellcontent);
                 },
                 loadComplete:function(data){
                 	$(".jqGrid_subjectBalghead_0").hide();
        					//footerData();
        					}
        	});
        }
       
		$('.bloc1').html($('.wnum').val());
		
		$('select[class*="subShow"]').change( function() {
			$('#subject-top-na').html($('.subShow').val()+'明细账');
		});
		
		$('select[class*="danwei2"]').change( function() {
			$('#subject-bottom-other').html('单位名称:'+$('.danwei2').val().replace(/\d+/g,''));
		});
		
		
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
			