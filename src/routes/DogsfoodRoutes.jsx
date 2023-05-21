import { Routes, Route } from "react-router-dom"
import Main from "../pages/Main"
import Catalog from "../pages/Catalog"
import Profile from "../pages/Profile"
import Product from "../pages/Product"


const DogfoodRoutes = ({ products, user, setUser, dogToken, setProducts, setServerProduct }) => {
	return (
		<main>
			<div className="containerGrid">
				<Routes>
					<Route path="/" element={<Main dogToken={dogToken} />} />
					<Route path="/catalog" element={<Catalog products={products} setServerProducts={setServerProduct} dogToken={dogToken} />} />
					<Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
					<Route path="/product/:id" element={<Product dogToken={dogToken} />} />
				</Routes>
			</div>
		</main >
	);
}

export default DogfoodRoutes;
