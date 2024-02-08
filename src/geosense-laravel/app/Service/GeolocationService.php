<?php

namespace App\Service;

use App\Models\Geolocation;

class GeolocationService
{
    public function getAll()
    {
        return Geolocation::paginate(10);
    }

    public function getItemByTrackerId($id)
    {
        return Geolocation::where('tracker_id','=',$id)->get();
    }

    public function create($data)
    {
        return Geolocation::create($data->toArray());
    }

    public function update($id, $data)
    {
        return Geolocation::find($id)->update($data->toArray());
    }

    public function delete($id)
    {
        $geolocation = Geolocation::find($id);
        if($geolocation)
        {
            $geolocation->delete();
        }
        return $geolocation;
    }

}
