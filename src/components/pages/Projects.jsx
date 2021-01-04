import React, { Component } from 'react';
import wasabi from "../../assets/projects/wasabi_sdl.png"
import raycaster from "../../assets/projects/raycaster.png"
import thea from "../../assets/projects/thea.png"
import chip8 from "../../assets/projects/chip8.png"
import tetris from "../../assets/projects/tetris-multiplayer.png"
import competitive from "../../assets/projects/competitive.png"
import puppr from "../../assets/projects/puppr.png"
import clown from "../../assets/projects/clown.png"

import './Projects.css'

const projects = 
    [
        {
            src: wasabi,
            title: "wasabi",
            url: "wasabi_sdl",
            description: "a game written in c++ with a custom engine. implemented using an entity component system and compositional data model.",
            tags: ['sdl2', 'c++']
        }, 
        {
            src: raycaster,
            title: "raycaster",
            url: "raycaster",
            description: "a simple c++ doom/wolfenstein map renderer.",
            tags: ['sdl2', 'c++']
        },
        {
            src: thea,
            title: "thea",
            url: "thea",
            description: "a little interpeter i wrote for a simple language designed for learning purposes. i also tried making my code heavily test driven, which presented its own pros and cons.",
            tags: ['go']
        },
        {
            src: puppr,
            title: "puppr",
            url: "puppr",
            description: "a website that utilizes the clarifai api to determine filter and remove non-canine related content. only good boys allowed.",
            tags: ['firebase', 'react', 'cloudinary', 'clarifai']
        },
        {
            src: competitive,
            title: "competitive",
            url: "competitive",
            description: "i've done/do a fair bit of leetcode/competitive programming in the past and these are a compilation of my solutions.",
            tags: ['java', 'c++']
        },
        {
            src: tetris,
            title: "tetris",
            url: "tetris",
            description: "every tetris application on the internet is extremely bloated and riddled with ads. this was a small version with no extraneous features so my friends and i could play together.",
            tags: ['javascript', 'express', 'socket.io']
        },
        {
            src: chip8,
            title: "chip8 emulator",
            url: "chip8",
            description: " i wanted to get a better lower level understanding on how things like this operate.",
            tags: ['c++', 'sdl2']
        },
        {
            src: clown,
            title: "clown",
            url: "clown",
            description: "a toy game engine written using c++, vulkan libraries and glfw",
            tags: ['c++', 'glsl', 'vulkan', 'glfw']
        },
        {
            src: "",
            title: "",
            url: "",
            description: "",
            tags: []
        }
    ];


export default class Projects extends Component {
    render() {
        return (
            <div id="projects" className="container">
                <div id="projects-content"> </div>
                    {
                        projects.map((project) => {
                            return (
                                <div className={ project.src ? "project" : "project hidden" }> 
                                    <a href={ "https://github.com/aphsai/" + project.url } ><img src={ project.src } /></a>
                                    <div className="project-body">
                                        <div className="project-title">
                                            <h4> { project.title } </h4>
                                        </div>
                                        <div className="description">
                                            <p> { project.description } </p>
                                        </div>
                                    </div>
                                    <div className="tags">
                                        <ul>
                                            { 
                                                project.tags.map((tag) => {
                                                    return <li> { tag } </li>
                                                })

                                            }
                                        </ul>
                                    </div>
                                </div>
                            );
                        })
                    }
            </div>
        );
    }
}

