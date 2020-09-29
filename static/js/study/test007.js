// test007

//画面サイズ
var canvasWidth  = 600;
var canvasHeight = 600;

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
  camera.position.z = 39;
  camera.position.y = 15;
  camera.position.x = 9;
  camera.rotation.x -= 0.4;

renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#test007Canvas")});
renderer.setPixelRatio(window.devicePixelRatio);

//3Dモデル用value
var geometry, material, plane, time;

//一回だけ呼んで初期化するよー
init();
//毎回呼んでアニメーションするよー
animate();

//初期化用仕掛けちゃん（ファンクションとかメソッドとか）
function init(){

	// 画像を読み込む
	loader = new THREE.TextureLoader();
	texture = loader.load('../static/img/texture/hari02.png');
	// マテリアルにテクスチャーを設定
	material = new THREE.MeshStandardMaterial({
	  map: texture,
	  transparent: true
	});

	var poslist = []
	for(var i = 0;  i < 10;  i++){
		for(var j = 0;  j < 10;  j++){
			poslist.push(new THREE.Vector3(i*2,0.0,j*2))
		}
	}
	console.log(poslist)

	for(var a = 0;  a < poslist.length;  a++){
		//var material = new THREE.MeshNormalMaterial();
		//material = new THREE.MeshPhongMaterial({color: 0x88FFFF});
		mesh = new THREE.Mesh(this.kokeModel(poslist[a]), material);
		mesh.material.side = THREE.DoubleSide;
		scene.add(mesh);
	
		// ワイヤーフレームのメッシュ作成
		var wire = new THREE.MeshBasicMaterial({color: 0x69821b, wireframe: true});
		wireMesh = new THREE.Mesh(this.kokeModel(poslist[a]), wire);
		scene.add(wireMesh);
	}
	

	// 地面を作成
	// ground = new THREE.GridHelper(300, 10, 0xffffff, 0xffffff);
	// //plane.position.y = -1;
	// scene.add(ground);

	// new THREE.DirectionalLight(色)
	light = new THREE.DirectionalLight(0xffffff);
	light.intensity = 0.5; 
	light2 = new THREE.DirectionalLight(0xffffff);
	light2.intensity = 0.5; 
	// ライトの位置を変更
	light.position.set(1, 1, 1);
	light2.position.set(-1, -1, 1);
	//ambientLight = new THREE.AmbientLight(0xffffff);
	// シーンに追加
	scene.add(light);
	scene.add(light2);
	//scene.add(ambientLight);
	
}

function kokeModel(baseLocation){
	// ジオメトリ生成
	var kokegeo = new THREE.Geometry();
	// 頂点
	//base
	kokegeo.vertices.push(new THREE.Vector3(1+baseLocation.x, 0+baseLocation.y, 0+baseLocation.z));
	kokegeo.vertices.push(new THREE.Vector3(-1+baseLocation.x, 0+baseLocation.y, 0+baseLocation.z));
	//mid
	kokegeo.vertices.push(new THREE.Vector3(1+baseLocation.x, 2+baseLocation.y, 0+baseLocation.z));
	kokegeo.vertices.push(new THREE.Vector3(-1+baseLocation.x, 2+baseLocation.y, 0+baseLocation.z));
	//top
	kokegeo.vertices.push(new THREE.Vector3(1+baseLocation.x, 4+baseLocation.y, 0+baseLocation.z));
	kokegeo.vertices.push(new THREE.Vector3(-1+baseLocation.x, 4+baseLocation.y, 0+baseLocation.z));
 
	// 面
	kokegeo.faces.push(new THREE.Face3( 0, 2, 1));
	kokegeo.faces.push(new THREE.Face3( 3, 1, 2));
	kokegeo.faces.push(new THREE.Face3( 2, 4, 3));
	kokegeo.faces.push(new THREE.Face3( 5, 3, 4));
 
	// 法線ベクトルの自動計算
	kokegeo.computeFaceNormals();
	kokegeo.computeVertexNormals();
 
	kokegeo.faceVertexUvs[0].push([
		new THREE.Vector2(1.0, 0.0),
		new THREE.Vector2(1.0, 0.5),
		new THREE.Vector2(0.0, 0.0)
	]);

	kokegeo.faceVertexUvs[0].push([
		new THREE.Vector2(0.0, 0.5),
		new THREE.Vector2(0.0, 0.0),
		new THREE.Vector2(1.0, 0.5)
	]);

	kokegeo.faceVertexUvs[0].push([
		new THREE.Vector2(1.0, 0.5),
		new THREE.Vector2(1.0, 1.0),
		new THREE.Vector2(0.0, 0.5)
	]);

	kokegeo.faceVertexUvs[0].push([
		new THREE.Vector2(0.0, 1.0),
		new THREE.Vector2(0.0, 0.5),
		new THREE.Vector2(1.0, 1.0)
	]);

	return kokegeo;
}

//マテリアル用アニメーション用仕掛けちゃん
function animate(){
	window.requestAnimationFrame(animate);
	render();
}

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

//レンダリング用仕掛けちゃん
function render(){

	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	//mesh.rotation.y += 0.003;
	//mesh.rotation.y += 0.01;
	//wireMesh.rotation.y += 0.003;
	//wireMesh.rotation.y += 0.01;

	//plane.rotation.x += 0.01;

	renderer.render(scene, camera);
}
