const app = getApp()

Page({
    data: {
        height: 0
    },
    onLoad: function () {
        const device = wx.getSystemInfoSync()
        this.setData({
            height: device.windowHeight
        })
        console.log(device.windowHeight);
    },
})