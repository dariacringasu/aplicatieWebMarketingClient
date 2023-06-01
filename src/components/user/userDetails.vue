<script setup>

import { computed } from '@vue/reactivity';


const props = defineProps({
    companyName: String,
    email: String,
    cursor: String
});

const cssProps = computed(() => {
    return {
        '--cursor' : props.cursor
    }
});

</script>


<template>
    <div :style="cssProps" id="content-container">
        
        <div id="details-container">
            <div class="detail-item">
                <p id="user-name">{{companyName}}</p>
            </div>

            <div class="detail-item">
                <p>{{email}}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
#content-container {
    display: grid;
    grid-template-columns: 20% 80%;
    height: 50%;
    cursor: var(--cursor);
}

#image-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

#details-container {
    display: grid;
    grid-template-rows: 50% 50%;
}

#details-container p{
    margin: auto;
    height: 100%;
    font-size: 1.17rem;
    padding-left: 2%;
    padding-top: 1%;
}

#user-name{
    color: #111;
}

</style>