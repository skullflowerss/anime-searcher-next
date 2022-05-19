import styles from "../Card/Card.module.css";
import Link from "next/link";

const Card = ({ anime }) => {
	let link = anime["mal_id"];
	let title = anime["title"];
	let img = anime["image_url"];
	let description = anime["synopsis"];

	return (
		<div className={styles.cardElement}>
			<img src={img} className={styles.img} alt="" />
			<div className={styles.infoBox}>
				<h2 className={styles.moreInfo}>{title}</h2>
				<p className={styles.description}>{description}</p>
				<Link href={"/" + title + "/" + link}>
					<a>
						<div className={styles.buttonLink}>Go to page</div>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default Card;
