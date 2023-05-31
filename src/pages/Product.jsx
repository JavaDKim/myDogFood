import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import Loader from "../components/Loader";
import { Truck, Star, StarFill } from "react-bootstrap-icons";
import { Container, Row, Col, Form, Button, Card, FormLabel } from "react-bootstrap";
import Context from "../context";
import ReviewsBlock from "../components/Reviews";

const Product = () => {
	const { dogToken } = useContext(Context)
	const [product, setProduct] = useState({})
	const { id } = useParams()


	useEffect(() => {
		fetch(`https://api.react-learning.ru/products/${id}`,
			{ headers: { "Authorization": `Bearer ${dogToken}` } })
			.then(res => res.json())
			.then(data => {
				setProduct(data)
			}
			)
	}, [])

	return (
		<Container className="cntProduct" fluid style={{ gridColumn: "1/5" }}>
			<Row>
				<Col xs={12} md={2}></Col>
				<Col xs={12} md={10}>
					{!product.name
						?
						<Loader />
						:
						<>
							<h2>
								{product.name}
							</h2>
						</>
					}
				</Col>
			</Row>
			<Row >
				<Col xs={12} md={1}>
				</Col>
				<Col xs={12} md={4}>
					{<img width="100%" src={product.pictures} alt={product.name} />}
				</Col>
				<Col xs={12} md={4}>
					<Row >
						<h3 className="card_price">

							{product.discount > 0
								?
								<>
									<del style={{ color: "crimson" }}>{product.price}</del>&nbsp;
									{product.discount > 0 && <span style={{ color: "crimson" }}>-{product.discount}%</span>}&nbsp;
									<>=&nbsp;
										{product.price * (100 - product.discount) / 100}
									</>
								</>
								:
								product.price
							}&nbsp;
							р.</h3>
					</Row>
					<Row >
						<Form.Group className="d-flex align-items-center">
							<FormLabel>Введите<br />количество:&nbsp;</FormLabel>
							<Form.Control className="inputCount" type="number" placeholder="0" />
							<Button variant="success" className="btnCount" size="xs">Купить</Button>
						</Form.Group>
					</Row>
					<Row >
						<Card variant="primary" style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>Доставка &nbsp;<Truck /></Card.Title>
								<Card.Subtitle className="mb-2 text-muted">по Ростову-на-Дону</Card.Subtitle>
								<Card.Text>
									Доставка от 5000 р. по г.Ростову-на Дону бесплатна
								</Card.Text>
								<Card.Subtitle className="mb-2 text-muted">Иногородняя и по области</Card.Subtitle>
								<Card.Text>
									Отправляем через СДЭК, ПЭК, Boxberry, Почта России
								</Card.Text>
								<Card.Link href="#">условия доставки</Card.Link>
							</Card.Body>
						</Card>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={1}></Col>
				<Col xs={12} md={11}>
					<h3 style={{ marginBottom: "10px" }}>Описание</h3>
					<Row style={{ margin: "0" }}>{product.description}</Row>
				</Col>
			</Row>
			<ReviewsBlock product={product} setProduct={setProduct} />

		</Container >
		/* 		<div className="product">
					{!product.name
						?
						<Loader />
						:
						<>
							<h1>
								{product.name}
							</h1>
							{<img src={product.pictures} alt={product.name} />}
							{<mark>{product.price}</mark>}</>
					}
				</div> */
	);
}

export default Product;
