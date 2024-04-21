<?php

namespace App\Service;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

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
        return User::All();
        //return User::paginate(10);
    }

    public function createorget($data)
    {
        $res = User::where('username', $data['username'])->first();
        if(str_contains(User::get(), $data['username']) == false){
            $data['access_token'] = $this->generateRandomString();
            User::create($data->toArray());
            $user = User::where('username', $data['username'])->first()->toArray();
            return array_merge($user, array('is_register' => true));
        }
        else if (Hash::check($data['password'], $res['password']) == true){
            return array_merge($res->toArray(), array('is_register' => false));;
        }
    }

    // public function update($request, $data)
    // {
    //     return User::where('access_token', $request->bearerToken())->update($data->toArray());
    // }

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
