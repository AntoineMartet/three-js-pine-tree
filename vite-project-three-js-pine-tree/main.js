import * as THREE from 'three'
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap"

/*----------------------------------------------------------------------
            Scene - Camera, renderer, size, resize, loop
----------------------------------------------------------------------*/

//Scene
const scene = new THREE.Scene()

//Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Camera
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width/sizes.height,
    0.1,
    100
)
camera.position.z = 40
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Resize
window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //Update camera + renderer
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

/*----------------------------------------------------------------------
                       Scene - Controls, Lights, Update
----------------------------------------------------------------------*/

//Light
let lightAbove = new THREE.PointLight(0xffaaaa, 500, 100, 2)
lightAbove.position.set(0, 10, 3) // droite, haut, vers nous
scene.add(lightAbove)

const lightDim = new THREE.PointLight(0x5555ff, 400, 100, 2)
lightDim.position.set(0, 20, 3) // droite, haut, vers nous
scene.add(lightDim)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = true // right click to translate the scene
controls.enableZoom = true // wheel to zoom in and out the scene
controls.enableRotate = true // left click to rotate the scene
controls.autoRotate = false
//controls.autoRotateSpeed = 4

let y = 0;
let z = 0;
//Update canvas regularly
const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
    lightAbove.position.y = 30 * Math.cos(y) - 20
    lightAbove.position.z = 30 * Math.sin(z)
    y += 3/365
    z += 3/365
}
loop()
/*----------------------------------------------------------------------
                       Scene - Geometries
----------------------------------------------------------------------*/

const cone1 = new THREE.ConeGeometry(3, 6, 64, 8)
const material1 = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.5
})
const mesh1 = new THREE.Mesh(cone1, material1)
scene.add(mesh1)

const cone2 = new THREE.ConeGeometry(4, 8, 64, 8)
const mesh2 = new THREE.Mesh(cone2, material1)
mesh2.position.set(0, -2, 0)
scene.add(mesh2)

const cone3 = new THREE.ConeGeometry(5, 10, 64, 8)
const mesh3 = new THREE.Mesh(cone3, material1)
mesh3.position.set(0, -4, 0)
scene.add(mesh3)

const cylinder1 =  new THREE.CylinderGeometry( 1, 1, 4, 32);
const material2 = new THREE.MeshStandardMaterial({
    color: "#cc5500",
    roughness: 0.5
})
const mesh4 = new THREE.Mesh(cylinder1, material2)
mesh4.position.set(0, -10, 0)
scene.add(mesh4)

const sphere1 = new THREE.SphereGeometry(10, 64, 64)
const mesh5 = new THREE.Mesh(sphere1, material1)
mesh5.position.set(0, -20, 0)
scene.add(mesh5)
/*----------------------------------------------------------------------
                       Scene - Animations
----------------------------------------------------------------------*/

//gsap timeline, for a series of multiple animations
const tl = gsap.timeline({defaults: { duration: 0.5}})
tl.fromTo(mesh4.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1})
tl.fromTo(mesh3.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1})
tl.fromTo(mesh2.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1})
tl.fromTo(mesh1.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1})
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity:0, rotation:0}, {opacity:1, rotation:720})
