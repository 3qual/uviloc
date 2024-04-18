<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Support\Str;


class ValidateAnyUserRequest extends FormRequest
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
            'username'=> 'required', 
            'name'=> 'nullable',
            'phone_number'=> 'nullable',
            'email'=> 'nullable',
            'path_to_avatar'=> 'nullable',
            'tg_chatid' => 'nullable',
            'password'=> 'required',
            'access_token'=> 'nullable'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([            
            'is_active' => $this->is_active ?? true,
            'path_to_avatar' => $this->path_to_avatar ?? 'noavatar.png'

            //'access_token' => $this->access_token ?? 'not_generated_yet-' . Str::random(32),
            //'phone_number' => $this->phone_number ?? 'no_phone_number-' . Str::random(32),
            //'email' => $this->email ?? 'no_email-' . Str::random(32),
            //'tg_chatid' => $this->tg_chatid ?? 'no_tg_chatid-' . Str::random(32),
        ]);
    }
}
