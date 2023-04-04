import { default as AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

export default function (props) {

    const users = props.users
    const auth = props.auth

    const roles = {
        'admin' : 'Admin',
        'user' : 'User'
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    {
                        users.map(user => (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 flex items-center space-x-2">
                                    <div className='w-60 overflow-ellipsis whitespace-nowrap overflow-hidden'>{user.name}</div>
                                    <div className={'shadow-md rounded bg-slate-400 py-1 px-2 text-white' + (user.role == 'admin' && ' bg-yellow-400')}>{roles[user.role]}</div>
                                    <div className='flex-1'></div>
                                    <Link className='shadow-md rounded bg-red-500 text-white p-2' as='button' method='delete' href={route('users.destroy', {id : user.id})}>Delete</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    )
}