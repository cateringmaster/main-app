<script lang="ts">
  import { goto } from '$app/navigation';

  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
</script>

<footer>
  <div class="inner-box">
    <h1>FOOTER ...</h1>
  </div>
</footer>

<style lang="postcss">
  @reference '../../app.css';
  footer {
    @apply w-full h-32 bg-base-100;
  }
</style>
