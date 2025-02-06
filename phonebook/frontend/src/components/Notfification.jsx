const Notification = ({ prompt }) => {
    if(!prompt){
        return null
    }
    return(
        <div className="prompt">
            {prompt}
        </div>
    )
}

export default Notification;