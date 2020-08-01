import { persistStore } from 'redux-persist';
import createSagaMiddeware from 'redux-saga';

import createStore from './createStore';
import persistReducers from './persistReducers';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddeware({ sagaMonitor });

const middewares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };