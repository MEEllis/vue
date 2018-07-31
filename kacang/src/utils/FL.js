import { serializeJSON } from './helper/serializeJSON';
import { toParams } from './helper/toParams';
import { getLoginJSON } from './helper/getLoginJSON';
import { htmlEncode } from './helper/htmlEncode';
import { htmlDecode } from './helper/htmlDecode';

const APP = {
  NAME: 'Kamen'
};

const FL = {
  PATH: {
    PICTURE: '/resources/images/',
  },
  MESSAGE: {
    STATUS: {
      '001': '服务器端代码错误 [5000101001]',
    },
    NOTICE: {},
  },
  LINK: {
    SUPSEARCH: {
      supplier: ['admin_super1', 'kamen45668', 'kacangceshi', 'kacang44', 'kacang33'],
      classification: [
        {
          title: '网络游戏',
          children: [{
            title: '212',
            children: [{
              title: '10元1'
            }]
          }, {
            title: '完美时空',
            children: [{
              title: '按元1'
            }, {
              title: '按元122'
            }]
          }, {
            title: '完美时空22',
            children: [{
              title: '按元122'
            }]
          }]
        }, {
          title: '腾讯转区',
          children: [{
            title: '超级会员',
            children: [{
              title: '10元2'
            }]
          }, {
            title: '腾讯Q币',
            children: [{
              title: '按元2',
            }]
          }, {
            title: '完美时空',
            children: [{
              title: '1个月',
            }]
          }, {
            title: 'QQ服务',
            children: [{
              title: '1元1Q币',
            }]
          }]
        }, {
          title: '腾讯转区2',
          children: [{
            title: '超级会员2',
            children: [{
              title: '10元2'
            }]
          }, {
            title: '腾讯Q币22',
            children: [{
              title: '按元2',
            }]
          }]
        }],
      chargeType: ['卡密', '手工代充', '卡密直储', '在线直储']
    },
    COMMODITYLIST: {
      productType: [
        {
          title: '全部',
          indexStatus: ''
        }, {
          title: '卡密',
          indexStatus: '1'
        }, {
          title: '卡密直储',
          indexStatus: '2'
        }, {
          title: '在线直储',
          indexStatus: '4'
        }
      ],
      stockStatus: [
        {
          title: '全部',
          indexStatus: ''
        }, {
          title: '断货',
          indexStatus: '1'
        }, {
          title: '报警',
          indexStatus: '2'
        }, {
          title: '充足',
          indexStatus: '3'
        }
      ],
      stockDock: [
        {
          title: '全部',
          indexStatus: ''
        },
        // {
        //     title: '自有库存',
        //     indexStatus: '2'
        // },
        {
          title: '卡仓商品',
          indexStatus: '1'
        }
      ],
      commodityCategy: [
        {
          title: '全部',
          indexStatus: ''
        }, {
          title: '网络游戏',
          indexStatus: '1'
        }, {
          title: '腾讯专区',
          indexStatus: '2'
        }
      ],
      saleStatus: [
        {
          title: '全部',
          indexStatus: ''
        }, {
          title: '上架',
          indexStatus: '2'
        }, {
          title: '下架',
          indexStatus: '1'
        }
      ],
      supplyStatus: [
        {
          title: '全部',
          indexStatus: ''
        },
        {
          title: '供货申请中...',
          indexStatus: '1'
        },
        {
          title: '同意供货',
          indexStatus: '2'
        },
        {
          title: '停止供货',
          indexStatus: '3'
        }
      ]
    },
    SUPSTATE: {
      checkStatus: [
        {
          title: '全部',
          indexStatus: ''
        }, {
          title: '通过',
          indexStatus: '1'
        }, {
          title: '未通过',
          indexStatus: '2'
        }, {
          title: '审核中',
          indexStatus: '3'
        }
      ],
      // checkStatus:['全部','通过','未通过']
    },
    // 商品搜索josn值--du begin
    // type 0文本  1 下拉  2时间控件
    // OrderDetailterm:{
    //     SearchText:[
    //         {title:'订单编号',index:'',type:'0',ID:'OrderCode'},
    //         {title:'进货商户',index:'1',type:'0',ID:'ProductFrom'},
    //         {title:'订单客户',index:'2',type:'0',ID:'OrderFrom'},
    //         {title:'商品编号',index:'3',type:'0',ID:'ProductCode'},
    //         {title:'商品名称',index:'4',type:'0',ID:'ProductName'},
    //         {title:'商品类型',index:'5',type:'1',ID:'Category',drpdowList:'commodityType',},
    //         {title:'交易时间',index:'6',type:'2',ID:'TradeTime'},
    //         {title:'库存来源',index:'7',type:'1',ID:'Stock',drpdowList:'stockFrom',},
    //         {title:'订单状态',index:'8',type:'1',ID:'Status',drpdowList:'orderStatus',},
    //         {title:'调用账号',index:'9',type:'0',ID:'RechargeFrom'},
    //         {title:'充值账号 ',index:'10',type:'0',ID:'RechargeTo'},
    //         {title:'外部订单号',index:'11',type:'0',ID:'ExternalOrderNumber'},
    //     ],
    // },

    Supstateterm: {
      SearchText: [
        { title: '供应商名称', index: '', type: '0', ID: 'SalerName' },
        { title: '供货商ID', index: '1', type: '0', ID: 'SalerCode' },
        { title: '商品名称', index: '2', type: '0', ID: 'ProductName' },
        { title: '商品ID', index: '3', type: '0', ID: 'ProductCode' },
        { title: '审核状态', index: '4', type: '1', ID: 'ApplyStatus' },
      ],
    },
    Suptransactionterm: {
      SearchText: [
        { title: '订单编号', index: '', type: '0', ID: 'OrderCode' },
        { title: '供货编号', index: '1', type: '0', ID: 'ProductFrom' },
        { title: '订单客户编号', index: '2', type: '0', ID: 'OrderFrom', disabled: true }, // 暂时隐藏，等后期修改
        { title: '商品编码', index: '3', type: '0', ID: 'ProductCode', disabled: true }, // 暂时隐藏，等后期修改
        { title: '商品名称', index: '4', type: '0', ID: 'ProductName', disabled: true }, // 暂时隐藏，等后期修改
        { title: '交易时间', index: '5', type: '2', ID: 'TradeTime' },
        { title: '商品类型', index: '6', type: '1', ID: 'Category' },
        { title: '调用账号', index: '7', type: '0', ID: 'RechargeFrom' },
        { title: '充值账号', index: '8', type: '0', ID: 'RechargeTo' },
      ],
    },
    //我的商品
    CommodityListterm: {
      SearchText: [
        { title: '商品编号', index: '1', type: '0', ID: 'Id' },
        { title: '商品名称', index: '2', type: '0', ID: 'Name' },
        { title: '面值', index: '3', type: '0', ID: 'FaceValue' },
        { title: '商品类型', index: '10', type: '1', ID: 'ProductType', drpdowList: 'ProductType' },
        { title: '库存状态', index: '4', type: '1', ID: 'StockStatus', drpdowList: 'StockStatus' },
        { title: '商品分类', index: '6', type: '1', ID: 'commodityId', drpdowList: 'commodityId' },
        { title: '销售状态', index: '7', type: '1', ID: 'SaleStatus', drpdowList: 'SaleStatus' },
        { title: '添加时间', index: '8', type: '2', ID: 'TradeTime' },
      ],
    },

    //库存管理
    StockListterm: {
      SearchText: [
        //{title:'库存性质',index:'',type:'1',ID:'nature',drpdowList:'commidityType'},
        { title: '库存编号', index: '1', type: '0', ID: 'Code' },
        { title: '库存名称', index: '2', type: '0', ID: 'Name' },
        { title: '库存状态', index: '3', type: '1', ID: 'Status', drpdowList: 'stockStatus' },
        { title: '库存类型', index: '4', type: '1', ID: 'Type', drpdowList: 'stockDock' },
        { title: '库存面值', index: '5', type: '0', ID: 'FaceValue' },
        { title: '添加时间', index: '6', type: '2', ID: 'TradeTime' },
      ],
    },
    WrongCardListterm: {
      SearchText: [
        { title: '卡号', index: '', type: '0', ID: 'cardNumber' },
        { title: '订单编号', index: '1', type: '0', ID: 'orderNo' },
        { title: '供应商', index: '2', type: '0', ID: 'supplier' },
        { title: '库存名称', index: '3', type: '0', ID: 'stockName' },
        { title: '导卡时间', index: '4', type: '2', ID: 'tradeTime' },
        { title: '状态', index: '5', type: '1', ID: 'status' },
      ],
    },

    //财务
    Financeremittanceterm: {
      SearchText: [
        { title: '开户行', index: '', type: '0', ID: 'bank' },
        { title: '汇款人', index: '1', type: '0', ID: 'remitter' },
        { title: '处理状态', index: '2', type: '1', ID: 'dealStatus' },
      ],
    },
    //商品搜索josn值--du end


    SUPTRANSACTION: {
      orderStatus: [
        {
          title: '可疑订单',
          indexStatus: '6'
        }, {
          title: '未处理',
          indexStatus: '2'
        }, {
          title: '处理中',
          indexStatus: '3'
        }, {
          title: '交易成功',
          indexStatus: '4'
        }, {
          title: '交易失败',
          indexStatus: '5'
        }],
      commodityType: [{
        title: '全部',
        indexStatus: '0'
      }, {
        title: '卡密',
        indexStatus: '1'
      }, {
        title: '卡密直储',
        indexStatus: '2'
      }, {
        title: '在线直储',
        indexStatus: '4'
      }]
    },
    ORDERSDETAIL: {
      orderStatus: [
        {
          title: '全部',
          indexStatus: '0'
        }, {
          title: '可疑订单',
          indexStatus: '6'
        }, {
          title: '未处理',
          indexStatus: '2 '
        }, {
          title: '处理中',
          indexStatus: '3'
        }, {
          title: '交易成功',
          indexStatus: '4'
        }, {
          title: '交易失败',
          indexStatus: '5'
        }],

      stockFrom: [{
        title: '全部',
        indexStatus: '0'
      }, {
        title: '自有库存',
        indexStatus: '1'
      }, {
        title: '对接SUP',
        indexStatus: '2'
      }]
    },
    ORDERSSALES: {
      orderStatus: [
        {
          title: '全部',
          indexStatus: '-1'
        }, {
          title: '交易成功',
          indexStatus: '4'
        }, {
          title: '交易失败',
          indexStatus: '5'
        }],
      commodityType: [{
        title: '全部',
        indexStatus: '0'
      }, {
        title: '卡密',
        indexStatus: '1'
      }, {
        title: '卡密直储',
        indexStatus: '2'
      }, {
        title: '在线直储',
        indexStatus: '4'
      }],
      stockFrom: [{
        title: '全部',
        indexStatus: '0'
      },
      // {
      //     title: '自有库存',
      //     indexStatus: '1'
      // },
      {
        title: '卡仓商品',
        indexStatus: '2'
      }]
    },
    SERVICERECEIVE: {
      complaintReceived: ['处理中', '已处理', '未处理']
    },
    SERVICELAUNCHED: {
      complaintReceived: ['处理中', '已处理', '未处理']
    },
    FINANCEDETAIL: {
      transactionType: [{
        title: '全部',
        key: '0',
        children: [{
          title: '全部',
          indexStatus: ''
        }]
      }, {
        title: '收入',
        key: '1',
        children: [{
          title: '供货收入',
          indexStatus: '1'
        }, {
          title: '退单收入',
          indexStatus: '2'
        }, {
          title: '退款收入',
          indexStatus: '3'
        }, {
          title: '淘宝加款',
          indexStatus: '4'
        }, {
          title: '接口加款',
          indexStatus: '5'
        }, {
          title: '手工加款',
          indexStatus: '6'
        }, {
          title: '提现撤销',
          indexStatus: '7'
        }, {
          title: '手续费撤销',
          indexStatus: '8'
        }]
      }, {
        title: '支出',
        key: '2',
        children: [{
          title: '进货支出',
          indexStatus: '9'
        }, {
          title: '退款支出',
          indexStatus: '10'
        }, {
          title: '技术服务费支出',
          indexStatus: '11'
        }, {
          title: '手工扣款',
          indexStatus: '12'
        }, {
          title: '提现支出',
          indexStatus: '13'
        }, {
          title: '手续费支出',
          indexStatus: '14'
        }]
      }, {
        title: '资金冻结',
        key: '3',
        children: [{
          title: '订单冻结',
          indexStatus: '15'
        }, {
          title: '保证金冻结',
          indexStatus: '16'
        }, {
          title: '淘宝加款冻结',
          indexStatus: '17'
        }, {
          title: '手工冻结',
          indexStatus: '21'
        }]
      }, {
        title: '资金解冻',
        key: '4',
        children: [{
          title: '订单解冻',
          indexStatus: '18'
        }, {
          title: '保证金解冻',
          indexStatus: '19'
        }, {
          title: '淘宝加款解冻',
          indexStatus: '20'
        }, {
          title: '手工解冻',
          indexStatus: '23'
        }]
      }]
    },
    FINANCEREMITTANCE: {
      // handleStatus:['全部','未处理','已通过','未通过']
      handleStatus: [
        { title: '全部', indexStatus: '0' },
        { title: '未处理', indexStatus: '1' },
        { title: '已通过', indexStatus: '2' },
        { title: '未通过', indexStatus: '3' },]
    },
    TMALLRELEVANCE: {
      connectStatus: ['全22部', '对接', '断开']
    },
    TMALLORDERS: {
      orderStatus: ['全d部', '未处理', '处理中', '成功', '失败']
    },
    TMALLSALES: {
      orderStatus: ['1全部', '处理中', '订单可疑', '订单成功', '订单失败']
    },
    TMALLFINANCE: {
      transactionType: [
        {
          title: '全部',
          children: []
        }, {
          title: '收入',
          children: [{
            title: '供货收入'
          }, {
            title: '退单收入'
          }, {
            title: '退款收入'
          }, {
            title: '淘宝加款'
          }, {
            title: '接口加款'
          }, {
            title: '手工加款'
          }, {
            title: '提现撤销'
          }, {
            title: '手续费撤销'
          }]
        }, {
          title: '支出',
          children: [{
            title: '进货支出'
          }, {
            title: '退款支出'
          }, {
            title: '技术服务费支出'
          }, {
            title: '手工扣款'
          }, {
            title: '提现支出'
          }, {
            title: '手续费支出'
          }]
        }, {
          title: '资金冻结',
          children: [{
            title: '订单冻结'
          }, {
            title: '保证金冻结'
          }, {
            title: '淘宝加款冻结'
          }]
        }, {
          title: '资金解冻',
          children: [{
            title: '订单解冻'
          }, {
            title: '保证金解冻'
          }, {
            title: '淘宝加款解冻'
          }]
        }]
    }
  },

  AREA: {
    data: [{ name: '北京', cities: ['西城', '东城', '崇文', '宣武', '朝阳', '海淀', '丰台', '石景山', '门头沟', '房山', '通州', '顺义', '大兴', '昌平', '平谷', '怀柔', '密云', '延庆'] },
    { name: '天津', cities: ['青羊', '河东', '河西', '南开', '河北', '红桥', '塘沽', '汉沽', '大港', '东丽', '西青', '北辰', '津南', '武清', '宝坻', '静海', '宁河', '蓟县', '开发区'] },
    { name: '河北', cities: ['石家庄', '秦皇岛', '廊坊', '保定', '邯郸', '唐山', '邢台', '衡水', '张家口', '承德', '沧州'] },
    { name: '山西', cities: ['太原', '大同', '长治', '晋中', '阳泉', '朔州', '运城', '临汾'] },
    { name: '内蒙古', cities: ['呼和浩特', '赤峰', '通辽', '锡林郭勒', '兴安'] },
    { name: '辽宁', cities: ['大连', '沈阳', '鞍山', '抚顺', '营口', '锦州', '丹东', '朝阳', '辽阳', '阜新', '铁岭', '盘锦', '本溪', '葫芦岛'] },
    { name: '吉林', cities: ['长春', '吉林', '四平', '辽源', '通化', '延吉', '白城', '辽源', '松原', '临江', '珲春'] },
    { name: '黑龙江', cities: ['哈尔滨', '齐齐哈尔', '大庆', '牡丹江', '鹤岗', '佳木斯', '绥化'] },
    { name: '上海', cities: ['浦东', '杨浦', '徐汇', '静安', '卢湾', '黄浦', '普陀', '闸北', '虹口', '长宁', '宝山', '闵行', '嘉定', '金山', '松江', '青浦', '崇明', '奉贤', '南汇'] },
    { name: '江苏', cities: ['南京', '苏州', '无锡', '常州', '扬州', '徐州', '南通', '镇江', '泰州', '淮安', '连云港', '宿迁', '盐城', '淮阴', '沐阳', '张家港'] },
    { name: '浙江', cities: ['杭州', '金华', '宁波', '温州', '嘉兴', '绍兴', '丽水', '湖州', '台州', '舟山', '衢州'] },
    { name: '安徽', cities: ['合肥', '马鞍山', '蚌埠', '黄山', '芜湖', '淮南', '铜陵', '阜阳', '宣城', '安庆'] },
    { name: '福建', cities: ['福州', '厦门', '泉州', '漳州', '南平', '龙岩', '莆田', '三明', '宁德'] },
    { name: '江西', cities: ['南昌', '景德镇', '上饶', '萍乡', '九江', '吉安', '宜春', '鹰潭', '新余', '赣州'] },
    { name: '山东', cities: ['青岛', '济南', '淄博', '烟台', '泰安', '临沂', '日照', '德州', '威海', '东营', '荷泽', '济宁', '潍坊', '枣庄', '聊城'] },
    { name: '河南', cities: ['郑州', '洛阳', '开封', '平顶山', '濮阳', '安阳', '许昌', '南阳', '信阳', '周口', '新乡', '焦作', '三门峡', '商丘'] },
    { name: '湖北', cities: ['武汉', '襄樊', '孝感', '十堰', '荆州', '黄石', '宜昌', '黄冈', '恩施', '鄂州', '江汉', '随枣', '荆沙', '咸宁'] },
    { name: '湖南', cities: ['长沙', '湘潭', '岳阳', '株洲', '怀化', '永州', '益阳', '张家界', '常德', '衡阳', '湘西', '邵阳', '娄底', '郴州'] },
    { name: '广东', cities: ['广州', '深圳', '东莞', '佛山', '珠海', '汕头', '韶关', '江门', '梅州', '揭阳', '中山', '河源', '惠州', '茂名', '湛江', '阳江', '潮州', '云浮', '汕尾', '潮阳', '肇庆', '顺德', '清远'] },
    { name: '广西', cities: ['南宁', '桂林', '柳州', '梧州', '来宾', '贵港', '玉林', '贺州'] },
    { name: '海南', cities: ['海口', '三亚'] },
    { name: '重庆', cities: ['渝中', '大渡口', '江北', '沙坪坝', '九龙坡', '南岸', '北碚', '万盛', '双桥', '渝北', '巴南', '万州', '涪陵', '黔江', '长寿'] },
    { name: '四川', cities: ['成都', '达州', '南充', '乐山', '绵阳', '德阳', '内江', '遂宁', '宜宾', '巴中', '自贡', '康定', '攀枝花'] },
    { name: '贵州', cities: ['贵阳', '遵义', '安顺', '黔西南', '都匀'] },
    { name: '云南', cities: ['昆明', '丽江', '昭通', '玉溪', '临沧', '文山', '红河', '楚雄', '大理'] },
    { name: '西藏', cities: ['拉萨', '林芝', '日喀则', '昌都'] },
    { name: '陕西', cities: ['西安', '咸阳', '延安', '汉中', '榆林', '商南', '略阳', '宜君', '麟游', '白河'] },
    { name: '甘肃', cities: ['兰州', '金昌', '天水', '武威', '张掖', '平凉', '酒泉'] },
    { name: '青海', cities: ['黄南', '海南', '西宁', '海东', '海西', '海北', '果洛', '玉树'] },
    { name: '宁夏', cities: ['银川', '吴忠'] },
    { name: '新疆', cities: ['乌鲁木齐', '哈密', '喀什', '巴音郭楞', '昌吉', '伊犁', '阿勒泰', '克拉玛依', '博尔塔拉'] },
    { name: '香港', cities: ['中西区', '湾仔区', '东区', '南区', '九龙-油尖旺区', '九龙-深水埗区', '九龙-九龙城区', '九龙-黄大仙区', '九龙-观塘区', '新界-北区', '新界-大埔区', '新界-沙田区', '新界-西贡区', '新界-荃湾区', '新界-屯门区', '新界-元朗区', '新界-葵青区', '新界-离岛区'] },
    { name: '澳门', cities: ['花地玛堂区', '圣安多尼堂区', '大堂区', '望德堂区', '风顺堂区', '嘉模堂区', '圣方济各堂区', '路氹城'] }]
  },
  REGION: [
    { value: '全国', name: '不限' },
    { value: '湖北', name: '湖北' },
    { value: '江西', name: '江西' },
    { value: '湖南', name: '湖南' },
    { value: '河北', name: '河北' },
    { value: '河南', name: '河南' },
    { value: '山东', name: '山东' },
    { value: '山西', name: '山西' },
    { value: '陕西', name: '陕西' },
    { value: '贵州', name: '贵州' },
    { value: '云南', name: '云南' },
    { value: '广东', name: '广东' },
    { value: '广西', name: '广西' },
    { value: '海南', name: '海南' },
    { value: '浙江', name: '浙江' },
    { value: '江苏', name: '江苏' },
    { value: '福建', name: '福建' },
    { value: '内蒙古', name: '内蒙古' },
    { value: '新疆', name: '新疆' },
    { value: '西藏', name: '西藏' },
    { value: '吉林', name: '吉林' },
    { value: '黑龙江', name: '黑龙江' },
    { value: '辽宁', name: '辽宁' },
    { value: '北京', name: '北京' },
    { value: '上海', name: '上海' },
    { value: '重庆', name: '重庆' },
    { value: '天津', name: '天津' },
    { value: '宁夏', name: '宁夏' },
    { value: '甘肃', name: '甘肃' },
    { value: '青海', name: '青海' },
    { value: '四川', name: '四川' },
    { value: '安徽', name: '安徽' },
  ],
  FORMLAYOUT: {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },
  FORMLAYOUTMEDIUM: {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  },
  FORMLAYOUTMIN: {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  },
  PAGESIZE: 10
};

export { serializeJSON, toParams, getLoginJSON, htmlEncode, htmlDecode };
export default FL;
