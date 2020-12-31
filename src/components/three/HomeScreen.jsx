import React, { Component } from 'react';
import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import deer from '../../assets/animals/deer.glb';
import './HomeScreen.css';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        document.addEventListener('mousemove', this._onMouseMove);
    }

    _onMouseMove = (e) => {
        this.horizontal_angle = Math.PI + (e.clientX / window.innerWidth) * (2 * Math.PI);
        this.vertical_angle = Math.PI / 2 + (e.clientY / window.innerHeight) * (Math.PI / 1.5);
        this.target_position = new THREE.Vector3(Math.sin(this.horizontal_angle) * this.camera_radius, Math.sin(this.vertical_angle), Math.cos(this.horizontal_angle) * this.camera_radius);
    }

    componentDidMount() {

        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        const num_planes = 8;
        const plane_radius = -10;
        const planes = [];
        const colors = [0x7b3e19, 0xb29b84, 0xf5e5fc, 0x8ae1fc];
        const background_color = 

        this.camera_radius = 5;

        this.horizontal_angle = 0;

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
            var geometry = new THREE.PlaneGeometry(plane_width, plane_height, 1);
            var material = new THREE.MeshBasicMaterial({ 
                    color: colors[x % colors.length], 
                    side: THREE.DoubleSide,
            });
            var plane = new THREE.Mesh(geometry, material);

            plane.position.set(Math.sin(plane_angle * x) * plane_radius, 2, (Math.cos(plane_angle * x)) * plane_radius);
            plane.rotation.set(0, plane_angle * x, 0);

            planes.push(plane);
            this.scene.add(plane); 
        } 

        // Floor

        var geometry = new THREE.PlaneGeometry(200, 200, 1);
        var floor = new Reflector(geometry, {
            clipBias: 0.003,
            color: 0x777777
        });
        floor.rotation.set(- Math.PI / 2, 0, 0);
        floor.position.set(0, -1, 0);

        var material = new THREE.MeshLambertMaterial ({
            color: 0x111111,
            transparent: true,
            opacity: 0.5
        })

        this.scene.add(floor);

        var floor_filter = new THREE.Mesh(geometry, material);
        floor_filter.rotation.set(- Math.PI / 2, 0, 0);
        floor_filter.position.set(0, -0.999, 0);
        this.scene.add(floor_filter);

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        this.composer = new EffectComposer(this.renderer);

        const render_pass = new RenderPass(this.scene, this.camera);
        const glitch_pass = new GlitchPass(3);
        const bloom_pass =  new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloom_pass.threshold = 0.2;
        bloom_pass.strength = 0.4;
        bloom_pass.radius = 0.1;

        this.composer.addPass(render_pass);
        this.composer.addPass(glitch_pass);
        this.composer.addPass(bloom_pass);

        let ambient_light = new THREE.AmbientLight(0xFFFFFF, 0.6);
        let directional_light = new THREE.DirectionalLight(0xDDDDDD, 3);

        this.scene.add(ambient_light);

        this.scene.add(directional_light)
		this.scene.background = new THREE.Color( 0x171717 );;
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

    componentDidUpdate() {
        console.log(this.props.transition);
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
        
            this.camera_position.lerp(this.target_position, 0.1);
            
            // Clamp if both X and Z are less than 2
            this.copy_position = this.camera_position.clone();
            if (Math.abs(this.camera_position.x) < 2 && Math.abs(this.camera_position.z) < 2) {
                this.copy_position.z = Math.sign(this.camera_position.z) * Math.max(Math.abs(this.camera_position.z), 2);
            }

            this.camera.position.copy(this.copy_position);
            this.camera.lookAt(0, 1, 0);

        }
        this.frameId = window.requestAnimationFrame(this.animate);
        this.composer.render();
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this._onMouseMove);
        this.stop();
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
