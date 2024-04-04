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

Route::get('users', [UserController::class, 'getAll']);
Route::get('users/{id}', [UserController::class, 'getItemById']);
Route::post('users/', [UserController::class, 'create']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::patch('users/{id}', [UserController::class, 'updatePassword']);
Route::delete('users/{id}', [UserController::class, 'delete']);

Route::get('trackers', [TrackerController::class, 'getAll']);
#Route::get('trackers/{id}', [TrackerController::class, 'getItemById']);
Route::get('trackers/{id}', [TrackerController::class, 'getItemByUserId']);
Route::post('trackers/', [TrackerController::class, 'create']);
Route::put('trackers/{id}', [TrackerController::class, 'update']);
Route::patch('trackers/{id}', [TrackerController::class, 'updateSimNumber']);
Route::delete('trackers/{id}', [TrackerController::class, 'delete']);

Route::get('geolocations', [GeolocationController::class, 'getAll']);
Route::get('geolocations/{id}', [GeolocationController::class, 'getItemByTrackerId']);
Route::post('geolocations/', [GeolocationController::class, 'create']);
Route::put('geolocations/{id}', [GeolocationController::class, 'update']);
Route::delete('geolocations/{id}', [GeolocationController::class, 'delete']);

