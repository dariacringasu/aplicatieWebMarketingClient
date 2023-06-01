<template>
    <div>
        <qrcode-vue :value="QRValue" :size="300" level="H" />
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default{
    data() {
        return {
            QRValue:null,
        }
    },
    components:
    {
        QrcodeVue
    }
}
</script>