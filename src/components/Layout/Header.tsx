import React, { useEffect, useState } from "react";
import LogoSVG from "../../assets/logo.svg";
import { getCities } from "../../utils/functions";
import { HeaderProps, RealState, SearchSelected } from "../../utils/interfaces";
import LocationOption from "../LocationOption";
import "../styles/Layout/Header.css";

const defaultTypeSearch: SearchSelected<boolean, boolean> = {
	location: false,
	guests: false,
};

const Header = ({
	data,
	selectedCity,
	qtyGuests,
	setSelectedCity,
	setSearchGuests,
	applySearch,
}: HeaderProps): JSX.Element => {
	// STATES
	const [headerActive, setHeaderActive] = useState<boolean>(false),
		[cityOptions, setCityOptions] = useState<RealState["city"][]>([]),
		[typeSearchSelected, setTypeSearchSelected] =
			useState<SearchSelected<boolean, boolean>>(defaultTypeSearch),
		[qtyAdults, setQtyAdults] = useState<number>(0),
		[qtyChildren, setQtyChildren] = useState<number>(0);

	// EFFECTS
	useEffect(() => {
		if (data.length) setCityOptions(getCities(data));
	}, [data]);

	useEffect(() => {
		if (headerActive) {
			document.body.style.overflow = "hidden";
		} else document.body.style.overflow = "auto";
	}, [headerActive]);

	useEffect(() => {
		setSearchGuests(qtyAdults + qtyChildren);
	}, [qtyAdults, qtyChildren, setSearchGuests]);

	// HANDLERS
	const handleActiveHeader = (typeSearch: string): void => {
		setHeaderActive(true);

		const newTypeSearchObj: SearchSelected<boolean, boolean> = {
			location: typeSearch === "location",
			guests: typeSearch === "guests",
		};

		setTypeSearchSelected(newTypeSearchObj);
	};

	const handleDeactiveHeader = (): void => {
		setTypeSearchSelected(defaultTypeSearch);
		setHeaderActive(false);
	};

	const handleSubtractQuantity = (adultGuest: boolean): void => {
		adultGuest
			? qtyAdults > 0 && setQtyAdults((prev: number) => prev - 1)
			: qtyChildren > 0 && setQtyChildren((prev: number) => prev - 1);
	};

	const handleAddQuantity = (adultGuest: boolean): void => {
		adultGuest
			? setQtyAdults((prev: number) => prev + 1)
			: setQtyChildren((prev: number) => prev + 1);
	};

	const handleApplySearch = (): void => {
		applySearch();
		handleDeactiveHeader();
	};

	const handleOutDeactiveHeader = (e: React.MouseEvent): void => {
		const target: HTMLDivElement = e.target as HTMLDivElement;
		target.matches(".header-wrapper") && handleDeactiveHeader();
	};

	return (
		<div
			className={
				headerActive ? "header-wrapper wrapper-active" : "header-wrapper"
			}
			onClick={handleOutDeactiveHeader}
		>
			<header className={`header ${headerActive ? "header-expand" : ""}`}>
				{!headerActive ? (
					<h1>
						<img src={LogoSVG} alt="Windbnb logo" className="windbnb-logo" />
					</h1>
				) : (
					<div className="top-header">
						<p>Edita tu búsqueda</p>
						<button
							type="button"
							className="deactivate-btn"
							onClick={handleDeactiveHeader}
						>
							<i className="fa-solid fa-xmark"></i>
						</button>
					</div>
				)}

				<div className={headerActive ? "filter-wrapper" : ""}>
					<form id="search-form" className="form">
						<fieldset className={headerActive ? "filter-column" : undefined}>
							<div
								className={`input-wrapper ${
									headerActive ? "iwrapper-header-active" : undefined
								} ${
									typeSearchSelected.location ? "search-selected" : undefined
								}`}
							>
								{headerActive && (
									<label
										htmlFor="input-location"
										className={headerActive ? "label-header-active" : undefined}
									>
										Localización
									</label>
								)}
								<input
									type="text"
									id="input-location"
									className={`input-location ${
										headerActive ? "input-fullWidth" : undefined
									}`}
									value={selectedCity ? `${selectedCity}, Finlandia` : ""}
									placeholder="Añadir localización"
									readOnly
									onClick={() => handleActiveHeader("location")}
								/>
							</div>
							<div
								className={`input-wrapper ${
									headerActive ? "iwrapper-header-active" : undefined
								} ${typeSearchSelected.guests ? "search-selected" : undefined}`}
							>
								{headerActive && (
									<label
										htmlFor="input-guests"
										className={headerActive ? "label-header-active" : undefined}
									>
										Huéspedes
									</label>
								)}
								<input
									type="text"
									id="input-guests"
									className={`input-guests ${
										headerActive ? "input-fullWidth" : undefined
									}`}
									value={
										qtyGuests
											? `${qtyGuests} huésped${qtyGuests > 1 ? "es" : ""}`
											: ""
									}
									placeholder="Añadir huéspedes"
									readOnly
									onClick={() => handleActiveHeader("guests")}
								/>
							</div>
							{!headerActive ? (
								<button
									type="button"
									className="btn-submit"
									onClick={() => handleActiveHeader("location")}
								>
									<i className="fa-solid fa-magnifying-glass"></i>
								</button>
							) : (
								<button
									type="button"
									className="btn-submit-search"
									onClick={handleApplySearch}
								>
									<i className="fa-solid fa-magnifying-glass"></i>
									<span>Buscar</span>
								</button>
							)}
						</fieldset>
					</form>

					<div className={headerActive ? "filter-controls-wrapper" : undefined}>
						{typeSearchSelected.location ? (
							<ul className="locations-list">
								{cityOptions.map(
									(cityOpt: string, i: number): JSX.Element => (
										<LocationOption
											key={i}
											city={cityOpt}
											setSelectedCity={setSelectedCity}
										/>
									)
								)}
							</ul>
						) : typeSearchSelected.guests ? (
							<div className="type-person-all-wrapper">
								<div className="type-person-wrapper">
									<p className="type-person">Adultos</p>
									<p className="age-category">A partir de 13 años</p>
									<div className="qty-people-wrapper">
										<button
											type="button"
											className="guests-btn"
											onClick={() => handleSubtractQuantity(true)}
										>
											<i className="fa-solid fa-minus"></i>
										</button>
										<span className="qty-people">{qtyAdults}</span>
										<button
											type="button"
											className="guests-btn"
											onClick={() => handleAddQuantity(true)}
										>
											<i className="fa-solid fa-plus"></i>
										</button>
									</div>
								</div>
								<div className="type-person-wrapper">
									<p className="type-person">Niños</p>
									<p className="age-category">De 2 a 12 años</p>
									<div className="qty-people-wrapper">
										<button
											type="button"
											className="guests-btn"
											onClick={() => handleSubtractQuantity(false)}
										>
											<i className="fa-solid fa-minus"></i>
										</button>
										<span className="qty-people">{qtyChildren}</span>
										<button
											type="button"
											className="guests-btn"
											onClick={() => handleAddQuantity(false)}
										>
											<i className="fa-solid fa-plus"></i>
										</button>
									</div>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</header>
		</div>
	);
};

export default Header;
