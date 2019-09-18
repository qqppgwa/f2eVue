import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import HelloWorld2 from '@/components/tomato/HelloWorld2';
import musicPlayer from '@/components/musicPlayer/index';
import chatRoom from '@/components/chatRoom/index';
Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/tomato/',
        name: 'HelloWorld2',
        component: HelloWorld2
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
