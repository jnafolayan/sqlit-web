<script lang="ts">
	import { onMount } from 'svelte';
	import Examples from '../Examples.svelte';
	import Header from '../Header.svelte';
	import { WASMBufferToString, loadDBCompiler, stringToWASMBuffer } from '../utils';
	import '../wasm_exec';
	import Code from '../Code.svelte';
	import Notifications from '../Notifications.svelte';

	let wasm: WebAssembly.Instance;
	const wasmURL = './wasm.wasm';
	// @ts-ignore
	const go = new Go();
	let output = '';

	type Prompt = {
		query: string;
		result: string;
	};
	let prompts: Prompt[] = [];

	let userInput = 'SELECT * FROM people';
	const handleTextChange = (event: Event) => {
		userInput = (event.target as HTMLTextAreaElement).value;
	};

	const log = (addr: number, length: number) => {
		console.log({ addr, length });
		if (!wasm) return;

		const text = WASMBufferToString(wasm, addr, length);
		prompts = prompts.concat([{ query: userInput, result: text }]);
		console.log(text);
		userInput = '';

		const inputElement = document.getElementsByClassName('prompt-input')[0] as HTMLInputElement;
		if (inputElement) {
			setTimeout(() => {
				inputElement.scrollIntoView();
				inputElement.focus();
			}, 0);
		}
	};

	go.importObject.env['logText'] = log;

	const handleTryBtnClick = (_event: Event) => {
		runWASM();
	};

	const runWASM = () => {
		const { ptr, length } = stringToWASMBuffer(wasm, userInput);
		wasm.exports.run(ptr, length);
	};

	onMount(async () => {
		wasm = await loadDBCompiler(go, wasmURL);
	});
</script>

<Notifications />

<div class="container">
	<div class="header">
		<h3 class="title">SQLit</h3>
		<a href="#tryArea" class="btn">
			<button id="tryBtn">Try it</button>
		</a>
	</div>

	<section class="intro">
		<p>
			SQLit is a minimal implementation of SQL. It contains a very tiny subset of the Structured
			Query Language and was created while having fun with databases.
		</p>
		<br />
		<p>
			There are many unfinished parts, but this project isn't meant to be public-ready; it was just
			a fun exercise. An example of a missing feature (and an important one) is the absence of the <code
				>WHERE</code
			> clause. SQLit is also case sensitive, which means <code>SELECT</code> != <code>select</code>.
		</p>
	</section>

	<Examples />
</div>

<div class="scroll-container">
	<section id="tryArea">
		<div class="container">
			<Header text="Try it out" />

			<p>A test database has been created and populated with a <code>people</code> table.</p>
			<p>Try out the language below:</p>
			<br />

			{#each prompts as prompt}
				<div class="prompt">
					<Code text={'#> ' + prompt.query} />
					<Code text={prompt.result} />
				</div>
			{/each}

			<div class="new-prompt">
				<span class="prompt-prompt">#&gt; </span>
				<input
					class="prompt-input"
					value={userInput}
					placeholder="Enter a statement"
					on:change={handleTextChange}
					on:keyup={(event) => event.key == 'Enter' && runWASM()}
				/>
				{#if wasm}
					<button id="runBtn" class="btn" on:click={handleTryBtnClick}>Run</button>
				{/if}
			</div>
		</div>
	</section>
</div>

<style>
	.scroll-container {
		scroll-behavior: smooth;
	}

	.container {
		width: 100%;
		max-width: 767px;
		margin: 0 auto;
		padding: 20px var(--padding);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid #aaa;
	}

	#tryArea {
		text-decoration: none;
		background-color: #222;
		color: #fff;
		padding: 100px 0;
	}

	#tryBtn,
	#runBtn {
		padding: 4px 18px;
		background-color: rgb(99, 229, 99);
		border: none;
		outline: none;
		cursor: pointer;
		font-size: 0.8rem;
		border-radius: 4px;
		color: #000;
	}

	#tryBtn {
		padding: 8px 18px;
	}

	button:hover {
		background-color: #aaa;
	}

	.title {
		font-size: 1.5rem;
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial;
		color: var(--primary);
	}

	.intro {
		color: #444;
		font-size: 0.9rem;
		margin-bottom: 20px;
	}

	.prompt {
		margin-bottom: 12px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.new-prompt {
		display: flex;
		align-items: stretch;
		height: 40px;
	}

	.prompt-prompt {
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 40px;
		padding: 4px;
		border: 2px solid #ccc;
		border-right: 0;
		background-color: rgba(200, 200, 200, 0.3);
		color: #ddd;
	}

	.prompt-input {
		width: 100%;
		padding: 10px;
		border: 2px solid #ccc;
		border-left: 0;
		background-color: rgba(200, 200, 200, 0.3);
		font-size: 0.8rem;
		color: #ddd;
		outline: none;
	}

	#runBtn {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
</style>
