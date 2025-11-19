export const BASE_URL = 'https://app.tablecrm.com/api/v1/warehouses';

interface IWarehouses {
	name: string;
	type: null;
	description: string;
	address: null;
	phone: null;
	parent: number;
	is_public: boolean;
	status: boolean;
	id: number;
	updated_at: number;
	created_at: number;
	longitude: null;
	latitude: null;
}

interface IWarehousesResponse {
	count: number;
	result: IWarehouses[];
}

export async function getWarehouses(token: string) {
	const res = await fetch(BASE_URL + `/?token=${token}&limit=100`);

	if (!res.ok) {
		throw new Error(`Error: ${res.status}`);
	}

	return res.json() as Promise<IWarehousesResponse>;
}

// Warehouses
// warehouses
