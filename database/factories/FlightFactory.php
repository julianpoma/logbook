<?php

namespace Database\Factories;

use App\Models\Aircraft;
use App\Models\Flight;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flight>
 */
class FlightFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Flight::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Common airports for realistic data
        $airports = [
            'KJFK', 'KLAX', 'KORD', 'KDFW', 'KDEN', 'KSFO', 'KLAS', 'KPHX', 'KIAH', 'KCLT',
            'KMCO', 'KSEA', 'KBOS', 'KMSP', 'KLGA', 'KEWR', 'KMDW', 'KBWI', 'KFLL', 'KDCA',
            'KSAN', 'KTPA', 'KPDX', 'KSTL', 'KHNL', 'KOAK', 'KBUR', 'KAUS', 'KBNA', 'KCMH',
        ];

        $departureAirport = fake()->randomElement($airports);
        $arrivalAirport = fake()->randomElement($airports);

        // Generate realistic flight time (0.5 to 8.0 hours)
        $totalTime = fake()->randomFloat(1, 0.5, 8.0);

        // Determine if this is a night flight (20% chance)
        $isNightFlight = fake()->boolean(20);

        // Determine if this is cross country (flights over 50nm, roughly 60% of flights)
        $isCrossCountry = fake()->boolean(60);

        // Generate PIC vs SIC time (most flights are PIC for private pilots)
        $isPic = fake()->boolean(80);
        $picTime = $isPic ? $totalTime : null;
        $sicTime = ! $isPic ? $totalTime : null;

        // Solo time (20% chance for training flights)
        $soloTime = fake()->boolean(20) ? $totalTime : null;

        // Dual received (30% chance for training flights)
        $dualReceived = fake()->boolean(30) ? $totalTime : null;

        // Night time (only if night flight)
        $nightTime = $isNightFlight ? fake()->randomFloat(1, 0.1, min($totalTime, 3.0)) : null;

        // Cross country time
        $crossCountryTime = $isCrossCountry ? $totalTime : null;

        // Instrument time (20% chance)
        $hasInstrumentTime = fake()->boolean(20);
        $actualInstrumentTime = null;
        $simulatedInstrumentTime = null;

        if ($hasInstrumentTime) {
            $instrumentTime = fake()->randomFloat(1, 0.1, min($totalTime, 2.0));
            if (fake()->boolean(70)) {
                $actualInstrumentTime = $instrumentTime;
            } else {
                $simulatedInstrumentTime = $instrumentTime;
            }
        }

        // Landings
        $dayLandings = fake()->numberBetween(1, 5);
        $nightLandings = $isNightFlight ? fake()->numberBetween(1, 3) : null;

        return [
            'user_id' => User::factory(),
            'aircraft_id' => Aircraft::factory(),
            'date' => fake()->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
            'departure_airport' => $departureAirport,
            'arrival_airport' => $arrivalAirport,
            'time_total' => $totalTime,
            'time_pic' => $picTime,
            'time_sic' => $sicTime,
            'time_xc' => $crossCountryTime,
            'time_night' => $nightTime,
            'time_solo' => $soloTime,
            'time_dual_received' => $dualReceived,
            'time_actual_instrument' => $actualInstrumentTime,
            'time_simulated_instrument' => $simulatedInstrumentTime,
            'landings_day' => $dayLandings,
            'landings_night' => $nightLandings,
            'remarks' => fake()->optional(0.3)->sentence(),
        ];
    }
}
