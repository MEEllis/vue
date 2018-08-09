import Mock from 'mockjs'
import user from './user'

Mock.setup({
  timeout: '350-600'
})

Mock.mock(/\/user\/companyList/, 'post', user.getCompanyList)

export default Mock
