<template>
    <section>

        <div class="bar"></div>
        <main>
            <listInput @addTodo="addTodo" />
            <ul>
                <li v-for="(item,i) in list.slice(1, 3)" :key="i">
                    <button @click="done(i)" class="finish"></button>
                    <p :class="{done:item.done===true}"> {{item.input}}</p><button class="start"></button>
                </li>
                <button v-if="list.length>3">MORE</button>
            </ul>
            <timer class="timer" />
            <nav>
                <div>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                </div>

                <p>POMODORO</p>
            </nav>

        </main>

    </section>
</template>
<script>
import listInput from './listInput.vue';
import timer from './timer.vue';
export default {
    data () {
        return {
            list: []
        };
    },
    components: {
        listInput, timer
    },
    methods: {
        addTodo (val) {
            console.log(val);
            this.list.push(val);
        },
        done (i) {
            console.log(this.list[i]);
            this.list[i].done = !this.list[i].done;
        }
    }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
button {
    outline: none;
    padding: 0;
}
a {
    text-decoration: none;
}
section {
    background-color: #ffedf7;
    width: 100%;
    height: 100vh;
    position: relative;
    font-family: Roboto;
}
main {
    max-width: 1280px;
    max-height: 800px;
    padding: 48px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.bar {
    width: 37%;
    background-color: #003164;
    height: 100%;
    float: right;
}
nav {
    padding: 48px 0;
    position: absolute;
    right: 48px;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 85px;
    height: 100%;
    align-items: center;
}

nav p {
    font-size: 24px;
    font-family: Roboto;
    font-weight: 900;
    writing-mode: vertical-rl;
    color: #fff;
}
nav a {
    display: block;
    width: 36px;
    height: 36px;
    background-position: center;
    background-size: cover;
    margin-bottom: 48px;
}
nav a:first-child {
    background-image: url(../../assets/images/list.svg);
}
nav a:nth-child(2) {
    background-image: url(../../assets/images/stereo.svg);
}
nav a:last-child {
    background-image: url(../../assets/images/music.svg);
}
ul {
    width: 445px;
}
ul li {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #003164;
    font-weight: bold;
    position: relative;
    padding: 10px 0;
    border-bottom: 2px solid #ccc;
}
li button {
    background-color: transparent;
    border: none;
}
.finish {
    width: 19px;
    height: 19px;
    border-radius: 50%;
    border: 2px solid #003164;
    margin-right: 4px;
}
.start {
    position: absolute;
    right: 0;
    width: 24px;
    height: 24px;
    background-image: url(../../assets/images/start.svg);
    background-position: center;
    background-size: cover;
}
p.done {
    text-decoration: line-through;
}
ul a {
    color: #ff4384;
    font-weight: bold;
    margin-top: 9px;
    float: right;
}
.timer {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
}
</style>
