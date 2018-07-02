$(function(){
    $(".timebox").datetimepicker({
		lang:"ch",           //语言选择中文
		format:"Y-m-d",      //格式化日期
		timepicker:false,    //关闭时间选项
		todayButton:false    //关闭选择今天按钮
	});
    
//    $('#date').click(function(){
//    	var _this=$(this);
//    	$("#date").datetimepicker({
//    		lang:"ch",           //语言选择中文
//    		format:"Y-m-d",      //格式化日期
//    		timepicker:false,    //关闭时间选项
//    		todayButton:false,    //关闭选择今天按钮
//    		minDate:_this.val().substring(0,7)+'-01',
//    		maxDate:_this.val().substring(0,7)+'-'+dayCount(_this.val().substring(0,4),Number(_this.val().substring(5,7)))
//    	});
//    })
//    function dayCount(x,y){
//    	var day=new Date(x,y,0);
//        return day.getDate();
//    }
    
    
    $("#systemsingleDate1").datetimepicker({format:'Y-m-d h:i'});
    $("#systemsingleDate2").datetimepicker({format:'Y-m-d h:i'});
    $("#accountingPeriod1").datetimepicker({format:'Y-m-d h:i'});
    $("#accountingPeriod2").datetimepicker({format:'Y-m-d h:i'});

    
    
	$("input").iCheck({ checkboxClass: 'icheckbox_square-blue', radioClass: 'iradio_square-blue',increaseArea: '-10'  });
	$("select").select();
	$("input[data-src]").Input2select();
	$("input[data-comsrc]").autocom();
})