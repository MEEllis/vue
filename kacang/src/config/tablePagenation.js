export default (value) => {
  return {
    total: value.state.total,
    showSizeChanger: true,
    pageSize: value.state.pageSize,
    current: value.state.pageNumber,
    onShowSizeChange: (current, pageSize) => {
      value.setState({
        pageNumber: current,
        pageSize
      }, () => {
        value.getData({ pageNumber: current, pageSize });
      });
    },
    onChange: (current, pageSize) => {
      value.setState({
        pageNumber: current,
        pageSize
      }, () => {
        value.getData({ pageNumber: current, pageSize });
      });
    }
  };
};
