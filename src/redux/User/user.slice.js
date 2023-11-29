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
            address: userObj.address ?? null,
            birthData: userObj.birthDate ?? null,
            country: userObj.country ?? null,
            currentCountry: userObj.currentCountry ?? null,
            email: userObj.email ?? null,
            firstName: userObj.firstName ?? null,
            lastName: userObj.lastName ?? null,
            phone: userObj.phone ?? null,
            race: userObj.race ?? null,
            roleId: userObj.roleId ?? null,
            id: userObj.userId ?? null,
            doctorName: userObj.doctorName ?? null,
            doctorId: userObj.doctorId ?? null,
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

export const selectUser = state => state.user

export const selectUserId = createSelector(
  [selectUser],
  user => user.id
)

export const selectUserRoleId = createSelector(
  [selectUser],
  user => user.roleId
)
