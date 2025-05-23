import { GroupUser, OrgGroup, OrgUser } from "constants/orgConstants";
import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/reduxActionConstants";
import { User } from "constants/userConstants";
import {
  DeleteOrgUserPayload,
  GroupUsersPayload,
  OrgAPIUsagePayload,
  OrgLastMonthAPIUsagePayload,
  OrgUsersPayload,
  RemoveGroupUserPayload,
} from "redux/reduxActions/orgActions";
import { createImmerReducer } from "util/reducerUtils";
import { currentOrgAdmin } from "util/permissionUtils";
import { ApiRequestStatus } from "constants/apiConstants";

const initialState: OrgReduxState = {
  orgUsers: [],
  orgGroups: [],
  groupUsers: [],
  orgUsersFetching: true,
  currentUserGroupRole: "",
  groupUsersFetching: true,
  fetchOrgGroupsFinished: false,
  orgCreateStatus: "init",
  apiUsage: 0,
  lastMonthApiUsage: 0,
  orgUserStats: {},
};

const orgReducer = createImmerReducer(initialState, {
  [ReduxActionTypes.FETCH_ORG_GROUPS_SUCCESS]: (
    state: OrgReduxState,
    action: ReduxAction<{ orgGroups: OrgGroup[], orgUserStats: Record<string, number> }>
  ): OrgReduxState => ({
    ...state,
    orgGroups: action.payload.orgGroups,
    orgUserStats: action.payload.orgUserStats,
    fetchOrgGroupsFinished: true,
  }),
  [ReduxActionErrorTypes.FETCH_ORG_GROUPS_ERROR]: (state: OrgReduxState): OrgReduxState => ({
    ...state,
    fetchOrgGroupsFinished: true,
  }),
  [ReduxActionTypes.FETCH_ORG_ALL_USERS]: (state: OrgReduxState) => ({
    ...state,
    orgUsersFetching: true,
  }),
  [ReduxActionTypes.FETCH_ORG_ALL_USERS_SUCCESS]: (
    state: OrgReduxState,
    action: ReduxAction<OrgUsersPayload>
  ): OrgReduxState => ({
    ...state,
    orgUsers: action.payload.members,
    orgUsersFetching: false,
  }),
  [ReduxActionTypes.FETCH_GROUP_USERS]: (state: OrgReduxState) => ({
    ...state,
    groupUsersFetching: true,
  }),
  [ReduxActionTypes.FETCH_GROUP_USERS_SUCCESS]: (
    state: OrgReduxState,
    action: ReduxAction<GroupUsersPayload>
  ): OrgReduxState => ({
    ...state,
    groupUsers: action.payload.members,
    groupUsersFetching: false,
    currentUserGroupRole: action.payload.visitorRole,
  }),
  [ReduxActionTypes.DELETE_GROUP_USER_SUCCESS]: (
    state: OrgReduxState,
    action: ReduxAction<RemoveGroupUserPayload>
  ): OrgReduxState => ({
    ...state,
    groupUsers: state.groupUsers.filter((user) => user.userId !== action.payload.userId),
  }),
  [ReduxActionTypes.DELETE_ORG_USER_SUCCESS]: (
    state: OrgReduxState,
    action: ReduxAction<DeleteOrgUserPayload>
  ): OrgReduxState => ({
    ...state,
    orgUsers: state.orgUsers.filter((user) => user.userId !== action.payload.userId),
  }),
  [ReduxActionTypes.QUIT_GROUP_SUCCESS]: (
    state: OrgReduxState,
    action: ReduxAction<RemoveGroupUserPayload & { currentUser: User }>
  ): OrgReduxState => ({
    ...state,
    orgGroups: state.orgGroups.filter((group) => {
      if (currentOrgAdmin(action.payload.currentUser)) {
        // keep the group alive if admin exits
        return true;
      }
      return group.groupId !== action.payload.groupId;
    }),
    groupUsers: state.groupUsers.filter((user) => user.userId !== action.payload.userId),
  }),
  [ReduxActionTypes.CREATE_ORG]: (state: OrgReduxState): OrgReduxState => ({
    ...state,
    orgCreateStatus: "requesting",
  }),
  [ReduxActionTypes.CREATE_ORG_SUCCESS]: (state: OrgReduxState): OrgReduxState => ({
    ...state,
    orgCreateStatus: "success",
  }),
  [ReduxActionErrorTypes.CREATE_ORG_ERROR]: (state: OrgReduxState): OrgReduxState => ({
    ...state,
    orgCreateStatus: "error",
  }),
  
  [ReduxActionTypes.FETCH_ORG_API_USAGE_SUCCESS]: (
    state: OrgReduxState,
    action: ReduxAction<OrgAPIUsagePayload>
  ): OrgReduxState => ({
    ...state,
    apiUsage: action.payload.apiUsage,
  }),

  [ReduxActionTypes.FETCH_ORG_LAST_MONTH_API_USAGE_SUCCESS]: (
    state: OrgReduxState,
    action: ReduxAction<OrgLastMonthAPIUsagePayload>
  ): OrgReduxState => ({
    ...state,
    lastMonthApiUsage: action.payload.lastMonthApiUsage,
  }),
});

export interface OrgReduxState {
  orgUsers: OrgUser[];
  currentUserGroupRole: string;
  groupUsers: GroupUser[];
  orgGroups: OrgGroup[];
  orgUsersFetching: boolean;
  groupUsersFetching: boolean;
  fetchOrgGroupsFinished: boolean;
  orgCreateStatus: ApiRequestStatus;
  apiUsage: number;
  lastMonthApiUsage: number;
  orgUserStats: Record<string, number>;
}

export default orgReducer;
