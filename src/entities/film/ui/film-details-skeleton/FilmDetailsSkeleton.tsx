import styles from './FilmDetailsSkeleton.module.scss';
import Skeleton from '@mui/material/Skeleton';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export const FilmDetailsSkeleton = () => {
    return (
        <div className={styles["film"]}>
            <div className={styles["film-comp"]}>
                <div className={styles["left-comp"]}>
                    <Skeleton variant="text" width={200} height={30} />
                    <Skeleton variant="rectangular" width={220} height={320} className={styles["film-poster"]} />
                </div>
                <div className={styles["right-comp"]}>
                    <Skeleton variant="text" width={150} height={25} />
                    <div className={styles["film-genres"]}>
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <Skeleton key={idx} variant="rounded" width={60} height={24} style={{ marginRight: 5 }} />
                        ))}
                    </div>
                    <div className={styles["rating-container"]}>
                        <Skeleton variant="text" width={100} height={20} />
                        {Array.from({ length: 2 }).map((_, idx) => (
                            <div key={idx} className={styles["film-rating"]}>
                                <Skeleton variant="text" width={120} height={20} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <Checkbox disabled color="error" icon={<FavoriteBorder />} />
            </div>

            <article className={styles["film-desc"]}>
                <Skeleton variant="text" width="100%" height={40} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="95%" height={20} />
            </article>
        </div>
    );
};
