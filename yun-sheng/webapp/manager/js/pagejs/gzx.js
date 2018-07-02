$(function(){
	inputStork.tableLoad("../../json/inputStork.json") ;              //加载表格数据
    inputStork.comeWindow();                                                               //加载弹窗事件
});

 var inputStork ={
 	tableLoad:function(jsonurl){
 		$.getJSON(jsonurl, function(r){
 			var listr ='';
 			$.each(r, function(i,item1){
 					$.each(item1, function(j,item2){
 						var tlst=item2.tableList;
 						$.each(tlst, function(k,item3){
			 				
			 				listr+='<tr>'+
			 				    '<td><input type="text" name="hh"   id="" value="'+item3.hh +'" placeholder="" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="cz"   id="" value="'+item3.cz+'" placeholder="" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="dcmc" id="" value="'+item3.dcmc+'" placeholder="" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="spmc" id="" value="'+item3.spmc+'" placeholder="" class="form-control t-ipt"/></td>'+
			         			'<td><input type="text" name="count"id="" value="'+item3.count+'" placeholder="弹出" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="hsdj" id="" value="'+item3.hsdj+'" placeholder="" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="hsje" id="" value="'+item3.hsje+'" placeholder="系统自动生成" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="dj"   id="" value="'+item3.dj+'" placeholder="" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="je"   id="" value="'+item3.je+'" placeholder="系统自动生成" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="zkl"  id="" value="'+item3.zkl+'" placeholder="" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="zkje" id="" value="'+item3.zkje+'" placeholder="系统自动生成" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="zhje" id="" value="'+item3.zhje+'" placeholder="系统自动生成" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="sl"   id="" value="'+item3.sl+'" placeholder="" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="se"   id="" value="'+item3.se+'" placeholder="系统自动生成" class="form-control t-ipt"/></td>'+
			        			'<td><input type="text" name="bz"   id="" value="'+item3.bz+'" placeholder="" class="form-control t-ipt"/></td></tr>';
        		   });//end_each1
        	
 				});//end_each2
 				   $("tbody").append(listr);
 			});//end_each3
 			
 		});
 	},//end_tableLoad (加载表格数据)
 	
 	
 	comeWindow:function(){
          	$(document).on("click","tbody tr input[name=count]",function(){
          
          	    var listr ='';
          	    var $obj=$(this);
          	  	$("#gridSystemModalLabel").modal("show");
 		        // $(".container-fluid").find(".container-fluid .row").remove();
 		        
 		        
          	});
          	
          	$(document).on("keydown",".MINEinputbox input[type='text']",function(event){
          		if(event.keyCode==13)
          		{
//        	          if($(".inputbox .show").is(":visible")){
//        	          	$(".inputbox .show").hide();
//        			$(".inputbox .hide").show();
//        	          }else{
//        	          		$(".inputbox .show").show();
//        			$(".inputbox .hide").hide();

$(".MINEinputbox span").removeClass("inputhide");
$(this).parents("span").addClass("inputhide");
$(".MINEinputbox span[class!='inputhide'] input").focus();



          	        //  }
          		
          		    
          			
          	}
          		
          		
          	});
          	
 	/*	$("tbody tr").each(function(idx_tr){
//            var spmc='';
//            var count='';
//            var tr_content={};
// 			$.each(this.cells,function(i,item){
// 				if($(item.innerHTML).attr('name')=="spmc"){
// 					spmc=$(item.innerHTML).val();
// 				}
// 				if($(item.innerHTML).attr('name')=="count"){
// 					count=$(item.innerHTML).val();
// 					
// 				}
// 				
// 			})//end_this.cells

   			$(document).on("click",$(this).find("input[name=count]"),function(idx_tr){
 		                            //设置弹窗
						//tr["spmc"]=spmc;      // 待用
						//tr["count"]=count;   //待用
						//  loadModal(idx_tr);//行索引
			console.log("hhhhhh");			
		         $.getJSON("../../json/inputStork.json", function(r){
 			            var listr ='';
 			             $.each(r, function(i,item1){
 					          $.each(item1, function(j,item2){
 						       var tlst=item2.tableList;
 						       $.each(tlst, function(k,item3){
			 				      if(k==idx_tr){//表格索引与json索引相同
					 				   	$.each(item3.stockIMEI,function(i,item){
					   				             console.log(item.xh+" "+item.zch+""+item.fch);
		   				
		   			                     })
			 				      }//end_if

        		               });//end_each1
        	
 				             });//end_each2
 				   $("tbody").append(listr);
 			             });//end_each3
 			
 		         });
// 					    $("#gridSystemModalLabel").modal("show");//显示弹窗
 	     });
 		
// 				
// 				if(i==3){
// 					console.log($(item.innerHTML).val());
// 				}
// 				if(i==4){
// 					$(item).click(function(){
// 						console.log($(item.innerHTML).val());
// 							$("#gridSystemModalLabel").modal("show");
// 					});
// 				}
// 				
// 			})
 	//	111	$(this.cells).find("input[name=count]").click(function(){
// 				consle.log($(this).val());
// 				$("#gridSystemModalLabel").modal("show");
// 			})
// 	222		$.each(this.cells,function(i,item){
// 				
// 				if(i==3){
// 					console.log($(item.innerHTML).val());
// 				}
// 				if(i==4){
// 					$(item).click(function(){
// 						console.log($(item.innerHTML).val());
// 							$("#gridSystemModalLabel").modal("show");
// 					});
// 				}
// 				
// 			})
 		
 			
 			
 		   //	alert(this+index);
 		   // console.log(index);
// 			  $(this).each(r,function(i,tditem){
// 			  	if(tditem.name==count){
// 			  		alert(i);
// 			  	}
// 			      	$(tditem[name=""]).click(function(){
//                 		alert(i);
////                   	   // console.log(index);
////                   	   
//                });
 			//  });
//                $(this).click(function(){
//                   		alert(index);
//                   	   // console.log(index);
//                   	   
//                });
        });//end_$("tbody tr")
        
     */   
        
 			
 },
       loadModal:function(index){//设置弹窗
       	$.getJSON(jsonurl, function(r){
 			var listr ='';
 			$.each(r, function(i,item1){
 					$.each(item1, function(j,item2){
 						var tlst=item2.tableList;
 						$.each(tlst, function(k,item3){
			 				   if(k==index){//表格索引与json索引相同
					 				   	$.each(item3.stockIMEI,function(i,item){
					   				             console.log(item.xh+" "+item.zch+""+item.fch);
		   				
		   			                     })
			 				   }//end_if
//			 				listr+='<tr>'+
//			 				    '<td><input type="text" name="hh"   id="" value="'+item3.hh +'" placeholder="" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="cz"   id="" value="'+item3.cz+'" placeholder="" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="dcmc" id="" value="'+item3.dcmc+'" placeholder="" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="spmc" id="" value="'+item3.spmc+'" placeholder="" class="form-control t-ipt"/></td>'+
//			         			'<td><input type="text" name="count"id="" value="'+item3.count+'" placeholder="弹出" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="hsdj" id="" value="'+item3.hsdj+'" placeholder="" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="hsje" id="" value="'+item3.hsje+'" placeholder="系统自动生成" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="dj"   id="" value="'+item3.dj+'" placeholder="" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="je"   id="" value="'+item3.je+'" placeholder="系统自动生成" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="zkl"  id="" value="'+item3.zkl+'" placeholder="" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="zkje" id="" value="'+item3.zkje+'" placeholder="系统自动生成" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="zhje" id="" value="'+item3.zhje+'" placeholder="系统自动生成" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="sl"   id="" value="'+item3.sl+'" placeholder="" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="se"   id="" value="'+item3.se+'" placeholder="系统自动生成" class="form-control t-ipt"/></td>'+
//			        			'<td><input type="text" name="bz"   id="" value="'+item3.bz+'" placeholder="" class="form-control t-ipt"/></td></tr>';
        		   });//end_each1
        	
 				});//end_each2
 				   $("tbody").append(listr);
 			});//end_each3
 			
 		});
       }
 	
 		
 		
 		
 		
 		//$(document).on("click","input[name=count]",function(){
 		
//                   $("tbody tr").each(function(index){
//                   	$(this).click({
//                   	//	alert("43545");
//                   	    console.log(index);
//                   	});
//                   })
//			console.log($("input[name=count]"));
// 			$("#gridSystemModalLabel").modal("show");
 	//	});
 		
 	
 	
 };
	
	
	
//	$(document).on("click",option.addbutton,function(event){
//		var editid=$(this).data("editid");
//		var idname=$(this).parent().parent().siblings(".tablebox").children().children().attr('id');
//		var idtruename=idname.slice(5,idname.length);
//		var ids=(commonModal.commonmodalobj.find("#"+idtruename)).jqGrid("getGridParam",'selarrrow');
//		var modelname=((commonModal.commonmodalobj.find("#"+idtruename)).jqGrid("getRowData",ids[0])).name;
//		if(ids.length==1){
//			(commonModal.commonmodalobj.find("#newprj input[name='parentId']")).val(ids[0]);
//			(commonModal.commonmodalobj.find("#newprj .parentName")).text(modelname);
//		}else if(ids.length==0){
//			
//		}else{
//			$.scojs_message('新增时最多选中一行', $.scojs_message.TYPE_ERROR);
//			return false;
//		}
//		commonModal.commonmodalobj.find("#newprj").modal("show");
//	});