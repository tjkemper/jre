import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import jreData from '../data/Uploads from PowerfulJRE_2019-09-13.json'

// TODO: Show count (number of videos returned in search)
// TODO: Sort by date
// TODO: Sort by view count
class JreSearch extends React.Component {
  render() {
    const { SearchBar } = Search;
    const columns = [
      {
        dataField: 'name',
        text: 'Name',
        sort: true,
      }, {
        dataField: 'datePublished',
        text: 'Date Published',
      }, {
        dataField: 'genre',
        text: 'Genre',
      }, {
        dataField: 'keywords',
        text: 'Keywords',
      }, {
        dataField: 'watchViewCount',
        text: 'View Count',
      }, {
        dataField: 'duration',
        text: 'Duration',
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
              <hr />
              <BootstrapTable
                { ...props.baseProps }
              />
            </div>
          )
        }
      </ToolkitProvider>
    );
  }
}

export default JreSearch;
