<template>
    <nav>
        <div>
            <figure v-if="user">
                <!-- <figcaption>{{d.name}}</figcaption> -->
                <img :src="require('@/assets/images/'+user.avatarId+'.png')" alt="">
            </figure>
            <p>Nickname : {{user.name}}</p>
        </div>

    </nav>

</template>
<script>

export default {
    props: ['user'],
    data () {
        return {

        };
    }
};
</script>
<style scoped lang="scss">
figure {
    @include flex-form;
    margin: auto;
    width: 136px;
    height: 136px;
    border: 2px solid #fcaa72;
    border-radius: 50%;
    align-items: center;
    overflow: hidden;
    background-color: #fff;
    img {
        width: 100%;
    }
}
div {
    margin-top: 20vh;
}
p {
    text-align: center;
    margin-top: 30px;
}
</style>
