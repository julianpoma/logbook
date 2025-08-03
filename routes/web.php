<?php

use App\Http\Controllers\FlightController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->to(route('flights.index'));
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/flights', [FlightController::class, 'index'])->name('flights.index');
    Route::post('/flights', [FlightController::class, 'store'])->name('flights.store');
    Route::put('/flights/{flight}', [FlightController::class, 'update'])->name('flights.update');
    Route::delete('/flights/{flight}', [FlightController::class, 'destroy'])->name('flights.destroy');

    Route::get('/aircrafts', [FlightController::class, 'index'])->name('aircrafts.index');
    Route::post('/aircrafts', [FlightController::class, 'store'])->name('aircrafts.store');
    Route::put('/aircrafts/{aircraft}', [FlightController::class, 'update'])->name('aircrafts.update');
    Route::delete('/aircrafts/{aircraft}', [FlightController::class, 'destroy'])->name('aircrafts.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
