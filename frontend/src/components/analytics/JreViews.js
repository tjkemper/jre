import React from 'react';
import { Line } from 'react-chartjs-2'

class JreViews extends React.Component {

  constructor(props) {
    super(props)

    const published = props.videos.map(video => video['datePublished']);

    const views = props.videos.map(video => {
      return {
        y: video['watchViewCount'],
        ...video
      };
    });

    const graph = {
      labels: published,
      datasets: [
        {
          label: 'Views',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: views
        }
      ]
    };

    const options = {
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            const video = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return video.name;
          },
          afterTitle: function(tooltipItem, data) {
            const video = data.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index];
            return 'Views: ' + video.watchViewCount.toLocaleString();
          },
        },
      },
      scales: {
        xAxes: [{
          ticks: {
            maxTicksLimit: 10
          }
        }]
      }
    };

    this.state = {
      videos: props.videos,
      graph: graph,
      options: options,
    }
  }

  render() {
    return (
      <div>
        <Line
          data={this.state.graph}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default JreViews;
