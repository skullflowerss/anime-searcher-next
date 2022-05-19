import styles from "../[slug]/Result.module.css";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../_app";

//"https://kitsu.io/api/edge/anime?filter[text]=naruto"

const index = () => {
	/* eslint-disable */
	const { data } = useContext(DataContext);

	const router = useRouter();

	const id = router.query.id;

	const [anime, setAnime] = useState({});

	const handleAnimeTitles = async (anime) => {
		if (Object.keys(anime).length != 0) {
			try {
				const data = {
					id: anime["mal_id"],
					title: anime.title,
					type: anime.type,
					synopsis: anime.synopsis,
					link: anime.url,
					image: anime.image_url,
				};
				const response = await fetch("/api/animeBase", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});
				const dbAnime = await response.json();
				console.log(dbAnime);
			} catch (e) {
				throw new Error(e);
			}
		}
	};

	useEffect(async () => {
		if (data.length != 0) {
			const animeHolder = data.find((e) => {
				return e["mal_id"].toString() === id;
			});
			animeHolder["mal_id"] = animeHolder["mal_id"].toString();
			animeHolder.start_date = animeHolder.start_date.substring(0, 10);
			animeHolder.end_date = animeHolder.end_date.substring(0, 10);
			setAnime(animeHolder);
			await handleAnimeTitles(anime);
		} else {
			return;
		}
	}, [id, anime]);

	const {
		title,
		image_url,
		synopsis,
		type,
		episodes,
		start_date,
		end_date,
		url,
	} = anime;

	if (Object.keys(anime).length != 0) {
		return (
			<>
				<Head>
					<title>
						Search result: {title} - {type}
					</title>
				</Head>
				<div className={styles.container}>
					<div className={styles.pageContainer}>
						<h1 className={styles.title}>{title}</h1>
						<img src={image_url} alt="" className={styles.image} />
						<div className={styles.infoBox}>
							<div className={styles.mediaInfo}>
								<div className={styles.typeMedia}>Media: {type}</div>|
								<div className={styles.episodes}>
									{episodes > 1 ? <>{episodes + " episodes"}</> : <>{episodes}</>}
								</div>
							</div>
							<div className={styles.date}>
								{start_date} / {end_date}
							</div>
						</div>

						<div className={styles.description}>
							<div className={styles.description_title}>Synopsis:</div>
							<div className={styles.description_text}>{synopsis}</div>
						</div>
						<a href={url} className={styles.urlLink}>
							MAL
						</a>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<h1>Looking :)</h1>
			</>
		);
	}
};

export default index;
