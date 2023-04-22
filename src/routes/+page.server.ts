import { addRedirect, getAllRedirects } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async () => {
	const redirects = getAllRedirects();

	return {
		redirects
	};
};

export const actions = {
	addRedirect: async ({ request }) => {
		const data = await request.formData();
		const description = data.get('description')?.toString();
		const key = data.get('key')?.toString();
		const url = data.get('url')?.toString();

		if (!description || !key || !url) {
			throw error(400, 'Missing description, key or url');
		}

		addRedirect(description, key, url);

		return { success: true };
	}
} satisfies Actions;
