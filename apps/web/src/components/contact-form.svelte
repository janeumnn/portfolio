<script lang="ts">
  import type { SubmitHandler } from '@formisch/svelte';
  import type { ApiError } from '@portfolio/api/client';
  import { createForm, Field, Form, reset, setInput } from '@formisch/svelte';
  import { client } from '@portfolio/api/client';
  import { tryCatch } from '@portfolio/utils';
  import cn from '$/utils/cn';
  import { CF_TURNSTILE_SITE_KEY } from 'astro:env/client';
  import { toast } from 'svelte-sonner';
  import { Turnstile } from 'svelte-turnstile';
  import * as v from 'valibot';

  const verificationSchema = CF_TURNSTILE_SITE_KEY
    ? v.pipe(
        v.string('Verification is required'),
        v.check(
          (input) => input !== 'error' && input !== 'expired',
          'Verification is invalid or has expired.'
        )
      )
    : v.optional(v.string());

  const schema = v.object({
    name: v.pipe(v.string('Name is required'), v.trim()),
    email: v.pipe(v.string('Email is required'), v.trim(), v.email('Email address is not valid')),
    message: v.pipe(v.string('Message is required'), v.trim()),
    verification: verificationSchema
  });

  const form = createForm({ schema });
  let resetVerification = $state<() => void>();

  const handleSubmit: SubmitHandler<typeof schema> = async (values) => {
    const [, error] = await tryCatch(
      client.parse(client.fetch.api.contact.$post({ form: values }))
    );

    if (error) {
      toast.error(`Server says: ${(error as ApiError).detail?.data || 'Error'} :(`);
      reset(form, { keepInput: true });
      resetVerification?.();
      return;
    }

    toast.success('Successfully sent message :)');
    reset(form);
    resetVerification?.();
  };
</script>

<Form
  of={form}
  onsubmit={handleSubmit}
  id="contact-form"
  autocomplete="off"
  class="flex w-full max-w-lg flex-col gap-4">
  <div class="flex flex-col gap-4 @md/main:flex-row">
    <Field of={form} path={['name']}>
      {#snippet children(field)}
        <div class="group w-full">
          <label
            class={cn('input flex w-full items-center gap-2', { 'input-error': !!field.errors })}>
            <span class="icon-[ri--user-line] w-5"></span>
            <input {...field.props} value={field.input} type="text" placeholder="Your Name" />
          </label>
          {#if field.errors}
            <em class="mt-1 ml-1 text-xs text-error">{field.errors[0]}</em>
          {/if}
        </div>
      {/snippet}
    </Field>

    <Field of={form} path={['email']}>
      {#snippet children(field)}
        <div class="group w-full">
          <label
            class={cn('input flex w-full items-center gap-2', { 'input-error': !!field.errors })}>
            <span class="icon-[ri--mail-line] w-5"></span>
            <input {...field.props} value={field.input} type="email" placeholder="Your Email" />
          </label>
          {#if field.errors}
            <em class="mt-1 ml-1 text-xs text-error">{field.errors[0]}</em>
          {/if}
        </div>
      {/snippet}
    </Field>
  </div>

  <Field of={form} path={['message']}>
    {#snippet children(field)}
      <div class="group w-full">
        <label>
          <!-- prettier-ignore -->
          <textarea
            {...field.props}
            value={field.input}
            placeholder="Say hello..."
            class={cn('textarea w-full', { 'textarea-error': !!field.errors })}></textarea>
        </label>
        {#if field.errors}
          <em class="mt-1 ml-1 text-xs text-error">{field.errors[0]}</em>
        {/if}
      </div>
    {/snippet}
  </Field>

  <Field of={form} path={['verification']}>
    {#snippet children(field)}
      <div class="flex w-full flex-col items-center gap-4">
        {#if CF_TURNSTILE_SITE_KEY}
          <div class="w-full">
            <Turnstile
              siteKey={CF_TURNSTILE_SITE_KEY}
              size="flexible"
              bind:reset={resetVerification}
              on:callback={(e) => setInput(form, { path: ['verification'], input: e.detail.token })}
              on:error={() => setInput(form, { path: ['verification'], input: 'error' })}
              on:expired={() => setInput(form, { path: ['verification'], input: 'expired' })} />
          </div>
        {/if}

        <button type="submit" class="btn w-40 btn-primary" disabled={form.isSubmitting}>
          {#if form.isSubmitting}
            <span class="loading loading-sm loading-dots"></span>
          {:else}
            Send
          {/if}
        </button>

        {#if field.errors}
          <em class="text-center text-xs text-error">{field.errors[0]}</em>
        {/if}
      </div>
    {/snippet}
  </Field>
</Form>
