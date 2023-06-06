import React, { useContext, useState } from 'react';
import Context from "../../context"

const BasketProducts = ({ stockinBasket, id }) => {
	const { basketArr, setBasketArr } = useContext(Context)
	const [stockIn, setStockIn] = useState(stockinBasket)

	return (
		<input type='number' style={{ width: "50px" }} value={stockIn}

			onChange={(y) => {
				setStockIn(parseInt(y.currentTarget.value))
				basketArr.map(x => {
					if (x._id === id) {
						x.stockinBasket = parseInt(y.currentTarget.value)
					}
				})
			}} />
	);
}

export default BasketProducts;
