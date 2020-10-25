import { lightTheme } from "../Themes/theme";
import { SWITCH_THEME } from "./themeActions";

interface Action {
  type: any;
  theme: any;
}

const initialState = {
  theme: lightTheme,
};

const themeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { theme: action.theme };

    default:
      return state;
  }
};

export default themeReducer;
