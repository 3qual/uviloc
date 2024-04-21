<?php

namespace App\Service;

use App\Models\Geolocation;
use App\Models\User;
use App\Models\Tracker;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class GeolocationService
{
    public function getAll()
    {
        return Geolocation::All();
    }

    public function getItemByTrackerToken($request, $data)
    {
        $user = User::where('access_token', $request->bearerToken())->first();
        if ($user == null)
        {
            return 'Auth failed!';
        }
        else
        {
            $user_username = $user['username'];
            $tracker = Tracker::where('user_username', $user_username)->where('token', $data->tracker_token)->first();
            if ($tracker == null)
            {
                return 'Tracker dosent exists!';
            }
            else
            {
                return Geolocation::where('tracker_token', $data->tracker_token)->get();
            }
        }
    }

    public function getLatestItemByTrackerToken($request, $data)
    {
        $user = User::where('access_token', $request->bearerToken())->first();
        if ($user == null)
        {
            return 'Auth failed!';
        }
        else
        {
            $user_username = $user['username'];
            $tracker = Tracker::where('user_username', $user_username)->where('token', $data->tracker_token)->first();
            if ($tracker == null)
            {
                return 'Tracker dosent exists!';
            }
            else
            {
                return Geolocation::where('tracker_token', $request->tracker_token)->orderBy('id','DESC')->get()->first();
            }
        }
    }

    public function create($data)
    {
        $tracker = Tracker::where('token', $data->tracker_token)->first();
        if ($tracker == null)
        {
            return 'Tracker dosent exists!';
        }
        else
        {
            return Geolocation::create($data->toArray());
        }
    }

    // public function update($id, $data)
    // {
    //     return Geolocation::find($id)->update($data->toArray());
    // }

    // public function delete($id)
    // {
    //     $geolocation = Geolocation::find($id);
    //     if($geolocation)
    //     {
    //         $geolocation->delete();
    //     }
    //     return $geolocation;
    // }

}
