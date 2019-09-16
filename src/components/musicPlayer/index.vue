<template>
    <section v-if="nowSong">
        <main>
            <div>
                <div class="info">

                </div>
                <div class="playList">
                    <div class="album">
                        <figure :style="{backgroundImage:`url(${nowSong.cover})`}">
                        </figure>
                        <div>
                            <p>{{nowSong.album}}</p>
                            <button @click="start">play</button>
                        </div>
                        <button class="like"></button>
                    </div>
                    <ul>
                        <li v-for="(song,idx) in songData" :key="idx">
                            <audio class="player" @canplay="timeTrans(idx)">
                                <!-- <source src="horse.ogg" type="audio/ogg"> -->
                                <source :src="song.src" type="audio/mpeg">
                            </audio>
                            <div>{{idx+1}}</div>
                            <div>{{song.name}}</div>
                            <div><span class="canPlay">--:--</span></div>
                            <div>{{numberTrans(song.likes)}} <span></span> </div>

                        </li>
                    </ul>

                </div>
            </div>
            <div class="playBar">
                <div id="barCon" @mousedown="dragDown" @mousemove="dragMove" @mouseup="dragUp">
                    <div id="prBar"></div>
                </div>
                <div>
                    <div class="timr">
                        <p>{{nowTime}}</p>
                        <p>{{restTime}}</p>
                    </div>
                    <div class="playInfo">
                        <div>
                            <figure :style="{backgroundImage:`url(${nowSong.cover})`}"></figure>
                            <div>
                                <p>{{nowSong.name}}</p>
                                <p>{{nowSong.artist.name}}</p>
                            </div>
                        </div>
                        <div class="tools">
                            <button :class="{'shu':isShuffle}" @click="shuffle"></button>
                            <button @click="pre"></button>
                            <button @click="start" v-show="!isPlaying"></button>
                            <button @click="pause" v-show="isPlaying===true"></button>
                            <button @click="next"></button>
                            <button></button>
                        </div>
                        <div class="vol">
                            <div>
                                <button></button>
                                <!-- <div class="volBar"></div> -->
                                <input type="range" name="volume" id="volume" min="0" max="1" step="0.01" :value="vol" @change="volChange" @mousemove="volChange">
                            </div>
                            <button></button>
                        </div>
                    </div>
                    <audio controls id="player" @timeupdate="progress" @canplay="time">
                        <!-- <source src="horse.ogg" type="audio/ogg"> -->
                        <source :src="nowSong.src" type="audio/mpeg">
                    </audio>
                </div>
            </div>

        </main>
        <nav>
            <div>
                <figure></figure>
                <div class="top">
                    <button></button>
                    <button></button>
                    <button></button>
                </div>
                <div class="bottom">
                    <button></button>
                    <button></button>
                </div>

            </div>

        </nav>
    </section>
</template>
<script>
import songdata from '../../assets/js/songData.js';
export default {
    data () {
        return {
            songData: songdata,
            nowSong: null,
            no: '0',
            canPlay: false,
            repeat: 'all',
            isShuffle: false,
            isPause: false,
            isPlaying: false,
            vol: 0.5,
            mouseDown: false,
            nowTime: '',
            restTime: ''

        };
    },
    computed: {
        // nowSongTime: function () {
        //     return 'lkij';
        // }
    },
    watch: {
        nowSong: {
            handler (newName, oldName) {
                console.log('obj.a changed');
            },
            deep: true
        },
        nowTime () { }
    },
    methods: {
        time () {
            let now = Math.floor(document.getElementById('player').currentTime);
            let rest = Math.floor(document.getElementById('player').duration) - now;
            // let minR = Math.floor(rest / 60);
            // let secR = (rest % 60).toString();
            // if (secR.length < 2) {
            //     // sec.split.unshift('0');
            //     secR = '0' + secR;
            // }
            this.restTime = this.cal(rest);
            this.nowTime = this.cal(now);
        },
        cal (t) {
            let min = Math.floor(t / 60);
            let sec = (t % 60).toString();
            if (sec.length < 2) {
                // sec.split.unshift('0');
                sec = '0' + sec;
            }
            return min + ' : ' + sec;
        },
        drag (e) {
            let pr = document.getElementById('prBar');
            let barCon = document.getElementById('barCon');
            // let current = document.getElementById('player').currentTime;
            let duration = document.getElementById('player').duration;
            pr.style.width = (e.offsetX / barCon.clientWidth) * 100 + '%';
            let current = (e.offsetX / barCon.clientWidth) * duration;
            document.getElementById('player').currentTime = current;
        },
        dragUp (e) {
            // console.log(this.mouseDown);
            this.drag(e);
            this.mouseDown = false;
        },
        dragMove (e) {
            if (this.mouseDown) {
                this.drag(e);
            }
        },
        dragDown (e) {
            console.log('1');
            // this.prChange();
            this.mouseDown = true;
            console.log(this.mouseDown);
            if (this.mouseDown) {
                this.drag(e);
            }
        },
        prChange (e) {
            console.log(';;');
            let pr = document.getElementById('prBar');
            let barCon = document.getElementById('barCon');
            // let current = document.getElementById('player').currentTime;
            let duration = document.getElementById('player').duration;
            pr.style.width = (e.offsetX / barCon.clientWidth) * 100 + '%';
            let current = (e.offsetX / barCon.clientWidth) * duration;
            document.getElementById('player').currentTime = current;
            // console.log(document.getElementById('barCon').clientWidth);
        },
        progress () {
            // console.log('999');
            this.time();
            let current = document.getElementById('player').currentTime;
            let duration = document.getElementById('player').duration;

            document.getElementById('prBar').style.width = (current / duration) * 100 + '%';
        },
        volChange (e) {
            this.vol = document.getElementById('volume').value;
            // console.log(document.getElementById('volume').value);
            document.getElementById('player').volume = this.vol;
        },
        shuffle () {
            let self = this;
            this.isShuffle = !this.isShuffle;
            if (this.isShuffle === true) {
                let random = [];
                let x;
                let num = 0;

                while (num < this.songData.length) {
                    x = Math.floor(Math.random() * this.songData.length);
                    if (random.indexOf(x) < 0) {
                        random.push(x);
                        num++;
                    }
                }
                // console.log(random);
                let arr = [];

                for (let i = 0; i < random.length; i++) {
                    // console.log(i);
                    arr = arr.concat(this.songData[random[i]]);
                    // console.log(this.songData[random[i]]);
                }
                // console.log(arr);
                this.songData = arr;
            } else {
                this.songData = songdata;
            }
            let b;
            this.songData.filter(function (item, idx) {
                if (item.id === self.nowSong.id) {
                    b = idx;
                    // console.log(idx);
                    return idx;
                } else { }
            });
            // console.log(b);
            this.no = b;
            this.nowSong = this.songData[b];
            console.log(this.nowSong);
        },
        numberTrans (num) {
            var num2 = (num || 0).toString();
            var result = '';
            while (num2.length > 3) {
                result = ',' + num2.slice(-3) + result;
                num2 = num2.slice(0, num2.length - 3);
            }
            if (num2) { result = num2 + result; }
            return result;

            // let str = n.toString();
            // let newArr = [];
            // // console.log(n.toString().length);
            // console.log(str.split('').reverse());
            // for()
        },
        timeTrans (i) {
            let time = Math.floor(document.getElementsByClassName('player')[i].duration);
            // let min = Math.floor(time / 60);
            // let sec = (time % 60).toString();
            // if (sec.length < 2) {
            //     // sec.split.unshift('0');
            //     sec = '0' + sec;
            // }
            document.getElementsByClassName('canPlay')[i].textContent = this.cal(time);
            // console.log(i);
            // console.log(document.getElementsByClassName('player')[i]);
        },
        start (i) {
            document.getElementById('player').volume = this.vol;
            // let d = document.getElementById('player').duration;
            // console.log(document.getElementById('player').duration);
            // console.log(this.formatDuring(d));
            if (!this.isPlaying) {
                document.getElementById('player').play();
                this.isPlaying = true;
                this.isPause = false;
            }
        },
        pause () {
            if (this.isPlaying) {
                document.getElementById('player').pause();
                this.isPlaying = false;
                this.isPause = true;
            }
        },
        next () {
            // document.getElementById('player').pause();

            let length = this.songData.length;
            console.log(length);
            if (this.no === length - 1) {
                this.no = '0';
            } else {
                this.no++;
            }
            this.nowSong = this.songData[this.no];
            document.getElementById('player').load();
            setTimeout(() => {
                document.getElementById('player').play();
            }, 100);
            this.isPlaying = true;
            this.isPause = false;
        },
        pre () {
            let length = this.songData.length;
            console.log(length);
            if (this.no === '0') {
                this.no = length - 1;
            } else {
                this.no--;
            }
            this.nowSong = this.songData[this.no];
            document.getElementById('player').load();
            setTimeout(() => {
                document.getElementById('player').play();
            }, 100);
            this.isPlaying = true;
            this.isPause = false;
        },
        formatDuring (mss) {
            var days = parseInt(mss / (1000 * 60 * 60 * 24));
            var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = (mss % (1000 * 60)) / 1000;
            return days + ' 天 ' + hours + ' 小时 ' + minutes + ' 分钟 ' + seconds + ' 秒 ';
        }
    },
    mounted () {
        // console.log(document.getElementById('player'));
        this.nowSong = this.songData[0];
        console.log(songdata);
        // snd.play();
        // if (snd !== undefined) {
        //     snd.then(_ => {
        //         // 这个时候可以安全的暂停
        //         snd.pause();
        //     })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // }
        // document.getElementById('player').volume = document.getElementById('volume').value;
    }
};
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
* {
    outline: 1px solid red;
}

section {
    width: 100vw;
    height: 100vh;
    display: flex;
    font-family: Poppins;
    color: #fff;
}

audio {
    display: none;
}

nav {
    width: 80px;
    height: 100vh;
    background-color: #4b3434;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
nav figure {
    width: 56px;
    height: 56px;
    margin: auto;
    margin-bottom: 65px;

    border: 1px solid #707070;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    background-image: url('http://img.qdaily.com/article/article_show/20170512132333rZ4obOjlG9p3X5t8.jpg?imageMogr2/auto-orient/thumbnail/!755x450r/gravity/Center/crop/755x450/ignore-error/1');
}
nav > div {
    height: 95%;
    text-align: center;
    position: relative;
}
nav > div div {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.top button {
    margin-bottom: 65px;
    display: flex;
    background-position: center;
    background-size: cover;
}
.top button:first-child {
    background-image: url(../../assets/images/home.svg);
}
.top button:nth-child(2) {
    background-image: url(../../assets/images/music.svg);
}
.top button:last-child {
    background-image: url(../../assets/images/archive.svg);
}
.bottom {
    position: absolute;
    bottom: 0;
    margin: auto;
    right: 0;
    left: 0;
}
.bottom button {
    display: flex;
    margin-top: 28px;
    background-position: center;
    background-size: cover;
}
.bottom button:first-child {
    background-image: url(../../assets/images/zoom.svg);
}
.bottom button:last-child {
    background-image: url(../../assets/images/settings.svg);
}
nav button {
    width: 36px;
    height: 36px;
}
main {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #1a1a1a;
}
main > div:first-child {
    height: calc(100% - 98px);
    display: flex;
}
.playBar {
    position: absolute;
    bottom: 0;
    width: 100%;
}
#prBar {
    height: 100%;
    width: 0%;
    background-color: #1a1a1a;
}
/* .playBar div {
    width: 100%;
} */
.playBar > div:first-child {
    height: 13px;
    background-color: #fff;
    border: 1px solid #fff;
}
.playBar > div:last-child {
    height: 85px;
    background: linear-gradient(#772020, #361024);
}
.playInfo {
    display: flex;
    justify-content: center;
    height: calc(100% - 17px);
}
.playInfo > div {
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.playInfo figure {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    background-position: center;
    background-size: cover;
}
.playInfo p:first-child {
    font-size: 20px;
    font-weight: bold;
}
.playInfo p:last-child {
    font-size: 12px;
}
.tools button {
    background-position: center;
    background-size: cover;
}
.tools button:first-child {
    width: 16px;
    height: 16px;
    background-image: url(../../assets/images/shuffle.svg);
    margin-right: 40px;
}
.tools button:last-child {
    width: 18px;
    height: 20px;
    background-image: url(../../assets/images/repeat.svg);
}
.tools button:nth-child(2) {
    width: 24.61px;
    height: 15px;
    background-image: url(../../assets/images/pre.svg);
}
.tools button:nth-child(5) {
    width: 24.61px;
    height: 15px;
    background-image: url(../../assets/images/next.svg);
    margin-right: 40px;
}
.tools button:nth-child(3),
.tools button:nth-child(4) {
    width: 54px;
    height: 54px;
    margin: 0 21px;
    background-image: url(../../assets/images/play2.svg);
}
.tools button:nth-child(4) {
    background-image: url(../../assets/images/pause2.svg);
}
.tools button.shu {
    width: 20px;
    height: 20px;
    background-image: url(../../assets/images/arrow_forward.svg);
}
.vol div button {
    width: 25px;
    height: 25px;
    background-image: url(../../assets/images/volume_up.svg);
}
.vol div {
    display: flex;
    align-items: center;
}
.vol > button {
    width: 24px;
    height: 22px;
    background-image: url(../../assets/images/heart.svg);
    margin-left: 54px;
}
.vol .volBar {
    width: 100px;
    height: 9px;
    border-radius: 3px;
    background-color: #fff;
    margin-left: 10px;
}
.timr {
    height: 17px;
    display: flex;
    justify-content: space-between;
}
.info {
    height: 100%;
    width: 33.333%;
    background-position: center;
    background-size: cover;
    background-image: url('https://pbs.twimg.com/media/C9WYeYMVwAAD46H.jpg');
}
.playList {
    width: 66.666%;
    padding: 0 45px;
}
.album {
    display: flex;
    height: 90px;
    margin: auto;
    margin-top: 60px;
    position: relative;
}
.album figure {
    width: 90px;
    height: 90px;
    background-position: center;
    background-size: cover;
    border: 1px solid #707070;
    /* border-radius: 50%; */
    margin-right: 53px;
    padding-right: 24px;
}
.album p {
    font-size: 32px;
    font-weight: bold;
}
.album div button {
    font-family: Poppins;
    color: #fff;
    font-weight: bold;
    width: 128px;
    height: 30px;
    background-color: #964a4d;
    border-radius: 15px;
}
.album .like {
    width: 24px;
    height: 24px;
    background-position: center;
    background-size: cover;
    background-image: url(../../assets/images/heart.svg);
    position: absolute;
    right: 0;
    bottom: 0;
}
li {
    display: flex;
    height: 56px;
    align-items: center;
    border-bottom: 1px solid #707070;
}
li audio {
    display: none;
}
li div:nth-child(2) {
    width: 10%;
}
li div:nth-child(3) {
    width: 55%;
}
li div:nth-child(4) {
    font-size: 14px;
    width: 15%;
}
li div:last-child {
    font-size: 14px;
    width: 20%;
    display: flex;
    justify-content: flex-end;
}
li div:last-child span {
    display: block;
    margin-left: 14px;
    width: 15px;
    height: 14px;
    background-image: url(../../assets/images/heart.svg);
    background-position: center;
    background-size: cover;
}

// volume css
input[type='range'] {
    -webkit-appearance: none;
    overflow: hidden;
    outline: none;
    background: none;
    width: 100px;
    height: 9px;
    border-radius: 3px;
    background-color: #fff;
    margin-left: 10px;
}
input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    position: relative;
    width: 10px;
    height: 10px;
    background: #f22;
    border-radius: 50%;
}
</style>
