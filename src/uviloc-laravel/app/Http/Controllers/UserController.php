<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidateAnyUserRequest;
//use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UpdateUserPasswordRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

use App\Service\UserService;

class UserController extends Controller
{
    protected $UserService;

    public function __construct() {
        $this->UserService = new UserService();
    }


    // GET
    public function getAll()
    {
        
        return $this->UserService->getAll();
    }


    // POST
    public function createorget(ValidateAnyUserRequest $request)
    {
        return $this->UserService->createorget($request);
    }


    // // PUT
    // public function update(Request $request, UpdateUserRequest $update_request)
    // {
    //     return $this->UserService->update($request, $update_request);
    // }


    // // DELETE
    // public function delete($id)
    // {
    //     return $this->UserService->delete($id);
    // }
}
