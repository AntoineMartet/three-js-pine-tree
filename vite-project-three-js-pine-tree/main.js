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
    y += 5/365
    z += 5/365
}
loop()
/*----------------------------------------------------------------------
                       Scene - Geometries
----------------------------------------------------------------------*/

// sun
const geometrySun = new THREE.CircleGeometry( 30, 32);
const materialSun = new THREE.MeshStandardMaterial( { color: 0xFF9671 } );
const sun = new THREE.Mesh( geometrySun, materialSun );
sun.position.z = -49
scene.add( sun );

// background
const geometryBackground = new THREE.CircleGeometry( 130, 32);
const materialBackground = new THREE.MeshStandardMaterial( { color: 0x00BFFF } );
const background = new THREE.Mesh( geometryBackground, materialBackground );
background.position.z = -50
scene.add( background );

// le sol
const geometryGround = new THREE.CircleGeometry( 100, 32);
const materialGround = new THREE.MeshStandardMaterial( { color: 0xDCDCDC } );
const ground = new THREE.Mesh( geometryGround, materialGround );
ground.rotation.x = -Math.PI / 2
ground.position.y = - 10
scene.add( ground );


// boucle qui créé des sapin sur toute la hauteur
for(let vertical = 0; vertical <= 10; vertical++ ){
    const posZ = vertical * (-5.5)
    // boucle qui cree sapihorizontal sur toute la lohorizontalgueur
    for(let horizontal = 0; horizontal <= 10; horizontal++){
        const posX = 5.5 * horizontal // partie droite
        const posXneg = posX * (-1) //partie gauche
        // creation d'un sapin
        for(let i = 0; i <= 5; i++){
            const size = 1 + (0.3 * i) // honnetement je ne me souviens plus pk exactement ce calcul
            const positionY = -i
            triangleCreation(size, positionY, posX, posZ)
            triangleCreation(size, positionY, posXneg, posZ)
            tronCreation(posX, posZ)
            tronCreation(posXneg, posZ)
        }
    }
}
// creation d'un tronc
function tronCreation(x, z){
    const geometry = new THREE.CylinderGeometry( 0.7, 0.7, 7, 10 );
    const material = new THREE.MeshStandardMaterial( {color: 0x0643d08} );
    const cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.y = -5
    cylinder.position.x = x
    cylinder.position.z = z
    scene.add( cylinder );

}
//creation d un sapin
function triangleCreation(size, y, x, z){
    const geometry = new THREE.ConeGeometry(size, 3, 20)
    const material = new THREE.MeshStandardMaterial({ color: 0x032CD32})
    const triangle = new THREE.Mesh( geometry, material)
    triangle.position.y = y
    triangle.position.x = x
    triangle.position.z = z
    // couleurs bordures
    /*
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x0ADFF2F });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    triangle.add(wireframe);
     */
    scene.add(triangle);

}
// boule violette
const buttonGeometry = new THREE.IcosahedronGeometry(2)
const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0x845EC2})
const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
/*
const wireframeGeoBt = new THREE.WireframeGeometry(buttonGeometry);
const wireframeMatBt = new THREE.LineBasicMaterial({ color: 0xffffff });
const wireframeBt = new THREE.LineSegments(wireframeGeoBt, wireframeMatBt);
button.add(wireframeBt)
 */
button.position.y = 6.3
scene.add(button)

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