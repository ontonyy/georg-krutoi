# AI History Logger Skill

This skill ensures that all significant AI interactions, modifications, and user requests are recorded in `ai-history.json` at the project root.

## Instructions

Whenever you (the AI agent) finalize a task or reach a significant milestone:
1. Read the current contents of `ai-history.json`.
2. Append a new interaction object to the array:
   ```json
   {
     "timestamp": "ISO-8601 Timestamp",
     "user_prompt": "Summary of the user's request",
     "ai_response": "Detailed summary of actions taken and files modified"
   }
   ```
3. Save the file.
4. This keeps a persistent audit trail of the project's evolution across different sessions and agents.

