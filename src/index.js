import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './config/localization'
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
