<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTrackerRequest extends FormRequest
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
            'user_username' => 'nullable',
            'token' => 'required',
            'sim_phone_number' => 'nullable|unique:trackers',
            'name' => 'nullable',
            'battery_percentage' => 'nullable',
            'signal_strength' => 'nullable',
            'net_standart' => 'nullable',
            'isp' => 'nullable',
            'gps_state' => 'nullable',
            'speed_kph' => 'nullable',
            'state' => 'nullable'
        ];
    }

    // public function messages()
    // {
    //     return [
    //         'user_username.string' => 'The user_username must be a string',
    //         'tocken.string' => 'The tocken must be a string',
    //         'sim_phone_number.string' => 'The sim_phone_number must be a string',
    //         'name.string' => 'The name must be a string'
    //     ];
    // }
}
