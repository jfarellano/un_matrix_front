<template lang="pug">
	section.container-fluid
		vue-snotify
		div.row.justify-content-center
			div.col-md-6.form-container.align-self-center
				h2 Agregar a matriz de conflicto
				h3 Usuario UniNorte
				div.input-group
					input(v-model="user.username" placeholder="ej. eperez" :disabled='enable')
				h3 Contraseña UniNorte
				div.input-group
					input(v-model="user.password" type="password" placeholder="******" :disabled='enable')
				button.btn.btn-primary(v-on:click.prevent='login()' :disabled='enable') Ingresar
				p Tranquilo, no almacenamos contraseñas. Utilizamos los servicios de autenticación de la u para saber si eres tú y poder obtener tu horario.
				
</template>

<script>
import api from "../../requests";
import { setTimeout } from "timers";
export default {
  data() {
    return {
			user: {},
			enable: false
    };
  },
  methods: {
    getSchedule() {
      this.user.user = this.user.username;
      api.requests.schedule
        .get(this.user)
        .then(response => {
          api.storage.set("name", response.data.user.full_name);
          api.requests.share.add(this.$route.params.link).then(() => {
            this.$snotify.success(
              "Te hemos agregado de manera exitosa",
              "Exito"
            );
            setTimeout(this.$router.push("/"), 3000);
          });
        })
        .catch(err => {
          api.error.handdle(
            err.response,
            () => {},
            () => {
              this.getSchedule();
            }
          );
        });
    },
    login() {
      api.authentication.requests
        .login(this.user)
        .then(response => {
          api.storage.set("secret", response.data.secret);
          this.getSchedule();
        })
        .catch(err => {
          api.error.handdle(
            err.response,
            data => {
              switch (data) {
                case "authentication":
                  this.user = {};
                  this.$snotify.error(
                    "Tus credenciales son invalidas vuelve a intentar de nuevo",
                    "Error"
                  );
                  break;
                case "unable_to_login":
                  this.$snotify.error(
                    "Puede que este bloqueado tu usuario por el csu o tienes pendiente la actualizacion de datos por favor revisa",
                    "Error"
                  );
                  this.user = {};
                  break;
                case "unknown":
                  this.$snotify.error(
                    "Algo esta mal, vuelve a intentar",
                    "Error"
                  );
                  break;
                default:
                  break;
              }
            },
            () => {
              this.login();
            }
          );
        });
    }
  },
  created() {
    if (api.authentication.handdler.logged()) {
      api.requests.share.add(this.$route.params.link).then(() => {
        this.$snotify.success("Te hemos agregado de manera exitosa", "Exito");
        setTimeout(this.$router.push("/"), 3000);
      }).catch((err) => {
				if(err.response.data.authorization == 'already in'){
					this.$snotify.warning("Ya perteneces a esta matriz", "Ya estas");
					setTimeout(this.$router.push("/"), 3000);
				}
			})
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  min-height: 100vh;
  background-color: #5cdb95;
  .row {
    min-height: 100vh;
    .form-container {
      margin: 20px;
      border-radius: 10px;
      background-color: white;
      padding: 20px;
      text-align: center;
      color: #05386b;
      p {
        color: #808080;
      }
      input {
        width: 100%;
        border-radius: 5px;
        border: 2px solid #05386b;
        color: #5e5e5e;
        height: 35px;
      }
      button {
        background-color: #05386b;
        border: none;
        width: 100%;
        margin: 20px 0px;
      }
    }
  }
}
</style>
