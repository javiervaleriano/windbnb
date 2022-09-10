import { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import RealStateItem from "./components/RealStateItem";

import { AppService } from "./services/app.service";
import { RealState, SearchSelected } from "./utils/interfaces";

const defaultAppliedSearch: SearchSelected<string, number> = {
	location: "",
	guests: 0,
};

function App(): JSX.Element {
	// STATES
	const [allData, setAllData] = useState<RealState[]>([]),
		[filteredData, setFilteredData] = useState<RealState[]>([]),
		[selectedCity, setSelectedCity] = useState<string>(""),
		[searchGuests, setSearchGuests] = useState<number>(0),
		[appliedSearch, setAppliedSearch] =
			useState<SearchSelected<string, number>>(defaultAppliedSearch),
		[fixedFooter, setFixedFooter] = useState<boolean>(false);

	// REFS
	const refStaysGrid = useRef<HTMLElement>(null);

	// EFFECTS
	useEffect(() => {
		const getRealStates = async (): Promise<void> => {
			const newData: RealState[] = await AppService.getData<RealState>(
				"./db/stays.json"
			);

			setAllData(newData);
			setFilteredData(newData);
		};

		getRealStates();
	}, []);

	useEffect(() => {
		let copyData: RealState[] = [...allData];

		if (appliedSearch.location && appliedSearch.guests) {
			copyData = copyData.filter(
				({ city, maxGuests }: RealState) =>
					appliedSearch.location === city && appliedSearch.guests <= maxGuests
			);
		} else if (appliedSearch.location) {
			copyData = copyData.filter(
				({ city }: RealState) => appliedSearch.location === city
			);
		} else if (appliedSearch.guests) {
			copyData = copyData.filter(
				({ maxGuests }: RealState) => appliedSearch.guests <= maxGuests
			);
		}

		setFilteredData(copyData);
	}, [appliedSearch, allData]);

	useEffect(() => {
		const wHeight: number = window.innerHeight,
			staysGridHeight: number | undefined =
				refStaysGrid.current?.getBoundingClientRect().height;

		if (typeof staysGridHeight === "number") {
			setFixedFooter(staysGridHeight < wHeight / 2);
		}
	}, [filteredData.length]);

	// HANDLERS
	const handleApplySearch = (): void =>
		setAppliedSearch({ location: selectedCity, guests: searchGuests });

	return (
		<>
			<Header
				data={allData}
				selectedCity={selectedCity}
				qtyGuests={searchGuests}
				setSelectedCity={setSelectedCity}
				setSearchGuests={setSearchGuests}
				applySearch={handleApplySearch}
			/>

			<main>
				<div className="main-title-wrapper">
					<h2 className="main-title">Estancias en Finlandia</h2>
					<p className="qty-stays">
						{filteredData.length > 12 ? "12+" : filteredData.length} estancia
						{filteredData.length === 1 ? "" : "s"}
					</p>
				</div>
				<section className="stays-grid" ref={refStaysGrid}>
					{filteredData.map(
						(
							{ beds, photo, rating, superHost, title, type }: RealState,
							i: number
						) => {
							return (
								<RealStateItem
									key={i}
									beds={beds}
									photo={photo}
									rating={rating}
									superHost={superHost}
									title={title}
									type={type}
								/>
							);
						}
					)}
				</section>
			</main>

			<footer className={`footer ${fixedFooter ? "fixed-bottom" : undefined}`}>
				<p>
					creado por{" "}
					<a
						href="https://javiervaleriano.github.io/javiervaleriano-portfolio"
						target="_blank"
						rel="noreferrer"
						className="author-link"
					>
						Javier Valeriano
					</a>
				</p>
			</footer>
		</>
	);
}

export default App;
