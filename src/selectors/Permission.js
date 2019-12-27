import { createSelector } from 'reselect';

const userId = (state) => state.auth.user;

const getPermission = createSelector(
  [userId],
  (uid) => ({
    isCurrentUser: (creatorId) => parseInt(creatorId, 10) === parseInt(uid, 10),
  }),
);

export default getPermission;
