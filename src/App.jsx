import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import './App.css';
import Body from './Body';
import Favorites from './Favorites';
import { Provider } from 'react-redux';
import store from './redux/store';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Body />,
    },
    {
        path: '/favorites',
        element: <Favorites />,
    },
]);

const App = () => (
    <Provider store={store}> 
        <RouterProvider router={router} />
    </Provider>
);

export default App;
