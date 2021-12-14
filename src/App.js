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
              
              
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
      
                
                {( auth ) ?     (<Link className="nav-item nav-link" to="/products">Products</Link>) : ('')}
                
                  
                  {
                
                    ( auth ) ? 
                      ( <a className="nav-item nav-link" href="/" onClick={this.logOut}>Log out</a>) : 
                      ( '')  
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
