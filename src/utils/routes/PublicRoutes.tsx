import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

export function PublicRoutes() {
	const [searchParams] = useSearchParams();

	return searchParams.get('token') ? <Navigate to='login' /> : <Outlet />;
}
