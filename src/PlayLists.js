
function PlayLists(props){

    const items = props.items
    const handleClick = props.handleClick

    return(
        <div className="item-lists">
            {
                items.map(function(item) {
                    return(
                        <div className="item-preview" key={item.id}>
                        <button className="button" onClick={() => handleClick(item)}>{item.name}</button>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default PlayLists;