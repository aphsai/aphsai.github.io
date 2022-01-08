import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Blog.css';

const posts = [
    "test"
]

export default class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = { in : false };
    }

    componentDidMount() {
        this.setState({
            in: true
        });
    }

    render() {
        return (
            <div id="blog" className="container">
                {
                    posts.map((post) => {
                        return <CSSTransition in={ this.state.in } timeout={ 200 } classNames="fade">
                            <div> test </div>
                        </CSSTransition>
                    })
                }
            </div>
        );
    }
}
