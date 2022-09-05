import {useQuery} from "react-query";
// import {users} from "../../API/Dailies/user";
import {userCompany} from "../../API/Dailies/userCompany";

export const useUserCompaniesData = (companyId: undefined| number, role: undefined | string, driverId: undefined | string | number, skip: undefined | number = 0): object => {
    return useQuery([
            `userCompanies/${driverId || 'all'}`, companyId, role, driverId, skip],
        () => userCompany.read(companyId, role, driverId, skip),
        { refetchOnWindowFocus: false, staleTime: 5 * 60 * 1000 })
}

// export const useUserData = (userId: number | string | undefined): any => {
//     return useQuery([
//             `companies/${userId}`, userId],
//         () => users.userData(userId),
//         { refetchOnWindowFocus: false, staleTime: 5 * 60 * 1000 })
// }