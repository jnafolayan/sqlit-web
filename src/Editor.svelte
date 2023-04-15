<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let text = '';

	const dispatch = createEventDispatcher<{ change: string }>();

	const handleTextChange = (event: Event) => {
		dispatch('change', (event.target as HTMLTextAreaElement).value);
	};
</script>

<div>
	<textarea
		class="editor__textarea"
		rows="20"
		placeholder="SELECT * FROM people"
		value={text}
		on:change={handleTextChange}
	/>
</div>

<style>
	.editor__textarea {
		display: block;
		width: 100%;
		height: 250px;
		padding: 10px;
		border: 2px solid #ccc;
		border-radius: 4px;
		background-color: rgba(200, 200, 200, 0.3);
		font-size: 0.8rem;
		color: #ddd;
	}
</style>
