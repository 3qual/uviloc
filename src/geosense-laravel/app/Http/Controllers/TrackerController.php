<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTrackerRequest;
use App\Http\Requests\UpdateTrackerRequest;
use App\Models\Tracker;

class TrackerController extends Controller
{
    // GET
    public function getAll()
    {
        return Tracker::all();
    }
    
    // GET
    public function getItemById($id)
    {
        $tracker = Tracker::find($id);
        return $tracker;
    }

    
}
