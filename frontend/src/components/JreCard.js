import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

class JreCard extends React.Component {

  pad(num) {
    return ('0' + num).slice(-2);
  }

  render() {
    const duration = moment.duration(this.props.video.duration);
    const hours = duration.hours();
    const minutes = this.pad(duration.minutes());
    const seconds = this.pad(duration.seconds());
    const durationStr = `${hours}:${minutes}:${seconds}`;

    return (
      <Card bg="dark" text="white" style={{ width: '25rem' }}>
        { this.props.header && <Card.Header>{this.props.header}</Card.Header> }
        <a href={this.props.video.url} target="_blank">
          <Card.Img variant="top" src={this.props.video.imageUrl} />  
        </a>
        <Card.Body>
          <Card.Title>{this.props.video.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {this.props.video.datePublished}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {durationStr}
          </Card.Subtitle>
          <Card.Text>{this.props.video.description}</Card.Text>
        </Card.Body>
        <Button href={this.props.video.url} target="_blank">Watch</Button>
      </Card>
    );
  }
}

export default JreCard;
