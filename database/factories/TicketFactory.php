<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    private static $default_user_id;

     private static function getDefaultUser() {
        if (self::$default_user_id == null) {
            self::$default_user_id = User::factory()->create(['role' => 'user'])->id;
        }
        return self::$default_user_id;
    }
    public function definition(): array
    {
        return [
            'title' => fake()->catchPhrase(),
            'body' => fake()->text(),
            'user_id' => self::getDefaultUser()
        ];
    }
}
