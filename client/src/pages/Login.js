import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import {TEXT} from "../constants/TEXT"
import {useLoginMutation} from "../store/api/appApi"
import {Controller, useForm} from "react-hook-form"
import {useHistory} from "react-router-dom"
import {toast} from "react-toastify"

const styles = {
  errors: {
    color: 'red'
  },
  btn: {
    marginTop: '1rem'
  }
}

export const Login = () => {
  const [login] = useLoginMutation()
  const history = useHistory()
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    const {error} = await login(data)
    if (error) {
      return toast.error(error.data?.message || 'Invalid credentials')
    }
    toast.success('Welcome!!!')
    history.replace('/')
  }

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        {TEXT.login}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name='email'
          control={control}
          rules={{
            required: true,
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        }}
          render={({ field: {value, onChange} }) =>
            <TextField
              value={value}
              onChange={onChange}
              margin="normal"
              id="email"
              label="Email"
              variant="outlined"
              required
              fullWidth
              placeholder="test@test.com"
              autoFocus
            />
          }
        />

        {errors?.email &&
          <div style={styles.errors}>
            {errors?.email?.type === 'required' && "Email is required"}
            {errors?.email?.type === 'pattern' && "Must be an email"}
          </div>
        }

        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field: {value, onChange} }) =>
            <TextField
              value={value}
              onChange={onChange}
              margin="normal"
              id="password"
              label="Password"
              variant="outlined"
              required
              fullWidth
              type="password"
            />
          }
        />

        {errors?.password &&
          <div style={styles.errors}>
            {errors?.password?.type === 'required' && "Password is required"}
          </div>
        }

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={styles.btn}
        >
          {TEXT.login}
        </Button>
      </form>
    </Container>
  )
}
