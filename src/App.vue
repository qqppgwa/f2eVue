<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <transition name="fade">
            <router-view />
        </transition>

    </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            transitionName: ''
        };
    },
    watch: {
        '$router': function () {
            console.log(this.$router);
        }
    }
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    margin: 0;
}
button {
    border: none;
    background-color: transparent;
    cursor: pointer;
}
ul,
li {
    list-style: none;
}

.fade-enter-active {
    transition: 0.3s;
}
.fade-leave-active {
    transition: 0.8s;
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    /* transform: translateX(10px); */
    opacity: 0;
}
</style>
