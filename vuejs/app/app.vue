<template>
    <div class="header">
        <h1 v-once>{{ title }}</h1>

        <div class="form">
            <input type="text" v-bind:value="title" v-on:input="changeTitle" />
        </div>

        <span>{{ title }}</span>
        <a target="_blank" v-bind:href="googleUrl">Google</a>
        <p>Raw html from Vue: <span v-html="yahooAnchor"></span></p>

        <hr />

        {{ num }} <button v-on:click="increment(2, $event)">Increment</button>
    </div>
</template>

<script>
    module.exports = {
        data () {
            return {
                title: 'Vue world!',
                googleUrl: 'http://www.google.com',
                yahooAnchor: '<a target="_blank" href="http://www.yahoo.com">Yahoo</a>',
                num: 0
            };
        },
        methods: {
            changeTitle (event) {
                this.title = event.target.value;
            },
            increment (step, event) {
                this.title = event.target.nodeName + ' clicked';
                this.num += step;
            }
        }
    };
</script>

<style scoped>
    .header h1 {
        font-size: 2rem;
        color: darkslategray;
        border-bottom: 1px solid black;
        margin-bottom: 2rem;
    }

    .form {
        padding: 2rem 0;
    }
</style>
