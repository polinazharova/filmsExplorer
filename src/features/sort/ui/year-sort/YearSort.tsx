import styles from './YearSort.module.scss'
import {Box, Slider, Typography} from "@mui/material";
import {Dispatch, SetStateAction} from "react";

function valuetext(value: number) {
    return `${value} год выхода`;
}

interface Props {
    year : number[];
    setYear : Dispatch<SetStateAction<number[]>>;
}

export const YearSort = ({year, setYear} : Props) => {
    const handleChange = (_event: Event, newYear: number[]) => {
        setYear(newYear);
    };

    return (
        <div className={styles['year-sort']}>
            <Box sx={{width: 300}}>
                <Typography sx={{fontFamily: 'Raleway, sans-serif'}} id="year-slider-label" gutterBottom>
                    Год выхода
                </Typography>
                <Slider
                    getAriaLabel={() => 'Year range'}
                    value={year}
                    min={1990}
                    max={2025}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    marks={[
                        { value: 1990, label: '1990' },
                        { value: 2025, label: '2025' }
                    ]}
                    aria-labelledby="year-slider-label"
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
