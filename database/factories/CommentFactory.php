<?php

namespace Database\Factories;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
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
    private static $default_ticket_id;

     private static function getDefaultTicket() {
        if (self::$default_ticket_id == null) {
            self::$default_ticket_id = Ticket::factory()->create()->id;
        }
        return self::$default_ticket_id;
    }
    public function definition(): array
    {
        return [
            'body' => fake()->text(),
            'user_id' => self::getDefaultUser(),
            'ticket_id' => self::getDefaultTicket()
        ];
    }
}
