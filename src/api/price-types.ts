export const BASE_URL = 'https://app.tablecrm.com/api/v1/price_types';

interface IPriceTypes {
	name: string;
	id: number;
	updated_at: number;
	created_at: number;
}

interface IPriceTypesResponse {
	count: number;
	result: IPriceTypes[];
}

export async function getPriceTypes(token: string) {
	const res = await fetch(BASE_URL + `/?token=${token}&limit=100`);

	if (!res.ok) {
		throw new Error(`Error: ${res.status}`);
	}

	return res.json() as Promise<IPriceTypesResponse>;
}
