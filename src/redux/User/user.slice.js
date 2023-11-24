import { createSelector, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: null,
    firstName: null,
    roleId: null,
  },
  reducers: {
    setUser: {
      reducer(state, {payload}) {
        return payload
      },
      prepare(userObj) {
        return {
          payload: {
            id: userObj.userId ?? null,
            email: userObj.email ?? null,
            firstName: userObj.firstName ?? null,
            roleId: userObj.roleId ?? null
          }
        }
      },
    },
    logout: state => {
      for (const key in state) {
        state[key] = null
      }
    }
  }
})

export const {setUser, logout} = userSlice.actions

export default userSlice.reducer

const selectUser = state => state.user

export const selectUserId = createSelector(
  [selectUser],
  user => user.id
)

export const selectUserRoleId = createSelector(
  [selectUser],
  user => user.roleId
)
