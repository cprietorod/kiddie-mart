
// src/ai/flows/toy-suggestion-engine.ts
'use server';

/**
 * @fileOverview This file implements the Toy Suggestion Engine flow.
 *
 * - `suggestToys` -  A function to suggest related toy products based on items in the cart.
 * - `ToySuggestionInput` - The input type for the suggestToys function.
 * - `ToySuggestionOutput` - The output type for the suggestToys function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ToySuggestionInputSchema = z.object({
  cartItems: z.array(
    z.object({
      name: z.string().describe('The name of the product in the cart.'),
      category: z.string().describe('The category of the product.'),
    })
  ).describe('The list of products currently in the cart.'),
});

export type ToySuggestionInput = z.infer<typeof ToySuggestionInputSchema>;

const ToySuggestionOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('A list of suggested toy products related to the cart items. These should be toy names.')
  ).describe('Suggested toy products based on the current cart items. Provide actual toy names as suggestions.'),
});

export type ToySuggestionOutput = z.infer<typeof ToySuggestionOutputSchema>;

export async function suggestToys(input: ToySuggestionInput): Promise<ToySuggestionOutput> {
  return toySuggestionFlow(input);
}

// Note: Prompts are often best in English for current models, 
// but you can experiment with Spanish prompts if your model supports it well.
// For this exercise, the prompt remains in English to ensure model compatibility,
// and the application will display the English suggestions.
// A more advanced solution would involve translating suggestions or using a model fine-tuned for Spanish.
const toySuggestionPrompt = ai.definePrompt({
  name: 'toySuggestionPrompt',
  input: {schema: ToySuggestionInputSchema},
  output: {schema: ToySuggestionOutputSchema},
  prompt: `You are a toy expert. Recommend 3 specific toy product names that would complement the items currently in the cart.
  Be creative and suggest fun toys. Only return the names of the toys.

  Cart Items:
  {{#each cartItems}}
  - {{name}} ({{category}})
  {{/each}}

  Suggestions:`,
});

const toySuggestionFlow = ai.defineFlow(
  {
    name: 'toySuggestionFlow',
    inputSchema: ToySuggestionInputSchema,
    outputSchema: ToySuggestionOutputSchema,
  },
  async input => {
    const {output} = await toySuggestionPrompt(input);
    // Ensure we always return an array, even if the model fails or returns null/undefined
    return { suggestions: output?.suggestions || [] };
  }
);
