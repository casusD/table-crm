export const BASE_URL = 'https://app.tablecrm.com/api/v1/payboxes';

interface IPayboxes {
	id: number;
	external_id: null;
	name: string;
	start_balance: number;
	balance: number;
	balance_date: number;
	created_at: number;
	update_start_balance: number;
	update_start_balance_date: number;
	organization_id: null;
	updated_at: number;
}

interface IPayboxesResponse {
	count: number;
	result: IPayboxes[];
}

export async function getPayboxes(token: string) {
	const res = await fetch(BASE_URL + `/?token=${token}&limit=100`);

	if (!res.ok) {
		throw new Error(`Error: ${res.status}`);
	}

	return res.json() as Promise<IPayboxesResponse>;
}
