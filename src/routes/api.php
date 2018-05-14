<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('users')->middleware('api')->group(function(){
    Route::post('/', 'UserController@login');
});

Route::prefix('users')->middleware('auth:api')->group(function(){
    Route::get('/', 'UserController@get');
    Route::post('/new', 'UserController@new');
    Route::put('/', 'UserController@put');
    Route::post('/image', 'UserController@updateImage');
    Route::delete('/', 'UserController@logout');
});