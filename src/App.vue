<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'App'
};
</script>

<style>
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
}
</style>
