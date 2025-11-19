import { create } from 'zustand';
import type { ITableDataType } from '../components/home/Table';

interface IStore {
	token: string;
	setToken: (token: string) => void;
	dataSource: ITableDataType[];
	setDataSource: (dataSource: ITableDataType[]) => void;
	delProduct: (key: React.Key) => void;
}

export const useCRMStore = create<IStore>(set => ({
	token: 'af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77',
	setToken: (token: string) => set({ token }),
	dataSource: [],
	setDataSource: (dataSource: ITableDataType[]) => set({ dataSource }),
	delProduct: id =>
		set(state => ({
			dataSource: state.dataSource.filter(item => item.id !== id),
		})),
}));
