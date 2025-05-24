<script lang="ts">
  import cn from '$/utils/cn';
  import { useEventListener } from 'runed';
  import { fly, scale } from 'svelte/transition';

  let isMinimized = $state(false);

  useEventListener(
    () => window,
    'scroll',
    () => {
      const isAtBottom =
        window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 2;

      if (isAtBottom) {
        isMinimized = false;
      } else {
        isMinimized = true;
      }
    }
  );

  function toggleColorTheme() {
    const theme =
      document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>

{#snippet icon()}
  <svg class="size-7" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path class="fill-primary" d="M100,50A50,50 0 1,1 50,0A50,50 0 0,1 100,50Z" />
    <path
      class="fill-primary-content"
      d="M42.4,71.36v-27.6c0-4.48,4.08-6.72,8.32-6.72c4.88,0,6.88,3.04,6.88,8.96v25.36h10.24v-26.4
      c0-10.4-4.8-16.32-13.36-16.32c-6.48,0-10,3.44-11.68,7.92h-0.4v-6.96H32.08v41.76H42.4z" />
  </svg>
{/snippet}

{#snippet maximized()}
  <div
    class="flex h-full"
    in:fly={{ y: 20, duration: 300, delay: 300 }}
    out:fly={{ y: 20, duration: 300 }}>
    <div class="flex flex-grow-2 items-center p-4">
      <a role="button" class="btn btn-square btn-ghost btn-md" href="/" aria-label="Home">
        <span
          class="icon-[ri--home-4-line] h-full w-6"
          in:scale={{ duration: 300, delay: 500 }}
          out:scale={{ duration: 300 }}>
        </span>
      </a>
    </div>
    <div class="divider m-0 divider-horizontal max-w-0.5 py-2"></div>
    <div class="flex shrink-1 items-center p-2">
      <label class="btn btn-square btn-ghost btn-md">
        <input hidden type="checkbox" onchange={toggleColorTheme} />
        <span
          class="icon-[ri--moon-line] h-6 w-6 dark:icon-[ri--sun-line] dark:h-6 dark:w-6"
          in:scale={{ duration: 300, delay: 500 }}
          out:scale={{ duration: 300 }}>
        </span>
      </label>
    </div>
  </div>
{/snippet}

{#snippet minimized()}
  {@const onclick = () => (isMinimized = false)}
  <div
    class="flex h-full items-center justify-center p-4"
    in:fly={{ y: -20, duration: 300, delay: 300 }}
    out:fly={{ y: -20, duration: 300 }}>
    <button {onclick} class="btn btn-square btn-ghost btn-md" aria-label="Expand menu">
      {@render icon()}
    </button>
  </div>
{/snippet}

<header
  class={cn(
    'fixed right-0 bottom-4 left-0 z-10 mx-auto h-14 transition-all duration-300 ease-in-out',
    isMinimized ? 'w-14' : 'w-2xs px-6 sm:w-xs md:w-sm'
  )}>
  <div class="h-full w-full rounded-box bg-base-300 shadow-md outline outline-neutral/5">
    {#if !isMinimized}
      {@render maximized()}
    {:else}
      {@render minimized()}
    {/if}
  </div>
</header>
