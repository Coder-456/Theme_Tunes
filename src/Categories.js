function Categories(props){

    const items = props.items
    const handleCategories = props.handleCategories

    return(
        <div className="item-lists">
            {
                items.map(function(item) {
                    return(
                        <div className="category" key={item.id}>
                        <button className="categorybtn" onClick={() => handleCategories(item)}>{item.name}</button>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default Categories;