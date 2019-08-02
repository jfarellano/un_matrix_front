<template lang="pug">
section.container-fluid
	vue-snotify
	div.row
		div.col
			b-button-group.list-item(v-for='matrix in matrixes' :key='matrix.id')
				router-link.info(tag='b-button', to='habla') {{matrix.name}}
				b-button.option(@click="deleteM(matrix.id)")
					font-awesome-icon(icon='trash')
</template>

<script>
import api from "../../requests";
export default {
  data() {
    return {
      matrixes: []
    };
  },
  methods: {
    getMatrixes() {
      api.requests.matrix
        .index()
        .then(response => {
          this.matrixes = response.data;
        })
        .catch(() => {
          this.$snotify.error(
            "Algo no salio bien, intenta de nuevo",
            "Error"
          );
        });
		},
		deleteM(id) {
			console.log('Hola')
			api.requests.matrix.delete(id).then(()=>{
				this.getMatrixes()
				this.$snotify.error(
            "Se borro correctamente",
            "Exito"
          );
			}).catch(() => {
				this.$snotify.error(
            "Algo no salio bien, intenta de nuevo",
            "Error"
          );
			})
		}
	},
	created(){
		this.getMatrixes()
	}
};
</script>

<style lang="scss" scoped>
.list-item {
  width: 100%;
  border: 1px solid #5cdb95;
  border-radius: 5px;
  color: #05386b;
  margin-top: 7px;
  .info {
    width: 100%;
    background-color: transparent;
    color: #05386b;
    flex: 0 1 auto;
    text-align: left;
    border: none;
  }
  .option {
    width: 50px;
    background-color: #c7161c;
    color: white;
    border: none;
  }
}
</style>

