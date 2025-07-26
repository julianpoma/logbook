<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Flight extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'aircraft_id',
        'date',
        'departure_airport',
        'arrival_airport',
        'time_total',
        'time_pic',
        'time_sic',
        'time_xc',
        'time_night',
        'time_solo',
        'time_dual_received',
        'time_actual_instrument',
        'time_simulated_instrument',
        'landings_day',
        'landings_night',
        'remarks',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'time_total' => 'decimal:1',
        'time_pic' => 'decimal:1',
        'time_sic' => 'decimal:1',
        'time_xc' => 'decimal:1',
        'time_night' => 'decimal:1',
        'time_solo' => 'decimal:1',
        'time_dual_received' => 'decimal:1',
        'time_actual_instrument' => 'decimal:1',
        'time_simulated_instrument' => 'decimal:1',
        'landings_day' => 'integer',
        'landings_night' => 'integer',
    ];

    /**
     * Get the user that owns the flight.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the aircraft for the flight.
     */
    public function aircraft(): BelongsTo
    {
        return $this->belongsTo(Aircraft::class);
    }

    /**
     * Get the properties of the flight.
     */
    public function properties(): HasMany
    {
        return $this->hasMany(FlightProperty::class);
    }
}
