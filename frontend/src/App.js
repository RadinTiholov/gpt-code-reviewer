import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home } from './components/Home/Home';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Header } from './components/Header/Header';

function App() {
	return (
		<>
			<Header />
			<section className='main-section'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</section >
		</>
	);
}

export default App;
