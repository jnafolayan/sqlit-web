<script>
	import { toast } from './lib/notification';

	export let text = '';
	export let comment = '';

	const handleButtonClick = () => {
		let t = text;
		if (text.startsWith('#> ')) {
			// Replace only the first occurrence
			t = text.replace('#> ', '');
		}
		navigator.clipboard.writeText(t).then(() => {
			toast({ text: 'Text copied!', type: 'success' });
		});
	};
</script>

<div class="code">
	{text}
	{comment ? '// ' + comment : ''} <button class="copy" on:click={handleButtonClick}>COPY</button>
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
		font-size: 0.8rem;
		padding: 2px 6px;
		background-color: #ff7a4e;
		border: 0;
		outline: 0;
		border-bottom-left-radius: 4px;
		box-shadow: -1px 2px 8px rgba(200, 200, 200, 0.3);
		cursor: pointer;
		color: #fff;
	}
</style>
