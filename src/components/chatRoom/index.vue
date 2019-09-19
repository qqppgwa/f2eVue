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
                <div v-for="(d,idx) in data" :key="idx" class="item" :class="{me:d.name===user.name}">
                    <figure v-if="d.avatar" :style="{backgroundImage:`url(${require('@/assets/images/'+d.avatar+'.png')}`}">
                        <figcaption>{{d.name}}</figcaption>
                    </figure>
                    <div v-if="d.type==='text'">
                        <p>{{d.context}}</p>
                    </div>
                    <div v-if="d.type==='file'">
                        name:{{d.fileName}} <br>
                        type:{{d.fileType}} <br>
                        size:{{d.size}} <br>
                        <a download target="_blank" :href="d.url">open</a>
                    </div>
                    <p v-if="d.type==='news'&&d.status" class="news">
                        <span>{{d.name}}</span>進入聊天
                    </p>
                </div>
            </div>
            <div class="typeArea">
                <div class="tool">
                    <button></button>
                    <button @change="uploadFile">
                        <input type="file" id="file">

                    </button>
                    <button></button>
                </div>
                <input type="text" v-model.trim="chatTxt" @keydown.enter="sendMsg"><button @click="sendMsg"></button>
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

// var db = fire.database().ref('/hall/');
// var db = new Fire('https://froggychat-ce2ec.firebaseio.com');
// const itemsRef = new Firebase('https://geocld-vuefire-demo.firebaseio.com/');
// const db = fire.firestore();
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
            chatTxt: ''

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
        navMenu
    },
    firestore () {
        return {
            data: db.collection('chatRoom').doc('hall').collection('message').orderBy('timeStamp')
        };
    },
    methods: {
        uploadFile (e) {
            console.log(e);
            console.log(e.target.files);
            // let downloadURL;
            let file = e.target.files[0];
            // let name =(file.name.split('.'))[0];
            // let size=file.size+' kb'
            let store = storage.ref('file').child(file.name).put(file);
            store.then(snap => {
                snap.ref.getDownloadURL().then(url => {
                    console.log(url);
                    // downloadURL = url;
                    db.collection('chatRoom').doc('hall').collection('message').add({
                        name: this.user.name,
                        type: 'file',
                        url: url,
                        fileName: (file.name.split('.'))[0],
                        size: file.size + ' kb',
                        fileType: (file.name.split('.'))[1],
                        // context: this.chatTxt,
                        avatar: this.user.avatarId,
                        timeStamp: new Date()
                    }).then(() => {
                        // this.chatTxt = '';
                    });
                });
                // console.log(b);
                // return fileRef.getDownloadURL();
            });
            console.log(store);
        },
        sendMsg () {
            // console.log(this.chatTxt);
            if (this.chatTxt.length > 0) {
                db.collection('chatRoom').doc('hall').collection('message').add({
                    name: this.user.name,
                    type: 'text',
                    context: this.chatTxt,
                    avatar: this.user.avatarId,
                    timeStamp: new Date()
                }).then(() => {
                    this.chatTxt = '';
                });
            }
            // window.scrollTo(0, 99999);
        },
        changeAvatar (i) {
            this.user.avatarId = i;
        },
        enter () {
            this.inChat = true;

            // this.$firestoreRefs;
            // console.log(this.$firestoreRefs);
            //  this.$firestoreRefs.chatRoom.hall.message.add({
            db.collection('chatRoom').doc('hall').collection('message').add({
                name: this.user.name,
                type: 'news',
                status: true,
                timeStamp: new Date()
            }).then(() => {
                // console.log('ko');
                // setTimeout(() => {
                window.scrollTo(0, 99999);
                // }, 500);
            });
        }
    },
    mounted () {
        setTimeout(() => {
            console.log(storage);
        }, 500);

        // let teamRef = fire.collection('chatRoom').doc('hall').collection('message');
        // teamRef.onSnapshot((snapshot) => {
        //     console.log(snapshot);
        //     if (snapshot.docs[0].exists) {
        //         let docData = snapshot.docs[0].data();
        //         console.log(docData);
        //     }
        // });
        // teamRef.onSnapshot(s => {
        //     console.log(s);
        // });
        // console.log(teamRef);
        // teamRef.get().then((doc) => {
        // console.log(doc.data);
        // if (doc.exists) {
        //     let docData = doc.data();
        //     console.log(docData);
        // }
        // });
        // console.log(fire);
        // let Ref = Firebase.firebase_.firestore.collection('chatroom').doc('hall').collection('message').orderBy('timeStamp');
    }

    // created () { }
};
</script>
<style scoped lang="scss">
* {
    font-family: '微軟正黑體';
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
    div {
        width: calc(100vw - 120px);
        font-size: 13px;
        word-break: break-word;
        display: flex;
        align-items: center;

        p {
            background-color: #524a4a;
            padding: 20px;
        }
    }
    .news {
        margin: auto;
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
            &:first-child {
                background-image: url(../../assets/images/photo.svg);
            }
            &:nth-child(2) {
                background-image: url(../../assets/images/file.svg);
                input {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
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
    input {
        width: calc(100% - 128px);
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
