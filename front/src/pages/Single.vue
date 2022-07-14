<template>

<div>
  <section class="bg-gray-100 py-8">
  <div class="container">
      <div class="flex flex-col sm:flex-row gap-4">
      <div class="sm:flex-1"><img :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url"></div>
      <div class="flex flex-col justify-center items-center sm:flex-1">
      <h1>{{ post.title.rendered }}</h1>
      <div v-html="post.excerpt.rendered"></div>
      <div>
        <ul>
          <li class="flex">Author: <a href="#"><img src="https://secure.gravatar.com/avatar/aa62f9c0e010ceb4a81608f9f3cdc6e1?s=24&d=mm&r=g" ><span>{{ post._embedded['author'][0].name }}</span></a>  </li>
          <li>Date: {{ post.date }}</li>
          <li>Modified: {{ post.modified }}</li>
          <li>Categories: {{ post._embedded['wp:term'][0][0].name }}</li>
        </ul>
      </div>
      </div>
  </div>
  </div>
  </section>

  <section>
    <div class="container">
      <div class="py-6" v-html="post.content.rendered"></div>
    </div>
  </section>

  <section class="bg-gray-100 py-8">
    <div class="container">
      <div v-if="post.comment_status == 'open'">
          <h4 class="w-40 text-2xl mb-4 pb-2 border-gray-200 border-b-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            Comments
          </h4>
        <div v-if="comments.length > 0">
          <ul>
            <li v-html="comment.content.rendered" v-for="comment in comments" :key="comment.id"></li>
          </ul>
        </div>
        <div v-else>
          <p>No comments yet</p>
        </div>
      </div>
      <div v-else>
        <p>Comments are closed</p>
      </div>
    </div>
    
  </section>
</div>


</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const post = ref({});
    const comments = ref({});
    const loading = ref(true);
    const route = useRoute();

    function getPost() {
        fetch(`https://webgaran.ir/wp-json/wp/v2/posts/${route.params.id}?_embed`)
        .then(async (response) => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          post.value = data;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });

    }

    function getComments() {
        fetch(`https://webgaran.ir/wp-json/wp/v2/comments?post=${route.params.id}`)
        .then(async (response) => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          comments.value = data;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });

    }

    getComments();

    getPost();

    return { post, comments, loading, route };
  },
};
</script>

<style>
</style>
