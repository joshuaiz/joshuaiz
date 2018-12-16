import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player'
// import AudioPlayer from '../AudioPlayer/AudioPlayer'
import './Playlist.scss'

class Playlist extends Component {
    state = {
        tracks: []
    }

    componentDidMount() {
        const { frontmatter } = this.props
        // console.log(frontmatter)

        if (frontmatter.withAudio) {
            import(`../../playlists/${frontmatter.playlist}`).then(
                ({ playlist }) => {
                    // console.log(playlist.tracks)
                    this.setState({
                        tracks: playlist.tracks
                    })
                }
            )
        }
    }

    render() {
        const { tracks } = this.state
        const { frontmatter } = this.props
        const playlistTracks = tracks.map(track => {
            // console.log('Track URL in Playlist render', track.url)
            return (
                <li key={track.id} className="audio-track">
                    <div className="track-info">
                        {track.artist}&nbsp;-&nbsp;{track.name}
                    </div>
                    <ReactAudioPlayer
                        src={track.url}
                        preload="auto"
                        controls
                        controlsList="nodownload"
                    />
                </li>
            )
        })

        return (
            <div className="playlist-wrap">
                <h4>{frontmatter.playlistTitle}</h4>
                {frontmatter.playlistSubtitle && (
                    <p>{frontmatter.playlistSubtitle}</p>
                )}
                <ul className="audio-playlist nostyle">{playlistTracks}</ul>
                <div className="buy-buttons">
                    {frontmatter.bandcampLink && (
                        <a
                            className="button bandcamp-button buy-button"
                            href={frontmatter.bandcampLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bandcamp-icon">
                                <img
                                    src="https://s3.amazonaws.com/joshuaizstatic/images/bandcamp_white.svg"
                                    alt="bandcamp icon"
                                />
                            </i>
                            Buy on Bandcamp
                        </a>
                    )}

                    {frontmatter.vizualLink && (
                        <a
                            className="button blue-button buy-button"
                            href="https://vizualrecords.com/catalog/albums/vizlp3"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="vizual-icon">
                                <img
                                    src="https://s3.amazonaws.com/joshuaizstatic/images/vizual_logo_white.svg"
                                    alt="vizual records icon"
                                />
                            </i>
                            Buy at the Vizual Store
                        </a>
                    )}

                    {frontmatter.spotifyLink && (
                        <a
                            className="button spotify-button"
                            href="https://open.spotify.com/album/6upHQD67iapVV2nWxFUKuR"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="spotify-icon">
                                <img
                                    src="https://s3.amazonaws.com/joshuaizstatic/images/spotify_white.svg"
                                    alt="spotify icon"
                                />
                            </i>
                            Listen on Spotify
                        </a>
                    )}
                </div>
            </div>
        )
    }
}

export default Playlist
