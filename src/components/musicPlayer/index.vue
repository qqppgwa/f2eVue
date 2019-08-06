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
                            <button @click="a">play</button>
                        </div>
                        <button class="like"></button>
                    </div>

                </div>
            </div>
            <div class="playBar">
                <div></div>
                <div>
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
            nowSong: songData[1]
            // songData: [{
            //     name: '1st',
            //     length: '',
            //     likes: 123,
            //     src: require('../../assets/audio/In_The_Shadows.mp3'),
            //     artist: {
            //         name: 'aabb1',
            //         photo: 'https://cdn2.ettoday.net/images/2371/d2371886.jpg',
            //         followist: '100',
            //         isFol: false
            //     }

            // }, { name: '2st',
            //     length: '',
            //     likes: 123,
            //     src: require('../../assets/audio/In_The_Shadows.mp3'),
            //     artist: {
            //         name: 'aabb1',
            //         photo: 'https://cdn2.ettoday.net/images/2371/d2371886.jpg',
            //         followist: '100',
            //         isFol: false
            //     }
            // }, { name: '3st',
            //     length: '',
            //     likes: 123,
            //     src: require('../../assets/audio/In_The_Shadows.mp3'),
            //     artist: {
            //         name: 'aabb1',
            //         photo: 'https://cdn2.ettoday.net/images/2371/d2371886.jpg',
            //         followist: '100',
            //         isFol: false
            //     } }]

        };
    },
    components: {

    },
    methods: {
        a () {
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
        console.log(this.songData);
        var snd = new Audio('./../assets/audio/In_The_Shadows.mp3');
        snd.preload = true;
        snd.autoplay = false;
        snd.muted = true;
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
    /* display: none; */
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
.playBar div {
    width: 100%;
}
.playBar div:first-child {
    height: 13px;
    background-color: #fff;
    border: 1px solid #fff;
}
.playBar div:last-child {
    height: 85px;
    background: linear-gradient(#772020, #361024);
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
    border-radius: 50%;
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
</style>
