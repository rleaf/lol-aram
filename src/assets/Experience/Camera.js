import * as THREE from 'three'
import Experience from "./Experience";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class Camera {
   constructor() {

      this.experience = new Experience()
      this.sizes = this.experience.sizes
      this.scene = this.experience.scene
      this.canvas = this.experience.canvas

      this.setInstance()
      this.setControls()

   }

   setInstance() {
      this.instance = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 20000)
      // this.instance.position.set(4, 6, 8)
      this.instance.position.set(547, 504, 124)
      this.instance.lookAt(0, 0, 0)
      

      this.scene.add(this.instance)
   }

   setControls() {
      this.controls = new OrbitControls(this.instance, this.canvas)
      this.controls.enableDamping = true
      this.controls.enabled = true
   }

   resize() {
      this.instance.aspect = this.sizes.width / this.sizes.height
      this.instance.updateProjectionMatrix()
   }

   update() {
      this.controls.update()
      // console.log(this.instance.position)
   }
}