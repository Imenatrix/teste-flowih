import { default as AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import Paginator from '@/Components/Paginator'
import PrimaryButtonLink from '@/Components/PrimaryButtonLink'

export default function (props) {

    const users = props.users.data
    const links = props.users.links
    const auth = props.auth

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className='flex justify-end'>
                        <PrimaryButtonLink  href={route('users.create')}>New User</PrimaryButtonLink>
                    </div>
                    {
                        users.map(user => (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 flex items-center space-x-2">
                                    <div>{user.name}</div>
                                    {user.role == 'admin' &&
                                        <div className='shadow-md rounded py-1 px-2 text-white bg-yellow-400'>Admin</div>
                                    }
                                    <div className='flex-1'></div>
                                    <Link className='shadow-md rounded bg-red-500 text-white p-2' as='button' method='delete' href={route('users.destroy', {id : user.id})}>Delete</Link>
                                </div>
                            </div>
                        ))
                    }
                    <Paginator links={links}/>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}