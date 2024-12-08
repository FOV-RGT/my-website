<template>
    <div class="main">
        <span>
            <button @click="makeCount('-')">-</button>
            <span class="jishu">{{ count }}</span>
            <button @click="makeCount('+')">+</button>
        </span>
    </div>
</template>

<script>

export default {
    data(){
        return{
            count: 0
        }
    },
    methods:{
        makeCount(type){
            if(type == '+'){
                this.count++
            }else{
                this.count--
            }
            this.$emit('count',this.count);
        }
    }
}
</script>

<style scoped>
.jishu{
    font-size: 30px;
    font-weight: 900;
}
</style>
