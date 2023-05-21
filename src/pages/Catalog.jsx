import Card from "../components/Card";
const Catalog = ({ products, dogToken, setSrvProducts }) => {
	return (
		<>
			{products.map((e, i) => <Card img={e.pictures} key={i} {...e} dogToken={dogToken} setServerProduct={setSrvProducts} />)}
		</>
	);
}

export default Catalog;
