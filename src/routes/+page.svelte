<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	function copyToClipboard(key: string) {
		const baseUrl = window.location.origin;
		const type = 'text/plain';
		const blob = new Blob([`${baseUrl}/r?t=${key}`], { type });
		const data = [new ClipboardItem({ [type]: blob })];
		navigator.clipboard.write(data);
	}
</script>

<header class="bg-pink-200">
	<h1 class="text-3xl py-2 px-4 text-pink-700">Redirect</h1>
</header>

<div class="mx-auto mt-8 p-4">
	<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" action="?/addRedirect">
		<div class="mb-6 flex space-x-8">
			<div>
				<label class="block text-gray-700 text-sm font-bold mb-2" for="description">
					Description
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-purple-300"
					id="description"
					name="description"
					type="text"
					required
				/>
			</div>
			<div>
				<label class="block text-gray-700 text-sm font-bold mb-2" for="key"> Key </label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-purple-300"
					id="key"
					name="key"
					type="text"
					required
				/>
			</div>
			<div>
				<label class="block text-gray-700 text-sm font-bold mb-2" for="key"> URL </label>
				<input
					class="shadow appearance-none border rounded w-[40ch] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-purple-300"
					id="url"
					name="url"
					type="text"
					required
				/>
			</div>
		</div>
		<div class="flex items-center justify-between">
			<button
				class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="submit"
			>
				Submit
			</button>
		</div>
	</form>
</div>

<div class="mx-auto mt-8 p-4">
	<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class="flow-root">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<table class="min-w-full divide-y divide-gray-300">
						<thead>
							<tr>
								<th
									scope="col"
									class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>Desc</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>Created</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>Hits</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>Incoming Link</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>Outgoing Link</th
								>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200">
							{#each data.redirects as r}
								<tr>
									<td
										class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
										>{r.desc}</td
									>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
										>{new Date(r.createdAt).toLocaleString()}</td
									>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{r.hits}</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
										><button
											on:click={() => copyToClipboard(r.key)}
											title="Copy link"
											class="underline text-indigo-500 hover:text-indigo-300 focus:outline-none focus:text-indigo-800"
											>{`/r?t=${r.key}`}</button
										></td
									>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{r.url}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
