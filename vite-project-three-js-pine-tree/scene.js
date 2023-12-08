
/*----------------------------------------------------------------------
                       Scene - Controls, Lights, Update
----------------------------------------------------------------------*/

//Main Light (day)
import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

let dayLight = new THREE.PointLight(0xccccaa, 500, 100, 1.6)
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

let y = 0;
let z = 0;
//Update canvas regularly
const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
    dayLight.position.y = 40 * Math.cos(y)
    dayLight.position.z = 40 * Math.sin(z)
    y += 3/360
    z += 3/360

}
loop()
