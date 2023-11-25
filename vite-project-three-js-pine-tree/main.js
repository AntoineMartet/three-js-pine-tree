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
camera.position.z = 20
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
const light = new THREE.PointLight(0xffffff, 200, 100)
light.position.set(0, -10, 10) // droite, haut, vers nous
scene.add(light)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false // right click to translate the scene
controls.enableZoom = false // wheel to zoom in and out the scene
controls.enableRotate = true // left click to rotate the scene
controls.autoRotate = true
controls.autoRotateSpeed = 2

//Update canvas regularly
const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()
/*----------------------------------------------------------------------
                       Scene - Geometries
----------------------------------------------------------------------*/

//Create our sphere
const coneGeometry = new THREE.ConeGeometry(3, 6, 64, 8)
const material = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.5
})
const mesh = new THREE.Mesh(coneGeometry, material)
scene.add(mesh)

/*----------------------------------------------------------------------
                       Scene - Animations
----------------------------------------------------------------------*/

//gsap timeline, for a series of multiple animations
const tl = gsap.timeline({defaults: { duration: 1}})
tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1})
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity:0, rotation:0}, {opacity:1, rotation:720})