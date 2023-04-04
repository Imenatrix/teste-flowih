<?php

namespace Database\Factories;

use App\Models\Ticket;
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
            'ticket_id' => self::getDefaultTicket()
        ];
    }
}
