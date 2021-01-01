import React, { Component } from 'react';
import HomeScreen from './three/HomeScreen'
import { NAVBAR, TRANSITION } from './constants'
import './App.css';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navbar_selected: NAVBAR.HOME,
            transition: TRANSITION.CENTER,
            display_content: true
        };
    }

    navbarClick = (e) => {

        let text = e.target.innerText;
        let transition = this.state.transition;
        let display_content = true;

        if (text === NAVBAR.ABOUT) {
            transition = TRANSITION.UP;
        } else if (text === NAVBAR.PROJECTS) {
            transition = TRANSITION.LEFT;
        } else if (text === NAVBAR.EXPERIENCE) {
            transition = TRANSITION.RIGHT;
        } else if (text === NAVBAR.HOME) {
            transition = TRANSITION.CENTER;
        }

        if (text !== this.state.navbar_selected) {
            display_content = false;
        }

        this.setState({
            navbar_selected: text,
            transition: transition,
            display_content: display_content
        });
    }

    contentReadyToDisplay = (isReady) => {
        this.setState({
            display_content: isReady
        });
    }



    render() {
        let content = "";

        if (this.state.display_content) {
            switch(this.state.navbar_selected) {
                case NAVBAR.HOME:
                    content = 
                        <span> 
                            <h1 id="name"> saksham aggarwal </h1> 
                        </span>
                break;
                case NAVBAR.ABOUT:
                    content = 
                        <div id="about" className="container">
                            <h1> hi, </h1>  
                            <p> this is nice </p>
                        </div>
                break;
                case NAVBAR.EXPERIENCE:
                    content = 
                        <div id="experience" className="container">
                            <h1> heres where ive worked </h1>
                            <p> work 1 </p>
                            <p> work 2 </p>
                            <p> work 3 </p>
                        </div>

                break;
                case NAVBAR.PROJECTS:
                    content = 
                        <div id="projects" className="container">
                            <h1> heres some stuff ive done </h1>
                        </div>
                break;
            }
        }

        return (
            <div id="main-container">
                <HomeScreen 
                    transition = { this.state.transition }
                    contentReadyToDisplay = { this.contentReadyToDisplay }
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
                        <div id="content-container">
                            { content }
                        </div>
                </div>
            </div>
        );
    }
}
