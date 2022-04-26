import {Box} from "@mui/material"
import '../styles/loader.css'
import {CONTENT_MARGIN_TOP, HEADER_HEIGHT} from "../constants/styles"

const styles = {
  spinner: {
    height: `calc(100vh - ${CONTENT_MARGIN_TOP} - 3 * ${HEADER_HEIGHT})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export const Loader = () => {
  return (
    <Box sx={styles.spinner}>
      <div className='loader'/>
    </Box>
  )
}
