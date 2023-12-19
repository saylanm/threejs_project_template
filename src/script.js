import * as THREE from 'three';
import init from './init';
import './style.css';

const { sizes, camera, scene, canvas, controls, renderer } = init();

camera.position.z = 3;

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({
  color: 'green',
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const container = document.querySelector('.container');
container.appendChild(canvas);

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

function changeColor(color) {
  mesh.material.color.set(color);
  renderer.render(scene, camera);
}

const colorButton = document.getElementById('color-button');
colorButton.addEventListener('click', () => {
  const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
  changeColor(randomColor);
});

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
