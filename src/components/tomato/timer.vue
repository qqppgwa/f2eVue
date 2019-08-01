<template>
    <div class="timer">
        <div class="time">
            <p>
                <span v-if="minW<10">0</span><span id="min">{{minW}}</span>:<span v-if="secW<10">0</span><span id="sec">{{secW}}</span>
            </p>
        </div>
        <div :class="{pause:isStartW===false}">
            <svg>
                <circle class="border" />
                <circle class="inner" />
                <!-- <button></button> -->
            </svg>
            <button class="play" @click="isStartW=!isStartW,startCal()"></button>
            <button class="break"></button>
        </div>

        <!-- <div> -->

        <!-- </div> -->
    </div>
</template>
<script>

export default {
    data () {
        return {
            // input: ''
            w: '',
            secW: 10,
            minW: 25,
            isStartW: null,
            break: false

        };
    },
    methods: {
        startCal () {
            let self = this;
            // self.pauseW = false;
            // self.pauseW = !!self.pauseW;
            // this.pauseW = !this.pauseW;
            console.log(self.pauseW);
            if (self.isStartW === true) {
                self.w = setTimeout(() => {
                    if (self.secW === 0 && self.minW !== 0) {
                        console.log('1');
                        // console.log(self.secW);
                        self.secW = '59';
                        self.minW--;
                        self.startCal();
                    } else if (self.secW !== 0) {
                        self.secW--;
                        self.startCal();
                    }
                }, 1000);
            } else {
                console.log('222');
                clearTimeout(self.w);
            }
        }
        //         loopCal(){
        // setInterval
        //         }
        // addTodo () {
        //     console.log(this.input);
        //     this.$emit('addTodo', { input: this.input,
        //         done: false });
        //     setTimeout(() => {
        //         this.input = '';
        //     }, 100);
        // }
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
.border {
    cx: 270;
    cy: 270;
    r: 268;
    fill: none;
    stroke: #ff4384;
    stroke-width: 4px;
}

.inner {
    cx: 270;
    cy: 270;
    r: 258;
    fill: #ff4384;
    /* stroke: #ff4384;
    stroke-width: 4px; */
}
.pause .inner {
    fill: #fff;
    stroke: #ff4384;
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
.break {
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
.pause .break {
    background-color: #ff4384;
}
</style>
