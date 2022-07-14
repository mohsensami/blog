<template>
<div>
  <section class="bg-gray-100 py-8">
  <div class="container">
      <div class="flex flex-col sm:flex-row gap-4">
            <div class="sm:flex-1"><img :src="page._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url"></div>
      <div class="flex flex-col justify-center items-center sm:flex-1">
      <h1>{{ page.title.rendered }}</h1>
      <div v-html="page.excerpt.rendered"></div>
      <div>
        <ul>
          <li class="flex">Author: <a href="#"></a>  </li>
          <li>Date: {{ page.date }}</li>
          <li>Modified: {{ page.modified }}</li>
          <li>Categories: </li>
        </ul>
      </div>
      </div>
  </div>
  </div>
  </section>

  <section>
    <div class="container">
      <div class="py-6" v-html="page.content.rendered"></div>
    </div>
  </section>


</div>


</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const page = ref([])
    function getPage() {
      fetch("https://webgaran.ir/wp-json/wp/v2/pages/26?_embed")
        .then(async (response) => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          page.value = data;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    }
    getPage();
    return { page }
  }
}
</script>

<style>

</style>