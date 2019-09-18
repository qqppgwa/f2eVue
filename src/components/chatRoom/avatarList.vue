<template>
    <div>
        <div v-if="type==='dog'">
            <figure>
                <img :src="dogList[selectedD].body" alt="">
            </figure>

            <ul>
                <li v-for="(dog,idx) in dogList" :key="dog.id" @click="change(idx,dog.id)">
                    <img :src="dog.body" alt="">
                </li>
            </ul>
        </div>
        <div v-else>
            <figure>
                <img :src="catList[selectedC].body" alt="">
            </figure>

            <ul>
                <li v-for="(cat,idx) in catList" :key="cat.id" @click="change(idx,cat.id)">
                    <img :src="cat.body" alt="">
                </li>
            </ul>
        </div>
    </div>

</template>
<script>

export default {
    props: ['type'],
    data () {
        return {
            dogList: [
                { id: 'd-1',
                    body: require('@/assets/images/d1.png'),
                    head: require('@/assets/images/d-1.png')
                }, { id: 'd-2',
                    body: require('@/assets/images/d2.png'),
                    head: require('@/assets/images/d-2.png')
                }, { id: 'd-3',
                    body: require('@/assets/images/d3.png'),
                    head: require('@/assets/images/d-3.png')
                }, { id: 'd-4',
                    body: require('@/assets/images/d4.png'),
                    head: require('@/assets/images/d-4.png')
                }

            ],
            catList: [
                { id: 'c-1',
                    body: require('@/assets/images/c1.png'),
                    head: require('@/assets/images/c-1.png')
                }, { id: 'c-2',
                    body: require('@/assets/images/c2.png'),
                    head: require('@/assets/images/c-2.png')
                }, { id: 'c-3',
                    body: require('@/assets/images/c3.png'),
                    head: require('@/assets/images/c-3.png')
                }, { id: 'c-4',
                    body: require('@/assets/images/c4.png'),
                    head: require('@/assets/images/c-4.png')
                }

            ],
            selectedD: '0',
            selectedC: '0'

        };
    },
    watch: {
        type () {

        }
    },
    methods: {
        change (i, type) {
            console.log(i);
            type.indexOf('d') > -1 ? this.selectedD = i : this.selectedC = i;
            this.$emit('changeAvatar', type);
        }
    },
    mounted () {
        console.log(this.type);
    }
};
</script>
<style scoped lang="scss">
section {
    padding-top: 0;
}
figure {
    // text-align: center;
    margin: auto;
    height: 240px;
    width: 140px;
    display: flex;
    align-content: center;
    justify-content: center;
    img {
        width: 100%;
    }
}
ul {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    li {
        display: flex;
        align-items: center;
        margin: 1%;
        border: 1px solid #eee;
        width: 23%;
        max-width: 100px;
    }
    img {
        width: 100%;
    }
}
</style>
