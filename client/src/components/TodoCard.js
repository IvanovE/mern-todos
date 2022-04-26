import {
  Box,
  FormControl,
  Paper,
  Rating,
  Select,
  Typography
} from "@mui/material"
import {useChangeRatingMutation, useChangeStatusMutation} from "../store/api/appApi"
import {MenuItem} from "@mui/material"
import {useState} from "react"

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.5rem',
    marginBottom: '1rem'
  },
  mb: {
    marginBottom: '1rem'
  },
  select: {
    width: '200px',
    justifyContent: 'center'
  }
}

export const TodoCard = ({id, title, description, rating, status}) => {
  const [changeRating] = useChangeRatingMutation()
  const [changeStatus] = useChangeStatusMutation()
  const [stat, setStat] = useState(status)
  const [rat, setRat] = useState(rating)

  const handleStatusChange = ({target: {value}}) => {
    changeStatus({
      id,
      value
    })
    setStat(value)
  }

  const handleRatingChange = ({target: {value}}) => {
    changeRating({
      id,
      value
    })
    setRat(+value)
  }

  return (
    <Paper elevation={3} sx={styles.card}>
      <Box>
        <Typography component="h1" variant="h5" sx={styles.mb}>
          {title}
        </Typography>
        <Typography component="h6" sx={styles.mb}>
          {description}
        </Typography>
        <Rating
          name="simple-controlled"
          value={rat}
          onChange={handleRatingChange}
        />
      </Box>
      <FormControl sx={styles.select}>
        <Select
          inputProps={{ 'aria-label': 'Without label' }}
          value={stat}
          onChange={handleStatusChange}
        >
          <MenuItem value={'completed'}>completed</MenuItem>
          <MenuItem value={'pending'}>pending</MenuItem>
          <MenuItem value={'active'}>active</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  )
}
