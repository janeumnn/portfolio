<script lang="ts">
  import cn from '$/utils/cn';
  import { useDebounce, useEventListener } from 'runed';
  import { fly, scale } from 'svelte/transition';

  let isMinimized = $state(false);

  const maximizeTimeout = useDebounce(() => {
    isMinimized = false;
  }, 5000);

  useEventListener(
    () => window,
    'scroll',
    () => {
      const isAtBottom =
        window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 2;

      if (isAtBottom) {
        if (maximizeTimeout.pending) maximizeTimeout.cancel();
        isMinimized = false;
      } else {
        isMinimized = true;
        if (maximizeTimeout.pending) maximizeTimeout.cancel();
        maximizeTimeout().catch(() => {});
      }
    }
  );

  function toggleColorTheme() {
    const theme =
      document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>

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
  {@const onclick = () => {
    if (maximizeTimeout.pending) maximizeTimeout.cancel();
    isMinimized = false;
  }}
  <div
    class="flex h-full items-center justify-center p-4"
    in:fly={{ y: -20, duration: 300, delay: 300 }}
    out:fly={{ y: -20, duration: 300 }}>
    <button {onclick} class="btn btn-ghost btn-md">
      <svg
        viewBox="0 0 32 32"
        class="h-8 w-8"
        fill="currentColor"
        in:scale={{ duration: 300, delay: 300 }}
        out:scale={{ duration: 300 }}>
        <circle cx="16" cy="16" r="13" class="fill-current" />
        <text
          x="50%"
          y="54%"
          dominant-baseline="middle"
          text-anchor="middle"
          class="fill-neutral-content text-lg font-bold">
          N
        </text>
      </svg>
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
