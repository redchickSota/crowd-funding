<template>
  <div>
    <div class="wrapper">
      <br /><br /><br /><br />

      <div class="main">
          <div class="container">
            <div class="tim-title">
              <h2>Users</h2>
            </div>
            <br/>

              <div v-if="errorFlag" style="color: red;">
                {{ error }}
              </div>

              <div v-if="$route.params.userId">
                <div id="user">
                  <router-link :to="{name: 'users'}">Back to Users</router-link>

                  <br /><br />

                  <table>
                    <tr>
                      <td>User ID</td>
                      <td>Username</td>
                    </tr>
                    <tr>
                      <td>{{ $route.params.userId }}</td>
                      <td>{{ getSingleUser($route.params.userId).username }}</td>
                    </tr>
                  </table>

                  <hr>

                  <button type="button" class="btn btn-info btn-round" data-toggle="modal"
                          data-target="#editUserModal">
                    Edit
                  </button>

                  <div class="modal fade" id="editUserModal" tabindex="-1" role="dialog"
                       aria-labelledby="editUserModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="editUserModalLabel">Edit User</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <div class="form-group">
                              <label for="input1">Type your new username in</label>
                              <input v-model="username" class="form-control" id="input1" placeholder="Username">
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <div class="left-side">
                            <button type="button" class="btn btn-default btn-link" data-dismiss="modal">
                              Close
                            </button>
                          </div>
                          <div class="divider"></div>
                          <div class="right-side">
                            <button type="button" class="btn btn-danger btn-link" data-dismiss="modal"
                                    v-on:click="updateUser(getSingleUser($route.params.userId))">
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button type="button" class="btn btn-danger btn-round" data-toggle="modal"
                          data-target="#deleteUserModal">
                    Delete
                  </button>

                  <div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog"
                       aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="deleteUserModalLabel">Delete User</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          Are you sure that you want to delete this user?
                        </div>
                        <div class="modal-footer">

                          <div class="left-side">
                            <button type="button" class="btn btn-default btn-link" data-dismiss="modal">
                              Close
                            </button>
                          </div>
                          <div class="divider"></div>
                          <div class="right-side">
                            <button type="button" class="btn btn-danger btn-link" data-dismiss="modal"
                                    v-on:click="deleteUser(getSingleUser($route.params.userId))">
                              Delete User
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div v-else>
                <div id="users">
                  <table>
                    <tr v-for="user in users">
                      <td><router-link :to="{name: 'user', params: {userId: user.user_id}}">{{ user }}</router-link></td>
                    </tr>
                  </table>

                  <hr>

                  <button type="button" class="btn btn-info btn-round" data-toggle="modal"
                          data-target="#addUserModal">
                    Add New User
                  </button>

                  <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog"
                       aria-labelledby="editUserModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="addModalLabel">Add New User</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <div class="form-group">
                              <label for="input1">Type your username</label>
                              <input v-model="username" class="form-control" id="input1" placeholder="Username">
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <div class="left-side">
                            <button type="button" class="btn btn-default btn-link" data-dismiss="modal">
                              Close
                            </button>
                          </div>
                          <div class="divider"></div>
                          <div class="right-side">
                            <button type="button" class="btn btn-danger btn-link" data-dismiss="modal"
                                    v-on:click="addUser()">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
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
              username: ""
          }
      },
      mounted: function() {
          this.getUsers();
      },
      methods: {
          getUsers: function() {
              this.$http.get('http://127.0.0.1:3000/api/users/')
                  .then(function(response) {
                      this.users = response.data;
                  }, function(error) {
                      this.error = error;
                      this.errorFlag = true;
                  });

          },

          getSingleUser: function(id){
              for(var i = 0; i < this.users.length; i++){
                  if(this.users[i].user_id == id){
                      return this.users[i];
                  }
              }
          },

          addUser: function() {
              if (this.username === "") {
                  alert("Please enter an username !");
              } else {
                  this.$http.post('http://localhost:4941/api/v2/users', {
                      "username": this.username
                  }).then(function(response) {
                      this.$router.push('/');
                  }, function(error) {
                      this.error = error;
                      this.errorFlag = true;
                  });
              }

          },

          deleteUser: function(user) {

              this.$http.delete('http://localhost:4941/api/v2/users/' + user.user_id)
                  .then(function(response) {
                      var tempid = user.user_id;
                      for (var i = 0; i < this.users.length; i++) {
                          if (tempid == this.users[i].user_id) {
                              this.users.splice(i, 1);
                          }
                      }
                      this.$router.push('/users');
                  }, function(error){
                      this.error = error;
                      this.errorFlag = true;
                  });
          },

          updateUser: function(user) {
              if (this.username === "") {
                  alert("Please enter an username !");
              } else {
                  this.$http.put('http://127.0.0.1:3000/api/users/' + user.user_id, {
                      "username": this.username,

                  }, function(error){
                      this.error = error;
                      this.errorFlag = true;
                  });

                  location.reload();
              }

          }
      }
  }
</script>

<style>
  /* Remove the navbar's default margin-bottom and rounded borders */
  .navbar {
    margin-bottom: 0;
    border-radius: 0;
  }

  /* Set height of the grid so .sidenav can be 100% (adjust as needed) */
  .row.content {height: 450px}

  /* Set gray background color and 100% height */
  .sidenav {
    padding-top: 20px;
    background-color: #f1f1f1;
    height: 170%;
  }

  /* Set black background color, white text and some padding */
  footer {
    background-color: #555;
    color: white;
    padding: 15px;
  }

  /* On small screens, set height to 'auto' for sidenav and grid */
  @media screen and (max-width: 767px) {
    .sidenav {
      height: auto;
      padding: 15px;
    }
    .row.content {height:auto;}
  }




</style>