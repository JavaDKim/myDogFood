import Promo from "../components/Promo/Promo"
import { PROMOARR } from "../env"
import Card from "../components/Card"

const Main = ({ dogToken, setSrvProducts }) => {
	const discountArr = JSON.parse(localStorage.getItem("discountProducts"))
	const newArr = JSON.parse(localStorage.getItem("newProducts"))
	const saleArr = JSON.parse(localStorage.getItem("saleProducts"))
	return (<>
		<Promo {...PROMOARR[0]} />
		{newArr?.map((e, i) =>
			i < 8
				?
				<Card img={e.pictures} key={i + 121} {...e} dogToken={dogToken} setSrvProducts={setSrvProducts} />
				: <></>
		)}
		<div className="promoGroup"><Promo {...PROMOARR[1]} />
			<Promo {...PROMOARR[2]} />
		</div>
		{discountArr?.map((e, i) =>
			i < 12
				?
				<Card img={e.pictures} key={i + 893} {...e} dogToken={dogToken} setSrvProducts={setSrvProducts} />
				: <></>
		)}
	</>
	);
}
//
export default Main;
