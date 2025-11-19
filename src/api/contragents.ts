export const BASE_URL = 'https://app.tablecrm.com/api/v1/contragents';

interface IContragents {
	id: number;
	name: string;
	external_id: string;
	phone: string;
	phone_code: string;
	inn: string;
	description: null;
	contragent_type: string;
	type: null;
	birth_date: null;
	data: null;
	additional_phones: null;
	gender: null;
	cashbox: number;
	is_deleted: boolean;
	is_phone_formatted: boolean;
	created_at: number;
	updated_at: number;
	email: null;
}

interface IContragentsResponse {
	count: number;
	result: IContragents[];
}

export async function getContragents(token: string) {
	const res = await fetch(BASE_URL + `/?token=${token}&limit=100`);

	if (!res.ok) {
		throw new Error(`Error: ${res.status}`);
	}

	return res.json() as Promise<IContragentsResponse>;
}
