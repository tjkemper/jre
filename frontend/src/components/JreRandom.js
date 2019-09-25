import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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
      video: this.randomVideo(videos),
    }
  }

  randomVideo(videos) {
    return videos[Math.floor(Math.random() * videos.length)];
  }

  handleRandomButtonClick() {
    this.setState({
      video: this.randomVideo(this.state.videos),
    });
  }

  render() {
    return (
      <Container>
        <Row className="m-3 justify-content-md-center">
          <Col className="m-3 col-auto">
            <Button onClick={this.handleRandomButtonClick.bind(this)}>Get Random Video</Button>
          </Col>
        </Row>
        <Row className="m-3 justify-content-md-center">
          <Col className="m-3 col-auto">
            <JreCard video={this.state.video} header="Random"/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default JreRandom;
