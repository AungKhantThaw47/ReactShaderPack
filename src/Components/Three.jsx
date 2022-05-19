import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  TorusKnotGeometry,
  SphereGeometry,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createSculpture, createSculptureWithGeometry } from "shader-park-core";
import { spCode } from "./spCode.js";
import { useEffect, useRef } from "react";
import Css from "./Three.module.css";

export default function Three() {
  let hold = useRef();
  let obj;
  let scene = new Scene();
  let params = { time: 0 };

  let camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 4;

  let renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.setClearColor(new Color(1, 1, 1), 1);
  //   document.body.appendChild(renderer.domElement);

  obj = renderer.domElement;
  console.log(obj);

  let geometry = new TorusKnotGeometry(1, 0.3, 100, 9.6);
  geometry.computeBoundingSphere();
  geometry.center();

  // Shader Park Setup
  let mesh = createSculpture(spCode, () => ({
    time: params.time,
  }));
  scene.add(mesh);

  // *** Uncomment to try using a custom geometry. Make sure to comment out likes 26-29 ***.

  // let mesh = createSculptureWithGeometry(geometry, spCode, () => ( {
  //   time: params.time,
  // } ));
  // scene.add(mesh);

  let controls = new OrbitControls(camera, renderer.domElement, {
    enableDamping: true,
    dampingFactor: 0.25,
    zoomSpeed: 0.5,
    rotateSpeed: 0.5,
  });

  let render = () => {
    requestAnimationFrame(render);
    params.time += 0.01;
    controls.update();
    renderer.render(scene, camera);
  };

  render();
  useEffect(() => {
    //   console.log(Css.main);
    console.log("width", hold.current.offsetWidth);
    console.log("width", hold.current.offsetHeight);
    camera.aspect = hold.current.offsetWidth / hold.current.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(hold.current.offsetWidth, hold.current.offsetHeight);
    console.log(window.innerWidth + " : " + window.innerHeight);
    console.log(window.devicePixelRatio);
    hold.current.appendChild(obj);
  }, []);
  return <div className={Css.main} ref={hold}></div>;
}
