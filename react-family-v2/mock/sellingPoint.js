import findIndex from 'lodash/findIndex';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    sellingCode: `sellingCode ${i}`,
    sellingName: `一个任务名称 ${i}`,
    disable: Math.floor(Math.random() * 10) % 2,
    sellingRemark: `remark ${i}`,
  });
}
// 查询
export function getSellingPoint(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const body = (b && b.body) || req.body;
  const { keyword, pageSize, currentPage } = body;
  let dataSource = [...tableListDataSource];

  if (keyword !== undefined) {
    dataSource = dataSource.filter(data => data.sellingCode.indexOf(keyword) > -1);
  }

  const pageSizes = pageSize === undefined ? 10 : pageSize * 1;
  const current = parseInt(currentPage, 10) || 1;
  const list = [];
  for (let i = 0; i < pageSizes; i++) {
    const startCur = (current - 1) * pageSizes + i;
    if (startCur < dataSource.length) {
      list.push(dataSource[startCur]);
    } else {
      break;
    }
  }
  const result = {
    list,
    pagination: {
      total: dataSource.length,
      pageSize: pageSizes,
      current,
    },
  };
  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
// 修改
export function updateSellingPoint(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const body = (b && b.body) || req.body;
  const { key, sellingName, sellingRemark } = body;
  if (key !== undefined) {
    for (let i = 0; i < tableListDataSource.length; i++) {
      if (key === tableListDataSource[i].key) {
        tableListDataSource[i].sellingName = sellingName;
        tableListDataSource[i].sellingRemark = sellingRemark;
        break;
      }
    }
  }

  const result = {
    result: 1,
    desc: null,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
// 修改状态
export function updateSellingPointState(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const body = (b && b.body) || req.body;
  const { key, disable } = body;
  if (key !== undefined) {
    const keyArr = key.split(',');
    for (let i = 0; i < keyArr.length; i++) {
      const keyitem = parseInt(keyArr[i], 10);
      const aaaindex = findIndex(tableListDataSource, ['key', keyitem]);
      if (aaaindex > -1) {
        tableListDataSource[aaaindex].disable = disable;
      }
    }
  }

  const result = {
    result: 1,
    desc: null,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

// 删除
export function deleteSellingPoint(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const body = (b && b.body) || req.body;
  const { key } = body;
  if (key !== undefined) {
    const keyArr = key.split(',');
    let i;
    for (i = 0; i < keyArr.length; i++) {
      const keyitem = parseInt(keyArr[i], 10);
      const aaaindex = findIndex(tableListDataSource, ['key', keyitem]);
      if (aaaindex > -1) {
        tableListDataSource.splice(aaaindex, 1);
      }
    }
  }

  const result = {
    result: 1,
    desc: null,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
// 添加
export function postSellingPoint(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no, sellingName, sellingRemark } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        sellingCode: `sellingCode ${i}`,
        sellingName,
        disable: 0,
        sellingRemark,
      });
      break;
    default:
      break;
  }

  const result = {
    result: 1,
    desc: null,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
