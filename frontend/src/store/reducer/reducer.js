import { THEMES } from '../../themes/themes';

const initialState = {
  theme: THEMES[0],
  transactionTypes: [{
    id: 1,
    name: 'Income'
  }, {
    id: 2,
    name: 'Investment'
  }, {
    id: 3,
    name: 'Expense'
  }],
  transactionCategories: [{
    id: 1,
    name: 'Salary',
    type: 'Income'
  }, {
    id: 2,
    name: 'SIP',
    type: 'Investment'
  }, {
    id: 3,
    name: 'Shopping',
    type: 'Expense'
  }],
  transactions: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'THEME_CHANGE':
      return {
        ...state,
        theme: THEMES.find(t => t.name === action.themeName) || THEMES[0]
      }
    case 'DELETE_CATEGORY':
      return {
        ...state,
        transactionCategories: state.transactionCategories.filter(c => c.id !== action.id)
      }
    case 'ADD_CATEGORY':
      const categories = state.transactionCategories;
      return {
        ...state,
        transactionCategories: [...state.transactionCategories].concat({
          id: categories.length + 1,
          name: action.name,
          type: action.categoryType
        })
      }
    case 'ADD_TRANSACTION':
      const category = state.transactionCategories.find(c => c.id === action.category);
      const transactions = [...state.transactions].concat({
        amount: Number(action.amount),
        type: category.type,
        transactionType: category.name,
        description: action.description,
        date: new Date().getTime()
      });
      return {
        ...state,
        transactions
      }
    default:
      return state;
  }
}
