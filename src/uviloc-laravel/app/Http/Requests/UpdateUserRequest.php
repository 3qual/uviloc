<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'is_active'=> 'nullable',
            'username'=> 'nullable|unique:users', 
            'name'=> 'nullable',
            'phone_number'=> 'nullable|unique:users',
            'email'=> 'nullable|unique:users',
            'path_to_avatar'=> 'nullable',
            'tg_chatid' => 'nullable|unique:users',
            'password'=> 'nullable',
            'access_token'=> 'nullable|unique:users'
        ];
    }
}
