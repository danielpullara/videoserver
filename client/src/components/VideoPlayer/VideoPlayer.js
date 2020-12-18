import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import videojs from 'video.js';
import './videojs.css';
import Navbar from '../Navbar/Navbar';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      videoJsOptions: null
    }
  }

  componentDidMount() {
    // Fixed by shiv
    const apiUrl = process.env.REACT_APP_api_url;
    axios.get(apiUrl + "/api/videoList", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    }).then(res => {
      // Fixed by shiv
      for (let video of res.data) {
        if (video.upload_title === this.props.match.params.videoTitle) {
          this.setState({
            loaded: true,
            videoJsOptions: {
              autoplay: true,
              controls: true,
              sources: [{
                src: video.video_path
              }],
              fluid: true
            }
          }, () => {
            this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
              // console.log('onPlayerReady', this)
            });
          });

          break;
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    if (!localStorage.getItem('userTokenTime')) return <Redirect to="/signIn" />
    return (
      <React.Fragment>
        <Navbar />
        <div className="row" style={{ width: "100vw" }}>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
            {this.state.loaded ? (
              <div data-vjs-player>
                <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" />
              </div>
            ) : ' Loading ... '}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VideoPlayer;