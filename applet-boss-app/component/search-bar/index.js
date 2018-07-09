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
    searchSubmit: () => {
      this.searchSubmit()
    },
    // 监听输入框
    inputTyping: function(e) {
      const keyWord = e.detail.value
      this.setData({
        keyWord,
      });
      this.triggerInput()
    },
    clearInput: function() {
      this.setData({
        keyWord: ""
      });
      this.triggerInput()
      this.searchSubmit()
    },

    triggerInput: function() {
      const {
        keyWord
      } = this.data;
      this.triggerEvent("searchInput", {
        keyWord,
      });
    },
    triggerSearch: function () {
      const {
        keyWord
      } = this.data;
      this.triggerEvent("searchSubmit", {
        keyWord,
      });
    }
  }
})