<template>
    <div class="timer">

        <div class="time">
            <p class="nowName" v-if="nowDo">{{nowDo.input}}</p>
            <p v-if="!isBreak">
                <span v-if="work.min<10">0</span><span id="min">{{work.min}}</span>:<span v-if="work.sec<10">0</span><span id="sec">{{work.sec}}</span>
            </p>
            <p v-if="isBreak">
                <span v-if=" rest.min<10">0</span><span id="min">{{rest.min}}</span>:<span v-if=" rest.sec<10">0</span><span id="sec">{{rest.sec}}</span>
            </p>
        </div>

        <div :class="[{pause:isStartW===false}, classS]">
            <svg v-if="!isBreak">
                <circle class="border" />
                <circle class="progress" :style="{strokeDasharray: work.circle }" />
                <circle class="inner" />
                <!-- <button></button> -->
            </svg>
            <svg v-if="isBreak">
                <circle class="border" />
                <circle class="progress" :style="{strokeDasharray: rest.circle }" />
                <circle class="inner" />
                <!-- <button></button> -->
            </svg>
            <button class="play" @click="isStartW=nowDo?!isStartW:null,startCal()"></button>
            <button class="breakBtn" @click="isBreak=!isBreak,modeChange(),startCal()"></button>
        </div>

        <!-- <div> -->

        <!-- </div> -->
    </div>
</template>
<script>
import { eventBus } from '../../assets/js/eventBus.js';
export default {
    props: ['nowDo'],
    data () {
        return {
            work: {
                sec: 0,
                min: 0,
                circle: 1646,
                timer: ''
            },
            rest: {
                sec: 0,
                min: 0,
                circle: 1646,
                timer: ''
            },
            // input: ''
            w: '',
            isStartW: null,
            isBreak: false

        };
    },
    computed: {
        classS () {
            return this.isBreak ? 'break' : 'working';
        }
    },
    watch: {
        circle () { },
        nowDo: {
            handler (i) {
                this.rest.sec = 0;
                this.rest.min = 5;
                this.work.sec = 0;
                this.work.min = 25;
                if (i === null) {
                    this.rest.sec = 0;
                    this.rest.min = 0;
                    this.work.sec = 0;
                    this.work.min = 0;
                }
            },
            deep: true
        },
        work: {
            handler (t) {
                this.$emit('timer', 'work', t);
            },
            deep: true
        },
        rest: {
            handler (t) {
                this.$emit('timer', 'rest', t);
            },
            deep: true
        }
    },
    methods: {
        modeChange () {
            this.$emit('mode', this.isBreak ? 'rest' : 'work');
        },
        startCal () {
            let self = this;

            if (self.isStartW === true && self.nowDo) {
                if (self.isBreak) {
                    clearTimeout(self.work.timer);
                    self.rest.timer = setTimeout(() => {
                        if (self.rest.sec === 0 && self.rest.min !== 0) {
                            self.rest.sec = '59';
                            self.rest.min--;

                            self.rest.circle = self.rest.circle + self.rest.circle / (5 * 60);
                            self.startCal();
                        } else if (self.rest.sec !== 0) {
                            self.rest.sec--;
                            self.rest.circle = self.rest.circle + self.rest.circle / (5 * 60);
                            self.startCal();
                        } else {
                            self.isStartW = false;
                        }
                    }, 1000);
                } else {
                    clearTimeout(self.rest.timer);
                    self.work.timer = setTimeout(() => {
                        if (self.work.sec === 0 && self.work.min !== 0) {
                            self.work.sec = '59';
                            self.work.min--;
                            self.work.circle = self.work.circle + self.work.circle / (25 * 60);
                            self.startCal();
                        } else if (self.work.sec !== 0) {
                            self.work.sec--;
                            self.work.circle = self.work.circle + self.work.circle / (25 * 60);
                            self.startCal();
                        } else {
                            self.isStartW = null;
                        }
                    }, 1000);
                }
            } else {
                clearTimeout(self.work.timer);
            }
        }

    },
    mounted () {
        eventBus.$on('isPause', () => {
            this.isStartW = !this.isStartW;
            this.startCal();
        });
    },
    destroyed () {
        eventBus.$off('isPause');
    }
};
</script>
<style scoped>
.timer {
    display: flex;
    height: 540px;
    font-family: Roboto;
    font-weight: 900;
}
svg {
    width: 540px;
    height: 540px;
    float: right;
}
.time {
    width: 454px;
    margin-right: 26px;
}
.time .nowName {
    font-size: 25px;
    position: absolute;
    top: 150px;
    padding-left: 20px;
    color: #003164;
}
.working .border {
    stroke: #ff4384;
}
.break .border {
    stroke: #00a7ff;
}
.border {
    cx: 270;
    cy: 270;
    r: 268;
    fill: none;
    stroke-width: 4px;
}
.working .progress {
    stroke: #ff4384;
}
.break .progress {
    stroke: #00a7ff;
}
.progress {
    cx: -270;
    cy: 270;
    r: 262;
    fill: none;

    stroke-width: 8px;

    stroke-dashoffset: 1646; /*1646圓周長 */
    transform: rotate(-90deg);
}
.working .inner {
    fill: #ff4384;
}
.break .inner {
    fill: #00a7ff;
}
.inner {
    cx: 270;
    cy: 270;
    r: 258;
    /* fill: #ff4384; */
    /* stroke: #ff4384;
    stroke-width: 4px; */
}
.working .pause .inner {
    stroke: #ff4384;
}
.break .pause .inner {
    stroke: #00a7ff;
}
.pause .inner {
    fill: #fff;
    /* stroke: #ff4384; */
    stroke-width: 4px;
}
button {
    background-position: center;
    background-size: cover;
    border: none;
    background-color: transparent;
    padding: 0;
    outline: none;
    /* position: absolute; */
}
/* div:last-child {
    position: absolute;
} */

.play {
    position: absolute;
    width: 96px;
    height: 96px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    background-image: url(../../assets/images/play.svg);
}
.pause .play {
    background-image: url(../../assets/images/pause.svg);
}
.time {
    font-size: 176px;
    color: #ff4384;
    display: flex;
    align-items: center;
}
.time + div {
    position: relative;
}
.breakBtn {
    width: 18px;
    height: 18px;
    background-color: #fff;
    top: 53px;
    bottom: 0;
    right: 0;
    left: 112px;
    margin: auto;
    position: absolute;
}
.pause .breakBtn {
    background-color: #ff4384;
}
</style>
