import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

export function PrivateRoutes() {
	const [searchParams] = useSearchParams();

	return searchParams.get('token') ? <Outlet /> : <Navigate to='login' />;
}
