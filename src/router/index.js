import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import tomato from '@/components/tomato/tomato';
import musicPlayer from '@/components/musicPlayer/index';
import chatRoom from '@/components/chatRoom/index';
Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: home
    },
    {
        path: '/tomato/',
        name: 'tomato',
        component: tomato
    },
    {
        path: '/music',
        name: 'musicPlayer',
        component: musicPlayer
    },
    {
        path: '/chatRoom',
        name: 'chatRoom',
        component: chatRoom
    }
    ]
});
