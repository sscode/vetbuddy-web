// TemplateInput.tsx
interface TemplateInputProps {
    index: number;
    text: string;
    onChange: (index: number, newText: string) => void;
}

const TemplateInput: React.FC<TemplateInputProps> = ({ index, text, onChange }) => {
    // Handle change internally to ensure prefix is maintained
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        onChange(index, inputValue);
    };

    return (
        <div className="p-4">
            {/* <label
                htmlFor={`section-${index}`}
                className="text-black text-xl font-bold"
            >Section {index + 1}</label> */}
            <input
                type="text"
                value={text}
                onChange={handleChange}
                className="w-full text-black border border-black p-2 rounded-md"
            />
        </div>
    );
};

export default TemplateInput;
