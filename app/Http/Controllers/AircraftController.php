<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAircraft;
use App\Http\Requests\UpdateAircraft;
use App\Models\Aircraft;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AircraftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $aircrafts = Aircraft::query()
            ->where('user_id', Auth::id())
            ->orderBy('make', 'asc')
            // This helper uses a select subquery. It is going to be slow with large datasets, but for now it's convinient
            ->withCount('flights')
            ->withSum('flights', 'time_total')
            ->get();

        return Inertia::render('aircrafts/page', [
            'aircrafts' => $aircrafts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAircraft $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAircraft $request, Aircraft $aircraft)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Aircraft $aircraft)
    {
        //
    }
}
