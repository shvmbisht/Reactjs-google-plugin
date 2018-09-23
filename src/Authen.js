import React ,{Component} from 'react';
var firebase = require('firebase');


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDgSY_4abqCfNocl8G3-h4wxmgsTjesS3E",
  authDomain: "usurvey-1256a.firebaseapp.com",
  databaseURL: "https://usurvey-1256a.firebaseio.com",
  projectId: "usurvey-1256a",
  storageBucket: "usurvey-1256a.appspot.com",
  messagingSenderId: "543098519134"
};

firebase.initializeApp(config);
class Authen extends Component {
  login(event){
    const email=this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email,password);
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email,password);

promise.then(user => {
  var lout=document.getElementById("logout");
  lout.classList.remove('hide');
})
      promise.catch(e => {
        var err =e.message;
        console.log(err);
          this.setState({err: err});

      });
  }
  signup(event){
    const email=this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email,password);
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,password);

      promise
      .then(user => {
        var err = "Welcome "+ user.user.email;

        firebase.database().ref('users/'+user.user.uid).set({
          email: user.user.email
          });
        console.log(user);
        this.setState({err: err});
      });

      promise
      .catch(e => {
        var err = e.message;
        console.log(err);
        this.setState(({err: err}));
      });
  }

  logout(){
    firebase.auth().signOut();
    var lout=document.getElementById("logout");
    lout.classList.add('hide');
  }

  google(){
    console.log("i am in google method");
    var provider = new firebase.auth.GoogleAuthProvider();
  var promise=  firebase.auth().signInWithRedirect(provider);

    promise.then(result => {
      var user = result.user;
      console.log(result);
      firebase.database().ref('users/'+user.uid).set({
        email : user.email ,
        name: user.displayName
      });
      console.log("this isnt working ");
    });
    promise.catch(e => {
    var msg = e.message;
  console.log(msg);
});
  }

  constructor(props){
    super(props);

    this.state = {
        err:''

    };
    this.login = this.login.bind(this);
    this.signup =this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }
  render(){
    return(
      <div>
      <input id="email" type="email" placeholder="Enter your email" ref="email"/> <br />
      <input id="pass" type="password" placeholder="Enter your password" ref="password"/> <br />
      <p> {this.state.err}</p>
      <button onClick={this.login}>Log In</button>
      <button onClick={this.signup}>Sign Up </button>
      <button onClick={this.logout} id="logout" className="hide" >Log out </button><br />
      <button onClick={this.google} id="google" className="google">sign in with Google</button>

      </div>
    );
  }
}
export default Authen;
