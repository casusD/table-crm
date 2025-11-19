import { Route, Routes } from 'react-router-dom';
import { Home } from './components/home/Home';
import { Login } from './components/login/Login';
import { PrivateRoutes } from './utils/routes/PrivateRoutes';
import { PublicRoutes } from './utils/routes/PublicRoutes';

export function App() {
	return (
		<Routes>
			<Route path='/' element={<PrivateRoutes />}>
				<Route index element={<Home />} />
			</Route>

			<Route path='login' element={<PublicRoutes />}>
				<Route index element={<Login />} />
			</Route>
		</Routes>
	);
}
