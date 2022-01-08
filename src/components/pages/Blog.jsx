import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import the_encroaching_loneliness from './blog/the_encroaching_loneliness.js';
import './Blog.css';

const posts = [
    {
        src: the_encroaching_loneliness,
        title: 'the encroaching loneliness',
        date: 'january 7th, 2022'
    },
];

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

    async openPost(post) {
        this.setState({
            selected_post: post
        });
    }

    render() {
        return (
            <div id="blog" className="container">
                { !this.state.selected_post &&
                    posts.map((post, index) => {
                        return <CSSTransition in={ this.state.in } timeout={ 200 } classNames="fade">
                            <div 
                                className="post"
                                onClick={() => { this.openPost(posts[index]) }}
                            >
                                <h2 className="post-title"> { post.title } </h2>
                                <h4 className="post-date"> { post.date } </h4>
                            </div>
                        </CSSTransition>
                    })
                }
                { this.state.selected_post && 
                    <CSSTransition in={ this.state.in } timeout={ 200 } classNames="fade">
                        <div className="selected_post">
                            <h2 className="post-title"> { this.state.selected_post.title } </h2>
                            <h4 className="post-date"> { this.state.selected_post.date } </h4>
                            {this.state.selected_post.src}
                            <button onClick={() => this.setState({ selected_post: undefined })}> return </button>
                        </div>
                    </CSSTransition>
                }
            </div>
        );
    }
}
