import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      mouseOnSong: -1
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong: song});
  }

  setSongIcon(index, icon) {
    //document.getElementById('song-list').getElementsByTagName('span')[index].className = icon;
  }

  handleSongClick(song, index) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
      this.setState({mouseOnSong: index});
    } else {
      if (!isSameSong) { this.setSong(song); };
      this.play();
      this.setState({mouseOnSong: index});
    }
  }

  getSongClass(song,index) {
    if (this.state.mouseOnSong === index) {
      if (this.state.isPlaying && this.state.currentSong === song)
        return "ion-md-pause";
      return "ion-md-play";
    }
    return "song";
  }

  handleSongMouseEnter(index) {
    this.setState({mouseOnSong:index});
  }

  handleSongMouseLeave() {
      this.setState({mouseOnSong: -1});
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex( song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex( song => this.state.currentSong === song);
    const newIndex = Math.min(4, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

    render() {
      return (
        <section className="album">
          <section id="album-info">
            <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
            <div className="album-details">
              <h1 id="album-title">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
          </section>
          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody>
              {
                this.state.album.songs.map( ( song, index ) =>
                  <tr className={this.getSongClass(song,index)} key={index} onClick={() => this.handleSongClick(song, index)}
                          onMouseEnter={() => this.handleSongMouseEnter(index)}
                          onMouseLeave={() => this.handleSongMouseLeave()}>
                      <td>{index+1}</td>
                      <td>{song.title}</td>
                      <td>{song.duration}</td>
                  </tr>
              )
              }
            </tbody>
          </table>
          <PlayerBar
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
          />
        </section>
      );
    }
};

export default Album;
