//外观描述
$(document).on('click','.looksDesc',function(){
	$('.description').empty();
	getUsedRecordByType($(this).data('type'));
	for(var i=0,len=datayf.length;i<len;i++){
		da =datayf[i].content;
		daid=datayf[i].id;
		$('.description').append('<p><span class="yfVAR" data-id="'+daid+'">'+da+'</span> <span class="glyphicon glyphicon-trash yfdelect"></span></p>');
	}
	$('.YFshui').hide();
	$('.guDiv').hide();
});

//随机附件
$(document).on('click','.randomAttachment',function(){
	$('.YFshui').empty();
	getUsedRecordByType($(this).data('type'));
	for(var i=0,len=datayf.length;i<len;i++){
		da =datayf[i].content;
		daid=datayf[i].id;
	$('.YFshui').append('<p><span class="yfVAR" data-id="'+daid+'">'+da+'</span> <span class="glyphicon glyphicon-trash yfdelect"></span></p>');
	}
	$('.description').hide();
	$('.guDiv').hide();
});

//故障说明
$(document).on('click','.faultExplain',function(){
	$('.guDiv').empty();
	getUsedRecordByType($(this).data('type'));
	for(var i=0,len=datayf.length;i<len;i++){
		da =datayf[i].content;
		daid=datayf[i].id;
	$('.guDiv').append('<p><span class="yfVAR" data-id="'+daid+'">'+da+'</span> <span class="glyphicon glyphicon-trash yfdelect"></span></p>');
	}
	$('.YFshui').hide();
	$('.description').hide();
});

//赋值
$(document).on('click','.yfVAR',function(e){
	var vale = $(this).html();
	var dataid=$(this).data('id');
	$('.wgms').attr({"data-id":dataid});
	 var pText = $(this).parents(".Zpercent").find(".box_text");
	pText.next().find('input').val(vale)
	$('.none-cx').hide();
});

//删除
$(document).on('click','.yfdelect',function(){
	var dataid=$(this).prev().data('id');
	$('.wgms').val(dataid);
	var id=$('.wgms').val();
	$.request({
    	url:"/manager/afterSalesService/receiveRecord/deleteUsedRecord?id="+id,
    	dataType:'json',
    	contentType:'application/json',
    	success:function(data){
    	}
    });
	$(this).parent().hide();
});

//查询习惯输入文本
var da="";
var daid="";
var datayf=[];
function getUsedRecordByType(recordType){
	$.request({
    	url:"/manager/afterSalesService/receiveRecord/getUsedRecord?type="+recordType,
    	type:'GET',
    	dataType:'JSON',
    	contentType:'application/json;charset=utf-8',
    	async:false,
    	success:function(data){
			datayf=data.data.records;
			for(var i=0,len=datayf.length;i<len;i++){
				da =datayf[i].content;
				daid=datayf[i].id;
			}
	    }
    });
}

$(document).on('click','.input-none',function(e){
	var prevText = $(this).parent().prev().html();
	switch (prevText){
		case '颜色：':
			$('.colorDiv').show();
			e.stopPropagation();
			break;
		case '故障说明：':
			$('.guDiv').show();
			e.stopPropagation();
			break;
		case '外观描述：':
			$('.description').show();
			e.stopPropagation();
			break;
		case '随机附件：':
			$('.YFshui').show();
			e.stopPropagation();
			break;
		default:
			break;
	}
});