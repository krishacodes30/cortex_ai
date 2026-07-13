// import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
// import { getModel } from "../utils/model.js";
// // import { getMemory } from "../utils/memory.js";


// // import { checkAgentLimit } from "../config/agentRateLimit.js";
// // import { deductCredits } from "../utils/deductCredits.js";
// // import { getModel } from "../graph/llmModels.js";
// // import { imageAgent } from "./imageGen.agent.js";
// import { getMemory } from "../utils/memory.js";


// export const chatAgent =async(state)=>{


// // await checkAgentLimit(
// //     state.userId,
// //     "chat"
// //   );

// //    await deductCredits(

// //         state.userId,

// //         "chat"

// //     );


//  const llm =await getModel("chat");

//  const history =
//  await getMemory(
//   state.conversationId
//  );

 

// const searchContext = state.searchResults
//   ? `
// Web Search Results:

// ${state.searchResults}

// Answer the user using only the above search results.
// `
//   : ""




//  const messages = [

//   new SystemMessage(
// `
// You are CortexAI, an intelligent AI assistant.

// ${searchContext}



// If searchContext exists:

// - Use search results to answer.
// - Do not mention internal tools.

// Rules:

// - For simple questions, greetings, and short queries, respond naturally in plain text.
// - For technical, educational, coding, or detailed topics, use clean Markdown.

// Formatting:

// - Use # for titles and ## for sections.
// - Leave a blank line after headings.
// - Use bullet points for lists.
// - Use numbered lists for steps.
// - Use fenced code blocks with language tags for code.
// - Keep paragraphs short and readable.
// - Never write headings and content on the same line.
// - Never generate large walls of text.




// `
//   )

//  ];

//  history.forEach((msg)=>{

//   if(
//    msg.role === "user"
//   ){

//    messages.push(

//     new HumanMessage(
//      msg.content
//     )

//    );

//   }

//   if(
//    msg.role === "assistant"
//   ){

//    messages.push(

//     new AIMessage(
//      msg.content
//     )

//    );

//   }

//  });

//  messages.push(

//   new HumanMessage(
//    state.prompt
//   )

//  );

//  const response = await llm.invoke(messages);


// const images = state.searchResults?.images || [];



// return {
//   ...state,

//   response:response.content,
//   images:images
  
// };

// };

import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

import { getModel } from "../utils/model.js";
import { getMemory } from "../utils/memory.js";

export const chatAgent = async (state) => {
  // Get model
  const llm = await getModel("chat");

  // Get previous conversation
  const history = await getMemory(state.conversationId);

  // -----------------------------
  // Build Search Context
  // -----------------------------
  let searchContext = "";

  if (state.searchResults?.results?.length) {
    searchContext = state.searchResults.results
      .map(
        (result, index) => `
Result ${index + 1}

Title:
${result.title}

URL:
${result.url}

Content:
${result.content}
`
      )
      .join("\n\n");
  }

  // -----------------------------
  // Build Messages
  // -----------------------------
  const messages = [
    new SystemMessage(`
You are CortexAI, an intelligent AI assistant.

${
  searchContext
    ? `
You have been provided REAL-TIME WEB SEARCH RESULTS.

${searchContext}

You are CortexAI.

When fresh information is provided:
-never say i dont know information
- Treat it as verified context.
- Integrate it naturally.
- Never mention search, search results, retrieved documents, Result 1, Result 2, Reddit, Tavily, or internal tools.
- Answer as if you already know the information.
- Only mention sources when explicitly requested.

If fresh information is not available, answer using your own knowledge.

`
    : ""
}

General Rules:

- Answer naturally.
- For greetings, use plain text.
- For technical questions use Markdown.
- Use headings.
- Use bullet points.
- Use numbered lists.
- Use fenced code blocks with language tags.
- Keep paragraphs short.
- Never create huge walls of text.
-not explicitly mention in output that you got this respose form this result and this just got direct


`

)
  ];

  // -----------------------------
  // Add Conversation History
  // -----------------------------
  history.forEach((msg) => {
    if (!msg) return;

    if (!msg.content) return;

    if (msg.role === "user") {
      messages.push(
        new HumanMessage(msg.content)
      );
    }

    if (msg.role === "assistant") {
      messages.push(
        new AIMessage(msg.content)
      );
    }
  });

  // Current user message
  messages.push(
    new HumanMessage(state.prompt)
  );

  // -----------------------------
  // Debug
  // -----------------------------
  console.log("========== CHAT ==========");
  console.log("Search Used:", !!searchContext);
  console.log("History Count:", history.length);
  console.log("Messages Sent:", messages.length);

  if (searchContext) {
    console.log(searchContext);
  }

  // -----------------------------
  // Invoke LLM
  // -----------------------------
  const response = await llm.invoke(messages);

  // -----------------------------
  // Return
  // -----------------------------
  return {
    ...state,
    response: response.content,
    images: state.searchResults?.images || [],
  };
};