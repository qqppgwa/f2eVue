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

    },
    mounted () {
        // console.log(this.emos);
    }
    //     function pasteHtmlAtCaret(html, selectPastedContent) {
    //     var sel, range;
    //     if (window.getSelection) {
    //         // IE9 and non-IE
    //         sel = window.getSelection();
    //          if (sel.getRangeAt && sel.rangeCount) {
    //            range = sel.getRangeAt(0);
    //             //range.deleteContents();

    //             // Range.createContextualFragment() would be useful here but is
    //             // only relatively recently standardized and is not supported in
    //             // some browsers (IE9, for one)
    //             var el = document.createElement("div");
    //             el.innerHTML = html;
    //             var frag = document.createDocumentFragment(), node, lastNode;
    //             while ( (node = el.firstChild) ) {
    //                 lastNode = frag.appendChild(node);
    //             }
    //             var firstNode = frag.firstChild;
    //             range.insertNode(frag);

    //             // Preserve the selection
    //            /* if (lastNode) {
    //                 range = range.cloneRange();
    //                 range.setStartAfter(lastNode);
    //                 if (selectPastedContent) {
    //                     range.setStartBefore(firstNode);
    //                 } else {
    //                     range.collapse(true);
    //                 }
    //                 sel.removeAllRanges();
    //                 sel.addRange(range);
    //             } */
    //         }
    //     } else if ( (sel = document.selection) && sel.type != "Control") {
    //         // IE < 9
    //         /* var originalRange = sel.createRange();
    //         originalRange.collapse(true);
    //         sel.createRange().pasteHTML(html);
    //         if (selectPastedContent) {
    //             range = sel.createRange();
    //             range.setEndPoint("StartToStart", originalRange);
    //             range.select();
    //         } */
    //     }
    // }

    // document.getElementById("paste").onclick = function() {
    //     document.getElementById('test').focus();
    //     var selectPastedContent = document.getElementById('selectPasted').checked;
    //     pasteHtmlAtCaret('<b>INSERTED</b>', selectPastedContent);
    //     return false;
    // };
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
