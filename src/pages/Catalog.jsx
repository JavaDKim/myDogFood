import Card from "../components/Card";
const Catalog = ({ products, dogToken }) => {
	return (
		<>
			{products.map((e, i) => <Card img={e.pictures} key={i} {...e} dogToken={dogToken} />)}
		</>
	);
}

export default Catalog;
