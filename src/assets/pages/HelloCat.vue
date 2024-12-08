<template>
    <img class="cat" src="https://jsd.onmicrosoft.cn/gh/FOV-RGT/recources@main/img/96831600_p18-done.png" title="这是白子，她很可爱">
    <div class="box">
        <h2 id="haogan">白子对你还不怎么熟</h2>
        <h2>当前好感值{{ likeNumber }}</h2>
        <count @count="num = $event"/>
        <button @click="reduce">抚摸她</button>
        <button @click="touWei">投喂</button>
        <button @click="guangjie">逛街</button>
        <button @click="doi">大do特do！</button>
        <button @click="showInfo">点我查看猫猫信息</button>
        <span>{{ num*2 }}</span>
    </div>
    <daoHang />
</template>

<script>
import daoHang from './router.vue';
import count from "../../components/count.vue"
    export default {
    name:'HelloCat',
    components: {
        daoHang,
        count
    },
    data() {
        return {
        likeNumber: 0,
        name: "砂狼白子",
        num: 0,
        };
    },
    methods: {
        reduce() {
        this.likeNumber += 3;
        document.querySelector('.cat').src = 'https://jsd.onmicrosoft.cn/gh/FOV-RGT/recources@main/img/96831600_p18-done.png';
        this.check();
        },
        touWei() {
            this.likeNumber++;
            document.querySelector('.cat').src = 'https://jsd.onmicrosoft.cn/gh/FOV-RGT/recources@main/img/96831600_p19-done.png';
            this.check();
        },
        showInfo() {
            alert(`${this.name}当前对你的好感值为：${this.likeNumber}`);
        },
        guangjie() {
            this.likeNumber += 5;
            this.check();
        },
        check() {
            if (this.likeNumber >= 20) {
                document.getElementById('haogan').textContent = '白子开始对你感到亲近';
            }
        },
        doi() {
            if (this.likeNumber < 100) {
                alert(`${this.name}梆梆给了你两拳`);
                this.likeNumber = 0;
            } else {
                alert(`还没等你开口，${this.name}就将你五花大绑，带去夏莱地下室大do特do`);
                this.likeNumber += 100;
            }
        }
    }
};
</script>

<style>
.box {
    border: 1px solid #000;
    padding: 10px;
    border-radius: 5px;
}

.cat {
    width: 150px;
    height: 150px;
}
</style>
