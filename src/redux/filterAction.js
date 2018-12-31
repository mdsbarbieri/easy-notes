import ACTIONS from '../actionTypes';

const setCurrentFilter = (currentFilter) => ({
    type: ACTIONS.CURRENT_FILTER,
    payload: currentFilter
})

export {
    setCurrentFilter
}