import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuItem from "@mui/material/MenuItem"
import {text} from "../constants/text"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import {useLogoutMutation} from "../store/api/appApi"
import {HEADER_HEIGHT} from "../constants/styles"

const styles = {
  header: {
    flexGrow: 1,
    height: HEADER_HEIGHT
  },
  flexGrow : {
    flexGrow: 1
  }
}

export const Header = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn)
  const [logout] = useLogoutMutation()

  return (
    <Box sx={styles.header}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.flexGrow}>
            <Link to={'/'}>{text.barTitle}</Link>
          </Typography>
          {!isSignedIn &&
            <>
              <Link to={'/login'}>
                <MenuItem>{text.login}</MenuItem>
              </Link>
              <Link to={'/signup'}>
                <MenuItem>{text.signup}</MenuItem>
              </Link>
            </>
          }
          {isSignedIn &&
            <>
              <Link to={'/create'}>
                <MenuItem>{text.create}</MenuItem>
              </Link>
              <Link to={'/todos'}>
                <MenuItem>{text.todos}</MenuItem>
              </Link>
              <MenuItem onClick={logout}>{text.logout}</MenuItem>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
