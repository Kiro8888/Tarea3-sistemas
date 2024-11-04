import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";

import BookIndex from "./components/BookIndex.vue";
import BookDetails from "./components/BookDetails.vue";

import AuthorIndex from "./components/AuthorIndex.vue";
import AuthorDetails from "./components/AuthorDetails.vue";

import PublisherIndex from "./components/PublisherIndex.vue";
import PublisherDetails from "./components/PublisherDetails.vue";

import Login from "./components/Login.vue";
import { getSession } from '../src/auth';
const routes = [
  { path: "/", component: Home },
	
  //books
  { path: "/book", component: BookIndex, meta: { requiresAuth: true } },
  { path: "/book/show/:id", 
    component: BookDetails, props: {show:true} },
  { path: "/book/edit/:id", 
    component: BookDetails, props: {edit:true} },
  { path: "/book/create", 
    component: BookDetails, props: {create:true} },
  { path: "/book/delete/:id", 
    component: BookDetails, props: {delete:true} },


    //authors
    { path: "/author", component: AuthorIndex, meta: { requiresAuth: true } },
    { path: "/author/show/:id", 
      component: AuthorDetails, props: {show:true} },
    { path: "/author/edit/:id", 
      component: AuthorDetails, props: {edit:true} },
    { path: "/author/create", 
      component: AuthorDetails, props: {create:true} },
    { path: "/author/delete/:id", 
      component: AuthorDetails, props: {delete:true} },


    //publishers
    { path: "/publisher", component: PublisherIndex, meta: { requiresAuth: true } },
    { path: "/publisher/show/:id", 
      component: PublisherDetails, props: {show:true} },
    { path: "/publisher/edit/:id", 
      component: PublisherDetails, props: {edit:true} },
    { path: "/publisher/create", 
      component: PublisherDetails, props: {create:true} },
    { path: "/publisher/delete/:id", 
      component: PublisherDetails, props: {delete:true} },



      { path: "/login", component: Login },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = getSession(); 

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); 
  } else {
    next(); 
  }
});



export default router;