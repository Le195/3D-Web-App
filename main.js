// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// 添加光源
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// 加载 X3D 模型
const loader = new X3DLoader();
loader.load('oo.x3d', function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1); // 根据需要调整缩放
    model.position.set(0, 0, 0); // 根据需要调整位置
    model.rotation.set(0, Math.PI / 2, 0); // 根据需要调整旋转
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});


// 添加鼠标控制交互
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;

// 渲染场景
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // 更新控制器
    renderer.render(scene, camera);
}
animate();

document.getElementById("toggleWireframe").addEventListener("click", function () {
    const shapeElements = document.querySelectorAll("Shape");
    shapeElements.forEach((shape) => {
      const appearance = shape.querySelector("Appearance");
      if (!appearance.querySelector("FillProperties")) {
        const fillProperties = document.createElement("FillProperties");
        appearance.appendChild(fillProperties);
      }
      const fillProperties = appearance.querySelector("FillProperties");
      const filled = fillProperties.getAttribute("filled") !== "false";
      fillProperties.setAttribute("filled", filled ? "false" : "true");
      fillProperties.setAttribute("hatched", filled ? "true" : "false");
    });
  });
  