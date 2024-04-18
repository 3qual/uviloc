<?php

namespace App\Service;

use App\Models\User;

class UserService
{
    public function generateRandomString(): string
    {
        $length = 64;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+=';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }



    public function getAll()
    {
        return User::paginate(10);
    }

    public function createorget($data)
    {
        $res = User::where('username', $data['username'])->first();
        if(!str_contains(User::get(), $data['username'])){
            $data['access_token'] = $this->generateRandomString();
            User::create($data->toArray());
            return User::where('username', $data['username'])->first();
        }
        return $res;
    }

    public function update($access_token, $data)
    {
        return User::where('access_token', $access_token)->update($data->toArray());
    }

    public function delete($access_token)
    {
        $human = User::find($access_token);
        if($human)
        {
            $human->delete();
        }
        return $human;
    }

}
