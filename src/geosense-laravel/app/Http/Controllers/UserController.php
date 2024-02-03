<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;

class UserController extends Controller
{
    // GET
    public function getAll()
    {
        return User::all();
    }

    // GET
    public function getItemById(Request $request)
    {
        $human = $request->validate([
            'id'=> 'required'
        ]);
        $user = User::find($human['id']);
        return $user;
    }


    // POST
    public function create(Request $request)
    {
        $human = $request->validate([
            'is_active'=> 'nullable',
            'username'=> 'required|unique:users', 
            'name'=> 'nullable',
            'phone_number'=> 'nullable',
            'email'=> 'nullable',
            'path_to_avatar'=> 'nullable',
            'password'=> 'required'
        ]);
        $user = User::create($human); 
        return $user;
    }


    // PUT
    public function update(Request $request)
    {
        $human = $request->validate([
            'id'=> 'required',
            'is_active'=> 'nullable',
            'username'=> 'nullable', 
            'name'=> 'nullable',
            'phone_number'=> 'nullable',
            'email'=> 'nullable',
            'path_to_avatar'=> 'nullable',
            'password'=> 'nullable'
        ]);
        $user = User::find($human['id'])->update($human); 
        return $user;
    }


    // PATCH
    public function updatePassword()
    {

    }


    // DELETE
    public function delete($id)
    {
        $human = User::find($id);
        if($human)
        {
            $human->delete();
        }
        return $human;
    }
}
