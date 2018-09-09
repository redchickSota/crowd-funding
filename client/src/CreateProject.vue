<template>
    <div>


        <div class="wrapper">

            <div class="main">

                <div class="container">

                    <div class="tim-title">
                        <h3>Start a Project</h3>

                        <div class="row">

                            <div class="col-lg-4 offset-lg-4 col-sm-6 offset-sm-3">
                                <div class="card card-register">

                                    <div v-if="errorFlag" style="color: red;">
                                        {{ error }}
                                    </div>


                                    <form class="register-form">

                                        <label>Upload an image</label>
                                        <img :src="image" class="img-rounded img-responsive">

                                        <input type="file" @change="onFileChange" accept="image/*">

                                        <label>Title</label>
                                        <input v-model="title" class="form-control"  placeholder="Title">

                                        <label>Subtitle</label>
                                        <input v-model="subtitle" class="form-control"  placeholder="Subtitle">

                                        <label>Description</label>
                                        <input v-model="projectDescription" class="form-control"  placeholder="Description">

                                        <label>Target</label>
                                        <input v-model.number="target" class="form-control"  placeholder="Target">

                                        <!--<label>Rewards</label>-->
                                        <!--<input v-model="rewardsAmount" class="form-control"  placeholder="amount">-->

                                        <!--<label>Description</label>-->
                                        <!--<input v-model="rewardsDescription" class="form-control"  placeholder="description">-->

                                        <div v-for="(row, index) in rows">

                                            <label>{{index + 1}}. Rewards</label>
                                            <input class="form-control" v-model.number="row.amount" placeholder="amount">
                                            <label>{{index + 1}}. Description</label>
                                            <input class="form-control" v-model="row.description" placeholder="description">

                                            <div v-if="index > 0">
                                                <a v-on:click="removeElement(index);" style="cursor: pointer">Remove</a>
                                            </div>



                                        </div>

                                    </form>


                                    <button class="btn btn-primary btn-block btn-round" v-on:click="addRow()">+ Add a new reward</button>

                                    <button class="btn btn-danger btn-block btn-round" v-on:click="createProject()">Create</button>



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
                title: "",
                subtitle: "",
                projectDescription: "",
                target: 0,
                rewardsAmount: [],
                rewardsDescription: "",
                file: "",
                projectId: "",
                imgType: "",
                image: "https://www.beddingwarehouse.com.au/wp-content/uploads/2016/01/placeholder-featured-image-600x600.png",
                SampleNum: 0,

                rows: [{
                    amount: 0,
                    description: "",
                }],

            }
        },

        methods: {

            addRow: function() {
//                var elem = document.createElement('tr');
                this.rows.push({
                    amount: "",
                    description: "",
                });

                console.log(this.rows);
            },

            removeElement: function(index) {
                this.rows.splice(index, 1);
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
                this.file= file;

            },

            createProject: function() {
                console.log(this.rows);
                if (this.title === "") {
                    alert("Please enter a title !");
                } else if (this.file === "") {
                    alert("Please upload a image !");
                } else if (this.imgType !== 'image/png' && this.imgType !== 'image/jpeg') {
                    alert("The image is supposed to be .png or .jpeg format");
                } else if (this.target < 1){
                    alert("Target should be valid amount !");
                } else if (this.target === ''){
                    alert("Target should be valid integer !");
                } else {
                    this.$http.post('http://csse-s365.canterbury.ac.nz:4708/api/v2/projects', {
                        "title": this.title,
                        "subtitle": this.subtitle,
                        "description": this.projectDescription,
                        "target": this.target,
                        "creators": [
                            {
                                "id": parseInt(this.$cookie.get('user_id'))
                            }
                        ],
                        "rewards": this.rows
                    }, {
                        headers: {
                            'X-Authorization': this.$cookie.get('user_token')
                        }
                    }).then(function(response) {
                        this.projectId = response.data.id;

                        this.$http.put('http://csse-s365.canterbury.ac.nz:4708/api/v2/projects/' + this.projectId + '/image', this.file, {
                            headers: {
                                "Content-Type": this.imgType,
                                'X-Authorization': this.$cookie.get('user_token')
                            }
                        }).then(function(response) {
                            this.$router.push('/');
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