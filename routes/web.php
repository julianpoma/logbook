<?php

use App\Http\Controllers\FlightController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/flights', [FlightController::class, 'index'])->name('flights');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
