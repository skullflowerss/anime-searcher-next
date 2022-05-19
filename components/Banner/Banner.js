import styles from "../Banner/Banner.module.css";

const Banner = ({ search, disable }) => {
	return (
		<div className={styles.container}>
			<div className={styles.bannerTextWrapper}>
				<h1 className={styles.title}>Weebo Search Tool</h1>
				<div className={styles.description}>
					<p>Write the anime you want to search in the input.</p>
				</div>
			</div>
			<div className={styles.searchWrapper}>
				<input
					type="text"
					className={styles.input}
					onChange={search.handleChange}
					value={search.val}
				/>
				<button
					className={styles.searchButton}
					onClick={search.handleClick}
					disabled={disable}
				>
					Search
				</button>
			</div>
		</div>
	);
};

export default Banner;
