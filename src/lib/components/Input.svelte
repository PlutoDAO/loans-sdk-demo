<script lang="ts">
  export let classRules = '';
  export let value = '';
  export let type: 'text' | 'password' | 'number' | 'email';
  export let placeholder = '';
  export let disabled = false;

  let propType = {
    type,
  };
</script>

<input
  {...propType}
  bind:value={value}
  class={classRules}
  placeholder={placeholder}
  disabled={disabled}
/>
