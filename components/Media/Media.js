import styles from "../Media/Media.module.css";
import Card from "../Card/Card";

function Media({ anime, name }) {
	return (
		<div className={styles.mediaBox}>
			<h1 className={styles.mediaTitle}>{name}</h1>
			{
				<div className={styles.cardLayout}>
					{anime.map((e, i) => {
						return (
							<>
								<Card anime={e} key={name + i} />
							</>
						);
					})}
				</div>
			}
		</div>
	);
}

export default Media;
