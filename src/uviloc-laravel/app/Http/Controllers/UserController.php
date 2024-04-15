<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
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

    // GET
    public function getItemById($id)
    {
        return $this->UserService->getItemById($id);
    }


    // POST
    public function create(StoreUserRequest $request)
    {
        return $this->UserService->create($request);
    }


    // PUT
    public function update($id, UpdateUserRequest $request)
    {
        return $this->UserService->update($id, $request);
    }


    // PATCH
    public function updatePassword($id, UpdateUserPasswordRequest $request)
    {
        return $this->UserService->updatePassword($id, $request);
    }


    // DELETE
    public function delete($id)
    {
        return $this->UserService->delete($id);
    }
}
