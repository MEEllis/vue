import  {Indicator}  from 'mint-ui'
let indicator = {
  open(){
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
  },
  close(){
    Indicator.close()
  }
}
export default{
  indicator
}

