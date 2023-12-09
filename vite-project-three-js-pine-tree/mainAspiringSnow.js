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
    10000
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
let dayLight = new THREE.PointLight(0xccccaa, 6500, 100, 1.7)
dayLight.position.set(0, 40, 0) // droite, haut, vers nous
scene.add(dayLight)

//Blue Light above (night)
const nightLightAbove = new THREE.PointLight(0x8855aa, 400, 100, 1.8)
nightLightAbove.position.set(0, 40, 0) // droite, haut, vers nous
scene.add(nightLightAbove)

//Blue Light below (night)
const nightLightBelow = new THREE.PointLight(0x8855aa, 400, 100, 1.8)
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

// Pines
const material1 = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.5
})

// Trunks
const material2 = new THREE.MeshStandardMaterial({
    color: "#cc5500",
    roughness: 0.5
})

// Planet
const material3 = new THREE.MeshStandardMaterial({
    color: "#00ff83",
    roughness: 0.5
})

// Sun
const material4 = new THREE.MeshBasicMaterial({
    color: "#ffffaa",
    roughness: 0.5
})

// Snow
const material5 = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    roughness: 0.5
})

/*----------------------------------------------------------------------
                       Scene - Geometries
----------------------------------------------------------------------*/

// Pines
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
pine3group.rotation.set(0, 0, Math.PI);
scene.add(pine3group);

const pine4group = createPineGroup(material1, material2);
pine4group.position.set(0, 0, 0);
pine4group.rotation.set(0, 0, Math.PI*3/2);
scene.add(pine4group);

const pine5group = createPineGroup(material1, material2);
pine5group.position.set(0, 0, 0);
pine5group.rotation.set(-Math.PI/2, 0, 0);
scene.add(pine5group);

const pine6group = createPineGroup(material1, material2);
pine6group.position.set(0, 0, 0);
pine6group.rotation.set(Math.PI/2, 0, 0);
scene.add(pine6group);

// Planet
const sphere1 = new THREE.SphereGeometry(14, 64, 64)
const mesh5 = new THREE.Mesh(sphere1, material3)
mesh5.position.set(0, 0, 0)
scene.add(mesh5)

// Sun
const sunSphere = new THREE.SphereGeometry(50, 64, 64)
const sunMesh = new THREE.Mesh(sunSphere, material4)
sunMesh.position.set(0, 0, 0)
scene.add(sunMesh)

// 1. Create an array to store all the snowMesh objects
const snowMeshes = [];

// 2. When creating each snowMesh, add it to the array
for(let i = 0; i < 500; i++) {
    const snowMesh = createSnowMesh();
    scene.add(snowMesh);
    snowMeshes.push(snowMesh); // Add the snowMesh to the array
}

/*----------------------------------------------------------------------
                       Scene - GSAP animations
----------------------------------------------------------------------*/

//gsap timeline, for a series of multiple animations
const tl = gsap.timeline({defaults: { duration: 0.5}})
pine1group.children.forEach((mesh, index) => {
    tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1}, index * 0.25);
});
pine2group.children.forEach((mesh, index) => {
    tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1}, 1 + index * 0.25);
});
pine3group.children.forEach((mesh, index) => {
    tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1}, 2 + index * 0.25);
});
pine4group.children.forEach((mesh, index) => {
    tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1}, 3 + index * 0.25);
});
pine5group.children.forEach((mesh, index) => {
    tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1}, 4 + index * 0.25);
});
pine6group.children.forEach((mesh, index) => {
    tl.fromTo(mesh.scale, {x:0, y:0, z:0}, {x:1.0, y:1, z:1}, 5 + index * 0.25);
});
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity:0, rotation:0}, {opacity:1, rotation:720})

const tlSnow = gsap.timeline();

// Add a tween for each snowflake in the snowMeshes array
snowMeshes.forEach((snowMesh) => {
    tlSnow.to(snowMesh.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.1, // Adjust duration as needed
        ease: "power1.in" // Adjust easing as needed
    });
});

/*----------------------------------------------------------------------
                       Scene - Update, JS animations
----------------------------------------------------------------------*/

let y = 0;
let z = 0;
//Update canvas regularly
const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
    dayLight.position.y = 80 * Math.cos(y)
    dayLight.position.z = 80 * Math.sin(z)
    sunMesh.position.y = 500 * Math.cos(y)
    sunMesh.position.z = 500 * Math.sin(z)
    y += 1/360
    z += 1/360
    /*
    for (const snowMesh of snowMeshes) {
        snowMesh.position.y -= 0.1; // Adjust speed as needed

        // 4. If a snowMesh falls below a certain y position, reset its y position to the top
        if (snowMesh.position.y < -100) { // Adjust ground level as needed
            snowMesh.position.y = 100; // Adjust reset position as needed
        }
    }*/
}
loop()

function createPineGroup(material1, material2) {
    // Top pine cone
    const cone1 = new THREE.ConeGeometry(3, 6, 64, 8)
    const mesh1 = new THREE.Mesh(cone1, material1)
    mesh1.position.set(0, 25, 0)

    // Middle pine cone
    const cone2 = new THREE.ConeGeometry(4, 8, 64, 8)
    const mesh2 = new THREE.Mesh(cone2, material1)
    mesh2.position.set(0, 23, 0)

    // Bottom pine cone
    const cone3 = new THREE.ConeGeometry(5, 10, 64, 8)
    const mesh3 = new THREE.Mesh(cone3, material1)
    mesh3.position.set(0, 21, 0)

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

function createSnowMesh() {
    const snowSphere = new THREE.SphereGeometry(0.3, 64, 64);
    const snowMesh = new THREE.Mesh(snowSphere, material5);
    snowMesh.position.x = Math.random() * 200 - 100;
    snowMesh.position.y = Math.random() * 200 - 100;
    snowMesh.position.z = Math.random() * 200 - 100;
    return snowMesh;
}