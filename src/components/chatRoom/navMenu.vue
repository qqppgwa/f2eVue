<template>
    <nav>
        p
    </nav>

</template>
<script>

export default {
    props: ['user'],
    data () {
        return {

        };
    },
    watch: {

    },
    methods: {

    },
    mounted () {
        console.log(this.user);
    }
};
</script>
<style scoped lang="scss">
// nav {
//     width: 100vw;
//     height: calc(100vh - 45px);
//     background-color: #eee;
//     position: fixed;
//     left: 300%;
// }
</style>
