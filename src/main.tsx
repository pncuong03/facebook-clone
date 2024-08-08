import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.ts'
import CssBaseline from '@mui/material/CssBaseline'
import initRequest from './utilities/services/initRequest.ts'
import ReactModal from 'react-modal'

const container = document.getElementById('root')!
const root = createRoot(container)
ReactModal.setAppElement('#root')
initRequest()

root.render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <CssBaseline />
        <App />
      </I18nextProvider>
    </CssVarsProvider>
  </Provider>
)
