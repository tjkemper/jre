import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

class JreCard extends React.Component {
  constructor(props) {
    super(props);
    const duration = moment.duration(props.video.duration);
    const hours = duration.hours();
    const minutes = this.pad(duration.minutes());
    const seconds = this.pad(duration.seconds());
    const durationStr = `${hours}:${minutes}:${seconds}`;

    this.state = {
      video: props.video,
      header: props.header,
      durationStr: durationStr,
    };
  }

  pad(num) {
    return ('0' + num).slice(-2);
  }

  render() {
    return (
      <Card bg="dark" text="white" style={{ width: '25rem' }}>
        { this.state.header && <Card.Header>{this.state.header}</Card.Header> }
        <a href={this.state.video.url} target="_blank">
          <Card.Img variant="top" src={this.state.video.imageUrl} />  
        </a>
        <Card.Body>
          <Card.Title>{this.state.video.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.state.video.datePublished}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {this.state.durationStr}
          </Card.Subtitle>
          <Card.Text>{this.state.video.description}</Card.Text>
        </Card.Body>
        <Button href={this.state.video.url} target="_blank">Watch</Button>
      </Card>
    );
  }
}

export default JreCard;
