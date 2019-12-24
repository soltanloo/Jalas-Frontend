import { createSelector } from 'reselect/es';

const userId = (state) => state.auth.user;

const getPermission = createSelector(
  [userId],
  (uid) => ({
    isCurrentUser: (creatorId) => creatorId === uid,
  }),
);

export default getPermission;
