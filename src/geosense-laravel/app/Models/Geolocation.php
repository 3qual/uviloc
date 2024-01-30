<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Geolocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracker_id',
        'date_added',
        'coordinates'
    ];

    public function tracker()
    {
        return $this->belongsTo(Tracker::class, 'tracker_id', 'id');
    }
}
