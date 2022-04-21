import Container from "@mui/material/Container"
import {Rating, TextField} from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import {TEXT} from "../constants/TEXT"
import {Controller, useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {useCreateMutation} from "../store/api/appApi";

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

export const CreateTodo = () => {
  const [createTodo] = useCreateMutation()
  const { handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      rating: 1
    }
  })

  const onSubmit = (data) => {
    createTodo(data)
    reset()
    toast.success('ToDo Created!')
  }

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        {TEXT.createTodo}
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
          <div style={styles.errors}>
            {errors?.title?.type === 'required' && "Title is required"}
          </div>
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
          <div style={styles.errors}>
            {errors?.description?.type === 'required' && "Description is required"}
          </div>
        }
        <div style={styles.rating}>
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
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={styles.mt}
        >
          {TEXT.create}
        </Button>
      </form>
    </Container>
  )
}
