<?php

namespace App\Service;

use App\Models\User;

class UserService
{
    public function getAll()
    {
        // Временный костыль, нужно будет оставить пагинацию!

        //return User::paginate(10);
        return User::all();
    }

    public function getItemById($id)
    {
        return User::find($id);
    }

    public function create($data)
    {
        
        return User::create($data->toArray());
    }

    public function update($id, $data)
    {
        return User::find($id)->update($data->toArray());
    }
    
    public function updatePassword($id, $data)
    {
        return User::find($id)->update($data->toArray());
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
