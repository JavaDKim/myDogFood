import "./style.css"
import { useState } from 'react';
import { Link } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import saleIcon from "../../assets/images/icons/sale.png"
import newIcon from "../../assets/images/icons/new.png"
const Card = ({ img, name, price, _id, discount, tags, likes, dogToken, setServerProduct }) => {
	const userLike = likes.includes(localStorage.getItem("dogUserId"))
	const [isLike, setIsLike] = useState(userLike)

	const updLike = (e) => {
		e.preventDefault()
		setIsLike(!isLike)
		fetch(
			`https://api.react-learning.ru/products/likes/${_id}`,
			{
				method: isLike ? 'DELETE' : 'PUT',
				headers: { "Authorization": `Bearer ${dogToken}` }
			})
			.then(res => res.json())
			.then(data => {
				setServerProduct((old) => {
					console.log(data);
					const arr = old.map((e) => {
						if (e._id === _id) { return data } else { return old }
					})
					return arr
				})
			})
			/* 			setServerProducts(function (prev) {
				const arr = prev.map((e) => { if (e._id === _id) { return data } else { return prev } })
				return arr
			})

			
 */	}

	return (
		<Link to={`/product/${_id}`} className="card" >
			<span className="headCard" >
				<span className="loveIcon" onClick={updLike}>{isLike ? <HeartFill /> : <Heart />}</span>
				{tags.map((e) => <span className="newSaleIcon" key={e}>
					{
						e === "sale"
							? <img src={saleIcon} alt="Распродажа" />
							: ""
					}
					{
						e === "new"
							? <img src={newIcon} alt="Новинка" />
							: ""
					}
				</span>)}
			</span>
			{/* {discount > 0 && <span><Percent /> {discount}</span>} */}
			<img src={img} className="card_image" alt="Картинка" />
			<span className="card_name">{name}</span>
			<span className="card_price">
				{discount > 0
					?
					<>
						<del style={{ color: "crimson" }}>{price}</del>&nbsp;
						{discount > 0 && <span style={{ color: "crimson" }}>-{discount}%</span>}&nbsp;
						<>=&nbsp;
							{price * (100 - discount) / 100}
						</>
					</>
					:
					price
				}&nbsp;
				р.</span>
			<button className="card_button">В корзину</button>

		</Link >
	);
}

export default Card;
