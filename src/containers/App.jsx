import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../actions/UserAction';
import { setMainLoad } from '../actions/AppAction';
import { bindActionCreators } from 'redux';
import Auth from '../components/Auth';
import Gallery from '../components/Gallery';
import MainLoader from '../components/MainLoad';

class App extends Component { 
  LoadGAPI() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
      window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            apiKey: 'AIzaSyBMYF26vqrAKxGaOA50VAR9sPiwYFnri6I',
            discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
            clientId: '849228621087-9f8sd97emarlrien39paj2av4oskte8l.apps.googleusercontent.com',
            scope: 'profile email',
            response_type: 'id_token permission'
        }).then(() => {
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.login())
        })
      });
    };
    document.body.appendChild(script);
  }
  
  login() {
    if(window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
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
    }
    this.props.setMainLoad(false)
  }

  componentDidMount() {
    this.LoadGAPI();
  }

  render() {
    return (
      <div className={'app__wrp' + (this.props.user.isAuth ? '': ' noauth')}>
        { this.props.load && <MainLoader /> } 
        { this.props.user.isAuth ? (<Gallery />) : (<Auth />) } 
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    load: store.app.load,
    user: store.user.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
    setMainLoad: bindActionCreators(setMainLoad, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)