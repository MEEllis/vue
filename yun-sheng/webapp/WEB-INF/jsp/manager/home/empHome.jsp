<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>云盛ERP</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/base.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/bootstrap.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/font-awesome.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont.css?v=${version}"/>

    <link rel="stylesheet" type="text/css" href="${basePath}/css/iconfont_qq.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/main.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/pagecss/mainskin.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/nanoscroller.css?v=${version}"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/css/zxsaas_plus.css?v=${version}"/>
    <script src="${basePath}/js/jquery-1.12.4.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/js/bootstrap.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/js/jquery.nanoscroller.js?v=${version}" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
        if (myBrowser() == 'IE55' || myBrowser() == 'IE6' || myBrowser() == 'IE7' || myBrowser() == 'IE8') {
            window.location.href = 'emp/empLogout';
        }

        function myBrowser() {
            var userAgent = navigator.userAgent;
            var isOpera = userAgent.indexOf("Opera") > -1;
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
            var isFF = userAgent.indexOf("Firefox") > -1;
            var isSafari = userAgent.indexOf("Safari") > -1;
            if (isIE) {
                var IE5 = IE55 = IE6 = IE7 = IE8 = false;
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                IE55 = fIEVersion == 5.5;
                IE6 = fIEVersion == 6.0;
                IE7 = fIEVersion == 7.0;
                IE8 = fIEVersion == 8.0;
                if (IE55) {
                    return "IE55";
                }
                if (IE6) {
                    return "IE6";
                }
                if (IE7) {
                    return "IE7";
                }
                if (IE8) {
                    return "IE8";
                }
            }//isIE end
            if (isFF) {
                return "FF";
            }
            if (isOpera) {
                return "Opera";
            }
        }


        var empId = ${empId};//用户ID
        var companyId = ${companyId};//公司ID
        var userId = "${SESSION_KEY_USER.login}";//用户名
        var host = "${host}";//
        function updatePwd() {
            //var reg = new RegExp(/^(?=.*[^\d]).{6,}$/);
            if ($("#newPwd").val().trim() == "") {
                $.zxsaas_plus.showalert("提示", "密码不能为空");
            }
            else {
//		    if (!reg.test($("#newPwd").val().trim())){
//				$.zxsaas_plus.showalert("提示","请按照密码规则设置您的新密码");
//			}
//		    else{
                if ($("#newPwd").val().trim() == $("#surePwd").val().trim()) {
                    $.ajax({
                        type: 'Post',
                        url: '/manager/authority/employeeInfo/updatePwd',
                        data: {rePwd: $("#newPwd").val().trim(), "isCheckPwd": "1"},
                        success: function (data) {
                            $.zxsaas_plus.showalert("提示", data.desc);
                            if (data.result == 1) {
                                $('#myModal_changePwd').modal('hide');
                            }
                        },
                        error: function (msg) {

                        }
                    });
                }
                else {
                    $.zxsaas_plus.showalert("错误", "两次密码输入不一致");
                }
            }
            //}
        }

    </script>
    <style>
        .icon-laptop{
            font-size: 20px !important;
            top: 14px;
            position: relative;
        }
    </style>
</head>
<body>
<div class="headerbox">
    <% HttpSession s = request.getSession(); %>
    <div class="logo"><img class="logo-img" src="${basePath}/images/logo5.png"/></div>
    <div class="menuAndSkin">
        <a class="menu"><i class="iconfont">&#xe63b;</i></a>
        <a class="skin">
            <i class="iconfont">&#xe6d2;</i>
            <font style="color: #c3d0e0; font-size: 14px; vertical-align: super; margin-left: 12px"><%=s.getAttribute("displayCode") %>
                &nbsp;<%=s.getAttribute("displayName") %>
            </font>
        </a>

    </div>
    <div class="headerboxright">
        <a class="myComponent" > <i class="icon icon-laptop"></i>
            <font>我的电脑</font>
        </a>
        <a href="https://wpa.qq.com/msgrd?v=3&uin=3525424100&site=qq&menu=yes" target="_blank"> <i class="iconfont_qq">&#xe507;</i>
            <font>在线咨询</font>
        </a>
        <a class="noread"> <i class="glyphicon glyphicon-bell" style="margin-top: 16px;"></i>
            <font>系统消息</font>
        </a>
        <a class="changepwd"> <i class="iconfont">&#xe649;</i>
            <font>修改密码</font>
        </a>
        <!--<a class="luckscreen"> <i class="iconfont">&#xe615;</i>
            <font>锁屏</font>
        </a>
        --><a class="exitbtn" href="emp/empLogout"> <i class="iconfont">&#xe6d8;</i>
        <font>用户退出</font>
    </a>


        <a class="admin"> <span class="usericon"><img src="${basePath}/images/nouser.jpg"/></span>
            <font><%=s.getAttribute("oprName") %>
            </font>
        </a>
    </div>
</div>
<div class="bodybox">
    <div class="body_left">
        <div class="body_leftbg"></div>
        <div class="body_leftctn menulist">

            <div class="nano">
                <div class="nano-content">
                    <ul class="mainMenuList">

                    </ul>
                </div>
            </div>

        </div>
    </div>


    <div class="body_right">
        <div class="navBox">
            <div class="tabBox">
                <div class="indexShadow"></div>
                <a data-href="id_0" class="active pad20">首页</a>
            </div>
            <div class="indexRight"><span class="glyphicon glyphicon-chevron-right"></span></div>
            <div class="indexLeft"><span class="glyphicon glyphicon-chevron-left"></span></div>
        </div>

        <div class="workBox">
            <div id="id_0" class="workCtn workChild  active clearfix">
                <div class="homeBox">
                    <div class="boxOne">
                        <div class="myDiv">
                            <h5>我的待办</h5>
                            <div class="dsbox">
                                <p><img src="${basePath}/images/report/ds.png"/></p>
                                <p class="myDivp auditCount"></p>
                                <p>待审订单</p>
                            </div>
                            <div class="dgzbox">
                                <p><img src="${basePath}/images/report/dgz.png"/></p>
                                <p class="myDivp postCount"></p>
                                <p>待过账单据</p>
                            </div>
                            <div class="dgsbox">
                                <p><img src="${basePath}/images/report/dgs.png"/></p>
                                <p class="myDivp receiveCount"></p>
                                <p>待接收单据</p>
                            </div>
                        </div>
                        <div class="infoDiv">
                            <h5>公司通知<a
                                    onclick="window.parent.openWorkBoxByMenutext2('公司通知','${basePath}/inventory/main/toNoticeMain?noticeType=1');">更多>></a>
                            </h5>
                        </div>
                        <div class="mesDiv">
                            <h5>系统消息<a
                                    onclick="window.parent.openWorkBoxByMenutext2('系统消息','${basePath}/inventory/main/toNoticeMain?noticeType=0');">更多>></a>
                            </h5>
                        </div>
                    </div>

                    <div class="boxTwo clearfix">
                        <div class="newMes">
                            <div class="newMesNav">
                                <span class="newMon" name="1">营业员排行</span>
                                <span name="2">门店排行</span>
                                <span name="3">商品排行</span>
                                <select class="mesTime">
                                    <option value="1">今天</option>
                                    <option value="2">昨天</option>
                                    <option value="3">近七天</option>
                                    <option value="4">本月</option>
                                    <option value="5">上月</option>
                                </select>
                            </div>
                            <div id="newMes" style="width: 100%;height:90%;"></div>
                        </div>
                        <div class="newSell">
                            <div class="newSellNav">
                                <span class="newMon">销售走势</span>
                                <select class="sellTime">
                                    <option value="3">近七天</option>
                                    <option value="4">本月</option>
                                    <option value="5">上月</option>
                                    <option value="6">本年</option>
                                </select>
                            </div>
                            <div id="newSell" style="width: 100%;height:90%;"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="ulbox"></div>
    </div>

    <div class="body_read">
        <h4>系统消息<i class="isRead">X</i></h4>
        <p class="dsbox_p">待审订单<i class="auditCount"></i></p>
        <p class="dgzbox_p">待过账单据<i class="postCount"></i></p>
        <p class="dgsbox_p">待过收单据<i class="receiveCount"></i></p>
        <p class="wdgs_p">未读公司通知<i class="wdgsCount"></i></p>
        <p class="wdxt_p">未读系统通知<i class="wdxtCount"></i></p>
    </div>

</div>
<div class="modal fade" id="myModal_changePwd" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">修改密码</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <%--<div class="form-group">--%>
                    <%--<label class="col-sm-12 control-label" style="text-align: left;color:red;">密码规则：至少6位，不能全是数字，可由数字和字母组成。</label>--%>
                    <%--</div>--%>
                    <div class="form-group">
                        <label for="newPwd" class="col-sm-2 control-label">新密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="newPwd" placeholder="Password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="surePwd" class="col-sm-2 control-label">确认密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="surePwd" placeholder="Password">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="changePwd_cancel" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="changePwd_sure" type="button" class="btn btn-primary" onclick="updatePwd()">确定</button>
            </div>
        </div>
    </div>
</div>

<!--通知弹窗-->
<div class="modal fade" id="newModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <h4 class="newTitle"></h4>
                <p class="newmp">来源: <span class="newMan"></span><i class="newTime"></i></p>
                <div class="newBox">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-dismiss="modal">确定</button>
            </div>
        </div>
    </div>
</div>
<!--锁屏弹窗-->
<div class="modal fade" id="lockModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">已锁屏</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="unlockPsd" class="col-sm-3 control-label" style="padding-top: 7px;">输入个人密码</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" id="unlockPsd" placeholder="Password"
                               autocomplete="new-password"
                               oninput="if(this.value==''){this.type='text'}else(this.type='password')">
                    </div>
                    <div class="col-sm-2">
                        <button class="form-control" id="unlock">解屏</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>


<!-- 权限开关,main.js与authMain.js切换即可 add by chris 2017-3-14 -->
<script src="${basePath}/js/base.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="${basePath}/js/cw/bootstrap/js/bootstrap-dialog.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="${basePath}/js/component.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="${basePath}/js/pagejs/authMain.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="${basePath}/js/zxsaas_plus.js?v=${version}" type="text/javascript" charset="utf-8"></script>
<script src="${basePath}/js/echarts.common.min.js?v=${version}" type="text/javascript" charset="utf-8"></script>

<!-- webSocket -->
<script type="text/javascript" src="${basePath}/js/inventory/web/reconnecting-websocket.min.js?v=${version}"></script>
<script type="text/javascript" src="${basePath}/js/inventory/web/webSocketer.js?v=${version}"></script>
<script>
    (function ($) {
        //自动锁屏
        var lock = false;
        var count = 0;
        var intervalId = window.setInterval(lockScreen, 1000);
        var lockTime = "${lockTime}";

        function lockScreen() {
            $(document).on("mousemove", function (e) {
                count = 0;
            });
            $(document).on("mousemove", ".modal", function (e) {
                count = 0;
            });
            if (document.getElementsByTagName('iframe').length > 0) {
                var ifr_document = document.getElementsByTagName('iframe');
                $(ifr_document).each(function () {
                    $($(this)[0].contentWindow.document).on("mousemove", function (e) {
                        count = 0;
                    });
                });
            }
            if (!lock && lockTime) {
                count++;
                if (count == lockTime * 60) {
                    //锁屏
                    $.ajax({
                        type: 'Post',
                        url: '/manager/emp/ajaxLogout',
                        success: function (data) {
                            if (data.result == 1) {
                                lock = true;
                                $("#unlockPsd").val("");
                                $('#lockModal').on('show.bs.modal', function (e) {
                                    $(this).find('.modal-dialog').css({
                                        'margin-top': function () {
                                            var modalHeight = $('#lockModal').find('.modal-dialog').height();
                                            return ($(window).height() / 3 - (modalHeight / 2));
                                        }
                                    });
                                });
                                $('#lockModal').modal('show');
                                window.clearInterval(intervalId);
                                $(document).keypress(function (e) {
                                    if (e.keyCode == 13) $('#unlock').click();
                                })
                            }
                        },
                        error: function (msg) {

                        }
                    });
                }
            } else {
                count = 0;
                window.clearInterval(intervalId);
            }
        }

        //解屏
        $('#unlock').on("click", function () {
            if ($('#unlockPsd').val().trim() == "") {
                $.zxsaas_plus.showalert("错误", "请输入解屏密码");
            } else {
                $.ajax({
                    type: 'Post',
                    url: '/manager/emp/ajaxLogin',
                    data: {login: userId, passwd: $("#unlockPsd").val().trim(), "companyId": companyId},
                    success: function (data) {
                        if (data.result == 1) {
                            lock = false;
                            window.clearInterval(intervalId);
                            intervalId = window.setInterval(lockScreen, 1000);
                            $('#lockModal').modal('hide');
                        } else {
                            $.zxsaas_plus.showalert("提示", data.desc);
                        }
                        $("#unlockPsd").attr('type', 'text');
                    },
                    error: function (msg) {
                        $("#unlockPsd").attr('type', 'text');
                    }
                });
            }
        })
    })(jQuery)
</script>
<script>
    (function ($) {
        $('.myComponent').click(function(){
            showMyComponent()
        })
        //这里延时6秒推送
        setTimeout(function(){
            var lodopObj = getLodopObj();
            var LODOP = null;
            LODOP = lodopObj.LODOP;
            if(LODOP){
                getComputerCode(function (componentIdInfo) {
                    computerCode=componentIdInfo; //设置一个全局变量
                    $.ajax({
                        type:'post',
                        data:{computerCode:componentIdInfo},
                        url:'/manager/inventory/common/bindLoginEmployeeComputer',
                        success:function(data){
                        }
                    })
                })
            }
            //获取电脑编码
            function getComputerCode(callback) {

                getSystemInfo('DiskDrive.1.SerialNumber', function (SerialNumber) {
                    getSystemInfo('NetworkAdapter.1.PhysicalAddress', function (PhysicalAddress) {
                        var componentIdInfo = SerialNumber.replace(/-/g,'') + PhysicalAddress.replace(/-/g,'');
                        if(callback){
                            callback(componentIdInfo)
                        }
                    })
                })

                function getSystemInfo(strINFOType, callback) {
                    if (LODOP.CVERSION) {
                        CLODOP.On_Return = function (TaskID, Value) {
                            if (callback) {
                                callback(Value)
                            }
                        }
                    }
                    var strResult = LODOP.GET_SYSTEM_INFO(strINFOType);
                    if (!LODOP.CVERSION) return strResult; else return "";
                }
            }
        },6000)
    })(jQuery)
</script>
</html>
