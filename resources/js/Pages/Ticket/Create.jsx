import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Head, useForm } from '@inertiajs/react'
import { default as AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout'

export default function (props) {

    const auth = props.auth
    const { data, setData, post, processing, errors } = useForm({
        title : '',
        body : ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">New Issue Ticket</h2>}
        >
            <Head title="New Issue Ticket" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <form onSubmit={submit} >
                        <div>
                            <InputLabel htmlFor="title" value="Title" />

                            <TextInput
                                id="title"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />

                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="body" value="Description" />

                            <TextInput
                                id="body"
                                type="textarea"
                                rows="10"
                                name="body"
                                value={data.body}
                                className="mt-1 block w-full"
                                autoComplete="body"
                                onChange={(e) => setData('body', e.target.value)}
                                required
                            />

                            <InputError message={errors.body} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ml-4" disabled={processing}>
                                Post
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}