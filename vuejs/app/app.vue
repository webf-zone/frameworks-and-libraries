<template>
    <div class="header">
        <h1>{{ message }}</h1>
    </div>
</template>

<script>
    module.exports = {
        data () {
            return {
                message: 'Hello world!'
            };
        }
    };
</script>

<style scoped>
    .header h1 {
        font-size: 2rem;
        color: darkslategray;
    }
</style>
