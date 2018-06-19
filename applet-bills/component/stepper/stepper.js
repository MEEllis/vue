
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      value: 1
    },
    maxNum: {
      type: Number,
      value: 9999999999,
    },
    minNum: {
      type: Number,
      value: 1,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 使用data数据对象设置样式名  
    minusStatus: '',
    maxStatus: '',
  },

  ready: function () {
    const { num, minNum,maxNum } = this.data;
    let minusStatus = num <= minNum ? 'disabled' : 'normal';
    let maxStatus = num >= maxNum ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      minusStatus,
      maxStatus,
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /* 点击减号 */
    bindMinus: function () {
      let { num, maxNum, minNum } = this.data;
      // 如果大于1时，才可以减  
      if (num > 1) {
        num--;
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        let minusStatus = num <= minNum ? 'disabled' : 'normal';
        let maxStatus = num >= maxNum ? 'disabled' : 'normal';
        // 将数值与状态写回  
        this.setData({
          num,
          minusStatus,
          maxStatus,
        });
        this.triggerEvent("changeEvent", { num });
      }

    },
    /* 点击加号 */
    bindPlus: function () {
      let { num, maxNum, minNum } = this.data;
      // 如果小于最大值时，才可以加  
      if (num < maxNum) {
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        let minusStatus = num < minNum ? 'disabled' : 'normal';
        let maxStatus = num >= maxNum ? 'disabled' : 'normal';
        // 将数值与状态写回  
        this.setData({
          num,
          minusStatus,
          maxStatus,
        });
        this.triggerEvent("changeEvent", { num });
      }
    },
    /* 输入框事件 */
    bindManual: function (e) {
      let inputNum = Number(e.detail.value);
      const { minNum, maxNum } = this.data;
      if (inputNum < minNum) {
        inputNum = minNum;
      } else if (inputNum > maxNum) {
        inputNum = maxNum;
      }
      // 将数值与状态写回  
      this.setData({
        num: inputNum,
      });
      this.triggerEvent("changeEvent", { num: inputNum });
    },
  },

})
