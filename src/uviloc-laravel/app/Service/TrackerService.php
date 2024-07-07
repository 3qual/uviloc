<?php

namespace App\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

use App\Models\Tracker;
use App\Models\User;
use App\Models\Geolocation;

class TrackerService
{
    public function getAll()
    {
        return Tracker::All();
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
            $tracker = Tracker::where('user_username', $user_username)->where('token', $data->token)->first();
            if ($tracker == null)
            {
                return 'Tracker dosent exists!';
            }
            else
            {
                return $tracker;
            }
        }
    }


    public function getItemByUserAccessToken($request)
    {
        $user_username = User::where('access_token', $request->bearerToken())->first()['username'];
        return Tracker::where('user_username', $user_username)->get();
    }

    public function create($data)
    {
        Geolocation::create(array_merge(array('tracker_token' => $data['token']), array('coordinates' => '37.825470,-122.47905')));
        return Tracker::create($data->toArray());
    }

    public function linkToUser($request, $data)
    { 
        $user = User::where('access_token', $request->bearerToken())->first();
        if ($user == null)
        {
            return 'Auth failed!';
        }
        else
        {
            $tracker = Tracker::where('token', $data['token']);
            if ($tracker->get() == "[]")
            {
                return "Tracker dosent exists!";
            }
            if ($tracker->first()->user_username != null)
            {
                return "Tracker is already asigned!";
            }
            if ($tracker->get() != "[]" && $tracker->first()->user_username == null)
            {
                $tracker_find = Tracker::find(Tracker::where('token', $data['token'])->first()['id']);
                $tracker = $tracker_find;
                $tracker->user_username = $user['username'];
                $tracker->name = $data['name'];
                $tracker->sim_phone_number = $data['sim_phone_number'];
                $tracker_find->update($tracker->toArray());
                return Tracker::find(Tracker::where('token', $data['token'])->first()['id']);
            }
        }
    }

    public function update($data)
    { 
        $tracker_find = Tracker::find(Tracker::where('token', $data['token'])->first()['id']);
        $tracker = $tracker_find;
        $tracker->user_username = $data['user_username'];
        $tracker->name = $data['name'];
        $tracker->sim_phone_number = $data['sim_phone_number'];
        $tracker_find->update($tracker->toArray());
        return Tracker::find(Tracker::where('token', $data['token'])->first()['id']);
    }

    public function delete($token)
    {
        $tracker = Tracker::where('token', $token)->first();
        if($tracker)
        {
            $tracker->delete();
        }
        return $tracker;
    }

}
