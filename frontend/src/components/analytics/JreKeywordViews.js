import React from 'react';
import { Radar } from 'react-chartjs-2'

class JreKeywordViews extends React.Component {

  constructor(props) {
    super(props)
    const keywordViews = {};
    props.videos.map(video => {
      video.keywords.split(', ').forEach(k => {
        const keyword = k.toLowerCase();
        keywordViews[keyword] ? keywordViews[keyword] += video.watchViewCount : keywordViews[keyword] = video.watchViewCount;
      });
    });
    const keywordsDescViews = [];
    for (let [key, value] of Object.entries(keywordViews)) {
      keywordsDescViews.push(key);
    }
    keywordsDescViews.sort((a, b) => keywordViews[b] - keywordViews[a]);

    const numKeywords = 30;
    const topKeywords = keywordsDescViews.slice(0, numKeywords);
    const topKeywordViews = topKeywords.map(keyword => keywordViews[keyword]);

    const graph = {
      labels: topKeywords,
      datasets: [
        {
          label: 'Keyword Views',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: topKeywordViews,
        },
      ]
    };

    const options = {
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            const freq = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return freq.toLocaleString();
          },
        },
      },
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
        <Radar 
          data={this.state.graph}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default JreKeywordViews;
