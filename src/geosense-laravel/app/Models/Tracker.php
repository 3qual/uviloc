<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tracker extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_username',
        'token',
        'sim_phone_number',
        'name'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_username', 'username');
    }
    public function geolocations()
    {
        return $this->hasMany(Geolocation::class);
    }
}
