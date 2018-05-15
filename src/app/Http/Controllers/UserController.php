<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\User;
use Illuminate\Http\Request;
use Validator;

class UserController extends Controller {

  public function login(Request $request) {
    $validator = Validator::make($request->all(), [
      'email' => 'required|email',
      'password' => 'required',
    ]);

    if (!$validator->fails()) {
      $email = $request->input('email');
      $password = md5($request->input('password'));
      $user = User::where('email', $email)->where('password', $password)->first();

      if ($user != null) {
        $user->api_token = md5(time() . $user->id);
        $user->save();

        $r = collect(['token' => $user->api_token]);
        return new UserResource($r);
      } else {
        return response()->json(['error' => 'Invalid Email or Password'], 403);
      }
    } else {
      return response()->json(['error' => 'Invalid Fields'], 403);
    }
  }

  public function get(Request $request) {
    $user = $request->user('api');
    return new UserResource($user);
  }

  public function new (Request $request) {
    $validator = Validator::make($request->all(), [
      'name' => 'required',
      'email' => 'required|email',
      'password' => 'required',
    ]);

    if (!$validator->fails()) {
      $user = new User();
      $user->name = $request->input('name');
      $user->email = $request->input('email');
      $user->password = md5($request->input('password'));
      $user->save();

      return new UserResource($user);
    } else {
      return response()->json(['error' => 'Invalid Fields'], 403);
    }
  }

  public function put(Request $request) {
    $validator = Validator::make($request->all(), [
      'name' => 'required',
      'email' => 'required|email',
      'password' => 'required',
    ]);

    if (!$validator->fails()) {
      $user = $request->user('api');
      $user->name = $request->input('name');
      $user->email = $request->input('email');
      $user->password = md5($request->input('password'));
      $user->save();

      return new UserResource($user);
    } else {
      return response()->json(['error' => 'Invalid Fields'], 403);
    }
  }

  public function logout(Request $request) {
    $user = $request->user('api');
    $user->api_token = '';
    $user->save();
    return response()->json(['message' => 'Logged Out'], 200);
	}
	
  public function updateImage(Request $request) {
    $user = $request->user('api');
    $data = $request->all();
    $validator = Validator::make($data, [
        'image' => 'required|image'
    ]);

    if(!$validator->fails()){
      $img = $request->file('image')->store('images');;
      $user->image = $img;
      $user->save();
      return response()->json(['message' => 'Image updated'], 200);
    } else {
      return response()->json(['message' => 'Error'], 403);
    }
  }
}
