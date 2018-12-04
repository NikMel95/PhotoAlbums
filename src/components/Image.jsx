import React, { Component } from 'react'

class Image extends Component {
  render() {
    return (
      <div className="media__image">
        <a href={this.props.productUrl} target="_blank">
          <img src={this.props.src} className="img-fluid" alt={''}/>
        </a>
      </div>
    )
  }
}

export default Image;