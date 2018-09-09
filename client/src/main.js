import Vue from 'vue';

import App from './App.vue';
import Home from './Home.vue';
import Projects from './Projects.vue';
import Logging from './Logging.vue';
import SignUp from './SignUp.vue';
import EditUser from './EditUser.vue';
import CreateProject from './CreateProject.vue';
import Pledge from './Pledge.vue';
import CreateView from './CreateView.vue';
import BackView from './BackView.vue';
import Search from './Search.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);



const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/users/login",
        name: "login",
        component: Logging
    },
    {
        path: "/users/logout",
        name: "logout",
        component: Logging
    },
    {
        path: "/users/edit",
        name: "edit",
        component: EditUser
    },
    {
        path: "/users",
        name: "singup",
        component: SignUp
    },
    {
        path: "/pledge/:projectId/:pledge",
        name: "pledge",
        component: Pledge
    },
    {
        path: "/projects/:projectId",
        name: "project",
        component: Projects
    },
    {
        path: "/projects?page=/:pageNum",
        name: "pageProject",
        component: Projects
    },
    {
        path: "/projects",
        name: "eachProject",
        component: Projects
    },
    {
        path: "/projects",
        name: "projects",
        component: Projects
    },
    {
        path: "/createProject",
        name: "createProject",
        component: CreateProject
    },
    {
        path: "/createView",
        name: "creator",
        component: CreateView
    },
    {
        path: "/backView",
        name: "backer",
        component: BackView
    },
    {
        path: "/searchResult",
        name: "search",
        component: Search
    },


];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});


new Vue({
    el: '#app',
    router: router,
    render: h => h(App),

});



