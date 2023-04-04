import Paginator from '@/Components/Paginator'
import PrimaryButton from '@/Components/PrimaryButton'
import Select from '@/Components/Select'
import TextInput from '@/Components/TextInput'
import { default as AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'

export default function (props) {

    const params = props.params

    const { data, setData, get } = useForm(params)

    const tickets = props.tickets.data
    const links = props.tickets.links
    const auth = props.auth

    const submit = (e) => {
        e.preventDefault()
        get(route('tickets.index'))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Issue Tickets</h2>}
        >
            <Head title="Issue Tickets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className='flex justify-end space-x-3'>
                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            className="block flex-1"
                            autoComplete="title"
                            isFocused={true}
                            placeholder="Title..."
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        <Select value={data.status} onChange={(e) => setData('status', e.target.value)}>
                            <option value='open'>Open</option>
                            <option value='closed'>Closed</option>
                            <option value='all'>All</option>
                        </Select>
                        <Select value={data.orderBy} onChange={(e) => setData('orderBy', e.target.value)}>
                            <option value='newest'>Newest</option>
                            <option value='oldest'>Oldest</option>
                        </Select>
                        <PrimaryButton onClick={submit}>Filter</PrimaryButton>
                        <div className="flex-1"></div>
                        <Link className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150' href={route('tickets.create')}>Post new issue</Link>
                    </div>
                    {
                        tickets.map(ticket => (
                            <Link as='div' className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex items-center px-3 py-6 space-x-3" href={route('tickets.show', {id: ticket.id})}>
                                <div className={'rounded-full w-7 h-7' + (ticket.open ? ' bg-green-500' : ' bg-red-500')}></div>
                                <div className="text-gray-900">{ticket.title}</div>
                            </Link>
                        ))
                    }
                    <Paginator links={links} params={params}/>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}