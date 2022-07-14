<template>
  <div class="">
    <section class="bg-gray-100 py-8">
    <div class="container">
      <div class="flex flex-col sm:flex-row gap-4">
      <div class="sm:flex-1"><img class="ring-blue-100 ring-offset-2 ring-2" src="https://via.placeholder.com/600x400.jpeg"></div>
      <div class="flex flex-col justify-center items-center sm:flex-1">
        <h3>Title for article</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi expedita molestiae id excepturi, quidem obcaecati, delectus ad corporis error voluptatem, saepe at officia soluta? Eligendi tempora excepturi impedit soluta adipisci.</p>
      </div>
    </div>
    </div>
  </section> 
  <section class="py-8">
    <div class="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="post in posts" :key="post.id" class="bg-gray-100">
        <div class="h-64 sm:h-40 overflow-hidden">
          <img :alt="post.title.rendered" class="w-full" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url">
        </div>
        <div class="py-2 px-4">
          <h3>
            <router-link :to="{ name: 'postId', params: { id: post.id } }" :title="post.title.rendered">
            {{ post.title.rendered }}
            </router-link>
          </h3>
          <div v-html="post.excerpt.rendered"></div>
        </div>
      </div>
      
    </div>
  </section>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const posts = ref([])
    function getPosts() {
      fetch("https://webgaran.ir/wp-json/wp/v2/posts?_embed")
        .then(async (response) => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          posts.value = data;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    }
    getPosts();
    return {posts, getPosts}
  }
}
</script>

<style>

</style>