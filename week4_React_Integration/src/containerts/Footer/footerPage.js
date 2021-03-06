import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FooterPageItem from './footerpageItem';
import { getMachine } from '../../actions';

class FooterPage extends Component {
  page = (data) => {
    window.localStorage.setItem('currentPage', data);
    this.pageChange(data);
  };

  topfunction = () => {
    window.localStorage.setItem('currentPage', 1);
    this.pageChange(1);
  }

  endfunction = () => {
    const len = this.props.pageItem;
    window.localStorage.setItem('currentPage', len);
    this.pageChange(len);
  }

  nextfunction = () => {
    const currentPage = window.localStorage.getItem('currentPage');
    const len = this.props.pageItem;
    if (parseInt(currentPage, 10) === len) return;
    const nextPage = parseInt(currentPage, 10);
    window.localStorage.setItem('currentPage', nextPage + 1);
    const AllData = JSON.parse(window.localStorage.getItem('machineData'));
    const searchResult = JSON.parse(window.localStorage.getItem('searchResult'));
    if (searchResult !== null) {
      this.props.getMachine(nextPage + 1, searchResult.searchArr);
    } else {
      this.props.getMachine(nextPage + 1, AllData);
    }
  }

  prevfunction = () => {
    const currentPage = window.localStorage.getItem('currentPage');
    if (parseInt(currentPage, 10) === 1) return;
    const nextPage = parseInt(currentPage, 10);
    window.localStorage.setItem('currentPage', nextPage - 1);
    const AllData = JSON.parse(window.localStorage.getItem('machineData'));
    const searchResult = JSON.parse(window.localStorage.getItem('searchResult'));
    if (searchResult !== null) {
      this.props.getMachine(nextPage - 1, searchResult.searchArr);
    } else {
      this.props.getMachine(nextPage - 1, AllData);
    }
  }

  pageChange = (data) => {
    const searchResult = JSON.parse(window.localStorage.getItem('searchResult'));
    const AllData = JSON.parse(window.localStorage.getItem('machineData'));
    if (searchResult !== null) {
      this.props.getMachine(data, searchResult.searchArr);
    } else {
      this.props.getMachine(data, AllData);
    }
  }

  render() {
    const { machineList, pageItem } = this.props;
    const rows = [];
    let i = 0;
    let totalNumber = '';
    while (++i <= pageItem) rows.push(i);
    const searchValue = window.localStorage.getItem('searchValue');
    const AllData = JSON.parse(window.localStorage.getItem('machineData'));
    if (searchValue === '' || searchValue === null) {
      totalNumber = AllData.length;
    } else {
      totalNumber = machineList.length;
    }
    return (
      <div className="page">
        <div className="page-init">
          <div className="quantity">
            <span className="rowsPerPage">
              {`${totalNumber}Models`}
            </span>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-top">
                <a
                  className="th-page-link"
                  href="javascript:void(0)"
                  aria-label="Previous"
                  onClick={() => this.topfunction()}
                >
                  <span aria-hidden="true">
                    <i className="fas fa-angle-double-left" />
                  </span>
                </a>
              </li>
              <li className="page-prev">
                <a
                  className="th-page-link"
                  href="javascript:void(0)"
                  aria-label="Previous"
                  onClick={() => this.prevfunction()}
                >
                  <span aria-hidden="true">
                    <i className="fas fa-angle-left" />
                  </span>
                </a>
              </li>
              {
                rows.map(data => (
                  <FooterPageItem
                    key={data}
                    data={data}
                    page={this.page}
                    prevfunction={this.prevfunction}
                    rows={rows}
                   />
                ))
              }
              <li className="page-next">
                <a
                  className="th-page-link"
                  href="javascript:void(0)"
                  aria-label="Next"
                  onClick={() => this.nextfunction()}
                >
                  <span aria-hidden="true">
                    <i className="fas fa-angle-right" />
                  </span>
                </a>
              </li>
              <li className="page-end">
                <a
                  className="th-page-link"
                  href="javascript:void(0)"
                  aria-label="Next"
                  onClick={() => this.endfunction()}
                >
                  <span aria-hidden="true">
                    <i className="fas fa-angle-double-right" />
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const parameter = state;
  return {
    pageItem: parameter.pageItem.pageItem,
    machineList: parameter.machineList.machineList,
    searchmachineList: parameter.searchmachineList.searchmachineList,
  };
};


const mapDispatchToProps = (dispatch) => {
  const parameter = dispatch;
  return bindActionCreators({
    getMachine,
  }, parameter);
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterPage);
