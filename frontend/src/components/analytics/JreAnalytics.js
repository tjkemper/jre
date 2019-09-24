import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import jreData from '../../data/jre.json';
import JreViews from './JreViews';
import JreKeywordFrequency from './JreKeywordFrequency';
import JreKeywordViews from './JreKeywordViews';
import JreFamilyFriendly from './JreFamilyFriendly';
import JreCard from '../JreCard';
import moment from 'moment';

class JreAnalytics extends React.Component {

  constructor(props) {
    super(props);

    let totalViews = 0;
    let totalSeconds = 0;
    let mostViewedVideo = null;
    let longestVideo = null;
    let numNotFamilyFriendly = 0;
    let videos = [];
    for (let [, video] of Object.entries(jreData.videos)) {
      videos.push(video);
      totalViews += video.watchViewCount;
      totalSeconds += moment.duration(video.duration).asSeconds();

      if (!mostViewedVideo || video.watchViewCount > mostViewedVideo.watchViewCount) {
        mostViewedVideo = video;
      }

      if (!longestVideo || moment.duration(video.duration).asSeconds() > moment.duration(longestVideo.duration).asSeconds()) {
        longestVideo = video;
      }

      if (video.isFamilyFriendly === 'False') {
        numNotFamilyFriendly++;
      }

    }

    videos.sort(function(a, b) {
      return a && b && a.datePublished < b.datePublished ? -1 : 1;
    });

    this.state = {
      videos: videos,
      totalViews: totalViews,
      totalSeconds: totalSeconds,
      mostViewedVideo: mostViewedVideo,
      longestVideo: longestVideo,
      numNotFamilyFriendly: numNotFamilyFriendly,
    }
  }

  render() {
    return (
      <Container>
        <Row className="m-3">
          <Col>
            <h3>Total Views</h3>
            {this.state.totalViews.toLocaleString()}
          </Col>
          <Col>
            <h3>Number of videos</h3>
            {this.state.videos.length.toLocaleString()}
          </Col>
          <Col>
            <h3>Total time</h3>
            <div>
              {this.state.totalSeconds} seconds
            </div>
            <div>
              or
            </div>
            <div>
            {(this.state.totalSeconds / 3600 / 24).toFixed(2)} days
            </div>
          </Col>
        </Row>
        <Row className="m-3 justify-content-md-center">
          <Col className="m-3 col-auto">
            <JreCard video={this.state.mostViewedVideo} header="Most Viewed"/>
          </Col>
          <Col className="m-3 col-auto">
            <JreCard video={this.state.longestVideo} header="Longest"/>
          </Col>
        </Row>
        <Row className="m-3">
          <Col>
            <h3>Video views</h3>
            <JreViews videos={this.state.videos} />
          </Col>
        </Row>
        <Row className="m-3">
          <Col className="m-3">
            <h3>Keyword frequency</h3>
            <JreKeywordFrequency videos={this.state.videos} />
          </Col>
          <Col className="m-3">
            <h3>Keyword views</h3>
            <JreKeywordViews videos={this.state.videos} />
          </Col>
        </Row>
        <Row className="m-3">
          <Col>
            <h3>Family friendly</h3>
            {this.state.numNotFamilyFriendly} videos ({(this.state.numNotFamilyFriendly / this.state.videos.length).toFixed(3) + "%"})
            <JreFamilyFriendly videos={this.state.videos} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default JreAnalytics;
