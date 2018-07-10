// component/search-bar/index.js
Component({
  /**
   * 组件的对外属性列表
   */
  properties: {
    // 输入框的placeholder
    placeholder: {
      type: String,
      value: ''
    },
    // 关键字搜索
    keyWord: {
      type: String,
      value: ''
    },
    // 是否展示高级
    isShowAdvanced: {
      type: Boolean,
      value: false
    },

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 搜索
    searchSubmit: function(e) {
      this.triggerSearch()
    },
    // 监听输入框
    inputTyping: function(e) {
      const keyWord = e.detail.value
      this.setData({
        keyWord,
      });
      this.triggerInput()
    },
    // 清空输入框
    clearInput: function() {
      this.setData({
        keyWord: ""
      });
      this.triggerInput()
      this.triggerSearch()
    },
    // 点击输入框
    tapAdvanced: function() {
      this.triggerEvent("tapAdvanced");
    },
    // 触发 监听输入框
    triggerInput: function() {
      const {
        keyWord
      } = this.data;
      this.triggerEvent("searchInput", {
        keyWord,
      });
    },
    // 触发 搜索
    triggerSearch: function() {
      const {
        keyWord
      } = this.data;
      this.triggerEvent("searchSubmit", {
        keyWord,
      });
    }
  }
})