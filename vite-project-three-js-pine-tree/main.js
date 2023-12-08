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
    200
)
camera.position.z = 80
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

//Main Light (day)
let dayLight = new THREE.PointLight(0xffaaaa, 500, 100, 2)
dayLight.position.set(0, 40, 0) // droite, haut, vers nous
scene.add(dayLight)

//Blue Light above (night)
const nightLightAbove = new THREE.PointLight(0x5555ff, 400, 100, 2)
nightLightAbove.position.set(0, 40, 0) // droite, haut, vers nous
scene.add(nightLightAbove)

//Blue Light below (night)
const nightLightBelow = new THREE.PointLight(0x5555ff, 400, 100, 2)
nightLightBelow.position.set(0, -40, 0) // droite, haut, vers nous
scene.add(nightLightBelow)

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
    dayLight.position.y = 30 * Math.cos(y)
    dayLight.position.z = 30 * Math.sin(z)
    y += 3/360
    z += 3/360

}
loop()

/*----------------------------------------------------------------------
                       Scene - Coordinates
----------------------------------------------------------------------*/

// x line
const xLinePoints = [];
xLinePoints.push( new THREE.Vector3( 0, 0, 0 ) );
xLinePoints.push( new THREE.Vector3( 40, 0, 0 ) );
const xLineMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000
});
const xLineGeometry = new THREE.BufferGeometry().setFromPoints(xLinePoints);
const xLine = new THREE.Line(xLineGeometry, xLineMaterial);
scene.add(xLine);

// y line
const yLinePoints = [];
yLinePoints.push( new THREE.Vector3( 0, 0, 0 ) );
yLinePoints.push( new THREE.Vector3( 0, 40, 0 ) );
const yLineMaterial = new THREE.LineBasicMaterial({
    color: 0x00ff00
});
const yLineGeometry = new THREE.BufferGeometry().setFromPoints(yLinePoints);
const yLine = new THREE.Line(yLineGeometry, yLineMaterial);
scene.add(yLine);

// z line
const zLinePoints = [];
zLinePoints.push( new THREE.Vector3( 0, 0, 0 ) );
zLinePoints.push( new THREE.Vector3( 0, 0, 40 ) );
const zLineMaterial = new THREE.LineBasicMaterial({
    color: 0x0000ff
});
const zLineGeometry = new THREE.BufferGeometry().setFromPoints(zLinePoints);
const zLine = new THREE.Line(zLineGeometry, zLineMaterial);
scene.add(zLine);


/*----------------------------------------------------------------------
                       Scene - Materials
----------------------------------------------------------------------*/

// Pines, Planet
const material1 = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.5
})

// Trunks
const material2 = new THREE.MeshStandardMaterial({
    color: "#cc5500",
    roughness: 0.5
})

/*----------------------------------------------------------------------
                       Scene - Geometries
----------------------------------------------------------------------*/
/*
// Top pine cone
const pine1cone1 = new THREE.ConeGeometry(3, 6, 64, 8)

const pine1mesh1 = new THREE.Mesh(pine1cone1, material1)
pine1mesh1.position.set(0, 24, 0)
scene.add(pine1mesh1)

// Middle pine cone
const pine1cone2 = new THREE.ConeGeometry(4, 8, 64, 8)
const pine1mesh2 = new THREE.Mesh(pine1cone2, material1)
pine1mesh2.position.set(0, 22, 0)
scene.add(pine1mesh2)

// Bottom pine cone
const pine1cone3 = new THREE.ConeGeometry(5, 10, 64, 8)
const pine1mesh3 = new THREE.Mesh(pine1cone3, material1)
pine1mesh3.position.set(0, 20, 0)
scene.add(pine1mesh3)

// Pine trunk cylinder
const pine1cylinder =  new THREE.CylinderGeometry( 1, 1, 4, 32);
const pine1cylinderMesh = new THREE.Mesh(pine1cylinder, material2)
pine1cylinderMesh.position.set(0, 14, 0)
scene.add(pine1cylinderMesh)
*/

const pine1group = createPineGroup(material1, material2);
pine1group.position.set(0, 0, 0);
pine1group.rotation.set(0, 0, 0);
scene.add(pine1group);

const pine2group = createPineGroup(material1, material2);
pine2group.position.set(0, 0, 0);
pine2group.rotation.set(0, 0, Math.PI/2);
scene.add(pine2group);

const pine3group = createPineGroup(material1, material2);
pine3group.position.set(0, 0, 0);
pine3group.rotation.set(0, 0, -Math.PI/2);
scene.add(pine3group);

// Planet
const sphere1 = new THREE.SphereGeometry(14, 64, 64)
const mesh5 = new THREE.Mesh(sphere1, material1)
mesh5.position.set(0, 0, 0)
scene.add(mesh5)

/*----------------------------------------------------------------------
                       Scene - Animations
----------------------------------------------------------------------*/

//gsap timeline, for a series of multiple animations
const tl = gsap.timeline({defaults: { duration: 0.5}})
pine1group.children.forEach((mesh, index) => {
    tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1}, index * 0.5);
});
pine2group.children.forEach((mesh, index) => {
    tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1}, 2 + index * 0.5);
});
pine3group.children.forEach((mesh, index) => {
    tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1}, 4 + index * 0.5);
});
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity:0, rotation:0}, {opacity:1, rotation:720})


function createPineGroup(material1, material2) {
    // Top pine cone
    const cone1 = new THREE.ConeGeometry(3, 6, 64, 8)
    const mesh1 = new THREE.Mesh(cone1, material1)
    mesh1.position.set(0, 24, 0)

    // Middle pine cone
    const cone2 = new THREE.ConeGeometry(4, 8, 64, 8)
    const mesh2 = new THREE.Mesh(cone2, material1)
    mesh2.position.set(0, 22, 0)

    // Bottom pine cone
    const cone3 = new THREE.ConeGeometry(5, 10, 64, 8)
    const mesh3 = new THREE.Mesh(cone3, material1)
    mesh3.position.set(0, 20, 0)

    // Pine trunk cylinder
    const cylinder =  new THREE.CylinderGeometry( 1, 1, 4, 32);
    const cylinderMesh = new THREE.Mesh(cylinder, material2)
    cylinderMesh.position.set(0, 14, 0)

    // Creation of a group
    const group = new THREE.Group();
    group.add(cylinderMesh);
    group.add(mesh3);
    group.add(mesh2);
    group.add(mesh1);

    return group;
}