import { useState, useEffect } from "react"
import { Header, Nav, Footer } from "./components/General"
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "./components/Modal"
import DogfoodRoutes from "./routes/DogsfoodRoutes"
import Context from "./context";


const App = () => {
	const [user, setUser] = useState(localStorage.getItem("dogUser"))
	const [dogToken, setDogToken] = useState(localStorage.getItem("dogToken"))
	const [modalAcive, setModalActive] = useState(false)
	const [serverProducts, setSrvProducts] = useState([]);
	const [products, setProducts] = useState(setSrvProducts)
	const [discountSrvProd, setDiscountSrvProd] = useState([]);
	const [newSrvProd, setNewSrvProd] = useState([]);
	const [saleSrvProd, setSaleSrvProd] = useState([]);
	let discountProducts = [] //массив с дисконтными товарами
	let newProducts = [] //массив с новинками
	let saleProducts = [] //массив распродаж
	useEffect(() => {
		if (dogToken) {

			fetch(
				"https://api.react-learning.ru/products",
				{ headers: { "Authorization": `Bearer ${dogToken}` } })
				.then(res => res.json())
				.then(data => {
					setSrvProducts(data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
					//выбираем все товары со скидкой
					data.products.map((e) => { return e.discount > 0 ? discountProducts.push(e) : "" });
					discountProducts.sort((a, b) => a.discount < b.discount ? 1 : -1)
					setDiscountSrvProd(discountProducts)
					//выбираем все товары новинки
					data.products.map((e) => { return e.tags.includes("new") ? newProducts.push(e) : "" });
					setNewSrvProd(newProducts)
					//выбираем все товары распродажи
					data.products.map((e) => { return e.tags.includes("sale") ? saleProducts.push(e) : "" });
					setSaleSrvProd(saleProducts)
				})
		}
	}, [dogToken])

	useEffect(() => {
		setProducts(serverProducts)
	}, [serverProducts])

	useEffect(() => {
		if (user) {
			setDogToken(localStorage.getItem("dogToken"))
			setUser(localStorage.getItem("dogUserId"));
		} else {
			setDogToken("")
			setUser("")
		}
	}, [user])
	return (
		<Context.Provider value={{
			products,
			setProducts,
			serverProducts,
			setSrvProducts,
			saleSrvProd,
			newSrvProd,
			discountSrvProd,
			dogToken
		}}>
			<Nav user={user} /* prodArr={serverProducts} setProducts={setProducts} */ />
			<Header user={user} setUser={setUser} setModalActive={setModalActive} />
			<DogfoodRoutes products={products} setSrvProducts={setSrvProducts} user={user} setUser={setUser} />
			<Footer user={user} />
			<Modal active={modalAcive} setActive={setModalActive} setUser={setUser} />
		</Context.Provider>
	);



};
export default App;
