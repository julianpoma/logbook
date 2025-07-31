<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Operation
            $table->date('date');
            $table->string('departure_airport');
            $table->string('arrival_airport');
            $table->foreignId('aircraft_id')->constrained('aircrafts')->onDelete('cascade');

            // Times
            $table->decimal('time_total', 3, 1);

            // Type of flying or training
            $table->decimal('time_pic', 3, 1)->nullable();
            $table->decimal('time_sic', 3, 1)->nullable();
            $table->decimal('time_xc', 3, 1)->nullable();
            $table->decimal('time_night', 3, 1)->nullable();
            $table->decimal('time_solo', 3, 1)->nullable();
            $table->decimal('time_dual_received', 3, 1)->nullable();

            // Instrument
            $table->decimal('time_actual_instrument', 3, 1)->nullable();
            $table->decimal('time_simulated_instrument', 3, 1)->nullable();

            $table->integer('landings_day')->nullable();
            $table->integer('landings_night')->nullable();

            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};
