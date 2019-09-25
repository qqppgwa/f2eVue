<template>
    <div class="box">
        <main>
            <aside></aside>
            <div v-if="boxType==='ring'">
                <ul>
                    <h2>work</h2>
                    <li :class="{checked:i===checkNo}" v-for="(ring,i) in ringList" :key="i" @click="checked(i)">
                        <span></span>{{ring.name}}
                        <audio class="player">
                            <!-- <source src="horse.ogg" type="audio/ogg"> -->
                            <source :src="ring.src" type="audio/mpeg">
                        </audio>
                    </li>
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

export default {
    props: ['work', 'rest', 'type'],
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
            checkNo: ''
            // list: {
            //     input: '',
            //     done: false
            // }

        };
    },
    watch: {
        // work (v) {
        //     console.log(v);
        // },
        // rest (v) {
        //     console.log(v);
        // }
    },
    methods: {
        close () {
            this.$emit('close');
        },
        checked (i) {
            const player = document.getElementsByTagName('audio');
            if (this.checkNo === i) {
                this.checkNo = '';
                player[i].pause();
                player[i].currentTime = 0;
            } else if (this.checkNo === '') {
                player[i].play();
                this.checkNo = i;
                this.$emit('ring', 'work', this.ringList[i].src);
            } else {
                player[this.checkNo].pause();
                player[this.checkNo].currentTime = 0;
                player[i].play();
                this.checkNo = i;
                this.$emit('ring', 'work', this.ringList[i].src);
            }
            // this.ringList[i].checked = !this.ringList[i].checked;
            // if (this.checkNo === i) {
            //     console.log(this.ringList[i]);
            //     this.ringList[i].checked = false;
            //     console.log('1');
            // }
            // if (this.ringList[i].checked === true && this.checkNo !== i) {
            //     console.log('2');

            // }
        }
    }
};
</script>
<style scoped>
.box {
    position: relative;
}
audio {
    display: none;
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
}
aside:first-child {
    width: 40%;
}
aside:last-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
}
ul li {
    display: flex;
}
ul li span {
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-radius: 10px;
}
li.checked span {
    border: 2px solid #f00;
    background-color: #f00;
}
</style>
