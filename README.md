# DocChat

DocChat is a web application built with Next.js that allows users to upload PDF files and engage in conversations with an AI assistant to extract insights, summaries, or answers related to the content of the uploaded PDFs.

## How it Works

DocChat utilizes natural language processing (NLP) techniques to analyze the content of uploaded PDF files and generate responses to user queries based on the extracted context. Here's a breakdown of how it works:

1. **PDF Upload**: Users upload PDF files containing textual content to the application.

2. **Context Extraction**: Upon uploading a PDF, the application extracts the text content from the PDF file using the `pdf-parse` library or similar tools. This extracted text serves as the context for the AI assistant to generate responses.

3. **Embeddings and Memory Vector Store**: The extracted text data is converted into vector embeddings, which capture the semantic meaning and context of the text. These embeddings are stored in a "Memory Vector Store" to facilitate efficient retrieval and similarity search operations.

4. **AI Chat Interaction**: Users engage in a chat conversation with the AI assistant, asking questions or seeking information related to the content of the uploaded PDF.

5. **Contextual Responses**: When a user sends a message/query to the AI assistant, the application sends the user's query along with the extracted context (embeddings) from the PDF to the AI service (in this case, OpenAI's GPT model).

6. **Response Generation**: The AI model processes the user's query and the provided context (embeddings) to generate a response. This response is then sent back to the application.

7. **Displaying Responses**: The application displays the AI-generated response in the chat interface, allowing users to view the answers, insights, or summaries provided by the AI assistant.

Overall, the AI part of the DocChat application enhances user interaction by providing intelligent responses based on the content of the uploaded PDF files. It enables users to quickly obtain relevant information or insights from the documents they upload, making the application a valuable tool for document analysis and communication.

## Features

- **PDF Upload**: Users can upload PDF files directly to the application.
- **AI Chat**: Upon uploading a PDF, users can engage in a chat conversation with an AI assistant.
- **Contextual Responses**: The AI assistant provides responses based on the context extracted from the uploaded PDFs.
- **Error Handling**: The application includes error handling mechanisms for various scenarios, ensuring a smooth user experience.
- **Responsive Design**: DocChat is designed to be responsive and accessible across different devices and screen sizes.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   git clone <repository-url>
   ```
   
3. Set up environment variables:

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   ```
   
5. Run the development server:

   ```bash
   npm run dev
   ```
