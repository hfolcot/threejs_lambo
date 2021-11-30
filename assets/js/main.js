'use strict'

// Initial Setup //
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 2) / window.innerHeight, 0.1, 100);
camera.position.set(2, 2, 5);
const renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.setSize(window.innerWidth / 2, window.innerHeight);
document.body.querySelector('.left').insertAdjacentElement('afterbegin', renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 1000;


// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 25);
scene.add(ambientLight);

const light1 = new THREE.PointLight(0xffffff, 5, 100);
light1.position.set(0, 0, 6);
scene.add(light1);
const light2 = new THREE.PointLight(0xffffff, 5, 100);
light2.position.set(20, 0, 6);
scene.add(light2);
const light3 = new THREE.PointLight(0xffffff, 5, 100);
light3.position.set(0, 10, 6);
scene.add(light3);
// const helper = new THREE.PointLightHelper( light1, 5 );
// scene.add( helper );

// Manager
const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

manager.onLoad = function () {
    document.querySelector('.loader').remove();
    console.log('Loading complete!');
};


manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

manager.onError = function (url) {
    console.log('There was an error loading ' + url);
};

//Loaders //
const gltfLoader = new THREE.GLTFLoader(manager );

// Objects //

// Sphere
const sphereGeometry = new THREE.SphereGeometry(10, 20, 20);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xddff32 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, -5, -50);
//scene.add(sphere);


// Car
let car;
gltfLoader.load('assets/models/cars/centenario/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.rotation.set(0, 1.5, 0);
    //gltf.scene.scale.set(3, 3, 3);
    car = gltf.scene.children[0];
    tick();
})

//Event Listeners
window.addEventListener('resize', () => {

    // Update camera
    camera.aspect = (window.innerWidth/2) / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize((window.innerWidth/2), window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('mousedown', function () {
    document.querySelector('canvas').style.cursor = 'grabbed';
})


// Animation Loop
const tick = function () {
    renderer.render(scene, camera);
    car.rotation.z -= 0.005;
    controls.update();
    requestAnimationFrame(tick);
}
