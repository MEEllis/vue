<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<jsp:include  page="../../../inventoryInclude/head.jsp"/>
<script>
 // 是否可以 点击业务部门 ,  0 是不能点击 ，1 是可以点击
var status=${status} ; 
</script>
<script src="${basePath}/js/inventory/finance/common.js?v=${version}"></script>
<script src="${basePath}/js/inventory/finance/accountSearch/subjectDetailedBooks.js?v=${version}"></script>
<title>科目明细账</title>
</head>
<body>
<header>
    <div id="AUTH" data-code="KMMX" class="btnbox clearfix btn-group none">
    </div>
    <form action="" class="form-inline clearfix" id="searchQuery">

        <div class="form-group col-sm-3">
            <label class="width-25">会计期间:</label>
            <div class="input-group col-sm-4">
                <input type="text" class="form-control dateTime-icon" name="billsBeginDateStr" id="startDate" >
            </div>
            --
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="billsEndDateStr" id="endDate" >
            </div>
        </div>

        <div class="form-group col-sm-4">
            <label class="width-25">科目编码:</label>
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="beginSubCode" id="beginSubCode" >
            </div>
            --
            <div class="input-group col-sm-4">
                <input type="text" class="form-control" name="endSubCode" id="endSubCode" >
            </div>
        </div>

        <div class="form-group col-sm-3">
            <label class="col-sm-5"><input type="radio" name="isOnlyEndSubject" class="isOnlySubject">科目级次:</label>
            <div class="input-group col-sm-3">
                <select class="form-control" id="beginGrade">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
            --
            <div class="input-group col-sm-3">
                <select class="form-control" id="endGrade">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>

        </div>


        <div class="form-group col-sm-2 ">
            <div class="input-group col-sm-12">
                <label><input type="radio" name="isOnlyEndSubject" class="isOnlyEndSubject"> 只查询末级科目</label>
            </div>
        </div>
        <div class="form-group col-sm-3 ">
            <label class='width-25'>业务部门:</label>
            <div class="input-group col-sm-8">
                <input type="text" class="form-control" id="sectionName" placeholder="请选择业务部门">
            </div>
        </div>


        <div class="form-group col-sm-9">
            <div class="form-group col-sm-8" style="text-align: left;">
                <div class="checkbox" style="line-height: 34px;">
                    <label class="mr15">
                        <input type="checkbox" name="isDisabled" class="isDisabled" style="float: left;margin: 11px 5px;"> 显示禁用信息
                    </label>
                    <label class="mr15" >
                        <input type="checkbox" name="isContained" class="isContained" style="float: left;margin: 11px 5px;"> 包含未记账凭证
                    </label>
                    <label class="mr15" >
                        <input type="checkbox" name="isLeiJi" class="" style="float: left;margin: 11px 5px;"> 会计期间无发生额显示累计
                    </label>
                    <label class="mr15" >
                        <input type="checkbox" name="isFilter" class="" style="float: left;margin: 11px 5px;"> 启用科目表头过滤
                    </label>
                </div>
            </div>
            <div class="form-group col-sm-4">
                <span style=""></span>
                <button type="button" class="btn btn-primary mr15 actionBtn" id="search">查询</button>
                <button type="button" class="btn btn-default reset mr15 actionBtn"  id="resetForm" >重置</button>
                <button type="button" class="btn btn-default reset mr15 actionBtn"  id="export" >导出</button>
                <span class="explain none">说明</span>
                <div class="explainBox ">
                    1、表格中加粗部分不受查询条件影响</br>
                    2、报表模板固定，不允许翻页</br>
                    3、总毛利固定到表尾，不受下拉拖动影响
                </div>
            </div>
        </div>
      

    </form>

</header>

<div id="promptBox">
    <div class="checkImgBox">
        <img src="${basePath}/images/inventory/common/checkImg.png"/>
        <h2 >输入条件后,点击查询吧!</h2>
    </div>
    <div class="explainImgBox" style="background:url('${basePath}/images/inventory/common/explain.png') no-repeat center center;background-size:contain;">
    
    </div>

</div>

<div class="loadingImgBox none" style="background:url('${basePath}/images/inventory/common/loading.gif') no-repeat center center;background-size:contain;"></div>
<div class="notFounImgBox none" style="background:url('${basePath}/images/inventory/common/notFoun.png') no-repeat center center;background-size:contain;"></div>


<div id="rpContainer">
	<div id="rpContainerTop">
	    <div class="funBtnBox">
        <button type="button" class="btn btn-default mr15 export none"><span class="iconBox exportIconBox" style="background:url('${basePath}/images/inventory/common/export_icon.png') no-repeat center center;background-size:contain;"></span>导出</button>
        <button type="button" class="btn btn-default mr15 lineSet none"><span class="iconBox lineSetIconBox" style="background:url('${basePath}/images/inventory/common/lineSet_icon.png') no-repeat center center;background-size:contain;"></span>列设置</button>
        <button type="button" class="btn btn-default mr15 print none"><span class="iconBox printIconBox"  style="background:url('${basePath}/images/inventory/common/print_icon.png') no-repeat center center;background-size:contain;"></span>打印</button>
    	</div>
    	<div class='gridTitle'>明细账</div>
	</div>
    
    <div class="form-inline clearfix subject-wrap fiter-wrap">
        <div class="form-group col-sm-3 ">
            <label class='width-25'>科目:</label>
            <div class="input-group col-sm-8">
                <select class="form-control" id="subjectWrapSelect">

                </select>
            </div>
        </div>
    </div>
    
    <table id="rpGrid" class="jqgrid-table"></table>
    <div id="rpGridPager"></div>
</div>

<div id="lineSet-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">列设置</h4>
            </div>
            <div class="modal-body" style="width:600px;">
                <table id='lineSetGrid'></table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default sureLineSet" data-dismiss="modal" onclick="sureLineSet()">确认</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>



</body>
<jsp:include  page="../../../inventoryInclude/foot.jsp"/>