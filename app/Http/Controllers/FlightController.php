<?php

namespace App\Http\Controllers;

use App\Models\Aircraft;
use App\Models\Flight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $uid = Auth::id();

        $flights = Flight::with(['aircraft:id,model,make,ident', 'properties:key,value'])
            ->where('user_id', $uid)
            ->orderByDesc('date')
            // ->limit(5)
            ->get();

        $aircrafts = Aircraft::query()
            ->select(['id', 'ident', 'model'])
            ->where('user_id', $uid)
            ->orderBy('ident')
            ->get();

        return Inertia::render('flights/page', [
            'aircrafts' => $aircrafts,
            'flights' => $flights,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Flight $flight)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Flight $flight)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Flight $flight)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Flight $flight)
    {
        //
    }
}
