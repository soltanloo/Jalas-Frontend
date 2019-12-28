import { createSelector } from 'reselect';

const userId = (state) => state.auth.userId;
const userRole = (state) => state.auth.userRole;

const getPermission = createSelector(
  [userId, userRole],
  (uid, ur) => ({
    isAdmin: () => ur === 'admin',
    isProductOwner: () => ur === 'productowner',
    isCurrentUser: (creatorId) => parseInt(creatorId, 10) === parseInt(uid, 10),
  }),
);

export default getPermission;
