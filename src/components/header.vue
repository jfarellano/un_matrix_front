<template lang='pug'>
nav
	b-navbar(toggleable='sm', fixed='top')
		b-navbar-brand
			// <img src="../assets/CamaraBaq-24.svg" alt="Ciudá">
			| un_matrix
		button.navbar-toggler.ml-auto(type='button', data-toggle='collapse', data-target='#nav-collapse', aria-controls='navbarSupportedContent', :aria-expanded='show', @click='collapse()')
			span.navbar-toggler-icon
		#nav-collapse(:class='collapseClass()')
			b-navbar-nav.ml-auto
				ul.nav.navbar-nav.navbar-right
					li(:class="dropClass('nav-item user-drop dropdown')", v-click-outside='close')
						a.user-drop.nav-link.dropdown-toggle(href='#', @click='toggleDropdown()')
							span {{name}}
						div(:class="dropClass('dropdown-menu')", aria-labelledby='navbarDropdownMenuLink')
							router-link.dropdown-item(tag='a', to='/app') Mi Horario
							a.dropdown-item.logout(@click='logout()') Cerrar sesión
</template>

<script>
import api from '../requests'
export default {
  data() {
    return {
      expanded: false,
      show: false,
      name: ''
    };
  },
  methods: {
    logout() {
      api.authentication.requests.logout().then(()=>{
        localStorage.clear()
        this.$router.push('/')
      }).catch(() => {
        localStorage.clear()
        this.$router.push('/')
      })
    },
    collapse() {
      this.show = !this.show;
    },
    close() {
      if (this.expanded) {
        this.expanded = false;
      }
    },
    toggleDropdown() {
      this.expanded = !this.expanded;
    },
    collapseClass() {
      if (this.show) return "navbar-collapse collapse show";
      else return "navbar-collapse collapse";
    },
    dropClass(ref) {
      if (this.expanded) return ref + " show";
      else return ref;
    }
  },
  created(){
    this.name = api.storage.get('name')
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind: function(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 1000;
  height: 90px;
  background-color: #5cdb95;
  color: #05386b;
  .navbar-toggler {
    border: none;
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgb(5, 56, 107)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }
  }
  .navbar-brand {
    color: #05386b;
  }
  .dropdown-menu {
    top: 65px;
    right: 2px !important;
    left: auto;
  }
	.dropdown-item{
		color: #05386b;
	}
  .nav-link {
    color: #05386b;
    font-size: 22px;
  }
  .user-drop {
    span {
      margin-right: 10px;
    }
  }
	.logout{
		color: red;
	}
  .navbar-collapse {
    background-color: #5cdb95;
    text-align: center;
    @media (max-width: 576px) {
      top: 90px;
      position: absolute;
      width: calc(100vw - 32px);
      .nav-link {
        margin: 6px;
      }
    }

    -webkit-border-bottom-right-radius: 10px;
    -webkit-border-bottom-left-radius: 10px;
    -moz-border-radius-bottomright: 10px;
    -moz-border-radius-bottomleft: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}
</style>