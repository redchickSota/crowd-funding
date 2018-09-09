<template>
  <div>

    <div class="wrapper">

      <div class="main">

        <div class="container">

          <div class="tim-title">
            <h3>Edit User</h3>

            <div class="row">

              <div class="col-lg-4 offset-lg-4 col-sm-6 offset-sm-3">
                <div class="card card-register">

                  <div v-if="errorFlag" style="color: red;">
                    {{ error }}
                  </div>
                  <!--<div class="social-line text-center">-->
                  <!--<a href="#pablo" class="btn btn-neutral btn-facebook btn-just-icon">-->
                  <!--<i class="fa fa-facebook-square"></i>-->
                  <!--</a>-->
                  <!--<a href="#pablo" class="btn btn-neutral btn-google btn-just-icon">-->
                  <!--<i class="fa fa-google-plus"></i>-->
                  <!--</a>-->
                  <!--<a href="#pablo" class="btn btn-neutral btn-twitter btn-just-icon">-->
                  <!--<i class="fa fa-twitter"></i>-->
                  <!--</a>-->
                  <!--</div>-->
                  <!--<form class="register-form">-->
                  <form class="register-form">
                    <label>Username</label>
                    <input v-model="username" class="form-control"  placeholder="Username">

                    <label>Email</label>
                    <input v-model="email" class="form-control" placeholder="Email">

                    <!--<label>Confirm your Email</label>-->
                    <!--<input v-model="ConfirmEmail" class="form-control" placeholder="Email">-->

                    <label>Password</label>
                    <input v-model="password" type="password" class="form-control" placeholder="Password">

                    <!--<label>Confirm your Password</label>-->
                    <!--<input v-model="ConfirmPassword" type="password" class="form-control" placeholder="Password">-->

                    <label>Location</label>
                    <input v-model="location" class="form-control" placeholder="Location">

                  </form>

                  <button class="btn btn-danger btn-block btn-round" v-on:click="updateUser()">Edit</button>


                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
    export default {
        data () {
            return{
                error: "",
                errorFlag: false,
                users: [],
                email: "",
                username: "",
                password: "",
                location: "",
                id: ""
            }
        },
        mounted: function() {
        },

        methods: {

            updateUser: function() {
                if (this.username === "") {
                    alert("Please enter an username !");
                } else {
                    this.$http.put('http://localhost:4941/api/v2/users/' + this.$cookie.get('user_id'), {
                        "username": this.username,
                        "email": this.email,
                        "password": this.password,
                        "location": this.location
                    }, {
                        headers: {
                            'X-Authorization': this.$cookie.get('user_token')
                        }
                    }).then(function(response) {
                        this.$router.push('/');
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });

                }

            }
        }
    }
</script>


