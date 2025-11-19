import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useCRMStore } from '../../store/store';

export function Login() {
	const { token, setToken } = useCRMStore();
	// const [, setSearchParams] = useSearchParams();

	return (
		<div className='w-full h-screen flex flex-col items-center justify-center '>
			<h1 className='text-2xl mb-5'>Введите токен</h1>
			<div className='px-4 py-10 w-11/12 h-40 lg:w-150 lg:h-50 shadow-lg bg-[#f5f5f5] flex flex-col items-center justify-center rounded-2xl gap-3'>
				<Input
					value={token}
					onChange={e => setToken(e.target.value)}
					style={{ width: '86%' }}
				/>

				<Link className='bg-' to={`/?token=${token}`}>
					<Button type='primary'>Продолжить</Button>
				</Link>
			</div>
		</div>
	);
}
