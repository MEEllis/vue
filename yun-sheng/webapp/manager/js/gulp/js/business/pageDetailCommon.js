//  单据详情 公共方法
!function ($) {
    $.pageDetailCommon={
        //重载菜单组件
        reloadMenuTool:function (toolData) {
            toolData= toolData||{}
            if(toolData.isDraftOp == false){
                toolData.menuBtn.setShow(toolData.updateKey);
                toolData.menuBtn.setHide(toolData.addkey);
            }else{
                toolData.menuBtn.setHide(toolData.updateKey);
                toolData.menuBtn.setShow(toolData.addkey);
            }
            //判断是否禁用
            if(toolData.isDraftOp == false){
                //单据：稽核状态
                if(toolData.isAudit==1){
                    //启用：取消稽核，禁用：稽核
                    toolData.menuBtn.setDisabledbtn("audit");
                    toolData.menuBtn.setUndisabledbtn("auditCancle");
                    toolData.menuBtn.setDisabledbtn("red");
                }else{
                    //启用：稽核，禁用：取消稽核
                    toolData.menuBtn.setUndisabledbtn("audit");
                    toolData.menuBtn.setDisabledbtn("auditCancle");
                    toolData.menuBtn.setUndisabledbtn("red");
                }
                if(toolData.billsStatus==7){
                    toolData.menuBtn.setDisabledbtn("red");
                }else if(toolData.billsStatus==6 && toolData.isAudit==1){
                    toolData.menuBtn.setDisabledbtn("red");
                }else{
                    toolData.menuBtn.setUndisabledbtn("red");
                }
                if($.trim(toolData.billsCode).indexOf('_R')>-1){
                    toolData.menuBtn.setDisabledbtn("copy");
                }else{
                    toolData.menuBtn.setUndisabledbtn("copy");
                }
            }
            else{
                toolData.menuBtn.setUndisabledbtn("audit");
                toolData.menuBtn.setUndisabledbtn("auditCancle");
                toolData.menuBtn.setUndisabledbtn("copy");
            }
        },
    }
}(jQuery);