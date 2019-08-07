<template>
    <section>
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
                <div></div>
                <div>
                    <div class="timr"></div>
                    <div class="playInfo">
                        <div>
                            <figure :style="{backgroundImage:`url(${nowSong.cover})`}"></figure>
                            <div>
                                <p>{{nowSong.name}}</p>
                                <p>{{nowSong.artist.name}}</p>
                            </div>
                        </div>
                        <div class="tools">
                            <button></button>
                            <button></button>
                            <button></button>
                            <button></button>
                            <button></button>
                        </div>
                        <div class="vol">
                            <div>
                                <button></button>
                                <div class="volBar"></div>
                            </div>
                            <button></button>
                        </div>
                    </div>
                    <audio controls id="player">
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
                    <button @click="next"></button>
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
import songData from '../../assets/js/songData.js';
export default {
    data () {
        return {
            songData: songData,
            nowSong: songData[1],
            canPlay: false

        };
    },
    components: {

    },
    methods: {
        cc () {
            console.log('s');
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
            let min = Math.floor(time / 60);
            let sec = (time % 60).toString();
            if (sec.length < 2) {
                // sec.split.unshift('0');
                sec = '0' + sec;
            }
            document.getElementsByClassName('canPlay')[i].textContent = min + ':' + sec;
            // console.log(i);
            console.log(sec);
            // console.log(document.getElementsByClassName('player')[i]);
        },
        start (i) {
            let d = document.getElementById('player').duration;
            console.log(document.getElementById('player').duration);
            console.log(this.formatDuring(d));
            document.getElementById('player').play();
        },
        next () {
            console.log('123');
            this.songData.src = require('../../assets/audio/Empty_Hearted_Man.mp3');
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
        console.log(document.getElementById('player'));
        // console.log(this.songData);
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
    }
};
</script>
<style scoped>
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
.tools button:nth-child(4) {
    width: 24.61px;
    height: 15px;
    background-image: url(../../assets/images/next.svg);
    margin-right: 40px;
}
.tools button:nth-child(3) {
    width: 54px;
    height: 54px;
    margin: 0 21px;
    background-image: url(../../assets/images/pause2.svg);
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
</style>
