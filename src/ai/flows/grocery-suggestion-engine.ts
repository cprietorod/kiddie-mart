
'use server';

/**
 * @fileOverview This file implements the Grocery Suggestion Engine flow.
 *
 * - `suggestGroceries` -  A function to suggest related grocery products based on items in the cart.
 * - `GrocerySuggestionInput` - The input type for the suggestGroceries function.
 * - `GrocerySuggestionOutput` - The output type for the suggestGroceries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GrocerySuggestionInputSchema = z.object({
  cartItems: z.array(
    z.object({
      name: z.string().describe('The name of the product in the cart.'),
      category: z.string().describe('The category of the product.'),
    })
  ).describe('The list of products currently in the cart.'),
});

export type GrocerySuggestionInput = z.infer<typeof GrocerySuggestionInputSchema>;

const GrocerySuggestionOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('A list of suggested grocery product names related to the cart items. These should be actual product names.')
  ).describe('Suggested grocery products based on the current cart items. Provide actual product names as suggestions.'),
});

export type GrocerySuggestionOutput = z.infer<typeof GrocerySuggestionOutputSchema>;

export async function suggestGroceries(input: GrocerySuggestionInput): Promise<GrocerySuggestionOutput> {
  return grocerySuggestionFlow(input);
}

const grocerySuggestionPrompt = ai.definePrompt({
  name: 'grocerySuggestionPrompt',
  input: {schema: GrocerySuggestionInputSchema},
  output: {schema: GrocerySuggestionOutputSchema},
  prompt: `You are a helpful grocery store assistant. Recommend 3 specific grocery product names that would complement the items currently in the cart.
  Consider common pairings (e.g., bread with butter, cereal with milk). Only return the names of the products.

  Cart Items:
  {{#each cartItems}}
  - {{name}} ({{category}})
  {{/each}}

  Suggestions:`,
});

const grocerySuggestionFlow = ai.defineFlow(
  {
    name: 'grocerySuggestionFlow',
    inputSchema: GrocerySuggestionInputSchema,
    outputSchema: GrocerySuggestionOutputSchema,
  },
  async input => {
    const {output} = await grocerySuggestionPrompt(input);
    return { suggestions: output?.suggestions || [] };
  }
);
