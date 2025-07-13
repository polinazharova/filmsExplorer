import styles from './FilmCardSkeleton.module.scss';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const FilmCardSkeleton = () => {
    return (
        <div className={styles["film-card-skeleton"]}>
            <Stack spacing={1} alignItems="center" width="100%">
                <Skeleton variant="rectangular" width={285} height={520} />
            </Stack>
        </div>
    );
};
