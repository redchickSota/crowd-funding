<template>
    <div>


        <div class="wrapper">

            <br /><br /><br /><br />

            <div class="main">

                <div class="container">
                    {{ $route.params.pledge }}<br />
                    {{ $route.params.projectId }}<br />


                    <div class="tim-title">
                        <h3>Payment information</h3>
                    </div>

                        <h4>Your payment method will not be charged at this time. If the project is
                            successfully funded, your payment method will be charged ${{$route.params.pledge}} when the project ends. </h4>

                    <form class="register-form">

                        <div class="tim-title">
                            <h3>Add card information</h3>
                        </div>
                        <label>Card number</label>
                        <!--<input v-model.number="" class="form-control"  placeholder="">-->
                        <input  class="form-control"  placeholder="">
                        <label>Name</label>
                        <!--<input v-model.number="" class="form-control"  placeholder="">-->
                        <input  class="form-control"  placeholder="">

                        <input type="checkbox" id="checkbox" v-model="checked">
                        <label for="checkbox">robust enough to show your name?{{ checked }}</label>
                    </form>

                    <button type="button" class="btn btn-info btn-round" data-dismiss="modal"
                            v-on:click="pledgeProject($route.params.projectId)">
                        Pledge
                    </button>



                </div>
            </div>
        </div>

        <!--Modal-->

    </div>
</template>

<script>
    //    document.getElementById('projectImage').src = "http://localhost:4941/api/v2" + this.project.imageUri;
    export default {
        data () {
            return{
                error: "",
                errorFlag: false,
                pledge: 0,
                checked: false,
            }
        },
        mounted: function() {

        },

        methods: {
            pledgeProject: function(projectId) {
                this.pledge = parseInt(this.$route.params.pledge);

                this.$http.post('http://localhost:4941/api/v2/projects/' + projectId + '/pledge',
                    {
                        "id": parseInt(this.$cookie.get('user_id')),
                        "amount": this.pledge,
                        "anonymous": this.checked,
                        "card": {
                            "authToken": "string"
                        }
                    },
                    {
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
</script>
