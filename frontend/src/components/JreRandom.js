import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import jreData from '../data/jre.json';
import JreCard from './JreCard';

class JreRandom extends React.Component {

  constructor(props) {
    super(props);

    let videos = [];
    for (let [, video] of Object.entries(jreData.videos)) {
      videos.push(video);
    }

    this.state = {
      videos: videos,
    }
  }

  render() {
    const video = this.state.videos[Math.floor(Math.random() * this.state.videos.length)];

    return (
      <Container>
        <Row className="m-3 justify-content-md-center">
          <Col className="m-3 col-auto">
            <JreCard video={video} header="Random"/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default JreRandom;
