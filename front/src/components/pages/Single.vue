<template>

<div>
  <section class="bg-gray-100 py-8">
  <div class="container">
      <div class="flex flex-col sm:flex-row gap-4">
      <div class="sm:flex-1"><img :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url"></div>
      <div class="flex flex-col justify-center items-center sm:flex-1">
      <h1>{{ post.title.rendered }}</h1>
      <div>
        sd
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
      <div>
        <h4 class="w-36 text-2xl mb-4 pb-2 border-gray-200 border-b-4 ">Comments</h4>
        <ul>
          <li v-html="comment.content.rendered" v-for="comment in comments" :key="comment.id">
          </li>
        </ul>
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
