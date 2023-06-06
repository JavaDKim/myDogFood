import { useContext, useEffect, useState } from 'react';
import Context from "../context"
import { Row, Col, } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import BasketProducts from '../components/Basket';


const Basket = () => {
	const { basketArr, setBasketArr } = useContext(Context)
	const [sumPrice, setSumPrice] = useState(0)

	useEffect(() => {
		setSumPrice(0)
		basketArr?.map(e => {
			if (e.discount > 0) {
				setSumPrice((old) => (old + (e?.price * (100 - e.discount) / 100) * e.stockinBasket));
			}
			else {
				setSumPrice((old) => (old + (e?.price * e.stockinBasket)))
			}
		})
	}, [basketArr]);


	return (
		<Row className="basket" style={{ minWidth: "500px", gridColumnStart: "span 4", marginLeft: "10px", justifyContent: "center" }}>
			<Row className='align-items-center mb-2'>
				<Col xs={5} style={{ fontWeight: "700", fontSize: "18px", textAlign: "end" }}>Корзина</Col>
				<Col xs={2}></Col>
				<Col xs={5} style={{ fontWeight: "700", fontSize: "18px", textAlign: "start" }}>{`Итого ${sumPrice}`}</Col>
			</Row>

			<Row className='align-items-center'>
				<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", minWidth: "80px" }}>Изображение</Col>
				<Col xs={2} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Наименование</Col>
				<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>На складе</Col>
				<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Цена</Col>
				<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Скидка</Col>
				<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Цена со скидкой</Col>
				<Col xs={2} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Количество</Col>
				<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Сумма</Col>
				<Col xs={1} style={{ fontWeight: "500", fontSize: "11px", textAlign: "center" }}>Удалить</Col>
			</Row>
			{
				basketArr.map(e => {
					return (
						<Row className='align-items-center' ml-1 key={e._id}>
							<Col xs={1} style={{ minWidth: "80px" }}><img width="60px" src={e.img} /></Col>
							<Col xs={2} style={{ fontSize: "12px", textAlign: "center" }}>{e.name}</Col>
							<Col xs={1} style={{ fontSize: "12px", textAlign: "center" }}>{e.stock}</Col>
							<Col xs={1} style={{ fontSize: "12px", textAlign: "center" }}>{e.price}</Col>
							<Col xs={1} style={{ fontSize: "12px", textAlign: "center" }}>{e.discount}%</Col>
							<Col xs={1} style={{ fontSize: "12px", textAlign: "center" }}>{(e.price * (100 - e.discount)) / 100}</Col>
							<Col xs={2} style={{ fontSize: "12px", textAlign: "center" }}><BasketProducts stockinBasket={e.stockinBasket} id={e._id} /></Col>
							<Col xs={1} style={{ fontSize: "12px", textAlign: "center" }}>{e.stockinBasket}</Col>
							<Col xs={1} style={{ fontSize: "16px", color: "crimson", textAlign: "center" }}><XCircleFill style={{ cursor: "pointer" }} onClick={
								x => {
									x.preventDefault()
									x.stopPropagation()
									setBasketArr(old => old.filter(y => y._id !== e._id))
								}
							} /></Col>

						</Row>)
				})
			}
		</Row >
	);
}

export default Basket;
