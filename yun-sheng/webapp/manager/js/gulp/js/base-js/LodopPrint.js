
//打印自动生成串号
function prn1_print(data) {
    var LODOP;
    CreateOneFormPage(data);
    LODOP.PRINTA();
    function CreateOneFormPage(data){
        var center = 2;//标准2mm 定制10mm
        var width = 40;//单张宽度
        var height = 30;//单张高度
        var leftMargin = 2; //左边距
        var topMargin = 2; //上边距

        var goodsNameWidth = 38; //商品名称宽度
        var goodsNameHeight = 12; //商品名称高度

        var goodsRetailPriceTop = 16; //零售价上边距
        var goodsRetailPriceWidth = 36; //零售价宽度
        var goodsRetailPriceHeight = 4; //零售价高度

        var barCodeTop = 20; //条形码上边距
        var barCodeWith = 40; //条形码宽度
        var barCodeHeight = 8; //条形码高度

        LODOP=getLodop();
        LODOP.PRINT_INIT("云盛串号标签"); //实际开发打印任务名称请用这

        LODOP.SET_PRINT_PAGESIZE(1 ,2*width+center+"mm",height+"mm","CreateCustomPage"); //设置纸张大小（注意单页双排）

        LODOP.SET_PRINT_STYLE("FontName","微软雅黑");
        data=data||[];
        for(var i=0;i<data.length;i++){
            var goodItem=data[i];
            var isEvenNumber=checkEvenNumber(i);
            var leftWidthMargin=0;//内容距离左边的宽度
            //是否换页
            if(isEvenNumber==true&&i!==0){
                LODOP.NEWPAGE();
            }
            //偶数
            if(isEvenNumber==true){
                leftWidthMargin=leftMargin
            }
            //偶数
            else {
                leftWidthMargin=width+center+leftMargin
            }
            LODOP.SET_PRINT_STYLE("Alignment",1);//重置为左靠齐
            //设置商品名称
            LODOP.SET_PRINT_STYLE("FontSize",10);
            LODOP.SET_PRINT_STYLE("Bold",1);
            LODOP.ADD_PRINT_TEXT(topMargin+"mm",leftWidthMargin+"mm",goodsNameWidth+"mm",goodsNameHeight+"mm",goodItem.goodName);
            //设置商品价格
            LODOP.SET_PRINT_STYLE("FontSize",11);
            LODOP.SET_PRINT_STYLE("Alignment",3); //零售价右靠齐
            var price="   ";
            //价格为0的情况下，不打印
            if($.formatFloat(goodItem.retailPrice,2)!="0.00"){
                price="售价 : ¥"+goodItem.retailPrice;
            }
            LODOP.ADD_PRINT_TEXT(goodsRetailPriceTop+"mm",leftWidthMargin+"mm",goodsRetailPriceWidth+"mm",goodsRetailPriceHeight+"mm",price);
            //设置 主串号
            LODOP.SET_PRINT_STYLE("FontSize",9);
            LODOP.ADD_PRINT_BARCODE(barCodeTop+"mm",leftWidthMargin+"mm",barCodeWith+"mm",barCodeHeight+"mm","128Auto",goodItem.imei);//YS1234567890123
        }

        //检查是否为偶数
        function checkEvenNumber (num){
            return ((num%2 ==0) ?true:false);  //判断是否能整除2
        }

        return;
        //第一个
        LODOP.SET_PRINT_STYLE("FontSize",10);
        LODOP.ADD_PRINT_TEXT(topMargin+"mm",leftMargin+"mm",goodsNameWidth+"mm",goodsNameHeight+"mm","睿量(REMAX)华为Ascend P1 布丁保护套 (蓝色)睿量(REMAX)华为Ascend P1 布丁保护套 (蓝色)");

        LODOP.SET_PRINT_STYLE("FontSize",11);
        LODOP.SET_PRINT_STYLE("Alignment",3); //零售价右靠齐
        LODOP.ADD_PRINT_TEXT(goodsRetailPriceTop+"mm",leftMargin+"mm",goodsRetailPriceWidth+"mm",goodsRetailPriceHeight+"mm","售价:¥1,234.00");

        LODOP.SET_PRINT_STYLE("FontSize",9);
        LODOP.ADD_PRINT_BARCODE(barCodeTop+"mm",leftMargin+"mm",barCodeWith+"mm",barCodeHeight+"mm","128Auto","YS123456789012");//YS1234567890123

        //开始右排 （第二个）
        LODOP.SET_PRINT_STYLE("Alignment",1);//重置为左靠齐

        LODOP.SET_PRINT_STYLE("FontSize",10);
        LODOP.ADD_PRINT_TEXT(topMargin+"mm",center+width+leftMargin+"mm",goodsNameWidth+"mm",goodsNameHeight+"mm","睿量(REMAX)华为Ascend P2 布丁保护套 (黑色)睿量(REMAX)华为Ascend P1 布丁保护套 (蓝色)");

        LODOP.SET_PRINT_STYLE("FontSize",11);
        LODOP.SET_PRINT_STYLE("Alignment",3); //零售价右靠齐
        LODOP.ADD_PRINT_TEXT(goodsRetailPriceTop+"mm",center+width+leftMargin+"mm",goodsRetailPriceWidth+"mm",goodsRetailPriceHeight+"mm","售价:¥1,234.00");

        LODOP.SET_PRINT_STYLE("FontSize",9);
        LODOP.ADD_PRINT_BARCODE(barCodeTop+"mm",center+width+leftMargin+"mm",barCodeWith+"mm",barCodeHeight+"mm","128Auto","YS123456789012"); //YSABCDEFGHIJKLM YSABCDEFGHI0123

        //强制分页   以下代码演示分页内容*****************************************************************************
        LODOP.NEWPAGE();
        LODOP.SET_PRINT_STYLE("Alignment",1);//左靠齐

        LODOP.SET_PRINT_STYLE("FontSize",10);
        //LODOP.SET_PRINT_STYLE("Bold",1);

        LODOP.ADD_PRINT_TEXT("2mm","2mm","36mm","12mm","睿量(REMAX)华为Ascend P3 布丁保护套 (蓝色)");
        //LODOP.SET_PRINT_STYLEA(0,"Angle",90);

        LODOP.SET_PRINT_STYLE("FontSize",11);
        LODOP.SET_PRINT_STYLE("Alignment",3);//右靠齐
        LODOP.ADD_PRINT_TEXT("16mm","0mm","36mm","4mm","售价:¥1,234.00");

        LODOP.SET_PRINT_STYLE("FontSize",8);
        LODOP.ADD_PRINT_BARCODE("20mm","2mm","40mm","8mm","128Auto","YS000000000000");

        //开始右排
        LODOP.SET_PRINT_STYLE("Alignment",1);//左靠齐

        LODOP.SET_PRINT_STYLE("FontSize",10);
        LODOP.ADD_PRINT_TEXT("2mm","43mm","36mm","12mm","睿量(REMAX)华为Ascend P4 布丁保护套 (黑色)");

        LODOP.SET_PRINT_STYLE("FontSize",11);
        LODOP.SET_PRINT_STYLE("Alignment",3);//右靠齐
        LODOP.ADD_PRINT_TEXT("16mm","42mm","36mm","4mm","售价:¥1,234.00");

        LODOP.SET_PRINT_STYLE("FontSize",8);
        LODOP.ADD_PRINT_BARCODE("20mm","44mm","40mm","8mm","128Auto","YS999999999999"); //YSABCDEFGHIJKLM
    };
};

