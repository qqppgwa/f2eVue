<template>
    <section>
        <header>

            <div v-if="inChat" @click="showMenu=!showMenu">@@</div>
        </header>
        <navMenu v-if="user.name" :class="{slideIn:showMenu}" :user="user" />
        <div v-if="!inChat||!user">
            <div class="avatarSelect">
                <p>WELCOME</p>
                <h1>cR</h1>
            </div>
            <div class="tab">
                <button @click="user.avatartype='dog'">dog</button>
                <button @click="user.avatartype='cat'">cat</button>
            </div>
            <AvatarList :type="user.avatartype" @changeAvatar="changeAvatar" />
            <input type="text" placeholder="暱稱" v-model.trim="user.name">
            <button :disabled="user.name.length<1" @click="enter">進入</button>
        </div>
        <!-- --------------------------------chat---------------------------------------- -->

        <div v-if="inChat" class="hall">
            <div v-if="chatMode==='hall'">
                <div v-for="(d,idx) in data" :key="idx" class="item" :class="{me:d.name===user.name&&d.type!=='news'}">
                    <figure v-if="d.avatar" :style="{backgroundImage:`url(${require('@/assets/images/'+d.avatar+'.png')}`}">
                        <figcaption>{{d.name}}</figcaption>
                    </figure>
                    <div v-if="d.type==='text'">
                        <p>{{d.context}}</p>
                    </div>
                    <div v-if="d.type==='file'" class="file">
                        <p>name:{{d.fileName}} </p>
                        <p>type:{{d.fileType}}</p>
                        <p>size:{{d.size}}</p>
                        <p><a download :href="d.url">click to open</a></p>

                    </div>
                    <div v-if="d.type==='image'">
                        <img :src="d.url" :alt="d.fileName">
                    </div>
                    <p v-if="d.type==='news'&&d.status" class="news">
                        <span>{{d.name}}</span>進入聊天
                    </p>
                    <p>{{dateFormat(d.timeStamp)}}</p>
                    <!-- <p>{{d.timeStamp.getHours()}}</p> -->
                </div>
            </div>
            <div class="typeArea">
                <div class="tool">
                    <button @change="uploadFile">
                        <input type="file" id="image" accept="image/*">
                    </button>
                    <button @change="uploadFile">
                        <input type="file" id="file">

                    </button>
                    <button @click="showEmo=!showEmo"></button>
                </div>
                <emoji v-if="showEmo" class="emo" @addEmo="addEmo" />
                <input type="text" v-model.trim="chatTxt" id="inputArea" @keydown.enter="sendMsg">
                <!-- <div aria-label="textInput" id="inputArea" v-text="chatTxt" contenteditable @blur="typing" v-html="chatTxt"></div> -->
                <button @click="sendMsg"></button>
                <!-- <div contenteditable @keydown.enter="sendMsg">{{chatTxt.trim()}}</div><button @click="sendMsg"></button> -->
            </div>

        </div>
    </section>
    <!-- {{data}}
        <div v-for="(d,idx) in data" :key="idx">
            <div v-if="d.type==='text'">{{d.context}}</div>
            <div v-if="d.type==='news'">{{d.context}}</div>
        </div> -->

</template>
<script>

import { db, storage } from '../../firebase';
import AvatarList from './avatarList';
import navMenu from './navMenu';
import emoji from './emoji';
export default {
    data () {
        return {
            data: [],
            inChat: false,
            showMenu: false,
            user: {
                avatartype: 'dog',
                avatarId: 'd-1',
                name: ''
            },
            chatMode: 'hall',
            chatTxt: '',
            showEmo: false

        };
    },
    watch: {
        data () {
            // console.log('kk');
            if (this.inChat) {
                // window.scrollTo(0, 99999);
                setTimeout(function () {
                    console.log('m');
                    window.scrollTo(0, 99999);
                }, 200);
            }
        }
    },
    components: {
        AvatarList,
        navMenu,
        emoji
    },
    firestore () {
        return {
            data: db.collection('chatRoom').doc('hall').collection('message').orderBy('timeStamp')
        };
    },
    methods: {
        dateFormat (t) {
            let now = new Date();
            let past = new Date(t); console.log(past);
            let daySec = 1000 * 60 * 60 * 24;// 天
            let week = daySec * 7;
            let year = past.getFullYear();
            let mon = past.getMonth();
            let day = function () {
                let d = past.getDay();
                switch (d) {
                case 0:
                    return 'Sun.';
                case 1:
                    return 'Mon.';
                case 2:
                    return 'Tue.';
                case 3:
                    return 'Wed.';
                case 4:
                    return 'Thu.';
                case 5:
                    return 'Fri.';
                case 6:
                    return 'Sat.';
                }
            };
            let date = past.getDate();
            let time = past.getHours() + ':' + past.getMinutes();
            let gap = now.getTime() - past.getTime();
            if (now.getFullYear() !== year) {
                console.log(now.getFullYear());
                console.log(year);
                return time + '  ' + year + '/' + mon + '/' + date;
            } else if (gap > week) {
                console.log('2');
                return time + ' ' + mon + '/' + date;
            } else if (gap > daySec || date !== now.getDate()) {
                console.log('3');
                return time + '  ' + day();
            } else if (gap < daySec) {
                console.log('4');
                return time;
            } else {
                return '..';
            }

            // if () {
            //     return date.getHours() + ':' + date.getMinutes();
            // }elseif
        },
        typing (e) {
            console.log(e.target.innerHTML);
            // document.getElementById('inputArea').addEventListener('blur', () => {
            this.chatTxt = e.target.innerHTML;
            // });
        },
        addEmo (emo) {
            let type = document.getElementById('inputArea');
            // type.selectionStart();
            // console.log(type.selectionStart);
            let arrTxt = this.chatTxt.split('');

            arrTxt.splice(type.selectionStart, 0, emo);
            console.log(arrTxt);
            this.chatTxt = arrTxt.join('');
            // // window.addEventListener('focus', () => {
            // type.focus();
            // let sel = window.getSelection();
            // if (sel.getRangeAt && sel.rangeCount) {
            //     let range = sel.getRangeAt(0);
            //     // let el = document.createElement('span');
            //     // el.textContent = emo;
            //     var frag = document.createDocumentFragment();
            //     // let node = el.firstChild;
            //     frag.appendChild(emo);
            //     // while ((node = el.firstChild)) {
            //     //   let  lastNode = frag.appendChild(node);
            //     // }
            //     // var firstNode = frag.firstChild;
            //     range.insertNode(frag);
            // }
            // // });
            // this.chatTxt = type.innerHTML;
            // // console.log(window.getSelection());
            // // let v = window.getSelection().getRangeAt(0).deleteContents();
            // // console.log(v);
            // // let f = html;
        },
        uploadFile (e) {
            console.log(e);
            console.log(e.target);
            // let downloadURL;
            let file = e.target.files[0];
            let type = (file.type.split('/'))[0] === 'image' ? 'image' : 'file';
            // let size = file.size + ' kb';
            let store = storage.ref(type).child(file.name).put(file);
            store.then(snap => {
                snap.ref.getDownloadURL().then(url => {
                    // downloadURL = url;
                    db.collection('chatRoom').doc('hall').collection('message').add({
                        name: this.user.name,
                        type: type,
                        url: url,
                        fileName: file.name,
                        size: file.size + ' kb',
                        // fileType: (file.name.split('.'))[1],
                        // context: this.chatTxt,
                        avatar: this.user.avatarId,
                        timeStamp: Date.parse(new Date().toUTCString())
                    }).then(() => {
                        // this.chatTxt = '';
                    });
                });
                // console.log(b);
                // return fileRef.getDownloadURL();
            });
            console.log(file);
        },
        sendMsg () {
            // console.log(this.chatTxt);
            // time;
            console.log(this.chatTxt.split(''));
            if (this.chatTxt.length > 0) {
                let time = {
                    name: this.user.name,
                    type: 'text',
                    context: this.chatTxt,
                    avatar: this.user.avatarId,
                    timeStamp: Date.parse(new Date().toUTCString())
                };
                db.collection('chatRoom').doc('hall').collection('message').add(time).then(() => {
                    this.chatTxt = '';
                    console.log(time);
                });
            }

            // window.scrollTo(0, 99999);
        },
        changeAvatar (i) {
            this.user.avatarId = i;
        },
        enter () {
            this.inChat = true;
            let f = new Date();

            console.log(f.getHours());
            // this.$firestoreRefs;
            // console.log(this.$firestoreRefs);
            //  this.$firestoreRefs.chatRoom.hall.message.add({
            db.collection('chatRoom').doc('hall').collection('message').add({
                name: this.user.name,
                type: 'news',
                status: true,
                timeStamp: Date.parse(new Date().toUTCString())
            }).then(() => {
                // console.log('ko');
                // setTimeout(() => {
                window.scrollTo(0, 99999);
                // }, 500);
            });
        }
    },
    mounted () {
        let a = Date.parse('27 Sep 2019 06:39:34 GMT');
        let b = new Date(a).getHours();
        console.log(b + ':' + new Date(a).getMinutes());
        // console.log(new Date().getTime());// slow
    }

    // created () { }
};
</script>
<style scoped lang="scss">
.emo {
    position: absolute;
    bottom: 50px;
    // display: none;
}
* {
    font-family: '微軟正黑體';
}
a {
    text-decoration: none;
    color: inherit;
}
section {
    background-color: #766c6c;
    width: 100%;
    min-height: 100vh;
    position: relative;
    padding-top: 45px;
}
header {
    width: 100%;
    height: 45px;
    background-color: #524a4a;
    position: fixed;
    top: 0;
}
nav {
    width: 100vw;
    height: calc(100vh - 45px);
    background-color: #eee;
    position: fixed;
    right: 300%;
    transition: 0.3s;
    &.slideIn {
        right: 0;
        transition: 0.3s;
        z-index: 1;
    }
}
.avatarSelect {
    background-color: #524a4a;
    width: 95%;
    border-radius: 21px;
    margin: auto;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p,
    h1 {
        text-align: center;
        color: #fff;
    }
}
.tab {
    text-align: center;
}
.hall {
    margin-top: 10px;
    padding-bottom: 50px;
}
.item {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    &.me {
        flex-direction: row-reverse;
        div {
            flex-direction: row-reverse;
        }
    }
    figure {
        width: 100px;
        height: 100px;
        background-position: center 0px;
        background-size: 80px;
        background-repeat: no-repeat;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
    .news {
        font-size: 11px;
    }
    div:not(.file) {
        // width: calc(100vw - 120px);
        font-size: 15px;
        word-break: break-word;
        display: flex;

        align-items: center;

        p {
            background-color: #524a4a;
            padding: 10px 20px;
            border-radius: 10px;
        }
        img {
            width: 100%;
            max-height: 30vh;
        }
    }
    .file {
        background-color: #524a4a;
        padding: 10px;
        font-size: 15px;
        border-radius: 10px;
        p:last-child {
            text-align: center;
            font-size: 12px;
            padding-top: 10px;
        }
    }

    & > p:last-child {
        font-size: 10px;
        padding-top: 25px;
        padding-left: 10px;
    }
    .news {
        margin: auto;
        font-size: 12px;
        & + p {
            padding: 0;
            margin-right: 10px;
        }
    }
}
.typeArea {
    background-color: #968686;
    height: 45px;
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    padding-right: 5px;

    .tool {
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        button {
            width: 20px;
            height: 20px;

            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            outline: none;
            input {
                width: 100%;
                height: 100%;
                opacity: 0;
            }
            &:first-child {
                background-image: url(../../assets/images/photo.svg);
            }
            &:nth-child(2) {
                background-image: url(../../assets/images/file.svg);
            }
            &:last-child {
                background-image: url(../../assets/images/smile.svg);
            }
        }

        &:after {
            content: '';
            display: block;
            width: 2px;
            height: 80%;
            background-color: #c4b1b1;
        }
    }
    #inputArea {
        width: calc(100% - 128px);
        height: 80%;
        background-color: transparent;
        border: none;
        outline: none;
        & + button {
            width: 28px;
            height: 28px;
            background-image: url(../../assets/images/send.png);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
}
</style>
