<template>
    <div>
        <div class="wrapper">

            <div class="main">

                <div class="container">
                    <div class="row">
                        <div class="tim-title">
                            <br /><br />
                            <h3>Created projects</h3>

                            <div v-if="parseInt(this.$cookie.get('user_id'))">


                                <div id="projects">
                                    <div class="row">
                                        <div class="card col-xs-8 col-sm-6 col-md-3" v-for="project in projects">
                                            <!--<div class="col-xs-8 col-sm-6 col-md-3" v-for="project in projects">-->
                                            <article>
                                                <router-link :to="{name: 'project', params: {projectId: project.id}}" class="text-muted">

                                                    <img id="allProjectsImage" v-bind:src="project.imageUri" class="img-rounded img-responsive" alt="Rounded Image" >

                                                    <div class="img-details">
                                                        <!--<div class="author">-->
                                                        <!--<img src="assets/img/faces/clem-onojeghuo-2.jpg" alt="Circle Image" class="img-circle img-no-padding img-responsive">-->
                                                        <!--</div>-->



                                                        <h4><strong>{{ project.title }}</strong></h4>
                                                        <h5>{{ project.subtitle }}</h5>
                                                    </div>
                                                </router-link>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else="">
                                To view your projects you need to log in.
                            </div>

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

    article {
        height: 450px;
        width: 100%;

    }

    #allProjectsImage {
        height: 55%;
        width: 100%;
    }

    .card {
        /* Add shadows to create the "card" effect */
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        margin: 40px 40px 40px 40px;
    }

    /* On mouse-over, add a deeper shadow */
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .container {
        padding: 2px 0px;
    }
</style>

<script>
    export default {
        data () {
            return{
                error: "",
                errorFlag: false,
                projects: []
            }
        },
        mounted: function() {
            this.getCreatedProjects();
        },

        methods: {
            getCreatedProjects: function(){
                this.navTab = false;
                this.$http.get('http://csse-s365.canterbury.ac.nz:4708/api/v2/projects', {
                    params: {
                        'creator': parseInt(this.$cookie.get('user_id'))
                    }
                }).then(function(response) {

                    this.projects = response.data;
                    this.getImage();
//                    this.getNumberOfProjects();

                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });
            },

            getImage: function() {
                for (var i = 0; i < this.projects.length; i++) {
                    this.projects[i].imageUri = 'http://csse-s365.canterbury.ac.nz:4708/api/v2' + this.projects[i].imageUri;
                }
            },


        }
    }
</script>
