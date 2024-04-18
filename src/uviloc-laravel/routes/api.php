<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\TrackerController;
use App\Http\Controllers\GeolocationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('users/getall/', [UserController::class, 'getAll']);
Route::post('users/createorget/', [UserController::class, 'createorget']);
Route::put('users/update/{access_token}', [UserController::class, 'update']);
Route::delete('users/delete/{access_token}', [UserController::class, 'delete']);

Route::get('trackers', [TrackerController::class, 'getAll']);
Route::get('trackers/getbytrackertoken/{token}', [TrackerController::class, 'getItemByTrackerToken']);
Route::get('trackers/{access_token}', [TrackerController::class, 'getItemByUserUsername']);
Route::post('trackers/', [TrackerController::class, 'create']);
Route::put('trackers/update/', [TrackerController::class, 'update']);
Route::delete('trackers/{id}', [TrackerController::class, 'delete']);

Route::get('geolocations', [GeolocationController::class, 'getAll']);
Route::get('geolocations/getbytrackertoken/{tracker_token}', [GeolocationController::class, 'getItemByTrackerToken']);
Route::post('geolocations/', [GeolocationController::class, 'create']);
Route::put('geolocations/{id}', [GeolocationController::class, 'update']);
Route::delete('geolocations/{id}', [GeolocationController::class, 'delete']);

