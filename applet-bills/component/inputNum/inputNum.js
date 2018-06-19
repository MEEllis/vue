Component({
  /**
   * 组件的对外属性列表
   */
  properties: {
    placeholderC: {
      type: String,
      value: ''
    },
    num: {
      type: String,
      value: ''
    },

  },

  /**
   * 组件内部的初始数据
   */
  data: {
    // 使用data数据对象设置样式名  
    minusStatus: '',
    maxStatus: '',
  },

  ready: function() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    /* 输入框事件 */
    bindManual: function(e) {
      const {
        num
      }=this.data;
      let inputNum = e.detail.value;
      if (/^\d*(\.\d{0,2})?$/.test(inputNum)) {
        this.setData({
          num: inputNum,
        });
        this.triggerEvent("changeEvent", {
          num: inputNum,
        });
      } else {
        this.setData({
          num: num,
        });
      }
    },
    changeManual: function (e) {
      //考虑用户输入 【1.】 这种情况
      let inputNum = Number(e.detail.value);
      const {
        num
      } = this.data;
      if (num != String(inputNum) && num!=''){
        this.setData({
          num: inputNum,
        });
        this.triggerEvent("changeEvent", {
          num: inputNum,
        });
      }
    },
  },

})