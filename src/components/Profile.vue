<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser?.data?.name}}</strong> Profile
      </h3>
    </header>

    <p>
      <strong>Id:</strong>
      {{currentUser?.data?.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser?.data?.email}}
    </p>



  </div>
</template>

<script>

import { reactive, computed,onMounted } from "vue";


import { useStore } from "vuex";

export default {
  name: 'Profile',

  setup(){
    const store = useStore();
    const state = reactive({
      is_default:false,
      selectLoading: false,
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      errors: "",
    });

    const currentUser = computed(() => store.getters["auth/get_self"]);

    onMounted( () => {

       store.dispatch("auth/self").then(
           res=> {
             if(!res.data.id)
              this.$router.push('/login');
       });
    });

    return {
      state,
      currentUser
    };
  }
};
</script>