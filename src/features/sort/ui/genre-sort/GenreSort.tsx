import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {GENRES} from "@/features/sort/model/genres.const.ts";


interface Props {
    genre : string[];
    setGenre : Dispatch<SetStateAction<string[]>>;
}

export const GenreSort = ({genre, setGenre} : Props) => {
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setGenre(value as string[]);
    }

    return (
        <FormControl sx={{ width: 300 }}>
            <InputLabel id="genre-select-label" sx={{
                '&.Mui-focused': {
                color: 'black', // цвет в фокусе
            },
            }}>Жанры</InputLabel>
            <Select
                labelId="genre-select-label"
                multiple
                value={genre}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                sx={{fontFamily: 'Raleway, sans-serif',
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "gray",
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#b9b9b9",
                    },
                }}
            >
                {GENRES.map((currGenre : string) => (
                    <MenuItem key={currGenre} value={currGenre} sx={{
                            '&.Mui-selected': {
                                backgroundColor: '#E5E6EA',
                                '&:hover': {
                                    backgroundColor: '#b9b9b9',
                                },
                            },

                    }}>
                        <Checkbox checked={genre.includes(currGenre)} sx={{
                            '&.Mui-checked': {
                                color: "gray",
                            },
                        }} />
                        <ListItemText primary={currGenre}   sx={{
                            '& .MuiTypography-root': {
                                fontFamily: 'Raleway, sans-serif',
                            }
                        }}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
