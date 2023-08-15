import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home } from './components/Home/Home';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Header } from './components/Header/Header';
import { Review } from './components/Review/Review';
import GuestGuard from './components/Guards/GuestGuard';
import UserGuard from './components/Guards/UserGuard';
import { Logout } from './components/Logout/Logout';

function App() {
	return (
		<>
			<Header />
			<section className='main-section'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route element={<GuestGuard />}>
						<Route path='/review' element={<Review />} />
						<Route path='/logout' element={<Logout />} />
					</Route>
					<Route element={<UserGuard />}>
						<Route path='/register' element={<Register />} />
						<Route path='/login' element={<Login />} />
					</Route>
				</Routes>
			</section >
		</>
	);
}

export default App;
