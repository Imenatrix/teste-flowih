import { default as AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

export default function (props) {

    const ticket = props.ticket
    const auth = props.auth

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{ticket.title}</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className='font-bold'>Description:</div>
                    <div className='p-3'>{ticket.body}</div>
                    <div className='font-bold'>Comments:</div>
                    <div className='p-3 space-y-3'>
                        {ticket.comments.map(comment => (
                            <div>
                                <div>{new Date(ticket.comments[0].created_at).toLocaleString()}</div>
                                <div className='p-3 text-gray-600'>{comment.body}</div>
                                <hr className='border-gray-300'/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}