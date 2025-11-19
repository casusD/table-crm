import { DeleteOutlined } from '@ant-design/icons';
import type { GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCRMStore } from '../../store/store';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
	id: string;
	name: string;
	sum: number;
	sale: number;
	count: number;
	total: number;
}

function EditableRow({ ...props }) {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
}

interface EditableCellProps {
	title: React.ReactNode;
	editable: boolean;
	dataIndex: keyof Item;
	record: Item;
	handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef<InputRef>(null);
	const form = useContext(EditableContext)!;

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({ [dataIndex]: record[dataIndex] });
	};

	const save = async () => {
		try {
			const values = await form.validateFields();

			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log('Save failed:', errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{ margin: 0 }}
				name={dataIndex}
				rules={[{ required: true, message: `${title} is required.` }]}
			>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className='editable-cell-value-wrap'
				style={{ paddingInlineEnd: 18 }}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

export interface ITableDataType {
	id: string;
	name: string;
	sum: number;
	sale: number;
	count: number;
	total: number;
	unit: string;
}

type ColumnTypes = Exclude<TableProps<ITableDataType>['columns'], undefined>;

export function TableComponent() {
	const { dataSource, setDataSource, delProduct } = useCRMStore();

	const defaultColumns: (ColumnTypes[number] & {
		editable?: boolean;
		dataIndex: string;
	})[] = [
		{
			title: 'Название товара',
			dataIndex: 'name',
		},
		{
			title: 'Сумма',
			dataIndex: 'sum',
			editable: true,
		},
		{
			title: 'Скидка',
			dataIndex: 'sale',
			editable: true,
		},
		{
			title: 'Количество',
			dataIndex: 'count',
			editable: true,
		},
		{
			title: 'Единица',
			dataIndex: 'unit',
		},
		{
			title: 'Итого',
			dataIndex: 'total',
		},
		{
			title: 'Действие',
			dataIndex: 'operation',
			render: (_, record) =>
				dataSource.length >= 1 ? (
					<Popconfirm
						title='Подтвердите удаление'
						onConfirm={() => delProduct(record.id)}
					>
						<Button size='small'>
							<DeleteOutlined />
						</Button>
					</Popconfirm>
				) : null,
		},
	];

	const handleSave = (row: ITableDataType) => {
		const newData = [...dataSource];
		const index = newData.findIndex(item => row.id === item.id);
		const item = newData[index];
		newData.splice(index, 1, {
			...item,
			...row,
		});
		setDataSource(newData);
	};

	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell,
		},
	};

	const columns = defaultColumns.map(col => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: ITableDataType) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave,
			}),
		};
	});

	return (
		<div className='w-full'>
			<Table<ITableDataType>
				components={components}
				size='small'
				rowClassName={() => 'text-[10px] h-[70px] editable-row'}
				bordered
				dataSource={dataSource}
				columns={columns as ColumnTypes}
				scroll={{ y: 'min-content' }}
				rowKey='id'
			/>
		</div>
	);
}
