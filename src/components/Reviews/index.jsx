import { useState, useContext, useEffect } from "react";
import Loader from "../Loader";
import { Star, StarFill } from "react-bootstrap-icons";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import Context from "../../context";



const ReviewsBlock = ({ product, setProduct }) => {
	const { dogToken } = useContext(Context)
	const [reviews, setReviews] = useState(product.reviews)
	const [textReviews, setTextReviews] = useState("")


	const textReview = (e) => {
		let val = e.target.value
		setTextReviews(val)
	}
	useEffect(() => {
		setReviews(product?.reviews)
	}, []);
	console.log(product?._id);
	console.log(dogToken);
	console.log(textReviews);
	console.log(reviews);

	const addReviews = async (e) => {
		e.preventDefault()
		let body = { text: textReviews }

		let res = await fetch(`https://api.react-learning.ru/products/review/${product._id}`,
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
		setReviews(data.reviews)
		console.log(data);
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
						<Row className="starRate d-flex justify-content-center"><Star /><Star /><Star /><Star /><Star /></Row>
						<Button variant="primary" onClick={addReviews}>Сохранить</Button>
					</Card.Body>
				</Card>
				{reviews.map((e) => {
					return (<Card key={e._id}>
						<Row style={{ margin: "3px" }}>
							{e.rating === 5 ? <Row className="starRate"><StarFill /><StarFill /><StarFill /><StarFill /><StarFill /></Row> :
								e.rating === 4 ? <Row className="starRate"><StarFill /><StarFill /><StarFill /><StarFill /><Star /></Row> :
									e.rating === 3 ? <Row className="starRate"><StarFill /><StarFill /><StarFill /><Star /><Star /></Row> :
										e.rating === 2 ? <Row className="starRate"><StarFill /><StarFill /><Star /><Star /><Star /></Row> :
											e.rating === 1 ? <Row className="starRate"><StarFill /><Star /><Star /><Star /><Star /></Row> :
												<Row className="starRate"><Star /><Star /><Star /><Star /><Star /></Row>
							}
						</Row>
						<Row className="starAuthor" style={{ margin: "3px" }}>
							{e.author.name}&nbsp;&nbsp;&nbsp; от &nbsp;
							{e.updated_at.split("T")[0]}
						</Row >
						<Row style={{ margin: "3px" }}>
							{e.text}
						</Row></Card>)
				}
				)}
			</Col>
		</Row >
	);
}

export default ReviewsBlock;
