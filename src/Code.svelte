<script>
	export let text = '';
</script>

<div class="code">
	{text} <button class="copy">COPY</button>
</div>

<style>
	.code {
		position: relative;
		display: block;
		padding: 10px;
		font-family: monospace;
        border-radius: 4px;
        background-color: rgba(200, 200, 200, 0.3);
        font-size: .8rem;
        color: #888;
		white-space: pre-line
	}

	.code > .copy {
		position: absolute;
		right: 0;
		top: 0;
		font-size: .6rem;
		padding: 2px 6px;
		background-color: #ddd;
		border: 0;
		outline: 0;
		border-bottom-left-radius: 4px;
	}
</style>
