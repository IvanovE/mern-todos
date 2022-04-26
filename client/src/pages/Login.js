import {TextField, Button, Container, Typography, Box} from "@mui/material"
import {text} from "../constants/text"
import {useLoginMutation} from "../store/api/appApi"
import {Controller, useForm} from "react-hook-form"
import {useHistory} from "react-router-dom"

const styles = {
  errors: {
    color: 'red'
  },
  btn: {
    marginTop: '1rem'
  }
}

const defaultFormValues = {
  email: '',
  password: ''
}

export const Login = () => {
  const [login] = useLoginMutation()
  const history = useHistory()
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: defaultFormValues
  })

  const onSubmit = async (data) => {
    const {error} = await login(data)
    if (error) {
      return
    }
    history.replace('/')
  }

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        {text.login}
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
          <Box sx={styles.errors}>
            {errors?.email?.type === 'required' && "Email is required"}
            {errors?.email?.type === 'pattern' && "Must be an email"}
          </Box>
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
          <Box sx={styles.errors}>
            {errors?.password?.type === 'required' && "Password is required"}
          </Box>
        }

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={styles.btn}
        >
          {text.login}
        </Button>
      </form>
    </Container>
  )
}
