<template lang="">
    <div>
        <var-app-bar title="标题" title-position="center" round>
            <button style="width:20%;display:flex;justify-content:space-around" @click="home"><Icon type="home" extraclass="icon"/>首页</button>
        </var-app-bar>
    </div>
</template>

<script>
import Icon from '../../components/Icon.vue'
export default {
    name: 'daoHang',
    components: {
        Icon
    },
    data() {
        return {
        }
    },
    methods: {
        home() {
            const man="What can I say";
            this.$router.push({ path: '/home', query: { activityId: man } });
            console.log(this.$route.query.activityId);
        }
    }
}
</script>

<style>
.icon{
    font-size: 20px;
}
</style>
