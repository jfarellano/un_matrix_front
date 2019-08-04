<template lang="pug">
section.container-fluid.main-container
  div.row
    div.col.grow-col
      div.content
        div.container-fluid
          div.row
            div.col
              a(href="/" )
                img(src="../../assets/line.svg", alt='un_matrix')
          div.row
            div.col-md-4
              h5 Miembros de la matriz
              div.members-container  
                b-button-group.list-item(v-for='member in members' :key='member.id')
                  p {{member.user.full_name.substring(0,20)}}
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
			days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    };
  },
  methods: {
    getMatrix() {
      api.requests.share.show(this.$route.params.link).then(response => {
        this.matrix = response.data.json;
				this.members = response.data.group.members;
        this.fetched = true;
      });
		},
    getQty(day, time) {
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
.main-container{
  text-align: center;
  img{
    margin: 20px;
    height: 50px;
  }
  .grow-col{
		background-color: #5cdb95;
    min-height: 100vh;
    padding-top: 30px;
	}
	.content{
		@media (min-width: 1100px){
			width: 1100px;
      margin: auto;
		}
		min-height: calc(100vh - 200px);
		width: 100%;
		background-color: white;
    border-radius: 5px;
	}
}
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
  margin: 10px 0px;
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
h5 {
  color: #05386b;
  text-align: center;
}
.members-container {
  margin: 10px;
  overflow: auto;
  height: calc(100vh - 170px);
  @media (max-width: 768px) {
    height: 200px !important;
  }
  .list-item {
    width: 100%;
    line-height: 40px;
    border: 1px solid #5cdb95;
    border-radius: 5px;
    color: #05386b;
    margin-top: 7px;
		padding-left: 5px;
    position: relative;
		p {
        margin: 0px;
      }
    .info {
      width: 100%;
      background-color: transparent;
      color: #05386b;
      flex: 0 1 auto;
      text-align: left;
      border: none;
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
</style>
