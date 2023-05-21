import { Routes, Route } from "react-router-dom"

import Main from "../pages/Main"
import Catalog from "../pages/Catalog"
import Profile from "../pages/Profile"
import Product from "../pages/Product"


const DogfoodRoutes = ({ products, user, setUser, dogToken, setSrvProducts1 }) => {
	return (
		<main>
			<div className="containerGrid">
				<Routes>
					<Route path="/" element={<Main dogToken={dogToken} setSrvProducts={setSrvProducts1} />} />
					<Route path="/catalog" element={<Catalog products={products} setSrvProducts={setSrvProducts1} dogToken={dogToken} />} />
					<Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
					<Route path="/product/:id" element={<Product dogToken={dogToken} />} />
				</Routes>
			</div>
		</main >
	);
}

export default DogfoodRoutes;
