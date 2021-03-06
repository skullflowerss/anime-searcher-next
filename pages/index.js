import styles from "../styles/Home.module.css";

import Head from "next/head";
import Banner from "../components/Banner/Banner";

import { fetchInfo, makeid } from "../utils/helpers";
import React, { useState, useContext, useEffect } from "react";
import Media from "../components/Media/Media";

import { DataContext } from "./_app";

export default function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);
	const [isDisabled, setDisable] = useState(true);
	const { data, setData } = useContext(DataContext);
	/* eslint-disable */
	useEffect(() => {
		const hash = window.localStorage.getItem("id_search");
		console.log(JSON.parse(hash));
		if (data.length != 0) {
			const result = data
				? data.reduce((acc, anime) => {
						const { type } = anime;
						if (acc[type] === undefined) acc[type] = [];
						acc[type].push(anime);
						return acc;
				  }, {})
				: [];
			setResults(result);
		}
	}, []);

	const handleChange = (e) => {
		const value = e.target.value;

		if (value.length > 0) {
			setDisable(false);
		} else {
			setDisable(true);
		}
		setSearchTerm(value);
	};

	const handleClick = async () => {
		let data;
		const hash = JSON.parse(window.localStorage.getItem("id_search"));
		if (hash) {
			let wordSearch = {
				hashValue: hash.hashValue,
				searchTerm: searchTerm,
			};
			window.localStorage.setItem("id_search", JSON.stringify(wordSearch));
			data = await fetchInfo(searchTerm);
		} else {
			let hashValue = makeid(5);
			let wordSearch = {
				hashValue: hashValue,
				searchTerm: searchTerm,
			};
			window.localStorage.setItem("id_search", JSON.stringify(wordSearch));
			data = await fetchInfo(searchTerm);
		}

		setData(data);
		const result = data
			? data.reduce((acc, anime) => {
					const { type } = anime;
					if (acc[type] === undefined) acc[type] = [];
					acc[type].push(anime);
					return acc;
			  }, {})
			: [];
		setResults(result);
	};

	const searcher = {
		handleChange,
		handleClick,
	};

	if (results.length === 0) {
		return (
			<>
				<Head>
					<title>Anime Searcher</title>
					<meta name="description" content="Generated by create next app" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className={styles.main}>
					<Banner search={searcher} disable={isDisabled} val={searchTerm} />
					<div>Loading...</div>
				</div>
			</>
		);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Anime Searcher</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.main}>
				<Banner search={searcher} disable={isDisabled} />
				{Object.keys(results).map((key, i) => {
					return (
						<>
							<Media anime={results[key]} name={key} key={i} />
						</>
					);
				})}
			</div>
		</div>
	);
}
