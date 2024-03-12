import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from 'react';

interface TemplateInputProps {
    index: number;
    text: string;
    onChange: (index: number, newText: string) => void;
    onDelete: (index: number) => void;
}

const TemplateInput: React.FC<TemplateInputProps> = ({ index, text, onChange, onDelete }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Dynamically adjust the height based on the scroll height of the textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height to recalculate
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        onChange(index, inputValue);
    };

    return (
        <div className="mb-2 flex items-center p-4 bg-white shadow-md rounded-lg">
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleChange}
                className="flex-1 p-2 text-black border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 resize-none overflow-hidden"
                style={{ minHeight: '38px' }} // Set the minimum height to match the input height
            />
            <button
                onClick={() => onDelete(index)}
                className="ml-2 text-red-500 hover:text-red-700 transition-all duration-300 ease-in-out"
            >
                <FontAwesomeIcon icon={faBan} className="h-6 w-6" />
            </button>
        </div>
    );
};

export default TemplateInput;
