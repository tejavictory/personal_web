<template>
    <div>
        <InsNav/>
        <InsDash/>
    </div>
</template>

<script>
import InsNav from './InsNav.vue'
import InsDash from './InsDash.vue'

export default {
    name: 'Instructor',
    components: {
        InsNav,
        InsDash
    }
}
</script>