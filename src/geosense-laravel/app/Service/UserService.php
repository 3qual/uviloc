<?php

namespace App\Service;

use App\Models\User;

class UserService
{
    public function getAll()
    {
        return User::all();
    }

    public function getItemById($id)
    {
        return User::find($id);
    }

    public function create($data)
    {
        return User::create($data);
    }

    public function update($id, $data)
    {
        return User::find($id)->update($data);
    }
    
    public function updatePassword($id, $data)
    {
        return User::find($id)->update($request);
    }

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