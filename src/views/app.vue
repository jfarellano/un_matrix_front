<template lang="pug">
section
	Header
	section.container-fluid.main
		div.row
			div.col
				div.content
	
</template>

<script>
import Header from '../components/header.vue'
export default {
	components: {
		Header
	}
}
</script>

<style lang="scss" scoped>
.main{
	margin-top: 90px;
	.col{
		background-color: #edf5e1;
	}
	.content{
		@media (min-width: 1100px){
			width: 1100px;
			margin: auto;
		}
		min-height: calc(100vh - 90px);
		width: 100%;
		background-color: white;
	}
}
</style>

