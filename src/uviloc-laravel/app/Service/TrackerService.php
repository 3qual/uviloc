<?php

namespace App\Service;

use App\Models\Tracker;
use App\Models\User;

class TrackerService
{
    public function getAll()
    {
        return Tracker::paginate(10);
    }

    public function getItemByTrackerToken($token)
    {
       return Tracker::where('token', $token)->get();
    }

    public function getItemByUserUsername($access_token)
    {
        $user_username = User::where('access_token', $access_token)->first()['username'];
        return Tracker::where('user_username', $user_username)->get();
    }

    public function create($data)
    {
        return Tracker::create($data->toArray());
    }

    public function update($data)
    { 
        $tracker = Tracker::find(Tracker::where('token', $data['token'])->first()['id']);
        $tracker->user_username = $data['user_username'];
        $tracker->name = $data['name'];
        $tracker->sim_phone_number = $data['sim_phone_number'];
        Tracker::find(Tracker::where('token', $data['token'])->first()['id'])->update($tracker->toArray());
        return Tracker::find(Tracker::where('token', $data['token'])->first()['id']);
    }

    public function delete($id)
    {
        $tracker = Tracker::find($id);
        if($tracker)
        {
            $tracker->delete();
        }
        return $tracker;
    }

}
