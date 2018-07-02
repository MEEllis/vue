var websocket = null;
$(function() {
	var tHours = 0;
	var tMinutes = 0;
	var go;
	webSocketMsg();
});

function webSocketMsg() {
	// 判断当前浏览器是否支持WebSocket
	if ('WebSocket' in window) {
        websocket = new ReconnectingWebSocket("wss://"+host+"/websocket");
        //websocket = new ReconnectingWebSocket("ws://localhost:8080/websocket");
		// 收到服务端消息
		websocket.onmessage = function(event) {
			if ("force_kickOut" == event.data) {
				$.zxsaas_plus.showconfirm("提示", "您已被集团管理员强制下线，请重新登录系统！", funyes,
						funno);
			}
			else if ("auth_kickOut" == event.data) {
				$.zxsaas_plus.showconfirm("提示", "您已被管理员重新授权，请重新登录系统！", funyes,
						funno);
			}
            else if ("repeat_kickOut" == event.data) {
				$.zxsaas_plus.showconfirm("提示", "您的账号在另一浏览器上登录，您被挤下线，请重新登录系统！",
						funyes, funno);
			}
            else if ("expired_kickOut" == event.data) {
				$.zxsaas_plus.showconfirm("提示", "您公司使用账号已过期，您将被强制下线，请反馈公司管理人员进行续费！",
						funyes, funno);
			}
            else if($.isPlainObject(JSON.parse(event.data))){
				var billsObj=JSON.parse(event.data);
				//云打印
				if(billsObj.code=='retail_print'){
                   var  billsId=billsObj.billsId;

                    $.ajax({
                        type: 'post',
                        url: '/manager/inventory/common/getSectionPrintParamVo',
                        data: {computerCode: computerCode},
                        success: function (data) {
                            var paramVo = data.data.paramVo || {};
                            if (paramVo.computerCode) {
								if(paramVo.paperType=='小票76mm'){
                                    $.ajax({
                                        url: '/manager/inventory/retail/delivery/smallTicketPrint',
                                        type: "post",
                                        dataType: 'html',
                                        data: {id:billsId},
                                        success: function (data) {
                                            $(".billsDIVWrap").remove();
                                            $('body').append($(data))
                                            YUNLodoXiaoPiaopPrint(billsObj.onlinePayFlag,paramVo.printerName);
                                        },error: function (msg) {
                                            $.loading(true);
                                            $.zxsaas_plus.showalert("提示","服务器繁忙,请稍后重试!");
                                        }
                                    });
								}else{
									// a4
                                    $.ajax({
                                        url: '/manager/inventory/retail/cashier/sytkaidan',
                                        type: "post",
                                        dataType: 'html',
                                        data: {billsId:billsId},
                                        success: function (data) {
                                            $(".billsDIVWrap").remove();
                                            var $data=$(data);
                                            var $ccc;
                                            for(var i=0;i<$data.length;i++){
                                                if($($data[i]).attr('id')=='billsDIV'){
                                                     $ccc= $('<div class="billsDIVWrap" style="visibility: hidden;position: fixed;top: -1000px;" ></div>').append($data[i])
                                                }
											}
                                     		 $('body').append($ccc)
                                           YUNLodoA4Print(paramVo.printerName);
                                        },error: function (msg) {
                                            $.loading(true);
                                            $.zxsaas_plus.showalert("提示","服务器繁忙,请稍后重试!");
                                        }
                                    });
								}

                            }
                        }
                    })


				}
			}
		};
		// 连接成功建立的回调
		websocket.onopen = function(){
//			console.log("websocket连接成功.");
		}
		// 连接发生错误的回调
		websocket.onerror = function(){
//			console.log("websocket连接发生了异常.");
		}
		// 连接关闭的回调
		websocket.onclose = function(){
//			console.log("websocket连接关闭了，重新连接.");
		}
		
		// 每天22点00分始清理在线的到期用户
		task(22, 00);
		
		// 每3分钟向服务器发一消息，保持ws连接不中断
		setInterval(sendTxt, 3*60*1000);
	} else {
		alert('当前浏览器 Not support websocket')
	}
}


function funyes() {
	window.location.href = "emp/empLogout";
}

function funno() {
	window.location.href = "emp/empLogout";
}

// 具体时间执行任务,hours:小时,minutes：分钟
function task(hours, minutes) {
	tHours = hours;
	tMinutes = minutes;
	go = setInterval(run, 10 * 1000);
}

function run() {
	var date = new Date();
	if ((date.getHours() - tHours == 0) && (date.getMinutes() - tMinutes == 0)) {
		clearInterval(go);
		websocket.send("expired_kickOut");
	}
}

//向服务器发送消息,起心跳作用,保持ws连接不中断
function sendTxt(){
	websocket.send("o");
}