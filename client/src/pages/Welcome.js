import {Typography, Box, Button} from "@mui/material"
import {text} from "../constants/text"
import {CONTENT_MARGIN_TOP, HEADER_HEIGHT} from "../constants/styles"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"

const styles = {
  content: {
    height: `calc(100vh - ${CONTENT_MARGIN_TOP} - 3 * ${HEADER_HEIGHT})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  actions: {
    display: 'flex'
  },
  mr: {
    marginRight: '1rem'
  }
}

export const Welcome = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn)

  return (
    <Box sx={styles.content}>
      <Typography component='h1' variant='h4' sx={styles.title}>
        {text.appTitle}
      </Typography>

      {isSignedIn &&
        <Box sx={styles.actions}>
          <Box sx={styles.mr}>
            <Link to={'/create'}>
              <Button variant="contained">{text.create}</Button>
            </Link>
          </Box>
          <Box>
            <Link to={'/todos'}>
              <Button variant="outlined">{text.todos}</Button>
            </Link>
          </Box>
        </Box>
      }

      {!isSignedIn &&
        <Box sx={styles.actions}>
          <Box sx={styles.mr}>
            <Link to={'/signup'}>
              <Button variant="contained">{text.signup}</Button>
            </Link>
          </Box>
          <Box>
            <Link to={'/login'}>
              <Button variant="outlined">{text.login}</Button>
            </Link>
          </Box>
        </Box>
      }
    </Box>
  )
}
