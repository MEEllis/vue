$(function(){
	/**
	 * 测试
	 */
	$.request({
		url:'/manager/priceManage/parameterList',
		type:"get",
		dataType:"json",
		success:function(data){
		console.log(data)
		var extract = data.data.companyPriceExtract;
		$('#extractId').val(extract.id);
		if(extract.lessWholesaleFlag == 1){
			$('.firstWholesale').prop("checked",true);
		}
		if(extract.lessRetailFlag == 1){
			$('.firstCost').prop("checked",true);
		}
		if(extract.lessCostFlag == 1){
			$('.secondCost').prop("checked",true);
		}
		if(extract.lessWholecostFlag == 1){
			$('.secondRetail').prop("checked",true);
		}
	}
	})
	$("table tbody").each(function(){
		$(this).find("tr").eq(1).addClass("changeColor");
	})
})
$(".allowUser").click(function(){
	
	$(this).parents("tr").data("enableflag",$(this).prop("checked")?"1":"0");
	$(this).parents("tr").addClass("changeColor").siblings("tr").removeClass("changeColor");
	
});
$(".saveBtn").click(function(){
	getData();
})
function getData(){
	var arr=[];
	$("table").each(function(){
		var arr2=[];
		var $that=$(this);
		$(this).find("tr").each(function(){
			if($(this).index()!=0){
				var obj=$(this).data();
				var temp={};
				for(var i in obj){
					switch(i){
					case "companyid":
						temp.companyId=obj[i];
						break;
					case "createby":
						temp.createBy=obj[i];
						break;
					case "createdate":
						var date=new Date(obj[i]).getTime();
						temp.createDate=date;
						break;
					case "createdatestring":
						temp.createDateString=obj[i];
						break;
					case "enableflag":
						temp.enableFlag=obj[i];
						break;
					case "groupid":
						temp.groupId=obj[i];
						break;
					case "id":
						temp.id=obj[i];
						break;
					case "priceextracttype":
						temp.priceExtractType=obj[i];
						break;
					case "pricetypename":
						temp.priceTypeName=obj[i];
						break;
					case "pricetype":
						temp.priceType=obj[i];
						break;
					case "priority":
						temp.priority=obj[i];
						break;
					case "remark":
						temp.remark=obj[i];
						break;
					default:
						break;
					}
				}
				arr2.push(temp);
			}
			
		})
		arr.push(arr2);
	})
	
	$.ajax({
		url:"/manager/priceManage/savePriceExtract",
		type:"POST",
		dataType:"json",
		data:{
			valList:JSON.stringify(arr),
			'id' : $('#extractId').val(),
			'lessWholesaleFlag' : $('.firstWholesale').is(":checked")?"1":"0",
			'lessRetailFlag' : $('.firstCost').is(":checked")?"1":"0",
			'lessCostFlag' : $('.secondCost').is(":checked")?"1":"0",
			'lessWholecostFlag' : $('.secondRetail').is(":checked")?"1":"0"
		},
		success:function(data){
			if(data.result == 1){
				$.zxsaas_plus.showalert("提示","保存成功");
			}else{
				$.zxsaas_plus.showalert("提示",data.desc);
			}
		},
		error:function(){
			
		}
	})
}
/**
 * 调整优先级
 */
$(".getUp").click(function(){
	var target=$(this).parent().prev().children().find("tr.changeColor");
	if(target.index()>1){
		var temp=target.data("priority");
		target.data("priority",target.prev().data("priority"));
		target.prev().data("priority",temp);
		target.insertBefore(target.prev());
	}
});
$(".getDown").click(function(){
	var target=$(this).parent().prev().children().find("tr.changeColor");
	if(target.index()<$(this).parent().prev().children().find("tr").length-1){
		var temp=target.data("priority");
		target.data("priority",target.next().data("priority"));
		target.next().data("priority",temp);
		target.insertAfter(target.next());
	}
})
/**
 * 点击tr时变换颜色
 */
$(".table tbody").children("tr").each(function(){
	
	$(this).click(function(){
		$(this).has("td").addClass("changeColor").siblings("tr").removeClass("changeColor");
		var target=$(this);
		if($(this).parents("#firstCtrl").length!=0){
			
			$(".firstWholesale").prop("checked",target.data("lesswholesaleflag")==1);
			$(".firstWholesalePsw").prop("checked",target.data("salespwdcontrolflag")==1);
			$(".firstCost").prop("checked",target.data("lesscostflag")==1);
			$(".firstCostPsw").prop("checked",target.data("costpwdcontrolflag")==1);
		}else if($(this).parents("#secondCtrl").length!=0){
			$(".secondRetail").prop("checked",target.data("lessretailflag")==1);
			$(".secondRetailPsw").prop("checked",target.data("retailpwdcontrolflag")==1);
			$(".secondCost").prop("checked",target.data("lesscostflag")==1);
			$(".secondCostPsw").prop("checked",target.data("costpwdcontrolflag")==1);
		}
	})
})
/**
 * 下面的选框改变后上面标记状态发生改变
 */
$(".firstWholesale").click(function(){
	$("#firstCtrl").find(".changeColor").data("lesswholesaleflag",$(this).prop("checked")?"1":"0");
	$(this).prop("checked")||$(".firstWholesalePsw").prop("checked",false);
	$(this).prop("checked")||$("#firstCtrl").find(".changeColor").data("salespwdcontrolflag","0");
})
$(".firstWholesalePsw").click(function(){
	if(!$(".firstWholesale").prop("checked")){
		$(this).prop("disable",true);
		return false;
	}
	$("#firstCtrl").find(".changeColor").data("salespwdcontrolflag",$(this).prop("checked")?"1":"0")
})


$(".firstCost").click(function(){
	$("#firstCtrl").find(".changeColor").data("lesscostflag",$(this).prop("checked")?"1":"0");
	$(this).prop("checked")||$(".firstCostPsw").prop("checked",false);
	$(this).prop("checked")||$("#firstCtrl").find(".changeColor").data("costpwdcontrolflag","0");
})
$(".firstCostPsw").click(function(){
	if(!$(".firstCost").prop("checked")){
		$(this).prop("disable",true);
		return false;
	}
	$("#firstCtrl").find(".changeColor").data("costpwdcontrolflag",$(this).prop("checked")?"1":"0")
})
/**
 * 右侧选框改变时上面的标记状态改变
 */
$(".secondRetail").click(function(){
	$("#secondCtrl").find(".changeColor").data("lessretailflag",$(this).prop("checked")?"1":"0");
	$(this).prop("checked")||$(".secondRetailPsw").prop("checked",false);
	$(this).prop("checked")||$("#secondCtrl").find(".changeColor").data("retailpwdcontrolflag","0");
})
$(".secondRetailPsw").click(function(){
	if(!$(".secondRetail").prop("checked")){
		$(this).prop("disable",true);
		return false;
	}
	$("#secondCtrl").find(".changeColor").data("retailpwdcontrolflag",$(this).prop("checked")?"1":"0");
	
})
$(".secondCost").click(function(){
	$("#secondCtrl").find(".changeColor").data("lesscostflag",$(this).prop("checked")?"1":"0");
	$(this).prop("checked")||$(".secondCostPsw").prop("checked",false);
	$(this).prop("checked")||$("#secondCtrl").find(".changeColor").data("costpwdcontrolflag","0");
})
$(".secondCostPsw").click(function(){
	if(!$(".secondCost").prop("checked")){
		$(this).prop("disable",true);
		return false;
	}
	$("#secondCtrl").find(".changeColor").data("costpwdcontrolflag",$(this).prop("checked")?"1":"0")
})