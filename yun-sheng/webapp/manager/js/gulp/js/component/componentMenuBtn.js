// 菜单栏的按钮组 （组件）
!function ($) {
    // 默认模板
    var _menuBtnTpl =
        '<div class="btn-group-left">' +
        '</div>' +
        '<div class="btn-group-right">' +
        '</div>'
    ;

    // 构造函数
    var componentMenuBtn = function (el, option) {
        // 默认参数
        var defaults = {
            isAuth:true, //是否走权限的控制
            btnGroupLeft: {
                add: {
                    isShow: false,
                    iconfont: "icon-xinzengdingdan",
                    name: "新开单"
                },
                ColumnSettings: {
                    isShow: false,
                    iconfont: "icon-shezhi",
                    name: "列设置"
                },
                export: {
                    isShow: false,
                    iconfont: "icon-daochu",
                    name: "导出"
                },
                print: {
                    isShow: false,
                    iconfont: "icon-dayin",
                    name: "打印"
                },
                orderImport: {
                    isShow: false,
                    iconfont: "icon-fangan",
                    name: "订单引入"
                },
                printDropdown: {
                    type:'dropdown',
                    isShow: false,
                    iconfont: "icon-dayin",
                    name: "打印",
                    list:[]
                },
                printImeiDropdown: {
                    type:'dropdown',
                    isShow: false,
                    iconfont: "icon-dayin",
                    name: "打印串号标签",
                    list:[]
                },
                copy: {
                    isShow: false,
                    iconfont: "icon-ai-copy",
                    name: "复制"
                },
                audit: {
                    isShow: false,
                    iconfont: "icon-shenhe1",
                    name: "稽核"
                },
                auditCancle: {
                    isShow: false,
                    iconfont: "icon-qiyong1",
                    name: "取消稽核"
                },
                check: {
                    isShow: false,
                    iconfont: "icon-shenhe1",
                    name: "审核"
                },
                uncheck: {
					isShow: false,
					iconfont: "icon-fanshenhe",
					name: "反审核"
                },
                mandatory: {
                    isShow: false,
                    iconfont: "icon-dingdanwancheng",
                    name: "强制完成"
                },
                loadstore: {
                    isShow: false,
                    iconfont: "icon-icon-refresh",
                    name: "刷新库存"
                },
                submit: {
					isShow: false,
					iconfont: "icon-tijiao",
					name: "提交"
                },
                red: {
                    isShow: false,
                    iconfont: "icon-zuofeiquanmacopy",
                    name: "红冲"
                },
                save: {
                    isShow: false,
                    iconfont: "icon-baocun",
                    name: "保存并过账"
                },
                draftPost: {
                    isShow: false,
                    iconfont: "icon-icon-test",
                    name: "过账"
                },
                draftDel: {
                    isShow: false,
                    iconfont: "icon-shanchu",
                    name: "删除"
                },
                draftSave: {
                    isShow: false,
                    iconfont: "icon-baocun",
                    name: "保存"
                },
                update: {
                    isShow: false,
                    iconfont: "icon-baocun",
                    name: "保存修改"
                },
				revoke: {
					isShow: false,
					iconfont: "icon-chehuidingdan",
					name: "撤回"
				},
                shipments:{
                    isShow: false,
                    iconfont: "icon-fahuo",
                    name: "发货"
                },
                settlement:{
                    isShow: false,
                    iconfont: "icon-fahuo",
                    name: "预收冲应收"
                },
                settlement1:{
                    isShow: false,
                    iconfont: "icon-fahuo",
                    name: "预付冲应付"
                },
                voucher:{
                    isShow: false,
                    iconfont: "icon-chuzhi",
                    name: "生成凭证"
                }
            }
            ,
            btnGroupRight: {
                previous: {
                    isShow: false,
                    name: "上一单"
                },
                next: {
                    isShow: false,
                    name: "下一单"
                },
                end: {
                    isShow: false,
                    name: "末单"
                },
                history: {
                    isShow: false,
                    name: "历史单据"
                },
            }
        };
        var btnGroupLeft={}
        var btnGroupRight={}
        for(var keyLeft in option.btnGroupLeft){
            var leftItem=option.btnGroupLeft[keyLeft]
            btnGroupLeft[keyLeft]=$.extend(false,defaults.btnGroupLeft[keyLeft] , leftItem);
        }
        for(var keyRight in option.btnGroupRight){
            var rightItem=option.btnGroupRight[keyRight]
            btnGroupRight[keyRight]=$.extend(false,defaults.btnGroupRight[keyRight] , rightItem);
        }

        this.option = $.extend(true, defaults, option);
        this.option.btnGroupLeft=btnGroupLeft
        this.option.btnGroupRight=btnGroupRight
        this.element = $(el);
        this.dom = null;
        this._init();
    }
    componentMenuBtn.prototype = {
        _init: function () {
            this.getDom();
            this.clearDom();
            this.loadDom();
        },
        //获取dom
        getDom: function () {
            var $_menuBtnTpl = $(_menuBtnTpl);
            var groupLeft = this.option.btnGroupLeft;
            var groupRight = this.option.btnGroupRight;
            var groupLeftArr = [];
            var groupRightArr = [];
            for (var left in groupLeft) {
                var leftObj = groupLeft[left];
                var $button = $(
                    '<button type="button"  data-key="' + left + '" class="btn e-btn e-btn-left">' +
                        '<span class="iconfont ' + leftObj.iconfont + '" ></span>' + leftObj.name +
                    '</button>'
                );
                if (leftObj.isShow == false) {
                    $button.hide();
                }
                $button.click((function (leftObj) {
                    return function () {
                        if (leftObj.click) {
                            leftObj.click();
                        }
                    }
                })(leftObj));
                if(leftObj.type==='dropdown'){
                    var $UL = $(`<ul class="dropdown-menu actionBox" style="text-align: center"></ul>`);
                    var liArr=[]
                    for(var i=0;i<leftObj.list.length;i++){
                        var liItem = leftObj.list[i]
                        var $li=$(`<li><input  class="e-caozuo" type="button" value="${liItem.name}"></li>`)
                        $li.click((function (liItem) {
                            return function () {
                                if (liItem.click) {
                                    liItem.click();
                                }
                            }
                        })(liItem))
                        liArr.push($li)
                    }
                    $UL.append(liArr)
                    $button.addClass('dropdown-toggle').attr('data-toggle','dropdown').append('<span class="caret"></span>')
                    var dropWrap=$(`<div class="btn-group" role="group"></div>`)
                    dropWrap.append($button).append($UL)
                    groupLeftArr.push(dropWrap);
                }else{
                    groupLeftArr.push($button);
                }


            }
            for (var right in groupRight) {
                var rightObj = groupRight[right];
                var $link = $('<button data-key="' + right + '" type="button" class="e-btn btn-link">' + rightObj.name + '</button>');
                if (rightObj.isShow == false) {
                    $link.hide();
                }
                $link.click((function (rightObj) {
                    return function () {
                        if (rightObj.click) {
                            rightObj.click();
                        }
                    }
                })(rightObj));

                groupRightArr.push($link);
            }
            $_menuBtnTpl.siblings(".btn-group-right").append(groupRightArr);
            $_menuBtnTpl.siblings(".btn-group-left").append(groupLeftArr);
            this.dom = $_menuBtnTpl;
        },
        //加载dom
        loadDom: function () {
            var _self = this;
            // 权限开关
            if(_self.option.isAuth){
                $.ajax({
                    url: '/manager/auth/queryAuthButtonVoList',
                    type : "post",
                    data : {
                        "menuCode" : _self.element.data("code")
                    },
                    dataType : 'json',
                    success:function(data){
                        if(data.result == 1){
                            _self.element.append(_self.dom);
                            if(data.data.show === "all"){
                                _self.element.find("button").show();
                            } else {
                                var buttonList =_self.element.find("button");

                                if (data.data.buttonVoList) {
                                    var authName=[];

                                    for (var i = 0; i < data.data.buttonVoList.length; i++) {
                                        authName.push(data.data.buttonVoList[i].name)
                                    }
                                    buttonList.each(function(){
                                        var buttonItem = $(this);
                                        if($.inArray($.trim(buttonItem.text()),authName)==-1){
                                            buttonItem.remove()
                                        }
                                    });


                                }
                            }
                        } else {
                            alert(data.desc);
                        }
                    }
                });
            }else{
                _self.element.append(_self.dom);
            }
        },
        //清空dom
        clearDom: function () {
            this.element.html("");
        },
        //设置 的按钮的 disabled
        setDisabledbtn: function (key) {
            var dom = this.dom;
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    disabled(key[i]);
                }
            } else {
                disabled(key);
            }
            //禁用
            function disabled(key) {
                dom.find("button[data-key=" + key + "]").attr("disabled", "disabled");
            }
        },
        //设置 的按钮的 disabled
        setUndisabledbtn: function (key) {
            var dom = this.dom;
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    undisabled(key[i]);
                }
            } else {
                undisabled(key);
            }
            //禁用
            function undisabled(key) {
                dom.find("button[data-key=" + key + "]").removeAttr("disabled");
            }
        },
        //设置 按钮 的   显示
        setShow:function (key) {
            var dom = this.dom;
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    common(key[i]);
                }
            } else {
                common(key);
            }
            function common(key) {
                dom.find("button[data-key=" + key + "]").show();
            }
        },
        //设置 按钮 的    隐藏
        setHide:function (key) {
            var dom = this.dom;
            //判断你是数组对象，还是字符串
            if ($.isArray(key)) {
                for (var i = 0; i < key.length; i++) {
                    common(key[i]);
                }
            } else {
                common(key);
            }
            function common(key) {
                dom.find("button[data-key=" + key + "]").hide();
            }
        }

    };
    window.componentMenuBtn = componentMenuBtn;


    //在插件中使用 组件对象
    $.fn.componentMenuBtn = function (options) {
        //创建的实体
        var obj = new componentMenuBtn(this, options);
        //调用其方法
        return obj;
    }
}(jQuery);