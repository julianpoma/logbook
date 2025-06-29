<?php

namespace Database\Seeders;

use App\Models\Aircraft;
use App\Models\Flight;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Julian',
            'email' => 'test@example.com',
        ]);

        $aircrafts = Aircraft::factory()
            ->for($user)
            ->count(10)
            ->create();

        Flight::factory()
            ->for($user)
            ->recycle($aircrafts)
            ->count(100)
            ->create();
    }
}
