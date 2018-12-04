import React, { Component } from 'react'
import Moment from 'react-moment';
import Image from './Image';

class MediaItem extends Component {
  render() {
    const media_item = this.props;
    return (
      <div className="media__item">
        <div className="media__item__info"> 
          Created At: <Moment format="DD-MM-YYYY HH:mm" withTitle>
          {media_item.date}
          </Moment> 
          <br/>Type: {media_item.type}
        </div>
        <Image src={media_item.img} productUrl={media_item.productUrl}/>
      </div>
    )
  }
}

export default MediaItem;