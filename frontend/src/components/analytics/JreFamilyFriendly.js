import React from 'react';
import { Pie } from 'react-chartjs-2'

class JreFamilyFriendly extends React.Component {

  constructor(props) {
    super(props)

    let numNotFamilyFriendly = 0;
    for (let [, video] of Object.entries(props.videos)) {
      if (video.isFamilyFriendly === 'False') {
        numNotFamilyFriendly++;
      }
    }
    const numFamilyFriendly = props.videos.length - numNotFamilyFriendly;
    const data = [ numFamilyFriendly, numNotFamilyFriendly ];
    const graph = {
      labels: [
        'Family Friendly',
        'Not Family Friendly',
      ],
      datasets: [{
        data: data,
        backgroundColor: [
          '#36A2EB',
          '#FF6384',
        ],
        hoverBackgroundColor: [
          '#36A2EB',
          '#FF6384',
        ]
      }]
    };

    this.state = {
      videos: props.videos,
      graph: graph,
    }
  }

  render() {
    return (
      <div>
        <Pie
          data={this.state.graph}
        />
      </div>
    );
  }
}

export default JreFamilyFriendly;
