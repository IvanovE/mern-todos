import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter} from "react-router-dom"
import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import {store} from './store/store'

const root = createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

reportWebVitals()
