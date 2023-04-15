<script>
	export let text = '';

	const handleButtonClick = () => {
		navigator.clipboard.writeText(text).then();
	};
</script>

<div class="code">
	{text} <button class="copy" on:click={handleButtonClick}>COPY</button>
</div>

<style>
	.code {
		position: relative;
		display: block;
		padding: 10px;
		font-family: monospace;
		border-radius: 4px;
		background-color: rgba(200, 200, 200, 0.3);
		font-size: 0.8rem;
		color: #888;
		white-space: pre-line;
	}

	.code > .copy {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 0.6rem;
		padding: 2px 6px;
		background-color: #ddd;
		border: 0;
		outline: 0;
		border-bottom-left-radius: 4px;
	}
</style>
