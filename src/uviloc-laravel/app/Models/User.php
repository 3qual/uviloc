<?php

namespace App\Models;

//use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'is_active',
        'username',
        'name',
        'phone_number',
        'email',
        'tg_chatid',
        'path_to_avatar',
        'password',
        'access_token'
    ];

    // protected $hidden = [
    //     'password'
    // ];

    protected $casts = [
        //'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function trackers()
    {
        return $this->hasMany(Tracker::class);
    }
}
