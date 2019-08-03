<template lang="pug">
section.container-fluid
	vue-snotify
	b-modal#showMatrix(title='Nueva matriz de conflicto', hide-footer='', hide-header)
		div.modal-container.container-fluid
			div.row
				div.col
					h4 Nombre de la matriz
					input(v-model='matrix.name')
					b-button(@click="addMatrix()") Guardar
	b-button.add-new(@click='showMatrix()') Agregar nueva
	div.row
		div.col
			b-button-group.list-item(v-for='mat in matrixes' :key='mat.id')
				router-link.info(tag='b-button', :to='"/app/matrix/" + mat.id') {{mat.name}}
				b-button.option(@click="deleteM(mat.id)")
					font-awesome-icon(icon='trash')
</template>

<script>
import api from "../../requests";
export default {
  data() {
    return {
      matrixes: [],
      matrix: {}
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
          this.$snotify.error("Algo no salio bien, intenta de nuevo", "Error");
        });
    },
    deleteM(id) {
      api.requests.matrix
        .delete(id)
        .then(() => {
          this.getMatrixes();
          this.$snotify.error("Se borro correctamente", "Exito");
        })
        .catch(() => {
          this.$snotify.error("Algo no salio bien, intenta de nuevo", "Error");
        });
    },
    showMatrix() {
      this.$bvModal.show("showMatrix");
    },
    addMatrix() {
      api.requests.matrix
        .create(this.matrix)
        .then((response) => {
					this.getMatrixes();
					api.requests.matrix.createLink(response.data.id)
          this.matrix = {};
          this.$bvModal.hide("showMatrix");
        })
        .catch(() => {
          this.$snotify.error("Algo no salio bien, intenta de nuevo", "Error");
        });
    }
  },
  created() {
    this.getMatrixes();
  }
};
</script>

<style lang="scss" scoped>
.modal {
  .modal-body {
		text-align: center;
    h4 {
      color: #05386b;
    }
    input {
      width: 100%;
      color: #05386b;
      border: 1px solid #5cdb95;
      margin: 5px;
			border-radius: 5px;
    }
    button {
      width: 100%;
      background-color: #05386b;
      color: white;
      margin: 5px;
    }
  }
}
.container-fluid {
  padding-top: 10px;
  .add-new {
    text-align: center;
    height: 40px;
    width: 100%;
    border: none;
    background-color: #5cdb95;
    color: #05386b;
  }
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
}
</style>

