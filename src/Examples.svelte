<script>
	import Code from './Code.svelte';
	import Header from './Header.svelte';
</script>

<section class="examples">
	<Header text="The Language" />

	<div class="example__block">
		<p>There are only 3 attribute data types in SQLit:</p>
		<ul class="example__list">
			<li>TEXT - any string of characters e.g 'John Doe'</li>
			<li>INT - an 64-bit integer</li>
			<li>FLOAT - a 64-bit float</li>
		</ul>
	</div>

	<div class="example__block">
		<p>Strings are a sequence of characters within single quotes <code>''</code>.</p>
		<br />
		<p>
			The only arithmetic operations supported in queries are <code>+</code> (plus) and
			<code>-</code> (minus).
		</p>
		<br />
		<p>The list of <code>WHERE</code> operators supported are:</p>
		<br />
		<ul class="example__list">
			<li><code>&lt;</code> (less than)</li>
			<li><code>&gt;</code> (greater than)</li>
			<li><code>=</code> (equal to)</li>
			<li><code>!=</code> (not equal to)</li>
			<li><code>AND</code> (logical AND)</li>
			<li><code>OR</code> (logical OR)</li>
		</ul>
	</div>

	<div class="example__block">
		<p class="example__block__title">Creating a table</p>
		<Code text="CREATE TABLE people (name TEXT, age INT, address TEXT);" />
	</div>

	<div class="example__block">
		<p class="example__block__title">Inserting records</p>
		<Code text="INSERT INTO people (name, age, address) VALUES ('John Doe', 43, 'Earth, Solar');" />
	</div>

	<div class="example__block">
		<p class="example__block__title">Querying tables</p>
		<p class="example__block__desc">
			SQLit allows requesting for all columns using <code>*</code>, as well as specific columns by
			comma-separating them.
		</p>
		<Code text="SELECT * FROM people;" comment="Select all people" />
		<br />
		<Code
			text="SELECT name, age FROM people;"
			comment="Select the name and age attributes of all people"
		/>
		<br />
		<Code
			text="SELECT * FROM people WHERE age > 5;"
			comment="Select only if the person's age is over 5"
		/>
	</div>

	<div class="example__block">
		<p class="example__block__title">Updating records</p>
		<Code text="UPDATE people SET age=50 WHERE name='John Doe';" comment="Change John Doe's age to 50"  />
	</div>

	<div class="example__block">
		<p class="example__block__title">Deleting records</p>
		<Code text="DELETE FROM people WHERE name='John Doe';" comment="Delete John Doe's record"  />
		<Code text="DELETE FROM people;" comment="Delete all records"  />
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
