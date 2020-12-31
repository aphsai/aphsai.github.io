import React, { Component } from 'react';
import HomeScreen from './three/HomeScreen'
import { NAVBAR, TRANSITION } from './constants'
import './App.css';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navbar_selected: NAVBAR.HOME,
            transition: TRANSITION.CENTER
        };
    }

    navbarClick = (e) => {

        let text = e.target.innerText;
        let transition = this.state.transition;

        if (text === NAVBAR.ABOUT) {
            transition = TRANSITION.UP;
        } else if (text === NAVBAR.PROJECTS) {
            transition = TRANSITION.LEFT;
        } else if (text === NAVBAR.EXPERIENCE) {
            transition = TRANSITION.RIGHT;
        } else if (text === NAVBAR.HOME) {
            transition = TRANSITION.CENTER;
        }

        this.setState({
            navbar_selected: text,
            transition: transition
        });
    }



    render() {
        return (
            <div id="main-container">
                <HomeScreen 
                    transition = { this.state.transition }
                />
                <div id="main-overlay" className="title-font">
                    <div id="navbar-container">
                        <ul id="navbar">
                            {
                                Object.values(NAVBAR).map ((str) => {
                                        return <li key={str} onClick={ this.navbarClick } id={this.state.navbar_selected === str ? "navbar_selected" : ""}> {str} </li>
                                })
                            }
                            <li> resume </li>
                        </ul>
                    </div>
                    <div id="title-container">
                        <span>
                            <h1> saksham aggarwal </h1>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
