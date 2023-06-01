import store from "../../store";

export const UserRoles = {
    STANDARD: "USER",
    ADMIN: "ADMIN"
}

export function hasUserRole(role) {
 
    const currentUser = store.getters.getCurrentUser;
    if (!currentUser) {
        return false;
    }
    return getRoleValue(role) <= getRoleValue(currentUser.role);
}

function getRoleValue(role) {
    switch (role) {
        case UserRoles.USER:
            return 1;
        case UserRoles.ADMIN:
            return 2;
    }
    return 0;
}