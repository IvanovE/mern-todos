import {Container, Typography} from "@mui/material"
import {text} from "../constants/text"
import {useGetTodosQuery} from "../store/api/appApi"
import {TodoCard} from "../components/TodoCard"
import {Loader} from '../components/Loader'

const styles = {
  error: {
    textAlign: 'center'
  }
}

export const Todos = () => {
  const {data, isLoading, isError} = useGetTodosQuery()

  return (
    <>
      {isLoading &&
        <Loader />
      }

      {isError &&
        <Typography sx={styles.error} component='h1' variant='h4'>
          {text.error}
        </Typography>
      }

      {!isLoading && !isError &&
        <Container maxWidth="md">
          {data && data.map(todo => {
            return (
              <TodoCard
                key={todo._id}
                id={todo._id}
                title={todo.title}
                description={todo.description}
                status={todo.status}
                rating={todo.rating}
              />
            )
          })}

          {!data.length &&
            <Typography component="h1" variant="h4" sx={{textAlign: 'center'}}>
              {text.noTodos}
            </Typography>
          }
        </Container>
      }
    </>
  )
}
