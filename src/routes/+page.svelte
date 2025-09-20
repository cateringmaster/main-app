<script lang="ts">
  import { goto } from '$app/navigation';
  import Loader from '$lib/components/loader.svelte';
</script>

<svelte:head>
  <title>Startseite</title>
  <meta name="description" content="Das ist die Startseite..."/>
</svelte:head>

<div class="inner-box">
<article class="p-16">
  <h1>Welcome to SvelteKit</h1>
  <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, quod. Inventore, excepturi quis accusantium consequatur doloremque omnis quos et
    voluptatem animi, libero maiores aut est? Ipsum optio quisquam unde tenetur!
  </p>
    <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, quod. Inventore, excepturi quis accusantium consequatur doloremque omnis quos et
    voluptatem animi, libero maiores aut est? Ipsum optio quisquam unde tenetur!
  </p>
    <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, quod. Inventore, excepturi quis accusantium consequatur doloremque omnis quos et
    voluptatem animi, libero maiores aut est? Ipsum optio quisquam unde tenetur!
  </p>
    <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, quod. Inventore, excepturi quis accusantium consequatur doloremque omnis quos et
    voluptatem animi, libero maiores aut est? Ipsum optio quisquam unde tenetur!
  </p>

  <div class="w-full h-36 flex items-center justify-center">
    <Loader></Loader>
  </div>
</article>
</div>


<style lang="postcss">
  @reference '../app.css';
</style>
