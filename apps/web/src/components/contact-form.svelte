<script lang="ts">
  import type { InferInput } from 'valibot';
  import cn from '$/utils/cn';
  import { toast } from 'svelte-sonner';
  import * as v from 'valibot';

  const schema = v.object({
    name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
    email: v.pipe(
      v.string(),
      v.minLength(1, 'Email is required'),
      v.email('Please enter a valid email address')
    ),
    message: v.pipe(v.string(), v.minLength(1, 'Message is required'))
  });

  type FormSchema = InferInput<typeof schema>;
  type FormKey = keyof FormSchema;

  let formData = $state<FormSchema>({ name: '', email: '', message: '' });
  let touched = $state<Partial<Record<FormKey, boolean>>>({});
  let errors = $state<Partial<Record<FormKey, [string, ...string[]]>>>({});

  function validate() {
    const result = v.safeParse(schema, formData);

    if (result.success) {
      errors = {};
      return true;
    }

    errors = v.flatten<typeof schema>(result.issues).nested || {};
    return false;
  }

  function getFieldError(field: FormKey): string | undefined {
    return touched[field] ? errors[field]?.[0] : undefined;
  }

  function handleBlur(field: FormKey) {
    touched[field] = true;
    validate();
  }

  function handleInput(field: FormKey) {
    // only re-validate on keystroke if already visited
    // and field currently has an error
    if (touched[field] && errors[field]) {
      validate();
    }
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    // mark all as touched so errors appear
    const keys = Object.keys(formData) as FormKey[];
    keys.forEach((k) => (touched[k] = true));

    if (validate()) {
      toast.success('Successfully sent message :)');
    } else {
      const firstErrorKey = keys.find((k) => errors[k]);
      if (firstErrorKey) {
        document.getElementsByName(firstErrorKey)[0]?.focus();
      }
    }
  }
</script>

{#snippet fieldError(field: FormKey)}
  {@const error = getFieldError(field)}
  {#if error}
    <em id="{field}-error" class="mt-1 ml-1 text-xs text-error">
      {error}
    </em>
  {/if}
{/snippet}

<form
  id="contact-form"
  class="flex w-full max-w-lg flex-col gap-4"
  onsubmit={handleSubmit}
  novalidate>
  <div class="flex flex-col gap-4 @md/main:flex-row">
    <div class="group w-full">
      <label
        class={cn('input flex w-full items-center gap-2', {
          'input-error': !!getFieldError('name')
        })}>
        <span class="icon-[ri--user-line] w-5"></span>
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          bind:value={formData.name}
          onblur={() => handleBlur('name')}
          oninput={() => handleInput('name')}
          aria-invalid={!!getFieldError('name')}
          aria-describedby="name-error" />
      </label>
      {@render fieldError('name')}
    </div>

    <div class="group w-full">
      <label
        class={cn('input flex w-full items-center gap-2', {
          'input-error': !!getFieldError('email')
        })}>
        <span class="icon-[ri--mail-line] w-5"></span>
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          bind:value={formData.email}
          onblur={() => handleBlur('email')}
          oninput={() => handleInput('email')}
          aria-invalid={!!getFieldError('email')}
          aria-describedby="email-error" />
      </label>
      {@render fieldError('email')}
    </div>
  </div>

  <div class="group w-full">
    <textarea
      name="message"
      placeholder="Say hello..."
      class={cn('textarea w-full', { 'textarea-error': !!getFieldError('message') })}
      bind:value={formData.message}
      onblur={() => handleBlur('message')}
      oninput={() => handleInput('message')}
      aria-invalid={!!getFieldError('message')}
      aria-describedby="message-error">
    </textarea>
    {@render fieldError('message')}
  </div>

  <button type="submit" class="btn mx-auto w-40 btn-primary">Send</button>
</form>
