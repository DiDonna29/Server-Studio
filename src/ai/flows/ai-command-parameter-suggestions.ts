'use server';
/**
 * @fileOverview This file implements a Genkit flow that suggests command parameters
 * based on a selected action and server context, aiding in the accurate construction of server commands.
 *
 * - aiCommandParameterSuggestions - A function that handles the AI-powered command parameter suggestion process.
 * - AiCommandParameterSuggestionsInput - The input type for the aiCommandParameterSuggestions function.
 * - AiCommandParameterSuggestionsOutput - The return type for the aiCommandParameterSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCommandParameterSuggestionsInputSchema = z.object({
  selectedAction: z
    .string()
    .describe(
      'The selected command action (e.g., "give item", "change weather", "teleport").'
    ),
  serverContext: z
    .object({
      players: z
        .array(z.string())
        .optional()
        .describe('List of available player names.'),
      items: z
        .array(z.string())
        .optional()
        .describe('List of available item names.'),
      weatherStates: z
        .array(z.string())
        .optional()
        .describe('List of available weather states (e.g., "clear", "rain", "thunder").'),
      locations: z
        .array(z.string())
        .optional()
        .describe('List of available locations for teleportation.'),
    })
    .optional()
    .describe('Optional server context to help with suggestions.'),
});
export type AiCommandParameterSuggestionsInput = z.infer<
  typeof AiCommandParameterSuggestionsInputSchema
>;

const AiCommandParameterSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(
      z.object({
        parameterName: z.string().describe('The name of the command parameter.'),
        description: z.string().describe('A brief description of the parameter.'),
        type: z
          .string()
          .describe(
            'The expected data type of the parameter (e.g., "string", "number", "enum").'
          ),
        examples: z
          .array(z.string())
          .optional()
          .describe('Examples of valid values for this parameter.'),
        format: z
          .string()
          .optional()
          .describe('Specific format constraints (e.g., "alphanumeric", "integer").'),
      })
    )
    .describe('An array of suggested parameters for the selected action.'),
  commandExample: z
    .string()
    .describe('A complete example of the constructed command.'),
});
export type AiCommandParameterSuggestionsOutput = z.infer<
  typeof AiCommandParameterSuggestionsOutputSchema
>;

const aiCommandParameterSuggestionsPrompt = ai.definePrompt({
  name: 'aiCommandParameterSuggestionsPrompt',
  input: {schema: AiCommandParameterSuggestionsInputSchema},
  output: {schema: AiCommandParameterSuggestionsOutputSchema},
  prompt: `You are an expert server administrator assistant. Based on the selected command action and provided server context,
suggest the valid parameters, their types, and examples for constructing the command.
Also, provide a complete example of the constructed command.

Selected Action: {{{selectedAction}}}

Server Context:
{{#if serverContext}}
  {{#if serverContext.players}}
Available Players: {{#each serverContext.players}}- {{{this}}}
  {{/each}}
  {{/if}}
  {{#if serverContext.items}}
Available Items: {{#each serverContext.items}}- {{{this}}}
  {{/each}}
  {{/if}}
  {{#if serverContext.weatherStates}}
Available Weather States: {{#each serverContext.weatherStates}}- {{{this}}}
  {{/each}}
  {{/if}}
  {{#if serverContext.locations}}
Available Locations: {{#each serverContext.locations}}- {{{this}}}
  {{/each}}
  {{/if}}
{{else}}
No specific server context provided.
{{/if}}

Provide your suggestions in a structured JSON format matching the output schema.
`,
});

const aiCommandParameterSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiCommandParameterSuggestionsFlow',
    inputSchema: AiCommandParameterSuggestionsInputSchema,
    outputSchema: AiCommandParameterSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await aiCommandParameterSuggestionsPrompt(input);
    return output!;
  }
);

export async function aiCommandParameterSuggestions(
  input: AiCommandParameterSuggestionsInput
): Promise<AiCommandParameterSuggestionsOutput> {
  return aiCommandParameterSuggestionsFlow(input);
}
