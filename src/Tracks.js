function Tracks(props){

    const items = props.items

    return (
        <div className="track-items">

            {
                items.map(function(item) {
                    
                    return(
                        <div className="track-preview" key={item.id}>
                            <a href={item.track.external_urls.spotify}><img src={item.track.album.images[0].url} alt="no image" width="213" height="213"/></a>
                            <p id="track-name">{item.track.name}</p>
                            <p style={{color:"white"}}>{item.track.artists[0].name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Tracks;