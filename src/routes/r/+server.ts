import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addRedirectHit, getRedirectUrl } from '$lib/server/db';

export const GET = (async ({ url }) => {
	const searchParams = new URLSearchParams(url.searchParams);

	if (!searchParams.has('t')) {
		throw error(404, {
			message: 'No target provided'
		});
	}

	const target = searchParams.get('t');

	if (!target) {
		throw error(404, {
			message: 'No target provided'
		});
	}

	const tData = getRedirectUrl(target);

	if (!tData?.url) {
		throw error(404, {
			message: 'Unknown target'
		});
	}

	addRedirectHit(tData.id);
	throw redirect(301, tData?.url);
}) satisfies RequestHandler;
