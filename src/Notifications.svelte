<script lang="ts">
    import {fly} from 'svelte/transition';
    import {notifications} from './lib/notification'
</script>

{#if $notifications}
    <div class="notifications">
        {#each $notifications as not}
            <div role="alert" class={"notification " + not.type} transition:fly>
                {not.text}
            </div>
        {/each}
    </div>
{/if}

<style>
    .notifications {
        position: fixed;
        top: 5px;
        width: 200px;
        left: calc(50vw - 100px);
    }

    .notification {
        color: #fff;
        padding: 6px 12px;
        width: 100%;
        margin-bottom: 4px;
        box-shadow: -2px 4px 8px #ddd;
        border-radius: 4px;
    }

    .notification.success {
        background-color: rgb(0, 191, 0);
    }

    .notification.error {
        background-color: rgb(217, 33, 0);
    }
</style>