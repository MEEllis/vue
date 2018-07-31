import _ from 'lodash';

export default (datas, id = 'id', parentId = 'parentId', children = 'children') => {
  datas = _.cloneDeep(datas);
  const flats = [];
  const getFlat = (datas, parentId) => {
    for (let i in datas) {
      const item = datas[i];
      flats.push({ ...item });
      if (item[children] && item[children].length > 0) {
        getFlat(item[children], item[id]);
      }
    }
  };
  getFlat(datas);

  return flats;
}
