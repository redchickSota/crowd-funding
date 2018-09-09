<template>
    <div>

        <div class="wrapper">

            <div class="main">

                <div class="container">
                    <div class="row">

                        <div class="col-lg-4 offset-lg-4 col-sm-6 offset-sm-3">
                            <div class="card card-register">
                                <h3 class="title">Welcome</h3>

                                <div v-if="errorFlag" style="color: red;">
                                    {{ error }}
                                </div>

                                <form class="register-form">
                                    <label>Username</label>
                                    <input v-model="username" class="form-control"  placeholder="Username">

                                    <label>Email</label>
                                    <input v-model="email" class="form-control" type="email" placeholder="Email">

                                    <!--<label>Confirm your Email</label>-->
                                    <!--<input v-model="ConfirmEmail" class="form-control" placeholder="Email">-->

                                    <label>Password</label>
                                    <input v-model="password" type="password" class="form-control" placeholder="Password">

                                    <!--<label>Confirm your Password</label>-->
                                    <!--<input v-model="ConfirmPassword" type="password" class="form-control" placeholder="Password">-->

                                    <label>Location</label>
                                    <input v-model="location" class="form-control" placeholder="Location">



                                </form>

                                <button class="btn btn-danger btn-block btn-round" v-on:click="addUser()">Register</button>

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
                email: "",
                password: "",
                location: ""
            }
        },

        methods: {
            addUser: function() {
                if (this.username === "") {
                    alert("Please enter an username!");
                } else {
                    this.$http.post('http://localhost:4941/api/v2/users', {
                        "username": this.username,
                        "email": this.email,
                        "password": this.password,
                        "location": this.location
                    }).then(function(response) {
                        this.$http.post('http://localhost:4941/api/v2/users/login', "", {
                            params: {
                                'username': this.username,
                                'password': this.password
                            }
                        }).then(function(response) {
                            this.id = response.data.id;
                            this.token = response.data.token;

                            this.$cookie.set('user_id', this.id, 1);
                            this.$cookie.set('user_token', this.token, 1);

                            this.$router.push('/');
                            location.reload();
                        }, function(error) {
                            this.error = error;
                            this.errorFlag = true;
                        });

                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
                }

            }


        }
    }
</script>
