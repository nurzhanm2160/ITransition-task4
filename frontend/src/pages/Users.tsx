import {
    useBlockUserMutation,
    useDeleteUserMutation,
    useGetUsersQuery,
    useUnBlockUserMutation
} from "../redux/services/user";
import {useNavigate} from "react-router-dom";

export const Users = () => {
    const navigate = useNavigate()
    const { data, error, isLoading } = useGetUsersQuery();
    const [blockUser] = useBlockUserMutation()
    const [unblockUser] = useUnBlockUserMutation()
    const [deleteUser] = useDeleteUserMutation()

    if ((error as Response)?.status === 401) {
        navigate('')
    }

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div className="flex flex-col mt-8">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {data && data?.users?.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4">
                                        { user.name }
                                    </td>
                                    <td className={user.active === 0 ? 'px-6 py-4 line-through' : 'px-6 py-4'}>
                                        { user.email }
                                    </td>
                                    <td className="flex items-center">

                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => blockUser({userId: user.id, active: 0})}
                                        >
                                            <img width="32" height="32" src="https://img.icons8.com/ios/50/lock-2.png" alt="lock-2"/>
                                        </button>

                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => unblockUser({userId: user.id, active: 1})}
                                        >
                                            <img width="32" height="32" src="https://img.icons8.com/ios/50/unlock-2.png" alt="unlock-2"/>
                                        </button>

                                        <button
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
                                            onClick={() => deleteUser({userId: user.id})}
                                        >
                                            <img width="32" height="32" src="https://img.icons8.com/ios/50/trash--v1.png" alt="trash--v1"/>
                                        </button>

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}