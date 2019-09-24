import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import jreData from '../data/jre.json';
import moment from 'moment';

// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html
class JreSearch extends React.Component {

  constructor(props) {
    super(props)
    let data = [];
    for (let [, value] of Object.entries(jreData.videos)) {
      data.push(value);
    }

    data.sort(function(a, b) {
      return a && b && a.datePublished > b.datePublished ? -1 : 1;
    });

    this.state = {
      data: data,
      dataSize: data.length,
    };
  }

  handleDataSizeChange({ dataSize }) {
    this.setState({
      dataSize: dataSize,
    });
  }

  render() {
    const { SearchBar } = Search;
    const columns = [
      {
        dataField: 'url',
        text: 'Url',
        formatter: (cell) => <a href={cell} target="_blank">link</a>,
      }, {
        dataField: 'name',
        text: 'Name',
        sort: true,
      }, {
        dataField: 'datePublished',
        text: 'Date Published',
        sort: true,
      }, {
        dataField: 'watchViewCount',
        text: 'View Count',
        sort: true,
        formatter: (cell) =>  cell.toLocaleString(),
      }, {
        dataField: 'duration',
        text: 'Duration',
        sort: true,
        formatter: (cell) => moment.duration(cell).asSeconds(),
        sortFunc: (a, b, order, dataField, rowA, rowB) => {
          const aSeconds = moment.duration(a).asSeconds();
          const bSeconds = moment.duration(b).asSeconds();
          console.log(order);
          if (order === 'asc') {
            return aSeconds - bSeconds;
          }
          return bSeconds - aSeconds;
        }
      }, {
        dataField: 'description',
        text: 'Description',
      },{
        dataField: 'keywords',
        text: 'Keywords',
      },{
        dataField: 'isFamilyFriendly',
        text: 'Family Friendly',
        sort: true,
      },
    ];

    return (
      <ToolkitProvider
        keyField="videoId"
        data={ this.state.data }
        columns={ columns }
        search
      >
        {
          props => (
            <div>
              <SearchBar { ...props.searchProps } />
              <div>Results: {this.state.dataSize}</div>
              <hr />
              <BootstrapTable 
                { ...props.baseProps }
                onDataSizeChange={ this.handleDataSizeChange.bind(this) }
              />
            </div>
          )
        }
      </ToolkitProvider>
    );
  }
}

export default JreSearch;
