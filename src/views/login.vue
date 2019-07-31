<template lang="pug">
	section.container-fluid 
		div.row.justify-content-center
			div.col-md-6.form-container.align-self-center
				h3 Usuario UniNorte
				div.input-group
					input(v-model="user.username" placeholder="ej. eperez")
				h3 Contraseña UniNorte
				div.input-group
					input(v-model="user.password" type="password" placeholder="******")
				button.btn.btn-primary(v-on:click.prevent='login()') Ingresar
				p Tranquilo, no almacenamos contraseñas. Utilizamos los servicios de autenticación de la u para saber si eres tú y poder obtener tu horario.
				
</template>

<script>
export default {
	data(){
		return{
			user: {}
		}
	}
}
</script>

<style lang="scss" scoped>
	section{
		min-height: 100vh;
		background-color: #5cdb95;
		.row{
			min-height: 100vh;
			.form-container{
				margin: 20px;
				border-radius: 10px;
				background-color: white;
				padding: 20px;
				text-align: center;
				color: #05386b;
				p{
					color: #808080;
				}
				input{
					width: 100%;
					border-radius: 5px;
					border: 2px solid #05386b;
					color: #5e5e5e;
					height: 35px;
				}
				button{
					background-color: #05386b;
					border: none;
					width: 100%;
					margin: 20px 0px;
				}
			}
		}
	}
</style>
