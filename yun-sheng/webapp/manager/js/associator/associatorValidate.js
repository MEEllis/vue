
/**************************[type-add.jsp]会员卡类型新增验证Start********************************************************/
//top info vadidate
$("#togglingForm").bootstrapValidator({
    message:'This value is not valid',
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
    	activeTime: {//有效时间
             trigger: 'blur',
             validators: {
			     notEmpty: {
			        message: '该项为必填项!'
			     },
                 Dig_Positive_vacume:{
			    	message: '该项大于0的整数!' 
                 }
    
             }
         },
         typeCode: {//类型编码
             trigger: 'blur',
             validators: {
        		notEmpty: {
		          message: '该项为必填项!'
		       },
	        	 Dig_Aph: {
	               message: '只允许输入数字或者字母！'
	            },
	            stringLength: {
	            	max: 32,
	            	message: '类型名称最多输入32个字符！'
	           }
             }
         },
         typeName: {//类型名称
             trigger: 'blur',
             validators: {
        		notEmpty: {
		          message: '该项为必填项!'
		       },
             }
         },
         sizeN:{//密码位数
        	 trigger: 'blur',
        	 validators:{
		        notEmpty:{
		           message: '请输入密码位数！'
		       },
	        	 valueMin:{  
	               message: '密码大于等于6位！'  
	            }
              }
         },
         remark:{
        	 stringLength: {
		         	max: 100,
		         	message: '备注最多输入100个字符！'
            }
         }
    }/*——end fields——*/
});

//togglingFormJF

$("#togglingFormJF").bootstrapValidator({
    message:'This value is not valid',
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
    	 xamount:{//消费金额
	    	 trigger: 'blur',
			 validators: {
		    	 notEmpty:{
		        	message: '该项为必填项!'
			     },
			     Dig_Positive_vacume:{
				    message: '请输入正整数！'
				 }
	         }
    	
         },
         xsoure:{//对应积分
        	 trigger: 'blur',
        	 validators: {
	        	 notEmpty:{
		        	message: '该项为必填项!'
			     },
			     Dig_Positive_vacume: {
			        message: '请输入正整数!'
			      }
             }
         },
         damount:{//每##积分
        	 trigger: 'blur',
        	 validators: {
//	            notEmpty: {
//		          message: '该项为必填项!'
//		       },
        	    Dig_Vacume: {
			        message: '请输入正整数或者零!'
			    }
             }
         },
         dsoure:{//抵##元
        	 trigger: 'blur',
        	 validators: {
//	        	notEmpty: {
//		          message: '该项为必填项!'
//		       },
	        	integer: {
			      message: '只允许输入数字！'
			    }
	        	
             }
         }
    }/*——end fields——*/
});

   //togglingFormZK
$("#togglingFormZK").bootstrapValidator({
    message:'This value is not valid',
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
    	rate:{//通用折扣率
	    	 trigger: 'blur',
			 validators:{
			    notEmpty:{
			        message: '该项为必填项!'
			     },
	    	     Dig_Point:{
				    message: '请输入整数或者小数!'
				 }
	         }
    	
         }
    }/*——end fields——*/
});

//togglingFormSJ
$("#togglingFormSJ").bootstrapValidator({
    message:'This value is not valid',
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
    	tjNum:{//统计时间段
	    	 trigger: 'blur',
			 validators:{
			    notEmpty:{
			        message: '该项为必填项!'
			     },
			     Dig_Positive_vacume:{
				    message: '请输入数字!'
				 }
	         }
    	
         }
    }/*——end fields——*/
});

/**************************[multi-score.jsp]多倍积分验证Start********************************************************/

//togglingFormjfbs
$("#togglingFormjfbs").bootstrapValidator({
    message:'This value is not valid',
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
    	brithNum:{//会员生日积分倍数
	    	trigger: 'blur',
			 validators:{
		     Dig_Positive_vacume:{
				    message: '请输入正整数！'
				 }
	        }
    	},
    	multiNum:{//积分倍数
	    	 trigger: 'blur',
			 validators:{
	    	 notEmpty:{
		        message: '该项为必填项!'
		     },
    	     Dig_Positive_vacume:{
				    message: '请输入正整数！'
				 }
	         }
    	
         }
    }/*——end fields——*/
});

/**************************[asso-upgrade.jsp]会员类型升级验证Start********************************************************/

//togglingFormSJTJ
$("#togglingFormSJTJ").bootstrapValidator({
  message:'This value is not valid',
  feedbackIcons: {
       valid: 'glyphicon glyphicon-ok',
       invalid: 'glyphicon glyphicon-remove',
       validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
//	  beginTime:{//开始日期
//	    	 trigger: 'blur',
//			 validators:{
//				 notEmpty:{
//				  message: '该项为必填项!'
//				 }
//	         }
//       },
//       endTime:{//结束日期
//	    	 trigger: 'blur',
//			 validators:{
//			   notEmpty:{
//			      message: '该项为必填项!'
//			   }
//	         }
//	
//     },
     cardMan:{//持卡人
    	 trigger: 'blur',
		 validators:{
		   minLength2_dig_vacume:{
	 		  message: '最少输入2位!' 
	 	   },
	 	  Cn_lt_Dig_Point:{
 			  message: '请输入中文、英文、数字或者小数点!'  
		   }
         }

      },
      phone:{//手机号
     	 trigger: 'blur',
 		 validators:{
 		   minLength11_dig_vacume:{
 			  message: '最少输入11位!' 
 		   },
 		   Dig_Vacume:{
 			  message: '请输入数字!'  
		   }
          }

       },
       assoCard:{//会员卡号（name可能会变动）
    	 trigger: 'blur',
   		 validators:{
	   		Dig_Positive_vacume:{
	   	      message: '请输入正整数!' 
	   	   }
         }
    	   
       }
  }/*——end fields——*/
});

/**************************[addService.jsp]增值服务验证Start********************************************************/

/*新增验证*/
$("#addServiceAddForm").bootstrapValidator({/*增值服务新增验证*/
    message:'This value is not valid',
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
         serviceName: {//服务名称
             trigger: 'blur',
             validators: {
                 notEmpty: {
                     message: '该项为必填项！'
                 }

             }
         },
         serviceDue:{//服务期限
             trigger: 'blur',
             validators: {
	        	 Dig:{
	                	 message: '请输入数字！'
	                 }

             }
         },
         userNum:{//有效期内可服务次数
             trigger: 'blur',
             validators: {
	        	 Dig:{
	                	 message: '请输入数字！'
	                 }

             }
         },
         setPrice:{//预设定价
             trigger: 'blur',
             validators: {
        	 Dig_Point:{
	                  message: '请输入整数或者小数！'
	                 },
             Dig_Point2:{
            	      message: '小数点后最多保留两位！'
             }

             }
         }
                 
    }/*——end fields——*/
});


/*修改验证*/
$("#addServiceModifyForm").bootstrapValidator({/*增值服务新增验证*/
    message:'This value is not valid',
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
         serviceName: {//服务名称
             trigger: 'blur',
             validators: {
                 notEmpty: {
                     message: '该项为必填项！'
                 }
             }
         },
         serviceDue:{//服务期限
             trigger: 'blur',
             validators: {
	        	 Dig:{
	                	 message: '请输入数字！'
	                 }

             }
         },
         userNum:{//有效期内可服务次数
             trigger: 'blur',
             validators: {
	        	 Dig:{
	                	 message: '请输入数字！'
	                 }

             }
         },
         setPrice:{//预设定价
             trigger: 'blur',
             validators: {
        	 Dig_Point:{
	                  message: '请输入整数或者小数！'
	                 },
             Dig_Point2:{
            	      message: '小数点后最多保留两位！'
             }

             }
         }
                 
    }/*——end fields——*/
});


/**************************[fa-card.jsp]增值服务验证Start********************************************************/

/*上部验证*/
$("#topValidate").bootstrapValidator({
    message:'This value is not valid',
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
    	cardholder:{//持卡人
    	  trigger: 'blur',
          validators: {
	    	 notEmpty: {
	            message: '该项为必填项！'
	         }

          }
        },
        cardPassword:{//持卡密码
           trigger: 'blur',
           validators: {
	         Dig:{
	            message: '请输入数字！'
	         }
         }
        },
    	effectivMon: {//有效日期
             trigger: 'blur',
             validators: {
    	      Dig_Vacume:{
                message: '请输入大于0的整数！'
             },
             four:{
                message: '请输入范围1-9999！' 
             }

             }
         },
         score:{//初始积分
             trigger: 'blur',
             validators: {
        	 notEmpty:{
	            message: '该项为必填项！'
	         },
	         Dig:{
	            message: '请输入自然数！'
	         }

             }
         }
                 
    }/*——end fields——*/
});


/*下部验证*/
$("#bottomValidate").bootstrapValidator({
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
    	tel1: {//手机号码1
             trigger: 'blur',
             validators: {
			     notEmpty: {
			        message: '该项为必填项！'
			     },
			     cellPhone:{
	                message: '请输入正确的手机号！'
	             }

             }
         },
         tel2:{//手机号码2
             trigger: 'blur',
             validators: {
	        	 Dig_Vacume:{
		                	 message: '请输入数字！'
		                 }
	
	             }
         },
//         certificateno:{//证件号
//             trigger: 'blur',
//             validators: {
//        	 certification:{
//	               message: '请输入15或18位正确格式的身份证号！'
//	            }
//
//             }
//         },
       qq:{//QQ号码
	       trigger: 'blur',
	       validators: {
        	 Dig:{
	             message: '请输入数字！'
	          }
	
	       }
	   }
//         
//         wechat:{//微信号
//             trigger: 'blur',
//             validators: {
//        	 Not_Cn_5:{
//	               message: '请输入至少5位的字母、数字或者符号！'
//	            }
//
//             }
//         },
//         alipay:{//支付宝账号
//             trigger: 'blur',
//             validators: {
//        	 Not_Cn:{
//	               message: '请输入字母、数字或者符号！'
//	            }
//
//             }
//         },//

         
                 
    }/*——end fields——*/
});


/**************************[score-update.jsp]积分调整Start********************************************************/

/*上部验证*/
$("#topAjustice").bootstrapValidator({
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
    	adjustScore: {//积分调整
             trigger: 'blur',
             validators: {
    	        Dig_Complete:{
		 	      message: '请输整数!' 
		 	   }

             }
         }
                 
    }/*——end fields——*/
});


/**************************[customer-info.jsp]客户管理信息验证Start********************************************************/

/*新增修改客户管理信息*/
$("#validateTopTest").bootstrapValidator({
    message:'This value is not valid',
    feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
    	cardholder:{//客户姓名
    	  trigger: 'blur',
          validators: {
	    	 notEmpty: {
	            message: '该项为必填项！'
	         }

          }
        },
        tel1: {//手机号码1
            trigger: 'blur',
            validators: {
			     notEmpty: {
			        message: '该项为必填项！'
			     },
			     cellPhone:{
	                message: '请输入正确的手机号！'
	             }

            }
        },
        tel2:{//手机号码2
            trigger: 'blur',
            validators: {
	        	 Dig_Vacume:{
		                	 message: '请输入数字！'
		                 }
	
	             }
        },
//        certificateno:{//证件号
//            trigger: 'blur',
//            validators: {
//       	    certification:{
//	               message: '请输入15或18位正确格式的身份证号！'
//	            }
//
//            }
//        },
        qq:{//QQ号码
 	       trigger: 'blur',
 	       validators: {
         	 Dig:{
 	             message: '请输入数字！'
 	          }
 	
 	       }
 	   }
                 
    }/*——end fields——*/
});


