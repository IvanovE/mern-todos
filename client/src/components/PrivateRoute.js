import {Route, Redirect} from 'react-router-dom'
import {useSelector} from "react-redux"

export const PrivateRoute = ({children, ...rest}) => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn)

  return (
    isSignedIn
      ? (
        <Route {...rest}>
          {children}
        </Route>
        )
      : <Redirect to={'/login'} />
  )
}
