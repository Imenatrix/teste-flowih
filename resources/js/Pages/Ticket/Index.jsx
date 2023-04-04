import Paginator from '@/Components/Paginator'
import { default as AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

export default function (props) {

    const tickets = props.tickets.data
    const links = props.tickets.links
    const auth = props.auth

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Issue Tickets</h2>}
        >
            <Head title="Issue Tickets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className='flex justify-end'>
                        <Link className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150' href={route('tickets.create')}>Post new issue</Link>
                    </div>
                    {
                        tickets.map(ticket => (
                            <Link as='div' className="bg-white overflow-hidden shadow-sm sm:rounded-lg" href={route('tickets.show', {id: ticket.id})}>
                                <div className="p-6 text-gray-900">{ticket.title}</div>
                            </Link>
                        ))
                    }
                    <Paginator links={links}/>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}