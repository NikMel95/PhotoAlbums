import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../actions/UserAction'
import {bindActionCreators} from 'redux'


class Auth extends Component {
  onClick (e) {
    e.preventDefault();
    window.gapi.auth2.getAuthInstance().signIn().then((res) => {
      window.gapi.client.people.people.get({
        'resourceName': 'people/me',
        'personFields': 'emailAddresses,names',
      }).then((response) => {
        this.props.login({
          name: response.result.names[0].displayName,
          email: response.result.emailAddresses[0].value,
          isAuth: true
        })
      });
    })
  }
  
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-12 col-lg-5">
            <div className="auth-wrp"> 
              <p className="auth-wrp__text">Enter in Photo Library </p>
              <div className="auth-wrp__tools">
                <button className="auth-wrp__button btn btn-primary btn-lg" onClick={this.onClick.bind(this)}><i className="fab fa-google"></i> Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Auth)