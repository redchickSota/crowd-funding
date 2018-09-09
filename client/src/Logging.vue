<template>
    <div>

        <div class="wrapper">

            <div class="main">

                <div class="container">
                    <div class="row">

                        <div class="col-lg-4 offset-lg-4 col-sm-6 offset-sm-3">
                            <div class="card card-register">
                                <h3 class="title">Log In</h3>

                                <div v-if="errorFlag" style="color: red;">
                                    {{ error }}
                                </div>

                                {{ token }}

                                <form class="register-form">
                                    <label>Username or Email</label>
                                    <input v-model="username" class="form-control"  placeholder="Username or Email">


                                    <label>Password</label>
                                    <input v-model="password" type="password" class="form-control" placeholder="Password">



                                </form>

                                <button class="btn btn-danger btn-block btn-round" v-on:click="logInUser()">LogIn</button>

                                <div class="forgot">
                                    <a href="#" class="btn btn-link btn-danger">Forgot password?</a>
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
                username: "",
                password: "",
                id: "",
                token: ""
            }
        },

        methods: {
            logInUser: function() {
                this.$http.post('http://localhost:4941/api/v2/users/login', "", {
                    params: {
                        'username': this.username,
                        'password': this.password
                    }
                }).then(function(response) {
                    this.id = response.data.id;
                    this.token = response.data.token;

                    this.$cookie.set('user_id', this.id, { expires: '20m' });
                    this.$cookie.set('user_token', this.token, { expires: '20m' });

                    this.$router.push('/');
                    location.reload();
                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });




            },


        }
    }
</script>
