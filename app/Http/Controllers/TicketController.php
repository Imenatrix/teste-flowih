<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Comment;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TicketController extends Controller
{
    private static $default_params = [
        'status' => 'open',
        'orderBy' => 'newest',
        'title' => ''
    ];

    public function __construct() {
        $this->authorizeResource(Ticket::class);
        $this->middleware('auth')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string',
            'orderBy' => ['required', Rule::in(['newest', 'oldest'])],
            'status' => ['required', Rule::in(['open', 'closed', 'all'])],
        ]);

        $params = $validator->fails() ? self::$default_params : $request->all();

        // Needed, otherwise it will interfere with pagination.
        unset($params['page']);

        $tickets = Ticket::select();
        $tickets = $params['status'] != 'all' ? $tickets->where('open', $params['status'] == 'open') : $tickets;
        $tickets = $tickets->orderBy('created_at', $params['orderBy'] == 'newest' ? 'desc' : 'asc');
        $tickets = $tickets->where('title', 'like', '%'.$params['title'].'%');

        return Inertia::render('Ticket/Index', ['tickets' => $tickets->paginate(20), 'params' => $params]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Ticket/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $ticket = Ticket::create([...$request->validated(), 'user_id' => Auth::user()->id]);
        return redirect()->route('tickets.show', ['ticket' => $ticket]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        $comments = Comment::where('ticket_id', $ticket->id)->with('user')->orderBy('created_at', 'desc')->paginate(5);
        return Inertia::render('Ticket/Show', ['ticket' => $ticket, 'comments' => $comments]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        return Inertia::render('Ticket/Edit', ['ticket' => $ticket]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());
        return redirect()->route('tickets.show', ['ticket' => $ticket]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }

    public function toggleOpen(Ticket $ticket, Request $request) {
        $ticket->open = !$ticket->open;
        $ticket->save();
        return redirect()->route('tickets.show', ['ticket' => $ticket]);
    }
}
