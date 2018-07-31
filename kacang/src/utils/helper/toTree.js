// import R from 'ramda';
import _ from 'lodash';

export default (nodes, topParentId) => {
  let datas = _.cloneDeep(nodes);
  if (datas && datas.length > 0 && datas[0].sort) {
    datas.sort((prev, next) => {
      if (prev.sort && next.sort) {
        if (prev.sort < next.sort)
          return -1;
        if (prev.sort > next.sort)
          return 1;
      }
      return 0;
    });
  }


  let map = {}, node, roots = [];

  for (let i in datas) {
    datas[i].children = [];
    map[datas[i].id] = i; // use map to look-up the parents
  }

  for (let i in datas) {
    node = datas[i];
    if (node.parentId !== topParentId) {
      if (datas[map[node.parentId]])
        datas[map[node.parentId]].children.push(node);
    } else {
      roots.push(datas[i]);
    }
  }

  const getLevel = (datas, level) => {
    for (let i in datas) {
      datas[i].level = level;
      if (datas[i].children && datas[i].children.length > 0) {
        getLevel(datas[i].children, level + 1);
      }
    }
  }
  getLevel(roots, 1);
  return roots;
};
