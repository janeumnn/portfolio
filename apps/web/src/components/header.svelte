<script lang="ts">
  import cn from '$/utils/cn';
  import { fade } from 'svelte/transition';

  let isMinimized = $state(true);

  function toggleColorTheme() {
    const theme =
      document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>

{#snippet icon()}
  {#if isMinimized}
    <svg
      class="size-7"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      in:fade={{ duration: 500, delay: 250 }}>
      <path class="fill-primary" d="M100,50A50,50 0 1,1 50,0A50,50 0 0,1 100,50Z" />
      <path
        class="fill-primary-content"
        d="M42.4,71.36v-27.6c0-4.48,4.08-6.72,8.32-6.72c4.88,0,6.88,3.04,6.88,8.96v25.36h10.24v-26.4
        c0-10.4-4.8-16.32-13.36-16.32c-6.48,0-10,3.44-11.68,7.92h-0.4v-6.96H32.08v41.76H42.4z" />
    </svg>
  {:else}
    <span class="icon-[ri--circle-line] size-6" in:fade={{ duration: 500, delay: 250 }}></span>
  {/if}
{/snippet}

<header
  class={cn(
    'fixed right-0 bottom-8 left-0 z-10 mx-auto h-14 transition-all duration-500 ease-in-out',
    { 'w-14': isMinimized, 'w-2xs px-6 sm:w-xs md:w-sm': !isMinimized }
  )}>
  <div class="relative h-full w-full rounded-box bg-base-300 shadow-md outline outline-neutral/5">
    <div class="flex h-full items-center justify-center p-4">
      <a
        role="button"
        class={cn('btn absolute left-4 btn-square btn-ghost btn-md', {
          'opacity-100 transition-opacity delay-500 duration-500 ease-in-out': !isMinimized,
          'pointer-events-none opacity-0': isMinimized
        })}
        href="/"
        aria-label="Home">
        <span class="icon-[ri--home-4-line] h-full w-6"></span>
      </a>
      <button
        onclick={() => (isMinimized = !isMinimized)}
        class="btn btn-square btn-ghost btn-md"
        aria-label="Expand menu">
        {@render icon()}
      </button>
      <label
        class={cn('btn absolute right-4 btn-square btn-ghost btn-md', {
          'opacity-100 transition-opacity delay-500 duration-500 ease-in-out': !isMinimized,
          'pointer-events-none opacity-0': isMinimized
        })}>
        <input hidden type="checkbox" onchange={toggleColorTheme} />
        <span class="icon-[ri--moon-line] h-6 w-6 dark:icon-[ri--sun-line] dark:h-6 dark:w-6">
        </span>
      </label>
    </div>
  </div>
</header>
