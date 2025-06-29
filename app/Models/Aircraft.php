<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Aircraft extends Model
{
    use HasFactory;

    protected $table = 'aircrafts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'make',
        'model',
        'ident',
        'horsepower',
        'class',
        'is_complex',
        'is_high_performance',
        'is_pressurized',
        'is_turbine',
        'is_tailwheel',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'horsepower' => 'integer',
        'is_complex' => 'boolean',
        'is_high_performance' => 'boolean',
        'is_pressurized' => 'boolean',
        'is_turbine' => 'boolean',
        'is_tailwheel' => 'boolean',
    ];

    /**
     * Get the user that owns the flight.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the flights for the aircraft.
     */
    public function flights(): HasMany
    {
        return $this->hasMany(Flight::class);
    }
}
