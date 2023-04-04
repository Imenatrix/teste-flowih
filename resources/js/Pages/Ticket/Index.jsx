import { default as AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function (props) {

    const tickets = props.tickets
    const auth = props.auth

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    {
                        tickets.map(ticket => (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">{ticket.title}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    )
}