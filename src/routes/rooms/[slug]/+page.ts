
export const ssr = true;
export const csr = true;

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    return {
        meetingID: params.slug
    }
};