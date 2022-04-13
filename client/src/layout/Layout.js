import {Header} from "./Header"
import {Footer} from "./Footer"

const styles = {
  content: {
    flexGrow: 1,
    minHeight: `calc(100vh - 200px)`
  }
}

export const Layout = ({children}) => {
  return (
    <>
      <Header />
      <div style={styles.content}>
        {children}
      </div>
      <Footer />
    </>
  )
}
