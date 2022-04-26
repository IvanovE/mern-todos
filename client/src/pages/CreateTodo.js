import Container from "@mui/material/Container"
import {Box, Rating, TextField} from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import {text} from "../constants/text"
import {Controller, useForm} from "react-hook-form"
import {useCreateMutation} from "../store/api/appApi"

const styles = {
  errors: {
    color: 'red'
  },
  mt: {
    marginTop: '2rem'
  },
  rating: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem'
  }
}

const defaultFormValues = {
  title: '',
  description: '',
  rating: 1
}

export const CreateTodo = () => {
  const [createTodo] = useCreateMutation()
  const { handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: defaultFormValues
  })

  const onSubmit = (data) => {
    createTodo(data)
    reset()
  }

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        {text.createTodo}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name='title'
          control={control}
          rules={{
            required: true
          }}
          render={({ field: {value, onChange} }) =>
            <TextField
              value={value}
              onChange={onChange}
              margin="normal"
              id="title"
              label="Title"
              variant="outlined"
              required
              fullWidth
              autoFocus
            />
          }
        />
        {errors?.title &&
          <Box sx={styles.errors}>
            {errors?.title?.type === 'required' && "Title is required"}
          </Box>
        }
        <Controller
          name='description'
          control={control}
          rules={{
            required: true
        }}
          render={({ field: {value, onChange} }) =>
            <TextField
              value={value}
              onChange={onChange}
              margin="normal"
              id="outlined-textarea"
              label="Description"
              required
              fullWidth
              multiline
              rows={6}
            />
          }
        />
        {errors?.description &&
          <Box sx={styles.errors}>
            {errors.description?.type === 'required' && "Description is required"}
          </Box>
        }
        <Box sx={styles.rating}>
          <Typography component="legend">Set rating for the task</Typography>
          <Controller
            name='rating'
            control={control}
            render={({ field: {value, onChange} }) =>
              <Rating
                name="simple-controlled"
                value={+value}
                onChange={onChange}
              />
            }
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={styles.mt}
        >
          {text.create}
        </Button>
      </form>
    </Container>
  )
}
