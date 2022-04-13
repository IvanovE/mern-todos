import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuItem from "@mui/material/MenuItem"
import {TEXT} from "../constants/TEXT"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import {useLogoutMutation} from "../store/api/authApi"

const styles = {
  flexGrow: {
    flexGrow: 1
  }
}

export const Header = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn)
  const [logout] = useLogoutMutation()

  return (
    <Box sx={styles.flexGrow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.flexGrow}>
            <Link to={'/'}>{TEXT.title}</Link>
          </Typography>
          {!isSignedIn &&
            <>
              <Link to={'/login'}>
                <MenuItem>{TEXT.login}</MenuItem>
              </Link>
              <Link to={'/signup'}>
                <MenuItem>{TEXT.signup}</MenuItem>
              </Link>
            </>
          }
          {isSignedIn &&
            <>
              <Link to={'/create'}>
                <MenuItem>{TEXT.create}</MenuItem>
              </Link>
              <Link to={'/todos'}>
                <MenuItem>{TEXT.todos}</MenuItem>
              </Link>
              <MenuItem onClick={logout}>{TEXT.logout}</MenuItem>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
