<template>
    <div class="panel-box">
        <el-drawer :direction="direction" title="我是标题" :visible.sync="drawer.type" :with-header="false">
            <div>
                asdasdas
                asdasdasd
                asdasdasdasd
                asd
                asd
                asd
                adad
                <a href="a">13213213213123</a>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    export default {
        name: 'save',
        props: ['drawer'],
        data() {
            return {
                direction: 'ttb',
            }
        },
        methods: {

        }
    }
</script>
<style scoped>
    .btn-box {}
</style>