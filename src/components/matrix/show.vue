<template lang="pug">
section.container-fluid
	b-modal#shareMatrix(title='Compartir matriz', hide-footer='', hide-header)
		div.modal-container.container-fluid
			div.row
				div.col
					h4 Agregar nuevos miembros
					p {{addLink()}}
					h4 Compartir esta matriz
					p {{shareLink()}}
					b-button(@click="createLink()") Generar links nuevos
	div.row
		div.col
			b-button.share(@click="showShare()") Compartir
	div.row
		div.col-md-4
			div.members-container
				h5 Miembros de la matriz
				b-button-group.list-item(v-for='member in members' :key='member.id')
					p {{member.user.full_name.substring(0,20)}}
					b-button.option(@click="deleteMember(member.id)", v-if='!member.admin')
						font-awesome-icon(icon='trash')
		div.col-md-8
			div.table-responsive-md
				table.table-bordered
					thead
						tr
							th(scope='col') Hora
							th(scope='col') Lunes
							th(scope='col') Martes
							th(scope='col') Miercoles
							th(scope='col') Jueves
							th(scope='col') Viernes
					tbody
						tr(v-for='hour in hours' :key="hour")
							th {{(hour+5) + ':30 - ' + (hour + 6) + ':30'}}
							td(:class="getClass(day, (hour+5) + ':30 - ' + (hour + 6) + ':30')" v-for='(day, i) in days' :key='i' v-b-popover.hover='getName(day,hour)') {{getQty(day, (hour+5) + ':30 - ' + (hour + 6) + ':30')}}

					
</template>

<script>
import api from "../../requests";
export default {
  data() {
    return {
      matrix: {},
      fetched: false,
      hours: [],
			members: {},
			link: '',
			days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    };
  },
  methods: {
    getMatrix() {
      api.requests.matrix.schedule(this.$route.params.id).then(response => {
        this.matrix = response.data.json;
				this.members = response.data.group.members;
				api.requests.matrix.getLink(this.$route.params.id).then((response) => {
					this.link = response.data[0].secret
				})
        this.fetched = true;
      });
		},
		createLink(){
			api.requests.matrix.deleteLink(this.link).then(() => {
				api.requests.matrix.createLink(this.$route.params.id).then((response) => {
					this.link = response.data.secret
				})
			})
		},
		showShare() {
      this.$bvModal.show("shareMatrix");
    },
		shareLink(){
			return api.variables.WEB_PAGE + 'share/' + this.link
		},
		addLink(){
			return api.variables.WEB_PAGE + 'add/' + this.link
		},
		deleteMember(id){
			api.requests.matrix.deleteMember(this.$route.params.id, id).then(()=>{
				this.getMatrix()
			})
		},
    getQty(day, time) {
      // console.log(this.matrix['Monday']['6:30 - 7:30'])
      if (this.fetched)
        return this.matrix[day][time] == "0"
          ? ""
          : this.matrix[day][time].split(" ").length - 1;
      else return "";
		},
		getName(day, time) {
			if(this.fetched){
			let hour = (time+5) + ':30 - ' + (time + 6) + ':30'
				let ids = this.matrix[day][hour].split(" ")
				if(ids.length == 1){
					return ''
				}else{
					let a = this.members.filter(member => ids.includes(member.user.id+''))
					var name = ''
					a.forEach(element => {
						name = name + ', ' + element.user.full_name
					});
					return name.substring(2)
				}
			}else return ''
		},
    getClass(day, time) {
      if (this.fetched) return this.matrix[day][time] == "0" ? "" : "ocupied";
      else return "";
    }
  },
  created() {
    for (let i = 0; i < 16; i++) {
      this.hours = i;
    }
    this.getMatrix();
  }
};
</script>

<style lang="scss" scoped>
.share{
	width: 100%;
	background-color: #05386b;
	color: white;
	border: #5cdb95 solid 1px;
	border-radius: 5px;
	margin: 10px 0px;
}
table {
  line-height: 1;
  width: 100%;
  text-align: center;
  th {
    font-size: 0.7rem;
  }
  th,
  td {
    width: 16.66%;
    border: #05386b solid 2px;
    padding: 5px;
    color: #05386b;
  }
  .ocupied {
    background-color: #5cdb95;
    color: #05386b;
  }
}
.members-container {
	margin: auto;
	height: calc(100vh - 170px);
	h5{
		color: #05386b;
		text-align: center;
	}
	@media (max-width: 768px) {
		height: 200px !important;
		
	}
  .list-item {
    width: 100%;
		height: 40px;
		line-height: 40px;
    border: 1px solid #5cdb95;
    border-radius: 5px;
    color: #05386b;
    margin-top: 7px;
		position: relative;
    .info {
      font-size: 0.7rem;
      width: 100%;
      background-color: transparent;
      color: #05386b;
      flex: 0 1 auto;
      text-align: left;
      border: none;
      p {
        font-size: 0.8rem;
      }
    }
    .option {
			position: absolute;
			right: 0;
			height: 100%;
      width: 50px;
      background-color: #c7161c;
      color: white;
      border: none;
      flex-grow: unset;
    }
  }
}
.modal {
  .modal-body {
		text-align: center;
    h4 {
      color: #05386b;
    }
		p{
			font-size: 0.8rem;
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
</style>
