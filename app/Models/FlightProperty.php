<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FlightProperty extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['user_id', 'flight_id', 'key', 'value'];

    /**
     * Get the user that owns the flight property.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the flight for the flight property.
     */
    public function flight(): BelongsTo
    {
        return $this->belongsTo(Flight::class);
    }
}
