import React, { Component } from 'react';
import {connect}            from 'react-redux';
import CollapseShop         from './collapse-shop.js'

var Logo1 = require('./Accest/logo1.png');

require('./Style/navigationheaderstyle.css');

class NavigationHeader extends Component {
    render() {
        console.log(this.props.cartData);
        const cartData = this.props.cartData;
        const showQuantilyCart = () => {
            if(!cartData) return;
            if(cartData.length <= 0) return;
            
            return (
                <span className="show-quantily-of-cart">
                    {cartData.length.toString()}
                </span>
            )}

        return (
            <div className="navigation-header">
                <nav className="navbar navbar-default navbar-menu-app container">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span> 
                            </button>
                            <a href="/my-account/cart" className="navbar-toggle">
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            </a>
                            <a className="navbar-brand" href="/">
                                <img src={Logo1} alt="Logo icon "/>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="/">Home</a></li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle"         href="/shop">
                                        Shop 
                                    </a>
                                </li>
                                <li><a href="/about-us">About Us</a></li> 
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="/my-account/cart">
                                        <span className="fa fa-shopping-cart" aria-hidden="true">
                                            {showQuantilyCart()}
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default connect(state => {
    return{
        cartData: state.cartData
    }
})(NavigationHeader);