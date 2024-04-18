<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTrackerRequest;
use App\Http\Requests\UpdateTrackerRequest;
use App\Http\Requests\UpdateTrackerSimNumberRequest;
use App\Models\Tracker;

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
    public function getItemByTrackerToken($token)
    {
        return $this->TrackerService->getItemByTrackerToken($token);
    }

    // GET
    public function getItemByUserUsername($access_token)
    {
        return $this->TrackerService->getItemByUserUsername($access_token);
    }

    // POST
    public function create(StoreTrackerRequest $request)
    {
        return $this->TrackerService->create($request);
    }


    // PUT
    public function update(UpdateTrackerRequest $request)
    {
        return $this->TrackerService->update($request);
    }


    // DELETE
    public function delete($id)
    {
        return $this->TrackerService->delete($id);
    }
}
