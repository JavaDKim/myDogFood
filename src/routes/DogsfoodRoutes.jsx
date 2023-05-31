import { Routes, Route } from "react-router-dom"

import Main from "../pages/Main"
import Catalog from "../pages/Catalog"
import Profile from "../pages/Profile"
import Product from "../pages/Product"


const DogfoodRoutes = ({ products, user, setUser, setSrvProducts }) => {
	return (
		<main>
			<div className="containerGrid">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/catalog" element={<Catalog products={products} setSrvProducts={setSrvProducts} />} />
					<Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
					<Route path="/product/:id" element={<Product />} />
				</Routes>
			</div>
		</main >
	);
}

export default DogfoodRoutes;
