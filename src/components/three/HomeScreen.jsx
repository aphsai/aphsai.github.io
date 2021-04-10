import React, { Component } from 'react';
import * as THREE from 'three';
import { TRANSITION } from '../constants'
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import deer from '../../assets/animals/deer.glb';
import './HomeScreen.css';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('touchmove', this._onTouchMove);
        window.addEventListener('resize', this.onWindowResize);
    }
    
    _mouseEvent = (x, y) => {
        if (this.props.transition === TRANSITION.CENTER) {
            this.horizontal_angle = Math.PI + (x / window.innerWidth) * (2 * Math.PI);
            this.vertical_angle = Math.PI / 2 + (y / window.innerHeight) * (Math.PI / 1.5);
            this.target_position = new THREE.Vector3(Math.sin(this.horizontal_angle) * this.camera_radius, Math.sin(this.vertical_angle), Math.cos(this.horizontal_angle) * this.camera_radius);
        } 
    }

    _onMouseMove = (e) => {
        this._mouseEvent(e.clientX, e.clientY);
    }

    _onTouchMove = (e) => {
        this._mouseEvent(e.touches[0].clientX, e.touches[0].clientY);
    }

    componentDidMount() {

        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        const num_planes = 8;
        const plane_radius = -10;
        //const planes = [];
        const colors = [ 0x7b3e19, 0xFFC759, 0xFF7B9C, 0x607196 ];
        //const colors = [  0x333333, 0x666666, 0x888888, 0xCCCCCC ];
        const background_color = 0x171717;

        this.camera_radius = 5;
        this.horizontal_angle = 0;
        this.lerp_speed = 0.1;

        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
        this.camera_rotation = new THREE.Vector3(0, this.horizontal_angle, 0);
        this.camera_position = new THREE.Vector3(0, 1, this.camera_radius);
        this.camera.position.copy(this.camera_position);
        this.target_position = this.camera_position.clone();
        this.scene.add(this.camera);

        // Get width of plane
        const plane_width = 2 * Math.PI / num_planes * plane_radius;
        const plane_height = 5;
        const plane_angle = 2 * Math.PI / num_planes;

        // Light sources
        for (let x = 0; x < num_planes; x++) {
            let geometry = new THREE.PlaneGeometry(plane_width, plane_height, 1);
            let material = new THREE.MeshBasicMaterial({ 
                    color: colors[x % colors.length], 
                    side: THREE.DoubleSide,
            });
            let plane = new THREE.Mesh(geometry, material);

            plane.position.set(Math.sin(plane_angle * x) * plane_radius, 2, (Math.cos(plane_angle * x)) * plane_radius);
            plane.rotation.set(0, plane_angle * x, 0);

            this.scene.add(plane); 
        } 

        // Floor
        let geometry = new THREE.PlaneGeometry(200, 200, 1);
        let floor = new Reflector(geometry, {
            clipBias: 0.003,
            color: 0x777777
        });
        floor.rotation.set(- Math.PI / 2, 0, 0);
        floor.position.set(0, -1, 0);
        let material = new THREE.MeshLambertMaterial ({
            color: 0x111111,
            transparent: true,
            opacity: 0.5
        })
        this.scene.add(floor);
        let floor_filter = new THREE.Mesh(geometry, material);
        floor_filter.rotation.set(- Math.PI / 2, 0, 0);
        floor_filter.position.set(0, -0.999, 0);
        this.scene.add(floor_filter);

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        this.composer = new EffectComposer(this.renderer);

        const render_pass = new RenderPass(this.scene, this.camera);

        const dot_screen_shader = new ShaderPass(DotScreenShader);
        dot_screen_shader.uniforms['scale'].value = 10;

        const rgb_shift_shader = new ShaderPass(RGBShiftShader);
        rgb_shift_shader.uniforms['amount'].value = 0.005;

        const bloom_pass =  new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloom_pass.threshold = 0.2;
        bloom_pass.strength = 0.4;
        bloom_pass.radius = 0.1;

        this.composer.addPass(render_pass);
        //this.composer.addPass(dot_screen_shader);
        //this.composer.addPass(rgb_shift_shader);
        this.composer.addPass(bloom_pass);


        let ambient_light = new THREE.AmbientLight(0xFFFFFF, 0.6);
        let directional_light = new THREE.DirectionalLight(0xDDDDDD, 3);

        this.scene.add(ambient_light);
        this.scene.add(directional_light)

		this.scene.background = new THREE.Color( background_color );;
		this.scene.add( new THREE.HemisphereLight( 0xffffff, 0x000000, 0.4 ) );

        this.loader = new GLTFLoader();
        this.loader.load(deer, (gltf) => {

            const model = gltf.scene;

            model.position.set(0, 0, 0);
            model.scale.set(0.01, 0.01, 0.01);

            this.scene.add(model);
            this.animate();

        }, undefined, function (error) {
            console.error(error);
        })

        this.start();
    }

    onWindowResize = () => {
        if (this.renderer) this.renderer.setSize(window.innerWidth, window.innerHeight);
        if (this.composer) this.composer.setSize(window.innerWidth, window.innerHeight);
        if (this.camera) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
	}

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    stop = () => {
        cancelAnimationFrame(this.frameId);
    }

    animate = () => {
        if (this.target_position) {
        
            this.camera_position.lerp(this.target_position, this.lerp_speed);
            
            // Clamp if both X and Z are less than 2
            this.copy_position = this.camera_position.clone();
            if (Math.abs(this.camera_position.x) < 2 && Math.abs(this.camera_position.z) < 2) {
                this.copy_position.z = Math.sign(this.camera_position.z) * Math.max(Math.abs(this.camera_position.z), 2);
            }

            this.camera.position.copy(this.copy_position);
            this.camera.lookAt(0, 1, 0);

            let is_close = this.isClose(this.camera.position, this.target_position);

            if (this.props.transition !== TRANSITION.CENTER) {
                if (is_close && !this.props.display_content) {
                    this.props.contentReadyToDisplay(true);
                }
            }
        }
        this.frameId = window.requestAnimationFrame(this.animate);
        this.composer.render();
    }

    isClose = (a, b) => {
        const EPSILON = 1e-1;
        return Math.abs(a.z - b.z) < EPSILON &&
            Math.abs(a.y - b.y) < EPSILON &&
            Math.abs(a.x - b.x) < EPSILON
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('touchmove', this._onMouseMove);
        window.removeEventListener('resize', this.onWindowResize);
        this.stop();
    }

    componentDidUpdate = () => {
        this.lerp_speed = 0.03;
        if (this.props.transition === TRANSITION.LEFT) {
            this.target_position = new THREE.Vector3(-12, 2.5, this.camera_radius - 3);
        } else if (this.props.transition === TRANSITION.CENTER) {
            this.target_position = new THREE.Vector3(0, 1, this.camera_radius);
            this.lerp_speed = 0.1;
        } else if (this.props.transition === TRANSITION.RIGHT) {
            this.target_position = new THREE.Vector3(12, 2.5, this.camera_radius - 3);
        } else if (this.props.transition === TRANSITION.UP) {
            this.target_position = new THREE.Vector3(0, 1, this.camera_radius + 7);
        }
    }

    lerp = (a, b, f) => {
        return a + f * (b - a);
    }

    render() {
        return (
            <div id="main" ref={ref => { this.mount = ref }}> </div>
        );
    }
}
