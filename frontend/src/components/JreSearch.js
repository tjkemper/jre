import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import jreData from '../data/Uploads from PowerfulJRE_2019-09-13.json';

// TODO: Show count (number of videos returned in search)
// TODO: Sort by date
// TODO: Sort by view count

// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html
class JreSearch extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSize: jreData.videos.length,
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
      }, {
        dataField: 'duration',
        text: 'Duration',
        sort: true,
      }, {
        dataField: 'description',
        text: 'Description',
      },{
        dataField: 'keywords',
        text: 'Keywords',
      },
    ];
    
    return (
      <ToolkitProvider
        keyField="videoId"
        data={ jreData.videos }
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
