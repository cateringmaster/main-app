<script lang="ts">
  import { user, isAuthenticated, userroles } from '$store/sharedStates.svelte';
  import auth from '$services/auth-service';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import type { User } from '$interfaces/user.interface';

  let mobileNavOpen = $state(false);
  let isAuth = $derived(isAuthenticated.get());
  let currentUser = $derived(user.get()) as User;
  let currentUserRoles = $derived(userroles.get());
  let inProgress = $state(false);

  async function login() {
    inProgress = true;
    const auth0Client = await auth.createClient();
    await auth.loginWithPopup(auth0Client);
    inProgress = false;
  }

  async function logout() {
    inProgress = true;
    const auth0Client = await auth.createClient();
    await auth.logout(auth0Client);
    inProgress = false;
  }
</script>

<header class:loggedin={isAuth}>
  {#if isAuth}
    <div class="logged-in-header">
      <div class="inner-box flex items-center justify-between">
        <p>Herzlich Willkommen</p>
        <button
          class="text-link-button white-link"
          onclick={() => {
            logout();
          }}>Logout</button
        >
      </div>
    </div>
  {/if}
  <div class="inner-box">
    <h1>HEADER {isAuth}</h1>

          {#if !isAuth}
        <button
          class="btn-outline-header"
          onclick={() => {
            login();
          }}
          ><div class="button-inner">
            <span>Anmelden</span>
          </div></button
        >
      {/if}

  </div>
</header>

<style lang="postcss">

  @reference '../../app.css';

  .logged-in-header {
    @apply bg-black w-full py-1.5;
    .inner-box {
      @apply m-auto flex h-full w-full max-w-7xl items-center justify-between px-4;
      p {
        @apply text-neutral-content text-base;
      }
    }
  }

  header {
    @apply sticky top-0 z-20 bg-base-100;
    &.loggedin {
      @apply h-28;
      .inner-box {
        @apply h-auto;
      }
    }

    .inner-box {
      @apply m-auto flex h-full w-full max-w-7xl items-center justify-between px-4;
    }
  }

</style>
