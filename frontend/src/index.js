import { StrictMode } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import '@fontsource-variable/jetbrains-mono'

// * Next steps
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
// https://reactrouter.com/docs/en/v6/upgrading/v5
// Error is coming from Navgiation file and saying I'm destructing an undefined value

import './index.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './context/Modal'
import App from './App.js'

import configureStore from './store'
import { restoreCSRF, csrfFetch } from './store/csrf'
import * as sessionActions from './store/session'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

// grabs the locally-stored cart and loads all of its items inside the cart
const loadSavedCart = () => {
  try {
    const cart = localStorage.getItem('cart')
    if (!cart) {
      return undefined
    }
    return JSON.parse(cart)
  } catch (err) {
    return undefined
  }
}

const loadFilterState = () => {
  try {
    const cart = localStorage.getItem('filters')
    if (!cart) {
      return undefined
    }
    return JSON.parse(cart)
  } catch (err) {
    return undefined
  }
}

// sets the state to have a key: of shoppingCart and values of the loaded shoes inside the cart
const savedCart = { shoppingCart: loadSavedCart(), filters: loadFilterState() }
const store = configureStore(savedCart)
// Testing purposes only
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF()

  window.csrfFetch = csrfFetch
  window.store = store
  window.sessionActions = sessionActions
}

const breakpoints = {
  base: "0em", // 0px
  sm: "25.875em", // ~480px. em is a relative unit and is dependant on the font size.
  md: "48em", // ~768px
  lg: "62em", // ~992px
  xl: "80em", // ~1280px
  "2xl": "96em", // ~1536px
};

const theme = extendTheme({
  fonts: {
    heading: '\'Open Sans\', sans-serif',
    // body: `'Raleway', sans-serif`,
    body: '\'JetBrains Mono Variable\', sans-serif'
  },
  breakpoints
})

function SnkrMrkt () {
  return (
    <ChakraProvider theme={theme}>
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ModalProvider>
    </ChakraProvider>
  )
}

root.render(
  <StrictMode>
    <SnkrMrkt />
  </StrictMode>
)
