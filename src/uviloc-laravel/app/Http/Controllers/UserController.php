<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ValidateAnyUserRequest;
//use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UpdateUserPasswordRequest;

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


    // PUT
    public function update($id, UpdateUserRequest $request)
    {
        return $this->UserService->update($id, $request);
    }


    // DELETE
    public function delete($id)
    {
        return $this->UserService->delete($id);
    }
}
