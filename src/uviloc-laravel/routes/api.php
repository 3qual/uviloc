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

Route::get('users/get-all/', [UserController::class, 'getAll']); // superadmin only
Route::post('users/create-or-get/', [UserController::class, 'createorget']);
// Route::put('users/update/', [UserController::class, 'update']); // acceess_token передается как bearer в header
//  Route::delete('users/delete/{access_token}', [UserController::class, 'delete']);

Route::get('trackers/get-all/', [TrackerController::class, 'getAll']); // superadmin only
Route::get('trackers/get-by-tracker-token/', [TrackerController::class, 'getItemByTrackerToken']); // acceess_token передается как bearer в header
Route::get('trackers/get-by-access-token/', [TrackerController::class, 'getItemByUserAccessToken']); // acceess_token передается как bearer в header
Route::post('trackers/create/', [TrackerController::class, 'create']); 
Route::put('trackers/link-to-user/', [TrackerController::class, 'linkToUser']); // acceess_token передается как bearer в header
Route::put('trackers/update/', [TrackerController::class, 'update']);
Route::delete('trackers/delete/{token}', [TrackerController::class, 'delete']);

Route::get('geolocations/get-all/', [GeolocationController::class, 'getAll']); // superadmin only
Route::get('geolocations/get-by-tracker-token/', [GeolocationController::class, 'getItemByTrackerToken']); // acceess_token передается как bearer в header
Route::get('geolocations/get-latest-by-tracker-token/', [GeolocationController::class, 'getLatestItemByTrackerToken']); // acceess_token передается как bearer в header
Route::post('geolocations/create/', [GeolocationController::class, 'create']);
//  Route::put('geolocations/update/{id}', [GeolocationController::class, 'update']);
//  Route::delete('geolocations/delete/{id}', [GeolocationController::class, 'delete']);

