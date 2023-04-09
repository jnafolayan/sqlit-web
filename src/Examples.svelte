<script>
	import Code from './Code.svelte';
	import Header from './Header.svelte';
</script>

<section class="examples">
	<Header text="The Language" />

	<div class="example__block">
		<p>There are only 2 data types in SQLit:</p>
		<ul class="example__list">
			<li>TEXT - any string of characters e.g 'John Doe'</li>
			<li>INT - an integer</li>
		</ul>
	</div>

	<div class="example__block">
		<p class="example__block__title">Creating a table</p>
		<Code text="CREATE TABLE table_name (name TEXT, age INT, address TEXT);" />
	</div>

	<div class="example__block">
		<p class="example__block__title">Inserting records</p>
		<Code text="INSERT INTO table_name (name, age, address) VALUES ('John Doe', 43, 'Earth, Solar');" />
	</div>

	<div class="example__block">
		<p class="example__block__title">Querying tables</p>
		<p class="example__block__desc">
			SQLit allows requesting for all columns using <code>*</code>, as well as specific columns by
			comma-separating them.
		</p>
		<Code text="SELECT name, age FROM table_name; // returns the name and age columns" />
		<br />
		<Code text="SELECT * FROM table_name; // returns all columns" />
	</div>
</section>

<style>
	.example__block {
		margin-bottom: 1rem;
	}

	.example__block__title {
		font-size: 1rem;
		margin-bottom: 4px;
		color: var(--primary);
		font-weight: bold;
	}

	.example__block__desc {
		margin-bottom: 8px;
	}

	.example__list {
		padding: 0;
		list-style-position: inside;
	}
</style>
