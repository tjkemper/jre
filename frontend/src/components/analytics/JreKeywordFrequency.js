import React from 'react';
import { Radar } from 'react-chartjs-2'

class JreKeywords extends React.Component {

  constructor(props) {
    super(props)
    const keywordFreq = {};
    props.videos.map(video => {
      video.keywords.split(', ').forEach(k => {
        const keyword = k.toLowerCase();
        keywordFreq[keyword] ? keywordFreq[keyword]++ : keywordFreq[keyword] = 1;
      });
    });
    const keywordsDescFreq = [];
    for (let [key, value] of Object.entries(keywordFreq)) {
      keywordsDescFreq.push(key);
    }
    keywordsDescFreq.sort((a, b) => keywordFreq[b] - keywordFreq[a]);

    const numKeywords = 30;
    const topKeywords = keywordsDescFreq.slice(0, numKeywords);
    const topKeywordFreq = topKeywords.map(keyword => keywordFreq[keyword]);

    const graph = {
      labels: topKeywords,
      datasets: [
        {
          label: 'Keyword Frequency',
          backgroundColor: 'rgba(255, 41, 0, 0.2)',
          borderColor: 'rgba(255, 41, 0, 1)',
          pointBackgroundColor: 'rgba(255, 41, 0, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: topKeywordFreq,
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
      freq: keywordFreq,
      desc: keywordsDescFreq,
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

export default JreKeywords;
