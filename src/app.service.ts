import { Injectable } from '@nestjs/common';

/**
 * Service to handle application-specific logic.
 */
@Injectable()
export class AppService {
  /**
   * Returns a greeting message.
   * @returns A simple string message.
   */
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Example method to demonstrate service capabilities.
   * You can expand this method to include more complex logic.
   * @param name - The name of the person to greet.
   * @returns A personalized greeting message.
   */
  getPersonalizedGreeting(name: string): string {
    return `Hello, ${name}! Welcome to our application.`;
  }
}
