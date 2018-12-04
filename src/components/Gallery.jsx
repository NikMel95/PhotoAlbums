import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setFilter } from '../actions/GalleryAction';
import { logout } from '../actions/UserAction'
import GalleryList from './GalleryList'

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    }
  }

  onClick(event) {
    event.preventDefault();
    window.gapi.auth2.getAuthInstance().signOut().then(() => {
      this.props.logout();
    }).catch(() => {
      this.props.logout();
    });
  }

   handleChange (e) {
    this.setState({
      filter: e.target.value
    })
    this.props.setFilter({filter: e.target.value})
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-12 col-lg-10">
            <div className="gallery">
              <button href={'#'} className="logout-btn" onClick={this.onClick.bind(this)}><i className="fas fa-sign-out-alt"></i></button>
              <div className="gallery__title">
                Albums
              </div>
              <div className="gallery__find">
                <form>
                  <div className="input-group">
                    <input 
                      className="form-input" 
                      type="text" 
                      placeholder="Find Albums" 
                      value={this.state.filter}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                </form>
              </div>
              <GalleryList />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch),
    setFilter: bindActionCreators(setFilter, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Gallery)