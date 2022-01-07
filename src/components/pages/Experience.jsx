import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Experience.css';


const experiences = [
    {
        name: "thumbtack",
        position: "software developer",
        date: "sep. 2021 - dec. 2021",
        work: [
            "wrote backend resolvers and graphql schemas to handle membership activations, cancellations and renewals",
            "created kafka consumers and producers to automatically send users emails on membership changes",
            "architected infrastructure to handle promotions that avoid detection from scraping extensions for third-party distributors"
        ]
    },
    {
        name: "kitchenmate",
        position: "software developer",
        date: "sep. 2020 - dec. 2020",
        work: [
            "developed service to automate jupyter notebook execution and automatically backup and version using s3 buckets, reducing ml platform latency by 17%",
            "implemented several enhancements such as location-based signup, customizeable surveys and push notifications heavily simplifying onboarding",
            "designed and created experimental recipes workflow by automating a/b testing, data aggregation and analysis for different workplaces"
        ]
    },
    {
        name: "kitchenmate",
        position: "software developer",
        date: "jan. 2020 - may 2020",
        work: [
            "architected machine learning platform and analysed waste reduction in order to optimize weekly inventory",
            "increased user interaction and retention by ~6% through implementation of referral program and recipe categorizations",
            "created a multi-processed repository of features with a built-in scheduler and ui to keep data up-to-date and easy to access"
        ]
    },
    {
        name: "assethub",
        position: "software developer",
        date: "may 2019 - aug. 2019",
        work: [
            "decreased runtime by ~20% through refactoring 4000+ lines in data processing pipeline",
            "maintained angular front-end by resolving several outstanding bugs in cloud services",
            "wrote java scripts to efficiently tackle alterations and mass reformats of data"
        ]
    },
    {
        name: "shoplogix",
        position: "front-end developer",
        date: "may 2018 - dec. 2020",
        work: [
            "created data visualization module and introduced caching to minimize loading times",
            "implemented authentication cookies for oauth to bypass react native webview limitations",
            "optimized core product by revamping libraries and streamlining codebase, increasing efficiency and decreasing load times by ~4%"
        ]
    }
]

export default class Experience extends Component {

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
            <CSSTransition in={ this.state.in } timeout={ 200 } classNames="fade">
            <div id="experience" className="container">
                {
                    experiences.map((experience) => {
                        return <div className="company" key={experience.date}> 
                            <div className="company-header">
                                <div className="company-name"> { experience.name } | { experience.position } </div> 
                                <div className="company-date"> { experience.date } </div>
                            </div>
                                <div className="company-body">
                                    <ul>
                                     {
                                         experience.work.map((work) => {
                                             return <li> <span> { work } </span> </li>
                                         })
                                     }
                                    </ul>
                                </div>
                        </div>
                    })
                }
            </div>
            </CSSTransition>
        );
    }
}
