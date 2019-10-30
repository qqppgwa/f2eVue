<template>
    <div>
        <figure>
            <button v-for="emo in emos" :key="emo" @click="addEmo">{{emo}}</button>
        </figure>
    </div>

</template>
<script>

export default {
    props: ['user'],
    data () {
        return {
            emoStr: '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤥 🤫 🤭 🧐 🤓 😈 👿 🤡 👹 👺'

        };
    },
    computed: {
        emos () {
            return this.emoStr.split(' ');
        }

    },
    methods: {
        addEmo (e) {
            // console.log(e.target.textContent);
            this.$emit('addEmo', e.target.textContent);
        }

    }

};
</script>
<style scoped lang="scss">
figure {
    max-height: 300px;
    overflow-y: scroll;
    background-color: #eee;
    button {
        margin: 3px;
    }
}
</style>
