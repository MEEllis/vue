import { connect } from 'react-redux';
import ShowDetailComponent from '../components/showDetailComponent/js/ShowDetailComponent';
import { getOrderDetail, handleOrder } from '../redux/order';

const mapStateToProps = (state) => ({
  getOrderDetailResult: state.order.getOrderDetailResult,
  handleOrderResult: state.order.handleOrderResult,
  isfetching: state.order.isfetching
});

export default connect(
  mapStateToProps,
  {
    getOrderDetail,
    handleOrder
  }
)(ShowDetailComponent);
