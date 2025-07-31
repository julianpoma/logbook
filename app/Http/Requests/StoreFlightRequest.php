<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFlightRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date' => ['required', 'date'],
            'departure_airport' => ['required', 'string', 'max:4'],
            'arrival_airport' => ['required', 'string', 'max:4'],
            'aircraft_id' => ['required', 'integer', 'exists:aircrafts,id'],
            'time_total' => ['required', 'numeric', 'min:0.1', 'max:99.9'],
            'time_pic' => ['nullable', 'numeric', 'min:0', 'max:99.9'],
            'time_sic' => ['nullable', 'numeric', 'min:0', 'max:99.9'],
            'time_xc' => ['nullable', 'numeric', 'min:0', 'max:99.9'],
            'time_night' => ['nullable', 'numeric', 'min:0', 'max:99.9'],
            'time_solo' => ['nullable', 'numeric', 'min:0', 'max:99.9'],
            'time_dual_received' => ['nullable', 'numeric', 'min:0', 'max:99.9'],
            'time_actual_instrument' => ['nullable', 'numeric', 'min:0', 'max:99.9'],
            'time_simulated_instrument' => ['nullable', 'numeric', 'min:0', 'max:99.9'],
            'landings_day' => ['nullable', 'integer', 'min:0', 'max:99'],
            'landings_night' => ['nullable', 'integer', 'min:0', 'max:99'],
            'remarks' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $nullableFields = [
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
        ];

        $uppercaseFields = [
            'departure_airport',
            'arrival_airport',
        ];

        $data = $this->all();

        foreach ($nullableFields as $field) {
            if (isset($data[$field]) && $data[$field] == 0) {
                $data[$field] = null;
            }
        }

        foreach ($uppercaseFields as $field) {
            if (isset($data[$field])) {
                $data[$field] = strtoupper($data[$field]);
            }
        }

        $this->replace($data);
    }
}
