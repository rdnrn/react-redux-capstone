import Axios from 'axios';

const FETCH_DATA = 'react-redux-capstone/home/FETCH_DATA';

const initialHomeState = {
  home: [],
};

const key = 'f6218dad261945cd7da0a9f3a10a7b8c';

export const fetchData = (payload) => ({
  type: FETCH_DATA,
  payload,
});

export const fetchStockApi = () => async (dispatch) => {
  const actives = await Axios.get(`https://financialmodelingprep.com/api/v3/actives?limit=100&apikey=${key}`);
  const sortedActives = Object.entries(actives.data).map(([id, active]) => {
    const {
      companyName, changes, price, ticker,
    } = active;
    return {
      id, companyName, changes, price, ticker,
    };
  });
  dispatch(fetchData(sortedActives));
};

const homeReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { home: action.payload };
    default:
      return state;
  }
};

export default homeReducer;
