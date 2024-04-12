"use client";

import React, { useState } from "react";
import { Modal, Button } from "@mantine/core";
import { TrashIcon } from "lucide-react";

interface FilePreview {
  url: string;
  name: string;
}

function FileUpload() {
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files) as File[];
      const newPreviews = files
        .map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
        }))
        .filter(
          (newFile) =>
            !filePreviews.some(
              (existingFile) => existingFile.name === newFile.name
            )
        );
      setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const openModal = (url: string) => {
    setSelectedFile(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(undefined);
  };

  const removeFile = (index: number) => {
    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, idx) => idx !== index)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <input
            id="dropzone-file"
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Only PDF Files
          </p>
        </div>
      </label>
      <ul className="w-full max-w-md text-sm text-gray-700">
        {filePreviews.map((file, index) => (
          <li key={index} className="py-2 flex justify-between items-center">
            <span
              className="truncate cursor-pointer"
              onClick={() => openModal(file.url)}
            >
              {file.name}
            </span>
            <button
              onClick={() => removeFile(index)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        title="PDF Preview"
        size="lg"
      >
        {selectedFile && (
          <iframe
            src={selectedFile}
            style={{ width: "100%", height: "700px" }}
            title="PDF preview"
          />
        )}
      </Modal>
    </div>
  );
}

export default FileUpload;
