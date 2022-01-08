import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { NAVBAR, TRANSITION } from './constants'
import HomeScreen from './three/HomeScreen'
import About from './pages/About'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import resume from '../assets/resume/resume.pdf'
import './App.css'


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navbar_selected: NAVBAR.HOME,
            transition: TRANSITION.CENTER,
            display_content: true,
            navbar_state: ""
        };
    }

    navbarClick = (e) => {

        let text = e.target.innerText;
        let transition = this.state.transition;
        let display_content = true;

        if (text !== this.state.navbar_selected) {
            display_content = false;
        } else {
            return;
        }

        if (text === NAVBAR.ABOUT) {
            transition = TRANSITION.UP;
        } else if (text === NAVBAR.PROJECTS) {
            transition = TRANSITION.LEFT;
        } else if (text === NAVBAR.EXPERIENCE) {
            transition = TRANSITION.RIGHT;
        } else if (text === NAVBAR.HOME) {
            transition = TRANSITION.CENTER;
            display_content = true;
        } else if (text == NAVBAR.BLOG) {
            transition = TRANSITION.BEHIND;
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


    toggle_navbar = () => {
        this.setState({
            navbar_state: this.state.navbar_state ? "" : "display"
        });
    }


    render() {
        let content = "";
        if (this.state.display_content) {
            switch(this.state.navbar_selected) {
                case NAVBAR.HOME:
                    content = 
                        <span className="stylized-border"> 
                            <h1 id="name"> saksham aggarwal </h1> 
                        </span>
                break;
                case NAVBAR.ABOUT:
                    content = <About />
                break;
                case NAVBAR.EXPERIENCE:
                    content = <Experience />
                break;
                case NAVBAR.PROJECTS:
                    content = <Projects />
                break;
                case NAVBAR.BLOG:
                    content = <div />
                break;
                default:
                    content = ""
                break;
            }
        }

        return (
            <div id="main-container">
                <HomeScreen 
                    transition = { this.state.transition }
                    contentReadyToDisplay = { this.contentReadyToDisplay }
                    contentDisplaying = { this.state.display_content }
                />
                <div id="main-overlay" className="title-font">
                    <div id="navbar-container">
                        <ul id="navbar" className= { this.state.navbar_state } >
                            <li className="icon" onClick={ this.toggle_navbar }>
                                <FontAwesomeIcon icon={faBars} />
                            </li>
                            {
                                Object.values(NAVBAR).map ((str) => {
                                        return <li key={str} onClick={ this.navbarClick } id={this.state.navbar_selected === str ? "navbar_selected" : ""}> {str} </li>
                                })
                            }
                            <li> <a href={ resume } target="_blank" rel="noreferrer"> resume </a> </li>
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
