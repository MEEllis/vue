/*****************凭证*********************/

//初始化页面
$(document).ready(function(){ 
	$.ajax({
		url:  '/manager/cw/pz/init',
		type : "get",
		success:function(data){
			var company=data.data.company;
			var list=data.data.companyList;
			var group=data.data.group;
			var lastVoucher=data.data.lastVoucher;
			var day= new Date(lastVoucher.createTime);
			
			var Year = 0; 
			var Month = 0; 
			var Day = 0; 
			var CurrentDate = ""; 
			//初始化时间 
			//Year= day.getYear();//有火狐下2008年显示108的bug 
			Year= day.getFullYear();//ie火狐下都可以 
			Month= day.getMonth()+1; 
			Day = day.getDate(); 
			//Hour = day.getHours(); 
			// Minute = day.getMinutes(); 
			// Second = day.getSeconds(); 
			CurrentDate += Year + "-"; 
			if (Month >= 10 ) 
			{ 
			CurrentDate += Month + "-"; 
			} 
			else 
			{ 
			CurrentDate += "0" + Month + "-"; 
			} 
			if (Day >= 10 ) 
			{ 
			CurrentDate += Day ; 
			} 
			else 
			{ 
			CurrentDate += "0" + Day ; 
			} 
			$("#group").val(group.name);
			$("#createTime").val(CurrentDate);
			for(var i=0;i<list.length;i++){
				$("#company").append("<option value='"+list[i].id+"'>"+list[i].name+"</option>");
			}
		}
	});
}); 


//填入金额时自动汇总
function summary(obj){
	var borrow=document.getElementsByName("borrowCurrency");
	var loan=document.getElementsByName("loanCurrency");
	var borrowsum=0;
	var loansum=0;
	for(var i=0;i<borrow.length;i++){
		if($("input[name='borrowCurrency']").get(i).value!=""){
			borrowsum=parseInt(borrowsum)+parseInt($("input[name='borrowCurrency']").get(i).value);
		}
	}
	
	for(var i=0;i<loan.length;i++){
		if($("input[name='loanCurrency']").get(i).value!=""){
		loansum=parseInt(loansum)+parseInt($("input[name='loanCurrency']").get(i).value);
		}
	}
	//判断是否相等，不相等则最后一行填满
	if(borrowsum!=loansum){
		$("#borrowSum").val(borrowsum);
		$("#loanSum").val(loansum);
		if(borrowsum>loansum){
			$("input[name='loanCurrency']:last").val(borrowsum-loansum);
			$("#borrowSum").val(borrowsum);
			$("#loanSum").val(borrowsum);
		}
		else{
			$("input[name='borrowCurrency']:last").val(loansum-borrowsum);
			$("#borrowSum").val(loansum);
			$("#loanSum").val(loansum);
		}
	}
	
}




//模糊查询框以及条件搜索框的显示和隐藏
$(function() {
	$(document).on("click", ".btnbox .pull-right", function() {
		$(this).toggleClass("hideinputbox");
		$(this).parents(".searchbox").find(".inputbox").toggle();
	});
	$(document).on("mouseout",".Amountbox input",function(){
		$(this).prevAll("font").text($(this).val());
	});
	var trtemp = $(".inputboxtable tbody tr:last-child").clone();
	var maxnum=1;
	$(document).on("click", ".inputboxtable tbody tr:last-child", function(event) {
		var tr = $(trtemp).clone();
		maxnum++
		$(this).parents("tbody").append(tr);
		$(".zxsaastable tbody tr:last-child td:first-child").text(maxnum);
		$(".zxsaastable tbody tr:last-child").find("input").val("");
	  
	  	/** 
		 *  摘要模糊查询
		 *  
		 **/
		$("input[name='zy']").autCompleteTable(
				{
				thead:'<thead><tr><th>序号</th><th>摘要名称</th></tr></thead>\n',
			    tbody:'<tr><td>{{id}}</td><td>{{summaryContent}}</td></tr>\n',
		});
		
		/** 
		 *  科目模糊查询
		 *  
		 **/
		$("input[name='b']").autCompleteTable(
			{
			thead:'<thead><tr><th>科目编码</th><th>科目名称</th></tr></thead>\n',
		    tbody:'<tr><td>{{subjectCode}}</td><td>{{subjectName}}</td></tr>\n',
		    ontrclick:function(obj,self,valself){
				$.ajax({
					url:  '/manager/cw/pz/showParentSub/'+obj.find(".value").val(),
					type : "get",
					dataType : 'json',
					success:function(data){
					  var subjectName=data.data.subName;
					  var subjectInfo=data.data.subjectInfo;
					  self.val(subjectName);
					  console.log(subjectInfo.id+'22222');
					  valself.val(subjectInfo.id);
					  if(subjectInfo.partnerAccounting||subjectInfo.departmentAccounting||subjectInfo.employeeAccounting){
						  $("#assist").click();
					  }
					 /*alert(subjectInfo.partnerAccounting+"往来单位");
					 alert(subjectInfo.departmentAccounting+"往来部门");
					 alert(subjectInfo.employeeAccounting+"职员");*/
					}
				}); 
			   }
		   	});
	});
	
	
	/** 
	 *  摘要模糊查询
	 *  
	 **/
	$("input[name='a']").autCompleteTable(
		{
		thead:'<thead><tr><th>序号</th><th>摘要名称</th></tr></thead>\n',
	    tbody:'<tr><td>{{id}}</td><td>{{summaryContent}}</td></tr>\n',
	   		});
	
	/** 
	 *  科目模糊查询
	 *  
	 **/
	$("input[name='b']").autCompleteTable(
		{
		thead:'<thead><tr><th>科目编码</th><th>科目名称</th></tr></thead>\n',
	    tbody:'<tr><td>{{subjectCode}}</td><td>{{subjectName}}</td></tr>\n',
	    ontrclick:function(obj,self,valself){
			$.ajax({
				url:  '/manager/cw/pz/showParentSub/'+obj.find(".value").val(),
				type : "get",
				dataType : 'json',
				success:function(data){
				 var subjectName=data.data.subName;
				  var subjectInfo=data.data.subjectInfo;
				  console.log(subjectInfo.id+'11111');
				  self.val(subjectName);
				  valself.val(subjectInfo.id);
				  if(subjectInfo.partnerAccounting||subjectInfo.departmentAccounting||subjectInfo.employeeAccounting){
					  $("#assist").click();
				  }
				 /*alert(subjectInfo.partnerAccounting+"往来单位");
				 alert(subjectInfo.departmentAccounting+"往来部门");
				 alert(subjectInfo.employeeAccounting+"职员");*/
				}
			}); 
		   }
	   	});
});


/**
 *保存
*/
function save(obj){
	//获取科目条数
	var subjectNum=document.getElementsByName("subjectId");
	//获取流量现金条数
	var flowNum=document.getElementsByName("flowId");
	var dlist=Array();
	var clist=Array();
	//获取时间
	var myDate = new Date();
	var obj=Object();
	obj.year=myDate.getFullYear(); 
	obj.month=myDate.getMonth()+1;
	//将明细存入主表中
	for(var i=0;i<subjectNum.length;i++){
		var detail={};
		detail.subjectId=$("input[name='subjectId']").get(i).value;
		detail.summary=$("input[name='a']").get(i).value;
		detail.borrowCurrency=$("input[name='borrowCurrency']").get(i).value/100;
		detail.loanCurrency=$("input[name='loanCurrency']").get(i).value/100;
		dlist.push(detail);
	}
	//将流量信息存入主表
	for(var i=0;i<flowNum.length;i++){
		var flow={};
		flow.currencyAmount=$("input[name='currencyAmount']").get(i).value;
		flow.flowId=$("input[name='flowId']").get(i).value;
		clist.push(flow);
	}
	obj.flist=dlist;
	obj.clist=clist;
	$.ajax({
		url:  '/manager/cw/pz/save',
		type : "post",
		data :JSON.stringify(obj),
		contentType:"application/json",
		success:function(data){
			alert("保存成功");
		}
	});
}


/**
 * 现金流量分配
 */
function flowSave(){
	
}

/**
 * 流量分配显示
 */
function flow(){
	//获取所有的明细
	var is=document.getElementsByName("subjectId");
	var dlist=Array();
	var array=$(".heda").toJsonObjectArray();
	for(var i=0;i<is.length;i++){
		if($("input[name='subjectId']").get(i).value!=""){
		var detail={};
		detail.subjectId=$("input[name='subjectId']").get(i).value;
		detail.summary=$("input[name='summary']").get(i).value;
		detail.borrowCurrency=$("input[name='borrowCurrency']").get(i).value/100;
		detail.loanCurrency=$("input[name='loanCurrency']").get(i).value/100;
		dlist.push(detail);
		}
	}
	console.log(dlist);
	$.ajax({
		url:  '/manager/cw/pz/flow',
		type : "post",
		data :JSON.stringify(dlist),
		contentType:"application/json",
		success:function(data){
		//接受后台传来的现金流量科目与流量信息以及金额的汇总
			if(data.data.message=="不存在现金流量科目"){
				console.log(data.data.message);
				$("#cashsum").text(0);
				$("#sum").text(0);
				alert("不存在现金流量科目");
			}
			var list = data.data.list;
			var cashlist = data.data.cashlist;
			var cashsum=data.data.cashsum;
			var sum=data.data.sum;
			console.log(list);
			$("#cashsum").text(cashsum);
			$("#sum").text(sum);
			$("#flow tbody").html("");
			$("#flowlist tbody").html("");
			for(var i=0;i<cashlist.length;i++){
				$("#flow tbody").append('<tr style="text-align: center; font-weight: bold"><td>'+cashlist[i].subjectStr+
										'</td><td>'+cashlist[i].lendingStr+
										'</td><td>'+cashlist[i].money+
										'</td></tr>');
			}
			
			for(var i=0;i<list.length;i++){
				$("#flowlist tbody").append('<tr style="text-align: center; font-weight: bold"><td>'+list[i].flowStr+
										'</td><td>'+list[i].directionStr+'<input type="hidden" name="flowId" value="'+list[i].flowId+'"/>'+
										'</td><td><input name="currencyAmount" disabled="disabled" value="'+list[i].money+'"/>'+						
										'</td></tr>');
			}
		}
	}); 
}

/***
 * 显示凭证
 **/
$(function(){
	var obj=0;  //1、上一张    2、下一张  3、首张   4、末张
	//按钮组
	$("#last").click(function(){
		obj=1;
		show(obj);
	});
	$("#next").click(function(){
		obj=2;
		show(obj);
	});
	$("#first").click(function(){
		obj=3;
		show(obj);
	});
	$("#end").click(function(){
		obj=4;
		show(obj);
	});
	//后台接口
});

function show(obj){
	$.ajax({
		url:  '/manager/cw/pz/showVocher',
		type : "get",
		data:{operation:obj,id:$("#fmainId").val(),companyId:$("#company").val()},
		dataType : 'json',
		success:function(data){
			var obj=data.data.main;
			var list=data.data.list;
			console.log(list);
			for(var i=0;i<list.length;i++){
				$("input[name='a']").get(i).value=list[i].summary;
			}
			
		}
	}); 
}



$(function () {
    var maxnum = 0;//默认表格计数器
    var d_tr = $(".inputboxtable tbody tr:last-child");//获取表格默认模板
    $(".inputboxtable tbody tr").remove();//删除当前table中的内容
    maxnum = creattr(d_tr, maxnum, 10);//初始化表格
    $(document).on("click", ".inputboxtable tbody tr:last-child ", function (event) {//点击表格最后一行的，在一次增加10行表格
        maxnum = creattr(d_tr, maxnum, 10);//根据计数器创建表格
        SubAss();
    });
    $(document).on("click", ".btnbox .pull-right", function () {//隐藏页面搜索条件
        $(this).toggleClass("hideinputbox");//切换隐藏按钮的状态
        $(this).parents(".searchbox").find(".inputbox").toggle();////切换搜索条件框的隐藏和显示
    });
    $(document).on("click", ".inputboxtable .Amountbox", function (event) {// 当鼠标移动到主表中的需要输入的表格，显示input窗口
        if ($(this).closest('tr').children('td').eq(1).find('input').val() != ''&&$(this).closest('tr').children('td').eq(2).find('input').val()!='') {//摘要不为空时允许输入
            $(this).find("div").hide();
            $(this).find("input").show();
            $(this).find("input").focus();
            event.stopPropagation();
        }else{
            alert('摘要或科目为空')
        }
    });
    $(document).on('click','.zxsaastable tbody tr td', function () {
        if ($(this).closest('tr').children('td').eq(1).find('input').val()== ''){//              tr摘要为空时复制此前最近行摘要值
            var arr = $(this).closest('tr').prevAll('tr');
            for (var i = 0; i <= arr.length; i++) {//逆向遍历此前所有行
                if (arr.eq(i).find('td').eq(1).find('input').val() != '') {//当遇到存在值的行时break
                    var newVal = arr.eq(i).find('td').eq(1).find('input').val();//取值当前行
                    for (var j = 0; j <= i; j++) {
                        arr.eq(j).find('td').eq(1).find('input').val(newVal);//当前行至上一个存在值的摘要之间的摘要格赋值
                        $(this).closest('tr').children('td').eq(1).find('input').val(newVal);//当前行摘要赋值
                    }
                    break;
                }
            }
        }
    });
    //表格输入框回车切换方法
    $(document).on('keyup','.inputboxtable input:text', function (e) {
        var key = e.which;
        if (key == 13) {
            $(this).closest('td').next().find('input').prev('div').hide();
            $(this).closest('td').next().find('input').show();
            e.preventDefault();
            var nxtIdx = $('input:text').index(this) + 1;
            $(":input:text:eq(" + nxtIdx + ")").focus();
        }
    });
//    focusShift();
//    function focusShift(){
//        var $inp = $('input:text');
//        $inp.bind('keyup', function (e) {
//            var key = e.which;
//            if (key == 13) {
//                $(this).closest('td').next().find('input').prev('div').hide();
//                $(this).closest('td').next().find('input').show();
//                e.preventDefault();
//                var nxtIdx = $inp.index(this) + 1;
//                $(":input:text:eq(" + nxtIdx + ")").focus();
//            }
//        });
//    }

    //附单
    $('#elseData').keyup(function (event) {
        $(this).val($(this).val().toString().replace(/\b(0+)/gi,""));//去掉数字前面的0
    });
//    浏览点击
    $('#browse').click(function () {
        $(".brobox").remove();
        var _this = $(this);
        var src = _this.data('src');
        var valin = _this.data("valin"); //选择后选择值存储的控件name
        var namecol = _this.data("namecol"); //json数组中的显示字段名
        var valcol = _this.data("valcol"); //json数组中的传输值字段名
        var keyword = $(this).prev('input').val();
        $('body').append("<div class=\"brobox\"><table class=\"broboxtable zxsaastable\"><thead><tr><td>序号</td><td>摘要</td></tr></thead><tbody></tbody>\n</table></div>");
        $.getJSON(src, {
            keyword: keyword
        }, function (r) {
            $.each(r.data.rows, function (i, item) {
                for (var key in item) {
                    if($('.broboxtable').children('tbody').find('tr').length>=5){
                        break;
                    }else{
                        $('.broboxtable').children('tbody').append('<tr><td>' + i + '</td><td>' + item[summry] + '</td></tr>');
                    }
                }
            });
        });
        var _this_t = $(this).prev('input').offset().top;
        var _this_l = $(this).prev('input').offset().left;
        var _this_h = $(this).prev('input').height();
        $('.brobox').css({
            'top': _this_t + _this_h+10,
            'left': _this_l
        });
        $('.zxsaastable').css('background','#fff');
        $(this).focusout(function () {
            $(".brobox").remove();
        });
    });

    $(document).on('keyup','.input2selectbox', function (event) {
        if($(this).find('input').val()==''&&event.keyCode!=13){
            $('.SubAssbox').remove();
        }else if($(this).find('input').val()!=''&&event.keyCode!=13){
            //keyup事件做模糊搜索
            $(".SubAssbox").remove();
            var _this=$(this).find('input');
            var src=_this.data('src');
            var valin = _this.data("valin"); //选择后选择值存储的控件name
            var namecol = _this.data("namecol"); //json数组中的显示字段名
            var valcol = _this.data("valcol"); //json数组中的传输值字段名
            var keyword=_this.val();
            $('body').append("<div class=\"SubAssbox\"><table class=\"SubAssboxtable zxsaastable\"><thead><tr><td>科目编码</td><td>科目名称</td></tr></thead><tbody></tbody>\n</table></div>");
            $.getJSON(src,{
                keyword:keyword
            }, function (r) {
            	for(var i=0;r.data.rows.length;i++){
            		  if($('.SubAssboxtable').children('tbody').find('tr').length>=10){
                          break;
                      }else{
                          $('.SubAssboxtable').children('tbody').append('<tr><td>'+r.data.rows[i].subjectCode+'</td><td>'+ r.data.rows[i].subjectName+'</td></tr>');
                      }
            	}
            });
            var _this_t=$(this).find('input').offset().top;
            var _this_l=$(this).find('input').offset().left;
            var _this_h=$(this).find('input').height();
            $('.SubAssbox').css({
                'top':_this_t+_this_h,
                'left':_this_l
            });
            $('.zxsaastable').css('background','#fff');
            $(this).focusout(function () {
                $(".SubAssbox").remove();
            });
        }else if(event.keyCode==13){
            //保存录入信息并关闭弹出框
            $(this).blur();
            $('.SubAssbox').remove();
        }
    });

//    摘要
    var _this_zhaiyao;
    $(document).on("click", ".input2table .icon-search", function () {//弹出全部选择窗口
        _this_zhaiyao = $(this);
        $("#maxselect .modal-title").text("常用摘要参照");
        loadingmodal();
        $("#maxselect").modal("show");
        //弹出框双击事件
        $('#accountTable tbody tr').dblclick(function () {
            var dbTxt = $(this).children('td').eq(2).text();
            $("#maxselect").modal("hide");
            _this_zhaiyao.prev('input').val(dbTxt);
        });
    });
//    $('.input2selectbox input:even').dblclick(function () {//科目名称
//
//    });
//    $('.input2selectbox input:odd').dblclick(function () {//辅助项
//
//    });
    //初始化科目、辅助项
    SubAss();
    function SubAss(){
        var _this_Sub;
        var permit = false;//是否存在辅助项
        $('.input2selectbox input:even').closest('td').find('i').click(function () {//科目角标
            _this_Sub =$(this).parent().find('input');
            $("#myModelSub").modal("show");
            $('#SubTable tbody tr').dblclick(function () {
                var dbTxt = $(this).children('td').eq(4).text();
                $("#myModelSub").modal("hide");
                _this_Sub.val(dbTxt);
                permit = true;
                if (permit) {
                    $("#myModelAss").modal("show");
                    $('#AssTable tbody tr').dblclick(function () {
                        var dbTxt = $(this).children('td').eq(1).text();
                        $("#myModelAss").modal("hide");
                        _this_Sub.closest('td').next('td').find('input').val(dbTxt);
                    });
                }
            });
        });
        var _this_Ass;
        $('.input2selectbox input:odd').closest('td').find('i').click(function () {//辅助角标
            _this_Ass = $(this);
            if ($(this).closest('td').prev().find('input').val() != '') {
                $("#myModelAss").modal("show");
                $('#AssTable tbody tr').dblclick(function () {
                    var dbTxt = $(this).children('td').eq(2).text();
                    $("#myModelAss").modal("hide");
                    _this_Ass.val(dbTxt);
                });
            } else {
                alert('科目为空')
            }
        });
    }
    //            辅助项隐藏与显示
    function AssShow() {
        $('.headbox thead tr th:eq(3)').show();
        $('.inputboxtable tbody tr td:nth-child(4)').show();
    }
    function AssHide() {
        $('.headbox thead tr th:eq(3)').hide();
        $('.inputboxtable tbody tr td:nth-child(4)').hide();
    }
    $('.Amountbox').keydown(function(){//借贷框按钮限制
        return GetInput();
    });
    //数字键盘
    function GetInput(){//屏蔽非数字和非退格符
        var k = event.keyCode;   //48-57是大键盘的数字键，96-105是小键盘的数字键，8是退格符←，110是小键盘小数点，32是空格键
        if ((k <= 57 && k >= 48) || (k <= 105 && k >= 96) || (k== 110)||(k==109)||(k==189)||(k==8)||(k==32)){
            return true;
        } else {
            return false;
        }
    }
    //借贷框录入时清除对方val，当输入空格键时交换val
    $(document).on('keyup','.Debit input', function () {
        if(event.keyCode==32&&event.keyCode!=13&&$(this).closest('td').next().find('input').val()==''){//当按下空格非回车且对方input值为空时，把自己的值赋值给对方，自己值为空
            var _thisValLeft=$(this).val();
            $(this).val('');
            formatint($(this).closest('td').next().find('input').val(Number(_thisValLeft)));
        }else if(event.keyCode==32&&event.keyCode!=13&&$(this).closest('td').next().find('input').val()!=''){//当按下空格非回车且对面值不为空时拿取对方值，对方值为空
            var _thisValRight=$(this).closest('td').next().find('input').val();
            $(this).closest('td').next().find('input').val('');
            formatint($(this).val(_thisValRight));
            formatint($(this).closest('td').next().find('input').val(''));
        }else if(event.keyCode==13){
            //..解决回车键焦点切换冲突
        }else if(event.keyCode==109){//允许小键盘‘-’键，松开按键时不管其在哪里出现一律删除并且在此数字前添加‘-’
            $(this).val('-'+$(this).val().replaceAll('-',''));
        }else{
            $(this).closest('td').next().find('input').val('');
            formatint($(this).closest('td').next().find('input'));
        }
    });
    $(document).on('keyup','.Credit input', function () {
        if(event.keyCode==32&&event.keyCode!=13&&$(this).closest('td').prev().find('input').val()==''){
            var _thisValLeft=$(this).val();
            $(this).val('');
            formatint($(this).closest('td').prev().find('input').val(Number(_thisValLeft)));
        }else if(event.keyCode==32&&event.keyCode!=13&&$(this).closest('td').prev().find('input').val()!=''){
            var _thisValRight=$(this).closest('td').prev().find('input').val();
            $(this).closest('td').prev().find('input').val('');
            formatint($(this).val(_thisValRight));
            formatint($(this).closest('td').prev().find('input').val(''))
        }else if(event.keyCode==13){
            //..解决回车键焦点切换冲突
        }else if(event.keyCode==109){
            $(this).val('-'+$(this).val().replaceAll('-',''));
        }else{
            $(this).closest('td').prev().find('input').val('');
            formatint($(this).closest('td').prev().find('input'));
        }
    });

    $(document).on("focusout", ".Amountbox input", function () {//借贷框 当input控件失去焦点的时候
        formatint($(this));//格式化当前控件的值 到金额中
        var newval,nArr;
        if($(this).val().indexOf('-')!=-1){//借贷框中存在负号，倒数第三位数字后面添加小数点，数前添加‘-’，赋值给此input
            newval=Number($(this).prev().find('font').text());
            nArr=newval.toString().split('');
            nArr.splice(newval.toString().length-2,0,'.');
            $(this).val('-'+nArr.join(''));
        }else if($(this).val()==0){//当此input框值为0时失去焦点后赋值为空
            $(this).val('')
        }else{
            newval=Number($(this).prev().find('font').text());
            nArr=newval.toString().split('');
            nArr.splice(newval.toString().length-2,0,'.');
            $(this).val(nArr.join(''));
        }
        $(this).parents("td").find("div").show();
        $(this).parents("td").find("input").hide();
        //计算列汇总开始
        var CreditSum = 0;//初始化借方合计变量
        var DebitSum = 0;//初始化贷方合计变量
        $.each($(this).parents(".grp_table").find(".inputboxtable tr"), function (i, item) {//循环需要输入的表格
            var Creditval = $(item).find("td.Credit>input").val();//获取借方值
            CreditSum = CreditSum + Number(Creditval);//借方值累加进借方合计
            var Debitval = $(item).find("td.Debit>input").val();//获取贷方值
            DebitSum = DebitSum + Number(Debitval);//贷方值累加进贷方合计
            if (Creditval == "" && Debitval == "") {
                $(item).addClass("noinput");//如果借方值和贷方值 都为空  标识该行为空行
            } else {
                $(".noinput").removeClass("noinput");//清除之前所有的空行标识
                $(item).addClass("oninput");//如果借方表格和贷方表格有一个不为空   标识该行为非空行
            }
        });
        if (CreditSum != DebitSum) {//如果借方合计不等于贷方合计，及合计账目不平
            var nexttrval = CreditSum - DebitSum;//计算合计差额值
            if (nexttrval < 0) {//如果差额值小于0
                $(this).parents(".inputboxtable").find("tr.noinput").eq(0).find("td.Credit input").val(0 - nexttrval);//获取到第一个没有输入值得行中  查找借方输入框并把差额值填入
                formatint($(this).parents(".inputboxtable").find("tr.noinput").eq(0).find("td.Credit input"));//格式化差额值
                $(this).parents(".grp_table").find(".footbox tr>td.CreditSum input").val(DebitSum);//给借方合计输入框赋值 ，
                formatint($(this).parents(".grp_table").find(".footbox tr>td.CreditSum input"));//格式化合计值
                $(this).parents(".grp_table").find(".footbox tr>td.DebitSum input").val(DebitSum);//给贷方合计输入框赋值 ，
                formatint($(this).parents(".grp_table").find(".footbox tr>td.DebitSum input"));// 格式化合计值
            } else {
                $(this).parents(".inputboxtable").find("tr.noinput").eq(0).find("td.Debit input").val(nexttrval);//获取到第一个没有输入值得行中  查找贷方输入框并把差额值填入
                formatint($(this).parents(".inputboxtable").find("tr.noinput").eq(0).find("td.Debit input"));//格式化差额值
                $(this).parents(".grp_table").find(".footbox tr>td.CreditSum input").val(CreditSum);//给借方合计输入框赋值 ，
                formatint($(this).parents(".grp_table").find(".footbox tr>td.CreditSum input"));// 格式化合计值
                $(this).parents(".grp_table").find(".footbox tr>td.DebitSum input").val(CreditSum);//给贷方合计输入框赋值 ，
                formatint($(this).parents(".grp_table").find(".footbox tr>td.DebitSum input"));// 格式化合计值
            }
        }
        //计算列汇总结束
    });


    $(".inputboxtable").on("click", "tr>td:first-child", function (event) {
        $(this).parents("tbody").find("tr").removeClass("clicktr");
        $(this).parents("tr").addClass("clicktr");
        var l = $(".clicktr").offset().left + 40;
        var t = $(".clicktr").offset().top + 20;
        $(".rowsclick").css({"left": l + "px", "top": t + "px"});
        $(".rowsclick").show();
        if ($(".clicktr").index() == $(this).parents("tbody").find("tr").size()) {
            maxnum = creattr(d_tr, maxnum, 10);//根据计数器创建表格
        }
        event.stopPropagation();
        return false;
    });
    $(".rowsclick").on("click", "a.add", function () {
        clicktr_a.addtr(d_tr, maxnum);//增行
        maxnum++;
    });
    $(".rowsclick").on("click", "a.copy", function () {
        clicktr_a.copytr($(".clicktr"));//复制
        maxnum++
    });
    $(".rowsclick").on("click", "a.del", function () {
        clicktr_a.deltr($(".clicktr"));//删除
        maxnum--
    });
    $(".rowsclick").on("click", "a.inster", function () {
        clicktr_a.instertr($(".clicktr"), d_tr);//插入
        maxnum++
    });
});

function PrefixInteger(num, length) {//字段左补齐，填充字母a
    return (Array(length).join('a') + num).slice(-length);
}
function formatint(obj) {//金额数字格式化
    var val = $(obj).val();//获取当前对象的值
    if(val.toString().indexOf('-')>=0){
        $(obj).closest('td').find('font').css('color','red');//字体变红
        val=Number(val.replace('-',''));
    }else{
        $(obj).closest('td').find('font').css('color','#000');
    }
    //四舍五入保留两位小数
    var numArr = Number(val).toFixed(2).split('');
    numArr.splice(-3, 1);
    val = numArr.join('');
    val = PrefixInteger(val, 11);//按11位左填充a
    var valArr = val.split("");//将字段按字符分割为数组
    for (var i = 0; i < 11; i++) {//遍历数组
        if (valArr[10 - i] == "a") {//如果数组值为填充值
            $(obj).parents("td").find("div>font").eq(10 - i).html("&nbsp;");//给填制font填入空格
        } else {
            $(obj).parents("td").find("div>font").eq(10 - i).text(valArr[10 - i]);//给填制font填入当前下标的值
        }

    }
}

function creattr(tr, maxnum, num) {//创建表格方法
    for (var i = 1; i < num + 1; i++) {//循环10次  每次创建10行
        maxnum++;
        $(".inputboxtable tbody").append(tr.clone());//在表格中填充行的克隆
        $(".inputboxtable tbody tr:last-child td:first-child").text(maxnum);//修改序号列的值
        $(".inputboxtable tbody tr:last-child").find("input[ name='zy']").autCompleteTable({//初始化表格中input2autocompettable插件
            thead: '<thead><tr><th>序号</th><th>店名</th></tr></thead>\n',//给插件传入表头
            tbody: '<tr><td>{{xh}}</td><td>{{md}}</td></tr>\n',//给插件传入行模板
            parentbox: $(".grp_table .nano"),
            ontrclick: function (obj, self, valself) {//重置插件的tr点击方法
//		console.log(obj);
//		console.log(self);
//		console.log(valself);
            }
        });
    }

    $(".nano").nanoScroller();//初始化滑款插件
    return maxnum;
}
function loadingmodal() {
    $.getJSON("kntree.json", function (r) {
        var setting = {
            data: {
                simpleData: {
                    enable: true
                }
            }
        };
        $.fn.zTree.init($("#accountTree"), setting, r.data.rows);
    });
}
var clicktr_a = (function () {
    var addtr = function (d_tr, maxnum) {
        creattr(d_tr, maxnum, 1);
    };
    var deltr = function (tr) {
        var tbody = tr.parents("tbody");
        tr.remove();
        serialize(tbody);
    };
    var copytr = function (tr) {
        tr.after(tr.clone());
        serialize(tr.parents("tbody"));
    };
    var instertr = function (tr, d_tr) {
        tr.after(d_tr.clone());
        serialize(tr.parents("tbody"));
    };
    var serialize = function (tbody) {
        $.each(tbody.find("tr"), function (i, item) {
            $(item).find("td").eq(0).text(i + 1);
        });
    };
    return {
        addtr: addtr,
        deltr: deltr,
        copytr: copytr,
        instertr: instertr
    }
})();