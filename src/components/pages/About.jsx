import React, { Component } from 'react';
import profile_picture  from '../../assets/profile/profile_picture.png'
import { CSSTransition } from 'react-transition-group';
import './About.css'

export default class About extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            in : false,
        };
    }

    componentDidMount() {
        this.setState({
            in: true
        });
    }

    render() {
        return (
            <CSSTransition in={ this.state.in } timeout={ 200 } classNames="fade">
            <div id="about" className="container">
                <div id="profile-picture-container">
                    <img id="profile-picture" src={ profile_picture } /> 
                </div>
                <div id="about-content-container">
                    <h4> hi. </h4>  
                    <p> my name is saksham. </p>
                    <p> i'm currently doing my undergrad for <span className="emphasis"> computer engineering </span> at the <span className="emphasis"> university of waterloo </span> </p>
                    <br />
                    <p> i'm a multi-faceted programmer who loves to work on complex programs and solve interesting problems. </p>
                    <p> i've worked on games using <span className="emphasis"> c++ </span> and <span className="emphasis"> rust </span> as well as websites using <span className="emphasis"> react. </span> </p>
                    <br /> 
                    <p> i'm always trying to learn, and right now the topic of choice is <span className="emphasis"> computer graphics </span> . </p>
                    <p> i've been binge writing various raytracers to shaders and learning as much as i can about the graphics pipeline. </p>
                    <br />
                    <p> if you'd like to learn more about me, you can always visit my <span className="underline"><a href="https://github.com/aphsai">github</a></span>. </p>
                    <p> or email me at aphsai.c@gmail.com </p>
                </div>
                    </div>
            </CSSTransition>
        );
    }
}
