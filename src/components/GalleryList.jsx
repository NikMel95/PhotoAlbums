import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { addAlbum } from '../actions/GalleryAction'
import Album from './AlbumItem'

class GalleryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      load: false,
      stop: false,
      next_page: ''
    };
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll);
    this.getAlbums();
  }

  handleScroll (event) {
    var top = document.documentElement.scrollTop;
    var el = document.querySelector('.gallery-content__list');
    if(top + window.innerHeight >= el.offsetTop + el.offsetHeight && !this.state.load && this.state.stop) {
      this.setState({
        load: true
      });
      this.getAlbums();
    }
  }

  getAlbums() {
    this.setState({
      load: true
    });

    var page = this.state.next_page ? '&pageToken=' + this.state.next_page : ''
    window.gapi.client.request({
      'path': 'https://photoslibrary.googleapis.com/v1/albums?pageSize=4' + page,
      'method': 'GET',  
    }).then((response) => {

      var items = response.result.albums;
      var _items = []

      for(var i = 0; i < items.length; i++) {
        var item = {
          item: items[i],
          open: false,
          id: items[i].id
        };
        this.props.addAlbum(item);
        _items.push(item);
      }
      this.setState({
        items: this.state.items.concat(_items),
        load: false,
        stop: response.result.nextPageToken ? true: false,
        next_page: response.result.nextPageToken ? response.result.nextPageToken:''
      });
    }).catch(() => {
      this.setState({
        load: false
      })
    })
  }

  loadMore (e) {
    this.getAlbums()
  }

  render() {
    const { items, load } = this.state;
    return (
      <div className="gallery-content">
        <div className="gallery-content__list row">
          {
            items
            .filter(d => this.props.filter === '' || d.item.title.toLowerCase().indexOf(this.props.filter.trim().toLowerCase()) > -1 )
            .map(d => 
              <Album 
                key={d.item.id} 
                id={d.item.id} 
                title={d.item.title} 
                img={d.item.coverPhotoBaseUrl} 
                count={d.item.mediaItemsCount} 
                url={d.item.productUrl}
              />)
          }
        </div>
        {load && <div className="gallery-load"><div></div></div>}
         { this.state.next_page && this.props.filter === '' && 
            <div className="gallery-content__btn">
              <button className="btn btn-primary" onClick={this.loadMore.bind(this)}>Load more</button>
            </div> 
          }
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    albums: store.gallery.albums,
    filter: store.gallery.filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAlbum: bindActionCreators(addAlbum, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryList)