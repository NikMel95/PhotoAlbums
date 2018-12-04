import React, { Component } from 'react'
import ModalAlbum from './ModalAlbum'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePopupById } from '../actions/GalleryAction';
import find from 'lodash/find'

class Album extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalshow: false
    }
  }

  onClick(e) {
    e.preventDefault();
    this.showModal();
  }

  showModal () {
    this.props.togglePopupById({id: this.props.id, show: true})
    this.setState({ modalshow: true });
  }

  hideModal () {
    this.props.togglePopupById({id: this.props.id, show: false})
    this.setState({ modalshow: false });
  }

  render() {
    var item_info = this.props;
    var style_img = {
      backgroundImage: 'url(' + item_info.img + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };

    return (
      <div className="albumitem-wrp col-sm-12 col-md-12 col-lg-6">
        <div className="albumitem" onClick={this.onClick.bind(this)}>
          <div className="albumitem__img">
            <div className="albumitem__overlay" style={style_img}>
            </div>
            <div className="albumitem__title">
              {item_info.title}
            </div>
          </div>
        </div>
        {find(this.props.albums, {'id': this.props.id}).open && 
          <ModalAlbum 
            show={find(this.props.albums, {'id': this.props.id}).open} 
            id={item_info.id}
            title={item_info.title}
            count={item_info.count}
          />
        }
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
    togglePopupById: bindActionCreators(togglePopupById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)