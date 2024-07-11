<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trackers', function (Blueprint $table) {
            $table->id();
            $table->string('user_username')->nullable();
            $table->string('token')->required()->unique();
            $table->string('sim_phone_number')->nullable()->unique();
            $table->string('name')->nullable();
            $table->integer('battery_percentage')->nullable();
            $table->integer('signal_strength')->nullable();
            $table->string('net_standart')->nullable();
            $table->string('isp')->nullable();
            $table->boolean('gps_state')->nullable();
            $table->integer('speed_kph')->nullable();
            $table->string('state')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trackers');
    }
};
