type Item = {
	id: string;
	name: string;
	price: number;
	discount: number;
	quantity: number;
	unit: string;
};

const data: Item[] = [
	{
		id: '1',
		name: 'Coca-Cola',
		price: 2.5,
		discount: 0,
		quantity: 1,
		unit: 'шт',
	},
];

export default function VerticalTable() {
	return (
		<div className='space-y-3 w-full'>
			{data.length === 0 ? (
				<div className='text-center py-16 text-gray-400'>No data</div>
			) : (
				data.map(item => (
					<div
						key={item.id}
						className='border rounded-xl p-3 bg-white shadow-sm'
					>
						<div className='flex justify-between border-b pb-1 mb-2'>
							<span className='font-medium'>Название товара</span>
							<span>{item.name}</span>
						</div>

						<div className='flex justify-between border-b pb-1 mb-2'>
							<span className='font-medium'>Сумма</span>
							<span>{item.price}</span>
						</div>

						<div className='flex justify-between border-b pb-1 mb-2'>
							<span className='font-medium'>Скидка</span>
							<span>{item.discount}</span>
						</div>

						<div className='flex justify-between border-b pb-1 mb-2'>
							<span className='font-medium'>Количество</span>
							<span>{item.quantity}</span>
						</div>

						<div className='flex justify-between border-b pb-1 mb-2'>
							<span className='font-medium'>Единица</span>
							<span>{item.unit}</span>
						</div>

						<div className='flex justify-between items-center'>
							<span className='font-medium'>Итого</span>
							<div className='flex items-center gap-2'>
								<span>{item.price * item.quantity}</span>
								<button className='text-red-500 hover:text-red-600'>❌</button>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
}
