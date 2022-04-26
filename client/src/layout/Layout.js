import {Header} from "./Header"
import {Box} from "@mui/material"
import {HEADER_HEIGHT, CONTENT_MARGIN_TOP} from "../constants/styles"

const styles = {
  content: {
    flexGrow: 1,
    minHeight: `calc(100vh - ${CONTENT_MARGIN_TOP} - ${HEADER_HEIGHT})`,
    marginTop: CONTENT_MARGIN_TOP
  }
}

export const Layout = ({children}) => {
  return (
    <>
      <Header />
      <Box sx={styles.content}>
        {children}
      </Box>
    </>
  )
}
