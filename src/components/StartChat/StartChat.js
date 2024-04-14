"use client";
import styles from "./StartChat.module.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useRouter } from "next/navigation";

const { Dragger } = Upload;

const StartChat = () => {
  const router = useRouter();

  const props = {
    name: "file",
    multiple: true,
    action: "/api/upload",
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      const fileSizeLimit = 50 * 1024 * 1024;

      if (!isPDF) {
        message.error(`${file.name} is not a PDF file`);
        return Upload.LIST_IGNORE;
      }
      if (file.size > fileSizeLimit) {
        message.error(
          `${file.name} exceeds the maximum file size limit of 50 MB`
        );
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange(info) {
      console.log(info.file.type);
      const { status } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        router.push(`/chat/${info.file.name}`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onError(error) {
      console.error("File upload error:", error);
      message.error("File upload failed. Please try again.");
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className={styles.container}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag a PDF file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Please note: Only one PDF file can be uploaded at a time. Ensure you
          are uploading a PDF document for analysis.
        </p>
      </Dragger>
    </div>
  );
};

export default StartChat;
