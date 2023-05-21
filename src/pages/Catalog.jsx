import Card from "../components/Card";
const Catalog = ({ products, dogToken, setServerProducts }) => {
	return (
		<>
			{products.map((e, i) => <Card img={e.pictures} key={i} {...e} dogToken={dogToken} setServerProduct={setServerProducts} />)}
		</>
	);
}

export default Catalog;
