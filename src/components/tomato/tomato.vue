<template>
    <section>

        <div class="bar"></div>
        <main>
            <listInput @addTodo="addTodo" />
            <ul>
                <li v-for="(item,i) in list.slice(0, 3)" :key="i">
                    <button @click="done(i)" class="finish"></button>
                    <p :class="{done:item.done===true}"> {{item.input}}</p>
                    <button class="start" @click="toDo(i)"></button>
                </li>
                <button v-if="list.length >3">MORE</button>
            </ul>
            <timer class="timer" :nowDo="nowDo" @timer="timer" />
            <nav>
                <div>
                    <button></button>
                    <!-- <button></button> -->
                    <button @click="showBox('ring')"></button>
                </div>
                <p>POMODORO</p>
            </nav>

        </main>
        <transition name="slide-fade">
            <listBox class="listBox" v-if="box" :work="work" :rest="rest" :type="type" @close="box=false,type=''" @ring="ring" />
        </transition>

    </section>
</template>
<script>
import listInput from './listInput.vue';
import timer from './timer.vue';
import listBox from './listBox';
export default {
    data () {
        return {
            list: [],
            nowDo: null,
            box: false,
            type: '',
            work: {
                sec: 0,
                min: 0,
                circle: 1646,
                timer: '',
                ring: ''
            },
            rest: {
                sec: 0,
                min: 0,
                circle: 1646,
                timer: ''
            }
        };
    },
    watch: {
        nowDo () {
        },
        work () { },
        rest () { }
    },
    components: {
        listInput,
        timer,
        listBox
    },
    methods: {
        ring (type, r) {
            this[type].ring = r;
            console.log(this[type]);
        },
        showBox (type) {
            this.box = true;
            this.type = type;
        },
        timer (type, value) {
            if (type === 1) {
                this.work = value;
            } else {
                this.rest = value;
            }
        },
        addTodo (val) {
            console.log(val);
            let a = val;
            if (this.list.length > 0) {
                console.log(a.id);

                a.id = this.list[this.list.length - 1].id + 1;
            }
            this.list.push(val);
        },
        toDo (i) {
            this.nowDo = this.list[i];
            this.list[i].done = false;
        },
        done (i) {
            console.log(this.list[i]);
            this.list[i].done = !this.list[i].done;
            if (this.nowDo && this.list[i].id === this.nowDo.id) {
                this.nowDo = null;
            }
        }
    }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
.listBox {
    position: fixed;
    /* top: 0; */
    width: 100%;
    height: 100vh;
    background-color: #003164;
}
.slide-fade-enter-active {
    transition: 0.3s;
}
.slide-fade-leave-active {
    transition: 0.8s;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    /* transform: translateX(10px); */
    opacity: 0;
}
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
nav button {
    display: block;
    width: 36px;
    height: 36px;
    background-position: center;
    background-size: cover;
    margin-bottom: 48px;
}
nav button:first-child {
    background-image: url(../../assets/images/list.svg);
}
/* nav button:nth-child(2) {
    background-image: url(../../assets/images/stereo.svg);
} */
nav button:last-child {
    background-image: url(../../assets/images/music.svg);
}
ul {
    width: 445px;
    z-index: 10;
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
