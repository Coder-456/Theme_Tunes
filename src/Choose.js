import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PlayLists from './PlayLists'
import Tracks from './Tracks'
import Categories from './Categories'

function Choose() {

    const ClientId =  '9cc5c5a21ebc4aac889f58a27859561a'
    const ClientSecret = '6b9ffc88fa8d4bd7987c5feb73987448'

    const [token, setToken] = useState('');  
    const [featuredplaylist, setFeaturedPlaylist] = useState([]);
    const [categories, setCategories] = useState([]);
    const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
    const [tracks, setTracks] = useState([]);
    const [trackDetail, setTrackDetail] = useState(null);

    useEffect(() => {

        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(ClientId + ':' + ClientSecret)      
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
        .then(tokenResponse => {      
            setToken(tokenResponse.data.access_token);

            axios('https://api.spotify.com/v1/browse/featured-playlists?locale=sv_US', {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
            })
            .then (featuredPlaylistResponse => {        
                setFeaturedPlaylist(featuredPlaylistResponse.data.playlists.items)
            });

            axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
            })
            .then (categoriesResponse => {        
                setCategories(categoriesResponse.data.categories.items)
            });
            
        });

    }, []); 
    
    const handleClick = (track) => {
        
        axios(track.tracks.href+'?limit=16', {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        })
        .then(tracksResponse => {
            setTracks(tracksResponse.data.items)
        });

    }


    const handleCategories = (category) => {
        axios(`https://api.spotify.com/v1/browse/categories/${category.id}/playlists?limit=11`, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        })
        .then (featuredPlaylistResponse => {        
            setFeaturedPlaylist(featuredPlaylistResponse.data.playlists.items)
        });

    }

    const i = 0;
    return(
        <div className='Space'>
            <div className="choose">
                <div className="column left">
                    <div className='top'>
                        <img className = "spotify" src="https://external-preview.redd.it/jO3sHFSE-XWH3VLzJaLwNY3RrC2bXC-T3Lum0UhG19M.jpg?auto=webp&s=0ada01a56332f2ad3ce3dec3513f4cef6c73c0b0" width="180" height="180"/>
                        <p><h1> Tune in your theme !</h1><br/>
                          <small><b> + Click on a Theme<br/>
                          + Choose a playlist <br/>
                          + Press to Listen Now!<br/><br/></b></small>
                          <small><i>&lt; Developed by <big><strong>Harini</strong></big> &gt;</i></small><br/>
                          <small>Built using React JS and Spotify web API</small>
                        </p>
                    </div>
                    <div className='bottom'>
                        <br/>
                        <Categories items={categories} handleCategories={handleCategories}/>
                    </div>
                    
                </div>
                <div className="column right">
                    <PlayLists items={featuredplaylist} handleClick={handleClick}/>
                </div>
            </div>
           <Tracks items={tracks.slice(0,4)}/>
           <Tracks items={tracks.slice(4,8)}/>
           <Tracks items={tracks.slice(8,12)}/>
           <Tracks items={tracks.slice(12,16)}/>
                   
            
        </div>
    )
}

export default Choose;