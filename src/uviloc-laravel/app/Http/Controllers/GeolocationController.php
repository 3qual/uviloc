<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGeolocationRequest;
use App\Http\Requests\UpdateGeolocationRequest;
use App\Models\Geolocation;

use App\Service\GeolocationService;

class GeolocationController extends Controller
{
    protected $GeolocationService;

    public function __construct() {
        $this->GeolocationService = new GeolocationService();
    }


    // GET
    public function getAll()
    {
        return $this->GeolocationService->getAll();
    }

    // GET
    public function getItemByTrackerToken($tracker_token)
    {
        return $this->GeolocationService->getItemByTrackerToken($tracker_token);
    }


    // POST
    public function create(StoreGeolocationRequest $request)
    {
        return $this->GeolocationService->create($request);
    }


    // PUT
    public function update($id, UpdateGeolocationRequest $request)
    {
        return $this->GeolocationService->update($id, $request);
    }


    // DELETE
    public function delete($id)
    {
        return $this->GeolocationService->delete($id);
    }
}
