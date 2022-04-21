import {useGetTodosQuery} from "../store/api/appApi"
import {Container, Typography} from "@mui/material"
import {TodoCard} from "../components/TodoCard"

export const Todos = () => {
  const {data, isLoading, isError} = useGetTodosQuery()
  if (isError || isLoading) return <div>Wait!</div>
  return (
    <Container maxWidth="md">
      {data && data.map(todo => {
        return <TodoCard key={todo._id}
                         id={todo._id}
                         title={todo.title}
                         description={todo.description}
                         status={todo.status}
                         rating={todo.rating}
        />
      })}

      {(!data || data.length === 0) &&
        <Typography component="h1" variant="h4" sx={{textAlign: 'center'}}>
          You have no todos yet!
        </Typography>
      }
    </Container>
  )
}
