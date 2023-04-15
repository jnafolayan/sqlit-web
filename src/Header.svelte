<script>
	export let text = '';
</script>

<h4 class="header">{text}</h4>

<style>
	.header {
		font-size: 1.4rem;
		padding-bottom: 0.4rem;
		margin-bottom: 12px;
	}

	.header::after {
		content: '';
		display: block;
		width: 30px;
		height: 3px;
		background-color: #777;
		margin-top: 4px;
	}
</style>
