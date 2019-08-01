<template>
    <div class="inputContainer">
        <input type="text" placeholder="add a new mission…" v-model="input">
        <button @click="addTodo"></button>
    </div>
</template>
<script>

export default {
    data () {
        return {
            input: ''
            // list: {
            //     input: '',
            //     done: false
            // }

        };
    },
    methods: {
        addTodo () {
            console.log(this.input);
            this.$emit('addTodo', { input: this.input,
                done: false });
            setTimeout(() => {
                this.input = '';
            }, 100);
        }
    }
};
</script>
<style scoped>
.inputContainer {
    width: 445px;
    height: 56px;
    background-color: #fff;
    padding: 16px;
    display: flex;
    font-family: Roboto;
}
input {
    height: 100%;
    background-color: #fff;
    border: none;
    width: 100%;
    outline: none;
    font-family: Roboto;
    font-weight: 900;
}
input[placeholder] {
    color: #ff4384;
}
input::placeholder {
    color: #ff4384;
    font-style: italic;
    font-size: 16px;
    font-weight: 900;
    font-family: Roboto;
}
button {
    background-color: #fff;
    border: none;
    width: 24px;
    height: 24px;
    background-position: center;
    background-size: cover;
    background-image: url(../../assets/images/add.svg);
    outline: none;
}
</style>
