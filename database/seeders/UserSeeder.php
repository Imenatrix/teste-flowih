<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(10)->create();
        User::factory()->create(['email' => 'user@gmail.com', 'role' => 'user']);
        User::factory()->create(['email' => 'admin@gmail.com', 'role' => 'admin']);
    }
}
