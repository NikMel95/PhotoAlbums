import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMainLoad } from '../actions/AppAction';
import { togglePopupById } from '../actions/GalleryAction';
import MediaItem from './MediaItem'

class ModalAlbum extends Component {
  constructor(props) {
    super(props);
    this.props.setMainLoad(true);
    this.state = {
      media: [],
      show: false,
      nextPageToken: '',
      media_load: true
    }
    this.loadMedia(true)
  }

  loadMedia(first) {
    var page = this.state.nextPageToken ? 'pageToken=' + this.state.nextPageToken : '';
    window.gapi.client.request({
      'path': 'https://photoslibrary.googleapis.com/v1/mediaItems:search?' + page,
      'method': 'POST', 
      'body': {
        'albumId': this.props.id
      } 
    }).then((response) => {
      if(response.result.mediaItems) {
        this.setState({
          media: this.state.media.concat(response.result.mediaItems),
          nextPageToken: response.result.nextPageToken ? response.result.nextPageToken : ''
        });
      }
      if(first) {
        this.setState({
          show: true,
        });
        this.props.setMainLoad(false);
      }
      this.setState({
        media_load: false,
      });
    });
  }

  loadMore (e) {
    e.preventDefault()
    this.setState({
      media_load: true,
    });
    this.loadMedia()
  }

  onOpenModal () {
    this.props.togglePopupById({id: this.props.id, show: true})
    this.setState({ show: true });
  }

  onCloseModal () {
    this.props.togglePopupById({id: this.props.id, show: false})
    this.setState({ show: false }); 
  }

  render() {
    const { media } = this.state;
    return (
      <div className="">
        <Modal
          open={this.state.show}
          classNames={{
            modal: 'modal-popup'
          }}
          onClose={this.onCloseModal.bind(this)}
          styles={{
            modal: {
              padding: '20px 10px',
            }
          }}
        >
          <div className="album-popup">
            {this.state.load && <div className="modal-load"><div></div></div>}
            <div className="album-popup__title">
              {this.props.title}
            </div>
            <div className="album-popup__countitem">{this.props.count ? this.props.count : 0} - <i className="far fa-images"></i></div>
            <div className="album-popup__medialist">
              { 
                media.map(d => 
                  <MediaItem 
                    key={d.id}
                    img={d.baseUrl}
                    date={d.mediaMetadata.creationTime}
                    type={d.mimeType.split('/')[1]}
                    productUrl={d.productUrl}
                  />)
              }
            </div>
            {this.state.media_load && <div className="gallery-load"><div></div></div>}
            { this.state.nextPageToken && 
              <div className="album-popup__btn">
                <button className="btn btn-primary" onClick={this.loadMore.bind(this)}>Load more media</button>
              </div> 
            }
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    albums: store.gallery.albums
  }
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopupById: bindActionCreators(togglePopupById, dispatch),
    setMainLoad: bindActionCreators(setMainLoad, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAlbum)