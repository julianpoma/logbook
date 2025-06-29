<?php

namespace Database\Factories;

use App\Models\Aircraft;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Aircraft>
 */
class AircraftFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Aircraft::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Common aircraft makes and their models
        $aircraftData = [
            'Cessna' => [
                'models' => ['152', '172', '175', '177', '180', '182', '185', '206', '210', '310', '320', '340', '350', '414', '421', '441'],
                'class' => 'ASEL',
                'horsepower_range' => [100, 350],
            ],
            'Piper' => [
                'models' => ['Cherokee', 'Archer', 'Arrow', 'Saratoga', 'Seneca', 'Aztec', 'Navajo', 'Cheyenne', 'Malibu', 'Mirage'],
                'class' => 'ASEL',
                'horsepower_range' => [140, 400],
            ],
            'Beechcraft' => [
                'models' => ['Musketeer', 'Sundowner', 'Sierra', 'Bonanza', 'Baron', 'Duke', 'King Air 90', 'King Air 200', 'King Air 350'],
                'class' => 'ASEL',
                'horsepower_range' => [180, 850],
            ],
            'Cirrus' => [
                'models' => ['SR20', 'SR22', 'SR22T'],
                'class' => 'ASEL',
                'horsepower_range' => [200, 315],
            ],
            'Diamond' => [
                'models' => ['DA20', 'DA40', 'DA42', 'DA62'],
                'class' => 'ASEL',
                'horsepower_range' => [125, 360],
            ],
            'Mooney' => [
                'models' => ['M20C', 'M20E', 'M20F', 'M20J', 'M20K', 'M20M', 'M20R', 'M20S', 'M20TN'],
                'class' => 'ASEL',
                'horsepower_range' => [180, 280],
            ],
        ];

        // Select a random manufacturer
        $make = fake()->randomElement(array_keys($aircraftData));
        $makeData = $aircraftData[$make];

        // Select a random model for this make
        $model = fake()->randomElement($makeData['models']);

        // Generate horsepower within the range for this make
        $horsepower = fake()->numberBetween($makeData['horsepower_range'][0], $makeData['horsepower_range'][1]);

        // Generate aircraft identification (N-number for US aircraft)
        $ident = 'N'.fake()->numberBetween(1, 999).fake()->randomLetter().fake()->randomLetter();

        // Determine aircraft characteristics based on horsepower and model
        $isComplex = $horsepower > 200 && fake()->boolean(60);
        $isHighPerformance = $horsepower > 200 && fake()->boolean(40);
        $isPressurized = $horsepower > 300 && fake()->boolean(30);
        $isTurbine = in_array($model, ['King Air 90', 'King Air 200', 'King Air 350', 'Cheyenne']) || fake()->boolean(5);
        $isTailwheel = in_array($make, ['Cessna']) && in_array($model, ['180', '185']) || fake()->boolean(10);

        // Adjust class based on characteristics
        $class = $makeData['class'];
        if (in_array($model, ['310', '320', '340', '350', '414', '421', '441', 'Seneca', 'Aztec', 'Navajo', 'Baron', 'Duke', 'DA42', 'DA62'])) {
            $class = 'AMEL';
        }

        return [
            'make' => $make,
            'model' => $model,
            'ident' => Str::upper($ident),
            'horsepower' => $horsepower,
            'class' => $class,
            'is_complex' => $isComplex,
            'is_high_performance' => $isHighPerformance,
            'is_pressurized' => $isPressurized,
            'is_turbine' => $isTurbine,
            'is_tailwheel' => $isTailwheel,
            'notes' => fake()->optional(0.3)->sentence(),
        ];
    }
}
