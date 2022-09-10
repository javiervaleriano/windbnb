import { RealStateItemProps } from "../utils/interfaces";
import "./styles/RealStateItem.css";

const RealStateItem = ({
	beds,
	photo,
	rating,
	superHost,
	title,
	type,
}: RealStateItemProps): JSX.Element => {
	return (
		<article className="realstate-item">
			<figure className="realstate-img-wrapper">
				<img src={photo} alt={title} className="realstate-img" />
				<figcaption className="realstate-img-desc">
					<div className="realstate-type-wrapper">
						{superHost && (
							<span className="realstate-superhost">Super Host</span>
						)}
						{beds ? `${type} . ${beds} ${beds > 1 ? "camas" : "cama"}` : type}
					</div>
					<span>
						<i className="fa-solid fa-star"></i>
						{rating}
					</span>
				</figcaption>
			</figure>
			<h3 className="realstate-title">{title}</h3>
		</article>
	);
};

export default RealStateItem;
