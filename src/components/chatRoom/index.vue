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
            <input type="text" placeholder="暱稱" v-model.lazy="user.name">
            <button :disabled="user.name.length<1" @click="enter">進入</button>
        </div>
        <!-- --------------------------------chat---------------------------------------- -->

        <div v-if="inChat" class="hall">
            <div v-if="chatMode==='hall'">
                <div v-for="(d,idx) in data" :key="idx" class="item">
                    <figure v-if="d.avatar" :style="{backgroundImage:`url(${require('@/assets/images/'+d.avatar+'.png')}`}">
                        <figcaption>{{d.name}}</figcaption>
                    </figure>
                    <div v-if="d.type==='text'">
                        <p>{{d.context}}</p>
                    </div>
                    <p v-if="d.type==='news'&&d.status" class="news">
                        <span>{{d.name}}</span>進入聊天
                    </p>
                </div>
            </div>
            <div class="typeArea">
                <div class="tool">
                    <button></button>
                    <button></button>
                    <button></button>
                </div>
                <input type="text">
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

import { db } from '../../firebase';
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
            chatMode: 'hall'

        };
    },
    components: {
        AvatarList,
        navMenu
    },
    firestore () {
        return {
            data: db.collection('chatRoom').doc('hall').collection('message')
        };
    },
    methods: {
        changeAvatar (i) {
            this.user.avatarId = i;
        },
        enter () {
            this.inChat = true;
        }
    },
    mounted () {
        console.log(db);
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
    margin-top: 30px;
}
.item {
    display: flex;
    margin-bottom: 10px;
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
    .tool {
        width: 100px;
        display: flex;
        align-items: center;
        button {
            width: 20px;
            height: 20px;
            background-color: #524a4a;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            &:first-child {
                background-image: url(../../assets/images/photo.svg);
            }
            &:nth-child(2) {
            }
            &:last-child {
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
        width: calc(100% - 100px);
        background-color: transparent;
        border: none;
        outline: none;
    }
}
</style>
