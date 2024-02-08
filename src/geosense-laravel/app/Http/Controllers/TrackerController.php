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
    public function getItemById($id)
    {
        return $this->TrackerService->getItemById($id);
    }


    // POST
    public function create(StoreTrackerRequest $request)
    {
        return $this->TrackerService->create($request);
    }


    // PUT
    public function update($id, UpdateTrackerRequest $request)
    {
        return $this->TrackerService->update($id, $request);
    }


    // PATCH
    public function updateSimNumber($id, UpdateTrackerSimNumberRequest $request)
    {
        return $this->TrackerService->updateSimNumber($id, $request);
    }


    // DELETE
    public function delete($id)
    {
        return $this->TrackerService->delete($id);
    }
}
