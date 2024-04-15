<?php

namespace App\Service;

use App\Models\Tracker;

class TrackerService
{
    public function getAll()
    {
        // Временный костыль, нужно будет оставить пагинацию!

        //return Tracker::paginate(10);
        return Tracker::all();
    }

    public function getItemById($id)
    {
        return Tracker::find($id);
    }

    public function getItemByUserId($user_id)
    {
        return Tracker::where('user_id','=',$user_id)->get();
    }

    public function create($data)
    {
        return Tracker::create($data->toArray());
    }

    public function update($id, $data)
    {
        return Tracker::find($id)->update($data->toArray());
    }
    
    public function updateSimNumber($id, $data)
    {
        return Tracker::find($id)->update($data->toArray());
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
