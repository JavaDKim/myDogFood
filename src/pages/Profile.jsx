import { Link } from "react-router-dom";
import { BoxArrowInLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => {
	const navigate = useNavigate();
	const logOut = (e) => {
		e.preventDefault();
		setUser("")
		localStorage.removeItem("dogUser")
		localStorage.removeItem("dogUserId")
		localStorage.removeItem("dogToken")
		localStorage.removeItem("discountProducts")
		localStorage.removeItem("newProducts")
		localStorage.removeItem("saleProducts")
		navigate("/")
	}
	return (<div className="profile">
		<div>
			Добро пожаловать,&nbsp;{user}!
		</div>
		<Link to="/" title="Выйти" onClick={logOut}>
			<BoxArrowInLeft /> <span>Выйти</span>
		</Link>
	</div>
	);
}

export default Profile;
