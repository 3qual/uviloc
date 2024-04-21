<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGeolocationRequest;
use App\Http\Requests\UpdateGeolocationRequest;
use App\Http\Requests\GetGeolocationByTrackerTokenRequest;
use App\Models\Geolocation;
use App\Models\User;
use App\Models\Tracker;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

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
    public function getItemByTrackerToken(Request $request, GetGeolocationByTrackerTokenRequest $data)
    {
        return $this->GeolocationService->getItemByTrackerToken($request, $data);
    }

    // GET
    public function getLatestItemByTrackerToken(Request $request, GetGeolocationByTrackerTokenRequest $data)
    {
        return $this->GeolocationService->getLatestItemByTrackerToken($request, $data);
    }


    // POST
    public function create(StoreGeolocationRequest $data)
    {
        return $this->GeolocationService->create($data);
    }


    // // PUT
    // public function update($id, UpdateGeolocationRequest $request)
    // {
    //     return $this->GeolocationService->update($id, $request);
    // }


    // // DELETE
    // public function delete($id)
    // {
    //     return $this->GeolocationService->delete($id);
    // }
}
