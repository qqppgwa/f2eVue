<template>
    <section>

        <div>
            <h1>vue project</h1>
            <router-link to="/tomato">tomato</router-link>
            <router-link to="/music">music player</router-link>
            <router-link to="/chatRoom"> chat room</router-link>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
    width: 100vw;
    height: 100vh;
    position: relative;
    @include flex-form;
    justify-content: center;
    background-image: url(../assets/logo.png);
    background-repeat: no-repeat;
    background-position: 100% 100%;
}
h1 {
    padding: 20px;
    color: #2b221d;
}
a {
    @include flex-form;
    padding: 20px;
    color: #c1b1a5;
    font-size: 22px;
    text-decoration: none;
    transition: 0.3s;
    &:hover {
        color: #524a4a;
        transition: 0.3s;
    }
}
</style>
