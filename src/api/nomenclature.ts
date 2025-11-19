export const BASE_URL = 'https://app.tablecrm.com/api/v1/nomenclature';

interface INomenclature {
	name: string;
	type: null;
	description_short: null;
	description_long: null;
	code: null;
	unit: null;
	category: number;
	manufacturer: null;
	chatting_percent: null;
	cashback_type: string;
	cashback_value: number;
	external_id: null;
	tags: [];
	seo_title: null;
	seo_description: null;
	seo_keywords: [];
	id: number;
	unit_name: null;
	barcodes: [];
	prices: null;
	balances: null;
	attributes: null;
	photos: null;
	group_id: null;
	group_name: null;
	is_main: null;
	updated_at: number;
	created_at: number;
}

interface INomenclatureResponse {
	count: number;
	result: INomenclature[];
}

export async function getNomenclature(token: string) {
	const res = await fetch(BASE_URL + `/?token=${token}&limit=100`);

	if (!res.ok) {
		throw new Error(`Error: ${res.status}`);
	}

	return res.json() as Promise<INomenclatureResponse>;
}
