<template>
  <div>
    <div class="wrapper">

      <div class="main">

        <div class="container">

          <div class="row">
            <div class="tim-title">

              <header class="w3-container w3-red w3-center" style="padding:128px 16px">
                <h1 class="w3-margin w3-jumbo">START PAGE</h1>
                <p class="w3-xlarge">Template by w3.css</p>
                <button class="w3-button w3-black w3-padding-large w3-large w3-margin-top">Get Started</button>
              </header>


            </div>
          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<style>
  .row{
    margin: 70px 0px 0px 0px;

  }


</style>

<script>
    export default {
        data () {
            return{
                error: "",
                errorFlag: false,
                users: [],
                username: "",
                userEmail: "",
            }
        },
        mounted: function() {

        },

        methods: {

        }
    }
</script>

