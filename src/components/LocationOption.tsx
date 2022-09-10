import { LocationOptionProps } from "../utils/interfaces";
import "./styles/LocationOption.css";

const LocationOption = ({
	city,
	setSelectedCity,
}: LocationOptionProps): JSX.Element => {
	return (
		<li className="location-option" onClick={() => setSelectedCity(city)}>
			<i className="fa-solid fa-location-dot"></i>{" "}
			<span>{city}, Finlandia</span>
		</li>
	);
};

export default LocationOption;
