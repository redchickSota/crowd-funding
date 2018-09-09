<template>
<div>
    <div class="wrapper">

        <br /><br /><br /><br />

        <div class="main">

            <div class="container">
                <div v-if="errorFlag" style="color: black;">
                    <h1>Oops, seems the project is not currently available (ﾉ_･｡)</h1>
                </div>



                <div v-else="">
                    <div v-if="$route.params.projectId">
                        <div id="project">
                            <div class="row">


                                <div id="eachProjectTitle" class="tim-title">
                                    <h1>{{ project.title }}</h1>
                                    <h4>{{ project.subtitle }}</h4>
                                    <sma>Created {{ this.time }}</sma>
                                </div>
                                <div id="eachProjectCard" class="card">

                                    <img id="eachProject"   v-bind:src="project.imageUri">

                                    <div class="card-body">


                                        <h3>${{ project.progress.currentPledged }}<br /><small>pledged of ${{project.target}} goal</small></h3>
                                        <h3>{{ project.progress.numberOfBackers }}<br /><small>backers</small></h3>



                                        <div class="progress">
                                            <div class="progress-bar progress-bar-danger" role="progressbar"
                                                 v-bind:style=barStyle aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                                {{ this.progress }}%</div>
                                        </div>




                                        <div v-if="this.creators.id != this.$cookie.get('user_id')">
                                            <div v-if=" this.$cookie.get('user_token')">
                                                <button type="button" class="btn btn-info btn-block" data-toggle="modal"
                                                        data-target="#backProjectModal" style="width:38%">
                                                    Back this project
                                                </button>
                                            </div>

                                            <div v-else="">
                                                <button type="button" class="btn btn-info btn-block" data-toggle="modal"
                                                        data-target="#myModal" style="width:38%">
                                                    Back this project
                                                </button>
                                            </div>
                                        </div>

                                        <h5>Recent 5 pledges</h5>

                                        <table>
                                            <tr>
                                                <td><strong>Username</strong></td>
                                                <td><strong>Pledge amount</strong></td>
                                            </tr>
                                            <tr v-for="backer in this.newBackers">
                                                <td>{{ backer.username }}</td>
                                                <td>${{ backer.amount }}</td>
                                            </tr>
                                        </table>



                                    </div>


                                </div>


                                <div id="description">
                                    <h2>Description</h2>
                                    <h4>{{ project.description }}</h4>
                                </div>









                                <div v-if="this.creators.id == this.$cookie.get('user_id')">

                                    <button type="button" class="btn btn-warning btn-round" data-toggle="modal"
                                            data-target="#changeProjectImageModal">
                                        Change the image
                                    </button>


                                    <button type="button" class="btn btn-danger btn-round" data-toggle="modal"
                                            data-target="#confirmProjectModal">
                                        Close this project

                                    </button>



                                    <button type="button" class="btn btn-warning btn-round" data-toggle="modal"
                                            data-target="#updateRewardModal">
                                        Update Rewards
                                    </button>

                                </div>

                                <div v-else="">

                                    <div class="wellTitle">
                                        <h2>Rewards</h2>
                                    </div>
                                    <div class="well" v-for="(reward, index) in this.rewards">
                                        <label>{{ reward.amount }}</label>
                                        <h3>{{ reward.description }}</h3>

                                    </div>




                                </div>





                                <!--{{ project }}-->



                            </div>
                        </div>
                    </div>



                    <div v-else="">
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

                        <div id="pagination">
                            <paginate
                                    :page-count="numberOfPages"
                                    :page-range="3"
                                    :margin-pages="2"
                                    :initial-page=this.currentPage-1
                                    :force-page=this.currentPage-1
                                    :click-handler="clickCallback"
                                    :prev-text="'Prev'"
                                    :next-text="'Next'"
                                    :container-class="'pagination'"
                                    :page-class="'page-item'">
                            </paginate>
                        </div>


                    </div>
                </div>




            </div>
        </div>

    </div>

    <!--Modal Changing project image-->
    <div class="modal fade" id="changeProjectImageModal" tabindex="-1" role="dialog"
         aria-labelledby="changeProjectImageModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="changeProjectImageModalLabel">Change the project image</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label>Upload an image</label>
                            <img :src="image" class="img-rounded img-responsive"/>
                            <input type="file" @change="onFileChange" accept="image/*">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-default btn-round" data-dismiss="modal">
                        Close
                    </button>


                    <button type="button" class="btn btn-primary btn-round" data-dismiss="modal"
                            v-on:click="updateImage($route.params.projectId)">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!--Modal Update reward-->
    <div class="modal fade" id="updateRewardModal" tabindex="-1" role="dialog"
         aria-labelledby="changeProjectImageModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateRewardModalLabel">Update Reward</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <div v-for="(reward, index) in this.rewards">
                                <h5>{{index + 1}}. Rewards</h5>
                                <label>Amount</label>
                                <input v-model.number="reward.amount" class="form-control"  placeholder="">

                                <label>Description</label>
                                <textarea v-model="reward.description" class="form-control"  placeholder=""></textarea>
                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-default btn-round" data-dismiss="modal">
                        Close
                    </button>


                    <button type="button" class="btn btn-primary btn-round" data-dismiss="modal"
                            v-on:click="updateReward($route.params.projectId)">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!--Modal Confirm to close the project-->
    <div class="modal fade" id="confirmProjectModal" tabindex="-1" role="dialog"
         aria-labelledby="confirmProjectModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content panel-danger">
                <div class="modal-header panel-heading">
                    <h3 class="modal-title" id="confirmProjectModalLabel">Close the Project</h3>

                     <h4><strong>Danger!</strong>You can't re-open the project once you close it !!!.</h4>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>


                </div>
                <div class="modal-body">

                    <h4>Are you really sure that you want to close this project?</h4>

                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-primary btn-round" data-dismiss="modal">
                        No
                    </button>


                    <button type="button" class="btn btn-danger btn-round" data-dismiss="modal"
                            v-on:click="closeProject($route.params.projectId)">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!--Modal Back projects-->
    <div class="modal fade" id="backProjectModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" style="padding:35px 50px;">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4><span class="glyphicon glyphicon-edit"></span> Edit User Details</h4>
                </div>
                <div class="modal-body" style="padding:40px 50px;">
                    <form role="form">
                        <div class="form-group">
                            <label for="pledge"><span class="glyphicon glyphicon-usd"></span> Pledge Amount</label>
                            <input v-model="pledge" class="form-control" id="pledge" placeholder="">
                        </div>

                        <div class="form-group">
                            <label for="pledge"><span class="glyphicon glyphicon-credit-card"></span> Card Number</label>
                            <input  class="form-control" id="pledge" placeholder="">
                        </div>

                        <div class="form-group">
                            <label for="pledge"><span class="glyphicon glyphicon-user"></span> Name</label>
                            <input  class="form-control" id="pledge" placeholder="">
                        </div>

                        <div class="checkbox">
                            <label><input type="checkbox" id="checkbox" v-model="checked">Pledge this project anonymously? </label>
                        </div>
                    </form>
                    <button class="btn btn-success btn-block" v-on:click="pledgeProject()"><span class="glyphicon glyphicon-off"></span> Pledge this project</button>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                </div>
            </div>

        </div>
    </div>


</div>
</template>

<style>


    table {
        border-collapse: collapse;
        width: 40%;
    }

    th, td {
        padding: 3px;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }
    .wellTitle{
        clear: right;
        float: right;
        padding: 5px 120px 0px 0px;
    }
    .well {
        width: 30%;
        clear: right;
        float: right;
        margin: 5px 0px 0px 0px;

    }
    #description {
        width: 60%;
        float: left;
        padding: 30px 0px 0px 0px;

    }
    .card-body {

        padding: 10px 0px 0px 0px;
        margin: 0px 0px 0px 0px;

    }

    .progress {
        height:25px;
        width:38%;
    }

    #eachProjectTitle {
        /*padding: 1px 10px 2px 300px;*/
        /*margin: 1px 0px 2px 200px;*/
    }

    #eachProject{
        float: left;
        height: 450px;
        width: 60%;

        padding: 0px 12px 0px 0px;

    }

    #eachProjectCard {
        height: 450px;
        width: 100%;
        padding: 0px 0px 0px 0px;
        margin: 0px 0px 0px 0px;
    }



    #pagination {
        text-align: center;
    }

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

    paginate {

    }


</style>




<script>



    export default {


        data () {
            return{
                error: "",
                errorFlag: false,
                projects: [],
                image: "https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png",
                project: "",
                creators: "",
                rewards: "",
                amount: "",
                pledge: 30,
                progress: 0,
                barStyle: "",
                description: "",
                userEmail: "",
                imgType: "",
                file: "",
                checked: false,
                index: 0,
                count: parseInt(6),
                currentPage: 1,
                numberOfProjects: 0,
                numberOfPages: 0,
                backers: [],
                newBackers: [],
                anonymous: {
                    "username": "anonymous",
                    "amount": 0
                },
                backerFlag: false,
                wholeProjects: [],
                search: "",
                searchArray: [],
                navTab: true,
                time: 0,

            }
        },
        mounted: function() {


            this.getProjects(this.$route.query.page);


            this.getNumberOfProjects();


            if(this.$route.params.projectId){

                this.getSingleProject(this.$route.params.projectId);

            }


        },
        methods: {
            converTime: function(time){
                let timestamp = time;
                let temp = new Date(timestamp);
                let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                let year = temp.getFullYear();
                let month = months[temp.getMonth()];
                let date = temp.getDate();
                let hour = temp.getHours();
                let min = temp.getMinutes();
                let sec = temp.getSeconds();
                let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                let day = days[temp.getDay()];
                let result = day + ' ' + date + ', ' + month + ', ' + year + ', ' + hour + ':' + min + ':' + sec;
                return result;

            },


            pledgeProject: function() {
                console.log(this.$cookie.get('user_token'));

                this.$http.post('http://localhost:4941/api/v2/projects/' + this.$route.params.projectId + '/pledge',
                    {
                        "id": parseInt(this.$cookie.get('user_id')),
                        "amount": parseInt(this.pledge),
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

                    location.reload();
                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });

            },

            updateReward: function(projectId){


                this.$http.put('http://csse-s365.canterbury.ac.nz:4708/api/v2/projects/' + projectId + '/rewards',
                    this.rewards
                ,  {
                    headers: {
                        'X-Authorization': this.$cookie.get('user_token')
                    }
                }).then(function(response) {
                    location.reload();
                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });
            },



            clickCallback: function(pageNum) {
                this.$router.push({ path: 'projects', query: { page: pageNum }});

            },



            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);

            },

            createImage(file) {
                var image = new Image();
                var reader = new FileReader();

                reader.onload = (e) => {
                    this.image = e.target.result;
                };

                reader.readAsDataURL(file);

                this.imgType = file.type;
                this.file = file;
            },

            updateImage(projectId) {
                if (this.file === "") {
                    alert("Please upload a image !");
                } else if (this.imgType !== 'image/png' && this.imgType !== 'image/jpeg') {
                    alert("The image is supposed to be .png or .jpeg format");
                } else {
                    this.$http.put('http://csse-s365.canterbury.ac.nz:4708/api/v2/projects/' + projectId + '/image', this.file, {
                        headers: {
                            "Content-Type": this.imgType,
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
            getNumberOfProjects: function() {
                console.log("GETNUMBEROFPROJECTS");
                this.$http.get('http://csse-s365.canterbury.ac.nz:4708/api/v2/projects', {
                    params: {
                        'open': true
                    }
                }).then(function(response) {
                    this.numberOfProjects = parseInt(response.data.length);
                    this.wholeProjects = response.data;
//                    console.log(this.wholeProjects);

                    this.numberOfPages = Math.ceil(this.numberOfProjects / this.count);
                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });
            },

            getProjects: function(pageIndex) {
                console.log("GET PROJECTS");
                this.navTab = true;
                if (pageIndex === undefined){
                    pageIndex = 1;
                }
                this.currentPage = parseInt(pageIndex);
                this.index = (pageIndex - 1) * this.count;
                this.$http.get('http://csse-s365.canterbury.ac.nz:4708/api/v2/projects', {
                    params: {
                        'startIndex': this.index,
                        'count': this.count,
                        'open': true
                    }
                }).then(function(response) {

                    this.projects = response.data;
                    this.getImage();


                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });

            },

            getRecentBackers: function(backers) {
                for (var i = 0; i < backers.length; i++){

                    if (backers[i].username === 'anonymous'){
                        this.anonymous.amount = this.anonymous.amount + backers[i].amount;
                    }
                }

                for (i = 0; i < 5; i++){
                    if (backers[i] !== undefined){
                        if (backers[i].username !== 'anonymous'){
                            this.newBackers[i] = {
                                "username": backers[i].username,
                                "amount": backers[i].amount
                            }
                        } else if(this.backerFlag === false){
                            this.newBackers[i] = this.anonymous;
                            this.backerFlag = true;
                        }
                    }

                }


            },

            getRewardSorted: function(rewards) {
                for (var i = 0; i < rewards.length; i++){
                    this.rewards[i] = {
                        "amount": rewards[i].amount,
                        "description": rewards[i].description
                    };
                }
            },

            getSingleProject: function(id) {

                this.newBackers = [];
                this.backerFlag = false;
                this.anonymous =  {
                    "username": "anonymous",
                        "amount": 0
                }

                this.$http.get('http://csse-s365.canterbury.ac.nz:4708/api/v2/projects/' + id)
                    .then(function(response) {
                        this.project =  response.data;
                        this.creators = response.data.creators[0];
                        this.rewards = response.data.rewards;
                        this.target = response.data.target;
                        this.progress = Math.round((response.data.progress.currentPledged / this.target) * 100);
                        this.barStyle = "width: "+ this.progress + "%";
                        this.backers = response.data.backers;
                        this.time = this.converTime(this.project.creationDate);

                        this.project.imageUri = 'http://csse-s365.canterbury.ac.nz:4708/api/v2' + this.project.imageUri;



                        this.getRewardSorted(this.rewards);
                        if (this.backers.length > 0){
                            this.getRecentBackers(this.backers);
                        }



                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });


            },

            closeProject: function(projectId){
                this.$http.put('http://csse-s365.canterbury.ac.nz:4708/api/v2/projects/' + projectId, {
                    "open": false
                },  {
                        headers: {
                            'X-Authorization': this.$cookie.get('user_token')
                        }
                    }).then(function(response) {
                        this.$router.push('/');
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


        },
        watch: {
            '$route.query.page'(pageNum) {
                this.getProjects(pageNum)
            },

            '$route.params.projectId'(projectId) {
                if(projectId !== undefined){
                    this.getSingleProject(projectId)

                }

            }
        },
    }
</script>

<style>
</style>




