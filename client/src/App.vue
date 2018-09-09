<template>
  <div id="app">

    <div v-if=" this.$cookie.get('user_token')">
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">CROWDFUNDING</a>
          </div>
          <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav">
              <li><a href="/projects">Projects</a></li>
              <li><a href="/createProject">Start a Project</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <div class="navbar-form navbar-right">
                  <div class="input-group">
                    <input v-model="search" type="text" class="form-control" placeholder="Search">
                    <div class="input-group-btn">
                      <button class="btn btn-default" type="submit" v-on:click="searchBox()">
                        <i class="glyphicon glyphicon-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li><a href="" data-toggle="modal" data-target="#addDetailModal">
                <span class="glyphicon glyphicon-check"></span> Hello {{ this.username }}</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <div v-else="">
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">CROWDFUNDING</a>
          </div>
          <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav">
              <li><a href="/projects">Projects</a></li>
              <li><a href="" data-toggle="modal" data-target="#myModal">Start a Project</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <div class="navbar-form navbar-right">
                  <div class="input-group">
                    <input v-model="search" type="text" class="form-control" placeholder="Search">
                    <div class="input-group-btn">
                      <button class="btn btn-default" type="submit" v-on:click="searchBox()">
                        <i class="glyphicon glyphicon-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li><a href="" data-toggle="modal" data-target="#signUpModal"><span class="glyphicon glyphicon-user"></span> Sign up</a></li>
              <li><a href="" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-log-in"></span> Log in</a></li>

            </ul>
          </div>
        </div>
      </nav>
    </div>

    <div class="modal fade" id="addDetailModal" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-body" style="padding:40px 50px;">

            <strong>{{ this.username }}</strong>
            <h3>{{ this.email }}</h3>


            <h5><a href="/createView" class="text-muted">My projects</a></h5>
            <h5><a href="/backView" class="text-muted">Backed projects</a></h5>





          </div>
          <div class="modal-footer">
              <a data-dismiss="modal" data-toggle="modal" data-target="#editUserModal" class="btn btn-success btn-default pull-left" >
                <span class="glyphicon glyphicon-edit"></span> Edit user detail</a>
            <button class="btn btn-success btn-default " v-on:click="logOutUser()"><span class="glyphicon glyphicon-log-out"></span> Log Out</button>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal content Log In-->

    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">


        <div class="modal-content">
          <div class="modal-header" style="padding:35px 50px;">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <div class="modalLetter"><span class="glyphicon glyphicon-lock"></span> Login</div>
          </div>
          <div class="modal-body" style="padding:40px 50px;">
            <form role="form">
              <div class="form-group">
                <label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>
                <input v-model="username" class="form-control" id="usrname" placeholder="Enter email">
              </div>

              <div class="form-group">
                <label for="email"><span class="glyphicon glyphicon-envelope"></span> Email</label>
                <input type="email" v-model="email" class="form-control" id="email" placeholder="Enter email" required>
              </div>
              <div class="form-group">
                <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
                <input v-model="password" type="password" class="form-control" id="psw" placeholder="Enter password">
              </div>
              <div class="checkbox">
                <label><input type="checkbox" value="" checked>Remember me</label>
              </div>
            </form>
            <button class="btn btn-success btn-block" v-on:click="logInUser()"><span class="glyphicon glyphicon-off"></span> Login</button>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
            <p>Not a member? <a data-dismiss="modal" data-toggle="modal" data-target="#signUpModal">Sign Up</a></p>
            <p>Forgot <a href="#">Password?</a></p>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal content Sign Up-->

    <div class="modal fade" id="signUpModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="padding:35px 50px;">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <div class="modalLetter"><span class="glyphicon glyphicon-lock"></span> Sign Up</div>
          </div>
          <div class="modal-body" style="padding:40px 50px;">
            <form role="form" data-toggle="validator">
              <div class="form-group">
                <label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>
                <input type="text" v-model="username" class="form-control" id="usrname" placeholder="Enter username" required>
              </div>
              <div class="form-group">
                <label for="email"><span class="glyphicon glyphicon-envelope"></span> Email</label>
                <input type="email" v-model="email" class="form-control" id="email" placeholder="Enter email" required>
              </div>
              <div class="form-group">
                <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
                <input v-model="password" type="password" class="form-control" id="psw" placeholder="Enter password">
              </div>
              <div class="form-group">
                <label for="loc"><span class="glyphicon glyphicon-home"></span> Location</label>
                <input v-model="location" type="password" class="form-control" id="loc" placeholder="Choose your location">
              </div>
              <div class="checkbox">
                <label><input type="checkbox" value="" checked>Remember me</label>
              </div>
            </form>
            <button class="btn btn-success btn-block" v-on:click="addUser()"><span class="glyphicon glyphicon-off"></span> Register</button>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
            <p>Are you a member? <a data-dismiss="modal" data-toggle="modal" data-target="#myModal">Log In</a></p>
            <p>Forgot <a href="#">Password?</a></p>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal content Edit User-->

    <div class="modal fade" id="editUserModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="padding:35px 50px;">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <div class="modalLetter"><span class="glyphicon glyphicon-edit"></span> Edit User Details</div>
          </div>
          <div class="modal-body" style="padding:40px 50px;">
            <form role="form">
              <div class="form-group">
                <label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>
                <input v-model="username" class="form-control" id="usrname" placeholder="Enter username">
              </div>
              <div class="form-group">
                <label for="email"><span class="glyphicon glyphicon-envelope"></span> Email</label>
                <input v-model="email" class="form-control" id="email" placeholder="Enter email">
              </div>
              <div class="form-group">
                <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>
                <input v-model="password" type="password" class="form-control" id="psw" placeholder="Enter password">
              </div>
              <div class="form-group">
                <label for="loc"><span class="glyphicon glyphicon-home"></span> Location</label>
                <input v-model="location" type="password" class="form-control" id="loc" placeholder="Choose your location">
              </div>
              <div class="checkbox">
                <label><input type="checkbox" value="" checked>Remember me</label>
              </div>
            </form>
            <button class="btn btn-success btn-block" v-on:click="updateUser()"><span class="glyphicon glyphicon-off"></span> Update</button>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
          </div>
        </div>

      </div>
    </div>

    <router-view>

    </router-view>
  </div>
</template>

<style>
  .modal-header, #modalLetter, .close {
    background-color: #5cb85c;
    color:white !important;
    text-align: center;
    font-size: 30px;
  }
  .modal-footer {
    background-color: #f9f9f9;
  }
</style>

<script>
    export default {
        data () {
            return{
                error: "",
                errorFlag: false,
                projects: [],
                image: "",
                project: "",
                creators: "",
                username: "",
                password: "",
                email: "",
                location: "",
                imgType: "",
                file: "",
                search: "",
            }
        },
        mounted: function() {

            if(this.$cookie.get('user_id')){
                this.getUserDetail(this.$cookie.get('user_id'));
            }


        },

        methods: {

            searchBox: function() {
                if(this.search !== ''){
                    this.$router.push({ name: 'search', query: { search: this.search }});
                }
            },

            addUser: function() {
                if (this.username === "") {
                    alert("Please enter an username!");
                } else if (this.email === ""){
                    alert("Please enter an email address!");
                } else {
                    this.$http.post('http://csse-s365.canterbury.ac.nz:4708/api/v2/users', {
                        "username": this.username,
                        "email": this.email,
                        "password": this.password,
                        "location": this.location
                    }).then(function(response) {
                        this.$http.post('http://csse-s365.canterbury.ac.nz:4708/api/v2/users/login', "", {
                            params: {
                                'username': this.username,
                                'password': this.password
                            }
                        }).then(function(response) {
                            this.id = response.data.id;
                            this.token = response.data.token;

                            this.$cookie.set('user_id', this.id, 1);
                            this.$cookie.set('user_token', this.token, 1);

//                            this.$router.push('/');
                            location.reload();
                        }, function(error) {
                            this.error = error;
                            this.errorFlag = true;
                        });

                    }, function(error) {
                        console.log(error.status);
                        if(error.status === 400){
                            alert("this user name is already in use !")
                        } else {
                            this.error = error;
                            this.errorFlag = true;
                        }

                    });
                }

            },

            updateUser: function() {
                console.log("COMES");
                if (this.username === "") {
                    alert("Please enter an username !");
                } else {
                    this.$http.put('http://csse-s365.canterbury.ac.nz:4708/api/v2/users/' + this.$cookie.get('user_id'), {
                        "username": this.username,
                        "email": this.email,
                        "password": this.password,
                        "location": this.location
                    }, {
                        headers: {
                            'X-Authorization': this.$cookie.get('user_token')
                        }
                    }).then(function(response) {
                        location.reload();
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });

                }

            },

            getUserDetail: function(id) {
                this.$http.get('http://csse-s365.canterbury.ac.nz:4708/api/v2/users/' + id,{
                    headers: {
                        'X-Authorization': this.$cookie.get('user_token')
                    }
                }).then(function(response) {
                    this.username = response.data.username;
                    this.email = response.data.email;
                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });

            },

            logInUser: function() {
                if(this.username === "" && this.email === ""){
                    alert('input your username or email address');
                } else {
                    this.$http.post('http://csse-s365.canterbury.ac.nz:4708/api/v2/users/login', "", {
                        params: {
                            'username': this.username,
                            'email': this.email,
                            'password': this.password
                        }
                    }).then(function(response) {
                        console.log(response);
                        this.id = response.data.id;
                        this.token = response.data.token;

                        this.$cookie.set('user_id', this.id, { expires: '60m' });
                        this.$cookie.set('user_token', this.token, { expires: '60m' });

//                    this.$router.push('/');
                        location.reload();
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
                }
            },


            logOutUser: function() {
                this.$http.post('http://csse-s365.canterbury.ac.nz:4708/api/v2/users/logout', "", {
                    headers: {
                        'X-Authorization': this.$cookie.get('user_token')
                    }
                }).then(function(response) {
                    // To delete a cookie use
                    this.$cookie.delete('user_id');
                    this.$cookie.delete('user_token');

                    this.$router.push('/');
                    location.reload();
                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });
            }
        }
    }
</script>


