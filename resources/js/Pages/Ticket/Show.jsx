import { default as AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import Paginator from '@/Components/Paginator'

export default function (props) {

    const ticket = props.ticket
    const comments = props.comments.data
    const links = props.comments.links
    const auth = props.auth

    const { data, setData, post, processing, errors } = useForm({
        ticket_id : ticket.id,
        body : ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('comments.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{ticket.title}</h2>
                    {auth.user?.id == ticket.user_id &&
                        <div className='flex justify-end'>
                                <Link className='inline-flex items-center px-4 py-2 bg-yellow-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-400 focus:bg-orange-500 active:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150' href={route('tickets.create')}>Edit</Link>
                        </div>
                    }
                </>
            }
        >
            <Head title={ticket.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className='font-bold'>Description:</div>
                    <div className='p-3'>{ticket.body}</div>
                    <div className='font-bold'>Comments:</div>
                    <div className='px-3 space-y-3'>
                        <form className='border rounded-lg p-2 space-y-2 border-gray-300' onSubmit={submit}>
                            <div>
                                <TextInput
                                    id="body"
                                    type="textarea"
                                    rows="3"
                                    name="body"
                                    value={data.body}
                                    className="block w-full"
                                    autoComplete="body"
                                    placeholder="Leave a comment..."
                                    onChange={(e) => setData('body', e.target.value)}
                                    required
                                />
                                <InputError message={errors.body} className="mt-2" />
                            </div>
                            <div className="flex items-center justify-end">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Comment
                                </PrimaryButton>
                            </div>
                        </form>
                        {comments.map(comment => (
                            <div>
                                <div>{comment.user.name} - {new Date(comment.created_at).toLocaleString()}</div>
                                <div className='p-3 text-gray-600'>{comment.body}</div>
                                <hr className='border-gray-300'/>
                            </div>
                        ))}
                        <Paginator links={links}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}