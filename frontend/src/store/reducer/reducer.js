import { THEMES } from '../../themes/themes';

const initialState = {
  theme: {
    name: 'SLATE_GREY',
    fontColor: '#a8aed2',
    lightVersion: '#4d547a',
    mediumLightVersion: '#464c6c',
    mediumDarkVersion: '#404767',
    darkVersion: '#353c5c',
    boxShadow: '#2e324d'
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'THEME_CHANGE':
      return {
        theme: THEMES.find(t => t.name === action.themeName) || THEMES[0]
      }
  }
  return state;
}
