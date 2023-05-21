import { useState, useEffect } from "react"
import { Header, Nav, Footer } from "./components/General"


import Modal from "./components/Modal"
import DogfoodRoutes from "./routes/DogsfoodRoutes"


const App = () => {
	const [user, setUser] = useState(localStorage.getItem("dogUser"))
	const [dogToken, setDogToken] = useState(localStorage.getItem("dogToken"))
	const [modalAcive, setModalActive] = useState(false)
	const [serverProducts, setServerProducts] = useState([]);
	const [products, setProducts] = useState(serverProducts)
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
					setServerProducts(data.products)
					//выбираем все товары со скидкой
					data.products.map((e) => { return e.discount > 0 ? discountProducts.push(e) : "" });
					discountProducts.sort((a, b) => a.discount < b.discount ? 1 : -1)
					localStorage.setItem("discountProducts", JSON.stringify(discountProducts));
					//выбираем все товары новинки
					data.products.map((e) => { return e.tags.includes("new") ? newProducts.push(e) : "" });
					localStorage.setItem("newProducts", JSON.stringify(newProducts));
					//выбираем все товары распродажи
					data.products.map((e) => { return e.tags.includes("sale") ? saleProducts.push(e) : "" });
					localStorage.setItem("saleProducts", JSON.stringify(saleProducts));
				})
		}
	}, [dogToken])

	useEffect(() => {
		setProducts(serverProducts)
	}, [serverProducts])

	useEffect(() => {
		if (user) {
			setDogToken(localStorage.getItem("dogToken"))
		} else {
			setDogToken("")
		}
	}, [user])
	return (
		<>
			<Nav user={user} prodArr={serverProducts} setProducts={setProducts} />
			<Header user={user} setUser={setUser} setModalActive={setModalActive} />
			<DogfoodRoutes products={products} setServerProduct={setServerProducts} user={user} setUser={setUser} dogToken={dogToken} />
			<Footer user={user} />
			<Modal active={modalAcive} setActive={setModalActive} setUser={setUser} />
		</>
	);



};
export default App;
