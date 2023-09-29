import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let camera, scene, renderer;

// scene
scene = new THREE.Scene();

// camera
camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;

// renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

// geometry
const radius = 5;
const geometry = new THREE.SphereGeometry(radius, 64, 64);
const material = new THREE.MeshStandardMaterial({
  wireframe: true,
  color: 0xffff00,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// lights
const pointLight = new THREE.PointLight(0xffffff, 100, 100, 1.7);
pointLight.position.set(0, 10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// This function will run on every screen refresh (i.e. 60Hz screens means 60 refreshes a second)
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  sphere.rotation.x += 0.0025;
  sphere.rotation.y += 0.0025;

  renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
