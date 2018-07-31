/************************************************************************************
     *唯一标识：
     *创建人：  黄松
     *电子邮箱：834734438@qq.com
     *手机号：13545497749
     *创建时间：2016-8-17 15:58:03
     *版本：V3
     *描述：（导出excel js）
     *
     *=====================================================================
     *修改标记
     *修改时间：2017-1-11 11:00:00
     *修改人： 黄松
     *电子邮箱：834734438@qq.com
     *手机号：13545497749
     *版本：V3
     *描述：添加对js的解释以及代码优化整理
     *
************************************************************************************/

// 判断是否是IE浏览器
function msieversion() {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");
  const isEdge = ua.toLowerCase().indexOf("edge") > -1; //判断是否IE的Edge浏览器
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
  {
    return true;
  }
  else {
    // If another browser,
    if (isEdge) {
      return true;
    }
    else {
      return false;
    }
  }
}


/**
   Json 数据转化成 CSV 数据
* JSONData 导出的数据
* FileName 文件名称
* Title 文件的标题
* Columns 导出的列字段 数组
*/
function CsvData(JSONData, Columns, Title, Column) {
  if (JSONData.length == 0) {
    alert('没有可以导出的数据');
    return;
  }
  const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
  let CSV = '';
  CSV += `${Title}\r\n`;
  CSV += `${Columns}\r\n`;
  for (let i = 0; i < arrData.length; i += 1) {
    let row = '';
    for (const index in Column) {
      const s = Column[index];
      const arrValue = arrData[i][s] == null ? '' : arrData[i][s];
      row += `${arrValue},`;
    }
    row.slice(0, row.length - 1);
    CSV += `${row}\r\n`;
  }
  CSV += `\ufeff${CSV}`;
  return CSV;
}
/**
导出 csv 文件
* JSONData 导出的数据
* FileName 文件名称
* Title 文件的标题
* Columns 导出的列字段 数组
*/
export default function JSONToCSV2(JSONData, FileName, Columns, Title, Column) {
  if (msieversion()) {
    if (navigator.userAgent.indexOf("MSIE 6.0") > 0 || navigator.userAgent.indexOf("MSIE 7.0") > 0 || navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent.indexOf("MSIE 9.0") > 0) {
      const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
      try {
        const Excel = new ActiveXObject("Excel.Application");
        const Book = Excel.Workbooks.Add();
        for (let i = 0; i < Columns.length; i++) {
          Book.ActiveSheet.Cells(1, i + 1).Value = Columns[i];
        }
        for (let i = 0; i < arrData.length; i++) {
          let j = 1;
          for (const index in Column) {
            const s = Column[index];
            const arrValue = arrData[i][s] == null ? "" : arrData[i][s];
            Book.ActiveSheet.Cells(i + 2, j).Value = arrValue;
            j++;
          }
        }
        Excel.UserControl = true;

      }
      catch (oError) {
        alert('请设置IE浏览器的安全级别,Internet-安全-自定义级别-启用 未知的ActiveX！');
        return;
      }
      finally {
        Book.Close();
        Excel.Application.Quit();
      }
    }
    else {
      const CSV = CsvData(JSONData, Columns, Title, Column);
      const fileName = FileName;
      const BB = self.Blob;
      saveAs(
        new BB([CSV]
          , { type: 'text/plain;charset=utf-8' })
        , `${fileName}.csv`);
    }
  }
  else {
    const fileName = FileName;
    const CSV = CsvData(JSONData, Columns, Title, Column);
    const uri = `data:text/csv;charset=utf-8,${encodeURI(CSV)}`;
    const link = document.createElement('a');
    link.href = uri;
    link.style = 'visibility:hidden';
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
