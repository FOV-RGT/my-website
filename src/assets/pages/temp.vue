<template>
    <div>
        <canvas ref="canvas" style="position:absolute;width: 100vw; height: 100vh;left: 0;top: 0;"></canvas>
    </div>
</template>

<script>
import * as THREE from "three";
import { toRaw } from "vue";

export default {
    name: "Plot3D",
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null,
        };
    },
    mounted() {
        this.initScene();
    },
    methods: {
        initScene() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(
                75,
                this.$refs.canvas.clientWidth / this.$refs.canvas.clientHeight,
                0.1,
                1000
            );
            this.camera.position.z = 5;
            this.renderer = new THREE.WebGLRenderer({ canvas: this.$refs.canvas });
            this.renderer.setSize(
                this.$refs.canvas.clientWidth,
                this.$refs.canvas.clientHeight
            );
            this.initGLSL();
        },
        initGLSL() {
            // 顶点着色器代码 (Vertex Shader)
            // 顶点着色器主要用于将顶点的坐标从局部空间转换到屏幕空间。
            const vertexShader = `
        precision highp float; // 指定浮点数的精度，确保计算的精确度
        uniform float uRange; // 声明一个传入的浮点数 uniform，用于控制范围
        uniform float uStep;  // 声明一个传入的浮点数 uniform，用于控制步长
        varying vec3 vPosition; // 声明一个 varying 变量，用于在顶点着色器和片段着色器之间传递数据
        void main() {
            // 将输入的顶点坐标解构为 x, y 分量
            float x = position.x;
            float y = position.y;
            // 使用正弦和余弦计算 z 坐标，生成基于 x 和 y 的波浪效果
            float z = sin(x) * cos(y);
            // 将计算后的坐标存储到 vPosition 中，供片段着色器使用
            vPosition = vec3(x, y, z);
            // 使用内置的投影矩阵和模型视图矩阵，将坐标变换到屏幕空间
            gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
        }
    `;
            // 片段着色器代码 (Fragment Shader)
            // 片段着色器用于决定每个像素的最终颜色。
            const fragmentShader = `
        precision highp float; // 指定浮点数的精度
        varying vec3 vPosition; // 接收从顶点着色器传递来的坐标数据
        void main() {
            // 将 z 坐标的值归一化到 [0, 1] 范围内，生成灰度颜色
            float color = (vPosition.z + 1.0) / 2.0;
            // 输出最终颜色，颜色值为灰度 (color, color, color)，透明度为 1.0
            gl_FragColor = vec4(color, color, color, 1.0);
        }
    `;
            // 创建平面几何体 (PlaneGeometry)
            // 平面几何体生成一个二维网格，用于承载顶点着色器的计算。
            const geometry = new THREE.PlaneGeometry(10, 10, 200, 200);
            // 参数说明：
            // - 第一个参数：宽度（10）
            // - 第二个参数：高度（10）
            // - 第三个参数：宽度分段数（200）
            // - 第四个参数：高度分段数（200）
            // 创建自定义着色器材质 (ShaderMaterial)
            const material = new THREE.ShaderMaterial({
                vertexShader, // 绑定顶点着色器代码
                fragmentShader, // 绑定片段着色器代码
                uniforms: {
                    // 定义传入着色器的 uniform 变量，控制范围和步长
                    uRange: { value: 10.0 },
                    uStep: { value: 0.1 },
                },
                wireframe: true, // 启用线框模式，方便观察顶点和网格结构
            });
            // 创建网格对象 (Mesh)
            // 网格对象由几何体和材质构成，作为一个可渲染的 3D 对象。
            const mesh = new THREE.Mesh(geometry, material);
            // 将网格对象添加到场景中
            this.scene.add(mesh);
            // 开始动画循环（假设 this.animate 是动画循环函数）
            this.animate();
        }
        ,
        animate() {
            requestAnimationFrame(this.animate);
            this.renderer.render(toRaw(this.scene), toRaw(this.camera));
        },
    },
};
</script>

<style>
canvas {
    display: fixed;
    width: 100vw;
    height: 100vh;
}
</style>
