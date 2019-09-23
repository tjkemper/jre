import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

class JreLoading extends React.Component {

  render() {
    return (
      <div>
        <div>Loading</div>
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }
}

export default JreLoading;
