<template>
    <section>

        <ul>
            <h1>vue project</h1>
            <li>
                <router-link to="/tomato">Pomodoro timer</router-link>
                <a class="wiki" href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="blank">wiki</a>
            </li>
            <li>
                <router-link to="/music">Music player</router-link>
            </li>
            <li>
                <router-link to="/chatRoom"> Chat room</router-link>
            </li>

        </ul>
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
    color: #c1b1a5;
    font-size: 22px;
    text-decoration: none;
    transition: 0.3s;
    &:hover {
        color: #524a4a;
        transition: 0.3s;
    }

    &.wiki {
        display: inline;
        font-size: 15px;
        color: #ccc;
        &:hover {
            color: #524a4a;
            transition: 0.3s;
        }
    }
}
li {
    @include flex-form;
    padding: 20px;
}
li:nth-child(2) a {
    display: inline;
    margin-right: 30px;
}
</style>
