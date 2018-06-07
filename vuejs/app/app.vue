<template>
    <div class="header">
        <h1 v-once>{{ title }}</h1>

        <div class="form">
            <input type="text" v-bind:value="title" v-on:input="changeTitle" />
        </div>

        <span>{{ title }}</span>
        <a target="_blank" v-bind:href="googleUrl">Google</a>
    </div>
</template>

<script>
    module.exports = {
        data () {
            return {
                title: 'Vue world!',
                googleUrl: 'http://www.google.com'
            };
        },
        methods: {
            changeTitle (event) {
                this.title = event.target.value;
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
