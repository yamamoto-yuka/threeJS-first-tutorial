// 変更があるものはletで
let scene, camera, renderer, cube;


// 初期化関数
let init = () =>{
// scene = like a stage
// camera 
// renderer 

// scene
scene = new THREE.Scene();

// camera
// PerspectiveCamera(fov, aspect, newr, far)
 camera = new THREE.PerspectiveCamera(75, 
  window.innerWidth/window.innerHeight, 0.1, 1000);


// renderer
// 3Dオブジェクトをwebブラウザで表現するための関数
 renderer = new THREE.WebGLRenderer({antialias: true});

// レンダラーを使って、ウィンドウサイズに合わせる。
renderer.setSize(window.innerWidth, window.innerHeight);

// どこに出力するか。
// ボディの要素に子要素追加している。このボディ要素に、さっき作ったレンダラーの要素を入れて、HTMLとして読み込めるようにする。
// 読み込めるようにすることによって、3DオブジェクトをHTML上で表現することができる。
document.body.appendChild(renderer.domElement);

// Create a box
// 立方体を作るにはメッシュという表示オブジェクトを使用して作成する
// メッシュを作るためには、ジオメトリとマテリアルの2種類を用意する必要がある
//ジオメトリ　頂点情報や面情報を持っている。
// 今回は、箱上の形状を生成する、BoxGeometryを使用する
const geometry = new THREE.BoxGeometry(2,2,2);
// マテリアルは、色や質感の情報を持っている。
// const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
const texture = new THREE.TextureLoader().load("./cube.jpg");
const material = new THREE.MeshBasicMaterial({map: texture});
// 作成したジオメトリとマテリアルを使って、メッシュを作成する。
cube = new THREE.Mesh(geometry, material);
// 作成したメッシュをシーンに追加する。
scene.add(cube);
camera.position.z = 5;
}




// アニメーション制御
// JSでアニメーションさせるには、時間経過で関数を呼び続ける必要がある。
// そのためには、requestAnimationFrame()というグローバルメソッドを使用する。これは引数として渡された関数を、まいフレーム実行する。
// ボックスをどのように表現するかを設定
let animate = () => {
  // 何度も何度もアニメートの関数を読んで3Dを描画する
  requestAnimationFrame(animate);

  // Boxがx軸を起点に0.01ずつ回転している。
  // frame単位で0.01プラスされていく
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
// 何を描画するか?、　画面更新のための命令を書く。
// 描画する処理をかく。
// Three.jsでは自動的に画面が最新に切り替わらないので、明示的に画面が更新されるように命令を描く必要がある。
  renderer.render(scene, camera);
}

// ウィンドウ変更時にサイズを維持する処理
let onWindowResize = () => {
  // この関数を実行すると、アスペクト比をもう一度計算して
 camera.aspect = window.innerWidth / window.innerHeight;
  // その計算をアップデートして
 camera.updateProjectionMatrix();
//  もう一度、そのサイズをセットしてくれる。
 renderer.setSize(window.innerWidth, window.innerHeight);
}

// サイズを変えた時にこの関数を呼びたい
window.addEventListener('resize', onWindowResize);

init();
animate();