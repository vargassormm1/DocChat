import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import OpenAI from "openai";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { streamToString } from "./helpers";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fetchPdfFromS3 = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `uploads/${fileName}`,
  });
  const { Body } = await s3Client.send(command);
  const buffer = streamToString(Body);
  return {
    arrayBuffer: () => Promise.resolve(buffer),
  };
};

const loadAndSplitPDF = async (fileName) => {
  const pdfData = await fetchPdfFromS3(fileName);
  const loader = new PDFLoader(pdfData);
  return loader.loadAndSplit(
    new CharacterTextSplitter({
      separator: ". ",
      chunkSize: 2500,
      chunkOverlap: 100,
    })
  );
};

const createStore = async (docs) => {
  return MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());
};

export const getResponse = async (fileName, userQuestion) => {
  try {
    const pdfDocs = await loadAndSplitPDF(fileName);
    const store = await createStore([...pdfDocs]);
    const results = await store.similaritySearch(userQuestion, 2);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: [
        {
          role: "assistant",
          content:
            "You are a helpful AI assistant. Answser questions to your best ability.",
        },
        {
          role: "user",
          content: `Answer the following question using the provided context. If you cannot answer the question with the context, don't lie and make up stuff. Just say you need more context.
            Question: ${userQuestion}

            Context: ${results.map((r) => r.pageContent).join("\n")}`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw new Error("Failed to fetch AI response");
  }
};
