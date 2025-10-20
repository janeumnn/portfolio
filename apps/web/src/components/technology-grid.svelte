<script lang="ts">
  import type { Technology } from '$/content/schemas/technology';
  import type { EventHandler } from 'svelte/elements';
  import cn from '$/utils/cn';
  import { useDebounce, useIntersectionObserver, watch } from 'runed';
  import { cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import TypeWriter from 'typewriter-effect/dist/core';

  type DataKey = Technology['type'];
  type DataValue = Technology[];

  interface Props {
    data: { [key in DataKey]: DataValue };
  }

  let { data }: Props = $props();

  let gridItems = $state(Object.values(data).map(([firstValue]) => firstValue));
  let highlightItem: DataValue[0] | undefined = $state();
  let hightlightColor = $state('');
  const defaultHighlight = 'whatever the stack';

  const pointerLeaveDebouncer = useDebounce(() => {
    highlightItem = undefined;
  }, 50);

  const pointerUpDebouncer = useDebounce(() => {
    highlightItem = undefined;
  }, 2000);

  function handlePointerUp(
    event: Parameters<EventHandler<PointerEvent, HTMLButtonElement>>[0],
    value: DataValue[0],
    positionIndex: number
  ) {
    event.preventDefault();

    if (event.pointerType !== 'mouse') {
      if (pointerUpDebouncer.pending) pointerUpDebouncer.cancel();
      pointerUpDebouncer().catch(() => {});
    }

    const stack = data[value.type] || [];

    const currentIndex = stack.findIndex((t) => t.id === value.id);

    if (stack.every(({ id }) => id !== highlightItem?.id)) {
      highlightItem = gridItems[positionIndex];
      return;
    }

    const nextItem = stack[(currentIndex + 1) % stack.length];
    gridItems[positionIndex] = nextItem;
    highlightItem = nextItem;
  }

  function handlePointerEnter(
    event: Parameters<EventHandler<PointerEvent, HTMLButtonElement>>[0],
    value: DataValue[0]
  ) {
    event.preventDefault();
    if (event.pointerType === 'mouse') highlightItem = value;
  }

  function handlePointerLeave(event: Parameters<EventHandler<PointerEvent, HTMLButtonElement>>[0]) {
    if (event.pointerType === 'mouse') pointerLeaveDebouncer().catch(() => {});
  }

  watch(
    () => highlightItem,
    (curr, prev) => {
      if (pointerLeaveDebouncer.pending && prev?.id && curr?.id) {
        pointerLeaveDebouncer.cancel();
      }
    },
    { lazy: true }
  );

  function typeWriterAction(node: HTMLSpanElement) {
    let typeWriter: TypeWriter = new TypeWriter(node, {
      delay: 90,
      wrapperClassName: '',
      cursorClassName: ''
    });

    let initTypeWrite = $state(false);

    const observer = useIntersectionObserver(
      () => node,
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!initTypeWrite && entry.isIntersecting) {
          typeWriter.typeString(defaultHighlight).start();
          initTypeWrite = true;
        }
      }
    );

    $effect(() => {
      if (initTypeWrite) observer.stop();
    });

    watch(
      () => highlightItem,
      (curr) => {
        if (typeWriter) typeWriter.stop();
        if (curr) {
          typeWriter = new TypeWriter(node, {
            delay: 90,
            wrapperClassName: '',
            cursorClassName: ''
          })
            .callFunction(() => (hightlightColor = curr.textColor))
            .typeString(curr.id)
            .start();
        } else {
          typeWriter
            .deleteAll()
            .callFunction(() => (hightlightColor = ''))
            .typeString(defaultHighlight)
            .start();
        }
      },
      { lazy: true }
    );
  }
</script>

<div class="grid grid-cols-6">
  <div
    class="relative col-span-6 flex rounded-sm py-4 @md/main:col-span-3 @md/main:row-span-2 @md/main:py-0">
    <span class="absolute top-0 left-0 h-6 w-6 rounded-tl-sm border-t border-l border-accent">
    </span>
    <span
      class="absolute top-0 right-0 h-6 w-6 rounded-tr-sm border-t border-r border-accent @md/main:hidden">
    </span>
    <span
      class="absolute bottom-0 left-0 hidden h-6 w-6 rounded-bl-sm border-b border-l border-accent @md/main:block">
    </span>
    <div
      class="size-full content-center text-center text-sm/loose font-black @2xs/main:text-base/loose @xs/main:text-lg/loose @md/main:text-base/loose @lg/main:text-lg/loose @xl/main:text-xl/loose">
      <span>I build with</span>
      <br />
      <span class={cn(['inline-block', hightlightColor])} use:typeWriterAction>
        <span class="hidden">{defaultHighlight}</span>
      </span>
    </div>
  </div>
  <div class="col-span-6 grid grid-cols-3 gap-2 @md/main:col-span-3">
    {#each gridItems as value, idx (idx)}
      <div class="flex aspect-4/3 items-center justify-center">
        <button
          onpointerup={(e) => handlePointerUp(e, value, idx)}
          onpointerenter={(e) => handlePointerEnter(e, value)}
          onpointerleave={(e) => handlePointerLeave(e)}
          class={cn([
            'btn size-full rounded-sm btn-outline btn-accent',
            { 'cursor-auto': data[value.type].length <= 1 }
          ])}>
          {#key value.icon}
            <span
              in:fade={{ delay: 50, easing: cubicOut }}
              class={cn([
                'size-6 @2xs/main:size-7 @xs/main:size-8 @sm/main:size-10 @md/main:size-7 @lg/main:size-8 @xl/main:size-10',
                value.icon
              ])}>
            </span>
          {/key}
        </button>
      </div>
    {/each}
  </div>
</div>
