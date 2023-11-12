<script>
    import { user } from "../../Components/stores/userStore.js";
</script>


<h1>Mandatory 2</h1>

{#if $user === false}
<p>This is a simple system, where you can log in, if you are a user.</p>
{/if}

{#if $user === true}
<p>The system knows you belong here. You are one of us.</p>
{/if}