<template>
<div>
  <section class="bg-gray-100 py-8">
  <div class="container">
      <div class="flex flex-col sm:flex-row gap-4">
            <div class="sm:flex-1"><img :src="page._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url"></div>
      <div class="flex flex-col justify-center items-center sm:flex-1">
      <h1 class="mb-2">{{ page.title.rendered }}</h1>
      <!-- <div v-html="page.excerpt.rendered"></div> -->
      <div>
        <form @submit.prevent="validate" method="POST">
            <input v-model.lazy.trim="form.name" class="placeholder-gray-500 px-2 mb-2 w-full border" type="text" placeholder="Name">
            <div class="form-text text-danger">
              {{ form.titleErrorText }}
            </div>
            <input class="placeholder-gray-500 px-2 mb-2 w-full border" type="email" placeholder="emile">
            <textarea v-model="form.content" class="w-full px-2" placeholder="Message"></textarea>
            <div class="form-text text-danger">
              {{ form.bodyErrorText }}
            </div>
            <button class="bg-gray-700 text-white px-4 cursor-pointer" type="submit">
              <svg v-if="loading" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              Send
            </button>
        </form>
      </div>
      </div>
  </div>
  </div>
  </section>




</div>


</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const form = reactive({
      title: "",
      titleErrorText: "",
      body: "",
      bodyErrorText: "",
    });
    const loading = ref(false);

    function validate() {
      if (form.name === "") {
        form.titleErrorText = "Title is required";
      } else {
        form.titleErrorText = "";
      }
      if (form.content === "") {
        form.bodyErrorText = "Body is required";
      } else {
        form.bodyErrorText = "";
      }

      if (form.name !== "" && form.content !== "") {
        loading.value = true;
        sendMsg();
      }
    }

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

    function sendMsg() {
      (async () => {
      const rawResponse = await fetch('http://webgaran.ir/wp-json/api/v1/contacts/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: form.name, content: form.content})
      });
      const content = await rawResponse.json();

      console.log(content);
      loading.value = false;
      })();
    }

    return { page, form, loading, validate }
  }
}
</script>

<style>

</style>