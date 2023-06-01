import { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { Star, StarFill } from "react-bootstrap-icons";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import Context from "../../context";
import ReviewsMap from "./ReviewsMap";



const ReviewsBlock = ({ product, setProduct }) => {
	const { dogToken } = useContext(Context)
	const [reviews, setReviews] = useState(product.reviews)
	const [textReviews, setTextReviews] = useState("")
	const [rate, setRate] = useState(0)


	const textReview = (e) => {
		e.preventDefault()
		let val = e.target.value
		setTextReviews(val)
	}
	useEffect(() => {
		setReviews(product?.reviews)
	}, [product]);

	/* console.log(product.author._id); 
	console.log(product);
	console.log(dogToken);
	console.log(textReviews);
	console.log(reviews);*/
	console.log(reviews)

	const addReviews = async (e) => {
		e.preventDefault()
		let body = { text: textReviews, rating: rate }

		let res = await fetch(`https://api.react-learning.ru/products/review/${product?._id}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${dogToken}`
				},
				body: JSON.stringify(body)
			})
		let data = await res.json()
		setProduct(data)
		setTextReviews("")
		setRate(0)
		setReviews(data.reviews)

	}

	return (
		<Row>
			{/* блок отзывов */}
			<Col xs={12} md={1}></Col>
			<Col xs={12} md={6}>
				<h3 style={{ marginBottom: "20px" }}>Отзывы</h3>
				<Card>
					<Card.Header>Добавить отзыв</Card.Header>
					<Card.Body>
						<Form.Control as="textarea" rows={3} onChange={textReview} style={{ padding: "0", marginBottom: "10px" }} />
						<Form.Label >Поставьте рейтинг</Form.Label>
						<Row className="starRate d-flex justify-content-center">
							<Form.Control type="number" placeholder={0} value={rate} max={5} min={0} onChange={(e) => setRate(e.currentTarget.value)} />
						</Row>
						<Button variant="primary" onClick={addReviews}>Сохранить</Button>
					</Card.Body>
				</Card>
				<ReviewsMap reviews={reviews} product={product} setProduct={setProduct} />
			</Col>
		</Row >
	);
}

export default ReviewsBlock;
