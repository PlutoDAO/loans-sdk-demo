<script lang="ts">
  export let title: string;
</script>

<h4 class="get-loan-title" data-cy="section-title">{title}</h4>
<hr class="solid" />

<style>
  .solid {
    width: 100%;
    border-top: 1px solid #bbb;
    margin: 5px 0 15px 0;
  }

  .get-loan-title {
    text-align: center;
    width: 100%;
    font-weight: 500;
    margin-top: 20px;
  }
</style>
