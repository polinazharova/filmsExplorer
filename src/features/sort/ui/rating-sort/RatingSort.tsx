import styles from './RatingSort.module.scss'
import {Box, Slider, Typography} from "@mui/material";
import {Dispatch, SetStateAction} from "react";

function valuetext(value: number) {
    return `Рейтинг ${value} из 10`;
}

interface Props {
    rating : number[];
    setRating : Dispatch<SetStateAction<number[]>>;
}

export const RatingSort = ({rating, setRating} : Props) => {
    const handleChange = (_event: Event, newRating: number[]) => {
        setRating(newRating);
    };

    return (
        <div className={styles['rating-sort']}>
            <Box sx={{width: 300}}>
                <Typography sx={{fontFamily: 'Raleway, sans-serif'}} id="rating-slider-label" gutterBottom>
                    Рейтинг IMDb
                </Typography>
                <Slider
                    getAriaLabel={() => 'Years range'}
                    value={rating}
                    min={0}
                    max={10}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    marks={[
                        { value: 0, label: '0' },
                        { value: 10, label: '10' }
                    ]}
                    aria-labelledby="rating-slider-laber"
                    sx={{color: "#b9b9b9",
                        '& .MuiSlider-thumb': {
                            '&:hover': {
                                boxShadow: '0 0 0 8px rgba(185, 185, 185, 0.46)',
                            },
                        },
                    }}
                />
            </Box>
        </div>
    );
}
