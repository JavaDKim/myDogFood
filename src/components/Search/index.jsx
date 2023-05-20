import './style.css';
import { Search } from 'react-bootstrap-icons';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SearchProd = ({ prodArr, setProducts }) => {
	const navigate = useNavigate()
	const click = () => { navigate("/catalog") }
	const [text, setText] = useState("")
	const searchByText = (e) => {
		let val = e.target.value
		setText(val)
		let result = prodArr.filter(e => e.name.toLowerCase().includes(val.toLowerCase()))
		setProducts(result);
	}
	return (
		<div className="search_block">
			<input className="input_search" type="search" placeholder='найти' value={text} onChange={searchByText} />
			<button className="btn_search" onClick={click}><Search /></button>
		</div>
	);
}

export default SearchProd;
