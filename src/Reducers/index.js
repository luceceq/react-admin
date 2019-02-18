import { combineReducers } from "redux";

import auth from './auth';
import groups from './groups';
import hardwares from './hardwares';
import firmware from './firmware';
import users from './users';
import firmwareAssignments from "./firmwareAssignments";
import itemLookup from "./itemLookup";

export default combineReducers({
  auth,
  groups,
  hardwares,
  firmware,
  users,
  firmwareAssignments,
  itemLookup,
});
