<template>
    <div class="box">
        <main>
            <aside>
                <nav :class="boxType==='doList'?'doList':'ringTone'">
                    <p @click="boxType='doList'">to-do list</p>
                    <p @click="boxType='ring'">ringtones</p>
                </nav>
                <div class="timer">
                    <!-- <div class="colock"> -->

                    <p v-if="mode==='work'">
                        <span v-if="work.min<10">0</span><span id="min">{{work.min}}</span>:<span v-if="work.sec<10">0</span><span id="sec">{{work.sec}}</span>
                    </p>
                    <p v-if="mode==='break'">
                        <span v-if=" rest.min<10">0</span><span id="min">{{rest.min}}</span>:<span v-if=" rest.sec<10">0</span><span id="sec">{{rest.sec}}</span>
                    </p>
                    <p class="nowName" v-if="nowDo">{{nowDo.input}}</p>
                    <button class="play" @click="pause">

                        <svg>
                            <circle class="border"></circle>
                            <circle class="inner"></circle>
                        </svg>
                        <figure></figure>
                        <!-- <img :src="require('@/assets/images/play_arrow.svg')" alt=""> -->
                    </button>
                    <!-- </div> -->
                </div>
            </aside>
            <div v-if="boxType==='ring'" class="ring">
                <ul>
                    <h2>work</h2>
                    <li :class="{checked:i===checkNoWork}" v-for="(ring,i) in ringList" :key="i" @click="checked(1,i)">
                        <span></span>{{ring.name}}
                        <audio class="playerWork">
                            <!-- <source src="horse.ogg" type="audio/ogg"> -->
                            <source :src="ring.src" type="audio/mpeg">
                        </audio>
                    </li>
                </ul>
                <ul>
                    <h2>Break</h2>
                    <li :class="{checked:i===checkNoRest}" v-for="(ring,i) in ringList" :key="i" @click="checked(2,i)">
                        <span></span>{{ring.name}}
                        <audio class="playerRest">
                            <!-- <source src="horse.ogg" type="audio/ogg"> -->
                            <source :src="ring.src" type="audio/mpeg">
                        </audio>
                    </li>
                </ul>
            </div>
            <div v-if="boxType==='doList'" class="do">
                <listInput @addTodo="addToDo" />

                <ul>
                    <h2>to-do</h2>
                    <li v-for="d in doList" :key="d.id" v-show="!d.done">{{d.input}}</li>
                </ul>
                <ul>
                    <h2>done</h2>
                    <li v-for="d in doList" :key="d.id" v-show="d.done">{{d.input}}</li>
                </ul>

            </div>
            <aside>
                <button @click="close"></button>
                <p>POMODORO</p>
            </aside>
        </main>

    </div>
</template>
<script>
import listInput from './listInput.vue';
import { eventBus } from '../../assets/js/eventBus.js';
export default {
    props: ['work', 'rest', 'type', 'nowDo', 'mode', 'list'],
    data () {
        return {
            boxType: this.type,
            ringList: [
                {
                    name: 'Emergency Siren Close Long',
                    src: 'https://www.youtube.com/audiolibrary_download?vid=0c0dd06776c66f79',
                    checked: false
                },
                {
                    name: 'Beeper Emergency Call',
                    src: 'https://www.youtube.com/audiolibrary_download?vid=e0cc6f2ded488719',
                    checked: false
                },
                {
                    name: 'Emergency Radio Alert',
                    src: 'https://www.youtube.com/audiolibrary_download?vid=d40547a1f2b64c35',
                    checked: false
                }

            ],
            checkNoWork: '',
            checkNoRest: '',
            doList: this.list

        };
    },
    watch: {

    },
    components: {
        listInput
    },
    methods: {
        addToDo (val) {
            if (this.doList.length > 0) {
                val.id = this.doList[this.doList.length - 1].id + 1;
            }
            this.doList.push(val);
            // this.$emit('addToDo')
        },
        pause () {
            eventBus.$emit('isPause');
        },
        close () {
            this.$emit('close');
        },
        checked (type, i) {
            const player = type === 1 ? document.getElementsByClassName('playerWork') : document.getElementsByClassName('playerRest');
            if (type === 1) {
                if (this.checkNoWork === i) {
                    this.checkNoWork = '';
                    player[i].pause();
                    player[i].currentTime = 0;
                } else if (this.checkNoWork === '') {
                    player[i].play();
                    this.checkNoWork = i;
                    this.$emit('ring', 'work', this.ringList[i].src);
                } else {
                    player[this.checkNoWork].pause();
                    player[this.checkNoWork].currentTime = 0;
                    player[i].play();
                    this.checkNoWork = i;
                    this.$emit('ring', 'work', this.ringList[i].src);
                }
            } else {
                if (this.checkNoRest === i) {
                    this.checkNoRest = '';
                    player[i].pause();
                    player[i].currentTime = 0;
                } else if (this.checkNoRest === '') {
                    player[i].play();
                    this.checkNoRest = i;
                    this.$emit('ring', 'rest', this.ringList[i].src);
                } else {
                    player[this.checkNoRest].pause();
                    player[this.checkNoRest].currentTime = 0;
                    player[i].play();
                    this.checkNoRest = i;
                    this.$emit('ring', 'rest', this.ringList[i].src);
                }
            }
        }
    }
};
</script>
<style scoped>
.box {
    position: relative;
    z-index: 10;
    color: #fff;
}
h2 {
    background-color: #ffffff33;
    margin-bottom: 20px;
}
audio {
    display: none;
}
nav p {
    color: #fff;
    opacity: 0.5;
    font-size: 22px;
}
nav.ringTone p:last-child,
nav.doList p:first-child {
    opacity: 1;
}

main {
    max-width: 1280px;
    height: 100vh;
    padding: 48px;
    padding-bottom: 0;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
}
.timer {
    width: 350px;
    height: 175px;
    background-color: #ffedf7;
    border-top-left-radius: 175px;
    border-top-right-radius: 175px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 45px;
    padding-top: 50px;
    flex-direction: column;
    color: #ff4384;
}
.nowName {
    font-size: 25px;
}
.play {
    width: 116px;
    height: 116px;
    background-color: #003164;
    border-radius: 58px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: -25%;
}
.play figure {
    background-image: url(../../assets/images/play_arrow.svg);
    position: absolute;
    background-size: cover;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
}
div.do .inputContainer {
    width: 100%;
    margin-bottom: 30px;
}
aside:first-child {
    justify-content: space-between;
}
div.ring,
div.do,
aside:first-child {
    width: 40%;
    /* width: 40%; */
    display: flex;
    flex-direction: column;
    align-items: center;
}
aside:last-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    align-items: flex-end;
}
aside:last-child button {
    width: 36px;
    height: 36px;
    background-image: url(../../assets/images/clear.svg);
    background-position: center;
    background-size: cover;
}
aside:last-child p {
    font-size: 24px;
    font-family: Roboto;
    font-weight: 900;
    writing-mode: vertical-rl;
    color: #fff;
    padding-bottom: 48px;
}
ul {
    width: 100%;
    text-align: center;
    margin-bottom: 50px;
}
ul li {
    display: flex;
    margin-bottom: 10px;
}
ul li span {
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-radius: 10px;
}
li.checked span {
    border: 2px solid #ff4384;
    background-color: #ff4384;
}
svg {
    width: 100%;
    height: 100%;
}
.border {
    cx: 58;
    cy: 58;
    r: 54;
    fill: none;
    stroke: #ff4384;
    stroke-width: 2px;
}
.inner {
    cx: 58;
    cy: 58;
    r: 48;
    fill: #ff4384;
    /* stroke: #f00; */
    /* stroke-width: 2px; */
}
</style>
