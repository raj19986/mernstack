import React, { Component } from 'react';
import Login from './components/Login';
import Products from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import {  BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { isAuthenticated } from './repository';


class App extends Component {

  logOut(){
    localStorage.removeItem('x-access-token');
    /*localStorage.removeItem('activeuserId');*/

  }
  
  render() {
    const auth = isAuthenticated();
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  
                  
                  {
                    ( auth ) ? 
                      ( <a className="nav-item nav-link" href="/" onClick={this.logOut}>Log out</a>) : 
                      ( <Link className="nav-item nav-link float-right" to="/login">Log in</Link> )
                   }
                </div>
              </div>
            </div>
          </nav>
          <div className="container">
            <br/>
            <Route exact path="/products" component={Products} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            { (!auth) ? <Route exact path="/" component={Login} /> : '' }
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
