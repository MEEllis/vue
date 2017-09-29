var path = require('path');
var express = require('express');
var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    var xlsx = require('node-xlsx');
    var fs = require('fs');
//读取文件内容
    var obj = xlsx.parse(__dirname+'/public/test.xlsx');
    var excelObj=obj[0].data;
    //console.log(excelObj);

    var data = [];
    for(let i in excelObj){
        var arr=[];
        var list=excelObj[i];
        var totalScore=0;
        for(let j in list){
            arr.push(list[j]);
           /* if(Number.isSafeInteger(list[j])){
                totalScore+=Number(list[j]);
            }
            if((list.length==Number(j)+1) && (i!=0) ){
                arr.push(totalScore);
            }*/
        }
        data.push(arr);
        console.log(data);
    }

      var buffer = xlsx.build([
            {
                name:'sheet1',
                data:data
            }
        ]);

    //将文件内容插入新的文件中
    fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});

    res.render('index');
});

app.post("/",function (req, res) {


});
//supervisor --harmony index
app.listen(3015);





















