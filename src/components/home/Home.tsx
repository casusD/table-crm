import {
	PlusOutlined,
	SettingOutlined,
	ThunderboltOutlined,
	TruckFilled,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
	AutoComplete,
	Button,
	Input,
	InputNumber,
	Layout,
	Select,
	Space,
} from 'antd';

import { getContragents } from '../../api/contragents';
import { getNomenclature } from '../../api/nomenclature';
import { getOrganizations } from '../../api/organizations';
import { getPayboxes } from '../../api/payboxes';
import { getPriceTypes } from '../../api/price-types';
import { getWarehouses } from '../../api/warehouses';
import { useCRMStore } from '../../store/store';
import { TableComponent, type ITableDataType } from './Table';

export function Home() {
	const { token, setDataSource, dataSource } = useCRMStore();

	// querys ========================================

	const { data: contragents } = useQuery({
		queryKey: ['contragents'],
		queryFn: () => getContragents(token),
		staleTime: 1000 * 60 * 3,
		refetchOnWindowFocus: false,
	});

	const { data: payboxes } = useQuery({
		queryKey: ['payboxes'],
		queryFn: () => getPayboxes(token),
		staleTime: 1000 * 60 * 3,
		refetchOnWindowFocus: false,
	});

	const { data: warehouses } = useQuery({
		queryKey: ['warehouses'],
		queryFn: () => getWarehouses(token),
		staleTime: 1000 * 60 * 3,
		refetchOnWindowFocus: false,
	});

	const { data: organizations } = useQuery({
		queryKey: ['organizations'],
		queryFn: () => getOrganizations(token),
		staleTime: 1000 * 60 * 3,
		refetchOnWindowFocus: false,
	});

	const { data: priceTypes } = useQuery({
		queryKey: ['priceTypes'],
		queryFn: () => getPriceTypes(token),
		staleTime: 1000 * 60 * 3,
		refetchOnWindowFocus: false,
	});

	const { data: nomenclature } = useQuery({
		queryKey: ['nomenclature'],
		queryFn: () => getNomenclature(token),
		staleTime: 1000 * 60 * 3,
		refetchOnWindowFocus: false,
	});

	// options ===============================

	const optionsContragents = contragents?.result.map(c => ({
		key: c.id,
		value: c.name ? c.name : String(c.id),
		label: c.name ? c.name : String(c.id),
	}));

	const optionsPayboxes = payboxes?.result.map(p => ({
		key: p.id,
		value: p.name ? p.name : String(p.id),
		label: p.name ? p.name : String(p.id),
	}));

	const optionsWarehouses = warehouses?.result.map(w => ({
		key: w.id,
		value: w.name ? w.name : String(w.id),
		label: w.name ? w.name : String(w.id),
	}));

	const optionsOrganizations = organizations?.result.map(o => ({
		key: o.id,
		value: o.short_name,
		label: o.short_name,
	}));

	const optionsPriceTypes = priceTypes?.result.map(p => ({
		key: p.id,
		value: p.name,
		label: p.name,
	}));

	const optionsNomenclature = nomenclature?.result.map(n => ({
		key: n.id,
		value: n.name,
		label: n.name,
	}));

	if (!optionsWarehouses?.length) return;
	if (!optionsOrganizations?.length) return;
	if (!optionsPriceTypes?.length) return;

	// return ==============================================

	return (
		<Layout style={{ padding: '20px' }}>
			<div className='flex justify-between w-full mb-3'>
				<div className='text-lg font-semibold'>
					Проведение документа продажи
				</div>

				<Button>
					<SettingOutlined />
				</Button>
			</div>

			<div className='lg:grid grid-cols-[2fr_10fr_2fr] gap-2'>
				<aside className='py-1 px-2 space-y-3 mb-15'>
					<div className='space-y-1.5'>
						<p className='text-md'>Контрагент</p>

						<AutoComplete
							className='w-full'
							allowClear
							filterOption={(input, option) =>
								(option?.label ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							options={optionsContragents}
						/>
					</div>
					<div className='space-y-1.5'>
						<p className='text-md'>Счет поступления</p>
						<AutoComplete
							className='w-full'
							allowClear
							filterOption={(input, option) =>
								(option?.label ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							options={optionsPayboxes}
						/>
					</div>
					<div className='space-y-1.5'>
						<p className='text-md'>Склад отгрузки</p>
						<Select
							className='w-full'
							showSearch
							filterOption={(input, option) =>
								(option?.label ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							options={optionsWarehouses}
							defaultValue={optionsWarehouses?.length && optionsWarehouses[0]}
						/>
					</div>
					<div className='space-y-1.5'>
						<p className='text-md'>Организация</p>
						<Select
							className='w-full'
							showSearch
							filterOption={(input, option) =>
								(option?.label ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							options={optionsOrganizations}
							defaultValue={
								optionsOrganizations?.length && optionsOrganizations[0]
							}
						/>
					</div>
					<div className='space-y-1.5'>
						<p className='text-md'>Приоритет</p>
						<InputNumber
							max={10}
							min={0}
							placeholder='0-10'
							style={{ width: '100%' }}
						/>
					</div>

					<div className='space-y-1.5 mt-7 mb-7'>
						<p className='text-md'>Тип цены</p>
						<Select
							className='w-full'
							options={optionsPriceTypes}
							defaultValue={optionsPriceTypes?.length && optionsPriceTypes[0]}
						/>
					</div>

					<div className='space-y-3'>
						<Button className='w-full'>Доп. параметры</Button>
						<Button className='w-full'>
							<TruckFilled /> Доставка
						</Button>
					</div>
				</aside>
				<div className='flex flex-col items-center mb-15'>
					<Space.Compact
						style={{ width: '100%', margin: '0 auto', marginBottom: '15px' }}
					>
						<Button type='primary'>Выбрать</Button>
						<AutoComplete
							className='w-full'
							allowClear
							filterOption={(input, option) =>
								(option?.label ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							onSelect={value => {
								const newData: ITableDataType = {
									id: crypto.randomUUID(),
									name: value,
									sum: 0,
									sale: 0,
									count: 0,
									total: 0,
									unit: '',
								};
								setDataSource([...dataSource, newData]);
							}}
							options={optionsNomenclature}
						/>
						<Button style={{ width: '40px' }} disabled block>
							<ThunderboltOutlined />
						</Button>
						<Button style={{ width: '40px' }} disabled block>
							<PlusOutlined />
						</Button>
					</Space.Compact>
					<TableComponent />
					{/* <VerticalTable /> */}
				</div>
				<aside className='py-1 px-2 space-y-3'>
					<div className='space-y-1.5'>
						<p className='text-md'>Без скидки:</p>
						<Input defaultValue={0} disabled allowClear />
					</div>
					<div className='space-y-1.5'>
						<p className='text-md'>Скидка:</p>
						<Input defaultValue={0} disabled allowClear />
					</div>
					<div className='space-y-1.5'>
						<p className='text-md'>Остаток лояльности:</p>
						<Input disabled allowClear />
					</div>
					<div className='space-y-1.5'>
						<p className='text-md'>Итого:</p>
						<Input defaultValue={0} disabled allowClear />
					</div>
					<div className='space-y-1.5'>
						<p className='text-md'>Баллами:</p>
						<Input disabled allowClear />
					</div>
					<div className='space-y-1.5'>
						<p className='text-md'>Рублями:</p>
						<Input allowClear />
					</div>

					<div className='space-y-3 mt-10'>
						<Button className='w-full'>Создать и провести</Button>
						<Button className='w-full'>Только создать</Button>
					</div>
				</aside>
			</div>
		</Layout>
	);
}
