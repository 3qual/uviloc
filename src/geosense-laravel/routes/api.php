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

Route::get('trackers/', [TrackerController::class, 'getAll']);
Route::get('trackers/{id}', [TrackerController::class, 'getItemById']);

Route::get('geolocations/', [GeolocationController::class, 'getAll']);
