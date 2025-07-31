<?php

use App\Models\Aircraft;
use App\Models\Flight;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->aircraft = Aircraft::factory()->create(['user_id' => $this->user->id]);
});

describe('flight.index', function () {
    it('requires authentication', function () {
        $response = $this->get('/flights', []);

        $response->assertRedirect('/login');
    });
});

describe('flight.store', function () {
    it('creates a flight with valid data', function () {
        $flightData = [
            'date' => '2024-01-15',
            'departure_airport' => 'KJFK',
            'arrival_airport' => 'KLAX',
            'aircraft_id' => $this->aircraft->id,
            'time_total' => 5.5,
            'time_pic' => 5.5,
            'time_sic' => 0,
            'time_xc' => 4.2,
            'time_night' => 1.0,
            'time_solo' => 0,
            'time_dual_received' => 0,
            'time_actual_instrument' => 0.5,
            'time_simulated_instrument' => 0,
            'landings_day' => 2,
            'landings_night' => 1,
            'remarks' => 'Test flight',
        ];

        $response = $this->actingAs($this->user)
            ->post('/flights', $flightData);

        $response->assertRedirect('/flights');

        $this->assertDatabaseHas('flights', [
            'user_id' => $this->user->id,
            'date' => '2024-01-15',
            'departure_airport' => 'KJFK',
            'arrival_airport' => 'KLAX',
            'aircraft_id' => $this->aircraft->id,
            'time_total' => '5.5',
            'time_pic' => '5.5',
            'time_xc' => '4.2',
            'time_night' => '1.0',
            'time_actual_instrument' => '0.5',
            'landings_day' => 2,
            'landings_night' => 1,
            'remarks' => 'Test flight',
        ]);
    });

    it('converts zero values to null for nullable numeric fields', function () {
        $flightData = [
            'date' => '2024-01-15',
            'departure_airport' => 'KJFK',
            'arrival_airport' => 'KLAX',
            'aircraft_id' => $this->aircraft->id,
            'time_total' => 2.5,
            'time_pic' => 0,
            'time_sic' => 0,
            'time_xc' => 0,
            'time_night' => 0,
            'time_solo' => 0,
            'time_dual_received' => 0,
            'time_actual_instrument' => 0,
            'time_simulated_instrument' => 0,
            'landings_day' => 0,
            'landings_night' => 0,
            'remarks' => '',
        ];

        $this->actingAs($this->user)
            ->post('/flights', $flightData);

        $flight = Flight::latest()->first();

        expect($flight->time_total)->toBe('2.5')
            ->and($flight->time_pic)->toBeNull()
            ->and($flight->time_sic)->toBeNull()
            ->and($flight->time_xc)->toBeNull()
            ->and($flight->time_night)->toBeNull()
            ->and($flight->time_solo)->toBeNull()
            ->and($flight->time_dual_received)->toBeNull()
            ->and($flight->time_actual_instrument)->toBeNull()
            ->and($flight->time_simulated_instrument)->toBeNull()
            ->and($flight->landings_day)->toBeNull()
            ->and($flight->landings_night)->toBeNull();
    });

    it('validates required fields', function () {
        $response = $this->actingAs($this->user)
            ->post('/flights', []);

        $response->assertSessionHasErrors([
            'date',
            'departure_airport',
            'arrival_airport',
            'aircraft_id',
            'time_total',
        ]);
    });

    it('validates airport code length', function () {
        $flightData = [
            'date' => '2024-01-15',
            'departure_airport' => 'TOOLONG',
            'arrival_airport' => 'ALSOTOOLONG',
            'aircraft_id' => $this->aircraft->id,
            'time_total' => 2.5,
        ];

        $response = $this->actingAs($this->user)
            ->post('/flights', $flightData);

        $response->assertSessionHasErrors([
            'departure_airport',
            'arrival_airport',
        ]);
    });

    it('validates aircraft exists', function () {
        $flightData = [
            'date' => '2024-01-15',
            'departure_airport' => 'KJFK',
            'arrival_airport' => 'KLAX',
            'aircraft_id' => 99999,
            'time_total' => 2.5,
        ];

        $response = $this->actingAs($this->user)
            ->post('/flights', $flightData);

        $response->assertSessionHasErrors(['aircraft_id']);
    });

    it('validates numeric field ranges', function () {
        $flightData = [
            'date' => '2024-01-15',
            'departure_airport' => 'KJFK',
            'arrival_airport' => 'KLAX',
            'aircraft_id' => $this->aircraft->id,
            'time_total' => 0.05, // Below minimum of 0.1
            'time_pic' => -1, // Negative value
            'landings_day' => -5, // Negative value
        ];

        $response = $this->actingAs($this->user)
            ->post('/flights', $flightData);

        $response->assertSessionHasErrors([
            'time_total',
            'time_pic',
            'landings_day',
        ]);
    });

    it('requires authentication', function () {
        $response = $this->post('/flights', []);

        $response->assertRedirect('/login');
    });
});
