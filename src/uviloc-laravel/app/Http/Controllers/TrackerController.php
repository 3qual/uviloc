<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTrackerRequest;
use App\Http\Requests\UpdateTrackerRequest;
use App\Http\Requests\GetTrackerByTokenRequest;
use App\Models\Tracker;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

use App\Service\TrackerService;

class TrackerController extends Controller
{
    protected $TrackerService;

    public function __construct() {
        $this->TrackerService = new TrackerService();
    }

    
    // GET
    public function getAll()
    {
        return $this->TrackerService->getAll();
    }

    // GET
    public function getItemByTrackerToken(Request $request, GetTrackerByTokenRequest $data)
    {
        return $this->TrackerService->getItemByTrackerToken($request, $data);
    }

    // GET
    public function getItemByUserAccessToken(Request $request)
    {
        return $this->TrackerService->getItemByUserAccessToken($request);
    }

    // POST
    public function create(StoreTrackerRequest $request)
    {
        return $this->TrackerService->create($request);
    }


    // PUT
    public function linkToUser(Request $request, UpdateTrackerRequest $data)
    {
        return $this->TrackerService->linkToUser($request, $data);
    }

    // PUT
    public function update(UpdateTrackerRequest $request)
    {
        return $this->TrackerService->update($request);
    }


    // DELETE
    public function delete($token)
    {
        return $this->TrackerService->delete($token);
    }
}
