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
        Schema::create('aircrafts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('make');
            $table->string('model');
            $table->string('ident');
            $table->integer('horsepower')->nullable();
            $table->string('class');
            $table->boolean('is_complex')->default(false);
            $table->boolean('is_high_performance')->default(false);
            $table->boolean('is_pressurized')->default(false);
            $table->boolean('is_turbine')->default(false);
            $table->boolean('is_tailwheel')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'ident']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aircrafts');
    }
};
