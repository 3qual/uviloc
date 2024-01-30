<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGeolocationRequest;
use App\Http\Requests\UpdateGeolocationRequest;
use App\Models\Geolocation;

class GeolocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGeolocationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Geolocation $geolocation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Geolocation $geolocation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGeolocationRequest $request, Geolocation $geolocation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Geolocation $geolocation)
    {
        //
    }
}
