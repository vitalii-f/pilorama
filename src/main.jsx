import ReactDOM from 'react-dom/client'
import './index.css'
import './reset.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Router from './components/layout/ui/Router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './store/store'

const queryClien = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <QueryClientProvider client={queryClien}>
        <Router />
      </QueryClientProvider>
    </Provider>
)
