export const BASE_URL = 'https://app.tablecrm.com/api/v1/organizations';

interface IOrganizations {
	type: string;
	short_name: string;
	full_name: string;
	work_name: null;
	prefix: null;
	inn: null;
	kpp: null;
	okved: null;
	okved2: null;
	okpo: null;
	ogrn: null;
	org_type: string;
	tax_type: null;
	tax_percent: null;
	registration_date: number;
	id: number;
	updated_at: number;
	created_at: number;
}

interface IOrganizationsResponse {
	count: number;
	result: IOrganizations[];
}

export async function getOrganizations(token: string) {
	const res = await fetch(BASE_URL + `/?token=${token}&limit=100`);

	if (!res.ok) {
		throw new Error(`Error: ${res.status}`);
	}

	return res.json() as Promise<IOrganizationsResponse>;
}
