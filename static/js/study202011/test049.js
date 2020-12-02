// test049

//画面サイズ
var canvasWidth  = 600;
var canvasHeight = 600;
const canvas = document.querySelector("#test049Canvas")

//3Dの設定用value
var renderer, scene, camera;

scene = new THREE.Scene();

// パースペクティブ
// new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
camera = new THREE.PerspectiveCamera(
	45,
	canvasWidth / canvasHeight,
	1,
	10000
  );
  camera.position.set(0, 0, +1000);
  camera.position.z = 19*1.5;
  camera.position.y = 15*0.5;
  camera.position.x = 0;

// 4-2. camera controls
//var controls = new THREE.OrbitControls(camera, canvas);
//controls.enableDamping = true;

renderer = new THREE.WebGLRenderer({canvas});
renderer.setPixelRatio(window.devicePixelRatio);

//3Dモデル用value
//var kokegeo, material, material2, plane, time;

//一回だけ呼んで初期化するよー
//init();
//毎回呼んでアニメーションするよー
//animate();

//初期化用仕掛けちゃん（ファンクションとかメソッドとか）

// put the camera on a pole (parent it to an object)
// so we can spin the pole to move the camera around the scene
const cameraPole = new THREE.Object3D();
cameraPole.position.z = 19*1.5;
cameraPole.position.y = 1*0.5;
cameraPole.position.x = 0;
scene.add(cameraPole);
cameraPole.add(camera);

{
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  camera.add(light);
}

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

function rand(min, max) {
	if (max === undefined) {
		max = min;
		min = 0;
	}
	return min + (max - min) * Math.random();
}

function randomColor() {
  return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
}

const numObjects = 100;
for (let i = 0; i < numObjects; ++i) {
	const material = new THREE.MeshPhongMaterial({
		color: randomColor(),
	});

	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	cube.position.set(rand(-20, 20), rand(-20, 20), rand(-20, 20));
	cube.rotation.set(rand(Math.PI), rand(Math.PI), 0);
	cube.scale.set(rand(3, 6), rand(3, 6), rand(3, 6));
}

// GridHelperを作成
//GridHelper = new THREE.GridHelper(25, 10, 0xffffff, 0xffffff);
//plane.position.y = -1;
//scene.add(GridHelper);



//マテリアル用アニメーション用仕掛けちゃん
// function animate(){
// 	window.requestAnimationFrame(animate);
// 	render();
// }

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
		renderer.setSize(width, height, false);
    }
    return needResize;
}
class PickHelper {
	constructor() {
		this.raycaster = new THREE.Raycaster();
		this.pickedObject = null;
		this.pickedObjectSavedColor = 0;
	}
	pick(normalizedPosition, scene, camera, time) {
		// restore the color if there is a picked object
		if (this.pickedObject) {
			this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
			this.pickedObject = undefined;
		}

		// cast a ray through the frustum
		this.raycaster.setFromCamera(normalizedPosition, camera);
		// get the list of objects the ray intersected
		const intersectedObjects = this.raycaster.intersectObjects(scene.children);
		if (intersectedObjects.length) {
			// pick the first object. It's the closest one
			this.pickedObject = intersectedObjects[0].object;
			// save its color
			this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
			// set its emissive color to flashing red/yellow
			this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
		}
	}
}

const pickPosition = {x: 0, y: 0};
const pickHelper = new PickHelper();
clearPickPosition();

//レンダリング用仕掛けちゃん
function render(time){
	time *= 0.001;  // convert to seconds;

	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	// required if controls.enableDamping or controls.autoRotate are set to true
	//controls.update();

	//cameraPole.rotation.y = time * .1;

    pickHelper.pick(pickPosition, scene, camera, time);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

function getCanvasRelativePosition(event) {
	const rect = canvas.getBoundingClientRect();
	return {
		x: (event.clientX - rect.left) * canvas.width  / rect.width,
		y: (event.clientY - rect.top ) * canvas.height / rect.height,
	};
}

function setPickPosition(event) {
	const pos = getCanvasRelativePosition(event);
	pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
	pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
}

function clearPickPosition() {
	// unlike the mouse which always has a position
	// if the user stops touching the screen we want
	// to stop picking. For now we just pick a value
	// unlikely to pick something
	pickPosition.x = -100000;
	pickPosition.y = -100000;
}
window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);

window.addEventListener('touchstart', (event) => {
	// prevent the window from scrolling
	event.preventDefault();
	setPickPosition(event.touches[0]);
}, {passive: false});

window.addEventListener('touchmove', (event) => {
	setPickPosition(event.touches[0]);
});

window.addEventListener('touchend', clearPickPosition);

